export function switchTab(t) {
    ['info', 'items', 'payments', 'photos', 'design', 'files'].forEach(s => {
        document.getElementById('sect-' + s).classList.add('hidden');
        document.getElementById('tab-' + s).classList.remove('tab-active');
        document.getElementById('tab-' + s).classList.add('text-slate-400');
    });
    document.getElementById('sect-' + t).classList.remove('hidden');
    document.getElementById('tab-' + t).classList.add('tab-active');
    document.getElementById('tab-' + t).classList.remove('text-slate-400');
}
