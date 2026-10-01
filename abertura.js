/* Abertura compartilhada — as 3 primeiras telas são idênticas na home e na
   Fábrica Criativa (decisão do Lucas, 28/09/2026). Só o vídeo da VSL muda. */
import { METODO_LORDS } from "./products-data.js?v=20261001a";

const HERO_VIDEOS = [
  "reel-isa-5.mp4", "automotivo-1.mp4", "moda-feminina-3.mp4", "reel-jennifer-3.mp4",
  "suplementos-1.mp4", "otica-1.mp4", "eduarda-cinema-1.mp4", "reel-isa-2.mp4",
  "automotivo-2.mp4", "reel-jennifer-6.mp4", "reel-isa-1.mp4", "sequencia-01-1.mp4", "reel-lucas-0.mp4",
].map((f) => `assets/videos/hero/${f}`);
const HERO_DURATIONS = [3500, 6000]; // alterna vídeos curtos e longos

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* opts: { vslSrc, primaryHref } */
export function renderAbertura({ vslSrc, primaryHref = "fabrica-criativa.html" }) {


  return `
  <section class="ab-hero" id="hero" aria-label="Apresentação">
    <div class="ab-hero-shade" aria-hidden="true"></div>
    <div class="ab-scroll" aria-hidden="true"><span></span></div>
  </section>

  <section class="ab-vsl" id="vsl" aria-label="Vídeo">
    <div class="ab-wrap">
      <span class="ab-kicker">Assista ao vídeo</span>
      <h2 class="ab-h2">Veja como a LORDS trabalha</h2>
      <div class="ab-player">
        <video class="ab-vsl-vid" src="${vslSrc}" muted autoplay loop playsinline preload="metadata"></video>
        <button class="ab-sound" type="button" aria-pressed="false">Ativar som</button>
      </div>
      <div class="ab-ctas">
        <a class="ab-btn ab-btn--dark" href="${primaryHref}">Quero conhecer a Fábrica Criativa →</a>
        <a class="ab-btn ab-btn--outline" href="diagnostico.html">Agendar conversa estratégica →</a>
      </div>
    </div>
  </section>
`;
}

/* Os 5 passos do Método. Fica logo abaixo de "Onde atendemos" nas duas páginas. */
export function renderPassos() {
  const steps = METODO_LORDS.steps.map((s, i) => `
      <li class="ab-frame" style="--d:${i * 0.6}s">
        <span class="ab-frame-n">${s.n}</span>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
      </li>`).join("");
  return `
  <section class="ab-traj" id="metodo" aria-label="Como funciona">
    <div class="ab-wrap">
      <h2 class="ab-big"><span>5 passos</span> que se repetem todo mês.</h2>
      <p class="ab-lede">Você acompanha e aprova. A LORDS executa.</p>
      <ol class="ab-frames">${steps}</ol>
      <div class="ab-ctas ab-ctas--left"><a class="ab-btn ab-btn--gold" href="diagnostico.html">Agendar conversa estratégica →</a></div>
    </div>
  </section>`;
}

/* Foto apagada da pasta some da página (sem buraco branco nas esteiras). */
document.addEventListener("error", (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement)) return;
  (img.closest(".ps-item, .cob-item, .ab-card, .nicho-card, .fc-port-item, figure") || img).remove();
}, true);

/* Esteiras em loop (animam 0 → -50%): repete o conjunto até cada metade ter
   itens suficientes para cobrir telas largas — senão sobra faixa vazia. */
const LOOP_TRACKS = ".ps-inner, .cob-reel-inner, .est-track, .est2-reel-inner, .studio-track, .fc-logos-inner, .ht-track";
const MIN_ITEMS = 16;
export function fixLoops(root = document) {
  root.querySelectorAll(LOOP_TRACKS).forEach((track) => {
    const kids = [...track.children];
    if (kids.length < 2 || track.dataset.loopFixed) return;
    const half = kids.slice(0, Math.ceil(kids.length / 2)).map((k) => k.outerHTML);
    let unit = [...half];
    while (unit.length < MIN_ITEMS) unit = unit.concat(half);
    track.innerHTML = unit.join("") + unit.join("");
    const dur = parseFloat(getComputedStyle(track).animationDuration);
    if (dur) track.style.animationDuration = `${dur * unit.length / half.length}s`;
    track.dataset.loopFixed = "1";
    track.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; });
  });
}

export function initAbertura(root = document) {
  initHeroVideos(root);
  initVslSound(root);
}

/* Um <video> por arquivo, carregando em segundo plano. Alterna 3,5s e 6s e
   passa para o próximo que já tem imagem pronta; os que ainda carregam são pulados. */
function initHeroVideos(root) {
  const hero = root.querySelector(".ab-hero");
  if (!hero) return;
  hero.querySelectorAll(".ab-hero-vid").forEach((v) => v.remove());
  const shade = hero.querySelector(".ab-hero-shade");
  const vids = HERO_VIDEOS.map((src, i) => {
    const v = document.createElement("video");
    v.className = "ab-hero-vid";
    v.muted = true; v.playsInline = true; v.loop = true;
    v.preload = i < 3 ? "auto" : "metadata";
    v.setAttribute("aria-hidden", "true");
    v.src = src;
    hero.insertBefore(v, shade);
    return v;
  });
  let cur = 0;
  vids[0].classList.add("is-on");
  vids[0].play().catch(() => {});
  if (reduceMotion) return;
  let turn = 0;
  const next = () => {
    for (let step = 1; step < vids.length; step++) {
      const i = (cur + step) % vids.length;
      if (vids[i].readyState >= 3) {
        vids[i].play().catch(() => {});
        vids[i].classList.add("is-on");
        vids[cur].classList.remove("is-on");
        const old = vids[cur];
        setTimeout(() => old.pause(), 400);
        cur = i;
        break;
      }
      if (vids[i].preload !== "auto") { vids[i].preload = "auto"; vids[i].load(); }
    }
    turn += 1;
    setTimeout(next, HERO_DURATIONS[turn % HERO_DURATIONS.length]);
  };
  setTimeout(next, HERO_DURATIONS[0]);
}

function initVslSound(root) {
  const v = root.querySelector(".ab-vsl-vid");
  const btn = root.querySelector(".ab-sound");
  if (!v || !btn) return;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  }, { threshold: 0.25 }).observe(v);
  btn.addEventListener("click", () => {
    v.muted = !v.muted;
    btn.setAttribute("aria-pressed", String(!v.muted));
    btn.textContent = v.muted ? "Ativar som" : "Som ligado";
    if (!v.muted) { v.currentTime = 0; v.play().catch(() => {}); }
  });
}

