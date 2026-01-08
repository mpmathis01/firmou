import { state, save } from './state.js';
import { renderPreview } from './renderPreview.js';

export function upd() {
    state.doc.type = document.getElementById('docType').value;
    state.doc.num = document.getElementById('docNum').value;
    state.doc.date = document.getElementById('docDate').value;
    if (document.getElementById('docDateExp')) state.doc.dateExp = document.getElementById('docDateExp').value;
    if (document.getElementById('docShowExp')) state.doc.showExp = document.getElementById('docShowExp').checked;

    state.my.name = document.getElementById('myName').value;
    state.my.doc = document.getElementById('myDoc').value;
    state.my.cep = document.getElementById('myCep').value;
    state.my.street = document.getElementById('myStreet').value;
    state.my.num = document.getElementById('myNum').value;
    state.my.neigh = document.getElementById('myNeigh').value;
    state.my.comp = document.getElementById('myComp').value;
    state.my.city = document.getElementById('myCity').value;
    state.my.uf = document.getElementById('myUF').value;

    state.cl.name = document.getElementById('clName').value;
    state.cl.doc = document.getElementById('clDoc').value;
    state.cl.cep = document.getElementById('clCep').value;
    state.cl.street = document.getElementById('clStreet').value;
    state.cl.num = document.getElementById('clNum').value;
    state.cl.neigh = document.getElementById('clNeigh').value;
    state.cl.comp = document.getElementById('clComp').value;
    state.cl.city = document.getElementById('clCity').value;
    state.cl.uf = document.getElementById('clUF').value;

    state.pay.pix = document.getElementById('payPix').value;
    state.pay.terms = document.getElementById('payTerms').value;
    state.pay.notes = document.getElementById('payNotes').value;

    // Capturar legendas das fotos
    for (let i = 0; i < 3; i++) {
        const capEl = document.getElementById(`photo-cap-${i}`);
        if (capEl && state.photos[i]) {
            state.photos[i].caption = capEl.value;
        }
    }

    // Capturar título da seção de fotos
    const photoTitleEl = document.getElementById('photoSectionTitle');
    if (photoTitleEl) {
        state.photoSectionTitle = photoTitleEl.value;
    }

    // Capturar checkbox showPhotos
    const showPhotosEl = document.getElementById('showPhotos');
    if (showPhotosEl) {
        state.cfg.showPhotos = showPhotosEl.checked;
    }

    save();
    renderPreview();
}
