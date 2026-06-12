package com.hector.topiccollocation.ui.screens

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hector.topiccollocation.ui.TopicCollocationAppState
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    appState: TopicCollocationAppState,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    val exportLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.CreateDocument("application/json")
    ) { uri ->
        if (uri != null) {
            scope.launch {
                val result = appState.exportMemoryJson(context.contentResolver, uri)
                snackbarHostState.showSnackbar(
                    result.fold(
                        onSuccess = { count -> "Exported $count memory records." },
                        onFailure = { error -> error.message ?: "Export failed." }
                    )
                )
            }
        }
    }
    val importLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.OpenDocument()
    ) { uri ->
        if (uri != null) {
            scope.launch {
                val result = appState.importMemoryJson(context.contentResolver, uri)
                snackbarHostState.showSnackbar(
                    result.fold(
                        onSuccess = { count -> "Imported $count memory records." },
                        onFailure = { error -> error.message ?: "Import failed." }
                    )
                )
            }
        }
    }

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(title = { Text(text = "Settings") })
        },
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState)
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            item {
                Text(
                    text = "Preferences",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.SemiBold
                )
            }

            item {
                SettingsSection(title = "Memory") {
                    Button(
                        onClick = { exportLauncher.launch("topic-collocation-memory.json") },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(text = "Export memory JSON")
                    }
                    OutlinedButton(
                        onClick = { importLauncher.launch(arrayOf("application/json", "text/plain", "*/*")) },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(text = "Import memory JSON")
                    }
                }
            }

            item {
                SettingsSection(title = "Study") {
                    StepperRow(
                        label = "Daily target",
                        value = appState.dailyTarget.toString(),
                        onDecrease = { appState.setDailyTarget(appState.dailyTarget - 5) },
                        onIncrease = { appState.setDailyTarget(appState.dailyTarget + 5) },
                        canDecrease = appState.dailyTarget > 5,
                        canIncrease = appState.dailyTarget < 100
                    )
                    HorizontalDivider()
                    ToggleRow(
                        label = "Randomize cards",
                        checked = appState.randomizeCards,
                        onCheckedChange = appState::setRandomizeCards
                    )
                    HorizontalDivider()
                    ToggleRow(
                        label = "Show synonym sheet by default",
                        checked = appState.showSynonymSheetByDefault,
                        onCheckedChange = appState::setShowSynonymSheetByDefault
                    )
                }
            }

            item {
                SettingsSection(title = "Display") {
                    PreferenceRow(label = "Theme") {
                        OutlinedButton(onClick = appState::cycleTheme) {
                            Text(text = appState.themeLabel)
                        }
                    }
                    HorizontalDivider()
                    FontSizeRow(
                        label = "Chinese font size",
                        value = appState.chineseFontSizeSp,
                        onValueChange = appState::setChineseFontSizeSp
                    )
                    HorizontalDivider()
                    FontSizeRow(
                        label = "English font size",
                        value = appState.englishFontSizeSp,
                        onValueChange = appState::setEnglishFontSizeSp
                    )
                }
            }
        }
    }
}

@Composable
private fun SettingsSection(
    title: String,
    content: @Composable Column.() -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        shape = MaterialTheme.shapes.medium,
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 1.dp
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold
            )
            content()
        }
    }
}

@Composable
private fun PreferenceRow(
    label: String,
    content: @Composable () -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            modifier = Modifier.weight(1f),
            style = MaterialTheme.typography.bodyLarge
        )
        content()
    }
}

@Composable
private fun ToggleRow(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    PreferenceRow(label = label) {
        Switch(checked = checked, onCheckedChange = onCheckedChange)
    }
}

@Composable
private fun StepperRow(
    label: String,
    value: String,
    onDecrease: () -> Unit,
    onIncrease: () -> Unit,
    canDecrease: Boolean,
    canIncrease: Boolean
) {
    PreferenceRow(label = label) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedButton(onClick = onDecrease, enabled = canDecrease) {
                Text(text = "-")
            }
            Text(
                text = value,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold
            )
            OutlinedButton(onClick = onIncrease, enabled = canIncrease) {
                Text(text = "+")
            }
        }
    }
}

@Composable
private fun FontSizeRow(
    label: String,
    value: Int,
    onValueChange: (Int) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        PreferenceRow(label = label) {
            Text(
                text = "${value}sp",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold
            )
        }
        Slider(
            value = value.toFloat(),
            onValueChange = { onValueChange(it.roundToInt()) },
            valueRange = 20f..34f,
            steps = 13
        )
    }
}
