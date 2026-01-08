import { state } from './state.js';
import { renderItems } from './renderItems.js';
import { upd } from './upd.js';

export function remSubItem(itemId, subId) {
    const i = state.items.find(x => x.id === itemId);
    i.sItems = i.sItems.filter(x => x.id !== subId);
    renderItems();
    upd();
}
