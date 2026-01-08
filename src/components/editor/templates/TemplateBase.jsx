import React from 'react';

const TemplateLayout = ({ children, formData, zoom }) => (
    <div
        id="pdf-content-area"
        className={`a4-container tpl-${formData.templateId} transition-all duration-500`}
        style={{
            transform: `scale(${zoom})`,
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: 'white',
            '--color-accent': formData.primaryColor
        }}
    >
        {/* Header */}
        <div className="p-[15mm] pb-8 print:fixed print:top-0 print:left-0 print:right-0 print:z-50">
            <Header formData={formData} />
        </div>

        {/* Conteúdo que flui */}
        <div className="px-[15mm] text-slate-800">
            {children}
        </div>

        {/* Footer */}
        <div className="p-[15mm] pt-8 mt-auto print:fixed print:bottom-0 print:left-0 print:right-0 print:z-50">
            <Footer />
        </div>
    </div>
);

const Header = ({ formData }) => (
    <div className="flex justify-between items-end border-b-4 pb-8 mb-10" style={{ borderColor: formData.primaryColor }}>
        <div className="flex gap-6 items-center">
            {formData.logo ? (
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <img src={formData.logo} className="h-20 w-20 object-contain" />
                </div>
            ) : (
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform -rotate-12" style={{ backgroundColor: formData.primaryColor }}>
                    {formData.myName.charAt(0) || 'F'}
                </div>
            )}
            <div>
                <h1 className="text-5xl font-black uppercase font-outfit tracking-tighter leading-none" style={{ color: formData.primaryColor }}>{formData.docType}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Documento Nº</span>
                    <p className="text-base font-black text-slate-400 font-mono tracking-tighter">{formData.docNum || '---'}</p>
                </div>
            </div>
        </div>
        <div className="text-right flex flex-col items-end">
            <h2 className="text-2xl font-black uppercase font-outfit leading-tight tracking-tight text-slate-900">{formData.myName || 'Sua Empresa'}</h2>
            <p className="text-xs text-slate-400 font-bold font-mono mt-1 tracking-widest">{formData.myDoc}</p>
        </div>
    </div>
);

const Info = ({ formData }) => (
    <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="w-6 h-1 rounded-full" style={{ backgroundColor: formData.primaryColor }} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-outfit">Destinatário</span>
            </div>
            <div className="pl-2 border-l-2 border-slate-50">
                <h3 className="text-xl font-black font-outfit text-slate-900 leading-tight">{formData.clName || 'Cliente não identificado'}</h3>
                <p className="text-xs text-slate-500 font-bold mt-2 font-mono">{formData.clDoc}</p>
                <div className="text-[11px] text-slate-400 font-medium mt-3 leading-relaxed max-w-[280px]">
                    {[formData.clAddress.street, formData.clAddress.num].filter(Boolean).join(', ')}
                    {formData.clAddress.neigh && <><br />{formData.clAddress.neigh}</>}
                    {formData.clAddress.city && <><br />{formData.clAddress.city} - {formData.clAddress.uf}</>}
                </div>
            </div>
        </div>

        <div className="flex flex-col items-end space-y-6">
            <div className="text-right">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 font-outfit">Datas Importantes</p>
                <div className="space-y-3">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Emissão</span>
                        <p className="font-mono font-black text-slate-800 text-lg tracking-tighter">{new Date(formData.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    {formData.showExp && (
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-amber-500 uppercase">Validade</span>
                            <p className="font-mono font-black text-amber-600 text-lg tracking-tighter">{formData.dateExp ? new Date(formData.dateExp).toLocaleDateString('pt-BR') : '---'}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right pt-4 border-t border-slate-100 w-full">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1 font-outfit">Endereço de Origem</p>
                <p className="text-[10px] text-slate-400 font-bold leading-tight">
                    {formData.myAddress.street}, {formData.myAddress.num}<br />
                    {formData.myAddress.city}/{formData.myAddress.uf}
                </p>
            </div>
        </div>
    </div>
);

const Table = ({ formData }) => (
    <div className="flex-1 mb-12">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b-2" style={{ borderColor: formData.primaryColor }}>
                    <th className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-16 px-4">Qtd</th>
                    <th className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Descrição do Serviço / Produto</th>
                    <th className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Unitário</th>
                    <th className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right px-4">Subtotal</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {formData.items.map((it, i) => (
                    <React.Fragment key={i}>
                        <tr className="border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                            <td className="py-6 font-mono font-black text-slate-400 px-4">{it.q.toString().padStart(2, '0')}</td>
                            <td className="py-6">
                                <span className="font-black text-slate-900 text-base font-outfit">{it.d}</span>
                            </td>
                            <td className="py-6 text-right text-slate-500 font-bold font-mono">{it.val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td className="py-6 text-right font-black text-slate-900 px-4 font-mono text-base">{(it.q * it.val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        {it.sItems && it.sItems.map(si => (
                            <tr key={si.id} className="bg-slate-50/30">
                                {!si.v ? (
                                    <td className="py-3 pl-12 pb-3" colSpan={4}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full shadow-inner opacity-30 shrink-0" style={{ backgroundColor: formData.primaryColor }} />
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed">{si.d}</span>
                                        </div>
                                    </td>
                                ) : (
                                    <>
                                        <td className="py-3 text-center text-[10px] text-slate-400 font-bold font-mono tracking-tighter">
                                            {si.q}x
                                        </td>
                                        <td className="py-3 pl-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full shadow-inner opacity-50 shrink-0" style={{ backgroundColor: formData.primaryColor }} />
                                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight leading-tight">{si.d}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-right text-[10px] text-slate-400 font-bold font-mono">
                                            {si.val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="py-3 text-right text-[10px] text-slate-500 font-black px-4 font-mono">
                                            {(si.q * si.val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    </div>
);

const Summary = ({ formData, qrCodeData, pixStrings, calculateTotal }) => (
    <div className="grid grid-cols-12 gap-10 mb-12 items-end">
        <div className="col-span-7 space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-[2px] w-8 flex-shrink-0" style={{ backgroundColor: formData.primaryColor }} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-outfit">Condições e Meios de Pagamento</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {qrCodeData.main ? (
                    <div className="col-span-2 flex items-center gap-6 bg-slate-50/80 p-5 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
                            <img src={qrCodeData.main} className="w-24 h-24" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-[11px] font-black uppercase text-slate-900 tracking-wider mb-2 font-outfit">Pagamento via PIX</p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-inner">
                                <p className="font-mono text-[9px] break-all leading-relaxed text-slate-500 select-all font-bold uppercase tracking-tighter line-clamp-2">{pixStrings.main}</p>
                            </div>
                            <p className="text-[8px] text-slate-400 mt-3 font-black uppercase tracking-widest italic">Escaneie o QR Code para pagar agora</p>
                        </div>
                    </div>
                ) : (
                    (formData.payPix && formData.paySplits.length === 0) && (
                        <div className="col-span-2 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Chave de Recebimento PIX</p>
                            <p className="font-mono text-lg font-black text-slate-900 tracking-tight">{formData.payPix}</p>
                        </div>
                    )
                )}

                {formData.paySplits.length > 0 && (
                    <div className="col-span-2 space-y-3 pt-2">
                        {formData.paySplits.map(s => {
                            const val = calculateTotal() * (parseFloat(s.p) / 100);
                            return (
                                <div key={s.id} className="flex flex-col bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: formData.primaryColor }} />
                                    <div className="flex justify-between items-center font-black text-slate-900">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-outfit uppercase tracking-tight">{s.d}</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase">{s.m} {s.m === 'CARTÃO CRÉDITO' && `• ${s.inst}`}</span>
                                        </div>
                                        <span className="text-lg font-mono tracking-tighter" style={{ color: formData.primaryColor }}>{val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </div>
                                    {s.m === 'PIX' && s.q && qrCodeData.splits[s.id] && (
                                        <div className="flex gap-4 mt-4 items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                                            <img src={qrCodeData.splits[s.id]} className="w-16 h-16 shadow-sm border-2 border-white rounded-lg bg-white" />
                                            <p className="text-[8px] text-slate-400 flex-1 break-all select-all font-mono font-black border-l pl-4 border-slate-200 uppercase leading-relaxed">{pixStrings.splits[s.id]}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {(formData.payTerms || formData.payNotes) && (
                <div className="space-y-4 pt-4 border-t border-slate-50">
                    {formData.payTerms && (
                        <div className="p-5 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                            <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Termos</p>
                            <p className="text-[11px] text-slate-600 font-medium italic leading-relaxed">"{formData.payTerms}"</p>
                        </div>
                    )}
                    {formData.payNotes && (
                        <div className="p-5 bg-amber-50/30 rounded-3xl border border-amber-100/50">
                            <p className="text-[8px] font-black text-amber-500/60 uppercase tracking-widest mb-1">Observações Adicionais</p>
                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{formData.payNotes}</p>
                        </div>
                    )}
                </div>
            )}
        </div>

        <div className="col-span-5 flex flex-col justify-end space-y-6 text-right">
            <div className="p-10 rounded-[40px] border-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white relative overflow-hidden transform hover:-translate-y-1 transition-transform" style={{ borderColor: formData.primaryColor }}>
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10" style={{ background: `radial-gradient(circle at top right, ${formData.primaryColor}, transparent)` }} />
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] mb-4 font-outfit">Total Final</p>
                <div className="flex flex-col">
                    <span className="text-5xl font-black font-outfit leading-none tracking-tighter" style={{ color: formData.primaryColor }}>
                        {calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">Saldo Devedor em Reais</span>
                </div>
            </div>
            <div className="pr-4">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] font-outfit mb-1">Assinado digitalmente por</p>
                <p className="text-xs font-black text-slate-900 font-outfit uppercase">{formData.myName}</p>
            </div>
        </div>
    </div>
);

const Photos = ({ formData }) => (
    formData.showPhotos && formData.photos.some(p => p.preview) && (
        <div className="mt-12 pt-12 border-t-2 border-slate-100 page-break-inside-avoid">
            <h4 className="text-center font-black uppercase mb-8 tracking-[0.3em] text-sm font-outfit" style={{ color: formData.primaryColor }}>{formData.photoTitle}</h4>
            <div className="grid grid-cols-3 gap-6">
                {formData.photos.map(p => p.preview && (
                    <div key={p.id} className="group">
                        <div className="aspect-square bg-slate-50 mb-3 flex items-center justify-center overflow-hidden rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                            <img src={p.preview} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-center text-[10px] font-black uppercase text-slate-400 tracking-wider font-outfit leading-tight">{p.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    )
);

const Footer = () => (
    <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] font-outfit">
        <span>Firmou.com</span>
        <span>{new Date().getFullYear()}</span>
        <span>Documento Original</span>
    </div>
);

export { TemplateLayout, Header, Info, Table, Summary, Photos, Footer };
