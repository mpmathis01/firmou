import { state } from './state.js';
import { loadCities } from './loadCities.js';
import { renderItems } from './renderItems.js';
import { renderPaySplitsUI } from './renderPaySplitsUI.js';
import { renderPreview } from './renderPreview.js';
import { setCol } from './setCol.js';

export function renderAll() {
    try {
        if (document.getElementById('docType')) document.getElementById('docType').value = state.doc.type;
        if (document.getElementById('docNum')) document.getElementById('docNum').value = state.doc.num;
        if (document.getElementById('docDate')) document.getElementById('docDate').value = state.doc.date;
        if (document.getElementById('docDateExp')) document.getElementById('docDateExp').value = state.doc.dateExp || '';
        if (document.getElementById('docShowExp')) document.getElementById('docShowExp').checked = state.doc.showExp || false;

        if (document.getElementById('myName')) document.getElementById('myName').value = state.my.name;
        if (document.getElementById('myDoc')) document.getElementById('myDoc').value = state.my.doc;
        if (document.getElementById('myCep')) document.getElementById('myCep').value = state.my.cep;
        if (document.getElementById('myStreet')) document.getElementById('myStreet').value = state.my.street || '';
        if (document.getElementById('myNum')) document.getElementById('myNum').value = state.my.num || '';
        if (document.getElementById('myComp')) document.getElementById('myComp').value = state.my.comp || '';
        if (document.getElementById('myNeigh')) document.getElementById('myNeigh').value = state.my.neigh || '';
        if (document.getElementById('myUF')) {
            document.getElementById('myUF').value = state.my.uf || '';
            if (state.my.uf) loadCities(state.my.uf, 'myCity', state.my.city);
        }

        if (document.getElementById('clName')) document.getElementById('clName').value = state.cl.name;
        if (document.getElementById('clDoc')) document.getElementById('clDoc').value = state.cl.doc;
        if (document.getElementById('clCep')) document.getElementById('clCep').value = state.cl.cep;
        if (document.getElementById('clStreet')) document.getElementById('clStreet').value = state.cl.street || '';
        if (document.getElementById('clNum')) document.getElementById('clNum').value = state.cl.num || '';
        if (document.getElementById('clComp')) document.getElementById('clComp').value = state.cl.comp || '';
        if (document.getElementById('clNeigh')) document.getElementById('clNeigh').value = state.cl.neigh || '';
        if (document.getElementById('clUF')) {
            document.getElementById('clUF').value = state.cl.uf || '';
            if (state.cl.uf) loadCities(state.cl.uf, 'clCity', state.cl.city);
        }

        if (document.getElementById('payPix')) document.getElementById('payPix').value = state.pay.pix || '';
        if (document.getElementById('payTerms')) document.getElementById('payTerms').value = state.pay.terms || '';
        if (document.getElementById('payNotes')) document.getElementById('payNotes').value = state.pay.notes || '';

        if (state.my.logo) {
            const logoPrev = document.getElementById('logoPrev');
            const logoPlaceholder = document.getElementById('logoPlaceholder');
            if (logoPrev) { logoPrev.src = state.my.logo; logoPrev.classList.remove('hidden'); }
            if (logoPlaceholder) logoPlaceholder.classList.add('hidden');
        }

        // Restaurar fotos
        if (state.photos) {
            for (let i = 0; i < 3; i++) {
                if (state.photos[i] && state.photos[i].src) {
                    const prevEl = document.getElementById(`photo-prev-${i}`);
                    const iconEl = document.getElementById(`photo-icon-${i}`);
                    const capEl = document.getElementById(`photo-cap-${i}`);
                    if (prevEl) {
                        prevEl.src = state.photos[i].src;
                        prevEl.classList.remove('hidden');
                    }
                    if (iconEl) iconEl.classList.add('hidden');
                    if (capEl) capEl.value = state.photos[i].caption || '';
                }
            }
        }

        // Restaurar título da seção de fotos
        const photoTitleEl = document.getElementById('photoSectionTitle');
        if (photoTitleEl) {
            photoTitleEl.value = state.photoSectionTitle || 'Fotos do Local do Serviço / Equipamento';
        }

        // Restaurar checkbox showPhotos
        const showPhotosEl = document.getElementById('showPhotos');
        if (showPhotosEl && state.cfg) {
            showPhotosEl.checked = state.cfg.showPhotos || false;
        }
    } catch (e) {
        console.error("Erro em renderAll (campos):", e);
    }

    setCol(state.cfg.col);
    renderItems();
    renderPaySplitsUI();
    renderPreview();
}
