# Project Working Rules

## User-Facing Deliverables

- Keep files that a non-technical user should open in `open-here/`.
- The main offline learning tool is `open-here/ielts-topic-collocation.html`.
- Do not name a standalone HTML deliverable `index.html` by default. Use a short, descriptive kebab-case filename tied to the project or topic.
- Use `index.html` only when a framework, template, or deployment convention strictly requires it. If that happens, place it inside a project-named folder so the deliverable remains identifiable.

## Folder Layout

- `open-here/`: final user-facing offline files.
- `web-source/`: HTML/CSS/JS source files, generators, and browser QA scripts.
- `project-docs/`: documentation, design notes, plans, and README images.
- `project-artifacts/`: generated exports, screenshots, visual previews, QA output, and historical artifacts.

## Development Hygiene

- Do not place temporary scripts, screenshots, generated exports, or QA output at the project root.
- Regenerate the offline HTML with `node web-source/build-standalone.js`; it should update `open-here/ielts-topic-collocation.html`.
- Keep Anki exports under `project-artifacts/exports/anki/full-export/`.
- Keep browser QA screenshots under `project-artifacts/screenshots/`.
- Preserve Chinese text fidelity. Use UTF-8-safe edit/write paths and check for obvious mojibake markers after editing Chinese-heavy HTML, JS, JSON, TSV, or Markdown.
