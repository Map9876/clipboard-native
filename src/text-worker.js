// 处理大文本的 Web Worker
self.onmessage = function(e) {
    const text = e.data;
    const lines = text.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line);
    
    // 分批处理以避免阻塞
    const batchSize = 100;
    for (let i = 0; i < lines.length; i += batchSize) {
        const batch = lines.slice(i, i + batchSize);
        self.postMessage(batch);
    }
};