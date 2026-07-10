const fs = require("node:fs");
const path = require("node:path");

const storePath = path.join(
  __dirname,
  "..",
  "IELTSCollocation",
  "Services",
  "LearningStore.swift"
);
const store = fs.readFileSync(storePath, "utf8");
const models = fs.readFileSync(
  path.join(__dirname, "..", "IELTSCollocation", "Models", "LearningModels.swift"),
  "utf8"
);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

for (const required of [
  "dailyStudyProgressKey",
  "prepareDailySession(topicId:",
  "dailySession(topicId:",
  "nextDailyCard(topicId:",
  "completeDailyCard(topicId:",
  "card(topicId: String, englishPhrase: String)",
  "persistDailyStudyProgress()",
]) {
  expect(store.includes(required), `LearningStore should provide ${required}`);
}

expect(
  store.includes("Calendar.current.startOfDay"),
  "Daily study progress should use the user's local calendar day."
);
expect(
  !store.includes("func filteredCards("),
  "Removed topic search/filter behavior should not remain in LearningStore."
);
expect(
  !store.includes("enum PracticeMode"),
  "Removed All/Due/Weak modes should not remain in LearningStore."
);
expect(
  !models.includes("searchableText") && !models.includes("searchableTerms"),
  "Deleted topic search should not leave obsolete search indexes in the card models."
);

console.log("Daily study store checks passed.");
