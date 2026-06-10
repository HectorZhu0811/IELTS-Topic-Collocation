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
    practiceMode: "all",
    randomSalt: "initial",
    zenActive: false,
    zenIndex: 0,
    zenFlipped: false
  };

  const allCards = window.FLASHCARD_DATA || [];
  const topicLanding = document.getElementById("topicLanding");
  const studyPage = document.getElementById("studyPage");
  const sectionsEl = document.getElementById("topicSections");
  const toolbar = document.querySelector(".toolbar");
  const filtersEl = document.getElementById("topicFilters");
  const searchInput = document.getElementById("searchInput");
  const resetButton = document.getElementById("resetButton");
  const bankButton = document.getElementById("bankButton");
  const zenButton = document.getElementById("zenButton");
  const continueZenButton = document.getElementById("continueZenButton");
  const practiceModeSelect = document.getElementById("practiceMode");
  const backButton = document.getElementById("backButton");
  const collocationBank = document.getElementById("collocationBank");
  const zenPage = document.getElementById("zenPage");
  const bankPage = document.getElementById("bankPage");
  const visibleCount = document.getElementById("visibleCount");
  const totalCount = document.getElementById("totalCount");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const pageEyebrow = document.querySelector(".app-header .eyebrow");
  const pageTitle = document.querySelector(".app-header h1");
  const BANK_KEY = "task2-collocation-bank";
  const REVIEW_KEY = "task2-collocation-review";
  const ZEN_PROGRESS_KEY = "task2-collocation-zen-progress";
  const DEFAULT_EYEBROW = "IELTS Writing Task 2";
  const DEFAULT_TITLE = "Collocation Flashcards Advanced";
  const DEFAULT_SUBTITLE = "Choose a topic, study the collocation, then open its synonym network for precise alternatives.";
  const markedCards = new Set(loadBank());
  const reviewStates = new Map(Object.entries(loadStoredObject(REVIEW_KEY)));

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
      bank: '<path d="M4 7h16"/><path d="M6 7v11"/><path d="M10 7v11"/><path d="M14 7v11"/><path d="M18 7v11"/><path d="M3 18h18"/><path d="m12 3 8 4H4Z"/>',
      play: '<path d="M8 5v14l11-7Z"/>',
      focus: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="m19.1 4.9-2.1 2.1"/><path d="m7 17-2.1 2.1"/>',
      open: '<path d="M7 17 17 7"/><path d="M9 7h8v8"/><path d="M5 5h6"/><path d="M5 5v14h14v-6"/>',
      topics: '<path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/>'
    };
    return `<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ""}</svg>`;
  }

  function setupActionButtons() {
    if (toolbar && backButton) {
      toolbar.insertBefore(backButton, toolbar.firstElementChild);
    }
    backButton.classList.add("icon-button");
    backButton.setAttribute("aria-label", "Choose another topic");
    backButton.title = "Choose another topic";
    backButton.innerHTML = iconSvg("topics");

    resetButton.classList.add("icon-button");
    resetButton.setAttribute("aria-label", "Reset flipped cards");
    resetButton.title = "Reset flipped cards";
    resetButton.innerHTML = iconSvg("rotate");

    bankButton.classList.add("icon-button");
    bankButton.setAttribute("aria-label", "Open collocation bank");
    bankButton.title = "Collocation bank";
    bankButton.innerHTML = iconSvg("bank");

    continueZenButton.classList.add("icon-button");
    continueZenButton.setAttribute("aria-label", "Continue Zen");
    continueZenButton.title = "Continue Zen";
    continueZenButton.innerHTML = iconSvg("play");

    zenButton.classList.add("primary-action");
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
    pageEyebrow.textContent = meta.zh;
    pageTitle.textContent = meta.label;
    pageSubtitle.textContent = meta.concept;
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
        option.example,
        option.reviewNote
      ])
    ]).join(" ");
  }

  function renderStanceTag(stance) {
    const safeStance = ["Positive", "Neutral", "Negative"].includes(stance) ? stance : "Neutral";
    return `<span class="stance-tag stance-${safeStance.toLowerCase()}">${safeStance}</span>`;
  }

  function renderSynonymNetwork(card) {
    const groups = synonymGroups(card);
    if (groups.length === 0) return "";
    const groupMarkup = groups.map((group) => {
      const options = (group.options || []).map((option) => `
        <li class="synonym-item">
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
          <span>Synonyms / Alternatives</span>
        </summary>
        <div class="synonym-network-body">
          ${groupMarkup}
        </div>
      </details>
    `;
  }

  function renderZenSynonymPanel(card) {
    const groups = synonymGroups(card);
    if (groups.length === 0) {
      return '<aside class="zen-synonym-panel"><p class="empty-state">No synonym alternatives for this card.</p></aside>';
    }
    const groupMarkup = groups.map((group) => {
      const options = (group.options || []).map((option) => `
        <li class="synonym-item">
          <div class="synonym-item-head">
            <strong>${escapeHtml(option.phrase || option.term)}</strong>
            ${renderStanceTag(option.stance)}
          </div>
          <p class="synonym-zh">中文：${escapeHtml(option.zh || "")}</p>
          <p class="synonym-tone">语气：${escapeHtml(option.tone || "")}</p>
        </li>
      `).join("");
      return `
        <section class="zen-synonym-group">
          <ul class="synonym-list">${options}</ul>
        </section>
      `;
    }).join("");
    return `
      <aside class="zen-synonym-panel" aria-label="Synonyms and alternatives">
        <div class="zen-synonym-head">
          <div>
            <p class="topic-label">Synonyms / Alternatives</p>
            <h3>Alternative wording</h3>
          </div>
        </div>
        ${groupMarkup}
      </aside>
    `;
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
    return reviewStates.get(cardId(card)) || "";
  }

  function reviewStateLabel(card) {
    const value = reviewState(card);
    if (value === "weak") return "Need practice";
    if (value === "known") return "Familiar";
    return "Not reviewed";
  }

  function updateReviewControls(card) {
    const stateText = zenPage.querySelector(".zen-review-state");
    if (stateText) stateText.textContent = reviewStateLabel(card);
    zenPage.querySelectorAll(".zen-review-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.review === reviewState(card));
    });
  }

  function setCardReview(card, value) {
    const id = cardId(card);
    if (value === "weak") {
      reviewStates.set(id, "weak");
      markedCards.add(id);
    } else if (value === "known") {
      reviewStates.set(id, "known");
      markedCards.delete(id);
    }
    saveReviewStates();
    saveBank();
    updateReviewControls(card);
  }

  function toggleMarked(card) {
    const id = cardId(card);
    if (markedCards.has(id)) {
      markedCards.delete(id);
      if (reviewStates.get(id) === "weak") {
        reviewStates.delete(id);
        saveReviewStates();
      }
    } else {
      markedCards.add(id);
    }
    saveBank();
    if (!bankPage.hidden) {
      renderBankPage();
    } else {
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
    renderStudyPage(state.topic);
  }

  function advanceZen() {
    const cards = currentCards();
    if (cards.length === 0) {
      exitZen();
      return;
    }
    if (!state.zenFlipped) {
      state.zenFlipped = true;
      const card = zenPage.querySelector(".zen-card");
      if (card) card.classList.add("is-flipped");
    } else {
      state.zenIndex = (state.zenIndex + 1) % cards.length;
      state.zenFlipped = false;
      saveZenProgress();
      renderZenPage(cards);
    }
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
    state.practiceMode = progress.practiceMode || "all";
    state.randomSalt = progress.randomSalt || String(Date.now());
    if (searchInput) searchInput.value = state.query;
    if (practiceModeSelect) practiceModeSelect.value = state.practiceMode;
    state.topic = progress.topic;
    state.zenActive = true;
    state.zenIndex = Number(progress.zenIndex) || 0;
    state.zenFlipped = false;
    if (routeFromHash() !== progress.topic) {
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

  function moveZen(delta) {
    const cards = currentCards();
    if (!state.zenActive || cards.length === 0) return;
    state.zenIndex = (state.zenIndex + delta + cards.length) % cards.length;
    state.zenFlipped = false;
    saveZenProgress();
    renderZenPage(cards);
  }

  function navigateToTopic(topic) {
    window.location.hash = `topic/${encodeURIComponent(topic)}`;
  }

  function routeFromHash() {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "bank") return "bank";
    if (!hash || hash === "topics") return null;
    const match = hash.match(/^topic\/(.+)$/);
    if (!match) return null;
    const topic = decodeURIComponent(match[1]);
    return topicOrder.includes(topic) ? topic : null;
  }

  function renderLanding() {
    document.body.classList.remove("is-study-mode", "is-bank-mode");
    state.topic = null;
    topicLanding.hidden = false;
    studyPage.hidden = true;
    bankPage.hidden = true;
    visibleCount.textContent = String(topicOrder.length);
    totalCount.textContent = String(topicOrder.length);
    setNeutralHeader();

    topicLanding.innerHTML = `
      <div class="landing-intro">
        <p class="eyebrow">Topic map</p>
        <h2>Pick the world you are about to enter.</h2>
      </div>
      <div class="topic-gallery"></div>
    `;

    const gallery = topicLanding.querySelector(".topic-gallery");
    topicOrder.forEach((topic, index) => {
      const meta = topicMeta[topic];
      const count = cardsForTopic(topic).length;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "topic-tile";
      button.style.setProperty("--topic", meta.color);
      button.style.setProperty("--accent", meta.accent);
      button.style.setProperty("--delay", `${index * 22}ms`);
      button.setAttribute("aria-label", `Study ${meta.label}`);
      button.innerHTML = `
        <span class="tile-visual" aria-hidden="true">
          <span class="concept-plane plane-a"></span>
          <span class="concept-plane plane-b"></span>
          <span class="concept-line concept-line-a"></span>
          <span class="concept-line concept-line-b"></span>
          <span class="concept-tag tag-a">${escapeHtml(meta.imageWords[0])}</span>
          <span class="concept-tag tag-b">${escapeHtml(meta.imageWords[1])}</span>
          <span class="concept-tag tag-c">${escapeHtml(meta.imageWords[2])}</span>
        </span>
        <span class="tile-content">
          <span class="tile-kicker">${escapeHtml(meta.zh)}</span>
          <span class="tile-title">${escapeHtml(meta.label)}</span>
          <span class="tile-copy">${escapeHtml(meta.concept)}</span>
          <span class="tile-count">${count} cards</span>
        </span>
      `;
      button.addEventListener("click", () => navigateToTopic(topic));
      gallery.appendChild(button);
    });
  }

  function matches(card) {
    const query = state.query.trim().toLowerCase();
    if (card.topic !== state.topic) return false;
    if (!query) return true;
    const haystack = [
      card.baseChinese,
      card.baseEnglish,
      card.frontChinese,
      card.backEnglish,
      card.type,
      synonymSearchText(card)
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }

  function currentCards() {
    let cards = allCards.filter(matches);
    if (state.practiceMode === "banked") {
      cards = cards.filter((card) => markedCards.has(cardId(card)));
    }
    if (state.practiceMode === "weak") {
      cards = cards.filter((card) => reviewStates.get(cardId(card)) === "weak");
    }
    if (state.practiceMode === "random") {
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
      toggleMarked(card);
    });
    return wrapper;
  }

  function sortedMarkedCards() {
    return markedCardList().sort((a, b) => {
      if (a.topic === b.topic) return cardId(a).localeCompare(cardId(b));
      return topicOrder.indexOf(a.topic) - topicOrder.indexOf(b.topic);
    });
  }

  function renderBankEntry() {
    const count = markedCards.size;
    collocationBank.hidden = false;
    collocationBank.className = "collocation-bank is-compact";
    collocationBank.innerHTML = `
      <div class="bank-compact-copy">
        <strong>Bank</strong>
        <span>${count} saved</span>
      </div>
      <button class="bank-open compact-open" type="button" aria-label="Open collocation bank">${iconSvg("open")}<span>Open</span></button>
    `;
    collocationBank.querySelector(".bank-open").addEventListener("click", () => {
      window.location.hash = "bank";
    });
  }

  function renderBankPage() {
    document.body.classList.remove("is-study-mode");
    document.body.classList.add("is-bank-mode");
    const cards = sortedMarkedCards();
    topicLanding.hidden = true;
    studyPage.hidden = true;
    bankPage.hidden = false;
    visibleCount.textContent = String(cards.length);
    totalCount.textContent = String(allCards.length);
    setNeutralHeader("Review the collocations you marked as unfamiliar.");
    bankPage.innerHTML = `
      <div class="bank-page-header">
        <div>
          <p class="eyebrow">Collocation bank</p>
          <h2>Unfamiliar collocations</h2>
        </div>
        <div class="bank-page-actions">
          <span class="bank-count">${cards.length} saved</span>
          <button id="bankBackButton" type="button">Back to study</button>
        </div>
      </div>
      <div class="bank-page-grid"></div>
    `;
    bankPage.querySelector("#bankBackButton").addEventListener("click", () => {
      navigateToTopic(state.lastTopic || "Technology");
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
      item.querySelector(".bank-remove").addEventListener("click", () => toggleMarked(card));
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

  function renderZenPage(cards) {
    if (!state.zenActive) {
      zenPage.hidden = true;
      zenPage.innerHTML = "";
      return;
    }

    if (cards.length === 0) {
      state.zenActive = false;
      zenPage.hidden = true;
      zenPage.innerHTML = "";
      return;
    }

    if (state.zenIndex >= cards.length) state.zenIndex = 0;
    const card = cards[state.zenIndex];
    const meta = topicMeta[card.topic];
    zenPage.hidden = false;
    zenPage.style.setProperty("--topic", meta.color);
    zenPage.innerHTML = `
      <div class="zen-topbar">
        <div>
          <p class="topic-label">${escapeHtml(meta.zh)} / ${escapeHtml(card.type)}</p>
          <h2>Zen mode</h2>
        </div>
        <div class="zen-actions">
          <span class="zen-count">${state.zenIndex + 1} / ${cards.length}</span>
          <label class="zen-jump-control">
            <span>Jump</span>
            <input class="zen-jump-input" type="number" min="1" max="${cards.length}" value="${state.zenIndex + 1}">
          </label>
          <button class="zen-jump-button" type="button">Go</button>
          <button id="zenExitButton" type="button">Exit zen</button>
        </div>
      </div>
      <div class="zen-stage">
        <button class="zen-card${state.zenFlipped ? " is-flipped" : ""}" type="button" aria-label="${escapeHtml(card.frontChinese)}, zen flip card">
          <span class="zen-inner">
            <span class="zen-face zen-front">
              <span class="card-type">Chinese front</span>
              <span class="zen-text">${renderHighlighted(card.frontChinese, card.highlightChinese)}</span>
              <span class="card-meta">Space: flip · ← previous · → next</span>
            </span>
            <span class="zen-face zen-back">
              <span class="card-type">English back</span>
              <span class="zen-text">${renderHighlighted(card.backEnglish, card.highlightEnglish)}</span>
              <span class="card-meta">Space: next card · ← previous · → next</span>
            </span>
          </span>
        </button>
        ${renderZenSynonymPanel(card)}
      </div>
      <div class="zen-review" aria-label="Zen review controls">
        <span class="zen-review-state">${escapeHtml(reviewStateLabel(card))}</span>
        <button class="zen-review-button" data-review="known" type="button">Familiar</button>
        <button class="zen-review-button" data-review="weak" type="button">Not familiar</button>
      </div>
    `;

    zenPage.querySelector("#zenExitButton").addEventListener("click", exitZen);
    zenPage.querySelector(".zen-jump-button").addEventListener("click", () => {
      jumpZenTo(zenPage.querySelector(".zen-jump-input").value);
    });
    zenPage.querySelector(".zen-jump-input").addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      jumpZenTo(event.target.value);
    });
    zenPage.querySelectorAll(".zen-review-button").forEach((button) => {
      button.addEventListener("click", () => setCardReview(card, button.dataset.review));
    });
    zenPage.querySelector(".zen-card").addEventListener("click", advanceZen);
    updateReviewControls(card);
    saveZenProgress();
  }

  function renderStudyPage(topic) {
    document.body.classList.add("is-study-mode");
    document.body.classList.remove("is-bank-mode");
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
    renderFilters();
    renderBankEntry();
    updateContinueZenButton();
    if (practiceModeSelect) practiceModeSelect.value = state.practiceMode;

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
      sectionsEl.innerHTML = '<div class="empty-state">No cards match the current search.</div>';
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
  }

  function renderRoute() {
    const topic = routeFromHash();
    if (topic === "bank") {
      state.zenActive = false;
      resetZenPosition();
      renderBankPage();
      return;
    }
    if (!topic) {
      state.query = "";
      state.zenActive = false;
      resetZenPosition();
      if (searchInput) searchInput.value = "";
      renderLanding();
      return;
    }
    renderStudyPage(topic);
  }

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    resetZenPosition();
    renderStudyPage(state.topic);
  });

  practiceModeSelect.addEventListener("change", (event) => {
    state.practiceMode = event.target.value;
    if (state.practiceMode === "random") state.randomSalt = String(Date.now());
    resetZenPosition();
    renderStudyPage(state.topic);
  });

  resetButton.addEventListener("click", () => {
    document.querySelectorAll(".flashcard.is-flipped").forEach((card) => {
      card.classList.remove("is-flipped");
    });
  });

  bankButton.addEventListener("click", () => {
    state.zenActive = false;
    resetZenPosition();
    window.location.hash = "bank";
  });

  zenButton.addEventListener("click", () => enterZen());
  continueZenButton.addEventListener("click", continueZen);

  document.addEventListener("keydown", (event) => {
    if (!state.zenActive) return;
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

  window.addEventListener("hashchange", renderRoute);
  setupActionButtons();
  renderRoute();
})();
