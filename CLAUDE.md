# CLAUDE.md — Dashboard Financeiro Glauco 2026
# Leia este arquivo inteiro antes de executar qualquer tarefa.
# Atualizado em: 25/04/2026

---

## 1. VISÃO GERAL DO PROJETO

Dashboard financeiro pessoal do Angelo Glauco Jarzinski.
Controla gastos, faturas Nubank, saldo bancário e investimentos RDB.

- **Dono:** Angelo Glauco Jarzinski
- **Banco:** Nubank · Conta 59962602-0
- **Período coberto:** Março, Abril e Maio de 2026
- **URL pública:** https://dashboard-glauco.vercel.app
- **Status:** Produção — deploy automático ativo

---

## 2. STACK TÉCNICA

| Tecnologia | Função |
|---|---|
| HTML + CSS + JS puro | Frontend — arquivo único index.html |
| Vite | Build tool |
| Supabase (PostgreSQL) | Banco de dados na nuvem |
| GitHub | Versionamento |
| Vercel | Hospedagem e deploy automático |
| Claude Code | Agente de desenvolvimento (você) |

### Fluxo de deploy automático
1. Claude edita os arquivos do projeto
2. Claude Code executa `push.ps1`
3. GitHub recebe o commit na branch `main`
4. Vercel detecta e publica em ~30 segundos
5. Site atualizado em dashboard-glauco.vercel.app

---

## 3. CREDENCIAIS E ACESSOS

### GitHub
- Usuário: agjarzinski-sketch
- Repositório: dashboard-glauco
- URL: https://github.com/agjarzinski-sketch/dashboard-glauco
- Branch: main

### Supabase
- Project URL: https://orgdhapoyhgyhedqbobi.supabase.co
- Publishable Key: sb_publishable_h2hQzgKTBNUtyhaMit81lg_1HzU6wzy
- Plano: Free (NANO) · Região: us-west-2
- Tabela: snapshots (id text PK, data jsonb, updated_at timestamptz)

### Vercel
- Conta: agjarzinski-1624
- URL: dashboard-glauco.vercel.app
- Env vars configuradas: VITE_SUPABASE_URL, VITE_SUPABASE_KEY

---

## 4. ESTRUTURA DE ARQUIVOS

### Código — C:\projetos\
```
C:\projetos\
    dashboard-glauco\        ← PASTA PRINCIPAL DESTE PROJETO
        index.html           ← dashboard (1.650+ linhas) — arquivo principal
        .env                 ← chaves Supabase (NUNCA commitar)
        .gitignore           ← protege .env e node_modules
        push.ps1             ← script de deploy automático
        package.json         ← dependências Vite + Supabase
        CLAUDE.md            ← este arquivo
        supabase-setup.sql   ← SQL de criação da tabela
        README.md            ← documentação
    safra_precos\
    PROJETO_CLAUDE_AI\
    Antigravity\
```

### Documentos — G:\Meu Drive\
```
G:\Meu Drive\
    01 - Financeiro\
        Faturas\
        Extratos\
        Planilhas\
    02 - Projetos\
        Dashboard-Glauco\    ← inventario-dashboard-glauco.docx aqui
        Outros\
    03 - Documentos\
    04 - Relatorios\
    05 - Scripts\
    06 - Instrucoes e Manuais\
    07 - Arquivo Morto\
```

---

## 5. DADOS DO DASHBOARD

### Saldos por mês
| Mês | Saldo Inicial | Entradas | Saídas | Saldo Final |
|---|---|---|---|---|
| Março 2026 | R$ 309,73 | R$ 7.342,27 | R$ 6.879,72 | R$ 772,28 |
| Abril 2026 | R$ 772,28 | R$ 16.486,56 | R$ 16.857,80 | R$ 401,04 |
| Maio 2026 | R$ 401,04 | Em aberto | Em aberto | — |

### Faturas Nubank
| Mês | Fatura | Compras | IOF | Outros | Pagamento |
|---|---|---|---|---|---|
| Março | R$ 6.881,53 | R$ 6.729,86 | R$ 13,00 | R$ 138,66 | Ref. Fev — R$ 6.257,47 |
| Abril | R$ 4.135,01 | R$ 3.974,76 | R$ 3,95 | R$ 156,30 | Ref. Mar — R$ 6.881,53 |
| Maio | R$ 5.120,26 | R$ 5.095,52 | R$ 24,74 | R$ 0 | Ref. Abr — R$ 4.135,01 |

### Investimento RDB (mai/2026)
- Saldo RDB: R$ 7.306,05
- Limite total estimado: R$ 10.506,05
- Limite disponível estimado: R$ 1.537,89
- Fórmula: `limite_disp = limite_total - fatura_aberta - compromissos_futuros`

---

## 6. REGRAS DE OPERAÇÃO — LEIA SEMPRE

1. **Pasta de trabalho:** sempre `C:\projetos\dashboard-glauco\`
2. **NUNCA commitar `.env`** — as chaves Supabase ficam só localmente
3. **Antes de editar index.html:** faça backup com sufixo `_BACKUP_DDMMYYYY`
4. **Edite com str_replace** — nunca reescreva o arquivo inteiro
5. **Após cada alteração:** execute `push.ps1` para publicar
6. **index.html tem 1.650+ linhas** — use buscas precisas antes de editar

### Comando de deploy
```powershell
cd C:\projetos\dashboard-glauco
.\push.ps1
```

---

## 7. CORREÇÕES JÁ APLICADAS (não refazer)

| # | Correção |
|---|---|
| 1 | saldo_inicial mai: 501.04 → 401.04 (alinhado com SALDOS_PDF['abr'].fim) |
| 2 | new Date(2026,1,1) → new Date(2026,2,1) — âncora de data corrigida para março |
| 3 | ANCORA_DATA_STR removida (variável morta) |
| 4 | limite_disp_est de maio: deixou de ser hardcoded, agora calculado dinamicamente |
| 5 | fatura_pagamento virou objeto {valor, ref} nos três meses |
| 6 | validarContinuidadeSaldos() adicionada — roda na inicialização |
| 7 | Saldo bancário no painel lê de SALDOS_PDF['abr'].fim (não hardcoded) |

---

## 8. PENDÊNCIAS ABERTAS

| Prioridade | Item | Descrição |
|---|---|---|
| ✅ Feito | Tabela Supabase | Criada em 26/04/2026 |
| Alta | Divergência R$ 100,00 | saldo_inicial maio: verificar entrada não registrada em 01/05 |
| Média | NuPay/KeetaBR | Categorizar R$ 138,66 (mar) e R$ 156,30 (abr) |
| Baixa | Extrato 24/04 | Gap de 1 dia entre extrato CC e fatura mai |

### Melhorias aprovadas para implementar
- Parser de importação automática de CSV/PDF do Nubank
- Status 'pendente' para transações não categorizadas
- Fórmula documentada e dinâmica para limite_total_est

---

## 9. SUPABASE — SQL DE CRIAÇÃO DA TABELA

```sql
create table if not exists snapshots (
  id         text primary key,
  data       jsonb,
  updated_at timestamptz default now()
);

alter table snapshots enable row level security;

create policy "acesso público dashboard"
  on snapshots for all
  using (true)
  with check (true);
```

---

## Integração com Obsidian

- **Vault Obsidian:** `C:\Users\Note\Documents\Obsidian\MeuVault`
- **Nota principal:** `10 - Projetos Pessoais/Controle de Gastos Mensais 2.0.md`

### Regra obrigatória ao fim de cada sessão

Ao encerrar qualquer sessão de desenvolvimento, você DEVE:

1. Identificar o que foi feito nesta sessão.
2. Atualizar o arquivo:
   `C:\Users\Note\Documents\Obsidian\MeuVault\10 - Projetos Pessoais\Controle de Gastos Mensais 2.0.md`
3. A atualização deve:
   - Marcar tarefas concluídas com `[x]` em **✅ Próximos Passos**.
   - Adicionar novas tarefas pendentes identificadas.
   - Adicionar log na seção **📝 Notas** no formato:

         ### Log YYYY-MM-DD
         - O que foi feito
         - Decisões tomadas
         - Problemas encontrados

   - Atualizar status dos módulos se algum foi concluído.
4. Confirmar com: `✅ Obsidian atualizado — Controle de Gastos Mensais 2.0`

### Módulos do projeto

- Lançamentos
- Barra Lateral
- Gastos Fixos e Créditos

---

*Gerado por Claude · Anthropic · 25/04/2026*
*Inventário completo: G:\Meu Drive\02 - Projetos\Dashboard-Glauco\inventario-dashboard-glauco.docx*
