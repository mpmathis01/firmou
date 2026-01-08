import { state } from './state.js';
import { esc } from './esc.js';

export const getPhotosPreview = () => {
    if (!state.cfg.showPhotos || !state.photos || !state.photos.some(p => p.src)) return '';
    return `
        <div class="mb-4">
            <h3 class="text-xs font-bold text-slate-400 uppercase mb-2 border-b pb-1">${esc(state.photoSectionTitle) || 'Fotos do Local do Serviço / Equipamento'}</h3>
            <div class="grid grid-cols-3 gap-3">
                ${state.photos.filter(p => p.src).map(p => `
                    <div class="border rounded-lg p-2 bg-slate-50">
                        <img src="${p.src}" class="w-full max-h-32 object-contain rounded">
                        ${p.caption ? `<p class="text-[8px] text-center mt-2 text-slate-600">${esc(p.caption)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

