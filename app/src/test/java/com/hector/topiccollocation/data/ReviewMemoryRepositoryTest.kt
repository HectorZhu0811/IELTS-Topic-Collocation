package com.hector.topiccollocation.data

import com.hector.topiccollocation.model.ReviewRecord
import org.junit.Assert.assertEquals
import org.junit.Test

class ReviewMemoryRepositoryTest {
    @Test
    fun olderImportDoesNotOverwriteNewerLocalRecord() {
        val current = mapOf("card-1" to record(id = "card-1", reviewCount = 3, updatedAt = 300L))
        val incoming = mapOf("card-1" to record(id = "card-1", reviewCount = 1, updatedAt = 100L))

        val merged = mergeReviewRecords(current, incoming)

        assertEquals(3, merged.getValue("card-1").reviewCount)
        assertEquals(300L, merged.getValue("card-1").updatedAt)
    }

    @Test
    fun newerImportOverwritesOlderLocalRecord() {
        val current = mapOf("card-1" to record(id = "card-1", reviewCount = 1, updatedAt = 100L))
        val incoming = mapOf("card-1" to record(id = "card-1", reviewCount = 3, updatedAt = 300L))

        val merged = mergeReviewRecords(current, incoming)

        assertEquals(3, merged.getValue("card-1").reviewCount)
        assertEquals(300L, merged.getValue("card-1").updatedAt)
    }

    @Test
    fun equalTimestampImportOverwritesLocalRecord() {
        val current = mapOf("card-1" to record(id = "card-1", reviewCount = 1, updatedAt = 300L))
        val incoming = mapOf("card-1" to record(id = "card-1", reviewCount = 3, updatedAt = 300L))

        val merged = mergeReviewRecords(current, incoming)

        assertEquals(3, merged.getValue("card-1").reviewCount)
        assertEquals(300L, merged.getValue("card-1").updatedAt)
    }

    @Test
    fun unrelatedCurrentRecordsArePreserved() {
        val current = mapOf(
            "card-1" to record(id = "card-1", reviewCount = 1),
            "card-2" to record(id = "card-2", reviewCount = 2)
        )
        val incoming = mapOf("card-3" to record(id = "card-3", reviewCount = 3))

        val merged = mergeReviewRecords(current, incoming)

        assertEquals(setOf("card-1", "card-2", "card-3"), merged.keys)
        assertEquals(1, merged.getValue("card-1").reviewCount)
        assertEquals(2, merged.getValue("card-2").reviewCount)
        assertEquals(3, merged.getValue("card-3").reviewCount)
    }

    @Test
    fun incomingRecordIdIsNormalizedToMapKey() {
        val incoming = mapOf("card-key" to record(id = "stale-id", updatedAt = 10L))

        val merged = mergeReviewRecords(emptyMap(), incoming)

        assertEquals("card-key", merged.getValue("card-key").id)
    }

    @Test
    fun malformedRecordsJsonReturnsEmptyMap() {
        val decoded = decodeReviewRecordsJson("{not json")

        assertEquals(emptyMap<String, ReviewRecord>(), decoded)
    }

    @Test
    fun malformedRecordEntriesAreSkipped() {
        val decoded = decodeReviewRecordsJson(
            """
            {
              "bad": "not an object",
              "good": {
                "version": 2,
                "id": "stale",
                "status": "known",
                "lastRating": "good",
                "reviewCount": 4,
                "wrongCount": 1,
                "lapseCount": 0,
                "ease": 2.5,
                "intervalDays": 3,
                "lastReviewedAt": 10,
                "nextReviewAt": 20,
                "createdAt": 5,
                "updatedAt": 30
              }
            }
            """.trimIndent()
        )

        assertEquals(setOf("good"), decoded.keys)
        assertEquals("good", decoded.getValue("good").id)
        assertEquals(4, decoded.getValue("good").reviewCount)
    }

    @Test
    fun recordsJsonRoundTripsAndNormalizesIds() {
        val encoded = encodeReviewRecordsJson(
            mapOf("card-key" to record(id = "stale-id", reviewCount = 5, updatedAt = 50L))
        )

        val decoded = decodeReviewRecordsJson(encoded)

        assertEquals(setOf("card-key"), decoded.keys)
        assertEquals("card-key", decoded.getValue("card-key").id)
        assertEquals(5, decoded.getValue("card-key").reviewCount)
        assertEquals(50L, decoded.getValue("card-key").updatedAt)
    }

    @Test
    fun cardIdMatchesWebPattern() {
        val id = cardId(
            topic = "Technology",
            type = "adjective",
            frontChinese = "快速的科技进步",
            backEnglish = "rapid technological advancement"
        )

        assertEquals("Technology::adjective::快速的科技进步::rapid technological advancement", id)
    }

    private fun record(
        id: String,
        reviewCount: Int = 0,
        updatedAt: Long = 0L
    ): ReviewRecord = ReviewRecord(
        id = id,
        status = "known",
        lastRating = "good",
        reviewCount = reviewCount,
        wrongCount = 0,
        lapseCount = 0,
        ease = 2.5,
        intervalDays = 1,
        lastReviewedAt = 0L,
        nextReviewAt = 0L,
        createdAt = 0L,
        updatedAt = updatedAt
    )
}
