export function setLoading(id, isLoading) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isLoading) el.classList.add('input-loading');
    else el.classList.remove('input-loading');
}
