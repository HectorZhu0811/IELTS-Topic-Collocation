package com.hector.topiccollocation.data

import android.content.Context
import com.hector.topiccollocation.model.Flashcard
import com.hector.topiccollocation.model.SynonymGroup
import com.hector.topiccollocation.model.SynonymOption
import com.hector.topiccollocation.model.TopicMeta
import org.json.JSONArray
import org.json.JSONObject

interface StudyDataRepository {
    suspend fun topics(): List<TopicMeta>
    suspend fun cards(): List<Flashcard>
}

class AndroidAssetStudyDataRepository(
    context: Context
) : StudyDataRepository {
    private val assets = context.applicationContext.assets

    override suspend fun topics(): List<TopicMeta> =
        JSONArray(readAsset(DATA_TOPICS_PATH)).toTopicMetaList()

    override suspend fun cards(): List<Flashcard> =
        JSONArray(readAsset(DATA_CARDS_PATH)).toFlashcardList()

    private fun readAsset(path: String): String =
        assets.open(path).bufferedReader(Charsets.UTF_8).use { it.readText() }

    private fun JSONArray.toTopicMetaList(): List<TopicMeta> = buildList {
        for (index in 0 until length()) {
            val topic = getJSONObject(index)
            add(
                TopicMeta(
                    id = topic.optString("id"),
                    zh = topic.optString("zh"),
                    color = topic.optString("color"),
                    accent = topic.optString("accent")
                )
            )
        }
    }

    private fun JSONArray.toFlashcardList(): List<Flashcard> = buildList {
        for (index in 0 until length()) {
            add(getJSONObject(index).toFlashcard())
        }
    }

    private fun JSONObject.toFlashcard(): Flashcard = Flashcard(
        topic = optString("topic"),
        baseChinese = optString("baseChinese"),
        baseEnglish = optString("baseEnglish"),
        type = optString("type"),
        frontChinese = optString("frontChinese"),
        backEnglish = optString("backEnglish"),
        highlightChinese = optString("highlightChinese"),
        highlightEnglish = optString("highlightEnglish"),
        synonymNetworks = optJSONArray("synonymNetworks").toSynonymGroups()
    )

    private fun JSONArray?.toSynonymGroups(): List<SynonymGroup> {
        if (this == null) return emptyList()

        return buildList {
            for (index in 0 until length()) {
                val group = getJSONObject(index)
                add(
                    SynonymGroup(
                        core = group.optString("core"),
                        coreExpression = group.optString("coreExpression"),
                        role = group.optString("role"),
                        options = group.optJSONArray("options").toSynonymOptions()
                    )
                )
            }
        }
    }

    private fun JSONArray?.toSynonymOptions(): List<SynonymOption> {
        if (this == null) return emptyList()

        return buildList {
            for (index in 0 until length()) {
                val option = getJSONObject(index)
                add(
                    SynonymOption(
                        term = option.optString("term"),
                        zh = option.optString("zh"),
                        tone = option.optString("tone"),
                        stance = option.optString("stance"),
                        phrase = option.optString("phrase"),
                        microContext = option.optString("microContext"),
                        example = option.optString("example"),
                        reviewNote = option.optString("reviewNote"),
                        reviewPassed = option.optBoolean("reviewPassed", false),
                        reviewIssues = option.optJSONArray("reviewIssues").toStringList()
                    )
                )
            }
        }
    }

    private fun JSONArray?.toStringList(): List<String> {
        if (this == null) return emptyList()

        return buildList {
            for (index in 0 until length()) {
                add(optString(index))
            }
        }
    }

    private companion object {
        const val DATA_TOPICS_PATH = "data/topics.json"
        const val DATA_CARDS_PATH = "data/cards.json"
    }
}
