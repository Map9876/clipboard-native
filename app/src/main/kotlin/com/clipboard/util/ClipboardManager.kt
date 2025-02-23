class ClipboardManager @Inject constructor(
    private val context: Context,
    private val scope: CoroutineScope
) {
    private val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager

    suspend fun copyText(text: String) = withContext(Dispatchers.Main) {
        val clip = ClipData.newPlainText("clipboard", text)
        clipboard.setPrimaryClip(clip)
    }

    suspend fun getText(): String? = withContext(Dispatchers.Default) {
        clipboard.primaryClip?.getItemAt(0)?.text?.toString()
    }
}