class TextProcessor @Inject constructor() {
    fun splitIntoChunks(text: String, chunkSize: Int): List<String> =
        text.lineSequence()
            .filter { it.isNotBlank() }
            .chunked(chunkSize)
            .map { it.joinToString("\n") }
            .toList()

    suspend fun processLargeText(
        text: String,
        onChunk: suspend (String) -> Unit
    ) = withContext(Dispatchers.Default) {
        text.lineSequence()
            .filter { it.isNotBlank() }
            .chunked(1000)
            .forEach { chunk ->
                onChunk(chunk.joinToString("\n"))
            }
    }
}