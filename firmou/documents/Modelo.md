<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Gerador de Orçamentos e Faturas Premium</title>
    <!-- Tailwind CSS para a Interface do Editor -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- QRCode Generator -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
    <!-- Google Fonts Premium -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    
    <style>
        /* --- CSS Específico do Documento A4 --- */
        :root {
            --primary-color: #2563eb;
            --secondary-color: #1e40af;
            --accent-color: #f3f4f6;
            --text-main: #111827;
            --text-muted: #6b7280;
            --border-light: #e5e7eb;
        }

        /* Container A4 Flexível para permitir múltiplas páginas */
        .page-container {
            width: 210mm;
            min-height: 297mm;
            height: auto; 
            background: white;
            margin: 0 auto;
            position: relative;
            box-sizing: border-box;
            transform-origin: top center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            padding-bottom: 50px; 
        }

        /* Reset para Impressão */
        @media print {
            body { background: white; margin: 0; padding: 0; }
            aside, .preview-toolbar, .no-print, nav, #mobile-main-nav { display: none !important; }
            main { margin: 0 !padding: 0; background: white; height: auto !important; overflow: visible !important; display: block !important; }
            #preview-scroll-area { padding: 0; margin: 0; overflow: visible; display: block; height: auto; }
            
            .page-container {
                box-shadow: none;
                margin: 0;
                width: 100%;
                height: auto;
                min-height: 297mm;
                transform: none !important;
                page-break-after: always;
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .doc-section, .premium-table tr, .summary-grid, .photo-gallery { page-break-inside: avoid; }
            .doc-header-grid { page-break-after: avoid; }
            
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }

        /* --- Estrutura Geral do Documento --- */
        .doc-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 40px 50px;
            color: var(--text-main);
        }

        .doc-header-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .label-sm { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 4px; }
        .value-lg { font-size: 14px; font-weight: 500; color: var(--text-main); line-height: 1.4; white-space: pre-line; }
        
        .brand-logo { max-width: 180px; max-height: 80px; object-fit: contain; display: block; }
        .doc-title-lg { font-size: 42px; font-weight: 800; line-height: 1; text-transform: uppercase; letter-spacing: -1px; color: var(--primary-color); }
        .doc-number { font-size: 18px; color: var(--text-muted); font-weight: 400; margin-top: 5px; }

        .client-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 40px;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-light);
        }

        .photo-gallery {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        .photo-item {
            border: 1px solid var(--border-light);
            padding: 5px;
            border-radius: 4px;
            background: #fff;
        }
        .photo-img {
            width: 100%;
            height: 140px;
            object-fit: cover;
            display: block;
            border-radius: 2px;
        }
        .photo-caption {
            font-size: 10px;
            color: var(--text-muted);
            margin-top: 5px;
            text-align: center;
            font-weight: 500;
        }

        .table-container { margin-bottom: 30px; flex-grow: 1; }
        .premium-table { width: 100%; border-collapse: collapse; }
        .premium-table th { 
            text-align: left; padding: 12px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;
            color: var(--text-muted); border-bottom: 2px solid var(--border-light);
        }
        .premium-table td { padding: 14px 10px; font-size: 13px; border-bottom: 1px solid var(--border-light); vertical-align: top; }
        
        .col-desc { width: 55%; }
        .col-qty { width: 10%; text-align: center; }
        .col-price { width: 17.5%; text-align: right; }
        .col-total { width: 17.5%; text-align: right; font-weight: 600; }

        .subitem-row td { padding-top: 2px; padding-bottom: 8px; border: none; }
        .subitem-content { 
            font-size: 11px; 
            color: var(--text-muted); 
            padding-left: 12px; 
            position: relative;
        }
        .subitem-content::before { content: "↳"; position: absolute; left: 0; opacity: 0.5; }

        .summary-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 40px;
            margin-top: 20px;
        }
        
        .pix-box { 
            display: flex; gap: 15px; background: #f8fafc; padding: 15px; border-radius: 8px; 
            border: 1px solid #e2e8f0; align-items: center; margin-bottom: 15px;
        }
        .pix-qr { 
            width: 80px; height: 80px; background: white; padding: 2px; flex-shrink: 0; 
            display: flex; align-items: center; justify-content: center;
        }
        .pix-qr img { width: 100% !important; height: 100% !important; object-fit: contain; }
        .pix-info { flex: 1; overflow: hidden; }
        .payment-title { font-weight: 700; color: var(--primary-color); margin-bottom: 4px; font-size: 12px; text-transform: uppercase; }
        
        .totals-box { text-align: right; }
        .total-line { display: flex; justify-content: flex-end; gap: 20px; margin-bottom: 8px; font-size: 13px; }
        .total-line.final { 
            font-size: 20px; font-weight: 800; color: var(--primary-color); margin-top: 15px; 
            padding-top: 15px; border-top: 2px solid var(--border-light);
        }

        .doc-footer {
            margin-top: 40px; text-align: center; font-size: 10px; color: var(--text-muted); padding-top: 20px; border-top: 1px solid var(--border-light);
        }

        /* --- Templates --- */
        .template-clean { font-family: 'Inter', sans-serif; }
        .template-corporate { font-family: 'Lato', sans-serif; }
        .template-corporate .doc-wrapper { padding: 0; }
        .template-corporate .header-bg { background: var(--primary-color); padding: 50px; color: white; display: flex; justify-content: space-between; align-items: center; }
        .template-corporate .doc-header-grid { display: none; }
        .template-corporate .content-padding { padding: 40px 50px; }
        .template-corporate .doc-title-lg { color: white; }
        .template-modern { font-family: 'Inter', sans-serif; }
        .template-elegant { font-family: 'Playfair Display', serif; }
        .template-tech { font-family: 'Space Mono', monospace; }

        .hidden { display: none !important; }
        
        /* Estilo para mobile */
        @media (max-width: 768px) {
            body { flex-direction: column; overflow: hidden; }
            #sidebar-editor { width: 100% !important; min-width: 100% !important; height: calc(100vh - 56px) !important; position: relative !important; order: 2; border-right: none; }
            #preview-main { order: 2; height: calc(100vh - 56px) !important; width: 100% !important; }
            .preview-toolbar { position: sticky; top: 0; z-index: 50; }
            #preview-scroll-area { padding: 20px 10px !important; }
            
            /* Ajuste para que o editor mostre o botão de imprimir no fim do scroll mobile */
            #sidebar-editor .pb-32 { padding-bottom: 120px; }
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #e5e7eb !important;
            color: #9ca3af !important;
            border-color: #d1d5db !important;
        }

        /* Custom Scrollbar para o Editor */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
</head>
<body class="bg-gray-100 h-screen flex flex-col md:flex-row overflow-hidden font-sans text-gray-800">

    <!-- NAV PRINCIPAL MOBILE (NOVO) -->
    <nav id="mobile-main-nav" class="flex md:hidden bg-gray-900 text-white h-14 shrink-0 shadow-lg border-b border-gray-800">
        <button onclick="switchMainTab('edit')" class="flex-1 flex items-center justify-center gap-2 text-sm font-bold border-b-2 border-blue-500" id="btn-main-edit">
            <i class="fa-solid fa-pen-to-square"></i> Editar
        </button>
        <button onclick="switchMainTab('view')" class="flex-1 flex items-center justify-center gap-2 text-sm font-bold border-b-2 border-transparent text-gray-400" id="btn-main-view">
            <i class="fa-solid fa-eye"></i> Visualizar
        </button>
    </nav>

    <!-- SIDEBAR EDITOR -->
    <aside id="sidebar-editor" class="w-full md:w-96 md:min-w-[380px] bg-white border-r border-gray-200 flex flex-col md:h-full z-20 shadow-xl overflow-hidden">
        <!-- Header Editor (Escondido no mobile para poupar espaço se necessário, ou mantido) -->
        <div class="hidden md:flex p-5 border-b border-gray-200 bg-gray-900 text-white justify-between items-center shrink-0">
            <h1 class="text-lg md:text-xl font-bold flex items-center gap-2">
                <i class="fa-solid fa-layer-group text-blue-400"></i> Editor Pro
            </h1>
            <button onclick="resetData()" class="text-xs text-gray-400 hover:text-white transition bg-gray-800 px-3 py-1 rounded">
                <i class="fa-solid fa-rotate-right mr-1"></i> Limpar
            </button>
        </div>

        <!-- Abas Navegação Sub-seções -->
        <div class="flex border-b border-gray-200 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-gray-50 shrink-0 overflow-x-auto">
            <button onclick="switchTab('tab-info')" class="flex-1 min-w-[70px] py-4 font-medium text-blue-600 border-b-2 border-blue-600 active tab-btn" id="btn-tab-info">Dados</button>
            <button onclick="switchTab('tab-items')" class="flex-1 min-w-[70px] py-4 font-medium text-gray-500 hover:text-gray-700 tab-btn" id="btn-tab-items">Itens</button>
            <button onclick="switchTab('tab-photos')" class="flex-1 min-w-[70px] py-4 font-medium text-gray-500 hover:text-gray-700 tab-btn" id="btn-tab-photos">Fotos</button>
            <button onclick="switchTab('tab-style')" class="flex-1 min-w-[70px] py-4 font-medium text-gray-500 hover:text-gray-700 tab-btn" id="btn-tab-style">Design</button>
        </div>

        <!-- Conteúdo Rolável Editor -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar space-y-8 pb-32">
            
            <!-- ABA DADOS -->
            <div id="tab-info" class="tab-content animate-fade-in">
                <!-- Info Doc -->
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 shadow-sm">
                    <h3 class="text-xs font-bold uppercase text-gray-400 mb-2 flex items-center gap-2"><i class="fa-solid fa-file-invoice"></i> Info Documento</h3>
                    <div class="grid grid-cols-2 gap-3 text-left">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Tipo</label>
                            <select id="docType" class="w-full p-2 border rounded text-sm bg-white" onchange="updateDoc()">
                                <option value="ORÇAMENTO">Orçamento</option>
                                <option value="FATURA">Fatura</option>
                                <option value="RECIBO">Recibo</option>
                                <option value="PEDIDO">Pedido</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Número #</label>
                            <input type="text" id="docNumber" class="w-full p-2 border rounded text-sm" oninput="updateDoc()">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3 text-left">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Emissão</label>
                            <input type="date" id="dateIssue" class="w-full p-2 border rounded text-sm" onchange="updateDoc()">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Vencimento</label>
                            <input type="date" id="dateDue" class="w-full p-2 border rounded text-sm" onchange="updateDoc()">
                        </div>
                    </div>
                </div>

                <!-- Emissor -->
                <div class="space-y-4 mt-6 text-left">
                    <h3 class="text-xs font-bold uppercase text-gray-400 border-b pb-1">Emissor (Seus Dados)</h3>
                    <div class="flex items-center gap-3">
                        <label class="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 px-3 py-2 rounded text-sm flex items-center gap-2 shadow-sm w-full justify-center transition-colors">
                            <i class="fa-solid fa-image text-gray-500"></i> 
                            <span class="text-xs font-bold text-gray-600">Logo</span>
                            <input type="file" id="logoInput" accept="image/*" class="hidden" onchange="handleLogoUpload(event)">
                        </label>
                        <div class="flex items-center gap-2 min-w-[70px]">
                             <input type="checkbox" id="showLogo" checked onchange="updateDoc()" class="rounded text-blue-600">
                             <span class="text-xs text-gray-600">Exibir</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-2 items-end">
                        <div class="col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">CPF / CNPJ</label>
                            <input type="text" id="senderCNPJ" placeholder="Seu Documento" class="w-full p-2 border rounded text-sm focus:border-blue-500 outline-none" oninput="validateCnpjSearch('sender')">
                        </div>
                        <button id="btnBuscarCnpjSender" onclick="buscarCnpj('sender')" disabled class="bg-blue-50 text-blue-600 text-[10px] font-bold py-2.5 rounded transition border border-blue-200">BUSCAR</button>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Nome / Razão Social</label>
                        <input type="text" id="senderName" placeholder="Seu Nome Comercial" class="w-full p-2 border rounded text-sm focus:border-blue-500 outline-none" oninput="updateDoc()">
                    </div>
                    <div class="grid grid-cols-3 gap-2 items-end">
                        <div class="col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">CEP</label>
                            <input type="text" id="senderCep" placeholder="00000-000" maxlength="9" class="w-full p-2 border rounded text-sm" oninput="maskCep(this)">
                        </div>
                        <button onclick="buscarCep('sender')" class="bg-gray-200 hover:bg-gray-300 text-[10px] font-bold py-2.5 rounded transition shadow-sm">BUSCAR</button>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Endereço</label>
                        <textarea id="senderAddress" rows="2" class="w-full p-2 border rounded text-sm resize-none focus:border-blue-500 outline-none" oninput="updateDoc()"></textarea>
                    </div>
                    <div class="grid grid-cols-3 gap-2 text-left">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Nº</label>
                            <input type="text" id="senderNumber" class="w-full p-2 border rounded text-sm" oninput="updateDoc()">
                        </div>
                        <div class="col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Complemento</label>
                            <input type="text" id="senderComplement" placeholder="Opcional" class="w-full p-2 border rounded text-sm" oninput="updateDoc()">
                        </div>
                    </div>
                </div>

                <!-- Cliente -->
                <div class="space-y-4 mt-10 text-left">
                    <h3 class="text-xs font-bold uppercase text-gray-400 border-b pb-1">Cliente (Destinatário)</h3>
                    <div class="grid grid-cols-3 gap-2 items-end">
                        <div class="col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">CPF / CNPJ Cliente</label>
                            <input type="text" id="clientDoc" placeholder="Documento do Cliente" class="w-full p-2 border rounded text-sm focus:border-blue-500 outline-none" oninput="validateCnpjSearch('client')">
                        </div>
                        <button id="btnBuscarCnpjClient" onclick="buscarCnpj('client')" disabled class="bg-blue-50 text-blue-600 text-[10px] font-bold py-2.5 rounded transition border border-blue-200">BUSCAR</button>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Nome Completo</label>
                        <input type="text" id="clientName" placeholder="Nome do Cliente" class="w-full p-2 border rounded text-sm focus:border-blue-500 outline-none" oninput="updateDoc()">
                    </div>
                    <div class="grid grid-cols-3 gap-2 items-end">
                        <div class="col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">CEP Cliente</label>
                            <input type="text" id="clientCep" placeholder="00000-000" maxlength="9" class="w-full p-2 border rounded text-sm" oninput="maskCep(this)">
                        </div>
                        <button onclick="buscarCep('client')" class="bg-gray-200 hover:bg-gray-300 text-[10px] font-bold py-2.5 rounded transition shadow-sm">BUSCAR</button>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Endereço Cliente</label>
                        <textarea id="clientAddress" rows="2" class="w-full p-2 border rounded text-sm resize-none focus:border-blue-500 outline-none" oninput="updateDoc()"></textarea>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Nº</label>
                            <input type="text" id="clientNumber" class="w-full p-2 border rounded text-sm" oninput="updateDoc()">
                        </div>
                        <div class="col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Complemento</label>
                            <input type="text" id="clientComplement" class="w-full p-2 border rounded text-sm" oninput="updateDoc()">
                        </div>
                    </div>
                </div>

                <!-- Pagamento -->
                <div class="space-y-3 mt-10 text-left">
                    <h3 class="text-xs font-bold uppercase text-gray-400 border-b pb-1">Pagamento & Pix</h3>
                    <div class="bg-green-50 border border-green-200 rounded p-3">
                        <div class="flex justify-between items-center mb-2">
                            <label class="flex items-center gap-2 text-xs font-bold text-green-800">
                                <i class="fa-brands fa-pix"></i> Chave Pix
                            </label>
                            <input type="checkbox" id="showPix" checked onchange="updateDoc()" class="rounded text-green-600">
                        </div>
                        <input type="text" id="pixKey" placeholder="Sua Chave Pix" class="w-full p-2 border border-green-200 rounded text-sm bg-white mb-2" oninput="updateDoc()">
                        <details class="text-[10px] text-green-700" open>
                            <summary class="cursor-pointer font-bold hover:text-green-900 mb-1">Configuração QR Code</summary>
                            <div class="space-y-2 pl-2 border-l-2 border-green-200">
                                <div>
                                    <label class="block text-[9px] font-bold text-gray-500 uppercase">Beneficiário (Máx 25)</label>
                                    <input type="text" id="pixName" maxlength="25" class="w-full p-1 border rounded bg-white text-[10px]" oninput="updateDoc()">
                                </div>
                                <div>
                                    <label class="block text-[9px] font-bold text-gray-500 uppercase">Cidade (Máx 15)</label>
                                    <input type="text" id="pixCity" maxlength="15" class="w-full p-1 border rounded bg-white text-[10px]" oninput="updateDoc()">
                                </div>
                                <div>
                                    <label class="block text-[9px] font-bold text-gray-500 uppercase">ID Transação (Máx 25)</label>
                                    <input type="text" id="pixTxid" maxlength="25" value="***" class="w-full p-1 border rounded bg-white text-[10px]" oninput="updateDoc()">
                                </div>
                            </div>
                        </details>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Termos e Condições</label>
                        <textarea id="paymentTerms" rows="3" class="w-full p-2 border rounded text-sm" oninput="updateDoc()"></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Observações</label>
                        <textarea id="notes" rows="2" class="w-full p-2 border rounded text-sm" oninput="updateDoc()"></textarea>
                    </div>
                </div>
            </div>

            <!-- ABA ITENS -->
            <div id="tab-items" class="tab-content hidden space-y-4">
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded text-blue-700">
                    <span class="text-xs font-bold uppercase tracking-wider">Serviços / Produtos</span>
                    <button onclick="addItem()" class="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1">
                        <i class="fa-solid fa-plus"></i> Novo Item
                    </button>
                </div>
                <div id="items-list" class="space-y-4"></div>
                <div class="border-t pt-4 mt-6 text-left">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Colunas Visíveis</h3>
                    <div class="flex gap-4 p-2 bg-gray-50 rounded border border-gray-100">
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" id="showQty" checked onchange="updateDoc()" class="rounded text-blue-600"> Qtd</label>
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" id="showUnit" checked onchange="updateDoc()" class="rounded text-blue-600"> Valor</label>
                    </div>
                </div>
            </div>

            <!-- ABA FOTOS -->
            <div id="tab-photos" class="tab-content hidden space-y-5">
                <div class="bg-white p-4 rounded-lg border border-gray-200 text-left">
                    <h3 class="text-xs font-bold text-gray-400 uppercase mb-3"><i class="fa-solid fa-camera"></i> Fotos do Documento</h3>
                    <div class="mb-6">
                        <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Título da Galeria</label>
                        <input type="text" id="photosTitle" placeholder="Ex: Fotos do Serviço" class="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-300 outline-none" oninput="updateDoc()">
                    </div>
                    <div class="space-y-4 border-t pt-4">
                        <div class="border p-3 rounded bg-gray-50 shadow-inner">
                            <label class="text-[9px] font-bold text-gray-500 uppercase mb-2 block">Foto 1</label>
                            <input type="file" accept="image/*" class="w-full text-xs mb-2" onchange="handlePhotoUpload(event, 0)">
                            <input type="text" id="photoCaption0" placeholder="Legenda" class="w-full p-2 text-xs border rounded" oninput="updatePhotoCaption(0, this.value)">
                        </div>
                        <div class="border p-3 rounded bg-gray-50 shadow-inner">
                            <label class="text-[9px] font-bold text-gray-500 uppercase mb-2 block">Foto 2</label>
                            <input type="file" accept="image/*" class="w-full text-xs mb-2" onchange="handlePhotoUpload(event, 1)">
                            <input type="text" id="photoCaption1" placeholder="Legenda" class="w-full p-2 text-xs border rounded" oninput="updatePhotoCaption(1, this.value)">
                        </div>
                        <div class="border p-3 rounded bg-gray-50 shadow-inner">
                            <label class="text-[9px] font-bold text-gray-500 uppercase mb-2 block">Foto 3</label>
                            <input type="file" accept="image/*" class="w-full text-xs mb-2" onchange="handlePhotoUpload(event, 2)">
                            <input type="text" id="photoCaption2" placeholder="Legenda" class="w-full p-2 text-xs border rounded" oninput="updatePhotoCaption(2, this.value)">
                        </div>
                    </div>
                </div>
            </div>

            <!-- ABA DESIGN -->
            <div id="tab-style" class="tab-content hidden space-y-8">
                <div class="text-left">
                    <h3 class="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest uppercase">Cor da Marca</h3>
                    <div class="flex gap-3 flex-wrap mb-6">
                        <button onclick="setThemeColor('#2563eb')" class="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-md hover:scale-110"></button>
                        <button onclick="setThemeColor('#0f172a')" class="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-md hover:scale-110"></button>
                        <button onclick="setThemeColor('#059669')" class="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-md hover:scale-110"></button>
                        <button onclick="setThemeColor('#b91c1c')" class="w-10 h-10 rounded-full bg-red-700 border-2 border-white shadow-md hover:scale-110"></button>
                        <input type="color" id="customColor" onchange="setThemeColor(this.value)" class="w-10 h-10 p-0 border-0 rounded cursor-pointer">
                    </div>
                    <h3 class="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest uppercase">Modelos Premium</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div onclick="setTemplate('template-clean')" class="cursor-pointer border p-3 rounded text-center text-xs font-bold hover:bg-gray-50 template-option" data-tpl="template-clean">Clean</div>
                        <div onclick="setTemplate('template-corporate')" class="cursor-pointer border p-3 rounded text-center text-xs font-bold hover:bg-gray-50 template-option" data-tpl="template-corporate">Corporate</div>
                        <div onclick="setTemplate('template-modern')" class="cursor-pointer border p-3 rounded text-center text-xs font-bold hover:bg-gray-50 template-option" data-tpl="template-modern">Modern</div>
                        <div onclick="setTemplate('template-elegant')" class="cursor-pointer border p-3 rounded text-center text-xs font-bold hover:bg-gray-50 template-option" data-tpl="template-elegant">Elegant</div>
                        <div onclick="setTemplate('template-tech')" class="cursor-pointer border p-3 rounded text-center text-xs font-bold hover:bg-gray-50 template-option" data-tpl="template-tech">Tech</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Botão Ação Principal Desktop -->
        <div class="hidden md:block p-5 border-t bg-white z-20 shrink-0">
            <button onclick="printDocument()" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-3 transform active:scale-95 transition-all">
                <i class="fa-solid fa-print text-xl"></i> IMPRIMIR / PDF
            </button>
        </div>
    </aside>

    <!-- PREVIEW AREA -->
    <main id="preview-main" class="flex-1 bg-gray-700 relative flex flex-col overflow-hidden w-full hidden md:flex">
        <!-- Toolbar Preview -->
        <div class="bg-gray-800 text-white h-14 flex justify-between items-center px-4 md:px-6 shadow-md z-10 shrink-0 preview-toolbar">
            <div class="text-xs md:text-sm font-medium text-gray-300 flex items-center gap-2">
                <i class="fa-regular fa-eye"></i> <span class="hidden sm:inline">Visualização A4</span>
            </div>
            <div class="flex items-center gap-2 md:gap-4 bg-gray-700 rounded-full px-3 py-1">
                <button onclick="adjustZoom(-0.1)" class="hover:text-blue-400 w-8 h-8 flex items-center justify-center transition-colors"><i class="fa-solid fa-minus text-xs"></i></button>
                <span id="zoom-level" class="text-[10px] md:text-xs font-mono w-12 text-center text-gray-300">100%</span>
                <button onclick="adjustZoom(0.1)" class="hover:text-blue-400 w-8 h-8 flex items-center justify-center transition-colors"><i class="fa-solid fa-plus text-xs"></i></button>
            </div>
            <div class="flex gap-2">
                <button onclick="printDocument()" class="md:hidden bg-green-600 text-white px-3 py-1 rounded text-xs font-bold shadow">PDF</button>
            </div>
        </div>

        <!-- Área de Scroll -->
        <div id="preview-scroll-area" class="flex-1 overflow-auto p-4 md:p-10 flex justify-center items-start cursor-default custom-scrollbar">
            
            <div id="document-preview" class="page-container template-clean transition-transform duration-200">
                <div class="header-bg hidden">
                    <div class="flex flex-col">
                        <img id="displayLogoAlt" src="" class="brand-logo brightness-0 invert mb-3 hidden">
                        <div class="text-2xl font-bold tracking-tight" id="displaySenderNameAlt">Empresa</div>
                    </div>
                    <div class="text-right">
                        <div class="doc-title-lg text-white" style="font-size: 30px;">DOC</div>
                        <div class="text-white opacity-80 mt-1">#<span id="displayDocNumberAlt">001</span></div>
                    </div>
                </div>

                <div class="doc-wrapper content-padding">
                    <div class="doc-header-grid text-left">
                        <div>
                            <img id="displayLogo" src="" class="brand-logo mb-4 hidden">
                            <div class="value-lg font-bold text-lg" id="displaySenderName">Empresa</div>
                            <div class="value-lg text-sm text-gray-500 mt-2" id="displaySenderAddress">Endereço...</div>
                            <div class="value-lg text-sm text-gray-500 mt-1" id="displaySenderCNPJ">CNPJ...</div>
                        </div>
                        <div class="text-right flex flex-col items-end">
                            <div class="doc-title-lg" id="displayDocType">ORÇAMENTO</div>
                            <div class="doc-number">Nº <span id="displayDocNumber">001</span></div>
                            <div class="mt-6 text-right space-y-2">
                                <div><span class="label-sm">Emissão</span><span class="value-lg" id="displayDateIssue">--/--/--</span></div>
                                <div id="displayDateDueContainer"><span class="label-sm text-red-500">Vencimento</span><span class="value-lg font-bold text-red-600" id="displayDateDue">--/--/--</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="client-grid text-left">
                        <div>
                            <span class="label-sm mb-2 uppercase">Cliente / Destinatário:</span>
                            <div class="value-lg font-bold text-lg" id="displayClientName">Nome Cliente</div>
                            <div class="value-lg text-gray-600 mt-1" id="displayClientAddress">Endereço</div>
                            <div class="value-lg text-gray-500 text-xs mt-1" id="displayClientDoc">CPF/CNPJ</div>
                        </div>
                    </div>

                    <div id="photosSection" class="hidden mb-8 text-left">
                        <h4 class="label-sm mb-3 border-b border-gray-100 pb-1 font-bold" id="displayPhotosTitle" style="color:var(--primary-color)">FOTOS DO SERVIÇO</h4>
                        <div id="photoGallery" class="photo-gallery"></div>
                    </div>

                    <div class="table-container text-left">
                        <table class="premium-table">
                            <thead>
                                <tr>
                                    <th class="col-desc">Descrição Detalhada</th>
                                    <th class="col-qty">Qtd</th>
                                    <th class="col-price">Preço Unit.</th>
                                    <th class="col-total">Total</th>
                                </tr>
                            </thead>
                            <tbody id="displayItemsTable"></tbody>
                        </table>
                    </div>

                    <div class="summary-grid text-left">
                        <div class="space-y-6">
                            <div id="pixContainer" class="pix-box hidden">
                                <div id="qrcodeCanvas" class="pix-qr"></div>
                                <div class="pix-info">
                                    <div class="payment-title"><i class="fa-brands fa-pix mr-1"></i> PAGAMENTO PIX</div>
                                    <div class="font-mono text-gray-700 text-[10px] bg-white/50 p-1 rounded border border-gray-200/50 break-all leading-tight select-all" id="displayPixKey"></div>
                                </div>
                            </div>
                            <div>
                                <div class="label-sm uppercase">Termos e Condições</div>
                                <div class="value-lg text-xs text-gray-600 mt-1" id="displayPaymentTerms"></div>
                            </div>
                            <div>
                                <div class="label-sm uppercase">Observações</div>
                                <div class="value-lg text-xs text-gray-500 mt-1 italic" id="displayNotes"></div>
                            </div>
                        </div>
                        <div class="totals-box text-right">
                            <div class="total-line"><span class="text-gray-500 uppercase">Subtotal</span><span class="font-medium" id="displaySubtotal">R$ 0,00</span></div>
                            <div class="total-line final"><span>VALOR TOTAL</span><span id="displayTotal">R$ 0,00</span></div>
                        </div>
                    </div>
                    <div class="doc-footer">Documento gerado em <span id="footerDate"></span></div>
                </div>
            </div>
        </div>
    </main>

    <script>
        // --- PIX LOGIC ---
        class PixPayload {
            constructor(k,n,c,t,a){this.k=k;this.n=this.nm(n||'Recebedor',25);this.c=this.nm(c||'Cidade',15);this.t=t||'***';this.a=a?a.toFixed(2):null}
            nm(s,l){return (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").substring(0,l).toUpperCase()}
            crc16(b){let c=0xFFFF;for(let i=0;i<b.length;i++){c^=(b.charCodeAt(i)<<8);for(let j=0;j<8;j++)c=(c&0x8000)?(c<<1)^0x1021:c<<1}return (c&0xFFFF).toString(16).toUpperCase().padStart(4,'0')}
            generate(){if(!this.k)return null;let p='00020126'+(this.k.length+22).toString().padStart(2,'0')+'0014BR.GOV.BCB.PIX01'+this.k.length.toString().padStart(2,'0')+this.k+'520400005303986';if(this.a)p+='54'+this.a.length.toString().padStart(2,'0')+this.a;p+='5802BR59'+this.n.length.toString().padStart(2,'0')+this.n+'60'+this.c.length.toString().padStart(2,'0')+this.c+'62'+(this.t.length+4).toString().padStart(2,'0')+'05'+this.t.length.toString().padStart(2,'0')+this.t+'6304';return p+this.crc16(p)}
        }

        // --- DATA STATE ---
        let docData = {
            type: 'ORÇAMENTO', number: '2024-512',
            sender: { name: 'Lumina Engenharia & Sistemas Ltda', cnpj: '45.892.123/0001-08', address: 'Avenida Rio Branco, Centro\nRio de Janeiro - RJ', number: '156', complement: 'Sala 1204', cep: '20040-003', logo: null },
            client: { name: 'Pizzaria Napolitana Tradicional ME', doc: '12.345.678/0001-00', address: 'Rua dos Pinheiros, Pinheiros\nSão Paulo - SP', number: '820', complement: 'Loja A', cep: '05422-001' },
            dates: { issue: new Date().toISOString().split('T')[0], due: new Date(Date.now()+15*864e5).toISOString().split('T')[0] },
            payment: { terms: 'Pagamento 40% aceite / 60% entrega.', pix: 'financeiro@luminaeng.com.br', pixDetails: { name: 'LUMINA ENGENHARIA', city: 'RIO DE JANEIRO', txid: 'ORC512' } },
            notes: 'Garantia de 90 dias.',
            photosTitle: 'Fotos do Local e Equipamentos',
            photos: [{src:null,caption:''},{src:null,caption:''},{src:null,caption:''}],
            config: { showLogo:true, showPix:true, showQty:true, showUnit:true, template:'template-clean', color:'#2563eb', zoom: 0.8 },
            items: [
                {id:1,desc:'Instalação de Sistema Fotovoltaico',qty:1,price:8500,subItems:[{desc:'Módulos Solares 450W', qty:6, price:0, show:false}]},
                {id:2,desc:'Monitoramento Inteligente (Anual)',qty:1,price:450,subItems:[]}
            ]
        };

        // --- INITIALIZATION ---
        document.addEventListener('DOMContentLoaded', () => {
            loadFromStorage();
            renderItemsList();
            updateDoc();
            setupAutoSave();
            autoFitZoom();
            window.addEventListener('resize', autoFitZoom);
        });

        // --- MAIN TABS SWITCH (MOBILE ONLY) ---
        function switchMainTab(tab) {
            const sidebar = document.getElementById('sidebar-editor');
            const preview = document.getElementById('preview-main');
            const btnEdit = document.getElementById('btn-main-edit');
            const btnView = document.getElementById('btn-main-view');

            if (tab === 'edit') {
                sidebar.classList.remove('hidden');
                preview.classList.add('hidden');
                btnEdit.classList.add('border-blue-500');
                btnEdit.classList.remove('text-gray-400');
                btnView.classList.remove('border-blue-500');
                btnView.classList.add('text-gray-400');
            } else {
                sidebar.classList.add('hidden');
                preview.classList.remove('hidden', 'md:flex'); // Garante flex no mobile também
                preview.classList.add('flex');
                btnView.classList.add('border-blue-500');
                btnView.classList.remove('text-gray-400');
                btnEdit.classList.remove('border-blue-500');
                btnEdit.classList.add('text-gray-400');
                // Recalcula zoom ao trocar de aba para garantir visibilidade
                setTimeout(autoFitZoom, 50);
            }
        }

        // --- MOBILE PREVIEW HELPERS ---
        function autoFitZoom() {
            const previewScroll = document.getElementById('preview-scroll-area');
            if (!previewScroll) return;
            const containerWidth = previewScroll.clientWidth - 40;
            const a4Width = 794; 
            const calcZoom = Math.floor((containerWidth / a4Width) * 100) / 100;
            
            // No Desktop mantemos o zoom do estado se for > calcZoom, no mobile forçamos o fit inicial
            if (window.innerWidth <= 768) {
                docData.config.zoom = Math.min(calcZoom, 0.9);
            }
            applyZoom();
        }

        function applyZoom() {
            const el = document.getElementById('document-preview');
            const level = document.getElementById('zoom-level');
            if (el) el.style.transform = `scale(${docData.config.zoom})`;
            if (level) level.innerText = Math.round(docData.config.zoom * 100) + '%';
        }

        function adjustZoom(delta) {
            docData.config.zoom = Math.max(0.3, Math.min(2.0, docData.config.zoom + delta));
            applyZoom();
        }

        // --- API & SEARCH LOGIC ---
        function maskCep(el) { let v = el.value.replace(/\D/g, ""); if (v.length > 5) v = v.substring(0, 5) + "-" + v.substring(5, 8); el.value = v; }
        
        function validateCnpjSearch(type) {
            const inputId = type === 'sender' ? 'senderCNPJ' : 'clientDoc';
            const btnId = type === 'sender' ? 'btnBuscarCnpjSender' : 'btnBuscarCnpjClient';
            const el = document.getElementById(inputId);
            if(!el) return;
            const val = el.value.replace(/\D/g, "");
            const btn = document.getElementById(btnId);
            if (btn) btn.disabled = (val.length !== 14);
            updateDoc();
        }

        async function buscarCnpj(type) {
            const inputId = type === 'sender' ? 'senderCNPJ' : 'clientDoc';
            const cnpj = document.getElementById(inputId).value.replace(/\D/g, "");
            if (cnpj.length !== 14) return;
            try {
                showMsg("Buscando dados...");
                const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
                if (!response.ok) throw new Error();
                const data = await response.json();
                const name = data.razao_social || data.nome_fantasia;
                const addr = `${data.logradouro}, ${data.bairro}\n${data.municipio} - ${data.uf}`;
                document.getElementById(type + 'Name').value = name;
                document.getElementById(type + 'Address').value = addr;
                document.getElementById(type + 'Number').value = data.numero || '';
                document.getElementById(type + 'Complement').value = data.complemento || '';
                document.getElementById(type + 'Cep').value = data.cep || '';
                docData[type].name = name; docData[type].address = addr;
                docData[type].number = data.numero; docData[type].complement = data.complemento; docData[type].cep = data.cep;
                showMsg("Empresa carregada!");
                updateDoc();
            } catch (err) { showMsg("CNPJ não localizado."); }
        }

        async function buscarCep(type) {
            const cepInput = document.getElementById(type + 'Cep');
            const cep = cepInput.value.replace(/\D/g, "");
            if (cep.length !== 8) { showMsg("CEP inválido."); return; }
            try {
                const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await r.json();
                if (data.erro) { showMsg("CEP inexistente."); } else {
                    const formatado = `${data.logradouro}, ${data.bairro}\n${data.localidade} - ${data.uf}`;
                    document.getElementById(type + 'Address').value = formatado;
                    docData[type].address = formatado;
                    docData[type].cep = cepInput.value;
                    document.getElementById(type + 'Number').focus();
                    updateDoc();
                }
            } catch (err) { showMsg("Erro na busca."); }
        }

        function showMsg(txt) {
            const m = document.createElement('div');
            m.className = "fixed top-20 md:top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl z-[100] text-xs font-bold transition-all duration-300";
            m.innerText = txt; document.body.appendChild(m);
            setTimeout(() => { m.style.opacity = '0'; setTimeout(() => m.remove(), 300); }, 2500);
        }

        // --- ITEMS & SUBITEMS ---
        function addItem(){ docData.items.push({id:Date.now(),desc:'',qty:1,price:0,subItems:[]}); renderItemsList(); updateDoc(); }
        function removeItem(id){ if(docData.items.length>1){ docData.items=docData.items.filter(i=>i.id!==id); renderItemsList(); updateDoc(); } }
        function addSubItem(pid){ docData.items.find(i=>i.id===pid).subItems.push({desc:'', qty: 1, price: 0, show: false}); renderItemsList(); updateDoc(); }
        function removeSubItem(pid,idx){ docData.items.find(i=>i.id===pid).subItems.splice(idx,1); renderItemsList(); updateDoc(); }
        
        function updateItemValue(id,f,v,sIdx=null){
            const i=docData.items.find(x=>x.id===id);
            if(sIdx!==null){ 
                if(f==='price') i.subItems[sIdx].price=parseFloat(v)||0; 
                else if(f==='qty') i.subItems[sIdx].qty=parseFloat(v)||0;
                else if(f==='show') i.subItems[sIdx].show=v;
                else i.subItems[sIdx].desc=v; 
            } else { 
                if(f==='price'||f==='qty') i[f]=parseFloat(v)||0; 
                else i[f]=v; 
            }
            updateDoc();
        }

        function renderItemsList(){
            const l=document.getElementById('items-list'); l.innerHTML='';
            docData.items.forEach((it,idx)=>{
                let subs='';
                it.subItems.forEach((s,si)=>{ 
                    subs+=`
                    <div class="bg-gray-50 border border-gray-100 rounded p-3 mt-2 ml-4 shadow-inner text-left">
                        <div class="space-y-3">
                            <div>
                                <label class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Subitem</label>
                                <div class="flex gap-2">
                                    <input class="flex-1 p-1.5 text-[10px] border rounded" value="${s.desc}" oninput="updateItemValue(${it.id},'desc',this.value,${si})">
                                    <button onclick="removeSubItem(${it.id},${si})" class="text-red-400"><i class="fa-solid fa-times"></i></button>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-2 items-center">
                                <div><label class="block text-[8px] text-gray-400 uppercase">Qtd</label><input type="number" class="w-full p-1 text-[10px] border rounded" value="${s.qty}" oninput="updateItemValue(${it.id},'qty',this.value,${si})"></div>
                                <div><label class="block text-[8px] text-gray-400 uppercase">Preço</label><input type="number" step="0.01" class="w-full p-1 text-[10px] border rounded" value="${s.price}" oninput="updateItemValue(${it.id},'price',this.value,${si})"></div>
                                <div class="flex items-center pt-2">
                                    <label class="flex items-center gap-1 text-[8px] font-bold text-gray-500 cursor-pointer select-none">
                                        <input type="checkbox" ${s.show ? 'checked' : ''} onchange="updateItemValue(${it.id},'show',this.checked,${si})" class="rounded text-blue-600"> EXIBIR?
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
                const el=document.createElement('div'); el.className='bg-white border rounded p-3 shadow-sm hover:border-blue-200 transition-colors text-left';
                el.innerHTML=`
                    <div class="flex gap-2 items-start">
                        <span class="font-bold text-gray-300 mt-6">${idx+1}</span>
                        <div class="flex-1 space-y-3">
                            <div>
                                <label class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Descrição</label>
                                <input class="w-full p-2 text-sm border rounded font-semibold focus:ring-1 focus:ring-blue-300 outline-none" value="${it.desc}" oninput="updateItemValue(${it.id},'desc',this.value)">
                            </div>
                            <div class="flex gap-2 items-end">
                                <div class="flex-1 grid grid-cols-2 gap-2">
                                    <div><label class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Qtd</label><input type="number" class="w-full p-1.5 text-sm border rounded" value="${it.qty}" oninput="updateItemValue(${it.id},'qty',this.value)"></div>
                                    <div><label class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Valor</label><input type="number" step="0.01" class="w-full p-1.5 text-sm border rounded" value="${it.price}" oninput="updateItemValue(${it.id},'price',this.value)"></div>
                                </div>
                                <div class="flex gap-1">
                                    <button onclick="addSubItem(${it.id})" class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-2 rounded">SUB</button>
                                    <button onclick="removeItem(${it.id})" class="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-2 rounded"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>${subs}`;
                l.appendChild(el);
            });
        }

        function updateDoc(){
            const safeGet = (id) => document.getElementById(id)?.value || '';
            docData.type = safeGet('docType');
            docData.number = safeGet('docNumber');
            ['sender', 'client'].forEach(type => {
                const prefix = type === 'sender' ? 'sender' : 'client';
                const cnpjId = type === 'sender' ? 'senderCNPJ' : 'clientDoc';
                docData[type].name = safeGet(prefix + 'Name');
                docData[type].cnpj = safeGet(cnpjId);
                docData[type].address = safeGet(prefix + 'Address');
                docData[type].number = safeGet(prefix + 'Number');
                docData[type].complement = safeGet(prefix + 'Complement');
                docData[type].cep = safeGet(prefix + 'Cep');
            });
            docData.dates.issue = safeGet('dateIssue');
            docData.dates.due = safeGet('dateDue');
            docData.payment.terms = safeGet('paymentTerms');
            docData.payment.pix = safeGet('pixKey');
            docData.payment.pixDetails.name = safeGet('pixName');
            docData.payment.pixDetails.city = safeGet('pixCity');
            docData.payment.pixDetails.txid = safeGet('pixTxid');
            docData.notes = safeGet('notes');
            docData.photosTitle = safeGet('photosTitle');
            
            docData.config.showLogo = document.getElementById('showLogo')?.checked;
            docData.config.showPix = document.getElementById('showPix')?.checked;
            docData.config.showQty = document.getElementById('showQty')?.checked;
            docData.config.showUnit = document.getElementById('showUnit')?.checked;

            const txt=(id,v)=>document.querySelectorAll('#'+id).forEach(e=>e.innerText=v||'');
            const formatFullAddress = (obj) => {
                if(!obj.address) return '';
                let lines = obj.address.split('\n');
                let addr = lines[0];
                if(obj.number) addr += ', ' + obj.number;
                if(obj.complement) addr += ' - ' + obj.complement;
                if(lines[1]) addr += '\n' + lines[1];
                return addr;
            };

            txt('displayDocType',docData.type); txt('displayDocNumber',docData.number); txt('displayDocNumberAlt',docData.number);
            txt('displaySenderName',docData.sender.name); txt('displaySenderNameAlt',docData.sender.name);
            txt('displaySenderAddress', formatFullAddress(docData.sender)); txt('displaySenderCNPJ',docData.sender.cnpj);
            txt('displayClientName',docData.client.name); txt('displayClientDoc',docData.client.doc); 
            txt('displayClientAddress', formatFullAddress(docData.client));
            txt('displayDateIssue',fmtDate(docData.dates.issue));
            if(docData.dates.due){ document.getElementById('displayDateDueContainer').classList.remove('hidden'); txt('displayDateDue',fmtDate(docData.dates.due)); }
            else document.getElementById('displayDateDueContainer').classList.add('hidden');
            txt('displayPaymentTerms',docData.payment.terms); txt('displayNotes',docData.notes);
            txt('displayPhotosTitle', docData.photosTitle);
            document.getElementById('footerDate').innerText=new Date().toLocaleDateString();

            document.querySelectorAll('.brand-logo').forEach(i=>{ if(docData.config.showLogo && docData.sender.logo){i.src=docData.sender.logo; i.classList.remove('hidden');} else i.classList.add('hidden'); });

            const gal=document.getElementById('photoGallery');
            const photosArea = document.getElementById('photosSection');
            if(docData.photos && docData.photos.some(p=>p.src)){
                photosArea.classList.remove('hidden'); gal.innerHTML='';
                docData.photos.forEach(p=>{ if(p.src) gal.innerHTML+=`<div class="photo-item"><img src="${p.src}" class="photo-img"><div class="photo-caption">${p.caption}</div></div>`; });
            } else photosArea.classList.add('hidden');

            const tb=document.getElementById('displayItemsTable'); tb.innerHTML=''; let total = 0;
            document.querySelectorAll('.col-qty').forEach(e=>e.style.display=docData.config.showQty?'':'none');
            document.querySelectorAll('.col-price').forEach(e=>e.style.display=docData.config.showUnit?'':'none');
            
            docData.items.forEach(i=>{
                let iSubSum = 0;
                i.subItems.forEach(s => iSubSum += (s.qty * s.price));
                let iTot = (i.qty * i.price) + iSubSum;
                total += iTot;
                tb.innerHTML += `<tr><td><div class="font-bold text-gray-800">${i.desc}</div></td><td class="text-center" style="display:${docData.config.showQty?'':'none'}">${i.qty}</td><td class="text-right" style="display:${docData.config.showUnit?'':'none'}">${fmtMoney(i.price)}</td><td class="text-right font-bold">${fmtMoney(iTot)}</td></tr>`;
                i.subItems.forEach(s=>{ 
                    tb.innerHTML += `
                        <tr class="subitem-row">
                            <td><div class="subitem-content text-xs">${s.desc}</div></td>
                            <td class="text-center text-[10px] text-gray-500" style="display:${docData.config.showQty?'':'none'}">${s.show ? s.qty : ''}</td>
                            <td class="text-right text-[10px] text-gray-500" style="display:${docData.config.showUnit?'':'none'}">${s.show ? fmtMoney(s.price) : ''}</td>
                            <td class="text-right text-[10px] text-gray-500">${s.show ? fmtMoney(s.qty * s.price) : ''}</td>
                        </tr>`; 
                });
            });
            txt('displaySubtotal',fmtMoney(total)); txt('displayTotal',fmtMoney(total));

            const pc=document.getElementById('pixContainer'); const qc=document.getElementById('qrcodeCanvas');
            if(docData.payment.pix && docData.config.showPix){
                pc.classList.remove('hidden'); txt('displayPixKey',docData.payment.pix);
                const pp=new PixPayload(docData.payment.pix, docData.payment.pixDetails.name, docData.payment.pixDetails.city, docData.payment.pixDetails.txid, total>0?total:null).generate();
                qc.innerHTML='';
                if(pp){
                    try {
                        let qr = qrcode(0, 'L'); qr.addData(pp); qr.make();
                        qc.innerHTML = qr.createImgTag(2, 0);
                        qc.querySelector('img').style.cssText="width:100%;height:100%;object-fit:contain;";
                    } catch(e) { qc.innerHTML='<span class="text-xs">Erro QR</span>'; }
                }
            } else pc.classList.add('hidden');
            saveToStorage();
        }

        // --- UTILS ---
        const fmtMoney=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
        const fmtDate=d=>{if(!d)return '';const[y,m,x]=d.split('-');return `${x}/${m}/${y}`;}
        function handleLogoUpload(e){const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>{docData.sender.logo=ev.target.result;updateDoc();};r.readAsDataURL(f);}}
        function handlePhotoUpload(e,i){const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>{docData.photos[i].src=ev.target.result;updateDoc();};r.readAsDataURL(f);}}
        function updatePhotoCaption(i,v){docData.photos[i].caption=v;updateDoc();}
        function printDocument(){ window.print(); }
        function setThemeColor(c){document.documentElement.style.setProperty('--primary-color',c);document.documentElement.style.setProperty('--secondary-color',c);docData.config.color=c;saveToStorage();}
        
        function setTemplate(t){
            const doc = document.getElementById('document-preview');
            if (doc) doc.className=`page-container transition-all duration-300 ${t}`;
            const bg=document.querySelector('.header-bg'), gd=document.querySelector('.doc-header-grid');
            if(bg && gd){ if(t==='template-corporate'){bg.classList.remove('hidden');gd.classList.add('hidden');}else{bg.classList.add('hidden');gd.classList.remove('hidden');} }
            docData.config.template=t; saveToStorage();
            document.querySelectorAll('.template-option').forEach(e=>{if(e.dataset.tpl===t)e.classList.add('bg-blue-600','text-white');else e.classList.remove('bg-blue-600','text-white');});
        }

        function saveToStorage(){localStorage.setItem('meiDocProDataV17',JSON.stringify(docData));}
        
        function loadFromStorage(){
            const s=localStorage.getItem('meiDocProDataV17');
            if(s){ const l=JSON.parse(s); docData={...docData,...l}; }
            const safeSet = (id, val) => { const el = document.getElementById(id); if(el) el.value = val || ''; };
            safeSet('docType', docData.type); safeSet('docNumber', docData.number);
            ['sender', 'client'].forEach(p => {
                safeSet(p+'Name', docData[p].name); safeSet(p+(p==='sender'?'CNPJ':'Doc'), docData[p].cnpj);
                safeSet(p+'Address', docData[p].address); safeSet(p+'Number', docData[p].number);
                safeSet(p+'Complement', docData[p].complement); safeSet(p+'Cep', docData[p].cep);
            });
            safeSet('dateIssue', docData.dates.issue); safeSet('dateDue', docData.dates.due);
            safeSet('paymentTerms', docData.payment.terms); safeSet('pixKey', docData.payment.pix);
            safeSet('photosTitle', docData.photosTitle);
            if(docData.payment.pixDetails){ safeSet('pixName', docData.payment.pixDetails.name); safeSet('pixCity', docData.payment.pixDetails.city); safeSet('pixTxid', docData.payment.pixDetails.txid); }
            safeSet('notes', docData.notes);
            setElementChecked('showLogo', docData.config.showLogo); setElementChecked('showPix', docData.config.showPix);
            setElementChecked('showQty', docData.config.showQty); setElementChecked('showUnit', docData.config.showUnit);
            if(docData.config.color) setThemeColor(docData.config.color);
            if(docData.config.template) setTemplate(docData.config.template);
            validateCnpjSearch('sender'); validateCnpjSearch('client');
            applyZoom();
        }

        function resetData(){if(confirm('Restaurar dados?')){localStorage.removeItem('meiDocProDataV17');location.reload();}}
        function setupAutoSave(){document.querySelectorAll('input,textarea,select').forEach(i=>i.addEventListener('input',updateDoc));}
        
        function switchTab(t){
            document.querySelectorAll('.tab-content').forEach(x=>x.classList.add('hidden'));document.getElementById(t).classList.remove('hidden');
            document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('text-blue-600','border-b-2','border-blue-600','active');b.classList.add('text-gray-500');});
            const activeBtn = document.getElementById('btn-'+t);
            if(activeBtn) { activeBtn.classList.add('text-blue-600','border-b-2','border-blue-600','active'); activeBtn.classList.remove('text-gray-500'); }
        }
    </script>
</body>
</html>
