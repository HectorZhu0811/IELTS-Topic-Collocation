import SwiftUI
import UniformTypeIdentifiers

enum AppRoute: Hashable {
    case topic(String)
    case topicSearch(topicId: String, query: String)
    case recent(String)
    case memoryBank
    case zen(topicId: String, query: String)
    case settings
}

struct NativeAppView: View {
    @StateObject private var store = LearningStore()
    @State private var path: [AppRoute] = []

    var body: some View {
        NavigationStack(path: $path) {
            Group {
                if let error = store.loadError {
                    LoadErrorView(message: error)
                } else if store.content == nil {
                    ProgressView("Loading trainer")
                } else {
                    HomeView(store: store, path: $path)
                }
            }
            .navigationDestination(for: AppRoute.self) { route in
                destination(for: route)
            }
        }
    }

    @ViewBuilder
    private func destination(for route: AppRoute) -> some View {
        switch route {
        case .topic(let topicId):
            TopicStudyView(store: store, path: $path, topicId: topicId)
        case .topicSearch(let topicId, let query):
            TopicStudyView(store: store, path: $path, topicId: topicId, initialQuery: query)
        case .recent(let topicId):
            RecentTopicView(store: store, path: $path, topicId: topicId)
        case .memoryBank:
            MemoryBankView(store: store, path: $path)
        case .zen(let topicId, let query):
            ZenModeView(store: store, topicId: topicId, query: query)
        case .settings:
            SettingsView(store: store)
        }
    }
}

struct HomeView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]

    private var rankedTopics: [Topic] {
        store.topics.sorted {
            let left = store.dueCount(topicId: $0.id) + store.weakCount(topicId: $0.id)
            let right = store.dueCount(topicId: $1.id) + store.weakCount(topicId: $1.id)
            if left == right { return $0.id < $1.id }
            return left > right
        }
    }

    private var featureTopic: Topic? {
        rankedTopics.first
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                AppHeader(
                    title: "IELTS Collocation",
                    subtitle: nil,
                    actionIcon: "gearshape",
                    actionLabel: "Settings"
                ) {
                    path.append(.settings)
                }

                hero
                topicGrid
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground())
        .navigationBarHidden(true)
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Today")
                .font(.caption.weight(.heavy))
                .foregroundStyle(featureTopic?.tint ?? .secondary)
                .textCase(.uppercase)

            Text("Pick a topic, review weak cards, or jump into Zen mode.")
                .font(.title2.weight(.heavy))
                .lineLimit(3)
                .minimumScaleFactor(0.82)

            HStack(spacing: 10) {
                SummaryPill(value: "\(store.cards.filter(store.isDue).count)", label: "due")
                SummaryPill(value: "\(store.memoryBankCards().count)", label: "saved")
                SummaryPill(value: "\(store.metadata?.subtopicCount ?? 0)", label: "recent")
            }

            HStack(spacing: 12) {
                Button {
                    path.append(.topic(store.lastTopicId))
                } label: {
                    Label("Resume", systemImage: "play.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(PrimaryGlassButtonStyle(tint: featureTopic?.tint ?? .blue, accent: featureTopic?.accentTint))

                Button {
                    path.append(.memoryBank)
                } label: {
                    Label("Memory", systemImage: "building.columns.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(SecondaryGlassButtonStyle())
            }
        }
        .padding(18)
        .background {
            TopicSoftCardBackground(topic: featureTopic, cornerRadius: 28)
        }
    }

    private var topicGrid: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 160, maximum: 240), spacing: 12)], spacing: 12) {
            ForEach(rankedTopics) { topic in
                Button {
                    store.rememberTopic(topic.id)
                    path.append(.topic(topic.id))
                } label: {
                    TopicTile(
                        topic: topic,
                        due: store.dueCount(topicId: topic.id),
                        weak: store.weakCount(topicId: topic.id)
                    )
                }
                .frame(maxWidth: .infinity)
                .buttonStyle(.plain)
            }
        }
    }
}

struct TopicStudyView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]
    let topicId: String
    let initialQuery: String

    @State private var query = ""
    @State private var mode: PracticeMode = .all

    init(store: LearningStore, path: Binding<[AppRoute]>, topicId: String, initialQuery: String = "") {
        self.store = store
        self._path = path
        self.topicId = topicId
        self.initialQuery = initialQuery
    }

    private var topic: Topic? { store.topic(id: topicId) }
    private var filteredCards: [Flashcard] {
        store.filteredCards(topicId: topicId, query: query, mode: mode)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                AppHeader(
                    title: topic?.title ?? topicId,
                    subtitle: "Selected · \(topic?.zh ?? "")",
                    actionIcon: "square.grid.2x2",
                    actionLabel: "Recent Topic"
                ) {
                    path.append(.recent(topicId))
                }

                controls

                if filteredCards.isEmpty {
                    EmptyStateView(title: "No cards found", message: "Try another search or switch practice mode.")
                } else {
                    LazyVStack(spacing: 12) {
                        ForEach(filteredCards) { card in
                            FlashcardView(store: store, card: card)
                        }
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground(topic: topic))
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            store.rememberTopic(topicId)
            if query.isEmpty, !initialQuery.isEmpty {
                query = initialQuery
            }
        }
    }

    private var controls: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                TextField("中文 / English / tone", text: $query)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .padding(.horizontal, 14)
                    .frame(height: 52)
                    .background(.white.opacity(0.78), in: RoundedRectangle(cornerRadius: 18, style: .continuous))

                Button {
                    query = ""
                } label: {
                    Image(systemName: "xmark")
                        .frame(width: 42, height: 42)
                }
                .buttonStyle(SecondaryGlassButtonStyle())
                .accessibilityLabel("Clear search")
            }

            Picker("Practice mode", selection: $mode) {
                ForEach(PracticeMode.allCases) { mode in
                    Text(mode.label).tag(mode)
                }
            }
            .pickerStyle(.segmented)

            HStack(spacing: 12) {
                SummaryPill(value: "\(filteredCards.count)", label: "visible")
                SummaryPill(value: "\(store.dueCount(topicId: topicId))", label: "due")
                SummaryPill(value: "\(store.weakCount(topicId: topicId))", label: "weak")
            }

            HStack(spacing: 12) {
                Button {
                    path.append(.memoryBank)
                } label: {
                    Label("Memory", systemImage: "building.columns.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(SecondaryGlassButtonStyle())

                Button {
                    path.append(.zen(topicId: topicId, query: query))
                } label: {
                    Label("Zen mode", systemImage: "sun.max.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(PrimaryGlassButtonStyle(tint: topic?.tint ?? .green, accent: topic?.accentTint))
            }
        }
        .padding(14)
        .background {
            TopicSoftCardBackground(topic: topic, cornerRadius: 24)
        }
    }
}

struct FlashcardView: View {
    @ObservedObject var store: LearningStore
    let card: Flashcard

    @State private var revealed = false

    private var record: ReviewRecord { store.record(for: card) }
    private var topic: Topic? { store.topic(id: card.topic) }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(record.status.rawValue.capitalized)
                        .font(.caption.weight(.bold))
                        .foregroundStyle(.secondary)
                }

                Spacer(minLength: 10)

                Button {
                    store.toggleMark(card)
                } label: {
                    Label(store.isMarked(card) ? "Saved" : "Mark", systemImage: store.isMarked(card) ? "checkmark.circle.fill" : "plus.circle.fill")
                        .labelStyle(.titleAndIcon)
                }
                .buttonStyle(CompactGlassButtonStyle())
            }

            Button {
                withAnimation(.spring(response: 0.48, dampingFraction: 0.84)) {
                    revealed.toggle()
                }
            } label: {
                FlippableStudyCard(card: card, topic: topic, revealed: revealed)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(revealed ? "Hide answer" : "Reveal answer")

            if revealed {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 86), spacing: 8)], spacing: 8) {
                    ForEach(ReviewRating.allCases) { rating in
                        Button(rating.label) {
                            withAnimation(.snappy) {
                                _ = store.scheduleReview(card: card, rating: rating)
                                revealed = false
                            }
                        }
                        .buttonStyle(RatingButtonStyle(rating: rating))
                    }
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
        .padding(16)
        .background {
            TopicSoftCardBackground(topic: topic, cornerRadius: 24)
        }
    }
}

struct FlippableStudyCard: View {
    let card: Flashcard
    let topic: Topic?
    let revealed: Bool
    var minHeight: CGFloat = 220

    private var tint: Color { topic?.tint ?? .green }

    var body: some View {
        ZStack {
            StudyCardFace(
                title: card.highlightedFront(tint: tint),
                subtitle: nil,
                topic: topic,
                minHeight: minHeight
            )
            .opacity(revealed ? 0 : 1)
            .rotation3DEffect(.degrees(revealed ? 180 : 0), axis: (x: 0, y: 1, z: 0), perspective: 0.72)

            StudyCardFace(
                title: card.highlightedBack(tint: tint),
                subtitle: nil,
                topic: topic,
                minHeight: minHeight
            )
            .opacity(revealed ? 1 : 0)
            .rotation3DEffect(.degrees(revealed ? 0 : -180), axis: (x: 0, y: 1, z: 0), perspective: 0.72)
        }
        .frame(maxWidth: .infinity, minHeight: minHeight)
        .contentShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}

struct StudyCardFace: View {
    let title: AttributedString
    let subtitle: String?
    let topic: Topic?
    var minHeight: CGFloat = 220

    var body: some View {
        VStack(spacing: 18) {
            Text(title)
                .font(.system(size: 30, weight: .heavy))
                .foregroundStyle(.primary)
                .multilineTextAlignment(.center)
                .lineLimit(4)
                .minimumScaleFactor(0.58)

            if let subtitle, !subtitle.isEmpty {
                Text(subtitle)
                    .font(.headline.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
                    .minimumScaleFactor(0.72)
            }
        }
        .frame(maxWidth: .infinity, minHeight: minHeight)
        .padding(22)
        .background {
            TopicSoftCardBackground(topic: topic, cornerRadius: 24)
        }
    }
}

extension Flashcard {
    func highlightedFront(tint: Color) -> AttributedString {
        highlightedText(frontChinese, highlight: highlightChinese, tint: tint)
    }

    func highlightedBack(tint: Color) -> AttributedString {
        highlightedText(backEnglish, highlight: highlightEnglish, tint: tint)
    }

    private func highlightedText(_ text: String, highlight: String, tint: Color) -> AttributedString {
        var attributed = AttributedString(text)
        guard !highlight.isEmpty, let range = attributed.range(of: highlight) else {
            return attributed
        }
        attributed[range].foregroundColor = tint
        return attributed
    }
}

struct MemoryBankView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]

    private var groupedCards: [(String, [Flashcard])] {
        Dictionary(grouping: store.memoryBankCards(), by: \.topic)
            .sorted { $0.key < $1.key }
            .map { ($0.key, $0.value) }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                AppHeader(title: "Memory Bank", subtitle: "\(store.memoryBankCards().count) saved or weak cards", actionIcon: "gearshape", actionLabel: "Settings") {
                    path.append(.settings)
                }

                if groupedCards.isEmpty {
                    EmptyStateView(title: "No saved cards", message: "Mark difficult collocations or rate them as weak.")
                } else {
                    ForEach(groupedCards, id: \.0) { topicId, cards in
                        VStack(alignment: .leading, spacing: 10) {
                            Button {
                                path.append(.topic(topicId))
                            } label: {
                                Label("\(topicId) · \(cards.count)", systemImage: "arrowshape.turn.up.right.fill")
                                    .font(.headline.weight(.bold))
                            }
                            .buttonStyle(SecondaryGlassButtonStyle())

                            ForEach(cards.prefix(12)) { card in
                                FlashcardView(store: store, card: card)
                            }
                        }
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground())
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct ZenModeView: View {
    @ObservedObject var store: LearningStore
    let topicId: String
    let query: String

    @State private var index = 0
    @State private var revealed = false

    private var cards: [Flashcard] {
        let dueCards = store.filteredCards(topicId: topicId, query: query, mode: .due)
        return dueCards.isEmpty ? store.filteredCards(topicId: topicId, query: query, mode: .all) : dueCards
    }

    private var card: Flashcard? {
        cards.isEmpty ? nil : cards[min(index, cards.count - 1)]
    }

    var body: some View {
        VStack(spacing: 16) {
            if let card {
                Spacer(minLength: 8)

                Text("\(topicId) · \(index + 1)/\(cards.count)")
                    .font(.caption.weight(.heavy))
                    .foregroundStyle(.secondary)

                Button {
                    withAnimation(.snappy) { revealed.toggle() }
                } label: {
                    FlippableStudyCard(card: card, topic: store.topic(id: topicId), revealed: revealed, minHeight: 300)
                }
                .buttonStyle(.plain)

                if revealed {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 88), spacing: 8)], spacing: 8) {
                        ForEach(ReviewRating.allCases) { rating in
                            Button(rating.label) {
                                _ = store.scheduleReview(card: card, rating: rating)
                                advance()
                            }
                            .buttonStyle(RatingButtonStyle(rating: rating))
                        }
                    }
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                }

                Spacer(minLength: 10)
            } else {
                EmptyStateView(title: "No Zen cards", message: "This topic has no available cards.")
            }
        }
        .padding(16)
        .background(AppBackground(topic: store.topic(id: topicId)))
        .navigationTitle("Zen mode")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func advance() {
        withAnimation(.snappy) {
            revealed = false
            if index < cards.count - 1 {
                index += 1
            } else {
                index = 0
            }
        }
    }
}

struct RecentTopicView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]
    let topicId: String

    private var topic: Topic? { store.topic(id: topicId) }
    private var recentTopic: RecentTopic? { store.recentTopic(id: topicId) }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                AppHeader(title: "Recent Topic", subtitle: "\(topicId) · \(recentTopic?.zh ?? "")", actionIcon: "play.fill", actionLabel: "Start topic") {
                    path.append(.topic(topicId))
                }

                ForEach(recentTopic?.subtopics ?? []) { subtopic in
                    Button {
                        path.append(.topicSearch(topicId: topicId, query: subtopic.phrases.first ?? subtopic.title))
                    } label: {
                        VStack(alignment: .leading, spacing: 12) {
                            Text(subtopic.zh)
                                .font(.caption.weight(.heavy))
                                .foregroundStyle(topic?.tint ?? .green)
                            Text(subtopic.title)
                                .font(.title3.weight(.heavy))
                                .multilineTextAlignment(.leading)
                            FlowPhrases(phrases: subtopic.phrases)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(16)
                        .background {
                            TopicSoftCardBackground(topic: topic, cornerRadius: 24)
                        }
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground(topic: topic))
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct SettingsView: View {
    @ObservedObject var store: LearningStore
    @State private var exportURL: URL?
    @State private var importing = false
    @State private var importMessage: String?

    var body: some View {
        Form {
            Section("Content") {
                LabeledContent("Cards", value: "\(store.metadata?.cardCount ?? 0)")
                LabeledContent("Topics", value: "\(store.metadata?.topicCount ?? 0)")
                LabeledContent("Recent subtopics", value: "\(store.metadata?.subtopicCount ?? 0)")
            }

            Section("Memory") {
                Button("Prepare memory export") {
                    prepareExport()
                }
                if let exportURL {
                    ShareLink(item: exportURL) {
                        Label("Share memory JSON", systemImage: "square.and.arrow.up")
                    }
                }
                Button("Import memory JSON") {
                    importing = true
                }
                if let importMessage {
                    Text(importMessage)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            Section("TestFlight diagnostics") {
                LabeledContent("Bundle ID", value: Bundle.main.bundleIdentifier ?? "Unknown")
                LabeledContent("Version", value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "Unknown")
                LabeledContent("Build", value: Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "Unknown")
                Text("No login, cloud sync, payments, or IAP in this beta.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .navigationTitle("Settings")
        .fileImporter(isPresented: $importing, allowedContentTypes: [.json]) { result in
            switch result {
            case .success(let url):
                do {
                    let allowed = url.startAccessingSecurityScopedResource()
                    defer { if allowed { url.stopAccessingSecurityScopedResource() } }
                    try store.importMemoryData(Data(contentsOf: url))
                    importMessage = "Memory imported."
                } catch {
                    importMessage = "Import failed: \(error.localizedDescription)"
                }
            case .failure(let error):
                importMessage = "Import failed: \(error.localizedDescription)"
            }
        }
    }

    private func prepareExport() {
        do {
            let data = try store.exportMemoryData()
            let url = FileManager.default.temporaryDirectory.appendingPathComponent("ielts-topic-collocation-memory.json")
            try data.write(to: url, options: .atomic)
            exportURL = url
        } catch {
            importMessage = "Export failed: \(error.localizedDescription)"
        }
    }
}

struct AppHeader: View {
    let title: String
    let subtitle: String?
    let actionIcon: String
    let actionLabel: String
    let action: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.title2.weight(.heavy))
                    .lineLimit(2)
                    .minimumScaleFactor(0.75)
                if let subtitle, !subtitle.isEmpty {
                    Text(subtitle)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
            }
            .frame(maxWidth: .infinity, minHeight: 54, alignment: .leading)
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .adaptiveGlass(tint: .white.opacity(0.16), cornerRadius: 24)

            Button(action: action) {
                Image(systemName: actionIcon)
                    .font(.system(size: 18, weight: .bold))
                    .frame(width: 54, height: 54)
            }
            .buttonStyle(IconGlassButtonStyle())
            .accessibilityLabel(actionLabel)
        }
    }
}

struct TopicTile: View {
    let topic: Topic
    let due: Int
    let weak: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(topic.zh)
                .font(.caption.weight(.heavy))
                .foregroundStyle(topic.tint)

            Text(topic.title)
                .font(.title3.weight(.heavy))
                .lineLimit(2)
                .minimumScaleFactor(0.78)

            Spacer(minLength: 2)

            HStack(spacing: 8) {
                TopicMetric(value: "\(due)", label: "due")
                TopicMetric(value: "\(weak)", label: "weak")
            }
        }
        .frame(maxWidth: .infinity, minHeight: 148, alignment: .topLeading)
        .padding(14)
        .background {
            TopicSoftCardBackground(topic: topic, cornerRadius: 24)
        }
        .contentShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}

struct TopicMetric: View {
    let value: String
    let label: String

    var body: some View {
        VStack(spacing: 0) {
            Text(value)
                .font(.headline.weight(.heavy))
            Text(label)
                .font(.caption2.weight(.heavy))
                .foregroundStyle(.secondary)
                .textCase(.uppercase)
        }
        .frame(maxWidth: .infinity, minHeight: 48)
        .background(.white.opacity(0.72), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}

struct SummaryPill: View {
    let value: String
    let label: String
    var inverted = false

    var body: some View {
        VStack(spacing: 0) {
            Text(value)
                .font(.headline.weight(.heavy))
                .foregroundStyle(inverted ? .white : .primary)
            Text(label)
                .font(.caption2.weight(.heavy))
                .foregroundStyle(inverted ? .white.opacity(0.76) : .secondary)
                .textCase(.uppercase)
        }
        .frame(minWidth: 58)
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
        .background(inverted ? .white.opacity(0.18) : .white.opacity(0.74), in: Capsule())
    }
}

struct FlowPhrases: View {
    let phrases: [String]

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 132), spacing: 8)], alignment: .leading, spacing: 8) {
            ForEach(phrases, id: \.self) { phrase in
                Text(phrase)
                    .font(.caption.weight(.semibold))
                    .lineLimit(2)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 8)
                    .background(.white.opacity(0.68), in: Capsule())
            }
        }
    }
}

struct EmptyStateView: View {
    let title: String
    let message: String

    var body: some View {
        VStack(spacing: 8) {
            Text(title)
                .font(.headline.weight(.heavy))
            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(24)
        .adaptiveGlass(tint: .white.opacity(0.14), cornerRadius: 24)
    }
}

struct LoadErrorView: View {
    let message: String

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 38))
                .foregroundStyle(.orange)
            Text("Unable to load trainer")
                .font(.title2.weight(.heavy))
            Text(message)
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(24)
    }
}

struct AppBackground: View {
    var topic: Topic?

    var body: some View {
        ZStack {
            Color(red: 0.961, green: 0.961, blue: 0.969)
            LinearGradient(
                colors: [
                    (topic?.tint ?? .blue).opacity(0.13),
                    .white.opacity(0.72),
                    (topic?.accentTint ?? .cyan).opacity(0.10)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        }
        .ignoresSafeArea()
    }
}

struct TopicSoftCardBackground: View {
    let topic: Topic?
    let cornerRadius: CGFloat

    private var tint: Color { topic?.tint ?? .blue }
    private var accent: Color { topic?.accentTint ?? .cyan }

    var body: some View {
        ZStack(alignment: .topTrailing) {
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [
                            .white,
                            tint.opacity(0.09),
                            accent.opacity(0.14)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )

            Circle()
                .fill(accent.opacity(0.24))
                .frame(width: 132, height: 132)
                .blur(radius: 8)
                .offset(x: 38, y: -46)

            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                .strokeBorder(tint.opacity(0.16), lineWidth: 1)
        }
        .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
        .shadow(color: .black.opacity(0.055), radius: 18, x: 0, y: 12)
    }
}

struct TopicSolidCardBackground: View {
    let topic: Topic?
    let cornerRadius: CGFloat

    private var tint: Color { topic?.tint ?? .blue }
    private var accent: Color { topic?.accentTint ?? .cyan }

    var body: some View {
        ZStack(alignment: .topLeading) {
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [
                            tint,
                            accent
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )

            Circle()
                .fill(.white.opacity(0.22))
                .frame(width: 180, height: 180)
                .blur(radius: 8)
                .offset(x: -70, y: -84)

            Circle()
                .fill(.white.opacity(0.10))
                .frame(width: 220, height: 220)
                .blur(radius: 18)
                .offset(x: 200, y: 90)
        }
        .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
        .shadow(color: tint.opacity(0.26), radius: 24, x: 0, y: 18)
    }
}

extension View {
    @ViewBuilder
    func adaptiveGlass(tint: Color, cornerRadius: CGFloat) -> some View {
        if #available(iOS 26, *) {
            self.glassEffect(.regular.tint(tint), in: .rect(cornerRadius: cornerRadius))
        } else {
            self.background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
        }
    }
}

struct PrimaryGlassButtonStyle: ButtonStyle {
    let tint: Color
    var accent: Color?

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline.weight(.bold))
            .foregroundStyle(.white)
            .padding(.horizontal, 14)
            .frame(minHeight: 52)
            .background(
                LinearGradient(
                    colors: [tint, accent ?? tint],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                in: RoundedRectangle(cornerRadius: 18, style: .continuous)
            )
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
    }
}

struct SecondaryGlassButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline.weight(.bold))
            .padding(.horizontal, 12)
            .frame(minHeight: 48)
            .adaptiveGlass(tint: .white.opacity(configuration.isPressed ? 0.28 : 0.16), cornerRadius: 18)
    }
}

struct CompactGlassButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.caption.weight(.heavy))
            .padding(.horizontal, 10)
            .frame(minHeight: 36)
            .adaptiveGlass(tint: .green.opacity(configuration.isPressed ? 0.22 : 0.12), cornerRadius: 16)
    }
}

struct IconGlassButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .adaptiveGlass(tint: .white.opacity(configuration.isPressed ? 0.28 : 0.18), cornerRadius: 24)
    }
}

struct RatingButtonStyle: ButtonStyle {
    let rating: ReviewRating

    private var tint: Color {
        switch rating {
        case .again: .red
        case .hard: .orange
        case .good: .green
        case .easy: .blue
        }
    }

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.subheadline.weight(.heavy))
            .foregroundStyle(tint)
            .frame(maxWidth: .infinity, minHeight: 44)
            .adaptiveGlass(tint: tint.opacity(configuration.isPressed ? 0.22 : 0.10), cornerRadius: 16)
    }
}
