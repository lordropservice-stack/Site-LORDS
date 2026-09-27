/* ============================================================
   agents.js — painel "Agentes trabalhando sem parar"
   Componente de autoridade usado na Home e na Fábrica Criativa.
   mountAgents(container) renderiza o painel e anima as mensagens
   (a linha atualizada sobe pro topo). Interface DEMONSTRATIVA.
   ============================================================ */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AGENTS = [
  { id: "estrategista", name: "Estrategista", ini: "Es", c: "#6C5CE7", msgs: [
    "Revisou o calendário do mês — 12 pautas priorizadas.",
    "Ajustou a linha editorial pro seu nicho.",
    "Mapeou 3 tendências pra semana.",
    "Definiu o foco dos próximos 15 dias.",
  ]},
  { id: "roteirista", name: "Roteirista", ini: "Ro", c: "#3b82ff", msgs: [
    "Escreveu 4 roteiros novos no seu tom de voz.",
    "Reescreveu o gancho — retenção estimada +14%.",
    "Adaptou 2 roteiros pra Reels e Shorts.",
    "Gerou legendas pros 6 vídeos do mês.",
  ]},
  { id: "whatsapp", name: "Agente de WhatsApp", ini: "Wa", c: "#2a9d6a", msgs: [
    "Respondeu 7 conversas · tempo médio 11s.",
    "Agendou 2 visitas pra quinta.",
    "Recuperou 1 lead que tinha esfriado.",
    "Qualificou 4 contatos novos e passou pro closer.",
  ]},
  { id: "prospeccao", name: "Prospecção B2B", ini: "Pr", c: "#C9A84C", msgs: [
    "Prospectou 50 contas novas hoje.",
    "Enviou 18 abordagens personalizadas.",
    "Marcou 3 reuniões na sua agenda.",
    "Encontrou 9 decisores no seu ICP.",
  ]},
  { id: "analista", name: "Analista de Concorrência", ini: "An", c: "#e0574a", msgs: [
    "Concorrente subiu preço 8% — recalculando posição.",
    "Analisou 24 concorrentes · relatório pronto.",
    "Detectou oportunidade em 5 palavras-chave.",
    "Monitorou 52 SKUs — 47 com Buy Box mantido.",
  ]},
  { id: "anuncios", name: "Anúncios & Tráfego", ini: "Ad", c: "#f59e0b", msgs: [
    "ROAS subiu pra 8,4 — realoquei a verba.",
    "Título novo: score 7,8 → 9,1 (CTR estimado +18%).",
    "Pausei 2 criativos de baixa performance.",
    "Testou 3 variações de copy — 1 vencedora.",
  ]},
  { id: "gestor", name: "Gestor & Relatórios", ini: "Ge", c: "#8b7bff", msgs: [
    "Relatório do dia enviado ao cliente.",
    "Consolidou métricas de Instagram + tráfego + WhatsApp.",
    "Fechou a daily — operação no verde.",
    "Traduziu os números em recomendação de negócio.",
  ]},
];

const hhmm = (d = new Date()) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

function rowHTML(a) {
  return `<div class="agp-row" data-id="${a.id}">
    <span class="agp-av" style="--c:${a.c}">${a.ini}</span>
    <div class="agp-body"><b>${a.name}</b><p class="agp-msg">${a.msgs[0]}</p></div>
    <time class="agp-time">${hhmm()}</time>
  </div>`;
}

export function mountAgents(container) {
  if (!container) return;
  container.innerHTML = `
  <div class="agp">
    <div class="agp-bar">
      <span class="agp-live"><i></i> ao vivo</span>
      <span class="agp-bar-mid">app.lords · briefing do cliente</span>
      <span class="agp-clock">${hhmm()}</span>
    </div>
    <div class="agp-head">Agentes processando</div>
    <div class="agp-list">${AGENTS.map(rowHTML).join("")}</div>
    <div class="agp-foot">prévia da interface · exemplo demonstrativo</div>
  </div>`;

  const list = container.querySelector(".agp-list");
  const clock = container.querySelector(".agp-clock");
  if (!list || reduce) return;

  const tick = () => {
    if (document.hidden) return;
    const a = AGENTS[Math.floor(Math.random() * AGENTS.length)];
    const row = list.querySelector(`.agp-row[data-id="${a.id}"]`);
    if (!row) return;
    row.querySelector(".agp-msg").textContent = a.msgs[Math.floor(Math.random() * a.msgs.length)];
    row.querySelector(".agp-time").textContent = hhmm();
    if (clock) clock.textContent = hhmm();
    // sobe pro topo com animação
    list.prepend(row);
    row.classList.remove("agp-row--in");
    void row.offsetWidth; // reflow pra reiniciar a animação
    row.classList.add("agp-row--in");
  };

  setInterval(tick, 2600);
}
