import React from 'react';

// This component is designed to be rendered to HTML string or captured by html2pdf
export const ReceiptTemplate = ({ data }) => {
    const {
        id = "0000",
        date = new Date().toLocaleDateString(),
        amount = "0,00",
        clientName = "Nome do Cliente",
        clientDoc = "000.000.000-00",
        description = "Serviços prestados",
        issuerName = "Minha Empresa",
        issuerDoc = "00.000.000/0001-00"
    } = data || {};

    return (
        <div
            id="receipt-template"
            className="bg-white text-slate-900 p-12 max-w-[210mm] mx-auto shadow-none"
            style={{ width: '210mm', minHeight: '100mm', fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900">Recibo</h1>
                    <p className="text-sm text-slate-500 mt-1">#{id}</p>
                </div>
                <div className="text-right">
                    <h2 className="font-bold text-xl text-indigo-700">{issuerName}</h2>
                    <p className="text-xs text-slate-500">{issuerDoc}</p>
                </div>
            </div>

            {/* Body */}
            <div className="mb-12">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mb-8">
                    <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Valor Total</p>
                    <p className="text-4xl font-bold text-slate-900">R$ {amount}</p>
                </div>

                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                        Recebemos de <strong className="text-slate-900">{clientName}</strong> (CPF/CNPJ: {clientDoc}),
                        a quantia supra de <strong className="text-slate-900">R$ {amount}</strong>.
                    </p>
                    <p>
                        Referente aos serviços de:
                    </p>
                    <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50/50 italic text-slate-800">
                        {description}
                    </div>
                </div>
            </div>

            {/* Footer / Signatures */}
            <div className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-end">
                <div className="text-xs text-slate-400">
                    <p>Emitido em: {date}</p>
                    <p>Gerado via Firmou App</p>
                </div>

                <div className="text-center">
                    <div className="h-12 border-b border-slate-400 w-64 mb-2"></div>
                    <p className="text-sm font-medium text-slate-700">{issuerName}</p>
                    <p className="text-xs text-slate-400">Assinatura do Emissor</p>
                </div>
            </div>
        </div>
    );
};

export default ReceiptTemplate;
