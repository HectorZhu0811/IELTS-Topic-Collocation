# IELTS Topic Collocation

A standalone IELTS Writing Task 2 collocation flashcard tool for topic-based review.

## What It Includes

- Topic-based collocation cards for IELTS Writing Task 2.
- Advanced synonym and alternative wording support.
- Zen mode for focused full-screen review.
- Start Zen mode from a specific card.
- Familiar / Not familiar review states.
- Collocation bank for saved weak items.
- Search by Chinese, English, synonym, or tone.
- A standalone HTML build that can run locally without a server.

## Topics

- Technology
- Education
- Environment
- Government
- Society
- Health
- Urbanization
- Media
- Economy
- Arts

## Files

- `index.html` - source HTML entry.
- `styles.css` - app styling.
- `script.js` - app logic and interactions.
- `data.js` - flashcard data.
- `sentences.js` - sentence data.
- `task2-collocation-flashcards-advanced-standalone.html` - single-file local version.
- `build-standalone.js` - rebuilds the standalone HTML file.
- `qa-advanced.js` and `qa-topic-header.js` - browser checks for key flows.

## Use Locally

Open this file in a browser:

```text
task2-collocation-flashcards-advanced-standalone.html
```

No installation is required for ordinary study use.

## Rebuild Standalone

```bash
node build-standalone.js
```

## Run Checks

```bash
node qa-topic-header.js task2-collocation-flashcards-advanced-standalone.html
node qa-advanced.js task2-collocation-flashcards-advanced-standalone.html
```

The QA scripts use Playwright/Chrome to verify the main study page, topic header, Zen mode, synonym panel, search, and navigation behavior.

## Repository Name

`IELTS-Topic-Collocation`
