import { upd } from './upd.js';

export function clearAddr(t) {
    ['Street', 'Num', 'Comp', 'Neigh', 'City', 'UF'].forEach(f => {
        const el = document.getElementById(t + f);
        if (el) el.value = '';
    });
    upd();
}
