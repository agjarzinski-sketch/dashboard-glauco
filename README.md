# Dashboard Glauco 2026

Dashboard financeiro pessoal com deploy automático via GitHub + Vercel + Supabase.

## Como enviar atualizações

Abra o PowerShell na pasta do projeto e rode:

```powershell
.\push.ps1
```

O site atualiza sozinho em ~30 segundos no Vercel.

## Stack

- **Frontend**: HTML + CSS + JS puro (sem framework)
- **Build**: Vite
- **Banco**: Supabase (PostgreSQL)
- **Deploy**: Vercel (automático via GitHub)
