import Foundation

@main
struct MemoryImportCompatibilityTests {
    static func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
        guard condition() else {
            fputs("FAIL: \(message)\n", stderr)
            exit(1)
        }
    }

    static func main() throws {
        let newCard = ReviewRecord.fresh(cardId: "new-merged-card", now: 200)
        var legacyTableRecord = ReviewRecord.fresh(cardId: "legacy-card", now: 100)
        legacyTableRecord.status = .weak
        var legacyReviewRecord = legacyTableRecord
        legacyReviewRecord.status = .known
        legacyReviewRecord.reviewCount = 3

        let payload = MemoryExport(
            app: "IELTS-Topic-Collocation",
            schemaId: "topic-collocation-memory-v1",
            schemaVersion: 1,
            version: 2,
            exportedAt: "2026-07-10T00:00:00Z",
            cardsTotal: 556,
            tables: MemoryTables(
                cards: [],
                reviewState: [legacyTableRecord],
                reviewLog: [],
                settings: []
            ),
            bank: [],
            reviewLog: [],
            reviews: ["legacy-card": legacyReviewRecord]
        )

        let merged = MemoryImportMerger.reviewRecords(
            existing: [newCard.cardId: newCard],
            payload: payload
        )

        expect(merged[newCard.cardId] == newCard, "new merged cards should keep their local fresh state")
        expect(merged[legacyReviewRecord.cardId] == legacyReviewRecord, "legacy v1 review records should import")
        expect(merged.count == 2, "import should merge legacy records without deleting new cards")

        print("Memory import compatibility checks passed.")
    }
}
