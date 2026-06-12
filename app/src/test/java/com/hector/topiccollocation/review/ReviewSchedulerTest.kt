package com.hector.topiccollocation.review

import com.hector.topiccollocation.model.ReviewRecord
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
}
