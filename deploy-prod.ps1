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

# 3. Salvar build em pasta temporaria (fora do controle do git)
Write-Host "Preparando arquivos para transferencia..." -ForegroundColor Yellow
$tempBuildDir = Join-Path $env:TEMP "firmou_build_$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempBuildDir -Force | Out-Null
Copy-Item -Path "build/prod/*" -Destination $tempBuildDir -Recurse -Force

# 4. Mudar para o branch prod
Write-Host "Mudando para o branch prod..." -ForegroundColor Yellow
git checkout prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao mudar para o branch prod!" -ForegroundColor Red
    Remove-Item -Path $tempBuildDir -Recurse -Force
    exit 1
}

# 5. Limpar branch prod completamente (exceto .git)
Write-Host "Limpando o branch prod..." -ForegroundColor Yellow
git rm -rf . 2>$null | Out-Null
Get-ChildItem -Exclude ".git" | Remove-Item -Recurse -Force

# 6. Restaurar .gitignore e README do branch prod (ou criar se sumiu)
@"
# Ignorar tudo
*

# Exceto este gitignore
!.gitignore

# Exceto README
!README.md

# Permitir a pasta build/prod
!build/
!build/prod/
!build/prod/**
"@ | Out-File -FilePath ".gitignore" -Encoding utf8 -Force

# 7. Trazer os arquivos do build de volta para build/prod
Write-Host "Restaurando arquivos do build..." -ForegroundColor Yellow
$prodBuildDir = "build/prod"
New-Item -ItemType Directory -Path $prodBuildDir -Force | Out-Null
Copy-Item -Path "$tempBuildDir/*" -Destination $prodBuildDir -Recurse -Force
Remove-Item -Path $tempBuildDir -Recurse -Force

# 8. Adicionar tudo e commitar
Write-Host "Preparando commit..." -ForegroundColor Yellow
git add .gitignore
if (Test-Path "README.md") { git add README.md }
git add -f build/prod/

$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nenhuma mudanca detectada no build." -ForegroundColor Yellow
    git checkout $currentBranch
    exit 0
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "build(prod): deploy automatico - $timestamp"
git commit -m $commitMessage

# 9. Fazer push
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
Write-Host "Verifique em: https://cdn.jsdelivr.net/gh/mpmathis01/firmou@prod/build/prod/index.html" -ForegroundColor Cyan
