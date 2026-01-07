# Firmou - SaaS Financeiro

SaaS para geração e gestão de orçamentos, configurado com React, Vite e Tailwind CSS.

## Tecnologias Principais

- **Vite + React**: Framework e biblioteca de interface.
- **Tailwind CSS**: Estilização baseada em utilitários.
- **Dexie.js**: Camada de banco de dados offline-first (IndexedDB).
- **jsPDF & html2pdf.js**: Geração de orçamentos em PDF.
- **Firebase**: Backend para persistência secundária e autenticação.
- **Lucide React**: Biblioteca de ícones.
- **Vite PWA**: Suporte para Progressive Web App.

## Estrutura do Projeto

- `src/db`: Configuração do banco de dados local.
- `src/components`: Componentes reutilizáveis (UI, Dashboard, Editor, Preview).
- `src/firebase`: Configuração e serviços do Firebase.
- `src/utils`: Funções utilitárias e lógica de negócio.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Para build de produção:
   ```bash
   npm run build
   ```
