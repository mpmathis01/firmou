# 📘 FIRMOU.COM - Documentação Técnica Completa

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Funcionalidades](#funcionalidades)
4. [Guia de Uso](#guia-de-uso)
5. [Integração com Blogger](#integração-com-blogger)
6. [Manutenção e Suporte](#manutenção-e-suporte)
7. [FAQ Técnico](#faq-técnico)

---

## Visão Geral

**firmou.com** é uma Single Page Application (SPA) para geração de documentos comerciais profissionais, desenvolvida especificamente para profissionais autônomos, MEIs e pequenos negócios.

### Características Principais
- ✅ 100% Client-Side (sem backend)
- ✅ Persistência via LocalStorage
- ✅ Geração de PDF no navegador
- ✅ 10 Templates Premium
- ✅ Galeria de 3 fotos
- ✅ PIX QR Code integrado
- ✅ Busca automática de CNPJ/CEP
- ✅ Totalmente responsivo
- ✅ Modo claro/escuro

---

## Arquitetura

### Stack Tecnológico

```
Frontend:
├── HTML5 (Estrutura)
├── Tailwind CSS 3.x (Estilização via CDN)
├── Vanilla JavaScript ES6+ (Lógica)
└── Google Fonts (Tipografia)

Bibliotecas:
├── html2pdf.js 0.10.1 (Geração de PDF)
├── qrcode-generator 1.4.4 (QR Codes)
└── FontAwesome 6.4.0 (Ícones)

APIs Externas:
├── BrasilAPI (Busca CNPJ)
└── ViaCEP (Busca CEP)

Storage:
└── LocalStorage API (Persistência)
```

### Estrutura de Dados

```javascript
state = {
    doc: {
        type: 'ORÇAMENTO',      // Tipo do documento
        num: '2024-001',         // Número do documento
        date: '2024-01-05',      // Data de emissão
        status: 'ABERTO'         // Status (ABERTO, APROVADO, PAGO, CANCELADO)
    },
    my: {                        // Dados do emissor
        name: '',
        doc: '',                 // CPF/CNPJ
        cep: '',
        addr: '',
        logo: ''                 // Base64 da imagem
    },
    cl: {                        // Dados do cliente
        name: '',
        doc: '',
        cep: '',
        addr: ''
    },
    items: [                     // Array de itens
        {
            id: 1,
            d: 'Descrição',      // Descrição
            q: 1,                // Quantidade
            p: 100,              // Preço unitário
            sItems: []           // Sub-itens
        }
    ],
    photos: [                    // Array de fotos (max 3)
        {
            src: '',             // Base64 da imagem
            caption: ''          // Legenda opcional
        }
    ],
    cfg: {                       // Configurações
        col: '#fbbf24',          // Cor principal
        tpl: 'tpl-clean',        // Template selecionado
        zoom: 0.8,               // Zoom do preview
        dark: false,             // Modo escuro
        showPhotos: false        // Exibir fotos no PDF
    },
    pay: {                       // Dados de pagamento
        pix: '',                 // Chave PIX
        terms: '',               // Condições de pagamento
        notes: ''                // Observações
    }
}
```

---

## Funcionalidades

### 1. Editor de Documentos

#### Tipos de Documento Suportados
1. **Orçamento** - Para propostas comerciais
2. **Pedido** - Para confirmação de compra
3. **Recibo** - Para comprovação de pagamento
4. **Promissória** - Para compromissos de pagamento
5. **Cobrança** - Para solicitação de pagamento

#### Campos Disponíveis
- **Emissor**: Nome, CPF/CNPJ, CEP, Endereço, Logo
- **Cliente**: Nome, CPF/CNPJ, CEP, Endereço
- **Itens**: Descrição, Quantidade, Valor Unitário, Sub-itens
- **Fotos**: 3 imagens com legendas opcionais
- **Pagamento**: Chave PIX, Condições, Observações

### 2. Galeria de Fotos

**Como usar:**
1. Acesse a aba "Fotos"
2. Clique em "Escolher Foto" para cada slot (máximo 3)
3. Adicione legendas opcionais
4. Marque "Exibir no PDF" para incluir no documento
5. As fotos são salvas automaticamente no LocalStorage

**Formatos suportados:** JPG, PNG, GIF, WebP  
**Tamanho recomendado:** Máximo 2MB por foto  
**Renderização:** Grid 3 colunas no PDF

### 3. Templates Premium

| Template | Fonte | Estilo | Ideal Para |
|----------|-------|--------|------------|
| **Clean** | Inter | Minimalista, bordas finas | Consultores, profissionais liberais |
| **Industrial** | Inter Bold | Negrito, caixa alta | Construção, mecânica, serralheria |
| **Elegant** | Playfair Display | Serif, itálico | Artesãos, designers, fotógrafos |
| **Tech** | Space Mono | Monospace, grid | TI, eletrônica, automação |
| **Modern** | Outfit | Cantos arredondados | Startups, marketing, social media |
| **Corporate** | Inter | Header colorido | Empresas estabelecidas, B2B |
| **Bold** | Outfit Black | Títulos gigantes | Eventos, publicidade |
| **Pastel** | Inter Light | Cores suaves | Estética, beleza, infantil |
| **Dark** | Inter | Fundo escuro | Tech, gaming |
| **Handwritten** | Inter | Aparência manuscrita | Artesanato, gastronomia |

### 4. Busca Automática

#### CNPJ (BrasilAPI)
```javascript
// Ao digitar 14 dígitos, busca automática
Input: 45.892.123/0001-08
Output: {
    razao_social: "Empresa Ltda",
    logradouro: "Rua Exemplo",
    numero: "123",
    bairro: "Centro",
    municipio: "São Paulo",
    uf: "SP"
}
```

#### CEP (ViaCEP)
```javascript
// Ao completar CEP, busca automática
Input: 20040-003
Output: {
    logradouro: "Av. Rio Branco",
    bairro: "Centro",
    localidade: "Rio de Janeiro",
    uf: "RJ"
}
```

### 5. PIX QR Code

**Funcionamento:**
1. Digite a chave PIX (CPF, email, telefone, chave aleatória)
2. QR Code é gerado automaticamente
3. Aparece no rodapé do documento

**⚠️ Importante:** O QR Code gerado é **estático** (apenas a chave). Para QR Codes dinâmicos com valor embutido, seria necessário implementar o padrão EMV do Banco Central.

### 6. Persistência de Dados

#### LocalStorage
- **Chave:** `firmou_store`
- **Formato:** JSON stringificado
- **Tamanho máximo:** ~5MB (limite do navegador)
- **Persistência:** Até limpar cache do navegador

#### Export/Import
- **Formato:** `.txt` contendo JSON
- **Uso:** Backup manual dos dados
- **Localização:** Aba "Arquivos"

**Exemplo de arquivo exportado:**
```json
{
  "doc": {"type":"ORÇAMENTO","num":"2024-001",...},
  "my": {...},
  "cl": {...},
  "items": [...],
  "photos": [...],
  "cfg": {...},
  "pay": {...}
}
```

---

## Guia de Uso

### Para o Usuário Final

#### 1. Primeiro Acesso
1. Abra o site
2. Você verá dados fictícios de exemplo (Refrigeração Polar Sul)
3. Clique em **"Limpar Tudo"** no banner amarelo para começar

#### 2. Criando um Orçamento

**Passo 1: Dados Básicos**
- Aba "Dados"
- Preencha seus dados (emissor)
- Preencha dados do cliente
- Use busca automática de CNPJ/CEP quando possível

**Passo 2: Adicionar Itens**
- Aba "Itens"
- Clique em "+ Novo Item"
- Preencha descrição, quantidade e valor
- Repita para cada item

**Passo 3: Adicionar Fotos (Opcional)**
- Aba "Fotos"
- Escolha até 3 fotos
- Adicione legendas
- Marque "Exibir no PDF"

**Passo 4: Escolher Template**
- Aba "Estilo"
- Selecione um dos 10 templates
- Ajuste a cor principal se desejar

**Passo 5: Gerar PDF**
- Clique em "Ver" para visualizar
- Ajuste o zoom se necessário
- Clique em **"Gerar PDF Profissional"**

#### 3. Salvando e Recuperando

**Salvamento Automático:**
- Tudo é salvo automaticamente no LocalStorage
- Não precisa fazer nada

**Backup Manual:**
- Aba "Arquivos"
- Clique em "Exportar TXT"
- Guarde o arquivo no seu computador

**Recuperar Backup:**
- Aba "Arquivos"
- Clique em "Importar TXT"
- Selecione o arquivo salvo

#### 4. Modo Escuro
- Clique no ícone de lua/sol no topo
- Alternância instantânea
- Preferência salva automaticamente

---

## Integração com Blogger

### Método 1: Página Estática (Recomendado)

1. **Criar Nova Página no Blogger:**
   - Acesse seu blog no Blogger
   - Vá em "Páginas" → "Nova Página"
   - Escolha "Visualização HTML"

2. **Copiar Código:**
   - Abra `index.html`
   - Copie TODO o conteúdo (Ctrl+A, Ctrl+C)
   - Cole no editor HTML do Blogger

3. **Publicar:**
   - Clique em "Publicar"
   - Acesse a URL da página criada

### Método 2: Widget HTML/JavaScript

1. **Criar Widget:**
   - Vá em "Layout" no Blogger
   - Adicione "HTML/JavaScript"

2. **Inserir Código:**
   ```html
   <iframe src="URL_DO_INDEX_HTML" 
           width="100%" 
           height="800px" 
           frameborder="0">
   </iframe>
   ```

3. **Hospedar index.html:**
   - Use GitHub Pages, Netlify ou similar
   - Substitua `URL_DO_INDEX_HTML`

### Método 3: Template Customizado

1. **Backup do Template Atual:**
   - Tema → Backup/Restaurar → Fazer download

2. **Editar Template:**
   - Tema → Editar HTML
   - Adicione antes de `</body>`:
   ```html
   <b:if cond='data:view.isPage and data:blog.pageTitle == "Firmou"'>
     <!-- Cole o conteúdo do index.html aqui -->
   </b:if>
   ```

3. **Criar Página "Firmou":**
   - Páginas → Nova Página
   - Título: "Firmou"
   - Conteúdo: vazio

---

## Manutenção e Suporte

### Atualizações de Versão

**Sistema de Versionamento:**
```javascript
const APP_VERSION = "1.2.0";
```

**Quando atualizar:**
1. Edite `APP_VERSION` no código
2. Banner de atualização aparece automaticamente
3. Usuário exporta dados antes de atualizar
4. Recarrega a página

### Monitoramento de Erros

**Console do Navegador:**
- Pressione F12
- Aba "Console"
- Verifique erros em vermelho

**Erros Comuns:**

| Erro | Causa | Solução |
|------|-------|---------|
| `localStorage is not defined` | Modo anônimo | Usar Export/Import TXT |
| `Failed to fetch` | API offline | Preencher manualmente |
| `Cannot read property` | State corrompido | Limpar localStorage |

### Performance

**Otimizações Implementadas:**
- Debounce em inputs (300ms)
- Lazy rendering de preview
- Base64 comprimido para imagens
- CSS inline para templates

**Métricas Alvo:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

---

## FAQ Técnico

### Como funciona o LocalStorage?
O LocalStorage é uma API do navegador que permite armazenar até 5-10MB de dados em formato chave-valor. Os dados persistem mesmo após fechar o navegador, mas podem ser apagados se o usuário limpar o cache.

### Por que não usar um banco de dados?
Por design, o firmou.com é 100% client-side para garantir privacidade total. Nenhum dado do usuário é enviado para servidores externos.

### Como adicionar Google AdSense?
Adicione os scripts do AdSense no `<head>` e insira slots de anúncio nas seguintes posições:
- Após o FAQ (linha ~710)
- Sidebar do editor (opcional)
- Entre seções da landing page

### Como personalizar cores?
Edite a variável CSS `--accent-color` na linha 42:
```css
:root { --accent-color: #SUA_COR_AQUI; }
```

### Como adicionar novos templates?
1. Adicione o template no array `templates` (linha ~822)
2. Crie os estilos CSS correspondentes (linha ~150)
3. O sistema renderiza automaticamente

### Como implementar PIX dinâmico?
Seria necessário:
1. Gerar payload EMV do Banco Central
2. Incluir valor e identificador único
3. Biblioteca adicional (ex: `pix-utils`)

---

## Licença e Créditos

**Desenvolvido por:** [Seu Nome/Empresa]  
**Versão:** 1.2.0  
**Data:** Janeiro 2026  
**Licença:** MIT (ou conforme sua preferência)

**Bibliotecas de Terceiros:**
- Tailwind CSS (MIT)
- html2pdf.js (MIT)
- qrcode-generator (MIT)
- FontAwesome (Font Awesome Free License)

---

## Suporte

Para dúvidas, sugestões ou reportar bugs:
- **Email:** suporte@firmou.com
- **GitHub:** github.com/seu-usuario/firmou
- **Documentação:** firmou.com/docs

---

**Última atualização:** 05/01/2026
