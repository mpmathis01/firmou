import { state } from './state.js';
import { upd } from './upd.js';
import { renderPaySplitsUI } from './renderPaySplitsUI.js';

export function remPaySplit(id) {
    state.pay.splits = state.pay.splits.filter(x => x.id !== id);
    upd();
    renderPaySplitsUI();
}
