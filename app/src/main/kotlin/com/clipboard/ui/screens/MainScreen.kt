@Composable
fun MainScreen(
    viewModel: MainViewModel = hiltViewModel()
) {
    val entries = viewModel.entries.collectAsLazyPagingItems()
    val scope = rememberCoroutineScope()
    
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        LazyColumn(
            modifier = Modifier.weight(1f)
        ) {
            items(
                count = entries.itemCount,
                key = { index -> entries[index]?.id ?: index }
            ) { index ->
                entries[index]?.let { entry ->
                    ClipboardItem(
                        entry = entry,
                        onCopyClick = { viewModel.copyEntry(entry) }
                    )
                }
            }
        }
        
        BottomBar(
            onPaste = { viewModel.handleNewText(it) },
            onClear = { viewModel.clearEntries() }
        )
    }
}