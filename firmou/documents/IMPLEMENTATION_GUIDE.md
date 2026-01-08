# GUIA DE IMPLEMENTAÇÃO FIRMOU.COM
# Funcionalidades que faltam adicionar ao index.html

## 1. ABA DE FOTOS (Adicionar após sect-items)

```html
<!-- TAB PHOTOS -->
<div id="sect-photos" class="hidden space-y-6">
    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border">
        <div class="flex justify-between mb-4">
            <h4 class="text-sm font-bold">Galeria de Fotos</h4>
            <label class="flex items-center gap-2">
                <input type="checkbox" id="showPhotos" onchange="upd()">
                <span class="text-xs font-bold">Exibir no PDF</span>
            </label>
        </div>
        
        <!-- 3 Photo Uploads com Thumbnails -->
        <div class="space-y-4">
            <div class="flex gap-3">
                <div class="w-20 h-20 bg-slate-100 rounded overflow-hidden">
                    <img id="photo-prev-0" class="w-full h-full object-cover hidden">
                </div>
                <div class="flex-1">
                    <input type="file" id="photo-0" class="hidden" onchange="handlePhoto(event,0)">
                    <button onclick="document.getElementById('photo-0').click()" class="w-full bg-slate-100 p-2 rounded text-xs">Escolher Foto 1</button>
                    <input type="text" id="photo-cap-0" placeholder="Legenda" class="w-full p-2 text-xs mt-2" oninput="upd()">
                </div>
            </div>
            <!-- Repetir para photo-1 e photo-2 -->
        </div>
    </div>
</div>
```

## 2. TEMPLATES GRID (Adicionar no sect-design)

```javascript
// Renderizar os 10 templates
const templates = [
    {id:'tpl-clean', name:'Clean', desc:'Minimalista'},
    {id:'tpl-industrial', name:'Industrial', desc:'Construção'},
    {id:'tpl-elegant', name:'Elegant', desc:'Artesãos'},
    {id:'tpl-tech', name:'Tech', desc:'TI'},
    {id:'tpl-modern', name:'Modern', desc:'Startups'},
    {id:'tpl-corporate', name:'Corporate', desc:'B2B'},
    {id:'tpl-bold', name:'Bold', desc:'Impacto'},
    {id:'tpl-pastel', name:'Pastel', desc:'Beleza'},
    {id:'tpl-dark', name:'Dark', desc:'Gaming'},
    {id:'tpl-handwritten', name:'Handwritten', desc:'Artesanal'}
];

function renderTemplates() {
    const grid = document.getElementById('tpl-grid');
    grid.innerHTML = templates.map(t => `
        <div onclick="setTemplate('${t.id}')" class="tpl-card cursor-pointer border p-3 rounded hover:bg-blue-50" data-tpl="${t.id}">
            <div class="font-bold text-xs">${t.name}</div>
            <div class="text-[10px] text-slate-500">${t.desc}</div>
        </div>
    `).join('');
}
```

## 3. FUNÇÃO handlePhoto (Adicionar no JavaScript)

```javascript
function handlePhoto(e, idx) {
    const f = e.target.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
        if(!state.photos) state.photos = [{},{},{}];
        state.photos[idx].src = ev.target.result;
        state.photos[idx].caption = document.getElementById(`photo-cap-${idx}`).value;
        document.getElementById(`photo-prev-${idx}`).src = ev.target.result;
        document.getElementById(`photo-prev-${idx}`).classList.remove('hidden');
        save();
        renderPreview();
    };
    r.readAsDataURL(f);
}
```

## 4. MODO ESCURO (Adicionar função)

```javascript
function toggleDarkMode() {
    state.cfg.dark = !state.cfg.dark;
    document.documentElement.classList.toggle('dark');
    save();
}
```

## 5. FAQ EXPANDIDO (Adicionar mais perguntas)

```html
<details class="group border-b pb-4">
    <summary class="font-bold cursor-pointer">Como adicionar fotos?</summary>
    <p class="text-xs mt-4">Vá na aba "Fotos", escolha até 3 imagens e marque "Exibir no PDF".</p>
</details>

<details class="group border-b pb-4">
    <summary class="font-bold cursor-pointer">O LocalStorage está bloqueado, e agora?</summary>
    <p class="text-xs mt-4">Use o botão "Exportar TXT" para salvar seus dados antes de fechar o navegador.</p>
</details>

<details class="group border-b pb-4">
    <summary class="font-bold cursor-pointer">Como funciona o PIX QR Code?</summary>
    <p class="text-xs mt-4">Digite sua chave PIX. O QR Code é estático. SEMPRE confira os valores antes de enviar ao cliente.</p>
</details>
```

## 6. SEO JSON-LD (Adicionar no <head>)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Firmou",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "description": "Gerador gratuito de orçamentos, faturas e recibos para profissionais autônomos"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Como os dados são salvos?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Tudo fica no LocalStorage do seu navegador. Nada é enviado para servidores."
    }
  }]
}
</script>
```

## 7. ATUALIZAR STATE INICIAL

```javascript
let state = {
    doc: { type: 'ORÇAMENTO', num: '2024-001', date: new Date().toISOString().split('T')[0], status: 'ABERTO' },
    my: { name: '', doc: '', cep: '', addr: '', logo: '' },
    cl: { name: '', doc: '', cep: '', addr: '' },
    items: [],
    photos: [{src:'',caption:''},{src:'',caption:''},{src:'',caption:''}],
    cfg: { col: '#fbbf24', tpl: 'tpl-clean', zoom: 0.8, dark: false, showPhotos: false },
    pay: { pix: '', terms: '', notes: '' }
};
```

## 8. RENDERIZAR FOTOS NO PREVIEW

```javascript
// Dentro da função renderPreview(), adicionar antes da tabela:
if(state.cfg.showPhotos && state.photos && state.photos.some(p => p.src)) {
    html += `
        <div class="grid grid-cols-3 gap-3 mb-6">
            ${state.photos.filter(p => p.src).map(p => `
                <div class="border rounded p-2">
                    <img src="${p.src}" class="w-full h-24 object-cover rounded">
                    <p class="text-[8px] text-center mt-1">${p.caption || ''}</p>
                </div>
            `).join('')}
        </div>
    `;
}
```

## CHECKLIST DE IMPLEMENTAÇÃO
- [ ] Adicionar aba de fotos HTML
- [ ] Adicionar função handlePhoto
- [ ] Adicionar renderTemplates e grid de templates
- [ ] Adicionar toggleDarkMode
- [ ] Expandir FAQ com 5+ perguntas
- [ ] Adicionar JSON-LD schemas
- [ ] Atualizar state com photos
- [ ] Renderizar fotos no preview
- [ ] Testar em mobile e desktop
- [ ] Validar geração de PDF com fotos
