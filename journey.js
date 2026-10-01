/* ============================================================
   LORDS — journey.js · jornada animada (esteira / scrollytelling)
   Compartilhado por home.js e fabrica.js.
   Renderiza a esteira de um produto que tenha `journey` nos dados
   e anima as cenas conforme o scroll (com fallback flat no mobile).
   ============================================================ */
import { PRODUCTS } from "./products-data.js?v=20260929e";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Render da jornada (scrollytelling) ---- */
export function renderJourney(slug, mountId = "journey-mount") {
  const mount = document.getElementById(mountId);
  const p = PRODUCTS[slug];
  if (!mount || !p || !p.journey) return;
  const j = p.journey;

  // Card de vídeo com o NICHO no topo (o usuário sobe os .mp4 reais depois)
  const vcard = (clip, color) => `
    <div class="jvcard ${color}" data-src="${clip.src}">
      <span class="jvtop">${clip.niche}</span>
      <video muted loop playsinline preload="none"></video>
      <span class="jvplay" aria-hidden="true">▶</span>
    </div>`;

  const sell = (s) => s ? `<p class="jsell">${s}</p>` : "";

  // Renderiza cada etapa da solução conforme o seu kind
  const renderStep = (st) => {
    let body = "";
    const fig = (sh) => `<figure><img src="${sh.src}" alt="${sh.cap || ""}" loading="lazy" />${sh.cap ? `<figcaption>${sh.cap}</figcaption>` : ""}</figure>`;
    if (st.kind === "images-duo") {
      body = `<div class="jduo">${st.shots.map(fig).join("")}</div>`;
    } else if (st.kind === "gallery") {
      body = `<div class="jgallery">${st.shots.map(fig).join("")}</div>`;
    } else if (st.kind === "creative-stack") {
      body = `<div class="jstack">
        <figure class="jstack-main"><img src="${st.main.src}" alt="${st.main.cap || ""}" loading="lazy" />${st.main.cap ? `<figcaption>${st.main.cap}</figcaption>` : ""}</figure>
        <div class="jstack-col">${st.stack.map(fig).join("")}</div>
      </div>`;
    } else if (st.kind === "image") {
      body = `<div class="jshot"><img src="${st.src}" alt="${st.title}" loading="lazy" /></div>`;
    } else if (st.kind === "videos") {
      body = `<div class="jvideos">
        <div class="jvside"><span class="jvside-name ${st.left.color}">${st.left.people}</span><div class="jvgrid">${st.left.clips.map((c) => vcard(c, st.left.color)).join("")}</div></div>
        <div class="jvside"><span class="jvside-name ${st.right.color}">${st.right.people}</span><div class="jvgrid">${st.right.clips.map((c) => vcard(c, st.right.color)).join("")}</div></div>
      </div>`;
    } else if (st.kind === "arts") {
      const shots = (arr, cls) => arr.map((src) => `<div class="jart ${cls}"><img src="${src}" alt="arte" loading="lazy" /></div>`).join("");
      body = `<div class="jarts">
        <div class="jarts-side"><span>Feed</span><div class="jarts-grid">${shots(st.feed, "feed")}</div></div>
        <div class="jarts-side"><span>Story</span><div class="jarts-grid">${shots(st.story, "story")}</div></div>
      </div>`;
    }
    return `<div class="jscene jscene-step2">
      <h3 class="jsub">${st.title}</h3>
      ${sell(st.sell)}
      ${body}
    </div>`;
  };

  const c = j.cta;
  mount.innerHTML = `
  <section class="journey" id="journey-${p.slug}" aria-label="Jornada, ${p.name}">
    <div class="j-pin">
      <div class="jbg" aria-hidden="true"><div class="jbg-floor"></div><div class="jbg-glow"></div></div>
      <div class="j-stage">

        <div class="jscene jscene-intro">
          <span class="jkicker">${p.name}</span>
          <h2 class="jintro">${j.intro}</h2>
          <span class="jcue">avance, a informação vem até você</span>
        </div>

        <div class="jscene jscene-problems" data-weight="4" data-subreveal>
          <span class="jlabel red">${j.problemsLabel}</span>
          <div class="jproblems">${j.problems.map((q) => `<p class="jprob"><small>${q.niche}</small>“${q.text}”</p>`).join("")}</div>
        </div>

        ${j.steps.map(renderStep).join("")}

        <div class="jscene jscene-why">
          <div class="jwhy glass">
            <div class="final-glow" aria-hidden="true"></div>
            <h2>${c.title}</h2>
            <ul class="jwhy-list">${c.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
            <div class="price-anchor"><span class="pa-worth">${c.worth}</span><span class="pa-price">${c.price}${c.note ? ` <small>${c.note}</small>` : ""}</span></div>
            <button class="btn btn-primary btn-cta" data-action="agendar">${c.button}</button>
          </div>
        </div>

      </div>
      <span class="jprogress" aria-hidden="true"><span></span></span>
    </div>
  </section>`;
}

export function initJourneyVideos() {
  // Vídeos: passar o mouse reproduz (carrega sob demanda)
  document.querySelectorAll(".jvcard").forEach((card) => {
    const v = card.querySelector("video");
    const src = card.dataset.src;
    card.addEventListener("mouseenter", () => {
      if (v && !v.getAttribute("src") && src) v.setAttribute("src", src);
      if (v) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
      card.classList.add("playing");
    });
    card.addEventListener("mouseleave", () => { if (v) v.pause(); card.classList.remove("playing"); });
  });
}

// Esteira: tela FIXA (sticky) e as cenas AVANÇAM da profundidade conforme o scroll.
// Reutilizável: qualquer <section class="journey"> com .j-stage > .jscene ganha a animação.
// Cenas com data-weight ocupam mais scroll; data-subreveal revela os .jprob um a um.
export function initEsteira(root) {
  if (!root) return;
  const stage = root.querySelector(".j-stage");
  if (!stage) return;
  const jbg = root.querySelector(".jbg");
  const jbar = root.querySelector(".jprogress > span");
  const scenes = [...stage.querySelectorAll(".jscene")];
  const N = scenes.length;
  if (!N) return;
  const DEPTH = 1000;

  // Pesos por cena (data-weight): cena mais "longa" segura o foco por mais scroll
  const weights = scenes.map((s) => Math.max(1, parseFloat(s.dataset.weight) || 1));
  const starts = [];
  let W = 0;
  weights.forEach((w) => { starts.push(W); W += w; });

  // Modo decidido no 1º frame com viewport válido (pré-render pode ter largura 0).
  // REAVALIADO a cada resize/rotação: girar o celular trocava de largura sem trocar de
  // modo, e as cenas ficavam presas no 3D encolhidas (CTA virava 22×9px).
  let mode = null; // "flat" (mobile/sem movimento) | "3d"
  const decideMode = () => {
    if (!window.innerWidth) return false;
    const isMobile = window.matchMedia("(max-width: 680px)").matches;
    const next = (reduceMotion || isMobile) ? "flat" : "3d";
    if (next === mode) return true;
    mode = next;
    if (mode === "flat") {
      root.classList.add("j-flat");
      root.style.height = "";
      // limpa o estado 3D, senão as cenas continuam transformadas e minúsculas
      scenes.forEach((s) => {
        s.style.removeProperty("--z");
        s.style.removeProperty("--o");
        s.style.opacity = "1";
        s.style.zIndex = "";
        s.style.pointerEvents = "";
      });
    } else {
      root.classList.remove("j-flat");
      scenes.forEach((s) => { s.style.opacity = ""; });
      root.style.height = (W * 80 + 50) + "vh"; // comprimento de scroll da esteira
    }
    return true;
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    if (!mode && !decideMode()) return;
    if (mode === "flat") return;
    const rect = root.getBoundingClientRect();
    const total = root.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / (total || 1)));
    const pos = p * W;
    if (jbg) jbg.style.setProperty("--jb", (pos * 260).toFixed(0));
    if (jbar) jbar.style.width = (p * 100).toFixed(1) + "%";
    root.classList.toggle("j-active", rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5);
    scenes.forEach((s, i) => {
      const focusIn = starts[i] + 0.5;               // ponto em que a cena entra no foco
      const focusOut = starts[i] + weights[i] - 0.5; // ponto em que sai (igual a focusIn se peso 1)
      const d = pos < focusIn ? pos - focusIn : pos > focusOut ? pos - focusOut : 0;
      let o;
      if (d < -1.15 || d > 0.55) o = 0;
      else if (d < -0.4) o = (d + 1.15) / 0.75;
      else if (d <= 0.18) o = 1;
      else o = 1 - (d - 0.18) / 0.37;
      o = Math.max(0, Math.min(1, o));
      s.style.setProperty("--z", (d * DEPTH).toFixed(0) + "px");
      s.style.setProperty("--o", o.toFixed(3));
      s.style.zIndex = String(1000 - Math.round(Math.abs(d) * 100));
      s.style.pointerEvents = o > 0.6 ? "auto" : "none";
      s.classList.toggle("active", o > 0.7);

      // Reveal por grupos conforme o sub-progresso da cena.
      // Problemas: de 3 em 3 + o label surge com o 1º grupo. Passos do Método: 1 a 1.
      if (s.dataset.subreveal !== undefined) {
        const isProblems = s.classList.contains("jscene-problems");
        const items = [...s.querySelectorAll(isProblems ? ".jprob" : ".jstep")];
        const group = isProblems ? 3 : 1;
        const label = s.querySelector(".jlabel");
        const n = items.length;
        if (n) {
          const groups = Math.ceil(n / group);
          const sub = Math.max(0, Math.min(1, (pos - starts[i] - 0.4) / (weights[i] - 0.8)));
          if (label) label.classList.toggle("on", sub >= 0.5 / (groups + 1));
          items.forEach((el, k) => {
            const g = Math.floor(k / group);
            el.classList.toggle("on", sub >= (g + 0.5) / (groups + 1));
          });
        }
      }
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  // Ao redimensionar/girar, o modo precisa ser REAVALIADO — `update()` sozinho não faz isso
  // (ele só chama decideMode quando ainda não há modo), e era por isso que girar o celular
  // deixava as cenas presas no 3D.
  const onResize = () => { decideMode(); onScroll(); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize);
  // Espera o viewport ficar válido (pré-render/aba oculta tem largura 0) e inicia
  (function kick() {
    if (mode || decideMode()) update();
    else requestAnimationFrame(kick);
  })();
}
