import SwiftUI
import UniformTypeIdentifiers

enum AppTab: Hashable {
    case home
    case topics
    case gallery
}

struct NativeAppView: View {
    @StateObject private var store = LearningStore()
    @State private var selectedTab: AppTab = .home
    @State private var homePath: [AppRoute] = []
    @State private var topicsPath: [AppRoute] = []
    @State private var galleryPath: [AppRoute] = []

    var body: some View {
        Group {
            if let error = store.loadError {
                LoadErrorView(message: error)
            } else if store.content == nil {
                ProgressView("Loading trainer")
            } else {
                TabView(selection: $selectedTab) {
                    NavigationStack(path: $homePath) {
                        HomeView(store: store, path: $homePath)
                            .navigationDestination(for: AppRoute.self) { route in
                                destination(for: route, path: $homePath)
                            }
                    }
                    .tabItem {
                        Label("首页", systemImage: "house.fill")
                    }
                    .tag(AppTab.home)

                    NavigationStack(path: $topicsPath) {
                        AllTopicsView(store: store, path: $topicsPath)
                            .navigationDestination(for: AppRoute.self) { route in
                                destination(for: route, path: $topicsPath)
                            }
                    }
                    .tabItem {
                        Label("全部话题", systemImage: "square.grid.2x2")
                    }
                    .tag(AppTab.topics)

                    NavigationStack(path: $galleryPath) {
                        GalleryView(store: store, path: $galleryPath)
                            .navigationDestination(for: AppRoute.self) { route in
                                destination(for: route, path: $galleryPath)
                            }
                    }
                    .tabItem {
                        Label("Gallery", systemImage: "rectangle.grid.2x2")
                    }
                    .tag(AppTab.gallery)
                }
            }
        }
    }

    @ViewBuilder
    private func destination(
        for route: AppRoute,
        path: Binding<[AppRoute]>
    ) -> some View {
        switch route {
        case .topic(let topicId):
            TopicStudyView(store: store, path: path, topicId: topicId)
        case .cardPreview(let cardId):
            CardPreviewView(store: store, cardId: cardId)
        case .gallery:
            GalleryView(
                store: store,
                path: path,
                initialTopicId: GalleryNavigationRules.initialTopicId(for: path.wrappedValue)
            )
        case .settings:
            SettingsView(store: store)
        }
    }
}

struct CardPreviewView: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.dismiss) private var dismiss

    @ObservedObject var store: LearningStore
    let cardId: String

    @State private var revealed = false

    var body: some View {
        Group {
            if let card = store.card(id: cardId) {
                ScrollView {
                    Button {
                        withAnimation(reduceMotion ? nil : .spring(response: 0.48, dampingFraction: 0.84)) {
                            revealed.toggle()
                        }
                    } label: {
                        FlippableStudyCard(
                            card: card,
                            topic: store.topic(id: card.topic),
                            revealed: revealed,
                            minHeight: 390,
                            frontSubtitle: "轻点查看英文"
                        )
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(revealed ? card.backEnglish : card.frontChinese)
                    .accessibilityHint(revealed ? "轻点返回中文" : "轻点查看英文")
                    .padding(.horizontal, 16)
                    .padding(.vertical, 24)
                }
                .background(AppBackground(topic: store.topic(id: card.topic)))
            } else {
                LoadErrorView(message: "Card not found.")
            }
        }
        .safeAreaInset(edge: .top, spacing: 0) {
            GalleryDetailHeader(title: store.card(id: cardId)?.topic ?? "卡片") {
                dismiss()
            }
        }
        .toolbar(.hidden, for: .navigationBar)
    }
}

struct GalleryDetailHeader: View {
    let title: String
    let backAction: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            Button(action: backAction) {
                Image(systemName: "chevron.left")
                    .font(.title3.weight(.semibold))
                    .frame(width: 44, height: 44)
                    .background(Color.primary.opacity(0.08), in: Circle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel("返回")
            .accessibilityHint("返回 Gallery")

            Text(title)
                .font(.headline.weight(.semibold))
                .lineLimit(1)

            Spacer(minLength: 0)
        }
        .frame(height: 44)
        .padding(.horizontal, 16)
        .padding(.vertical, 6)
        .background(.ultraThinMaterial)
    }
}

struct HomeView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]

    private var featureTopic: Topic? {
        store.continuationTopic()
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                hero
                HomeOverviewPlaceholder()
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground())
        .navigationBarHidden(true)
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("今日学习")
                .font(.caption.weight(.heavy))
                .foregroundStyle(featureTopic?.tint ?? .secondary)

            if let topic = featureTopic {
                Text(topic.title)
                    .font(.title2.weight(.heavy))

                if store.dueCount(topicId: topic.id) > 0 {
                    Text("\(store.dueCount(topicId: topic.id)) 张待复习卡片")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)
                } else {
                    Text("今日已完成")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)
                }

                Button {
                    store.rememberTopic(topic.id)
                    path.append(.topic(topic.id))
                } label: {
                    Label("继续 \(topic.title)", systemImage: "play.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(
                    PrimaryGlassButtonStyle(tint: topic.tint, accent: topic.accentTint)
                )
            }
        }
        .padding(18)
        .background {
            TopicSoftCardBackground(topic: featureTopic, cornerRadius: 28)
        }
    }

}

struct HomeOverviewPlaceholder: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                Image(systemName: "chart.line.uptrend.xyaxis")
                Text("学习概览")
            }
            .font(.headline.weight(.heavy))
            .foregroundStyle(.secondary)

            Text("更多学习数据即将上线")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(18)
        .background {
            TopicSoftCardBackground(topic: nil, cornerRadius: 24)
        }
        .accessibilityElement(children: .combine)
    }
}

struct AllTopicsView: View {
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

    var body: some View {
        ScrollView {
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
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground())
        .navigationTitle("全部话题")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct TopicStudyView: View {
    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]
    let topicId: String

    @State private var revealed = false
    private var topic: Topic? { store.topic(id: topicId) }

    private var currentCard: Flashcard? {
        store.nextDailyCard(topicId: topicId)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if let card = currentCard {
                    SingleCardStudyView(
                        card: card,
                        topic: topic,
                        revealed: $revealed,
                        onRate: { rating in rate(card, as: rating) }
                    )
                } else {
                    NoDueTopicView(
                        chooseAnotherTopic: { path.removeAll() },
                        showGallery: { path.append(.gallery) }
                    )
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .background(AppBackground(topic: topic))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    path.append(.gallery)
                } label: {
                    Image(systemName: "rectangle.grid.2x2")
                }
                .accessibilityLabel("Gallery")
            }
        }
        .onAppear {
            store.rememberTopic(topicId)
            store.prepareDailySession(topicId: topicId)
        }
        .onReceive(NotificationCenter.default.publisher(for: Notification.Name.NSCalendarDayChanged)) { _ in
            revealed = false
            store.prepareDailySession(topicId: topicId)
        }
    }

    private func rate(_ card: Flashcard, as rating: ReviewRating) {
        withAnimation(.snappy) {
            _ = store.scheduleReview(card: card, rating: rating)
            switch rating {
            case .again, .hard:
                _ = store.deferDailyCard(topicId: topicId, cardId: card.id)
            case .good, .easy:
                _ = store.completeDailyCard(topicId: topicId, cardId: card.id)
            }
            revealed = false
        }
    }
}

struct NoDueTopicView: View {
    let chooseAnotherTopic: () -> Void
    let showGallery: () -> Void

    var body: some View {
        VStack(spacing: 18) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 44, weight: .bold))
                .foregroundStyle(.green)

            Text("今天没有待复习卡片")
                .font(.title2.weight(.heavy))

            Text("可以学习其他话题，或浏览 Gallery 中的全部卡片。")
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)

            Button("学习其他话题", action: chooseAnotherTopic)
                .buttonStyle(PrimaryGlassButtonStyle(tint: .green))

            Button("查看 Gallery", action: showGallery)
                .buttonStyle(SecondaryGlassButtonStyle())
        }
        .frame(maxWidth: .infinity, minHeight: 360)
        .padding(24)
        .background {
            TopicSoftCardBackground(topic: nil, cornerRadius: 24)
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
            .accessibilityLabel(
                revealed ? "\(card.backEnglish). Hide answer" : "\(card.frontChinese). Reveal answer"
            )

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

struct SingleCardStudyView: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    let card: Flashcard
    let topic: Topic?
    @Binding var revealed: Bool
    let onRate: (ReviewRating) -> Void

    var body: some View {
        VStack(spacing: 14) {
            Button {
                withAnimation(reduceMotion ? nil : .spring(response: 0.48, dampingFraction: 0.84)) {
                    revealed.toggle()
                }
            } label: {
                FlippableStudyCard(
                    card: card,
                    topic: topic,
                    revealed: revealed,
                    minHeight: 390,
                    frontSubtitle: "Tap to reveal"
                )
            }
            .buttonStyle(.plain)
            .accessibilityLabel(
                revealed ? "\(card.backEnglish). Hide answer" : "\(card.frontChinese). Reveal answer"
            )

            if revealed {
                HStack(spacing: 8) {
                    ForEach(ReviewRating.allCases) { rating in
                        Button(rating.label) {
                            onRate(rating)
                        }
                        .buttonStyle(RatingButtonStyle(rating: rating))
                    }
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
    }
}

struct FlippableStudyCard: View {
    let card: Flashcard
    let topic: Topic?
    let revealed: Bool
    var minHeight: CGFloat = 220
    var frontSubtitle: String? = nil

    private var tint: Color { topic?.tint ?? .green }

    var body: some View {
        ZStack {
            StudyCardFace(
                title: card.highlightedFront(tint: tint),
                subtitle: frontSubtitle,
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

struct GalleryView: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @ObservedObject var store: LearningStore
    @Binding var path: [AppRoute]
    let initialTopicId: String?

    @State private var selectedTopicId: String?
    @State private var selectedStatus: GalleryMemoryStatus?
    @State private var isSearching = false
    @State private var isTopicPickerPresented = false
    @State private var searchQuery = ""
    @FocusState private var searchFieldFocused: Bool

    init(
        store: LearningStore,
        path: Binding<[AppRoute]>,
        initialTopicId: String? = nil
    ) {
        self.store = store
        self._path = path
        self.initialTopicId = initialTopicId
        self._selectedTopicId = State(initialValue: initialTopicId)
    }

    private var normalizedSearchQuery: String {
        searchQuery.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private var visibleCards: [Flashcard] {
        let scopedCards = store.galleryCards(
            topicId: selectedTopicId,
            status: selectedStatus
        )
        guard !normalizedSearchQuery.isEmpty else { return scopedCards }
        return scopedCards.filter { card in
            CardSearchMatcher.matches(
                query: normalizedSearchQuery,
                frontChinese: card.frontChinese,
                backEnglish: card.backEnglish
            )
        }
    }

    private var visibleCardIds: [String] {
        visibleCards.map(\.id)
    }

    private var distribution: GalleryMemoryDistribution {
        store.galleryDistribution(topicId: selectedTopicId)
    }

    private var searchAnimation: Animation? {
        reduceMotion ? nil : .snappy(duration: 0.28)
    }

    private var searchFieldTransition: AnyTransition {
        reduceMotion ? .identity : .move(edge: .trailing).combined(with: .opacity)
    }

    private var titleTransition: AnyTransition {
        reduceMotion ? .identity : .move(edge: .leading).combined(with: .opacity)
    }

    private var cardTransition: AnyTransition {
        reduceMotion ? .identity : .opacity.combined(with: .move(edge: .top))
    }

    private var showsBackButton: Bool {
        path.last == .gallery
    }

    private var animatedSearchQuery: Binding<String> {
        Binding(
            get: { searchQuery },
            set: { newValue in
                withAnimation(searchAnimation) {
                    searchQuery = newValue
                }
            }
        )
    }

    var body: some View {
        List {
            Section {
                topicPicker
                    .listRowInsets(EdgeInsets(top: 4, leading: 16, bottom: 4, trailing: 16))
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)

                memoryFilters
                    .listRowInsets(EdgeInsets(top: 4, leading: 16, bottom: 10, trailing: 16))
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)
            }

            if visibleCards.isEmpty {
                GalleryEmptyState(
                    topicId: selectedTopicId,
                    status: selectedStatus,
                    query: normalizedSearchQuery
                )
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)
            } else {
                ForEach(visibleCards) { card in
                    Button {
                        path.append(.cardPreview(card.id))
                    } label: {
                        GalleryCardRow(
                            card: card,
                            topic: store.topic(id: card.topic),
                            status: store.galleryStatus(for: card)
                        )
                    }
                    .buttonStyle(.plain)
                    .listRowInsets(EdgeInsets(top: 0, leading: 16, bottom: 0, trailing: 16))
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)
                    .transition(cardTransition)
                }
            }
        }
        .listStyle(.plain)
        .scrollContentBackground(.hidden)
        .background(AppBackground())
        .safeAreaInset(edge: .top, spacing: 0) {
            galleryHeader
        }
        .animation(searchAnimation, value: visibleCardIds)
        .toolbar(.hidden, for: .navigationBar)
        .sheet(isPresented: $isTopicPickerPresented) {
            GalleryTopicPickerSheet(
                topics: store.topics,
                selectedTopicId: selectedTopicId,
                totalCardCount: store.metadata?.cardCount ?? store.cards.count,
                cardCount: { store.cards(for: $0).count },
                onSelect: selectTopic
            )
        }
    }

    private var galleryHeader: some View {
        HStack(alignment: .center, spacing: 12) {
            if isSearching {
                HStack(spacing: 8) {
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(.secondary)

                    TextField("搜索中文或英文", text: animatedSearchQuery)
                        .focused($searchFieldFocused)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .submitLabel(.search)
                        .accessibilityLabel("搜索中文或英文卡片")

                    if !searchQuery.isEmpty {
                        Button {
                            withAnimation(searchAnimation) {
                                searchQuery = ""
                            }
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundStyle(.secondary)
                                .frame(width: 44, height: 44)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("清除搜索内容")
                    }
                }
                .padding(.leading, 12)
                .frame(height: 44)
                .background(Color.primary.opacity(0.08), in: Capsule())
                .transition(searchFieldTransition)

                Button("取消", action: closeSearch)
                    .font(.body.weight(.semibold))
                    .frame(minHeight: 44)
                    .transition(searchFieldTransition)
            } else {
                if showsBackButton {
                    Button(action: leaveGallery) {
                        Image(systemName: "chevron.left")
                            .font(.title3.weight(.semibold))
                            .frame(width: 44, height: 44)
                            .background(Color.primary.opacity(0.08), in: Circle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel("返回")
                    .accessibilityHint("返回上一层")
                }

                Text("Gallery")
                    .font(.largeTitle.weight(.bold))
                    .transition(titleTransition)

                Spacer(minLength: 12)

                Button(action: openSearch) {
                    Image(systemName: "magnifyingglass")
                        .font(.title2.weight(.medium))
                        .frame(width: 44, height: 44)
                        .background(Color.primary.opacity(0.08), in: Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel("搜索")
                .accessibilityHint("在 Gallery 顶部展开搜索栏")
            }
        }
        .frame(height: 44)
        .padding(.horizontal, 16)
        .padding(.vertical, 6)
        .background(.ultraThinMaterial)
    }

    private func openSearch() {
        withAnimation(searchAnimation) {
            isSearching = true
        }
        Task { @MainActor in
            searchFieldFocused = true
        }
    }

    private func closeSearch() {
        searchFieldFocused = false
        withAnimation(searchAnimation) {
            searchQuery = ""
            isSearching = false
        }
    }

    private func leaveGallery() {
        path = GalleryNavigationRules.backPath(from: path)
    }

    private var topicPicker: some View {
        GalleryTopicPickerButton(
            topic: selectedTopicId.flatMap { store.topic(id: $0) },
            count: selectedTopicId.map { store.cards(for: $0).count }
                ?? (store.metadata?.cardCount ?? store.cards.count)
        ) {
            isTopicPickerPresented = true
        }
        .accessibilityLabel("话题筛选")
    }

    private var memoryFilters: some View {
        GalleryMemorySegmentedControl(
            distribution: distribution,
            selection: $selectedStatus
        )
        .accessibilityElement(children: .contain)
        .accessibilityLabel("记忆程度筛选")
    }

    private func selectTopic(_ topicId: String?) {
        withAnimation(searchAnimation) {
            selectedTopicId = topicId
        }
    }
}

struct GalleryTopicPickerButton: View {
    let topic: Topic?
    let count: Int
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 7) {
                Image(systemName: "square.grid.2x2.fill")
                    .foregroundStyle(topic?.tint ?? Color.primary)

                Text(topic?.title ?? "全部话题")
                    .lineLimit(1)

                Text("· \(count)")
                    .foregroundStyle(.secondary)

                Image(systemName: "chevron.up.chevron.down")
                    .font(.caption.weight(.bold))
                    .foregroundStyle(.secondary)
            }
            .font(.subheadline.weight(.semibold))
            .padding(.horizontal, 13)
            .frame(height: 40)
            .background(.thinMaterial, in: Capsule())
            .overlay {
                Capsule()
                    .strokeBorder((topic?.tint ?? Color.secondary).opacity(0.24), lineWidth: 1)
            }
            .contentShape(Capsule())
        }
        .buttonStyle(.plain)
        .frame(minHeight: 44)
        .accessibilityValue(topic?.title ?? "全部话题")
        .accessibilityHint("轻点打开全部话题")
    }
}

struct GalleryTopicPickerSheet: View {
    @Environment(\.dismiss) private var dismiss

    let topics: [Topic]
    let selectedTopicId: String?
    let totalCardCount: Int
    let cardCount: (String) -> Int
    let onSelect: (String?) -> Void

    var body: some View {
        NavigationStack {
            List {
                Button {
                    select(nil)
                } label: {
                    GalleryTopicPickerRow(
                        title: "全部话题",
                        count: totalCardCount,
                        tint: .primary,
                        isSelected: selectedTopicId == nil
                    )
                }
                .buttonStyle(.plain)

                ForEach(topics) { topic in
                    Button {
                        select(topic.id)
                    } label: {
                        GalleryTopicPickerRow(
                            title: topic.title,
                            count: cardCount(topic.id),
                            tint: topic.tint,
                            isSelected: selectedTopicId == topic.id
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
            .listStyle(.insetGrouped)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("选择话题")
                        .font(.headline)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("完成") {
                        dismiss()
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
    }

    private func select(_ topicId: String?) {
        onSelect(topicId)
        dismiss()
    }
}

struct GalleryTopicPickerRow: View {
    let title: String
    let count: Int
    let tint: Color
    let isSelected: Bool

    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(tint)
                .frame(width: 10, height: 10)
                .accessibilityHidden(true)

            Text(title)
                .font(.body.weight(isSelected ? .semibold : .regular))

            Spacer(minLength: 8)

            Text("\(count)")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            if isSelected {
                Image(systemName: "checkmark")
                    .font(.body.weight(.semibold))
                    .foregroundStyle(tint)
                    .accessibilityHidden(true)
            }
        }
        .frame(minHeight: 44)
        .contentShape(Rectangle())
        .foregroundStyle(.primary)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

struct GalleryMemorySegmentedControl: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    let distribution: GalleryMemoryDistribution
    @Binding var selection: GalleryMemoryStatus?

    var body: some View {
        ViewThatFits(in: .horizontal) {
            HStack(spacing: 8) {
                ForEach(GalleryMemoryStatus.allCases) { status in
                    filterCapsule(for: status)
                }
            }

            VStack(alignment: .leading, spacing: 6) {
                ForEach(GalleryMemoryStatus.allCases) { status in
                    filterCapsule(for: status)
                }
            }
        }
    }

    private func filterCapsule(for status: GalleryMemoryStatus) -> some View {
        let isSelected = selection == status

        return Button {
            withAnimation(reduceMotion ? nil : .snappy(duration: 0.24)) {
                selection = isSelected ? nil : status
            }
        } label: {
            HStack(spacing: 5) {
                Image(systemName: status.iconName)
                    .foregroundStyle(status.primaryColor)

                Text(status.label)

                Text("\(distribution.percentage(for: status))%")
                    .foregroundStyle(isSelected ? status.textColor.opacity(0.88) : Color.secondary)
            }
            .font(.subheadline.weight(.semibold))
            .foregroundStyle(isSelected ? status.textColor : Color.primary)
            .padding(.horizontal, 11)
            .frame(height: 38)
            .background(status.capsuleBackground(isSelected: isSelected), in: Capsule())
            .overlay {
                Capsule()
                    .strokeBorder(
                        status.primaryColor.opacity(isSelected ? 0.72 : 0.22),
                        lineWidth: isSelected ? 1.5 : 1
                    )
            }
            .shadow(color: isSelected ? status.primaryColor.opacity(0.13) : .clear, radius: 4, y: 2)
            .contentShape(Capsule())
        }
        .buttonStyle(.plain)
        .frame(minHeight: 44)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
        .accessibilityLabel("\(status.label) \(distribution.percentage(for: status))%")
        .accessibilityHint(isSelected ? "再次轻点显示全部记忆程度" : "轻点筛选此记忆程度")
    }
}

struct GalleryCardRow: View {
    let card: Flashcard
    let topic: Topic?
    let status: GalleryMemoryStatus

    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            VStack(alignment: .leading, spacing: 3) {
                Text(card.frontChinese)
                    .font(.body.weight(.semibold))
                    .multilineTextAlignment(.leading)

                Text(card.backEnglish)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.leading)
            }

            Spacer(minLength: 8)

            Image(systemName: "chevron.right")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)
        }
        .frame(maxWidth: .infinity, minHeight: 44, alignment: .leading)
        .padding(.horizontal, 16)
        .padding(.vertical, 6)
        .background {
            GeometryReader { proxy in
                TopicSoftCardBackground(topic: topic, cornerRadius: 14, shadowOpacity: 0)
                    .frame(width: proxy.size.width, height: proxy.size.height)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            }
        }
        .contentShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .padding(.vertical, 5)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(card.frontChinese)，\(card.backEnglish)，\(topic?.title ?? card.topic)，\(status.label)")
        .accessibilityHint("轻点打开卡片详情")
    }
}

struct GalleryEmptyState: View {
    let topicId: String?
    let status: GalleryMemoryStatus?
    let query: String

    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: "rectangle.grid.2x2")
                .font(.system(.largeTitle, design: .rounded, weight: .semibold))
                .foregroundStyle(.secondary)
            Text("没有匹配的卡片")
                .font(.headline)
            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity, minHeight: 220)
        .padding(.vertical, 24)
    }

    private var message: String {
        if !query.isEmpty {
            return "没有找到包含“\(query)”的中文或英文卡片。"
        }
        if let status {
            return "当前没有“\(status.label)”状态的卡片。"
        }
        if let topicId {
            return "\(topicId) 暂时没有可展示的卡片。"
        }
        return "当前内容库暂时为空。"
    }
}

private extension GalleryMemoryStatus {
    var iconName: String {
        switch self {
        case .new: "circle"
        case .weak: "exclamationmark.circle.fill"
        case .known: "checkmark.circle.fill"
        }
    }

    var primaryColor: Color {
        switch self {
        case .new: Color(red: 0.18, green: 0.43, blue: 0.92)
        case .weak: Color(red: 0.94, green: 0.48, blue: 0.12)
        case .known: Color(red: 0.05, green: 0.59, blue: 0.34)
        }
    }

    var accentColor: Color {
        switch self {
        case .new: Color(red: 0.18, green: 0.74, blue: 0.86)
        case .weak: Color(red: 0.97, green: 0.38, blue: 0.33)
        case .known: Color(red: 0.16, green: 0.76, blue: 0.61)
        }
    }

    var textColor: Color {
        switch self {
        case .new: Color(red: 0.04, green: 0.22, blue: 0.55)
        case .weak: Color(red: 0.43, green: 0.18, blue: 0.01)
        case .known: Color(red: 0.01, green: 0.31, blue: 0.17)
        }
    }

    func capsuleBackground(isSelected: Bool) -> LinearGradient {
        LinearGradient(
            colors: [
                primaryColor.opacity(isSelected ? 0.30 : 0.10),
                accentColor.opacity(isSelected ? 0.22 : 0.07)
            ],
            startPoint: .leading,
            endPoint: .trailing
        )
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
            }

            Section("学习状态") {
                Button("准备学习状态导出") {
                    prepareExport()
                }
                if let exportURL {
                    ShareLink(item: exportURL) {
                        Label("分享学习状态 JSON", systemImage: "square.and.arrow.up")
                    }
                }
                Button("导入学习状态 JSON") {
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
                    importMessage = "学习状态已导入。"
                } catch {
                    importMessage = "导入失败：\(error.localizedDescription)"
                }
            case .failure(let error):
                importMessage = "导入失败：\(error.localizedDescription)"
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
            importMessage = "导出失败：\(error.localizedDescription)"
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
    let shadowOpacity: Double

    init(topic: Topic?, cornerRadius: CGFloat, shadowOpacity: Double = 0.055) {
        self.topic = topic
        self.cornerRadius = cornerRadius
        self.shadowOpacity = shadowOpacity
    }

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
        .shadow(color: .black.opacity(shadowOpacity), radius: 18, x: 0, y: 12)
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
