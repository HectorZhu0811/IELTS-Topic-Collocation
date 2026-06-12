package com.hector.topiccollocation.ui.screens

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
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hector.topiccollocation.model.Flashcard
import com.hector.topiccollocation.ui.TopicCollocationAppState
import com.hector.topiccollocation.ui.components.CompactFlashcardRow
import com.hector.topiccollocation.ui.components.MetricTile

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
    val cardsByTopic = focusCards.groupBy { it.topic }

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
                        text = "Weak and due bank",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text(
                        text = "Prioritise fragile phrases before adding more new cards.",
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

            if (focusCards.isEmpty()) {
                item {
                    Text(
                        text = "No weak or due cards right now.",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            } else {
                cardsByTopic.forEach { (topic, cards) ->
                    item(key = "topic-$topic") {
                        Text(
                            text = "$topic  |  ${cards.size} cards",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                    items(cards, key = { it.id }) { card ->
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
    }
}
