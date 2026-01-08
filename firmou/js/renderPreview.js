import { state } from './state.js';
import { fmt } from './fmt.js';
import { getHeader } from './getHeader.js';
import { getFooter } from './getFooter.js';
import { getPhotosPreview } from './getPhotosPreview.js';
import { getTableHeader } from './getTableHeader.js';
import { getPaySection } from './getPaySection.js';
import { genQR } from './genQR.js';
import { esc } from './esc.js';

let renderTimer = null;

export async function renderPreview() {
    // Debounce to prevent multiple fast calls
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(async () => {
        await _renderPreviewInternal();
    }, 50);
}

async function _renderPreviewInternal() {
    const root = document.getElementById('pdf-root');
    if (!root) {
        console.error('❌ pdf-root not found!');
        return;
    }

    console.log('✅ pdf-root found, starting render...');

    // 1. Preload Function
    const preload = (src) => new Promise((resolve) => {
        if (!src) return resolve();
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    });

    // 2. Gather images
    const promises = [];
    if (state.my.logo) promises.push(preload(state.my.logo));
    if (state.cfg.showPhotos && state.photos) {
        state.photos.forEach(p => { if (p.src) promises.push(preload(p.src)); });
    }
    await Promise.all(promises);

    root.innerHTML = '';
    root.className = 'relative';

    console.log('📊 Calculating total...');

    const total = state.items.reduce((acc, i) => {
        let sum = acc + (i.q * i.p);
        if (i.sItems) sum += i.sItems.reduce((s, si) => si.v ? s + (si.q * si.p) : s, 0);
        return sum;
    }, 0);

    console.log('💰 Total:', total, '| Items:', state.items.length);

    // --- PAGINATION ENGINE ---
    let currPage, currContent, pageLimit;

    function newPage() {
        const p = document.createElement('div');
        p.className = `a4-container ${state.cfg.tpl} relative flex flex-col`;
        p.innerHTML = getHeader() + `<div class="content-area flex flex-col"></div>` + getFooter();
        root.appendChild(p);
        currPage = p;
        currContent = p.querySelector('.content-area');

        // Calculate available space more safely
        const a4HeightPx = 297 * 3.78; // A4 height in pixels
        const headerHeight = 80; // Approximate header height
        const footerHeight = 60; // Approximate footer height
        const padding = 40;

        pageLimit = a4HeightPx - headerHeight - footerHeight - padding;

        console.log('✅ Page created! Limit:', pageLimit);
    }

    function append(htmlOrEl, isTableRow = false) {
        const tmp = document.createElement('div');
        if (typeof htmlOrEl === 'string') tmp.innerHTML = htmlOrEl;
        else tmp.appendChild(htmlOrEl);
        const el = tmp.firstElementChild;
        if (!el) return;

        currContent.appendChild(el);
        const usedHeight = currContent.scrollHeight;

        if (usedHeight > pageLimit && currContent.children.length > 1) {
            currContent.removeChild(el);
            newPage();
            if (isTableRow) append(getTableHeader());
            append(el);
        }
    }

    // Start Rendering
    newPage();
    const photosHtml = getPhotosPreview();
    if (photosHtml) append(photosHtml);
    append(getTableHeader());

    state.items.forEach(i => {
        let rowHtml = `
            <div class="border-b border-slate-50 text-xs py-2 break-inside-avoid">
                <div class="flex items-center">
                    <div class="flex-1 font-medium text-left">${esc(i.d) || '---'}</div>
                    <div class="w-16 text-center">${i.q}</div>
                    <div class="w-24 text-right">${fmt(i.p)}</div>
                    <div class="w-24 text-right font-bold">${fmt(i.p * i.q)}</div>
                </div>
        `;
        if (i.sItems) {
            i.sItems.forEach(si => {
                if (si.v) {
                    rowHtml += `
                        <div class="flex items-center mt-1 pt-1 border-t border-slate-50/50 bg-slate-50/30 rounded px-2">
                            <div class="flex-1 py-1 pl-4 text-[10px] text-slate-500 italic">↳ ${esc(si.d) || 'Subitem'}</div>
                            <div class="w-16 text-center text-slate-400 text-[10px]">${si.q}</div>
                            <div class="w-24 text-right text-slate-400 text-[10px]">${fmt(si.p)}</div>
                            <div class="w-24 text-right text-slate-500 text-[10px]">${fmt(si.p * si.q)}</div>
                        </div>
                    `;
                }
            });
        }
        rowHtml += `</div>`;
        append(rowHtml, true);
    });

    append(getPaySection(total));

    // Restore Styles
    root.querySelectorAll('.content-area').forEach(ca => {
        ca.classList.add('flex-1', 'flex', 'flex-col');
    });

    if (typeof genQR === 'function') setTimeout(() => genQR(total), 150);

    // Refresh preview controller after rendering
    if (window.refreshPreview) {
        setTimeout(() => window.refreshPreview(), 200);
    }
}

