import { state, save } from './state.js';
import { renderTemplates } from './renderTemplates.js';
import { renderPreview } from './renderPreview.js';

export async function setTemplate(tplId) {
    state.cfg.tpl = tplId;
    renderTemplates();
    save();
    renderPreview();
}
