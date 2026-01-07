# Script de Deploy para Producao
# Executa build:prod e envia para o branch prod do GitHub

Write-Host "Iniciando deploy de PRODUCAO..." -ForegroundColor Cyan
Write-Host ""

# Confirmacao de seguranca
Write-Host "ATENCAO: Voce esta prestes a fazer deploy para PRODUCAO!" -ForegroundColor Yellow
$confirmation = Read-Host "Deseja continuar? (S/N)"

if ($confirmation -ne 'S' -and $confirmation -ne 's') {
    Write-Host "Deploy cancelado pelo usuario." -ForegroundColor Red
    exit 0
}

Write-Host ""

# 1. Salvar branch atual
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan

# 2. Executar build de producao
Write-Host "Executando build de producao..." -ForegroundColor Yellow
npm run build:prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no build! Abortando deploy." -ForegroundColor Red
    exit 1
}

Write-Host "Build concluido com sucesso!" -ForegroundColor Green
Write-Host ""

# 3. Mudar para o branch prod
Write-Host "Mudando para o branch prod..." -ForegroundColor Yellow
git checkout prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao mudar para o branch prod!" -ForegroundColor Red
    git checkout $currentBranch
    exit 1
}

# 4. Copiar .gitignore correto para o branch prod
Write-Host "Configurando .gitignore do branch prod..." -ForegroundColor Yellow
Copy-Item -Path ".gitignore.prod" -Destination ".gitignore" -Force

# 5. Limpar arquivos antigos (manter apenas build/prod e README)
Write-Host "Limpando arquivos desnecessarios..." -ForegroundColor Yellow
git rm -rf --cached . 2>$null | Out-Null
git add .gitignore

# 6. Adicionar apenas build/prod e README
Write-Host "Adicionando arquivos do build..." -ForegroundColor Yellow
git add -f build/prod/
git add -f README.md

# 7. Verificar se ha mudancas
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nenhuma mudanca detectada. Nada para commitar." -ForegroundColor Yellow
    git checkout $currentBranch
    exit 0
}

# 8. Criar commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "build(prod): deploy automatico - $timestamp"

Write-Host "Criando commit: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no commit." -ForegroundColor Yellow
    git checkout $currentBranch
    exit 0
}

# 9. Fazer push para o branch prod
Write-Host "Enviando para GitHub (branch prod)..." -ForegroundColor Yellow
git push origin prod --force

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao enviar para o GitHub!" -ForegroundColor Red
    git checkout $currentBranch
    exit 1
}

# 10. Voltar para o branch original
Write-Host "Voltando para o branch $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch

Write-Host ""
Write-Host "Deploy de PRODUCAO concluido com sucesso!" -ForegroundColor Green
Write-Host "Branch: prod" -ForegroundColor Cyan
Write-Host "Conteudo: build/prod/ + README.md" -ForegroundColor Cyan
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan
