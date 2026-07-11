import json
import time
import urllib.request
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[2]
EXPORT_DIR = PROJECT_DIR / "project-artifacts" / "exports" / "anki" / "full-export"
SOURCE_FILE = EXPORT_DIR / "notion-subtopics-anki-all.tsv"
RESULT_FILE = EXPORT_DIR / "notion-subtopics-anki-sync-result.json"
DECK_NAME = "IELTS Topic Collocation::2025-2026 Subtopics"
CHUNK_SIZE = 4


def request(action, params=None, timeout=15):
    payload = json.dumps({"action": action, "version": 6, "params": params or {}}).encode("utf-8")
    req = urllib.request.Request(
        "http://127.0.0.1:8765",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        data = json.loads(response.read().decode("utf-8"))
    if data.get("error"):
        raise RuntimeError(data["error"])
    return data.get("result")


def parse_rows():
    rows = []
    for line in SOURCE_FILE.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#"):
            continue
        cols = line.split("\t")
        if len(cols) != 11:
            raise RuntimeError(f"Unexpected TSV column count: {len(cols)}")
        rows.append(
            {
                "front": cols[0],
                "back": cols[1],
                "tags": [tag for tag in cols[9].split() if tag],
                "cardId": cols[10],
            }
        )
    return rows


def build_note(row):
    return {
        "deckName": DECK_NAME,
        "modelName": "Basic",
        "fields": {
            "Front": row["front"],
            "Back": row["back"],
        },
        "tags": row["tags"],
        "options": {
            "allowDuplicate": False,
            "duplicateScope": "deck",
        },
    }


def main():
    rows = parse_rows()
    notes = [build_note(row) for row in rows]
    added_note_ids = []
    skipped_rows = []

    request("createDeck", {"deck": DECK_NAME})

    for start in range(0, len(notes), CHUNK_SIZE):
        note_chunk = notes[start : start + CHUNK_SIZE]
        row_chunk = rows[start : start + CHUNK_SIZE]
        can_add = request("canAddNotes", {"notes": note_chunk})
        addable_notes = [note for note, ok in zip(note_chunk, can_add) if ok]
        skipped_rows.extend(row for row, ok in zip(row_chunk, can_add) if not ok)
        if addable_notes:
            added_note_ids.extend(request("addNotes", {"notes": addable_notes}))
        time.sleep(0.2)

    result = {
        "syncedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "deckName": DECK_NAME,
        "sourceFile": str(SOURCE_FILE.relative_to(PROJECT_DIR)),
        "totalRows": len(rows),
        "added": len([note_id for note_id in added_note_ids if note_id]),
        "skippedAsDuplicates": len(skipped_rows),
        "skippedCardIds": [row["cardId"] for row in skipped_rows],
        "addedNoteIds": added_note_ids,
    }
    RESULT_FILE.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        result = {
            "syncedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "deckName": DECK_NAME,
            "sourceFile": str(SOURCE_FILE.relative_to(PROJECT_DIR)),
            "error": str(error),
        }
        RESULT_FILE.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        raise
