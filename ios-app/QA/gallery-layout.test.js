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
  source.indexOf("struct GalleryTopicTab: View")
);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

expect(source.includes("case gallery"), "AppTab should expose a Gallery tab.");
expect(source.includes('Label("Gallery", systemImage:'), "Gallery should use the product label in the tab bar.");
expect(!source.includes('Label("搜索", systemImage: "magnifyingglass")'), "Search should not be a bottom tab.");
expect(source.includes("@State private var galleryPath: [AppRoute] = []"), "Gallery should own an independent navigation path.");
expect(source.includes("GalleryView(store: store, path: $galleryPath)"), "The root Gallery tab should render GalleryView.");
expect(source.includes("struct GalleryView: View"), "Gallery should have a dedicated native screen.");
expect(source.includes("ScrollView(.horizontal"), "Gallery should expose horizontally scrolling topic tabs.");
expect(source.includes("GalleryMemoryFilterButton"), "Memory status percentages should be clickable filter buttons.");
expect(source.includes("GalleryMemoryDistribution"), "Gallery should display computed memory distributions.");
expect(source.includes("percentage(for:"), "Gallery percentages should be computed for each memory status.");
expect(source.includes("GalleryCardRow"), "Gallery should render compact bilingual list rows.");
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

console.log("Gallery layout checks passed.");
