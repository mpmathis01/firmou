import { state, setState, save, APP_VERSION, FAKE_DATA } from './state.js';
import { renderAll } from './renderAll.js';
import { renderTemplates } from './renderTemplates.js';
import { checkCookieBar } from './checkCookieBar.js';
import { loadUFs } from './loadUFs.js';
import { upd } from './upd.js';
import { switchTab } from './switchTab.js';
import { setMobileTab } from './setMobileTab.js';
import { handleLogo } from './handleLogo.js';
import { handlePhoto } from './handlePhoto.js';
import { setCol } from './setCol.js';
import { addItem } from './addItem.js';
import { updIt } from './updIt.js';
import { remItem } from './remItem.js';
import { addSubItem } from './addSubItem.js';
import { updSubIt } from './updSubIt.js';
import { remSubItem } from './remSubItem.js';
import { setTemplate } from './setTemplate.js';
import { clearFakeData } from './clearFakeData.js';
import { toggleDarkMode } from './toggleDarkMode.js';
import { resetData } from './resetData.js';
import { closePrivacy } from './closePrivacy.js';
import { showPrivacy } from './showPrivacy.js';
import { adjZoom } from './adjZoom.js';
import { addPaySplit } from './addPaySplit.js';
import { updPaySplit } from './updPaySplit.js';
import { remPaySplit } from './remPaySplit.js';
import { generatePDF } from './generatePDF.js';
import { exportTXT } from './exportTXT.js';
import { importTXT } from './importTXT.js';
import { maskCep } from './maskCep.js';
import { checkAPISearch } from './checkAPISearch.js';
import { saveConsent } from './saveConsent.js';
import { loadCities } from './loadCities.js';
import { initPreviewController, refreshPreview } from './previewController.js';

window.onload = () => {
    try {
        const saved = localStorage.getItem('firmou_store');
        if (saved) {
            const data = JSON.parse(saved);
            state.doc = { ...state.doc, ...(data.doc || {}) };
            state.my = { ...state.my, ...(data.my || {}) };
            state.cl = { ...state.cl, ...(data.cl || {}) };
            state.pay = { ...state.pay, ...(data.pay || {}) };
            state.cfg = { ...state.cfg, ...(data.cfg || {}) };
            state.items = data.items || state.items;
            state.photos = data.photos || state.photos;
            state.photoSectionTitle = data.photoSectionTitle || state.photoSectionTitle;

            document.getElementById('alert-fake').classList.add('hidden');
            checkVersion();
        } else {
            setState({ ...state, ...FAKE_DATA });
        }
        loadUFs();
        renderTemplates();
        renderAll();
        checkCookieBar();
        if (state.cfg.dark) document.documentElement.classList.add('dark');

        // Initialize premium preview controller
        setTimeout(() => initPreviewController(), 500);
    } catch (e) {
        console.error("Erro ao carregar estado:", e);
        setState({ ...state, ...FAKE_DATA });
        renderAll();
    }
}

function checkVersion() {
    const lastV = localStorage.getItem('firmou_ver');
    if (lastV && lastV !== APP_VERSION) document.getElementById('update-banner').classList.remove('hidden');
    localStorage.setItem('firmou_ver', APP_VERSION);
}

// Expose functions to global scope for HTML onclick handlers
window.upd = upd;
window.switchTab = switchTab;
window.setMobileTab = setMobileTab;
window.handleLogo = handleLogo;
window.handlePhoto = handlePhoto;
window.setCol = setCol;
window.addItem = addItem;
window.updIt = updIt;
window.remItem = remItem;
window.addSubItem = addSubItem;
window.updSubIt = updSubIt;
window.remSubItem = remSubItem;
window.setTemplate = setTemplate;
window.clearFakeData = clearFakeData;
window.toggleDarkMode = toggleDarkMode;
window.resetData = resetData;
window.closePrivacy = closePrivacy;
window.showPrivacy = showPrivacy;
window.adjZoom = adjZoom;
window.addPaySplit = addPaySplit;
window.updPaySplit = updPaySplit;
window.remPaySplit = remPaySplit;
window.generatePDF = generatePDF;
window.exportTXT = exportTXT;
window.importTXT = importTXT;
window.maskCep = maskCep;
window.checkAPISearch = checkAPISearch;
window.saveConsent = saveConsent;
window.loadCities = loadCities;
window.refreshPreview = refreshPreview;
