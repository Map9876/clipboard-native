import { ClipboardManager } from './clipboard-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    const clipboardManager = new ClipboardManager();
    const inputArea = document.getElementById('inputArea');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const toast = document.getElementById('toast');

    function showToast(message, duration = 2000) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    }

    function updateDateTime() {
        const now = new Date();
        const formatted = `UTC: ${now.toISOString().slice(0, 19).replace('T', ' ')}`;
        document.getElementById('dateTime').textContent = formatted;
    }

    // 初始化
    updateDateTime();
    setInterval(updateDateTime, 1000);
    document.getElementById('userLogin').textContent = '用户: map9876543';

    // 输入处理
    inputArea.addEventListener('input', (e) => {
        if (e.inputType === 'insertText' || e.inputType === 'insertFromPaste') {
            clipboardManager.addEntry(e.target.value);
            e.target.value = '';
        }
    });

    // Enter 键处理
    inputArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            clipboardManager.addEntry(e.target.value);
            e.target.value = '';
        }
    });

    // 复制按钮
    copyButton.addEventListener('click', async () => {
        const success = await clipboardManager.copyAll();
        showToast(success ? '复制成功！' : '复制失败，请重试');
    });

    // 清空按钮
    clearButton.addEventListener('click', () => {
        clipboardManager.clear();
        showToast('已清空所有内容');
    });

    // 自动聚焦
    inputArea.focus();
});