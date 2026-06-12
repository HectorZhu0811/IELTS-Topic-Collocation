package com.hector.topiccollocation.review

import com.hector.topiccollocation.model.ReviewRecord
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class ReviewSchedulerTest {
    private val now = 1_717_171_200_000L
    private val dayMs = 24L * 60L * 60L * 1000L

    @Test
    fun againKeepsCardDueAndMarksWeak() {
        val previous = ReviewRecord(
            id = "card-1",
            status = "known",
            lastRating = ReviewRating.GOOD.storageValue,
            reviewCount = 2,
            wrongCount = 1,
            lapseCount = 0,
            ease = 2.5,
            intervalDays = 3,
            lastReviewedAt = now - dayMs,
            nextReviewAt = now + dayMs,
            createdAt = now - (2 * dayMs),
            updatedAt = now - dayMs
        )

        val record = ReviewScheduler.schedule(
            id = "card-1",
            previous = previous,
            rating = ReviewRating.AGAIN,
            now = now
        )

        assertEquals("weak", record.status)
        assertEquals(ReviewRating.AGAIN.storageValue, record.lastRating)
        assertEquals(3, record.reviewCount)
        assertEquals(2, record.wrongCount)
        assertEquals(1, record.lapseCount)
        assertEquals(0, record.intervalDays)
        assertEquals(now, record.nextReviewAt)
        assertTrue(ReviewScheduler.isDue(record, now))
    }

    @Test
    fun goodNewCardSchedulesOneDay() {
        val record = ReviewScheduler.schedule(
            id = "card-2",
            previous = null,
            rating = ReviewRating.GOOD,
            now = now
        )

        assertEquals("known", record.status)
        assertEquals(ReviewRating.GOOD.storageValue, record.lastRating)
        assertEquals(1, record.reviewCount)
        assertEquals(1, record.intervalDays)
        assertEquals(ReviewScheduler.todayStart(now) + dayMs, record.nextReviewAt)
    }

    @Test
    fun easyIncreasesEase() {
        val previous = ReviewRecord(
            id = "card-3",
            status = "known",
            lastRating = ReviewRating.GOOD.storageValue,
            reviewCount = 1,
            wrongCount = 0,
            lapseCount = 0,
            ease = 2.5,
            intervalDays = 1,
            lastReviewedAt = now - dayMs,
            nextReviewAt = now,
            createdAt = now - dayMs,
            updatedAt = now - dayMs
        )

        val record = ReviewScheduler.schedule(
            id = "card-3",
            previous = previous,
            rating = ReviewRating.EASY,
            now = now
        )

        assertEquals("known", record.status)
        assertEquals(2.65, record.ease, 0.0001)
        assertEquals(4, record.intervalDays)
        assertEquals(ReviewScheduler.todayStart(now) + (4 * dayMs), record.nextReviewAt)
    }

    @Test
    fun hardMarksWeakAndSchedulesAtLeastOneDayWhileDecreasingEase() {
        val record = ReviewScheduler.schedule(
            id = "card-4",
            previous = null,
            rating = ReviewRating.HARD,
            now = now
        )

        assertEquals("weak", record.status)
        assertEquals(ReviewRating.HARD.storageValue, record.lastRating)
        assertEquals(1, record.intervalDays)
        assertEquals(2.35, record.ease, 0.0001)
        assertEquals(ReviewScheduler.todayStart(now) + dayMs, record.nextReviewAt)
    }

    @Test
    fun explicitIdWinsWhenPreviousRecordHasStaleId() {
        val previous = ReviewRecord(
            id = "stale-card-id",
            status = "known",
            lastRating = ReviewRating.GOOD.storageValue,
            reviewCount = 1,
            wrongCount = 0,
            lapseCount = 0,
            ease = 2.5,
            intervalDays = 1,
            lastReviewedAt = now - dayMs,
            nextReviewAt = now,
            createdAt = now - dayMs,
            updatedAt = now - dayMs
        )

        val record = ReviewScheduler.schedule(
            id = "fresh-card-id",
            previous = previous,
            rating = ReviewRating.GOOD,
            now = now
        )

        assertEquals("fresh-card-id", record.id)
    }

    @Test
    fun shanghaiEarlyMorningGoodReviewSchedulesNextLocalMidnight() {
        val zoneId = ZoneId.of("Asia/Shanghai")
        val earlyMorning = ZonedDateTime.of(2026, 6, 12, 1, 30, 0, 0, zoneId)
            .toInstant()
            .toEpochMilli()
        val expectedNextLocalMidnight = ZonedDateTime.of(2026, 6, 13, 0, 0, 0, 0, zoneId)
            .toInstant()
            .toEpochMilli()
        val sameDayUtcBoundary = Instant.parse("2026-06-12T00:00:00Z").toEpochMilli()

        val record = ReviewScheduler.schedule(
            id = "card-5",
            previous = null,
            rating = ReviewRating.GOOD,
            now = earlyMorning,
            zoneId = zoneId
        )

        assertEquals(expectedNextLocalMidnight, record.nextReviewAt)
        assertTrue(record.nextReviewAt > sameDayUtcBoundary)
    }
}
