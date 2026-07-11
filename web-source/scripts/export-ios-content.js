const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
globalThis.window = globalThis;

require(path.join(root, "web-source", "synonym-curation.js"));
require(path.join(root, "web-source", "data.js"));
const recentTopicTranslations = require(path.join(root, "web-source", "recent-topic-card-translations.js"));

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
  Technology: { zh: "科技", color: "#2563eb", accent: "#22c55e" },
  Education: { zh: "教育", color: "#16a34a", accent: "#84cc16" },
  Environment: { zh: "环境", color: "#059669", accent: "#2dd4bf" },
  Government: { zh: "政府", color: "#7c3aed", accent: "#f59e0b" },
  Society: { zh: "社会", color: "#db2777", accent: "#f97316" },
  Health: { zh: "健康", color: "#dc2626", accent: "#fb7185" },
  Urbanization: { zh: "城市化", color: "#ea580c", accent: "#facc15" },
  Media: { zh: "媒体", color: "#0891b2", accent: "#6366f1" },
  Economy: { zh: "经济", color: "#0f766e", accent: "#a3e635" },
  Arts: { zh: "艺术", color: "#9333ea", accent: "#f472b6" }
};

function cardId(card) {
  return [card.topic, card.type, card.frontChinese, card.backEnglish].join("::");
}

function normalizeCard(card) {
  return {
    id: cardId(card),
    topic: card.topic,
    type: card.type,
    frontChinese: card.frontChinese,
    backEnglish: card.backEnglish,
    baseChinese: card.baseChinese || "",
    baseEnglish: card.baseEnglish || "",
    highlightChinese: card.highlightChinese || "",
    highlightEnglish: card.highlightEnglish || "",
    synonymNetworks: Array.isArray(card.synonymNetworks) ? card.synonymNetworks : []
  };
}

function normalizedPhrase(value) {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("en");
}

const originalCards = (globalThis.FLASHCARD_DATA || []).map(normalizeCard);
const standaloneKeys = new Set(
  originalCards.map((card) => `${card.topic}::${normalizedPhrase(card.backEnglish)}`)
);
const addedCards = recentTopicTranslations.cards
  .filter((row) => !standaloneKeys.has(`${row.topic}::${normalizedPhrase(row.english)}`))
  .map((row) => normalizeCard({
    topic: row.topic,
    type: row.type,
    frontChinese: row.chinese,
    backEnglish: row.english,
    baseChinese: row.chinese,
    baseEnglish: row.english,
    highlightChinese: row.highlightChinese,
    highlightEnglish: row.highlightEnglish,
    synonymNetworks: []
  }));
const cards = [...originalCards, ...addedCards];

const content = {
  schemaId: "ielts-collocation-ios-content-v2",
  exportedAt: new Date().toISOString(),
  metadata: {
    cardCount: cards.length,
    topicCount: topicOrder.length,
    synonymOptionCount: cards.reduce((sum, card) => (
      sum + card.synonymNetworks.reduce((groupSum, group) => groupSum + (group.options || []).length, 0)
    ), 0)
  },
  topics: topicOrder.map((id) => ({
    id,
    zh: topicMeta[id].zh,
    color: topicMeta[id].color,
    accent: topicMeta[id].accent,
    cardCount: cards.filter((card) => card.topic === id).length
  })),
  cards
};

const output = path.join(root, "ios-app", "IELTSCollocation", "Resources", "Content", "ios-content.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(content, null, 2)}\n`, "utf8");

console.log(`Exported ${cards.length} cards (${addedCards.length} merged Recent Topic cards), ${content.metadata.synonymOptionCount} synonym options to ${output}`);
