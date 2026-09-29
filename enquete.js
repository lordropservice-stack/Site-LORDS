/* ============================================================
   enquete.js — Diagnóstico LORDS (passo a passo)
   Usado pelo pop-up (home/Fábrica), pela página diagnostico.html
   e pelo carrinho da Fábrica. Termina na proposta personalizada.
   ============================================================ */
import {
  NICHOS, CIDADES, SERVICOS, PERGUNTAS, recomendar, linkProposta, mensagemWA,
  destinoFinal, salvarLocal, WHATSAPP_NUM, planosParaEscolha,
} from "./diagnostico-data.js?v=20260929a";

const CSS_HREF = "diagnostico.css?v=20260928p";
if (!document.querySelector(`link[href^="diagnostico.css"]`)) {
  const l = document.createElement("link");
  l.rel = "stylesheet"; l.href = CSS_HREF;
  document.head.appendChild(l);
}

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Monta o passo a passo dentro de `el`.
   opts: { origem, desconto, servicosIniciais[], perguntas (ids a pular), onFim(resultado) } */
export function montarDiagnostico(el, opts = {}) {
  const pular = new Set(opts.pular || []);
  const temPedido = Boolean(opts.planoFixo || (opts.servicosIniciais || []).length || (opts.bumps || []).length);
  const qs = PERGUNTAS.filter((p) => !pular.has(p.id) && !(p.semPedido && temPedido));
  const r = { servicos: [...(opts.servicosIniciais || [])] };
  let i = 0;

  const valido = (p) => {
    const v = r[p.id];
    if (p.optional) return true;
    if (Array.isArray(v) ? !v.length : !String(v || "").trim()) return false;
    if (p.outro && [].concat(v).includes("Outro") && !String(r[`${p.id}_outro`] || "").trim()) return false;
    if ((p.type === "nicho" || p.type === "cidade") && v === "Outro" && !String(r[`${p.id}_outro`] || "").trim()) return false;
    return true;
  };

  function corpo(p) {
    const v = r[p.id];
    const outroCampo = (show) => show ? `
      <input class="dg-input dg-outro" data-outro="${p.id}" type="text" maxlength="80"
        placeholder="Conte qual é (a gente usa isso na sua proposta)" value="${esc(r[`${p.id}_outro`] || "")}">` : "";
    if (p.type === "nicho") {
      return `
        <input class="dg-input dg-busca" type="search" placeholder="Busque o seu nicho" autocomplete="off">
        <div class="dg-nichos">${NICHOS.map((g) => `
          <p class="dg-grupo">${g.grupo}</p>
          <div class="dg-chips">${g.itens.map((n) => `<button type="button" class="dg-chip${v === n ? " on" : ""}" data-v="${esc(n)}">${esc(n)}</button>`).join("")}</div>`).join("")}
          <p class="dg-grupo">Não achou?</p>
          <div class="dg-chips"><button type="button" class="dg-chip${v === "Outro" ? " on" : ""}" data-v="Outro">Outro nicho</button></div>
        </div>
        ${outroCampo(v === "Outro")}`;
    }
    if (p.type === "cidade") {
      return `<div class="dg-chips">${[...CIDADES, "Outro"].map((c) => `<button type="button" class="dg-chip${v === c ? " on" : ""}" data-v="${esc(c)}">${c === "Outro" ? "Outra cidade" : esc(c)}</button>`).join("")}</div>
        ${outroCampo(v === "Outro")}`;
    }
    if (p.type === "plano") {
      const sug = recomendar(r).sugerido;
      const brl = (n) => "R$ " + Number(n).toLocaleString("pt-BR");
      return `<div class="dg-planos">${planosParaEscolha().map((pl) => `
        <button type="button" class="dg-plano${v === pl.id ? " on" : ""}${pl.id === sug ? " sug" : ""}" data-v="${pl.id}">
          ${pl.id === sug ? `<span class="dg-plano-tag">Recomendado para você</span>` : ""}
          <strong>Plano ${esc(pl.nome)}</strong>
          <span class="dg-plano-preco">${brl(pl.preco)}<i>/mês</i></span>
          <small>${esc(pl.resumo)}</small>
        </button>`).join("")}
        <button type="button" class="dg-opt${v === "indeciso" ? " on" : ""}" data-v="indeciso">Não sei. Quero que a LORDS me recomende.</button>
      </div>
      <p class="dg-dica">A recomendação usa o que você respondeu até aqui. Você pode mudar na conversa.</p>`;
    }
    if (p.type === "text") {
      return `<input class="dg-input" data-text="${p.id}" type="text" maxlength="80" placeholder="${esc(p.placeholder || "")}" value="${esc(v || "")}">`;
    }
    if (p.servicos) {
      const lista = (arr) => arr.map((s) => `
        <button type="button" class="dg-serv${r.servicos.includes(s.id) ? " on" : ""}${s.destaque ? " destaque" : ""}" data-s="${s.id}">
          <span>${esc(s.nome)}</span><i>${r.servicos.includes(s.id) ? "✓" : "+"}</i></button>`).join("");
      return `<p class="dg-grupo">Mais pedidos</p><div class="dg-servs">${lista(SERVICOS.filter((s) => s.destaque))}</div>
        <p class="dg-grupo">Serviços avulsos</p><div class="dg-servs">${lista(SERVICOS.filter((s) => !s.destaque))}</div>`;
    }
    const multi = p.type === "multi";
    const sel = [].concat(v || []);
    return `<div class="dg-opts">${p.options.map((o) => `<button type="button" class="dg-opt${sel.includes(o) ? " on" : ""}" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>
      ${multi ? `<p class="dg-dica">Pode marcar mais de uma.</p>` : ""}
      ${outroCampo(p.outro && sel.includes("Outro"))}`;
  }

  function render() {
    const p = qs[i];
    const pct = Math.round((i / qs.length) * 100);
    el.innerHTML = `
      <div class="dg-progress"><span style="width:${pct}%"></span></div>
      <p class="dg-step">Pergunta ${i + 1} de ${qs.length}</p>
      <h3 class="dg-q">${esc(p.q)}</h3>
      <div class="dg-body">${corpo(p)}</div>
      <div class="dg-nav">
        ${i > 0 ? `<button type="button" class="dg-back">Voltar</button>` : "<span></span>"}
        <button type="button" class="dg-next" ${valido(p) ? "" : "disabled"}>${i === qs.length - 1 ? "Ver minha proposta →" : "Continuar →"}</button>
      </div>`;
    const next = el.querySelector(".dg-next");
    const refresh = () => { next.disabled = !valido(p); };
    const auto = () => { if (valido(p)) avancar(); };

    el.querySelectorAll(".dg-chip").forEach((b) => b.addEventListener("click", () => {
      r[p.id] = b.dataset.v; render();
      if (b.dataset.v !== "Outro") setTimeout(auto, 120);
      else el.querySelector(".dg-outro")?.focus();
    }));
    el.querySelectorAll(".dg-plano").forEach((b) => b.addEventListener("click", () => {
      r[p.id] = b.dataset.v; render(); setTimeout(auto, 160);
    }));
    el.querySelectorAll(".dg-opt").forEach((b) => b.addEventListener("click", () => {
      if (p.type === "multi") {
        const s = new Set([].concat(r[p.id] || []));
        s.has(b.dataset.v) ? s.delete(b.dataset.v) : s.add(b.dataset.v);
        r[p.id] = [...s]; render();
        if (b.dataset.v === "Outro") el.querySelector(".dg-outro")?.focus();
      } else { r[p.id] = b.dataset.v; render(); setTimeout(auto, 120); }
    }));
    el.querySelectorAll(".dg-serv").forEach((b) => b.addEventListener("click", () => {
      const s = new Set(r.servicos); s.has(b.dataset.s) ? s.delete(b.dataset.s) : s.add(b.dataset.s);
      r.servicos = [...s]; render();
    }));
    el.querySelectorAll("[data-text]").forEach((inp) => {
      inp.addEventListener("input", () => { r[p.id] = inp.value; refresh(); });
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") auto(); });
      inp.focus();
    });
    el.querySelectorAll("[data-outro]").forEach((inp) => {
      inp.addEventListener("input", () => { r[`${p.id}_outro`] = inp.value; refresh(); });
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") auto(); });
    });
    const busca = el.querySelector(".dg-busca");
    busca && busca.addEventListener("input", () => {
      const t = busca.value.toLowerCase();
      el.querySelectorAll(".dg-nichos .dg-chip").forEach((c) => { c.hidden = t && !c.textContent.toLowerCase().includes(t) && c.dataset.v !== "Outro"; });
    });
    next.addEventListener("click", avancar);
    el.querySelector(".dg-back")?.addEventListener("click", () => { i -= 1; render(); });
  }

  function avancar() {
    if (!valido(qs[i])) return;
    if (i < qs.length - 1) { i += 1; render(); return; }
    finalizar();
  }

  function finalizar() {
    const resp = { ...r };
    ["nicho", "cidade", "desafio"].forEach((k) => {
      const outro = String(r[`${k}_outro`] || "").trim();
      if (!outro) return;
      resp[k] = Array.isArray(resp[k]) ? resp[k].map((x) => (x === "Outro" ? `Outro: ${outro}` : x)) : `Outro: ${outro}`;
    });
    const rec = recomendar(resp, opts.servicosExtras || []);
    if (opts.planoFixo) rec.plano = opts.planoFixo;
    const link = linkProposta(resp, rec, { desconto: opts.desconto || 0, bumps: opts.bumps || [] });
    const msg = mensagemWA(resp, rec, link, opts.origem || "site");
    salvarLocal({ ...resp, plano: rec.plano, proposta: link, origem: opts.origem });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "diagnostico_concluido", origem: opts.origem, plano: rec.plano, nicho: resp.nicho });
    const res = { respostas: resp, rec, link, msg, destino: destinoFinal(msg) };
    if (opts.onFim) { opts.onFim(res); return; }
    telaFinal(el, res);
  }

  render();
}

export function telaFinal(el, { rec, link, destino }) {
  const nome = rec.plano[0].toUpperCase() + rec.plano.slice(1);
  el.innerHTML = `
    <div class="dg-fim">
      <p class="dg-step">Diagnóstico concluído</p>
      <h3 class="dg-q">Sua proposta está pronta.</h3>
      <p class="dg-sub">${rec.escolhaDoCliente
        ? `Você escolheu o <strong>Plano ${nome}</strong>${rec.sugerido !== rec.plano ? `. Pelo seu diagnóstico, o ${esc(rec.sugerido[0].toUpperCase() + rec.sugerido.slice(1))} também faz sentido, e a gente mostra a diferença na conversa` : ", o mesmo que o diagnóstico indicou"}.`
        : `Recomendamos o <strong>Plano ${nome}</strong>${rec.motivos.length ? `: ${esc(rec.motivos[0])}` : ""}.`}</p>
      <a class="dg-cta" href="${esc(link)}" target="_blank" rel="noopener">Ver minha proposta →</a>
      <a class="dg-cta dg-cta--wa" href="${esc(destino)}" target="_blank" rel="noopener">${WHATSAPP_NUM ? "Enviar para a LORDS no WhatsApp" : "Agendar conversa estratégica"}</a>
      <p class="dg-dica">A proposta abre em uma nova aba com tudo o que você respondeu.</p>
    </div>`;
}

/* ---------------- Pop-up ---------------- */
let overlay = null;
function ensureOverlay() {
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.className = "enq-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `<div class="enq-modal dg-modal"><button class="enq-close" data-enq-close aria-label="Fechar">&times;</button><div class="dg-root"></div></div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest("[data-enq-close]")) closeEnquete();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeEnquete();
  });
  return overlay;
}

export function openEnquete(opts = {}) {
  const ov = ensureOverlay();
  ov.classList.add("open");
  ov.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  montarDiagnostico(ov.querySelector(".dg-root"), { origem: opts.origem || document.title.split(":")[0], ...opts });
}

export function closeEnquete() {
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Liga automaticamente todos os CTAs de diagnóstico da página. */
export function initEnquete() {
  document.querySelectorAll('[data-action="agendar"], [data-action="diagnostico"]').forEach((b) => {
    b.addEventListener("click", (e) => { e.preventDefault(); openEnquete(); });
  });
}
