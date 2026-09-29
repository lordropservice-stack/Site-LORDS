/* Mockup animado do LORDS Hub (home #hub e esteira da Fábrica).
   Espelha o menu real do hub.html — ao mudar HUB_MODULES, atualizar aqui. */

const TABS = [
  {
    id: "dashboard", label: "Dashboard",
    html: `
      <div class="hm-section">
        <div class="hm-greeting">Bem-vindo de volta.</div>
        <div class="hm-stat-row">
          <div class="hm-stat"><span class="hm-stat-n">10</span><span class="hm-stat-l">Vídeos</span></div>
          <div class="hm-stat"><span class="hm-stat-n">2</span><span class="hm-stat-l">A aprovar</span></div>
          <div class="hm-stat"><span class="hm-stat-n">4</span><span class="hm-stat-l">Leads</span></div>
        </div>
        <div class="hm-next-label">Próximas entregas</div>
        <div class="hm-tasks">
          <div class="hm-task done">Estratégia do mês</div>
          <div class="hm-task done">Roteiros aprovados</div>
          <div class="hm-task">Gravação, qui 14h</div>
          <div class="hm-task">Ensaio de fotos</div>
        </div>
      </div>`,
  },
  {
    id: "conteudos", label: "Conteúdos",
    html: `
      <div class="hm-section">
        <div class="hm-apr-title">Aguardando aprovação</div>
        <div class="hm-apr-cards">
          <div class="hm-apr-card">
            <div class="hm-apr-thumb">Vídeo</div>
            <div class="hm-apr-info"><b>Reel #04 · Produto</b><small>Enviado hoje</small></div>
            <div class="hm-apr-btns"><button class="hm-btn-ok">✓ Aprovar</button><button class="hm-btn-rev">✎ Revisar</button></div>
          </div>
          <div class="hm-apr-card">
            <div class="hm-apr-thumb">Roteiro</div>
            <div class="hm-apr-info"><b>Roteiro #05 · Bastidor</b><small>Enviado ontem</small></div>
            <div class="hm-apr-btns"><button class="hm-btn-ok">✓ Aprovar</button><button class="hm-btn-rev">✎ Revisar</button></div>
          </div>
        </div>
        <div class="hm-apr-done-label">Vídeos do mês: <strong>6 de 10</strong></div>
      </div>`,
  },
  {
    id: "calendario", label: "Calendário",
    html: `
      <div class="hm-section">
        <div class="hm-cal-header"><span>Outubro 2026</span><span class="hm-cal-badge">8 eventos</span></div>
        <div class="hm-cal-grid">
          ${["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d) => `<div class="hm-cal-day-name">${d}</div>`).join("")}
          ${[...Array(4)].map(() => `<div class="hm-cal-d" style="opacity:0"></div>`).join("")}
          ${[...Array(31)].map((_, i) => {
            const d = i + 1;
            const cls = d === 8 ? "hm-cal-ev ev-grav" : d === 13 ? "hm-cal-ev ev-apr" : d === 20 ? "hm-cal-ev ev-ent" : d === 29 ? "hm-cal-ev ev-rel" : "";
            const today = d === 15 ? " hm-cal-today" : "";
            return `<div class="hm-cal-d${cls ? ` ${cls}` : ""}${today}">${d}</div>`;
          }).join("")}
        </div>
        <div class="hm-cal-legend">
          <span class="leg ev-grav">Gravação</span>
          <span class="leg ev-apr">Aprovação</span>
          <span class="leg ev-ent">Entrega</span>
        </div>
      </div>`,
  },
  {
    id: "captacao", label: "Captação de clientes",
    html: `
      <div class="hm-section">
        <div class="hm-apr-title">Captação de clientes · este mês</div>
        <div class="hm-stat-row">
          <div class="hm-stat"><span class="hm-stat-n">60</span><span class="hm-stat-l">Abordados</span></div>
          <div class="hm-stat"><span class="hm-stat-n">9</span><span class="hm-stat-l">Responderam</span></div>
          <div class="hm-stat"><span class="hm-stat-n">4</span><span class="hm-stat-l">Leads p/ você</span></div>
        </div>
        <div class="hm-next-label">Leads entregues</div>
        <div class="hm-tasks">
          <div class="hm-task">Contato via Instagram · aguardando você</div>
          <div class="hm-task">Contato via WhatsApp · em conversa</div>
          <div class="hm-task done">Indicação de parceiro · reunião marcada</div>
        </div>
      </div>`,
  },
  {
    id: "relatorio", label: "Relatório do mês",
    html: `
      <div class="hm-section">
        <div class="hm-apr-title">Relatório do mês</div>
        <div class="hm-tasks">
          <div class="hm-task done">10 vídeos entregues</div>
          <div class="hm-task done">Ensaio fotográfico no acervo</div>
          <div class="hm-task done">4 leads da captação de clientes</div>
          <div class="hm-task">Reunião de resultado · sex 10h</div>
          <div class="hm-task">Pauta do próximo mês</div>
        </div>
      </div>`,
  },
];

const NAV = ["Dashboard", "Conteúdos", "Calendário", "Captação de clientes", "Relatório do mês", "IA Advisor"];

export function buildHubMockupHTML(instanceId = "hub-mockup") {
  const navBtns = NAV.map((label) => {
    const tab = TABS.find((t) => t.label === label);
    const active = label === "Dashboard" ? " active" : "";
    const dataTab = tab ? ` data-tab="${tab.id}" data-inst="${instanceId}"` : "";
    return `<button class="hub-snav-btn${active}"${dataTab}><span>${label}</span></button>`;
  }).join("");
  const panels = TABS.map((t, i) => `<div class="hub-tab-panel${i === 0 ? " active" : ""}" data-panel="${t.id}" data-inst="${instanceId}">${t.html}</div>`).join("");

  return `<div class="hub-mockup-wrap" data-inst="${instanceId}" aria-hidden="true">
    <a class="hub-mockup-cta" href="hub.html" tabindex="0" aria-label="Ver o LORDS Hub">Ver em ação →</a>
    <div class="hub-mac">
      <div class="hub-mac-frame">
        <div class="hub-mac-bar">
          <span class="hub-mac-dot"></span><span class="hub-mac-dot"></span><span class="hub-mac-dot"></span>
          <span class="hub-mac-title">LORDS Hub</span>
        </div>
        <div class="hub-mac-body">
          <div class="hub-mac-sidebar">
            <div class="hub-mac-brand">L <span>LORDS Hub</span></div>
            <div class="hub-mac-user-top">Sua Empresa<small>Editar perfil →</small></div>
            <nav class="hub-mac-nav">${navBtns}</nav>
            <div class="hub-mac-foot"><span class="hub-mac-plan">Plano Creator</span></div>
          </div>
          <div class="hub-mac-content">${panels}</div>
        </div>
      </div>
      <div class="hub-mac-stand"></div>
      <div class="hub-mac-base"></div>
    </div>
  </div>`;
}

export function initHubMockup(wrap) {
  if (!wrap) return;
  const btns = [...wrap.querySelectorAll(".hub-snav-btn[data-tab]")];
  const panels = wrap.querySelectorAll(".hub-tab-panel");
  const show = (id) => {
    btns.forEach((b) => b.classList.toggle("active", b.dataset.tab === id));
    panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === id));
  };
  btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.tab)));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let idx = 0;
  setInterval(() => { idx = (idx + 1) % btns.length; show(btns[idx].dataset.tab); }, 4000);
}
