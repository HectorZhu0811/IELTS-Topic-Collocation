source visual truth path: visual-previews/screenshots/homepage-minimal-topic-reel-desktop.png
implementation screenshot path: visual-previews/screenshots/topic-reel-landing-desktop.png
mobile implementation screenshot path: visual-previews/screenshots/topic-reel-landing-mobile.png
viewport: 1440 x 1040 desktop, 390 x 900 mobile
state: homepage #topics, selected priority topic

**Findings**
- No P0/P1/P2 findings.

**Implementation Checklist**
- Applied the selected minimal Topic reel homepage to the formal `index.html` flow.
- Hid the original landing header on the homepage.
- Removed the dashboard summary strip from the homepage.
- Kept the left Memory bank card, with centered text and bank navigation.
- Rendered five reel cards as two candidates above, the active topic, and two candidates below.
- Added a prominent due badge to the active topic card.
- Replaced the earlier fade transition with a slot-machine-style vertical reel animation for candidate selection.
- Preserved candidate topic selection and active topic study navigation.
- Verified desktop and mobile renders.

**Verification**
- `script.js` syntax check passed.
- `scripts/capture-topic-reel-landing.js` passed.
- Verified Memory bank opens `#bank`.
- Verified clicking a candidate makes it active.
- Verified clicking the active topic opens a `#topic/...` study route.
- Captured slot animation mid-state screenshots at `visual-previews/screenshots/topic-reel-animation-mid-desktop.png` and `visual-previews/screenshots/topic-reel-animation-mid-mobile.png`.

final result: passed
