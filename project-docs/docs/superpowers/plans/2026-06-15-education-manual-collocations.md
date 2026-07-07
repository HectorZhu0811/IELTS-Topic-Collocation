# Education Manual Collocations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Education optional collocations with manually authored card-level content and block fallback-generated Education options.

**Architecture:** Add an Education-only manual collocation map keyed by exact card identity, route Education cards through that map before any generator, and validate that every Education option displayed in the HTML comes from manual content. Keep existing fallback generators for non-Education topics until those topics are manually reviewed.

**Tech Stack:** Standalone browser JavaScript in `data.js`, Node.js validation scripts, existing `build-standalone.js`.

---

## Files

- Modify: `data.js`
  - Add `EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS`.
  - Add exact card-key helpers.
  - Route manual Education options before generated fallbacks.
  - Preserve manual options without generated review rewriting.
- Create: `scripts/validate-education-manual-collocations.js`
  - Loads `data.js` in a VM.
  - Fails if any Education card lacks three manual options or falls back to generated banks.
  - Fails on stance gaps, mojibake markers, and known bad phrases.
- Modify: `task2-collocation-flashcards-advanced-standalone.html`
  - Regenerated only by running `node build-standalone.js`.

## Task 1: Add Manual Option Routing

**Files:**
- Modify: `data.js`

- [ ] **Step 1: Add manual map and key helpers before `COLLOCATION_OVERRIDES`**

Insert this block before `const COLLOCATION_OVERRIDES = {`:

```js
const EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS = {
};

function normalizeManualCollocationKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function manualCollocationKey(card) {
  return [
    card.topic,
    card.type,
    normalizeManualCollocationKey(card.backEnglish)
  ].join("::");
}

function manualEducationOptions(card) {
  if (card.topic !== "Education") return null;
  return EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS[manualCollocationKey(card)] || null;
}

function markManualOptions(options) {
  return options.map((option) => ({ ...option, manual: true }));
}
```

- [ ] **Step 2: Route manual Education content first in `getSynonymDrafts`**

At the top of `getSynonymDrafts(card)`, before `exactKey`, add:

```js
  const manualOptions = manualEducationOptions(card);
  if (manualOptions) return markManualOptions(manualOptions);
```

The function should begin like this:

```js
function getSynonymDrafts(card) {
  const manualOptions = manualEducationOptions(card);
  if (manualOptions) return markManualOptions(manualOptions);
  const exactKey = `${card.type}::${normalizeBaseKey(card)}`;
```

- [ ] **Step 3: Preserve manual options in `reviewAndRewriteSynonymOptions`**

Inside `reviewAndRewriteSynonymOptions(card, drafts)`, immediately after `let option = { ...draft, phrase, microContext };`, add:

```js
    if (option.manual) {
      option.tone = fullCollocationTone(card, option, phrase);
      option.reviewNote = "Manually authored card-level optional collocation.";
      option.reviewPassed = true;
      option.reviewIssues = [];
      return option;
    }
```

- [ ] **Step 4: Run a syntax check**

Run:

```bash
node -e "const fs=require('fs'),vm=require('vm');const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);console.log(ctx.window.FLASHCARD_DATA.length)"
```

Expected output:

```text
550
```

## Task 2: Add Validation Script

**Files:**
- Create: `scripts/validate-education-manual-collocations.js`

- [ ] **Step 1: Create the validator**

Create the file with this content:

```js
const fs = require("fs");
const vm = require("vm");

const dataPath = "data.js";
const standalonePath = "task2-collocation-flashcards-advanced-standalone.html";

const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(dataPath, "utf8"), ctx);

const cards = ctx.window.FLASHCARD_DATA || [];
const education = cards.filter((card) => card.topic === "Education");

const expectedStances = ["Negative", "Neutral", "Positive"];
const badPhrasePatterns = [
  /strengthen an independent school/i,
  /review an independent school/i,
  /weaken an independent school/i,
  /strengthen boarding school/i,
  /weaken boarding school/i,
  /maintain tuition fees/i,
  /undermine dropout/i,
  /traceable online learning/i,
  /transparent private school/i,
  /centralized private school/i,
  /fragmented private school/i
];

const mojibakePatterns = [
  /\?\?\?\?/,
  /娑/,
  /閹/,
  /閿/,
  /锟/
];

const failures = [];

if (education.length !== 74) {
  failures.push(`Expected 74 Education cards, found ${education.length}.`);
}

for (const card of education) {
  const options = card.synonymNetworks?.[0]?.options || [];
  const label = `${card.type} :: ${card.backEnglish}`;

  if (options.length !== 3) {
    failures.push(`${label}: expected 3 options, found ${options.length}.`);
  }

  if (!options.every((option) => option.manual === true)) {
    failures.push(`${label}: contains fallback-generated options.`);
  }

  const stances = [...new Set(options.map((option) => option.stance))].sort();
  if (stances.join("|") !== expectedStances.join("|")) {
    failures.push(`${label}: expected stances ${expectedStances.join(", ")}, found ${stances.join(", ")}.`);
  }

  for (const option of options) {
    const phrase = String(option.phrase || "");
    const zh = String(option.zh || "");
    const tone = String(option.tone || "");
    const joined = `${phrase} ${zh} ${tone}`;

    if (!phrase || !zh || !tone) {
      failures.push(`${label}: option is missing phrase, zh, or tone.`);
    }

    if (!tone.startsWith("这条搭配")) {
      failures.push(`${label}: tone must explain the whole collocation: ${phrase}`);
    }

    if (badPhrasePatterns.some((pattern) => pattern.test(phrase))) {
      failures.push(`${label}: known bad phrase remains: ${phrase}`);
    }

    if (mojibakePatterns.some((pattern) => pattern.test(joined))) {
      failures.push(`${label}: possible Chinese text corruption in ${phrase}.`);
    }
  }
}

if (fs.existsSync(standalonePath)) {
  const standalone = fs.readFileSync(standalonePath, "utf8");
  for (const pattern of mojibakePatterns) {
    if (pattern.test(standalone)) {
      failures.push(`Standalone HTML contains possible Chinese text corruption: ${pattern}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${education.length} Education cards with manual optional collocations.`);
```

- [ ] **Step 2: Run validator before manual content**

Run:

```bash
node scripts/validate-education-manual-collocations.js
```

Expected: FAIL, because `EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS` is still empty and Education still falls back to generated options.

## Task 3: Author Manual Content for Education Cards 1-10

**Files:**
- Modify: `data.js`

- [ ] **Step 1: Add the first 10 card-level entries**

Add these entries inside `EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS`:

```js
  "Education::adjective::well funded public school": [
    { term: "well-resourced", pattern: "well-resourced public school", zh: "资源充足的", tone: "这条搭配适合强调公立学校有足够师资、设施和课程支持。", stance: "Positive" },
    { term: "state-run", pattern: "state-run public school", zh: "公办的", tone: "这条搭配适合客观说明学校由政府运营。", stance: "Neutral" },
    { term: "underfunded", pattern: "underfunded public school", zh: "资金不足的", tone: "这条搭配适合批判资金不足影响公立学校的教学质量。", stance: "Negative" }
  ],
  "Education::verb::attend public school": [
    { term: "benefit from", pattern: "benefit from public schooling", zh: "受益于公立教育", tone: "这条搭配适合强调学生从公立教育中获得机会和支持。", stance: "Positive" },
    { term: "enrol in", pattern: "enrol in a local public school", zh: "入读本地公立学校", tone: "这条搭配适合客观描述学生进入本地公校就读。", stance: "Neutral" },
    { term: "be assigned to", pattern: "be assigned to an underfunded public school", zh: "被分配到资源不足的公校", tone: "这条搭配适合批判学生因居住地或制度安排进入资源不足学校。", stance: "Negative" }
  ],
  "Education::adjective::prestigious private school": [
    { term: "well-resourced", pattern: "well-resourced private school", zh: "资源充足的", tone: "这条搭配适合强调私立学校的资源和升学支持。", stance: "Positive" },
    { term: "selective", pattern: "selective private school", zh: "有选拔性的", tone: "这条搭配适合客观描述私立学校的入学门槛或招生机制。", stance: "Neutral" },
    { term: "elitist", pattern: "elitist private school", zh: "精英主义的", tone: "这条搭配适合批判私立学校加剧阶层隔离或教育不平等。", stance: "Negative" }
  ],
  "Education::verb::enrol in an independent school": [
    { term: "gain admission to", pattern: "gain admission to an independent school", zh: "获得私立学校录取", tone: "这条搭配适合强调学生成功获得入学机会。", stance: "Positive" },
    { term: "apply to", pattern: "apply to an independent school", zh: "申请私立学校", tone: "这条搭配适合客观描述申请私立学校的行为。", stance: "Neutral" },
    { term: "be priced out of", pattern: "be priced out of an independent school", zh: "因费用过高而无法入读私立学校", tone: "这条搭配适合批判学费门槛把学生排除在私立教育之外。", stance: "Negative" }
  ],
  "Education::adjective::elite boarding school": [
    { term: "prestigious", pattern: "prestigious boarding school", zh: "有声望的", tone: "这条搭配适合强调寄宿学校的声誉、传统和升学资源。", stance: "Positive" },
    { term: "residential", pattern: "residential boarding school", zh: "寄宿制的", tone: "这条搭配适合客观说明学生住校学习的学校类型。", stance: "Neutral" },
    { term: "overly strict", pattern: "overly strict boarding school", zh: "过于严格的", tone: "这条搭配适合批判寄宿学校管理过严或生活压抑。", stance: "Negative" }
  ],
  "Education::verb::send children to boarding school": [
    { term: "enrol children in", pattern: "enrol children in boarding school", zh: "让孩子入读寄宿学校", tone: "这条搭配适合强调家长主动选择寄宿教育。", stance: "Positive" },
    { term: "place children in", pattern: "place children in a boarding school", zh: "把孩子安置在寄宿学校", tone: "这条搭配适合中性描述家长或监护人的教育安排。", stance: "Neutral" },
    { term: "send children away to", pattern: "send children away to boarding school", zh: "把孩子送离家去寄宿学校", tone: "这条搭配适合批判寄宿教育造成亲子分离。", stance: "Negative" }
  ],
  "Education::adjective::universal compulsory education": [
    { term: "free", pattern: "free compulsory education", zh: "免费的义务教育", tone: "这条搭配适合强调儿童无需付费接受义务教育。", stance: "Positive" },
    { term: "state-mandated", pattern: "state-mandated compulsory education", zh: "国家强制的义务教育", tone: "这条搭配适合客观说明义务教育由国家法律要求。", stance: "Neutral" },
    { term: "underfunded", pattern: "underfunded compulsory education", zh: "资金不足的义务教育", tone: "这条搭配适合批判义务教育资源不足。", stance: "Negative" }
  ],
  "Education::verb::provide compulsory education": [
    { term: "guarantee", pattern: "guarantee compulsory education", zh: "保障义务教育", tone: "这条搭配适合强调政府保障儿童受教育权。", stance: "Positive" },
    { term: "administer", pattern: "administer compulsory education", zh: "管理义务教育", tone: "这条搭配适合客观描述政府或学校执行义务教育制度。", stance: "Neutral" },
    { term: "fail to provide", pattern: "fail to provide compulsory education", zh: "未能提供义务教育", tone: "这条搭配适合批判政府或地区没有履行教育责任。", stance: "Negative" }
  ],
  "Education::adjective::accessible higher education": [
    { term: "affordable", pattern: "affordable higher education", zh: "负担得起的高等教育", tone: "这条搭配适合强调学生不会因费用过高而失去深造机会。", stance: "Positive" },
    { term: "publicly funded", pattern: "publicly funded higher education", zh: "公共资助的高等教育", tone: "这条搭配适合客观说明高等教育的资金来源。", stance: "Neutral" },
    { term: "inaccessible", pattern: "inaccessible higher education", zh: "难以获得的高等教育", tone: "这条搭配适合批判高等教育门槛过高。", stance: "Negative" }
  ],
  "Education::verb::pursue higher education": [
    { term: "gain access to", pattern: "gain access to higher education", zh: "获得接受高等教育的机会", tone: "这条搭配适合强调学生获得继续深造机会。", stance: "Positive" },
    { term: "enter", pattern: "enter higher education", zh: "进入高等教育阶段", tone: "这条搭配适合客观描述学生进入大学或高等教育体系。", stance: "Neutral" },
    { term: "be excluded from", pattern: "be excluded from higher education", zh: "被排除在高等教育之外", tone: "这条搭配适合批判经济或制度门槛阻碍学生深造。", stance: "Negative" }
  ]
```

- [ ] **Step 2: Run targeted check for cards 1-10**

Run:

```bash
node -e "const fs=require('fs'),vm=require('vm');const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);ctx.window.FLASHCARD_DATA.filter(c=>c.topic==='Education').slice(0,10).forEach(c=>console.log(c.backEnglish+' => '+c.synonymNetworks[0].options.map(o=>o.phrase+' ['+o.stance+'] manual='+o.manual).join(' | ')))"
```

Expected: all 10 cards print three options with `manual=true`.

## Task 4: Author Manual Content for Education Cards 11-30

**Files:**
- Modify: `data.js`

- [ ] **Step 1: Author card-level entries for these cards**

Cover these 20 cards exactly:

```text
practical vocational education
expand vocational training
flexible distance learning
offer remote education
continuous lifelong learning
promote lifelong learning
genuine educational equity
ensure equality of access
well-designed curriculum
revise the curriculum
mandatory compulsory course
choose an elective course
intense exam pressure
reduce test anxiety
nationwide standardized testing
reform standardized testing
fair continuous assessment
implement continuous assessment
rigid exam-oriented education
move beyond exam-oriented education
```

For each card, add one entry to `EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS` keyed as:

```js
"Education::<type>::<normalized backEnglish>"
```

Use `pattern` for every option. Do not rely on term replacement.

- [ ] **Step 2: Review the batch locally**

Run:

```bash
node -e "const fs=require('fs'),vm=require('vm');const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);ctx.window.FLASHCARD_DATA.filter(c=>c.topic==='Education').slice(10,30).forEach(c=>console.log(c.backEnglish+' => '+c.synonymNetworks[0].options.map(o=>o.phrase+' ['+o.stance+'] manual='+o.manual).join(' | ')))"
```

Expected: all 20 cards print three natural Education collocations with `manual=true`.

- [ ] **Step 3: Send the batch to reviewers**

Dispatch two read-only reviewers:

```text
Verb reviewer: check action frame, verb-object naturalness, stance, and IELTS usability for Education cards 11-30. Do not edit files.
Adjective reviewer: check adjective-noun naturalness, stance, and noun-object specificity for Education cards 11-30. Do not edit files.
```

Resolve every reviewer finding before continuing.

## Task 5: Author Manual Content for Education Cards 31-54

**Files:**
- Modify: `data.js`

- [ ] **Step 1: Author card-level entries for these cards**

Cover these 24 cards exactly:

```text
effective independent learning
encourage self-directed learning
traditional face-to-face learning
combine face-to-face learning with online learning
interactive online learning
adopt e-learning
flexible blended learning
introduce blended learning
productive group work
facilitate collaborative learning
student-centred inquiry-based teaching
apply heuristic teaching
highly personalized teaching
provide tailored teaching
practical hands-on learning
emphasize experiential learning
mechanical rote memorization
discourage rote memorization
consistent high achiever
support underachievers
well-rounded individuals
develop well-rounded individuals
strong sense of social responsibility
cultivate a sense of social responsibility
```

Each entry must have one Positive, one Neutral, and one Negative option unless the card is explicitly flagged as an exception in a reviewer note.

- [ ] **Step 2: Review the batch locally**

Run:

```bash
node -e "const fs=require('fs'),vm=require('vm');const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);ctx.window.FLASHCARD_DATA.filter(c=>c.topic==='Education').slice(30,54).forEach(c=>console.log(c.backEnglish+' => '+c.synonymNetworks[0].options.map(o=>o.phrase+' ['+o.stance+'] manual='+o.manual).join(' | ')))"
```

Expected: all 24 cards print three natural Education collocations with `manual=true`.

- [ ] **Step 3: Send the batch to reviewers**

Dispatch two read-only reviewers with the same criteria as Task 4, scoped to cards 31-54.

Resolve every reviewer finding before continuing.

## Task 6: Author Manual Content for Education Cards 55-74

**Files:**
- Modify: `data.js`

- [ ] **Step 1: Author card-level entries for these cards**

Cover these 20 cards exactly:

```text
critical independent thinking
foster independent thinking
strong cultural identity
preserve cultural identity
strong civic awareness
raise civic awareness
adequate career preparation
provide career preparation
rapidly rising tuition fees
control tuition fees
serious unequal distribution of educational resources
address unequal distribution of educational resources
early dropout
prevent dropout
persistent school bullying
tackle school bullying
excessive commercialization of education
criticize commercialization of education
serious degree inflation
reduce degree inflation
```

Do not reuse known weak patterns:

```text
maintain tuition fees
undermine dropout
confront school bullying as Negative
overly high commercialization of education
serious / severe / grave repeated as all three negative adjectives
```

- [ ] **Step 2: Review the batch locally**

Run:

```bash
node -e "const fs=require('fs'),vm=require('vm');const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);ctx.window.FLASHCARD_DATA.filter(c=>c.topic==='Education').slice(54,74).forEach(c=>console.log(c.backEnglish+' => '+c.synonymNetworks[0].options.map(o=>o.phrase+' ['+o.stance+'] manual='+o.manual).join(' | ')))"
```

Expected: all 20 cards print three natural Education collocations with `manual=true`.

- [ ] **Step 3: Send the batch to reviewers**

Dispatch two read-only reviewers with the same criteria as Task 4, scoped to cards 55-74.

Resolve every reviewer finding before continuing.

## Task 7: Validate, Build, and Spot-Check HTML

**Files:**
- Modify: `task2-collocation-flashcards-advanced-standalone.html`

- [ ] **Step 1: Run full Education validation**

Run:

```bash
node scripts/validate-education-manual-collocations.js
```

Expected output:

```text
Validated 74 Education cards with manual optional collocations.
```

- [ ] **Step 2: Regenerate standalone HTML**

Run:

```bash
node build-standalone.js
```

Expected output includes:

```text
C:\Users\hector\OneDrive\Language\XDF\Writing\IELTS-Topic-Collocation\task2-collocation-flashcards-advanced-standalone.html
```

- [ ] **Step 3: Check for Chinese corruption markers**

Run:

```powershell
Select-String -LiteralPath 'data.js','task2-collocation-flashcards-advanced-standalone.html' -Pattern '\?\?\?\?|娑|閹|閿焋|锟絗|噦'
```

Expected: no output.

- [ ] **Step 4: Check known bad phrases are gone**

Run:

```bash
node -e "const fs=require('fs');const html=fs.readFileSync('task2-collocation-flashcards-advanced-standalone.html','utf8');['strengthen an independent school','review an independent school','weaken an independent school','strengthen boarding school','weaken boarding school','maintain tuition fees','undermine dropout','traceable online learning','transparent private school'].forEach(s=>console.log(s+': '+html.includes(s)))"
```

Expected:

```text
strengthen an independent school: false
review an independent school: false
weaken an independent school: false
strengthen boarding school: false
weaken boarding school: false
maintain tuition fees: false
undermine dropout: false
traceable online learning: false
transparent private school: false
```

- [ ] **Step 5: Spot-check representative cards in HTML**

Open or refresh:

```text
file:///C:/Users/hector/OneDrive/Language/XDF/Writing/IELTS-Topic-Collocation/task2-collocation-flashcards-advanced-standalone.html#topic/Education
```

Spot-check these cards:

```text
enrol in an independent school
send children to boarding school
pursue higher education
move beyond exam-oriented education
combine face-to-face learning with online learning
prevent dropout
tackle school bullying
reduce degree inflation
```

Expected: each right panel shows three manually authored, natural optional collocations with correct stance labels.

## Task 8: Commit the Education Pilot

**Files:**
- Stage only relevant Education pilot files.

- [ ] **Step 1: Review changed files**

Run:

```bash
git status --short
```

Expected relevant files:

```text
 M data.js
 M task2-collocation-flashcards-advanced-standalone.html
?? scripts/validate-education-manual-collocations.js
?? docs/superpowers/specs/2026-06-15-education-manual-collocations-design.md
?? docs/superpowers/plans/2026-06-15-education-manual-collocations.md
```

Do not stage unrelated local files unless the user explicitly asks.

- [ ] **Step 2: Stage relevant files**

Run:

```bash
git add data.js task2-collocation-flashcards-advanced-standalone.html scripts/validate-education-manual-collocations.js docs/superpowers/specs/2026-06-15-education-manual-collocations-design.md docs/superpowers/plans/2026-06-15-education-manual-collocations.md
```

- [ ] **Step 3: Commit**

Run:

```bash
git commit -m "fix: add manual education optional collocations"
```

Expected: commit succeeds with only Education pilot files included.

