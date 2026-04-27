-- Execute este SQL no Supabase: SQL Editor -> New query -> cole e clique em Run
-- Cria tabelas adicionais do dashboard financeiro Glauco 2026
-- Todas as tabelas com RLS habilitado e politica de acesso publico
-- (mesmo padrao da tabela snapshots ja existente)
--
-- gen_random_uuid() esta disponivel por padrao no Postgres 13+ do Supabase.

-- ============================================================
-- 1) categorias
-- ============================================================
create table if not exists categorias (
  id         uuid        primary key default gen_random_uuid(),
  nome       text        not null,
  tipo       text        not null check (tipo in ('entrada','saida','ambos')),
  ativo      boolean     not null default true,
  criado_em  timestamptz not null default now()
);

alter table categorias enable row level security;

create policy "acesso público categorias"
  on categorias for all
  using (true)
  with check (true);


-- ============================================================
-- 2) subcategorias
-- ============================================================
create table if not exists subcategorias (
  id            uuid        primary key default gen_random_uuid(),
  categoria_id  uuid        not null references categorias(id) on delete cascade,
  nome          text        not null,
  ativo         boolean     not null default true,
  criado_em     timestamptz not null default now()
);

alter table subcategorias enable row level security;

create policy "acesso público subcategorias"
  on subcategorias for all
  using (true)
  with check (true);


-- ============================================================
-- 3) lancamentos
-- ============================================================
create table if not exists lancamentos (
  id               uuid        primary key default gen_random_uuid(),
  data             date        not null,
  descricao        text        not null,
  categoria_id     uuid        references categorias(id),
  subcategoria_id  uuid        references subcategorias(id),
  valor            numeric     not null,
  tipo             text        not null check (tipo   in ('entrada','saida')),
  status           text        not null check (status in ('confirmado','pendente')),
  parcela_atual    int,
  total_parcelas   int,
  obs              text,
  criado_em        timestamptz not null default now()
);

alter table lancamentos enable row level security;

create policy "acesso público lancamentos"
  on lancamentos for all
  using (true)
  with check (true);


-- ============================================================
-- 4) cartao
-- ============================================================
create table if not exists cartao (
  id               uuid        primary key default gen_random_uuid(),
  data_compra      date        not null,
  data_vencimento  date        not null,
  descricao        text        not null,
  categoria_id     uuid        references categorias(id),
  subcategoria_id  uuid        references subcategorias(id),
  valor            numeric     not null,
  parcela_atual    int,
  total_parcelas   int,
  status           text        not null check (status in ('confirmado','pendente')),
  obs              text,
  criado_em        timestamptz not null default now()
);

alter table cartao enable row level security;

create policy "acesso público cartao"
  on cartao for all
  using (true)
  with check (true);


-- ============================================================
-- 5) gastos_fixos
-- ============================================================
create table if not exists gastos_fixos (
  id               uuid        primary key default gen_random_uuid(),
  nome             text        not null,
  categoria_id     uuid        references categorias(id),
  subcategoria_id  uuid        references subcategorias(id),
  valor            numeric     not null,
  dia_vencimento   int         not null,
  forma_pagamento  text        not null check (forma_pagamento in ('conta','cartao')),
  ativo            boolean     not null default true,
  obs              text,
  criado_em        timestamptz not null default now()
);

alter table gastos_fixos enable row level security;

create policy "acesso público gastos_fixos"
  on gastos_fixos for all
  using (true)
  with check (true);


-- ============================================================
-- 6) dividas
-- ============================================================
create table if not exists dividas (
  id              uuid        primary key default gen_random_uuid(),
  nome            text        not null,
  categoria_id    uuid        references categorias(id),
  valor_total     numeric     not null,
  valor_parcela   numeric     not null,
  total_parcelas  int         not null,
  parcelas_pagas  int         not null default 0,
  data_inicio     date        not null,
  moeda           text        not null check (moeda in ('BRL','USD')),
  taxa_juros      numeric,
  obs             text,
  criado_em       timestamptz not null default now()
);

alter table dividas enable row level security;

create policy "acesso público dividas"
  on dividas for all
  using (true)
  with check (true);


-- ============================================================
-- 7) orcamento
-- ============================================================
create table if not exists orcamento (
  id         uuid        primary key default gen_random_uuid(),
  mes        int         not null,
  ano        int         not null,
  tipo       text        not null check (tipo in ('semanal','mensal')),
  valor      numeric     not null,
  criado_em  timestamptz not null default now()
);

alter table orcamento enable row level security;

create policy "acesso público orcamento"
  on orcamento for all
  using (true)
  with check (true);
