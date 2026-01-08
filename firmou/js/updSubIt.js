import { state } from './state.js';
import { upd } from './upd.js';

export function updSubIt(itemId, subId, f, v) {
    const i = state.items.find(x => x.id === itemId);
    const si = i.sItems.find(x => x.id === subId);
    si[f] = (f === 'q' || f === 'p') ? (parseFloat(v) || 0) : v;
    upd();
}
