# Native Android Migration Audit

## Current Android runtime

- `app/src/main/java/com/hector/topiccollocation/MainActivity.java` creates a `WebView`.
- `webView.loadUrl("file:///android_asset/www/index.html")` is the UI entry.
- `app/build.gradle` copies the standalone HTML into `src/main/assets/www/index.html` before build.

## Current bridge/storage behavior

- `AndroidMemory.saveMemory` exports the JSON memory payload from JavaScript to an Android app download/file location.
- `AndroidMemory.backupMemory` writes an automatic `memory-autobackup.json` copy after review changes.
- `WebChromeClient.onShowFileChooser` handles the file picker used by the HTML import flow.
- WebView DOM storage and `localStorage` hold runtime state for banked cards, review records, review logs, and Zen progress.
- JSON memory payload preservation is required so existing exports can continue to round-trip.

## Native data boundary

- `data.js` is the current card/content source.
- `script.js` is the current scheduling and import/export behavior source.
- Native Compose should preserve and import the `topic-collocation-memory-v1` JSON shape and scheduling fields, including `reviewCount`, `wrongCount`, `lapseCount`, `ease`, `intervalDays`, `lastReviewedAt`, `nextReviewAt`, and `status`.

## Native replacement target

- Runtime UI must be Jetpack Compose, not WebView.
- Existing JS/HTML remains only as a content and behavior reference.
- Review memory must keep the same scheduling fields so old JSON exports can be imported.
