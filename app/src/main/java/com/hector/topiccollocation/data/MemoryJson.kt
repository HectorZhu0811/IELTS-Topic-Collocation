package com.hector.topiccollocation.data

import com.hector.topiccollocation.model.ReviewRecord
import org.json.JSONException
import org.json.JSONObject

object MemoryJson {
    fun encode(records: Map<String, ReviewRecord>): String =
        records.toJsonObject().toString()

    fun decode(payload: String): Result<Map<String, ReviewRecord>> =
        runCatching {
            if (payload.isBlank()) {
                emptyMap()
            } else {
                val root = JSONObject(payload)
                val recordRoot = root.optJSONObject("records") ?: root
                recordRoot.toReviewRecordMap()
            }
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

private fun JSONObject.toReviewRecordMap(): Map<String, ReviewRecord> =
    buildMap {
        val keys = keys()
        while (keys.hasNext()) {
            val id = keys.next()
            val record = optJSONObject(id)?.toReviewRecordOrNull(id)
            if (record != null) {
                put(id, record)
            }
        }
    }

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
