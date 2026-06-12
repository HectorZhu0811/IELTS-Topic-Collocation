package com.hector.topiccollocation.data

import android.content.Context
import android.content.SharedPreferences
import com.hector.topiccollocation.model.ReviewRecord
import org.json.JSONObject

interface ReviewMemoryRepository {
    fun recordFor(cardId: String): ReviewRecord?
    fun save(record: ReviewRecord)
    fun allRecords(): Map<String, ReviewRecord>
    fun importRecords(records: Map<String, ReviewRecord>)
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
        if (json.isBlank()) return emptyMap()

        val root = JSONObject(json)
        return buildMap {
            val keys = root.keys()
            while (keys.hasNext()) {
                val id = keys.next()
                put(id, root.getJSONObject(id).toReviewRecord(id))
            }
        }
    }

    override fun importRecords(records: Map<String, ReviewRecord>) {
        writeRecords(mergeReviewRecords(allRecords(), records))
    }

    private fun writeRecords(records: Map<String, ReviewRecord>) {
        preferences.edit()
            .putString(REVIEW_MEMORY_KEY, records.toJsonObject().toString())
            .apply()
    }

    private fun Map<String, ReviewRecord>.toJsonObject(): JSONObject {
        val root = JSONObject()
        forEach { (id, record) ->
            root.put(id, record.copy(id = id).toJsonObject())
        }
        return root
    }

    private fun ReviewRecord.toJsonObject(): JSONObject = JSONObject()
        .put("version", version)
        .put("id", id)
        .put("status", status)
        .put("lastRating", lastRating)
        .put("reviewCount", reviewCount)
        .put("wrongCount", wrongCount)
        .put("lapseCount", lapseCount)
        .put("ease", ease)
        .put("intervalDays", intervalDays)
        .put("lastReviewedAt", lastReviewedAt)
        .put("nextReviewAt", nextReviewAt)
        .put("createdAt", createdAt)
        .put("updatedAt", updatedAt)

    private fun JSONObject.toReviewRecord(id: String): ReviewRecord = ReviewRecord(
        version = optInt("version", 2),
        id = id,
        status = optString("status"),
        lastRating = optString("lastRating"),
        reviewCount = optInt("reviewCount"),
        wrongCount = optInt("wrongCount"),
        lapseCount = optInt("lapseCount"),
        ease = optDouble("ease", 2.5),
        intervalDays = optInt("intervalDays"),
        lastReviewedAt = optLong("lastReviewedAt"),
        nextReviewAt = optLong("nextReviewAt"),
        createdAt = optLong("createdAt"),
        updatedAt = optLong("updatedAt")
    )

    private companion object {
        const val REVIEW_MEMORY_PREFS_NAME = "topic_collocation_review_memory"
        const val REVIEW_MEMORY_KEY = "topic_collocation_review_memory_v1"
    }
}

fun mergeReviewRecords(
    current: Map<String, ReviewRecord>,
    incoming: Map<String, ReviewRecord>
): Map<String, ReviewRecord> {
    return current + incoming.mapValues { (id, record) -> record.copy(id = id) }
}
