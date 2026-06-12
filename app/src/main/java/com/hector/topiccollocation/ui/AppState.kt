package com.hector.topiccollocation.ui

import android.content.ContentResolver
import android.content.Context
import android.net.Uri
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import com.hector.topiccollocation.data.AndroidAssetStudyDataRepository
import com.hector.topiccollocation.data.MemoryJson
import com.hector.topiccollocation.data.ReviewMemoryRepository
import com.hector.topiccollocation.data.SharedPreferencesReviewMemoryRepository
import com.hector.topiccollocation.data.StudyDataRepository
import com.hector.topiccollocation.model.Flashcard
import com.hector.topiccollocation.model.ReviewRecord
import com.hector.topiccollocation.model.TopicMeta
import com.hector.topiccollocation.review.ReviewRating
import com.hector.topiccollocation.review.ReviewScheduler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

enum class StudyFilter(val label: String) {
    All("All"),
    Due("Due"),
    Weak("Weak"),
    Banked("Banked")
}

data class TopicStudySummary(
    val topic: TopicMeta,
    val totalCount: Int,
    val dueCount: Int,
    val weakCount: Int,
    val bankedCount: Int
)

data class ZenReviewRoute(
    val title: String,
    val cards: List<Flashcard>,
    val totalCount: Int
)

data class ReviewLogEntry(
    val card: Flashcard?,
    val record: ReviewRecord
)

@Composable
fun rememberTopicCollocationAppState(
    context: Context,
    initialDestination: MainDestination = MainDestination.Today
): TopicCollocationAppState {
    val studyDataRepository = remember(context) {
        AndroidAssetStudyDataRepository(context)
    }
    val reviewMemoryRepository = remember(context) {
        SharedPreferencesReviewMemoryRepository(context)
    }
    val selectedDestinationState = rememberSaveable {
        mutableStateOf(initialDestination)
    }
    val appState = remember(studyDataRepository, reviewMemoryRepository) {
        TopicCollocationAppState(
            selectedDestinationState = selectedDestinationState,
            studyDataRepository = studyDataRepository,
            reviewMemoryRepository = reviewMemoryRepository
        )
    }

    LaunchedEffect(appState) {
        appState.load()
    }

    return appState
}

class TopicCollocationAppState(
    private val selectedDestinationState: MutableState<MainDestination>,
    private val studyDataRepository: StudyDataRepository,
    private val reviewMemoryRepository: ReviewMemoryRepository
) {
    val selectedDestination: MainDestination
        get() = selectedDestinationState.value
    var topics by mutableStateOf<List<TopicMeta>>(emptyList())
        private set
    var cards by mutableStateOf<List<Flashcard>>(emptyList())
        private set
    var records by mutableStateOf<Map<String, ReviewRecord>>(emptyMap())
        private set
    var isLoading by mutableStateOf(true)
        private set
    var loadError by mutableStateOf<String?>(null)
        private set
    var detailTopicId by mutableStateOf<String?>(null)
        private set
    var detailFilter by mutableStateOf(StudyFilter.All)
        private set
    var zenRoute by mutableStateOf<ZenReviewRoute?>(null)
        private set
    var dailyTarget by mutableStateOf(20)
        private set
    var randomizeCards by mutableStateOf(false)
        private set
    var showSynonymSheetByDefault by mutableStateOf(false)
        private set
    var themeLabel by mutableStateOf(THEME_WARM)
        private set
    var chineseFontSizeSp by mutableStateOf(28)
        private set
    var englishFontSizeSp by mutableStateOf(28)
        private set

    val isMainTabVisible: Boolean
        get() = detailTopicId == null && zenRoute == null

    suspend fun load() {
        isLoading = true
        loadError = null
        runCatching {
            val loadedTopics = studyDataRepository.topics()
            val loadedCards = studyDataRepository.cards()
            topics = loadedTopics
            cards = loadedCards
            records = reviewMemoryRepository.allRecords()
        }.onFailure { throwable ->
            loadError = throwable.message ?: "Unable to load study data."
        }
        isLoading = false
    }

    fun select(destination: MainDestination) {
        selectedDestinationState.value = destination
        detailTopicId = null
        zenRoute = null
    }

    fun openTopic(topicId: String, filter: StudyFilter = StudyFilter.All) {
        detailTopicId = topicId
        detailFilter = filter
        zenRoute = null
    }

    fun closeTopic() {
        detailTopicId = null
        detailFilter = StudyFilter.All
    }

    fun setDetailFilter(filter: StudyFilter) {
        detailFilter = filter
    }

    fun startZen(title: String, deck: List<Flashcard>) {
        val preparedDeck = if (randomizeCards) deck.shuffled() else deck
        zenRoute = ZenReviewRoute(
            title = title,
            cards = preparedDeck,
            totalCount = preparedDeck.size
        )
    }

    fun closeZen() {
        zenRoute = null
    }

    fun rateCurrentCard(rating: ReviewRating, now: Long = System.currentTimeMillis()) {
        val route = zenRoute ?: return
        val current = route.cards.firstOrNull() ?: return
        val scheduled = ReviewScheduler.schedule(
            id = current.id,
            previous = records[current.id],
            rating = rating,
            now = now
        )
        reviewMemoryRepository.save(scheduled)
        records = records + (scheduled.id to scheduled)
        zenRoute = route.copy(cards = route.cards.drop(1))
    }

    fun dueCards(now: Long = System.currentTimeMillis()): List<Flashcard> =
        cards.filter { it.matchesFilter(StudyFilter.Due, now) }

    fun dueReviewCards(now: Long = System.currentTimeMillis()): List<Flashcard> {
        val dueCards = dueCards(now)
        val orderedCards = if (randomizeCards) dueCards.shuffled() else dueCards
        return orderedCards.take(dailyTarget)
    }

    fun weakCards(now: Long = System.currentTimeMillis()): List<Flashcard> =
        cards.filter { it.matchesFilter(StudyFilter.Weak, now) }

    fun bankedCards(now: Long = System.currentTimeMillis()): List<Flashcard> =
        cards.filter { it.matchesFilter(StudyFilter.Banked, now) }

    fun reviewLogEntries(): List<ReviewLogEntry> {
        val cardsById = cards.associateBy { it.id }
        return records.values
            .filter { it.lastReviewedAt > 0L }
            .sortedByDescending { it.lastReviewedAt }
            .map { record -> ReviewLogEntry(cardsById[record.id], record) }
    }

    fun topicCards(topicId: String): List<Flashcard> =
        cards.filter { it.topic == topicId }

    fun topicFor(topicId: String): TopicMeta? =
        topics.firstOrNull { it.id == topicId }

    fun filteredCards(
        source: List<Flashcard>,
        filter: StudyFilter,
        query: String = "",
        now: Long = System.currentTimeMillis()
    ): List<Flashcard> {
        val normalizedQuery = query.trim()
        return source
            .asSequence()
            .filter { it.matchesFilter(filter, now) }
            .filter { card ->
                normalizedQuery.isBlank() ||
                    card.frontChinese.contains(normalizedQuery, ignoreCase = true) ||
                    card.backEnglish.contains(normalizedQuery, ignoreCase = true) ||
                    card.type.contains(normalizedQuery, ignoreCase = true)
            }
            .toList()
    }

    fun topicSummaries(now: Long = System.currentTimeMillis()): List<TopicStudySummary> =
        topics.map { topic ->
            val topicCards = topicCards(topic.id)
            TopicStudySummary(
                topic = topic,
                totalCount = topicCards.size,
                dueCount = topicCards.count { it.matchesFilter(StudyFilter.Due, now) },
                weakCount = topicCards.count { it.matchesFilter(StudyFilter.Weak, now) },
                bankedCount = topicCards.count { it.matchesFilter(StudyFilter.Banked, now) }
            )
        }

    fun reviewedThisWeekCount(now: Long = System.currentTimeMillis()): Int {
        val weekStart = ReviewScheduler.todayStart(now) - SIX_DAYS_MILLIS
        return reviewedCountBetween(weekStart, now)
    }

    fun reviewedTodayCount(now: Long = System.currentTimeMillis()): Int {
        val todayStart = ReviewScheduler.todayStart(now)
        return reviewedCountBetween(todayStart, now)
    }

    fun recordFor(card: Flashcard): ReviewRecord? = records[card.id]

    fun isDue(card: Flashcard, now: Long = System.currentTimeMillis()): Boolean =
        records[card.id]?.let { ReviewScheduler.isDue(it, now) } ?: true

    fun isWeak(card: Flashcard): Boolean {
        val record = records[card.id] ?: return false
        return record.isCurrentlyWeak()
    }

    fun isBanked(card: Flashcard): Boolean =
        records[card.id]?.status == STATUS_BANKED

    fun setDailyTarget(value: Int) {
        dailyTarget = value.coerceIn(5, 100)
    }

    fun setRandomizeCards(value: Boolean) {
        randomizeCards = value
    }

    fun setShowSynonymSheetByDefault(value: Boolean) {
        showSynonymSheetByDefault = value
    }

    fun cycleTheme() {
        themeLabel = when (themeLabel) {
            THEME_WARM -> THEME_PAPER
            THEME_PAPER -> THEME_COOL
            else -> THEME_WARM
        }
    }

    fun setChineseFontSizeSp(value: Int) {
        chineseFontSizeSp = value.coerceIn(20, 34)
    }

    fun setEnglishFontSizeSp(value: Int) {
        englishFontSizeSp = value.coerceIn(20, 34)
    }

    suspend fun exportMemoryJson(contentResolver: ContentResolver, uri: Uri): Result<Int> =
        withContext(Dispatchers.IO) {
            runCatching {
                val currentRecords = reviewMemoryRepository.allRecords()
                val json = MemoryJson.encode(currentRecords)
                contentResolver.openOutputStream(uri)?.use { outputStream ->
                    outputStream.write(json.toByteArray(Charsets.UTF_8))
                } ?: error("Unable to open export destination.")
                currentRecords.size
            }
        }

    suspend fun importMemoryJson(contentResolver: ContentResolver, uri: Uri): Result<Int> =
        withContext(Dispatchers.IO) {
            runCatching {
                val payload = contentResolver.openInputStream(uri)?.use { inputStream ->
                    inputStream.readBytes().toString(Charsets.UTF_8)
                } ?: error("Unable to open import source.")
                val importedRecords = MemoryJson.decode(payload).getOrThrow()
                val changedCount = reviewMemoryRepository.importRecords(importedRecords)
                changedCount to reviewMemoryRepository.allRecords()
            }
        }.map { (changedCount, loadedRecords) ->
            records = loadedRecords
            changedCount
        }

    private fun Flashcard.matchesFilter(filter: StudyFilter, now: Long): Boolean =
        when (filter) {
            StudyFilter.All -> true
            StudyFilter.Due -> isDue(this, now)
            StudyFilter.Weak -> isWeak(this)
            StudyFilter.Banked -> isBanked(this)
        }

    private fun reviewedCountBetween(start: Long, now: Long): Int {
        val currentCardIds = cards.map { it.id }.toSet()
        return records.values.count { record ->
            record.id in currentCardIds && record.lastReviewedAt in start..now
        }
    }

    private fun ReviewRecord.isCurrentlyWeak(): Boolean =
        status == STATUS_WEAK ||
            lastRating == ReviewRating.AGAIN.storageValue ||
            lastRating == ReviewRating.HARD.storageValue

    private companion object {
        const val STATUS_WEAK = "weak"
        const val STATUS_BANKED = "banked"
        const val SIX_DAYS_MILLIS = 6L * 24L * 60L * 60L * 1000L
        const val THEME_WARM = "Warm"
        const val THEME_PAPER = "Paper"
        const val THEME_COOL = "Cool"
    }
}
