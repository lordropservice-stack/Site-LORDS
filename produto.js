/* ============================================================
   LORDS — produto.js · página dedicada por produto (?p=slug)
   ============================================================ */
import { PRODUCTS, TRILHAS, renderMockup } from "./products-data.js?v=20260929d";
import { renderConfigurator, initConfigurator } from "./configurator.js";

const CALENDLY_URL = "https://calendly.com/lordropservice/30min";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getSlug() {
  const p = new URLSearchParams(location.search).get("p");
  return p && PRODUCTS[p] ? p : "diagnostico-gratuito";
}

// A Fábrica Criativa tem página de vendas própria (estrutura e dados diferentes
// do template genérico). Quem chegar por produto.html?p=fabrica-criativa é levado pra lá.
function redirectIfDedicated(slug) {
  if (slug !== "fabrica-criativa") return false;
  location.replace("fabrica-criativa.html");
  return true;
}

function renderProduct(slug) {
  const p = PRODUCTS[slug];
  const root = document.getElementById("produto-root");
  if (!root || !p) return;
  document.title = `${p.name} — LORDS Creative`;
  const trilha = TRILHAS.find((t) => t.id === p.trilha);
  const trilhaName = trilha ? trilha.kicker.split("·").pop().trim() : "Soluções";
  const related = trilha ? trilha.slugs.filter((s) => s !== slug).slice(0, 3) : [];

  const bumps = (p.orderBumps || []).map((b) => `
    <label class="bump">
      <input type="checkbox" class="bump-check" />
      <span class="bump-mark" aria-hidden="true"></span>
      <span class="bump-body"><strong>${b.name}</strong><small>${b.desc}</small></span>
      <span class="bump-price">${b.price}</span>
    </label>`).join("");

  const relCard = (s) => {
    const r = PRODUCTS[s];
    return `
    <a class="pcard ${r.premium ? "pcard-premium" : ""} reveal" href="${r.slug === "fabrica-criativa" ? "fabrica-criativa.html" : `produto.html?p=${r.slug}`}">
      <span class="pcard-badge ${r.free ? "free" : ""}">${r.badge}</span>
      <h4 class="pcard-hook">${r.hook}</h4>
      <p class="pcard-name">${r.name}</p>
      <p class="pcard-tag">${r.tagline}</p>
      <span class="pcard-foot"><span class="pcard-from"><small>a partir de</small> ${r.from}</span><span class="pcard-cta">Ver tudo →</span></span>
    </a>`;
  };

  root.innerHTML = `
  <nav class="crumbs container"><a href="home.html#produtos">Soluções</a> <span>›</span> <a href="home.html#trilha-${p.trilha}">${trilhaName}</a> <span>›</span> <em>${p.name}</em></nav>

  <section class="prod-hero">
    <div class="prod-hero-glow" aria-hidden="true"></div>
    <div class="container prod-hero-grid">
      <div class="prod-hero-text">
        <span class="prod-badge ${p.free ? "free" : ""} ${p.premium ? "premium" : ""}">${p.badge}</span>
        <h1>${p.hook}</h1>
        <p class="prod-name">${p.name}</p>
        <p class="prod-tag">${p.tagline}</p>
        <div class="prod-price">
          ${p.priceMain.worth ? `<span class="pa-worth">${p.priceMain.worth}</span>` : ""}
          <span class="pa-price">${p.priceMain.price}${p.priceMain.note ? ` <small>${p.priceMain.note}</small>` : ""}</span>
        </div>
        <button class="btn btn-primary btn-cta" data-action="agendar">Quero este</button>
      </div>
      <div class="prod-hero-demo">${renderMockup(p.demo)}</div>
    </div>
  </section>

  <section class="section prod-block">
    <div class="container">
      <span class="prob-label">Soa familiar?</span>
      <div class="prod-problems">
        ${p.problems.map((q) => `<p class="pr-item reveal"><small>${q.niche}</small>“${q.text}”</p>`).join("")}
      </div>
    </div>
  </section>

  <section class="section prod-block">
    <div class="container prod-two">
      <div class="reveal">
        <h2 class="prod-h2">O que é</h2>
        <p class="prod-lead">${p.whatItIs}</p>
        <p class="prod-forwho"><strong>Pra quem é:</strong> ${p.forWho}</p>
      </div>
      <div class="value-stack reveal">
        <span class="vs-label">O que está incluso</span>
        <ul>${p.valueStack.map((v) => `<li>${v}</li>`).join("")}</ul>
      </div>
    </div>
  </section>

  <section class="section prod-block">
    <div class="container">
      <h2 class="prod-h2 center">Como funciona</h2>
      <div class="prod-steps">
        ${p.howItWorks.map((s, i) => `<div class="prod-step reveal"><span class="ps-num">${i + 1}</span><h4>${s.step}</h4><p>${s.text}</p></div>`).join("")}
      </div>
    </div>
  </section>

  ${p.configurator ? renderConfigurator(p.configurator) : (bumps ? `
  <section class="section prod-block">
    <div class="container">
      <h2 class="prod-h2">Turbine com order bumps</h2>
      <p class="lede prod-sub">Adicione o que faz sentido — a gente ganha junto e você entrega mais.</p>
      <div class="bumps reveal">${bumps}</div>
    </div>
  </section>` : "")}

  ${p.upsell ? `
  <section class="section prod-block">
    <div class="container">
      <div class="upsell reveal">
        <span class="upsell-tag">Próximo passo</span>
        <h3>${p.upsell.name}</h3>
        <p>${p.upsell.desc}</p>
      </div>
    </div>
  </section>` : ""}

  <section class="section prod-cta">
    <div class="container">
      <div class="final-card glass reveal">
        <div class="final-glow" aria-hidden="true"></div>
        <h2>${p.free ? "Comece agora — é grátis." : `Quer avançar com ${p.name}?`}</h2>
        <p>Fale com a LORDS e a gente monta isso pra você. Sem compromisso.</p>
        <button class="btn btn-primary btn-cta" data-action="agendar">Agendar diagnóstico gratuito</button>
      </div>
    </div>
  </section>

  ${related.length ? `
  <section class="section prod-block">
    <div class="container">
      <h2 class="prod-h2">Também nesta trilha</h2>
      <div class="pcards">${related.map(relCard).join("")}</div>
    </div>
  </section>` : ""}
  `;
}

/* ---------- Menu mobile ---------- */
function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (!navToggle || !mainNav) return;
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));
}

/* ---------- Modal Calendly ---------- */
function initModal() {
  const overlay = document.getElementById("agendar-modal");
  const embed = document.getElementById("modal-embed");
  const closeBtn = document.getElementById("modal-close");
  if (!overlay || !embed) return;
  let loaded = false;
  const open = () => {
    if (!loaded) {
      const url = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0f1e&text_color=eef2f8&primary_color=1f5fe0`;
      embed.innerHTML = `<iframe src="${url}" title="Agendar diagnóstico gratuito" loading="lazy"></iframe>`;
      loaded = true;
    }
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.querySelectorAll('[data-action="agendar"]').forEach((b) => b.addEventListener("click", open));
  closeBtn && closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && overlay.classList.contains("open")) close(); });
}

/* ---------- Reveal on scroll (robusto, sem IntersectionObserver) ---------- */
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

function boot() {
  const slug = getSlug();
  if (redirectIfDedicated(slug)) return;
  renderProduct(slug);
  initNav();
  initModal();
  initConfigurator();
  initReveal();
  window.scrollTo(0, 0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
