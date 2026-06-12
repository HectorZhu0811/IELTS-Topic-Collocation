# Native Android Release Checklist

Updated: 2026-06-12

- [x] Unit tests pass. Verified `:app:testDebugUnitTest` completed successfully.
- [x] Debug APK builds. Verified `:app:assembleDebug` completed successfully.
- [ ] App launches to native Today screen. Not manually verified; no emulator or device launch was performed.
- [x] No WebView runtime UI is present. Verified no matches for `WebView|loadUrl|android_asset/www|AndroidView|file:///android_asset` under `app/src/main/java`.
- [x] Topics list shows 10 topics. Verified `app/src/main/assets/data/topics.json` parses as UTF-8 JSON and contains 10 topics; runtime UI display was not manually launched.
- [ ] Zen review can flip, rate, and advance cards. Not manually verified in an emulator or device.
- [ ] Review memory survives app restart. Not manually verified across an app restart.
- [ ] Export memory JSON works. JSON serialization logic passed unit tests, but the Android document export flow was not manually verified.
- [ ] Import memory JSON works. JSON decode/import merge logic passed unit tests, but the Android document import flow was not manually verified.
- [ ] Chinese text renders correctly. UTF-8 data files were inspected successfully, but native device rendering was not manually verified.

## Verification Evidence

- `:app:testDebugUnitTest`: passed.
- `:app:assembleDebug`: passed.
- APK path: `app/build/outputs/apk/debug/app-debug.apk`.
- Native source WebView search: no matches under `app/src/main/java`.
