const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(sourceDir, "..");
const curationDir = path.join(projectDir, "project-artifacts", "synonym-curation");
const outputPath = path.join(sourceDir, "synonym-curation.js");

const topics = [
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

const curated = {};

topics.forEach((topic) => {
  const filePath = path.join(curationDir, `${topic}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  (data.approved || []).forEach((entry) => {
    curated[entry.cardKey] = {
      topic: entry.topic || data.topic,
      type: entry.type,
      original: entry.original,
      focus: entry.focus,
      options: (entry.options || []).map((option) => ({
        term: option.term,
        phrase: option.phrase,
        zh: option.zh,
        stance: option.stance,
        tone: option.tone
      }))
    };
  });
});

const body = [
  "window.SYNONYM_CURATED_OPTIONS = ",
  JSON.stringify(curated, null, 2),
  ";\n"
].join("");

fs.writeFileSync(outputPath, body, "utf8");
console.log(path.relative(projectDir, outputPath));
