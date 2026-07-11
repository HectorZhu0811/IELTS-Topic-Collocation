const fs = require("fs");
const http = require("http");
const path = require("path");

const projectDir = path.resolve(__dirname, "..", "..");
const exportDir = path.join(projectDir, "project-artifacts", "exports", "anki", "full-export");
const sourceFile = path.join(exportDir, "topic-collocation-anki-all.tsv");
const resultFile = path.join(exportDir, "topic-collocation-anki-sync-result.json");
const rootDeck = "IELTS::Collocations::Topic Collocation";
const modelName = "Basic";
const chunkDelayMs = 120;
const multiChunkSize = 40;

function requestOnce(action, params = {}, timeout = 25000) {
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
        timeout
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

async function request(action, params = {}, timeout = 25000) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return await requestOnce(action, params, timeout);
    } catch (error) {
      lastError = error;
      await sleep(350 * attempt);
    }
  }
  throw lastError;
}

async function runActions(actions, timeout = 60000) {
  const errors = [];
  for (let start = 0; start < actions.length; start += multiChunkSize) {
    const chunk = actions.slice(start, start + multiChunkSize);
    const results = await request("multi", { actions: chunk }, timeout);
    results.forEach((result, index) => {
      if (result.error) {
        errors.push({
          action: chunk[index].action,
          offset: start + index,
          message: result.error
        });
      }
    });
    await sleep(chunkDelayMs);
  }
  return errors;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRows() {
  const rows = [];
  for (const line of fs.readFileSync(sourceFile, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) {
      continue;
    }
    const cols = line.split("\t");
    if (cols.length !== 11) {
      throw new Error(`Unexpected TSV column count: ${cols.length}`);
    }
    const [front, back, topic, topicZh, type, baseChinese, baseEnglish, highlightChinese, highlightEnglish, tags, cardId] = cols;
    rows.push({
      front,
      back,
      topic,
      topicZh,
      type,
      baseChinese,
      baseEnglish,
      highlightChinese,
      highlightEnglish,
      tags: tags.split(/\s+/).filter(Boolean),
      cardId
    });
  }
  return rows;
}

function deckFor(row) {
  return `${rootDeck}::${row.topicZh} ${row.topic}`;
}

function frontWithCardId(row) {
  if (row.front.includes(row.cardId)) {
    return row.front;
  }
  return `${row.front}<div style="display:none">${row.cardId}</div>`;
}

function tagsFor(row) {
  return Array.from(new Set([...row.tags, row.cardId]));
}

function noteFor(row) {
  return {
    deckName: deckFor(row),
    modelName,
    fields: {
      Front: frontWithCardId(row),
      Back: row.back
    },
    tags: tagsFor(row),
    options: {
      allowDuplicate: false,
      duplicateScope: "deck"
    }
  };
}

function cardIdFromNoteInfo(info) {
  const tagMatch = info.tags.find((tag) => /^[A-Za-z]+-\d{3}$/.test(tag));
  if (tagMatch) {
    return tagMatch;
  }
  const front = info.fields.Front?.value || "";
  const frontMatch = front.match(/([A-Za-z]+-\d{3})/);
  return frontMatch ? frontMatch[1] : null;
}

async function noteInfos(noteIds) {
  const infos = [];
  for (let start = 0; start < noteIds.length; start += 80) {
    infos.push(...await request("notesInfo", { notes: noteIds.slice(start, start + 80) }, 60000));
    await sleep(chunkDelayMs);
  }
  return infos;
}

async function collectExistingMainNotes() {
  const noteIds = await request("findNotes", {
    query: "tag:topic_collocation -tag:notion_subtopic"
  }, 60000);
  const infos = await noteInfos(noteIds);
  const byCardId = new Map();
  const duplicateCardIds = [];
  const withoutCardId = [];

  for (const info of infos) {
    const cardId = cardIdFromNoteInfo(info);
    if (!cardId) {
      withoutCardId.push(info.noteId);
      continue;
    }
    if (byCardId.has(cardId)) {
      duplicateCardIds.push(cardId);
      continue;
    }
    byCardId.set(cardId, info.noteId);
  }

  return { byCardId, duplicateCardIds, withoutCardId, totalMainNotes: noteIds.length };
}

async function addMissingNotes(notes) {
  let added = 0;
  let skippedAsDuplicates = 0;
  const errors = [];

  for (let start = 0; start < notes.length; start += 20) {
    const chunk = notes.slice(start, start + 20);
    const canAdd = await request("canAddNotes", { notes: chunk }, 60000);
    const addable = chunk.filter((_, index) => canAdd[index]);
    skippedAsDuplicates += chunk.length - addable.length;
    if (addable.length) {
      const addedNoteIds = await request("addNotes", { notes: addable }, 60000);
      added += addedNoteIds.filter(Boolean).length;
    }
    await sleep(chunkDelayMs);
  }

  return { added, skippedAsDuplicates, errors };
}

async function syncRows(rows) {
  const createdDecks = Array.from(new Set(rows.map(deckFor))).sort();
  const createDeckErrors = await runActions(createdDecks.map((deck) => ({
    action: "createDeck",
    version: 6,
    params: { deck }
  })));

  const existing = await collectExistingMainNotes();
  const updateActions = [];
  const missingNotes = [];

  for (const row of rows) {
    const note = noteFor(row);
    const noteId = existing.byCardId.get(row.cardId);
    if (noteId) {
      updateActions.push({
        action: "updateNoteFields",
        version: 6,
        params: { note: { id: noteId, fields: note.fields } }
      });
      updateActions.push({
        action: "addTags",
        version: 6,
        params: { notes: [noteId], tags: note.tags.join(" ") }
      });
    } else {
      missingNotes.push(note);
    }
  }

  const updateErrors = await runActions(updateActions);
  const addResult = await addMissingNotes(missingNotes);

  return {
    createdDecks,
    added: addResult.added,
    updated: updateActions.filter((action) => action.action === "updateNoteFields").length - updateErrors.filter((error) => error.action === "updateNoteFields").length,
    moved: 0,
    skippedAsDuplicates: addResult.skippedAsDuplicates,
    duplicateMatches: existing.duplicateCardIds.length,
    existingMainNotesBeforeSync: existing.totalMainNotes,
    existingWithoutCardIdBeforeSync: existing.withoutCardId.length,
    errors: [...createDeckErrors, ...updateErrors, ...addResult.errors]
  };
}

async function verify(rows) {
  const existing = await collectExistingMainNotes();
  const missingCardIds = rows.map((row) => row.cardId).filter((cardId) => !existing.byCardId.has(cardId));
  return {
    topicCollocationNonSubtopicCount: existing.totalMainNotes,
    matchedSourceCardIds: rows.length - missingCardIds.length,
    missingCardIds,
    duplicateCardIds: existing.duplicateCardIds,
    notesWithoutCardId: existing.withoutCardId
  };
}

async function main() {
  const rows = parseRows();
  const duplicateIds = rows
    .map((row) => row.cardId)
    .filter((cardId, index, all) => all.indexOf(cardId) !== index);
  if (duplicateIds.length) {
    throw new Error(`Duplicate CardId values in source TSV: ${duplicateIds.join(", ")}`);
  }

  const sync = await syncRows(rows);
  const verification = await verify(rows);
  const result = {
    syncedAt: new Date().toISOString(),
    rootDeck,
    sourceFile: path.relative(projectDir, sourceFile),
    totalRows: rows.length,
    targetTopicDecks: sync.createdDecks.length,
    added: sync.added,
    updated: sync.updated,
    movedCardsToTopicDecks: sync.moved,
    skippedAsDuplicates: sync.skippedAsDuplicates,
    duplicateCardIdMatches: sync.duplicateMatches,
    existingMainNotesBeforeSync: sync.existingMainNotesBeforeSync,
    existingWithoutCardIdBeforeSync: sync.existingWithoutCardIdBeforeSync,
    sampleDecks: sync.createdDecks.slice(0, 10),
    verification,
    errors: sync.errors
  };
  fs.writeFileSync(resultFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(result, null, 2));
  if (sync.errors.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const result = {
    syncedAt: new Date().toISOString(),
    rootDeck,
    sourceFile: path.relative(projectDir, sourceFile),
    error: error.message
  };
  fs.writeFileSync(resultFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.error(error.message);
  process.exit(1);
});
