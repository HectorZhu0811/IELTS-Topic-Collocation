const fs = require("fs");
const path = require("path");

const projectDir = path.resolve(__dirname, "..", "..");
const curationDir = path.join(projectDir, "project-artifacts", "synonym-curation");

const BANNED_ADJECTIVE_TERMS = new Set([
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

const BANNED_VERB_TERMS = new Set([
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

const REQUIRED_TOPICS = [
  "technology",
  "education",
  "environment",
  "government",
  "society",
  "health",
  "urbanization",
  "media",
  "economy",
  "arts"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function issue(list, file, message, detail = {}) {
  list.push({ file: path.relative(projectDir, file), message, ...detail });
}

function validateOption(file, entry, option, issues) {
  const term = String(option.term || "").trim();
  const phrase = String(option.phrase || "").trim();
  const focus = String(entry.focus || "").trim().toLowerCase();
  const type = String(entry.type || "").trim();

  if (!phrase) issue(issues, file, "Missing option phrase", { cardKey: entry.cardKey });
  if (!term) issue(issues, file, "Missing option term", { cardKey: entry.cardKey, phrase });
  if (!option.zh) issue(issues, file, "Missing Chinese explanation", { cardKey: entry.cardKey, phrase });
  if (!option.tone) issue(issues, file, "Missing tone", { cardKey: entry.cardKey, phrase });
  if (!["Positive", "Neutral", "Negative"].includes(option.stance)) {
    issue(issues, file, "Invalid stance", { cardKey: entry.cardKey, phrase, stance: option.stance });
  }
  if (term.toLowerCase() === focus) {
    issue(issues, file, "Option repeats original focus", { cardKey: entry.cardKey, phrase, term });
  }
  if (type === "adjective" && BANNED_ADJECTIVE_TERMS.has(term.toLowerCase())) {
    issue(issues, file, "Banned generic adjective term", { cardKey: entry.cardKey, phrase, term });
  }
  if (type === "verb" && BANNED_VERB_TERMS.has(term.toLowerCase())) {
    issue(issues, file, "Banned generic verb term", { cardKey: entry.cardKey, phrase, term });
  }
}

function validateFile(file) {
  const issues = [];
  const data = readJson(file);

  if (!data.topic) issue(issues, file, "Missing topic");
  if (!Array.isArray(data.approved)) issue(issues, file, "approved must be an array");
  if (!Array.isArray(data.deferred)) issue(issues, file, "deferred must be an array");

  (data.approved || []).forEach((entry) => {
    if (!entry.cardKey) issue(issues, file, "Missing cardKey");
    if (!entry.original) issue(issues, file, "Missing original", { cardKey: entry.cardKey });
    if (!["adjective", "verb"].includes(entry.type)) {
      issue(issues, file, "Invalid entry type", { cardKey: entry.cardKey, type: entry.type });
    }
    if (!Array.isArray(entry.options) || entry.options.length === 0) {
      issue(issues, file, "Approved entry has no options", { cardKey: entry.cardKey });
    }
    if (Array.isArray(entry.options) && entry.options.length > 3) {
      issue(issues, file, "Approved entry has more than 3 options", { cardKey: entry.cardKey });
    }
    (entry.options || []).forEach((option) => validateOption(file, entry, option, issues));
  });

  return issues;
}

function main() {
  const issues = [];
  const presentFiles = fs.existsSync(curationDir)
    ? fs.readdirSync(curationDir).filter((name) => name.endsWith(".json"))
    : [];
  const presentTopics = new Set(presentFiles.map((name) => name.replace(/\.json$/, "")));

  REQUIRED_TOPICS.forEach((topic) => {
    if (!presentTopics.has(topic)) {
      issues.push({ file: path.relative(projectDir, path.join(curationDir, `${topic}.json`)), message: "Missing topic curation file" });
    }
  });

  presentFiles.forEach((name) => {
    issues.push(...validateFile(path.join(curationDir, name)));
  });

  if (issues.length > 0) {
    console.log(JSON.stringify({ ok: false, issueCount: issues.length, issues }, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log(JSON.stringify({ ok: true, files: presentFiles.length }, null, 2));
}

main();
