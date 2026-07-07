const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("./scripts/browser-runtime");

(async () => {
  const dir = __dirname;
  const targetFile = process.argv[2] || "index.html";
  const targetName = path.basename(targetFile, path.extname(targetFile)).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const screenshotDir = path.resolve(dir, "..", "project-artifacts", "screenshots", "qa");
  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await launchChrome({ headless: true });
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

  await page.fill("#searchInput", "recycling");
  await page.waitForTimeout(250);
  const search = await page.evaluate(() => ({
    cards: document.querySelectorAll(".flashcard-shell").length,
    visibleCount: document.querySelector("#visibleCount")?.textContent || ""
  }));
  await page.fill("#searchInput", "");
  await page.waitForTimeout(250);

  await page.goto(`${pathToFileURL(path.join(dir, targetFile)).href}#topic/Urbanization`, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("#searchInput", { timeout: 10000 });
  await page.fill("#searchInput", "");
  await page.waitForTimeout(250);
  await page.waitForSelector(".flashcard-shell", { timeout: 10000 });
  await page.fill("#searchInput", "modern transport infrastructure");
  await page.waitForTimeout(250);
  const groupedSearch = await page.evaluate(() => ({
    cards: document.querySelectorAll(".flashcard-shell").length,
    visibleCount: document.querySelector("#visibleCount")?.textContent || "",
    cardText: Array.from(document.querySelectorAll(".flashcard-shell")).map((card) => card.innerText)
  }));
  await page.goto(fileUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("#searchInput", { timeout: 10000 });
  await page.fill("#searchInput", "");
  await page.waitForTimeout(250);
  await page.waitForSelector(".flashcard-shell", { timeout: 10000 });

  await page.click("#zenButton");
  await page.waitForSelector(".zen-card", { timeout: 10000 });
  await page.click(".zen-card");
  await page.waitForSelector(".zen-synonym-panel", { timeout: 10000 });
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
  const desktopShot = path.join(screenshotDir, `${targetName}-desktop-environment-optional-collocations.png`);
  await page.screenshot({ path: desktopShot, fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileShot = path.join(screenshotDir, `${targetName}-mobile-environment-optional-collocations.png`);
  await page.screenshot({ path: mobileShot, fullPage: true });
  await page.setViewportSize({ width: 1280, height: 820 });

  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(150);
  const afterRight = await page.locator(".zen-count").innerText();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(150);
  const afterLeft = await page.locator(".zen-count").innerText();

  await browser.close();

  const result = {
    targetFile,
    initial,
    zen,
    panelContains: {
      microContext: panelText.includes("Micro-context"),
      stance: ["POSITIVE", "NEUTRAL", "NEGATIVE"].some((label) => panelText.toUpperCase().includes(label)),
    example: panelText.includes("Example:"),
    optionalControl: panelText.includes("Show all"),
    emptyOptional: panelText.includes("No optional collocations")
    },
    keyboard: { afterRight, afterLeft },
    search,
    groupedSearch,
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
    !result.panelContains.optionalControl ||
    result.panelContains.emptyOptional ||
    afterRight === zen.count ||
    afterLeft !== zen.count ||
    search.cards <= 0 ||
    groupedSearch.cards !== 2 ||
    !groupedSearch.cardText.some((text) => text.includes("upgrade transport infrastructure"))
  ) {
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
