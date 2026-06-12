package com.hector.topiccollocation.data

import com.hector.topiccollocation.model.ReviewRecord
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

object MemoryJson {
    fun encode(records: Map<String, ReviewRecord>): String =
        records.toJsonObject().toString()

    fun decode(payload: String): Result<Map<String, ReviewRecord>> =
        if (payload.isBlank()) {
            Result.failure(IllegalArgumentException("Memory JSON is empty."))
        } else {
            runCatching {
                val root = try {
                    JSONObject(payload)
                } catch (exception: JSONException) {
                    throw IllegalArgumentException("Memory JSON is invalid.", exception)
                }
                val records = root.extractReviewRecords()
                if (records.isEmpty()) {
                    throw IllegalArgumentException("Memory JSON does not contain valid review records.")
                }
                records
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

private fun JSONObject.extractReviewRecords(): Map<String, ReviewRecord> {
    optJSONObject("records")?.toReviewRecordMap()?.let { records ->
        if (records.isNotEmpty()) return records
    }

    optJSONObject("tables")?.let { tables ->
        (tables.opt("review_state") ?: tables.opt("reviewState"))?.toReviewRecordMap()?.let { records ->
            if (records.isNotEmpty()) return records
        }
    }

    opt("review_state")?.toReviewRecordMap()?.let { records ->
        if (records.isNotEmpty()) return records
    }

    opt("reviewState")?.toReviewRecordMap()?.let { records ->
        if (records.isNotEmpty()) return records
    }

    opt("reviews").toReviewRecordMap()?.let { records ->
        if (records.isNotEmpty()) return records
    }

    return toReviewRecordMap(skipContainerKeys = true)
}

private fun Any?.toReviewRecordMap(): Map<String, ReviewRecord>? =
    when (this) {
        is JSONObject -> toReviewRecordMap()
        is JSONArray -> toReviewRecordMap()
        else -> null
    }

private fun JSONObject.toReviewRecordMap(skipContainerKeys: Boolean = false): Map<String, ReviewRecord> =
    buildMap {
        val keys = keys()
        while (keys.hasNext()) {
            val id = keys.next()
            if (skipContainerKeys && id in TOP_LEVEL_CONTAINER_KEYS) continue
            val record = optJSONObject(id)?.toReviewRecordOrNull(id)
            if (record != null) {
                put(record.id, record)
            }
        }
    }

private fun JSONArray.toReviewRecordMap(): Map<String, ReviewRecord> =
    buildMap {
        for (index in 0 until length()) {
            val row = optJSONObject(index) ?: continue
            val id = row.optString("cardId").ifBlank { row.optString("id") }
            val record = row.toReviewRecordOrNull(id)
            if (record != null) {
                put(record.id, record)
            }
        }
    }

private fun JSONObject.toReviewRecordOrNull(id: String): ReviewRecord? =
    try {
        val normalizedId = id.trim()
        if (normalizedId.isBlank()) return null
        if (!hasReviewRecordShape()) return null
        val lastReviewedAt = optionalLong("lastReviewedAt", 0L) ?: return null
        val nextReviewAt = optionalLong("nextReviewAt", 0L) ?: return null
        val createdAt = optionalLong("createdAt", 0L) ?: return null
        val updatedAt = optionalLong(
            field = "updatedAt",
            defaultValue = maxOf(lastReviewedAt, nextReviewAt, createdAt)
        ) ?: return null
        ReviewRecord(
            version = optionalInt("version", 2) ?: return null,
            id = normalizedId,
            status = requiredString("status") ?: return null,
            lastRating = optionalString("lastRating", "") ?: return null,
            reviewCount = optionalInt("reviewCount", 0) ?: return null,
            wrongCount = optionalInt("wrongCount", 0) ?: return null,
            lapseCount = optionalInt("lapseCount", 0) ?: return null,
            ease = optionalDouble("ease", 2.5) ?: return null,
            intervalDays = optionalInt("intervalDays", 0) ?: return null,
            lastReviewedAt = lastReviewedAt,
            nextReviewAt = nextReviewAt,
            createdAt = createdAt,
            updatedAt = updatedAt
        )
    } catch (_: JSONException) {
        null
    }

private fun JSONObject.hasReviewRecordShape(): Boolean =
    requiredString("status") != null &&
        REVIEW_SIGNAL_FIELDS.any { field -> has(field) }

private fun JSONObject.requiredString(field: String): String? =
    optionalString(field)?.takeIf { it.isNotBlank() }

private fun JSONObject.optionalString(field: String, defaultValue: String? = null): String? {
    if (!has(field)) return defaultValue
    return when (val value = opt(field)) {
        is String -> value
        else -> null
    }
}

private fun JSONObject.optionalInt(field: String, defaultValue: Int? = null): Int? {
    if (!has(field)) return defaultValue
    return when (val value = opt(field)) {
        is Number -> value.toInt()
        is String -> value.toIntOrNull()
        else -> null
    }
}

private fun JSONObject.optionalLong(field: String, defaultValue: Long? = null): Long? {
    if (!has(field)) return defaultValue
    return when (val value = opt(field)) {
        is Number -> value.toLong()
        is String -> value.toLongOrNull()
        else -> null
    }
}

private fun JSONObject.optionalDouble(field: String, defaultValue: Double? = null): Double? {
    if (!has(field)) return defaultValue
    return when (val value = opt(field)) {
        is Number -> value.toDouble()
        is String -> value.toDoubleOrNull()
        else -> null
    }
}

private val REVIEW_SIGNAL_FIELDS = setOf(
    "lastRating",
    "reviewCount",
    "wrongCount",
    "lapseCount",
    "ease",
    "intervalDays",
    "lastReviewedAt",
    "nextReviewAt",
    "createdAt",
    "updatedAt"
)

private val TOP_LEVEL_CONTAINER_KEYS = setOf(
    "records",
    "tables",
    "reviews",
    "review_state",
    "reviewState"
)
