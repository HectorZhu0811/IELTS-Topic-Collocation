# iOS Home and Bottom Navigation Design

Date: 2026-07-11

## Goal

Reduce redundant information on the native iOS home screen and make the app's three primary destinations continuously discoverable: all topics, Memory Bank, and card search.

## App Shell

Use a native SwiftUI `TabView` with three tabs:

1. `全部话题` with the `square.grid.2x2` system image.
2. `Memory Bank` with the `bookmark` system image.
3. `搜索` with the `magnifyingglass` system image.

Each tab owns its navigation history so switching tabs preserves the current search query and scroll position. The tab bar is hidden on topic-study and card-preview destinations to keep those screens focused.

## All Topics Home

Remove the complete `IELTS Collocation` header card and its settings button. The first visible element is the daily continuation card, followed by the existing topic grid.

### Continuation Topic Rule

Select the continuation topic using this priority order:

1. Highest due ratio: `due card count / total card count` for that topic.
2. If ratios are equal, select the topic with the larger absolute due count.
3. If both values are equal, prefer the most recently studied topic when it is among the tied topics.
4. If a deterministic tie still remains, use topic ID ascending.
5. If every topic has zero due cards, use the most recently studied valid topic and show the completed state.

The primary button label is dynamic, for example `继续 Education`. Tapping it opens that topic's daily single-card study flow.

The continuation card shows only actionable daily information. It does not repeat the global saved count or provide a Memory Bank button because Memory Bank is available in the bottom navigation.

## Memory Bank Tab

Reuse the existing Memory Bank screen and card behavior. Keep Settings accessible from the Memory Bank screen's top-right action. Memory Bank is no longer presented as a competing action inside the home continuation card.

## Search Tab

Search only the Chinese and English content of cards.

- Trim leading and trailing whitespace.
- Match English case-insensitively.
- Match Chinese by direct substring.
- Do not match tone, card type, topic ID, topic English title, or topic Chinese title.
- An empty query shows an instructional empty state instead of all cards.
- A query with no matches shows a clear no-results state.
- Search results display enough Chinese and English context to identify the card.

Tapping a result opens an independent card preview. The preview uses the existing front/back card language and topic color treatment, but it does not schedule, rate, defer, complete, save, or otherwise mutate review progress. Returning to Search preserves the query and results.

## Navigation and State

- `LearningStore` remains the single owner of learning data and review progress.
- Pure selection and search helpers live outside view layout code so their behavior can be tested directly.
- Tab selection and per-tab navigation paths are app-shell UI state.
- Topic study continues to remember the selected topic when it appears.
- Card preview is read-only and does not call any review mutation method.

## Accessibility

- Use native tab labels and system images so VoiceOver receives standard tab semantics.
- Search has an explicit Chinese accessibility label and a visible placeholder.
- Each search result exposes Chinese, English, and topic context as one coherent accessibility element.
- Preview flip action has an explicit accessibility hint and respects Reduce Motion.
- Interactive targets remain at least 44 by 44 points.

## Test Contract

Add automated coverage for:

1. Continuation selection chooses the highest due ratio.
2. Ratio ties use absolute due count, then recent topic, then topic ID.
3. An all-zero due state falls back to the recent topic.
4. Search matches Chinese content.
5. Search matches English content case-insensitively.
6. Search ignores whitespace around the query.
7. Search does not match tone, card type, or topic labels.
8. The app shell exposes exactly the three requested tabs.
9. The removed `IELTS Collocation` home header does not return.
10. Card preview contains no review-progress mutation action.

## Acceptance Criteria

- The app launches directly into `全部话题` without the old brand header card.
- The continuation button names and opens the topic selected by the due-ratio rule.
- All three bottom-navigation destinations work and preserve their local state when switching.
- Chinese and English card searches return relevant results only.
- A search result opens a read-only, flippable preview.
- Topic study, Memory Bank, settings, and existing review scheduling continue to work.
- The project builds successfully and the revised root flow is visually verified on the current iPhone simulator.
