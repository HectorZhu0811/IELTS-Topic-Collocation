# Education Manual Optional Collocations Design

## Goal

Replace generated optional collocations for the Education topic with card-level, manually reviewed content. The goal is quality over speed: every optional collocation must be natural, IELTS Task 2-ready, and useful as a learnable writing phrase.

## Scope

This design covers the 74 Education cards in the HTML version of the IELTS Topic Collocation flashcards.

It does not cover other topics or a global rewrite yet. Education is the pilot topic. Other topics should follow only after this topic is reviewed and accepted.

## Core Decision

Do not use runtime generators or broad fallback banks to create final optional collocations.

Each Education card should have manually authored optional collocations at card level. Program logic may read, display, and validate the content, but it must not invent final phrases from `verb + object` or `adjective + noun` templates.

## Content Standard

Each card should normally contain three options:

- Positive: expresses value, improvement, access, effectiveness, support, or mitigation.
- Neutral: describes classification, mechanism, process, scope, evidence, or analysis without praise or criticism.
- Negative: identifies risk, exclusion, inequality, overuse, underfunding, distortion, harm, or worsening.

If a card genuinely does not support this three-way split, it should be flagged as an exception instead of forcing awkward wording.

Each option must include:

- `phrase`: a complete collocation that can be used directly in IELTS Task 2.
- `stance`: `Positive`, `Neutral`, or `Negative`.
- `zh`: concise Chinese meaning.
- `tone`: Chinese explanation of when the whole collocation is useful.

## Verb Card Rules

Verb cards must be judged by action frame before phrase choice.

Common Education frames:

- Enrolment / placement: `attend public school`, `apply to an independent school`, `send children to boarding school`.
- Provision / access: `guarantee compulsory education`, `offer remote education`, `expand vocational training`.
- Reform / governance: `revise the curriculum`, `reform standardized testing`, `evaluate continuous assessment`.
- Pedagogy / learning practice: `adopt e-learning`, `facilitate collaborative learning`, `emphasize experiential learning`.
- Student development / values: `support underachievers`, `foster independent thinking`, `raise civic awareness`.
- Problem control: `reduce test anxiety`, `control tuition fees`, `prevent dropout`, `curb commercialization of education`.

Rejected pattern: taking the original object and attaching a generic system verb, such as `strengthen an independent school`, `weaken boarding school`, or `maintain tuition fees`.

## Adjective Card Rules

Adjective cards must be judged by the noun object, not by adjective synonymy.

Education-specific noun objects that need manual treatment include:

- Schools and stages: public school, private school, boarding school, compulsory education, higher education.
- Learning modes: distance learning, online learning, blended learning, face-to-face learning, lifelong learning.
- Curriculum and assessment: curriculum, course, standardized testing, continuous assessment, exam-oriented education.
- Teaching and learning practices: inquiry-based teaching, personalized teaching, hands-on learning, rote memorization.
- Student development: high achiever, well-rounded individuals, independent thinking, social responsibility, civic awareness, cultural identity.
- Problems and costs: tuition fees, unequal distribution of educational resources, dropout, school bullying, commercialization of education, degree inflation.

Rejected pattern: substituting generic adjectives that are explainable but not idiomatic, such as `traceable online learning`, `practical dropout`, or `transparent private school`.

## Reviewer Workflow

The main thread owns final content and integration.

Reviewer agents may be used only for review and critique. They should not directly write final content into the source file.

Suggested reviewers:

- Verb reviewer: checks action frame, verb-object naturalness, stance, and IELTS usability.
- Adjective reviewer: checks adjective-noun naturalness, stance, and noun-object specificity.

Any card fails if one of its three options is unnatural, mislabeled, or dependent on hidden context.

## Implementation Shape

Preferred data shape is card-level manual content, either as explicit overrides keyed to the card or as a dedicated `optionalCollocations` field in the card data.

Validation should check:

- Every Education card has manual optional collocations.
- Each non-exception card has exactly one Positive, one Neutral, and one Negative option.
- No Education card falls back to generated `VERB_COLLOCATION_BANKS`, `ADJECTIVE_COLLOCATION_BANKS`, or generic `SYNONYM_DRAFTS`.
- Chinese text contains no mojibake or question-mark corruption.
- The standalone HTML has been regenerated from the validated data.

## Pilot Acceptance

Education is accepted only when:

- All 74 cards have card-level manually reviewed options.
- Reviewer feedback has been resolved.
- A data validation script reports no fallback-generated Education options.
- Representative cards are spot-checked in the HTML page.
