# IELTS Collocation TestFlight Notes

## Beta App Description

IELTS Collocation is an offline IELTS topic vocabulary trainer for focused collocation recall. This beta uses a native SwiftUI learning flow with bundled topic content, local review state, Memory Bank, Recent Topic practice, and Zen mode.

## What To Test

- Open Topic Reel/Home and confirm topic counts, due count, and weak/saved count load correctly.
- Open several topics and check that card lists match the expected topic.
- Search with Chinese, English, and tone keywords.
- Reveal flashcards, mark/unmark cards, and confirm Memory Bank updates immediately.
- Rate cards in normal practice and Zen mode using again, hard, good, and easy.
- Open Recent Topic and confirm a subtopic enters the related topic practice path.
- Export memory, import the exported JSON again, and confirm local state survives the round trip.
- Check layout on small iPhones, Pro-size iPhones, Pro Max, landscape, and iPad compatibility mode.

## Beta Review Notes

- Login is not required.
- No account, cloud sync, payment, or in-app purchase is included in this beta.
- The app works offline after install.
- Learning progress is stored locally on device.
- Export/import reads and writes user-selected JSON files only.
- The app does not use custom encryption beyond standard Apple platform transport/storage behavior.

## Known V1 Limits

- iPad layout is adaptive but not a dedicated tablet redesign.
- Sync across devices is not included.
- The app icon is a placeholder for TestFlight readiness and should be replaced before public App Store release.
- Optional collocation suggestions are bundled in the content data but hidden from the beta 1 UI; treat them as a beta 2.0 feature.

## Tester Instructions

Install the TestFlight build, select a topic, study at least five cards, mark one card, rate at least one card in Zen mode, then export memory from Settings. Please report device model, iOS version, any clipped text, overlapping controls, or confusing learning flow.
