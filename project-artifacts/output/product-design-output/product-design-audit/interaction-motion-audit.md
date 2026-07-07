# Interaction Motion Audit

Surface: IELTS Topic Collocation standalone page
Date: 2026-06-19

## Captured Steps

1. Landing topic rail
   Screenshot: `interaction-motion/01-landing-topic-rail.png`
   Health: Strong. The Apple-style rail feels calm and scannable. Motion should mainly clarify selection and horizontal affordance.

2. Topic card to study page
   Screenshot: `interaction-motion/02-study-entry.png`
   Health: Improved. The page now uses a short enter transition after topic selection, so the route change no longer feels abrupt.

3. Zen recall mode
   Screenshot: `interaction-motion/03-zen-recall.png`
   Health: Strong. Rating feedback and card transitions already carry the learning loop well.

4. Memory bank
   Screenshot: `interaction-motion/04-memory-bank.png`
   Health: Functional but static. It would benefit from subtle transitions when opening, saving, removing, and returning to study.

## Animation Priorities

1. Topic selection entry transition
   Status: Implemented.
   Recommendation: Keep it short, around 350-450ms, with light fade and upward movement. It should signal that the user has entered a new learning context.

2. Topic rail interaction
   Recommendation: Add a pressed state for topic cards, such as a tiny scale-down on pointer down and a soft lift on hover or focus. Avoid full card expansion because the rail already scrolls horizontally.

3. Search and practice mode filtering
   Recommendation: Animate result changes with a light opacity transition or a small stagger for the first row only. Do not animate every card in the full 80-card grid; it may feel slow and visually noisy.

4. Memory bank open and close
   Recommendation: Add a page-level fade/slide similar to topic entry. The bank is a secondary workspace, so the transition should feel like opening a drawer, not a dramatic page change.

5. Mark / remove saved cards
   Recommendation: Add immediate micro-feedback: button press, saved state pulse, and remove-item collapse. This is high value because it confirms a memory action.

6. Flashcard flip
   Recommendation: Keep the current card flip behavior, but consider a slightly stronger transform on the card face. This is a core recall action and can tolerate a more tactile animation.

7. Zen completion and review rating
   Status: Already strong.
   Recommendation: Preserve the current animation language. If adding anything, use only a final completion flourish when the session ends.

8. Import / export memory
   Recommendation: Add a small toast or status transition. These actions currently feel operational; a visible success state would reduce uncertainty.

## Accessibility Notes

- Keep `prefers-reduced-motion` support for all new motion.
- Avoid long staggered animations on dense card grids.
- Do not rely on animation alone to show state changes; maintain text labels, active styles, and focus states.
