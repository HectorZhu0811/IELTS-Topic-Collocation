const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("../../scripts/browser-runtime");

const root = path.resolve(__dirname, "../..");
const previewDir = path.join(root, "visual-previews", "html");
const outputDir = path.join(root, "visual-previews", "screenshots");
const fileUrl = pathToFileURL(path.join(previewDir, "topic-deck-five-preview.html")).href;

const shots = [
  ["option-1", "topic-deck-preview-1-spotlight.png"],
  ["option-2", "topic-deck-preview-2-draw-pile.png"],
  ["option-3", "topic-deck-preview-3-fan-spread.png"],
  ["option-4", "topic-deck-preview-4-mission-board.png"],
  ["option-5", "topic-deck-preview-5-topic-reel.png"],
];

(async () => {
  const browser = await launchChrome({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1040 }, deviceScaleFactor: 1 });
  await page.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  for (const [id, filename] of shots) {
    const locator = page.locator(`#${id}`);
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
    await locator.screenshot({ path: path.join(outputDir, filename), animations: "disabled" });
  }

  await browser.close();
  console.log(`Captured ${shots.length} topic deck previews.`);
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
