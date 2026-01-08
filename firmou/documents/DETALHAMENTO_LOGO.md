# Diretrizes de Marca - Firmou

Este documento detalha a identidade visual e as especificações técnicas para a representação da marca **Firmou**. Utilize estas diretrizes para garantir a consistência visual em landing pages, aplicativos e materiais promocionais.

---

## 1. Tipografia

A marca utiliza exclusivamente a fonte **Outfit**, uma fonte sans-serif moderna e geométrica.

- **Fonte:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)
- **Pesos Utilizados:** 
  - Logotipo: `900 (Black)`
  - Corpo/Interface: `400 (Regular)` até `700 (Bold)`
- **Snippet de Importação:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
  ```

---

## 2. Paleta de Cores

| Nome | Hex | Aplicação |
| :--- | :--- | :--- |
| **Slate Dark** | `#0f172a` | Texto principal, fundos de logos e ícones. |
| **Amber Accent** | `#fbbf24` | O ponto final do logo, destaques, botões primários. |
| **Pure White** | `#ffffff` | Texto em fundos escuros, fundos de página. |
| **Gray Text** | `#94a3b8` | Textos secundários (ex: labels de preview). |

---

## 3. Logotipo Principal (Full Logo)

O logotipo é composto pela palavra "firmou" em caixa baixa, seguida por um ponto final colorido.

### Especificações Técnicas:
- **Texto:** `firmou` (Lowercase)
- **Ponto:** `.` (Cor Amber)
- **Peso:** `Black (900)`
- **Espaçamento:** `tracking-tight` (-0.025em)
- **Interação:** Transformação suave de escala (105%) em hover.

### Exemplo de Código (Tailwind):
```html
<div class="transition-all duration-500 transform hover:scale-105 cursor-default flex items-baseline tracking-tight">
    <span class="font-outfit font-black text-6xl text-[#0f172a]">firmou</span>
    <span class="font-outfit font-black text-6xl text-[#fbbf24] ml-1">.</span>
</div>
```

---

## 4. Ícone do Aplicativo (App Icon)

Representação compacta utilizada para favicons, ícones de app store e avatars.

### Especificações Técnicas:
- **Container:** Quadrado com cantos arredondados (`rounded-3xl` / `24px` a `32px` de radius).
- **Fundo:** `#0f172a` (Slate Dark).
- **Conteúdo:** Letra `f` e ponto `.` em `White` e `Amber` respectivamente.
- **Peso:** `Black (900)`.
- **Efeito:** Borda sutil interna (`border-white/10`) e sombra profunda (`shadow-2xl`).

### Exemplo de Código (Tailwind):
```html
<div class="w-40 h-40 bg-[#0f172a] rounded-3xl shadow-2xl flex items-center justify-center border-2 border-white/10 overflow-hidden">
    <span class="font-outfit font-black text-9xl text-[#ffffff] tracking-tighter">f<span class="text-[#fbbf24]">.</span></span>
</div>
```

---

## 5. Configuração Tailwind

Para facilitar o desenvolvimento, adicione a configuração abaixo ao seu projeto:

```javascript
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                firmou: {
                    dark: '#0f172a',
                    amber: '#fbbf24',
                }
            }
        }
    }
}
```

---

## 6. Boas Práticas

1. **Hierarchy:** O ponto final sempre deve ser na cor Amber (`#fbbf24`).
2. **Spacing:** Manter o `tracking-tight` ou `tracking-tighter` para preservar a estética compacta e moderna.
3. **Consistency:** Não utilizar variações com a primeira letra maiúscula; a marca é visualmente mais forte em lowercase.
