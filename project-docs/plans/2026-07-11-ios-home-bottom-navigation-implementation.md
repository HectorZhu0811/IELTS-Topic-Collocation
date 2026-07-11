# iOS Home Bottom Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the redundant native home header with a due-ratio continuation card, add the requested three-tab bottom navigation, and provide read-only Chinese/English card search with independent previews.

**Architecture:** Keep `LearningStore` as the learning-data owner, add a Foundation-only rules file for deterministic continuation selection and search matching, and use a native iOS 17 `TabView` with one `NavigationStack` per tab. Reuse the existing study-card visual components; the new preview supplies no review mutation closures.

**Tech Stack:** Swift 5, SwiftUI, Foundation, iOS 17+, Node.js source-contract checks, `swiftc` rule tests, `xcodebuild`, iOS Simulator 26.5.

## Global Constraints

- Bottom navigation labels are exactly `全部话题`, `Memory Bank`, and `搜索`.
- Search only `frontChinese` and `backEnglish`; do not search tone, card type, or topic labels.
- Card preview must not schedule, rate, defer, complete, save, or mark a card.
- Continuation selection order is due ratio, absolute due count, recent topic, then topic ID.
- If every topic has zero due cards, use the most recently studied valid topic and show a completed state.
- Preserve iOS 17 compatibility; do not use the iOS 18 `Tab` initializer API.
- Preserve existing review persistence, Memory Bank import/export, and single-card study behavior.
- Preserve UTF-8 Chinese text fidelity.
- Do not modify unrelated dirty files or app-icon work.

---

### Task 1: Add Pure Continuation and Search Rules

**Files:**
- Create: `ios-app/QA/NativeNavigationRulesTests.swift`
- Create: `ios-app/IELTSCollocation/Models/NativeNavigationRules.swift`
- Modify: `ios-app/IELTSCollocation.xcodeproj/project.pbxproj`

**Interfaces:**
- Consumes: topic IDs, due counts, topic totals, recent topic ID, query, card Chinese, and card English.
- Produces: `TopicDueSnapshot`, `ContinuationTopicSelector.select(from:recentTopicId:) -> String?`, and `CardSearchMatcher.matches(query:frontChinese:backEnglish:) -> Bool`.

- [ ] **Step 1: Write the failing pure-rule test**

Create the executable test with this wrapper and assertions:

```swift
import Foundation

@main
struct NativeNavigationRulesTests {
    static func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
        guard condition() else {
            fputs("FAIL: \(message)\n", stderr)
            exit(1)
        }
    }

    static func main() {
let ratioWinner = ContinuationTopicSelector.select(
    from: [
        TopicDueSnapshot(topicId: "Education", dueCount: 60, totalCount: 100),
        TopicDueSnapshot(topicId: "Technology", dueCount: 40, totalCount: 50)
    ],
    recentTopicId: "Education"
)
expect(ratioWinner == "Technology", "highest due ratio should win")

let absoluteWinner = ContinuationTopicSelector.select(
    from: [
        TopicDueSnapshot(topicId: "Arts", dueCount: 20, totalCount: 40),
        TopicDueSnapshot(topicId: "Society", dueCount: 30, totalCount: 60)
    ],
    recentTopicId: nil
)
expect(absoluteWinner == "Society", "absolute due count should break ratio ties")

let recentWinner = ContinuationTopicSelector.select(
    from: [
        TopicDueSnapshot(topicId: "Arts", dueCount: 20, totalCount: 40),
        TopicDueSnapshot(topicId: "Society", dueCount: 20, totalCount: 40)
    ],
    recentTopicId: "Society"
)
expect(recentWinner == "Society", "recent topic should break equal count ties")

let zeroWinner = ContinuationTopicSelector.select(
    from: [
        TopicDueSnapshot(topicId: "Education", dueCount: 0, totalCount: 100),
        TopicDueSnapshot(topicId: "Technology", dueCount: 0, totalCount: 50)
    ],
    recentTopicId: "Technology"
)
expect(zeroWinner == "Technology", "zero-due state should use the recent topic")

expect(
    CardSearchMatcher.matches(
        query: "  PUBLIC EDUCATION  ",
        frontChinese: "改善公共教育质量",
        backEnglish: "improve the quality of public education"
    ),
    "English should match case-insensitively after trimming"
)
expect(
    CardSearchMatcher.matches(
        query: "公共教育",
        frontChinese: "改善公共教育质量",
        backEnglish: "improve the quality of public education"
    ),
    "Chinese should match"
)
expect(
    !CardSearchMatcher.matches(
        query: "formal",
        frontChinese: "改善公共教育质量",
        backEnglish: "improve the quality of public education"
    ),
    "metadata outside Chinese and English should not match"
)

let stableWinner = ContinuationTopicSelector.select(
    from: [
        TopicDueSnapshot(topicId: "Technology", dueCount: 10, totalCount: 20),
        TopicDueSnapshot(topicId: "Education", dueCount: 10, totalCount: 20)
    ],
    recentTopicId: nil
)
expect(stableWinner == "Education", "topic ID should provide the final tie break")
expect(
    !CardSearchMatcher.matches(
        query: "   ",
        frontChinese: "改善公共教育质量",
        backEnglish: "improve the quality of public education"
    ),
    "blank queries should not match every card"
)

        print("Native navigation rule checks passed.")
    }
}
```

- [ ] **Step 2: Verify the test fails for the missing types**

Run:

```bash
xcrun swiftc ios-app/QA/NativeNavigationRulesTests.swift   -o /tmp/native-navigation-rules-tests
```

Expected: compilation fails because the three rule types are undefined.

- [ ] **Step 3: Implement the minimal Foundation-only rules**

Create:

```swift
import Foundation

struct TopicDueSnapshot: Equatable {
    let topicId: String
    let dueCount: Int
    let totalCount: Int

    var dueRatio: Double {
        guard totalCount > 0 else { return 0 }
        return Double(dueCount) / Double(totalCount)
    }
}

enum ContinuationTopicSelector {
    static func select(
        from snapshots: [TopicDueSnapshot],
        recentTopicId: String?
    ) -> String? {
        guard !snapshots.isEmpty else { return nil }

        if snapshots.allSatisfy({ $0.dueCount == 0 }),
           let recentTopicId,
           snapshots.contains(where: { $0.topicId == recentTopicId }) {
            return recentTopicId
        }

        return snapshots.sorted { left, right in
            if left.dueRatio != right.dueRatio { return left.dueRatio > right.dueRatio }
            if left.dueCount != right.dueCount { return left.dueCount > right.dueCount }
            if let recentTopicId {
                let leftIsRecent = left.topicId == recentTopicId
                let rightIsRecent = right.topicId == recentTopicId
                if leftIsRecent != rightIsRecent { return leftIsRecent }
            }
            return left.topicId < right.topicId
        }.first?.topicId
    }
}

enum CardSearchMatcher {
    static func matches(
        query: String,
        frontChinese: String,
        backEnglish: String
    ) -> Bool {
        let normalized = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalized.isEmpty else { return false }
        return frontChinese.localizedCaseInsensitiveContains(normalized)
            || backEnglish.localizedCaseInsensitiveContains(normalized)
    }
}
```

Add PBX build-file ID `1A000000000000000000000B`, file-reference ID `1A000000000000000000001B`, the `Models/NativeNavigationRules.swift` file reference, and the build file to the Sources phase.

- [ ] **Step 4: Verify the rule tests pass**

Run:

```bash
xcrun swiftc   ios-app/IELTSCollocation/Models/NativeNavigationRules.swift   ios-app/QA/NativeNavigationRulesTests.swift   -o /tmp/native-navigation-rules-tests   && /tmp/native-navigation-rules-tests
```

Expected: `Native navigation rule checks passed.`

- [ ] **Step 5: Commit the rule layer**

```bash
git add ios-app/IELTSCollocation/Models/NativeNavigationRules.swift   ios-app/QA/NativeNavigationRulesTests.swift   ios-app/IELTSCollocation.xcodeproj/project.pbxproj
git commit -m "feat: add native navigation rules"
```

### Task 2: Wire Store Adapters and the Three-Tab Shell

**Files:**
- Modify: `ios-app/QA/native-home-layout.test.js`
- Modify: `ios-app/IELTSCollocation/Services/LearningStore.swift`
- Modify: `ios-app/IELTSCollocation/Features/Native/NativeAppView.swift`

**Interfaces:**
- Consumes: Task 1 rule types, existing `Topic`, `Flashcard`, `AppRoute`, and learning data.
- Produces: `LearningStore.continuationTopic() -> Topic?`, `LearningStore.searchCards(query:) -> [Flashcard]`, `AppTab`, per-tab paths, and the dynamic continuation card.

- [ ] **Step 1: Extend the source-contract test first**

Add assertions requiring:

```javascript
expect(!source.includes('title: "IELTS Collocation"'), "The removed home brand header must stay absent.");
expect(source.includes("TabView(selection: $selectedTab)"), "The root should use a selected TabView.");
for (const label of ['Label("全部话题"', 'Label("Memory Bank"', 'Label("搜索"']) {
  expect(source.includes(label), `Missing bottom tab: ${label}`);
}
expect(source.includes("store.continuationTopic()"), "Home should use the due-ratio selector.");
expect(source.includes('Label("继续 \\(topic.title)"'), "The action should name the selected topic.");
```

- [ ] **Step 2: Verify the source-contract test fails**

Run `node ios-app/QA/native-home-layout.test.js`.

Expected: FAIL because the TabView and selector call are absent.

- [ ] **Step 3: Add LearningStore adapters**

Add:

```swift
func continuationTopic() -> Topic? {
    let snapshots = topics.map {
        TopicDueSnapshot(
            topicId: $0.id,
            dueCount: dueCount(topicId: $0.id),
            totalCount: cards(for: $0.id).count
        )
    }
    guard let topicId = ContinuationTopicSelector.select(
        from: snapshots,
        recentTopicId: lastTopicId
    ) else { return nil }
    return topic(id: topicId)
}

func searchCards(query: String) -> [Flashcard] {
    cards.filter {
        CardSearchMatcher.matches(
            query: query,
            frontChinese: $0.frontChinese,
            backEnglish: $0.backEnglish
        )
    }
}
```

- [ ] **Step 4: Implement the iOS 17 tab shell**

Add `AppTab` cases `topics`, `memory`, and `search`. Give `NativeAppView` `selectedTab` plus three independent `[AppRoute]` paths. Each tab uses its own `NavigationStack`, `.tabItem { Label(...) }`, and `.tag(AppTab...)`.

Use this root shape, repeating the same destination switch for each stack through `TabNavigationContainer`:

```swift
enum AppTab: Hashable {
    case topics
    case memory
    case search
}

@State private var selectedTab: AppTab = .topics
@State private var topicsPath: [AppRoute] = []
@State private var memoryPath: [AppRoute] = []
@State private var searchPath: [AppRoute] = []

TabView(selection: $selectedTab) {
    TabNavigationContainer(store: store, path: $topicsPath) {
        HomeView(store: store, path: $topicsPath)
    }
    .tabItem { Label("全部话题", systemImage: "square.grid.2x2") }
    .tag(AppTab.topics)

    TabNavigationContainer(store: store, path: $memoryPath) {
        MemoryBankView(store: store, path: $memoryPath)
    }
    .tabItem { Label("Memory Bank", systemImage: "bookmark") }
    .tag(AppTab.memory)

    TabNavigationContainer(store: store, path: $searchPath) {
        CardSearchView(store: store, path: $searchPath)
    }
    .tabItem { Label("搜索", systemImage: "magnifyingglass") }
    .tag(AppTab.search)
}
```

`TabNavigationContainer` accepts `@ObservedObject var store`, `@Binding var path`, and a `@ViewBuilder` root closure. Its `navigationDestination` preserves topic and settings routing and maps `.cardPreview(let id)` to `CardPreviewView`.

- [ ] **Step 5: Remove the brand header and simplify the continuation card**

Delete the home `AppHeader`. Set `featureTopic` to `store.continuationTopic()`. Remove saved count and the Memory hero button. The primary action is:

```swift
if let topic = featureTopic {
    Button {
        store.rememberTopic(topic.id)
        path.append(.topic(topic.id))
    } label: {
        Label("继续 \(topic.title)", systemImage: "play.fill")
            .frame(maxWidth: .infinity)
    }
    .buttonStyle(
        PrimaryGlassButtonStyle(tint: topic.tint, accent: topic.accentTint)
    )
}
```

Show the selected topic's due count, or `今日已完成` when every topic has zero due cards.

- [ ] **Step 6: Verify the contract and app build**

Run:

```bash
node ios-app/QA/native-home-layout.test.js
xcodebuild   -project ios-app/IELTSCollocation.xcodeproj   -scheme IELTSCollocation   -sdk iphonesimulator   -destination 'platform=iOS Simulator,id=0D32E97D-1ABC-4482-9B95-1E828D057DCA'   -derivedDataPath project-artifacts/build/ios-home-navigation   CODE_SIGNING_ALLOWED=NO build
```

Expected: the Node check passes and the build ends with `** BUILD SUCCEEDED **`.

- [ ] **Step 7: Commit the shell and home**

```bash
git add ios-app/QA/native-home-layout.test.js   ios-app/IELTSCollocation/Services/LearningStore.swift   ios-app/IELTSCollocation/Features/Native/NativeAppView.swift
git commit -m "feat: add iOS bottom navigation"
```

### Task 3: Add Chinese/English Search and Read-Only Preview

**Files:**
- Create: `ios-app/QA/native-card-search.test.js`
- Modify: `ios-app/IELTSCollocation/Features/Native/NativeAppView.swift`

**Interfaces:**
- Consumes: `LearningStore.searchCards(query:)`, `AppRoute.cardPreview(String)`, `FlippableStudyCard`, and the search tab path.
- Produces: `CardSearchView`, `CardSearchResultRow`, and `CardPreviewView`.

- [ ] **Step 1: Write the failing search-view contract**

Create a Node check with:

```javascript
expect(source.includes("struct CardSearchView: View"), "Missing card search screen.");
expect(source.includes('.searchable(text: $query, prompt: "搜索中文或英文")'), "Missing approved prompt.");
expect(source.includes("store.searchCards(query: query)"), "Search must use the approved adapter.");
expect(source.includes("path.append(.cardPreview(card.id))"), "Results should open previews.");
expect(source.includes("struct CardPreviewView: View"), "Missing card preview.");

const preview = source.match(/struct CardPreviewView: View \{([\s\S]*?)\n\}\n\nstruct /);
expect(preview, "CardPreviewView must be a bounded component.");
for (const mutation of ["scheduleReview", "completeDailyCard", "deferDailyCard", "toggleMark"]) {
  expect(!preview[1].includes(mutation), `Preview must not call ${mutation}.`);
}
```

- [ ] **Step 2: Verify the search-view test fails**

Run `node ios-app/QA/native-card-search.test.js`.

Expected: FAIL because both new views are absent.

- [ ] **Step 3: Implement CardSearchView**

Use local `@State private var query = ""`. The core view is:

```swift
struct CardSearchView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]
    @State private var query = ""

    private var results: [Flashcard] { store.searchCards(query: query) }

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 12) {
                if query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                    EmptyStateView(title: "搜索卡片", message: "输入中文或英文搜索卡片")
                } else if results.isEmpty {
                    EmptyStateView(title: "没有找到匹配卡片", message: "尝试更换中文或英文关键词")
                } else {
                    ForEach(results) { card in
                        Button {
                            path.append(.cardPreview(card.id))
                        } label: {
                            CardSearchResultRow(card: card, topic: store.topic(id: card.topic))
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .padding(16)
        }
        .background(AppBackground())
.searchable(text: $query, prompt: "搜索中文或英文")
.navigationTitle("搜索")
.navigationBarTitleDisplayMode(.inline)
    }
}
```

- [ ] **Step 4: Implement CardPreviewView**

Use `@Environment(\.accessibilityReduceMotion)` and local `@State private var revealed = false`. The preview body is:

```swift
Button {
    withAnimation(reduceMotion ? nil : .spring(response: 0.48, dampingFraction: 0.84)) {
        revealed.toggle()
    }
} label: {
    FlippableStudyCard(
        card: card,
        topic: store.topic(id: card.topic),
        revealed: revealed,
        minHeight: 390,
        frontSubtitle: "轻点查看英文"
    )
}
.buttonStyle(.plain)
.accessibilityLabel(revealed ? card.backEnglish : card.frontChinese)
.accessibilityHint(revealed ? "轻点返回中文" : "轻点查看英文")
.toolbar(.hidden, for: .tabBar)
```

Render no ratings or mark controls. Apply `.toolbar(.hidden, for: .tabBar)` to `TopicStudyView` as well.

- [ ] **Step 5: Verify search, regressions, and build**

Run:

```bash
node ios-app/QA/native-card-search.test.js
node ios-app/QA/native-home-layout.test.js
node ios-app/QA/recent-topic-card-integration.test.js
xcodebuild   -project ios-app/IELTSCollocation.xcodeproj   -scheme IELTSCollocation   -sdk iphonesimulator   -destination 'platform=iOS Simulator,id=0D32E97D-1ABC-4482-9B95-1E828D057DCA'   -derivedDataPath project-artifacts/build/ios-home-navigation   CODE_SIGNING_ALLOWED=NO build
```

Expected: all checks pass and the build ends with `** BUILD SUCCEEDED **`.

- [ ] **Step 6: Commit search and preview**

```bash
git add ios-app/QA/native-card-search.test.js   ios-app/IELTSCollocation/Features/Native/NativeAppView.swift
git commit -m "feat: add native card search preview"
```

### Task 4: Run Full Regression and Simulator Visual QA

**Files:**
- Create: `project-artifacts/screenshots/ios-bottom-navigation/01-all-topics.png`
- Create: `project-artifacts/screenshots/ios-bottom-navigation/02-memory-bank.png`
- Create: `project-artifacts/screenshots/ios-bottom-navigation/03-search.png`
- Create: `project-artifacts/screenshots/ios-bottom-navigation/04-card-preview.png`

**Interfaces:**
- Consumes: completed app build and booted iPhone 17 Pro simulator.
- Produces: fresh test/build evidence and accepted screenshots for all root states.

- [ ] **Step 1: Run every native QA check**

```bash
set -e
node ios-app/QA/native-home-layout.test.js
node ios-app/QA/native-card-search.test.js
node ios-app/QA/recent-topic-card-integration.test.js
node ios-app/QA/daily-study-store.test.js
xcrun swiftc   ios-app/IELTSCollocation/Models/NativeNavigationRules.swift   ios-app/QA/NativeNavigationRulesTests.swift   -o /tmp/native-navigation-rules-tests
/tmp/native-navigation-rules-tests
xcrun swiftc   ios-app/IELTSCollocation/Models/LearningModels.swift   ios-app/QA/DailyStudyProgressTests.swift   -o /tmp/daily-study-progress-tests
/tmp/daily-study-progress-tests
```

Expected: every command exits 0 and prints its success message.

- [ ] **Step 2: Run a clean simulator build**

```bash
rm -rf project-artifacts/build/ios-home-navigation-final
xcodebuild   -project ios-app/IELTSCollocation.xcodeproj   -scheme IELTSCollocation   -sdk iphonesimulator   -destination 'platform=iOS Simulator,id=0D32E97D-1ABC-4482-9B95-1E828D057DCA'   -derivedDataPath project-artifacts/build/ios-home-navigation-final   CODE_SIGNING_ALLOWED=NO build
```

Expected: `** BUILD SUCCEEDED **`.

- [ ] **Step 3: Install, launch, and capture four states**

Install the built app with `xcrun simctl install`, launch `com.hector.ieltscollocation`, and save the four named screenshots. Verify the old header is absent, the continuation action names the ratio-selected topic, all three tabs work, Chinese/English search returns cards, and preview has no rating controls.

- [ ] **Step 4: Check text fidelity and diff scope**

```bash
rg -n "\?\?\?\?|�|涓|鎷|锟"   ios-app/IELTSCollocation ios-app/QA   project-docs/specs/2026-07-11-ios-home-bottom-navigation-design.md   project-docs/plans/2026-07-11-ios-home-bottom-navigation-implementation.md || true
git diff --check
git status --short
```

Expected: no mojibake hits in modified text, no whitespace errors, and unrelated dirty files remain untouched.

- [ ] **Step 5: Perform the final acceptance checklist**

Confirm individually:

- Old `IELTS Collocation` home card is absent.
- `继续 <Topic>` matches the selector for current data.
- All three requested tabs are reachable.
- Search matches Chinese and English only and survives a tab switch.
- Preview flips without mutating review state.
- Topic study hides the tab bar and scheduling still works.
- Memory Bank settings remain reachable.

If a correction is required, add a failing regression assertion first, fix it, rerun the full gate, and commit only the correction files.
