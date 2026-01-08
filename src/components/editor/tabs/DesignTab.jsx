import React from 'react';
import { Plus } from 'lucide-react';

const DesignTab = ({ formData, updateForm, TEMPLATES }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="section-title">Cores do Tema</h3>
            <div className="flex gap-2 flex-wrap">
                {['#fbbf24', '#2563eb', '#059669', '#0f172a', '#ec4899', '#8b5cf6', '#dc2626', '#10b981', '#6366f1'].map(c => (
                    <div
                        key={c}
                        onClick={() => updateForm('primaryColor', c)}
                        className={`w-8 h-8 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110 ${formData.primaryColor === c ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                        style={{ backgroundColor: c, border: formData.primaryColor === c ? '2px solid white' : 'none' }}
                    />
                ))}
                <div className={`relative w-8 h-8 rounded-full overflow-hidden shadow-lg border-2 cursor-pointer flex items-center justify-center bg-white transition-all ${!['#fbbf24', '#2563eb', '#059669', '#0f172a', '#ec4899', '#8b5cf6', '#dc2626', '#10b981', '#6366f1'].includes(formData.primaryColor) ? 'ring-2 ring-offset-2 ring-slate-400 border-white' : 'border-slate-200'}`}
                    style={{ backgroundColor: !['#fbbf24', '#2563eb', '#059669', '#0f172a', '#ec4899', '#8b5cf6', '#dc2626', '#10b981', '#6366f1'].includes(formData.primaryColor) ? formData.primaryColor : 'white' }}
                >
                    {!['#fbbf24', '#2563eb', '#059669', '#0f172a', '#ec4899', '#8b5cf6', '#dc2626', '#10b981', '#6366f1'].includes(formData.primaryColor) ? null : (
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 opacity-50 pointer-events-none" />
                    )}
                    <input
                        type="color"
                        className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
                        value={formData.primaryColor}
                        onChange={e => updateForm('primaryColor', e.target.value)}
                    />
                    {!['#fbbf24', '#2563eb', '#059669', '#0f172a', '#ec4899', '#8b5cf6', '#dc2626', '#10b981', '#6366f1'].includes(formData.primaryColor) ? null : (
                        <Plus size={12} className="text-slate-500 z-10 pointer-events-none" />
                    )}
                </div>
            </div>

            <h3 className="section-title">Modelo de Documento</h3>
            <div className="grid grid-cols-2 gap-4">
                {TEMPLATES.map(tpl => (
                    <div
                        key={tpl.id}
                        onClick={() => updateForm('templateId', tpl.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 ${formData.templateId === tpl.id ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 shadow-md' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                        <div className="text-slate-700 dark:text-slate-300">{tpl.icon}</div>
                        <span className="text-xs font-bold text-center">{tpl.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignTab;
