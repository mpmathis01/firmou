import { esc } from './esc.js';

export function showToast(msg, type = 'success') {
    const t = document.getElementById('file-toast');
    if (!t) return;

    t.innerHTML = `
        <div class="relative">
            <button onclick="this.closest('#file-toast').classList.add('hidden')" class="absolute -top-1 -right-1 opacity-50 hover:opacity-100"><i class="fa-solid fa-xmark"></i></button>
            <i class="fa-solid fa-${type === 'error' ? 'circle-exclamation' : 'circle-check'} mr-2"></i> ${esc(msg)}
        </div>
        `;
    t.className = `text-center py-3 px-4 rounded-lg font-bold text-xs mb-4 transition-all duration-500 transform ${type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'} `;

    t.classList.remove('hidden', 'opacity-0', '-translate-y-2');
    t.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        t.classList.remove('opacity-100', 'translate-y-0');
        t.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => t.classList.add('hidden'), 500);
    }, 5000);
}

