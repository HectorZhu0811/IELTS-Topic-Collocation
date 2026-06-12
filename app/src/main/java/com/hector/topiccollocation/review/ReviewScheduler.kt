package com.hector.topiccollocation.review

import com.hector.topiccollocation.model.ReviewRecord
import kotlin.math.max
import kotlin.math.roundToInt

enum class ReviewRating(val storageValue: String) {
    AGAIN("again"),
    HARD("hard"),
    GOOD("good"),
    EASY("easy")
}

object ReviewScheduler {
    private const val MEMORY_VERSION = 2
    private const val DAY_MS = 24L * 60L * 60L * 1000L
    private const val MIN_EASE = 1.3
    private const val DEFAULT_EASE = 2.5

    fun schedule(
        id: String,
        previous: ReviewRecord?,
        rating: ReviewRating,
        now: Long
    ): ReviewRecord {
        val source = previous ?: newRecord(id, now)
        var ease = max(MIN_EASE, source.ease)
        var intervalDays = max(0, source.intervalDays)
        var wrongCount = source.wrongCount
        var lapseCount = source.lapseCount
        val status: String

        when (rating) {
            ReviewRating.AGAIN -> {
                ease = max(MIN_EASE, ease - 0.2)
                intervalDays = 0
                wrongCount += 1
                if (source.reviewCount > 0) lapseCount += 1
                status = "weak"
            }

            ReviewRating.HARD -> {
                ease = max(MIN_EASE, ease - 0.15)
                intervalDays = if (intervalDays <= 0) {
                    1
                } else {
                    max(1, (intervalDays * 1.2).roundToInt())
                }
                status = "weak"
            }

            ReviewRating.GOOD -> {
                intervalDays = if (intervalDays <= 0) {
                    1
                } else {
                    max(1, (intervalDays * ease).roundToInt())
                }
                status = "known"
            }

            ReviewRating.EASY -> {
                ease += 0.15
                intervalDays = if (intervalDays <= 0) {
                    4
                } else {
                    max(4, (intervalDays * ease * 1.3).roundToInt())
                }
                status = "known"
            }
        }

        return source.copy(
            version = MEMORY_VERSION,
            status = status,
            lastRating = rating.storageValue,
            reviewCount = source.reviewCount + 1,
            wrongCount = wrongCount,
            lapseCount = lapseCount,
            ease = ease,
            intervalDays = intervalDays,
            lastReviewedAt = now,
            nextReviewAt = if (rating == ReviewRating.AGAIN) now else addDays(now, intervalDays),
            updatedAt = now
        )
    }

    fun isDue(record: ReviewRecord, now: Long): Boolean = record.nextReviewAt <= now

    fun todayStart(value: Long): Long = value - (value % DAY_MS)

    private fun addDays(value: Long, days: Int): Long = todayStart(value) + max(0, days) * DAY_MS

    private fun newRecord(id: String, now: Long): ReviewRecord = ReviewRecord(
        version = MEMORY_VERSION,
        id = id,
        status = "new",
        lastRating = "",
        reviewCount = 0,
        wrongCount = 0,
        lapseCount = 0,
        ease = DEFAULT_EASE,
        intervalDays = 0,
        lastReviewedAt = 0L,
        nextReviewAt = now,
        createdAt = now,
        updatedAt = now
    )
}
