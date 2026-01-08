import { state } from './state.js';
import { upd } from './upd.js';
import { renderPaySplitsUI } from './renderPaySplitsUI.js';

export function addPaySplit() {
    const currentTotal = state.pay.splits.reduce((acc, s) => acc + s.p, 0);
    if (currentTotal >= 100) {
        alert("O total das divisões já atingiu 100%. Ajuste os valores existentes antes de adicionar um novo.");
        return;
    }
    const remaining = 100 - currentTotal;
    state.pay.splits.push({ id: Date.now(), d: 'Pagamento ' + (state.pay.splits.length + 1), p: remaining, m: 'PIX', q: true });
    upd();
    renderPaySplitsUI();
}
