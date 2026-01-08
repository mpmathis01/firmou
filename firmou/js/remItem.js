import { state } from './state.js';
import { renderItems } from './renderItems.js';
import { upd } from './upd.js';

export function remItem(id) {
    state.items = state.items.filter(x => x.id !== id);
    renderItems();
    upd();
}
