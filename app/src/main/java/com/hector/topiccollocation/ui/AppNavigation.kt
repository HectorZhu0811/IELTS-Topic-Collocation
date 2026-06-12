package com.hector.topiccollocation.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.hector.topiccollocation.ui.screens.BankScreen
import com.hector.topiccollocation.ui.screens.SettingsScreen
import com.hector.topiccollocation.ui.screens.TodayScreen
import com.hector.topiccollocation.ui.screens.TopicsScreen

enum class MainDestination(
    val route: String,
    val label: String
) {
    Today("today", "Today"),
    Topics("topics", "Topics"),
    Bank("bank", "Bank"),
    Settings("settings", "Settings")
}

@Composable
fun TopicCollocationApp(
    appState: TopicCollocationAppState = rememberTopicCollocationAppState()
) {
    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        bottomBar = {
            TopicCollocationNavigationBar(
                selectedDestination = appState.selectedDestination,
                onDestinationSelected = appState::select
            )
        }
    ) { innerPadding ->
        val modifier = Modifier.padding(innerPadding)

        when (appState.selectedDestination) {
            MainDestination.Today -> TodayScreen(modifier = modifier)
            MainDestination.Topics -> TopicsScreen(modifier = modifier)
            MainDestination.Bank -> BankScreen(modifier = modifier)
            MainDestination.Settings -> SettingsScreen(modifier = modifier)
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
                icon = {}
            )
        }
    }
}
