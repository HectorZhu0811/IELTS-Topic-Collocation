package com.hector.topiccollocation.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue

@Composable
fun rememberTopicCollocationAppState(
    initialDestination: MainDestination = MainDestination.Today
): TopicCollocationAppState {
    var selectedDestinationRoute by rememberSaveable {
        mutableStateOf(initialDestination.route)
    }

    return TopicCollocationAppState(
        selectedDestinationRoute = selectedDestinationRoute,
        onDestinationSelected = { destination ->
            selectedDestinationRoute = destination.route
        }
    )
}

class TopicCollocationAppState(
    selectedDestinationRoute: String,
    private val onDestinationSelected: (MainDestination) -> Unit
) {
    var selectedDestinationRoute by mutableStateOf(selectedDestinationRoute)
        private set

    val selectedDestination: MainDestination
        get() = MainDestination.entries.firstOrNull { it.route == selectedDestinationRoute }
            ?: MainDestination.Today

    fun select(destination: MainDestination) {
        selectedDestinationRoute = destination.route
        onDestinationSelected(destination)
    }
}
