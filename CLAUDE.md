# Instruções para o Claude Code — Dashboard Glauco

Execute tudo abaixo na ordem. Não pule etapas.

## Dados do projeto

- GitHub: https://github.com/agjarzinski-sketch/dashboard-glauco.git
- Supabase URL: https://orgdhapoyhgyhedqbobi.supabase.co
- Supabase Key: sb_publishable_h2hQzgKTBNUtyhaMit81lg_1HzU6wzy

## Tarefa

1. Crie a pasta `C:\projetos\dashboard-glauco\` se não existir

2. Dentro dela, crie o arquivo `.env` com o conteúdo:
```
VITE_SUPABASE_URL=https://orgdhapoyhgyhedqbobi.supabase.co
VITE_SUPABASE_KEY=sb_publishable_h2hQzgKTBNUtyhaMit81lg_1HzU6wzy
```

3. Crie o arquivo `.gitignore` com:
```
node_modules/
dist/
.env
.env.local
.DS_Store
```

4. Crie o arquivo `README.md` com:
```
# Dashboard Glauco 2026
Dashboard financeiro pessoal com deploy automático via GitHub + Vercel + Supabase.

## Como enviar atualizações
Abra o PowerShell na pasta do projeto e rode:
.\push.ps1
O site atualiza sozinho em ~30 segundos no Vercel.
```

5. Crie o arquivo `push.ps1` com:
```powershell
$MSG = if ($args[0]) { $args[0] } else { "atualização dashboard $(Get-Date -Format 'dd/MM/yyyy HH:mm')" }
Write-Host ">>> Enviando para o GitHub..." -ForegroundColor Cyan
git add .
git commit -m "$MSG"
git push origin main
Write-Host ">>> Pronto! Vercel publica em ~30 segundos." -ForegroundColor Green
```

6. Copie o arquivo `dashboard-financeiro-CORRIGIDO.html` (que está nesta pasta) para `index.html`

7. Adicione antes de `</body>` no `index.html` o seguinte bloco:
```html
<script type="module">
  import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )
  window.__supabase = supabase
  window.syncToSupabase = async (payload) => {
    const { error } = await supabase
      .from('snapshots')
      .upsert({ id: 'dashboard_state', data: payload, updated_at: new Date().toISOString() })
    if (error) console.warn('[Supabase]', error.message)
    else console.log('[Supabase] Sincronizado ✓')
  }
  console.log('[Supabase] Inicializado ✓')
</script>
```

8. Rode no PowerShell dentro da pasta `C:\projetos\dashboard-glauco\`:
```powershell
git init
git remote add origin https://github.com/agjarzinski-sketch/dashboard-glauco.git
git branch -M main
git add .
git commit -m "primeiro commit - dashboard financeiro"
git push -u origin main
```

9. Confirme que o push foi bem sucedido abrindo https://github.com/agjarzinski-sketch/dashboard-glauco

## Após o push

Informe o usuário que:
- O GitHub está atualizado ✅
- O próximo passo é conectar ao Vercel em https://vercel.com → Add New Project → importar `dashboard-glauco`
- Adicionar as variáveis de ambiente no Vercel:
  - VITE_SUPABASE_URL = https://orgdhapoyhgyhedqbobi.supabase.co
  - VITE_SUPABASE_KEY = sb_publishable_h2hQzgKTBNUtyhaMit81lg_1HzU6wzy
- Clicar em Deploy
