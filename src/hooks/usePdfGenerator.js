import { useCallback } from 'react';
import html2pdf from 'html2pdf.js';

export const usePdfGenerator = () => {
    const generatePdf = useCallback(async (elementId, filename = 'documento.pdf') => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id ${elementId} not found`);
            return;
        }

        const opt = {
            margin: 0, // Respect internal HTML margins
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(opt).from(element).save();
            return true;
        } catch (error) {
            console.error('PDF Generation failed:', error);
            return false;
        }
    }, []);

    return { generatePdf };
};
