/* ============================================================
   LORDS — Home · home.js (trilhas + seções + modal Calendly)
   ============================================================ */

import { PRODUCTS, TRILHAS, renderMockup, NICHES_HOME, PHOTO_REEL, COBERTURA_MEDIA, HUB_SCREENS, MEDIA, METODO_LORDS, SERVICOS_AVULSOS } from "./products-data.js?v=20261001a";
import { WHATSAPP_NUM } from "./diagnostico-data.js?v=20261001a";
import { renderAbertura, renderPassos, initAbertura, fixLoops } from "./abertura.js?v=20260929a";
import { buildHubMockupHTML, initHubMockup } from "./hub-mockup.js?v=20260929a";
import { renderJourney, initJourneyVideos } from "./journey.js?v=20260928f";
import { initEnquete } from "./enquete.js?v=20261001a";
import { mountAgents } from "./agents.js?v=20260929a";
const CALENDLY_URL = "https://calendly.com/lordropservice/30min";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fábrica Criativa tem página própria (roxa); os demais usam o template genérico.
const hrefFor = (slug) => slug === "fabrica-criativa" ? "fabrica-criativa.html" : `produto.html?p=${slug}`;

/* ------------------------------------------------------------
   DADOS (copy real do Obsidian)
   ------------------------------------------------------------ */
// Serviços do CLUB (hub de talentos on-demand) — copy do site atual
const CLUB_SERVICES = [
  { t: "Modelo", d: "Presença para campanhas, ensaios e conteúdo.", tags: ["recorrente", "avulso"] },
  { t: "Comunicador(a)", d: "Voz e apresentação para vídeos, campanhas e eventos da marca.", tags: ["recorrente", "avulso"] },
  { t: "Captação com drone", d: "Imagens aéreas e tomadas de impacto para vídeos e campanhas.", tags: ["avulso"] },
  { t: "Edição criativa", d: "Cortes, ritmo e storytelling para vídeos que prendem do início ao fim.", tags: ["recorrente", "avulso"] },
  { t: "Mídia paga", d: "Gestão de anúncios no TikTok, Meta e Google para levar o conteúdo às pessoas certas.", tags: ["recorrente"] },
  { t: "Motion", d: "Motion design e efeitos visuais que dão cara de cinema a campanhas e conteúdos.", tags: ["avulso", "recorrente"] },
  { t: "Personagem 3D", d: "Mascotes e personagens 3D para dar identidade à sua marca.", tags: ["avulso"] },
  { t: "Criação de sites", d: "Sites e landing pages rápidos, bonitos e prontos para converter.", tags: ["avulso"] },
  { t: "Lançamentos digitais", d: "Estrutura de lançamento de ponta a ponta: conteúdo, funil e execução.", tags: ["recorrente", "avulso"] },
];

const ROSTER = [
  { name: "Tomaz",        role: "Fotógrafo & Videomaker" },
  { name: "Leo Fernando", role: "Videomaker & Fotógrafo" },
  { name: "Isabela",      role: "Comunicadora & Modelo" },
  { name: "Jenifer",      role: "Comunicadora & Modelo" },
  { name: "Eduarda",      role: "Comunicadora & Modelo" },
  { name: "Maria Luiza",  role: "Comunicadora & Modelo" },
  { name: "Amanda",       role: "Comunicadora & Modelo" },
  { name: "Lucas Rodrigues", role: "Head de Marketing" },
  { name: "Matheus Macedo", role: "Gestão de Mídia Paga" },
];

// FAQ — copy do site atual
const FAQ = [
  { q: "Em quanto tempo eu vejo a operação organizada?", a: "Depende do tamanho da sua operação, mas o diagnóstico costuma sair em poucos dias e a implementação inicial em semanas, não em meses. A ideia é começar a destravar rápido, sem grandes reformas de uma vez." },
  { q: "Que tipo de empresa vocês atendem?", a: "Pequenas e médias empresas, criadores e profissionais criativos, e times de marketing que precisam organizar a execução. Se o seu marketing produz conteúdo com alguma frequência, provavelmente encaixa." },
  { q: "Qual é o investimento mínimo?", a: "A Fábrica Criativa tem três planos: a partir de R$ 6.000/mês (Capture), R$ 12.000/mês (Creator) e R$ 17.900/mês (Completo). Para diagnóstico e projetos pontuais, o valor é definido na conversa, você sai da reunião sabendo o que esperar." },
  { q: "Como funciona a parte de IA?", a: "A IA entra para acelerar tarefas repetitivas, como roteiros, legendas, organização de briefings e apoio à produção. Ela não substitui o time nem a estratégia: serve para liberar tempo das pessoas para o que realmente exige cabeça humana." },
  { q: "Preciso ter um time de marketing interno?", a: "Não, a Fábrica Criativa existe justamente para você não precisar montar um. A gente vira a sua operação: estratégia, produção e acompanhamento, sem você contratar ninguém. E você acompanha tudo no painel do cliente." },
  { q: "Como eu acompanho o que está sendo feito?", a: "Clientes dos planos Creator e Completo recebem acesso ao LORDS Hub: você vê o calendário, aprova posts, legendas e estratégias antes de publicar e acompanha as métricas num lugar só. Clientes do Capture ganham acesso ao renovar por mais 3 meses." },
  { q: "E a Fábrica Criativa, quando entra?", a: "A Fábrica Criativa é o nosso carro-chefe: a LORDS assume a operação de marketing inteira do seu negócio, estratégia, roteiro, captação com câmera, edição, artes e relatório, todo mês. Você não opera nada. São três planos, a partir de R$ 6.000/mês, e a diferença entre eles é o volume e quem aparece na câmera: você, você com uma comunicadora, ou uma comunicadora da nossa equipe." },
  { q: "Vocês garantem resultado?", a: "Não prometemos número mágico. O que entregamos é método, operação organizada e acompanhamento honesto. Resultado vem de execução consistente, e é exatamente isso que estruturamos com você." },
];

/* ------------------------------------------------------------
   RENDER DO CONTEÚDO DINÂMICO
   ------------------------------------------------------------ */
/* ---- Vitrine animada (destaques que vêm da profundidade) ---- */
const FEATURED = ["diagnostico-express", "cerebro-whatsapp", "stories-comunicadora", "criacao-de-sites", "kit-conteudo", "fabrica-criativa"];

/* ---- Hero limpo (hero--clean): sem slides, sem media lateral ---- */

function renderVitrine() {
  const stage = document.getElementById("vitrine-stage");
  const dots = document.getElementById("vitrine-dots");
  if (!stage) return;
  stage.innerHTML = FEATURED.map((slug, i) => {
    const p = PRODUCTS[slug];
    if (!p) return "";
    const activeClass = i === 0 ? "active" : "";

    if (slug === "fabrica-criativa") {
      const creator = p.plans?.find(pl => pl.id === "fabrica-protagonista") || p.plans?.[0];
      const bumps = (p.bumps?.protagonista || []).filter(b => !b.requires).slice(0, 4);
      return `
      <div class="vslide ${activeClass}" data-i="${i}">
        <div class="vslide-media vslide-media--fc">
          <div class="fc-slide-plan">
            <span class="fc-plan-badge">Mais escolhido</span>
            <p class="fc-plan-name">${creator?.name || "Plano Creator"}</p>
            <p class="fc-plan-price">R$ ${Number(creator?.price || 10000).toLocaleString("pt-BR")}<small>/mês</small></p>
            <ul class="fc-plan-items">
              ${(creator?.groups?.flatMap(g => g.items) || []).slice(0, 4).map(it => `<li>${it}</li>`).join("")}
            </ul>
          </div>
          <div class="fc-slide-bumps">
            ${bumps.map(b => `<div class="fc-bump-chip"><span>${b.name}</span><span class="fc-bump-price">+R$ ${Number(b.price).toLocaleString("pt-BR")}${b.recurring ? "/mês" : ""}</span></div>`).join("")}
          </div>
        </div>
        <div class="vslide-text">
          <span class="vslide-badge premium">${p.badge}</span>
          <p class="vslide-problem"><span>Clínica</span> "Meu serviço é alto padrão, mas minha presença digital não passa isso."</p>
          <h3 class="vslide-hook">${p.hook}</h3>
          <p class="vslide-name">${p.name}</p>
          <a class="btn btn-primary" href="fabrica-criativa.html">Ver tudo →</a>
        </div>
      </div>`;
    }

    const prob = p.problems?.[0];
    if (!prob) return "";
    return `
    <div class="vslide ${activeClass}" data-i="${i}">
      <div class="vslide-media">${renderMockup(p.demo)}</div>
      <div class="vslide-text">
        <span class="vslide-badge ${p.premium ? "premium" : ""}">${p.badge}</span>
        <p class="vslide-problem"><span>${prob.niche}</span> "${prob.text}"</p>
        <h3 class="vslide-hook">${p.hook}</h3>
        <p class="vslide-name">${p.name}</p>
        <a class="btn btn-primary" href="fabrica-criativa.html">Ver tudo →</a>
      </div>
    </div>`;
  }).join("");
  if (dots) dots.innerHTML = FEATURED.map((_, i) =>
    `<button class="vdot ${i === 0 ? "active" : ""}" data-i="${i}" role="tab" aria-label="Destaque ${i + 1}"></button>`).join("");
}

function initVitrine() {
  const stage = document.getElementById("vitrine-stage");
  const vit = document.getElementById("vitrine");
  if (!stage) return;
  const slides = [...stage.querySelectorAll(".vslide")];
  const dots = [...document.querySelectorAll(".vdot")];
  if (slides.length < 2) return;
  let cur = 0, timer = null;
  const go = (n) => {
    cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === cur));
    dots.forEach((d, i) => d.classList.toggle("active", i === cur));
  };
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const play = () => { if (reduceMotion) return; stop(); timer = setInterval(() => go(cur + 1), 5200); };
  dots.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.i); play(); }));
  if (vit) { vit.addEventListener("mouseenter", stop); vit.addEventListener("mouseleave", play); }
  play();
}

// Um card de trilha (produto ou card livre) — mesma marcação pros dois.
function trilhaCardHTML(c) {
  return `
      <a class="pcard ${c.premium ? "pcard-premium" : ""}" href="${c.href}">
        ${c.trilha ? `<span class="pcard-trilha">${c.trilha}</span>` : ""}
        <span class="pcard-badge ${c.free ? "free" : ""}">${c.badge}</span>
        <h4 class="pcard-hook">${c.hook}</h4>
        <p class="pcard-name">${c.name}</p>
        <p class="pcard-tag">${c.tagline}</p>
        <span class="pcard-foot">
          <span class="pcard-from"><small>a partir de</small> ${c.from}</span>
          <span class="pcard-cta">Ver tudo →</span>
        </span>
      </a>`;
}
// Jornada = esteira animada com todos os cards das trilhas.
function renderJornadaReel() {
  const mount = document.getElementById("jornada-mount");
  if (!mount) return;
  const cards = [];
  TRILHAS.forEach((t) => {
    (t.slugs || []).forEach((slug) => {
      const p = PRODUCTS[slug];
      if (p) cards.push(trilhaCardHTML({ ...p, href: hrefFor(p.slug), trilha: t.kicker }));
    });
    (t.cards || []).forEach((c) => cards.push(trilhaCardHTML({ ...c, trilha: t.kicker })));
  });
  const track = cards.join("") + cards.join("");
  mount.innerHTML = `<div class="jornada-reel"><div class="jornada-track">${track}</div></div>`;
}

function renderExplore() {
  const grid = document.getElementById("club-grid");
  if (grid) grid.innerHTML = CLUB_SERVICES.map((s) => `
    <article class="club-card glass">
      <div class="club-tags">${s.tags.map((t) => `<span class="club-tag ${t}">${t}</span>`).join("")}</div>
      <h4>${s.t}</h4>
      <p>${s.d}</p>
    </article>`).join("");

  const roster = document.getElementById("roster");
  if (roster) roster.innerHTML = ROSTER.map((r) => `
    <div class="roster-chip">
      <span class="roster-avatar">${r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
      <span class="roster-txt"><strong>${r.name}</strong><small>${r.role}</small></span>
    </div>`).join("");

  const faq = document.getElementById("faq-list");
  if (faq) {
    const VISIBLE = 7;
    faq.innerHTML = FAQ.map((f, i) => `
    <details class="faq-item${i >= VISIBLE ? " faq-hidden" : ""}">
      <summary>${f.q}</summary>
      <div class="faq-answer"><p>${f.a}</p></div>
    </details>`).join("");
    if (FAQ.length > VISIBLE) {
      const wrap = document.createElement("div");
      wrap.className = "faq-more-wrap";
      wrap.innerHTML = `<button class="btn btn-ghost faq-more-btn" type="button">Ver mais</button>`;
      wrap.querySelector("button").addEventListener("click", function() {
        faq.querySelectorAll(".faq-hidden").forEach(el => el.classList.remove("faq-hidden"));
        wrap.remove();
      });
      faq.after(wrap);
    }
  }
}

function initTabs() {
  const buttons = [...document.querySelectorAll(".tab-btn")];
  const panels = {
    club: document.getElementById("tab-club"),
    faq: document.getElementById("tab-faq"),
    sobre: document.getElementById("tab-sobre"),
  };
  if (!buttons.length) return;
  buttons.forEach((btn) => btn.addEventListener("click", () => {
    const key = btn.dataset.tab;
    buttons.forEach((b) => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
    });
    Object.entries(panels).forEach(([k, p]) => {
      if (!p) return;
      const on = k === key;
      p.classList.toggle("active", on);
      p.hidden = !on;
    });
  }));
}

/* ------------------------------------------------------------
   MENU MOBILE (portado de script.js)
   ------------------------------------------------------------ */
function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const header = document.getElementById("topo");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }
  // Header ganha fundo sólido ao rolar
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver — base) + GSAP se disponível
   ------------------------------------------------------------ */
function initReveal() {
  // Reveal por scroll + getBoundingClientRect (robusto: não depende de IntersectionObserver,
  // que pode não disparar em alguns renderers). Conteúdo nunca fica preso invisível.
  let items = [...document.querySelectorAll(".reveal")];

  const revealEl = (el) => {
    if (el.classList.contains("in")) return;
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const idx = sibs.indexOf(el);
    if (idx > 0 && !reduceMotion) el.style.transitionDelay = (idx * 0.07).toFixed(2) + "s";
    el.classList.add("in");
  };

  let ticking = false;
  const check = () => {
    ticking = false;
    const vh = window.innerHeight;
    items = items.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) { revealEl(el); return false; }
      return true;
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  check(); // passada inicial (revela o que já está na viewport)
  // Rede de segurança: se algo não foi alcançado, revela após 4s (nunca esconde conteúdo)
  setTimeout(() => { items.forEach(revealEl); items = []; }, 4000);
}


/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */
function initHeroReel() {
  if (reduceMotion) return;
  const row1El = document.getElementById("hr-row1");
  const row2El = document.getElementById("hr-row2");
  if (!row1El || !row2El) return;

  const srcs = (PRODUCTS["fabrica-criativa"]?.reel || []).map(r => r.src).filter(Boolean);
  if (!srcs.length) return;

  const makeItem = (src) => {
    const div = document.createElement("div");
    div.className = "hr-item";
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsinline = true; v.src = src;
    div.appendChild(v);
    return div;
  };

  // Dois sets duplicados por linha (para o loop contínuo funcionar com translateY(-50%))
  const half = Math.ceil(srcs.length / 2);
  const row1Srcs = srcs.slice(0, half);
  const row2Srcs = srcs.slice(half).concat(srcs.slice(0, half - srcs.slice(half).length || 1));

  [...row1Srcs, ...row1Srcs].forEach(src => row1El.appendChild(makeItem(src)));
  [...row2Srcs, ...row2Srcs].forEach(src => row2El.appendChild(makeItem(src)));

  // IntersectionObserver para play/pause eficiente
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      e.target.querySelectorAll("video").forEach(v => e.isIntersecting ? v.play().catch(() => {}) : v.pause());
    });
  }, { threshold: 0.1 });
  [row1El, row2El].forEach(el => obs.observe(el));
}

/* ---- Atendimento WhatsApp · 2 modelos (IA vs Humano) ---- */
function renderAtendimento() {
  const el = document.getElementById("atendimento-mount");
  if (!el) return;
  el.innerHTML = `
  <section class="section atend-sec" aria-label="Modelos de atendimento">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Cérebro WhatsApp</span>
        <h2>Prefere um humano ou uma IA<br>atendendo seus clientes?</h2>
        <p class="lede">Os dois funcionam. A LORDS entrega os dois. Você escolhe.</p>
      </div>
      <div class="atend-grid reveal">
        <div class="atend-card">
          <div class="atend-chip atend-chip--ia">Agente IA · 24h</div>
          <div class="atend-phone">
            <div class="atend-phone-bar"></div>
            <div class="atend-wa">
              <div class="atend-msg atend-msg--in">Tem horário essa semana?</div>
              <div class="atend-msg atend-msg--out">Olá! Temos quinta 15h e sexta 10h. Qual prefere?</div>
              <div class="atend-msg atend-msg--in">Quinta 15h!</div>
              <div class="atend-msg atend-msg--out">Perfeito! Reservado. Você receberá um lembrete 1h antes.</div>
              <div class="atend-badge">respondido em 2 segundos</div>
            </div>
          </div>
          <p class="atend-label">Zero espera. Zero custo de funcionário.<br>Atende às 2h da manhã sem reclamar.</p>
        </div>
        <div class="atend-divider" aria-hidden="true"><span>ou</span></div>
        <div class="atend-card">
          <div class="atend-chip atend-chip--human">Atendente real</div>
          <div class="atend-phone">
            <div class="atend-phone-bar"></div>
            <div class="atend-wa">
              <div class="atend-msg atend-msg--in">Oi, tem horário essa semana?</div>
              <div class="atend-msg atend-msg--out atend-msg--short">Oi! Tem sim.</div>
              <div class="atend-audio"><span class="atend-audio-bar"></span><span class="atend-audio-time">0:08</span></div>
              <div class="atend-msg atend-msg--in">Quinta 15h, perfeito</div>
              <div class="atend-msg atend-msg--out atend-msg--short">Fechado!</div>
              <div class="atend-badge atend-badge--human">✓ conexão humana real</div>
            </div>
          </div>
          <p class="atend-label">Empatia que fecha. Voz que transmite confiança.<br>Conversão que uma IA ainda não faz sozinha.</p>
        </div>
      </div>
      <div class="atend-cta reveal">
        <a class="btn btn-primary" href="produto.html?p=cerebro-whatsapp">Ver o Cérebro WhatsApp →</a>
      </div>
    </div>
  </section>`;
}

/* ---- Planos da Fábrica Criativa na home ---- */
function renderPlansHome() {
  const el = document.getElementById("plans-home-mount");
  if (!el) return;
  const fc = PRODUCTS["fabrica-criativa"];
  if (!fc || !fc.plans) return;
  const planCard = (p, i) => `
    <div class="phome-card${p.highlight ? " phome-card--dest" : ""}">
      ${p.highlight ? `<div class="phome-badge">Mais escolhido</div>` : ""}
      <h3 class="phome-name">${p.name}</h3>
      <p class="phome-price">R$ ${Number(p.price).toLocaleString("pt-BR")}<small>/mês</small></p>
      <ul class="phome-itens">
        ${(p.groups?.flatMap(g => g.items) || []).slice(0, 4).map(it => `<li>${it}</li>`).join("")}
      </ul>
      <a class="btn ${p.highlight ? "btn-primary" : "btn-ghost"}" href="fabrica-criativa.html#planos">Ver plano completo →</a>
    </div>`;
  el.innerHTML = `
  <section class="section plans-home-sec" id="planos-home" aria-label="Planos da Fábrica Criativa">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker kicker-gold">Fábrica Criativa</span>
        <h2>Escolha o plano certo para o seu momento.</h2>
        <p class="lede">Do primeiro conteúdo até a operação completa com comunicadora exclusiva.</p>
      </div>
      <div class="phome-grid reveal">
        ${fc.plans.map(planCard).join("")}
      </div>
    </div>
  </section>`;
}

/* ---- Estúdio ou seu local ---- */
function renderEstudio() {
  const el = document.getElementById("estudio-mount");
  if (!el) return;
  const files = MEDIA["estudio"] || [];
  const items = files.map(f => {
    const isVid = /\.(mp4|mov)$/i.test(f);
    const enc = encodeURIComponent(f);
    return isVid
      ? `<video class="est-reel-item" data-src="assets/estudio/${enc}" muted loop playsinline></video>`
      : `<img class="est-reel-item" src="assets/estudio/${enc}" alt="Estúdio LORDS" loading="lazy">`;
  }).join("");
  el.innerHTML = `
  <section class="section estudio-sec2" aria-label="Estúdio ou local do cliente">
    <div class="container">
      <div class="estudio2-copy reveal">
        <span class="kicker">Produção profissional</span>
        <h2>Gravamos no estúdio<br>ou no seu local.</h2>
        <p class="lede">Câmera, luz e direção profissional, no nosso estúdio em Itajaí ou onde o seu negócio vive, em BC e região e na Grande Florianópolis.</p>
        <div class="estudio2-chips">
          <span class="estudio2-chip">Captação no local sem taxa de deslocamento</span>
          <span class="estudio2-chip">Câmera, direção e edição incluídas</span>
        </div>
      </div>
    </div>
    <div class="est2-reel-wrap">
      <div class="est2-reel-inner">${items}${items}</div>
    </div>
  </section>`;
}

/* ---- Nichos (dado reaproveitado da Fábrica): "ache o seu mercado" ---- */
function nicheCard(n) {
  const vid = (n.media || []).find((m) => m.src && m.type === "video");
  const media = vid
    ? `<video class="nicho-vid" muted loop playsinline preload="none" data-src="${vid.src}"></video>`
    : `<div class="nicho-ph"><span class="nicho-ph-ic">${n.icon}</span><span class="nicho-ph-soon">Em breve</span></div>`;
  return `<article class="nicho-card${vid ? "" : " is-soon"}">
    <div class="nicho-media">${media}<span class="nicho-badge">${n.icon} ${n.name}</span></div>
    <p class="nicho-ex">${n.example}</p>
  </article>`;
}
function renderNichos() {
  const mount = document.getElementById("nichos-rail");
  if (!mount) return;
  const niches = NICHES_HOME || [];
  const hasVid = (n) => (n.media || []).some((m) => m.src && m.type === "video");
  const ordered = [...niches.filter(hasVid), ...niches.filter((n) => !hasVid(n))];
  mount.innerHTML = `<div class="nichos-track">${ordered.map(nicheCard).join("")}</div>`;
}

/* ---- Vitrine real: fotos + vídeos correndo (reaproveita padrão .ps-row) ---- */
function renderReelReal() {
  const mount = document.getElementById("reel-real-mount");
  if (!mount) return;

  // vídeos: round-robin dos nichos da home
  const byNicho = (NICHES_HOME || [])
    .map(n => (n.media || []).filter(m => m.src && m.type === "video"))
    .filter(a => a.length);
  const vids = [];
  const maxLen = Math.max(0, ...byNicho.map(a => a.length));
  for (let i = 0; i < maxLen; i++) for (const a of byNicho) if (a[i]) vids.push(a[i]);
  const vHalf = Math.ceil(vids.length / 2);
  const v1 = vids.slice(0, vHalf).map(m =>
    `<div class="ps-item ps-item--video"><video muted loop playsinline preload="none" data-src="${m.src}"></video></div>`).join("");
  const v2 = vids.slice(vHalf).map(m =>
    `<div class="ps-item ps-item--video"><video muted loop playsinline preload="none" data-src="${m.src}"></video></div>`).join("");

  // fotos
  const photos = PHOTO_REEL || [];
  const pHalf = Math.ceil(photos.length / 2);
  const p1 = photos.slice(0, pHalf).map(ph =>
    `<div class="ps-item"><img src="${ph.src}" alt="${ph.alt}" loading="lazy"></div>`).join("");
  const p2 = photos.slice(pHalf).map(ph =>
    `<div class="ps-item"><img src="${ph.src}" alt="${ph.alt}" loading="lazy"></div>`).join("");

  const COMPARE_WORDS = ["a LORDS", "resultado", "consistência", "quem executa", "o melhor"];

  mount.innerHTML = `
    <div class="ps-row ps-row--fwd"><div class="ps-inner">${v1}${v1}</div></div>
    <div class="ps-row ps-row--rev"><div class="ps-inner">${v2}${v2}</div></div>
    <div class="container ps-sub-head">
      <h2 class="prod-h2 ps-compare-head">
        <span>Quem compara escolhe</span><br>
        <span class="ps-word-wrap" aria-live="polite" aria-label="${COMPARE_WORDS[0]}">
          <span class="ps-word-track">${COMPARE_WORDS.map(w => `<span class="ps-word-item">${w}.</span>`).join("")}</span>
        </span>
      </h2>
    </div>
    <div class="ps-row ps-row--fwd"><div class="ps-inner">${p1}${p1}</div></div>
    <div class="ps-row ps-row--rev"><div class="ps-inner">${p2}${p2}</div></div>`;

  if (!reduceMotion) {
    let idx = 0;
    const track = mount.querySelector(".ps-word-track");
    const wrap = mount.querySelector(".ps-word-wrap");
    setInterval(() => {
      idx = (idx + 1) % COMPARE_WORDS.length;
      if (track) track.style.transform = `translateY(-${idx * 1.25}em)`;
      if (wrap) wrap.setAttribute("aria-label", COMPARE_WORDS[idx]);
    }, 2200);
  }
}

/* ---- Lazy play/pause dos vídeos das esteiras de mídia (nichos + vitrine real) ---- */
function initMediaReels() {
  const items = document.querySelectorAll("video[data-src]");
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (!v.src && e.isIntersecting) v.src = v.dataset.src;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.1 });
  items.forEach((v) => obs.observe(v));
}

/* ---- Esteiras controláveis: auto-avanço + pausa no hover + arrastar (mouse/touch) ---- */
function initControlledReel(container, { speed = 0.4, reverse = false, auto = true, loop = true } = {}) {
  if (!container) return;
  let paused = false, dragging = false, moved = 0, startX = 0, startScroll = 0;

  const half = () => container.scrollWidth / 2; // conteúdo é duplicado quando loop
  const setStart = () => { if (loop && reverse && auto && !reduceMotion) container.scrollLeft = half(); };
  setStart();
  window.addEventListener("load", setStart);

  const wrap = () => {
    if (!loop) return;
    const h = half();
    if (h <= 0) return;
    if (container.scrollLeft >= h) container.scrollLeft -= h;
    else if (container.scrollLeft <= 0) container.scrollLeft += h;
  };

  if (auto && !reduceMotion) {
    const tick = () => {
      if (!paused && !dragging && !document.hidden) {
        container.scrollLeft += reverse ? -speed : speed;
        wrap();
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // pausa no hover (desktop)
  container.addEventListener("mouseenter", () => { paused = true; });
  container.addEventListener("mouseleave", () => { paused = false; });

  // arrastar para controlar (pointer = mouse + touch)
  container.addEventListener("pointerdown", (e) => {
    dragging = true; moved = 0; startX = e.clientX; startScroll = container.scrollLeft;
    container.classList.add("is-dragging");
    try { container.setPointerCapture(e.pointerId); } catch (_) {}
  });
  container.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    container.scrollLeft = startScroll - dx;
    wrap();
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    container.classList.remove("is-dragging");
    try { container.releasePointerCapture(e.pointerId); } catch (_) {}
  };
  container.addEventListener("pointerup", endDrag);
  container.addEventListener("pointercancel", endDrag);
  // um arrasto não deve virar clique nos cards/links
  container.addEventListener("click", (e) => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
  }, true);
}

function renderHubReel() {
  const mount = document.getElementById("hub-track");
  if (!mount) return;
  mount.parentElement.outerHTML = buildHubMockupHTML("hub-mockup-home");
  initHubMockup(document.querySelector(".hub-mockup-wrap"));
}

function renderCobertura() {
  const mount = document.getElementById("cobertura-mount");
  if (!mount) return;
  const cities = [
    { f: "balneario-camboriu.jpg", label: "Balneário Camboriú" },
    { f: "itajai.jpg", label: "Itajaí" },
    { f: "itapema.jpg", label: "Itapema" },
    { f: "navegantes.jpg", label: "Navegantes" },
    { f: "porto-belo.jpg", label: "Porto Belo" },
    { f: "florianopolis.jpg", label: "Florianópolis" },
  ];
  const base = "cobertura";
  const row = cities.map(c => `
    <div class="cob-item">
      <img src="assets/${base}/${c.f}" alt="${c.label}" loading="lazy">
      <span class="cob-label">${c.label}</span>
    </div>`).join("");
  mount.innerHTML = `
    <div class="cob-reel"><div class="cob-reel-inner">${row}${row}</div></div>`;
}


function initReels() {
  document.querySelectorAll("#reel-real-mount .ps-row").forEach((row) =>
    initControlledReel(row, { speed: 0.4, reverse: row.classList.contains("ps-row--rev") }));
  initControlledReel(document.querySelector(".est-reel"), { speed: 0.5 });
  initControlledReel(document.querySelector(".hub-reel"), { speed: 0.35 });
  initControlledReel(document.querySelector(".jornada-reel"), { speed: 0.4 });
  // nichos = carrossel de navegação: só arrastar (sem auto-avanço e sem wrap)
  initControlledReel(document.querySelector(".nichos-rail"), { auto: false, loop: false });
}

/* ---- Cursor customizado animado (desktop; off em touch/reduced-motion) ---- */
function initCursor() {
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (!fine || reduceMotion) return;
  const dot = document.createElement("div"); dot.className = "cursor-dot";
  const line = document.createElement("div"); line.className = "cursor-line idle";
  document.body.append(dot, line);
  document.body.classList.add("has-cursor");

  let mx = innerWidth / 2, my = innerHeight / 2, prevX = mx, prevY = my;
  let angle = 0, idleTimer;

  addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    prevX = mx; prevY = my;
    mx = e.clientX; my = e.clientY;
    const dx = mx - prevX, dy = my - prevY;
    if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
      angle = Math.atan2(dy, dx);
      line.classList.remove("idle");
    }
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    line.style.transform = `translate(${mx}px, ${my}px) rotate(${angle}rad)`;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => line.classList.add("idle"), 120);
  }, { passive: true });

  const hoverSel = "a, button, .pcard, .nicho-card, [data-action], .vdot, .tab-btn";
  addEventListener("pointerover", (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.add("cursor-hover");
  });
  addEventListener("pointerout", (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.remove("cursor-hover");
  });
  addEventListener("pointerdown", () => document.body.classList.add("cursor-down"));
  addEventListener("pointerup", () => document.body.classList.remove("cursor-down"));
}


/* ---- Hero com vídeo/fotos em abas (últimos 10 s de cada vídeo) ---- */
/* ------------------------------------------------------------
   NOSSOS SERVIÇOS (home)
   ------------------------------------------------------------ */
function renderServicosHome() {
  const el = document.getElementById("servicos-home");
  if (!el) return;

  /* Sem número oficial de WhatsApp ainda (decisão 27/09/2026): o pedido vai pelo diagnóstico. */
  const checkout = (id) => `fabrica-criativa.html?checkout=avulso:${encodeURIComponent(id)}`;

  const svcHTML = SERVICOS_AVULSOS.map(s => {
    const mediaHTML = s.imgs
      ? `<div class="avulso-icon avulso-icon--fotos">${s.imgs.map(src => `<img src="${src}" alt="${s.name}" class="avulso-foto" loading="lazy">`).join("")}</div>`
      : `<div class="avulso-icon">${s.icon}</div>`;
    return `
  <article class="avulso-card">
    ${mediaHTML}
    <strong class="avulso-name">${s.name}</strong>
    <p class="avulso-tagline">${s.tagline}</p>
    <span class="avulso-list-label">Formatos</span>
    <ul class="avulso-list">${s.formatos.map(f => `<li>${f}</li>`).join("")}</ul>
    <span class="avulso-list-label">O que inclui</span>
    <ul class="avulso-list">${s.entrega.map(e => `<li>${e}</li>`).join("")}</ul>
    ${s.exclusao ? `<p class="avulso-excl">⚠ ${s.exclusao}</p>` : ""}
    ${s.preco ? `<p class="avulso-preco">${s.preco}</p>` : ""}
    <div class="avulso-cta">
      <a class="btn btn-primary btn-cta" href="${checkout(s.id)}">Quero contratar →</a>
    </div>
  </article>`;
  }).join("");

  el.innerHTML = `
  <div class="container">
    <div class="section-head reveal">
      <span class="kicker">Serviços Avulsos</span>
      <h2>Contrate sem plano.<br>Pague só o que precisar.</h2>
      <p class="lede">Produções pontuais sem mensalidade.</p>
    </div>
    <div class="avulso-grid reveal">${svcHTML}</div>
  </div>`;
}

function renderAberturaHome() {
  const mount = document.getElementById("abertura-mount");
  if (!mount) return;
  mount.outerHTML = renderAbertura({ vslSrc: "assets/videos/hero/sequencia-01-1.mp4" });
  const passos = document.getElementById("passos-mount");
  if (passos) passos.outerHTML = renderPassos();
  initAbertura(document);
}

function boot() {
  renderAberturaHome();
  renderNichos();
  mountAgents(document.getElementById("agentes-mount-home"));
  renderEstudio();
  renderHubReel();
  renderCobertura();
  renderReelReal();
  renderServicosHome();
  renderExplore();
  initNav();
  initEnquete();
  initTabs();
  initReveal();
  fixLoops(document);
  initMediaReels();
  initReels();
  initCursor();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
