package com.hector.topiccollocation.model

data class TopicMeta(
    val id: String,
    val zh: String,
    val color: String,
    val accent: String
)

data class Flashcard(
    val topic: String,
    val baseChinese: String,
    val baseEnglish: String,
    val type: String,
    val frontChinese: String,
    val backEnglish: String,
    val highlightChinese: String,
    val highlightEnglish: String,
    val synonymNetworks: List<SynonymGroup> = emptyList()
)

data class SynonymGroup(
    val core: String,
    val coreExpression: String,
    val role: String,
    val options: List<SynonymOption> = emptyList()
)

data class SynonymOption(
    val term: String,
    val zh: String,
    val tone: String,
    val stance: String,
    val phrase: String,
    val microContext: String,
    val example: String,
    val reviewNote: String,
    val reviewPassed: Boolean,
    val reviewIssues: List<String> = emptyList()
)

data class ReviewRecord(
    val version: Int = 2,
    val id: String,
    val status: String,
    val lastRating: String,
    val reviewCount: Int,
    val wrongCount: Int,
    val lapseCount: Int,
    val ease: Double,
    val intervalDays: Int,
    val lastReviewedAt: Long,
    val nextReviewAt: Long,
    val createdAt: Long,
    val updatedAt: Long
)
