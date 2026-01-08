import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { PixPayload } from '../../utils/PixPayload';
import { EXAMPLE_DATA } from '../../utils/ExampleData';
import { FileText, Moon, Sun, LayoutTemplate, Briefcase, Star, Cpu, Monitor, Hexagon, Zap, Coffee, PenTool, Trash2, Sparkles, ShieldCheck, ChevronDown, X } from 'lucide-react';

// Tabs & Preview
import InfoTab from './tabs/InfoTab';
import ItemsTab from './tabs/ItemsTab';
import PaymentsTab from './tabs/PaymentsTab';
import PhotosTab from './tabs/PhotosTab';
import DesignTab from './tabs/DesignTab';
import FilesTab from './tabs/FilesTab';
import PdfPreview from './PdfPreview';

const INITIAL_STATE = {
    appVersion: '1.2.0', isExample: true,
    docType: 'ORÇAMENTO', docNum: 'HVAC-445', date: new Date().toISOString().split('T')[0], showExp: true, dateExp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    myName: 'Refrigeração Polar Sul', myDoc: '45.892.123/0001-08',
    myAddress: { cep: '20040-003', uf: 'RJ', city: 'Rio de Janeiro', street: 'Av. Rio Branco', num: '156', neigh: 'Centro', comp: '' },
    logo: null,
    clName: 'Pizzaria do Bairro Ltda', clDoc: '12.345.678/0001-00',
    clAddress: { cep: '05422-001', uf: 'SP', city: 'São Paulo', street: 'Rua dos Pinheiros', num: '820', neigh: 'Pinheiros', comp: '' },
    items: [
        { id: 1, d: 'Instalação Split 12.000 BTU Inverter', q: 1, val: 450, v: true, sItems: [] },
        { id: 2, d: 'Carga de Gás R410A', q: 1, val: 280, v: true, sItems: [] },
        { id: 3, d: 'Kit Instalação (Cobre 3m + Isolamento)', q: 1, val: 350, v: true, sItems: [{ id: 101, d: 'Tubo Cobre 1/4', q: 3, val: 0, v: false }] }
    ],
    payPix: 'financeiro@polarsul.com', payTerms: 'Pagamento à vista com 5% desconto ou 3x no cartão.', payNotes: 'Garantia de 90 dias nos serviços.',
    paySplits: [],
    showPhotos: false, photoTitle: 'Fotos do Local do Serviço / Equipamento',
    photos: [{ id: 0, file: null, preview: null, caption: '' }, { id: 1, file: null, preview: null, caption: '' }, { id: 2, file: null, preview: null, caption: '' }],
    primaryColor: '#fbbf24', templateId: 'clean',
};

const TEMPLATES = [
    { id: 'clean', name: 'Clean', icon: <LayoutTemplate size={16} /> },
    { id: 'industrial', name: 'Industrial', icon: <Briefcase size={16} /> },
    { id: 'elegant', name: 'Elegant', icon: <Star size={16} /> },
    { id: 'tech', name: 'Tech', icon: <Cpu size={16} /> },
    { id: 'modern', name: 'Modern', icon: <Monitor size={16} /> },
    { id: 'corporate', name: 'Corporate', icon: <Hexagon size={16} /> },
    { id: 'bold', name: 'Bold', icon: <Zap size={16} /> },
    { id: 'pastel', name: 'Pastel', icon: <Coffee size={16} /> },
    { id: 'dark', name: 'Dark', icon: <Moon size={16} /> },
    { id: 'handwritten', name: 'Handwritten', icon: <PenTool size={16} /> }
];

const FAQ_ITEMS = [
    { q: "Como os dados são salvos?", a: "Tudo fica no LocalStorage do seu navegador. É como se fosse uma gaveta digital dentro do seu Chrome ou Safari. Se você limpar o histórico de navegação profundamente, esses dados podem sumir, por isso sempre recomendamos usar o botão 'Exportar TXT'." },
    { q: "Dá pra salvar em PDF?", a: "Sim! Usamos uma biblioteca potente que 'fotografa' o preview e gera um PDF no formato A4, pronto para enviar pelo WhatsApp." },
    { q: "O que fazer se der erro na busca de CNPJ?", a: "Pode ser que a API esteja fora do ar ou o CNPJ seja muito novo. Se isso acontecer, você pode digitar os dados manualmente sem problemas." },
    { q: "Como adicionar fotos no orçamento?", a: "Vá na aba 'Fotos', escolha até 3 imagens do serviço e marque a opção 'Exibir no PDF'. As fotos aparecem automaticamente no documento final com legendas opcionais." },
    { q: "Posso usar no celular?", a: "Sim! O Firmou é 100% responsivo. No celular, use os botões 'Editar' e 'Ver' no topo para alternar entre o formulário e o preview do documento." },
    { q: "Como funciona o PIX QR Code?", a: "Digite sua chave PIX e o QR Code é gerado automaticamente. Importante: O QR Code é estático, então sempre confira os valores antes de enviar ao cliente." }
];

import { HamburgerTrigger } from '../navigation/OffCanvasMenu';

import { Eye, Edit3, Share2, Download } from 'lucide-react';

export const FirmouEditor = ({ onOpenPrivacy, onToggleMenu }) => {
    const [mobileTab, setMobileTab] = useState('edit'); // 'edit' or 'preview'
    const [activeTab, setActiveTab] = useState('info');
    const [zoom, setZoom] = useState(0.8);
    const [panPos, setPanPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });


    const containerRef = useRef(null);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('firmou_theme');
        return saved ? JSON.parse(saved) : false;
    });
    const [loading, setLoading] = useState({ my: false, cl: false });
    const [qrCodeData, setQrCodeData] = useState({ main: null, splits: {} });
    const [pixStrings, setPixStrings] = useState({ main: '', splits: {} });
    const [toast, setToast] = useState(null);
    const fileInputRef = useRef(null);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    // --- AUTO ZOOM LOGIC ---
    const autoFitZoom = () => {
        if (containerRef.current) {
            let containerWidth = containerRef.current.clientWidth;
            if (containerWidth === 0) containerWidth = window.innerWidth;
            // A4 width (210mm) is approx 794px at 96dpi. Adding padding.
            const targetWidth = 850;
            // Calculate zoom to fit width with some margin (0.9 factor)
            const newZoom = Math.min(Math.max((containerWidth / targetWidth) * 0.9, 0.4), 1.3);
            setZoom(newZoom);
            setPanPos({ x: 0, y: 0 });
        }
    };

    useEffect(() => {
        // Initial fit and on mobileTab change
        autoFitZoom();

        // Trigger generic resize for safeguard
        setTimeout(autoFitZoom, 100);

        if (!containerRef.current) return;
        const observer = new ResizeObserver(() => {
            requestAnimationFrame(autoFitZoom);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [mobileTab]);

    // --- PANNING LOGIC ---
    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPanPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };
    const handleMouseUp = () => setIsDragging(false);

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('firmou_data');
        return saved ? JSON.parse(saved) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem('firmou_data', JSON.stringify(formData));
    }, [formData]);

    const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const updateAddress = (type, field, value) => setFormData(prev => ({ ...prev, [type === 'my' ? 'myAddress' : 'clAddress']: { ...prev[type === 'my' ? 'myAddress' : 'clAddress'], [field]: value } }));

    const checkCnpj = async (type, value) => {
        const nums = value.replace(/\D/g, ''); updateForm(type === 'my' ? 'myDoc' : 'clDoc', value);
        if (nums.length === 14) {
            setLoading(prev => ({ ...prev, [type]: true }));
            try {
                const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${nums}`); if (!res.ok) throw new Error('Falha API'); const data = await res.json();
                setFormData(prev => ({ ...prev, [type === 'my' ? 'myName' : 'clName']: data.razao_social || data.nome_fantasia || '', [type === 'my' ? 'myAddress' : 'clAddress']: { ...prev[type === 'my' ? 'myAddress' : 'clAddress'], cep: data.cep ? data.cep.replace(/(\d{5})(\d)/, "$1-$2") : '', uf: data.uf || '', city: data.municipio || '', street: data.logradouro || '', num: data.numero || '', neigh: data.bairro || '', comp: data.complemento || '' } }));
            } catch (e) { console.warn('CNPJ', e); } finally { setLoading(prev => ({ ...prev, [type]: false })); }
        }
    };

    const checkCep = async (type, value) => {
        let fmt = value.replace(/\D/g, ''); if (fmt.length > 5) fmt = fmt.replace(/^(\d{5})(\d)/, '$1-$2').substring(0, 9); updateAddress(type, 'cep', fmt);
        if (fmt.replace('-', '').length === 8) {
            setLoading(prev => ({ ...prev, [type]: true }));
            try {
                const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${fmt.replace('-', '')}`); if (!res.ok) throw new Error('Falha CEP'); const data = await res.json();
                setFormData(prev => ({ ...prev, [type === 'my' ? 'myAddress' : 'clAddress']: { ...prev[type === 'my' ? 'myAddress' : 'clAddress'], uf: data.state || '', city: data.city || '', street: data.street || '', neigh: data.neighborhood || '' } }));
            } catch (e) { console.warn('CEP', e); } finally { setLoading(prev => ({ ...prev, [type]: false })); }
        }
    };

    const handlePhotoUpload = (e, i) => { const f = e.target.files[0]; if (f) { const reader = new FileReader(); reader.onload = (ev) => { setFormData(p => { const n = [...p.photos]; n[i] = { ...n[i], file: null, preview: ev.target.result, caption: '' }; return { ...p, photos: n } }); }; reader.readAsDataURL(f); } };
    const handleLogoUpload = (e) => { const f = e.target.files[0]; if (f) { const reader = new FileReader(); reader.onload = (ev) => updateForm('logo', ev.target.result); reader.readAsDataURL(f); } };
    const exportTXT = () => { const b = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.download = `ORCAMENTO-${formData.docNum || 'BACKUP'}.firmou`; a.href = u; a.click(); showToast('Projeto exportado com sucesso!'); };
    const importTXT = (e) => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = (ev) => { try { const data = JSON.parse(ev.target.result); setFormData(p => ({ ...p, ...data })); showToast('Projeto restaurado com sucesso!'); } catch (err) { alert('Erro ao importar arquivo. Certifique-se que é um arquivo .firmou válido.'); } }; r.readAsText(f); } };
    const resetData = () => { if (window.confirm('Limpar tudo e restaurar padrão?')) { localStorage.removeItem('firmou_data'); setFormData(INITIAL_STATE); window.location.reload(); } };
    const loadExample = () => { if (window.confirm('Carregar dados de exemplo? Isso substituirá seus dados atuais.')) { setFormData(EXAMPLE_DATA); showToast('Dados de exemplo carregados!'); } };

    const addItem = () => setFormData(p => ({ ...p, items: [...p.items, { id: Date.now(), d: '', q: 1, val: 0, v: true, sItems: [] }] }));
    const updateItem = (id, f, v) => setFormData(p => ({ ...p, items: p.items.map(i => i.id === id ? { ...i, [f]: v } : i) }));
    const removeItem = (id) => setFormData(p => ({ ...p, items: p.items.filter(i => i.id !== id) }));
    const addSubItem = (iid) => setFormData(p => ({ ...p, items: p.items.map(i => i.id === iid ? { ...i, sItems: [...(i.sItems || []), { id: Date.now(), d: '', q: 1, val: 0, v: true }] } : i) }));
    const updateSubItem = (iid, sid, f, v) => setFormData(p => ({ ...p, items: p.items.map(i => i.id === iid ? { ...i, sItems: i.sItems.map(s => s.id === sid ? { ...s, [f]: v } : s) } : i) }));
    const removeSubItem = (iid, sid) => setFormData(p => ({ ...p, items: p.items.map(i => i.id === iid ? { ...i, sItems: i.sItems.filter(s => s.id !== sid) } : i) }));

    const addSplit = () => {
        const currentP = formData.paySplits.reduce((acc, s) => acc + (parseFloat(s.p) || 0), 0);
        if (currentP >= 100) return alert('Total 100% atingido.');
        setFormData(p => ({ ...p, paySplits: [...p.paySplits, { id: Date.now(), d: `Pagamento ${(p.paySplits.length + 1)}`, p: 100 - currentP, m: 'PIX', q: true, inst: 'À VISTA' }] }));
    };
    const updateSplit = (id, f, v) => setFormData(p => ({ ...p, paySplits: p.paySplits.map(s => s.id === id ? { ...s, [f]: v } : s) }));
    const removeSplit = (id) => setFormData(p => ({ ...p, paySplits: p.paySplits.filter(s => s.id !== id) }));
    const calculateTotal = () => formData.items.reduce((acc, i) => {
        let sum = i.q * i.val;
        if (i.sItems) sum += i.sItems.reduce((s, si) => si.v ? s + (si.q * si.val) : s, 0);
        return acc + sum;
    }, 0);

    useEffect(() => {
        const total = calculateTotal();
        const gen = async () => {
            let mainUrl = null; let mainTxt = '';
            if (formData.payPix && total > 0) {
                const pp = new PixPayload(formData.payPix, formData.myName || 'Recebedor', formData.myAddress.city || 'Cidade', total, formData.docNum || '0000');
                mainTxt = pp.generate();
                mainUrl = await QRCode.toDataURL(mainTxt, { width: 400, margin: 2 });
            }
            const splitsUrls = {}; const splitsTxts = {};
            for (const s of formData.paySplits) {
                if (s.m === 'PIX' && s.q && formData.payPix && total > 0) {
                    const sVal = total * (parseFloat(s.p) / 100);
                    const pp = new PixPayload(formData.payPix, formData.myName || 'Recebedor', formData.myAddress.city || 'Cidade', sVal, `${formData.docNum}-P${s.id}`.substring(0, 25));
                    splitsTxts[s.id] = pp.generate();
                    splitsUrls[s.id] = await QRCode.toDataURL(splitsTxts[s.id], { width: 300, margin: 2 });
                }
            }
            setQrCodeData({ main: mainUrl, splits: splitsUrls });
            setPixStrings({ main: mainTxt, splits: splitsTxts });
        };
        gen();
    }, [formData.payPix, formData.myName, formData.myAddress.city, formData.items, formData.docNum, formData.paySplits]);

    const { generatePdf } = usePdfGenerator();
    const handleGeneratePdf = () => generatePdf('pdf-content-area', `Firmou-${formData.docNum}.pdf`);
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('firmou_theme', JSON.stringify(darkMode));
    }, [darkMode]);
    const UFs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'info': return <InfoTab formData={formData} updateForm={updateForm} updateAddress={updateAddress} checkCnpj={checkCnpj} checkCep={checkCep} loading={loading} handleLogoUpload={handleLogoUpload} UFs={UFs} />;
            case 'items': return <ItemsTab formData={formData} addItem={addItem} updateItem={updateItem} removeItem={removeItem} addSubItem={addSubItem} updateSubItem={updateSubItem} removeSubItem={removeSubItem} calculateTotal={calculateTotal} />;
            case 'payments': return <PaymentsTab formData={formData} updateForm={updateForm} addSplit={addSplit} updateSplit={updateSplit} removeSplit={removeSplit} />;
            case 'photos': return <PhotosTab formData={formData} updateForm={updateForm} handlePhotoUpload={handlePhotoUpload} setFormData={setFormData} />;
            case 'design': return <DesignTab formData={formData} updateForm={updateForm} TEMPLATES={TEMPLATES} />;
            case 'files': return <FilesTab formData={formData} exportTXT={exportTXT} importTXT={importTXT} resetData={resetData} fileInputRef={fileInputRef} toast={toast} />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-inter text-slate-900 dark:text-slate-100 transition-colors duration-500">
            {/* Sidebar Editor */}
            <aside className={`section-sidebar relative flex flex-col h-full bg-white dark:bg-slate-900 shadow-[20px_0_80px_rgba(0,0,0,0.02)] border-r dark:border-slate-800 ${mobileTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
                <header className="p-4 md:p-8 pb-4 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-30">
                    <div className="flex items-center gap-1">
                        <HamburgerTrigger onClick={onToggleMenu} />
                        <div onClick={() => window.location.reload()} className="group cursor-pointer flex flex-col md:flex-row items-end md:items-center justify-center pl-1">
                            {/* Version Label - Top/Right on Mobile, Badge/Right on Desktop */}


                            {/* Logo - Bottom on Mobile, Left on Desktop */}
                            <div className="order-2 md:order-1 flex items-center leading-none group-hover:scale-105 transition-transform duration-300 origin-right md:origin-left">
                                <span className="font-outfit font-black text-5xl md:text-6xl tracking-tighter text-slate-900 dark:text-white">firmou</span>
                                <span className="font-outfit font-black text-5xl md:text-6xl text-amber-400">.</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 md:gap-3">
                        <button
                            onClick={loadExample}
                            className="p-2.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 group"
                            title="Carregar exemplo"
                        >
                            <Sparkles size={22} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={resetData}
                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group"
                            title="Limpar todos os dados"
                        >
                            <Trash2 size={22} className="group-hover:rotate-12 transition-transform" />
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
                            title={darkMode ? "Modo Claro" : "Modo Escuro"}
                        >
                            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                        </button>
                    </div>
                </header>
                <div className="px-4 md:px-8 -mt-2 md:-mt-7 mb-4 relative z-40 pointer-events-none">
                    <p className="text-[11px] md:text-[10px] text-slate-400 uppercase font-black tracking-normal md:tracking-[0.2em] pl-1 relative -top-1 md:top-0 whitespace-nowrap">Professional Document Forge</p>
                </div>

                <nav className="px-4 mt-4">
                    <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar gap-1 border border-slate-200/20">
                        {[{ id: 'info', label: 'Dados' }, { id: 'items', label: 'Itens' }, { id: 'payments', label: 'Pagamento' }, { id: 'photos', label: 'Fotos' }, { id: 'design', label: 'Estilo' }, { id: 'files', label: 'Arquivos' }].map(t => (
                            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 min-w-max px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${activeTab === t.id ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white scale-100' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800 scale-95 opacity-70'}`} style={activeTab === t.id ? { borderBottom: `2px solid ${formData.primaryColor}` } : {}}>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="flex-1 overflow-y-auto mt-6 px-8 py-4 space-y-8 no-scrollbar scroll-smooth">
                    {renderActiveTab()}
                </div>

                <footer className="hidden md:block p-8 bg-white dark:bg-slate-900 border-t dark:border-slate-800 z-30">
                    <button onClick={handleGeneratePdf} className="group w-full bg-amber-400 text-slate-900 font-black py-5 rounded-2xl shadow-[0_15px_30px_-5px_rgba(251,191,36,0.4)] flex items-center justify-center gap-4 uppercase hover:scale-[1.02] hover:brightness-105 active:scale-95 transition-all duration-300 font-outfit tracking-[0.2em] relative overflow-hidden" >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
                        <FileText size={22} className="group-hover:rotate-12 transition-transform" />
                        Exportar para PDF
                    </button>
                </footer>
            </aside>

            <main
                ref={containerRef}
                className={`flex-1 mesh-gradient relative flex flex-col items-center overflow-y-auto overflow-x-hidden h-full scroll-smooth ${mobileTab === 'edit' ? 'hidden md:flex' : 'fixed inset-0 z-30 bg-slate-100 md:bg-transparent md:static md:z-auto md:flex'}`}
            >
                {/* Floating Toolbar */}
                <div className="sticky top-8 z-50 glass-panel px-6 py-2.5 rounded-full flex gap-4 items-center shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-fade-in border border-white/40">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all text-lg font-bold">-</button>
                        <div className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1 rounded-lg text-xs font-mono font-black shadow-inner truncate">{Math.round(zoom * 100)}%</div>
                        <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all text-lg font-bold">+</button>
                    </div>

                    <button onClick={autoFitZoom} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors group" title="Ajustar à tela">
                        <LayoutTemplate size={16} className="group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-outfit">Live</span>
                    </div>
                </div>

                {/* SEÇÃO 1: Renderização das Páginas A4 com Drag */}
                <div
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className={`w-full flex flex-col items-center pt-12 pb-32 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{
                        marginLeft: `${panPos.x}px`,
                        marginTop: `${panPos.y}px`,
                        transition: isDragging ? 'none' : 'margin 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                >
                    <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                        <div key={mobileTab} className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm pointer-events-none bg-white">
                            <PdfPreview formData={formData} qrCodeData={qrCodeData} pixStrings={pixStrings} calculateTotal={calculateTotal} zoom={zoom} />
                        </div>
                    </div>
                </div>

                {/* SEÇÃO 2: Conteúdo Estático (FAQ, Features, Footer) - SEM DRAG */}
                <div
                    className="max-w-4xl w-full mt-32 space-y-32 px-8 no-print pb-40 relative pointer-events-auto select-text cursor-auto"
                >
                    <section className="text-center space-y-4">
                        <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 mb-4 animate-bounce">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight">Privacidade Levada a Sério</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Diferente de outros geradores, o <b>Firmou</b> não armazena nada em servidores externos.
                            Seus documentos e os dados dos seus clientes pertencem apenas a você, processados localmente no seu dispositivo.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <ShieldCheck className="text-blue-600" />, title: "100% Offline-First", desc: "Seus dados ficam no LocalStorage do navegador. Funciona sem internet enquanto você edita." },
                            { icon: <Zap className="text-emerald-500" />, title: "Pix Integrado", desc: "Gere QR Codes instantâneos para receber pagamentos dos seus clientes com agilidade." },
                            { icon: <Sparkles className="text-amber-500" />, title: "Templates Premium", desc: "10 estilos profissionais desenhados para elevar a percepção de valor do seu trabalho." }
                        ].map((f, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700/50 group">
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                                <h4 className="font-black text-xl mb-3 uppercase tracking-tight">{f.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <section id="faq" className="bg-white dark:bg-slate-800 p-12 rounded-[50px] shadow-2xl border border-slate-100 dark:border-slate-700/50">
                        <h3 className="text-3xl font-black text-center mb-12 tracking-tight">Tire suas dúvidas</h3>
                        <div className="space-y-6">
                            {FAQ_ITEMS.map((item, i) => (
                                <details key={i} className="group border-b border-slate-100 dark:border-slate-700 pb-6">
                                    <summary className="flex justify-between items-center font-bold text-lg cursor-pointer hover:text-blue-600 transition-colors list-none">
                                        {item.q}
                                        <ChevronDown size={20} className="group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <p className="text-slate-500 dark:text-slate-400 mt-6 leading-relaxed text-sm">
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Footer Section */}
                    <footer className="text-center pt-20 space-y-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent w-full"></div>
                        <p className="text-xs text-slate-400 font-black uppercase tracking-[0.4em]">
                            Firmou.com © 2024 - O seu braço direito na prestação de serviços
                        </p>
                        <button
                            onClick={onOpenPrivacy}
                            className="text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-colors underline underline-offset-4"
                        >
                            Política de Privacidade
                        </button>
                    </footer>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-6 py-2 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 whitespace-nowrap">
                    <Hexagon size={12} className="animate-spin" />
                    Infinite Canvas & Landing Mode Active
                </div>
            </main >

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 z-40 flex justify-around items-center safe-area-pb">
                <button
                    onClick={() => setMobileTab('edit')}
                    className={`nav-item flex flex-col items-center p-2 rounded-xl transition-all ${mobileTab === 'edit' ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-slate-400'}`}
                >
                    <Edit3 size={24} />
                    <span className="text-[10px] font-black uppercase tracking-wider mt-1">Editor</span>
                </button>

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>

                <button
                    onClick={() => setMobileTab('preview')}
                    className={`nav-item flex flex-col items-center p-2 rounded-xl transition-all ${mobileTab === 'preview' ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-slate-400'}`}
                >
                    <Eye size={24} />
                    <span className="text-[10px] font-black uppercase tracking-wider mt-1">Preview</span>
                </button>

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>

                <button
                    onClick={handleGeneratePdf}
                    className="nav-item flex flex-col items-center p-2 rounded-xl text-slate-900 bg-amber-400 shadow-lg shadow-amber-400/20 hover:scale-105 transition-all active:scale-95"
                >
                    <Download size={24} />
                    <span className="text-[10px] font-black uppercase tracking-wider mt-1">Gerar PDF</span>
                </button>
            </div>




        </div >
    );
};

