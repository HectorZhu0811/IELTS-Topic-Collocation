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

expect(source.includes("struct GalleryView: View"), "Gallery should own card search.");
expect(source.includes("CardSearchMatcher.matches("), "Gallery should reuse the bilingual matcher.");
expect(source.includes('TextField("搜索中文或英文", text:'), "Gallery should expose the approved inline search prompt.");
expect(!source.includes("struct CardSearchView: View"), "Search should stay on Gallery.");
expect(!source.includes("case cardSearch"), "Search should not require a navigation route.");
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
  !preview[1].includes('.toolbar(.hidden, for: .tabBar)'),
  "Gallery preview should keep the bottom tab bar stable."
);
expect(
  preview[1].includes('.toolbar(.hidden, for: .navigationBar)'),
  "Gallery preview should keep the system navigation bar hidden across push and pop."
);
expect(
  preview[1].includes("GalleryDetailHeader"),
  "Gallery preview should use the same custom navigation chrome as Gallery."
);

console.log("Native card search checks passed.");
