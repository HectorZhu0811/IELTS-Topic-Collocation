const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("../../scripts/browser-runtime");

const root = path.resolve(__dirname, "../..");
const previewDir = path.join(root, "visual-previews", "html");
const outputDir = path.join(root, "visual-previews", "screenshots");
const fileUrl = pathToFileURL(path.join(previewDir, "topic-deck-slim-preview.html")).href;

(async () => {
  const browser = await launchChrome({ headless: true });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1040 }, deviceScaleFactor: 1 });
  await desktop.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(250);
  await desktop.locator("#slim-preview").screenshot({
    path: path.join(outputDir, "topic-deck-slim-preview-desktop.png"),
    animations: "disabled",
  });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 });
  await mobile.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(250);
  await mobile.locator("#slim-preview").screenshot({
    path: path.join(outputDir, "topic-deck-slim-preview-mobile.png"),
    animations: "disabled",
  });

  await browser.close();
  console.log("Captured slim topic deck previews.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
