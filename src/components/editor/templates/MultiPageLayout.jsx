import React, { useMemo } from 'react';
import { Header, Footer, Info, Summary, Photos } from './TemplateBase';

/**
 * Componente de página individual com header e footer
 */
const Page = ({ formData, pageNumber, totalPages, children }) => (
    <div
        className={`a4-page tpl-${formData.templateId}`}
        style={{
            width: '210mm',
            height: '297mm',
            marginBottom: '10mm',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            '--color-accent': formData.primaryColor
        }}
    >
        {/* Header */}
        <div className="p-[15mm] pb-8">
            <Header formData={formData} />
            <div className="text-right text-xs text-slate-400 mt-2">
                Página {pageNumber} de {totalPages}
            </div>
        </div>

        {/* Conteúdo */}
        <div className="px-[15mm] text-slate-800 flex-1 overflow-hidden">
            {children}
        </div>

        {/* Footer */}
        <div className="p-[15mm] pt-8 mt-auto">
            <Footer />
        </div>
    </div>
);

/**
 * Layout multi-página com capacidade fixa
 */
const MultiPageLayout = (props) => {
    const { formData, zoom, qrCodeData, pixStrings, calculateTotal } = props;

    // Capacidades por tipo de página
    const CAPACITY = {
        first: 8,   // Primeira página tem Info + início da tabela
        middle: 15, // Páginas do meio só têm linhas da tabela
        last: 10    // Última página tem fim da tabela + Summary + Photos
    };

    // Extrai os componentes filhos
    const childrenArray = React.Children.toArray(props.children);
    const infoComponent = childrenArray.find(c => c.type?.name === 'Info');
    const tableComponent = childrenArray.find(c => c.type?.name === 'Table');
    const summaryComponent = childrenArray.find(c => c.type?.name === 'Summary');
    const photosComponent = childrenArray.find(c => c.type?.name === 'Photos');

    // Calcula as páginas
    const pages = useMemo(() => {
        const items = formData.items || [];
        const totalItems = items.length;

        if (totalItems === 0) {
            return [{
                type: 'single',
                items: []
            }];
        }

        const newPages = [];
        let remainingItems = [...items];

        // Primeira página
        const firstPageItems = remainingItems.splice(0, CAPACITY.first);
        newPages.push({
            type: 'first',
            items: firstPageItems,
            showInfo: true,
            showSummary: false,
            showPhotos: false
        });

        // Páginas do meio
        while (remainingItems.length > CAPACITY.last) {
            const middlePageItems = remainingItems.splice(0, CAPACITY.middle);
            newPages.push({
                type: 'middle',
                items: middlePageItems,
                showInfo: false,
                showSummary: false,
                showPhotos: false
            });
        }

        // Última página
        if (remainingItems.length > 0 || newPages.length === 1) {
            newPages.push({
                type: 'last',
                items: remainingItems,
                showInfo: false,
                showSummary: true,
                showPhotos: true
            });
        } else {
            // Se não sobrou item, cria página só com resumo
            newPages.push({
                type: 'summary_only',
                items: [],
                showInfo: false,
                showSummary: true,
                showPhotos: true
            });
        }

        return newPages;
    }, [formData.items]);

    // Renderiza a tabela com itens específicos
    const renderTable = (items) => {
        if (!items || items.length === 0) return null;

        return (
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
                        {items.map((it, i) => (
                            <tr key={i} className="border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                                <td className="py-6 font-mono font-black text-slate-400 px-4">{it.q.toString().padStart(2, '0')}</td>
                                <td className="py-6">
                                    <span className="font-black text-slate-900 text-base font-outfit">{it.d}</span>
                                </td>
                                <td className="py-6 text-right text-slate-500 font-bold font-mono">
                                    {it.val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                                <td className="py-6 text-right font-black text-slate-900 px-4 font-mono text-base">
                                    {(it.q * it.val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div id="pdf-content-area">
            {pages.map((page, pageIndex) => (
                <Page
                    key={pageIndex}
                    formData={formData}
                    pageNumber={pageIndex + 1}
                    totalPages={pages.length}
                >
                    {page.showInfo && <Info formData={formData} />}
                    {renderTable(page.items)}
                    {page.showSummary && (
                        <Summary
                            formData={formData}
                            qrCodeData={qrCodeData}
                            pixStrings={pixStrings}
                            calculateTotal={calculateTotal}
                        />
                    )}
                    {page.showPhotos && <Photos formData={formData} />}
                </Page>
            ))}
        </div>
    );
};

export default MultiPageLayout;
