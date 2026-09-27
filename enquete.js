/* ============================================================
   enquete.js — Pré-diagnóstico LORDS
   Fluxo: 5 perguntas de qualificação → WhatsApp (ou Calendly fallback)
   Fase 1: sem backend — salva lead em localStorage + webhook opcional.
   Para ativar WhatsApp: setar WHATSAPP_NUM com o número completo (55 + DDD + número).
   ============================================================ */

const WHATSAPP_NUM = ""; // ex: "5547999999999" — quando preenchido, redireciona pro WA
const CALENDLY_URL = "https://calendly.com/lordropservice/30min";
const WEBHOOK_URL  = ""; // colar URL do n8n quando disponível

let overlay = null;

const PERGUNTAS = [
  { id: "negocio",  label: "Qual é o seu negócio?",               type: "select",
    opts: ["Estética / Clínica", "Imóveis de luxo", "Gastronomia / Restaurante", "Moda", "Automotivo", "Academia / Fitness", "E-commerce", "Outro"] },
  { id: "cidade",   label: "Em qual cidade você está?",           type: "text",   placeholder: "Ex: Balneário Camboriú" },
  { id: "desafio",  label: "Qual é o maior desafio hoje?",        type: "select",
    opts: ["Falta de presença digital", "Poucos clientes chegando", "Conteúdo sem resultado", "Marca sem identidade", "Preciso de mais autoridade", "Outro"] },
  { id: "fat",      label: "Faturamento mensal aproximado?",      type: "select",
    opts: ["Até R$ 20 mil", "R$ 20 – 80 mil", "R$ 80 – 300 mil", "Acima de R$ 300 mil", "Prefiro não informar"] },
  { id: "origem",   label: "Como nos encontrou?",                 type: "select",
    opts: ["Instagram", "TikTok", "Indicação", "Google", "Outro"] },
];

function formHTML() {
  const campos = PERGUNTAS.map((q) => `
    <label class="enq-field">
      <span class="enq-label">${q.label}</span>
      ${q.type === "select"
        ? `<select name="${q.id}" class="enq-input" required>
             <option value="">Selecione…</option>
             ${q.opts.map((o) => `<option>${o}</option>`).join("")}
           </select>`
        : `<input name="${q.id}" type="text" class="enq-input"
             placeholder="${q.placeholder || ""}" required maxlength="60">`}
    </label>`).join("");

  return `
    <button class="enq-close" data-enq-close aria-label="Fechar">&times;</button>
    <div class="enq-head">
      <h3>Diagnóstico gratuito</h3>
      <p>Responda em 1 minuto — receba um plano de prioridades grátis.</p>
    </div>
    <form class="enq-form" id="enq-form" novalidate>
      ${campos}
      <button type="submit" class="btn btn-primary btn-cta enq-submit">
        Agendar conversa estratégica →
      </button>
      <p class="enq-note">Sem compromisso. A gente entra em contato em até 24 h.</p>
    </form>`;
}

function ensureOverlay() {
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.className = "enq-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `<div class="enq-modal" id="enq-modal"></div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest("[data-enq-close]")) closeEnquete();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeEnquete();
  });
  return overlay;
}

function salvarLead(dados) {
  try {
    const arr = JSON.parse(localStorage.getItem("lords_leads") || "[]");
    arr.push({ ...dados, ts: new Date().toISOString() });
    localStorage.setItem("lords_leads", JSON.stringify(arr));
  } catch (_) {}

  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dados, ts: new Date().toISOString(), origem: "enquete" }),
    }).catch(() => {});
  }
}

function buildWAMsg(dados) {
  const linhas = PERGUNTAS.map((q) => `*${q.label.replace("?", "")}:* ${dados[q.id] || "—"}`);
  return `Olá! Quero meu diagnóstico gratuito.\n\n${linhas.join("\n")}`;
}

export function openEnquete() {
  const ov = ensureOverlay();
  const modal = ov.querySelector("#enq-modal");
  modal.innerHTML = formHTML();
  ov.classList.add("open");
  ov.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".enq-input")?.focus();

  modal.querySelector("#enq-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd    = new FormData(e.target);
    const dados = Object.fromEntries(fd.entries());

    const first = PERGUNTAS.find((q) => !dados[q.id]?.trim());
    if (first) { modal.querySelector(`[name="${first.id}"]`)?.focus(); return; }

    salvarLead(dados);

    const destino = WHATSAPP_NUM
      ? `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(buildWAMsg(dados))}`
      : CALENDLY_URL;
    window.open(destino, "_blank", "noopener");
    closeEnquete();
  });
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
