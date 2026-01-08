# Script de Deploy Rápido para o Blog
# Atualiza o conteúdo e envia para produção

Write-Host "Iniciando deploy de ATUALIZAÇÃO DO BLOG..." -ForegroundColor Cyan

# 1. Executar build
Write-Host "Gerando novos arquivos do blog..." -ForegroundColor Yellow
npm run build:prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no build! Abortando." -ForegroundColor Red
    exit 1
}

# 2. Salvar build em pasta temporaria
$tempBuildDir = Join-Path $env:TEMP "firmou_blog_$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempBuildDir -Force | Out-Null
Copy-Item -Path "build/prod/*" -Destination $tempBuildDir -Recurse -Force

# 3. Mudar para o branch prod
$currentBranch = git rev-parse --abbrev-ref HEAD
git checkout prod

# 4. Limpar e Restaurar (mantendo node_modules se existir)
git rm -rf . 2>$null | Out-Null
Get-ChildItem -Exclude ".git", "node_modules" | Remove-Item -Recurse -Force

$prodBuildDir = "build/prod"
New-Item -ItemType Directory -Path $prodBuildDir -Force | Out-Null
Copy-Item -Path "$tempBuildDir/*" -Destination $prodBuildDir -Recurse -Force
Remove-Item -Path $tempBuildDir -Recurse -Force

# 5. Commit e Push
git add .
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "blog: atualização de conteúdo - $timestamp"
git push origin prod --force

# 6. Voltar
git checkout $currentBranch

Write-Host ""
Write-Host "Blog atualizado com sucesso!" -ForegroundColor Green
Write-Host "Verifique as mudanças em instantes no seu domínio." -ForegroundColor Cyan
