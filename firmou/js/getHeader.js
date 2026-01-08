import { state } from './state.js';
import { esc } from './esc.js';

export const getAddr = (t) => {
    if (t.street) return `${esc(t.street)}, ${esc(t.num) || 'S/N'}${t.comp ? ' - ' + esc(t.comp) : ''}<br>${esc(t.neigh) || ''} - ${esc(t.city) || ''}/${esc(t.uf) || ''}<br>${esc(t.cep) || ''}`;
    return esc(t.addr) || '';
};

export const getHeader = () => `
    <div class="flex justify-between items-start mb-6 shrink-0">
        <div class="flex flex-col gap-4 items-start text-left">
            ${state.my.logo ? `<img src="${state.my.logo}" class="max-h-20 max-w-[200px] object-contain object-left">` : `<div class="font-black text-2xl uppercase tracking-tighter" style="color:var(--accent-color)">${esc(state.my.name) || 'EMPRESA'}</div>`}
            <div class="text-[10px] text-slate-500 leading-tight">
                <p class="font-bold text-slate-800">${esc(state.my.name)}</p>
                <p>${esc(state.my.doc)}</p>
                <p>${getAddr(state.my)}</p>
            </div>
        </div>
        <div class="text-right">
            <h1 class="text-4xl font-black italic tracking-tighter" style="color:var(--accent-color)">${esc(state.doc.type)}</h1>
            <p class="text-sm font-bold text-slate-400 mt-2">Nº ${esc(state.doc.num)}</p>
            <div class="text-[10px] text-slate-500 mt-1">
                <p>Emissão: ${new Date(state.doc.date).toLocaleDateString('pt-BR')}</p>
                ${state.doc.showExp && state.doc.dateExp ? `<p class="text-amber-600 font-bold">Válido até: ${new Date(state.doc.dateExp).toLocaleDateString('pt-BR')}</p>` : ''}
            </div>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-10 mb-6 border-y py-4 border-slate-100 shrink-0">
        <div>
            <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Cliente / Tomador</span>
            <p class="font-bold text-sm">${esc(state.cl.name) || 'NOME DO CLIENTE'}</p>
            <p class="text-[10px] text-slate-500 mt-1">${esc(state.cl.doc)}</p>
            <p class="text-[10px] text-slate-500">${getAddr(state.cl)}</p>
        </div>
    </div>
`;

