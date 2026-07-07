const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(rootDir, "..");
const dataPath = path.join(rootDir, "data.js");
const standalonePath = path.join(
  projectDir,
  "open-here",
  "ielts-topic-collocation.html"
);

const EXPECTED_EDUCATION_CARD_COUNT = 80;
const REQUIRED_STANCES = ["Negative", "Neutral", "Positive"];
const REQUIRED_TONE_PREFIX = "\u8fd9\u6761\u642d\u914d";

const BAD_PHRASES = [
  "strengthen an independent school",
  "review an independent school",
  "weaken an independent school",
  "strengthen boarding school",
  "weaken boarding school",
  "maintain tuition fees",
  "undermine dropout",
  "traceable online learning",
  "transparent private school",
  "centralized private school",
  "fragmented private school",
  "examine high-tech products",
  "neglect high-tech products",
];

const CORRUPTION_PATTERNS = [
  /\?{4,}/,
  /\uFFFD/,
  /杩欐潯/,
  /銆/,
  /锛/,
  /脙|脗/,
];

function addFailure(failures, message) {
  failures.push(message);
}

function loadFlashcardData(failures) {
  let source;
  try {
    source = fs.readFileSync(dataPath, "utf8");
  } catch (error) {
    addFailure(failures, `Unable to read data.js: ${error.message}`);
    return [];
  }

  const ctx = { window: {} };
  try {
    vm.createContext(ctx);
    vm.runInContext(source, ctx, { filename: dataPath, timeout: 1000 });
  } catch (error) {
    addFailure(failures, `Unable to evaluate data.js: ${error.message}`);
    return [];
  }

  const cards = ctx.window.FLASHCARD_DATA;
  if (!Array.isArray(cards)) {
    addFailure(failures, "window.FLASHCARD_DATA is missing or is not an array");
    return [];
  }

  return cards;
}

function normalizePhrase(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function findCorruptionMarkers(value) {
  const text = String(value || "");
  return CORRUPTION_PATTERNS.filter((pattern) => pattern.test(text)).map((pattern) =>
    pattern.toString()
  );
}

function cardLabel(card, index) {
  const english = card.backEnglish || card.baseEnglish || "(missing English)";
  const chinese = card.frontChinese || card.baseChinese || "(missing Chinese)";
  return `Education card ${index + 1} [${english} / ${chinese}]`;
}

function validateOption(failures, label, option, optionIndex) {
  const optionLabel = `${label} option ${optionIndex + 1}`;

  if (option.manual !== true) {
    addFailure(failures, `${optionLabel}: manual must be true`);
  }

  for (const field of ["phrase", "zh", "tone"]) {
    if (!String(option[field] || "").trim()) {
      addFailure(failures, `${optionLabel}: missing ${field}`);
    }
  }

  if (option.tone && !String(option.tone).startsWith(REQUIRED_TONE_PREFIX)) {
    addFailure(
      failures,
      `${optionLabel}: tone must explain the whole collocation with a Chinese sentence starting with "${REQUIRED_TONE_PREFIX}"`
    );
  }

  const phrase = normalizePhrase(option.phrase);
  for (const badPhrase of BAD_PHRASES) {
    if (phrase === badPhrase || phrase.includes(badPhrase)) {
      addFailure(failures, `${optionLabel}: phrase contains known bad phrase "${badPhrase}"`);
    }
  }

  for (const field of ["phrase", "zh", "tone"]) {
    const markers = findCorruptionMarkers(option[field]);
    if (markers.length > 0) {
      addFailure(
        failures,
        `${optionLabel}: ${field} contains possible corruption marker(s): ${markers.join(", ")}`
      );
    }
  }
}

function validateEducationCards(cards, failures) {
  const educationCards = cards.filter((card) => card.topic === "Education");

  if (educationCards.length !== EXPECTED_EDUCATION_CARD_COUNT) {
    addFailure(
      failures,
      `Expected ${EXPECTED_EDUCATION_CARD_COUNT} Education cards, found ${educationCards.length}`
    );
  }

  educationCards.forEach((card, cardIndex) => {
    const label = cardLabel(card, cardIndex);
    const rawOptions = card.synonymNetworks?.[0]?.options;
    const options = Array.isArray(rawOptions) ? rawOptions : [];

    if (rawOptions && !Array.isArray(rawOptions)) {
      addFailure(failures, `${label}: options must be an array`);
    }

    if (options.length !== 3) {
      addFailure(failures, `${label}: expected 3 options, found ${options.length}`);
    }

    const actualStances = [...new Set(options.map((option) => option.stance).filter(Boolean))].sort();
    const expectedStances = [...REQUIRED_STANCES].sort();
    if (
      actualStances.length !== expectedStances.length ||
      actualStances.some((stance, index) => stance !== expectedStances[index])
    ) {
      addFailure(
        failures,
        `${label}: stance set must be exactly ${REQUIRED_STANCES.join(", ")}; found ${
          actualStances.join(", ") || "(none)"
        }`
      );
    }

    options.forEach((option, optionIndex) => {
      validateOption(failures, label, option, optionIndex);
    });
  });
}

function validateStandaloneHtml(failures) {
  if (!fs.existsSync(standalonePath)) return;

  let html;
  try {
    html = fs.readFileSync(standalonePath, "utf8");
  } catch (error) {
    addFailure(failures, `Unable to read standalone HTML: ${error.message}`);
    return;
  }

  const markers = findCorruptionMarkers(html);
  if (markers.length > 0) {
    addFailure(
      failures,
      `Standalone HTML contains possible Chinese corruption marker(s): ${markers.join(", ")}`
    );
  }
}

function main() {
  const failures = [];
  const cards = loadFlashcardData(failures);

  if (cards.length > 0) {
    validateEducationCards(cards, failures);
  }
  validateStandaloneHtml(failures);

  if (failures.length > 0) {
    console.error("Education manual optional-collocation validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(
    `Validated ${EXPECTED_EDUCATION_CARD_COUNT} Education cards with manual optional collocations.`
  );
}

main();
