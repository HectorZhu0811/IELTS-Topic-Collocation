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
const gallerySource = source.slice(
  source.indexOf("struct GalleryView: View"),
  source.indexOf("struct GalleryTopicPickerButton: View")
);
const cardPreviewSource = source.slice(
  source.indexOf("struct CardPreviewView: View"),
  source.indexOf("struct HomeView: View")
);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

expect(source.includes("case gallery"), "AppTab should expose a Gallery tab.");
expect(source.includes('Label("Gallery", systemImage:'), "Gallery should use the product label in the tab bar.");
expect(!source.includes('Label("搜索", systemImage: "magnifyingglass")'), "Search should not be a bottom tab.");
expect(source.includes("@State private var galleryPath: [AppRoute] = []"), "Gallery should own an independent navigation path.");
expect(source.includes("GalleryView(store: store, path: $galleryPath)"), "The root Gallery tab should render GalleryView.");
expect(
  source.includes("initialTopicId: GalleryNavigationRules.initialTopicId(for: path.wrappedValue)"),
  "Pushed Gallery should receive the parent topic as its initial filter."
);
expect(source.includes("struct GalleryView: View"), "Gallery should have a dedicated native screen.");
expect(!gallerySource.includes("ScrollView(.horizontal"), "Topic selection should not require horizontal swiping.");
expect(gallerySource.includes("GalleryTopicPickerButton"), "Gallery should expose one current-topic picker capsule.");
expect(gallerySource.includes("GalleryTopicPickerSheet"), "Gallery should present all topics in a native sheet.");
expect(gallerySource.includes("isTopicPickerPresented"), "Gallery should track native topic-sheet presentation.");
expect(source.includes("GalleryMemorySegmentedControl"), "Memory status percentages should use one segmented control.");
expect(source.includes("GalleryMemoryDistribution"), "Gallery should display computed memory distributions.");
expect(source.includes("percentage(for:"), "Gallery percentages should be computed for each memory status.");
expect(source.includes("GalleryCardRow"), "Gallery should render compact bilingual list rows.");
expect(source.includes("EdgeInsets(top: 0, leading: 16, bottom: 0, trailing: 16)"), "Gallery rows should leave vertical spacing to the card container instead of relying on List insets.");
expect(source.includes("List {"), "Gallery should use a native List layout.");
expect(!source.includes("MemoryBankView"), "Memory Bank should be removed from the native UI.");
expect(!source.includes("MemoryReviewView"), "The Memory Bank review route should be removed.");
expect(!source.includes("开始复习"), "Gallery should not contain a start-learning button.");
expect(!source.includes("Memory Bank"), "The obsolete Memory Bank label should be absent from the native surface.");
expect(source.includes('Image(systemName: "magnifyingglass")'), "Search should remain available from the Gallery title row.");
expect(gallerySource.includes("private var galleryHeader: some View"), "Gallery should own a stable custom title row.");
expect(gallerySource.includes('Text("Gallery")'), "The custom title row should render the Gallery title.");
expect(gallerySource.includes("HStack(alignment: .center"), "Gallery title and search should share one centered row.");
expect(gallerySource.includes(".safeAreaInset(edge: .top"), "The title row should remain stable above the scrolling list.");
expect(gallerySource.includes(".toolbar(.hidden, for: .navigationBar)"), "Gallery should remove the animated system navigation bar.");
expect(!gallerySource.includes('.navigationTitle("Gallery")'), "Gallery should not mix a system large title with its custom title row.");
expect(!gallerySource.includes("ToolbarItem(placement: .topBarTrailing)"), "Search should not animate as a navigation toolbar item.");
expect(gallerySource.includes("private var showsBackButton: Bool"), "Pushed Gallery should expose an explicit back affordance.");
expect(gallerySource.includes("GalleryNavigationRules.backPath(from: path)"), "Gallery back should restore the parent navigation path.");
expect(gallerySource.includes('accessibilityLabel("返回")'), "Gallery back should be accessible in Chinese.");
expect(gallerySource.includes("let initialTopicId: String?"), "Gallery should accept an optional initial topic filter.");
for (const contract of [
  "@State private var isSearching = false",
  '@State private var searchQuery = ""',
  "@FocusState private var searchFieldFocused: Bool",
  "@Environment(\\.accessibilityReduceMotion)",
  'TextField("搜索中文或英文", text:',
  "CardSearchMatcher.matches(",
  ".transition(",
  ".animation(",
]) {
  expect(gallerySource.includes(contract), `Missing inline search contract: ${contract}`);
}
expect(!source.includes("case cardSearch"), "Inline search should remove the pushed search route.");
expect(!source.includes("struct CardSearchView: View"), "Inline search should remove the pushed search screen.");
expect(!gallerySource.includes("path.append(.cardSearch)"), "Gallery search must not navigate away.");
expect(
  !gallerySource.match(/selectedTopicId = (?:nil|topic\.id)\s+selectedStatus = nil/g),
  "Changing the topic should preserve the selected memory filter so topic, status, and query combine."
);

const topicPickerSource = source.slice(
  source.indexOf("struct GalleryTopicPickerButton: View"),
  source.indexOf("struct GalleryMemorySegmentedControl: View")
);
expect(topicPickerSource.includes("struct GalleryTopicPickerSheet: View"), "The topic picker should expose a native bottom-sheet list.");
expect(topicPickerSource.includes('Text("选择话题")'), "The topic sheet should have an explicit Chinese title.");
expect(topicPickerSource.includes("presentationDetents"), "The topic sheet should support medium and large detents.");
expect(topicPickerSource.includes('Image(systemName: "checkmark")'), "The selected topic should have a non-color checkmark.");
expect(topicPickerSource.includes(".frame(height: 40)"), "The current-topic capsule should remain visually compact.");

const memoryControlSource = source.slice(
  source.indexOf("struct GalleryMemorySegmentedControl: View"),
  source.indexOf("struct GalleryCardRow: View")
);
expect(memoryControlSource.includes("HStack(spacing: 8)"), "Memory filters should be independent compact capsules.");
expect(memoryControlSource.includes("ForEach(GalleryMemoryStatus.allCases)"), "The capsule row should expose all three memory states.");
expect(memoryControlSource.includes("distribution.percentage(for: status)"), "Every segment should display its live percentage.");
expect(!memoryControlSource.includes("maxWidth: .infinity"), "Memory capsules should not expand into three equal columns.");
expect(!memoryControlSource.includes("Spacer(minLength: 0)"), "The regular-width capsule row should not trigger the vertical fallback with flexible trailing space.");
expect(memoryControlSource.includes(".frame(height: 38)"), "Memory capsules should stay visually flat.");
expect(memoryControlSource.includes("Capsule()"), "Each memory filter should own a capsule shape.");
expect(memoryControlSource.includes("status.capsuleBackground"), "Each status should use its approved Home-style palette.");
expect(memoryControlSource.includes("status.iconName"), "Memory capsules should retain a non-text status icon.");
expect(memoryControlSource.includes("lineWidth: isSelected ? 1.5 : 1"), "The active status should have a stronger selected outline.");

expect(cardPreviewSource.includes("GalleryDetailHeader"), "Gallery card details should reuse custom navigation chrome.");
expect(cardPreviewSource.includes(".safeAreaInset(edge: .top"), "Gallery card details should keep their custom header in the safe area.");
expect(cardPreviewSource.includes(".toolbar(.hidden, for: .navigationBar)"), "Gallery details should not restore the system navigation bar.");
expect(!cardPreviewSource.includes(".toolbar(.hidden, for: .tabBar)"), "Gallery browsing details should keep the tab bar stable.");
expect(!cardPreviewSource.includes(".navigationTitle("), "Gallery details should not mix a system title with custom navigation chrome.");

const cardRowSource = source.slice(
  source.indexOf("struct GalleryCardRow: View"),
  source.indexOf("struct GalleryEmptyState: View")
);
expect(cardRowSource.includes("let topic: Topic?"), "Gallery rows should receive their topic palette.");
expect(cardRowSource.includes(".frame(maxWidth: .infinity, minHeight: 44, alignment: .leading)"), "Gallery rows should match the flatter reference-card height.");
expect(cardRowSource.includes(".padding(.vertical, 6)"), "Gallery rows should keep compact vertical content padding.");
expect(cardRowSource.includes(".padding(.vertical, 5)"), "Gallery cards should reserve explicit clear space outside each background.");
expect(cardRowSource.includes("TopicSoftCardBackground(topic: topic, cornerRadius: 14, shadowOpacity: 0)"), "Gallery rows should use topic colors without shadows that overlap adjacent cards.");
expect(cardRowSource.includes("GeometryReader { proxy in"), "Gallery topic artwork should measure the compact row instead of using its decorative circle's ideal size.");
expect(cardRowSource.includes(".frame(width: proxy.size.width, height: proxy.size.height)"), "Gallery topic artwork should be fixed to the measured row bounds.");
expect(cardRowSource.includes(".clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))"), "Gallery topic artwork should be clipped so decorative glows cannot overlap adjacent rows.");
expect(cardRowSource.includes("RoundedRectangle(cornerRadius: 14"), "Gallery row hit regions should match the compact card radius.");
expect(cardRowSource.includes('Image(systemName: "chevron.right")'), "Gallery rows should expose a quiet detail disclosure affordance.");
expect(!cardRowSource.includes("Text(status.label)"), "Gallery cards should not display memory-state text.");
expect(!cardRowSource.includes("status.fillColor"), "Gallery card backgrounds should not use memory-state colors.");

console.log("Gallery layout checks passed.");
