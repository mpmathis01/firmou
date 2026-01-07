# Guia de Deploy e Fluxo de Trabalho - Firmou

Este documento explica como funciona a arquitetura de deploy automático para o Blogger usando GitHub Actions e jsDelivr.

## 🚀 Fluxo de Trabalho Dual-Branch

Separamos o desenvolvimento em dois ambientes para garantir que testes não afetem a versão de produção.

### 1. Ambiente de Desenvolvimento (Testes)
- **Branch de Código:** `dev`
- **Branch de Build (Resultado):** `dev-build` 
- **Link para o Blogger:** 
  `https://cdn.jsdelivr.net/gh/mpmathis01/firmou@dev-build/index.html`

**Como atualizar:**
```powershell
git checkout dev
# faça suas alterações...
git add .
git commit -m "descrição da mudança"
git push origin dev
```

### 2. Ambiente de Produção (Versão Final)
- **Branch de Código:** `main`
- **Branch de Build (Resultado):** `prod`
- **Link para o Blogger:** 
  `https://cdn.jsdelivr.net/gh/mpmathis01/firmou@prod/index.html`

**Como atualizar (Lançamento):**
```powershell
git checkout main
git merge dev
git push origin main
```

---

## 🛠️ Detalhes Técnicos

### Build Único (Single-File)
O projeto utiliza o plugin `vite-plugin-singlefile`, que agrupa todo o Javascript e CSS dentro do arquivo `index.html`. Isso permite que o App seja injetado facilmente no Blogger sem hospedar arquivos externos separadamente.

### Atualização Instantânea (Auto-Purge)
O GitHub Actions está configurado para avisar o **jsDelivr** toda vez que houver um novo build. Isso força a limpeza do cache e garante que o link mostre a versão nova em poucos segundos.

## 💡 Dicas para o Blogger
Para usar o App no Blogger, prefira usar um **Iframe**:
```html
<iframe src="https://cdn.jsdelivr.net/gh/mpmathis01/firmou@prod/index.html" 
        style="width: 100%; height: 100vh; border: none;">
</iframe>
```
