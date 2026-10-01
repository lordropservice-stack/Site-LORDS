/* Diagnóstico LORDS — dados e regras compartilhados pela enquete (home/Fábrica),
   pela página diagnostico.html e pelo carrinho da Fábrica. */

import { PRODUCTS } from "./products-data.js?v=20260929e";

/* Número oficial (55 + DDD + número). Vazio = cai no Calendly. */
export const WHATSAPP_NUM = "";
export const CALENDLY_URL = "https://calendly.com/lordropservice/30min";

export const NICHOS = [
  { grupo: "Já temos portfólio", itens: [
    "Moda e boutiques", "Ótica", "Suplementos", "Automotivo", "Gastronomia e restaurantes",
    "Hotelaria e pousadas", "Imobiliário", "Marca pessoal e comunicação", "Eventos e desfiles",
  ] },
  { grupo: "Alto faturamento que também atendemos", itens: [
    "Clínica de estética e harmonização", "Odontologia", "Cirurgia plástica e dermatologia",
    "Clínica médica e saúde", "Advocacia", "Arquitetura e design de interiores",
    "Construtora e incorporadora", "Joalheria e relojoaria", "Concessionária e motos",
    "Náutico e marinas", "Academia, pilates e studio", "Educação e cursos",
    "Móveis planejados e decoração", "Energia solar", "Beach club, bar e vinheria",
    "Casamentos, buffet e festas", "Agência de viagens", "Pet premium",
    "Farmácia de manipulação", "Contabilidade e consultoria", "Mentor e infoprodutor", "Franquia",
  ] },
];

export const CIDADES = [
  "Balneário Camboriú", "Camboriú", "Itajaí", "Navegantes", "Itapema", "Porto Belo", "Bombinhas",
  "Florianópolis", "São José", "Palhoça", "Biguaçu",
];

/* Serviços que podem entrar no pedido. `bump` = id do add-on com preço na proposta. */
export const SERVICOS = [
  { id: "trafego",      nome: "Mídia paga (TikTok, Meta e Google)", destaque: true, bump: "trafego" },
  { id: "stories-isa",  nome: "Stories com a comunicadora no seu perfil", destaque: true, bump: "stories-isa" },
  { id: "site",         nome: "Criação de site", destaque: true, bump: "site" },
  { id: "gestao-redes", nome: "Gestão de redes e WhatsApp", destaque: true, bump: "gestao-redes" },
  { id: "comunicadora", nome: "Comunicadora para gravação avulsa" },
  { id: "fotografo",    nome: "Ensaio fotográfico", bump: "fotos" },
  { id: "drone",        nome: "Imagens de drone", bump: "drone" },
  { id: "real-time",    nome: "Videomaker real time (entrega no mesmo dia)" },
  { id: "modelo",       nome: "Modelo para ensaio ou campanha" },
  { id: "cobertura",    nome: "Cobertura de evento" },
  { id: "mascote3d",    nome: "Mascote 3D da marca", bump: "mascote3d" },
];

/* type: nicho | cidade | text | choice | multi. `outro: true` pede o detalhe por escrito. */
export const PERGUNTAS = [
  { id: "nicho",     q: "Qual é o seu negócio?", type: "nicho" },
  { id: "cidade",    q: "Em qual cidade você atende?", type: "cidade" },
  { id: "empresa",   q: "Nome da empresa e @ do Instagram", type: "text", placeholder: "Ex.: Ótica Visão · @oticavisao" },
  { id: "nome",      q: "E o seu nome?", type: "text", placeholder: "Como a gente te chama" },
  { id: "fat",       q: "Faturamento mensal aproximado", type: "choice",
    options: ["Até R$ 20 mil", "R$ 20 a 80 mil", "R$ 80 a 300 mil", "Acima de R$ 300 mil", "Prefiro não informar"] },
  { id: "ticket",    q: "Quanto vale, em média, um cliente novo para você?", type: "choice",
    options: ["Até R$ 500", "R$ 500 a 3 mil", "R$ 3 mil a 20 mil", "Acima de R$ 20 mil"] },
  { id: "desafio",   q: "O que mais trava o seu marketing hoje?", type: "multi",
    options: ["Não tenho constância de conteúdo", "Conteúdo não vira cliente", "Minha marca não passa o padrão que eu entrego",
      "Não tenho tempo nem equipe", "Anúncio caro e sem retorno", "Não apareço no Google", "Outro"], outro: true },
  { id: "rosto",     q: "Quem aparece nos vídeos?", type: "choice",
    options: ["Eu mesmo apareço bem", "Minha equipe", "Preciso de alguém para ser o rosto da marca"] },
  { id: "marketing", q: "Quem cuida do seu marketing hoje?", type: "choice",
    options: ["Ninguém", "Eu mesmo", "Freelancer", "Agência", "Equipe interna"] },
  { id: "anuncios",  q: "Você investe em anúncios?", type: "choice",
    options: ["Sim, e funciona", "Sim, mas sem retorno", "Já tentei e parei", "Nunca investi"] },
  { id: "site",      q: "Você tem site?", type: "choice", options: ["Sim, e está bom", "Sim, mas precisa de um novo", "Não tenho"] },
  { id: "meta",      q: "Quantos clientes novos por mês você quer?", type: "choice",
    options: ["Até 10", "10 a 30", "30 a 100", "Mais de 100"] },
  { id: "plano",     q: "Pelo que você contou, qual plano combina mais com você?", type: "plano", semPedido: true },
  { id: "servicos",  q: "Quer incluir algum desses serviços?", type: "multi", servicos: true, optional: true },
  { id: "quando",    q: "Quando você quer começar?", type: "choice",
    options: ["Este mês", "Nos próximos 30 dias", "Em 2 a 3 meses", "Só pesquisando"] },
];

const has = (v, s) => (Array.isArray(v) ? v : [v]).some((x) => String(x || "").includes(s));

/* Cards da pergunta "plano": preço e resumo vêm do products-data (fonte única). */
const DESTAQUES = {
  capture: "Você é o rosto. 6 vídeos por mês com roteiro, captação e edição.",
  creator: "10 vídeos por mês, comunicadora como rosto e captação de clientes para você.",
  completo: "16 vídeos, 2 encontros, artes, drone e captação de clientes. Presença completa.",
};
export function planosParaEscolha() {
  return (PRODUCTS["fabrica-criativa"]?.plans || []).map((pl) => ({
    id: pl.id, nome: pl.short || pl.name, preco: pl.price, resumo: DESTAQUES[pl.id] || pl.hook,
  }));
}

/* Plano + add-ons recomendados a partir das respostas. */
export function recomendar(r, escolhidos = []) {
  const alto = has(r.fat, "80 a 300") || has(r.fat, "Acima");
  const topo = has(r.fat, "Acima") || has(r.ticket, "Acima de R$ 20");
  const precisaRosto = has(r.rosto, "Preciso");
  let plano = "capture";
  if (precisaRosto || alto) plano = "creator";
  if (topo || (alto && has(r.meta, "Mais de 100"))) plano = "completo";

  const sugerido = plano;
  if (r.plano && r.plano !== "indeciso") plano = r.plano;
  const servicos = new Set([...(r.servicos || []), ...escolhidos]);
  if (has(r.anuncios, "sem retorno") || has(r.anuncios, "parei") || has(r.desafio, "Anúncio")) servicos.add("trafego");
  if (has(r.site, "novo") || has(r.site, "Não tenho") || has(r.desafio, "Google")) servicos.add("site");
  if (plano === "capture" && precisaRosto) servicos.add("comunicadora");
  if (has(r.marketing, "Ninguém") && servicos.has("trafego")) servicos.add("gestao-redes");

  const motivos = [];
  if (precisaRosto) motivos.push("a marca precisa de um rosto, e a comunicadora entra a partir do Creator");
  if (plano !== "capture") motivos.push("o Creator e o Completo incluem a captação de clientes para o seu negócio");
  if (servicos.has("trafego")) motivos.push("mídia paga para o conteúdo virar cliente");
  if (servicos.has("site")) motivos.push("site para você aparecer no Google e converter");
  return { plano, sugerido, escolhaDoCliente: Boolean(r.plano && r.plano !== "indeciso"), servicos: [...servicos], motivos };
}

export function textoResposta(v) {
  const t = Array.isArray(v) ? v.join(", ") : String(v || "");
  return t.replace(/Outro: /g, "");
}

/* Link da proposta.html com tudo preenchido. */
export function linkProposta(r, rec, { desconto = 0, bumps = [] } = {}) {
  const bumpIds = [...new Set([...bumps, ...SERVICOS.filter((s) => rec.servicos.includes(s.id) && s.bump).map((s) => s.bump)])];
  const avulsos = SERVICOS.filter((s) => rec.servicos.includes(s.id) && !s.bump).map((s) => s.nome);
  const sobre = [
    `${textoResposta(r.nicho)} em ${textoResposta(r.cidade)}.`,
    r.desafio ? `Hoje o que mais trava: ${textoResposta(r.desafio).toLowerCase()}.` : "",
    rec.motivos.length ? `Por isso recomendamos: ${rec.motivos.join("; ")}.` : "",
  ].filter(Boolean).join(" ");
  const q = new URLSearchParams({
    cliente: String(r.empresa || r.nome || "").split("·")[0].trim(),
    plano: rec.plano, prazo: "3", sobre,
  });
  if (bumpIds.length) q.set("extras", bumpIds.join(","));
  if (avulsos.length) q.set("avulsos", avulsos.join("|"));
  if (desconto) q.set("desconto", String(desconto));
  return `${location.origin}${location.pathname.replace(/[^/]*$/, "")}proposta.html?${q}`;
}

export function mensagemWA(r, rec, link, origem) {
  const linhas = PERGUNTAS
    .filter((p) => r[p.id] && (!Array.isArray(r[p.id]) || r[p.id].length))
    .filter((p) => p.id !== "plano")
    .map((p) => `• ${p.q.replace(/\?$/, "")}: ${p.id === "servicos"
      ? SERVICOS.filter((s) => r.servicos.includes(s.id)).map((s) => s.nome).join(", ")
      : textoResposta(r[p.id])}`);
  return [`Olá! Fiz o diagnóstico da LORDS (${origem}).`, "", ...linhas, "",
    rec.escolhaDoCliente
      ? `Plano que escolhi: ${cap(rec.plano)}${rec.sugerido !== rec.plano ? ` (o diagnóstico sugeriu ${cap(rec.sugerido)})` : ""}`
      : `Plano recomendado: ${cap(rec.plano)}`, `Minha proposta: ${link}`].join("\n");
}

const cap = (t) => t[0].toUpperCase() + t.slice(1);

export function destinoFinal(msg) {
  return WHATSAPP_NUM ? `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}` : CALENDLY_URL;
}

export function salvarLocal(dados) {
  try {
    const arr = JSON.parse(localStorage.getItem("lords_leads") || "[]");
    arr.push({ ...dados, ts: new Date().toISOString() });
    localStorage.setItem("lords_leads", JSON.stringify(arr.slice(-20)));
  } catch (_) {}
}
