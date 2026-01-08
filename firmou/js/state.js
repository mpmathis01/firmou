export const APP_VERSION = "1.2.0";

export let state = {
    doc: { type: 'ORÇAMENTO', num: '2024-001', date: new Date().toISOString().split('T')[0], dateExp: '', showExp: false, status: 'ABERTO' },
    my: { name: '', doc: '', cep: '', addr: '', logo: '', street: '', num: '', neigh: '', comp: '', city: '', uf: '' },
    cl: { name: '', doc: '', cep: '', addr: '', street: '', num: '', neigh: '', comp: '', city: '', uf: '' },
    items: [],
    photos: [{ src: '', caption: '' }, { src: '', caption: '' }, { src: '', caption: '' }],
    photoSectionTitle: 'Fotos do Local do Serviço / Equipamento',
    cfg: { col: '#fbbf24', tpl: 'tpl-clean', zoom: 0.8, dark: false, showPhotos: false },
    pay: { pix: '', terms: '', notes: '', splits: [], showSplits: false }
};

export const FAKE_DATA = {
    doc: { type: 'ORÇAMENTO', num: 'HVAC-445', date: new Date().toISOString().split('T')[0], status: 'ABERTO', showExp: true, dateExp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    my: { name: 'Refrigeração Polar Sul', doc: '45.892.123/0001-08', cep: '20040-003', addr: 'Av. Rio Branco, 156 - Rio de Janeiro/RJ', logo: '', street: 'Av. Rio Branco', num: '156', neigh: 'Centro', comp: '', city: 'Rio de Janeiro', uf: 'RJ' },
    cl: { name: 'Pizzaria do Bairro Ltda', doc: '12.345.678/0001-00', cep: '05422-001', addr: 'Rua dos Pinheiros, 820 - São Paulo/SP', street: 'Rua dos Pinheiros', num: '820', neigh: 'Pinheiros', comp: '', city: 'São Paulo', uf: 'SP' },
    items: [
        { id: 1, d: 'Instalação Split 12.000 BTU Inverter', q: 1, p: 450, sItems: [] },
        { id: 2, d: 'Carga de Gás R410A', q: 1, p: 280, sItems: [] },
        { id: 3, d: 'Kit Instalação (Cobre 3m + Isolamento)', q: 1, p: 350, sItems: [{ d: 'Tubo Cobre 1/4', q: 3, p: 0, v: false }] }
    ],
    pay: { pix: 'financeiro@polarsul.com', terms: 'Pagamento à vista com 5% desconto ou 3x no cartão.', notes: 'Garantia de 90 dias nos serviços.', splits: [], showSplits: false },
    cfg: { col: '#fbbf24', tpl: 'tpl-clean', zoom: 0.8, dark: false, showPhotos: false }
};

export function setState(newState) {
    if (!newState) return;

    // Deep merge simples para garantir que propriedades não sumam
    state.doc = { ...state.doc, ...(newState.doc || {}) };
    state.my = { ...state.my, ...(newState.my || {}) };
    state.cl = { ...state.cl, ...(newState.cl || {}) };
    state.pay = { ...state.pay, ...(newState.pay || {}) };
    state.cfg = { ...state.cfg, ...(newState.cfg || {}) };

    state.items = Array.isArray(newState.items) ? newState.items : [];

    // Safety check for subitems
    state.items.forEach(it => {
        if (!it.sItems) it.sItems = [];
    });

    state.photos = Array.isArray(newState.photos) ? newState.photos : [{ src: '', caption: '' }, { src: '', caption: '' }, { src: '', caption: '' }];
    state.photoSectionTitle = newState.photoSectionTitle || 'Fotos do Local do Serviço / Equipamento';

    console.log("Firmou: Estado inicializado com segurança.");
}


export function save() {
    localStorage.setItem('firmou_store', JSON.stringify(state));
}
