const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const dataPath = path.join(rootDir, "data.js");
const outputDir = path.join(rootDir, "app", "src", "main", "assets", "data");
const cardsPath = path.join(outputDir, "cards.json");
const topicsPath = path.join(outputDir, "topics.json");

const topics = [
  { id: "Technology", zh: "科技", color: "#2563EB", accent: "#38BDF8" },
  { id: "Education", zh: "教育", color: "#16A34A", accent: "#84CC16" },
  { id: "Environment", zh: "环境", color: "#059669", accent: "#2DD4BF" },
  { id: "Government", zh: "政府", color: "#7C3AED", accent: "#C084FC" },
  { id: "Society", zh: "社会", color: "#DB2777", accent: "#FB7185" },
  { id: "Health", zh: "健康", color: "#DC2626", accent: "#F97316" },
  { id: "Urbanization", zh: "城市化", color: "#EA580C", accent: "#FACC15" },
  { id: "Media", zh: "媒体", color: "#CA8A04", accent: "#FDE047" },
  { id: "Economy", zh: "经济", color: "#8B5E34", accent: "#D6A15F" },
  { id: "Arts", zh: "艺术", color: "#9333EA", accent: "#E879F9" }
];

const context = vm.createContext({ window: {} });
const source = fs.readFileSync(dataPath, "utf8");
vm.runInContext(source, context, { filename: dataPath, timeout: 1000 });

const cards = context.window.FLASHCARD_DATA;

if (!Array.isArray(cards) || cards.length === 0) {
  throw new Error("window.FLASHCARD_DATA is missing or empty");
}

const cardTopics = new Set(cards.map((card) => card.topic));
const metadataTopics = new Set(topics.map((topic) => topic.id));
const missingMetadata = [...cardTopics].filter((topic) => !metadataTopics.has(topic));
const unusedMetadata = [...metadataTopics].filter((topic) => !cardTopics.has(topic));

if (missingMetadata.length > 0) {
  throw new Error(`Missing topic metadata for card topics: ${missingMetadata.join(", ")}`);
}

if (unusedMetadata.length > 0) {
  throw new Error(`Unused topic metadata with no cards: ${unusedMetadata.join(", ")}`);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(cardsPath, `${JSON.stringify(cards, null, 2)}\n`, "utf8");
fs.writeFileSync(topicsPath, `${JSON.stringify(topics, null, 2)}\n`, "utf8");

console.log(`Exported ${cards.length} cards to ${path.relative(rootDir, cardsPath)}`);
console.log(`Exported ${topics.length} topics to ${path.relative(rootDir, topicsPath)}`);
