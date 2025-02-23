export class ClipboardManager {
    constructor() {
        this.entries = [];
        this.separator = '=========这里是分割线=========';
        this.virtualEntries = new VirtualScroller();
    }

    addEntry(text) {
        if (!text.trim()) return;
        
        // 使用 Web Worker 处理大文本
        if (text.length > 1000) {
            this.processLargeText(text);
            return;
        }

        const lines = text.split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line);
            
        lines.forEach(line => this.entries.push(line));
        this.virtualEntries.addItems(lines);
    }

    processLargeText(text) {
        const worker = new Worker(new URL('./text-worker.js', import.meta.url));
        
        worker.onmessage = (e) => {
            this.virtualEntries.addItems(e.data);
            this.entries.push(...e.data);
        };

        worker.postMessage(text);
    }

    async copyAll() {
        if (this.entries.length === 0) {
            return false;
        }

        const text = this.entries.slice().reverse().join(`\n${this.separator}\n`);
        return await this.copyToClipboard(text);
    }

    async copyToClipboard(text) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (err) {
            console.error('Copy failed:', err);
            return false;
        }
    }

    clear() {
        this.entries = [];
        this.virtualEntries.clear();
    }
}

class VirtualScroller {
    constructor() {
        this.container = document.getElementById('entriesContainer');
        this.items = [];
        this.itemHeight = 60; // 预估的每项高度
        this.visibleItems = new Map();
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
        
        this.container.addEventListener('scroll', this.handleScroll.bind(this));
    }

    addItems(newItems) {
        const startIndex = this.items.length;
        this.items.push(...newItems);
        this.renderNewItems(startIndex);
    }

    renderNewItems(startIndex) {
        const fragment = document.createDocumentFragment();
        
        for (let i = startIndex; i < this.items.length; i++) {
            const div = document.createElement('div');
            div.className = 'entry-item';
            div.textContent = this.items[i];
            div.dataset.index = i;
            
            this.observer.observe(div);
            fragment.appendChild(div);
        }

        this.container.insertBefore(fragment, this.container.firstChild);
        
        // 触发动画
        requestAnimationFrame(() => {
            const newItems = this.container.querySelectorAll('.entry-item:not(.show)');
            newItems.forEach(item => item.classList.add('show'));
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                this.visibleItems.set(element.dataset.index, element);
            } else {
                this.visibleItems.delete(element.dataset.index);
            }
        });
    }

    handleScroll() {
        // 可以添加滚动优化逻辑
    }

    clear() {
        this.items = [];
        this.visibleItems.clear();
        this.container.innerHTML = '';
    }
}