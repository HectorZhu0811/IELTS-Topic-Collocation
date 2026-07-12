# Gallery Inline Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Gallery's pushed search page with an animated inline search field that combines text, topic, and memory-status filters in real time.

**Architecture:** Keep all transient search state inside `GalleryView`. Reuse `CardSearchMatcher` after `LearningStore.galleryCards(topicId:status:)` so topic/status filtering happens first and text filtering remains consistent with existing Chinese/English matching. Remove the now-unused `cardSearch` route and `CardSearchView`; keep card detail navigation unchanged.

**Tech Stack:** SwiftUI on iOS 17+, `List`, `@State`, `@FocusState`, `CardSearchMatcher`, Node source-contract QA, Swift rule tests, iOS Simulator build.

## Global Constraints

- The fixed Gallery header must not use a Navigation Bar or `ToolbarItem`.
- Topic tabs and memory-status filters remain visible and combine with the query using AND logic.
- Search matches only `frontChinese` and `backEnglish`.
- The header height remains stable while search expands and collapses.
- Reduce Motion removes movement while preserving immediate filtering.
- No persistence, schema, offline HTML, fuzzy search, pinyin, suggestions, history, or ranking changes.

---

### Task 1: Lock the Inline Search Contract with Failing Tests

**Files:**
- Modify: `ios-app/QA/gallery-layout.test.js`
- Modify: `ios-app/QA/native-card-search.test.js`
- Modify: `ios-app/QA/native-home-layout.test.js`

**Interfaces:**
- Consumes: `GalleryView`, `AppRoute`, `CardSearchMatcher`.
- Produces: source-contract coverage for inline state, dynamic filtering, motion handling, and route removal.

- [ ] **Step 1: Replace pushed-search expectations with inline-search expectations**

In `gallery-layout.test.js`, assert the bounded `gallerySource` includes:

```js
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
```

Update `native-card-search.test.js` to retain `CardPreviewView` safety assertions while replacing the old `CardSearchView` checks with:

```js
expect(source.includes("struct GalleryView: View"), "Gallery should own card search.");
expect(source.includes("CardSearchMatcher.matches("), "Gallery should reuse the bilingual matcher.");
expect(!source.includes("struct CardSearchView: View"), "Search should stay on Gallery.");
expect(!source.includes("case cardSearch"), "Search should not require a navigation route.");
```

Update the Gallery section in `native-home-layout.test.js` to expect `TextField`, local search state, and no `path.append(.cardSearch)`.

- [ ] **Step 2: Run the targeted tests and verify RED**

Run:

```bash
node ios-app/QA/gallery-layout.test.js
node ios-app/QA/native-card-search.test.js
node ios-app/QA/native-home-layout.test.js
```

Expected: FAIL because Gallery still pushes `.cardSearch` and has no inline search state or field.

---

### Task 2: Implement Inline Search, Combined Filtering, and Motion

**Files:**
- Modify: `ios-app/IELTSCollocation/Features/Native/NativeAppView.swift`
- Test: `ios-app/QA/gallery-layout.test.js`
- Test: `ios-app/QA/native-card-search.test.js`
- Test: `ios-app/QA/native-home-layout.test.js`

**Interfaces:**
- Consumes: `LearningStore.galleryCards(topicId:status:)`, `CardSearchMatcher.matches(query:frontChinese:backEnglish:)`, `AppRoute.cardPreview`.
- Produces: `GalleryView` inline-search state and a query-aware `GalleryEmptyState`.

- [ ] **Step 1: Remove the obsolete route and pushed search view**

Delete `case cardSearch` from `AppRoute`, delete its `destination` switch case, and delete both `CardSearchView` and `CardSearchResultRow`; the current source scan confirms Gallery is their only production entry point. Preserve `CardPreviewView` and `.cardPreview(card.id)` navigation.

- [ ] **Step 2: Add local search and accessibility state to Gallery**

Add:

```swift
@Environment(\.accessibilityReduceMotion) private var reduceMotion
@State private var isSearching = false
@State private var searchQuery = ""
@FocusState private var searchFieldFocused: Bool

private var searchAnimation: Animation? {
    reduceMotion ? nil : .snappy(duration: 0.28)
}
```

- [ ] **Step 3: Combine topic, status, and text filters**

Replace `visibleCards` with:

```swift
private var normalizedSearchQuery: String {
    searchQuery.trimmingCharacters(in: .whitespacesAndNewlines)
}

private var visibleCards: [Flashcard] {
    let scopedCards = store.galleryCards(
        topicId: selectedTopicId,
        status: selectedStatus
    )
    guard !normalizedSearchQuery.isEmpty else { return scopedCards }
    return scopedCards.filter { card in
        CardSearchMatcher.matches(
            query: normalizedSearchQuery,
            frontChinese: card.frontChinese,
            backEnglish: card.backEnglish
        )
    }
}

private var visibleCardIds: [String] {
    visibleCards.map(\.id)
}
```

- [ ] **Step 4: Morph the fixed header into an inline field**

Keep the existing `safeAreaInset` and fixed-height header. Replace the header content with a conditional branch:

```swift
HStack(alignment: .center, spacing: 12) {
    if isSearching {
        HStack(spacing: 8) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(.secondary)
            TextField("搜索中文或英文", text: animatedSearchQuery)
                .focused($searchFieldFocused)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
            if !searchQuery.isEmpty {
                Button("清除", systemImage: "xmark.circle.fill") {
                    withAnimation(searchAnimation) { searchQuery = "" }
                }
                .labelStyle(.iconOnly)
                .accessibilityLabel("清除搜索内容")
            }
        }
        .padding(.horizontal, 12)
        .frame(height: 44)
        .background(Color.primary.opacity(0.08), in: Capsule())
        .transition(.move(edge: .trailing).combined(with: .opacity))

        Button("取消") { closeSearch() }
            .frame(minHeight: 44)
    } else {
        Text("Gallery")
            .font(.largeTitle.weight(.bold))
            .transition(.move(edge: .leading).combined(with: .opacity))
        Spacer(minLength: 12)
        Button { openSearch() } label: {
            Image(systemName: "magnifyingglass")
                .font(.title2.weight(.medium))
                .frame(width: 44, height: 44)
                .background(Color.primary.opacity(0.08), in: Circle())
        }
        .accessibilityLabel("搜索")
        .accessibilityHint("在 Gallery 顶部展开搜索栏")
    }
}
.frame(height: 56)
```

Use a binding that animates query-driven row changes:

```swift
private var animatedSearchQuery: Binding<String> {
    Binding(
        get: { searchQuery },
        set: { newValue in
            withAnimation(searchAnimation) { searchQuery = newValue }
        }
    )
}
```

Add open/close helpers:

```swift
private func openSearch() {
    withAnimation(searchAnimation) { isSearching = true }
    searchFieldFocused = true
}

private func closeSearch() {
    searchFieldFocused = false
    withAnimation(searchAnimation) {
        searchQuery = ""
        isSearching = false
    }
}
```

- [ ] **Step 5: Animate list diffs and update the empty state**

Apply stable-ID animation to the List:

```swift
.animation(searchAnimation, value: visibleCardIds)
```

Pass `normalizedSearchQuery` into `GalleryEmptyState`. When non-empty, show:

```swift
return "没有找到包含“\(query)”的中文或英文卡片。"
```

Keep existing topic/status empty-state messages for an empty query.

- [ ] **Step 6: Run targeted tests and verify GREEN**

Run:

```bash
node ios-app/QA/gallery-layout.test.js
node ios-app/QA/native-card-search.test.js
node ios-app/QA/native-home-layout.test.js
```

Expected: all three print their passed messages and exit 0.

- [ ] **Step 7: Commit the implementation**

```bash
git add ios-app/IELTSCollocation/Features/Native/NativeAppView.swift \
  ios-app/QA/gallery-layout.test.js \
  ios-app/QA/native-card-search.test.js \
  ios-app/QA/native-home-layout.test.js
git commit -m "feat: add inline Gallery search"
```

---

### Task 3: Full Regression, Build, and Simulator QA

**Files:**
- Verify: `ios-app/IELTSCollocation/Features/Native/NativeAppView.swift`
- Verify: `ios-app/QA/`

**Interfaces:**
- Consumes: the completed inline Gallery search.
- Produces: fresh automated and visual evidence suitable for integration.

- [ ] **Step 1: Run all native QA**

Run every `ios-app/QA/*.test.js`, then compile and run `GalleryRulesTests`, `MemoryImportCompatibilityTests`, `DailyStudyProgressTests`, and `NativeNavigationRulesTests` with their existing source dependencies.

Expected: every JavaScript and Swift test prints its passed message and exits 0.

- [ ] **Step 2: Run a fresh Simulator build**

```bash
xcodebuild -project ios-app/IELTSCollocation.xcodeproj \
  -scheme IELTSCollocation \
  -sdk iphonesimulator \
  -configuration Debug \
  -derivedDataPath /private/tmp/ielts-gallery-build \
  CODE_SIGNING_ALLOWED=NO build
```

Expected: `** BUILD SUCCEEDED **`.

- [ ] **Step 3: Install and verify on iPhone 17 Pro**

Install the built app on Simulator `0D32E97D-1ABC-4482-9B95-1E828D057DCA`. Verify:

1. Search expands in place without changing header height.
2. Keyboard focus enters the field automatically.
3. Chinese and English input filter rows as each character is entered.
4. Topic and memory filters continue to combine with the query.
5. Clear restores the current topic/status scope.
6. Cancel clears, dismisses the keyboard, and restores `Gallery`.
7. No-match copy includes the query.
8. Home/Gallery switching keeps the search control stable.
9. Reduce Motion disables movement while filtering remains immediate.

- [ ] **Step 4: Run final hygiene checks**

```bash
git diff --check
rg -n "\\?{4}|�|涓|鎷|锟" ios-app/IELTSCollocation ios-app/QA \
  -g '*.swift' -g '*.json' -g '*.html' -g '*.tsv'
```

Expected: no whitespace errors and no mojibake matches in source content.
