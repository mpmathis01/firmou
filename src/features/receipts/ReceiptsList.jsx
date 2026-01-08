import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db';
import { Plus, FileText, Trash2, Edit2, Share2, Printer } from 'lucide-react';
import { ReceiptTemplate } from '../../components/pdf/ReceiptTemplate';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { createRoot } from 'react-dom/client';

import { ReceiptFormModal } from './components/ReceiptFormModal';

export const ReceiptsList = () => {
    const receipts = useLiveQuery(() => db.orcamentos.toArray());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { generatePdf } = usePdfGenerator();

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            await db.orcamentos.delete(id);
        }
    };

    const handlePrint = async (receipt) => {
        // Create a hidden container to render the clean template
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.id = 'print-temp-container';
        document.body.appendChild(container);

        const root = createRoot(container);
        // Map db fields to template fields
        const templateData = {
            id: receipt.id,
            date: receipt.data,
            amount: receipt.total,
            clientName: receipt.cliente,
            clientDoc: receipt.documento || '',
            description: receipt.descricao || 'Serviços prestados',
            issuerName: 'Minha Empresa', // TODO: Get from configs
            issuerDoc: '00.000.000/0001-00' // TODO: Get from configs
        };

        root.render(<ReceiptTemplate data={templateData} />);

        // Wait for render (small timeout)
        setTimeout(async () => {
            const success = await generatePdf('print-temp-container', `Recibo-${receipt.id}.pdf`);
            if (success) {
                // Clean up
                root.unmount();
                document.body.removeChild(container);
            }
        }, 500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Meus Recibos</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Plus size={18} />
                    <span>Novo Recibo</span>
                </button>
            </div>

            {isFormOpen && (
                <ReceiptFormModal
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <div className="grid gap-4">
                {receipts?.map(receipt => (
                    <div key={receipt.id} className="glass-card p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center group">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{receipt.cliente || 'Cliente Sem Nome'}</h3>
                                <p className="text-sm text-slate-400">#{receipt.id} • {receipt.data}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right mr-4">
                                <p className="font-bold text-white text-lg">R$ {receipt.total}</p>
                                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">Pago</span>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handlePrint(receipt)}
                                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Gerar PDF"
                                >
                                    <Printer size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(receipt.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {!receipts?.length && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Nenhum recibo encontrado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
