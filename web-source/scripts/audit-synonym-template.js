const fs = require("fs");
const path = require("path");
const vm = require("vm");

const sourceDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(sourceDir, "..");
const dataPath = path.join(sourceDir, "data.js");
const synonymCurationPath = path.join(sourceDir, "synonym-curation.js");
const outputDir = path.join(projectDir, "project-artifacts", "qa");
const jsonPath = path.join(outputDir, "synonym-template-audit.json");
const markdownPath = path.join(outputDir, "synonym-template-audit.md");

const GENERIC_ADJECTIVE_TERMS = new Set([
  "valuable",
  "meaningful",
  "notable",
  "well-targeted",
  "long-term",
  "context-specific",
  "measurable",
  "problematic",
  "controversial",
  "limited"
]);

const GENERIC_VERB_TERMS = new Set([
  "promote",
  "maintain",
  "develop",
  "analyse",
  "discuss",
  "assess",
  "sideline",
  "undermine",
  "overlook"
]);

const GENERIC_TONE_SNIPPETS = [
  "这条搭配适合强调实际作用",
  "这条搭配适合强调时间维度",
  "这条搭配适合批判性论述",
  "通用替代表达",
  "适合描述变化、影响或特征"
];

const BAD_VERB_OBJECT_PATTERNS = [
  /^(develop|maintain)\s+(environmental degradation|deforestation|pollution|habitat destruction|drug trafficking|human trafficking|money laundering|smuggling|violent crime|cybercrime|cyberbullying|discrimination|inequality|poverty|homelessness|social exclusion|inflation|economic crisis|unemployment rate|cost of living|medical expenses|shortage)/i,
  /^(develop|maintain|promote)\s+(a|an|the)?\s*(carbon footprint|ecological footprint|wealth gap|birth rate|parking shortages|traffic congestion)/i,
  /^(sideline|overlook)\s+(vaccination|medical insurance|self-care|balanced diet|public services|environmental regulations|international cooperation|public transport|urban green space)/i
];

function loadCards() {
  const source = fs.readFileSync(dataPath, "utf8");
  const context = vm.createContext({ window: {} });
  if (fs.existsSync(synonymCurationPath)) {
    const synonymCurationSource = fs.readFileSync(synonymCurationPath, "utf8");
    vm.runInContext(synonymCurationSource, context, { filename: synonymCurationPath, timeout: 1000 });
  }
  vm.runInContext(source, context, { filename: dataPath, timeout: 1000 });
  if (!Array.isArray(context.window.FLASHCARD_DATA)) {
    throw new Error("window.FLASHCARD_DATA is missing");
  }
  return context.window.FLASHCARD_DATA;
}

function classifyOption(card, option) {
  const reasons = [];
  const phrase = String(option.phrase || "");
  const term = String(option.term || "");
  const tone = String(option.tone || "");
  const focus = String(card.highlightEnglish || "").toLowerCase();

  if (card.type === "adjective" && GENERIC_ADJECTIVE_TERMS.has(term)) {
    reasons.push("generic-adjective-bank");
  }
  if (card.type === "verb" && GENERIC_VERB_TERMS.has(term)) {
    reasons.push("generic-verb-bank");
  }
  if (GENERIC_TONE_SNIPPETS.some((snippet) => tone.includes(snippet))) {
    reasons.push("generic-tone");
  }
  if (
    card.type === "adjective" &&
    /^(valuable|meaningful|notable|well-targeted|long-term|context-specific|measurable|problematic|controversial|limited)\b/i.test(phrase)
  ) {
    reasons.push("formulaic-adjective-phrase");
  }
  if (
    card.type === "verb" &&
    /^(promote|maintain|develop|analyse|discuss|assess|sideline|undermine|overlook)\b/i.test(phrase)
  ) {
    reasons.push("formulaic-verb-phrase");
  }
  if (term.toLowerCase() === focus) {
    reasons.push("same-as-original-focus");
  }
  if (BAD_VERB_OBJECT_PATTERNS.some((pattern) => pattern.test(phrase))) {
    reasons.push("likely-invalid-collocation");
  }

  return reasons;
}

function summarize(rows, key) {
  return rows.reduce((counts, row) => {
    const value = row[key] || "(missing)";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function topTerms(rows) {
  const counts = summarize(rows, "term");
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 25)
    .map(([term, count]) => ({ term, count }));
}

function buildAudit() {
  const cards = loadCards();
  const rows = [];

  cards.forEach((card) => {
    (card.synonymNetworks || []).forEach((network) => {
      (network.options || []).forEach((option) => {
        const reasons = classifyOption(card, option);
        if (!reasons.length) return;
        rows.push({
          topic: card.topic,
          type: card.type,
          baseChinese: card.baseChinese,
          baseEnglish: card.baseEnglish,
          focus: card.highlightEnglish,
          original: card.backEnglish,
          term: option.term || "",
          phrase: option.phrase || "",
          zh: option.zh || "",
          tone: option.tone || "",
          reasons
        });
      });
    });
  });

  const cardKeys = new Set(rows.map((row) => `${row.topic}::${row.type}::${row.original}`));
  return {
    generatedAt: new Date().toISOString(),
    totals: {
      cards: cards.length,
      suspiciousCards: cardKeys.size,
      suspiciousOptions: rows.length
    },
    byTopic: summarize(rows, "topic"),
    byType: summarize(rows, "type"),
    byReason: rows.reduce((counts, row) => {
      row.reasons.forEach((reason) => {
        counts[reason] = (counts[reason] || 0) + 1;
      });
      return counts;
    }, {}),
    topTerms: topTerms(rows),
    rows
  };
}

function markdownTable(rows) {
  const header = "| Topic | Type | Original | Option | Reasons |\n|---|---|---|---|---|";
  const body = rows
    .slice(0, 80)
    .map((row) => {
      const safe = (value) => String(value || "").replace(/\|/g, "\\|");
      return `| ${safe(row.topic)} | ${safe(row.type)} | ${safe(row.original)} | ${safe(row.phrase)} | ${safe(row.reasons.join(", "))} |`;
    })
    .join("\n");
  return `${header}\n${body}`;
}

function writeReports(audit) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");

  const markdown = [
    "# Synonym Template Audit",
    "",
    `Generated: ${audit.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Cards scanned: ${audit.totals.cards}`,
    `- Suspicious cards: ${audit.totals.suspiciousCards}`,
    `- Suspicious synonym options: ${audit.totals.suspiciousOptions}`,
    "",
    "## By Topic",
    "",
    "```json",
    JSON.stringify(audit.byTopic, null, 2),
    "```",
    "",
    "## By Reason",
    "",
    "```json",
    JSON.stringify(audit.byReason, null, 2),
    "```",
    "",
    "## Top Repeated Terms",
    "",
    "```json",
    JSON.stringify(audit.topTerms, null, 2),
    "```",
    "",
    "## Sample Rows",
    "",
    markdownTable(audit.rows)
  ].join("\n");

  fs.writeFileSync(markdownPath, `${markdown}\n`, "utf8");
}

const audit = buildAudit();
writeReports(audit);
console.log(`Scanned ${audit.totals.cards} cards.`);
console.log(`Suspicious cards: ${audit.totals.suspiciousCards}`);
console.log(`Suspicious options: ${audit.totals.suspiciousOptions}`);
console.log(path.relative(projectDir, markdownPath));
console.log(path.relative(projectDir, jsonPath));
