# 🚀 ROADMAP DE MELHORIAS - firmou.com

## Versão Atual: 1.2.0

---

## 🎯 Versão 1.3.0 - Melhorias Rápidas (1-2 semanas)

### Prioridade ALTA 🔴

#### 1. **PIX Dinâmico (EMV)**
**Problema:** QR Code atual é estático (só a chave)  
**Solução:** Implementar payload EMV do Banco Central  
**Benefício:** Cliente escaneia e valor já vem preenchido  
**Complexidade:** Média  
**Biblioteca:** `pix-utils` ou similar

```javascript
// Exemplo de implementação
import { generatePixPayload } from 'pix-utils';

const payload = generatePixPayload({
  key: state.pay.pix,
  amount: total,
  description: `${state.doc.type} ${state.doc.num}`,
  merchantName: state.my.name
});
```

#### 2. **Assinatura Digital**
**Problema:** Documentos não têm validade jurídica  
**Solução:** Campo para assinatura manuscrita (canvas)  
**Benefício:** Mais profissional e legal  
**Complexidade:** Baixa

**Features:**
- Canvas para desenhar assinatura
- Salvar como imagem base64
- Exibir no rodapé do PDF
- Opção "Assinar digitalmente"

#### 3. **Histórico de Documentos**
**Problema:** Usuário perde orçamentos antigos  
**Solução:** Lista de documentos salvos  
**Benefício:** Acesso rápido a orçamentos anteriores  
**Complexidade:** Média

**Features:**
- Array de documentos no LocalStorage
- Tela de "Meus Documentos"
- Busca por cliente/número
- Duplicar documento existente

---

### Prioridade MÉDIA 🟡

#### 4. **Calculadora de Desconto**
**Problema:** Usuário precisa calcular desconto manualmente  
**Solução:** Campo de desconto (% ou R$)  
**Benefício:** Facilita negociação  
**Complexidade:** Baixa

**UI:**
```
Subtotal: R$ 1.000,00
Desconto: [10%] ou [R$ 100,00]
Total: R$ 900,00
```

#### 5. **Condições de Pagamento Pré-definidas**
**Problema:** Usuário digita sempre as mesmas condições  
**Solução:** Templates de condições  
**Benefício:** Agilidade  
**Complexidade:** Baixa

**Exemplos:**
- "À vista com 5% desconto"
- "3x sem juros no cartão"
- "50% entrada + 2x"
- "Personalizado"

#### 6. **Envio por Email/WhatsApp**
**Problema:** Usuário precisa baixar e enviar manualmente  
**Solução:** Botões de compartilhamento  
**Benefício:** UX melhorada  
**Complexidade:** Baixa

**Features:**
- Botão "Enviar por WhatsApp" (Web API)
- Botão "Enviar por Email" (mailto)
- Pré-preencher mensagem

---

### Prioridade BAIXA 🟢

#### 7. **Multi-idiomas**
**Problema:** Apenas português  
**Solução:** Suporte a inglês e espanhol  
**Benefício:** Alcance internacional  
**Complexidade:** Alta

#### 8. **Temas Personalizados**
**Problema:** Usuário quer mais customização  
**Solução:** Editor de tema visual  
**Benefício:** Branding personalizado  
**Complexidade:** Alta

#### 9. **Integração com Contabilidade**
**Problema:** Dados não vão para contabilidade  
**Solução:** Export para Excel/CSV  
**Benefício:** Facilita gestão  
**Complexidade:** Média

---

## 🎯 Versão 2.0.0 - Grandes Features (1-3 meses)

### 1. **Modo Offline Completo (PWA)**
**Descrição:** Transformar em Progressive Web App  
**Benefícios:**
- Funciona 100% offline
- Instalável no celular
- Ícone na tela inicial
- Notificações push

**Requisitos Técnicos:**
- Service Worker
- Manifest.json
- Cache API
- Sync API

**Complexidade:** Alta  
**Impacto:** Muito Alto

---

### 2. **Sistema de Clientes**
**Descrição:** Cadastro e gestão de clientes  
**Features:**
- Lista de clientes salvos
- Busca rápida
- Auto-complete ao digitar
- Histórico de orçamentos por cliente

**Estrutura de Dados:**
```javascript
clients = [
  {
    id: 1,
    name: 'Cliente A',
    doc: '123.456.789-00',
    addr: 'Rua X, 123',
    history: [
      {docId: 'ORC-001', date: '2024-01-01', total: 1000}
    ]
  }
]
```

**Complexidade:** Alta  
**Impacto:** Alto

---

### 3. **Dashboard de Gestão**
**Descrição:** Painel com estatísticas  
**Métricas:**
- Total faturado no mês
- Orçamentos aprovados vs pendentes
- Gráfico de evolução
- Top 5 clientes
- Ticket médio

**Tecnologia:** Chart.js ou similar  
**Complexidade:** Média  
**Impacto:** Alto

---

### 4. **Integração com APIs de Pagamento**
**Descrição:** Gerar link de pagamento direto  
**Opções:**
- Mercado Pago
- PagSeguro
- Stripe

**Fluxo:**
1. Gera orçamento
2. Clica "Gerar Link de Pagamento"
3. Link é criado na API
4. Cliente paga direto
5. Webhook atualiza status

**Complexidade:** Muito Alta  
**Impacto:** Muito Alto  
**Obs:** Requer backend

---

### 5. **Sistema de Notificações**
**Descrição:** Lembrar usuário de follow-ups  
**Features:**
- Lembrete de orçamentos pendentes
- Notificação de vencimento
- Email automático (se backend)

**Complexidade:** Alta  
**Impacto:** Médio

---

## 🎯 Versão 3.0.0 - Ecossistema Completo (6+ meses)

### 1. **Backend Opcional (SaaS)**
**Descrição:** Versão premium com backend  
**Features:**
- Sincronização multi-dispositivo
- Backup automático na nuvem
- Colaboração em equipe
- API para integrações

**Modelo de Negócio:**
- Versão gratuita: LocalStorage (atual)
- Versão Pro: R$ 29,90/mês
- Versão Business: R$ 99,90/mês

---

### 2. **App Mobile Nativo**
**Descrição:** App iOS e Android  
**Tecnologia:** React Native ou Flutter  
**Features:**
- Todas as features da web
- Câmera integrada para fotos
- Notificações push
- Modo offline robusto

---

### 3. **Marketplace de Templates**
**Descrição:** Loja de templates premium  
**Modelo:**
- Templates gratuitos (10 atuais)
- Templates premium (R$ 9,90 cada)
- Pacotes temáticos (R$ 29,90)

**Categorias:**
- Construção
- Beleza
- TI
- Saúde
- Educação

---

### 4. **Integrações**
**Descrição:** Conectar com outras ferramentas  
**Opções:**
- Google Drive (backup)
- Dropbox (backup)
- Trello (gestão)
- Slack (notificações)
- Zapier (automações)

---

## 🐛 Bugs Conhecidos e Melhorias Técnicas

### Bugs para Corrigir

1. **Preview não atualiza em alguns casos**
   - Reprodução: Trocar template rapidamente
   - Solução: Debounce na função renderPreview

2. **LocalStorage pode exceder limite**
   - Reprodução: Muitas fotos grandes
   - Solução: Comprimir imagens antes de salvar

3. **QR Code não gera se chave PIX inválida**
   - Reprodução: Digitar chave malformada
   - Solução: Validação de formato

### Melhorias Técnicas

1. **Modularização do Código**
   - Separar em arquivos: `state.js`, `ui.js`, `pdf.js`
   - Usar ES6 modules
   - Build com Webpack/Vite

2. **TypeScript**
   - Adicionar tipagem
   - Prevenir bugs
   - Melhor DX

3. **Testes Automatizados**
   - Unit tests (Jest)
   - E2E tests (Playwright)
   - CI/CD (GitHub Actions)

4. **Performance**
   - Lazy load de templates
   - Virtual scrolling para muitos itens
   - Web Workers para PDF

---

## 💡 Ideias da Comunidade

### Sugestões de Usuários

1. **Campo de Validade do Orçamento**
   - "Válido por 30 dias"
   - Auto-calcular data de expiração

2. **Múltiplas Moedas**
   - Suporte a USD, EUR
   - Conversão automática

3. **Modo Apresentação**
   - Tela cheia para mostrar ao cliente
   - Navegação por slides

4. **Comparação de Orçamentos**
   - Lado a lado
   - Destacar diferenças

5. **Integração com Calendário**
   - Agendar serviço
   - Sincronizar com Google Calendar

---

## 📊 Priorização de Features

### Matriz de Impacto vs Esforço

```
Alto Impacto, Baixo Esforço (FAZER PRIMEIRO):
✅ Assinatura Digital
✅ Calculadora de Desconto
✅ Condições de Pagamento Pré-definidas

Alto Impacto, Alto Esforço (PLANEJAR):
⏳ PIX Dinâmico (EMV)
⏳ PWA (Offline)
⏳ Sistema de Clientes

Baixo Impacto, Baixo Esforço (FAZER SE SOBRAR TEMPO):
🔵 Multi-idiomas
🔵 Temas Personalizados

Baixo Impacto, Alto Esforço (EVITAR):
❌ App Nativo (por enquanto)
❌ Backend (versão gratuita)
```

---

## 🎯 Cronograma Sugerido

### Q1 2026 (Jan-Mar)
- ✅ Lançamento v1.2.0
- [ ] Assinatura Digital (v1.3.0)
- [ ] Calculadora de Desconto (v1.3.0)
- [ ] Histórico de Documentos (v1.3.0)

### Q2 2026 (Abr-Jun)
- [ ] PIX Dinâmico (v1.4.0)
- [ ] PWA Básico (v1.5.0)
- [ ] Sistema de Clientes (v2.0.0)

### Q3 2026 (Jul-Set)
- [ ] Dashboard de Gestão (v2.1.0)
- [ ] Marketplace de Templates (v2.2.0)

### Q4 2026 (Out-Dez)
- [ ] Versão SaaS (v3.0.0)
- [ ] Integrações (v3.1.0)

---

## 📝 Como Contribuir com Ideias

1. **GitHub Issues**
   - Abra uma issue com a tag `feature-request`
   - Descreva o problema e a solução proposta

2. **Formulário de Feedback**
   - Disponível no site
   - Anônimo ou com email

3. **Comunidade**
   - Discord/Slack (se criado)
   - Votação de features

---

**Última atualização:** 05/01/2026  
**Próxima revisão:** 05/04/2026
