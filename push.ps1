# ── PUSH AUTOMÁTICO PARA O GITHUB ─────────────────────────────────────────
# Execute este arquivo sempre que quiser enviar mudanças ao ar.
# Clique duas vezes em "push.ps1" ou rode no PowerShell:  .\push.ps1
# ──────────────────────────────────────────────────────────────────────────

$MSG = if ($args[0]) { $args[0] } else { "atualização dashboard $(Get-Date -Format 'dd/MM/yyyy HH:mm')" }

Write-Host ""
Write-Host ">>> Enviando para o GitHub..." -ForegroundColor Cyan
Write-Host ">>> Mensagem: $MSG" -ForegroundColor Gray
Write-Host ""

git add .
git commit -m "$MSG"
git push origin main

Write-Host ""
Write-Host ">>> Pronto! Vercel vai publicar em ~30 segundos." -ForegroundColor Green
Write-Host ">>> Acesse: https://dashboard-glauco.vercel.app" -ForegroundColor Yellow
Write-Host ""
