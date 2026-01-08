# 🎯 Guia de Teste - Preview Premium A4

## Como Testar o Novo Sistema

### 1️⃣ Verificar se o App está Rodando
O app já está rodando em: `http://localhost:3000` (baseado no terminal ativo)

### 2️⃣ Abrir no Navegador
1. Abra seu navegador (Chrome, Firefox, Edge)
2. Acesse: `http://localhost:3000`
3. A aplicação deve carregar normalmente

### 3️⃣ Verificar a Nova Toolbar Premium

Na área de preview (lado direito em desktop), você deve ver uma **toolbar preta arredondada** no topo com:

#### Controles de Zoom
- ➖ Botão de diminuir zoom
- **80%** Indicador de zoom atual
- ➕ Botão de aumentar zoom

#### Modos de Ajuste (NOVO!)
- 📏 **Largura** - Ajusta à largura da tela
- 📐 **Altura** - Ajusta à altura da tela  
- 🔲 **Página** - Mostra página inteira (ativo por padrão)

#### Outros Controles
- 🔄 **Reset** - Volta ao zoom padrão
- 📄 **1 PÁGINA** - Contador de páginas (com ícone)
- 🗺️ **Minimap** - Toggle do minimap lateral
- 🖨️ **Print** - Botão de impressão

### 4️⃣ Testar Funcionalidades

#### Teste de Zoom
1. Clique no botão **+** várias vezes
2. Observe o número aumentar (90%, 100%, 110%...)
3. O documento deve aumentar suavemente
4. Clique no botão **-** para diminuir
5. Um indicador grande deve aparecer no centro mostrando o zoom

#### Teste de Fit Modes
1. Clique em **Largura**
   - O documento deve ajustar para ocupar toda a largura
   - O botão deve ficar destacado (fundo amarelo)
2. Clique em **Altura**
   - O documento deve ajustar para a altura da tela
3. Clique em **Página**
   - Volta ao modo padrão (página inteira visível)

#### Teste de Navegação (se tiver múltiplas páginas)
1. Adicione vários itens para criar múltiplas páginas
2. Controles de navegação devem aparecer na parte inferior:
   - ⬆️ Página anterior
   - **1 / 3** Indicador de página atual
   - ⬇️ Próxima página
3. Clique nas setas para navegar
4. A transição deve ser suave

#### Teste do Minimap
1. Clique no botão 🗺️ na toolbar
2. Um painel lateral deve aparecer à direita
3. Deve mostrar miniaturas de todas as páginas
4. A página atual deve estar destacada
5. Clique em qualquer miniatura para ir direto

#### Teste de Atalhos de Teclado
- Pressione **+** ou **=** → Aumenta zoom
- Pressione **-** → Diminui zoom
- Pressione **0** → Reseta visualização
- Pressione **Ctrl + M** → Toggle minimap
- Pressione **Ctrl + P** → Abre impressão

### 5️⃣ Verificar Elementos Visuais

#### Páginas A4
- Cada página deve ter sombra realista
- Fundo branco mesmo no modo escuro
- Espaçamento entre páginas
- Números de página no canto inferior direito: "Página 1 de X"

#### Animações
- Zoom deve ser suave (não pular)
- Navegação entre páginas com scroll suave
- Hover nos botões deve mostrar efeito visual
- Minimap deve aparecer/desaparecer com fade

#### Responsividade
- Redimensione a janela do navegador
- O preview deve se ajustar automaticamente
- Toolbar deve permanecer visível
- Scroll deve funcionar corretamente

### 6️⃣ Testar Impressão
1. Clique no botão 🖨️ ou pressione Ctrl+P
2. A janela de impressão do navegador deve abrir
3. No preview de impressão:
   - Toolbar e controles NÃO devem aparecer
   - Apenas as páginas A4 devem estar visíveis
   - Números de página devem estar ocultos
   - Formatação deve estar perfeita

### 7️⃣ Modo Escuro
1. Clique no botão de lua/sol no topo esquerdo
2. Alterne entre modo claro e escuro
3. Verifique que:
   - Toolbar permanece legível
   - Páginas A4 continuam brancas
   - Controles têm bom contraste

## ✅ Checklist de Funcionalidades

Marque conforme testa:

- [ ] Toolbar premium visível
- [ ] Zoom in/out funcionando
- [ ] Indicador de zoom aparece
- [ ] Botões de fit mode presentes
- [ ] Fit mode "Largura" funciona
- [ ] Fit mode "Altura" funciona
- [ ] Fit mode "Página" funciona (padrão)
- [ ] Contador de páginas atualiza
- [ ] Números nas páginas aparecem
- [ ] Botão de minimap presente
- [ ] Minimap abre/fecha
- [ ] Miniaturas aparecem no minimap
- [ ] Navegação por minimap funciona
- [ ] Controles de navegação (se multi-página)
- [ ] Botão de print funciona
- [ ] Atalhos de teclado funcionam
- [ ] Animações são suaves
- [ ] Sombras nas páginas A4
- [ ] Responsivo ao redimensionar
- [ ] Modo escuro funciona
- [ ] Impressão remove controles

## 🐛 Problemas Comuns

### Toolbar não aparece
- Verifique se `preview.css` está carregado
- Abra DevTools (F12) e veja se há erros no console

### Botões não funcionam
- Verifique se `previewController.js` foi carregado
- No console, digite: `window.getPreviewController()`
- Deve retornar um objeto

### Minimap não abre
- Clique no botão 🗺️ na toolbar
- Ou pressione Ctrl+M
- Verifique console para erros

### Zoom não funciona
- Verifique se `adjZoom` está definido
- No console: `typeof window.adjZoom` deve retornar "function"

## 📸 Screenshots Esperados

### Vista Geral
- Sidebar esquerda com formulários
- Preview direita com toolbar no topo
- Página A4 centralizada com sombra
- Toolbar preta arredondada flutuante

### Toolbar Detalhada
- Controles de zoom à esquerda
- Separadores verticais brancos
- Botões de fit mode no meio
- Contador de páginas colorido
- Ícones de minimap e print à direita

### Minimap Aberto
- Painel lateral direito
- Miniaturas verticais
- Página atual destacada em amarelo
- Scroll se muitas páginas

### Multi-Página
- Várias páginas A4 empilhadas
- Espaçamento entre elas
- Números em cada página
- Controles de navegação no rodapé

## 🎨 Detalhes Visuais Premium

### Cores
- Toolbar: Preto semi-transparente com blur
- Botões ativos: Amarelo (#fbbf24)
- Contador: Gradiente roxo/índigo
- Hover: Branco semi-transparente

### Tipografia
- Zoom: Monospace, negrito
- Botões: Maiúsculas, tracking largo
- Contador: Maiúsculas, negrito

### Efeitos
- Glassmorphism na toolbar
- Sombras em camadas nas páginas
- Transições suaves (0.3s)
- Hover com ripple effect

---

**Teste completo e aproveite o preview mais profissional da web! 🚀**
