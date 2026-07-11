const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const translationPath = path.join(root, "web-source", "recent-topic-card-translations.js");
const contentPath = path.join(
  root,
  "ios-app",
  "IELTSCollocation",
  "Resources",
  "Content",
  "ios-content.json"
);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

function normalized(value) {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("en");
}

expect(fs.existsSync(translationPath), "Missing versioned Recent Topic translation table.");

const translationTable = require(translationPath);
const { topics } = require(path.join(root, "web-source", "subtopics.js"));
const sourceRows = topics.flatMap((topic) =>
  topic.subtopics.flatMap(([subtopic, , phrases]) =>
    phrases.map((english) => ({ topic: topic.id, subtopic, english }))
  )
);
const rows = translationTable.cards;

expect(translationTable.version === 1, "Translation table should use schema version 1.");
expect(Array.isArray(rows), "Translation table should expose a cards array.");
expect(sourceRows.length === 432, `Expected 432 Recent Topic phrases, found ${sourceRows.length}.`);
expect(rows.length === 432, `Expected 432 translated cards, found ${rows.length}.`);

const sourceKeys = new Set(sourceRows.map((row) => `${row.topic}::${normalized(row.english)}`));
const rowKeys = rows.map((row) => `${row.topic}::${normalized(row.english)}`);
expect(new Set(rowKeys).size === rows.length, "Translation table should not contain duplicate topic/English keys.");
expect(rowKeys.every((key) => sourceKeys.has(key)), "Translation table contains an orphan phrase.");
expect(sourceKeys.size === new Set(rowKeys).size, "Translation table does not cover every Recent Topic phrase.");

for (const row of rows) {
  expect(typeof row.subtopic === "string" && row.subtopic.length > 0, `Missing subtopic for ${row.english}.`);
  expect(typeof row.chinese === "string" && row.chinese.length > 0, `Missing Chinese for ${row.english}.`);
  expect(["adjective", "verb"].includes(row.type), `Invalid card type for ${row.english}.`);
  expect(row.english.includes(row.highlightEnglish), `English highlight is outside ${row.english}.`);
  expect(row.chinese.includes(row.highlightChinese), `Chinese highlight is outside ${row.chinese}.`);
  expect(!/[�]|涓|鎷|锟|\?\?\?\?/.test(row.chinese), `Mojibake found in ${row.english}.`);
}

globalThis.window = globalThis;
require(path.join(root, "web-source", "synonym-curation.js"));
require(path.join(root, "web-source", "data.js"));
const originalCards = globalThis.FLASHCARD_DATA || [];
const exactDuplicateCount = sourceRows.filter((row) =>
  originalCards.some(
    (card) => card.topic === row.topic && normalized(card.backEnglish) === normalized(row.english)
  )
).length;

expect(originalCards.length === 556, `Expected 556 original cards, found ${originalCards.length}.`);
expect(exactDuplicateCount === 18, `Expected 18 exact standalone duplicates, found ${exactDuplicateCount}.`);

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
expect(content.schemaId === "ielts-collocation-ios-content-v2", "iOS content should use schema v2.");
expect(!Object.hasOwn(content, "recentTopics"), "Runtime content should not expose recentTopics.");
expect(!Object.hasOwn(content.metadata, "subtopicCount"), "Runtime metadata should not expose subtopicCount.");
expect(content.cards.length === 970, `Expected 970 merged cards, found ${content.cards.length}.`);
expect(content.metadata.cardCount === 970, "Metadata card count should be 970.");
expect(new Set(content.cards.map((card) => card.id)).size === 970, "Merged card IDs should be unique.");

for (const sourceRow of sourceRows) {
  const matches = content.cards.filter(
    (card) => card.topic === sourceRow.topic && normalized(card.backEnglish) === normalized(sourceRow.english)
  );
  expect(matches.length === 1, `${sourceRow.topic} / ${sourceRow.english} should resolve to exactly one card.`);
}

for (const topic of content.topics) {
  const actualCount = content.cards.filter((card) => card.topic === topic.id).length;
  expect(topic.cardCount === actualCount, `${topic.id} metadata card count should equal ${actualCount}.`);
}

console.log("Recent Topic card integration checks passed.");
