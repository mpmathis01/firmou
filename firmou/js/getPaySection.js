import { state } from './state.js';
import { fmt } from './fmt.js';
import { esc } from './esc.js';

export const getPaySection = (total) => {
    const footerBlocks = `
        <div class="space-y-4 text-left">
            ${state.pay.terms ? `
                <div>
                    <p class="text-[9px] font-black uppercase text-slate-400 mb-1">Termos e Condições</p>
                    <p class="text-[10px] text-slate-600 leading-snug whitespace-pre-wrap">${esc(state.pay.terms)}</p>
                </div>
            ` : ''}
            ${state.pay.notes ? `
                <div>
                    <p class="text-[9px] font-black uppercase text-slate-400 mb-1">Observações Adicionais</p>
                    <p class="text-[10px] text-slate-600 leading-snug whitespace-pre-wrap">${esc(state.pay.notes)}</p>
                </div>
            ` : ''}
        </div>
    `;

    if (state.pay.showSplits && state.pay.splits && state.pay.splits.length > 0) {
        return `
            <div class="mt-10 pt-6 border-t-2 border-slate-100 space-y-6">
                <div>
                    <h4 class="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest text-left">Plano de Pagamento Detalhado</h4>
                    <div class="grid grid-cols-3 gap-3">
                        ${state.pay.splits.map((s, idx) => `
                            <div class="flex flex-col p-3 border rounded-xl bg-slate-50/50 text-left">
                                <div class="flex items-start gap-3 mb-2">
                                    ${s.m === 'PIX' && s.q ? `<div id="pix-qr-split-${idx}" class="w-12 h-12 border p-0.5 bg-white shrink-0"></div>` : `<div class="w-12 h-12 flex items-center justify-center bg-white border rounded shrink-0"><i class="fa-solid ${s.m.includes('CARTÃO') ? 'fa-credit-card' : 'fa-money-bill-transfer'} text-slate-300 text-lg"></i></div>`}
                                    <div>
                                        <p class="text-[7px] font-black text-slate-400 uppercase leading-none mb-1">${esc(s.m)}</p>
                                        <p class="text-[10px] font-bold text-slate-800 leading-tight mb-1">${esc(s.d)}</p>
                                        <p class="text-xs font-black italic text-slate-900">${fmt(total * (s.p / 100))}</p>
                                    </div>
                                </div>
                                ${s.m === 'PIX' && s.q ? `<div class="mt-auto pt-2 border-t border-slate-200"><p id="pix-copypaste-split-${idx}" class="text-[5px] font-mono break-all text-slate-400"></p></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-8 items-end">
                    ${footerBlocks}
                    <div class="text-right border-t pt-4">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Soma Total</p>
                        <p class="text-4xl font-black italic tracking-tighter" style="color:var(--accent-color)">TOTAL: ${fmt(total)}</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="mt-10 pt-6 border-t-2 border-slate-100 grid grid-cols-2 gap-6 items-end">
                <div class="space-y-6">
                    ${state.pay.pix ? `
                    <div class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-left">
                        <div id="pix-qr" class="w-24 h-24 border p-1 bg-white shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <p class="text-[8px] font-black text-slate-400 uppercase mb-2">Pagamento via PIX</p>
                            <p class="text-[10px] font-bold text-slate-800 truncate">${esc(state.my.name)}</p>
                            <p id="pix-copypaste-main" class="text-[8px] font-mono break-all leading-tight bg-white p-2 rounded border text-slate-500 mt-2 select-all"></p>
                        </div>
                    </div>
                    ` : ''}
                    ${footerBlocks}
                </div>
                <div class="text-right">
                     <p class="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Total Geral</p>
                     <p class="text-5xl font-black italic tracking-tighter" style="color:var(--accent-color)">${fmt(total)}</p>
                </div>
            </div>
        `;
    }
};

