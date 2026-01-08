import React, { useState } from 'react';
import { db } from '../../db';

export const SettingsPage = () => {
    const [themeColor, setThemeColor] = useState('#6366f1');

    const handleSave = async () => {
        // Example settings save
        alert('Configurações salvas (Simulação)');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-white">Configurações</h2>

            <div className="glass-card p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Aparência</h3>

                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Cor do Tema</label>
                        <div className="flex space-x-3">
                            {['#6366f1', '#ec4899', '#10b981', '#f59e0b'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setThemeColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 ${themeColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Dados da Empresa (Padrão)</h3>

                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Nome da Empresa</label>
                        <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500" placeholder="Sua Empresa LTDA" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">CNPJ / CPF</label>
                        <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500" placeholder="00.000.000/0001-00" />
                    </div>
                </div>
            </div>

            <button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
                Salvar Alterações
            </button>
        </div>
    );
};
