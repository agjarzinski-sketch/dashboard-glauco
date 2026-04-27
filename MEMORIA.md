# Memória do Projeto — Dashboard Glauco 2026

## O que é este projeto
Dashboard financeiro pessoal de Angelo Glauco Jarzinski.
Controla faturas Nubank, saldo bancário e investimentos RDB.

## Stack e configurações
- Frontend: HTML + CSS + JS puro (index.html)
- Banco de dados: Supabase — orgdhapoyhgyhedqbobi.supabase.co
- Deploy: Vercel — dashboard-glauco.vercel.app
- GitHub: github.com/agjarzinski-sketch/dashboard-glauco
- URL em produção: https://dashboard-glauco.vercel.app

## Identidade visual
- Cores: tema escuro com destaque azul Nubank
- Fontes: sistema padrão
- Referência: G:\Meu Drive\02 - Projetos\Dashboard-Glauco\

## Decisões tomadas
- 25/04/2026 — Deploy automático via GitHub + Vercel configurado
- 25/04/2026 — Supabase configurado com tabela snapshots
- 25/04/2026 — PC organizado: C:\projetos\ + G:\Meu Drive\
- 26/04/2026 — Tabela snapshots criada no Supabase
- 26/04/2026 — CLAUDE.md atualizado com inventário completo
- 26/04/2026 — MEMORIA.md criado conforme INSTRUCOES.md

## Últimas sessões
- 25/04/2026 — Setup completo: GitHub, Vercel, Supabase, organização do PC
- 26/04/2026 — Tabela Supabase criada, SQL do CRM removido, auditoria do INSTRUCOES.md
- 27/04/2026 — Levantamento completo da planilha Excel (33 abas), definição de 16 categorias e 120 subcategorias, criação de 7 tabelas no Supabase, seed de categorias, tela de Configurações > Categorias com CRUD completo
- 27/04/2026 — Fase 2 concluída: Módulo de Lançamentos com CRUD de Entradas/Saídas, tabs, filtro mês/busca, formulário com selects encadeados categoria/subcategoria, parcelamento automático em entradas (gera N linhas preservando fim de mês) e edição/exclusão; estado de edição via form.dataset.editingId para robustez
- 27/04/2026 — Fase 3 concluída: barra lateral fixa de navegação (220px, tema escuro). Itens: Dashboard, Lançamentos (subitens Entradas/Saídas), Cartão de Crédito, Gastos Fixos, Orçamento, Dívidas, Fluxo de Caixa, Configurações. Itens futuros desabilitados com badge "Em breve". Header simplificado (título + usuário). Rodapé da sidebar com resumo do mês corrente (entradas/saídas/saldo) lido do Supabase. navTo() coordena troca de telas; closeLancamentosScreen/closeCategoriasConfig sincronizam sidebar ao fechar pelo X.

## Fases concluídas
- ✅ Fase 1 — Configurações > Categorias (CRUD de categorias e subcategorias)
- ✅ Fase 2 — Módulo de Lançamentos (Entradas e Saídas)
- ✅ Fase 3 — Barra lateral fixa de navegação com resumo do mês

## Pendências (em ordem de prioridade)
- **Fase 4 (próxima):** Módulo de Cartão de Crédito item a item
- Fase 5: Dashboard evoluído com breakdown por categoria e totais automáticos
- Fase 6: Gastos Fixos Recorrentes
- Fase 7: Orçamento / Planejamento semanal e mensal
- Fase 8: Créditos e Débitos Futuros
- Fase 9: Painel de Dívidas
- Fase 10: Fluxo de Caixa Projetado
- Fase 11: Histórico e importação da planilha
