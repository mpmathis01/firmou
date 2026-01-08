export function showProgress() {
    const m = document.getElementById('progress-modal');
    const bar = document.getElementById('progress-bar-fill');
    if (m && bar) {
        m.classList.remove('hidden');
        bar.style.width = '0%';
    }
}
