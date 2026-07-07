const fs = require("fs");
const path = require("path");

const projectDir = path.resolve(__dirname, "..", "..");
const outputDir = path.join(projectDir, "project-artifacts", "exports", "anki", "full-export");
const deckName = "IELTS Topic Collocation::2025-2026 Subtopics";

const topics = [
  {
    id: "Technology",
    zh: "科技",
    subtopics: [
      ["Workplace Technology & Computer Skills", "职场技术与电脑技能", ["essential computer skills", "develop computer skills", "modern workplace technology", "adopt workplace technology", "efficient automation tools", "use automation tools", "practical technology training", "provide technology training"]],
      ["Communication Technology & Relationships", "通信技术与人际关系", ["instant communication technology", "use communication technology", "convenient online communication", "improve online communication", "meaningful face-to-face interaction", "preserve face-to-face interaction", "clear privacy boundaries", "set privacy boundaries"]],
      ["Science, Food Technology & Space Exploration", "科学、食品技术与太空探索", ["rigorous scientific research", "conduct scientific research", "advanced food technology", "develop food technology", "ambitious space exploration", "fund space exploration", "major scientific breakthroughs", "achieve scientific breakthroughs"]],
      ["Technology in International Business", "国际商业中的科技", ["technology-driven international business", "expand international business", "cross-border e-commerce", "promote e-commerce", "secure digital payment", "adopt digital payment", "real-time business data", "analyze business data"]],
      ["Product Innovation & Consumer Choice", "产品创新与消费者选择", ["continuous product innovation", "drive product innovation", "wide consumer choice", "expand consumer choice", "frequent new product versions", "release new product versions", "basic right to repair", "protect the right to repair"]]
    ]
  },
  {
    id: "Education",
    zh: "教育",
    subtopics: [
      ["Curriculum: Math, History & Business", "数学、历史与商业课程", ["foundational math education", "strengthen math education", "comprehensive history curriculum", "revise the history curriculum", "practical business courses", "offer business courses", "limited classroom time", "allocate classroom time"]],
      ["Learning Methods: Group Study & Self-study", "小组学习与自主学习", ["productive group study", "encourage group study", "effective self-study", "promote self-study", "constructive peer feedback", "give peer feedback", "greater learner autonomy", "foster learner autonomy"]],
      ["Assessment & Student Motivation", "评估与学生动机", ["strong student motivation", "boost student motivation", "fair academic assessment", "conduct academic assessment", "high-stakes standardized tests", "reform standardized tests", "lasting intrinsic motivation", "cultivate intrinsic motivation"]],
      ["Adult Literacy & Educational Access", "成人识字与教育机会", ["basic adult literacy", "improve adult literacy", "equal educational access", "expand educational access", "community-based literacy programs", "fund literacy programs", "persistent educational inequality", "reduce educational inequality"]],
      ["Employability: University vs Work", "就业能力：大学与工作", ["strong employability", "enhance employability", "academic university education", "pursue university education", "relevant work experience", "gain work experience", "competitive labor market", "enter the labor market"]],
      ["Moral Education & Character Development", "道德教育与品格培养", ["effective moral education", "strengthen moral education", "early character development", "support character development", "genuine empathy", "cultivate empathy", "clear behavioral standards", "set behavioral standards"]]
    ]
  },
  {
    id: "Environment",
    zh: "环境",
    subtopics: [
      ["Consumption & Fast Fashion", "消费与快时尚", ["wasteful fast fashion", "criticize fast fashion", "unsustainable consumption habits", "change consumption habits", "massive textile waste", "cut textile waste", "low-waste circular economy", "build a circular economy"]],
      ["Food Systems: Vegetarianism & Scientific Farming", "食物系统：素食与科学农业", ["sustainable food systems", "reform food systems", "plant-based vegetarian diet", "adopt a vegetarian diet", "data-driven scientific farming", "promote scientific farming", "climate-smart sustainable agriculture", "develop sustainable agriculture"]],
      ["Biodiversity & Animal Protection", "生物多样性与动物保护", ["rich biodiversity", "protect biodiversity", "critically endangered species", "save endangered species", "effective wildlife conservation", "fund wildlife conservation", "delicate ecological balance", "maintain ecological balance"]],
      ["Tourism & Untouched Natural Places", "旅游与原始自然地区", ["pristine untouched natural places", "protect untouched natural places", "low-impact ecotourism", "promote ecotourism", "unspoiled natural landscapes", "preserve natural landscapes", "controlled public access", "restrict public access"]],
      ["Sustainable Travel & Aviation", "可持续出行与航空", ["low-carbon sustainable travel", "encourage sustainable travel", "frequent air travel", "reduce air travel", "high carbon emissions", "cut carbon emissions", "verified carbon offsets", "purchase carbon offsets"]],
      ["Local Resources & Supply Chains", "本地资源与供应链", ["available local resources", "use local resources", "short local supply chains", "strengthen local supply chains", "fresh local food", "buy local food", "greater supply chain transparency", "increase supply chain transparency"]]
    ]
  },
  {
    id: "Government",
    zh: "政府",
    subtopics: [
      ["Public Funding & Spending Priorities", "公共资金与支出优先级", ["limited public funding", "allocate public funding", "clear spending priorities", "set spending priorities", "essential public services", "fund public services", "strong fiscal responsibility", "maintain fiscal responsibility"]],
      ["Regulation, Bans & Restrictions", "监管、禁令与限制", ["strict government regulation", "enforce government regulation", "reasonable legal restrictions", "introduce legal restrictions", "broader public interest", "serve the public interest", "stable social order", "maintain social order"]],
      ["Law Enforcement & Road Safety Laws", "执法与道路安全法", ["effective law enforcement", "strengthen law enforcement", "strict road safety laws", "enforce road safety laws", "valid driver's license", "obtain a driver's license", "basic pedestrian safety", "protect pedestrian safety"]],
      ["Cultural Policy & Public Art Funding", "文化政策与公共艺术资助", ["inclusive cultural policy", "formulate cultural policy", "accessible public art", "fund public art", "valuable cultural heritage", "preserve cultural heritage", "broad cultural participation", "encourage cultural participation"]],
      ["Evidence-based Balanced Policy", "循证平衡政策", ["sound evidence-based policy", "develop evidence-based policy", "practical balanced approach", "adopt a balanced approach", "complex trade-offs", "weigh trade-offs", "long-term policy impact", "assess policy impact"]]
    ]
  },
  {
    id: "Society",
    zh: "社会",
    subtopics: [
      ["Parenting, Boundaries & Child Freedom", "亲子边界与儿童自由", ["close parent-child relationship", "strengthen parent-child relationships", "consistent parental discipline", "apply parental discipline", "healthy boundaries", "set clear boundaries", "stable emotional support", "provide emotional support"]],
      ["Youth Crime & Behavior", "青少年犯罪与行为", ["rising youth crime", "prevent youth crime", "aggressive antisocial behavior", "discourage antisocial behavior", "effective community supervision", "strengthen community supervision", "timely early intervention", "provide early intervention"]],
      ["Family Relationships & Lifestyle Change", "家庭关系与生活方式变化", ["close family relationships", "maintain family relationships", "rapid lifestyle change", "adapt to lifestyle change", "strong family bonds", "strengthen family bonds", "limited family time", "spend family time"]],
      ["Competition vs Cooperation", "竞争与合作", ["intense competition", "encourage competition", "strong cooperative spirit", "foster cooperative spirit", "effective teamwork", "promote teamwork", "healthy fair competition", "ensure fair competition"]],
      ["Gifts, Money & Social Values", "礼物、金钱与社会价值观", ["high monetary value", "attach monetary value to gifts", "deep sentimental value", "preserve sentimental value", "traditional gift exchange", "practice gift exchange", "excessive materialism", "challenge materialism"]]
    ]
  },
  {
    id: "Health",
    zh: "健康",
    subtopics: [
      ["Diet, Vegetarianism & Healthy Eating", "饮食、素食与健康饮食", ["nutritious balanced diet", "maintain a balanced diet", "plant-based vegetarian diet", "adopt a vegetarian diet", "adequate nutrient intake", "monitor nutrient intake", "unhealthy eating habits", "change eating habits"]],
      ["Sedentary Lifestyle & Public Health", "久坐生活与公共健康", ["highly sedentary lifestyle", "avoid a sedentary lifestyle", "regular physical activity", "increase physical activity", "rising obesity rate", "lower the obesity rate", "effective workplace wellness", "promote workplace wellness"]],
      ["Food Safety & Natural Food", "食品安全与天然食品", ["strict food safety", "ensure food safety", "minimally processed natural food", "choose natural food", "clear food labels", "read food labels", "transparent supply chain", "trace the supply chain"]],
      ["Mental Health & Technology Use", "心理健康与科技使用", ["poor mental health", "improve mental health", "excessive technology use", "manage technology use", "compulsive social media use", "limit social media use", "healthy digital boundaries", "set digital boundaries"]]
    ]
  },
  {
    id: "Urbanization",
    zh: "城市化",
    subtopics: [
      ["Traffic Congestion & Public Transport", "交通拥堵与公共交通", ["severe traffic congestion", "ease traffic congestion", "reliable public transport", "improve public transport", "affordable public transport fares", "subsidize public transport fares", "car-dependent travel habits", "change travel habits"]],
      ["Road Safety & Driving Laws", "道路安全与驾驶法规", ["public road safety", "improve road safety", "strict traffic laws", "enforce traffic laws", "valid driver's license", "obtain a driver's license", "heavy traffic fines", "impose traffic fines"]],
      ["Rural-urban Migration", "城乡迁移", ["large-scale rural-urban migration", "manage rural-urban migration", "better-paid urban employment", "seek urban employment", "wide urban-rural gap", "narrow the urban-rural gap", "balanced rural development", "stimulate rural development"]],
      ["Urban Population Growth", "城市人口增长", ["growing urban population", "accommodate the urban population", "rapid population growth", "control population growth", "rising housing demand", "meet housing demand", "strained urban services", "improve urban services"]],
      ["Housing Styles & Local Identity", "住房风格与地方身份", ["distinctive housing style", "preserve housing styles", "well-preserved traditional houses", "restore traditional houses", "unique local character", "retain local character", "strong community identity", "strengthen community identity"]],
      ["Transport Infrastructure & Logistics", "交通基础设施与物流", ["modern transport infrastructure", "upgrade transport infrastructure", "extensive road network", "expand the road network", "integrated logistics system", "improve the logistics system", "resilient supply chain", "strengthen the supply chain"]]
    ]
  },
  {
    id: "Media",
    zh: "媒体",
    subtopics: [
      ["Advertising Influence & Consumer Awareness", "广告影响与消费者意识", ["powerful advertising influence", "resist advertising influence", "strong consumer awareness", "raise consumer awareness", "deceptive misleading advertising", "ban misleading advertising", "rational informed choices", "make informed choices"]],
      ["News Relevance & Public Information", "新闻相关性与公共信息", ["comprehensive news coverage", "provide news coverage", "accurate public information", "disseminate public information", "balanced political news", "analyze political news", "timely relevant information", "access relevant information"]],
      ["Violent Media & Regulation", "暴力媒体与监管", ["graphic violent content", "restrict violent content", "excessive media violence", "regulate media violence", "clear content ratings", "display content ratings", "clear platform responsibility", "strengthen platform responsibility"]],
      ["Good News & Media Effects", "正面新闻与媒体影响", ["uplifting positive news", "share positive news", "healthy social optimism", "promote social optimism", "responsible balanced reporting", "practice balanced reporting", "solution-focused constructive journalism", "encourage constructive journalism"]],
      ["Information Trust & Media Literacy", "信息信任与媒介素养", ["credible reliable sources", "consult reliable sources", "thorough fact-checking", "conduct fact-checking", "essential media literacy", "develop media literacy", "independent critical thinking", "cultivate critical thinking"]]
    ]
  },
  {
    id: "Economy",
    zh: "经济",
    subtopics: [
      ["Career Change & Workforce Mobility", "职业转变与劳动力流动", ["frequent career change", "make a career change", "high workforce mobility", "encourage workforce mobility", "valuable transferable skills", "develop transferable skills", "strong career adaptability", "build career adaptability"]],
      ["Salary-driven Career Choices", "薪资导向的职业选择", ["competitive salary level", "compare salary levels", "attractive high-paying jobs", "seek high-paying jobs", "heavy financial pressure", "relieve financial pressure", "healthy work-life balance", "maintain work-life balance"]],
      ["International Business & Logistics", "国际商业与物流", ["global international trade", "expand international trade", "resilient supply chain", "strengthen the supply chain", "efficient logistics network", "build a logistics network", "strict trade barriers", "remove trade barriers"]],
      ["Tourism Development", "旅游业发展", ["profitable tourism industry", "develop the tourism industry", "substantial tourism revenue", "generate tourism revenue", "damaging overtourism", "control overtourism", "sustainable tourism management", "improve tourism management"]],
      ["Older Workers & Workplace Demographics", "老年员工与职场人口结构", ["experienced older workers", "retain older workers", "rapidly aging workforce", "manage an aging workforce", "accessible retraining programs", "offer retraining programs", "basic workplace dignity", "protect workplace dignity"]],
      ["Product Versions & Consumerism", "产品版本与消费主义", ["frequent new product versions", "release new product versions", "minor product upgrades", "promote product upgrades", "deliberate planned obsolescence", "use planned obsolescence", "responsible rational consumption", "promote rational consumption"]]
    ]
  },
  {
    id: "Arts",
    zh: "艺术",
    subtopics: [
      ["Heritage Preservation & Historical Sites", "遗产保护与历史遗址", ["tangible cultural heritage", "preserve cultural heritage", "well-preserved historical sites", "protect historical sites", "centuries-old historic buildings", "restore historic buildings", "strict conservation measures", "implement conservation measures"]],
      ["Architecture & Local Identity", "建筑与地方身份", ["distinctive architectural style", "preserve architectural style", "unique local identity", "strengthen local identity", "historic districts", "protect historic districts", "recognizable landmark buildings", "maintain landmark buildings"]],
      ["Public Art & Government Funding", "公共艺术与政府资助", ["accessible public art", "fund public art", "substantial government funding", "allocate government funding", "controversial art projects", "support art projects", "broader public interest", "serve public interest"]],
      ["Art Galleries & Cultural Participation", "美术馆与文化参与", ["public art galleries", "visit art galleries", "interactive exhibitions", "host exhibitions", "broad cultural participation", "encourage cultural participation", "affordable ticket prices", "lower ticket prices"]],
      ["Language & Culture Learning", "语言与文化学习", ["effective language learning", "promote language learning", "deep cultural understanding", "develop cultural understanding", "fluent cross-cultural communication", "improve cross-cultural communication", "rich cultural immersion", "experience cultural immersion"]],
      ["History Research & Social Value", "历史研究与社会价值", ["rigorous historical research", "conduct historical research", "reliable historical evidence", "examine historical evidence", "shared collective memory", "preserve collective memory", "critical historical perspective", "adopt a historical perspective"]]
    ]
  }
];

function escapeTsv(value) {
  return String(value ?? "").replace(/\r?\n/g, "<br>").replace(/\t/g, " ").trim();
}

function htmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ankiHeader(deck) {
  return [
    "#separator:tab",
    "#html:true",
    `#deck:${deck}`,
    "#columns:Front Back Topic TopicZh Type BaseChinese BaseEnglish HighlightChinese HighlightEnglish Tags CardId"
  ].join("\n");
}

function splitCollocations(collocations) {
  const pairs = [];
  for (let i = 0; i < collocations.length; i += 2) {
    pairs.push({
      adjective: collocations[i],
      verb: collocations[i + 1]
    });
  }
  return pairs;
}

function buildFront(topic, subtopic) {
  return [
    `<div style="font-size:20px;color:#666">${htmlEscape(topic.zh)} / ${htmlEscape(topic.id)}</div>`,
    `<div style="font-size:26px;font-weight:700;margin-top:8px">${htmlEscape(subtopic[1])}</div>`,
    `<div style="font-size:18px;margin-top:8px">${htmlEscape(subtopic[0])}</div>`
  ].join("");
}

function buildBack(topic, subtopic) {
  const pairs = splitCollocations(subtopic[2])
    .map((pair) => [
      "<li>",
      `<span style="color:#7e22ce;font-weight:700">Adj</span>: ${htmlEscape(pair.adjective)}`,
      pair.verb ? `<br><span style="color:#2563eb;font-weight:700">Verb</span>: ${htmlEscape(pair.verb)}` : "",
      "</li>"
    ].join(""))
    .join("");

  return [
    `<div style="font-size:18px;color:#666">${htmlEscape(topic.zh)} / ${htmlEscape(topic.id)}</div>`,
    `<div style="font-size:24px;font-weight:700;margin-top:6px">${htmlEscape(subtopic[0])}</div>`,
    `<div style="font-size:18px;margin-top:6px">${htmlEscape(subtopic[1])}</div>`,
    `<hr>`,
    `<ul style="font-size:18px;line-height:1.55">${pairs}</ul>`
  ].join("");
}

function rowForSubtopic(topic, subtopic, index) {
  const subtopicSlug = slug(subtopic[0]);
  const cardId = `notion-subtopic-${topic.id}-${String(index + 1).padStart(2, "0")}-${subtopicSlug}`;
  const tags = [
    "IELTS_Task2",
    "topic_collocation",
    "notion_subtopic",
    "2025_2026",
    `topic::${topic.id}`,
    `subtopic::${subtopicSlug}`
  ].join(" ");

  return [
    buildFront(topic, subtopic),
    buildBack(topic, subtopic),
    topic.id,
    topic.zh,
    "subtopic",
    subtopic[1],
    subtopic[0],
    "subtopic overview",
    subtopic[0],
    tags,
    cardId
  ].map(escapeTsv).join("\t");
}

function writeFile(fileName, deck, rows) {
  fs.writeFileSync(path.join(outputDir, fileName), `${ankiHeader(deck)}\n${rows.join("\n")}\n`, "utf8");
}

function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const allRows = [];
  const files = [];

  for (const topic of topics) {
    const rows = topic.subtopics.map((subtopic, index) => rowForSubtopic(topic, subtopic, index));
    allRows.push(...rows);
    const fileName = `notion-subtopics-${topic.id.toLowerCase()}-${topic.zh}-anki.tsv`;
    writeFile(fileName, `${deckName}::${topic.zh} ${topic.id}`, rows);
    files.push({ fileName, count: rows.length });
  }

  writeFile("notion-subtopics-anki-all.tsv", deckName, allRows);

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: "Notion Task 2 Practice / 2025-2026 高频 Subtopics",
    deckName,
    totalCards: allRows.length,
    format: "one Anki overview card per Notion subtopic",
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
    files: [{ fileName: "notion-subtopics-anki-all.tsv", count: allRows.length }, ...files]
  };

  fs.writeFileSync(
    path.join(outputDir, "notion-subtopics-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );

  console.log(`Exported ${allRows.length} Notion subtopic Anki cards.`);
  for (const file of manifest.files) {
    console.log(`${file.fileName}: ${file.count}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { topics };
