import { state } from './state.js';
import { extractColor } from './extractColor.js';
import { renderAll } from './renderAll.js';

export function handleLogo(e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
        state.my.logo = ev.target.result;
        const prev = document.getElementById('logoPrev');
        if (prev) { prev.src = state.my.logo; prev.classList.remove('hidden'); }
        const ph = document.getElementById('logoPlaceholder');
        if (ph) ph.classList.add('hidden');

        extractColor(ev.target.result);
        renderAll();
    };
    r.readAsDataURL(f);
}
