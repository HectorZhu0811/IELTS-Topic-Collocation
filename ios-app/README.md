# IELTS Collocation iOS

This folder contains the native SwiftUI iOS app for the IELTS Topic Collocation trainer.

The main learning flow is native, not WebView-based. Bundled content is generated from the current web-source data and loaded from:

```text
IELTSCollocation/Resources/Content/ios-content.json
```

Current exported content target:

```text
556 cards
10 topics
54 recent subtopics
1487 synonym options bundled for beta 2.0 optional-collocation work
```

The app stores review state, marked cards, review logs, last topic, and settings locally. Export/import uses the existing `topic-collocation-memory-v1` JSON format.

## Open in Xcode

Open:

```text
ios-app/IELTSCollocation.xcodeproj
```

Use the `IELTSCollocation` scheme and an iPhone simulator.

## Refresh Bundled Content

From the project root:

```bash
node web-source/scripts/export-ios-content.js
```

This regenerates:

```text
ios-app/IELTSCollocation/Resources/Content/ios-content.json
```

## TestFlight Build Checklist

1. Open the Xcode project.
2. Select the `IELTSCollocation` target.
3. Confirm the bundle ID is `com.hector.ieltscollocation`.
4. Select the paid Apple Developer Program team for automatic signing.
5. Set version/build as needed. The current defaults are version `0.1`, build `1`.
6. Select `Any iOS Device` or a connected device.
7. Product > Archive.
8. Distribute App > App Store Connect > Upload.
9. In App Store Connect, add beta notes from `../project-docs/testflight/beta-notes.md`.
10. Add internal testers first, then create an external tester group after the build is processed.

Current local status: simulator builds pass, but Release archive is blocked until a Development Team and signing identity are available in Xcode. See `../project-docs/testflight/release-checklist.md`.
