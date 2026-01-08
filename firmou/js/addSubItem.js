import { state } from './state.js';
import { renderItems } from './renderItems.js';
import { upd } from './upd.js';

export function addSubItem(itemId) {
    const i = state.items.find(x => x.id === itemId);
    if (!i.sItems) i.sItems = [];
    i.sItems.push({ id: Date.now(), d: '', q: 1, p: 0, v: true });
    renderItems();
    upd();
}
