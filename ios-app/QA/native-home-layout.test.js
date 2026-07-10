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
  !source.includes("case topicSearch"),
  "The removed topic search route should not remain."
);
expect(
  !source.includes("case zen"),
  "The standalone Zen route should not remain after single-card study becomes the default."
);
expect(
  !source.includes("case topicCard") && !source.includes("case recent"),
  "Recent Topic routes should be removed after their cards join the main decks."
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

const flashcardViewSection = source.match(/struct FlashcardView: View \{([\s\S]*?)\n\}\n\nstruct SingleCardStudyView/);
expect(flashcardViewSection, "FlashcardView should be present.");
expect(
  !flashcardViewSection[1].includes("Text(card.type.label)"),
  "Flashcard rows should not show card.type.label above each card."
);

const topicStudySection = source.match(/struct TopicStudyView: View \{([\s\S]*?)\n\}\n\nstruct TopicProgressHeader/);
expect(topicStudySection, "TopicStudyView should be followed by TopicProgressHeader.");
for (const removed of ["TextField(", "Picker(", "LazyVStack", "SummaryPill", "FlashcardView(", "Selected ·", "Zen mode"]) {
  expect(
    !topicStudySection[1].includes(removed),
    `TopicStudyView should not contain removed multi-card control: ${removed}`
  );
}

expect(source.includes("struct TopicProgressHeader: View"), "Topic page should render progress inside its title card.");
expect(source.includes("struct SingleCardStudyView: View"), "Topic page should render exactly one dedicated study card.");
expect(source.includes("struct NoDueTopicView: View"), "Topic page should provide a no-due/completed state.");
expect(!source.includes('Label("Recent Topic"'), "Topic study should not expose a Recent Topic button.");
expect(
  topicStudySection[1].includes("ToolbarItem(placement: .topBarTrailing)") &&
    topicStudySection[1].includes('Image(systemName: "bookmark")') &&
    topicStudySection[1].includes('.accessibilityLabel("Memory Bank")'),
  "Memory Bank should use an accessible trailing navigation-bar button."
);
expect(source.includes("今天没有待复习卡片"), "No-due state should explain that today's queue is empty.");
expect(source.includes("学习其他话题"), "No-due state should offer a route back to topic selection.");
expect(source.includes("查看全部卡片"), "No-due state should include the future gallery placeholder.");
expect(source.includes("Card Gallery 即将上线"), "Gallery placeholder should give clear feedback when tapped.");
expect(
  topicStudySection[1].includes("Notification.Name.NSCalendarDayChanged"),
  "An open topic should rebuild its daily queue when the local calendar day changes."
);
expect(!topicStudySection[1].includes("startingCardId"), "Topic study should no longer special-case Recent Topic cards.");
expect(
  topicStudySection[1].includes("case .again, .hard:") &&
    topicStudySection[1].includes("deferDailyCard(topicId:") &&
    topicStudySection[1].includes("case .good, .easy:"),
  "Again and Hard should defer the card, while Good and Easy complete it."
);

const progressHeaderSection = source.match(/struct TopicProgressHeader: View \{([\s\S]*?)\n\}\n\nstruct NoDueTopicView/);
expect(progressHeaderSection, "TopicProgressHeader should be followed by NoDueTopicView.");
expect(
  !progressHeaderSection[1].includes("TopicSoftCardBackground"),
  "Zero progress should use a neutral header instead of the old topic gradient."
);

const singleCardSection = source.match(/struct SingleCardStudyView: View \{([\s\S]*?)\n\}\n\nstruct FlippableStudyCard/);
expect(singleCardSection, "SingleCardStudyView should be followed by FlippableStudyCard.");
for (const removed of ["toggleMark", '"Save"', '"Mark"']) {
  expect(
    !singleCardSection[1].includes(removed),
    `The default single-card study surface should not include ${removed}.`
  );
}
expect(
  !singleCardSection[1].includes("TopicSoftCardBackground"),
  "Single-card study should not wrap the flippable card in a second card background."
);
expect(
  singleCardSection[1].includes("HStack(spacing: 8)") && !singleCardSection[1].includes("GridItem(.adaptive"),
  "Single-card ratings should stay in one ordered row on narrow phones."
);

expect(!source.includes("struct RecentTopicView"), "RecentTopicView should be removed.");
expect(!source.includes('label: "recent"'), "Home hero should not display a Recent count.");

console.log("Native single-card topic layout checks passed.");
