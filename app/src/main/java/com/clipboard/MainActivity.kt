package com.clipboard

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.clipboard.ui.theme.ClipboardTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ClipboardTheme {
                ClipboardScreen()
            }
        }
    }
}

@Composable
fun ClipboardScreen() {
    var text by remember { mutableStateOf("") }
    
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        TextField(
            value = text,
            onValueChange = { text = it },
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
        )
        
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Button(onClick = { /* TODO: Clear */ }) {
                Text("Clear")
            }
            Button(onClick = { /* TODO: Copy */ }) {
                Text("Copy")
            }
            Button(onClick = { /* TODO: Paste */ }) {
                Text("Paste")
            }
        }
    }
}