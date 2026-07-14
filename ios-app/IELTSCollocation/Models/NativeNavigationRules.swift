import Foundation

enum AppRoute: Hashable {
    case topic(String)
    case cardPreview(String)
    case gallery
    case settings
}

enum GalleryNavigationRules {
    static func initialTopicId(for path: [AppRoute]) -> String? {
        guard path.last == .gallery else { return nil }
        guard let parentRoute = path.dropLast().last else { return nil }
        guard case .topic(let topicId) = parentRoute else { return nil }
        return topicId
    }

    static func backPath(from path: [AppRoute]) -> [AppRoute] {
        guard path.last == .gallery else { return path }
        return Array(path.dropLast())
    }
}

struct TopicDueSnapshot: Equatable {
    let topicId: String
    let dueCount: Int
    let totalCount: Int

    var dueRatio: Double {
        guard totalCount > 0 else { return 0 }
        return Double(dueCount) / Double(totalCount)
    }
}

enum ContinuationTopicSelector {
    static func select(
        from snapshots: [TopicDueSnapshot],
        recentTopicId: String?
    ) -> String? {
        guard !snapshots.isEmpty else { return nil }

        if snapshots.allSatisfy({ $0.dueCount == 0 }),
           let recentTopicId,
           snapshots.contains(where: { $0.topicId == recentTopicId }) {
            return recentTopicId
        }

        return snapshots.sorted { left, right in
            if left.dueRatio != right.dueRatio {
                return left.dueRatio > right.dueRatio
            }
            if left.dueCount != right.dueCount {
                return left.dueCount > right.dueCount
            }
            if let recentTopicId {
                let leftIsRecent = left.topicId == recentTopicId
                let rightIsRecent = right.topicId == recentTopicId
                if leftIsRecent != rightIsRecent {
                    return leftIsRecent
                }
            }
            return left.topicId < right.topicId
        }.first?.topicId
    }
}

enum CardSearchMatcher {
    static func matches(
        query: String,
        frontChinese: String,
        backEnglish: String
    ) -> Bool {
        let normalized = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalized.isEmpty else { return false }
        return frontChinese.localizedCaseInsensitiveContains(normalized)
            || backEnglish.localizedCaseInsensitiveContains(normalized)
    }
}
