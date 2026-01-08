export function setMobileTab(mode) {
    const side = document.getElementById('sidebar');
    const prev = document.getElementById('preview-side');
    const bE = document.getElementById('btn-mob-edit'), bP = document.getElementById('btn-mob-prev');
    if (mode === 'edit') {
        side.classList.remove('hidden'); prev.classList.add('hidden');
        bE.classList.add('border-firmou-amber'); bE.classList.remove('text-slate-400');
        bP.classList.remove('border-firmou-amber'); bP.classList.add('text-slate-400');
    } else {
        side.classList.add('hidden'); prev.classList.remove('hidden');
        bP.classList.add('border-firmou-amber'); bP.classList.remove('text-slate-400');
        bE.classList.remove('border-firmou-amber'); bE.classList.add('text-slate-400');
    }
}
