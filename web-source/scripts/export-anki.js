const fs = require("fs");
const path = require("path");
const vm = require("vm");

const sourceDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(sourceDir, "..");
const dataPath = path.join(sourceDir, "data.js");
const outputDir = path.join(projectDir, "project-artifacts", "exports", "anki", "full-export");

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
const topicZh = {
  Technology: "科技",
  Education: "教育",
  Environment: "环境",
  Government: "政府",
  Society: "社会",
  Health: "健康",
  Urbanization: "城市化",
  Media: "媒体",
  Economy: "经济",
  Arts: "艺术"
};

function loadCardsFromWebSource() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(dataPath, "utf8"), sandbox, { filename: dataPath });
  if (!Array.isArray(sandbox.window.FLASHCARD_DATA)) {
    throw new Error("web-source/data.js did not expose window.FLASHCARD_DATA");
  }
  return sandbox.window.FLASHCARD_DATA;
}

const cards = loadCardsFromWebSource();
const topics = topicOrder.map((id) => ({ id, zh: topicZh[id] || id }));

const topicById = new Map(topics.map((topic) => [topic.id, topic]));

function escapeTsv(value) {
  return String(value ?? "")
    .replace(/\r?\n/g, "<br>")
    .replace(/\t/g, " ")
    .trim();
}

function htmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function synonymHtml(card) {
  const options = (card.synonymNetworks || []).flatMap((network) => network.options || []);
  if (options.length === 0) {
    return "";
  }

  const items = options
    .map((option) => {
      const tone = option.tone ? ` <span style="color:#666">(${htmlEscape(option.tone)})</span>` : "";
      return `<li><b>${htmlEscape(option.phrase || option.term)}</b> - ${htmlEscape(option.zh || "")}${tone}</li>`;
    })
    .join("");

  return `<hr><div><b>Synonym upgrades</b><ul>${items}</ul></div>`;
}

function buildFront(card, topic) {
  return [
    `<div style="font-size:24px;font-weight:700">${htmlEscape(card.frontChinese)}</div>`,
    `<div style="margin-top:8px;color:#666">${htmlEscape(topic.zh)} / ${htmlEscape(topic.id)} · ${htmlEscape(card.type)}</div>`
  ].join("");
}

function buildBack(card) {
  return [
    `<div style="font-size:22px;font-weight:700">${htmlEscape(card.backEnglish)}</div>`,
    `<div style="margin-top:10px"><b>Base</b>: ${htmlEscape(card.baseChinese)} = ${htmlEscape(card.baseEnglish)}</div>`,
    `<div><b>Focus</b>: ${htmlEscape(card.highlightChinese)} = ${htmlEscape(card.highlightEnglish)}</div>`,
    `<div><b>Type</b>: ${htmlEscape(card.type)}</div>`,
    synonymHtml(card)
  ].join("");
}

function rowForCard(card, index) {
  const topic = topicById.get(card.topic);
  if (!topic) {
    throw new Error(`Missing topic metadata for ${card.topic}`);
  }

  const tags = [
    "IELTS_Task2",
    "topic_collocation",
    `topic::${card.topic}`,
    `type::${card.type}`
  ].join(" ");

  return [
    buildFront(card, topic),
    buildBack(card),
    card.topic,
    topic.zh,
    card.type,
    card.baseChinese,
    card.baseEnglish,
    card.highlightChinese,
    card.highlightEnglish,
    tags,
    `${card.topic}-${String(index + 1).padStart(3, "0")}`
  ].map(escapeTsv).join("\t");
}

function ankiHeader(deckName) {
  return [
    "#separator:tab",
    "#html:true",
    `#deck:${deckName}`,
    "#columns:Front Back Topic TopicZh Type BaseChinese BaseEnglish HighlightChinese HighlightEnglish Tags CardId"
  ].join("\n");
}

function writeTopicFile(topic, topicCards) {
  const rows = topicCards.map((card, index) => rowForCard(card, index));
  const fileName = `${topic.id.toLowerCase()}-${topic.zh}-anki.tsv`;
  const deckName = `IELTS Topic Collocation::${topic.zh} ${topic.id}`;
  fs.writeFileSync(path.join(outputDir, fileName), `${ankiHeader(deckName)}\n${rows.join("\n")}\n`, "utf8");
  return { fileName, count: rows.length };
}

function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const allRows = cards.map((card, index) => rowForCard(card, index));
  fs.writeFileSync(
    path.join(outputDir, "topic-collocation-anki-all.tsv"),
    `${ankiHeader("IELTS Topic Collocation")}\n${allRows.join("\n")}\n`,
    "utf8"
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: "web-source/data.js",
    totalCards: cards.length,
    fields: [
      "Front",
      "Back",
      "Topic",
      "TopicZh",
      "Type",
      "BaseChinese",
      "BaseEnglish",
      "HighlightChinese",
      "HighlightEnglish",
      "Tags",
      "CardId"
    ],
    files: []
  };

  for (const topic of topics) {
    const topicCards = cards.filter((card) => card.topic === topic.id);
    manifest.files.push(writeTopicFile(topic, topicCards));
  }

  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );

  console.log(`Exported ${cards.length} Anki cards into ${path.relative(projectDir, outputDir)}`);
  for (const file of manifest.files) {
    console.log(`${file.fileName}: ${file.count}`);
  }
}

main();
