# TestFlight Release Checklist

## Current Build Status

- Native SwiftUI simulator build: passed.
- iPhone 17 Pro run: passed.
- iPhone 17e small-screen run: passed.
- iPhone 17 Pro Max run: passed.
- Generic iOS Release archive: blocked at signing.

## Signing Blocker

The Release archive reaches Xcode signing validation, then stops with:

```text
Signing for "IELTSCollocation" requires a development team.
Select a development team in the Signing & Capabilities editor.
```

The local keychain check also returned:

```text
0 valid identities found
```

This means the app code is ready for the next TestFlight step, but this Mac/Xcode session still needs the paid Apple Developer Program team selected and signing certificates/profiles available.

## Required Xcode Steps

1. Open `ios-app/IELTSCollocation.xcodeproj`.
2. Select the `IELTSCollocation` project, then the `IELTSCollocation` target.
3. Open Signing & Capabilities.
4. Enable Automatically manage signing.
5. Select the paid Apple Developer Program team.
6. Keep bundle ID as `com.hector.ieltscollocation` unless App Store Connect reports it is unavailable.
7. If prompted, allow Xcode to create the App ID and provisioning profile.
8. Product > Archive.
9. Distribute App > App Store Connect > Upload.

## App Store Connect Setup

1. Create a new app record if one does not already exist.
2. Platform: iOS.
3. Name: IELTS Collocation.
4. Bundle ID: `com.hector.ieltscollocation`.
5. Category: Education.
6. Export compliance: no custom encryption.
7. Add beta metadata from `beta-notes.md`.
8. Add internal testers first.
9. After the build is processed, create an external tester group and submit for beta review.

## Tester Group Suggestion

Group name:

```text
IELTS Collocation Beta
```

What to test:

```text
Topic Reel, topic study, search, flashcard reveal, Mark, Memory Bank, Zen mode, Recent Topic entry, memory export/import, and responsive layout on your device.
```
