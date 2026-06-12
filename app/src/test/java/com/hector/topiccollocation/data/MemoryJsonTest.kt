package com.hector.topiccollocation.data

import com.hector.topiccollocation.model.ReviewRecord
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
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
    fun blankPayloadReturnsFailure() {
        val result = MemoryJson.decode("   ")

        assertTrue(result.isFailure)
        assertTrue(result.exceptionOrNull()?.message.orEmpty().contains("empty", ignoreCase = true))
    }

    @Test
    fun decodesWebPayloadWithTablesReviewStateArray() {
        val result = MemoryJson.decode(
            """
            {
              "app": "IELTS-Topic-Collocation",
              "schemaId": "topic-collocation-memory-v1",
              "tables": {
                "cards": [],
                "review_state": [{
                  "cardId": "web-card-1",
                  "status": "known",
                  "lastRating": "easy",
                  "reviewCount": 6,
                  "wrongCount": 1,
                  "lapseCount": 0,
                  "ease": 2.8,
                  "intervalDays": 12,
                  "lastReviewedAt": 1000,
                  "nextReviewAt": 2000,
                  "createdAt": 500,
                  "updatedAt": 1500
                }],
                "review_log": []
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        assertEquals(setOf("web-card-1"), result.getOrThrow().keys)
        assertEquals(6, result.getOrThrow().getValue("web-card-1").reviewCount)
    }

    @Test
    fun decodesSparseWebReviewStateRowWithStatusAndTiming() {
        val result = MemoryJson.decode(
            """
            {
              "tables": {
                "review_state": [{
                  "cardId": "sparse-web-card",
                  "status": "known",
                  "nextReviewAt": "2500"
                }]
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        val record = result.getOrThrow().getValue("sparse-web-card")
        assertEquals("known", record.status)
        assertEquals(0, record.reviewCount)
        assertEquals(2.5, record.ease, 0.0)
        assertEquals(2500L, record.nextReviewAt)
    }

    @Test
    fun decodesWebPayloadWithTablesReviewStateObject() {
        val result = MemoryJson.decode(
            """
            {
              "tables": {
                "review_state": {
                  "web-card-2": {
                    "status": "weak",
                    "lastRating": "again",
                    "reviewCount": 4,
                    "wrongCount": 2,
                    "lapseCount": 1,
                    "ease": 2.0,
                    "intervalDays": 0,
                    "lastReviewedAt": 1000,
                    "nextReviewAt": 1000,
                    "createdAt": 500,
                    "updatedAt": 1500
                  }
                }
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        assertEquals(setOf("web-card-2"), result.getOrThrow().keys)
        assertEquals("weak", result.getOrThrow().getValue("web-card-2").status)
    }

    @Test
    fun decodesLegacyReviewsObject() {
        val result = MemoryJson.decode(
            """
            {
              "reviews": {
                "legacy-card": {
                  "version": 2,
                  "id": "legacy-card",
                  "status": "known",
                  "lastRating": "good",
                  "reviewCount": 3,
                  "wrongCount": 0,
                  "lapseCount": 0,
                  "ease": 2.5,
                  "intervalDays": 3,
                  "lastReviewedAt": 100,
                  "nextReviewAt": 200,
                  "createdAt": 50,
                  "updatedAt": 150
                }
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        assertEquals(setOf("legacy-card"), result.getOrThrow().keys)
    }

    @Test
    fun decodesLegacyReviewsArray() {
        val result = MemoryJson.decode(
            """
            {
              "reviews": [{
                "cardId": "legacy-array-card",
                "status": "weak",
                "nextReviewAt": 300
              }]
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        assertEquals(setOf("legacy-array-card"), result.getOrThrow().keys)
        assertEquals("weak", result.getOrThrow().getValue("legacy-array-card").status)
    }

    @Test
    fun malformedRecordObjectIsSkippedWhenValidRecordsRemain() {
        val result = MemoryJson.decode(
            """
            {
              "records": {
                "bad": {},
                "good": {
                  "status": "known",
                  "lastRating": "good",
                  "reviewCount": 1,
                  "wrongCount": 0,
                  "lapseCount": 0,
                  "ease": 2.5,
                  "intervalDays": 1,
                  "lastReviewedAt": 100,
                  "nextReviewAt": 200,
                  "createdAt": 50,
                  "updatedAt": 150
                }
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isSuccess)
        assertEquals(setOf("good"), result.getOrThrow().keys)
    }

    @Test
    fun statusOnlyRecordObjectIsRejectedAsMalformed() {
        val result = MemoryJson.decode(
            """
            {
              "records": {
                "status-only": {
                  "status": "known"
                }
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isFailure)
    }

    @Test
    fun topLevelTablesContainerIsNotImportedAsFakeRecord() {
        val result = MemoryJson.decode(
            """
            {
              "tables": {
                "cards": [],
                "review_log": []
              }
            }
            """.trimIndent()
        )

        assertTrue(result.isFailure)
        assertFalse(result.getOrNull()?.containsKey("tables") == true)
    }

    @Test
    fun emptyTopLevelReviewsContainerIsNotImportedAsFakeRecord() {
        val result = MemoryJson.decode(
            """
            {
              "reviews": {}
            }
            """.trimIndent()
        )

        assertTrue(result.isFailure)
        assertFalse(result.getOrNull()?.containsKey("reviews") == true)
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
