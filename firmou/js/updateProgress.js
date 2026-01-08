export function updateProgress(pct) {
    const bar = document.getElementById('progress-bar-fill');
    if (bar) bar.style.width = pct + '%';
}
