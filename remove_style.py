import re

# Ler o arquivo
with open('src/components/editor/FirmouEditor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remover o bloco style com regex mais específico
# Procura por style={{ seguido de qualquer coisa até }}
pattern = r'style=\{\{[^}]*marginTop[^}]*\}\}\s*'
content = re.sub(pattern, '', content, flags=re.DOTALL)

# Salvar o arquivo
with open('src/components/editor/FirmouEditor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Arquivo editado com sucesso!")
