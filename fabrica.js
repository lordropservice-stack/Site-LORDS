/* ============================================================
   LORDS — fabrica.js · Página de vendas da Fábrica Criativa
   Briefing v5.0 (ago/2026) é a fonte de verdade. Nenhum preço,
   entrega ou promessa fora do briefing.
   Estrutura (02/08): 1 Hero+Reel · 2 Logo carousel · 3 VSL ·
   4 Nichos horizontal · 5 Objeções · 6 Planos+bumps · 7 Excedente ·
   8 Prova social (bloqueada) · 9 Tecnologia · 10 FAQ · 11 Fechamento
   ============================================================ */
import { PRODUCTS, PHOTO_REEL, COBERTURA_MEDIA, renderMockup, HUB_SCREENS, MEDIA, METODO_LORDS } from "./products-data.js?v=20260927b";
import { mountAgents } from "./agents.js?v=20260815b";
import { initEnquete, openEnquete } from "./enquete.js?v=20260927a";


function sAgents() {
  return `
  <section class="section agentes-sec" id="agentes" aria-label="Agentes de IA trabalhando">
    <div class="container">
      <div class="fc-vsl-intro">
        <span class="fc-label">Operação com IA</span>
        <h2 class="prod-h2">Eles trabalham sem parar. Você só recebe o resultado.</h2>
        <p class="lede center">Estrategista, roteirista, WhatsApp e mais — rodando todo dia pela sua marca.</p>
      </div>
      <div id="agentes-mount"><!-- injetado via agents.js --></div>
    </div>
  </section>`;
}

/* renderJourney/initEsteira arquivados — esteira vertical substituída pelo carrossel de nichos.
   Código preservado em journey.js e dados em products-data.js (journey{} comentado). */

/* ⏳ PENDENTE: número do WhatsApp (o fundador providencia).
   Formato: "5547XXXXXXXXX". Enquanto vazio, os CTAs caem no Calendly. */
const WHATSAPP_NUM = "";
const CALENDLY_URL = "https://calendly.com/lordropservice/30min";

const SLUG = "fabrica-criativa";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = (n) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);

/* ============================================================
   SEÇÕES
   ============================================================ */

function sHero(p) {
  const primaryBtn = p.ctaPrimary
    ? `<button class="btn btn-primary btn-cta" data-action="diagnostico">${p.ctaPrimary}</button>`
    : "";
  return `
  <section class="prod-hero fc-hero">
    <video class="fc-hero-main" id="fc-hero-main" muted loop playsinline></video>
    <div class="fc-hero-overlay" aria-hidden="true"></div>
    <div class="container fc-hero-content">
      <h1 class="fc-h1 fc-h1--brand">${p.heroHook || p.hook}</h1>
      ${p.heroSub ? `<p class="fc-hero-sub">${p.heroSub}</p>` : ""}
      ${p.heroTrio ? `<p class="fc-hero-trio">${p.heroTrio.join(" · ")}</p>` : ""}
      <div class="fc-cta-row">
        ${primaryBtn}
        <a class="btn btn-ghost fc-cta-solo" href="#portfolio">${p.ctaSecondary}</a>
      </div>
    </div>
    <div class="fc-scroll-hint" aria-hidden="true">SCROLL<span></span></div>
  </section>`;
}

/* items: [{ src, image }] — fatias aceitam vídeo OU foto (vertical). */
function initHeroBg(items) {
  if (!items.length || reduceMotion) return;
  const hero = document.querySelector(".fc-hero");
  const mainVid = document.getElementById("fc-hero-main");
  if (!hero || !mainVid) return;

  const videoSrcs = items.filter((it) => !it.image).map((it) => it.src);

  const N = 4;           // número de fatias no estado quad
  const QUAD_MS   = 4500; // duração do estado quad
  const SINGLE_MS = 4500; // duração do estado single (vídeo)
  const SLIDE_MS  = 500;
  const STAGGER   = 80;
  const TOTAL_ANIM = SLIDE_MS + (N - 1) * STAGGER + 120;

  let qIdx = 0; // primeiro item das fatias
  let vIdx = 0; // vídeo do estado single
  let layer = null;

  function makeSlice(i, item) {
    const slice = document.createElement("div");
    slice.className = "fc-slice";
    let el;
    if (item.image) {
      el = document.createElement("img");
      el.src = item.src; el.alt = ""; el.loading = "lazy";
    } else {
      el = document.createElement("video");
      el.muted = true; el.loop = true; el.playsinline = true; el.src = item.src;
      el.play().catch(() => {});
    }
    el.style.width = `${N * 100}%`;
    el.style.left  = `${-i * 100}%`;
    slice.appendChild(el);
    return slice;
  }

  function buildLayer(fromBelow) {
    const el = document.createElement("div");
    el.className = "fc-slices-layer";
    for (let i = 0; i < N; i++) {
      const s = makeSlice(i, items[(qIdx + i) % items.length]);
      s.style.transform = fromBelow ? "translateY(101%)" : "translateY(-105%)";
      el.appendChild(s);
    }
    hero.insertBefore(el, hero.querySelector(".fc-hero-overlay"));
    return el;
  }

  function animateIn(el) {
    const slices = el.querySelectorAll(".fc-slice");
    requestAnimationFrame(() => {
      slices.forEach((s, i) => {
        setTimeout(() => {
          s.style.transition = `transform ${SLIDE_MS}ms cubic-bezier(0.25,0.46,0.45,0.94)`;
          s.style.transform  = "translateY(0)";
        }, i * STAGGER);
      });
    });
  }

  function animateOut(el, toTop, cb) {
    const slices = el.querySelectorAll(".fc-slice");
    slices.forEach((s, i) => {
      setTimeout(() => {
        s.style.transition = `transform ${SLIDE_MS}ms cubic-bezier(0.55,0,1,0.45)`;
        s.style.transform  = toTop ? "translateY(-105%)" : "translateY(101%)";
      }, i * STAGGER);
    });
    setTimeout(cb, TOTAL_ANIM);
  }

  // Início: estado quad
  layer = buildLayer(true);
  animateIn(layer);

  function cycleToSingle() {
    // quad → single: fatias saem para cima
    animateOut(layer, true, () => {
      layer.remove();
      layer = null;
      // estado single é sempre VÍDEO (pula as fotos)
      if (videoSrcs.length) {
        mainVid.src = videoSrcs[vIdx % videoSrcs.length];
        mainVid.play().catch(() => {});
        vIdx++;
      }
      setTimeout(cycleToQuad, SINGLE_MS);
    });
  }

  function cycleToQuad() {
    qIdx = (qIdx + N) % items.length;
    layer = buildLayer(true);
    animateIn(layer);
    setTimeout(cycleToSingle, QUAD_MS);
  }

  setTimeout(cycleToSingle, QUAD_MS);

  const hint = document.querySelector(".fc-scroll-hint");
  if (hint) window.addEventListener("scroll", () => { hint.style.opacity = "0"; }, { once: true });
}

function sLogoCarousel(p) {
  const logos = p.logoReel || [];
  const items = logos.map((l) =>
    l.src
      ? `<div class="fc-logo-item"><img src="${l.src}" alt="${l.name}" loading="lazy" /></div>`
      : `<div class="fc-logo-item"><span class="fc-logo-placeholder">${l.name}</span></div>`
  ).join("");
  const doubled = items + items; // duplica pra loop infinito
  return `
  <section class="fc-logos" aria-label="Portfólio dos nossos profissionais">
    <p class="fc-logos-label">Portfólio dos nossos profissionais</p>
    <div class="fc-logos-track" aria-hidden="true">
      <div class="fc-logos-inner">${doubled}</div>
    </div>
  </section>`;
}

function sVsl(p) {
  const v = p.vsl;

  const pillarsHtml = (v.pillars || []).map((pl) => `
    <div class="fc-vsl-pillar">
      <span class="fc-vsl-pillar-icon">${pl.icon}</span>
      <h3 class="fc-vsl-pillar-title">${pl.title}</h3>
      <p class="fc-vsl-pillar-body">${pl.body}</p>
    </div>`).join("");

  return `
  <section class="section fc-vsl" id="vsl">
    <div class="container">
      <div class="fc-vsl-intro">
        <span class="fc-label">Assista ao vídeo</span>
        <h2 class="prod-h2">Conheça a Fábrica Criativa</h2>
      </div>
      <div class="fc-player" id="fc-player">
        <video id="fc-video" src="${v.src}" muted autoplay loop playsinline preload="none" poster=""></video>
        <button class="fc-sound" id="fc-sound" aria-pressed="false">Ativar som</button>
      </div>
      <p class="fc-player-cap">${v.caption}</p>

      ${pillarsHtml ? `
      <div class="fc-vsl-pillars">
        ${pillarsHtml}
      </div>` : ""}
    </div>
  </section>`;
}

function sOrgChart(p) {
  const o = p.orgChart;
  return `
  <section class="section fc-dark-block" id="conta">
    <div class="container">
      <span class="fc-label">${o.label}</span>
      <h2 class="prod-h2">${o.title}</h2>
      <div class="org-grid">
        ${o.roles.map((r) => `
        <div class="org-card reveal">
          <span class="org-role">${r.role}</span>
          <span class="org-cost" data-count="${r.cost}">R$ 0</span>
        </div>`).join("")}
      </div>
      <div class="org-totals">
        <div class="org-total"><small>Total em salários</small><strong data-count="${o.total}">R$ 0</strong></div>
        <div class="org-total big"><small>Com encargos (~70%)</small><strong data-count="${o.withCharges}">R$ 0</strong></div>
      </div>
      <p class="org-note">${o.note}</p>
      <p class="org-kicker">${o.kicker}</p>
    </div>
  </section>`;
}

function sAgency(p) {
  const a = p.agencyQuotes;
  return `
  <section class="section" id="agencia">
    <div class="container">
      <span class="fc-label">${a.label}</span>
      <h2 class="prod-h2">${a.title}</h2>
      <div class="quotes">
        ${a.quotes.map((q) => `<p class="quote reveal">“${q}”</p>`).join("")}
      </div>
      <p class="fc-close">${a.close}</p>
    </div>
  </section>`;
}

function sComparison(p) {
  const c = p.comparison;
  return `
  <section class="section" id="comparativo">
    <div class="container">
      <h2 class="prod-h2 center">${c.title}</h2>
      <div class="cmp-scroll">
        <table class="cmp">
          <thead><tr><th></th>${c.cols.map((h, i) => `<th${i === c.cols.length - 1 ? ' class="on"' : ""}>${h}</th>`).join("")}</tr></thead>
          <tbody>
            ${c.rows.map((r) => `
            <tr>
              <th scope="row">${r.label}</th>
              ${r.cells.map((cell, i) => `<td${i === r.cells.length - 1 ? ' class="on"' : ""}>${cell}</td>`).join("")}
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="cmp-note">${c.note}</p>
    </div>
  </section>`;
}

function sTurn(p) {
  const t = p.turn;
  return `
  <section class="section" id="virada">
    <div class="container">
      <span class="fc-label">${t.label}</span>
      <h2 class="prod-h2">${t.title}</h2>
      <p class="lede">${t.lede}</p>
      <ul class="turn-list">
        ${t.points.map((pt) => `<li class="reveal">${pt}</li>`).join("")}
      </ul>
    </div>
  </section>`;
}

function sPortfolio(p) {
  // ── Vídeos: intercala nichos (round-robin) para variedade visual ──
  const byNicho = (p.niches || [])
    .map(n => (n.media || []).filter(m => m.src && m.type === "video"))
    .filter(arr => arr.length > 0);
  const allVideos = [];
  const maxLen = Math.max(...byNicho.map(a => a.length), 0);
  for (let i = 0; i < maxLen; i++) {
    for (const arr of byNicho) { if (arr[i]) allVideos.push(arr[i]); }
  }
  const vHalf = Math.ceil(allVideos.length / 2);
  const vRow1 = allVideos.slice(0, vHalf);
  const vRow2 = allVideos.slice(vHalf);
  const makeVideoItems = (arr) => arr.map(m =>
    `<div class="ps-item ps-item--video"><video muted loop playsinline preload="none" data-src="${m.src}"></video></div>`
  ).join("");
  const v1 = makeVideoItems(vRow1);
  const v2 = makeVideoItems(vRow2);

  // ── Fotos ──
  const photos = p.photoReel || [];
  const pHalf = Math.ceil(photos.length / 2);
  const pRow1 = photos.slice(0, pHalf);
  const pRow2 = photos.slice(pHalf);
  const makePhotoItems = (arr) => arr.map(ph =>
    `<div class="ps-item"><img src="${ph.src}" alt="${ph.alt}" loading="lazy"></div>`
  ).join("");
  const p1 = makePhotoItems(pRow1);
  const p2 = makePhotoItems(pRow2);

  return `
  <section class="ps-section portfolio-section" id="portfolio" aria-label="Portfólio">
    <div class="container ps-head">
      <h2 class="prod-h2">Conteúdo que encanta,<br>conecta e converte.</h2>
    </div>
    <div class="ps-row ps-row--fwd"><div class="ps-inner">${v1}${v1}</div></div>
    <div class="ps-row ps-row--rev"><div class="ps-inner">${v2}${v2}</div></div>
    <div class="container ps-sub-head">
      <h2 class="prod-h2">Quem compara<br>escolhe a LORDS.</h2>
    </div>
    <div class="ps-row ps-row--fwd"><div class="ps-inner">${p1}${p1}</div></div>
    <div class="ps-row ps-row--rev"><div class="ps-inner">${p2}${p2}</div></div>
    <div class="container ps-cta-row">
      <a class="btn btn-primary btn-cta" href="#planos">Quero conhecer os planos</a>
    </div>
  </section>`;
}

function sObjections(p) {
  return `
  <section class="section" id="objecoes">
    <div class="container">
      <h2 class="prod-h2 center">Perguntas que todo mundo faz</h2>
      <div class="acc">
        ${p.objections.map((o) => `
        <details class="acc-item">
          <summary>${o.q}</summary>
          <div class="acc-body"><p>${o.a}</p></div>
        </details>`).join("")}
      </div>
    </div>
  </section>`;
}

/* Adicionais de um plano, do mais caro para o mais barato.
   Ordenar aqui (e não na mão em products-data.js) garante que mexer num preço
   reordena a lista sozinho, nos três lugares que mostram bumps. */
function bumpsDoPlano(p, planId) {
  return [...(p.bumps[planId] || [])].sort((a, b) => b.price - a.price);
}

/* Um bump com `requires` só vale se o bump exigido estiver selecionado. */
function bumpLiberado(b, selecionados) {
  return !b.requires || selecionados.has(b.requires);
}

/* ---- Seção 10: planos + order bumps com total ao vivo ---- */
function sMetodoLords() {
  const m = METODO_LORDS;
  if (!m) return "";
  return `
  <section class="section metodo-sec" id="metodo" aria-label="Método LORDS">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">${m.kicker}</span>
        <h2>${m.title}</h2>
        <p class="lede">${m.lede}</p>
      </div>
      <ol class="metodo-steps">
        ${m.steps.map((st) => `
        <li class="metodo-step reveal">
          <span class="metodo-step-n">${st.n}</span>
          <h3>${st.t}</h3>
          <p>${st.d}</p>
        </li>`).join("")}
      </ol>
      <p class="metodo-note">${m.note}</p>
    </div>
  </section>`;
}

function sPlans(p) {
  function planCard(pl) {
    // Itens em comum primeiro (mesma redação nos dois planos), depois o que
    // só este plano tem — marcado com "+" dourado em vez do "✓" roxo.
    const body = pl.groups
      ? pl.groups.map((g) => `
          <div class="plan-group">
            <span class="plan-group-title">${g.title}</span>
            <ul>
              ${g.items.map((i) => `<li>${i}</li>`).join("")}
              ${(g.extras || []).map((i) => `<li class="plan-extra">${i}</li>`).join("")}
            </ul>
          </div>`).join("")
      : `<ul class="plan-list">${pl.includes.map((i) => `<li>${i}</li>`).join("")}</ul>`;

    const bumps = bumpsDoPlano(p, pl.id);
    const bumpsHtml = bumps.length ? `
      <div class="plan-bumps-block">
        <p class="plan-bumps-title">Adicione ao plano:</p>
        <div class="plan-bumps">${bumps.map((b) => `<span class="plan-bump">+ ${b.name}</span>`).join("")}</div>
      </div>` : "";

    return `
    <div class="plan${pl.hero ? " plan-destaque" : ""} reveal" data-plan="${pl.id}" data-price="${pl.price}">
      ${pl.flag ? `<span class="plan-flag">${pl.flag}</span>` : ""}
      <span class="plan-name">${pl.name}</span>
      <p class="plan-hook">${pl.hook}</p>
      <div class="plan-price">
        ${pl.priceFrom ? `<s>${fmt(pl.priceFrom)}</s>` : ""}
        <b>${fmt(pl.price)}</b><small>${pl.unit}</small>
      </div>
      <div class="plan-meta">
        <span><i>Rosto</i>${pl.face}</span>
        <span><i>Captação</i>${pl.meetings}</span>
        <span><i>Entrega</i>${pl.videos}</span>
      </div>
      ${body}
      ${bumpsHtml}
      <p class="plan-modality">${pl.modality}</p>
      <button class="btn btn-primary" data-action="flow" data-entry="plano" data-plan="${pl.id}">Quero o ${pl.short}</button>
    </div>`;
  }

  /* A tabela "Os dois lado a lado" (p.planCompare) saiu em 02/08/2026:
     com as listas dos dois planos espelhadas, ela repetia a mesma
     comparação com outras palavras. Dado preservado em products-data.js. */
  return `
  <section class="section" id="planos">
    <div class="container">
      <h2 class="prod-h2 center">Nossos Planos</h2>
      <p class="lede center plan-question">Você quer aparecer na câmera — ou prefere que a gente coloque um rosto na sua marca?</p>
      <div class="plans">${p.plans.map(planCard).join("")}</div>
      <p class="plans-foot">Contrato mínimo de 3 meses · uma empresa por nicho em cada cidade · comunicadora como rosto a partir do Creator · LORDS Hub no Creator e no Completo</p>
    </div>
  </section>`;
}

/* ---- Personalize o seu plano: order bumps e upsell abertos ----
   Antes os adicionais só apareciam como pílula no card e dentro do modal.
   Aqui eles ficam expostos com preço, para o cliente ver o que existe antes
   de falar com a gente. Clicar em "Quero este" abre o fluxo já com o plano
   e o adicional marcados. ---- */
function sPersonalize(p) {
  const abas = p.plans.map((pl, i) => `
    <button type="button" class="bump-tab${i === 0 ? " on" : ""}" data-pz-tab="${pl.id}" aria-pressed="${i === 0}">
      <strong>${pl.short}</strong>
      <small>${fmt(pl.price)}${pl.unit} · adicionais deste plano</small>
    </button>`).join("");

  const paineis = p.plans.map((pl, i) => `
    <div class="pz-panel${i === 0 ? " on" : ""}" data-pz-panel="${pl.id}">
      <div class="bumps-grid">
        ${bumpsDoPlano(p, pl.id).map((b) => {
          const exigido = b.requires ? (p.bumps[pl.id] || []).find((x) => x.id === b.requires) : null;
          const bumpsParaAbrir = exigido ? `${b.requires},${b.id}` : b.id;
          return `
        <div class="bump-card">
          <div class="bump-info">
            <strong>${b.name}</strong>
            ${exigido ? `<span class="bump-req">Só com ${exigido.name.toLowerCase()}</span>` : ""}
            <small>${b.desc}</small>
          </div>
          <div class="bump-side">
            <span class="bump-price">${fmt(b.price)}${b.recurring ? "<i>/mês</i>" : ""}${b.monthly ? `<i> + ${fmt(b.monthly)}/mês</i>` : ""}</span>
            <button type="button" class="bump-add" data-action="flow" data-entry="plano" data-plan="${pl.id}" data-bump="${bumpsParaAbrir}">Quero este +</button>
          </div>
        </div>`;
        }).join("")}
      </div>
    </div>`).join("");

  return `
  <section class="section fc-personalize" id="personalizar">
    <div class="container">
      <span class="fc-label center">Monte do seu jeito</span>
      <h2 class="prod-h2 center">Personalize o seu plano</h2>
      <p class="lede center">Nenhuma empresa é igual. Escolha o plano base e adicione só o que faz sentido pro seu momento — a gente fecha a combinação certa no diagnóstico.</p>

      <div class="bump-tabs" role="group" aria-label="Escolha o plano base">${abas}</div>
      ${paineis}

      <p class="pz-nota">Não achou o que precisa? A gente monta sob medida — é só falar com a equipe.</p>
    </div>
  </section>`;
}

/* ---- Onde atendemos: mapa da região pintando ao entrar na tela ----
   Desenho estilizado do litoral entre Navegantes e Porto Belo
   no interior. As posições vêm de p.coverage.cities (derivadas de lat/lon),
   então mexer nos números lá move o ponto no mapa. ---- */
function sNiches(p) {
  const niches = p.niches || [];
  if (!niches.length) return "";
  const hasVid = (n) => (n.media || []).some(m => m.src && m.type === "video");
  const ordered = [...niches.filter(hasVid), ...niches.filter(n => !hasVid(n))];
  const cards = ordered.map(n => {
    const vid = (n.media || []).find(m => m.src && m.type === "video");
    const img = (n.media || []).find(m => m.src && m.type === "image");
    const media = vid
      ? `<video class="nicho-vid" muted loop playsinline preload="none" data-src="${vid.src}"></video>`
      : img ? `<img src="${img.src}" alt="${n.name}" loading="lazy">` : "";
    return `<article class="nicho-card${n.soon ? " is-soon" : ""}">
      <div class="nicho-media">${media}</div>
      <span class="nicho-name">${n.name}</span>
    </article>`;
  }).join("");
  return `
  <section class="section nichos-sec" id="nichos" aria-label="Nichos atendidos">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Nichos</span>
        <h2>A LORDS já fala a língua do seu mercado.</h2>
        <p class="lede">Ache o seu — e veja o tipo de conteúdo que a gente já entrega.</p>
      </div>
    </div>
    <div class="nichos-rail" id="nichos-rail-fc">
      <div class="nichos-track">${cards}</div>
    </div>
  </section>`;
}

function sLogos() {
  const files = MEDIA["logos-parcerias"] || [];
  if (!files.length) return "";
  const items = files.map(f => `<div class="fc-logo-item"><img src="assets/logos-parcerias/${f}" alt="Parceiro" class="fc-logo-img"></div>`).join("");
  return `
  <section class="fc-logos" aria-label="Marcas que crescem com a LORDS">
    <p class="fc-logos-label">Marcas que crescem com a LORDS</p>
    <div class="fc-logos-track"><div class="fc-logos-inner">${items + items}</div></div>
  </section>`;
}

function sCoverage(p) {
  return `
  <section class="section fc-coverage" id="onde-atendemos">
    <div class="container">
      <span class="fc-label center">Onde atendemos</span>
      <h2 class="prod-h2 center">As praias e pontos turísticos onde a LORDS grava.</h2>
      <p class="lede center">Estúdio em Itajaí ou captação no seu local — Balneário Camboriú e região e Grande Florianópolis, sem taxa de deslocamento.</p>
    </div>
    ${sCoberturaReel()}
  </section>`;
}

/* Esteira de fotos/vídeos do local (pasta assets/cobertura : onde atendemos /). */
function sCoberturaReel() {
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
  return `
    <div class="cob-reel"><div class="cob-reel-inner">${row}${row}</div></div>`;
}

/* ---- Seção 11: "A promessa do excedente" — REMOVIDA da página (02/08/2026)
   Era uma frase solta depois dos planos e quebrava o ritmo entre o preço e a
   seção de personalização. O argumento continua valendo — virou munição oral
   pra conversa de fechamento. Dado preservado em products-data.js (surplus{}).

function sSurplus(p) {
  return `
  <section class="section">
    <div class="container">
      <div class="surplus reveal">
        <span class="fc-label">${p.surplus.title}</span>
        <p>${p.surplus.text}</p>
      </div>
    </div>
  </section>`;
}
---------------------------------------------------------------- */

/* ---- Seção 12: PROVA SOCIAL — BLOQUEADA ----
   Não publicar depoimento, logo, número ou case sem material real
   aprovado pelo fundador. Marcação mantida comentada de propósito.
   <section class="section" id="prova-social">
     <div class="container">
       <h2 class="prod-h2 center">Quem já confia na LORDS</h2>
       <div class="proof"> ... depoimentos e logos ... </div>
     </div>
   </section>
---------------------------------------------------------------- */

function sMethod(p) {
  const a = p.aiAgents;
  return `
  <section class="section fc-method" id="metodo">
    <div class="container">
      <span class="fc-label">Método, fluxo e inteligência</span>
      <h2 class="prod-h2 center">Não é inspiração. É processo.</h2>
      <p class="lede center">Cada cliente tem calendário editorial, fluxo de produção rastreado e agentes de IA monitorando resultado.</p>
      <div class="method-screens">
        <figure class="method-screen">
          <div class="method-screen-badge">Notion</div>
          <div class="method-screen-frame">
            <div class="media-soon">imagem em breve</div>
          </div>
          <figcaption>Calendário editorial — pautas, roteiros e aprovações num único espaço do cliente.</figcaption>
        </figure>
        <figure class="method-screen">
          <div class="method-screen-badge">ClickUp</div>
          <div class="method-screen-frame">
            <div class="media-soon">imagem em breve</div>
          </div>
          <figcaption>Fluxo de produção — roteiro → captação → edição → aprovação → publicação. Nada se perde.</figcaption>
        </figure>
      </div>
      <div class="method-agents">
        <div class="method-agents-label">
          <span class="fc-label">${a.label}</span>
          <h3 class="prod-h2">${a.title}</h3>
          <p class="lede">${a.lede}</p>
        </div>
        <div class="agents">
          ${a.items.map((i) => `
          <article class="agent reveal">
            <h4>${i.name}</h4>
            <p>${i.what}</p>
            <span class="agent-out">${i.out}</span>
          </article>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function sTech(p) {
  const a = p.aiAgents;
  return `
  <section class="section fc-dark-block" id="tecnologia">
    <div class="container">
      <span class="fc-label">${a.label}</span>
      <h2 class="prod-h2">${a.title}</h2>
      <p class="lede">${a.lede}</p>
      <div class="agents">
        ${a.items.map((i) => `
        <article class="agent reveal">
          <h3>${i.name}</h3>
          <p>${i.what}</p>
          <span class="agent-out">${i.out}</span>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function sFaq(p) {
  const faqBody = (f) => {
    if (f.type === "avulso") {
      const all = servicosAvulsos(p);
      const rows = all.map((s) =>
        `<li><strong>${s.name}:</strong> ${fmt(s.price)}${s.recurring ? "/mês" : ""}${s.monthly ? ` + ${fmt(s.monthly)}/mês manutenção` : ""} — ${s.desc}</li>`
      ).join("");
      return `<ul class="faq-avulso">${rows}</ul>`;
    }
    if (f.partnerCta) {
      const wamsg = encodeURIComponent("Olá! Quero me candidatar como parceiro LORDS. Minha especialidade: ");
      const href = WHATSAPP_NUM ? `https://wa.me/${WHATSAPP_NUM}?text=${wamsg}` : CALENDLY_URL;
      return `<p>${f.a}</p><a class="btn btn-ghost faq-cta" href="${href}" target="_blank" rel="noopener">Enviar candidatura</a>`;
    }
    return `<p>${f.a}</p>`;
  };

  const VISIBLE = 7;
  const items = p.faq.map((f, i) => `
        <details class="acc-item${i >= VISIBLE ? " faq-hidden" : ""}">
          <summary>${f.q}</summary>
          <div class="acc-body">${faqBody(f)}</div>
        </details>`).join("");
  const hasMore = p.faq.length > VISIBLE;

  return `
  <section class="section" id="faq">
    <div class="container">
      <h2 class="prod-h2 center">Dúvidas frequentes</h2>
      <div class="acc">
        ${items}
      </div>
      ${hasMore ? `<div class="faq-more-wrap"><button class="btn btn-ghost faq-more-btn" type="button" onclick="(function(btn){var hidden=btn.closest('#faq').querySelectorAll('.faq-hidden');hidden.forEach(function(el){el.classList.remove('faq-hidden')});btn.parentElement.remove()})(this)">Ver mais</button></div>` : ""}
    </div>
  </section>`;
}

/* ---- Serviços Avulsos: Cobertura · Comunicadora · Modelo ---- */
function sServicosAvulsos() {
  const waTxt = (svc) => encodeURIComponent(`Olá! Vi os serviços avulsos no site da LORDS e quero solicitar um orçamento para: ${svc}.`);
  const waHref = (svc) => WHATSAPP_NUM
    ? `https://wa.me/${WHATSAPP_NUM}?text=${waTxt(svc)}`
    : `${CALENDLY_URL}`;

  const svcCards = [
    {
      id: "comunicadora",
      icon: "🎙️",
      name: "Comunicadora",
      tagline: "O rosto e a voz da sua marca — do institucional ao UGC.",
      formatos: ["Comunicação institucional", "Criação de conteúdo UGC", "Criativos para redes sociais", "Reels e Stories", "Vídeos comerciais", "Campanhas e lançamentos"],
      entrega: ["Presença simples: gravação conduzida pelo cliente", "Pacote completo: roteiro LORDS + gravação + edição inclusa"],
      exclusao: "Disponibilidade sujeita a agenda.",
      direitos: "Direitos de uso do material produzido — combinar no orçamento.",
    },
    {
      id: "modelo",
      icon: null,
      imgs: ["assets/servicos-avulsos/modelo-isa.jpg", "assets/servicos-avulsos/modelo-jen.jpg"],
      name: "Modelo",
      tagline: "Presença visual profissional para ensaios, campanhas e passarelas.",
      formatos: ["Ensaios para marcas de moda", "Academias e fitness", "Ótica e beleza", "Maquiagem e cabelo", "Desfiles e passarelas", "Conteúdo de produto"],
      entrega: ["Participação em ensaio ou gravação", "Poses e direção de arte a combinar"],
      exclusao: "Edição e pós-produção não inclusas. Disponibilidade sujeita a agenda.",
      direitos: "Direitos de uso por campanha — especificar no orçamento.",
    },
    {
      id: "cobertura",
      icon: "🎥",
      name: "Cobertura de Eventos",
      tagline: "Foto e vídeo profissionais para registrar cada momento do seu evento.",
      formatos: ["Eventos eletrônicos", "Casamentos", "Aniversários", "Eventos corporativos", "Confraternizações", "Formaturas"],
      entrega: ["Captação profissional em foto e vídeo", "Organização e entrega dos arquivos", "Edição básica inclusa"],
      exclusao: "Edição avançada e motion disponíveis como adicional.",
      direitos: "Arquivos de uso exclusivo do cliente.",
    },
    {
      id: "fotografo",
      icon: "📸",
      name: "Fotógrafo",
      tagline: "Meia diária ou diária completa — no seu local ou no nosso estúdio.",
      formatos: ["Meia diária", "Diária completa", "Estúdio LORDS", "Local do cliente", "Cobertura de eventos"],
      entrega: ["Fotos em alta resolução", "Seleção e entrega dos melhores registros", "Arquivos tratados"],
      exclusao: "Número de fotos finais a combinar no orçamento.",
      direitos: "Arquivos de uso exclusivo do cliente.",
    },
    {
      id: "real-time",
      icon: "📡",
      name: "Videomaker Real Time",
      tagline: "Captação e edição no mesmo dia — entrega expressa ou ao vivo.",
      formatos: ["Cobertura de eventos ao vivo", "Transmissão em tempo real", "Entrega expressa no dia", "Qualquer demanda do cliente"],
      entrega: ["Captação profissional", "Edição no mesmo dia", "Entrega digital imediata"],
      exclusao: "Disponibilidade sujeita a agenda e estrutura de cada evento.",
      direitos: "Direitos de uso do material — combinar no orçamento.",
    },
    {
      id: "site",
      icon: "🌐",
      name: "Criação de Site",
      tagline: "One-page no template LORDS — pronto para converter clientes.",
      formatos: ["Site one-page responsivo", "Template exclusivo LORDS", "Integração com WhatsApp", "Versão mobile e PWA"],
      entrega: ["1 rodada de ajuste inclusa", "Entrega em até 15 dias úteis", "Manutenção opcional R$ 400/mês"],
      exclusao: "Domínio e hospedagem não inclusos.",
      direitos: "Site de propriedade do cliente após entrega.",
    },
  ];

  const cards = svcCards.map((s) => `
    <article class="avulso-card" id="svc-${s.id}">
      <div class="avulso-icon${s.imgs ? " avulso-icon--fotos" : ""}">
        ${s.imgs ? s.imgs.map(src => `<img src="${src}" alt="${s.name}" class="avulso-foto">`).join("") : s.icon}
      </div>
      <h3 class="avulso-name">${s.name}</h3>
      <p class="avulso-tagline">${s.tagline}</p>
      <div class="avulso-section">
        <span class="avulso-label">Formatos</span>
        <ul class="avulso-list">${s.formatos.map((f) => `<li>${f}</li>`).join("")}</ul>
      </div>
      <div class="avulso-section">
        <span class="avulso-label">Entrega</span>
        <ul class="avulso-list">${s.entrega.map((e) => `<li>${e}</li>`).join("")}</ul>
      </div>
      <div class="avulso-exclu"><span>⚠</span> ${s.exclusao}</div>
      <div class="avulso-direitos">${s.direitos}</div>
      <a class="btn btn-ghost avulso-cta" href="${waHref(s.name)}" target="_blank" rel="noopener">Solicitar orçamento</a>
    </article>`).join("");

  const avulsoMedia = (MEDIA["servicos-avulsos"] || []);
  const makeAvulsoItem = (f) => /\.(mp4|mov|m4v|webm)$/i.test(f)
    ? `<div class="ps-item ps-item--video"><video muted loop playsinline preload="none" data-src="assets/servicos-avulsos/${f}"></video></div>`
    : `<div class="ps-item"><img src="assets/servicos-avulsos/${f}" alt="Serviço avulso" loading="lazy"></div>`;
  const half = Math.ceil(avulsoMedia.length / 2);
  const row1 = avulsoMedia.slice(0, half).map(makeAvulsoItem).join("");
  const row2 = avulsoMedia.slice(half).map(makeAvulsoItem).join("");
  const reel = avulsoMedia.length >= 2 ? `
    <div class="ps-row ps-row--fwd"><div class="ps-inner">${row1}${row1}</div></div>
    <div class="ps-row ps-row--rev"><div class="ps-inner">${row2}${row2}</div></div>` : "";

  return `
  <section class="section fc-avulsos" id="avulsos">
    <div class="container">
      <span class="fc-label center">Serviços Avulsos</span>
      <h2 class="prod-h2 center">Só o que você precisa, quando precisar.</h2>
      <p class="lede center">Sem plano mensal. Contrate por demanda — para um evento, uma campanha ou um projeto específico.</p>
    </div>
    ${reel}
    <div class="container">
      <div class="avulso-grid">${cards}</div>
      <p class="pz-nota center">Todos os preços são por orçamento — cada projeto é tratado de forma personalizada.</p>
    </div>
  </section>`;
}

function sComparaCta() {
  return `
  <section class="section fc-compara-cta">
    <div class="container fc-compara-cta-inner">
      <h2 class="prod-h2">Quem compara escolhe a LORDS</h2>
      <a class="btn btn-primary btn-cta" href="#planos">Ver os planos</a>
    </div>
  </section>`;
}

/* ---- Painel do cliente LORDS — mockup desenhado em HTML/CSS ---- */
function sPainelMock() {
  const modulos = [
    { ic: "", nome: "Calendário", on: true },
    { ic: "", nome: "Aprovações" },
    { ic: "", nome: "Métricas" },
    { ic: "", nome: "Concorrentes" },
    { ic: "", nome: "Processo" },
    { ic: "", nome: "WhatsApp" },
  ];
  const posts = [
    { tipo: "Reels", tema: "Bastidor da captação", data: "Ter · 12/08", status: "aprovar" },
    { tipo: "Carrossel", tema: "3 erros no feed da sua marca", data: "Qua · 13/08", status: "ok" },
    { tipo: "Post", tema: "Antes e depois — projeto novo", data: "Qui · 14/08", status: "mudar" },
  ];
  const chip = (s) =>
    s === "ok" ? `<span class="pnl-chip pnl-chip--ok">Aprovado ✓</span>`
    : s === "mudar" ? `<span class="pnl-chip pnl-chip--ghost">Mudar data</span>`
    : `<span class="pnl-chip pnl-chip--go">Aprovar</span>`;

  const metricas = [
    { canal: "Instagram", label: "Alcance na semana", val: "12,4 mil" },
    { canal: "Tráfego pago", label: "Cliques no anúncio", val: "1.860" },
    { canal: "WhatsApp", label: "Conversas iniciadas", val: "47", tag: "com gestão" },
  ];

  return `
  <div class="painel reveal" aria-label="Painel do cliente LORDS (ilustrativo)">
    <aside class="pnl-side">
      <div class="pnl-brand"><span class="pnl-logo">L</span><span>LORDS</span></div>
      <nav class="pnl-nav">
        ${modulos.map((m) => `<span class="pnl-item${m.on ? " on" : ""}"><i>${m.ic}</i>${m.nome}</span>`).join("")}
      </nav>
    </aside>
    <div class="pnl-main">
      <div class="pnl-top">
        <div><strong>Calendário de conteúdo</strong><small>Agosto · você aprova antes de publicar</small></div>
        <span class="pnl-preview">prévia</span>
      </div>
      <div class="pnl-metrics">
        ${metricas.map((m) => `
        <div class="pnl-metric">
          <span class="pnl-metric-canal">${m.canal}${m.tag ? `<i>${m.tag}</i>` : ""}</span>
          <strong>${m.val}</strong>
          <span class="pnl-metric-label">${m.label}</span>
          <div class="pnl-spark"><span></span><span></span><span></span><span></span><span></span><span></span></div>
        </div>`).join("")}
      </div>
      <div class="pnl-posts">
        ${posts.map((p) => `
        <div class="pnl-post">
          <div class="pnl-post-thumb">${p.tipo}</div>
          <div class="pnl-post-info">
            <strong>${p.tema}</strong>
            <small>${p.data}</small>
          </div>
          ${chip(p.status)}
        </div>`).join("")}
      </div>
    </div>
  </div>
  <p class="pnl-legenda">Painel ilustrativo — a sua versão é montada com a sua marca. Incluído em qualquer plano. <a href="painel.html" class="pnl-link">Ver a área do cliente →</a></p>`;
}

function sToolsSection() {
  return `
  <section class="section fc-tools" id="painel">
    <div class="container">
      <span class="fc-label center">Painel do cliente LORDS</span>
      <h2 class="prod-h2 center">Veja como o seu marketing pode sair do caos</h2>
      <p class="lede center">Acesso ao sistema LORDS: calendário, métricas, análise de concorrentes e o nosso processo. Você visualiza os conteúdos antes, aprova posts, legendas e estratégias — e muda o dia de um post com facilidade se surgir uma urgência.</p>

      ${sPainelMock()}

      <p class="entregaveis-lead center">Incluído em qualquer plano:</p>
      <div class="trust-list">
        <div class="trust-item reveal"><span class="trust-item-emoji">01</span><div><strong>Estratégia editorial</strong><span>Diagnóstico do negócio, linha editorial e roteiros de todos os vídeos entregues no início de cada mês.</span></div></div>
        <div class="trust-item reveal"><span class="trust-item-emoji">02</span><div><strong>Calendário de postagens</strong><span>Datas, horários e legendas prontas para publicar — sem precisar pensar no que postar.</span></div></div>
        <div class="trust-item reveal"><span class="trust-item-emoji">03</span><div><strong>Relatório mensal de resultados</strong><span>Análise de desempenho, o que funcionou e ajuste de rota para o próximo ciclo.</span></div></div>
        <div class="trust-item reveal"><span class="trust-item-emoji">04</span><div><strong>Reunião de alinhamento</strong><span>Encontro mensal com o time LORDS para revisar, planejar e garantir que a estratégia evolui com o seu negócio.</span></div></div>
      </div>
    </div>
  </section>`;
}

function sClosing(p) {
  const c = p.closing;
  const heroVids = (MEDIA["fabrica/hero"] || []).filter(f => /\.mp4$/i.test(f));
  const bgVid = heroVids.length
    ? `<video class="closing-bg-vid" src="assets/videos/fabrica/hero/${heroVids[0]}" muted loop playsinline autoplay></video>`
    : "";
  return `
  <section class="section prod-cta">
    ${bgVid}
    <div class="closing-bg-overlay" aria-hidden="true"></div>
    <div class="container">
      <div class="final-card glass reveal">
        <div class="final-glow" aria-hidden="true"></div>
        <h2>${c.title}</h2>
        <button class="btn btn-primary btn-cta" data-action="diagnostico">${c.button || "Quero a LORDS cuidando do meu negócio →"}</button>
        <p class="scarcity">${c.scarcity}</p>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   RENDER
   ============================================================ */
function sAtendimento() {
  const ia = (typeof PRODUCTS !== "undefined" && PRODUCTS["cerebro-whatsapp"]) ? PRODUCTS["cerebro-whatsapp"] : null;
  const iaFrom = ia && ia.from ? ia.from : "R$ 3.500 setup";
  return `
  <section class="ps-section atend-section" id="atendimento" aria-label="Atendimento no WhatsApp">
    <div class="container">
      <div class="atend-head">
        <span class="ps-kicker">Atendimento no WhatsApp</span>
        <h2>Você escolhe quem fala com o seu cliente.</h2>
        <p class="atend-lede">A opção é sua: o que é melhor para o seu negócio?</p>
      </div>
      <div class="atend-grid">
        <article class="atend-card">
          <span class="atend-ic">SD</span>
          <h3>Uma pessoa real atendendo</h3>
          <p>Gente de verdade cuidando do WhatsApp e das redes, respondendo no tom da sua marca.</p>
          <p class="atend-price">R$ 7.000<span>/mês</span></p>
          <p class="atend-note">Disponível com tráfego pago · entra combinado no plano <strong>Creator</strong> ou <strong>Completo</strong>.</p>
          <button class="btn btn-primary" data-action="diagnostico">Quero atendimento humano</button>
        </article>
        <article class="atend-card">
          <span class="atend-ic">AI</span>
          <h3>Um agente de IA</h3>
          <p>Atende, qualifica e agenda 24h no WhatsApp — em breve disponível para clientes.</p>
          <p class="atend-note">Em desenvolvimento · disponibilidade em breve.</p>
          <button class="btn btn-primary" data-action="diagnostico">Quero ser avisado</button>
        </article>
      </div>
      <p class="atend-foot">Planos recorrentes: mínimo de 3 meses.</p>
    </div>
  </section>`;
}

/* Auto-scroll da esteira do Hub (pausa no hover). */
function initHubReel() {
  const el = document.getElementById("hub-reel-fc");
  if (!el || reduceMotion) return;
  let paused = false;
  el.addEventListener("mouseenter", () => { paused = true; });
  el.addEventListener("mouseleave", () => { paused = false; });
  const tick = () => {
    if (!paused && !document.hidden) {
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---- Carrossel 4 lâminas: LORDS Hub + 3 pilares ---- */
function sCarrossel4() {
  const slides = [
    {
      id: "hub",
      kicker: "LORDS Hub · nos planos Creator e Completo",
      headline: "Sua operação inteira. Aprovações, entregas, métricas e benefícios.",
      body: "Acompanhe conteúdos, aprove roteiros, acumule Coins e desbloqueie vantagens — tudo num painel exclusivo.",
      cta: { label: "Conheça o LORDS Hub", href: "hub.html" },
      video: "assets/videos/fabrica/hero/sequencia-01-1.mp4",
      ic: "🖥️",
    },
    {
      id: "captacao",
      kicker: "Pilar 1 — Captação",
      headline: "Sua marca na frente do cliente certo, no momento certo.",
      body: "Antes de ele precisar de você. Antes de ele conhecer o concorrente. Captação é presença estratégica — não só postagem.",
      video: "assets/videos/fabrica/hero/automotivo-2.mp4",
      ic: "📡",
    },
    {
      id: "autoridade",
      kicker: "Pilar 2 — Autoridade",
      headline: "Construir confiança antes da venda.",
      body: "O cliente que chega pronto para comprar já te conhece, já confia, já respeita. Autoridade é o que faz o fechamento ser óbvio.",
      video: "assets/videos/fabrica/hero/reel-isa-5.mp4",
      ic: "⭐",
    },
    {
      id: "conversao",
      kicker: "Pilar 3 — Conversão",
      headline: "Transformar atenção em cliente real.",
      body: "Não curtida, não seguidor — cliente que paga. Conversão é o resultado de captação e autoridade funcionando juntos.",
      video: "assets/videos/fabrica/hero/moda-feminina-3.mp4",
      ic: "💰",
    },
  ];

  const cards = slides.map((s, i) => {
    const mediaHtml = s.id === "hub"
      ? buildHubMockupHTML("hub-mockup-fabrica")
      : `<video class="cs4-video" muted loop playsinline preload="none" data-src="${s.video}" aria-hidden="true">
          <source src="${s.video}" type="video/mp4">
        </video>
        <div class="cs4-video-fallback" aria-hidden="true">${s.ic}</div>`;
    return `
    <div class="cs4-slide" id="cs4-${s.id}" data-index="${i}">
      <div class="cs4-video-wrap">${mediaHtml}</div>
      <div class="cs4-copy">
        <span class="kicker kicker-gold">${s.kicker}</span>
        <h2 class="cs4-h2">${s.headline}</h2>
        <p class="cs4-body">${s.body}</p>
        ${s.cta ? `<a class="btn btn-primary cs4-cta" href="${s.cta.href}">${s.cta.label}</a>` : ""}
      </div>
    </div>`;
  }).join("");

  const dots = slides.map((_, i) => `<button class="cs4-dot${i === 0 ? " active" : ""}" data-to="${i}" aria-label="Lâmina ${i + 1}"></button>`).join("");

  return `
  <section class="cs4-sec fc-dark-block" id="lords-hub" aria-label="Sistema LORDS">
    <div class="cs4-track-wrap">
      <div class="cs4-track" id="cs4-track">${cards}</div>
    </div>
    <div class="cs4-dots" id="cs4-dots">${dots}</div>
  </section>`;
}

/* Mantida internamente para buildHubMockupHTML ser chamado de outros lugares se necessário */
function sHub() { return sCarrossel4(); }

function buildHubMockupHTML(instanceId) {
  const tabs = [
    {
      id: "dashboard", label: "Dashboard",
      html: `<div class="hm-section">
          <div class="hm-greeting">Bem-vindo de volta.</div>
          <div class="hm-stat-row">
            <div class="hm-stat"><span class="hm-stat-n">10</span><span class="hm-stat-l">Vídeos</span></div>
            <div class="hm-stat"><span class="hm-stat-n">2</span><span class="hm-stat-l">A aprovar</span></div>
            <div class="hm-stat"><span class="hm-stat-n">1.240</span><span class="hm-stat-l">Coins</span></div>
          </div>
          <div class="hm-next-label">Próximas entregas</div>
          <div class="hm-tasks">
            <div class="hm-task done">Estratégia do mês</div>
            <div class="hm-task done">Roteiros aprovados</div>
            <div class="hm-task">Gravação — qui 14h</div>
            <div class="hm-task">Artes da semana</div>
          </div>
        </div>`
    },
    {
      id: "conteudos", label: "Conteúdos",
      html: `<div class="hm-section">
          <div class="hm-apr-title">Aguardando aprovação</div>
          <div class="hm-apr-cards">
            <div class="hm-apr-card">
              <div class="hm-apr-thumb">Reel</div>
              <div class="hm-apr-info"><b>Reel #04 · Produto</b><small>Enviado hoje</small></div>
              <div class="hm-apr-btns"><button class="hm-btn-ok">✓ Aprovar</button><button class="hm-btn-rev">✎ Revisar</button></div>
            </div>
            <div class="hm-apr-card">
              <div class="hm-apr-thumb">Arte</div>
              <div class="hm-apr-info"><b>Stories #08</b><small>Enviado ontem</small></div>
              <div class="hm-apr-btns"><button class="hm-btn-ok">✓ Aprovar</button><button class="hm-btn-rev">✎ Revisar</button></div>
            </div>
          </div>
          <div class="hm-apr-done-label">Entregas do mês: <strong>12 peças</strong></div>
        </div>`
    },
    {
      id: "calendario", label: "Calendário",
      html: `<div class="hm-section">
          <div class="hm-cal-header"><span>Agosto 2026</span><span class="hm-cal-badge">10 eventos</span></div>
          <div class="hm-cal-grid">
            ${["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d=>`<div class="hm-cal-day-name">${d}</div>`).join("")}
            ${[...Array(6)].map(()=>`<div class="hm-cal-d" style="opacity:0"></div>`).join("")}
            ${[...Array(31)].map((_,i)=>{const d=i+1;const cls=d===12?"hm-cal-ev ev-grav":d===14?"hm-cal-ev ev-apr":d===19?"hm-cal-ev ev-ent":d===26?"hm-cal-ev ev-rel":"";const today=d===18?" hm-cal-today":"";return `<div class="hm-cal-d${cls?` ${cls}`:""}${today}">${d}</div>`;}).join("")}
          </div>
          <div class="hm-cal-legend">
            <span class="leg ev-grav">Gravação</span><span class="leg ev-apr">Aprovação</span><span class="leg ev-ent">Entrega</span>
          </div>
        </div>`
    },
    {
      id: "missoes", label: "Missões",
      html: `<div class="hm-section">
          <div class="hm-coins-hero"><div class="hm-coins-total">🪙 1.240</div><div class="hm-coins-sub">coins disponíveis</div></div>
          <div class="hm-coins-list">
            <div class="hm-coin-item">Aprovar conteúdo no prazo <span>+50</span></div>
            <div class="hm-coin-item">Comentar na comunidade <span>+10</span></div>
            <div class="hm-coin-item">Enviar depoimento <span>+200</span></div>
          </div>
        </div>`
    },
  ];

  const allNav = ["Dashboard","Conteúdos","Calendário","Comunidade","Missões","Recompensas","IA Advisor"];
  const sid = instanceId || "hub-mockup";
  const navBtns = allNav.map((label,i) => {
    const tab = tabs.find(t => t.label === label);
    const active = label === "Dashboard" ? " active" : "";
    const dataTab = tab ? ` data-tab="${tab.id}" data-inst="${sid}"` : "";
    return `<button class="hub-snav-btn${active}"${dataTab}><span>${label}</span></button>`;
  }).join("");
  const panels = tabs.map((t,i) => `<div class="hub-tab-panel${i===0?" active":""}" data-panel="${t.id}" data-inst="${sid}">${t.html}</div>`).join("");

  return `<div class="hub-mockup-wrap" data-inst="${sid}">
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

function initHubMockup(wrap) {
  if (!wrap) return;
  const btns = wrap.querySelectorAll(".hub-snav-btn");
  const panels = wrap.querySelectorAll(".hub-tab-panel");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      btns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      wrap.querySelector(`[data-panel="${tab}"]`).classList.add("active");
    });
  });
  const tabIds = [...btns].map(b => b.dataset.tab);
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % tabIds.length;
    btns.forEach(b => b.classList.toggle("active", b.dataset.tab === tabIds[idx]));
    panels.forEach(p => p.classList.toggle("active", p.dataset.panel === tabIds[idx]));
  }, 4000);
}

/* ---- Esteira problema → solução (texto esq. + mídia dir.), auto-scroll ---- */
const ESTEIRA = [
  { tag: "Atendimento", prob: "O cliente manda mensagem e esfria esperando resposta.", sol: "Agentes de IA + gestão humanizada respondem na hora, no tom da sua marca.", media: { type: "phone" } },
  { tag: "LORDS Hub", prob: "Você não enxerga o que está sendo feito.", sol: "Acompanha, aprova e desbloqueia benefícios num painel só — o LORDS Hub.", media: { type: "painel" }, href: "hub.html", cta: "Ver o LORDS Hub" },
  { tag: "Produção", prob: "Vídeo feito no celular não passa autoridade.", sol: "Videomaker especializado, com equipamentos premium.", media: { type: "icon", ic: "" } },
  { tag: "Rosto & comunicadora", prob: "Travou na câmera ou não quer aparecer?", sol: "Apareça todo dia com cara de marca grande — modelo e comunicadora dão rosto e voz.", media: { type: "icon", ic: "" } },
  { tag: "Estratégia", prob: "Posta no achismo e nada acontece.", sol: "Estratégia e linha editorial antes de qualquer gravação.", media: { type: "icon", ic: "" } },
  { tag: "Criativos que vendem", prob: "Conteúdo bonito que não vende.", sol: "Criativos em motion + arte estática, prontos toda semana (~15 criativos).", media: { type: "icon", ic: "" } },
];

function esteiraMedia(m) {
  if (m.type === "phone") {
    return `<div class="est-phone"><span class="est-phone-bar"></span>
      <div class="est-wa">
        <div class="est-wa-b in">Oi! Vocês têm horário essa semana?</div>
        <div class="est-wa-b out">Oi! Temos sim. Quinta 15h ou sexta 10h?</div>
        <div class="est-wa-b in">Quinta 15h — perfeito.</div>
        <div class="est-wa-b out">Fechado! Já reservei.</div>
      </div>
      <span class="est-phone-foot">IA + pessoa real · resposta em segundos</span></div>`;
  }
  if (m.type === "painel") {
    const acessos = ["Dashboard", "Meu projeto", "Conteúdos", "Calendário", "Comunidade", "Coins", "Notion", "ClickUp"];
    return `<div class="est-painel">
      <div class="est-painel-side">${acessos.map((a, i) => `<span class="${i === 0 ? "on" : ""}">${a}</span>`).join("")}</div>
      <div class="est-painel-body">
        <div class="est-painel-row"><b>Seu mês na LORDS</b><span>72%</span></div>
        <div class="est-painel-bar"><i style="width:72%"></i></div>
        <div class="est-painel-cards"><span>1.240 coins</span><span>2 aprovar</span><span>Reels</span></div>
      </div></div>`;
  }
  if (m.type === "image") return `<img src="${m.src}" alt="" loading="lazy" />`;
  return `<div class="est-icon">${m.ic}</div>`;
}

function esteiraCard(it) {
  const cta = it.href ? `<a class="est-cta" href="${it.href}">${it.cta || "Ver mais"} →</a>` : "";
  return `<article class="est-card">
    <div class="est-txt"><span class="est-tag">${it.tag}</span><p class="est-prob">${it.prob}</p><p class="est-sol">${it.sol}</p>${cta}</div>
    <div class="est-media">${esteiraMedia(it.media)}</div>
  </article>`;
}

function sEsteira() {
  const track = ESTEIRA.map(esteiraCard).join("") + ESTEIRA.map(esteiraCard).join("");
  return `
  <section class="section est-sec" id="solucoes" aria-label="Problemas e soluções">
    <div class="container">
      <span class="fc-label center">Problema → solução</span>
      <h2 class="prod-h2 center">A LORDS tem uma resposta para o seu marketing.</h2>
    </div>
    <div class="est-reel" id="est-reel"><div class="est-track">${track}</div></div>
  </section>`;
}


// ── ESTÚDIO OU SEU LOCAL ──────────────────────────────────────────────────
function sEstudio() {
  const files = MEDIA["estudio"] || [];
  const items = files.map(f => {
    const isVid = /\.(mp4|mov)$/i.test(f);
    const enc = encodeURIComponent(f);
    return isVid
      ? `<video class="est-reel-item" data-src="assets/estudio/${enc}" muted loop playsinline></video>`
      : `<img class="est-reel-item" src="assets/estudio/${enc}" alt="Estúdio LORDS" loading="lazy">`;
  }).join("");
  return `
  <section class="section estudio-sec2" aria-label="Estúdio ou local do cliente">
    <div class="container">
      <div class="estudio2-copy reveal">
        <span class="kicker">Produção profissional</span>
        <h2>Gravamos no estúdio<br>ou no seu local.</h2>
        <p class="lede">Câmera, luz e direção profissional — no nosso estúdio em Itajaí ou onde o seu negócio vive, em BC e região e na Grande Florianópolis.</p>
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

// ── SEÇÕES DE COPY (estilo FCC, adaptadas B2B) ──────────────────────────

function sDorBadges() {
  const badges = [
    "INVESTE TODO MÊS",
    "PAGA AGÊNCIA",
    "IMPULSIONA POST",
    "MAS OS CLIENTES NÃO VÊM",
  ];
  return `
  <section class="section dor-badges-sec fc-dark-block" aria-label="Problema">
    <div class="container">
      <div class="dor-badges-wrap">
        <div class="dor-badges-row">
          ${badges.map((b, i) => `<div class="dor-badge${i === badges.length - 1 ? " dor-badge--destaque" : ""}">${b}</div>`).join("")}
        </div>
        <p class="dor-badges-linha">Enquanto isso, o seu concorrente cresce — e você não sabe por quê.</p>
      </div>
    </div>
  </section>`;
}

function sCansadoDe() {
  const cansado = [
    "Pagar agência e não saber o que foi feito",
    "Receber relatório cheio de gráfico e zero cliente novo",
    "Ver seu concorrente crescendo enquanto você fica parado",
    "Sentir que marketing é custo fixo, não investimento",
  ];
  const tambem = [
    "Ficou sem resposta da agência por dias",
    "Cancelou e ficou meses sem marketing nenhum",
    "Tentou fazer você mesmo e esgotou",
    "Pagou sem clareza do que estava sendo entregue",
  ];
  return `
  <section class="section cansado-sec" aria-label="Identificação">
    <div class="container">
      <div class="cansado-grid">
        <div class="cansado-bloco reveal">
          <h2 class="cansado-titulo">SE VOCÊ ESTÁ CANSADO DE:</h2>
          <ul class="cansado-lista">
            ${cansado.map(t => `<li class="cansado-item"><span class="cansado-ic" aria-hidden="true">+</span>${t}</li>`).join("")}
          </ul>
        </div>
        <div class="cansado-bloco cansado-bloco--alt reveal">
          <h2 class="cansado-titulo">ENTÃO PROVAVELMENTE VOCÊ TAMBÉM JÁ:</h2>
          <ul class="cansado-lista">
            ${tambem.map(t => `<li class="cansado-item"><span class="cansado-ic" aria-hidden="true">+</span>${t}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

function sLoopViciante() {
  const pilares = [
    { ic: "", nome: "CAPTAÇÃO", desc: "Sua marca aparecendo pro cliente certo, no momento certo — antes de ele precisar de você." },
    { ic: "", nome: "AUTORIDADE", desc: "Construir presença e confiança antes da venda, para que o cliente chegue pronto para comprar." },
    { ic: "", nome: "CONVERSÃO", desc: "Transformar atenção em cliente real. Não curtida, não seguidor — cliente que paga." },
  ];
  return `
  <section class="section loop-sec fc-dark-block" aria-label="Sistema LORDS">
    <div class="container">
      <div class="loop-intro reveal">
        <span class="kicker" style="color:var(--gold-lit)">A descoberta que muda tudo</span>
        <h2 class="loop-headline">O algoritmo não favorece quem posta mais.<br>Ele favorece quem tem <em>sistema</em>.</h2>
        <p class="lede center" style="color:var(--body)">Analisamos centenas de marcas que crescem de forma previsível. Todas têm três pilares funcionando ao mesmo tempo.</p>
      </div>
      <div class="loop-grid reveal">
        ${pilares.map(p => `
        <div class="loop-card">
          <div class="loop-ic" aria-hidden="true">${p.ic}</div>
          <h3 class="loop-nome">${p.nome}</h3>
          <p class="loop-desc">${p.desc}</p>
        </div>`).join("")}
      </div>
      <p class="loop-rodape reveal">Quando os três estão alinhados, marketing deixa de ser custo — e vira investimento com retorno previsível.</p>
    </div>
  </section>`;
}

function sEducacional() {
  const pilares = [
    { num: "01", ic: "", nome: "ESTRATÉGIA", desc: "Como montar um plano de conteúdo que gera resultado — não só ocupação. Posicionamento, calendário e mensagem certa pra pessoa certa." },
    { num: "02", ic: "", nome: "GRAVAÇÃO", desc: "Como aparecer na câmera com autoridade — ou como dirigir quem aparece por você. Posicionamento, luz, enquadramento e performance." },
    { num: "03", ic: "", nome: "PRODUÇÃO", desc: "O que separa um vídeo que prende a atenção de um que ninguém assiste. Ritmo, corte, hook e CTA que converte sem parecer propaganda." },
    { num: "04", ic: "", nome: "VENDA", desc: "Como transformar conteúdo em cliente sem parecer vendedor. CTAs invisíveis, funil pelo feed e o exato momento de apresentar a oferta." },
  ];
  return `
  <section class="section edu-sec" id="aprenda" aria-label="Componente educacional">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">A LORDS não só faz</span>
        <h2>Ela te ensina.</h2>
        <p class="lede">Enquanto a nossa equipe executa o seu marketing, você aprende a linguagem do crescimento.<br><strong>Os dois crescem juntos.</strong></p>
      </div>
      <div class="edu-grid reveal">
        ${pilares.map(p => `
        <div class="edu-card">
          <div class="edu-card-head">
            <span class="edu-num">${p.num}</span>
            <span class="edu-ic" aria-hidden="true">${p.ic}</span>
          </div>
          <h3 class="edu-nome">${p.nome}</h3>
          <p class="edu-desc">${p.desc}</p>
        </div>`).join("")}
      </div>
      <div class="edu-pdf reveal">
        <div class="edu-pdf-inner">
          <div class="edu-pdf-icon" aria-hidden="true">PDF</div>
          <div>
            <h3 class="edu-pdf-title">Guia LORDS de Conteúdo</h3>
            <p class="edu-pdf-sub">PDF exclusivo entregue a cada cliente — estratégia, roteiros e o passo a passo completo pra criar conteúdo que vende.</p>
          </div>
          <a class="btn btn-primary" href="#planos">Ver planos →</a>
        </div>
      </div>
    </div>
  </section>`;
}

// ── FIM DAS SEÇÕES DE COPY ────────────────────────────────────────────────

function renderPage() {
  const p = PRODUCTS[SLUG];
  const root = document.getElementById("fabrica-root");
  if (!root || !p) return;
  document.title = `${p.name} — LORDS Creative`;

  root.innerHTML = `
  <nav class="crumbs container"><a href="home.html#produtos">Soluções</a> <span>›</span> <em>${p.name}</em></nav>
  ${sHero(p)}
  ${sVsl(p)}
  ${sNiches(p)}
  ${sEstudio()}
  ${sCoverage(p)}
  ${sAgents()}
  ${sPortfolio(p)}
  ${sMetodoLords()}
  ${sPlans(p)}
  ${sCansadoDe()}
  ${sPersonalize(p)}
  ${sCarrossel4()}
  ${sServicosAvulsos()}
  ${sFaq(p)}
  ${sClosing(p)}
  <!-- Fluxo: carrinho → 8 perguntas → WhatsApp -->
  <div class="flow-overlay" id="flow-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Diagnóstico gratuito">
    <div class="flow-modal">
      <button class="flow-close" id="flow-close" aria-label="Fechar">&times;</button>
      <div class="flow-body" id="flow-body"></div>
      <div class="flow-foot" id="flow-foot"></div>
    </div>
  </div>

  <a class="wa-float" id="wa-float" href="#" aria-label="Agendar conversa estratégica com a LORDS" title="Agendar conversa estratégica">
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.43 1.12 4.62 2.93 6.2L4 22l4.53-2.27c1.08.3 2.25.47 3.47.47 5.52 0 10-3.94 10-8.8S17.52 3 12 3zm-4 9.9a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6zm4 0a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6zm4 0a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6z"/></svg>
  </a>`;
}

/* ============================================================
   INTERAÇÕES
   ============================================================ */

/* ============================================================
   FLUXO DE CONVERSÃO — carrinho → 8 perguntas → WhatsApp
   Três entradas: plano escolhido · nenhum plano serve · serviço avulso.
   Sem gateway de pagamento: o carrinho monta o pedido e o fechamento
   é humano, na conversa. (Asaas/Cora só no 5º cliente, briefing 10.3)
   ============================================================ */
const flow = {
  entry: null,      // "plano" | "nenhum" | "avulso"
  planId: null,
  bumps: new Set(),
  services: new Set(),
  answers: {},
  qIndex: 0,
};

// Serviços avulsos = união dos bumps dos dois planos (não duplica dado)
function servicosAvulsos(p) {
  const seen = new Map();
  Object.values(p.bumps).flat().forEach((b) => { if (!seen.has(b.id)) seen.set(b.id, b); });
  return [...seen.values()];
}

/* Tira do carrinho todo bump cuja dependência deixou de estar marcada.
   Sem isto, desmarcar "tráfego pago" deixaria a gestão de redes no pedido —
   um pedido que a operação não consegue entregar. */
function limparBumpsOrfaos(p) {
  let mudou = false;
  (p.bumps[flow.planId] || []).forEach((b) => {
    if (flow.bumps.has(b.id) && !bumpLiberado(b, flow.bumps)) {
      flow.bumps.delete(b.id);
      mudou = true;
    }
  });
  return mudou;
}

function flowTotals(p) {
  const pl = p.plans.find((x) => x.id === flow.planId);
  let monthly = pl ? pl.price : 0, oneoff = 0;
  (p.bumps[flow.planId] || []).forEach((b) => {
    if (!flow.bumps.has(b.id)) return;
    if (!bumpLiberado(b, flow.bumps)) return;   // rede de segurança: total nunca mente
    if (b.recurring) monthly += b.price; else oneoff += b.price;
    if (b.monthly) monthly += b.monthly;
  });
  return { monthly, oneoff, plan: pl };
}

function renderFlowStep(p) {
  const body = document.getElementById("flow-body");
  const foot = document.getElementById("flow-foot");
  if (!body) return;

  /* --- Passo 1: carrinho (só quando veio de um plano) --- */
  if (flow.entry === "plano" && flow.qIndex === 0) {
    limparBumpsOrfaos(p);
    const { monthly, oneoff, plan } = flowTotals(p);
    body.innerHTML = `
      <span class="flow-step">Passo 1 de 2 · seu pedido</span>
      <h3>${plan.name}</h3>
      <p class="flow-sub">${plan.hook} Adicione o que fizer sentido — nada é cobrado agora.</p>
      <div class="cart-base">
        <span>${plan.short}</span><strong>${fmt(plan.price)}${plan.unit}</strong>
      </div>
      <div class="bumps-grid">
        ${bumpsDoPlano(p, flow.planId).map((b) => {
          const liberado = bumpLiberado(b, flow.bumps);
          const dentro = flow.bumps.has(b.id);
          const exigido = b.requires ? (p.bumps[flow.planId] || []).find((x) => x.id === b.requires) : null;
          return `
        <div class="bump-card${dentro ? " on" : ""}${liberado ? "" : " is-locked"}" data-id="${b.id}">
          <div class="bump-info">
            <strong>${b.name}</strong>
            <small>${liberado ? b.desc : `Disponível junto com a ${exigido.name.toLowerCase()}.`}</small>
          </div>
          <div class="bump-side">
            <span class="bump-price">${fmt(b.price)}${b.recurring ? "<i>/mês</i>" : ""}${b.monthly ? `<i> + ${fmt(b.monthly)}/mês</i>` : ""}</span>
            <button type="button" class="bump-add" aria-pressed="${dentro}" ${liberado ? "" : "disabled"}>${dentro ? "Adicionado ✓" : liberado ? "Adicionar +" : "Bloqueado"}</button>
          </div>
        </div>`;
        }).join("")}
      </div>`;
    foot.innerHTML = `
      <div class="cfg-total"><small>Seu investimento</small><strong>${fmt(monthly)}/mês${oneoff ? ` <span class="cfg-oneoff">+ ${fmt(oneoff)} único</span>` : ""}</strong></div>
      <button class="btn btn-primary" id="flow-next">Continuar</button>`;

    body.querySelectorAll(".bump-card").forEach((el) => {
      const btn = el.querySelector(".bump-add");
      if (btn.disabled) return;
      btn.addEventListener("click", () => {
        const id = el.dataset.id;
        flow.bumps.has(id) ? flow.bumps.delete(id) : flow.bumps.add(id);
        window.dataLayer.push({ event: "bump_toggle", plan: flow.planId, bump: id, added: flow.bumps.has(id) });
        renderFlowStep(p);   // limparBumpsOrfaos roda no topo e derruba os dependentes
      });
    });
    document.getElementById("flow-next").addEventListener("click", () => { flow.qIndex = 1; renderFlowStep(p); });
    return;
  }

  /* --- Passo 1 alternativo: escolher serviços avulsos --- */
  if (flow.entry === "avulso" && flow.qIndex === 0) {
    body.innerHTML = `
      <span class="flow-step">Passo 1 de 2 · o que você precisa</span>
      <h3>Quais serviços te interessam?</h3>
      <p class="flow-sub">Marque um ou mais. A gente te passa o valor na conversa.</p>
      <div class="bumps-grid">
        ${servicosAvulsos(p).map((s) => `
        <div class="bump-card${flow.services.has(s.id) ? " on" : ""}" data-id="${s.id}">
          <div class="bump-info"><strong>${s.name}</strong><small>${s.desc}</small></div>
          <div class="bump-side">
            <span class="bump-price">${fmt(s.price)}${s.recurring ? "<i>/mês</i>" : ""}</span>
            <button type="button" class="bump-add" aria-pressed="${flow.services.has(s.id)}">${flow.services.has(s.id) ? "Selecionado ✓" : "Selecionar +"}</button>
          </div>
        </div>`).join("")}
      </div>`;
    foot.innerHTML = `<button class="btn btn-primary" id="flow-next">Continuar</button>`;
    body.querySelectorAll(".bump-card").forEach((el) => {
      el.querySelector(".bump-add").addEventListener("click", () => {
        const id = el.dataset.id;
        flow.services.has(id) ? flow.services.delete(id) : flow.services.add(id);
        renderFlowStep(p);
      });
    });
    document.getElementById("flow-next").addEventListener("click", () => { flow.qIndex = 1; renderFlowStep(p); });
    return;
  }

  /* --- Passo 2: as 8 perguntas, uma por tela --- */
  const qs = p.diagnostic.questions;
  const i = Math.max(0, flow.qIndex - 1);
  if (i < qs.length) {
    const q = qs[i];
    const val = flow.answers[q.id] || "";
    const pct = Math.round((i / qs.length) * 100);
    body.innerHTML = `
      <div class="flow-progress"><span style="width:${pct}%"></span></div>
      <span class="flow-step">Pergunta ${i + 1} de ${qs.length}</span>
      <h3>${q.q}</h3>
      ${q.type === "choice"
        ? `<div class="flow-choices">${q.options.map((o) => `<button type="button" class="flow-choice${val === o ? " on" : ""}" data-v="${o}">${o}</button>`).join("")}</div>`
        : `<input class="flow-input" id="flow-input" type="text" value="${val}" placeholder="Escreva aqui" autocomplete="off" />`}`;
    foot.innerHTML = `
      ${i > 0 ? `<button class="btn btn-ghost" id="flow-back">Voltar</button>` : `<span></span>`}
      <button class="btn btn-primary" id="flow-next">${i === qs.length - 1 ? "Finalizar" : "Continuar"}</button>`;

    const go = () => {
      const input = document.getElementById("flow-input");
      if (input) flow.answers[q.id] = input.value.trim();
      flow.qIndex += 1;
      renderFlowStep(p);
    };
    body.querySelectorAll(".flow-choice").forEach((b) => b.addEventListener("click", () => {
      flow.answers[q.id] = b.dataset.v;
      go();
    }));
    document.getElementById("flow-next").addEventListener("click", go);
    const back = document.getElementById("flow-back");
    back && back.addEventListener("click", () => { flow.qIndex -= 1; renderFlowStep(p); });
    const input = document.getElementById("flow-input");
    if (input) { input.focus(); input.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); }); }
    return;
  }

  /* --- Final: resumo + abrir WhatsApp --- */
  const msg = buildMessage(p);
  const link = waLink(msg);
  const MODELOS_TIME = [
    { nome: "Jenifer",      cidade: "BC e Grande Floripa",   foto: "assets/team/jenifer.jpg" },
    { nome: "Isabela",      cidade: "BC e Grande Floripa",   foto: "assets/team/isabela.jpg" },
    { nome: "Eduarda",      cidade: "Florianópolis e BC", foto: "assets/team/eduarda.jpg" },
    { nome: "Amanda",       cidade: "São Paulo",     foto: "assets/team/amanda.jpg" },
    { nome: "Maria Luiza",  cidade: "São Paulo",     foto: "assets/team/maria-luiza.jpg" },
  ];
  const modeloCards = MODELOS_TIME.map(m => `
    <div class="flow-modelo-card">
      <img src="${m.foto}" alt="${m.nome}" class="flow-modelo-foto" loading="lazy">
      <div class="flow-modelo-nome">${m.nome}</div>
      <div class="flow-modelo-cidade">${m.cidade}</div>
    </div>`).join("");

  body.innerHTML = `
    <div class="flow-progress"><span style="width:100%"></span></div>
    <span class="flow-step">Tudo pronto</span>
    <h3>Vamos conversar já sabendo do seu negócio.</h3>
    <p class="flow-sub">A gente entra em contato com o seu contexto em mãos — sem apresentação genérica de vendas.</p>
    <pre class="flow-preview">${msg.replace(/</g, "&lt;")}</pre>
    <div class="flow-modelos-bloco">
      <p class="flow-modelos-titulo">Conheça quem pode ser o rosto do seu negócio</p>
      <div class="flow-modelos-grid">${modeloCards}</div>
    </div>`;
  foot.innerHTML = `
    <button class="btn btn-ghost" id="flow-back">Voltar</button>
    <button class="btn btn-primary" id="flow-send">${link ? "Abrir no WhatsApp" : "Agendar conversa"}</button>`;
  document.getElementById("flow-back").addEventListener("click", () => { flow.qIndex -= 1; renderFlowStep(p); });
  document.getElementById("flow-send").addEventListener("click", () => {
    window.dataLayer.push({ event: "flow_submit", entry: flow.entry, plan: flow.planId, bumps: [...flow.bumps] });
    if (link) window.open(link, "_blank", "noopener");
    else { closeFlow(); openEnquete(); }
  });
}

/* Monta a mensagem que chega no WhatsApp com todo o contexto */
function buildMessage(p) {
  const L = ["Olá! Vim pela página da Fábrica Criativa."];
  if (flow.entry === "plano") {
    const { monthly, oneoff, plan } = flowTotals(p);
    L.push(`\nPlano de interesse: ${plan.name} (${fmt(plan.price)}${plan.unit})`);
    const chosen = (p.bumps[flow.planId] || []).filter((b) => flow.bumps.has(b.id));
    if (chosen.length) L.push(`Adicionais: ${chosen.map((b) => b.name).join(", ")}`);
    L.push(`Total estimado: ${fmt(monthly)}/mês${oneoff ? ` + ${fmt(oneoff)} único` : ""}`);
  } else if (flow.entry === "avulso") {
    const chosen = servicosAvulsos(p).filter((s) => flow.services.has(s.id));
    L.push(`\nQuero valor de serviço avulso: ${chosen.length ? chosen.map((s) => s.name).join(", ") : "(a definir)"}`);
  } else {
    L.push("\nNenhum dos planos encaixou no meu caso.");
  }
  L.push("\nMeu diagnóstico:");
  p.diagnostic.questions.forEach((q) => {
    const a = flow.answers[q.id];
    if (a) L.push(`• ${q.q} ${a}`);
  });
  return L.join("\n");
}

function openFlow(entry, planId, preBump) {
  const p = PRODUCTS[SLUG];
  flow.entry = entry;
  flow.planId = planId || (entry === "plano" ? p.plans[0].id : null);
  flow.qIndex = entry === "plano" || entry === "avulso" ? 0 : 1;
  flow.bumps.clear(); flow.services.clear(); flow.answers = {};
  // Veio da seção "Personalize o seu plano": já abre com o adicional marcado.
  // Aceita vários separados por vírgula — um bump com dependência vem junto
  // com o que ele exige (ex.: "trafego,gestao-redes").
  if (preBump) String(preBump).split(",").filter(Boolean).forEach((id) => flow.bumps.add(id));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "flow_open", entry, plan: flow.planId });
  const ov = document.getElementById("flow-overlay");
  ov.classList.add("open");
  ov.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  renderFlowStep(p);
}

function closeFlow() {
  const ov = document.getElementById("flow-overlay");
  if (!ov) return;
  ov.classList.remove("open");
  ov.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initFlow() {
  document.querySelectorAll('[data-action="flow"]').forEach((b) => {
    b.addEventListener("click", () => openFlow(b.dataset.entry || "nenhum", b.dataset.plan, b.dataset.bump));
  });
  const ov = document.getElementById("flow-overlay");
  const x = document.getElementById("flow-close");
  x && x.addEventListener("click", closeFlow);
  ov && ov.addEventListener("click", (e) => { if (e.target === ov) closeFlow(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeFlow(); });
}

/* ---- Contagem animada dos números (GSAP quando disponível) ---- */
function initCounters() {
  const els = [...document.querySelectorAll("[data-count]")];
  if (!els.length) return;
  const paint = (el, v) => { el.textContent = fmt(Math.round(v)); };
  if (reduceMotion) { els.forEach((el) => paint(el, Number(el.dataset.count))); return; }

  const run = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = Number(el.dataset.count);
    if (window.gsap) {
      const o = { v: 0 };
      window.gsap.to(o, { v: target, duration: 1.4, ease: "power2.out", onUpdate: () => paint(el, o.v) });
    } else {
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1400);
        paint(el, target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  };
  // GSAP + ScrollTrigger quando disponível; senão, listener de scroll próprio.
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    els.forEach((el) => window.ScrollTrigger.create({
      trigger: el, start: "top 88%", once: true, onEnter: () => run(el),
    }));
    return;
  }
  const check = () => els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 40 && r.bottom > 0) run(el);
  });
  window.addEventListener("scroll", check, { passive: true });
  check();
}

/* ---- VSL: botão de som ---- */
function initVsl() {
  const v = document.getElementById("fc-video");
  const btn = document.getElementById("fc-sound");
  if (!v || !btn) return;
  v.play().catch(() => {});
  btn.addEventListener("click", () => {
    v.muted = !v.muted;
    btn.setAttribute("aria-pressed", String(!v.muted));
    btn.textContent = v.muted ? "Ativar som" : "Som ligado";
    if (!v.muted) v.play().catch(() => {});
  });
}

/* ---- CTAs: diagnóstico (WhatsApp) com fallback pro Calendly ---- */
function waLink(text) {
  return WHATSAPP_NUM
    ? `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`
    : null;
}



function closeModal() {
  const overlay = document.getElementById("agendar-modal");
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initCtas() {
  const overlay = document.getElementById("agendar-modal");
  const closeBtn = document.getElementById("modal-close");
  const close = () => {
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  closeBtn && closeBtn.addEventListener("click", close);
  overlay && overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  // Botões de diagnóstico (data-action="diagnostico") → abre enquete de qualificação
  document.querySelectorAll('[data-action="diagnostico"]').forEach((btn) => {
    btn.addEventListener("click", () => openEnquete());
  });

  // Botão flutuante: abre o fluxo (ninguém fala com a equipe sem passar pelas perguntas)
  const wa = document.getElementById("wa-float");
  wa && wa.addEventListener("click", (e) => { e.preventDefault(); openFlow("nenhum"); });
}

/* ---- Abas da seção "Personalize o seu plano" ---- */
function initPersonalize() {
  const tabs = [...document.querySelectorAll("[data-pz-tab]")];
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const alvo = tab.dataset.pzTab;
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("on", on);
        t.setAttribute("aria-pressed", String(on));
      });
      document.querySelectorAll("[data-pz-panel]").forEach((pan) => {
        pan.classList.toggle("on", pan.dataset.pzPanel === alvo);
      });
    });
  });
}

/* ---- Mapa da cobertura: dispara a pintura ao entrar na tela ---- */
function initCoverageMap() {
  const wrap = document.querySelector(".mapa-wrap");
  if (!wrap) return;
  // .reveal já adiciona "in" — este observer é só o fallback pra quando a
  // seção já nasce visível (telas altas) e o scroll nunca dispara.
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  obs.observe(wrap);
}

/* ---- Menu mobile ---- */
function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const header = document.getElementById("topo");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---- Reel do hero: hover (desktop) / IntersectionObserver (mobile) ---- */
function initReel() {
  const items = [...document.querySelectorAll(".fc-reel-item")];
  if (!items.length) return;
  const isTouchDevice = ("ontouchstart" in window) || window.matchMedia("(max-width: 680px)").matches;
  items.forEach((item) => {
    const src = item.dataset.src;
    if (!src) return;
    const v = item.querySelector("video");
    if (!v) return;
    const load = () => { if (!v.src) { v.src = src; } };
    if (isTouchDevice) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { load(); v.play().catch(() => {}); }
          else v.pause();
        });
      }, { threshold: 0.5 });
      obs.observe(item);
    } else {
      item.addEventListener("mouseenter", () => { load(); v.play().catch(() => {}); });
      item.addEventListener("mouseleave", () => v.pause());
    }
  });
}

/* ---- Lazy play/pause dos vídeos na esteira de portfólio ---- */
function initVideoReel() {
  const items = document.querySelectorAll("video[data-src]");
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (!v.src && e.isIntersecting) v.src = v.dataset.src;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.1 });
  items.forEach(v => obs.observe(v));
}

/* ---- Reveal on scroll (fallback quando não há GSAP) ---- */
function initPlanVisual() {
  const cards = document.querySelectorAll(".pv-card");
  if (!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  cards.forEach(c => obs.observe(c));
}

function initReveal() {
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
  check();
  setTimeout(() => { items.forEach(revealEl); items = []; }, 4000);
}

/* ---- Boot ---- */
/* ---- Inicializa carrossel 4 lâminas ---- */
function initCarrossel4() {
  const wrap = document.querySelector(".cs4-track-wrap");
  const track = document.getElementById("cs4-track");
  const dots = document.querySelectorAll(".cs4-dot");
  if (!wrap || !track || !dots.length) return;

  const slideW = () => wrap.clientWidth;

  /* Lazy-load vídeos ao entrar no slide */
  function loadSlideVideo(idx) {
    const slide = track.children[idx];
    if (!slide) return;
    const vid = slide.querySelector(".cs4-video[data-src]");
    if (vid) { vid.src = vid.dataset.src; vid.removeAttribute("data-src"); vid.play().catch(() => {}); }
  }

  function syncDots(idx) {
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    loadSlideVideo(idx);
  }

  /* Scroll → atualiza dots */
  wrap.addEventListener("scroll", () => {
    const idx = Math.round(wrap.scrollLeft / slideW());
    syncDots(idx);
  }, { passive: true });

  /* Dots → scroll para lâmina */
  dots.forEach((d) => d.addEventListener("click", () => {
    wrap.scrollTo({ left: +d.dataset.to * slideW(), behavior: "smooth" });
  }));

  /* Drag no desktop */
  let startX = 0, startScroll = 0, dragging = false;
  wrap.addEventListener("pointerdown", (e) => { dragging = true; startX = e.clientX; startScroll = wrap.scrollLeft; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", (e) => { if (!dragging) return; wrap.scrollLeft = startScroll - (e.clientX - startX); });
  wrap.addEventListener("pointerup",   () => { dragging = false; });

  loadSlideVideo(0);
}

function boot() {
  renderPage();
  initNav();
  initVsl();
  initFlow();
  initCtas();
  initEnquete();
  initPersonalize();
  initCoverageMap();
  initHeroBg(buildHeroItems());
  initReel();
  initVideoReel();
  initHubMockup(document.querySelector(".hub-mockup-wrap"));
  initCarrossel4();
  mountAgents(document.getElementById("agentes-mount"));
  initReveal();
  initCursor();
  window.scrollTo(0, 0);
}

/* Hero: intercala vídeos (fabrica/hero) com fotos de nicho (vertical). */
function buildHeroItems() {
  const vids = (PRODUCTS[SLUG].reel || []).map((r) => ({ src: r.src, image: false })).filter((i) => i.src);
  const fotos = (PHOTO_REEL || []).map((p) => ({ src: p.src, image: true }));
  const out = [];
  let vi = 0, fi = 0;
  // padrão: 2 vídeos : 1 foto, pra dar respiro visual sem perder o movimento
  while (vi < vids.length || fi < fotos.length) {
    if (vi < vids.length) out.push(vids[vi++]);
    if (vi < vids.length) out.push(vids[vi++]);
    if (fi < fotos.length) out.push(fotos[fi++]);
  }
  return out;
}

/* ---- Cursor customizado animado (desktop; off em touch/reduced-motion) ---- */
function initCursor() {
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (!fine || reduceMotion) return;
  const dot = document.createElement("div"); dot.className = "cursor-dot";
  const line = document.createElement("div"); line.className = "cursor-line idle";
  document.body.append(dot, line);
  document.body.classList.add("has-cursor");
  let mx = innerWidth / 2, my = innerHeight / 2, prevX = mx, prevY = my, angle = 0, idleTimer;
  addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    prevX = mx; prevY = my; mx = e.clientX; my = e.clientY;
    const dx = mx - prevX, dy = my - prevY;
    if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) { angle = Math.atan2(dy, dx); line.classList.remove("idle"); }
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    line.style.transform = `translate(${mx}px, ${my}px) rotate(${angle}rad)`;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => line.classList.add("idle"), 120);
  }, { passive: true });
  const hoverSel = "a, button, .pcard, .plan-card, [data-action], .btn";
  addEventListener("pointerover", (e) => { if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.add("cursor-hover"); });
  addEventListener("pointerout", (e) => { if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.remove("cursor-hover"); });
  addEventListener("pointerdown", () => document.body.classList.add("cursor-down"));
  addEventListener("pointerup", () => document.body.classList.remove("cursor-down"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

/* ═══════════════════════════════════════════════ */
/* LÓGICA DO CARROSSEL ESTÚDIO LORDS               */
/* ═══════════════════════════════════════════════ */

(function () {
  function initStudio() {
    const track = document.getElementById('studio-track');
    const wrapper = track && track.closest('.studio-track-wrapper');
    const pauseBtn = document.querySelector('.studio-pause-btn');
    const prevBtn = document.querySelector('.studio-prev');
    const nextBtn = document.querySelector('.studio-next');

    if (!track || !wrapper) return;

    track.innerHTML += track.innerHTML;

    let isPaused = false;
    let isDragging = false;
    let startX = 0;

    function resumeAnim() {
      track.style.transform = '';
      if (!isPaused) track.style.animationPlayState = 'running';
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        isPaused = !isPaused;
        track.classList.toggle('paused', isPaused);
        pauseBtn.innerHTML = isPaused ? '&#9654; Play' : '&#9208; Pausar';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var cur = new DOMMatrix(getComputedStyle(track).transform).m41;
        track.style.animationPlayState = 'paused';
        track.style.transform = 'translateX(' + (cur + 340) + 'px)';
        setTimeout(resumeAnim, 800);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var cur = new DOMMatrix(getComputedStyle(track).transform).m41;
        track.style.animationPlayState = 'paused';
        track.style.transform = 'translateX(' + (cur - 340) + 'px)';
        setTimeout(resumeAnim, 800);
      });
    }

    wrapper.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.pageX;
      track.classList.add('dragging');
      track.style.animationPlayState = 'paused';
    });

    wrapper.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      track.style.transform = 'translateX(' + (e.pageX - startX) + 'px)';
    });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('dragging');
      resumeAnim();
    }
    wrapper.addEventListener('mouseup', endDrag);
    wrapper.addEventListener('mouseleave', endDrag);

    wrapper.addEventListener('touchstart', function (e) {
      startX = e.touches[0].pageX;
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    wrapper.addEventListener('touchmove', function (e) {
      track.style.transform = 'translateX(' + (e.touches[0].pageX - startX) + 'px)';
    }, { passive: true });

    wrapper.addEventListener('touchend', resumeAnim);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudio);
  } else {
    setTimeout(initStudio, 200);
  }
})();
