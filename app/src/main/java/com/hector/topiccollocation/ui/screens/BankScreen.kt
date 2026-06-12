package com.hector.topiccollocation.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.hector.topiccollocation.model.Flashcard
import com.hector.topiccollocation.model.ReviewRecord
import com.hector.topiccollocation.ui.ReviewLogEntry
import com.hector.topiccollocation.ui.TopicCollocationAppState
import com.hector.topiccollocation.ui.components.CompactFlashcardRow
import com.hector.topiccollocation.ui.components.MetricTile
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BankScreen(
    appState: TopicCollocationAppState,
    modifier: Modifier = Modifier
) {
    val dueCards = appState.dueCards()
    val weakCards = appState.weakCards()
    val dueWeakCards = weakCards.filter { appState.isDue(it) }
    val focusCards = (dueWeakCards + weakCards + dueCards)
        .distinctBy { it.id }
        .sortedWith(compareBy<Flashcard> { it.topic }.thenBy { it.backEnglish })
    val bankedCards = appState.bankedCards()
        .sortedWith(compareBy<Flashcard> { it.topic }.thenBy { it.backEnglish })
    val reviewLogEntries = appState.reviewLogEntries()
    var selectedTabName by rememberSaveable { mutableStateOf(BankTab.Weak.name) }
    val selectedTab = BankTab.valueOf(selectedTabName)

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(title = { Text(text = "Bank") })
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text(
                        text = "Memory bank",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text(
                        text = "${weakCards.size} weak  |  ${bankedCards.size} banked  |  ${reviewLogEntries.size} reviewed",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        MetricTile("Weak", weakCards.size.toString(), Modifier.weight(1f))
                        MetricTile("Due", dueCards.size.toString(), Modifier.weight(1f))
                    }
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        MetricTile("Reviewed today", appState.reviewedTodayCount().toString(), Modifier.weight(1f))
                        MetricTile("Reviewed week", appState.reviewedThisWeekCount().toString(), Modifier.weight(1f))
                    }
                }
            }

            if (dueWeakCards.isNotEmpty() || dueCards.isNotEmpty()) {
                item {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        if (dueWeakCards.isNotEmpty()) {
                            Button(
                                onClick = { appState.startZen("Due weak review", dueWeakCards) },
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(text = "Review due weak")
                            }
                        }
                        if (dueCards.isNotEmpty()) {
                            OutlinedButton(
                                onClick = { appState.startZen("All due review", dueCards) },
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(text = "Review all due")
                            }
                        }
                    }
                }
            }

            item {
                TabRow(selectedTabIndex = selectedTab.ordinal) {
                    BankTab.entries.forEach { tab ->
                        Tab(
                            selected = selectedTab == tab,
                            onClick = { selectedTabName = tab.name },
                            text = { Text(text = tab.label, maxLines = 1) }
                        )
                    }
                }
            }

            when (selectedTab) {
                BankTab.Weak -> bankCardItems(
                    cards = focusCards,
                    emptyText = "No weak or due cards right now.",
                    appState = appState
                )

                BankTab.Banked -> bankCardItems(
                    cards = bankedCards,
                    emptyText = "No banked cards yet.",
                    appState = appState
                )

                BankTab.ReviewLog -> reviewLogItems(
                    entries = reviewLogEntries,
                    appState = appState
                )
            }
        }
    }
}

private enum class BankTab(val label: String) {
    Weak("Weak"),
    Banked("Banked"),
    ReviewLog("Review log")
}

private fun androidx.compose.foundation.lazy.LazyListScope.bankCardItems(
    cards: List<Flashcard>,
    emptyText: String,
    appState: TopicCollocationAppState
) {
    if (cards.isEmpty()) {
        item {
            Text(
                text = emptyText,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    } else {
        cards.groupBy { it.topic }.forEach { (topic, topicCards) ->
            item(key = "topic-$topic") {
                Text(
                    text = "$topic  |  ${topicCards.size} cards",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
            }
            items(topicCards, key = { it.id }) { card ->
                CompactFlashcardRow(
                    card = card,
                    record = appState.recordFor(card),
                    isDue = appState.isDue(card),
                    isWeak = appState.isWeak(card),
                    isBanked = appState.isBanked(card),
                    onClick = { appState.startZen(card.backEnglish, listOf(card)) }
                )
            }
        }
    }
}

private fun androidx.compose.foundation.lazy.LazyListScope.reviewLogItems(
    entries: List<ReviewLogEntry>,
    appState: TopicCollocationAppState
) {
    if (entries.isEmpty()) {
        item {
            Text(
                text = "No reviewed cards yet.",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    } else {
        items(entries.take(50), key = { it.record.id }) { entry ->
            ReviewLogRow(
                entry = entry,
                onClick = entry.card?.let { card ->
                    { appState.startZen(card.backEnglish, listOf(card)) }
                }
            )
        }
    }
}

@Composable
private fun ReviewLogRow(
    entry: ReviewLogEntry,
    onClick: (() -> Unit)?
) {
    val record = entry.record
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier),
        shape = MaterialTheme.shapes.medium,
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 1.dp
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Text(
                text = entry.card?.frontChinese ?: record.id,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Medium,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = entry.card?.backEnglish ?: "Imported record without a matching native card",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = reviewLogSummary(record),
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }
    }
}

private fun reviewLogSummary(record: ReviewRecord): String {
    val reviewedAt = DateTimeFormatter.ofPattern("MMM d, HH:mm")
        .withZone(ZoneId.systemDefault())
        .format(Instant.ofEpochMilli(record.lastReviewedAt))
    return "$reviewedAt  |  ${record.lastRating.ifBlank { "reviewed" }}  |  ${record.reviewCount} reps"
}
