import Foundation

@main
struct GalleryRulesTests {
    static func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
        guard condition() else {
            fputs("FAIL: \(message)\n", stderr)
            exit(1)
        }
    }

    static func main() {
        let statuses: [GalleryMemoryStatus] = [.known, .weak, .new, .known, .new]
        let distribution = GalleryMemoryDistribution(statuses: statuses)

        expect(distribution.total == 5, "gallery distribution should count every card")
        expect(distribution.known == 2, "known count should include known cards")
        expect(distribution.weak == 1, "weak count should include weak cards")
        expect(distribution.new == 2, "new count should include new cards")
        expect(distribution.percentage(for: .known) == 40, "known percentage should be rounded from total")
        expect(distribution.percentage(for: .weak) == 20, "weak percentage should be rounded from total")
        expect(distribution.percentage(for: .new) == 40, "new percentage should be rounded from total")
        expect(distribution.percentage(for: .known) + distribution.percentage(for: .weak) + distribution.percentage(for: .new) == 100, "status percentages should sum to one hundred")

        expect(GalleryMemoryStatus.known.label == "已掌握", "known status should use the approved Chinese label")
        expect(GalleryMemoryStatus.weak.label == "薄弱", "weak status should use the approved Chinese label")
        expect(GalleryMemoryStatus.new.label == "未学习", "new status should use the approved Chinese label")

        print("Gallery rule checks passed.")
    }
}
