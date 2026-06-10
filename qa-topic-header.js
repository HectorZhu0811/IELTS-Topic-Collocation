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
const fileName = process.argv[2] || "index.html";
const target = `${pathToFileURL(path.join(__dirname, fileName)).href}#topic/Technology`;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1266, height: 716 } });
  await page.goto(target, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  const result = await page.evaluate(() => {
    const header = document.querySelector(".app-header");
    const title = header.querySelector("h1");
    const subtitle = document.querySelector("#pageSubtitle");
    const nav = document.querySelector(".study-nav");
    const toolbarBack = document.querySelector(".toolbar #backButton");
    const topicHeading = document.querySelector(".topic-heading");
    const headerStyle = getComputedStyle(header);
    const titleStyle = getComputedStyle(title);
    const subtitleStyle = getComputedStyle(subtitle);
    const navStyle = getComputedStyle(nav);
    const toolbarBackStyle = getComputedStyle(toolbarBack);
    return {
      title: title.textContent.trim(),
      subtitle: subtitle.textContent.trim(),
      subtitleDisplay: subtitleStyle.display,
      headerBackground: headerStyle.backgroundColor,
      titleColor: titleStyle.color,
      navDisplay: navStyle.display,
      toolbarBackDisplay: toolbarBackStyle.display,
      toolbarBackLabel: toolbarBack.getAttribute("aria-label"),
      topicHeadingCount: topicHeading ? 1 : 0,
      headerHeight: header.getBoundingClientRect().height
    };
  });

  assert(result.title === "Technology", `Expected topic title, got ${result.title}`);
  assert(result.subtitleDisplay === "none", `Expected hidden topic subtitle, got ${result.subtitleDisplay}`);
  assert(result.headerBackground === "rgb(37, 99, 235)", `Expected Technology background, got ${result.headerBackground}`);
  assert(result.titleColor === "rgb(255, 255, 255)", `Expected white title, got ${result.titleColor}`);
  assert(result.navDisplay === "none", `Expected hidden study navigation, got ${result.navDisplay}`);
  assert(result.toolbarBackDisplay !== "none", "Expected visible toolbar topic chooser");
  assert(result.toolbarBackLabel === "Choose another topic", `Expected toolbar back label, got ${result.toolbarBackLabel}`);
  assert(result.topicHeadingCount === 0, "Expected removed duplicate topic heading");
  assert(result.headerHeight < 130, `Header should stay compact, got ${result.headerHeight}`);

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
