const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.join(
  __dirname,
  "..",
  "IELTSCollocation",
  "Features",
  "Native",
  "NativeAppView.swift"
);
const source = fs.readFileSync(sourcePath, "utf8");

function expect(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

expect(
  !source.includes('subtitle: "Native trainer ·'),
  "Home header should not show the redundant native/card-count subtitle."
);

expect(
  source.includes("GridItem(.adaptive(minimum: 160, maximum: 240), spacing: 12)"),
  "Topic grid should use bounded adaptive columns."
);

const topicTileSection = source.match(/struct TopicTile: View \{([\s\S]*?)\n\}\n\nstruct TopicMetric/);
expect(topicTileSection, "TopicTile should be followed by the compact TopicMetric component.");
expect(
  !topicTileSection[1].includes("SummaryPill"),
  "Topic tiles should not use the wide SummaryPill component."
);

const flippableCardSection = source.match(/struct FlippableStudyCard: View \{([\s\S]*?)\n\}\n\nstruct StudyCardFace/);
expect(flippableCardSection, "FlippableStudyCard should be present.");
expect(
  !flippableCardSection[1].includes("subtitle: card.baseEnglish"),
  "Revealed flashcards should not show baseEnglish as a gray subtitle."
);
expect(
  !flippableCardSection[1].includes("subtitle: card.type.label"),
  "Flashcard fronts should not show card.type.label as a gray subtitle."
);

const flashcardViewSection = source.match(/struct FlashcardView: View \{([\s\S]*?)\n\}\n\nstruct FlippableStudyCard/);
expect(flashcardViewSection, "FlashcardView should be present.");
expect(
  !flashcardViewSection[1].includes("Text(card.type.label)"),
  "Flashcard rows should not show card.type.label above each card."
);

console.log("Native home layout checks passed.");
