import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import DOMPurify from 'dompurify'; // Assuming it's available or I'll simple render
import { PRIVACY_POLICY } from './LegalContent';

// Simple markdown parser for the policy text (to avoid heavy deps just for this)
const parseMarkdown = (text) => {
    return text
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mb-6 mt-2 text-slate-900 dark:text-white">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-4 mt-8 text-slate-800 dark:text-slate-100">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-3 mt-6 text-slate-700 dark:text-slate-200">$1</h3>')
        .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2 text-slate-600 dark:text-slate-400 list-disc">$1</li>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-slate-900 dark:text-slate-200">$1</strong>')
        .replace(/`([^`]*)`/gim, '<code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
        .replace(/\n$/gim, '<br />'); // Simple newline handling
};

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Convert newlines to paragraphs broadly
    const htmlContent = PRIVACY_POLICY.split('\n\n').map(block => {
        if (block.startsWith('#')) return parseMarkdown(block);
        return `<p class="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">${parseMarkdown(block)}</p>`;
    }).join('');

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 max-h-[90vh]">

                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600 dark:text-amber-400">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Política de Privacidade</h2>
                            <p className="text-sm text-slate-500 font-medium">Transparência total com seus dados</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-4 rounded-xl text-sm hover:scale-[1.01] transition-transform active:scale-95 shadow-lg uppercase tracking-widest"
                    >
                        Entendi e Concordo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
