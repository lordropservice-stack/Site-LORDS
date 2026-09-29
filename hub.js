/* ============================================================
   LORDS HUB — hub.js  (Fase 1 · DEMO DE FRENTE, sem backend)
   ------------------------------------------------------------
   Tudo em memória: login é fachada, dados são de exemplo e nada
   é persistido. Coins/recompensas são pré-visualização — sem
   compra, sem saque, sem dinheiro. Config vem de products-data.js.
   ============================================================ */
import { PRODUCTS, HUB_MODULES, HUB_ACCESS, COINS_RULES, REWARDS, HUB_MISSIONS, HUB_SHOP } from "./products-data.js?v=20260929d";

const $  = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// Substitua pela URL do YouTube/Vimeo quando o vídeo estiver pronto.
// Deixe vazio ('') para esconder o bloco completamente.
const HUB_VIDEO_URL = '';

// Banners do Dashboard — troque src por URLs reais quando tiver as artes.
// Para esconder o slider, deixe o array vazio: [].
const HUB_BANNERS = [
  { src: "", label: "Banner 01", bg: "linear-gradient(135deg,#0d1b2e 0%,#1a2f50 60%,#7b5ea7 100%)" },
  { src: "", label: "Banner 02", bg: "linear-gradient(135deg,#1a0d2e 0%,#3d1a6e 60%,#0d1b2e 100%)" },
  { src: "", label: "Banner 03", bg: "linear-gradient(135deg,#0d2e1b 0%,#1a6e3d 60%,#0d1b2e 100%)" },
];
const fmt = (n) => Number(n).toLocaleString("pt-BR");
const FAB = PRODUCTS["fabrica-criativa"];
const planShort = (id) => { const p = (FAB.plans || []).find((x) => x.id === id); return p ? p.short : id; };
const nowStamp = () => {
  const d = new Date(), z = (n) => String(n).padStart(2, "0");
  return z(d.getDate()) + "/" + z(d.getMonth() + 1) + " · " + z(d.getHours()) + ":" + z(d.getMinutes());
};

/* ---- Dados dos novos módulos (demo de frente) ---- */
const VAULT_ITEMS = [
  { id: "v1",  tipo: "Reels",     mes: "Agosto", tema: "Bastidor da captação da semana",  status: "Entregue",  data: "12/08" },
  { id: "v2",  tipo: "Carrossel", mes: "Agosto", tema: "3 erros no feed da sua marca",     status: "Aprovado",  data: "08/08" },
  { id: "v3",  tipo: "Post",      mes: "Agosto", tema: "Antes e depois — projeto novo",    status: "Publicado", data: "07/08" },
  { id: "v4",  tipo: "Reels",     mes: "Agosto", tema: "Depoimento em vídeo",              status: "Entregue",  data: "05/08" },
  { id: "v5",  tipo: "Stories",   mes: "Agosto", tema: "Bastidores do estúdio",            status: "Publicado", data: "03/08" },
  { id: "v6",  tipo: "Arte",      mes: "Agosto", tema: "Cover — lançamento de produto",   status: "Publicado", data: "01/08" },
  { id: "v7",  tipo: "Carrossel", mes: "Julho",  tema: "Dicas de vendas para o verão",    status: "Publicado", data: "28/07" },
  { id: "v8",  tipo: "Post",      mes: "Julho",  tema: "Lançamento da nova linha",         status: "Publicado", data: "25/07" },
  { id: "v9",  tipo: "Reels",     mes: "Julho",  tema: "Tour pelo empreendimento",         status: "Publicado", data: "20/07" },
  { id: "v10", tipo: "Stories",   mes: "Julho",  tema: "Enquete — novos produtos",         status: "Publicado", data: "18/07" },
  { id: "v11", tipo: "Arte",      mes: "Julho",  tema: "Artes de feed — coleção julho",   status: "Publicado", data: "15/07" },
  { id: "v12", tipo: "Reels",     mes: "Julho",  tema: "Processo de produção",             status: "Publicado", data: "10/07" },
];

const VAULT_TYPES  = ["todos", "Reels", "Carrossel", "Post", "Stories", "Arte"];
const VAULT_MONTHS = ["todos", "Agosto", "Julho"];

const RANKING_DATA = [
  { pos: 1, nome: "Boutique Aurora",   coins: 3840, badge: "1°", isUser: false },
  { pos: 2, nome: "AutoCenter RB",     coins: 2910, badge: "2°", isUser: false },
  { pos: 3, nome: "Clínica Vitalis",   coins: 2250, badge: "3°", isUser: false },
  { pos: 4, nome: "Sua Empresa",       coins: 1000, badge: null,  isUser: true  },
  { pos: 5, nome: "Cliente E",         coins:  980, badge: null,  isUser: false },
  { pos: 6, nome: "Cliente F",         coins:  760, badge: null,  isUser: false },
  { pos: 7, nome: "Cliente G",         coins:  430, badge: null,  isUser: false },
  { pos: 8, nome: "Cliente H",         coins:  310, badge: null,  isUser: false },
];

const ADVISOR_RESPONSES = [
  { keywords: ["instagram", "algoritmo", "feed", "alcance"],
    resp: "Para crescer no Instagram em 2026, o algoritmo prioriza consistência e tempo de retenção nos Reels. Publique 4–5×/semana nos horários de pico do seu público (12h–14h e 19h–21h). Conteúdo de bastidor e depoimento tende a gerar mais engajamento real." },
  { keywords: ["mídia", "tráfego", "ads", "anúncio", "pago", "meta"],
    resp: "Para campanhas pagas, o funil mais eficaz no Meta Ads combina: Topo = Reels de bastidor (audiência fria) → Meio = Carrossel com prova social (retargeting 7 dias) → Fundo = Oferta direta (retargeting de visualizadores). Budget mínimo recomendado: R$ 1.500/mês." },
  { keywords: ["conteudo", "conteúdo", "tipo", "formato", "reels", "carrossel"],
    resp: "Para a sua marca, priorize Reels (alcance orgânico), Carrossel (salvamentos = sinal positivo p/ algoritmo) e Stories (relacionamento diário). Proporção ideal: 40% bastidor/educativo, 30% prova social, 20% institucional, 10% promocional." },
  { keywords: ["vendas", "conversão", "vender", "converter"],
    resp: "A maior alavanca de conversão via redes em 2026 é o combo: prova social visual (vídeos curtos de clientes reais) + CTA direto pro WhatsApp com mensagem pré-pronta. Adicione um gatilho de escassez real — não inventado — para acelerar a decisão." },
  { keywords: ["caption", "legenda", "texto", "copy"],
    resp: "Legendas que convertem seguem a estrutura: Gancho (1ª linha visível sem abrir) → Problema que o público vive → Solução que você oferece → CTA claro (\"Manda uma mensagem\" ou \"Salva esse post\"). Evite CTAs genéricos como \"Curta e siga\"." },
  { keywords: ["nicho", "segmento", "público", "persona"],
    resp: "Quanto mais segmentado o seu conteúdo, maior o engajamento. Fale diretamente para o cliente ideal: use o vocabulário dele, mostre situações que ele vive, resolva as dúvidas que ele tem. Conteúdo genérico para todo mundo não converte." },
  { keywords: ["branding", "marca", "identidade", "visual"],
    resp: "Uma identidade de marca forte no digital tem 3 pilares: consistência visual (paleta, tipografia, enquadramento), consistência de tom de voz (formal? descontraído? expert?), e constância de presença. Sem qualquer um dos três, a marca perde memorabilidade." },
  { keywords: ["whatsapp", "zap", "wpp"],
    resp: "O WhatsApp é o maior canal de conversão no mercado brasileiro. Use listas de transmissão segmentadas, não grupos (mais pessoal). Envie conteúdo de valor 3x antes de 1 oferta. Automatize a recepção, mas humanize o fechamento." },
  { keywords: ["stories", "story"],
    resp: "Stories são o canal de relacionamento diário. Use para bastidores, enquetes, perguntas e respostas. A cadência ideal é 3–5 stories/dia. Quem responde os seus stories tem 70% mais chance de comprar. Responda sempre." },
  { keywords: ["coins", "pontos", "recompensa", "missão"],
    resp: "Para subir rápido no ranking de coins: complete missões diárias (aprovar conteúdos no prazo, compartilhar insights), envie provas sociais, e indique empresas qualificadas para a LORDS (1.000 coins por indicação aprovada!). Cada coin é um passo para mais benefícios." },
];

const BADGES_DEF = [
  { id: "b-welcome",   sigla: "BV", nome: "Bem-vindo",          desc: "Entrou no LORDS Hub",                            condition: () => true },
  { id: "b-first-ok",  sigla: "AP", nome: "1ª Aprovação",        desc: "Aprovou o primeiro conteúdo",                   condition: () => state.contents.some(c => c.status === "ok" && c.by) },
  { id: "b-mission-1", sigla: "MC", nome: "Missão Completa",     desc: "Completou a primeira missão",                   condition: () => state.missions.some(m => m.status === "concluida") },
  { id: "b-coins-500", sigla: "5C", nome: "Meio Milhar",         desc: "Acumulou 500+ coins",                           condition: () => state.coins >= 500 },
  { id: "b-coins-1k",  sigla: "1K", nome: "1K de Coins",         desc: "Acumulou 1.000+ coins",                         condition: () => state.coins >= 1000 },
  { id: "b-community", sigla: "CL", nome: "Parte do Clube",      desc: "Curtiu uma publicação na comunidade",           condition: () => state.community.some(p => p.liked) },
  { id: "b-loja",      sigla: "LJ", nome: "Primeira Compra",     desc: "Resgatou algo na Loja do Clube",                condition: () => state.shopBought.length > 0 },
  { id: "b-speed",     sigla: "SR", nome: "Super Rápido",        desc: "Aprovou 2+ conteúdos no prazo",                 condition: () => state.contents.filter(c => c.status === "ok").length >= 2 },
  { id: "b-loyalist",  sigla: "LO", nome: "Cliente LORDS",       desc: "Está no Hub há mais de 30 dias (em breve)",     condition: () => false },
  { id: "b-top-rank",  sigla: "T3", nome: "Top 3 do Ranking",    desc: "Entrou no Top 3 de coins do mês (em breve)",    condition: () => false },
];

/* Volumes por plano — espelho do Comparativo de Planos (vault). `postados` é demo. */
const DEMO_DELIVERIES = {
  capture:  { videos: 6,  encontros: 1, fotos: "—",      artes: "—", postados: 3,  total: 6  },
  creator:  { videos: 10, encontros: 1, fotos: "Ensaio", artes: "—", postados: 6,  total: 10 },
  completo: { videos: 16, encontros: 2, fotos: "Ensaio", artes: 10,  postados: 11, total: 26 },
};

/* Captação de clientes (Creator/Completo) — dados de demonstração. */
const DEMO_CAPTACAO = {
  creator:  { abordados: 60,  responderam: 9,  leads: 4 },
  completo: { abordados: 120, responderam: 17, leads: 8 },
};
const DEMO_LEADS = [
  { nome: "Contato via Instagram", origem: "DM", quando: "ontem",    status: "Aguardando você" },
  { nome: "Contato via WhatsApp",  origem: "WA", quando: "há 3 dias", status: "Em conversa" },
  { nome: "Indicação de parceiro", origem: "Indicação", quando: "há 5 dias", status: "Reunião marcada" },
];

/* ---------------- Estado (demo) ---------------- */
const state = {
  plan: "creator",
  module: "dashboard",
  company: "Sua Empresa",
  userName: "Você",
  coins: 1000,
  points: 40,
  missions: HUB_MISSIONS.map((m) => ({ ...m })),
  shopBought: [],
  responsavel: "",
  cnpj: "",
  email: "",
  telefone: "",
  nicho: "",
  perfilEditando: false,
  perfilClaimed: false,
  notifOpen: false,
  conteudosTab: "aprovar",
  conteudosView: "lista",
  calModal: null,
  calEvents: {
    6:  { tipo: "Roteiro",    label: "Roteiro de conteúdo",   desc: "Criação do roteiro para os vídeos da semana.", media: null },
    12: { tipo: "Gravação",   label: "Dia de gravação",        desc: "Gravação dos Reels e bastidores do mês.",      media: null },
    13: { tipo: "Aprovação",  label: "Aprovação de conteúdo", desc: "Prazo para aprovação dos conteúdos agendados.", media: null },
    14: { tipo: "Post",       label: "Publicação — Post",      desc: "Post 'Antes e Depois' publicado no feed.",     media: null },
    15: { tipo: "Reels",      label: "Publicação — Reels",     desc: "Reels do bastidor da captação no ar.",         media: null },
    19: { tipo: "Reels",      label: "Publicação — Reels",     desc: "Segundo Reels da quinzena.",                   media: null },
    21: { tipo: "Carrossel",  label: "Publicação — Carrossel", desc: "Carrossel dos 3 erros do feed.",               media: null },
    25: { tipo: "Reunião",    label: "Reunião de alinhamento", desc: "Call mensal com o time LORDS.",                media: null },
    26: { tipo: "Post",       label: "Publicação — Post",      desc: "Post semanal de resultado.",                   media: null },
    28: { tipo: "Reels",      label: "Publicação — Reels",     desc: "Último Reels do mês.",                         media: null },
  },
  limits: {},
  ledger: [
    { ts: "05/08 · 11:03", acao: "Indicar um amigo qualificado", delta: 1000 },
  ],
  contents: [
    { id: "c1", tipo: "Reels",     tema: "Bastidor da captação da semana", legenda: "Um dia de gravação vira um mês de conteúdo.", data: "Ter · 12/08", status: "aprovar", by: null, at: null },
    { id: "c2", tipo: "Carrossel", tema: "3 erros no feed da sua marca",    legenda: "O terceiro quase todo mundo comete.",        data: "Qua · 13/08", status: "aprovar", by: null, at: null },
    { id: "c3", tipo: "Post",      tema: "Antes e depois — projeto novo",   legenda: "Resultado que fala por si.",                 data: "Qui · 14/08", status: "ok", by: "Você", at: "01/08 · 09:30" },
    { id: "c4", tipo: "Reels",     tema: "Depoimento em vídeo",             legenda: "Quem já vive a experiência conta como é.",   data: "Sex · 15/08", status: "mudar", by: null, at: null },
  ],
  community: [
    { id: "p1", autor: "Marina",   empresa: "Boutique Aurora",  txt: "Fechamos o mês com o dobro de agendamentos vindos do Instagram. O segredo foi manter a constância que a LORDS montou.", likes: 24, liked: false, coments: 6, pinned: true },
    { id: "p2", autor: "Rafael",   empresa: "AutoCenter RB",    txt: "Dica pra quem tá começando: aprovem os roteiros rápido. O conteúdo sai muito mais no ritmo e ainda rende coins.", likes: 11, liked: false, coments: 3, pinned: false },
    { id: "p3", autor: "Dra. Lia", empresa: "Clínica Vitalis",  txt: "Alguém aqui já testou UGC com paciente? Quero trocar ideia sobre autorização de imagem.", likes: 7, liked: false, coments: 5, pinned: false },
  ],
  notifications: [
    { id: "n1", ic: "✓", txt: "2 conteúdos aguardando a sua aprovação.", quando: "hoje",   lida: false },
    { id: "n2", ic: "—", txt: "Nova gravação agendada para 12/08.",       quando: "ontem",  lida: false },
    { id: "n3", ic: "+", txt: "Você ganhou 60 coins por um insight útil.", quando: "3 dias", lida: true  },
    { id: "n4", ic: "—", txt: "Marina publicou um case na comunidade.",    quando: "3 dias", lida: true  },
  ],
  redeemed: [],
  vaultType:  "todos",
  vaultMonth: "todos",
  advisor: [
    { from: "lords", txt: "Oi! Sou o Advisor da LORDS. Pode me perguntar sobre estratégia de conteúdo, marketing digital, Instagram, mídia paga, branding — qualquer coisa da sua operação." },
  ],
  project: {
    escopo: "Operação mensal de conteúdo: estratégia, roteiro, captação com câmera, edição e acompanhamento.",
    etapas: [
      { nome: "Diagnóstico & linha editorial", status: "ok" },
      { nome: "Roteiros do mês",               status: "ok" },
      { nome: "Captação (12/08)",              status: "andamento" },
      { nome: "Edição",                        status: "fila" },
      { nome: "Publicação & relatório",        status: "fila" },
    ],
    responsaveis: [
      { nome: "Estrategista LORDS", papel: "Estratégia & roteiro" },
      { nome: "Videomaker",         papel: "Captação & edição" },
      { nome: "Comunicadora",       papel: "Rosto da marca (Creator/Completo)" },
    ],
    docs: [
      { nome: "Contrato assinado.pdf", tag: "Contrato" },
      { nome: "Linha editorial.pdf",   tag: "Estratégia" },
      { nome: "Calendário do mês.pdf", tag: "Cronograma" },
    ],
  },
};

/* ---------------- Score de Marca ---------------- */
function calcBrandScore() {
  let s = 38;
  s += Math.min(18, Math.floor(state.coins / 80));
  const missOK = state.missions.filter(m => m.status === "concluida").length;
  s += Math.round(missOK / state.missions.length * 15);
  const contOK = state.contents.filter(c => c.status === "ok").length;
  s += Math.round(contOK / state.contents.length * 15);
  if (state.ledger.length > 3) s += 5;
  if (moduleState("comunidade") === "enabled") s += 5;
  return Math.min(100, s);
}

function scoreGaugeSVG(score, size = 120) {
  const r = 46, cx = 60, cy = 60;
  const dash = 2 * Math.PI * r;
  const pct = score / 100;
  const fg = pct >= .8 ? "#1faf6a" : pct >= .6 ? "#8b7bff" : "#e08a2b";
  return `<svg viewBox="0 0 120 120" width="${size}" height="${size}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="10"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${fg}" stroke-width="10"
      stroke-dasharray="${dash * pct} ${dash * (1 - pct)}"
      stroke-dashoffset="${dash * 0.25}" stroke-linecap="round"/>
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="24" font-weight="900" fill="#fff" font-family="Montserrat,sans-serif">${score}</text>
    <text x="${cx}" y="${cy + 22}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.5)" font-family="Montserrat,sans-serif">/ 100</text>
  </svg>`;
}

/* ---------------- Acesso por plano ---------------- */
const access = () => HUB_ACCESS[state.plan] || HUB_ACCESS.creator;
function moduleState(id) {
  const a = access();
  if ((a.enabled || []).includes(id)) return "enabled";
  if ((a.locked  || []).includes(id)) return "locked";
  return "hidden";
}
const isPremium = (id) => (access().premium || []).includes(id);

/* ---------------- Toast ---------------- */
let toastT;
function toast(msg) {
  const el = $("#hb-toast");
  el.textContent = msg; el.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------------- Coins ---------------- */
function awardByRule(ruleId) {
  const r = COINS_RULES.find((x) => x.id === ruleId);
  if (!r || !r.ativo) return false;
  const used = state.limits[ruleId] || 0;
  if (r.limiteDia != null && used >= r.limiteDia) { toast("Limite diário atingido para: " + r.acao); return false; }
  state.limits[ruleId] = used + 1;
  state.coins += r.coins;
  state.ledger.unshift({ ts: nowStamp(), acao: r.acao, delta: r.coins });
  return true;
}
const nextReward = () => REWARDS.filter((r) => r.status === "ativo").sort((a, b) => a.custo - b.custo)
  .find((r) => r.custo > state.coins) || REWARDS.filter((r) => r.status === "ativo").sort((a, b) => b.custo - a.custo)[0];

/* ---------------- Login (fachada) ---------------- */
const loginEl = $("#hb-login"), appEl = $("#hb-app"), form = $("#hb-form");
$("#hb-plan-pick").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-plan]"); if (!b) return;
  $("#hb-plan-pick").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
  state.plan = b.dataset.plan;
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#hb-email").value.trim();
  const nome = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  state.company = nome || "Sua Empresa";
  RANKING_DATA.find(r => r.isUser).nome = state.company;
  loginEl.hidden = true; appEl.hidden = false;
  syncPlanUI(); boot(); window.scrollTo(0, 0);
});
$("#hb-sair").addEventListener("click", () => { appEl.hidden = true; loginEl.hidden = false; form.reset(); window.scrollTo(0, 0); });

/* ---------------- Troca de plano (topo — demo only) ---------------- */
document.querySelectorAll(".hb-plan-switch button").forEach((b) => {
  b.addEventListener("click", () => { setPlan(b.dataset.sw); });
}); // selector kept for compatibility (HTML element removed)
function setPlan(id) {
  state.plan = id;
  if (moduleState(state.module) !== "enabled") {
    state.module = (access().enabled || ["dashboard"])[0];
  }
  syncPlanUI(); boot();
}
function syncPlanUI() {
  $("#hb-plan-badge").innerHTML = "<i></i>Plano " + planShort(state.plan);
  document.querySelectorAll(".hb-plan-switch button").forEach((x) => x.classList.toggle("on", x.dataset.sw === state.plan));
  $("#hb-hello").textContent = "Bem-vindo de volta, " + state.company.split(" ")[0] + ".";
  const sp = $("#hb-sidebar-company"); if (sp) sp.textContent = state.company;
}

/* ---------------- Navegação ---------------- */
function renderNav() {
  const nav = $("#hb-nav");
  nav.innerHTML = HUB_MODULES.filter(m => !m.hidden).map((m) => {
    const st = moduleState(m.id);
    if (st === "hidden") return "";
    const on = state.module === m.id ? " on" : "";
    const locked = st === "locked" ? " locked" : "";
    const badge = st === "locked"
      ? (m.comingSoon ? '<span class="hb-soon">Em breve</span>' : '<span class="hb-lock">—</span>')
      : (isPremium(m.id) ? '<span class="hb-prem">PREMIUM</span>' : "");
    const lockIco = m.comingSoon ? '<span class="hb-lock-ico">🔒</span>' : "";
    return `<button class="hb-item${on}${locked}" data-mod="${m.id}">${lockIco}<i>${m.icon}</i><span class="hb-item-lbl">${m.label}</span>${badge}</button>`;
  }).join("");
}
$("#hb-nav").addEventListener("click", (e) => {
  const b = e.target.closest(".hb-item"); if (!b) return;
  const id = b.dataset.mod;
  if (moduleState(id) === "locked") { renderLock(id); state.module = id; renderNav(); return; }
  state.module = id; boot();
});
document.getElementById("hb-sidebar-perfil")?.addEventListener("click", () => {
  state.module = "perfil"; boot();
});

/* ---------------- Render dos módulos ---------------- */
const card = (title, inner, head = "") =>
  `<section class="hb-card"><div class="hb-card-head"><h3>${title}</h3>${head}</div>${inner}</section>`;

const SUB = {
  dashboard:    "Uma visão do seu mês, das entregas e dos seus benefícios.",
  missoes:      "Cumpra missões e ganhe coins — como no clube.",
  loja:         "Troque seus coins por benefícios da LORDS.",
  projeto:      "Escopo, etapas, responsáveis e documentos do seu projeto.",
  conteudos:    "Aprove roteiros, vídeos e artes — cada aprovação fica registrada.",
  vault:        "Todo o conteúdo produzido para a sua marca, organizado e sempre à mão.",
  calendario:   "Gravações, aprovações, publicações e entregas do mês.",
  comunidade:   "Troque ideias com outros clientes LORDS. Só conteúdo público.",
  conquistas:   "Badges e conquistas que você desbloqueou na sua jornada com a LORDS.",
  ranking:      "Veja sua posição no Clube de Clientes LORDS.",
  coins:        "Pontos que você acumula participando — sem valor em dinheiro.",
  recompensas:  "Troque coins por benefícios exclusivos da LORDS.",
  advisor:      "Tire dúvidas de marketing diretamente com a IA da LORDS.",
  notificacoes: "Tudo o que aconteceu no seu Hub.",
  metas:        "Acompanhe metas e indicadores estratégicos.",
  captacao:     "Oportunidades que a LORDS gerou para o seu negócio neste mês.",
  relatorio:    "O resumo do mês: o que foi entregue, os números e os próximos passos.",
  perfil:       "Os dados da sua empresa no Hub.",
};

function boot() {
  if (moduleState(state.module) !== "enabled") {
    const first = HUB_MODULES.find(m => !m.hidden && moduleState(m.id) === "enabled");
    if (!first) { state.module = "dashboard"; renderNav(); renderLock("dashboard"); return; }
    state.module = first.id;
  }
  renderNav();
  $("#hb-subtitle").textContent = SUB[state.module] || "";
  const v = $("#hb-view");
  const R = {
    dashboard:    renderDashboard,
    missoes:      renderMissoes,
    projeto:      renderProjeto,
    conteudos:    renderConteudos,
    vault:        renderVault,
    calendario:   renderCalendario,
    comunidade:   renderComunidade,
    conquistas:   renderConquistas,
    ranking:      renderRanking,
    coins:        renderCoins,
    recompensas:  renderRecompensas,
    advisor:      renderAdvisor,
    notificacoes: renderNotificacoes,
    metas:        renderMetas,
    captacao:     renderCaptacao,
    relatorio:    renderRelatorio,
    perfil:       renderPerfil,
  };
  v.innerHTML = (R[state.module] || renderDashboard)();
  syncCounters();
  if (state.module === "dashboard") { _bannerIdx = 0; document.dispatchEvent(new Event("boot")); }
  if (state.module === "advisor") {
    const chat = document.getElementById("hb-adv-chat");
    if (chat) chat.scrollTop = chat.scrollHeight;
    const inp = document.getElementById("hb-adv-input");
    if (inp) inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); document.querySelector("[data-act='advisor_send']")?.click(); } };
  }
}

function syncCounters() {
  const el = $("#hb-counters"); if (!el) return;
  const missOK = state.missions.filter((m) => m.status === "concluida").length;
  const unread = state.notifications.filter(n => !n.lida).length;
  el.innerHTML = `
    <span class="hb-count">${fmt(state.coins)}<small>Coins</small></span>
    <span class="hb-count">${missOK}/${state.missions.length}<small>Missões</small></span>
    <button class="hb-bell${state.notifOpen ? " active" : ""}" data-act="open-notif" title="Notificações">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>${unread ? `<span class="hb-bell-dot">${unread}</span>` : ""}
    </button>`;
}

function renderLock(id) {
  const m = HUB_MODULES.find((x) => x.id === id) || { label: "Este módulo" };
  if (m.comingSoon) {
    $("#hb-subtitle").textContent = "Em breve.";
    $("#hb-view").innerHTML = `
      <div class="hb-lockview">
        <div class="hb-lock-ic">🚀</div>
        <h3>${m.label} está chegando</h3>
        <p>Este recurso será liberado para todos os clientes assim que a LORDS atingir <strong>5 clientes ativos</strong>. Fique de olho — é uma das partes mais especiais do Hub.</p>
      </div>`;
    return;
  }
  $("#hb-subtitle").textContent = "Disponível em um plano superior.";
  $("#hb-view").innerHTML = `
    <div class="hb-lockview">
      <div class="hb-lock-ic">—</div>
      <h3>${state.plan === "capture" ? "Seu LORDS Hub é liberado na renovação" : `${m.label} faz parte de um plano superior`}</h3>
      <p>${state.plan === "capture"
      ? `No plano <strong>Capture</strong> o LORDS Hub é liberado quando você renova por mais 3 meses. No <strong>Creator</strong> ele vem completo desde o 1º mês, com a captação de clientes.`
      : `No seu plano <strong>${planShort(state.plan)}</strong> este módulo não está incluído.`}</p>
      <a href="fabrica-criativa.html#planos">Ver os planos →</a>
    </div>`;
}

/* ---------------- Dashboard ---------------- */
function renderFeedWidget() {
  const events = [
    ...state.ledger.slice(0, 3).map(l => ({ ic: "+", txt: `+${fmt(l.delta)} coins — ${l.acao}`, ts: l.ts })),
    ...state.missions.filter(m => m.status === "concluida").map(m => ({ ic: "✓", txt: `Missão concluída: ${m.titulo}`, ts: "agosto" })),
    ...state.contents.filter(c => c.status === "ok" && c.by).map(c => ({ ic: "✓", txt: `Conteúdo aprovado: ${c.tema}`, ts: c.at })),
  ].slice(0, 5);
  const rows = events.length
    ? events.map(e => `<div class="hb-feed-item"><span class="hb-feed-ic">${e.ic}</span><div class="hb-feed-body"><span>${e.txt}</span><small>${e.ts}</small></div></div>`).join("")
    : `<p class="hb-muted">Nenhuma atividade ainda.</p>`;
  return card("Feed de Atividade", `<div class="hb-activity">${rows}</div>`);
}

function renderDashboard() {
  const videoBlock = HUB_VIDEO_URL ? `
    <div class="hb-welcome-video">
      <div class="hb-welcome-video-hdr">
        <span class="hb-welcome-icon">▶</span>
        <div>
          <div class="hb-welcome-title">Bem-vindo ao LORDS Hub</div>
          <div class="hb-welcome-sub">Assista ao vídeo e entenda tudo em 2 minutos</div>
        </div>
      </div>
      <div class="hb-video-wrap">
        <iframe src="${HUB_VIDEO_URL}" frameborder="0" allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      </div>
    </div>` : '';

  const score = calcBrandScore();
  const pend  = state.contents.filter((c) => c.status === "aprovar").length;
  const nb    = nextReward();
  const nbPct = nb ? Math.min(100, Math.round(state.coins / nb.custo * 100)) : 100;
  const ult   = state.contents.find((c) => c.status === "ok");
  const missOK = state.missions.filter(m => m.status === "concluida").length;
  const contOK = state.contents.filter(c => c.status === "ok").length;

  const scoreCard = `
    <section class="hb-card hb-score-card">
      <div class="hb-score-gauge">${scoreGaugeSVG(score)}</div>
      <div class="hb-score-info">
        <div class="hb-score-label">Score de Marca <span class="hb-tag wait">live</span></div>
        <p class="hb-score-sub">Sua consistência com a LORDS, medida em tempo real.</p>
        <div class="hb-score-kpis">
          <div class="hb-skpi"><b>${fmt(state.coins)}</b><span>Coins</span></div>
          <div class="hb-skpi"><b>${missOK}/${state.missions.length}</b><span>Missões</span></div>
          <div class="hb-skpi"><b>${contOK}/${state.contents.length}</b><span>Aprovados</span></div>
        </div>
      </div>
      <button class="hb-chip hb-apresentar-btn ghost" data-act="apresentacao">Modo Apresentação</button>
    </section>`;

  const feed   = renderFeedWidget();
  const dlv    = DEMO_DELIVERIES[state.plan] || DEMO_DELIVERIES.creator;
  const dlvPct = Math.round(dlv.postados / dlv.total * 100);
  const mes    = card("Entregas do mês", `
    <div class="hb-dlv-grid">
      <div class="hb-dlv-item"><span class="hb-dlv-n">${dlv.videos}</span><span class="hb-dlv-l">Vídeos</span></div>
      <div class="hb-dlv-item"><span class="hb-dlv-n">${dlv.encontros}</span><span class="hb-dlv-l">Encontros</span></div>
      <div class="hb-dlv-item"><span class="hb-dlv-n">${dlv.fotos}</span><span class="hb-dlv-l">Fotos</span></div>
      <div class="hb-dlv-item"><span class="hb-dlv-n">${dlv.artes}</span><span class="hb-dlv-l">Artes</span></div>
    </div>
    <div class="hb-progress-lbl"><span>${dlv.postados} de ${dlv.total} conteúdos postados</span><span>${dlvPct}%</span></div>
    <div class="hb-progress"><span style="width:${dlvPct}%"></span></div>
    <p class="hb-section-note">Plano <strong>${planShort(state.plan)}</strong> · ciclo de agosto.</p>`);
  const aprov  = card("Aguardando aprovação",
    state.contents.filter((c) => c.status === "aprovar").map(postRow).join("") || `<p class="hb-muted">Tudo aprovado.</p>`,
    pend ? `<span class="hb-badge-num">${pend}</span>` : "");
  const benef  = card("Próxima recompensa", nb ? `
    <div class="hb-reward">
      <strong>${nb.nome}</strong>
      <span class="hb-muted">${nb.desc}</span>
      <div class="hb-progress-lbl"><span>${fmt(state.coins)} / ${fmt(nb.custo)} coins</span><span>${nbPct}%</span></div>
      <div class="hb-progress"><span style="width:${nbPct}%"></span></div>
    </div>` : `<p class="hb-muted">Você já pode resgatar tudo.</p>`, `<span class="hb-tag">${fmt(state.coins)} coins</span>`);
  const hasCommunity = moduleState("comunidade") === "enabled";
  const com = card("Na comunidade agora", state.community.slice(0, 2).map((p) => `
    <div class="hb-row"><span class="hb-avatar" style="width:34px;height:34px">${p.autor[0]}</span><div class="hb-row-main"><strong>${p.autor} · ${p.empresa}</strong><small>${p.txt.slice(0, 60)}…</small></div></div>`).join(""),
    `<button class="hb-chip ghost" data-act="go" data-mod="comunidade">Abrir</button>`);
  const notifUnread = state.notifications.filter(n => !n.lida).length;
  const notif = card("Notificações", state.notifications.slice(0, 3).map((n) => `
    <div class="hb-row"><span class="hb-row-ic">${n.ic}</span><div class="hb-row-main"><strong style="font-weight:600">${esc(n.txt)}</strong><small>${n.quando}</small></div>${n.lida ? "" : '<span class="hb-tag wait">novo</span>'}</div>`).join(""),
    notifUnread ? `<span class="hb-badge-num">${notifUnread}</span>` : "");

  const bannerSlider = HUB_BANNERS.length ? `
    <div class="hb-banner-slider" id="hb-banner-slider">
      <div class="hb-banner-track" id="hb-banner-track">
        ${HUB_BANNERS.map((b, i) => `
          <div class="hb-banner-slide${i === 0 ? " active" : ""}" data-slide="${i}" style="${b.src ? `background-image:url('${b.src}')` : `background:${b.bg}`}">
            ${b.src ? `<img src="${b.src}" alt="${b.label}" loading="lazy" />` : `<div class="hb-banner-placeholder"><span>LORDS</span><small>${b.label}</small></div>`}
          </div>`).join("")}
      </div>
      <button class="hb-banner-arrow hb-banner-prev" data-dir="-1" aria-label="Anterior">&#8249;</button>
      <button class="hb-banner-arrow hb-banner-next" data-dir="1" aria-label="Próximo">&#8250;</button>
      <div class="hb-banner-dots">
        ${HUB_BANNERS.map((_, i) => `<button class="hb-banner-dot${i === 0 ? " active" : ""}" data-go="${i}" aria-label="Banner ${i + 1}"></button>`).join("")}
      </div>
    </div>` : '';

  return videoBlock + bannerSlider + scoreCard +
    `<div class="hb-grid cols-2">${mes}${aprov}</div>` +
    `<div class="hb-grid cols-2">${benef}${hasCommunity ? com : notif}</div>` +
    feed;
}

function actionsMenu(c) {
  return `
    <div class="hb-actions-wrap">
      <button class="hb-actions-btn" data-act="menu-toggle" data-id="${c.id}" title="Ações">···</button>
      <div class="hb-actions-menu" id="hb-menu-${c.id}" hidden>
        ${c.status !== "ok" ? `<button data-act="approve" data-id="${c.id}">✓ Aprovar</button>` : ""}
        <button data-act="edit-open" data-id="${c.id}">✏️ Editar</button>
        <button data-act="archive" data-id="${c.id}">📦 Arquivar</button>
        <button class="danger" data-act="delete-confirm" data-id="${c.id}">🗑 Excluir</button>
      </div>
    </div>`;
}

const postRow = (c) => c.editPending ? `
  <div class="hb-post hb-post-editing" data-id="${c.id}">
    <div class="hb-post-thumb">${c.tipo}</div>
    <div class="hb-post-info" style="flex:1">
      <input class="hb-edit-input" id="edit-tema-${c.id}" value="${esc(c.tema)}" placeholder="Tema" />
      <input class="hb-edit-input" id="edit-legenda-${c.id}" value="${esc(c.legenda)}" placeholder="Legenda" />
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="hb-chip go" data-act="edit-save" data-id="${c.id}">Salvar</button>
        <button class="hb-chip ghost" data-act="edit-cancel" data-id="${c.id}">Cancelar</button>
      </div>
    </div>
  </div>` : `
  <div class="hb-post" data-id="${c.id}">
    <div class="hb-post-thumb">${c.tipo}</div>
    <div class="hb-post-info">
      <strong>${c.tema}</strong>
      <span class="hb-post-legenda">${c.legenda}</span>
      <small>${c.data}</small>
      ${c.status === "ok" && c.by ? `<div class="hb-approved">✓ Aprovado por ${c.by} · ${c.at}</div>` : ""}
      ${c.status === "mudar" ? `<div class="hb-change-pending">⏳ Aguardando equipe: "${esc(c.changeRequest || "")}"</div>` : ""}
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
      ${statusChip(c)}
      ${actionsMenu(c)}
    </div>
  </div>`;

function statusChip(c) {
  if (c.status === "ok")    return `<span class="hb-chip okd" style="font-size:11px;padding:4px 9px">Aprovado ✓</span>`;
  if (c.status === "mudar") return `<span class="hb-tag warn">Alteração</span>`;
  return `<span class="hb-tag wait">Aprovar</span>`;
}

function chip(c) {
  if (c.status === "ok")    return `<button class="hb-chip okd" disabled>Aprovado ✓</button>`;
  if (c.status === "mudar") return `
    <div class="hb-change-pending">⏳ Aguardando equipe: "${esc(c.changeRequest || "")}"</div>`;
  if (c.changePending) return `
    <div class="hb-change-form">
      <textarea class="hb-change-textarea" id="cr-${c.id}" placeholder="Descreva o que precisa mudar…"></textarea>
      <div class="hb-change-actions">
        <button class="hb-chip go" data-act="change-send" data-id="${c.id}">Enviar pedido</button>
        <button class="hb-chip ghost" data-act="change-cancel" data-id="${c.id}">Cancelar</button>
      </div>
    </div>`;
  return `
    <button class="hb-chip go" data-act="approve" data-id="${c.id}">Aprovar</button>
    <button class="hb-chip ghost" style="margin-top:6px" data-act="change-open" data-id="${c.id}">Pedir alteração</button>`;
}

function kanbanCard(c) {
  return c.editPending ? `
    <div class="hb-kanban-card" data-id="${c.id}">
      <div class="hb-kc-thumb">${c.tipo}</div>
      <input class="hb-edit-input" id="edit-tema-${c.id}" value="${esc(c.tema)}" placeholder="Tema" />
      <input class="hb-edit-input" id="edit-legenda-${c.id}" value="${esc(c.legenda)}" placeholder="Legenda" />
      <div style="display:flex;gap:6px;margin-top:8px">
        <button class="hb-chip go" data-act="edit-save" data-id="${c.id}" style="font-size:11px;padding:5px 10px">Salvar</button>
        <button class="hb-chip ghost" data-act="edit-cancel" data-id="${c.id}" style="font-size:11px;padding:5px 10px">Cancelar</button>
      </div>
    </div>` : `
    <div class="hb-kanban-card" data-id="${c.id}">
      <div class="hb-kc-header">
        <div class="hb-kc-thumb">${c.tipo}</div>
        ${actionsMenu(c)}
      </div>
      <strong class="hb-kc-tema">${c.tema}</strong>
      <span class="hb-kc-legenda">${c.legenda}</span>
      <small class="hb-kc-date">${c.data}</small>
      ${c.status === "ok" && c.by ? `<div class="hb-approved" style="font-size:10px;margin-top:4px">✓ ${c.by} · ${c.at}</div>` : ""}
      ${c.status === "mudar" ? `<div class="hb-change-pending" style="font-size:11px;margin-top:4px">⏳ "${esc(c.changeRequest || "")}"</div>` : ""}
    </div>`;
}

function renderKanban() {
  const cols = [
    { id: "aprovar", label: "A Aprovar",  cls: "wait" },
    { id: "ok",      label: "Aprovado",   cls: "ok"   },
    { id: "mudar",   label: "Alteração",  cls: "warn" },
  ];
  return `<div class="hb-kanban">${cols.map(col => {
    const items = state.contents.filter(c => c.status === col.id);
    return `<div class="hb-kanban-col">
      <div class="hb-kanban-col-header">
        <span class="hb-tag ${col.cls}">${col.label}</span>
        <span class="hb-kanban-count">${items.length}</span>
      </div>
      <div class="hb-kanban-cards">${items.map(kanbanCard).join("") || '<p class="hb-muted" style="font-size:12px;padding:8px 0">Nenhum item.</p>'}</div>
    </div>`;
  }).join("")}</div>`;
}

/* ---------------- Missões ---------------- */
let missTab = "todos";
const PERIODOS = [["todos", "Todos"], ["diaria", "Diária"], ["semanal", "Semanal"], ["quinzenal", "Quinzenal"], ["mensal", "Mensal"]];

function missionCard(m) {
  const pct = Math.min(100, Math.round((m.feito / m.meta) * 100));
  let btn;
  if (m.status === "concluida") btn = `<button class="hb-chip okd" disabled>Concluído ✓</button>`;
  else if (m.status === "participando") btn = `<button class="hb-chip go" data-act="mission" data-id="${m.id}">Concluir</button>`;
  else btn = `<button class="hb-chip go" data-act="mission" data-id="${m.id}">Participar</button>`;
  return `<div class="hb-mission">
    <div class="hb-mission-top"><strong>${m.titulo}</strong><span class="hb-coin-tag">+${fmt(m.coins)} coins</span></div>
    <div class="hb-progress-lbl"><span>${m.feito}/${m.meta}</span><span>${pct}%</span></div>
    <div class="hb-progress"><span style="width:${pct}%"></span></div>
    ${btn}
  </div>`;
}

function renderMissoes() {
  const tabs = PERIODOS.map(([id, l]) => `<button class="hb-mtab${missTab === id ? " on" : ""}" data-act="mtab" data-tab="${id}">${l}</button>`).join("");
  const byTab = (m) => missTab === "todos" || m.periodo === missTab;
  const list = state.missions.filter(byTab);
  const abertas  = list.filter((m) => m.status === "aberta");
  const part     = list.filter((m) => m.status === "participando");
  const done     = list.filter((m) => m.status === "concluida");
  const grid = (arr) => arr.length ? `<div class="hb-grid cols-3">${arr.map(missionCard).join("")}</div>` : `<p class="hb-muted">Nada por aqui.</p>`;

  const roleta = `<section class="hb-card hb-roleta">
    <div class="hb-roleta-wheel">×</div>
    <div class="hb-roleta-txt"><h3>Roleta do Hub <span class="hb-tag">prévia</span></h3>
      <p class="hb-muted">Gire e ganhe coins ou um <strong>brinde simples</strong>. Sem dinheiro/Pix — só brindes e recompensas da operação.</p>
      <button class="hb-chip go" data-act="spin">Girar (250 coins)</button></div>
  </section>`;

  const badges = calcBadges();
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);
  const coinsSection = `
    <div class="hb-grid cols-2">
      ${card("Coins", `
        <div class="hb-coins-hero compact"><div><b>${fmt(state.coins)}</b><span>disponíveis</span></div></div>
        <div class="hb-list">
          ${state.ledger.slice(0, 4).map(l => `<div class="hb-row"><span class="hb-row-ic">${l.delta < 0 ? "−" : "+"}</span><div class="hb-row-main"><strong style="font-weight:600;font-size:12px">${l.acao}</strong><small>${l.ts}</small></div><span class="hb-tag ${l.delta < 0 ? "warn" : "ok"}" style="white-space:nowrap">${l.delta < 0 ? "" : "+"}${fmt(l.delta)}</span></div>`).join("")}
        </div>`)}
      ${card(`Conquistas <span class="hb-badge-num">${earnedBadges.length}</span>`, `
        <div class="hb-badges-grid compact">
          ${earnedBadges.map(b => `<div class="hb-badge earned sm" title="${b.desc}"><span class="hb-badge-sigla">${b.sigla}</span><span>${b.nome}</span></div>`).join("") || `<p class="hb-muted" style="font-size:12px">Complete missões para desbloquear.</p>`}
          ${lockedBadges.map(b => `<div class="hb-badge sm" title="${b.desc}" style="opacity:.4"><span class="hb-badge-sigla">${b.sigla}</span><span>${b.nome}</span></div>`).join("")}
        </div>`)}
    </div>`;

  return roleta +
    card("Missões", `<div class="hb-mtabs">${tabs}</div>${grid(abertas)}`,
      `<span class="hb-tag wait">${fmt(state.points)} pts</span>`) +
    (part.length ? card("Participando", grid(part)) : "") +
    (done.length ? card("Concluídos", grid(done)) : "") +
    coinsSection;
}


/* ---------------- Conteúdos + Entregas (unificado) ---------------- */
function renderConteudos() {
  const tabs = [["aprovar","Aprovar"], ["entregas","Entregas do mês"]].map(
    ([id, l]) => `<button class="hb-mtab${state.conteudosTab === id ? " on" : ""}" data-act="conteudos-tab" data-tab="${id}">${l}</button>`
  ).join("");
  const pend = state.contents.filter(c => c.status === "aprovar").length;

  const viewToggle = `<div class="hb-view-toggle">
    <button class="hb-mtab sm${state.conteudosView === "lista" ? " on" : ""}" data-act="view-lista">☰ Lista</button>
    <button class="hb-mtab sm${state.conteudosView === "quadro" ? " on" : ""}" data-act="view-quadro">⊞ Quadro</button>
  </div>`;

  let body;
  if (state.conteudosTab === "aprovar") {
    const activeContents = state.contents.filter(c => c.status !== "arquivado");
    const listView = `<div class="hb-list">${activeContents.map(postRow).join("")}</div>`;
    const boardView = renderKanban();
    body = viewToggle +
      (state.conteudosView === "quadro" ? boardView : listView) +
      `<div class="hb-feed-preview-bar">
        <button class="hb-feed-preview-btn" data-act="feed-preview">
          <span class="hb-feed-preview-icon">⊞</span> Visualizar feed
        </button>
        <span class="hb-muted" style="font-size:12px">Veja como seu feed vai ficar</span>
      </div>
      <p class="hb-section-note">Registramos <strong>quem</strong> aprovou, a <strong>data</strong> e o <strong>horário</strong>. Aprovar no prazo rende coins.</p>`;
  } else {
    const filtered = VAULT_ITEMS.filter(v =>
      (state.vaultType  === "todos" || v.tipo === state.vaultType) &&
      (state.vaultMonth === "todos" || v.mes  === state.vaultMonth)
    );
    const typeF  = VAULT_TYPES.map(t => `<button class="hb-mtab${state.vaultType === t ? " on" : ""} sm" data-act="vault_type" data-val="${t}">${t === "todos" ? "Todos" : t}</button>`).join("");
    const monthF = VAULT_MONTHS.map(m => `<button class="hb-mtab${state.vaultMonth === m ? " on" : ""} sm" data-act="vault_month" data-val="${m}">${m === "todos" ? "Todos" : m}</button>`).join("");
    const stColor = { Entregue: "wait", Aprovado: "ok", Publicado: "ok" };
    const items = filtered.length
      ? `<div class="hb-grid cols-3">${filtered.map(v => `
          <div class="hb-card hb-vault-card">
            <div class="hb-vault-thumb">${v.tipo}</div>
            <div class="hb-vault-info">
              <strong>${v.tema}</strong>
              <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
                <span class="hb-tag ${stColor[v.status] || ""}">${v.status}</span>
                <small class="hb-muted">${v.mes} · ${v.data}</small>
              </div>
            </div>
          </div>`).join("")}</div>`
      : `<p class="hb-muted">Nenhum conteúdo com esse filtro.</p>`;
    body = `<div class="hb-mtabs sm">${typeF}</div><div class="hb-mtabs sm" style="margin-top:6px">${monthF}</div>${items}
      <p class="hb-section-note">${filtered.length} de ${VAULT_ITEMS.length} peças produzidas · Em breve: download direto.</p>`;
  }

  return card("Conteúdos",
    `<div class="hb-mtabs">${tabs}</div>${body}`,
    pend && state.conteudosTab === "aprovar" ? `<span class="hb-badge-num">${pend}</span>` : "");
}

/* ---------------- Vault de Entregas (novo) ---------------- */
function renderVault() {
  const filtered = VAULT_ITEMS.filter(v =>
    (state.vaultType  === "todos" || v.tipo === state.vaultType) &&
    (state.vaultMonth === "todos" || v.mes  === state.vaultMonth)
  );
  const typeFilters  = VAULT_TYPES.map(t => `<button class="hb-mtab${state.vaultType === t ? " on" : ""}" data-act="vault_type" data-val="${t}">${t === "todos" ? "Todos os tipos" : t}</button>`).join("");
  const monthFilters = VAULT_MONTHS.map(m => `<button class="hb-mtab${state.vaultMonth === m ? " on" : ""}" data-act="vault_month" data-val="${m}">${m === "todos" ? "Todos os meses" : m}</button>`).join("");
  const stColor = { Entregue: "wait", Aprovado: "ok", Publicado: "ok" };
  const items = filtered.length
    ? `<div class="hb-grid cols-3">${filtered.map(v => `
      <div class="hb-card hb-vault-card">
        <div class="hb-vault-thumb">${v.tipo}</div>
        <div class="hb-vault-info">
          <strong>${v.tema}</strong>
          <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
            <span class="hb-tag ${stColor[v.status] || ""}">${v.status}</span>
            <small class="hb-muted">${v.mes} · ${v.data}</small>
          </div>
        </div>
      </div>`).join("")}</div>`
    : `<p class="hb-muted">Nenhum conteúdo encontrado com esse filtro.</p>`;
  return `<div class="hb-mtabs">${typeFilters}</div>
    <div class="hb-mtabs">${monthFilters}</div>
    ${items}
    <p class="hb-section-note">${filtered.length} de ${VAULT_ITEMS.length} peças produzidas · Em breve: download direto.</p>`;
}

/* ---------------- Projeto ---------------- */
function renderProjeto() {
  const pj = state.project;
  const st = (s) => s === "ok" ? '<span class="hb-tag ok">concluído</span>' : s === "andamento" ? '<span class="hb-tag wait">em andamento</span>' : '<span class="hb-tag">na fila</span>';
  return `
  <div class="hb-grid cols-2">
    ${card("Escopo & plano", `<p class="hb-muted">${pj.escopo}</p><p style="margin-top:10px"><span class="hb-tag wait">Plano ${planShort(state.plan)}</span></p>`)}
    ${card("Etapas", `<div class="hb-list">${pj.etapas.map((e) => `<div class="hb-row"><div class="hb-row-main"><strong>${e.nome}</strong></div>${st(e.status)}</div>`).join("")}</div>`)}
  </div>
  <div class="hb-grid cols-2">
    ${card("Responsáveis", `<div class="hb-list">${pj.responsaveis.map((r) => `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${r.nome}</strong><small>${r.papel}</small></div></div>`).join("")}</div>`)}
    ${card("Documentos", `<div class="hb-list">${pj.docs.map((d) => `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${d.nome}</strong><small>${d.tag}</small></div><button class="hb-chip ghost" data-act="doc">Abrir</button></div>`).join("")}</div>`)}
  </div>`;
}

/* ---------------- Calendário ---------------- */
function renderCalendario() {
  const dias = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  const header = dias.map(d => `<div class="hb-cal-cell" style="border:0;background:none;aspect-ratio:unset;padding:4px 2px;font-size:10px;font-weight:800;color:var(--hb-muted);text-align:center">${d}</div>`).join("");
  const startOffset = new Date(2026, 7, 1).getDay();
  const blanks = Array(startOffset).fill('<div class="hb-cal-cell" style="border:0;background:none"></div>').join("");
  let cells = "";
  for (let d = 1; d <= 31; d++) {
    const ev = state.calEvents[d];
    const hasMedia = ev && ev.media;
    cells += ev
      ? `<div class="hb-cal-cell has${hasMedia ? " has-media" : ""}" data-act="cal-open" data-day="${d}" title="${ev.label}">
           <span class="hb-cal-d">${d}</span>
           <span class="hb-cal-tag">${ev.tipo}</span>
           ${hasMedia ? '<span class="hb-cal-media-dot"></span>' : ""}
         </div>`
      : `<div class="hb-cal-cell"><span class="hb-cal-d">${d}</span></div>`;
  }
  const html = card("Calendário — Agosto 2026", `<div class="hb-cal" id="hb-cal-grid">${header}${blanks}${cells}</div><p class="hb-section-note">Passe o mouse sobre um evento para prévia · clique para detalhes e para adicionar mídia.</p>`);
  requestAnimationFrame(initCalHover);
  return html;
}

function initCalHover() {
  const grid = document.getElementById("hb-cal-grid"); if (!grid) return;
  let tip = document.getElementById("hb-cal-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "hb-cal-tip";
    tip.className = "hb-cal-tip";
    tip.hidden = true;
    document.body.appendChild(tip);
  }

  grid.addEventListener("mousemove", (e) => {
    const cell = e.target.closest(".hb-cal-cell.has"); if (!cell) { tip.hidden = true; return; }
    const day = Number(cell.dataset.day);
    const ev  = state.calEvents[day]; if (!ev) { tip.hidden = true; return; }

    const media = ev.media
      ? ev.media.startsWith("data:video")
        ? `<video class="hb-cal-tip-media" src="${ev.media}" autoplay muted loop playsinline></video>`
        : `<img class="hb-cal-tip-media" src="${ev.media}" alt="" />`
      : `<div class="hb-cal-tip-placeholder"><span>${ev.tipo}</span></div>`;

    tip.innerHTML = `
      ${media}
      <div class="hb-cal-tip-info">
        <strong>${ev.label}</strong>
        <small>${ev.desc}</small>
        ${ev.media ? "" : '<small class="hb-cal-tip-hint">Clique para adicionar mídia</small>'}
      </div>`;

    const rect = cell.getBoundingClientRect();
    const left = Math.min(rect.right + 8, window.innerWidth - 230);
    const top  = Math.min(rect.top, window.innerHeight - 200);
    tip.style.left = left + "px";
    tip.style.top  = top  + "px";
    tip.hidden = false;
  });

  grid.addEventListener("mouseleave", () => { tip.hidden = true; });
}

const SUPORTE_WA = "mailto:contato@lordsoficial.com";

function suporteBtn(txt = "💬 Falar com o time") {
  return `<a href="${SUPORTE_WA}" target="_blank" rel="noopener" class="hb-chip ghost hb-suporte-btn">${txt}</a>`;
}

function renderCalModal() {
  const day = state.calModal;
  let el = document.getElementById("hb-cal-modal");
  if (!day) { if (el) el.hidden = true; return; }
  const ev = state.calEvents[day];
  if (!ev) return;

  if (!el) {
    el = document.createElement("div");
    el.id = "hb-cal-modal";
    el.className = "hb-cal-modal";
    document.body.appendChild(el);
  }

  const mediaPreview = ev.media
    ? ev.media.startsWith("data:video")
      ? `<video class="hb-cal-modal-media" src="${ev.media}" controls playsinline></video>`
      : `<img class="hb-cal-modal-media" src="${ev.media}" alt="Mídia do evento" />`
    : "";

  el.innerHTML = `
    <div class="hb-cal-modal-box">
      <div class="hb-cal-modal-head">
        <div>
          <span class="hb-tag wait">${ev.tipo}</span>
          <h3 class="hb-cal-modal-title">${ev.label}</h3>
          <small class="hb-muted">Agosto · dia ${day}</small>
        </div>
        <button class="hb-cal-modal-close" data-act="cal-close">✕</button>
      </div>
      <p class="hb-cal-modal-desc">${ev.desc}</p>
      ${mediaPreview ? `<div class="hb-cal-modal-preview">${mediaPreview}</div>` : ""}
      <div class="hb-cal-modal-actions">
        <label class="hb-chip go hb-cal-upload-btn" title="Adicionar foto">
          📷 Foto
          <input type="file" accept="image/*" data-day="${day}" class="hb-cal-file-input" hidden />
        </label>
        <label class="hb-chip ghost hb-cal-upload-btn" title="Adicionar vídeo">
          🎬 Vídeo
          <input type="file" accept="video/*" data-day="${day}" class="hb-cal-file-input" hidden />
        </label>
        ${ev.media ? `<button class="hb-chip ghost" data-act="cal-remove-media" data-day="${day}" style="color:#c0392b">🗑 Remover mídia</button>` : ""}
      </div>
      <div class="hb-cal-modal-support">
        ${suporteBtn("💬 Pedir alteração ou tirar dúvida")}
      </div>
      <p class="hb-section-note" style="margin-top:10px">A mídia fica salva localmente enquanto a sessão estiver aberta.</p>
    </div>`;

  el.hidden = false;

  el.querySelectorAll(".hb-cal-file-input").forEach(input => {
    input.onchange = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (r) => {
        state.calEvents[day].media = r.target.result;
        renderCalModal();
        boot();
      };
      reader.readAsDataURL(file);
    };
  });
}

function renderFeedPreview() {
  let el = document.getElementById("hb-feed-preview");
  if (!el) {
    el = document.createElement("div");
    el.id = "hb-feed-preview";
    el.className = "hb-feed-preview";
    document.body.appendChild(el);
  }

  const active = state.contents.filter(c => c.status !== "arquivado");
  const statusLabel = { aprovar: "Aguardando", ok: "Aprovado", mudar: "Alteração" };
  const statusCls   = { aprovar: "wait", ok: "ok", mudar: "warn" };

  const grid = active.map(c => `
    <div class="hb-fp-cell">
      <div class="hb-fp-thumb">
        <div class="hb-fp-type">${c.tipo}</div>
        <span class="hb-tag ${statusCls[c.status] || ""} hb-fp-badge">${statusLabel[c.status] || c.status}</span>
      </div>
      <div class="hb-fp-info">
        <strong>${c.tema}</strong>
        <small>${c.legenda}</small>
        <small class="hb-muted">${c.data}</small>
      </div>
    </div>`).join("");

  el.innerHTML = `
    <div class="hb-fp-box">
      <div class="hb-fp-head">
        <div>
          <h3 class="hb-fp-title">Preview do Feed</h3>
          <small class="hb-muted">Como seus conteúdos aparecem no Instagram</small>
        </div>
        <button class="hb-cal-modal-close" data-act="feed-close">✕</button>
      </div>
      <div class="hb-fp-profile">
        <div class="hb-fp-avatar">${state.company[0]}</div>
        <div>
          <strong>${state.company}</strong>
          <small class="hb-muted">${active.length} publicações · ${active.filter(c=>c.status==="ok").length} aprovadas</small>
        </div>
        ${suporteBtn("💬 Falar com o time")}
      </div>
      <div class="hb-fp-grid">${grid || '<p class="hb-muted" style="padding:20px 0">Nenhum conteúdo para exibir.</p>'}</div>
      <p class="hb-section-note">Este preview é uma simulação da grade do feed. Os conteúdos reais serão publicados conforme aprovação.</p>
    </div>`;

  el.hidden = false;
}

/* ---------------- Comunidade ---------------- */
function renderComunidade() {
  const feed = state.community.map((p) => `
    <article class="hb-fpost${p.pinned ? " pinned" : ""}" data-id="${p.id}">
      <div class="hb-fhead">
        <span class="hb-avatar">${p.autor[0]}</span>
        <div><b>${p.autor}</b><small>${p.empresa}</small></div>
        ${p.pinned ? '<span class="hb-fpin">Case em destaque</span>' : ""}
      </div>
      <p class="hb-ftext">${p.txt}</p>
      <div class="hb-factions">
        <button class="hb-fbtn${p.liked ? " liked" : ""}" data-act="like" data-id="${p.id}">${p.likes} curtidas</button>
        <button class="hb-fbtn" data-act="comment" data-id="${p.id}">${p.coments} comentários</button>
      </div>
    </article>`).join("");
  return `<p class="hb-privacy">Você vê apenas o que foi <strong>publicado na comunidade</strong>. Projetos, arquivos, cronogramas e dados de cada cliente são privados e nunca aparecem aqui.</p>
    <div class="hb-feed">${feed}</div>
    <p class="hb-section-note">Curtir e comentar rende coins — dentro de um limite diário, pra manter a comunidade saudável.</p>`;
}

/* ---------------- Conquistas / Badges (novo) ---------------- */
function calcBadges() {
  return BADGES_DEF.map(b => ({ ...b, earned: b.condition() }));
}

function renderConquistas() {
  const prev    = state._prevBadges || [];
  const badges  = calcBadges();
  const earned  = badges.filter(b => b.earned);
  const locked  = badges.filter(b => !b.earned);
  earned.filter(b => !prev.includes(b.id)).forEach(b => toast("Novo badge desbloqueado: " + b.nome));
  state._prevBadges = earned.map(b => b.id);
  return `
    <div class="hb-grid cols-2">
      ${card(`Desbloqueadas <span class="hb-badge-num">${earned.length}</span>`, `
        <div class="hb-badges-grid">
          ${earned.map(b => `<div class="hb-badge earned" title="${b.desc}"><span class="hb-badge-sigla">${b.sigla}</span><span>${b.nome}</span></div>`).join("")
          || `<p class="hb-muted">Complete missões e ações para desbloquear conquistas.</p>`}
        </div>`)}
      ${card("A desbloquear", `
        <div class="hb-badges-grid">
          ${locked.map(b => `<div class="hb-badge" title="${b.desc}"><span class="hb-badge-sigla locked-sigla">${b.sigla}</span><span>${b.nome}</span></div>`).join("")}
        </div>`)}
    </div>
    <p class="hb-section-note">Conquistas são desbloqueadas automaticamente conforme você usa o Hub e participa da operação.</p>`;
}

/* ---------------- Ranking ---------------- */
function renderRanking() {
  RANKING_DATA.forEach(r => { if (r.isUser) { r.nome = state.company; r.coins = state.coins; } });
  const sorted = [...RANKING_DATA].sort((a, b) => b.coins - a.coins);
  sorted.forEach((r, i) => { r.pos = i + 1; r.badge = i === 0 ? "1°" : i === 1 ? "2°" : i === 2 ? "3°" : null; });
  const userRow = sorted.find(r => r.isUser);
  const rows = sorted.map(r => `
    <div class="hb-ranking-row${r.isUser ? " you" : ""}">
      <span class="hb-rank-pos">${r.badge || r.pos + "º"}</span>
      <span class="hb-rank-name">${r.nome}</span>
      <span class="hb-rank-coins">${fmt(r.coins)} coins</span>
    </div>`).join("");
  return `
    <div class="hb-coins-hero">
      <div><b>${userRow ? userRow.pos + "º lugar" : "—"}</b><span>Sua posição no Clube de Clientes LORDS · agosto</span></div>
    </div>
    ${card("Ranking do mês", `<div class="hb-ranking">${rows}</div>
      <p class="hb-section-note">Nomes de outros clientes são mantidos em anonimato. Coins acumulados ao longo do mês.</p>`)}
    <p class="hb-section-note">Suba no ranking completando missões, aprovando conteúdos no prazo e engajando no Hub.</p>`;
}

/* ---------------- Coins ---------------- */
function renderCoins() {
  const hero = `<div class="hb-coins-hero"><div><b>${fmt(state.coins)}</b><span>coins disponíveis — pontos internos, sem valor em dinheiro</span></div></div>`;
  const rules = card("Como ganhar coins", `<table class="hb-table"><thead><tr><th>Ação</th><th>Limite</th><th class="num">Coins</th></tr></thead><tbody>
    ${COINS_RULES.filter((r) => r.ativo).map((r) => `<tr><td>${r.acao}${r.exigeAprovacao ? ' <span class="hb-tag">requer aprovação</span>' : ""}</td><td class="hb-muted">${r.limiteDia ? r.limiteDia + "/dia" : (r.limiteMes ? r.limiteMes + "/mês" : "—")}</td><td class="num">+${fmt(r.coins)}</td></tr>`).join("")}
  </tbody></table><p class="hb-section-note">Coins não são dinheiro: sem compra, sem saque e sem transferência entre clientes. Regras podem exigir aprovação da LORDS.</p>`);
  const hist = card("Seu histórico", `<div class="hb-list">${state.ledger.slice(0, 8).map((l) => `<div class="hb-row"><span class="hb-row-ic">${l.delta < 0 ? "−" : "+"}</span><div class="hb-row-main"><strong style="font-weight:600">${l.acao}</strong><small>${l.ts}</small></div><span class="hb-tag ${l.delta < 0 ? "warn" : "ok"}">${l.delta < 0 ? "" : "+"}${fmt(l.delta)}</span></div>`).join("")}</div>`);
  return hero + `<div class="hb-grid cols-2">${rules}${hist}</div>`;
}

/* ---------------- Recompensas — Roleta ---------------- */
// Prêmios da roleta — sincronizado com REWARDS ativos
const ROLETA_PRIZES_NAMES = [
  "1 vídeo adicional no mês",
  "1 carrossel adicional no mês",
  "Revisão adicional",
  "Consultoria de 30 min",
  "Acesso a encontro exclusivo",
];
function renderRecompensas() {
  const SPIN_COST = 1500;
  const can = state.coins >= SPIN_COST;
  const lastPrize = state.lastRoletaPrize || null;
  const isCompleto = state.plan === "completo";

  // Tema prata (Creator) ou dourado (Completo)
  const RIM        = isCompleto ? "#e4c06e" : "#b0b8cc";
  const RIM2       = isCompleto ? "#f5c842" : "#d0d8e8";
  const CENTER_BG  = isCompleto ? "#1a0900" : "#0a1522";
  const BTN_TXT    = isCompleto ? "#3a1a00" : "#0a1522";
  const GLOW       = isCompleto ? "rgba(228,192,110,.6)" : "rgba(150,165,190,.45)";

  // Prêmios ativos + slot "Tente novamente"
  const activePrizes = REWARDS.filter(r => r.status === "ativo");
  const allSlots = [
    ...activePrizes,
    { id: "retry", nome: "Tente novamente", custo: 0, _retry: true }
  ];
  const n = allSlots.length;

  // Paleta de cores das fatias — branco e azul marinho alternando, bordas douradas
  const SLICE_COLORS = ["#ffffff","#0d1b2e","#ffffff","#0d1b2e","#ffffff","#0d1b2e"];

  // Ícones por tipo de prêmio
  const ICONS = {
    "video-extra":    "🎬",
    "carrossel-extra":"📱",
    "revisao-extra":  "✏️",
    "consultoria":    "💡",
    "encontro":       "⭐",
    "retry":          "↺",
  };

  const cx = 150, cy = 150, r = 128, ir = 40;
  const rimR = r + 12, dotR = rimR + 8, nDots = 24;
  const anglePerSlice = (2 * Math.PI) / n;

  let slices = "", sliceLabels = "", dots = "";

  for (let i = 0; i < n; i++) {
    const a1 = i * anglePerSlice - Math.PI / 2;
    const a2 = a1 + anglePerSlice;
    const am = a1 + anglePerSlice / 2;
    const col = SLICE_COLORS[i % SLICE_COLORS.length];

    // fatia
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const ix1 = cx + ir * Math.cos(a1), iy1 = cy + ir * Math.sin(a1);
    const ix2 = cx + ir * Math.cos(a2), iy2 = cy + ir * Math.sin(a2);
    slices += `<path d="M${ix1.toFixed(1)},${iy1.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0,1 ${x2.toFixed(1)},${y2.toFixed(1)} L${ix2.toFixed(1)},${iy2.toFixed(1)} A${ir},${ir} 0 0,0 ${ix1.toFixed(1)},${iy1.toFixed(1)} Z" fill="${col}" stroke="#e4c06e" stroke-width="2.5"/>`;

    // Rótulo (ícone + texto completo em 2 linhas)
    const lx = cx + (ir + (r - ir) * 0.65) * Math.cos(am);
    const ly = cy + (ir + (r - ir) * 0.65) * Math.sin(am);
    const rot = (am * 180 / Math.PI) + 90;
    const ic = ICONS[allSlots[i].id] || "•";
    const nm = allSlots[i].nome.replace("adicional no mês","").replace("adicional","").replace("Acesso a","").trim();
    const words = nm.split(" ");
    const half = Math.ceil(words.length / 2);
    const line1 = words.slice(0, half).join(" ");
    const line2 = words.slice(half).join(" ");
    const txtFill = col === '#ffffff' ? '#0d1b2e' : '#fff';
    sliceLabels += `<g transform="translate(${lx.toFixed(1)},${ly.toFixed(1)}) rotate(${rot.toFixed(1)})" style="pointer-events:none">
      <text text-anchor="middle" y="-14" font-size="14" font-family="Segoe UI Emoji,Apple Color Emoji,sans-serif">${ic}</text>
      <text text-anchor="middle" font-size="7" font-weight="700" fill="${txtFill}" font-family="Montserrat,sans-serif" letter-spacing=".02em"><tspan x="0" dy="0">${line1}</tspan>${line2 ? `<tspan x="0" dy="9">${line2}</tspan>` : ""}</text>
    </g>`;
  }

  // Pontinhos decorativos no aro
  for (let i = 0; i < nDots; i++) {
    const a = (i / nDots) * 2 * Math.PI - Math.PI / 2;
    const dx = cx + dotR * Math.cos(a), dy = cy + dotR * Math.sin(a);
    const lit = i % 3 === 0;
    dots += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="4.5" fill="${lit ? RIM2 : "rgba(255,255,255,.25)"}"/>`;
  }

  // Separadores de fatia
  let dividers = "";
  for (let i = 0; i < n; i++) {
    const a = i * anglePerSlice - Math.PI / 2;
    dividers += `<line x1="${(cx + ir * Math.cos(a)).toFixed(1)}" y1="${(cy + ir * Math.sin(a)).toFixed(1)}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy + r * Math.sin(a)).toFixed(1)}" stroke="#e4c06e" stroke-width="1.5"/>`;
  }

  const wheelSVG = `
    <svg id="hb-roleta-svg" viewBox="0 0 300 300" width="300" height="300" style="display:block;overflow:visible;filter:drop-shadow(0 12px 36px ${GLOW})">
      <defs>
        <radialGradient id="rg-center-${isCompleto?'g':'s'}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${isCompleto?'#3a1800':'#192640'}"/>
          <stop offset="100%" stop-color="${CENTER_BG}"/>
        </radialGradient>
      </defs>
      <!-- Halo externo -->
      <circle cx="${cx}" cy="${cy}" r="${dotR + 6}" fill="none" stroke="${RIM}" stroke-width="1" opacity=".3"/>
      <!-- Aro metálico -->
      <circle cx="${cx}" cy="${cy}" r="${rimR}" fill="none" stroke="${RIM}" stroke-width="6" opacity=".9"/>
      <!-- Fatias + rótulos (disco girante) -->
      <g id="hb-roleta-disk">
        ${slices}
        ${dividers}
        ${sliceLabels}
      </g>
      <!-- Pontinhos do aro (estáticos) -->
      ${dots}
      <!-- Círculo central (estático, sobre o disco) -->
      <circle cx="${cx}" cy="${cy}" r="${ir}" fill="url(#rg-center-${isCompleto?'g':'s'})" stroke="${RIM}" stroke-width="3"/>
      <!-- Ponteiro -->
      <polygon points="${cx},${cy - rimR - 8} ${cx - 9},${cy - rimR + 10} ${cx + 9},${cy - rimR + 10}" fill="${RIM}" stroke="${CENTER_BG}" stroke-width="1.5"/>
    </svg>`;

  // Mascote SVG (personagem LORDS estilizado com efeito 3D)
  const mascot = `
    <svg class="hb-roleta-mascot-svg" viewBox="0 0 90 120" width="90" height="120" aria-hidden="true">
      <!-- Sombra -->
      <ellipse cx="45" cy="115" rx="22" ry="5" fill="rgba(0,0,0,.25)"/>
      <!-- Corpo -->
      <rect x="15" y="55" width="60" height="52" rx="14" fill="${isCompleto?'#7b5ea7':'#4f6ea7'}"/>
      <rect x="15" y="55" width="60" height="20" rx="14" fill="${isCompleto?'#9b7ec7':'#6f8ec7'}" opacity=".5"/>
      <!-- "L" no peito -->
      <text x="45" y="90" text-anchor="middle" dominant-baseline="middle" font-size="28" font-weight="900" fill="#fff" font-family="Montserrat,sans-serif" opacity=".95">L</text>
      <!-- Pescoço -->
      <rect x="38" y="48" width="14" height="12" rx="4" fill="${isCompleto?'#e8c880':'#d0d8ec'}"/>
      <!-- Cabeça -->
      <ellipse cx="45" cy="36" rx="22" ry="22" fill="${isCompleto?'#f0d898':'#dce6f8'}"/>
      <!-- Olhos -->
      <ellipse cx="37" cy="33" rx="4" ry="4.5" fill="#0d1b2e"/>
      <ellipse cx="53" cy="33" rx="4" ry="4.5" fill="#0d1b2e"/>
      <circle cx="38.5" cy="31.5" r="1.5" fill="#fff"/>
      <circle cx="54.5" cy="31.5" r="1.5" fill="#fff"/>
      <!-- Sorriso -->
      <path d="M37 42 Q45 49 53 42" fill="none" stroke="#0d1b2e" stroke-width="2" stroke-linecap="round"/>
      <!-- Coroa -->
      <path d="M23 20 L28 30 L35 22 L45 28 L55 22 L62 30 L67 20 L67 18 L23 18 Z" fill="${RIM}" opacity=".95"/>
      <circle cx="35" cy="18" r="3" fill="${RIM2}"/>
      <circle cx="45" cy="15" r="3.5" fill="${RIM2}"/>
      <circle cx="55" cy="18" r="3" fill="${RIM2}"/>
      <!-- Braços -->
      <rect x="0" y="60" width="17" height="10" rx="5" fill="${isCompleto?'#7b5ea7':'#4f6ea7'}" transform="rotate(-20,8,65)"/>
      <rect x="73" y="60" width="17" height="10" rx="5" fill="${isCompleto?'#7b5ea7':'#4f6ea7'}" transform="rotate(20,82,65)"/>
    </svg>`;

  const prizeList = activePrizes.map((p) => `
    <div class="hb-prize-item">
      <span style="font-size:18px;line-height:1">${ICONS[p.id] || "•"}</span>
      <div class="hb-prize-info">
        <strong>${p.nome}</strong>
      </div>
    </div>`).join("");

  const spinLabel = can
    ? `GIRAR<br><small style="font-size:9px;opacity:.75;font-weight:600">${fmt(SPIN_COST)} coins</small>`
    : `<small style="font-size:8px;line-height:1.3;display:block">Faltam<br>${fmt(SPIN_COST - state.coins)} coins</small>`;

  return `
    <div class="hb-roleta-page">
      <div class="hb-roleta-top">
        <div class="hb-roleta-mascot">${mascot}</div>
        <div class="hb-roleta-header">
          <div class="hb-coins-pill">🪙 ${fmt(state.coins)} coins</div>
          <h2 class="hb-roleta-title">Roleta de Recompensas</h2>
          <p class="hb-roleta-sub">Acumule coins e gire para ganhar benefícios reais da LORDS.</p>
          <span class="hb-roleta-plan-badge" style="background:${isCompleto?'rgba(228,192,110,.15)':'rgba(176,184,204,.15)'};color:${RIM};border:1px solid ${RIM};padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.04em">${isCompleto ? '✦ Roleta Dourada' : '✦ Roleta Prata'}</span>
        </div>
      </div>

      <div class="hb-roleta-stage">
        <div class="hb-roleta-disk-wrap" id="hb-disk-wrap">
          ${wheelSVG}
          <button class="hb-spin-center-btn ${can ? '' : 'disabled'}" data-act="${can ? 'spin-recompensa' : ''}"
            ${can ? '' : 'disabled'}
            style="--rim:${RIM};--rim2:${RIM2};--btn-txt:${BTN_TXT}">
            ${spinLabel}
          </button>
        </div>
        ${lastPrize ? `<div class="hb-roleta-last">🎉 Último prêmio: <strong>${lastPrize}</strong></div>` : ""}
      </div>

      <div class="hb-roleta-prizes">
        <h3 class="hb-prizes-title">O que está na roleta</h3>
        <div class="hb-prize-list">${prizeList}</div>
      </div>

      <p class="hb-section-note">Só benefícios da operação — <strong>sem Pix, dinheiro, desconto ou sorteio de dinheiro</strong>.</p>
    </div>`;
}

/* ---------------- AI Advisor ---------------- */
function renderAdvisor() {
  const msgs = state.advisor.map(m => `
    <div class="hb-adv-msg ${m.from}">
      ${m.from === "lords" ? '<span class="hb-adv-avatar">AI</span>' : ""}
      <div class="hb-adv-bubble">${m.typing ? '<div class="hb-typing-dots"><span></span><span></span><span></span></div>' : esc(m.txt)}</div>
    </div>`).join("");
  return `
    <div class="hb-adv-hero">
      <span class="hb-adv-icon">AI</span>
      <div>
        <strong style="font-size:16px">IA Advisor LORDS</strong>
        <p class="hb-muted">Estratégia de conteúdo, marketing digital, Instagram, mídia paga, branding — pergunte qualquer coisa.</p>
      </div>
    </div>
    ${card("Conversa", `
      <div class="hb-adv-header">
        <span></span>
        <button class="hb-chip ghost" data-act="advisor_clear" style="font-size:11px;padding:5px 10px">Nova conversa</button>
      </div>
      <div class="hb-adv-chat" id="hb-adv-chat">${msgs}</div>
      <div class="hb-adv-input-row">
        <input class="hb-adv-input" id="hb-adv-input" type="text" placeholder="Pergunte sobre marketing, conteúdo, Instagram…" />
        <button class="hb-chip go" data-act="advisor_send">Enviar</button>
      </div>
      <p class="hb-section-note">Prévia — respostas baseadas em estratégias LORDS. Na Fase 2, integra com IA em tempo real.</p>`)}`;
}

/* ---------------- Notificações ---------------- */
function renderNotificacoes() {
  const hasUnread = state.notifications.some(n => !n.lida);
  const rows = state.notifications.map(n => `
    <div class="hb-row hb-notif-row${n.lida ? " lida" : ""}" data-act="notif-read" data-id="${n.id}">
      <span class="hb-row-ic">${n.ic}</span>
      <div class="hb-row-main"><strong style="font-weight:600">${esc(n.txt)}</strong><small>${n.quando}</small></div>
      ${n.lida ? "" : '<span class="hb-tag wait">novo</span>'}
    </div>`).join("");
  const markAll = hasUnread ? `<button class="hb-mark-all" data-act="notif-all">Marcar todas como lidas</button>` : "";
  return card("Notificações", `${markAll}<div class="hb-list">${rows}</div>`);
}

/* ---------------- Metas ---------------- */
function renderMetas() {
  const goals = [
    { nome: "Alcance mensal no Instagram", val: 72, meta: "+30% vs. julho" },
    { nome: "Conversas no WhatsApp",        val: 54, meta: "60 no mês" },
    { nome: "Constância de publicação",     val: 90, meta: "5×/semana" },
  ];
  const g = goals.map((x) => `${card(x.nome, `<div class="hb-progress-lbl"><span>${x.meta}</span><span>${x.val}%</span></div><div class="hb-progress"><span style="width:${x.val}%"></span></div>`)}`).join("");
  return `<p class="hb-privacy">Área <strong>premium</strong> do plano Completo: indicadores avançados, relatórios e acompanhamento estratégico.</p><div class="hb-grid cols-3">${g}</div>`;
}

/* ---------------- Captação de clientes ---------------- */
function renderCaptacao() {
  const c = DEMO_CAPTACAO[state.plan] || DEMO_CAPTACAO.creator;
  const n = (v, l) => `<div class="hb-dlv-item"><span class="hb-dlv-n">${v}</span><span class="hb-dlv-l">${l}</span></div>`;
  const resumo = card("Este mês", `
    <div class="hb-dlv-grid hb-dlv-3">${n(c.abordados, "Abordados")}${n(c.responderam, "Responderam")}${n(c.leads, "Leads para você")}</div>
    <p class="hb-section-note">A LORDS abre a conversa e qualifica. O fechamento é com você, e cada lead chega com o contexto do que já foi conversado.</p>`);
  const lista = card("Leads entregues", DEMO_LEADS.slice(0, c.leads).map((l) => `
    <div class="hb-row"><span class="hb-row-ic">${l.origem === "WA" ? "💬" : l.origem === "DM" ? "📩" : "🤝"}</span><div class="hb-row-main"><strong style="font-weight:600">${esc(l.nome)}</strong><small>${l.quando}</small></div><span class="hb-tag wait">${l.status}</span></div>`).join(""));
  return `<p class="hb-privacy">Benefício do plano <strong>${planShort(state.plan)}</strong>. O escopo mensal está no seu contrato.</p><div class="hb-grid cols-2">${resumo}${lista}</div>`;
}

/* ---------------- Relatório do mês ---------------- */
function renderRelatorio() {
  const d = DEMO_DELIVERIES[state.plan] || DEMO_DELIVERIES.creator;
  const c = DEMO_CAPTACAO[state.plan];
  const entregue = card("Entregue", `
    <div class="hb-row"><div class="hb-row-main"><strong>${d.videos} vídeos</strong><small>${d.encontros} encontro(s) de captação</small></div></div>
    ${d.artes !== "—" ? `<div class="hb-row"><div class="hb-row-main"><strong>${d.artes} artes</strong><small>feed + story</small></div></div>` : ""}
    ${d.fotos !== "—" ? `<div class="hb-row"><div class="hb-row-main"><strong>Ensaio fotográfico</strong><small>no acervo de Entregas</small></div></div>` : ""}
    ${c ? `<div class="hb-row"><div class="hb-row-main"><strong>${c.leads} leads</strong><small>vindos da captação de clientes</small></div></div>` : ""}`);
  const proximos = card("Próximos passos", `
    <div class="hb-row"><div class="hb-row-main"><strong>Pauta do próximo mês</strong><small>definida na reunião mensal</small></div></div>
    <div class="hb-row"><div class="hb-row-main"><strong>Reunião de resultado</strong><small>agendada com a LORDS</small></div></div>`);
  return `<p class="hb-privacy">Passo 5 do Método LORDS: <strong>Resultado</strong>. O relatório completo é apresentado na reunião mensal.</p><div class="hb-grid cols-2">${entregue}${proximos}</div>`;
}

/* ---------------- Perfil ---------------- */
function renderPerfil() {
  const formHTML = `
    <div class="hb-pf-form">
      <label class="hb-pf-label">Nome da empresa
        <input class="hb-pf-input" id="pf-nome" type="text" value="${state.company}" placeholder="Ex: Clínica Vitalis" />
      </label>
      <label class="hb-pf-label">Responsável (nome completo)
        <input class="hb-pf-input" id="pf-resp" type="text" value="${state.responsavel}" placeholder="Ex: João da Silva" />
      </label>
      <label class="hb-pf-label">Nicho / Ramo de atuação
        <input class="hb-pf-input" id="pf-nicho" type="text" value="${state.nicho}" placeholder="Ex: Clínica estética, Restaurante, Academia" />
      </label>
      <label class="hb-pf-label">CNPJ <small class="hb-muted">(opcional)</small>
        <input class="hb-pf-input" id="pf-cnpj" type="text" value="${state.cnpj}" placeholder="00.000.000/0001-00" />
      </label>
      <label class="hb-pf-label">E-mail de contato
        <input class="hb-pf-input" id="pf-email" type="email" value="${state.email}" placeholder="voce@empresa.com.br" />
      </label>
      <label class="hb-pf-label">Telefone / WhatsApp
        <input class="hb-pf-input" id="pf-tel" type="tel" value="${state.telefone}" placeholder="(47) 9 0000-0000" />
      </label>
      <div class="hb-pf-actions">
        <button class="hb-chip go" data-act="perfil-salvar">Salvar</button>
        <button class="hb-chip ghost" data-act="perfil-cancelar">Cancelar</button>
      </div>
    </div>`;

  const viewHTML = `
    <div class="hb-list">
      <div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${state.company}</strong><small>Nome da empresa</small></div></div>
      ${state.responsavel ? `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${state.responsavel}</strong><small>Responsável</small></div></div>` : ""}
      ${state.nicho ? `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${state.nicho}</strong><small>Nicho / Ramo</small></div></div>` : ""}
      ${state.cnpj ? `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${state.cnpj}</strong><small>CNPJ</small></div></div>` : ""}
      ${state.email ? `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${state.email}</strong><small>E-mail</small></div></div>` : ""}
      ${state.telefone ? `<div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${state.telefone}</strong><small>Telefone / WhatsApp</small></div></div>` : ""}
      <div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>Plano ${planShort(state.plan)}</strong><small>Contrato ativo</small></div></div>
      <div class="hb-row"><span class="hb-row-ic">—</span><div class="hb-row-main"><strong>${fmt(state.coins)} coins</strong><small>Saldo atual</small></div></div>
    </div>
    <button class="hb-chip go" data-act="perfil-editar" style="margin-top:12px">Editar perfil</button>`;

  const passos = card("Como atualizar seus dados", `
    <div class="hb-list">
      <div class="hb-row"><span class="hb-row-ic">1.</span><div class="hb-row-main"><strong>Clique em "Editar perfil"</strong><small>No card acima, no canto inferior.</small></div></div>
      <div class="hb-row"><span class="hb-row-ic">2.</span><div class="hb-row-main"><strong>Preencha os campos</strong><small>Nome da empresa, responsável, nicho, CNPJ, e-mail e telefone.</small></div></div>
      <div class="hb-row"><span class="hb-row-ic">3.</span><div class="hb-row-main"><strong>Clique em "Salvar"</strong><small>Seus dados ficam registrados no Hub imediatamente.</small></div></div>
      <div class="hb-row"><span class="hb-row-ic">+</span><div class="hb-row-main"><strong>Complete o perfil e ganhe +250 coins</strong><small>Clique no botão abaixo após preencher tudo.</small></div></div>
    </div>
    ${state.perfilClaimed
      ? `<button class="hb-chip okd" disabled style="margin-top:8px">Perfil completo ✓</button>`
      : `<button class="hb-chip go" data-act="perfil-completo" style="margin-top:8px">Completar perfil (+250 coins)</button>`}
    <p class="hb-section-note" style="margin-top:12px">Seus dados são usados exclusivamente para a operação LORDS e estão protegidos pela LGPD (Lei 13.709/2018). Não compartilhamos com terceiros.</p>`);

  return card("Perfil da empresa", state.perfilEditando ? formHTML : viewHTML) + passos;
}

/* ---------------- Modo Apresentação (novo) ---------------- */
function openApresentacao() {
  const score  = calcBrandScore();
  const missOK = state.missions.filter(m => m.status === "concluida").length;
  const contOK = state.contents.filter(c => c.status === "ok").length;
  const nb     = nextReward();
  let el = document.getElementById("hb-apresentacao");
  if (!el) {
    el = document.createElement("div");
    el.id = "hb-apresentacao";
    el.className = "hb-apresentacao";
    document.body.appendChild(el);
  }
  el.innerHTML = `
    <div class="hb-apr-card">
      <div class="hb-apr-logo"><span class="hb-logo">L</span><span>LORDS Hub</span></div>
      <div class="hb-apr-company">${state.company}</div>
      <div class="hb-apr-plan">Plano ${planShort(state.plan)} · agosto 2026</div>
      <div class="hb-apr-gauge">${scoreGaugeSVG(score, 140)}</div>
      <div class="hb-apr-label">Score de Marca</div>
      <div class="hb-apr-kpis">
        <div class="hb-apr-kpi"><b>${fmt(state.coins)}</b><span>Coins</span></div>
        <div class="hb-apr-kpi"><b>${contOK}/${state.contents.length}</b><span>Aprovados</span></div>
        <div class="hb-apr-kpi"><b>${missOK}/${state.missions.length}</b><span>Missões</span></div>
        ${nb ? `<div class="hb-apr-kpi"><b>${Math.round(state.coins / nb.custo * 100)}%</b><span>Próx. benefício</span></div>` : ""}
      </div>
      <button class="hb-apr-close" onclick="document.getElementById('hb-apresentacao').hidden=true">✕ Fechar</button>
    </div>`;
  el.hidden = false;
}

/* ---------------- Overlay de Notificações ---------------- */
function renderNotifOverlay() {
  let ov = document.getElementById("hb-notif-overlay");
  if (!state.notifOpen) { if (ov) ov.hidden = true; return; }
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "hb-notif-overlay";
    ov.className = "hb-notif-overlay";
    document.body.appendChild(ov);
  }
  const hasUnread = state.notifications.some(n => !n.lida);
  const rows = state.notifications.map(n => `
    <div class="hb-row hb-notif-row${n.lida ? " lida" : ""}" data-act="notif-read-ov" data-id="${n.id}">
      <span class="hb-row-ic">${n.ic}</span>
      <div class="hb-row-main"><strong style="font-weight:600">${esc(n.txt)}</strong><small>${n.quando}</small></div>
      ${n.lida ? "" : '<span class="hb-tag wait">novo</span>'}
    </div>`).join("");
  ov.innerHTML = `
    <div class="hb-notif-panel">
      <div class="hb-notif-panel-head">
        <strong>Notificações</strong>
        <div style="display:flex;gap:8px;align-items:center">
          ${hasUnread ? `<button class="hb-mark-all" data-act="notif-all-ov">Marcar lidas</button>` : ""}
          <button class="hb-notif-close" data-act="close-notif">✕</button>
        </div>
      </div>
      <div class="hb-list">${rows}</div>
    </div>`;
  ov.hidden = false;
}

/* Listener global para o sino e overlay */
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act === "open-notif") { state.notifOpen = !state.notifOpen; renderNotifOverlay(); syncCounters(); return; }
  if (act === "close-notif") { state.notifOpen = false; renderNotifOverlay(); syncCounters(); return; }
  if (act === "notif-read-ov") {
    const n = state.notifications.find(x => x.id === b.dataset.id); if (!n) return;
    n.lida = true; renderNotifOverlay(); syncCounters(); return;
  }
  if (act === "notif-all-ov") {
    state.notifications.forEach(n => { n.lida = true; }); renderNotifOverlay(); syncCounters(); return;
  }
});

/* Fechar overlay clicando fora (exceto no próprio sino) */
document.addEventListener("click", (e) => {
  if (!state.notifOpen) return;
  if (e.target.closest("[data-act='open-notif']")) return; // mesmo clique no sino — primeiro listener cuida
  const ov = document.getElementById("hb-notif-overlay");
  if (ov && !ov.contains(e.target)) {
    state.notifOpen = false; renderNotifOverlay(); syncCounters();
  }
});

/* ---------------- Ações (delegação) ---------------- */
$("#hb-view").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act, id = b.dataset.id;

  if (act === "go")      { state.module = b.dataset.mod; boot(); return; }
  if (act === "support") { toast("Suporte: um atendente da LORDS responde no seu WhatsApp."); return; }
  if (act === "doc")     { toast("Documento abriria aqui (demo)."); return; }
  if (act === "apresentacao") { openApresentacao(); return; }

  if (act === "vault_type")  { state.vaultType  = b.dataset.val; boot(); return; }
  if (act === "vault_month") { state.vaultMonth = b.dataset.val; boot(); return; }

  if (act === "advisor_send") {
    const input = document.getElementById("hb-adv-input");
    const txt = input ? input.value.trim() : "";
    if (!txt) return;
    state.advisor.push({ from: "user", txt });
    state.advisor.push({ from: "lords", typing: true, txt: "" });
    if (input) input.value = "";
    boot();
    const lower = txt.toLowerCase();
    const match = ADVISOR_RESPONSES.find(r => r.keywords.some(k => lower.includes(k)));
    const resp = match ? match.resp
      : "Boa pergunta! A resposta depende do contexto da sua marca. Para uma análise mais aprofundada, quer agendar uma consultoria estratégica com o time LORDS?";
    setTimeout(() => {
      state.advisor = state.advisor.filter(m => !m.typing);
      state.advisor.push({ from: "lords", txt: resp });
      boot();
    }, 900);
    return;
  }
  if (act === "advisor_clear") {
    state.advisor = [{ from: "lords", txt: "Oi! Sou o Advisor da LORDS. Pode me perguntar sobre estratégia de conteúdo, marketing digital, Instagram, mídia paga, branding — qualquer coisa da sua operação." }];
    boot(); return;
  }

  if (act === "conteudos-tab") { state.conteudosTab = b.dataset.tab; boot(); return; }
  if (act === "view-lista")   { state.conteudosView = "lista"; boot(); return; }
  if (act === "view-quadro")  { state.conteudosView = "quadro"; boot(); return; }

  if (act === "menu-toggle") {
    const menu = document.getElementById("hb-menu-" + id);
    if (!menu) return;
    const wasHidden = menu.hidden;
    document.querySelectorAll(".hb-actions-menu").forEach(m => { m.hidden = true; });
    menu.hidden = !wasHidden;
    return;
  }
  if (act === "edit-open") {
    const c = state.contents.find(x => x.id === id); if (!c) return;
    state.contents.forEach(x => { x.editPending = false; });
    c.editPending = true; boot(); return;
  }
  if (act === "edit-save") {
    const c = state.contents.find(x => x.id === id); if (!c) return;
    const temaEl    = document.getElementById("edit-tema-"    + id);
    const legendaEl = document.getElementById("edit-legenda-" + id);
    if (temaEl)    c.tema    = temaEl.value.trim()    || c.tema;
    if (legendaEl) c.legenda = legendaEl.value.trim() || c.legenda;
    c.editPending = false; boot(); return;
  }
  if (act === "edit-cancel") {
    const c = state.contents.find(x => x.id === id); if (!c) return;
    c.editPending = false; boot(); return;
  }
  if (act === "archive") {
    const c = state.contents.find(x => x.id === id); if (!c) return;
    c.status = "arquivado"; toast("Conteúdo arquivado."); boot(); return;
  }
  if (act === "delete-confirm") {
    const c = state.contents.find(x => x.id === id); if (!c) return;
    const menu = document.getElementById("hb-menu-" + id);
    if (menu) menu.hidden = true;
    if (!confirm(`Excluir "${c.tema}"? Essa ação não pode ser desfeita.`)) return;
    state.contents = state.contents.filter(x => x.id !== id);
    toast("Conteúdo excluído."); boot(); return;
  }
  if (act === "cal-open") {
    state.calModal = Number(b.dataset.day); renderCalModal(); return;
  }
  if (act === "cal-close") {
    state.calModal = null; renderCalModal(); return;
  }
  if (act === "cal-remove-media") {
    const day = Number(b.dataset.day);
    if (state.calEvents[day]) state.calEvents[day].media = null;
    state.calModal = day; renderCalModal(); boot(); return;
  }
  if (act === "feed-preview") {
    renderFeedPreview(); return;
  }
  if (act === "feed-close") {
    const fp = document.getElementById("hb-feed-preview"); if (fp) fp.hidden = true; return;
  }

  if (act === "mtab") { missTab = b.dataset.tab; boot(); return; }
  if (act === "mission") {
    const m = state.missions.find((x) => x.id === id); if (!m) return;
    if (m.status === "aberta") { m.status = "participando"; toast("Você entrou na missão: " + m.titulo); }
    else if (m.status === "participando") {
      m.status = "concluida"; m.feito = m.meta;
      state.coins += m.coins; state.points += Math.round(m.coins / 10);
      state.ledger.unshift({ ts: nowStamp(), acao: "Missão: " + m.titulo, delta: m.coins });
      toast("Missão concluída! +" + fmt(m.coins) + " coins");
    }
    boot(); return;
  }
  if (act === "spin") {
    const CUSTO_SPIN = 250;
    if (state.coins < CUSTO_SPIN) { toast("Precisa de 250 coins para girar a roleta."); return; }
    state.coins -= CUSTO_SPIN;
    state.ledger.unshift({ ts: nowStamp(), acao: "Roleta do Hub (giro)", delta: -CUSTO_SPIN });
    const premios = [{ t: "+100 coins", c: 100 }, { t: "+150 coins", c: 150 }, { t: "Adesivos da LORDS", c: 0 }, { t: "Kit de brindes LORDS", c: 0 }, { t: "+300 coins", c: 300 }, { t: "Mais sorte na próxima!", c: 0 }];
    const p = premios[Math.floor(Math.random() * premios.length)];
    if (p.c) { state.coins += p.c; state.ledger.unshift({ ts: nowStamp(), acao: "Roleta do Hub (prêmio)", delta: p.c }); }
    toast("Roleta: " + p.t);
    boot(); return;
  }
  if (act === "spin-recompensa") {
    const CUSTO = 1500;
    if (state.coins < CUSTO) { toast("Coins insuficientes para girar."); return; }
    state.coins -= CUSTO;
    state.ledger.unshift({ ts: nowStamp(), acao: "Roleta de Recompensas (giro)", delta: -CUSTO });
    const prize = ROLETA_PRIZES_NAMES[Math.floor(Math.random() * ROLETA_PRIZES_NAMES.length)];
    // animação de spin antes de revelar o resultado
    const wheel = document.getElementById("hb-roleta-disk");
    const btn = document.querySelector(".hb-spin-center-btn");
    if (btn) btn.disabled = true;
    if (wheel) {
      const spins = 5 + Math.random() * 3;
      const extraDeg = Math.random() * 360;
      wheel.style.transition = "transform 3.2s cubic-bezier(.17,.67,.12,.99)";
      wheel.style.transformOrigin = "150px 150px";
      wheel.style.transform = `rotate(${spins * 360 + extraDeg}deg)`;
    }
    setTimeout(() => {
      state.lastRoletaPrize = prize;
      toast("🎉 Você ganhou: " + prize + " — a equipe entrará em contato!");
      boot();
    }, 3100);
    return;
  }

  if (act === "approve") {
    const c = state.contents.find((x) => x.id === id); if (!c) return;
    c.status = "ok"; c.by = state.userName; c.at = nowStamp();
    const got = awardByRule("aprovar-no-prazo");
    toast(got ? "Conteúdo aprovado ✓ +50 coins" : "Conteúdo aprovado ✓");
    boot(); return;
  }
  if (act === "change-open") {
    const c = state.contents.find((x) => x.id === id); if (!c) return;
    c.changePending = true; boot(); return;
  }
  if (act === "change-cancel") {
    const c = state.contents.find((x) => x.id === id); if (!c) return;
    c.changePending = false; boot(); return;
  }
  if (act === "change-send") {
    const c = state.contents.find((x) => x.id === id); if (!c) return;
    const ta = document.getElementById("cr-" + id);
    c.changeRequest = ta ? ta.value.trim() : "Alteração solicitada";
    c.changePending = false;
    c.status = "mudar";
    toast("Pedido de alteração enviado à equipe.");
    boot(); return;
  }
  if (act === "notif-read") {
    const n = state.notifications.find(x => x.id === id); if (!n) return;
    n.lida = true; boot(); return;
  }
  if (act === "notif-all") {
    state.notifications.forEach(n => { n.lida = true; }); boot(); return;
  }

  if (act === "like") {
    const p = state.community.find((x) => x.id === id); if (!p) return;
    if (p.liked) { p.liked = false; p.likes--; }
    else { p.liked = true; p.likes++; awardByRule("curtida"); }
    boot(); return;
  }
  if (act === "comment") {
    const p = state.community.find((x) => x.id === id); if (!p) return;
    p.coments++; const got = awardByRule("comentario");
    toast(got ? "Comentário publicado — +10 coins" : "Comentário publicado.");
    boot(); return;
  }

  if (act === "redeem") {
    const r = REWARDS.find((x) => x.id === id) || HUB_SHOP.find((x) => x.id === id);
    if (!r) return;
    if (r.status && r.status !== "ativo") { toast("Este benefício estará disponível em breve."); return; }
    const custo = r.custo;
    if (state.coins < custo) { toast("Coins insuficientes para " + r.nome + "."); return; }
    state.coins -= custo;
    state.ledger.unshift({ ts: nowStamp(), acao: "Resgate: " + r.nome, delta: -custo });
    if (!state.redeemed) state.redeemed = [];
    state.redeemed.push(r.id);
    if (!state.shopBought) state.shopBought = [];
    state.shopBought.push(r.id);
    toast("Resgatado! A LORDS entrará em contato em breve.");
    boot(); return;
  }

  if (act === "perfil-completo") {
    const got = awardByRule("perfil-completo");
    if (got) { state.perfilClaimed = true; toast("Perfil completo! +250 coins"); }
    else toast("Você já ganhou os coins de perfil este mês.");
    boot(); return;
  }

  if (act === "perfil-editar") { state.perfilEditando = true; boot(); return; }
  if (act === "perfil-cancelar") { state.perfilEditando = false; boot(); return; }
  if (act === "perfil-salvar") {
    state.company    = document.getElementById("pf-nome")?.value.trim()    || state.company;
    state.nicho      = document.getElementById("pf-nicho")?.value.trim()   || state.nicho;
    state.responsavel= document.getElementById("pf-resp")?.value.trim()    || state.responsavel;
    state.cnpj       = document.getElementById("pf-cnpj")?.value.trim()    || state.cnpj;
    state.email      = document.getElementById("pf-email")?.value.trim()   || state.email;
    state.telefone   = document.getElementById("pf-tel")?.value.trim()     || state.telefone;
    state.perfilEditando = false;
    toast("Perfil salvo ✓");
    boot(); return;
  }
});

/* ---------------- Banner Slider ---------------- */
let _bannerIdx = 0;
let _bannerTimer = null;

function bannerGoTo(idx) {
  const slides = document.querySelectorAll(".hb-banner-slide");
  const dots   = document.querySelectorAll(".hb-banner-dot");
  if (!slides.length) return;
  _bannerIdx = ((idx % slides.length) + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle("active", i === _bannerIdx));
  dots.forEach((d, i) => d.classList.toggle("active", i === _bannerIdx));
}

function bannerAutoPlay() {
  clearInterval(_bannerTimer);
  if (HUB_BANNERS.length < 2) return;
  _bannerTimer = setInterval(() => bannerGoTo(_bannerIdx + 1), 4500);
}

document.addEventListener("click", (e) => {
  const arrow = e.target.closest(".hb-banner-arrow");
  if (arrow) { bannerGoTo(_bannerIdx + Number(arrow.dataset.dir)); bannerAutoPlay(); return; }
  const dot = e.target.closest(".hb-banner-dot");
  if (dot) { bannerGoTo(Number(dot.dataset.go)); bannerAutoPlay(); return; }
});

document.addEventListener("boot", bannerAutoPlay);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".hb-actions-wrap")) {
    document.querySelectorAll(".hb-actions-menu").forEach(m => { m.hidden = true; });
  }
  if (e.target.id === "hb-cal-modal") { state.calModal = null; renderCalModal(); }
  if (e.target.id === "hb-feed-preview") {
    const fp = document.getElementById("hb-feed-preview"); if (fp) fp.hidden = true;
  }
});

/* ---------------- PWA ---------------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js?v=20260928a").catch(() => {}));
}
