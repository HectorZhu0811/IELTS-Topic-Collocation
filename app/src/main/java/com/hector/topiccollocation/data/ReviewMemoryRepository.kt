package com.hector.topiccollocation.data

import android.content.Context
import android.content.SharedPreferences
import com.hector.topiccollocation.model.ReviewRecord
import org.json.JSONException
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
        return decodeReviewRecordsJson(json)
    }

    override fun importRecords(records: Map<String, ReviewRecord>) {
        writeRecords(mergeReviewRecords(allRecords(), records))
    }

    private fun writeRecords(records: Map<String, ReviewRecord>) {
        preferences.edit()
            .putString(REVIEW_MEMORY_KEY, encodeReviewRecordsJson(records))
            .apply()
    }
}

fun encodeReviewRecordsJson(records: Map<String, ReviewRecord>): String =
    records.toJsonObject().toString()

fun decodeReviewRecordsJson(json: String): Map<String, ReviewRecord> {
    if (json.isBlank()) return emptyMap()

    return try {
        val root = JSONObject(json)
        buildMap {
            val keys = root.keys()
            while (keys.hasNext()) {
                val id = keys.next()
                val record = root.optJSONObject(id)?.toReviewRecordOrNull(id)
                if (record != null) {
                    put(id, record)
                }
            }
        }
    } catch (_: JSONException) {
        emptyMap()
    }
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

private fun JSONObject.toReviewRecordOrNull(id: String): ReviewRecord? =
    try {
        ReviewRecord(
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
    } catch (_: JSONException) {
        null
    }

private const val REVIEW_MEMORY_PREFS_NAME = "topic_collocation_review_memory"
private const val REVIEW_MEMORY_KEY = "topic_collocation_review_memory_v1"

private fun shouldReplace(current: ReviewRecord?, incoming: ReviewRecord): Boolean {
    return current == null || incoming.updatedAt >= current.updatedAt
}

fun mergeReviewRecords(
    current: Map<String, ReviewRecord>,
    incoming: Map<String, ReviewRecord>
): Map<String, ReviewRecord> {
    val merged = current.toMutableMap()
    incoming.forEach { (id, record) ->
        val normalized = record.copy(id = id)
        if (shouldReplace(merged[id], normalized)) {
            merged[id] = normalized
        }
    }
    return merged
}
