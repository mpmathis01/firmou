# 🚀 Deploy Automático - Firmou

Este projeto possui scripts automatizados para fazer build e deploy para o GitHub.

## 📦 Comandos Disponíveis

### Desenvolvimento Local
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build:dev    # Build de desenvolvimento (build/dev/)
npm run build:prod   # Build de produção (build/prod/)
npm run lint         # Verifica código com ESLint
npm run preview      # Preview do build localmente
```

### Deploy Automático

#### 🟢 Deploy para Desenvolvimento
```bash
npm run deploy:dev
```

**O que este comando faz:**
1. ✅ Executa `npm run build:dev`
2. ✅ Muda para o branch `dev`
3. ✅ Configura `.gitignore` específico do branch dev
4. ✅ Remove todos os arquivos antigos
5. ✅ Adiciona **APENAS** `build/dev/` e `README.md`
6. ✅ Cria commit automático com timestamp
7. ✅ Envia para o branch `dev` no GitHub
8. ✅ Volta para o branch original

**Quando usar:** Para testar mudanças em ambiente de desenvolvimento/staging.

**⚠️ Importante:** O branch `dev` conterá APENAS:
- `build/dev/` (arquivos do build)
- `README.md` (documentação)
- `.gitignore` (configuração do branch)

---

#### 🔴 Deploy para Produção
```bash
npm run deploy:prod
```

**O que este comando faz:**
1. ⚠️  Pede confirmação (segurança)
2. ✅ Executa `npm run build:prod`
3. ✅ Muda para o branch `prod`
4. ✅ Configura `.gitignore` específico do branch prod
5. ✅ Remove todos os arquivos antigos
6. ✅ Adiciona **APENAS** `build/prod/` e `README.md`
7. ✅ Cria commit automático com timestamp
8. ✅ Envia para o branch `prod` no GitHub
9. ✅ Volta para o branch original

**Quando usar:** Para publicar versão final em produção.

**⚠️ Importante:** O branch `prod` conterá APENAS:
- `build/prod/` (arquivos do build)
- `README.md` (documentação)
- `.gitignore` (configuração do branch)

---

## 🌳 Estrutura de Branches

```
main        → Branch principal (código-fonte completo)
dev         → APENAS build/dev/ + README.md
prod        → APENAS build/prod/ + README.md
```

**Separação clara:**
- `main`: Todo o código-fonte, configurações, dependências
- `dev`: Somente arquivos compilados de desenvolvimento
- `prod`: Somente arquivos compilados de produção

## 📂 Estrutura de Pastas

### Branch `main` (código-fonte):
```
firmou_vite/
├── src/                    # Código-fonte React
├── public/                 # Assets públicos
├── build/                  # Builds (ignorados no main)
├── node_modules/           # Dependências
├── package.json            # Configuração npm
├── vite.config.js          # Configuração Vite
├── deploy-dev.ps1          # Script de deploy dev
├── deploy-prod.ps1         # Script de deploy prod
├── .gitignore              # Gitignore do main
├── .gitignore.dev          # Template gitignore dev
├── .gitignore.prod         # Template gitignore prod
└── README.md               # Documentação
```

### Branch `dev` (apenas build):
```
dev/
├── build/
│   └── dev/
│       ├── index.html
│       ├── assets/
│       │   ├── firmou-index.js
│       │   └── firmou-index.css
│       └── firmou-worker.js
├── .gitignore              # Ignora tudo exceto build/dev
└── README.md               # Documentação
```

### Branch `prod` (apenas build):
```
prod/
├── build/
│   └── prod/
│       ├── index.html
│       ├── assets/
│       │   ├── firmou-index.js
│       │   └── firmou-index.css
│       └── firmou-worker.js
├── .gitignore              # Ignora tudo exceto build/prod
└── README.md               # Documentação
```

## ⚙️ Configuração

### Vite Config (`vite.config.js`)
- **Dev:** `build/dev/` - código menos minificado
- **Prod:** `build/prod/` - código otimizado e minificado

### Plugins Ativos
- ✅ React (JSX support)
- ✅ Tailwind CSS v4
- ✅ PWA (Service Worker)
- ✅ Single File (HTML inline)

## 🔧 Troubleshooting

### Erro de permissão no PowerShell
Se receber erro de execução de scripts:
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Build falha
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Git push falha
```bash
# Verificar se está no branch correto
git branch

# Verificar configuração do remote
git remote -v
```

## 📝 Notas Importantes

- ⚠️ **Separação total de branches**: Os branches `dev` e `prod` contêm APENAS builds, não código-fonte
- ⚠️ **Código-fonte protegido**: Seu código React/Vite permanece apenas no branch `main`
- ⚠️ **Deploy de produção pede confirmação** por segurança
- ⚠️ **Force push**: Os scripts usam `--force` para garantir que apenas os arquivos corretos estejam nos branches
- ✅ Cada deploy cria um commit com timestamp automático
- ✅ Scripts verificam se há mudanças antes de commitar
- ✅ Você sempre volta para o branch original após o deploy
- ✅ `.gitignore` específico para cada branch garante isolamento

## 🎯 Workflow Recomendado

1. Desenvolva no branch `main`
2. Teste localmente com `npm run dev`
3. Deploy para dev: `npm run deploy:dev`
4. Teste no ambiente de dev
5. Quando estiver pronto: `npm run deploy:prod`

---

**Desenvolvido com ❤️ usando Vite + React + Tailwind CSS v4**
