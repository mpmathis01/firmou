import { state } from './state.js';
import { upd } from './upd.js';

export function updIt(id, f, v) {
    const i = state.items.find(x => x.id === id);
    i[f] = f === 'd' ? v : parseFloat(v) || 0;
    upd();
}
