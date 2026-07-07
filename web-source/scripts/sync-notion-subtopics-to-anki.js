const fs = require("fs");
const http = require("http");
const path = require("path");

const projectDir = path.resolve(__dirname, "..", "..");
const exportDir = path.join(projectDir, "project-artifacts", "exports", "anki", "full-export");
const sourceFile = path.join(exportDir, "notion-subtopics-anki-all.tsv");
const resultFile = path.join(exportDir, "notion-subtopics-anki-sync-result.json");
const deckName = "IELTS Topic Collocation::2025-2026 Subtopics";
const chunkSize = 8;

function request(action, params = {}) {
  const payload = JSON.stringify({ action, version: 6, params });

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 8765,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 5000
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              reject(new Error(parsed.error));
              return;
            }
            resolve(parsed.result);
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("Timed out connecting to AnkiConnect on 127.0.0.1:8765"));
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function parseRows() {
  const lines = fs.readFileSync(sourceFile, "utf8").split(/\r?\n/);
  return lines
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const cols = line.split("\t");
      if (cols.length !== 11) {
        throw new Error(`Unexpected TSV column count: ${cols.length}`);
      }
      return {
        front: cols[0],
        back: cols[1],
        topic: cols[2],
        topicZh: cols[3],
        subtopic: cols[6],
        tags: cols[9].split(/\s+/).filter(Boolean),
        cardId: cols[10]
      };
    });
}

function buildNote(row) {
  return {
    deckName,
    modelName: "Basic",
    fields: {
      Front: row.front,
      Back: row.back
    },
    tags: row.tags,
    options: {
      allowDuplicate: false,
      duplicateScope: "deck"
    }
  };
}

async function main() {
  const rows = parseRows();

  await request("createDeck", { deck: deckName });
  const notes = rows.map(buildNote);
  const addedNoteIds = [];
  const skippedRows = [];

  for (let start = 0; start < notes.length; start += chunkSize) {
    const noteChunk = notes.slice(start, start + chunkSize);
    const rowChunk = rows.slice(start, start + chunkSize);
    const canAdd = await request("canAddNotes", { notes: noteChunk });
    const addableNotes = noteChunk.filter((_, index) => canAdd[index]);
    skippedRows.push(...rowChunk.filter((_, index) => !canAdd[index]));

    if (addableNotes.length) {
      const chunkNoteIds = await request("addNotes", { notes: addableNotes });
      addedNoteIds.push(...chunkNoteIds);
    }
  }

  const result = {
    syncedAt: new Date().toISOString(),
    deckName,
    sourceFile: path.relative(projectDir, sourceFile),
    totalRows: rows.length,
    added: addedNoteIds.filter(Boolean).length,
    skippedAsDuplicates: skippedRows.length,
    skippedCardIds: skippedRows.map((row) => row.cardId),
    addedNoteIds
  };

  fs.writeFileSync(resultFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  const result = {
    syncedAt: new Date().toISOString(),
    deckName,
    sourceFile: path.relative(projectDir, sourceFile),
    error: error.message
  };
  fs.writeFileSync(resultFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.error(error.message);
  process.exit(1);
});
