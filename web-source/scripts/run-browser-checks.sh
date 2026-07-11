#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_DIR="$(cd "$SOURCE_DIR/.." && pwd)"
NODE_BIN="${CODEX_NODE:-/Users/hector/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node}"

cd "$SOURCE_DIR"

"$NODE_BIN" scripts/check-browser-runtime.js
"$NODE_BIN" build-standalone.js
"$NODE_BIN" qa-topic-header.js ../open-here/ielts-topic-collocation.html
"$NODE_BIN" qa-advanced.js ../open-here/ielts-topic-collocation.html
"$NODE_BIN" qa-recent-subtopics-entry.js ../open-here/ielts-topic-collocation.html
"$NODE_BIN" "$PROJECT_DIR/project-artifacts/visual-previews/workbench/scripts/capture-topic-reel-landing.js"
