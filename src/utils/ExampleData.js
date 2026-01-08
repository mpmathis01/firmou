export const EXAMPLE_DATA = {
    appVersion: '1.2.0',
    isExample: true,
    docType: 'ORÇAMENTO',
    docNum: 'PRO-2026-001',
    date: new Date().toISOString().split('T')[0],
    showExp: true,
    dateExp: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    myName: 'Studio Design Industrial',
    myDoc: '12.345.678/0001-90',
    myAddress: {
        cep: '04571-010',
        uf: 'SP',
        city: 'São Paulo',
        street: 'Avenida das Nações Unidas',
        num: '12901',
        neigh: 'Brooklin Novo',
        comp: 'Torre Oeste - Sl 402'
    },
    logo: null,
    clName: 'Inovação Tech S.A.',
    clDoc: '98.765.432/0001-10',
    clAddress: {
        cep: '22210-030',
        uf: 'RJ',
        city: 'Rio de Janeiro',
        street: 'Rua do Catete',
        num: '250',
        neigh: 'Catete',
        comp: 'Bloco B'
    },
    items: [
        {
            id: 1,
            d: 'Desenvolvimento de Identidade Visual Premium',
            q: 1,
            val: 4500,
            sItems: [
                { id: 101, d: 'Criação de Logotipo (3 variantes)', q: 1, val: 0, v: true },
                { id: 102, d: 'Manual da Marca (PDF 40 págs)', q: 1, val: 0, v: true },
                { id: 103, d: 'Papelaria Completa', q: 1, val: 0, v: true }
            ]
        },
        {
            id: 2,
            d: 'UI/UX Design - Landing Page Institucional',
            q: 1,
            val: 3200,
            sItems: []
        },
        {
            id: 3,
            d: 'Consultoria de Estética de Marca (Mensal)',
            q: 2,
            val: 1500,
            sItems: []
        }
    ],
    payPix: 'pagamentos@studiodesign.com',
    payTerms: '50% na aprovação e 50% na entrega final via PIX ou Boleto.',
    payNotes: 'Validade do orçamento: 15 dias. Prazo de entrega: 20 dias úteis após recebimento do sinal.',
    paySplits: [
        { id: 201, d: 'Sinal de Aprovação', p: 50, m: 'PIX', q: true, inst: 'À VISTA' },
        { id: 202, d: 'Entrega do Projeto', p: 50, m: 'PIX', q: true, inst: '30 DIAS' }
    ],
    showPhotos: false,
    photoTitle: 'Moodboard e Referências de Estilo',
    photos: [
        { id: 0, file: null, preview: null, caption: 'Referência de Cores' },
        { id: 1, file: null, preview: null, caption: 'Tipografia Sugerida' },
        { id: 2, file: null, preview: null, caption: 'Layout de Grade' }
    ],
    primaryColor: '#3b82f6',
    templateId: 'modern',
};
