const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("../../scripts/browser-runtime");

const root = path.resolve(__dirname, "../..");
const previewDir = path.join(root, "visual-previews", "html");
const outputDir = path.join(root, "visual-previews", "screenshots");
const fileUrl = pathToFileURL(path.join(previewDir, "homepage-figma-inspired-preview.html")).href;

(async () => {
  const browser = await launchChrome({ headless: true });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });
  await desktop.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(250);
  await desktop.screenshot({
    path: path.join(outputDir, "homepage-figma-inspired-desktop.png"),
    fullPage: true,
    animations: "disabled",
  });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 });
  await mobile.goto(fileUrl, { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(250);
  await mobile.screenshot({
    path: path.join(outputDir, "homepage-figma-inspired-mobile.png"),
    fullPage: true,
    animations: "disabled",
  });

  await browser.close();
  console.log("Captured Figma-inspired homepage previews.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
