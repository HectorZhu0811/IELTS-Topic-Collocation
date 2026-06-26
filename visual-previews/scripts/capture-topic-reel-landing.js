const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("/Users/hector/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const root = path.resolve(__dirname, "../..");
const fileUrl = `${pathToFileURL(path.join(root, "index.html")).href}#topics`;
const outputDir = path.join(root, "visual-previews", "screenshots");

async function captureLanding(page, filename) {
  await page.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  await page.screenshot({
    path: path.join(outputDir, filename),
    fullPage: true,
    animations: "disabled",
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1040 }, deviceScaleFactor: 1 });
  await captureLanding(desktop, "topic-reel-landing-desktop.png");

  await desktop.click(".topic-memory-card");
  await desktop.waitForTimeout(250);
  const hashAfterBank = await desktop.evaluate(() => window.location.hash);
  if (hashAfterBank !== "#bank") {
    throw new Error(`Memory bank did not open bank route: ${hashAfterBank}`);
  }

  await desktop.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(250);

  await desktop.locator(".topic-reel-card").nth(0).click();
  await desktop.waitForTimeout(90);
  await desktop.screenshot({
    path: path.join(outputDir, "topic-reel-animation-mid-desktop.png"),
    fullPage: true,
  });
  await desktop.waitForTimeout(620);
  const activeAfterSpin = await desktop.locator(".topic-reel-card.is-active > div > strong").textContent();
  if (!activeAfterSpin || activeAfterSpin.trim() === "Education") {
    throw new Error(`Candidate topic did not become active: ${activeAfterSpin}`);
  }

  await desktop.click(".topic-reel-card.is-active");
  await desktop.waitForTimeout(250);
  const hashAfterOpen = await desktop.evaluate(() => window.location.hash);
  if (!hashAfterOpen.startsWith("#topic/")) {
    throw new Error(`Active topic did not open study route: ${hashAfterOpen}`);
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 });
  await captureLanding(mobile, "topic-reel-landing-mobile.png");
  await mobile.locator(".topic-reel-card").nth(0).click();
  await mobile.waitForTimeout(90);
  await mobile.screenshot({
    path: path.join(outputDir, "topic-reel-animation-mid-mobile.png"),
    fullPage: true,
  });

  await browser.close();
  console.log("Captured topic reel landing and verified reel interactions.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
