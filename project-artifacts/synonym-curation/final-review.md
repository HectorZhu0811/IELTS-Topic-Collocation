# Final Synonym Curation Review

Status: FAIL

Changed report path: `project-artifacts/synonym-curation/final-review.md`

## Review Scope

- Read `project-docs/synonym-curation-guidelines.md`.
- Read `project-artifacts/qa/synonym-template-audit.json`.
- Reviewed all top-level topic curation files in `project-artifacts/synonym-curation/*.json`.
- Excluded `project-artifacts/synonym-curation/input/*` and any `parts/*` files from final-output review, except for coverage comparison against each input topic's `cardsToReview`.
- Did not edit any JSON files.

## Coverage

PASS for coverage.

Every input `cardsToReview` item is covered by either `approved` or `deferred` in the matching top-level topic curation file. All reviewed topic JSON files parse successfully.

| Topic | Input cardsToReview | Approved | Deferred |
| --- | ---: | ---: | ---: |
| Arts | 24 | 24 | 0 |
| Economy | 27 | 27 | 0 |
| Education | 14 | 14 | 0 |
| Environment | 30 | 30 | 0 |
| Government | 31 | 31 | 0 |
| Health | 28 | 28 | 0 |
| Media | 22 | 22 | 0 |
| Society | 34 | 34 | 0 |
| Technology | 20 | 20 | 0 |
| Urbanization | 16 | 16 | 0 |

## Issue List

| Topic | cardKey | phrase | Reason |
| --- | --- | --- | --- |
| Technology | `Technology::verb::use video conferencing` | `make use of video conferencing` | Repeats the original focus word `use`, which violates the focus-word-repeat check. |
| Education | `Education::adjective::persistent school bullying` | `effective anti-bullying measures` | Target drift / unnatural option for the card type: this is a policy measure, not an adjective collocation for `school bullying`. |
| Society | `Society::adjective::rapidly growing aging population` | `fast-ageing population` | Cross-topic spelling/style inconsistency: uses British `ageing` while the source card and most project wording use `aging`. |
| Society | `Society::adjective::rapidly growing aging population` | `accelerating population ageing` | Cross-topic spelling/style inconsistency: uses British `ageing` while the source card and most project wording use `aging`. |
| Society | `Society::verb::address aging population` | `respond to population ageing` | Cross-topic spelling/style inconsistency: uses British `ageing` while the source card and most project wording use `aging`. |
| Urbanization | `Urbanization::verb::encourage ride-sharing` | `incentivise carpooling` | Cross-topic spelling/style inconsistency: British `incentivise` is mixed with otherwise American-style spellings. |
| Environment | `Environment::verb::promote recycling` | `incentivise recycling` | Cross-topic spelling/style inconsistency: British `incentivise` is mixed with otherwise American-style spellings. |
| Environment | `Environment::verb::encourage energy conservation` | `incentivise energy conservation` | Cross-topic spelling/style inconsistency: British `incentivise` is mixed with otherwise American-style spellings. |
| Environment | `Environment::verb::harness solar power` | `utilise solar power` | Cross-topic spelling/style inconsistency: British `utilise` is mixed with otherwise American-style spellings. |
| Health | `Health::verb::prioritize self-care` | `practise self-care` | Cross-topic spelling/style inconsistency: British verb spelling `practise` is mixed with American `prioritize` in the same card. |
| Health | `Health::adjective::affordable medical insurance` | `subsidised medical insurance` | Cross-topic spelling/style inconsistency: British `subsidised` is mixed with otherwise American-style spellings. |
| Health | `Health::verb::purchase medical insurance` | `enrol in a medical insurance plan` | Cross-topic spelling/style inconsistency: British `enrol` is mixed with otherwise American-style spellings. |
| Society | `Society::verb::provide rehabilitation` | `offer rehabilitation programmes` | Cross-topic spelling/style inconsistency: British `programmes` is mixed with otherwise American-style spellings. |

## Checks With No Blocking Findings

- No exact banned generic adjective or verb terms were found as lazy final-option terms in the reviewed top-level curation files.
- Chinese `zh` and `tone` fields are generally specific to the collocation rather than generic boilerplate.
- No missing coverage was found against input `cardsToReview`.
- No JSON syntax corruption was found.
