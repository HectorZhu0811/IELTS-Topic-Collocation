const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

function loadPlaywright() {
  try {
    return require("playwright");
  } catch (error) {
    return require("C:/Users/69064/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright");
  }
}

const { chromium } = loadPlaywright();

(async () => {
  const dir = __dirname;
  const targetFile = process.argv[2] || "index.html";
  const targetName = path.basename(targetFile, path.extname(targetFile)).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const screenshotDir = path.join(dir, "screenshots");
  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  const fileUrl = `${pathToFileURL(path.join(dir, targetFile)).href}#topic/Environment`;
  await page.goto(fileUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector(".flashcard-shell", { timeout: 10000 });

  const initial = await page.evaluate(() => ({
    cards: document.querySelectorAll(".flashcard-shell").length,
    normalNetworks: document.querySelectorAll(".topic-sections .synonym-network").length,
    title: document.querySelector("h1")?.textContent || ""
  }));

  await page.fill("#searchInput", "grave");
  await page.waitForTimeout(250);
  const search = await page.evaluate(() => ({
    cards: document.querySelectorAll(".flashcard-shell").length,
    visibleCount: document.querySelector("#visibleCount")?.textContent || ""
  }));
  await page.fill("#searchInput", "");
  await page.waitForTimeout(250);
  await page.click("#zenButton");
  await page.waitForSelector(".zen-card", { timeout: 10000 });
  const zen = await page.evaluate(() => ({
    panels: document.querySelectorAll(".zen-page .zen-synonym-panel").length,
    stageColumns: getComputedStyle(document.querySelector(".zen-stage")).gridTemplateColumns,
    foldedNetworks: document.querySelectorAll(".zen-page details.synonym-network").length,
    foldedGroups: document.querySelectorAll(".zen-page details.synonym-group").length,
    coreBlocks: document.querySelectorAll(".zen-page .synonym-core").length,
    keyBlocks: document.querySelectorAll(".zen-page .zen-synonym-key").length,
    totalBadges: document.querySelectorAll(".zen-page .zen-synonym-head .synonym-total").length,
    count: document.querySelector(".zen-count")?.textContent || ""
  }));

  const panelText = await page.locator(".zen-synonym-panel").first().innerText();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(150);
  const afterRight = await page.locator(".zen-count").innerText();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(150);
  const afterLeft = await page.locator(".zen-count").innerText();

  const desktopShot = path.join(screenshotDir, `${targetName}-desktop-technology-synonyms.png`);
  await page.screenshot({ path: desktopShot, fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileShot = path.join(screenshotDir, `${targetName}-mobile-technology-synonyms.png`);
  await page.screenshot({ path: mobileShot, fullPage: true });

  await browser.close();

  const result = {
    targetFile,
    initial,
    zen,
    panelContains: {
      microContext: panelText.includes("Micro-context"),
      stance: ["POSITIVE", "NEUTRAL", "NEGATIVE"].some((label) => panelText.toUpperCase().includes(label)),
      example: panelText.includes("Example:"),
      synonymHeading: panelText.includes("Synonyms / Alternatives")
    },
    keyboard: { afterRight, afterLeft },
    search,
    errors,
    screenshots: [desktopShot, mobileShot]
  };

  console.log(JSON.stringify(result, null, 2));
  if (
    errors.length ||
    initial.cards <= 0 ||
    initial.normalNetworks !== 0 ||
    zen.panels !== 1 ||
    zen.foldedNetworks !== 0 ||
    zen.foldedGroups !== 0 ||
    zen.coreBlocks !== 0 ||
    zen.keyBlocks !== 0 ||
    zen.totalBadges !== 0 ||
    result.panelContains.microContext ||
    !result.panelContains.stance ||
    result.panelContains.example ||
    !result.panelContains.synonymHeading ||
    afterRight === zen.count ||
    afterLeft !== zen.count ||
    search.cards <= 0
  ) {
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
