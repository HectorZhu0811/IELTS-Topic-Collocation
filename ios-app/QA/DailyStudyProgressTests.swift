import Foundation

@main
struct DailyStudyProgressTests {
    static func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
        guard condition() else {
            fputs("FAIL: \(message)\n", stderr)
            exit(1)
        }
    }

    static func main() {
        var progress = DailyStudyProgress(dateKey: "2026-07-10")

        let initial = progress.prepareSession(
            topicId: "Education",
            dateKey: "2026-07-10",
            dueCardIds: ["card-a", "card-b", "card-a"]
        )
        expect(initial.targetCardIds == ["card-a", "card-b"], "target cards should be stable and deduplicated")
        expect(initial.completedCardIds.isEmpty, "new session should start with no completed cards")
        expect(initial.fractionComplete == 0, "new non-empty session should start at zero progress")
        expect(initial.pendingCardIds == ["card-a", "card-b"], "pending order should match the original due snapshot")

        let retained = progress.prepareSession(
            topicId: "Education",
            dateKey: "2026-07-10",
            dueCardIds: ["card-c"]
        )
        expect(retained.targetCardIds == ["card-a", "card-b"], "same-day session should not change when due state mutates")

        expect(progress.deferCard(topicId: "Education", cardId: "card-a"), "a failed card should move later in today's queue")
        expect(!progress.deferCard(topicId: "Education", cardId: "outside-card"), "a card outside today's target should not enter the retry queue")

        let deferred = progress.session(topicId: "Education")
        expect(deferred?.fractionComplete == 0, "a failed rating should not increase daily progress")
        expect(deferred?.pendingCardIds == ["card-b", "card-a"], "a failed card should reappear after the remaining cards")

        expect(progress.complete(topicId: "Education", cardId: "card-b"), "a remembered target card should complete")
        expect(!progress.complete(topicId: "Education", cardId: "card-b"), "duplicate completion should not be counted twice")

        let halfway = progress.session(topicId: "Education")
        expect(halfway?.fractionComplete == 0.5, "one of two completed cards should report fifty percent")
        expect(halfway?.pendingCardIds == ["card-a"], "the failed card should remain pending for another attempt")

        expect(progress.complete(topicId: "Education", cardId: "card-a"), "the retried card should complete after a remembered rating")
        expect(progress.session(topicId: "Education")?.fractionComplete == 1, "completed session should report full progress")
        expect(progress.session(topicId: "Education")?.isComplete == true, "completed session should be marked complete")

        let nextDay = progress.prepareSession(
            topicId: "Education",
            dateKey: "2026-07-11",
            dueCardIds: []
        )
        expect(progress.dateKey == "2026-07-11", "new local day should reset persisted sessions")
        expect(nextDay.targetCardIds.isEmpty, "zero-due session should keep an empty target")
        expect(nextDay.fractionComplete == 1, "zero-due session should read as today's work complete")
        expect(nextDay.isComplete, "zero-due session should use the completed empty state")

        var contentUpdate = DailyStudyProgress(dateKey: "2026-07-10")
        _ = contentUpdate.prepareSession(
            topicId: "Technology",
            dateKey: "2026-07-10",
            dueCardIds: ["original-card"]
        )
        let stableToday = contentUpdate.prepareSession(
            topicId: "Technology",
            dateKey: "2026-07-10",
            dueCardIds: ["original-card", "new-merged-card"]
        )
        expect(stableToday.targetCardIds == ["original-card"], "same-day content additions should not change the queue snapshot")
        let rebuiltTomorrow = contentUpdate.prepareSession(
            topicId: "Technology",
            dateKey: "2026-07-11",
            dueCardIds: ["original-card", "new-merged-card"]
        )
        expect(
            rebuiltTomorrow.targetCardIds == ["original-card", "new-merged-card"],
            "the next local day should include newly merged cards"
        )

        print("Daily study progress checks passed.")
    }
}
