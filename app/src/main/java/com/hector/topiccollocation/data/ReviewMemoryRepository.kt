package com.hector.topiccollocation.data

import android.content.Context
import android.content.SharedPreferences
import com.hector.topiccollocation.model.ReviewRecord

interface ReviewMemoryRepository {
    fun recordFor(cardId: String): ReviewRecord?
    fun save(record: ReviewRecord)
    fun allRecords(): Map<String, ReviewRecord>
    fun importRecords(records: Map<String, ReviewRecord>): Int
}

class SharedPreferencesReviewMemoryRepository(
    context: Context
) : ReviewMemoryRepository {
    private val preferences: SharedPreferences = context.applicationContext.getSharedPreferences(
        REVIEW_MEMORY_PREFS_NAME,
        Context.MODE_PRIVATE
    )

    override fun recordFor(cardId: String): ReviewRecord? = allRecords()[cardId]

    override fun save(record: ReviewRecord) {
        writeRecords(allRecords() + (record.id to record))
    }

    override fun allRecords(): Map<String, ReviewRecord> {
        val json = preferences.getString(REVIEW_MEMORY_KEY, null).orEmpty()
        return decodeReviewRecordsJson(json)
    }

    override fun importRecords(records: Map<String, ReviewRecord>): Int {
        val result = mergeReviewRecordsWithStats(allRecords(), records)
        writeRecords(result.records)
        return result.changedCount
    }

    private fun writeRecords(records: Map<String, ReviewRecord>) {
        preferences.edit()
            .putString(REVIEW_MEMORY_KEY, encodeReviewRecordsJson(records))
            .apply()
    }
}

fun encodeReviewRecordsJson(records: Map<String, ReviewRecord>): String =
    MemoryJson.encode(records)

fun decodeReviewRecordsJson(json: String): Map<String, ReviewRecord> {
    if (json.isBlank()) return emptyMap()

    return MemoryJson.decode(json).getOrElse { emptyMap() }
}

private const val REVIEW_MEMORY_PREFS_NAME = "topic_collocation_review_memory"
private const val REVIEW_MEMORY_KEY = "topic_collocation_review_memory_v1"

private fun shouldReplace(current: ReviewRecord?, incoming: ReviewRecord): Boolean {
    return current == null || incoming.updatedAt >= current.updatedAt
}

fun mergeReviewRecords(
    current: Map<String, ReviewRecord>,
    incoming: Map<String, ReviewRecord>
): Map<String, ReviewRecord> = mergeReviewRecordsWithStats(current, incoming).records

data class ReviewMemoryMergeResult(
    val records: Map<String, ReviewRecord>,
    val changedCount: Int
)

fun mergeReviewRecordsWithStats(
    current: Map<String, ReviewRecord>,
    incoming: Map<String, ReviewRecord>
): ReviewMemoryMergeResult {
    val merged = current.toMutableMap()
    var changedCount = 0
    incoming.forEach { (id, record) ->
        val normalized = record.copy(id = id)
        val previous = merged[id]
        if (shouldReplace(previous, normalized)) {
            merged[id] = normalized
            if (previous != normalized) {
                changedCount += 1
            }
        }
    }
    return ReviewMemoryMergeResult(records = merged, changedCount = changedCount)
}
