package com.hector.topiccollocation.ui

import androidx.compose.runtime.mutableStateOf
import com.hector.topiccollocation.data.ReviewMemoryRepository
import com.hector.topiccollocation.data.StudyDataRepository
import com.hector.topiccollocation.model.Flashcard
import com.hector.topiccollocation.model.ReviewRecord
import com.hector.topiccollocation.model.TopicMeta
import com.hector.topiccollocation.review.ReviewScheduler
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class TopicCollocationAppStateTest {
    private val now = 1_717_171_200_000L
    private val dayMs = 24L * 60L * 60L * 1000L

    @Test
    fun weakCardsUseCurrentWeakStatusNotHistoricalMistakes() = runBlocking {
        val knownAfterMistake = card("known-after-mistake")
        val currentWeak = card("current-weak")
        val appState = appState(
            cards = listOf(knownAfterMistake, currentWeak),
            records = mapOf(
                knownAfterMistake.id to record(
                    id = knownAfterMistake.id,
                    status = "known",
                    lastRating = "good",
                    wrongCount = 2,
                    lapseCount = 1
                ),
                currentWeak.id to record(
                    id = currentWeak.id,
                    status = "weak",
                    lastRating = "hard",
                    wrongCount = 0,
                    lapseCount = 0
                )
            )
        )

        appState.load()

        assertFalse(appState.isWeak(knownAfterMistake))
        assertTrue(appState.isWeak(currentWeak))
        assertEquals(listOf(currentWeak.id), appState.weakCards().map { it.id })
    }

    @Test
    fun reviewedCountsOnlyUseCurrentDeckCardsAndNonFutureReviews() = runBlocking {
        val todayStart = ReviewScheduler.todayStart(now)
        val currentToday = card("current-today")
        val currentThisWeek = card("current-this-week")
        val currentFuture = card("current-future")
        val unknownTodayId = "unknown-today"
        val appState = appState(
            cards = listOf(currentToday, currentThisWeek, currentFuture),
            records = mapOf(
                currentToday.id to record(currentToday.id, lastReviewedAt = todayStart),
                currentThisWeek.id to record(currentThisWeek.id, lastReviewedAt = todayStart - (2 * dayMs)),
                currentFuture.id to record(currentFuture.id, lastReviewedAt = now + 100L),
                unknownTodayId to record(unknownTodayId, lastReviewedAt = todayStart + 200L)
            )
        )

        appState.load()

        assertEquals(1, appState.reviewedTodayCount(now))
        assertEquals(2, appState.reviewedThisWeekCount(now))
    }

    @Test
    fun dueReviewCardsAreCappedByDailyTargetWithoutChangingManualReviewDecks() = runBlocking {
        val cards = (1..8).map { index -> card("card-$index") }
        val appState = appState(cards = cards, records = emptyMap())

        appState.load()
        appState.setDailyTarget(5)

        assertEquals(5, appState.dueReviewCards(now).size)

        appState.startZen("Manual", listOf(cards.first()))

        assertEquals(1, appState.zenRoute?.totalCount)
    }

    private fun appState(
        cards: List<Flashcard>,
        records: Map<String, ReviewRecord>
    ): TopicCollocationAppState = TopicCollocationAppState(
        mutableStateOf(MainDestination.Today),
        FakeStudyDataRepository(cards),
        FakeReviewMemoryRepository(records)
    )

    private fun card(id: String): Flashcard = Flashcard(
        id = id,
        topic = "Technology",
        baseChinese = "technology progress",
        baseEnglish = "technological progress",
        type = "verb",
        frontChinese = "drive technology progress $id",
        backEnglish = "drive technological progress $id",
        highlightChinese = "drive",
        highlightEnglish = "drive"
    )

    private fun record(
        id: String,
        status: String = "known",
        lastRating: String = "good",
        wrongCount: Int = 0,
        lapseCount: Int = 0,
        lastReviewedAt: Long = now
    ): ReviewRecord = ReviewRecord(
        id = id,
        status = status,
        lastRating = lastRating,
        reviewCount = 1,
        wrongCount = wrongCount,
        lapseCount = lapseCount,
        ease = 2.5,
        intervalDays = 1,
        lastReviewedAt = lastReviewedAt,
        nextReviewAt = now + dayMs,
        createdAt = now - dayMs,
        updatedAt = lastReviewedAt
    )

    private class FakeStudyDataRepository(
        private val cards: List<Flashcard>
    ) : StudyDataRepository {
        override suspend fun topics(): List<TopicMeta> = listOf(
            TopicMeta(
                id = "Technology",
                zh = "Technology",
                color = "#2563EB",
                accent = "#38BDF8"
            )
        )

        override suspend fun cards(): List<Flashcard> = cards
    }

    private class FakeReviewMemoryRepository(
        private val records: Map<String, ReviewRecord>
    ) : ReviewMemoryRepository {
        override fun recordFor(cardId: String): ReviewRecord? = records[cardId]
        override fun save(record: ReviewRecord) = Unit
        override fun allRecords(): Map<String, ReviewRecord> = records
        override fun importRecords(records: Map<String, ReviewRecord>): Int = 0
    }
}
