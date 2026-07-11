# Synonym Curation Guidelines

## Goal

Replace low-quality generated synonym alternatives with manually curated IELTS Task 2 collocation alternatives.

These alternatives are not dictionary synonyms. They are approved collocation choices for the same topic object.

## Hard Rules

- Do not use a generator or broad fallback bank.
- Do not edit `web-source/data.js` during topic curation.
- Do not edit another topic's curation file.
- If a card cannot be fixed confidently, leave it out and add it to `deferred`.
- Prefer fewer high-quality options over three weak options.
- Every approved entry must be natural English for IELTS Writing Task 2.
- Every approved entry must have a specific Chinese explanation.

## Banned Generic Terms

Do not use these as automatic replacements unless they are genuinely part of a fixed, natural collocation for that exact object:

- adjective: `valuable`, `meaningful`, `notable`, `well-targeted`, `long-term`, `context-specific`, `measurable`, `problematic`, `controversial`, `limited`
- verb: `promote`, `maintain`, `develop`, `analyse`, `discuss`, `assess`, `sideline`, `undermine`, `overlook`

## Output Schema

Each topic subagent must write one JSON file:

`project-artifacts/synonym-curation/<topic-id>.json`

Use this structure:

```json
{
  "topic": "Society",
  "curator": "topic-subagent",
  "sourceAudit": "project-artifacts/qa/synonym-template-audit.json",
  "approved": [
    {
      "cardKey": "Society::adjective::statutory minimum wage",
      "baseChinese": "最低工资",
      "baseEnglish": "minimum wage",
      "type": "adjective",
      "original": "statutory minimum wage",
      "focus": "statutory",
      "options": [
        {
          "phrase": "legal minimum wage",
          "term": "legal",
          "zh": "法定最低工资",
          "stance": "Neutral",
          "tone": "适合客观说明最低工资由法律规定，而不是企业自愿设定。"
        }
      ]
    }
  ],
  "deferred": [
    {
      "cardKey": "Society::verb::example",
      "reason": "No confident natural alternative found without changing the learning target."
    }
  ]
}
```

## Quality Checks

Before returning, topic subagents must check:

- No banned generic term appears as a lazy fallback.
- No option repeats the original focus word unless it is part of a deliberate fixed expression.
- No phrase is simply an adjective pasted before any noun.
- Verb alternatives match the object semantically.
- Positive / Neutral / Negative stance is defensible.
- Chinese text is specific to the collocation, not generic.
