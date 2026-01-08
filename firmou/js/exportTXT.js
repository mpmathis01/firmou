import { state } from './state.js';
import { showProgress } from './showProgress.js';
import { updateProgress } from './updateProgress.js';
import { hideProgress } from './hideProgress.js';
import { showToast } from './showToast.js';

export function exportTXT() {
    const defaultName = `Backup_Firmou_${state.doc.num} `;
    const fileName = prompt("Digite o nome do arquivo (opcional):", defaultName);
    if (fileName === null) return;

    showProgress();

    let p = 0;
    const int = setInterval(() => {
        p += 20;
        updateProgress(p);
        if (p >= 100) {
            clearInterval(int);
            const blob = new Blob([JSON.stringify(state)], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${fileName || defaultName}.txt`;
            a.click();
            hideProgress();
            showToast("Exportado com sucesso!");
        }
    }, 150);
}
