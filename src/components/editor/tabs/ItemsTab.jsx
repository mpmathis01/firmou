import React from 'react';
import { Plus, Trash2, CornerDownRight, Eye, EyeOff } from 'lucide-react';

const ItemsTab = ({ formData, addItem, updateItem, removeItem, addSubItem, updateSubItem, removeSubItem, calculateTotal }) => {
    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Itens e Serviços</span>
                <button onClick={addItem} className="text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all" style={{ backgroundColor: formData.primaryColor }}>
                    <Plus size={14} /> Novo
                </button>
            </div>
            <div className="space-y-4">
                {formData.items.map(item => (
                    <div key={item.id} className="bg-white dark:bg-slate-700/30 border dark:border-slate-600 p-3 rounded-xl relative group">
                        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors" title="Remover Item">
                                <Trash2 size={12} />
                            </button>
                        </div>

                        <div className="flex gap-3 items-end mb-2">
                            <div className="flex-1">
                                <label className="lbl-mini">Descrição do Item / Serviço</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 h-10 text-[11px] font-bold focus:outline-none placeholder-slate-400 focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all font-outfit" placeholder="O que está sendo cobrado?" value={item.d} onChange={e => updateItem(item.id, 'd', e.target.value)} />
                            </div>

                            <div className="w-16">
                                <label className="lbl-mini text-left block w-full ml-1">QTD</label>
                                <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-10 text-[11px] text-center outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all font-mono" value={item.q} onChange={e => updateItem(item.id, 'q', parseFloat(e.target.value))} />
                            </div>
                            <div className="w-28">
                                <label className="lbl-mini text-left block w-full ml-1">VALOR</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">R$</span>
                                    <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-2 h-10 text-[11px] text-right outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all font-mono" value={item.val} onChange={e => updateItem(item.id, 'val', parseFloat(e.target.value))} />
                                </div>
                            </div>
                        </div>

                        {/* SUB-ITENS */}
                        <div className="pl-6 border-l-2 border-slate-100 dark:border-slate-700 mt-4 space-y-3">
                            {item.sItems && item.sItems.map(si => (
                                <div key={si.id} className="grid grid-cols-12 gap-2 items-end bg-slate-50/50 dark:bg-slate-800/30 p-2 rounded-lg border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
                                    <div className={`${si.v ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-10'} space-y-1`}>
                                        <div className="flex items-center gap-1">
                                            <CornerDownRight size={10} className="text-slate-300" />
                                            <label className="text-[8px] font-black uppercase tracking-wider text-slate-400">Descrição do Sub-item</label>
                                        </div>
                                        <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 h-8 text-[11px] outline-none focus:ring-2 ring-blue-500/5 focus:border-blue-500/30 transition-all font-medium" placeholder="Detalhe adicional..." value={si.d} onChange={e => updateSubItem(item.id, si.id, 'd', e.target.value)} />
                                    </div>

                                    {si.v && (
                                        <>
                                            <div className="col-span-4 md:col-span-2 space-y-1">
                                                <label className="text-[8px] font-black uppercase tracking-wider text-slate-400 block w-full text-left ml-1">Qtd</label>
                                                <input type="number" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md h-8 text-[11px] text-center outline-none font-mono" value={si.q} onChange={e => updateSubItem(item.id, si.id, 'q', parseFloat(e.target.value))} />
                                            </div>

                                            <div className="col-span-4 md:col-span-2 space-y-1">
                                                <label className="text-[8px] font-black uppercase tracking-wider text-slate-400 block w-full text-left ml-1">Valor</label>
                                                <div className="relative">
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">R$</span>
                                                    <input type="number" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md pl-6 pr-2 h-8 text-[11px] text-right outline-none font-mono" value={si.val} onChange={e => updateSubItem(item.id, si.id, 'val', parseFloat(e.target.value))} />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className={`${si.v ? 'col-span-4 md:col-span-2' : 'col-span-12 md:col-span-2'} flex items-center justify-end gap-3 pb-1.5`}>
                                        <div onClick={() => updateSubItem(item.id, si.id, 'v', !si.v)} className="cursor-pointer text-slate-400 hover:text-blue-500 transition-colors" title="Visibilidade de [Qtd] e [ Valor]">
                                            {si.v ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </div>
                                        <button onClick={() => removeSubItem(item.id, si.id)} className="text-slate-300 hover:text-red-500 transition-colors" title="Remover">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addSubItem(item.id)} className="text-[10px] text-blue-500 font-bold flex gap-1 uppercase tracking-widest mt-2 hover:text-blue-600 transition-colors">
                                <Plus size={10} /> Novo Sub-item
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center mt-4 shadow-xl border border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Total Geral</span>
                <span className="text-xl font-black font-outfit" style={{ color: formData.primaryColor }}>
                    {calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
            </div>
        </div>
    );
};

export default ItemsTab;
