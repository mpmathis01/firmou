import { state } from './state.js';
import { upd } from './upd.js';
import { renderPaySplitsUI } from './renderPaySplitsUI.js';

export function updPaySplit(id, f, v) {
    const s = state.pay.splits.find(x => x.id === id);
    if (!s) return;
    if (f === 'p') s.p = parseFloat(v) || 0;
    else if (f === 'q') s.q = v;
    else s[f] = v;

    // Default installment to À vista if not set
    if (f === 'm' && v === 'CARTÃO CRÉDITO' && !s.inst) s.inst = 'À VISTA';

    upd();
    if (f === 'm') renderPaySplitsUI();
}
