const fs = require("fs");
const os = require("os");
const path = require("path");

const bundledNodeModules =
  process.env.CODEX_NODE_MODULES ||
  "/Users/hector/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";

function loadPlaywright() {
  try {
    return require("playwright");
  } catch (localError) {
    try {
      return require(path.join(bundledNodeModules, "playwright"));
    } catch (bundledError) {
      const error = new Error(
        `Playwright was not found locally or in Codex bundled modules: ${bundledNodeModules}`
      );
      error.cause = bundledError;
      throw error;
    }
  }
}

function chromeCandidates() {
  return [
    process.env.CHROME_EXECUTABLE_PATH,
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    path.join(os.homedir(), "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
}

function findChromeExecutable() {
  const executablePath = chromeCandidates().find((candidate) => fs.existsSync(candidate));
  if (!executablePath) {
    throw new Error(
      "Google Chrome was not found. Set CHROME_EXECUTABLE_PATH to the Chrome executable path."
    );
  }
  return executablePath;
}

function findExplicitChromeExecutable() {
  return [process.env.CHROME_EXECUTABLE_PATH, process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH]
    .filter(Boolean)
    .find((candidate) => fs.existsSync(candidate));
}

async function launchChrome(options = {}) {
  const { chromium } = loadPlaywright();
  const executablePath = options.executablePath || findExplicitChromeExecutable();
  const launchOptions = executablePath ? { executablePath, ...options } : options;
  return chromium.launch(launchOptions);
}

module.exports = {
  bundledNodeModules,
  findExplicitChromeExecutable,
  findChromeExecutable,
  launchChrome,
  loadPlaywright,
};
