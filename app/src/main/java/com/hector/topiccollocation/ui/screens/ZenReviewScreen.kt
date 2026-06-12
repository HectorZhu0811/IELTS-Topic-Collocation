package com.hector.topiccollocation.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.hector.topiccollocation.model.Flashcard
import com.hector.topiccollocation.model.SynonymGroup
import com.hector.topiccollocation.review.ReviewRating
import com.hector.topiccollocation.ui.TopicCollocationAppState
import com.hector.topiccollocation.ui.ZenReviewRoute
import com.hector.topiccollocation.ui.components.ReviewProgressLine

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ZenReviewScreen(
    route: ZenReviewRoute,
    appState: TopicCollocationAppState,
    onClose: () -> Unit,
    modifier: Modifier = Modifier
) {
    val currentCard = route.cards.firstOrNull()
    var isFlipped by rememberSaveable { mutableStateOf(false) }
    var showSynonyms by rememberSaveable { mutableStateOf(false) }

    LaunchedEffect(currentCard?.id) {
        isFlipped = false
        showSynonyms = appState.showSynonymSheetByDefault &&
            currentCard?.synonymNetworks?.isNotEmpty() == true
    }

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = route.title,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                },
                actions = {
                    TextButton(onClick = onClose) {
                        Text(text = "Close")
                    }
                }
            )
        },
        bottomBar = {
            if (currentCard != null) {
                RatingBar(
                    onRate = { rating -> appState.rateCurrentCard(rating) },
                    modifier = Modifier.padding(12.dp)
                )
            }
        }
    ) { innerPadding ->
        if (currentCard == null) {
            CompletionSummary(
                totalCount = route.totalCount,
                onClose = onClose,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .padding(20.dp)
            )
        } else {
            ReviewBody(
                card = currentCard,
                appState = appState,
                currentIndex = route.totalCount - route.cards.size + 1,
                totalCount = route.totalCount,
                isFlipped = isFlipped,
                showSynonyms = showSynonyms,
                onFlip = { isFlipped = !isFlipped },
                onToggleSynonyms = { showSynonyms = !showSynonyms },
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            )
        }
    }
}

@Composable
private fun ReviewBody(
    card: Flashcard,
    appState: TopicCollocationAppState,
    currentIndex: Int,
    totalCount: Int,
    isFlipped: Boolean,
    showSynonyms: Boolean,
    onFlip: () -> Unit,
    onToggleSynonyms: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = card.topic,
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = "$currentIndex / $totalCount",
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        ReviewProgressLine(currentIndex = currentIndex, totalCount = totalCount)
        ReviewCard(
            card = card,
            isFlipped = isFlipped,
            lastRating = appState.recordFor(card)?.lastRating.orEmpty(),
            chineseFontSizeSp = appState.chineseFontSizeSp,
            englishFontSizeSp = appState.englishFontSizeSp,
            onFlip = onFlip
        )
        if (card.synonymNetworks.isNotEmpty()) {
            OutlinedButton(
                onClick = onToggleSynonyms,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = if (showSynonyms) "Hide alternative wording" else "Show alternative wording")
            }
            if (showSynonyms) {
                SynonymSection(groups = card.synonymNetworks)
            }
        }
    }
}

@Composable
private fun ReviewCard(
    card: Flashcard,
    isFlipped: Boolean,
    lastRating: String,
    chineseFontSizeSp: Int,
    englishFontSizeSp: Int,
    onFlip: () -> Unit
) {
    ElevatedCard(
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 300.dp)
            .clickable(onClick = onFlip),
        colors = CardDefaults.elevatedCardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(min = 300.dp)
                .padding(22.dp)
        ) {
            Column(
                modifier = Modifier.align(Alignment.Center),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Text(
                    text = if (isFlipped) "English back" else "Chinese front",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = if (isFlipped) card.backEnglish else card.frontChinese,
                    style = MaterialTheme.typography.headlineMedium,
                    fontSize = if (isFlipped) englishFontSizeSp.sp else chineseFontSizeSp.sp,
                    fontWeight = FontWeight.SemiBold,
                    textAlign = TextAlign.Center
                )
                Text(
                    text = if (isFlipped) {
                        listOf(card.topic, card.type, lastRating.ifBlank { "new" }).joinToString("  |  ")
                    } else {
                        "Tap to reveal"
                    },
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Composable
private fun SynonymSection(groups: List<SynonymGroup>) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        groups.forEach { group ->
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = MaterialTheme.shapes.medium,
                color = MaterialTheme.colorScheme.surface,
                tonalElevation = 1.dp
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = group.coreExpression.ifBlank { group.core },
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.SemiBold
                    )
                    group.options.take(4).forEach { option ->
                        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(
                                text = option.phrase.ifBlank { option.term },
                                style = MaterialTheme.typography.bodyMedium,
                                fontWeight = FontWeight.Medium
                            )
                            Text(
                                text = listOf(option.zh, option.tone, option.stance)
                                    .filter { it.isNotBlank() }
                                    .joinToString("  |  "),
                                style = MaterialTheme.typography.labelMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                maxLines = 2,
                                overflow = TextOverflow.Ellipsis
                            )
                            Text(
                                text = option.microContext,
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun RatingBar(
    onRate: (ReviewRating) -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(tonalElevation = 3.dp) {
        Row(
            modifier = modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            RatingButton("Again", "now", Modifier.weight(1f)) {
                onRate(ReviewRating.AGAIN)
            }
            RatingButton("Hard", "1d+", Modifier.weight(1f)) {
                onRate(ReviewRating.HARD)
            }
            RatingButton("Good", "next", Modifier.weight(1f)) {
                onRate(ReviewRating.GOOD)
            }
            RatingButton("Easy", "4d+", Modifier.weight(1f)) {
                onRate(ReviewRating.EASY)
            }
        }
    }
}

@Composable
private fun RatingButton(
    label: String,
    interval: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        modifier = modifier.heightIn(min = 56.dp),
        contentPadding = PaddingValues(horizontal = 6.dp, vertical = 8.dp)
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(text = label, maxLines = 1)
            Text(
                text = interval,
                style = MaterialTheme.typography.labelSmall,
                maxLines = 1
            )
        }
    }
}

@Composable
private fun CompletionSummary(
    totalCount: Int,
    onClose: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Review complete",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.SemiBold,
            textAlign = TextAlign.Center
        )
        Text(
            text = "$totalCount cards reviewed and scheduled.",
            modifier = Modifier.padding(top = 8.dp, bottom = 20.dp),
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )
        Button(onClick = onClose, modifier = Modifier.fillMaxWidth()) {
            Text(text = "Done")
        }
    }
}
