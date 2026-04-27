// seed-categorias.js
// Insere as categorias e subcategorias no Supabase via REST API.
// Pré-requisitos: Node 18+ (fetch nativo); .env com VITE_SUPABASE_URL/VITE_SUPABASE_KEY;
// tabelas categorias e subcategorias criadas e VAZIAS (script aborta se já houver dados).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------- carrega .env ----------
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  const env = {};
  for (const linha of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const m = linha.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

const env = loadEnv();
const URL = env.VITE_SUPABASE_URL;
const KEY = env.VITE_SUPABASE_KEY;
if (!URL || !KEY) {
  console.error('Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_KEY ausente no .env');
  process.exit(1);
}

const BASE_HEADERS = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json'
};

// ---------- dados ----------
const CATEGORIAS = [
  { nome: 'Alimentação',                tipo: 'saida',   subs: ['Açougue','Delivery','Feira/Hortfruti','Lanches e Cafés','Mercearia/Padaria','Restaurantes','Supermercado'] },
  { nome: 'Compras',                    tipo: 'saida',   subs: ['Roupas e Acessórios','Eletrônicos','Móveis e Decoração','Livros','Produtos de Higiene e Beleza','Presentes','Diversos','Cigarro'] },
  { nome: 'Lazer',                      tipo: 'saida',   subs: ['Viagens','Cinema e Teatro','Assinaturas de Streaming','Eventos e Shows','Bares e Restaurantes','Jogos','Ganja'] },
  { nome: 'Moradia',                    tipo: 'saida',   subs: ['Aluguel/Prestação de Imóvel','Condomínio','Água Luz e Gás','Internet e Telefonia','Manutenção do Lar','IPTU','Lavanderia','Limpeza Doméstica','Locação Salão/Churrasqueira'] },
  { nome: 'Saúde e Bem-Estar',          tipo: 'saida',   subs: ['Consultas Médicas','Medicamentos','Plano de Saúde','Academia e Exercícios','Terapias e Tratamentos Alternativos','Exames','Barbeiro','Suplementos'] },
  { nome: 'Investimentos — Aporte',     tipo: 'saida',   subs: ['Ações e Renda Variável','Renda Fixa','Previdência Privada','Imóveis','Fundos de Investimento','Criptomoedas','Garantia Cartão de Crédito'] },
  { nome: 'Investimentos — Resgate',    tipo: 'entrada', subs: ['Resgate Investimentos','Resgate Criptos','Resgate Garantia Cartão de Crédito'] },
  { nome: 'Transferências e Pagamentos',tipo: 'ambos',   subs: ['Transferências Bancárias','Pagamento de Contas','Pix','Boletos','Cartão de Crédito'] },
  { nome: 'Dívidas — Pagamento',        tipo: 'saida',   subs: ['Parcela Empréstimo Bancário','Parcela Empréstimo Pessoal (PF)','Parcela Financiamento Imóvel','Parcela Consórcio Imobiliário','Parcela Financiamento Auto','Parcela Consórcio Auto','Parcela Linhas de Crédito','Quitação de Dívida'] },
  { nome: 'Dívidas — Tomada',           tipo: 'entrada', subs: ['Empréstimo Bancário Recebido','Empréstimo Pessoal (PF) Recebido','Linha de Crédito Utilizada'] },
  { nome: 'Renda',                      tipo: 'entrada', subs: ['Hermes Capital','Consórcio','Seguros','Financ. Imob','Câmbio','Bônus HC','Trade','Dividendos','Juros de Investimentos','Aluguéis Recebidos','Outros Rendimentos'] },
  { nome: 'Impostos e Taxas',           tipo: 'saida',   subs: ['Imposto de Renda','IPVA','IPTU','Taxas Bancárias','Multas e Encargos','Taxa CVM'] },
  { nome: 'Educação e Desenvolvimento', tipo: 'saida',   subs: ['Cursos Online','Pós-Graduação e MBAs','Livros e Materiais Educacionais','Workshops e Seminários','Idiomas','Assinatura de Serviços','Associação Pró-Vida'] },
  { nome: 'Transporte',                 tipo: 'saida',   subs: ['Transporte Público','Taxi e App de Transporte','Seguro Auto','Combustível','Manutenção Auto','Estacionamento','Manutenção Terceiros','Passagem de Ônibus','Passagem de Avião'] },
  { nome: 'Outros',                     tipo: 'ambos',   subs: ['Outros','Estorno','Acerto Financeiro','Acerto Casa','Doação','Apostas','Cashback'] },
  { nome: 'Negócio',                    tipo: 'ambos',   subs: ['Café da Manhã','Almoço/Jantar','Happy Hour','Evento','Ajuste Financeiro','Acerto Operacional','Sistemas','Manutenção','Alan Sbeghen','Locação de Carro/Transporte','Pedágio','Combustível','Verba de Marketing','Compra de Leads','Assinatura de AI'] }
];

const totalCats = CATEGORIAS.length;
const totalSubs = CATEGORIAS.reduce((s, c) => s + c.subs.length, 0);

// ---------- helpers HTTP ----------
async function postJson(table, body, prefer = 'return=representation') {
  const res = await fetch(`${URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...BASE_HEADERS, Prefer: prefer },
    body: JSON.stringify(body)
  });
  const txt = await res.text();
  if (!res.ok) {
    throw new Error(`POST ${table} -> HTTP ${res.status}\n${txt}`);
  }
  return txt ? JSON.parse(txt) : null;
}

async function countRows(table) {
  const res = await fetch(`${URL}/rest/v1/${table}?select=id`, {
    headers: { ...BASE_HEADERS, Prefer: 'count=exact', Range: '0-0' }
  });
  if (!res.ok) throw new Error(`count ${table} -> HTTP ${res.status}`);
  const cr = res.headers.get('content-range') || '*/0';
  return parseInt(cr.split('/').pop(), 10) || 0;
}

// ---------- main ----------
(async () => {
  console.log(`Plano: inserir ${totalCats} categorias e ${totalSubs} subcategorias.`);
  console.log('');

  // 1) checagem de pré-condição
  const cCat = await countRows('categorias');
  const cSub = await countRows('subcategorias');
  if (cCat > 0 || cSub > 0) {
    console.error(`ABORTADO — tabelas não estão vazias: categorias=${cCat}, subcategorias=${cSub}.`);
    console.error('Re-rodar geraria duplicatas. Limpe as tabelas no Supabase antes de tentar de novo.');
    process.exit(2);
  }

  // 2) insere categorias e captura UUIDs
  console.log('1/2  Inserindo categorias...');
  const catPayload = CATEGORIAS.map(c => ({ nome: c.nome, tipo: c.tipo }));
  const catCriadas = await postJson('categorias', catPayload);
  console.log(`     ${catCriadas.length} categorias criadas.`);

  const idDe = Object.fromEntries(catCriadas.map(c => [c.nome, c.id]));

  // 3) monta e insere subcategorias
  console.log('2/2  Inserindo subcategorias...');
  const subPayload = [];
  for (const c of CATEGORIAS) {
    const categoria_id = idDe[c.nome];
    if (!categoria_id) throw new Error(`Categoria "${c.nome}" não retornou id na inserção.`);
    for (const nomeSub of c.subs) {
      subPayload.push({ categoria_id, nome: nomeSub });
    }
  }
  const subCriadas = await postJson('subcategorias', subPayload);
  console.log(`     ${subCriadas.length} subcategorias criadas.`);

  // 4) confirma com SELECT count
  console.log('');
  console.log('Confirmação via API (count=exact):');
  console.log(`  categorias    : ${await countRows('categorias')} (esperado ${totalCats})`);
  console.log(`  subcategorias : ${await countRows('subcategorias')} (esperado ${totalSubs})`);
  console.log('');
  console.log('OK.');
})().catch(err => {
  console.error('\nFalhou:', err.message);
  process.exit(1);
});
