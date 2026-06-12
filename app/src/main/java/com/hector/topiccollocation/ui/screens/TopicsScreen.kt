package com.hector.topiccollocation.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hector.topiccollocation.ui.StudyFilter
import com.hector.topiccollocation.ui.TopicCollocationAppState
import com.hector.topiccollocation.ui.components.StudyFilterChips
import com.hector.topiccollocation.ui.components.TopicSummaryCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TopicsScreen(
    appState: TopicCollocationAppState,
    modifier: Modifier = Modifier
) {
    var query by rememberSaveable { mutableStateOf("") }
    var selectedFilter by rememberSaveable { mutableStateOf(StudyFilter.All) }
    val summaries = appState.topicSummaries()
        .filter { summary ->
            val matchesQuery = query.isBlank() ||
                summary.topic.id.contains(query, ignoreCase = true) ||
                summary.topic.zh.contains(query, ignoreCase = true)
            val matchesFilter = when (selectedFilter) {
                StudyFilter.All -> true
                StudyFilter.Due -> summary.dueCount > 0
                StudyFilter.Weak -> summary.weakCount > 0
                StudyFilter.Banked -> summary.bankedCount > 0
            }
            matchesQuery && matchesFilter
        }
        .sortedBy { it.topic.id }

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(title = { Text(text = "Topics") })
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
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "Study by IELTS theme",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                    OutlinedTextField(
                        value = query,
                        onValueChange = { query = it },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true,
                        label = { Text(text = "Search topics") }
                    )
                    StudyFilterChips(
                        selected = selectedFilter,
                        onSelected = { selectedFilter = it }
                    )
                }
            }

            if (summaries.isEmpty()) {
                item {
                    Text(
                        text = "No topics match this view.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            } else {
                items(summaries, key = { it.topic.id }) { summary ->
                    TopicSummaryCard(
                        summary = summary,
                        onClick = { appState.openTopic(summary.topic.id, selectedFilter) }
                    )
                }
            }
        }
    }
}
