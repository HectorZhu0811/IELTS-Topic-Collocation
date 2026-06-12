package com.hector.topiccollocation.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import com.hector.topiccollocation.ui.screens.BankScreen
import com.hector.topiccollocation.ui.screens.SettingsScreen
import com.hector.topiccollocation.ui.screens.TodayScreen
import com.hector.topiccollocation.ui.screens.TopicDetailScreen
import com.hector.topiccollocation.ui.screens.TopicsScreen
import com.hector.topiccollocation.ui.screens.ZenReviewScreen

enum class MainDestination(
    val label: String,
    val navGlyph: String
) {
    Today("Today", "T"),
    Topics("Topics", "P"),
    Bank("Bank", "B"),
    Settings("Settings", "S")
}

@Composable
fun TopicCollocationApp(
    appState: TopicCollocationAppState = rememberTopicCollocationAppState(LocalContext.current)
) {
    Scaffold(
        containerColor = when (appState.themeLabel) {
            "Paper" -> Color.White
            "Cool" -> Color(0xFFF4F8FB)
            else -> MaterialTheme.colorScheme.background
        },
        bottomBar = {
            if (appState.isMainTabVisible) {
                TopicCollocationNavigationBar(
                    selectedDestination = appState.selectedDestination,
                    onDestinationSelected = appState::select
                )
            }
        }
    ) { innerPadding ->
        val modifier = Modifier.padding(innerPadding)
        val zenRoute = appState.zenRoute
        val detailTopicId = appState.detailTopicId

        when {
            zenRoute != null -> {
                ZenReviewScreen(
                    route = zenRoute,
                    appState = appState,
                    onClose = appState::closeZen,
                    modifier = modifier
                )
            }

            detailTopicId != null -> {
                val topic = appState.topicFor(detailTopicId)
                if (topic == null) {
                    Text(text = "Topic not found", modifier = modifier)
                } else {
                    TopicDetailScreen(
                        topic = topic,
                        appState = appState,
                        onBack = appState::closeTopic,
                        modifier = modifier
                    )
                }
            }

            appState.selectedDestination == MainDestination.Today -> {
                TodayScreen(appState = appState, modifier = modifier)
            }

            appState.selectedDestination == MainDestination.Topics -> {
                TopicsScreen(appState = appState, modifier = modifier)
            }

            appState.selectedDestination == MainDestination.Bank -> {
                BankScreen(appState = appState, modifier = modifier)
            }

            appState.selectedDestination == MainDestination.Settings -> {
                SettingsScreen(appState = appState, modifier = modifier)
            }
        }
    }
}

@Composable
private fun TopicCollocationNavigationBar(
    selectedDestination: MainDestination,
    onDestinationSelected: (MainDestination) -> Unit
) {
    NavigationBar {
        MainDestination.entries.forEach { destination ->
            NavigationBarItem(
                selected = selectedDestination == destination,
                onClick = { onDestinationSelected(destination) },
                label = { Text(text = destination.label) },
                icon = { Text(text = destination.navGlyph) }
            )
        }
    }
}
