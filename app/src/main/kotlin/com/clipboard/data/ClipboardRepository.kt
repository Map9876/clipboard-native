class ClipboardRepository @Inject constructor(
    private val database: ClipboardDatabase,
    private val textProcessor: TextProcessor,
    private val scope: CoroutineScope
) {
    private val chunkSize = 1000 // 每块文本的最大行数

    suspend fun insertText(text: String) {
        withContext(Dispatchers.Default) {
            val chunks = textProcessor.splitIntoChunks(text, chunkSize)
            chunks.forEachIndexed { index, chunk ->
                database.clipboardDao().insert(
                    ClipboardEntry(
                        text = chunk,
                        chunkIndex = index,
                        totalChunks = chunks.size
                    )
                )
            }
        }
    }

    fun getEntries(): Flow<PagingData<ClipboardEntry>> = Pager(
        config = PagingConfig(
            pageSize = 20,
            enablePlaceholders = true,
            maxSize = 200
        )
    ) {
        database.clipboardDao().getPagingSource()
    }.flow
}