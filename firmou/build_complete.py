# Script para construir o firmou.com completo
# Este script adiciona as funcionalidades faltantes ao index.html

import re

# Lê o arquivo atual
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Adiciona a aba de fotos no JavaScript (seção switchTab)
photos_tab_logic = """
        function switchTab(t) {
            ['info','items','photos','design','files'].forEach(s => {
                document.getElementById('sect-'+s).classList.add('hidden');
                document.getElementById('tab-'+s).classList.remove('tab-active');
                document.getElementById('tab-'+s).classList.add('text-slate-400');
            });
            document.getElementById('sect-'+t).classList.remove('hidden');
            document.getElementById('tab-'+t).classList.add('tab-active');
            document.getElementById('tab-'+t).classList.remove('text-slate-400');
        }
"""

# Substitui a função switchTab existente
content = re.sub(
    r"function switchTab\(t\) \{[^}]+\}",
    photos_tab_logic.strip(),
    content,
    flags=re.DOTALL
)

# Salva o arquivo atualizado
with open('index_updated.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Arquivo atualizado criado: index_updated.html")
print("Próximos passos: Adicionar seção de fotos HTML e templates")
