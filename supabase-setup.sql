-- Execute este SQL no Supabase: SQL Editor → New query → cole e clique em Run
-- Cria a tabela que armazena o estado do dashboard

create table if not exists snapshots (
  id        text primary key,
  data      jsonb,
  updated_at timestamptz default now()
);

-- Permite leitura/escrita pelo frontend (publishable key)
alter table snapshots enable row level security;

create policy "acesso público dashboard"
  on snapshots for all
  using (true)
  with check (true);
