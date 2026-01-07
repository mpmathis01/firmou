# Guia de Envio de Build (Deploy) - Firmou

Este guia explica como enviar as atualizações do seu computador diretamente para o GitHub para que apareçam no Blogger.

## 🚀 Como fazer o Deploy

A partir de agora, os builds são organizados em pastas específicas dentro da pasta `build/`.

### 1. Enviar para TESTE (Ambiente Dev)
Use este comando quando quiser testar uma nova funcionalidade no Blogger de testes.

```powershell
# Gera o arquivo único em build/dev/index.html
npm run build:dev

# Envia apenas o conteúdo da pasta build/dev para a branch dev-build
git push origin build/dev:dev-build --force
```
**Link no Blogger:** `https://cdn.jsdelivr.net/gh/mpmathis01/firmou@dev-build/index.html`

---

### 2. Enviar para PRODUÇÃO (Ambiente Oficial)
Use este comando apenas quando a versão de teste estiver perfeita.

```powershell
# Gera o arquivo único em build/prod/index.html
npm run build:prod

# Envia apenas o conteúdo da pasta build/prod para a branch prod
git push origin build/prod:prod --force
```
**Link no Blogger:** `https://cdn.jsdelivr.net/gh/mpmathis01/firmou@prod/index.html`

---

## 🛠️ Detalhes Técnicos

### Arquivos Gerados:
- **index.html**: O App completo (JS e CSS embutidos).
- **firmou-worker.js**: Inteligência offline (Service Worker).
- **manifest.webmanifest**: Configurações de instalação.

## 📝 Observações Importantes

1. **Privacidade**: O seu código-fonte (`src/`, `vite.config.js`, etc) **não será enviado** para o GitHub. Apenas o arquivo compilado (`index.html`) ficará público nas branches de entrega.
2. **Atualização Instantânea**: O sistema de link via jsDelivr pode demorar alguns segundos para atualizar. Se não mudar na hora, adicione `?v=1` ao final do link no Blogger para forçar.
3. **Pastas**: As pastas `build/dev` e `build/prod` são criadas automaticamente ao rodar os comandos de build.
