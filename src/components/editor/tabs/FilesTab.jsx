import React, { useState } from 'react';
import { FolderOpen, Download, Loader2 } from 'lucide-react';

const FilesTab = ({ formData, exportTXT, importTXT, resetData, fileInputRef, toast }) => {
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const simulateProgress = (callback, fileEvent = null) => {
        setIsProcessing(true);
        setProgress(0);
        let val = 0;
        const interval = setInterval(() => {
            val += Math.random() * 30;
            if (val >= 100) {
                val = 100;
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    if (fileEvent) callback(fileEvent);
                    else callback();
                    setIsProcessing(false);
                    setTimeout(() => setProgress(0), 500);
                }, 400);
            } else {
                setProgress(val);
            }
        }, 150);
    };

    return (
        <div className="p-8 text-center border-dashed border-2 rounded-xl animate-fade-in border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20 relative overflow-hidden">
            <FolderOpen size={40} className={`mx-auto mb-4 transition-all duration-500 ${isProcessing ? 'text-blue-500 scale-110 animate-bounce' : 'text-slate-300'}`} />

            {toast && (
                <div className="bg-green-500 text-white p-2 rounded mb-4 text-xs font-bold text-center animate-fade-in shadow-lg">
                    {toast}
                </div>
            )}

            <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2 font-outfit uppercase tracking-wider text-sm">Gerenciar Seus Documentos</h4>
            <p className="text-[12px] text-slate-400 mb-6 font-medium leading-relaxed px-4">Salve e organize seus documentos localmente. <br /> O Firmou processa tudo de forma privada no seu dispositivo.</p>

            {/* Progress Bar Section */}
            {(progress > 0 || isProcessing) && (
                <div className="mb-4 px-2 animate-fade-in">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
                            <Loader2 size={10} className="animate-spin" />
                            {progress < 100 ? 'Processando Dados...' : 'Finalizado!'}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-blue-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            <button
                onClick={() => simulateProgress(exportTXT)}
                disabled={isProcessing}
                className={`btn-primary w-full flex gap-2 justify-center items-center mb-4 uppercase tracking-[0.2em] text-[10px] py-4 transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}
            >
                <Download size={16} /> {isProcessing ? 'Exportando...' : 'Exportar Documento (.firmou)'}
            </button>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => fileInputRef.current.click()}
                    disabled={isProcessing}
                    className={`text-blue-500 text-[10px] font-black hover:underline uppercase tracking-[0.15em] ${isProcessing ? 'opacity-30' : ''}`}
                >
                    Abrir Documento
                </button>
                <div className="w-[1px] h-3 bg-slate-200 dark:bg-slate-700 self-center"></div>
                <button
                    onClick={resetData}
                    disabled={isProcessing}
                    className={`text-red-400 text-[10px] font-black hover:underline uppercase tracking-[0.15em] ${isProcessing ? 'opacity-30' : ''}`}
                >
                    Limpar Editor
                </button>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept=".firmou"
                hidden
                onChange={(e) => simulateProgress(importTXT, e)}
            />
        </div>
    );
};

export default FilesTab;
