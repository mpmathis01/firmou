import { state } from './state.js';

export function adjZoom(v) {
    state.cfg.zoom = (state.cfg.zoom || 1) + v;
    const root = document.getElementById('pdf-root');
    if (root) {
        // O autoScale no index.html cuida da base responsiva, 
        // aqui aplicamos o multiplicador do usuário.
        if (window.autoScale) window.autoScale();
        else root.style.transform = `scale(${state.cfg.zoom})`;
    }
    const valEl = document.getElementById('zoom-val');
    if (valEl) valEl.innerText = Math.round((state.cfg.zoom || 1) * 100) + '%';
}
