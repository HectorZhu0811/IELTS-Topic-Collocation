package com.hector.topiccollocation.ui.screens

import androidx.compose.foundation.background
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
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hector.topiccollocation.model.TopicMeta
import com.hector.topiccollocation.ui.StudyFilter
import com.hector.topiccollocation.ui.TopicCollocationAppState
import com.hector.topiccollocation.ui.components.CompactFlashcardRow
import com.hector.topiccollocation.ui.components.MetricTile
import com.hector.topiccollocation.ui.components.StudyFilterChips
import com.hector.topiccollocation.ui.components.colorFromHex

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TopicDetailScreen(
    topic: TopicMeta,
    appState: TopicCollocationAppState,
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    var query by rememberSaveable(topic.id) { mutableStateOf("") }
    val allCards = appState.topicCards(topic.id)
    val visibleCards = appState.filteredCards(
        source = allCards,
        filter = appState.detailFilter,
        query = query
    )
    val totalCount = allCards.size
    val dueCount = appState.filteredCards(allCards, StudyFilter.Due).size
    val weakCount = appState.filteredCards(allCards, StudyFilter.Weak).size
    val bankedCount = appState.filteredCards(allCards, StudyFilter.Banked).size

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(
                title = { Text(text = topic.id) },
                navigationIcon = {
                    TextButton(onClick = onBack) {
                        Text(text = "Back")
                    }
                }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(colorFromHex(topic.accent).copy(alpha = 0.08f))
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = topic.zh,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.Unspecified
                    )
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        MetricTile("Total", totalCount.toString(), Modifier.weight(1f))
                        MetricTile("Due", dueCount.toString(), Modifier.weight(1f))
                        MetricTile("Weak", weakCount.toString(), Modifier.weight(1f))
                        MetricTile("Banked", bankedCount.toString(), Modifier.weight(1f))
                    }
                }
            }

            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    StudyFilterChips(
                        selected = appState.detailFilter,
                        onSelected = appState::setDetailFilter
                    )
                    OutlinedTextField(
                        value = query,
                        onValueChange = { query = it },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true,
                        label = { Text(text = "Search in ${topic.id}") }
                    )
                    Button(
                        onClick = {
                            appState.startZen("${topic.id} ${appState.detailFilter.label}", visibleCards)
                        },
                        enabled = visibleCards.isNotEmpty(),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(text = "Start Zen from current view")
                    }
                }
            }

            if (visibleCards.isEmpty()) {
                item {
                    Text(
                        text = "No cards match this filter.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            } else {
                items(visibleCards, key = { it.id }) { card ->
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
