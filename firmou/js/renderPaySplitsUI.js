import { state } from './state.js';
import { esc } from './esc.js';

export function renderPaySplitsUI() {
    const list = document.getElementById('pay-split-list');
    if (!list) return;
    list.innerHTML = '';

    const splits = state.pay?.splits || [];
    list.innerHTML = splits.map(s => `
        <div class="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border dark:border-slate-700 flex flex-col gap-2 relative" >
            <button onclick="window.remPaySplit(${s.id})" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center shadow-sm z-10"><i class="fa-solid fa-times"></i></button>
            <div class="flex gap-2 items-center">
                <input type="text" placeholder="Descrição" class="flex-[3] bg-slate-50 dark:bg-slate-700 p-1.5 rounded text-[9px] font-bold" value="${esc(s.d)}" oninput="window.updPaySplit(${s.id}, 'd', this.value)">
                <div class="flex-1 flex items-center gap-1 bg-slate-50 dark:bg-slate-700 rounded p-1.5">
                    <input type="number" class="w-full bg-transparent text-[9px] text-center font-bold outline-none" value="${s.p}" oninput="window.updPaySplit(${s.id}, 'p', this.value)">
                    <span class="text-[8px] text-slate-400 font-bold">%</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="flex-1 min-w-0 flex flex-col gap-1">
                    <select class="w-full bg-slate-50 dark:bg-slate-700 p-1.5 rounded text-[9px] font-bold border-none ring-1 ring-slate-200 dark:ring-slate-600" onchange="window.updPaySplit(${s.id}, 'm', this.value)">
                        <option value="PIX" ${s.m === 'PIX' ? 'selected' : ''}>PIX</option>
                        <option value="DINHEIRO" ${s.m === 'DINHEIRO' ? 'selected' : ''}>Dinheiro</option>
                        <option value="CARTÃO CRÉDITO" ${s.m === 'CARTÃO CRÉDITO' ? 'selected' : ''}>Crédito</option>
                        <option value="CARTÃO DÉBITO" ${s.m === 'CARTÃO DÉBITO' ? 'selected' : ''}>Débito</option>
                        <option value="BOLETO" ${s.m === 'BOLETO' ? 'selected' : ''}>Boleto</option>
                    </select>
                    ${s.m === 'CARTÃO CRÉDITO' ? `
                        <select class="w-full bg-slate-50 dark:bg-slate-700 p-1.5 rounded text-[9px] font-bold border-none ring-1 ring-slate-200 dark:ring-slate-600 fade-in" onchange="window.updPaySplit(${s.id}, 'inst', this.value)">
                            <option value="À VISTA" ${!s.inst || s.inst === 'À VISTA' ? 'selected' : ''}>À Vista</option>
                            <option value="2x" ${s.inst === '2x' ? 'selected' : ''}>2x</option>
                            <option value="3x" ${s.inst === '3x' ? 'selected' : ''}>3x</option>
                            <option value="4x" ${s.inst === '4x' ? 'selected' : ''}>4x</option>
                            <option value="5x" ${s.inst === '5x' ? 'selected' : ''}>5x</option>
                            <option value="6x" ${s.inst === '6x' ? 'selected' : ''}>6x</option>
                            <option value="10x" ${s.inst === '10x' ? 'selected' : ''}>10x</option>
                            <option value="12x" ${s.inst === '12x' ? 'selected' : ''}>12x</option>
                        </select>
                    ` : ''}
                </div>
                ${s.m === 'PIX' ? `
                <div class="flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                    <input type="checkbox" id="split-qr-${s.id}" ${s.q ? 'checked' : ''} onchange="window.updPaySplit(${s.id}, 'q', this.checked)">
                    <label for="split-qr-${s.id}" class="text-[8px] font-bold text-slate-500 cursor-pointer">QR</label>
                </div>` : ''}
            </div>
        </div >
        `).join('');
}

