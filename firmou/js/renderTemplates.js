import { state } from './state.js';

export const templates = [
    { id: 'tpl-clean', name: 'Clean', desc: 'Minimalista', icon: 'fa-sparkles' },
    { id: 'tpl-industrial', name: 'Industrial', desc: 'Construção', icon: 'fa-hammer' },
    { id: 'tpl-elegant', name: 'Elegant', desc: 'Artesãos', icon: 'fa-gem' },
    { id: 'tpl-tech', name: 'Tech', desc: 'TI', icon: 'fa-microchip' },
    { id: 'tpl-modern', name: 'Modern', desc: 'Startups', icon: 'fa-rocket' },
    { id: 'tpl-corporate', name: 'Corporate', desc: 'B2B', icon: 'fa-building' },
    { id: 'tpl-bold', name: 'Bold', desc: 'Impacto', icon: 'fa-bolt' },
    { id: 'tpl-pastel', name: 'Pastel', desc: 'Beleza', icon: 'fa-heart' },
    { id: 'tpl-dark', name: 'Dark', desc: 'Gaming', icon: 'fa-moon' },
    { id: 'tpl-handwritten', name: 'Handwritten', desc: 'Artesanal', icon: 'fa-pen-fancy' }
];

export function renderTemplates() {
    const grid = document.getElementById('tpl-grid');
    if (!grid) return;
    grid.innerHTML = templates.map(t => `
        <div onclick="window.setTemplate('${t.id}')" 
             class="tpl-card cursor-pointer border-2 p-4 rounded-xl hover:border-blue-500 transition-all ${state.cfg.tpl === t.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700'}"
             data-tpl="${t.id}">
            <div class="flex items-center gap-2 mb-2">
                <i class="fa-solid ${t.icon} text-lg" style="color:var(--accent-color)"></i>
                <div class="font-bold text-sm">${t.name}</div>
            </div>
            <div class="text-[10px] text-slate-500">${t.desc}</div>
        </div>
    `).join('');
}
