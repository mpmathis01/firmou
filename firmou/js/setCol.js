import { state, save } from './state.js';
import { renderPreview } from './renderPreview.js';

export function setCol(c) {
    state.cfg.col = c;
    document.documentElement.style.setProperty('--accent-color', c);
    save();
    renderPreview();
}
