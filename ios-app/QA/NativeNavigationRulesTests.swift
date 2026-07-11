import Foundation

@main
struct NativeNavigationRulesTests {
    static func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
        guard condition() else {
            fputs("FAIL: \(message)\n", stderr)
            exit(1)
        }
    }

    static func main() {
        let ratioWinner = ContinuationTopicSelector.select(
            from: [
                TopicDueSnapshot(topicId: "Education", dueCount: 60, totalCount: 100),
                TopicDueSnapshot(topicId: "Technology", dueCount: 40, totalCount: 50)
            ],
            recentTopicId: "Education"
        )
        expect(ratioWinner == "Technology", "highest due ratio should win")

        let absoluteWinner = ContinuationTopicSelector.select(
            from: [
                TopicDueSnapshot(topicId: "Arts", dueCount: 20, totalCount: 40),
                TopicDueSnapshot(topicId: "Society", dueCount: 30, totalCount: 60)
            ],
            recentTopicId: nil
        )
        expect(absoluteWinner == "Society", "absolute due count should break ratio ties")

        let recentWinner = ContinuationTopicSelector.select(
            from: [
                TopicDueSnapshot(topicId: "Arts", dueCount: 20, totalCount: 40),
                TopicDueSnapshot(topicId: "Society", dueCount: 20, totalCount: 40)
            ],
            recentTopicId: "Society"
        )
        expect(recentWinner == "Society", "recent topic should break equal count ties")

        let stableWinner = ContinuationTopicSelector.select(
            from: [
                TopicDueSnapshot(topicId: "Technology", dueCount: 10, totalCount: 20),
                TopicDueSnapshot(topicId: "Education", dueCount: 10, totalCount: 20)
            ],
            recentTopicId: nil
        )
        expect(stableWinner == "Education", "topic ID should provide the final tie break")

        let zeroWinner = ContinuationTopicSelector.select(
            from: [
                TopicDueSnapshot(topicId: "Education", dueCount: 0, totalCount: 100),
                TopicDueSnapshot(topicId: "Technology", dueCount: 0, totalCount: 50)
            ],
            recentTopicId: "Technology"
        )
        expect(zeroWinner == "Technology", "zero-due state should use the recent valid topic")

        expect(
            CardSearchMatcher.matches(
                query: "公共教育",
                frontChinese: "改善公共教育质量",
                backEnglish: "improve the quality of public education"
            ),
            "Chinese content should match"
        )
        expect(
            CardSearchMatcher.matches(
                query: "  PUBLIC EDUCATION  ",
                frontChinese: "改善公共教育质量",
                backEnglish: "improve the quality of public education"
            ),
            "English content should match case-insensitively after trimming"
        )
        expect(
            !CardSearchMatcher.matches(
                query: "formal",
                frontChinese: "改善公共教育质量",
                backEnglish: "improve the quality of public education"
            ),
            "metadata outside Chinese and English should not match"
        )
        expect(
            !CardSearchMatcher.matches(
                query: "   ",
                frontChinese: "改善公共教育质量",
                backEnglish: "improve the quality of public education"
            ),
            "blank queries should not return every card"
        )

        print("Native navigation rule checks passed.")
    }
}
