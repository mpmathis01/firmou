import React from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';

const PaymentsTab = ({ formData, updateForm, addSplit, updateSplit, removeSplit }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="section-title">Pagamento e Termos</h3>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] uppercase font-bold text-slate-500">Forma e Divisao de Pagamento</h3>
                    <button onClick={addSplit} className="text-[9px] bg-blue-500 text-white px-3 py-1.5 rounded shadow uppercase font-bold hover:brightness-110 active:scale-95 transition-all">Incluir Pagamento</button>
                </div>
                {formData.paySplits.map(s => (
                    <div key={s.id} className="group/item relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl mb-4 transition-all hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5">
                        {/* Remove Button */}
                        <button
                            onClick={() => removeSplit(s.id)}
                            className="absolute -top-2 -right-2 bg-red-50 dark:bg-red-950/50 text-red-500 border border-red-100 dark:border-red-900/50 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all hover:bg-red-500 hover:text-white z-20 shadow-lg"
                            title="Remover pagamento"
                        >
                            <Trash2 size={12} />
                        </button>

                        <div className="grid grid-cols-12 gap-4">
                            {/* Description Field */}
                            <div className="col-span-8 space-y-1.5">
                                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Descrição</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-500/30 rounded-xl px-3 h-10 text-[11px] font-black outline-none transition-all"
                                    placeholder="Ex: Sinal, 1ª Parcela..."
                                    value={s.d}
                                    onChange={e => updateSplit(s.id, 'd', e.target.value)}
                                />
                            </div>

                            {/* Percentage Field */}
                            <div className="col-span-4 space-y-1.5">
                                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Porcentagem</label>
                                <div className="relative group">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-500/30 rounded-xl pl-3 pr-7 h-10 text-[11px] font-mono font-black text-center outline-none transition-all"
                                        type="number"
                                        value={s.p}
                                        onChange={e => updateSplit(s.id, 'p', parseFloat(e.target.value))}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">%</span>
                                </div>
                            </div>

                            {/* Payment Method Selector */}
                            <div className={`${s.m === 'CARTÃO CRÉDITO' || s.m === 'PIX' ? 'col-span-8' : 'col-span-12'} space-y-1.5`}>
                                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Meio de Recebimento</label>
                                <select
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-500/30 rounded-xl px-3 h-10 text-[10px] font-black uppercase outline-none transition-all appearance-none cursor-pointer"
                                    value={s.m}
                                    onChange={e => updateSplit(s.id, 'm', e.target.value)}
                                >
                                    <option value="PIX">PIX (Instantâneo)</option>
                                    <option value="DINHEIRO">DINHEIRO (À Vista)</option>
                                    <option value="CARTÃO CRÉDITO">CARTÃO CRÉDITO</option>
                                    <option value="CARTÃO DÉBITO">CARTÃO DÉBITO</option>
                                    <option value="BOLETO">BOLETO BANCÁRIO</option>
                                </select>
                            </div>

                            {/* Extra Settings (QR or Installments) */}
                            {s.m === 'CARTÃO CRÉDITO' && (
                                <div className="col-span-4 space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Parcelas</label>
                                    <select
                                        className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 rounded-xl px-3 h-10 text-[10px] font-black outline-none transition-all appearance-none cursor-pointer"
                                        value={s.inst}
                                        onChange={e => updateSplit(s.id, 'inst', e.target.value)}
                                    >
                                        {['À VISTA', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x', '11x', '12x'].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                </div>
                            )}

                            {s.m === 'PIX' && (
                                <div className="col-span-4 space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Gerar QR</label>
                                    <label className="flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 rounded-xl h-10 cursor-pointer transition-all hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
                                        <input
                                            type="checkbox"
                                            className="w-3 h-3 rounded border-emerald-300 text-emerald-500 focus:ring-emerald-500 bg-transparent"
                                            checked={s.q}
                                            onChange={e => updateSplit(s.id, 'q', e.target.checked)}
                                        />
                                        <span className="text-[10px] font-black uppercase">Exibir</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg flex gap-3 items-start">
                    <div className="text-amber-500 mt-0.5"><AlertCircle size={14} /></div>
                    <p className="text-[10px] text-amber-800 dark:text-amber-200 leading-snug">
                        <span className="font-bold block mb-1">IMPORTANTE:</span> O <b>Firmou.com</b> gera QR Codes estáticos baseados na chave Pix abaixo. Sempre confirme o recebimento no seu banco.
                    </p>
                </div>
            </div>

            <div>
                <label className="lbl">Chave Pix Principal</label>
                <input className="inp" placeholder="Chave PIX (E-mail, Celular, etc)" value={formData.payPix} onChange={e => updateForm('payPix', e.target.value)} />
            </div>
            <div>
                <label className="lbl">Termos e Condições</label>
                <textarea className="inp h-20" placeholder="Termos e Condições (ex: Pagamento em 3x)" value={formData.payTerms} onChange={e => updateForm('payTerms', e.target.value)} />
            </div>
            <div>
                <label className="lbl">Garantia e Observações Adicionais</label>
                <textarea className="inp h-20" placeholder="Observações Extras (ex: Garantia de 90 dias)" value={formData.payNotes} onChange={e => updateForm('payNotes', e.target.value)} />
            </div>
        </div>
    );
};

export default PaymentsTab;
