const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("./scripts/browser-runtime");

const fileName = process.argv[2] || "index.html";
const target = `${pathToFileURL(path.join(__dirname, fileName)).href}#topic/Technology`;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

(async () => {
  const browser = await launchChrome({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1266, height: 716 } });
  await page.goto(target, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  const result = await page.evaluate(() => {
    const header = document.querySelector(".app-header");
    const toolbarTitle = document.querySelector("#toolbarTopicTitle");
    const toolbarKicker = document.querySelector("#toolbarKicker");
    const subtitle = document.querySelector("#pageSubtitle");
    const nav = document.querySelector(".study-nav");
    const toolbarBack = document.querySelector(".toolbar #backButton");
    const topicHeading = document.querySelector(".topic-heading");
    const headerStyle = getComputedStyle(header);
    const subtitleStyle = getComputedStyle(subtitle);
    const navStyle = getComputedStyle(nav);
    const toolbarBackStyle = getComputedStyle(toolbarBack);
    return {
      headerDisplay: headerStyle.display,
      toolbarTitle: toolbarTitle.textContent.trim(),
      toolbarKicker: toolbarKicker.textContent.trim(),
      subtitle: subtitle.textContent.trim(),
      subtitleDisplay: subtitleStyle.display,
      navDisplay: navStyle.display,
      toolbarBackDisplay: toolbarBackStyle.display,
      toolbarBackLabel: toolbarBack.getAttribute("aria-label"),
      topicHeadingCount: topicHeading ? 1 : 0
    };
  });

  assert(result.headerDisplay === "none", `Expected hidden study header, got ${result.headerDisplay}`);
  assert(result.toolbarTitle === "Technology", `Expected toolbar topic title, got ${result.toolbarTitle}`);
  assert(result.toolbarKicker === "Selected · 科技", `Expected toolbar kicker, got ${result.toolbarKicker}`);
  assert(result.subtitleDisplay === "none", `Expected hidden topic subtitle, got ${result.subtitleDisplay}`);
  assert(result.navDisplay === "none", `Expected hidden study navigation, got ${result.navDisplay}`);
  assert(result.toolbarBackDisplay !== "none", "Expected visible toolbar topic chooser");
  assert(result.toolbarBackLabel === "Choose another topic", `Expected toolbar back label, got ${result.toolbarBackLabel}`);
  assert(result.topicHeadingCount === 0, "Expected removed duplicate topic heading");

  await page.goto(target, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  await page.click(".toolbar #backButton");
  await page.waitForTimeout(200);
  const routeAfterBack = await page.evaluate(() => ({
    hash: window.location.hash,
    landingHidden: document.querySelector("#topicLanding").hidden
  }));
  assert(routeAfterBack.hash === "#topics", `Expected topics hash after back, got ${routeAfterBack.hash}`);
  assert(routeAfterBack.landingHidden === false, "Expected visible topic landing after back");

  await browser.close();
  console.log("Topic header QA passed");
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
