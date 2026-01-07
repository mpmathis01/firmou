# Script de Deploy para Desenvolvimento
# Executa build:dev e envia para o branch dev do GitHub

Write-Host "🚀 Iniciando deploy de DESENVOLVIMENTO..." -ForegroundColor Cyan
Write-Host ""

# 1. Salvar branch atual
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "📍 Branch atual: $currentBranch" -ForegroundColor Cyan

# 2. Executar build de desenvolvimento
Write-Host "📦 Executando build de desenvolvimento..." -ForegroundColor Yellow
npm run build:dev

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build! Abortando deploy." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green
Write-Host ""

# 3. Mudar para o branch dev
Write-Host "🔄 Mudando para o branch dev..." -ForegroundColor Yellow
git checkout dev

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao mudar para o branch dev!" -ForegroundColor Red
    git checkout $currentBranch
    exit 1
}

# 4. Criar .gitignore especifico para o branch dev (inline)
Write-Host "Configurando .gitignore do branch dev..." -ForegroundColor Yellow
@"
# Ignorar tudo
*

# Exceto a pasta build/dev/
!build/
!build/dev/
!build/dev/**

# Exceto README
!README.md

# Exceto este gitignore
!.gitignore
"@ | Out-File -FilePath ".gitignore" -Encoding utf8 -Force

# 5. Limpar arquivos antigos (manter apenas build/dev e README)
Write-Host "Limpando arquivos desnecessarios..." -ForegroundColor Yellow
git rm -rf --cached . 2>$null | Out-Null
git add .gitignore

# 6. Adicionar apenas build/dev e README
Write-Host "📝 Adicionando arquivos do build..." -ForegroundColor Yellow
git add -f build/dev/
git add -f README.md

# 7. Verificar se há mudanças
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "⚠️  Nenhuma mudança detectada. Nada para commitar." -ForegroundColor Yellow
    git checkout $currentBranch
    exit 0
}

# 8. Criar commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "build(dev): deploy automatico - $timestamp"

Write-Host "💾 Criando commit: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Erro no commit." -ForegroundColor Yellow
    git checkout $currentBranch
    exit 0
}

# 9. Fazer push para o branch dev
Write-Host "🌐 Enviando para GitHub (branch dev)..." -ForegroundColor Yellow
git push origin dev --force

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao enviar para o GitHub!" -ForegroundColor Red
    git checkout $currentBranch
    exit 1
}

# 10. Voltar para o branch original
Write-Host "🔙 Voltando para o branch $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch

Write-Host ""
Write-Host "✅ Deploy de DESENVOLVIMENTO concluído com sucesso! 🎉" -ForegroundColor Green
Write-Host "📍 Branch: dev" -ForegroundColor Cyan
Write-Host "📂 Conteúdo: build/dev/ + README.md" -ForegroundColor Cyan
Write-Host "🔙 Branch atual: $currentBranch" -ForegroundColor Cyan
