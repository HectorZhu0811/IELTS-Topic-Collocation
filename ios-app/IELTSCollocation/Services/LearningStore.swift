import Foundation

@MainActor
final class LearningStore: ObservableObject {
    @Published private(set) var content: AppContent?
    @Published private(set) var loadError: String?
    @Published var reviewRecords: [String: ReviewRecord] = [:]
    @Published var reviewLog: [ReviewLogEntry] = []
    @Published var markedCardIds: Set<String> = []
    @Published var lastTopicId: String = "Education"

    private let recordsKey = "native-review-records-v1"
    private let logKey = "native-review-log-v1"
    private let bankKey = "native-marked-card-ids-v1"
    private let lastTopicKey = "native-last-topic-v1"
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()

    init() {
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        loadPersistedState()
        loadContent()
    }

    var topics: [Topic] { content?.topics ?? [] }
    var cards: [Flashcard] { content?.cards ?? [] }
    var recentTopics: [RecentTopic] { content?.recentTopics ?? [] }
    var metadata: ContentMetadata? { content?.metadata }

    func topic(id: String) -> Topic? {
        topics.first { $0.id == id }
    }

    func recentTopic(id: String) -> RecentTopic? {
        recentTopics.first { $0.id == id }
    }

    func cards(for topicId: String) -> [Flashcard] {
        cards.filter { $0.topic == topicId }
    }

    func filteredCards(topicId: String, query: String, mode: PracticeMode = .all) -> [Flashcard] {
        var result = cards(for: topicId)
        switch mode {
        case .all:
            break
        case .due:
            result = result.filter { isDue($0) }
        case .weak:
            result = result.filter { isWeak($0) || isMarked($0) }
        }

        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !trimmed.isEmpty else { return result }
        return result.filter { $0.searchableText.contains(trimmed) }
    }

    func dueCount(topicId: String) -> Int {
        cards(for: topicId).filter { isDue($0) }.count
    }

    func weakCount(topicId: String) -> Int {
        cards(for: topicId).filter { isWeak($0) || isMarked($0) }.count
    }

    func knownCount(topicId: String) -> Int {
        cards(for: topicId).filter { record(for: $0).status == .known }.count
    }

    func reviewRecord(for cardId: String) -> ReviewRecord {
        reviewRecords[cardId] ?? .fresh(cardId: cardId, now: nowMillis())
    }

    func record(for card: Flashcard) -> ReviewRecord {
        reviewRecord(for: card.id)
    }

    func isDue(_ card: Flashcard) -> Bool {
        let record = record(for: card)
        return record.nextReviewAt == 0 || record.nextReviewAt <= nowMillis()
    }

    func isWeak(_ card: Flashcard) -> Bool {
        record(for: card).status == .weak
    }

    func isMarked(_ card: Flashcard) -> Bool {
        markedCardIds.contains(card.id)
    }

    func toggleMark(_ card: Flashcard) {
        if markedCardIds.contains(card.id) {
            markedCardIds.remove(card.id)
        } else {
            markedCardIds.insert(card.id)
        }
        persistBank()
    }

    @discardableResult
    func scheduleReview(card: Flashcard, rating: ReviewRating) -> ReviewRecord {
        let now = nowMillis()
        let previous = reviewRecord(for: card.id)
        let oldEase = max(1.3, previous.ease)
        let oldInterval = max(0, previous.intervalDays)
        let newEase: Double
        let intervalDays: Int
        let status: ReviewStatus
        let wrongCount: Int
        let lapseCount: Int

        switch rating {
        case .again:
            newEase = max(1.3, oldEase - 0.2)
            intervalDays = 0
            status = .weak
            wrongCount = previous.wrongCount + 1
            lapseCount = previous.reviewCount > 0 ? previous.lapseCount + 1 : previous.lapseCount
        case .hard:
            newEase = max(1.3, oldEase - 0.15)
            intervalDays = oldInterval <= 0 ? 1 : max(1, Int((Double(oldInterval) * 1.2).rounded()))
            status = .weak
            wrongCount = previous.wrongCount
            lapseCount = previous.lapseCount
        case .good:
            newEase = oldEase
            intervalDays = oldInterval <= 0 ? 1 : max(1, Int((Double(oldInterval) * oldEase).rounded()))
            status = .known
            wrongCount = previous.wrongCount
            lapseCount = previous.lapseCount
        case .easy:
            newEase = oldEase + 0.15
            intervalDays = oldInterval <= 0 ? 4 : max(4, Int((Double(oldInterval) * oldEase * 1.3).rounded()))
            status = .known
            wrongCount = previous.wrongCount
            lapseCount = previous.lapseCount
        }

        let createdAt = previous.createdAt == 0 ? now : previous.createdAt
        let nextDue = rating == .again ? now : addDays(now, intervalDays)
        let record = ReviewRecord(
            cardId: card.id,
            status: status,
            lastRating: rating,
            reviewCount: previous.reviewCount + 1,
            wrongCount: wrongCount,
            lapseCount: lapseCount,
            ease: newEase,
            intervalDays: intervalDays,
            lastReviewedAt: now,
            nextReviewAt: nextDue,
            createdAt: createdAt,
            updatedAt: now
        )

        reviewRecords[card.id] = record
        if status == .weak {
            markedCardIds.insert(card.id)
        } else if status == .known {
            markedCardIds.remove(card.id)
        }

        reviewLog.append(ReviewLogEntry(
            id: "\(card.id)::\(now)::\(record.reviewCount)",
            cardId: card.id,
            topic: card.topic,
            type: card.type.rawValue,
            rating: rating,
            reviewedAt: now,
            previousStatus: previous.status,
            nextStatus: record.status,
            previousEase: previous.ease,
            nextEase: record.ease,
            previousIntervalDays: previous.intervalDays,
            nextIntervalDays: record.intervalDays,
            previousDueAt: previous.nextReviewAt,
            nextDueAt: record.nextReviewAt
        ))

        persistState()
        return record
    }

    func memoryBankCards() -> [Flashcard] {
        cards.filter { markedCardIds.contains($0.id) || isWeak($0) }
            .sorted { lhs, rhs in
                if lhs.topic == rhs.topic { return lhs.frontChinese < rhs.frontChinese }
                return lhs.topic < rhs.topic
            }
    }

    func exportMemoryData() throws -> Data {
        let exportedAt = ISO8601DateFormatter().string(from: Date())
        let cardRows = cards.map {
            MemoryCardRow(
                id: $0.id,
                topic: $0.topic,
                type: $0.type.rawValue,
                frontChinese: $0.frontChinese,
                backEnglish: $0.backEnglish,
                baseChinese: $0.baseChinese,
                baseEnglish: $0.baseEnglish
            )
        }
        let rows = cards.map { reviewRecords[$0.id] ?? .fresh(cardId: $0.id) }
        let export = MemoryExport(
            app: "IELTS-Topic-Collocation",
            schemaId: "topic-collocation-memory-v1",
            schemaVersion: 1,
            version: 2,
            exportedAt: exportedAt,
            cardsTotal: cards.count,
            tables: MemoryTables(
                cards: cardRows,
                reviewState: rows,
                reviewLog: reviewLog,
                settings: [
                    MemorySetting(key: "memory_schema_id", value: "topic-collocation-memory-v1", updatedAt: exportedAt),
                    MemorySetting(key: "algorithm", value: "sm2-lite", updatedAt: exportedAt)
                ]
            ),
            bank: Array(markedCardIds).sorted(),
            reviewLog: reviewLog,
            reviews: reviewRecords
        )
        return try encoder.encode(export)
    }

    func importMemoryData(_ data: Data) throws {
        let payload = try decoder.decode(MemoryExport.self, from: data)
        var importedRecords = reviewRecords
        payload.tables.reviewState.forEach { importedRecords[$0.cardId] = $0 }
        payload.reviews.forEach { importedRecords[$0.key] = $0.value }
        reviewRecords = importedRecords

        let existingLogIds = Set(reviewLog.map(\.id))
        reviewLog.append(contentsOf: payload.tables.reviewLog.filter { !existingLogIds.contains($0.id) })
        payload.reviewLog.forEach { entry in
            if !reviewLog.contains(where: { $0.id == entry.id }) {
                reviewLog.append(entry)
            }
        }

        markedCardIds.formUnion(payload.bank)
        for (cardId, record) in reviewRecords {
            if record.status == .weak {
                markedCardIds.insert(cardId)
            } else if record.status == .known {
                markedCardIds.remove(cardId)
            }
        }
        persistState()
    }

    func rememberTopic(_ topicId: String) {
        lastTopicId = topicId
        UserDefaults.standard.set(topicId, forKey: lastTopicKey)
    }

    private func loadContent() {
        guard let url = Bundle.main.url(forResource: "ios-content", withExtension: "json", subdirectory: "Content")
                ?? Bundle.main.url(forResource: "ios-content", withExtension: "json") else {
            loadError = "Missing bundled learning content."
            return
        }
        do {
            let data = try Data(contentsOf: url)
            let decoded = try decoder.decode(AppContent.self, from: data)
            guard decoded.metadata.cardCount == decoded.cards.count else {
                loadError = "Content card count mismatch."
                return
            }
            content = decoded
            if !decoded.topics.contains(where: { $0.id == lastTopicId }) {
                lastTopicId = decoded.topics.first?.id ?? "Education"
            }
        } catch {
            loadError = "Unable to load learning content: \(error.localizedDescription)"
        }
    }

    private func loadPersistedState() {
        if let topic = UserDefaults.standard.string(forKey: lastTopicKey) {
            lastTopicId = topic
        }
        if let data = UserDefaults.standard.data(forKey: recordsKey),
           let records = try? decoder.decode([String: ReviewRecord].self, from: data) {
            reviewRecords = records
        }
        if let data = UserDefaults.standard.data(forKey: logKey),
           let entries = try? decoder.decode([ReviewLogEntry].self, from: data) {
            reviewLog = entries
        }
        if let data = UserDefaults.standard.data(forKey: bankKey),
           let ids = try? decoder.decode(Set<String>.self, from: data) {
            markedCardIds = ids
        }
    }

    private func persistState() {
        persistRecords()
        persistLog()
        persistBank()
    }

    private func persistRecords() {
        if let data = try? encoder.encode(reviewRecords) {
            UserDefaults.standard.set(data, forKey: recordsKey)
        }
    }

    private func persistLog() {
        if let data = try? encoder.encode(reviewLog) {
            UserDefaults.standard.set(data, forKey: logKey)
        }
    }

    private func persistBank() {
        if let data = try? encoder.encode(markedCardIds) {
            UserDefaults.standard.set(data, forKey: bankKey)
        }
    }

    private func nowMillis() -> Int64 {
        Int64(Date().timeIntervalSince1970 * 1000)
    }

    private func addDays(_ value: Int64, _ days: Int) -> Int64 {
        value + Int64(days) * 24 * 60 * 60 * 1000
    }
}

enum PracticeMode: String, CaseIterable, Identifiable {
    case all
    case due
    case weak

    var id: String { rawValue }

    var label: String {
        switch self {
        case .all: "All"
        case .due: "Due"
        case .weak: "Weak"
        }
    }
}
