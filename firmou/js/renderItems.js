import { state } from './state.js';
import { esc } from './esc.js';

export function renderItems() {
    const list = document.getElementById('items-list');
    if (!list) return;
    list.innerHTML = '';

    const items = state.items || [];
    items.forEach((it, idx) => {
        const div = document.createElement('div');
        div.className = "bg-white dark:bg-slate-800 border dark:border-slate-700 p-4 rounded-2xl shadow-sm relative group";

        // Renderizar subitens HTML
        let subHtml = '';
        if (it.sItems && it.sItems.length > 0) {
            subHtml = it.sItems.map(si => `
                <div class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg mt-2 group/sub">
                    <input type="text" placeholder="Subitem" class="flex-1 bg-transparent text-[10px] outline-none" value="${esc(si.d)}" oninput="window.updSubIt(${it.id}, ${si.id}, 'd', this.value)">
                    <input type="number" class="w-12 bg-white dark:bg-slate-600 p-1 rounded text-[10px]" value="${si.q}" oninput="window.updSubIt(${it.id}, ${si.id}, 'q', this.value)">
                    <input type="number" class="w-16 bg-white dark:bg-slate-600 p-1 rounded text-[10px]" value="${si.p}" oninput="window.updSubIt(${it.id}, ${si.id}, 'p', this.value)">
                    <div class="flex items-center gap-1">
                        <input type="checkbox" id="show-sub-${si.id}" ${si.v ? 'checked' : ''} onchange="window.updSubIt(${it.id}, ${si.id}, 'v', this.checked)">
                        <label for="show-sub-${si.id}" class="text-[8px] text-slate-400">PDF</label>
                    </div>
                    <button onclick="window.remSubItem(${it.id}, ${si.id})" class="text-red-400 hover:text-red-600 hidden group-hover/sub:block"><i class="fa-solid fa-trash text-[10px]"></i></button>
                </div>
            `).join('');
        }

        div.innerHTML = `
            <button onclick="window.remItem(${it.id})" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-[10px] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"><i class="fa-solid fa-times"></i></button>
            <div class="space-y-3">
                <input type="text" placeholder="Trabalho Realizado" class="w-full bg-transparent font-bold text-sm outline-none" value="${esc(it.d)}" oninput="window.updIt(${it.id}, 'd', this.value)">
                <div class="flex gap-2">
                    <div class="w-20"><label class="text-[8px] font-black text-slate-400 block uppercase">Qtd</label><input type="number" class="w-full bg-slate-50 dark:bg-slate-700 p-1 rounded text-xs" value="${it.q}" oninput="window.updIt(${it.id}, 'q', this.value)"></div>
                    <div class="flex-1"><label class="text-[8px] font-black text-slate-400 block uppercase">Unitário</label><input type="number" class="w-full bg-slate-50 dark:bg-slate-700 p-1 rounded text-xs" value="${it.p}" oninput="window.updIt(${it.id}, 'p', this.value)"></div>
                    <div class="w-24"><label class="text-[8px] font-black text-slate-400 block uppercase">Total</label><div class="p-1 text-xs font-bold text-slate-400">R$ ${(it.q * it.p).toFixed(2)}</div></div>
                </div>
                
                <div id="sub-list-${it.id}" class="pl-4 border-l-2 border-slate-100 dark:border-slate-700">
                    ${subHtml}
                    <button onclick="window.addSubItem(${it.id})" class="mt-2 text-[10px] font-bold text-blue-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-widest"><i class="fa-solid fa-plus-circle"></i> Adicionar Subitem</button>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

