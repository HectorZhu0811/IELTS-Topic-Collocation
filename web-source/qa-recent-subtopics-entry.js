const path = require("path");
const { pathToFileURL } = require("url");
const { launchChrome } = require("./scripts/browser-runtime");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

(async () => {
  const targetFile = process.argv[2] || "index.html";
  const target = `${pathToFileURL(path.join(__dirname, targetFile)).href}#topics`;
  const browser = await launchChrome({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });

  await page.goto(target, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".topic-reel-card.is-active", { timeout: 10000 });

  const landing = await page.evaluate(() => ({
    actionCards: Array.from(document.querySelectorAll(".topic-quick-card")).map((card) => card.textContent.trim()),
    memoryCardCount: document.querySelectorAll('[data-action="open-bank"]').length,
    recentCardCount: document.querySelectorAll('[data-action="open-recent-subtopics"]').length,
    activeTopic: document.querySelector(".topic-reel-card.is-active")?.dataset.topic || "",
    reelCards: document.querySelectorAll(".topic-reel-card").length
  }));

  assert(landing.memoryCardCount === 1, "Expected one Memory Bank quick card");
  assert(landing.recentCardCount === 0, "Expected no Recent Topic quick card on landing");
  assert(landing.actionCards.some((text) => text.includes("Memory Bank")), "Expected Memory Bank label");
  assert(!landing.actionCards.some((text) => text.includes("Recent Topic")), "Expected Recent Topic removed from landing quick cards");
  assert(landing.reelCards === 5, `Expected five topic reel cards, got ${landing.reelCards}`);

  await page.click(".topic-reel-card.is-active");
  await page.waitForSelector(".flashcard-shell", { timeout: 10000 });
  const topicStudy = await page.evaluate(() => ({
    hash: window.location.hash,
    studyHidden: document.querySelector("#studyPage").hidden,
    title: document.querySelector("#toolbarTopicTitle")?.textContent.trim() || "",
    inlineRecentCards: document.querySelectorAll(".recent-inline-card").length,
    inlineRecentTitle: document.querySelector(".recent-inline-heading strong")?.textContent.trim() || "",
    bigTopicTabs: document.querySelectorAll(".recent-topic-tab").length
  }));

  assert(topicStudy.hash.startsWith("#topic/"), `Expected active topic to open study route, got ${topicStudy.hash}`);
  assert(topicStudy.studyHidden === false, "Expected active topic click to show study page");
  assert(topicStudy.inlineRecentCards > 0, "Expected embedded Recent Topic cards on topic page");
  assert(topicStudy.inlineRecentTitle === "Recent Topic", `Expected embedded Recent Topic title, got ${topicStudy.inlineRecentTitle}`);
  assert(topicStudy.bigTopicTabs === 0, "Expected no major-topic tabs inside topic page");

  await page.click(".recent-inline-card");
  await page.waitForSelector(".flashcard-shell", { timeout: 10000 });
  const inlineStudy = await page.evaluate(() => ({
    hash: window.location.hash,
    searchValue: document.querySelector("#searchInput")?.value || "",
    studyHidden: document.querySelector("#studyPage").hidden
  }));

  assert(inlineStudy.hash.startsWith("#topic/"), `Expected topic hash after embedded recent card, got ${inlineStudy.hash}`);
  assert(inlineStudy.searchValue.length > 0, "Expected embedded recent card to seed topic search");
  assert(inlineStudy.studyHidden === false, "Expected study page to remain visible after embedded recent card");

  await page.goto(`${pathToFileURL(path.join(__dirname, targetFile)).href}#recent/Technology`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".recent-focus-card", { timeout: 10000 });
  const subtopicRoute = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.querySelector(".app-header h1")?.textContent.trim() || "",
    visibleCount: document.querySelector("#visibleCount")?.textContent.trim() || "",
    focusTitle: document.querySelector(".recent-focus-card h2")?.textContent.trim() || "",
    recentCards: document.querySelectorAll(".recent-subtopic-card").length,
    previewBlocks: document.querySelectorAll(".recent-focus-preview").length,
    footerBlocks: document.querySelectorAll(".recent-focus-footer").length,
    reelWindows: document.querySelectorAll(".recent-topic-page .topic-reel-window").length,
    memoryCardCount: document.querySelectorAll('[data-action="open-bank"]').length,
    topicButtons: document.querySelectorAll(".recent-topic-tab").length
  }));

  assert(subtopicRoute.hash.startsWith("#recent/"), `Expected recent subtopic hash, got ${subtopicRoute.hash}`);
  assert(subtopicRoute.title.includes("Recent Topic"), `Expected Recent Topic header, got ${subtopicRoute.title}`);
  assert(subtopicRoute.reelWindows === 0, "Expected Recent Topic page not to use topic reel window");
  assert(subtopicRoute.recentCards >= 4, `Expected recent subtopic cards, got ${subtopicRoute.recentCards}`);
  assert(Number(subtopicRoute.visibleCount) > 0, `Expected visible subtopic count, got ${subtopicRoute.visibleCount}`);
  assert(subtopicRoute.focusTitle.length > 0, "Expected focus deck title");
  assert(subtopicRoute.previewBlocks === 0, "Expected no collocation preview block in focus card");
  assert(subtopicRoute.footerBlocks === 0, "Expected no pair/phrase footer block in focus card");
  assert(subtopicRoute.memoryCardCount === 1, "Expected Memory Bank quick card in Recent Topic mode");
  assert(subtopicRoute.topicButtons === 0, "Expected no major-topic tabs in Recent Topic mode");

  await page.setViewportSize({ width: 1204, height: 739 });
  await page.waitForTimeout(250);
  const viewportFit = await page.evaluate(() => {
    const page = document.querySelector(".recent-topic-page");
    const rect = page.getBoundingClientRect();
    return {
      pageBottom: Math.ceil(rect.bottom),
      viewportHeight: window.innerHeight,
      documentScrollHeight: document.documentElement.scrollHeight
    };
  });

  assert(
    viewportFit.documentScrollHeight <= viewportFit.viewportHeight + 1,
    `Expected Recent Topic page to fit viewport, got document ${viewportFit.documentScrollHeight} vs viewport ${viewportFit.viewportHeight}`
  );

  await page.goto(`${pathToFileURL(path.join(__dirname, targetFile)).href}#recent/Urbanization`, { waitUntil: "domcontentloaded" });
  await page.setViewportSize({ width: 1204, height: 739 });
  await page.waitForSelector(".recent-focus-card", { timeout: 10000 });
  await page.waitForTimeout(250);
  const densityFit = await page.evaluate(() => {
    const page = document.querySelector(".recent-topic-page").getBoundingClientRect();
    const sidebar = document.querySelector(".recent-topic-sidebar").getBoundingClientRect();
    const focus = document.querySelector(".recent-focus-card").getBoundingClientRect();
    const stack = document.querySelector(".recent-stack").getBoundingClientRect();
    return {
      documentScrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      pageHeight: Math.round(page.height),
      sidebarHeight: Math.round(sidebar.height),
      focusHeight: Math.round(focus.height),
      stackHeight: Math.round(stack.height),
      topicButtons: document.querySelectorAll(".recent-topic-tab").length
    };
  });

  assert(
    densityFit.documentScrollHeight <= densityFit.viewportHeight + 1,
    `Expected Urbanization Recent Topic to fit viewport, got document ${densityFit.documentScrollHeight} vs viewport ${densityFit.viewportHeight}`
  );
  assert(
    Math.abs(densityFit.sidebarHeight - densityFit.focusHeight) <= 2 &&
      Math.abs(densityFit.stackHeight - densityFit.focusHeight) <= 2,
    `Expected adaptive equal-height columns, got sidebar ${densityFit.sidebarHeight}, focus ${densityFit.focusHeight}, stack ${densityFit.stackHeight}`
  );
  assert(densityFit.topicButtons === 0, "Expected no major-topic tabs in Urbanization Recent Topic route");

  await page.click(".recent-focus-card");
  await page.waitForSelector(".flashcard-shell", { timeout: 10000 });
  const study = await page.evaluate(() => ({
    hash: window.location.hash,
    searchValue: document.querySelector("#searchInput")?.value || "",
    studyHidden: document.querySelector("#studyPage").hidden
  }));

  assert(study.hash.startsWith("#topic/"), `Expected topic study hash, got ${study.hash}`);
  assert(study.searchValue.length > 0, "Expected selected subtopic to seed topic search");
  assert(study.studyHidden === false, "Expected study page after selecting subtopic");

  await browser.close();
  console.log("Recent subtopics entry QA passed");
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
