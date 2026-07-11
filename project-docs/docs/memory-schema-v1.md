# Topic Collocation Memory Schema v1

This schema is the export/import contract for the web app.

## Export Shape

```json
{
  "app": "IELTS-Topic-Collocation",
  "schemaId": "topic-collocation-memory-v1",
  "schemaVersion": 1,
  "version": 2,
  "exportedAt": "2026-06-12T00:00:00.000Z",
  "cardsTotal": 0,
  "tables": {
    "cards": [],
    "review_state": [],
    "review_log": [],
    "settings": []
  },
  "bank": [],
  "reviewLog": [],
  "reviews": {}
}
```

`tables` is the portable source of truth for structured review data. The legacy `bank`, `reviewLog`, and `reviews` fields are kept so older web exports remain easy to inspect and import.

## Table: cards

One row per flashcard.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | TEXT PRIMARY KEY | Stable card id: topic, type, front, and back joined by `::`. |
| `topic` | TEXT | Topic name, such as `Technology`. |
| `type` | TEXT | Card type/category. |
| `frontChinese` | TEXT | Front side. |
| `backEnglish` | TEXT | Back side. |
| `baseChinese` | TEXT | Optional source phrase. |
| `baseEnglish` | TEXT | Optional source phrase. |

## Table: review_state

One row per card for the current spaced-repetition state.

| Field | Type | Notes |
| --- | --- | --- |
| `cardId` | TEXT PRIMARY KEY | Foreign key to `cards.id`. |
| `status` | TEXT | `new`, `weak`, or `known`. |
| `lastRating` | TEXT | `again`, `hard`, `good`, `easy`, or empty. |
| `reviewCount` | INTEGER | Total completed reviews. |
| `wrongCount` | INTEGER | Count of `again`. |
| `lapseCount` | INTEGER | Count of `again` after prior reviews. |
| `ease` | REAL | SM-2-lite ease factor. Default `2.5`, minimum `1.3`. |
| `intervalDays` | INTEGER | Current interval. |
| `lastReviewedAt` | INTEGER | Unix epoch milliseconds. |
| `nextReviewAt` | INTEGER | Unix epoch milliseconds. `0` means new/unscheduled. |
| `createdAt` | INTEGER | Unix epoch milliseconds. |
| `updatedAt` | INTEGER | Unix epoch milliseconds. |

## Table: review_log

Append-only history of every review action.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | TEXT PRIMARY KEY | `cardId::reviewedAt::reviewCount`. |
| `cardId` | TEXT | Foreign key to `cards.id`. |
| `topic` | TEXT | Snapshot for easier analysis. |
| `type` | TEXT | Snapshot for easier analysis. |
| `rating` | TEXT | `again`, `hard`, `good`, or `easy`. |
| `reviewedAt` | INTEGER | Unix epoch milliseconds. |
| `previousStatus` | TEXT | Status before the review. |
| `nextStatus` | TEXT | Status after the review. |
| `previousEase` | REAL | Ease before review. |
| `nextEase` | REAL | Ease after review. |
| `previousIntervalDays` | INTEGER | Interval before review. |
| `nextIntervalDays` | INTEGER | Interval after review. |
| `previousDueAt` | INTEGER | Due time before review. |
| `nextDueAt` | INTEGER | Due time after review. |

## Table: settings

Small key/value metadata rows.

| Field | Type | Notes |
| --- | --- | --- |
| `key` | TEXT PRIMARY KEY | Setting name. |
| `value` | TEXT | Setting value. |
| `updatedAt` | TEXT | ISO timestamp. |

## SQLite Draft

```sql
CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  type TEXT NOT NULL,
  frontChinese TEXT NOT NULL,
  backEnglish TEXT NOT NULL,
  baseChinese TEXT NOT NULL DEFAULT '',
  baseEnglish TEXT NOT NULL DEFAULT ''
);

CREATE TABLE review_state (
  cardId TEXT PRIMARY KEY REFERENCES cards(id),
  status TEXT NOT NULL,
  lastRating TEXT NOT NULL DEFAULT '',
  reviewCount INTEGER NOT NULL DEFAULT 0,
  wrongCount INTEGER NOT NULL DEFAULT 0,
  lapseCount INTEGER NOT NULL DEFAULT 0,
  ease REAL NOT NULL DEFAULT 2.5,
  intervalDays INTEGER NOT NULL DEFAULT 0,
  lastReviewedAt INTEGER NOT NULL DEFAULT 0,
  nextReviewAt INTEGER NOT NULL DEFAULT 0,
  createdAt INTEGER NOT NULL DEFAULT 0,
  updatedAt INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE review_log (
  id TEXT PRIMARY KEY,
  cardId TEXT NOT NULL REFERENCES cards(id),
  topic TEXT NOT NULL,
  type TEXT NOT NULL,
  rating TEXT NOT NULL,
  reviewedAt INTEGER NOT NULL,
  previousStatus TEXT NOT NULL,
  nextStatus TEXT NOT NULL,
  previousEase REAL NOT NULL,
  nextEase REAL NOT NULL,
  previousIntervalDays INTEGER NOT NULL,
  nextIntervalDays INTEGER NOT NULL,
  previousDueAt INTEGER NOT NULL,
  nextDueAt INTEGER NOT NULL
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX idx_review_state_due ON review_state(nextReviewAt);
CREATE INDEX idx_review_log_card ON review_log(cardId, reviewedAt);
```

## Rating Algorithm

- `again`: due today, `ease - 0.2`, status `weak`.
- `hard`: new card to 1 day, reviewed card to about `intervalDays * 1.2`, `ease - 0.15`, status `weak`.
- `good`: new card to 1 day, reviewed card to about `intervalDays * ease`, status `known`.
- `easy`: new card to 4 days, reviewed card to about `intervalDays * ease * 1.3`, status `known`.

Importers should treat `review_state` as the current state and `review_log` as append-only audit/history.
