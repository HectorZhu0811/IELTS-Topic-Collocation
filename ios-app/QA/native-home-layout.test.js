const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "IELTSCollocation", "Features", "Native", "NativeAppView.swift"),
  "utf8"
);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

expect(source.includes("TabView(selection: $selectedTab)"), "The root should use a selected native TabView.");
expect(source.includes("@State private var selectedTab: AppTab = .home"), "Home should be the default selected tab.");
expect(source.includes("@State private var homePath: [AppRoute] = []"), "Home should preserve an independent navigation path.");
expect(source.includes("@State private var galleryPath: [AppRoute] = []"), "Gallery should preserve an independent navigation path.");

for (const [label, icon] of [
  ["首页", "house.fill"],
  ["全部话题", "square.grid.2x2"],
  ["Gallery", "rectangle.grid.2x2"],
]) {
  expect(
    source.includes(`Label("${label}", systemImage: "${icon}")`),
    `Missing bottom tab: ${label} / ${icon}`
  );
}
expect(!source.includes('Label("搜索", systemImage: "magnifyingglass")'), "Search should not be a bottom tab.");
expect(!source.includes("case cardSearch"), "Gallery search should not create a navigation route.");
expect(!source.includes("Memory Bank"), "The obsolete Memory Bank label must stay absent.");
expect(!source.includes("MemoryReviewView"), "The obsolete Memory Bank review route must stay absent.");

const homeSection = source.match(
  /struct HomeView: View \{([\s\S]*?)\n\}\n\nstruct HomeOverviewPlaceholder/
);
expect(homeSection, "HomeView should be followed by the learning overview placeholder.");
expect(!homeSection[1].includes("rankedTopics"), "Home should not rank the full topic grid.");
expect(!homeSection[1].includes("LazyVGrid"), "Home should not render topic cards.");
expect(homeSection[1].includes('Text("今日学习")'), "Home should retain the Today card.");

const allTopicsSection = source.match(
  /struct AllTopicsView: View \{([\s\S]*?)\n\}\n\nstruct TopicStudyView/
);
expect(allTopicsSection, "AllTopicsView should own the topic grid.");
expect(allTopicsSection[1].includes("rankedTopics"), "All Topics should retain topic ranking.");
expect(allTopicsSection[1].includes("LazyVGrid"), "All Topics should render the adaptive grid.");
expect(allTopicsSection[1].includes('.navigationTitle("全部话题")'), "All Topics should use the approved title.");

const topicStudySection = source.match(/struct TopicStudyView: View \{([\s\S]*?)\n\}\n\nstruct TopicProgressHeader/);
expect(topicStudySection, "TopicStudyView should be followed by TopicProgressHeader.");
expect(topicStudySection[1].includes("path.append(.gallery)"), "Topic study should expose a Gallery route.");
expect(topicStudySection[1].includes('.accessibilityLabel("Gallery")'), "The topic Gallery action needs an accessible label.");
expect(source.includes("今天没有待复习卡片"), "No-due state should explain that today's queue is empty.");
expect(source.includes("查看 Gallery"), "No-due state should offer a Gallery route.");

const gallerySection = source.match(/struct GalleryView: View \{([\s\S]*?)\n\}\n\nstruct GalleryTopicTab/);
expect(gallerySection, "GalleryView should be followed by its topic tab component.");
expect(gallerySection[1].includes("List {"), "Gallery should use a native List.");
expect(gallerySection[1].includes("ScrollView(.horizontal"), "Gallery should expose horizontal topic tabs.");
expect(gallerySection[1].includes("GalleryMemoryFilterButton"), "Gallery should expose clickable memory filters.");
expect(gallerySection[1].includes("GalleryCardRow"), "Gallery should render bilingual card rows.");
expect(gallerySection[1].includes("private var galleryHeader: some View"), "Gallery should use a stable custom title row.");
expect(gallerySection[1].includes(".toolbar(.hidden, for: .navigationBar)"), "Gallery should hide the animated system navigation bar.");
expect(!gallerySection[1].includes('.navigationTitle("Gallery")'), "Gallery should not mix a system title with its custom title row.");
expect(gallerySection[1].includes("@State private var isSearching = false"), "Gallery should own inline search presentation state.");
expect(gallerySection[1].includes('TextField("搜索中文或英文", text:'), "Gallery should render inline search in its header.");
expect(!gallerySection[1].includes("path.append(.cardSearch)"), "Gallery search should not navigate away.");
expect(!gallerySection[1].includes("开始学习"), "Gallery should not include a start-learning button.");
expect(!gallerySection[1].includes("开始复习"), "Gallery should not include a start-review button.");

console.log("Native home and Gallery layout checks passed.");
