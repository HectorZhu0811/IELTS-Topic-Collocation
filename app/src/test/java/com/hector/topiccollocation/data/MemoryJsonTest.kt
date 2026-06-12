package com.hector.topiccollocation.data

import com.hector.topiccollocation.model.ReviewRecord
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class MemoryJsonTest {
    @Test
    fun decodesRawObjectKeyedByCardId() {
        val result = MemoryJson.decode(
            """
            {
              "card-1": {
                "version": 2,
                "id": "stale-id",
                "status": "known",
                "lastRating": "good",
                "reviewCount": 3,
                "wrongCount": 1,
                "lapseCount": 0,
                "ease": 2.4,
                "intervalDays": 5,
                "lastReviewedAt": 100,
                "nextReviewAt": 200,
                "createdAt": 50,
                "updatedAt": 150
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        val record = result.getOrThrow().getValue("card-1")
        assertEquals("card-1", record.id)
        assertEquals(3, record.reviewCount)
        assertEquals(150L, record.updatedAt)
    }

    @Test
    fun decodesWrapperWithRecordsObject() {
        val result = MemoryJson.decode(
            """
            {
              "schema": "topic-collocation-review-memory",
              "records": {
                "card-2": {
                  "version": 2,
                  "id": "card-2",
                  "status": "weak",
                  "lastRating": "hard",
                  "reviewCount": 2,
                  "wrongCount": 0,
                  "lapseCount": 1,
                  "ease": 2.1,
                  "intervalDays": 1,
                  "lastReviewedAt": 300,
                  "nextReviewAt": 400,
                  "createdAt": 250,
                  "updatedAt": 350
                }
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        assertEquals(setOf("card-2"), result.getOrThrow().keys)
        assertEquals("weak", result.getOrThrow().getValue("card-2").status)
    }

    @Test
    fun malformedJsonReturnsFailure() {
        val result = MemoryJson.decode("{not json")

        assertTrue(result.isFailure)
    }

    @Test
    fun encodeRoundTripsRawRecords() {
        val encoded = MemoryJson.encode(mapOf("card-key" to record(id = "old-id", reviewCount = 7)))

        val decoded = MemoryJson.decode(encoded)

        assertTrue(decoded.isSuccess)
        assertEquals(setOf("card-key"), decoded.getOrThrow().keys)
        assertEquals("card-key", decoded.getOrThrow().getValue("card-key").id)
        assertEquals(7, decoded.getOrThrow().getValue("card-key").reviewCount)
    }

    private fun record(
        id: String,
        reviewCount: Int
    ): ReviewRecord = ReviewRecord(
        id = id,
        status = "known",
        lastRating = "good",
        reviewCount = reviewCount,
        wrongCount = 0,
        lapseCount = 0,
        ease = 2.5,
        intervalDays = 1,
        lastReviewedAt = 100L,
        nextReviewAt = 200L,
        createdAt = 50L,
        updatedAt = 150L
    )
}
