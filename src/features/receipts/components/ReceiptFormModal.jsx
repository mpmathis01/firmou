import React, { useState, useEffect } from 'react';
import { db } from '../../../db';
import { X, Save, Plus } from 'lucide-react';

export const ReceiptFormModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientDoc: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db.orcamentos.add({
                cliente: formData.clientName,
                documento: formData.clientDoc,
                total: formData.amount,
                descricao: formData.description,
                data: new Date(formData.date).toLocaleDateString('pt-BR'),
                status: 'Emitido',
                created_at: new Date()
            });
            onSuccess?.();
            onClose();
        } catch (error) {
            alert('Erro ao salvar: ' + error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                    <h2 className="text-xl font-bold text-white">Novo Recibo</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Cliente</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Ex: João Silva"
                            value={formData.clientName}
                            onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">CPF / CNPJ</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="000.000.000-00"
                                value={formData.clientDoc}
                                onChange={e => setFormData({ ...formData, clientDoc: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Valor (R$)</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="0,00"
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Data</label>
                        <input
                            required
                            type="date"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Descrição do Serviço</label>
                        <textarea
                            required
                            rows="4"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                            placeholder="Descreva os serviços prestados..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                            <Save size={20} />
                            <span>Emitir Recibo</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
