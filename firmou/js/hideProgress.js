export function hideProgress() {
    const m = document.getElementById('progress-modal');
    if (m) setTimeout(() => m.classList.add('hidden'), 500);
}
