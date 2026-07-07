const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("../../../../web-source/scripts/browser-runtime");

const root = path.resolve(__dirname, "../../../..");
const fileUrl = `${pathToFileURL(path.join(root, "open-here", "ielts-topic-collocation.html")).href}#topics`;
const outputDir = path.resolve(__dirname, "..", "screenshots");

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
  const browser = await launchChrome({ headless: true });

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
  await desktop.waitForSelector(".flashcard-shell", { timeout: 10000 });
  const hashAfterOpen = await desktop.evaluate(() => window.location.hash);
  if (!hashAfterOpen.startsWith("#topic/")) {
    throw new Error(`Active topic did not open study route: ${hashAfterOpen}`);
  }

  await desktop.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(250);
  await desktop.goto(`${fileUrl.replace("#topics", "#topic/Urbanization")}`, { waitUntil: "domcontentloaded" });
  await desktop.waitForSelector(".recent-topic-inline", { timeout: 10000 });
  await desktop.screenshot({
    path: path.join(outputDir, "recent-topic-inline-desktop.png"),
    fullPage: true,
    animations: "disabled",
  });
  const hashAfterInlineRecent = await desktop.evaluate(() => window.location.hash);
  if (!hashAfterInlineRecent.startsWith("#topic/")) {
    throw new Error(`Inline Recent Topic did not stay on topic route: ${hashAfterInlineRecent}`);
  }

  await desktop.goto(`${fileUrl.replace("#topics", "#recent/Urbanization")}`, { waitUntil: "domcontentloaded" });
  await desktop.waitForSelector(".recent-focus-card", { timeout: 10000 });
  await desktop.screenshot({
    path: path.join(outputDir, "recent-topic-urbanization-desktop.png"),
    fullPage: true,
    animations: "disabled",
  });

  await desktop.click(".recent-focus-card");
  await desktop.waitForSelector(".flashcard-shell", { timeout: 10000 });
  const hashAfterSubtopic = await desktop.evaluate(() => window.location.hash);
  if (!hashAfterSubtopic.startsWith("#topic/")) {
    throw new Error(`Recent focus card did not open study route: ${hashAfterSubtopic}`);
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 });
  await captureLanding(mobile, "topic-reel-landing-mobile.png");
  await mobile.locator(".topic-reel-card").nth(0).click();
  await mobile.waitForTimeout(90);
  await mobile.screenshot({
    path: path.join(outputDir, "topic-reel-animation-mid-mobile.png"),
    fullPage: true,
  });
  await mobile.goto(`${fileUrl.replace("#topics", "#topic/Urbanization")}`, { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(250);
  await mobile.waitForSelector(".recent-topic-inline", { timeout: 10000 });
  await mobile.screenshot({
    path: path.join(outputDir, "recent-topic-inline-mobile.png"),
    fullPage: true,
    animations: "disabled",
  });

  await browser.close();
  console.log("Captured topic reel landing and verified reel interactions.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
