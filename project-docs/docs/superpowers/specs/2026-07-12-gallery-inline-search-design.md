# Gallery Inline Search Design

## Goal

Replace Gallery's pushed search screen with a search field that expands inside the existing fixed header. Filtering must update the visible collocation rows while the user types, without reintroducing Navigation Bar or Toolbar transition lag.

## Approved Interaction

- The collapsed header shows the large `Gallery` title on the left and the circular search button on the right.
- Tapping search morphs that same fixed-height row into an inline search field and focuses the keyboard.
- The topic tabs and memory-status filters remain visible and active while searching.
- Topic, memory status, and text query are combined with AND logic.
- Search matches only `frontChinese` and `backEnglish`, reusing `CardSearchMatcher` so Chinese trimming and case-insensitive English behavior stay consistent.
- The inline field provides a clear control. Closing search clears the query, dismisses the keyboard, and restores the title row.
- An unmatched query shows a Chinese empty state that includes the query.

## State and Data Flow

`GalleryView` owns three new pieces of local UI state:

- `isSearching`: whether the inline field is expanded.
- `searchQuery`: the current user input.
- `searchFieldFocused`: focus state for keyboard presentation.

The existing topic and status state remains unchanged. `visibleCards` first asks `LearningStore` for the topic/status-scoped cards, then applies `CardSearchMatcher` when the trimmed query is non-empty. No persistence format or review data changes are required.

The obsolete `cardSearch` route and pushed `CardSearchView` are removed. Gallery is their only production call site, and their existing QA coverage is replaced with inline-search coverage.

## Motion

- Header expansion uses one short `snappy` animation while preserving a constant header height.
- The title/search button and inline field use asymmetric opacity-and-move transitions.
- List changes animate by stable card IDs with a short opacity and vertical-offset transition.
- When Reduce Motion is enabled, header and list transitions update without movement.
- Filtering remains synchronous and local; no debounce or loading state is needed for the current data size.

## Accessibility

- The collapsed button keeps the label `搜索` and explains that it expands search in Gallery.
- The text field label and prompt explicitly mention Chinese or English cards.
- Clear and close controls have distinct VoiceOver labels.
- Interactive controls retain a minimum 44-point hit target.
- Focus moves to the field after expansion and is released when search closes.

## Verification

- Layout tests assert that Gallery owns inline search state and no longer pushes `cardSearch`.
- Rule tests continue to cover Chinese, English, whitespace, and case-insensitive matching.
- Simulator QA verifies expansion, live filtering, clear, close, combined topic/status filtering, unmatched state, Tab switching, and Reduce Motion.
- The full native QA suite and iOS Simulator build must pass.

## Out of Scope

- Fuzzy matching, pinyin matching, search history, suggestions, ranking, and persistence.
- Changes to the offline HTML version.
