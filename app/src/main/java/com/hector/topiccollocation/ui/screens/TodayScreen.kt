package com.hector.topiccollocation.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
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
import com.hector.topiccollocation.ui.StudyFilter
import com.hector.topiccollocation.ui.TopicCollocationAppState
import com.hector.topiccollocation.ui.TopicStudySummary
import com.hector.topiccollocation.ui.components.MetricTile
import com.hector.topiccollocation.ui.components.TopicSummaryCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TodayScreen(
    appState: TopicCollocationAppState,
    modifier: Modifier = Modifier
) {
    val dueCards = appState.dueCards()
    val dueReviewCards = appState.dueReviewCards()
    val weakCards = appState.weakCards()
    val priorityTopics = appState.topicSummaries()
        .filter { it.dueCount > 0 }
        .sortedWith(compareByDescending<TopicStudySummary> { it.dueCount }
            .thenByDescending { it.weakCount }
            .thenBy { it.topic.id })

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(title = { Text(text = "Today") })
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(vertical = 16.dp)
        ) {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text(
                        text = "Review queue",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text(
                        text = if (appState.isLoading) {
                            "Loading native study data..."
                        } else {
                            "${dueCards.size} due today"
                        },
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    appState.loadError?.let { error ->
                        Text(
                            text = error,
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.error
                        )
                    }
                }
            }

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    MetricTile(
                        label = "Due",
                        value = dueCards.size.toString(),
                        modifier = Modifier.weight(1f)
                    )
                    MetricTile(
                        label = "Weak",
                        value = weakCards.size.toString(),
                        modifier = Modifier.weight(1f)
                    )
                    MetricTile(
                        label = "Reviewed week",
                        value = appState.reviewedThisWeekCount().toString(),
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            item {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Button(
                        onClick = { appState.startZen("Due review", dueReviewCards) },
                        enabled = dueReviewCards.isNotEmpty(),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(text = "Start due review")
                    }
                    OutlinedButton(
                        onClick = { appState.startZen("Weak bank", weakCards) },
                        enabled = weakCards.isNotEmpty(),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(text = "Review weak bank")
                    }
                }
            }

            item {
                Text(
                    text = "Topic priority",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
            }

            if (priorityTopics.isEmpty()) {
                item {
                    Text(
                        text = "All topics are clear for now.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            } else {
                items(priorityTopics, key = { it.topic.id }) { summary ->
                    TopicSummaryCard(
                        summary = summary,
                        onClick = { appState.openTopic(summary.topic.id, StudyFilter.Due) }
                    )
                }
            }
        }
    }
}
