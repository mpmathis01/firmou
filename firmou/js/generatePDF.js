import { state } from './state.js';

export function generatePDF() {
    const root = document.getElementById('pdf-root');
    const modal = document.getElementById('progress-modal');

    // Mostra feedback visual
    if (modal) modal.classList.remove('hidden');

    // Reseta o zoom temporariamente para garantir que o PDF capture o tamanho real
    const originalTransform = root.style.transform;
    root.style.transform = 'scale(1)';

    const opt = {
        margin: [0, 0, 0, 0],
        filename: `Firmou_${state.doc.type}_${state.doc.num}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(root).toPdf().get('pdf').save().then(() => {
        // Restaura o zoom e esconde modal
        root.style.transform = originalTransform;
        if (modal) modal.classList.add('hidden');
    }).catch(err => {
        console.error("Erro ao gerar PDF:", err);
        root.style.transform = originalTransform;
        if (modal) modal.classList.add('hidden');
    });
}

