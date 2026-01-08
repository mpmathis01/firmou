import React from 'react';
import { Search, Loader2, Landmark, UserCheck, UploadCloud, FileText, Hash, Calendar, Pencil, Trash2 } from 'lucide-react';

const InfoTab = ({ formData, updateForm, updateAddress, checkCnpj, checkCep, loading, handleLogoUpload, UFs }) => {
    return (
        <div className="space-y-6 animate-fade-in pb-16">

            {/* 1. CABEÇALHO DO DOCUMENTO (HIPER COMPACTO) */}
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="grid grid-cols-12 gap-6 items-start">
                    {/* Identificação e Datas */}
                    <div className="col-span-12 md:col-span-7 space-y-4">
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                <FileText size={10} /> Tipo de Documento
                            </label>
                            <select
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 h-11 font-bold text-[12px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none appearance-none text-slate-800 dark:text-slate-100"
                                value={formData.docType}
                                onChange={e => updateForm('docType', e.target.value)}
                            >
                                <option value="ORÇAMENTO">ORÇAMENTO</option>
                                <option value="PEDIDO">PEDIDO</option>
                                <option value="RECIBO">RECIBO</option>
                                <option value="PROMISSÓRIA">PROMISSÓRIA</option>
                                <option value="COBRANÇA">COBRANÇA</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6 space-y-1.5">
                                <div className="flex items-center h-5 px-1">
                                    <label className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <Calendar size={10} /> Emissão
                                    </label>
                                </div>
                                <input
                                    type="date"
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 h-10 font-bold text-[10px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100"
                                    value={formData.date}
                                    onChange={e => updateForm('date', e.target.value)}
                                />
                            </div>
                            <div className="col-span-6 space-y-1.5">
                                <div className="flex justify-between items-center h-5 px-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Validade</label>
                                    <div className="relative group/tooltip">
                                        <button
                                            onClick={() => updateForm('showExp', !formData.showExp)}
                                            className={`text-[8px] font-black uppercase px-2 py-0.5 rounded transition-all ${formData.showExp ? 'text-blue-600 bg-blue-50' : 'text-slate-300 bg-slate-100'}`}
                                        >
                                            {formData.showExp ? 'ON' : 'OFF'}
                                        </button>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-900 text-white text-[9px] font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-all whitespace-nowrap shadow-xl z-50">
                                            Exibe ou não a validade no orçamento
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="date"
                                    className={`w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 h-10 font-bold text-[10px] outline-none transition-all text-slate-800 dark:text-slate-100 ${!formData.showExp ? 'opacity-20' : 'focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50'}`}
                                    disabled={!formData.showExp}
                                    value={formData.dateExp}
                                    onChange={e => updateForm('dateExp', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Referência (Largura ainda maior) */}
                    <div className="col-span-12 md:col-span-5 space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">
                            <Hash size={10} /> Ref
                        </label>
                        <input
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-11 font-mono font-black text-blue-600 outline-none text-[16px] text-center focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
                            placeholder="001"
                            value={formData.docNum}
                            onChange={e => updateForm('docNum', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 2. DADOS DO EMISSOR */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <Landmark size={14} className="text-blue-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Dados do Prestador de Serviço</h3>
                    </div>
                    {loading.my && <Loader2 size={12} className="animate-spin text-blue-500" />}
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                    {/* Linha Superior: Logo + CNPJ */}
                    <div className="flex gap-4 items-start">
                        {/* LOGO (Ainda maior para destaque máximo) */}
                        <div className="shrink-0">
                            <div className="group relative w-40 h-40 bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all overflow-hidden shadow-inner">
                                {formData.logo ? (
                                    <>
                                        <img src={formData.logo} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform" />
                                        <div className="absolute inset-x-0 bottom-0 bg-slate-900/90 backdrop-blur-sm h-8 flex border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <button onClick={() => document.getElementById('logo-up').click()} className="flex-1 flex items-center justify-center hover:bg-blue-600 transition-colors border-r border-white/5" title="Alterar Logo">
                                                <Pencil size={12} className="text-white" />
                                            </button>
                                            <button onClick={() => updateForm('logo', null)} className="flex-1 flex items-center justify-center hover:bg-red-600 transition-colors" title="Remover Logo">
                                                <Trash2 size={12} className="text-white" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div onClick={() => document.getElementById('logo-up').click()} className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-slate-750 transition-colors">
                                        <UploadCloud size={28} className="text-slate-300 group-hover:text-blue-500 mb-1" />
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Sua Logo</span>
                                    </div>
                                )}
                            </div>
                            <input id="logo-up" type="file" hidden onChange={handleLogoUpload} />
                        </div>

                        {/* CNPJ + Razão Social (Coluna Direita) */}
                        <div className="flex-1 flex flex-col items-end gap-2">
                            <div className="space-y-2 text-left w-full max-w-sm">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Documento / CPF / CNPJ</label>
                                <div className="relative group">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-11 h-11 font-mono text-[11px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="00.000.000/0000-00"
                                        value={formData.myDoc}
                                        onChange={e => checkCnpj('my', e.target.value)}
                                    />
                                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2 text-left w-full max-w-sm">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Razão Comercial / Empresa</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 h-11 font-black text-[13px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    placeholder="NOME DA EMPRESA"
                                    value={formData.myName}
                                    onChange={e => updateForm('myName', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Endereço (Design Dashboard Otimizado) */}
                    <div className="grid grid-cols-12 gap-x-3 gap-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                        {/* Linha 1: CEP (3) + Rua (7) + Nº (2) */}
                        <div className="col-span-12 md:col-span-3 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">CEP</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 h-10 text-[11px] font-mono outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400" placeholder="00000-000" value={formData.myAddress.cep} onChange={e => checkCep('my', e.target.value)} maxLength={9} />
                        </div>
                        <div className="col-span-12 md:col-span-7 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Rua / Logradouro</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.myAddress.street} onChange={e => updateAddress('my', 'street', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-2 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Nº</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 h-10 text-[11px] outline-none text-center focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" placeholder="S/N" value={formData.myAddress.num} onChange={e => updateAddress('my', 'num', e.target.value)} />
                        </div>

                        {/* Linha 2: Complemento (3) + Bairro (4) + Cidade (4) + UF (1) */}
                        <div className="col-span-12 md:col-span-3 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Complemento</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" placeholder="Apt, Bloco..." value={formData.myAddress.comp} onChange={e => updateAddress('my', 'comp', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-4 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Bairro</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.myAddress.neigh} onChange={e => updateAddress('my', 'neigh', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-4 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Cidade</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.myAddress.city} onChange={e => updateAddress('my', 'city', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-1 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">UF</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-1 h-10 text-[10px] font-black outline-none text-center appearance-none cursor-pointer focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.myAddress.uf} onChange={e => updateAddress('my', 'uf', e.target.value)}>
                                <option value="">-</option>
                                {UFs.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. DADOS DO CLIENTE */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 px-1">
                    <UserCheck size={14} className="text-blue-500" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Dados do Cliente</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                    {/* Linha Superior: Identidade do Cliente (Mesma ordem do Emissor) */}
                    <div className="flex justify-end">
                        <div className="flex-1 flex flex-col items-end gap-2">
                            <div className="space-y-2 text-left w-full max-w-2xl">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Documento / CPF / CNPJ</label>
                                <div className="relative group">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-11 h-11 font-mono text-[11px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="000.000.000-00"
                                        value={formData.clDoc}
                                        onChange={e => checkCnpj('cl', e.target.value)}
                                    />
                                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2 text-left w-full max-w-2xl">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Nome do Cliente / Empresa</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 h-11 font-black text-[13px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    placeholder="NOME DO DESTINATÁRIO"
                                    value={formData.clName}
                                    onChange={e => updateForm('clName', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Endereço do Cliente (Mesma estrutura do Emissor) */}
                    <div className="grid grid-cols-12 gap-x-3 gap-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                        {/* Linha 1: CEP (3) + Rua (7) + Nº (2) */}
                        <div className="col-span-12 md:col-span-3 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">CEP</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 h-10 text-[11px] font-mono outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400" placeholder="00000-000" value={formData.clAddress.cep} onChange={e => checkCep('cl', e.target.value)} maxLength={9} />
                        </div>
                        <div className="col-span-12 md:col-span-7 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Rua / Logradouro</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.clAddress.street} onChange={e => updateAddress('cl', 'street', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-2 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Nº</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 h-10 text-[11px] outline-none text-center focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" placeholder="S/N" value={formData.clAddress.num} onChange={e => updateAddress('cl', 'num', e.target.value)} />
                        </div>

                        {/* Linha 2: Complemento (3) + Bairro (4) + Cidade (4) + UF (1) */}
                        <div className="col-span-12 md:col-span-3 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Complemento</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" placeholder="Apt, Bloco..." value={formData.clAddress.comp} onChange={e => updateAddress('cl', 'comp', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-4 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Bairro</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.clAddress.neigh} onChange={e => updateAddress('cl', 'neigh', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-4 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Cidade</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10 text-[11px] outline-none focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.clAddress.city} onChange={e => updateAddress('cl', 'city', e.target.value)} />
                        </div>
                        <div className="col-span-12 md:col-span-1 space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 block">UF</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-1 h-10 text-[10px] font-black outline-none text-center appearance-none cursor-pointer focus:ring-2 ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100" value={formData.clAddress.uf} onChange={e => updateAddress('cl', 'uf', e.target.value)}>
                                <option value="">-</option>
                                {UFs.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InfoTab;
