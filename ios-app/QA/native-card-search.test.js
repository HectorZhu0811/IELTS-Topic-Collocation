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
  if (!condition) throw new Error(message);
}

expect(source.includes("struct CardSearchView: View"), "Missing card search screen.");
expect(
  source.includes('.searchable(text: $query, prompt: "搜索中文或英文")'),
  "Search needs the approved Chinese/English prompt."
);
expect(
  source.includes("store.searchCards(query: query)"),
  "Search must use the Chinese/English-only store adapter."
);
expect(
  source.includes("path.append(.cardPreview(card.id))"),
  "Search results should open independent previews."
);
expect(source.includes("struct CardPreviewView: View"), "Missing independent preview screen.");

const preview = source.match(
  /struct CardPreviewView: View \{([\s\S]*?)\n\}\n\nstruct /
);
expect(preview, "CardPreviewView must be a bounded component.");
for (const mutation of [
  "scheduleReview",
  "completeDailyCard",
  "deferDailyCard",
  "toggleMark",
]) {
  expect(!preview[1].includes(mutation), `Preview must not call ${mutation}.`);
}
expect(
  preview[1].includes("FlippableStudyCard("),
  "Preview should reuse the existing flippable study card."
);
expect(
  preview[1].includes('.toolbar(.hidden, for: .tabBar)'),
  "Preview should hide the bottom tab bar."
);

console.log("Native card search checks passed.");
