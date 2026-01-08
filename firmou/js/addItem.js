import { state } from './state.js';
import { renderItems } from './renderItems.js';
import { upd } from './upd.js';

export function addItem() {
    state.items.push({ id: Date.now(), d: '', q: 1, p: 0, sItems: [] });
    renderItems();
    upd();
}
