import { setState, save } from './state.js';
import { renderAll } from './renderAll.js';
import { showProgress } from './showProgress.js';
import { updateProgress } from './updateProgress.js';
import { hideProgress } from './hideProgress.js';
import { showToast } from './showToast.js';

export function importTXT(e) {
    const f = e.target.files[0]; if (!f) return;
    showProgress();

    const r = new FileReader();
    r.onprogress = (ev) => {
        if (ev.lengthComputable) {
            const pct = Math.round((ev.loaded / ev.total) * 100);
            updateProgress(pct);
        }
    };
    r.onload = (ev) => {
        try {
            const data = JSON.parse(ev.target.result);
            setState(data);
            renderAll();
            save();
            showToast("Importado com sucesso!");
        } catch (err) {
            showToast("Erro ao importar!", 'error');
        } finally {
            hideProgress();
        }
    };
    r.readAsText(f);
}
