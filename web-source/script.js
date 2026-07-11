(function () {
  const topicOrder = [
    "Technology",
    "Education",
    "Environment",
    "Government",
    "Society",
    "Health",
    "Urbanization",
    "Media",
    "Economy",
    "Arts"
  ];

  const topicMeta = {
    Technology: {
      label: "Technology",
      zh: "科技",
      color: "#2563eb",
      accent: "#38bdf8",
      concept: "Interfaces, automation, data, and the future texture of daily life.",
      imageWords: ["signal", "device", "network"]
    },
    Education: {
      label: "Education",
      zh: "教育",
      color: "#16a34a",
      accent: "#84cc16",
      concept: "Classrooms, learning paths, exams, and the quiet pressure to grow.",
      imageWords: ["class", "exam", "mind"]
    },
    Environment: {
      label: "Environment",
      zh: "环境",
      color: "#059669",
      accent: "#2dd4bf",
      concept: "Climate, resources, habitats, and the balance between growth and repair.",
      imageWords: ["climate", "forest", "repair"]
    },
    Government: {
      label: "Government",
      zh: "政府",
      color: "#7c3aed",
      accent: "#c084fc",
      concept: "Power, law, rights, intervention, and the design of public order.",
      imageWords: ["law", "policy", "rights"]
    },
    Society: {
      label: "Society",
      zh: "社会",
      color: "#db2777",
      accent: "#fb7185",
      concept: "Families, fairness, identity, norms, and the way people live together.",
      imageWords: ["family", "equity", "norms"]
    },
    Health: {
      label: "Health",
      zh: "健康",
      color: "#dc2626",
      accent: "#f97316",
      concept: "Bodies, care systems, risk, recovery, and choices that shape wellbeing.",
      imageWords: ["care", "risk", "recovery"]
    },
    Urbanization: {
      label: "Urbanization",
      zh: "城市化",
      color: "#ea580c",
      accent: "#facc15",
      concept: "Roads, housing, crowds, infrastructure, and the rhythm of modern cities.",
      imageWords: ["roads", "housing", "flow"]
    },
    Media: {
      label: "Media",
      zh: "媒体",
      color: "#ca8a04",
      accent: "#fde047",
      concept: "Attention, persuasion, information, bias, and the stories people trust.",
      imageWords: ["screen", "news", "attention"]
    },
    Economy: {
      label: "Economy",
      zh: "经济",
      color: "#8b5e34",
      accent: "#d6a15f",
      concept: "Markets, money, jobs, trade, and the forces behind everyday choices.",
      imageWords: ["market", "trade", "income"]
    },
    Arts: {
      label: "Arts",
      zh: "艺术",
      color: "#9333ea",
      accent: "#e879f9",
      concept: "Performance, culture, expression, identity, and the value of imagination.",
      imageWords: ["stage", "image", "culture"]
    }
  };

  const state = {
    topic: null,
    query: "",
    lastTopic: "Technology",
    topicReelTopic: null,
    recentSubtopicTopic: null,
    recentSubtopicSelection: {},
    practiceMode: "all",
    randomSalt: "",
    zenActive: false,
    zenIndex: 0,
    zenFlipped: false,
    zenSessionStats: null
  };
  const ZEN_EXTRA_ANGLE_DELAY_MS = 220;
  let pendingStudyEntry = false;
  let pendingResultsRefresh = false;
  let studyEntryTimer = null;
  let bankEntryTimer = null;
  let resultsRefreshTimer = null;
  let toastTimer = null;

  const allCards = window.FLASHCARD_DATA || [];
  const recentSubtopicData = window.RECENT_SUBTOPIC_DATA || [];
  const recentSubtopicByTopic = new Map(recentSubtopicData.map((topic) => [topic.id, topic]));
  const topicLanding = document.getElementById("topicLanding");
  const studyPage = document.getElementById("studyPage");
  const sectionsEl = document.getElementById("topicSections");
  const toolbar = document.querySelector(".toolbar");
  const filtersEl = document.getElementById("topicFilters");
  const searchInput = document.getElementById("searchInput");
  const orderResetButton = document.getElementById("orderResetButton");
  const resetButton = document.getElementById("resetButton");
  const bankButton = document.getElementById("bankButton");
  const zenButton = document.getElementById("zenButton");
  const continueZenButton = document.getElementById("continueZenButton");
  const exportMemoryButton = document.getElementById("exportMemoryButton");
  const importMemoryButton = document.getElementById("importMemoryButton");
  const importMemoryInput = document.getElementById("importMemoryInput");
  const practiceModeSelect = document.getElementById("practiceMode");
  const backButton = document.getElementById("backButton");
  const collocationBank = document.getElementById("collocationBank");
  const recentTopicInline = document.getElementById("recentTopicInline");
  const zenPage = document.getElementById("zenPage");
  const bankPage = document.getElementById("bankPage");
  const visibleCount = document.getElementById("visibleCount");
  const totalCount = document.getElementById("totalCount");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const pageEyebrow = document.querySelector(".app-header .eyebrow");
  const pageTitle = document.getElementById("pageTitleText");
  const toolbarKicker = document.getElementById("toolbarKicker");
  const toolbarTopicTitle = document.getElementById("toolbarTopicTitle");
  const headerTopicButton = document.getElementById("headerTopicButton");
  const BANK_KEY = "task2-collocation-bank";
  const REVIEW_KEY = "task2-collocation-review";
  const REVIEW_LOG_KEY = "task2-collocation-review-log";
  const ZEN_PROGRESS_KEY = "task2-collocation-zen-progress";
  const MEMORY_VERSION = 2;
  const MEMORY_SCHEMA_ID = "topic-collocation-memory-v1";
  const DAY_MS = 24 * 60 * 60 * 1000;
  const MIN_EASE = 1.3;
  const DEFAULT_EASE = 2.5;
  const REVIEW_RATINGS = {
    again: { label: "不会", className: "rating-again" },
    hard: { label: "模糊", className: "rating-hard" },
    good: { label: "认识", className: "rating-good" },
    easy: { label: "熟练", className: "rating-easy" }
  };
  const DEFAULT_EYEBROW = "IELTS Writing Task 2";
  const DEFAULT_TITLE = "Collocation Trainer";
  const DEFAULT_SUBTITLE = "A focused writing practice space for topic vocabulary and recall practice.";
  const markedCards = new Set(loadBank());
  const reviewStates = new Map(Object.entries(loadStoredObject(REVIEW_KEY)));
  const reviewLogs = loadStoredArray(REVIEW_LOG_KEY);

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderHighlighted(text, highlight) {
    const escapedText = escapeHtml(text);
    if (!highlight) return escapedText;
    const index = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (index < 0) return escapedText;
    const before = escapeHtml(text.slice(0, index));
    const marked = escapeHtml(text.slice(index, index + highlight.length));
    const after = escapeHtml(text.slice(index + highlight.length));
    return `${before}<span class="highlight">${marked}</span>${after}`;
  }

  function iconSvg(name) {
    const paths = {
      rotate: '<path d="M3 12a9 9 0 0 1 15.1-6.6L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.1 6.6L3 16"/><path d="M3 21v-5h5"/>',
      undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 1 1 0 12h-1"/>',
      shuffle: '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>',
      bank: '<path d="M4 7h16"/><path d="M6 7v11"/><path d="M10 7v11"/><path d="M14 7v11"/><path d="M18 7v11"/><path d="M3 18h18"/><path d="m12 3 8 4H4Z"/>',
      play: '<path d="M8 5v14l11-7Z"/>',
      focus: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="m19.1 4.9-2.1 2.1"/><path d="m7 17-2.1 2.1"/>',
      open: '<path d="M7 17 17 7"/><path d="M9 7h8v8"/><path d="M5 5h6"/><path d="M5 5v14h14v-6"/>',
      topics: '<path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/>',
      exit: '<path d="M10 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"/><path d="M14 16l4-4-4-4"/><path d="M18 12H9"/>'
    };
    return `<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ""}</svg>`;
  }

  function setupActionButtons() {
    if (toolbar && backButton) {
      toolbar.insertBefore(backButton, toolbar.firstElementChild);
    }
    backButton.classList.add("topic-chooser-button");
    backButton.setAttribute("aria-label", "Choose another topic");
    backButton.setAttribute("data-tooltip", "Choose another topic");
    backButton.title = "Choose another topic";
    backButton.innerHTML = `${iconSvg("topics")}<span>Topics</span>`;

    orderResetButton.classList.add("icon-button");
    orderResetButton.setAttribute("aria-label", "Reset card order");
    orderResetButton.setAttribute("data-tooltip", "Reset card order");
    orderResetButton.title = "Reset card order";
    orderResetButton.innerHTML = iconSvg("undo");

    resetButton.classList.add("icon-button");
    resetButton.setAttribute("aria-label", "Shuffle card order");
    resetButton.setAttribute("data-tooltip", "Shuffle card order");
    resetButton.title = "Shuffle card order";
    resetButton.innerHTML = iconSvg("shuffle");

    bankButton.classList.add("bank-toolbar-button");
    bankButton.setAttribute("aria-label", "Open collocation bank");
    bankButton.setAttribute("data-tooltip", "Open collocation bank");
    bankButton.title = "Collocation bank";
    bankButton.innerHTML = `${iconSvg("bank")}<span class="bank-button-copy"><strong>Memory bank</strong><em>0 due today</em></span>`;

    continueZenButton.classList.add("icon-button");
    continueZenButton.setAttribute("aria-label", "Continue Zen");
    continueZenButton.setAttribute("data-tooltip", "Continue Zen");
    continueZenButton.title = "Continue Zen";
    continueZenButton.innerHTML = iconSvg("play");

    exportMemoryButton.classList.add("memory-action");
    exportMemoryButton.textContent = "导出记忆";

    importMemoryButton.classList.add("memory-action");
    importMemoryButton.textContent = "导入记忆";

    zenButton.classList.add("primary-action");
    zenButton.setAttribute("data-tooltip", "Start Zen mode");
    zenButton.innerHTML = `${iconSvg("focus")}<span>Zen mode</span>`;
  }

  function setNeutralHeader(subtitle = DEFAULT_SUBTITLE) {
    document.body.style.removeProperty("--active-topic");
    pageEyebrow.textContent = DEFAULT_EYEBROW;
    pageTitle.textContent = DEFAULT_TITLE;
    pageSubtitle.textContent = subtitle;
  }

  function setTopicHeader(topic) {
    const meta = topicMeta[topic];
    document.body.style.setProperty("--active-topic", meta.color);
    pageEyebrow.textContent = "";
    pageTitle.textContent = meta.label;
    pageSubtitle.textContent = meta.concept;
    if (toolbarKicker) toolbarKicker.textContent = `Selected · ${meta.zh}`;
    if (toolbarTopicTitle) toolbarTopicTitle.textContent = meta.label;
  }

  function setRecentSubtopicHeader(topic) {
    const meta = topicMeta[topic];
    document.body.style.setProperty("--active-topic", meta.color);
    pageEyebrow.textContent = "2025-2026 高频";
    pageTitle.textContent = "Recent Topic";
    pageSubtitle.textContent = `${meta.zh} / ${meta.label}: high-frequency writing topics from recent IELTS prompts.`;
  }

  function synonymGroups(card) {
    return Array.isArray(card.synonymNetworks) ? card.synonymNetworks : [];
  }

  function synonymSearchText(card) {
    return synonymGroups(card).flatMap((group) => [
      group.core,
      group.coreExpression,
      group.role,
      ...(group.options || []).flatMap((option) => [
        option.term,
        option.phrase,
        option.zh,
        option.tone,
        option.stance,
        option.microContext,
        option.reviewNote
      ])
    ]).join(" ");
  }

  function normalizedStance(stance) {
    const safeStance = ["Positive", "Neutral", "Negative"].includes(stance) ? stance : "Neutral";
    return safeStance;
  }

  function synonymStanceClass(stance) {
    return `synonym-${normalizedStance(stance).toLowerCase()}`;
  }

  function renderStanceTag(stance) {
    const safeStance = normalizedStance(stance);
    return `<span class="stance-tag stance-${safeStance.toLowerCase()}">${safeStance}</span>`;
  }

  function renderSynonymNetwork(card) {
    const groups = synonymGroups(card);
    if (groups.length === 0) return "";
    const groupMarkup = groups.map((group) => {
      const options = (group.options || []).map((option) => `
        <li class="synonym-item ${synonymStanceClass(option.stance)}">
          <div class="synonym-item-head">
            <strong>${escapeHtml(option.phrase || option.term)}</strong>
            ${renderStanceTag(option.stance)}
          </div>
          <p class="synonym-zh">中文：${escapeHtml(option.zh || "")}</p>
          <p class="synonym-tone">语气：${escapeHtml(option.tone || "")}</p>
        </li>
      `).join("");
      return `
        <details class="synonym-group">
          <summary>
            <span class="synonym-keyword">${escapeHtml(group.core)}</span>
            <span class="synonym-expression">${escapeHtml(group.coreExpression)}</span>
          </summary>
          <ul class="synonym-list">${options}</ul>
        </details>
      `;
    }).join("");
    return `
      <details class="synonym-network">
        <summary>
          <span>Optional collocations</span>
        </summary>
        <div class="synonym-network-body">
          ${groupMarkup}
        </div>
      </details>
    `;
  }

  function renderZenAngleCard(option, extraClass = "") {
    return `
      <article class="synonym-item zen-angle-card ${extraClass} ${synonymStanceClass(option.stance)}">
        <div class="synonym-item-head">
          <strong>${escapeHtml(option.phrase || option.term)}</strong>
          ${renderStanceTag(option.stance)}
        </div>
        <p class="synonym-zh">\u4e2d\u6587\uff1a${escapeHtml(option.zh || "")}</p>
        <p class="synonym-tone">\u8bed\u6c14\uff1a${escapeHtml(option.tone || "")}</p>
      </article>
    `;
  }

  function renderZenSynonymPanel(card) {
    const groups = synonymGroups(card);
    const allOptions = groups.flatMap((group) => group.options || []);
    if (allOptions.length === 0) {
      return '<aside class="zen-synonym-panel"><p class="empty-state">No optional collocations for this card.</p></aside>';
    }
    const record = getReviewRecord(card);
    const featured = allOptions[(Number(record?.reviewCount) || 0) % allOptions.length];
    const allCards = allOptions.map((option) => renderZenAngleCard(option)).join("");
    return `
      <aside class="zen-synonym-panel" aria-label="Optional collocations">
        <div class="zen-angle-grid zen-featured-grid">
          ${renderZenAngleCard(featured, "zen-featured-angle")}
        </div>
        <div class="zen-angle-grid zen-all-grid" hidden>
          ${allCards}
        </div>
        <button class="zen-extra-toggle" type="button" data-count="${allOptions.length}">Show all ${allOptions.length}</button>
      </aside>
    `;
  }

  function bindZenExtraToggle() {
    const extraToggle = zenPage.querySelector(".zen-extra-toggle");
    if (!extraToggle) return;
    extraToggle.addEventListener("click", () => {
      const panel = extraToggle.closest(".zen-synonym-panel");
      const featuredGrid = panel?.querySelector(".zen-featured-grid");
      const allGrid = panel?.querySelector(".zen-all-grid");
      const showingAll = panel?.classList.toggle("is-showing-all");
      zenPage.classList.toggle("is-showing-all-extra", Boolean(showingAll));
      if (featuredGrid && allGrid) {
        featuredGrid.hidden = Boolean(showingAll);
        allGrid.hidden = !showingAll;
      }
      const count = extraToggle.dataset.count || "3";
      extraToggle.textContent = showingAll ? "Show one" : `Show all ${count}`;
    });
  }

  function showZenExtraAnglePanel(card) {
    const stage = zenPage.querySelector(".zen-stage");
    if (!stage || stage.querySelector(".zen-synonym-panel")) return;
    stage.classList.remove("is-recall-only");
    stage.classList.add("has-extra-angle");
    stage.insertAdjacentHTML("beforeend", renderZenSynonymPanel(card));
    bindZenExtraToggle();
  }

  function cardId(card) {
    return [
      card.topic,
      card.type,
      card.frontChinese,
      card.backEnglish
    ].join("::");
  }

  function loadBank() {
    try {
      return JSON.parse(localStorage.getItem(BANK_KEY) || "[]");
    } catch (error) {
      return [];
    }
  }

  function loadStoredObject(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch (error) {
      return {};
    }
  }

  function loadStoredArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function todayStart(value = Date.now()) {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  function addDays(value, days) {
    return todayStart(value) + Math.max(0, days) * DAY_MS;
  }

  function normalizeReviewRecord(id, value) {
    const now = Date.now();
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return {
        version: MEMORY_VERSION,
        id,
        status: value.status || (value.lastRating === "again" ? "weak" : "learning"),
        lastRating: value.lastRating || "",
        reviewCount: Number(value.reviewCount) || 0,
        wrongCount: Number(value.wrongCount) || 0,
        lapseCount: Number(value.lapseCount) || 0,
        ease: Math.max(MIN_EASE, Number(value.ease) || DEFAULT_EASE),
        intervalDays: Math.max(0, Number(value.intervalDays) || 0),
        lastReviewedAt: Number(value.lastReviewedAt) || 0,
        nextReviewAt: Number(value.nextReviewAt) || now,
        createdAt: Number(value.createdAt) || now,
        updatedAt: Number(value.updatedAt) || now
      };
    }
    if (value === "weak") {
      return {
        version: MEMORY_VERSION,
        id,
        status: "weak",
        lastRating: "again",
        reviewCount: 0,
        wrongCount: 1,
        lapseCount: 0,
        ease: DEFAULT_EASE,
        intervalDays: 0,
        lastReviewedAt: 0,
        nextReviewAt: now,
        createdAt: now,
        updatedAt: now
      };
    }
    if (value === "known") {
      return {
        version: MEMORY_VERSION,
        id,
        status: "known",
        lastRating: "good",
        reviewCount: 1,
        wrongCount: 0,
        lapseCount: 0,
        ease: DEFAULT_EASE,
        intervalDays: 1,
        lastReviewedAt: now,
        nextReviewAt: addDays(now, 1),
        createdAt: now,
        updatedAt: now
      };
    }
    return null;
  }

  function getReviewRecord(card) {
    const id = cardId(card);
    const record = normalizeReviewRecord(id, reviewStates.get(id));
    if (record) reviewStates.set(id, record);
    return record;
  }

  function isDue(card, value = Date.now()) {
    const record = getReviewRecord(card);
    return !record || (Number(record.nextReviewAt) || 0) <= value;
  }

  function dueCount(topic = state.topic) {
    if (!topic) return 0;
    return cardsForTopic(topic).filter((card) => isDue(card)).length;
  }

  function weakCount(topic = state.topic) {
    if (!topic) return 0;
    return cardsForTopic(topic).filter((card) => reviewState(card) === "weak" || markedCards.has(cardId(card))).length;
  }

  function knownCount(topic = state.topic) {
    if (!topic) return 0;
    return cardsForTopic(topic).filter((card) => reviewState(card) === "known").length;
  }

  function reviewedTodayCount() {
    const start = todayStart();
    return reviewLogs.filter((entry) => Number(entry.reviewedAt) >= start).length;
  }

  function priorityTopics() {
    return topicOrder
      .map((topic) => {
        const total = cardsForTopic(topic).length;
        const due = dueCount(topic);
        const weak = weakCount(topic);
        const known = knownCount(topic);
        return { topic, total, due, weak, known, score: due * 2 + weak };
      })
      .sort((a, b) => b.score - a.score || topicOrder.indexOf(a.topic) - topicOrder.indexOf(b.topic));
  }

  function duePriorityTopics() {
    return priorityTopics()
      .slice()
      .sort((a, b) => b.due - a.due || b.weak - a.weak || topicOrder.indexOf(a.topic) - topicOrder.indexOf(b.topic));
  }

  function showToast(message) {
    let toast = document.getElementById("motionToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "motionToast";
      toast.className = "motion-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove("is-visible");
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function nextIntervalFor(card, rating) {
    const id = cardId(card);
    const previous = normalizeReviewRecord(id, reviewStates.get(id));
    const ease = Math.max(MIN_EASE, previous?.ease || DEFAULT_EASE);
    const intervalDays = Math.max(0, Number(previous?.intervalDays) || 0);
    if (rating === "again") return 0;
    if (rating === "hard") return intervalDays <= 0 ? 1 : Math.max(1, Math.round(intervalDays * 1.2));
    if (rating === "easy") return intervalDays <= 0 ? 4 : Math.max(4, Math.round(intervalDays * ease * 1.3));
    return intervalDays <= 0 ? 1 : Math.max(1, Math.round(intervalDays * ease));
  }

  function intervalLabel(days) {
    if (days <= 0) return "今天";
    if (days === 1) return "1天";
    return `${days}天`;
  }

  function createZenSessionStats(total) {
    return {
      total,
      reviewed: 0,
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
      startedAt: Date.now()
    };
  }

  function recordZenSessionRating(rating) {
    if (!state.zenSessionStats) state.zenSessionStats = createZenSessionStats(currentCards().length);
    state.zenSessionStats.reviewed += 1;
    state.zenSessionStats[rating] = (state.zenSessionStats[rating] || 0) + 1;
  }

  function scheduleReview(card, rating) {
    const id = cardId(card);
    const now = Date.now();
    const previous = normalizeReviewRecord(id, reviewStates.get(id)) || {
      version: MEMORY_VERSION,
      id,
      status: "new",
      lastRating: "",
      reviewCount: 0,
      wrongCount: 0,
      lapseCount: 0,
      ease: DEFAULT_EASE,
      intervalDays: 0,
      lastReviewedAt: 0,
      nextReviewAt: now,
      createdAt: now,
      updatedAt: now
    };
    let ease = Math.max(MIN_EASE, previous.ease || DEFAULT_EASE);
    let intervalDays = Math.max(0, Number(previous.intervalDays) || 0);
    let wrongCount = Number(previous.wrongCount) || 0;
    let lapseCount = Number(previous.lapseCount) || 0;
    let status = "learning";

    if (rating === "again") {
      ease = Math.max(MIN_EASE, ease - 0.2);
      intervalDays = 0;
      wrongCount += 1;
      lapseCount += previous.reviewCount > 0 ? 1 : 0;
      status = "weak";
      markedCards.add(id);
    } else if (rating === "hard") {
      ease = Math.max(MIN_EASE, ease - 0.15);
      intervalDays = intervalDays <= 0 ? 1 : Math.max(1, Math.round(intervalDays * 1.2));
      status = "weak";
      markedCards.add(id);
    } else if (rating === "easy") {
      ease += 0.15;
      intervalDays = intervalDays <= 0 ? 4 : Math.max(4, Math.round(intervalDays * ease * 1.3));
      status = "known";
      markedCards.delete(id);
    } else {
      intervalDays = intervalDays <= 0 ? 1 : Math.max(1, Math.round(intervalDays * ease));
      status = "known";
      markedCards.delete(id);
    }

    const record = {
      ...previous,
      version: MEMORY_VERSION,
      status,
      lastRating: rating,
      reviewCount: (Number(previous.reviewCount) || 0) + 1,
      wrongCount,
      lapseCount,
      ease,
      intervalDays,
      lastReviewedAt: now,
      nextReviewAt: rating === "again" ? now : addDays(now, intervalDays),
      updatedAt: now
    };
    reviewStates.set(id, record);
    appendReviewLog(card, rating, previous, record);
    saveReviewStates();
    saveBank();
    return record;
  }

  function appendReviewLog(card, rating, previous, next) {
    const reviewedAt = next.lastReviewedAt || Date.now();
    reviewLogs.push({
      id: `${cardId(card)}::${reviewedAt}::${next.reviewCount}`,
      cardId: cardId(card),
      topic: card.topic,
      type: card.type,
      rating,
      reviewedAt,
      previousStatus: previous.status || "new",
      nextStatus: next.status,
      previousEase: Number(previous.ease) || DEFAULT_EASE,
      nextEase: next.ease,
      previousIntervalDays: Number(previous.intervalDays) || 0,
      nextIntervalDays: next.intervalDays,
      previousDueAt: Number(previous.nextReviewAt) || 0,
      nextDueAt: next.nextReviewAt
    });
    saveReviewLogs();
  }

  function memoryPayload() {
    const exportedAt = new Date().toISOString();
    const cards = allCards.map((card) => ({
      id: cardId(card),
      topic: card.topic,
      type: card.type,
      frontChinese: card.frontChinese,
      backEnglish: card.backEnglish,
      baseChinese: card.baseChinese || "",
      baseEnglish: card.baseEnglish || ""
    }));
    const reviewState = cards.map((card) => {
      const record = normalizeReviewRecord(card.id, reviewStates.get(card.id));
      return record ? {
        cardId: card.id,
        status: record.status,
        lastRating: record.lastRating,
        reviewCount: record.reviewCount,
        wrongCount: record.wrongCount,
        lapseCount: record.lapseCount,
        ease: record.ease,
        intervalDays: record.intervalDays,
        lastReviewedAt: record.lastReviewedAt,
        nextReviewAt: record.nextReviewAt,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt
      } : {
        cardId: card.id,
        status: "new",
        lastRating: "",
        reviewCount: 0,
        wrongCount: 0,
        lapseCount: 0,
        ease: DEFAULT_EASE,
        intervalDays: 0,
        lastReviewedAt: 0,
        nextReviewAt: 0,
        createdAt: 0,
        updatedAt: 0
      };
    });
    return {
      app: "IELTS-Topic-Collocation",
      schemaId: MEMORY_SCHEMA_ID,
      schemaVersion: 1,
      version: MEMORY_VERSION,
      exportedAt,
      cardsTotal: allCards.length,
      tables: {
        cards,
        review_state: reviewState,
        review_log: [...reviewLogs],
        settings: [{
          key: "memory_schema_id",
          value: MEMORY_SCHEMA_ID,
          updatedAt: exportedAt
        }, {
          key: "algorithm",
          value: "sm2-lite",
          updatedAt: exportedAt
        }]
      },
      bank: [...markedCards],
      reviewLog: [...reviewLogs],
      reviews: Object.fromEntries([...reviewStates].map(([id, value]) => {
        const record = normalizeReviewRecord(id, value);
        return [id, record || value];
      }))
    };
  }

  function exportMemory() {
    const payload = JSON.stringify(memoryPayload(), null, 2);
    const stamp = new Date().toISOString().slice(0, 10);
    const filename = `ielts-topic-collocation-memory-${stamp}.json`;
    const blob = new Blob([payload], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    showToast("Memory exported");
  }

  function importMemoryFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        const payload = JSON.parse(String(reader.result || "{}"));
        const importedReviews = {};
        const tableState = payload.tables?.review_state || payload.review_state || payload.reviewState || [];
        if (Array.isArray(tableState)) {
          tableState.forEach((row) => {
            const id = row.cardId || row.id;
            if (!id) return;
            importedReviews[id] = {
              ...row,
              id,
              version: MEMORY_VERSION
            };
          });
        }
        if (payload.reviews && typeof payload.reviews === "object") {
          Object.assign(importedReviews, payload.reviews);
        }
        Object.entries(importedReviews).forEach(([id, value]) => {
          const record = normalizeReviewRecord(id, value);
          if (record) reviewStates.set(id, record);
        });
        const importedLogs = payload.tables?.review_log || payload.review_log || payload.reviewLog || [];
        if (Array.isArray(importedLogs)) {
          const existingIds = new Set(reviewLogs.map((entry) => entry.id));
          importedLogs.forEach((entry) => {
            if (!entry || typeof entry !== "object") return;
            const id = entry.id || `${entry.cardId || "card"}::${entry.reviewedAt || Date.now()}::${entry.rating || "rating"}`;
            if (existingIds.has(id)) return;
            reviewLogs.push({ ...entry, id });
            existingIds.add(id);
          });
        }
        if (Array.isArray(payload.bank)) {
          payload.bank.forEach((id) => markedCards.add(id));
        }
        [...reviewStates].forEach(([id, value]) => {
          const record = normalizeReviewRecord(id, value);
          if (record?.status === "weak") markedCards.add(id);
          if (record && ["known", "graduated"].includes(record.status)) markedCards.delete(id);
        });
        saveReviewStates();
        saveReviewLogs();
        saveBank();
        showToast("Memory imported");
        renderStudyPage(state.topic || state.lastTopic || "Technology");
      } catch (error) {
        window.alert("导入失败：请选择有效的记忆 JSON 文件。");
      } finally {
        importMemoryInput.value = "";
      }
    });
    reader.readAsText(file, "utf-8");
  }

  function saveBank() {
    try {
      localStorage.setItem(BANK_KEY, JSON.stringify([...markedCards]));
    } catch (error) {
      // The bank still works during the current session if storage is blocked.
    }
  }

  function saveReviewStates() {
    try {
      localStorage.setItem(REVIEW_KEY, JSON.stringify(Object.fromEntries(reviewStates)));
    } catch (error) {
      // Review state still works during the current session if storage is blocked.
    }
  }

  function saveReviewLogs() {
    try {
      localStorage.setItem(REVIEW_LOG_KEY, JSON.stringify(reviewLogs));
    } catch (error) {
      // Review history is export-oriented; the current state still works without it.
    }
  }

  function saveZenProgress() {
    if (!state.topic) return;
    try {
      localStorage.setItem(ZEN_PROGRESS_KEY, JSON.stringify({
        topic: state.topic,
        query: state.query,
        practiceMode: state.practiceMode,
        randomSalt: state.randomSalt,
        zenIndex: state.zenIndex
      }));
    } catch (error) {
      // Continuing zen is optional if storage is blocked.
    }
  }

  function loadZenProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(ZEN_PROGRESS_KEY) || "null");
      if (!value || !topicOrder.includes(value.topic)) return null;
      return value;
    } catch (error) {
      return null;
    }
  }

  function updateContinueZenButton() {
    if (!continueZenButton) return;
    const progress = loadZenProgress();
    continueZenButton.hidden = !progress;
    continueZenButton.disabled = !progress;
  }

  function reviewState(card) {
    const record = getReviewRecord(card);
    return record ? record.status : "";
  }

  function reviewStateLabel(card) {
    const record = getReviewRecord(card);
    if (!record) return "新卡";
    const dueText = record.nextReviewAt <= Date.now() ? "今天复习" : `间隔 ${record.intervalDays} 天`;
    const label = REVIEW_RATINGS[record.lastRating]?.label || "已记录";
    return `${label} · ${dueText}`;
  }

  function updateReviewControls(card) {
    const stateText = zenPage.querySelector(".zen-review-state");
    if (stateText) stateText.textContent = reviewStateLabel(card);
    const record = getReviewRecord(card);
    zenPage.querySelectorAll(".zen-review-button").forEach((button) => {
      button.classList.toggle("is-active", record && button.dataset.rating === record.lastRating);
    });
  }

  function isZenTransitioning() {
    return zenPage.classList.contains("is-transitioning");
  }

  function playZenMasteryTransition(rating, intervalDays, onComplete) {
    const config = REVIEW_RATINGS[rating] || REVIEW_RATINGS.good;
    const pill = zenPage.querySelector(".zen-mastery-pill");
    if (!pill) {
      onComplete();
      return;
    }
    pill.textContent = `${config.label} · ${intervalLabel(intervalDays)}`;
    pill.className = `zen-mastery-pill ${config.className}`;
    zenPage.querySelectorAll(".zen-review-button").forEach((button) => {
      button.classList.toggle("is-transition-choice", button.dataset.rating === rating);
    });
    zenPage.classList.add("is-transitioning");
    window.setTimeout(() => {
      zenPage.classList.remove("is-transitioning");
      zenPage.querySelectorAll(".zen-review-button").forEach((button) => {
        button.classList.remove("is-transition-choice");
      });
      onComplete();
    }, 760);
  }

  function completeZenReview(card, rating) {
    if (isZenTransitioning()) return;
    const intervalDays = nextIntervalFor(card, rating);
    scheduleReview(card, rating);
    recordZenSessionRating(rating);
    updateReviewControls(card);
    playZenMasteryTransition(rating, intervalDays, () => advanceZenAfterReview(card));
  }

  function toggleMarked(card, actionLabel = "") {
    const id = cardId(card);
    const wasMarked = markedCards.has(id);
    if (markedCards.has(id)) {
      markedCards.delete(id);
      if (reviewState(card) === "weak") {
        reviewStates.delete(id);
        saveReviewStates();
      }
    } else {
      markedCards.add(id);
    }
    saveBank();
    showToast(actionLabel || (wasMarked ? "Removed from Memory" : "Saved to Memory"));
    if (!bankPage.hidden) {
      renderBankPage();
    } else {
      pendingResultsRefresh = true;
      renderStudyPage(state.topic);
    }
  }

  function markedCardList() {
    return allCards.filter((card) => markedCards.has(cardId(card)));
  }

  function cardsForTopic(topic) {
    return allCards.filter((card) => card.topic === topic);
  }

  function resetZenPosition() {
    state.zenIndex = 0;
    state.zenFlipped = false;
  }

  function enterZen(startIndex = 0) {
    const cards = currentCards();
    if (cards.length === 0) return;
    state.zenActive = true;
    state.zenIndex = Math.max(0, Math.min(startIndex, cards.length - 1));
    state.zenFlipped = false;
    state.zenSessionStats = createZenSessionStats(cards.length);
    saveZenProgress();
    renderStudyPage(state.topic);
  }

  function enterZenFromCard(card) {
    const cards = currentCards();
    const index = cards.findIndex((item) => cardId(item) === cardId(card));
    if (index < 0) return;
    enterZen(index);
  }

  function exitZen() {
    state.zenActive = false;
    saveZenProgress();
    resetZenPosition();
    state.zenSessionStats = null;
    renderStudyPage(state.topic);
  }

  function advanceZen() {
    if (isZenTransitioning()) return;
    const cards = currentCards();
    if (cards.length === 0) {
      exitZen();
      return;
    }
    if (!state.zenFlipped) {
      state.zenFlipped = true;
      saveZenProgress();
      const card = zenPage.querySelector(".zen-card");
      if (card) card.classList.add("is-flipped");
      window.setTimeout(() => {
        if (state.zenActive && state.zenFlipped) showZenExtraAnglePanel(cards[state.zenIndex]);
      }, ZEN_EXTRA_ANGLE_DELAY_MS);
    } else {
      const reviewedCard = cards[state.zenIndex];
      completeZenReview(reviewedCard, "good");
    }
  }

  function toggleZenCardFlip() {
    if (!state.zenActive || isZenTransitioning()) return;
    const card = zenPage.querySelector(".zen-card");
    const stage = zenPage.querySelector(".zen-stage");
    if (!state.zenFlipped) {
      state.zenFlipped = true;
      saveZenProgress();
      if (card) card.classList.add("is-flipped");
      window.setTimeout(() => {
        if (state.zenActive && state.zenFlipped) showZenExtraAnglePanel(currentCards()[state.zenIndex]);
      }, ZEN_EXTRA_ANGLE_DELAY_MS);
      return;
    }
    state.zenFlipped = false;
    saveZenProgress();
    if (stage) {
      stage.classList.remove("has-extra-angle");
      stage.classList.add("is-recall-only");
    }
    const panel = zenPage.querySelector(".zen-synonym-panel");
    if (panel) panel.remove();
    if (card) card.classList.remove("is-flipped");
    window.setTimeout(() => {
      if (state.zenActive && !state.zenFlipped) renderZenPage(currentCards());
    }, 560);
  }

  function jumpZenTo(position) {
    const cards = currentCards();
    if (!state.zenActive || cards.length === 0) return;
    const nextIndex = Math.max(0, Math.min(Number(position) - 1, cards.length - 1));
    if (!Number.isFinite(nextIndex)) return;
    state.zenIndex = nextIndex;
    state.zenFlipped = false;
    saveZenProgress();
    renderZenPage(cards);
  }

  function continueZen() {
    const progress = loadZenProgress();
    if (!progress) return;
    state.query = progress.query || "";
    state.practiceMode = progress.practiceMode === "random" ? "all" : progress.practiceMode || "all";
    state.randomSalt = progress.randomSalt || "";
    if (searchInput) searchInput.value = state.query;
    if (practiceModeSelect) practiceModeSelect.value = state.practiceMode;
    state.topic = progress.topic;
    state.zenActive = true;
    state.zenIndex = Number(progress.zenIndex) || 0;
    state.zenFlipped = false;
    const route = routeFromHash();
    if (route.type !== "topic" || route.topic !== progress.topic) {
      window.location.hash = `topic/${encodeURIComponent(progress.topic)}`;
      return;
    }
    renderStudyPage(progress.topic);
  }

  function stableHash(value) {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
    }
    return hash;
  }

  function recentSubtopicsFor(topic) {
    return recentSubtopicByTopic.get(topic)?.subtopics || [];
  }

  function allRecentSubtopicCount() {
    return recentSubtopicData.reduce((sum, topic) => sum + topic.subtopics.length, 0);
  }

  function selectedRecentSubtopic(topic) {
    const subtopics = recentSubtopicsFor(topic);
    if (subtopics.length === 0) return null;
    const selectedTitle = state.recentSubtopicSelection[topic];
    return subtopics.find((subtopic) => subtopic[0] === selectedTitle) || subtopics[0];
  }

  function setSelectedRecentSubtopic(topic, subtopic) {
    state.recentSubtopicSelection = {
      ...state.recentSubtopicSelection,
      [topic]: subtopic[0]
    };
  }

  function cardSearchHaystack(card) {
    return [
      card.baseChinese,
      card.baseEnglish,
      card.frontChinese,
      card.backEnglish,
      card.type,
      synonymSearchText(card)
    ].join(" ").toLowerCase();
  }

  function subtopicSearchSeed(topic, subtopic) {
    const candidates = [
      ...(subtopic[2] || []),
      subtopic[0],
      subtopic[1]
    ].flatMap((value) => {
      const text = String(value || "").trim();
      return [
        text,
        ...text.split(/[\s/:,&-]+/).filter((part) => part.length >= 5)
      ];
    });
    const topicCards = cardsForTopic(topic);
    const match = candidates.find((candidate) => {
      const needle = candidate.toLowerCase();
      return needle && topicCards.some((card) => cardSearchHaystack(card).includes(needle));
    });
    return match || "";
  }

  function moveZen(delta) {
    const cards = currentCards();
    if (!state.zenActive || cards.length === 0) return;
    state.zenIndex = (state.zenIndex + delta + cards.length) % cards.length;
    state.zenFlipped = false;
    saveZenProgress();
    renderZenPage(cards);
  }

  function advanceZenAfterReview(reviewedCard) {
    const cards = currentCards();
    if (!state.zenActive) return;
    if (cards.length === 0) {
      if (state.practiceMode === "due") {
        renderStudyPage(state.topic);
        return;
      }
      state.zenActive = false;
      resetZenPosition();
      renderStudyPage(state.topic);
      return;
    }
    const reviewedIndex = cards.findIndex((card) => cardId(card) === cardId(reviewedCard));
    if (reviewedIndex >= 0 && cards.length > 1) {
      state.zenIndex = (reviewedIndex + 1) % cards.length;
    } else if (state.zenIndex >= cards.length) {
      state.zenIndex = 0;
    }
    state.zenFlipped = false;
    saveZenProgress();
    renderZenPage(cards);
  }

  function navigateToTopic(topic) {
    pendingStudyEntry = !topicLanding.hidden && topicOrder.includes(topic);
    window.location.hash = `topic/${encodeURIComponent(topic)}`;
  }

  function navigateToRecentSubtopics(topic) {
    const target = topicOrder.includes(topic) ? topic : state.topicReelTopic || state.lastTopic || "Technology";
    state.recentSubtopicTopic = target;
    window.location.hash = `recent/${encodeURIComponent(target)}`;
  }

  function openRecentSubtopicStudy(topic, subtopic) {
    setSelectedRecentSubtopic(topic, subtopic);
    state.query = subtopicSearchSeed(topic, subtopic);
    if (searchInput) searchInput.value = state.query;
    navigateToTopic(topic);
  }

  function applyRecentSubtopicFilter(topic, subtopic) {
    setSelectedRecentSubtopic(topic, subtopic);
    state.query = subtopicSearchSeed(topic, subtopic);
    if (searchInput) searchInput.value = state.query;
    resetZenPosition();
    pendingResultsRefresh = true;
    renderStudyPage(topic);
  }

  function playStudyEntryTransition() {
    if (!pendingStudyEntry || state.zenActive) {
      pendingStudyEntry = false;
      studyPage.classList.remove("is-entering");
      return;
    }
    pendingStudyEntry = false;
    window.clearTimeout(studyEntryTimer);
    studyPage.classList.remove("is-entering");
    void studyPage.offsetWidth;
    studyPage.classList.add("is-entering");
    studyEntryTimer = window.setTimeout(() => {
      studyPage.classList.remove("is-entering");
    }, 640);
  }

  function playResultsRefreshTransition() {
    if (!pendingResultsRefresh || state.zenActive) return;
    pendingResultsRefresh = false;
    window.clearTimeout(resultsRefreshTimer);
    sectionsEl.classList.remove("is-refreshing");
    void sectionsEl.offsetWidth;
    sectionsEl.classList.add("is-refreshing");
    resultsRefreshTimer = window.setTimeout(() => {
      sectionsEl.classList.remove("is-refreshing");
    }, 440);
  }

  function playBankEntryTransition() {
    window.clearTimeout(bankEntryTimer);
    bankPage.classList.remove("is-entering");
    void bankPage.offsetWidth;
    bankPage.classList.add("is-entering");
    bankEntryTimer = window.setTimeout(() => {
      bankPage.classList.remove("is-entering");
    }, 520);
  }

  function routeFromHash() {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "bank") return { type: "bank" };
    if (!hash || hash === "topics") return { type: "landing" };
    const recentMatch = hash.match(/^recent\/(.+)$/);
    if (recentMatch) {
      const topic = decodeURIComponent(recentMatch[1]);
      return topicOrder.includes(topic) ? { type: "recent", topic } : { type: "landing" };
    }
    const topicMatch = hash.match(/^topic\/(.+)$/);
    if (!topicMatch) return { type: "landing" };
    const topic = decodeURIComponent(topicMatch[1]);
    return topicOrder.includes(topic) ? { type: "topic", topic } : { type: "landing" };
  }

  function renderLanding() {
    document.body.classList.remove("is-study-mode", "is-bank-mode", "is-zen-mode");
    document.body.classList.add("is-landing-mode");
    state.topic = null;
    topicLanding.hidden = false;
    studyPage.hidden = true;
    bankPage.hidden = true;
    visibleCount.textContent = String(topicOrder.length);
    totalCount.textContent = String(topicOrder.length);
    setNeutralHeader(DEFAULT_SUBTITLE);

    const priorities = priorityTopics();
    const lead = duePriorityTopics()[0];
    if (!state.topicReelTopic || !priorities.some((item) => item.topic === state.topicReelTopic)) {
      state.topicReelTopic = lead.topic;
    }

    topicLanding.innerHTML = `
      <div class="topic-reel-hero" aria-label="Topic reel selector">
        <div class="topic-quick-stack" aria-label="Learning entry points">
          <button class="topic-quick-card topic-memory-card" type="button" data-action="open-bank">
            <span>Saved review</span>
            <strong>Memory <br>Bank</strong>
            <em>${markedCards.size} saved · ${dueCount()} due</em>
          </button>
        </div>
        <div class="topic-reel-window">
          <div class="topic-reel-list"></div>
        </div>
      </div>
    `;

    topicLanding.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "start-review") {
          const target = lead.topic;
          state.practiceMode = button.dataset.mode || "all";
          state.query = "";
          state.topic = target;
          window.location.hash = `topic/${encodeURIComponent(target)}`;
          setTimeout(() => enterZen(), 0);
        }
        if (action === "open-topic") navigateToTopic(button.dataset.topic);
        if (action === "open-bank") window.location.hash = "bank";
        if (action === "open-reel-topic") navigateToTopic(state.topicReelTopic);
        if (action === "spin-topic") {
          const activeIndex = priorities.findIndex((item) => item.topic === state.topicReelTopic);
          const next = priorities[(activeIndex + 1 + priorities.length) % priorities.length];
          state.topicReelTopic = next.topic;
          renderTopicReel();
        }
      });
    });

    let topicReelAnimating = false;
    let topicReelTimer = null;
    const TOPIC_REEL_STEP_MS = 360;
    const TOPIC_REEL_STEP_EASING = "cubic-bezier(0.16, 0.9, 0.18, 1)";

    function clearTopicReelMotion(reelWindow) {
      if (!reelWindow) return;
      reelWindow.classList.remove("is-morphing");
      const reelList = reelWindow.querySelector(".topic-reel-list");
      if (reelList) {
        reelList.style.removeProperty("transition");
        reelList.style.removeProperty("transform");
      }
      reelWindow.querySelectorAll(".topic-reel-card").forEach((card) => {
        card.style.removeProperty("--morph-x");
        card.style.removeProperty("--morph-y");
        card.style.removeProperty("--morph-scale-x");
        card.style.removeProperty("--morph-scale-y");
        card.classList.remove("is-morph-card", "is-morph-new", "is-morph-playing");
      });
    }

    function wrappedPriorityIndex(index) {
      return (index + priorities.length) % priorities.length;
    }

    function topicReelStepPath(offset) {
      const activeIndex = priorities.findIndex((item) => item.topic === state.topicReelTopic);
      if (activeIndex < 0 || offset === 0) return [];
      const direction = offset > 0 ? 1 : -1;
      const stepCount = Math.abs(offset);
      return Array.from({ length: stepCount }, (_, index) => {
        const stepIndex = wrappedPriorityIndex(activeIndex + direction * (index + 1));
        return priorities[stepIndex].topic;
      });
    }

    function topicReelRects() {
      return new Map(
        Array.from(topicLanding.querySelectorAll(".topic-reel-card"), (card) => [
          card.dataset.topic,
          card.getBoundingClientRect()
        ])
      );
    }

    function animateTopicReelStep(topic) {
      const reelWindow = topicLanding.querySelector(".topic-reel-window");
      if (!reelWindow || topic === state.topicReelTopic) {
        state.topicReelTopic = topic;
        renderTopicReel();
        return Promise.resolve();
      }

      const beforeRects = topicReelRects();
      state.topicReelTopic = topic;
      renderTopicReel({ skipMotionClear: true });
      const afterCards = Array.from(topicLanding.querySelectorAll(".topic-reel-card"));
      reelWindow.classList.add("is-morphing");

      afterCards.forEach((card) => {
        const beforeRect = beforeRects.get(card.dataset.topic);
        const afterRect = card.getBoundingClientRect();
        if (beforeRect) {
          const scaleX = beforeRect.width / Math.max(afterRect.width, 1);
          const scaleY = beforeRect.height / Math.max(afterRect.height, 1);
          card.style.setProperty("--morph-x", `${beforeRect.left - afterRect.left}px`);
          card.style.setProperty("--morph-y", `${beforeRect.top - afterRect.top}px`);
          card.style.setProperty("--morph-scale-x", scaleX.toFixed(4));
          card.style.setProperty("--morph-scale-y", scaleY.toFixed(4));
          card.classList.add("is-morph-card");
        } else {
          card.classList.add("is-morph-new");
        }
      });

      return new Promise((resolve) => {
        const finish = () => {
          window.clearTimeout(topicReelTimer);
          clearTopicReelMotion(reelWindow);
          resolve();
        };

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            afterCards.forEach((card) => {
              card.classList.add("is-morph-playing");
            });
          });
        });
        topicReelTimer = window.setTimeout(finish, TOPIC_REEL_STEP_MS + 80);
      });
    }

    async function animateTopicReelTo(topic, offset) {
      if (topicReelAnimating || topic === state.topicReelTopic) return;
      const path = topicReelStepPath(offset);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || path.length === 0) {
        state.topicReelTopic = topic;
        renderTopicReel();
        return;
      }

      topicReelAnimating = true;
      window.clearTimeout(topicReelTimer);
      try {
        for (const stepTopic of path) {
          await animateTopicReelStep(stepTopic);
        }
      } finally {
        topicReelAnimating = false;
      }
    }

    function renderTopicReel(options = {}) {
      const activeIndex = Math.max(0, priorities.findIndex((item) => item.topic === state.topicReelTopic));
      const reelButton = topicLanding.querySelector('[data-action="open-reel-topic"]');
      const reelWindow = topicLanding.querySelector(".topic-reel-window");
      const reelList = topicLanding.querySelector(".topic-reel-list");
      const activeItem = priorities[activeIndex];
      const activeMeta = topicMeta[activeItem.topic];
      if (reelButton) reelButton.textContent = `Start ${activeMeta.label}`;
      if (!options.skipMotionClear) clearTopicReelMotion(reelWindow);
      reelList.innerHTML = "";

      for (let offset = -2; offset <= 2; offset += 1) {
        const item = priorities[(activeIndex + offset + priorities.length) % priorities.length];
        const meta = topicMeta[item.topic];
        const card = document.createElement("button");
        card.type = "button";
        card.className = "topic-reel-card";
        card.dataset.topic = item.topic;
        if (offset === 0) card.classList.add("is-active");
        if (Math.abs(offset) >= 2) card.classList.add("is-far");
        card.style.setProperty("--reel-index", offset + 2);
        card.style.setProperty("--topic", meta.color);
        card.style.setProperty("--accent", meta.accent);
        card.setAttribute(
          "aria-label",
          offset === 0 ? `Study selected topic ${meta.label}` : `Select topic ${meta.label}`
        );
        card.innerHTML = `
          <div>
            <span class="topic-reel-kicker">${offset === 0 ? "Selected" : "Candidate"} · ${escapeHtml(meta.zh)}</span>
            <strong>${escapeHtml(meta.label)}</strong>
          </div>
          <span class="topic-reel-meta">${item.due} due today / ${item.weak} weak</span>
          ${offset === 0 ? `
            <span class="topic-reel-due-badge" aria-label="${item.due} due today, ${item.weak} weak">
              <strong>${item.due}</strong>
              <span>Due today</span>
              <em>${item.weak} weak</em>
            </span>
          ` : ""}
        `;
        card.addEventListener("click", () => {
          if (offset === 0) {
            navigateToTopic(item.topic);
            return;
          }
          animateTopicReelTo(item.topic, offset);
        });
        reelList.appendChild(card);
      }
    }

    renderTopicReel();
  }

  function renderRecentSubtopics(topic) {
    const subtopics = recentSubtopicsFor(topic);
    if (subtopics.length === 0) {
      window.location.hash = "topics";
      return;
    }

    document.body.classList.remove("is-study-mode", "is-bank-mode", "is-zen-mode");
    document.body.classList.add("is-landing-mode");
    state.topic = null;
    state.recentSubtopicTopic = topic;
    topicLanding.hidden = false;
    studyPage.hidden = true;
    bankPage.hidden = true;
    visibleCount.textContent = String(subtopics.length);
    totalCount.textContent = String(allRecentSubtopicCount());
    setRecentSubtopicHeader(topic);

    const meta = topicMeta[topic];
    const activeSubtopic = selectedRecentSubtopic(topic);
    const relatedSubtopics = subtopics.filter((subtopic) => subtopic[0] !== activeSubtopic[0]);
    const isDenseRelated = relatedSubtopics.length >= 5;
    const stageHeight = isDenseRelated
      ? 520
      : Math.max(520, Math.min(600, relatedSubtopics.length * 122 + Math.max(0, relatedSubtopics.length - 1) * 10));

    topicLanding.innerHTML = `
      <div class="recent-topic-page${isDenseRelated ? " is-dense-related" : ""}" style="--topic:${meta.color}; --accent:${meta.accent}; --recent-stage-height:${stageHeight}px" aria-label="Recent topic selector">
        <aside class="recent-topic-sidebar" aria-label="Recent topic controls">
          <button class="topic-quick-card recent-side-card topic-memory-card" type="button" data-action="open-bank">
            <span>Saved review</span>
            <strong>Memory <br>Bank</strong>
            <em>${markedCards.size} saved · ${dueCount()} due</em>
          </button>
        </aside>
        <div class="recent-focus-stage">
          <button class="recent-focus-card" type="button" aria-label="Study recent topic ${escapeHtml(activeSubtopic[0])}">
            <span class="recent-focus-kicker">${escapeHtml(meta.zh)} / ${escapeHtml(meta.label)}</span>
            <h2>${escapeHtml(activeSubtopic[0])}</h2>
            <p>${escapeHtml(activeSubtopic[1])}</p>
          </button>
          <div class="recent-stack" aria-label="Related recent topics">
            ${relatedSubtopics.map((subtopic, index) => {
              const pairCount = Math.ceil((subtopic[2] || []).length / 2);
              return `
                <button class="recent-subtopic-card" type="button" data-subtopic="${escapeHtml(subtopic[0])}" style="--stack-index:${index}">
                  <span>${escapeHtml(subtopic[1])}</span>
                  <strong>${escapeHtml(subtopic[0])}</strong>
                  <em>${pairCount} pairs / ${(subtopic[2] || []).length} phrases</em>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    topicLanding.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "open-bank") window.location.hash = "bank";
      });
    });

    topicLanding.querySelector(".recent-focus-card").addEventListener("click", () => {
      openRecentSubtopicStudy(topic, activeSubtopic);
    });

    topicLanding.querySelectorAll(".recent-subtopic-card").forEach((button) => {
      button.addEventListener("click", () => {
        const subtopic = subtopics.find((item) => item[0] === button.dataset.subtopic);
        if (!subtopic) return;
        setSelectedRecentSubtopic(topic, subtopic);
        renderRecentSubtopics(topic);
      });
    });
  }

  function renderInlineRecentTopics(topic) {
    const subtopics = recentSubtopicsFor(topic);
    if (!recentTopicInline || subtopics.length === 0 || state.zenActive) {
      if (recentTopicInline) {
        recentTopicInline.hidden = true;
        recentTopicInline.innerHTML = "";
      }
      return;
    }

    const meta = topicMeta[topic];
    const selected = selectedRecentSubtopic(topic);
    recentTopicInline.hidden = false;
    recentTopicInline.style.setProperty("--topic", meta.color);
    recentTopicInline.style.setProperty("--accent", meta.accent);
    recentTopicInline.innerHTML = `
      <div class="recent-inline-heading">
        <span>2025-2026 高频 · ${escapeHtml(meta.zh)}</span>
        <strong>Recent Topic</strong>
      </div>
      <div class="recent-inline-list" aria-label="${escapeHtml(meta.label)} recent writing topics">
        ${subtopics.map((subtopic) => {
          const pairCount = Math.ceil((subtopic[2] || []).length / 2);
          const isSelected = selected && selected[0] === subtopic[0];
          return `
            <button class="recent-inline-card${isSelected ? " is-active" : ""}" type="button" data-subtopic="${escapeHtml(subtopic[0])}">
              <span>${escapeHtml(subtopic[1])}</span>
              <strong>${escapeHtml(subtopic[0])}</strong>
              <em>${pairCount} pairs / ${(subtopic[2] || []).length} phrases</em>
            </button>
          `;
        }).join("")}
      </div>
    `;

    recentTopicInline.querySelectorAll(".recent-inline-card").forEach((button) => {
      button.addEventListener("click", () => {
        const subtopic = subtopics.find((item) => item[0] === button.dataset.subtopic);
        if (!subtopic) return;
        applyRecentSubtopicFilter(topic, subtopic);
      });
    });
  }

  function searchGroupKey(card) {
    return [card.topic, card.baseChinese, card.baseEnglish].join("::");
  }

  function cardSearchHaystack(card, includeType = true) {
    return [
      card.baseChinese,
      card.baseEnglish,
      card.frontChinese,
      card.backEnglish,
      includeType ? card.type : "",
      synonymSearchText(card)
    ].join(" ").toLowerCase();
  }

  function cardMatchesQuery(card, query, includeType = true) {
    return cardSearchHaystack(card, includeType).includes(query);
  }

  function currentCards() {
    const query = state.query.trim().toLowerCase();
    let cards = allCards.filter((card) => card.topic === state.topic);
    if (query) {
      const matchedGroups = new Set(
        cards
          .filter((card) => cardMatchesQuery(card, query, false))
          .map(searchGroupKey)
      );
      cards = cards.filter((card) => cardMatchesQuery(card, query) || matchedGroups.has(searchGroupKey(card)));
    }
    if (state.practiceMode === "banked") {
      cards = cards.filter((card) => markedCards.has(cardId(card)));
    }
    if (state.practiceMode === "weak") {
      cards = cards.filter((card) => reviewState(card) === "weak");
    }
    if (state.practiceMode === "due") {
      cards = cards.filter((card) => isDue(card));
    }
    if (state.randomSalt) {
      cards = [...cards].sort((a, b) => stableHash(`${state.randomSalt}:${cardId(a)}`) - stableHash(`${state.randomSalt}:${cardId(b)}`));
    }
    return cards;
  }

  function makeCard(card) {
    const meta = topicMeta[card.topic];
    const id = cardId(card);
    const isMarked = markedCards.has(id);
    const wrapper = document.createElement("article");
    wrapper.className = "flashcard-shell";
    wrapper.style.setProperty("--topic", meta.color);
    wrapper.innerHTML = `
      <div class="collocation-panel">
        <div class="card-tools">
          <span class="card-tool-label">${escapeHtml(card.type)}</span>
          <span class="card-tool-actions">
            <button class="zen-start-button" type="button" aria-label="Start zen mode from ${escapeHtml(card.frontChinese)}">Zen</button>
            <button class="mark-button${isMarked ? " is-marked" : ""}" type="button" aria-pressed="${isMarked}" aria-label="${isMarked ? "Remove from" : "Add to"} unfamiliar collocation bank">
              <span class="mark-icon" aria-hidden="true">${isMarked ? "!" : "+"}</span>
              <span>${isMarked ? "Banked" : "Mark"}</span>
            </button>
          </span>
        </div>
        <button class="flashcard" type="button" aria-label="${escapeHtml(card.frontChinese)}, flip card">
          <span class="card-inner">
            <span class="card-face card-front">
              <span class="card-type">${escapeHtml(card.type)}</span>
              <span class="card-text">${renderHighlighted(card.frontChinese, card.highlightChinese)}</span>
              <span class="card-meta">Chinese front</span>
            </span>
            <span class="card-face card-back">
              <span class="card-type">${escapeHtml(card.topic)}</span>
              <span class="card-text">${renderHighlighted(card.backEnglish, card.highlightEnglish)}</span>
              <span class="card-meta">English back</span>
            </span>
          </span>
        </button>
      </div>
    `;
    const button = wrapper.querySelector(".flashcard");
    const markButton = wrapper.querySelector(".mark-button");
    const zenStartButton = wrapper.querySelector(".zen-start-button");
    button.addEventListener("click", () => button.classList.toggle("is-flipped"));
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.classList.toggle("is-flipped");
      }
    });
    zenStartButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      enterZenFromCard(card);
    });
    markButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      markButton.disabled = true;
      markButton.classList.add("is-confirming");
      window.setTimeout(() => toggleMarked(card), 120);
    });
    return wrapper;
  }

  function sortedMarkedCards() {
    return markedCardList().sort((a, b) => {
      if (a.topic === b.topic) return cardId(a).localeCompare(cardId(b));
      return topicOrder.indexOf(a.topic) - topicOrder.indexOf(b.topic);
    });
  }

  function updateToolbarBankButton() {
    const due = dueCount();
    const weak = weakCount();
    if (collocationBank) {
      collocationBank.hidden = true;
      collocationBank.innerHTML = "";
    }
    bankButton.setAttribute("aria-label", `Open memory bank, ${due} due today, ${weak} weak`);
    bankButton.setAttribute("data-tooltip", `${due} due today · ${weak} weak`);
    bankButton.title = `${due} due today · ${weak} weak`;
    bankButton.innerHTML = `
      ${iconSvg("bank")}
      <span class="bank-button-copy">
        <strong>Memory bank</strong>
        <em>${due} due today</em>
      </span>
    `;
  }

  function renderBankPage() {
    document.body.classList.remove("is-study-mode", "is-zen-mode", "is-landing-mode");
    document.body.classList.add("is-bank-mode");
    const cards = sortedMarkedCards();
    const savedDue = cards.filter((card) => isDue(card)).length;
    topicLanding.hidden = true;
    studyPage.hidden = true;
    bankPage.hidden = false;
    visibleCount.textContent = String(cards.length);
    totalCount.textContent = String(allCards.length);
    setNeutralHeader("Review the collocations you marked as unfamiliar.");
    playBankEntryTransition();
    bankPage.innerHTML = `
      <div class="bank-reel-hero" aria-label="Memory bank workspace">
        <aside class="bank-quick-stack" aria-label="Memory bank actions">
          <button id="bankBackButton" class="topic-quick-card bank-home-card" type="button">
            <span>Study flow</span>
            <strong>Topic <br>Home</strong>
            <em>Choose another topic</em>
          </button>
          <button id="bankReviewButton" class="topic-quick-card bank-due-card" type="button" ${cards.length === 0 ? "disabled" : ""}>
            <span>Saved review</span>
            <strong>${cards.length} <br>Saved</strong>
            <em>${savedDue} due today</em>
          </button>
        </aside>
        <section class="bank-stage" aria-label="Saved collocations">
          <div class="bank-stage-copy">
            <p class="eyebrow">Memory Bank</p>
            <h2>Unfamiliar collocations</h2>
          </div>
          <div class="bank-reel-window">
            <div class="bank-page-grid"></div>
          </div>
        </section>
      </div>
    `;
    bankPage.querySelector("#bankBackButton").addEventListener("click", () => {
      window.location.hash = "topics";
    });
    bankPage.querySelector("#bankReviewButton").addEventListener("click", () => {
      if (cards.length === 0) return;
      state.practiceMode = "banked";
      if (practiceModeSelect) practiceModeSelect.value = state.practiceMode;
      resetZenPosition();
      navigateToTopic(state.lastTopic || cards[0]?.topic || "Technology");
    });

    const grid = bankPage.querySelector(".bank-page-grid");
    if (cards.length === 0) {
      grid.innerHTML = '<div class="empty-state">No marked collocations yet.</div>';
      return;
    }

    cards.forEach((card) => {
      const meta = topicMeta[card.topic];
      const item = document.createElement("article");
      item.className = "bank-item";
      item.style.setProperty("--topic", meta.color);
      item.innerHTML = `
        <div class="bank-copy">
          <span class="bank-topic">${escapeHtml(card.topic)} · ${escapeHtml(card.type)}</span>
          <strong>${renderHighlighted(card.frontChinese, card.highlightChinese)}</strong>
          <span>${renderHighlighted(card.backEnglish, card.highlightEnglish)}</span>
        </div>
        <button class="bank-remove" type="button" aria-label="Remove ${escapeHtml(card.frontChinese)} from bank">Remove</button>
      `;
      item.querySelector(".bank-remove").addEventListener("click", () => {
        item.classList.add("is-removing");
        window.setTimeout(() => toggleMarked(card, "Removed from Memory"), 180);
      });
      grid.appendChild(item);
    });
  }

  function renderFilters() {
    filtersEl.innerHTML = "";
    topicOrder.forEach((topic) => {
      const meta = topicMeta[topic];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "topic-filter";
      button.textContent = meta.label;
      button.style.setProperty("--topic", meta.color);
      button.classList.toggle("is-active", state.topic === topic);
      button.addEventListener("click", () => navigateToTopic(topic));
      filtersEl.appendChild(button);
    });
  }

  function renderZenCompletionPage() {
    const stats = state.zenSessionStats || createZenSessionStats(0);
    zenPage.hidden = false;
    zenPage.innerHTML = `
      <div class="zen-complete">
        <p class="topic-label">今日复习完成</p>
        <h2>完成了</h2>
        <div class="zen-complete-stats" aria-label="Review session summary">
          <span><strong>${stats.reviewed}</strong><small>已复习</small></span>
          <span><strong>${stats.again}</strong><small>不会</small></span>
          <span><strong>${stats.hard}</strong><small>模糊</small></span>
          <span><strong>${stats.good}</strong><small>认识</small></span>
          <span><strong>${stats.easy}</strong><small>熟练</small></span>
        </div>
        <div class="zen-complete-actions">
          <button id="zenCompleteAllButton" type="button">看全部卡片</button>
          <button id="zenCompleteExitButton" type="button">退出 Zen</button>
        </div>
      </div>
    `;
    zenPage.querySelector("#zenCompleteAllButton").addEventListener("click", () => {
      state.practiceMode = "all";
      if (practiceModeSelect) practiceModeSelect.value = state.practiceMode;
      state.zenActive = false;
      resetZenPosition();
      state.zenSessionStats = null;
      renderStudyPage(state.topic);
    });
    zenPage.querySelector("#zenCompleteExitButton").addEventListener("click", exitZen);
  }

  function zenFrontLabel() {
    return "Chinese front";
  }

  function zenBackLabel() {
    return "English back";
  }

  function zenFrontText(card) {
    return renderHighlighted(card.frontChinese, card.highlightChinese);
  }

  function zenBackText(card) {
    return renderHighlighted(card.backEnglish, card.highlightEnglish);
  }

  function zenTextDensity(text, side) {
    const normalized = String(text || "").trim();
    const length = [...normalized].length;
    const longestWord = normalized.split(/\s+/).reduce((longest, word) => Math.max(longest, [...word].length), 0);
    if (side === "back") {
      if (length > 34 || longestWord > 15) return "dense";
      if (length > 24 || longestWord > 11) return "compact";
      return "normal";
    }
    if (length > 18) return "dense";
    if (length > 12) return "compact";
    return "normal";
  }

  function renderZenPage(cards) {
    if (!state.zenActive) {
      zenPage.hidden = true;
      zenPage.innerHTML = "";
      return;
    }

    if (cards.length === 0) {
      if (state.practiceMode === "due") {
        renderZenCompletionPage();
        return;
      }
      state.zenActive = false;
      zenPage.hidden = true;
      zenPage.innerHTML = "";
      return;
    }

    if (state.zenIndex >= cards.length) state.zenIndex = 0;
    const card = cards[state.zenIndex];
    const meta = topicMeta[card.topic];
    const frontDensity = zenTextDensity(card.frontChinese, "front");
    const backDensity = zenTextDensity(card.backEnglish, "back");
    const ratingButtons = Object.entries(REVIEW_RATINGS).map(([rating, config]) => `
      <button class="zen-review-button ${config.className}" data-rating="${rating}" type="button">
        <span class="rating-label">${config.label}</span>
        <span class="rating-interval">${intervalLabel(nextIntervalFor(card, rating))}</span>
      </button>
    `).join("");
    zenPage.hidden = false;
    zenPage.style.setProperty("--topic", meta.color);
    zenPage.classList.remove("is-showing-all-extra");
    zenPage.innerHTML = `
      <div class="zen-topbar">
        <div>
          <p class="topic-label">${escapeHtml(meta.zh)} / ${escapeHtml(card.type)}</p>
        </div>
        <div class="zen-actions">
          <span class="zen-count">${state.zenIndex + 1} / ${cards.length}</span>
          <button id="zenExitButton" class="zen-exit-button" type="button" aria-label="退出 Zen 模式" data-tooltip="退出 Zen 模式">
            ${iconSvg("exit")}
            <span>退出 Zen</span>
          </button>
        </div>
      </div>
      <div class="zen-stage${state.zenFlipped ? " has-extra-angle" : " is-recall-only"}">
        <button class="zen-card zen-front-${frontDensity} zen-back-${backDensity}${state.zenFlipped ? " is-flipped" : ""}" type="button" aria-label="${escapeHtml(card.frontChinese)}, zen flip card">
          <span class="zen-inner">
            <span class="zen-face zen-front">
              <span class="card-type">${zenFrontLabel()}</span>
              <span class="zen-text">${zenFrontText(card)}</span>
              <span class="card-meta">Space: reveal answer / click: flip card</span>
            </span>
            <span class="zen-face zen-back">
              <span class="card-type">${zenBackLabel()}</span>
              <span class="zen-text">${zenBackText(card)}</span>
              <span class="card-meta">Rate it, then move to the next card.</span>
            </span>
          </span>
        </button>
        <span class="zen-mastery-pill" aria-live="polite"></span>
        ${state.zenFlipped ? renderZenSynonymPanel(card) : ""}
      </div>
      <div class="zen-review" aria-label="Zen review controls">
        <span class="zen-review-state">${escapeHtml(reviewStateLabel(card))}</span>
        ${ratingButtons}
      </div>
    `;

    zenPage.querySelector("#zenExitButton").addEventListener("click", exitZen);
    bindZenExtraToggle();
    zenPage.querySelectorAll(".zen-review-button").forEach((button) => {
      button.addEventListener("click", () => completeZenReview(card, button.dataset.rating));
    });
    zenPage.querySelector(".zen-card").addEventListener("click", toggleZenCardFlip);
    updateReviewControls(card);
    saveZenProgress();
  }

  function renderStudyPage(topic) {
    document.body.classList.add("is-study-mode");
    document.body.classList.remove("is-bank-mode", "is-landing-mode");
    if (state.topic && state.topic !== topic) {
      state.zenActive = false;
      resetZenPosition();
    }
    state.topic = topic;
    state.lastTopic = topic;
    topicLanding.hidden = true;
    studyPage.hidden = false;
    bankPage.hidden = true;
    studyPage.classList.toggle("is-zen", state.zenActive);
    document.body.classList.toggle("is-zen-mode", state.zenActive);
    renderFilters();
    updateToolbarBankButton();
    updateContinueZenButton();
    renderInlineRecentTopics(topic);
    if (practiceModeSelect) practiceModeSelect.value = state.practiceMode;
    if (searchInput) searchInput.value = state.query;

    const meta = topicMeta[topic];
    setTopicHeader(topic);
    bankButton.style.setProperty("--topic", meta.color);
    zenButton.style.setProperty("--topic", meta.color);
    const topicTotal = cardsForTopic(topic).length;
    const filtered = currentCards();
    visibleCount.textContent = String(filtered.length);
    totalCount.textContent = String(topicTotal);
    sectionsEl.innerHTML = "";
    renderZenPage(filtered);

    if (filtered.length === 0) {
      sectionsEl.innerHTML = `<div class="empty-state">${state.practiceMode === "due" ? "No cards are due today." : "No cards match the current search."}</div>`;
      playStudyEntryTransition();
      playResultsRefreshTransition();
      return;
    }

    const section = document.createElement("section");
    section.className = "topic-section";
    section.style.setProperty("--topic", meta.color);
    section.innerHTML = `
      <div class="card-grid"></div>
    `;

    const grid = section.querySelector(".card-grid");
    filtered.forEach((card) => grid.appendChild(makeCard(card)));
    sectionsEl.appendChild(section);
    playStudyEntryTransition();
    playResultsRefreshTransition();
  }

  function renderRoute() {
    const route = routeFromHash();
    if (route.type === "bank") {
      state.zenActive = false;
      resetZenPosition();
      renderBankPage();
      return;
    }
    if (route.type === "landing") {
      state.query = "";
      state.zenActive = false;
      resetZenPosition();
      if (searchInput) searchInput.value = "";
      renderLanding();
      return;
    }
    if (route.type === "recent") {
      state.query = "";
      state.zenActive = false;
      resetZenPosition();
      if (searchInput) searchInput.value = "";
      renderRecentSubtopics(route.topic);
      return;
    }
    renderStudyPage(route.topic);
  }

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    resetZenPosition();
    pendingResultsRefresh = true;
    renderStudyPage(state.topic);
  });

  if (practiceModeSelect) {
    practiceModeSelect.addEventListener("change", (event) => {
      state.practiceMode = event.target.value === "random" ? "all" : event.target.value;
      if (event.target.value === "random") state.randomSalt = String(Date.now());
      resetZenPosition();
      pendingResultsRefresh = true;
      renderStudyPage(state.topic);
    });
  }

  resetButton.addEventListener("click", () => {
    document.querySelectorAll(".flashcard.is-flipped").forEach((card) => {
      card.classList.remove("is-flipped");
    });
    state.randomSalt = String(Date.now());
    resetZenPosition();
    pendingResultsRefresh = true;
    renderStudyPage(state.topic);
    showToast("Cards shuffled");
  });

  orderResetButton.addEventListener("click", () => {
    document.querySelectorAll(".flashcard.is-flipped").forEach((card) => {
      card.classList.remove("is-flipped");
    });
    state.randomSalt = "";
    resetZenPosition();
    pendingResultsRefresh = true;
    renderStudyPage(state.topic);
    showToast("Card order reset");
  });

  bankButton.addEventListener("click", () => {
    state.zenActive = false;
    resetZenPosition();
    window.location.hash = "bank";
  });

  zenButton.addEventListener("click", () => enterZen());
  continueZenButton.addEventListener("click", continueZen);
  exportMemoryButton.addEventListener("click", exportMemory);
  importMemoryButton.addEventListener("click", () => importMemoryInput.click());
  importMemoryInput.addEventListener("change", (event) => {
    importMemoryFile(event.target.files && event.target.files[0]);
  });

  document.addEventListener("keydown", (event) => {
    if (!state.zenActive) return;
    if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(event.code)) {
      const cards = currentCards();
      const card = cards[state.zenIndex];
      const rating = ["again", "hard", "good", "easy"][Number(event.code.replace("Digit", "")) - 1];
      if (card && rating) {
        event.preventDefault();
        completeZenReview(card, rating);
      }
      return;
    }
    if (event.code === "Space") {
      event.preventDefault();
      advanceZen();
      return;
    }
    if (event.code === "ArrowRight") {
      event.preventDefault();
      moveZen(1);
      return;
    }
    if (event.code === "ArrowLeft") {
      event.preventDefault();
      moveZen(-1);
    }
  });

  backButton.addEventListener("click", () => {
    state.zenActive = false;
    resetZenPosition();
    window.location.hash = "topics";
  });

  headerTopicButton.addEventListener("click", () => {
    state.zenActive = false;
    resetZenPosition();
    window.location.hash = "topics";
  });

  window.addEventListener("hashchange", renderRoute);
  setupActionButtons();
  renderRoute();
})();
