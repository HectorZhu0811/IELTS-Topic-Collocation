package com.hector.topiccollocation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.hector.topiccollocation.ui.TopicCollocationApp
import com.hector.topiccollocation.ui.theme.TopicCollocationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            TopicCollocationTheme {
                TopicCollocationApp()
            }
        }
    }
}
