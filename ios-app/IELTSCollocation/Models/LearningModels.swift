import Foundation
import SwiftUI

struct AppContent: Decodable {
    let schemaId: String
    let exportedAt: String
    let metadata: ContentMetadata
    let topics: [Topic]
    let cards: [Flashcard]
}

struct ContentMetadata: Decodable {
    let cardCount: Int
    let topicCount: Int
    let synonymOptionCount: Int
}

struct Topic: Decodable, Identifiable, Hashable {
    let id: String
    let zh: String
    let color: String
    let accent: String
    let cardCount: Int

    var tint: Color { Color(hex: color) }
    var accentTint: Color { Color(hex: accent) }
    var title: String { id }
}

struct Flashcard: Decodable, Identifiable, Hashable {
    let id: String
    let topic: String
    let type: CardType
    let frontChinese: String
    let backEnglish: String
    let baseChinese: String
    let baseEnglish: String
    let highlightChinese: String
    let highlightEnglish: String
    let synonymNetworks: [SynonymNetwork]
}

enum CardType: String, Decodable, Hashable {
    case adjective
    case verb

    var label: String {
        switch self {
        case .adjective: "Adjective"
        case .verb: "Verb"
        }
    }
}

struct SynonymNetwork: Decodable, Hashable {
    let core: String
    let coreExpression: String
    let role: String
    let options: [SynonymOption]
}

struct SynonymOption: Decodable, Identifiable, Hashable {
    var id: String { "\(phrase ?? term)|\(term)|\(stance)" }

    let term: String
    let zh: String
    let tone: String
    let stance: String
    let phrase: String?
    let microContext: String?
    let example: String?
}

struct DailyStudySession: Codable, Equatable {
    var targetCardIds: [String]
    var completedCardIds: Set<String>

    init(targetCardIds: [String], completedCardIds: Set<String> = []) {
        var seen: Set<String> = []
        self.targetCardIds = targetCardIds.filter { seen.insert($0).inserted }
        self.completedCardIds = completedCardIds.intersection(seen)
    }

    var pendingCardIds: [String] {
        targetCardIds.filter { !completedCardIds.contains($0) }
    }

    var fractionComplete: Double {
        guard !targetCardIds.isEmpty else { return 1 }
        return Double(completedCardIds.count) / Double(targetCardIds.count)
    }

    var isComplete: Bool {
        pendingCardIds.isEmpty
    }

    @discardableResult
    mutating func complete(_ cardId: String) -> Bool {
        guard targetCardIds.contains(cardId) else { return false }
        return completedCardIds.insert(cardId).inserted
    }

    @discardableResult
    mutating func deferCard(_ cardId: String) -> Bool {
        guard !completedCardIds.contains(cardId),
              let index = targetCardIds.firstIndex(of: cardId) else {
            return false
        }
        targetCardIds.append(targetCardIds.remove(at: index))
        return true
    }
}

struct DailyStudyProgress: Codable, Equatable {
    var dateKey: String
    private(set) var sessions: [String: DailyStudySession]

    init(dateKey: String, sessions: [String: DailyStudySession] = [:]) {
        self.dateKey = dateKey
        self.sessions = sessions
    }

    @discardableResult
    mutating func prepareSession(topicId: String, dateKey: String, dueCardIds: [String]) -> DailyStudySession {
        if self.dateKey != dateKey {
            self = DailyStudyProgress(dateKey: dateKey)
        }
        if let existing = sessions[topicId] {
            return existing
        }
        let session = DailyStudySession(targetCardIds: dueCardIds)
        sessions[topicId] = session
        return session
    }

    func session(topicId: String) -> DailyStudySession? {
        sessions[topicId]
    }

    @discardableResult
    mutating func complete(topicId: String, cardId: String) -> Bool {
        guard var session = sessions[topicId], session.complete(cardId) else {
            return false
        }
        sessions[topicId] = session
        return true
    }

    @discardableResult
    mutating func deferCard(topicId: String, cardId: String) -> Bool {
        guard var session = sessions[topicId], session.deferCard(cardId) else {
            return false
        }
        sessions[topicId] = session
        return true
    }
}

enum GalleryMemoryStatus: String, CaseIterable, Identifiable, Hashable {
    case new
    case weak
    case known

    var id: Self { self }

    var label: String {
        switch self {
        case .new: "未学习"
        case .weak: "薄弱"
        case .known: "已掌握"
        }
    }

    init(_ status: ReviewStatus) {
        switch status {
        case .new: self = .new
        case .weak: self = .weak
        case .known: self = .known
        }
    }
}

struct GalleryMemoryDistribution: Equatable {
    let total: Int
    let new: Int
    let weak: Int
    let known: Int

    init(statuses: [GalleryMemoryStatus]) {
        total = statuses.count
        new = statuses.filter { $0 == .new }.count
        weak = statuses.filter { $0 == .weak }.count
        known = statuses.filter { $0 == .known }.count
    }

    func count(for status: GalleryMemoryStatus) -> Int {
        switch status {
        case .new: new
        case .weak: weak
        case .known: known
        }
    }

    func percentage(for status: GalleryMemoryStatus) -> Int {
        guard total > 0 else { return 0 }
        return Int((Double(count(for: status)) / Double(total) * 100).rounded())
    }
}

struct ReviewRecord: Codable, Equatable {
    var cardId: String
    var status: ReviewStatus
    var lastRating: ReviewRating?
    var reviewCount: Int
    var wrongCount: Int
    var lapseCount: Int
    var ease: Double
    var intervalDays: Int
    var lastReviewedAt: Int64
    var nextReviewAt: Int64
    var createdAt: Int64
    var updatedAt: Int64

    static func fresh(cardId: String, now: Int64 = 0) -> ReviewRecord {
        ReviewRecord(
            cardId: cardId,
            status: .new,
            lastRating: nil,
            reviewCount: 0,
            wrongCount: 0,
            lapseCount: 0,
            ease: 2.5,
            intervalDays: 0,
            lastReviewedAt: 0,
            nextReviewAt: now,
            createdAt: now,
            updatedAt: now
        )
    }
}

enum ReviewStatus: String, Codable {
    case new
    case weak
    case known
}

enum ReviewRating: String, Codable, CaseIterable, Identifiable {
    case again
    case hard
    case good
    case easy

    var id: String { rawValue }

    var label: String {
        switch self {
        case .again: "不会"
        case .hard: "模糊"
        case .good: "认识"
        case .easy: "熟练"
        }
    }
}

struct ReviewLogEntry: Codable, Identifiable, Equatable {
    let id: String
    let cardId: String
    let topic: String
    let type: String
    let rating: ReviewRating
    let reviewedAt: Int64
    let previousStatus: ReviewStatus
    let nextStatus: ReviewStatus
    let previousEase: Double
    let nextEase: Double
    let previousIntervalDays: Int
    let nextIntervalDays: Int
    let previousDueAt: Int64
    let nextDueAt: Int64
}

struct MemoryExport: Codable {
    let app: String
    let schemaId: String
    let schemaVersion: Int
    let version: Int
    let exportedAt: String
    let cardsTotal: Int
    let tables: MemoryTables
    let bank: [String]
    let reviewLog: [ReviewLogEntry]
    let reviews: [String: ReviewRecord]
}

enum MemoryImportMerger {
    static func reviewRecords(
        existing: [String: ReviewRecord],
        payload: MemoryExport
    ) -> [String: ReviewRecord] {
        var merged = existing
        payload.tables.reviewState.forEach { merged[$0.cardId] = $0 }
        payload.reviews.forEach { merged[$0.key] = $0.value }
        return merged
    }
}

struct MemoryTables: Codable {
    let cards: [MemoryCardRow]
    let reviewState: [ReviewRecord]
    let reviewLog: [ReviewLogEntry]
    let settings: [MemorySetting]

    enum CodingKeys: String, CodingKey {
        case cards
        case reviewState = "review_state"
        case reviewLog = "review_log"
        case settings
    }
}

struct MemoryCardRow: Codable {
    let id: String
    let topic: String
    let type: String
    let frontChinese: String
    let backEnglish: String
    let baseChinese: String
    let baseEnglish: String
}

struct MemorySetting: Codable {
    let key: String
    let value: String
    let updatedAt: String
}

extension Color {
    init(hex: String) {
        let cleaned = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var value: UInt64 = 0
        Scanner(string: cleaned).scanHexInt64(&value)
        let red = Double((value >> 16) & 0xff) / 255
        let green = Double((value >> 8) & 0xff) / 255
        let blue = Double(value & 0xff) / 255
        self.init(red: red, green: green, blue: blue)
    }
}
