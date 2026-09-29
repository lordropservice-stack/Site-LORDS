/* ============================================================
   LORDS — Catálogo de produtos (compartilhado: home + produto.html)
   3 trilhas por necessidade, ordenadas do mais acessível ao premium.
   ============================================================ */

/* Cada trilha pode ter `slugs` (cards de produto, via hrefFor) e/ou `cards`
   (cards livres que apontam pra página do Fábrica ou onde precisar). */
export const TRILHAS = [
  {
    id: "estrategista",
    icon: "🧭",
    kicker: "Estratégia",
    title: "Você precisa de um estrategista.",
    lede: "Direção, método e a base da comunicação, pra parar de atirar no escuro.",
    slugs: ["diagnostico-gratuito"],
  },
  {
    id: "creator",
    icon: "🎬",
    kicker: "Comunicação e Marketing",
    title: "Você precisa de rosto, conteúdo e alcance.",
    lede: "Presença de marca grande: estratégia + rosto + conteúdo editado + artes, e mídia paga pra levar às pessoas certas.",
    cards: [
      { badge: "Recorrente", hook: "Você é o rosto da sua marca, 6 vídeos/mês.", name: "Plano Capture", tagline: "Roteiro, captação com câmera e edição, todo mês.", from: "R$ 6.000/mês", href: "fabrica-criativa.html#planos" },
      { badge: "Mais escolhido", premium: true, hook: "Você + comunicadora como creator, 10 vídeos/mês.", name: "Plano Creator", tagline: "Produção audiovisual + comunicação, com fotos e artes.", from: "R$ 12.000/mês", href: "fabrica-criativa.html#planos" },
      { badge: "Premium", hook: "Você + comunicadora como rosto, 16 vídeos/mês.", name: "Plano Completo", tagline: "A operação inteira: vídeos, fotos, artes, drone e motion.", from: "R$ 17.900/mês", href: "fabrica-criativa.html#planos" },
      { badge: "Add-on", hook: "Leve seu conteúdo às pessoas certas.", name: "Gestão de Mídia Paga", tagline: "Gestor + agente de IA: campanhas em TikTok, Meta e Google, análise de concorrentes, criativos que performam e relatórios.", from: "R$ 4.500/mês", href: "fabrica-criativa.html#personalizar" },
    ],
  },
  {
    id: "sites",
    icon: "🌐",
    kicker: "Presença Digital",
    title: "Você precisa de um site que converte.",
    lede: "Site profissional com sua identidade, pronto para converter visitante em cliente.",
    slugs: ["criacao-de-sites"],
  },
  {
    id: "whatsapp",
    icon: "💬",
    kicker: "Vendas & WhatsApp",
    title: "Você precisa vender no automático.",
    lede: "Encha a agenda e transforme conversa em venda, 24h, sem contratar vendedor.",
    slugs: [],
    cards: [
      { badge: "Serviço · Fábrica", hook: "Atendimento humano no seu WhatsApp.", name: "Gestão de WhatsApp Humanizado", tagline: "Uma pessoa real cuidando das conversas e vendas, ou uma IA. Você escolhe.", from: "R$ 7.000/mês", href: "fabrica-criativa.html#personalizar" },
    ],
  },
];

/* ============================================================
   MÍDIA — a pasta manda no site.
   ------------------------------------------------------------
   `MEDIA` é a FONTE DA VERDADE: só nomes de arquivo por pasta.
   NÃO editar à mão — rode `node sync-midia.mjs` (a pasta gera isto).
   Pastas: assets/videos/{hero,portfolio/<nicho>} e assets/fotos/ (as mesmas para Home e Fábrica)
   O hero da HOME é curado em home.js (HERO_SHOWCASE), fora do sync.
   ============================================================ */
export const MEDIA = {
  /* SYNC:START */
  "hero": ["automotivo-1.mp4", "automotivo-2.mp4", "eduarda-cinema-1.mp4", "eduarda-desfile-1.mp4", "eduarda-fashion-1.mp4", "moda-feminina-3.mp4", "otica-1.mp4", "reel-isa-1.mp4", "reel-isa-2.mp4", "reel-isa-5.mp4", "reel-jennifer-3.mp4", "reel-jennifer-6.mp4", "reel-lucas-0.mp4", "referencia-personagens-em-cena.mp4", "sequencia-01-1.mp4", "suplementos-1.mp4"],
  "portfolio/moda": ["A285D55A-6F66-4650-B715-C2ABB93BE710.mp4", "C4698A88-993C-4965-96AE-E6FDD623A6DD.mp4", "copy_0EDB8DC7-91DC-4FF3-BD72-6DB73B2E22C4.mp4", "copy_6C0A2E24-3B54-436E-903C-86C5DFFB742C.mp4", "copy_8D7BBB7F-5CDB-4B32-B93B-0A432C9A8F71.mp4", "copy_9CDE81DF-12E5-4100-A540-3351A66C6C10.mp4", "copy_9D127908-CAA4-4CB8-82DD-1E152E5FF521.mp4", "copy_29C751B4-66F9-467B-AEC6-38B908D14DEF.mp4", "copy_35A50A16-E882-4D60-87BB-3B6C7A3620A7.mp4", "copy_045E1339-F18A-45E9-97D6-7301262B3C1E.mp4", "copy_186D2F37-241C-440D-BA1F-9F049A1BBBD7.mp4", "copy_211A3071-44E7-4A0F-B508-C5D13B1C887A.mp4", "copy_43497B6B-FC14-4AF6-BC7D-DB04352C5554.mp4", "copy_B51B855D-590D-41A0-B55B-5C1939375900.mp4", "copy_C14CC7EC-FDE7-4134-AC24-303F0A700D83.mp4", "copy_C997F814-CACE-4491-8E72-88916F3E0A90.mp4", "copy_CE315762-8861-4D16-86C3-0B69419842BA.mp4", "copy_D19E17F9-9AB9-4116-9EC8-035BA210A3FB.mp4", "copy_E0DFCCAC-89E3-44F1-AD8F-870E3975A8E3.mp4", "copy_E328772F-D6C1-4DB9-82E5-37FFC6C11236.mp4", "copy_E807114B-5971-4D8F-BF5D-709C549B0ACB.mp4", "copy_F0705528-89F7-4660-8CC1-C92D47EB4CE6.mp4", "copy_FD104FC4-0E82-41A6-9BEC-C8246C8D391B.mp4", "eduarda-fashion-1.mp4", "eduarda-maquiagem-1.mp4", "F8974E9E-1AF2-4093-B8BF-FAA4030BBE69.mp4", "FF4463BB-0C8B-4062-A19C-FBB676A7A8ED.mp4", "IMG_6959.mp4", "IMG_7056.mp4", "IMG_7203.mp4", "jenifer-mariel-copa.mp4", "moda-feminina-1.mp4", "moda-feminina-3.mp4", "moda-feminina-6.mp4", "moda-feminina-7.mp4", "moda-feminina-8.mp4", "moda-feminina-13.mp4", "moda-feminina-14.mp4", "moda-feminina-16.mp4", "moda-feminina-17.mp4", "moda-feminina-21.mp4", "moda-feminina-22.mp4"],
  "portfolio/comunicacao": ["comunicacao-1.mp4", "comunicacao-2.mp4", "comunicacao-3.mp4", "comunicacao-4.mp4", "comunicacao-7.mp4", "comunicacao-8.mp4", "comunicacao-9.mp4", "comunicacao-10.mp4", "comunicacao-11.mp4", "comunicacao-jenny-1.mp4", "eduarda-comercial-1.mp4", "eduarda-comercial-2.mp4", "eduarda-comercial-3.mp4"],
  "portfolio/gastronomia": ["gastronomia-1.mp4", "gastronomia-2.mp4"],
  "portfolio/suplementos": ["suplementos-1.mp4", "suplementos-3.mp4", "suplementos-4.mp4"],
  "portfolio/otica": ["otica-1.mp4", "via-firenze-2.mp4", "via-firenze-3.mp4"],
  "portfolio/automotivo": ["automotivo-1.mp4", "automotivo-2.mp4", "automotivo-3.mp4", "automotivo-4.mp4", "automotivo-5.mp4", "jenifer-lanzarin-collection.mp4"],
  "portfolio/cinema": ["eduarda-cinema-1.mp4", "eduarda-cinema-2.mp4"],
  "portfolio/desfile": ["eduarda-desfile-1.mp4", "eduarda-desfile-2.mp4"],
  "portfolio/hotelaria": ["jenifer-hotel-negrini-1.mp4", "jenifer-hotel-santa-inn-1.mp4"],
  "portfolio/imobiliario": ["imobiliaria-1.mp4"],
  "fotos": ["amanda-hotelaria-1.jpg", "amanda-lifestyle-2.jpg", "beleza-maquiagem.jpg", "eduarda-beachwear-01.jpg", "eduarda-beachwear-03.jpg", "eduarda-beachwear-05.jpg", "eduarda-beachwear-07.jpg", "eduarda-fashion-01.jpg", "eduarda-fashion-02.jpg", "eduarda-fashion-03.jpg", "eduarda-fashion-05.jpg", "eduarda-fashion-06.jpg", "eduarda-fashion-07.jpg", "eduarda-fashion-08.jpg", "eduarda-fashion-09.jpg", "eduarda-fashion-10.jpg", "eduarda-fashion-11.jpg", "eduarda-fashion-12.jpg", "eduarda-fashion-13.jpg", "eduarda-maquiagem-01.jpg", "eduarda-maquiagem-03.jpg", "eduarda-maquiagem-04.jpg", "foto-marca-de-roupa-pg.jpg", "foto-moda-03.jpg", "foto-moda-05.jpg", "foto-moda-06.jpg", "foto-moda-07.jpg", "foto-moda-08.jpg", "foto-moda-11.jpg", "foto-otica-5.jpg", "foto-supl-1.jpg", "foto-supl-2.jpg", "gastronomia.jpeg", "jenifer-fashion-01.jpg", "jenifer-fashion-02.jpg", "jenifer-fashion-03.jpg", "jenifer-fashion-06.jpg", "jenifer-fashion-07.jpg", "jenifer-fashion-08.jpg", "jenifer-fashion-09.jpg", "jenifer-fashion-10.jpg", "jenifer-fashion-11.jpg", "jenifer-fashion-12.jpg", "jenifer-fashion-13.jpg", "jenifer-fashion-14.jpg", "jenifer-fashion-15.jpg", "jenifer-fashion-16.jpg", "jenifer-fashion-17.jpg", "jenifer-fashion-18.jpg", "jenifer-fashion-21.jpg", "jenifer-fashion-dsc01236.png", "jenifer-fitness-01.jpeg", "jenifer-fitness-05.jpeg", "jenifer-fitness-06.jpeg", "jenifer-fitness-07.jpeg", "jenifer-fitness-15.jpeg", "jenifer-fitness-19.jpeg", "jenifer-fitness-35.jpeg", "jenifer-look-01.jpg", "jenifer-look-02.jpg", "jenifer-look-05.jpg", "jenifer-look-06.jpg", "jenifer-look-10.jpg", "jenifer-look-12.jpg", "jenifer-maquiagem-01.jpg", "jenifer-maquiagem-02.jpg", "jenifer-maquiagem-03.jpg", "luxo-e-carros.jpeg", "marca-de-roupa.jpg", "moda-cuidados-com-a-pele.jpg", "moda-feminina-foto-1.jpg", "moda-feminina-foto-2b.jpg", "modelo-vestido-de-casamento.jpeg", "otica-2.jpg", "otica-3.jpg"],
  "estudio": ["estudio-1.jpg", "estudio-2.jpg", "estudio-4.jpg", "estudio-5.jpg", "estudio-6.jpg", "estudio-7.jpg", "estudio-8.jpg", "estudio-9.mp4", "estudio-10.mp4", "estudio-11.mp4", "estudio-12.jpg", "estudio-13.jpg", "estudio-14.jpg", "estudio-15.mp4", "estudio-16.mp4", "estudio-17.mp4", "toninho-tornado.mp4"],
  "cobertura": ["balneario-camboriu.jpg", "curitiba.jpg", "florianopolis.jpg", "itajai.jpg", "itapema.jpg", "navegantes.jpg", "porto-belo.jpg", "rio-de-janeiro.webp", "sao-paulo.jpg"],
  /* SYNC:END */
};

const isVideoFile = (f) => /\.(mp4|mov|m4v|webm)$/i.test(f);
// Fotos/vídeos do local (seção "Onde atendemos") — pasta assets/cobertura/
export const COBERTURA_MEDIA = (MEDIA["cobertura"] || []).map((f) => ({ src: `assets/cobertura/${f}`, image: !isVideoFile(f) }));

/* Metadados curados de cada nicho (o que a mídia por si só não diz). */
const NICHE_META = [
  { id: "moda",        name: "Moda Feminina", icon: "👗", example: "Boutiques e marcas de moda" },
  { id: "comunicacao", name: "Comunicação",   icon: "📢", example: "Assessoria, PR e comunicação corporativa" },
  { id: "gastronomia", name: "Gastronomia",   icon: "🍽️", example: "Restaurantes, bares e delivery" },
  { id: "suplementos", name: "Suplementos",   icon: "💪", example: "Lojas e marcas de suplementação" },
  { id: "otica",       name: "Ótica",         icon: "👓", example: "Óticas e saúde visual" },
  { id: "automotivo",  name: "Automotivo",    icon: "🚗", example: "Mecânica · customização · lava-rápido · concessionária" },
  { id: "lancamento",  name: "Lançamento",    icon: "🚀", example: "Artistas e shows nacionais" },
  { id: "eventos",     name: "Eventos",       icon: "🎪", example: "Lançamentos e feiras" },
  { id: "arquitetura", name: "Arquitetura",   icon: "🏗️", example: "Projetos residenciais e corporativos" },
  { id: "imobiliario", name: "Imobiliário",   icon: "🏠", example: "Incorporadoras e imobiliárias" },
  { id: "hotelaria",   name: "Hotelaria",     icon: "🏨", example: "Hotéis e pousadas" },
  { id: "cinema",     name: "Cinema",        icon: "🎬", example: "Filmes, produções cinematográficas e conteúdo premium" },
  { id: "desfile",    name: "Desfile",       icon: "👑", example: "Passarelas, fashion weeks e eventos de moda" },
];

const fotoAlt = (f) => {
  const s = f.toLowerCase();
  if (s.includes("otica")) return "Ótica";
  if (s.includes("supl")) return "Suplementos";
  if (s.includes("gastro")) return "Gastronomia";
  if (s.includes("carro") || s.includes("luxo")) return "Automotivo";
  if (s.includes("fit")) return "Fitness";
  return "Moda";
};

function buildNiches() {
  const withMedia = [], noMedia = [];
  for (const m of NICHE_META) {
    const files = MEDIA[`portfolio/${m.id}`] || [];
    const niche = { ...m, media: files.map((f) => ({ type: "video", src: `assets/videos/portfolio/${m.id}/${f}`, thumb: "" })) };
    (niche.media.length ? withMedia : noMedia).push(niche);
  }
  return [...withMedia, ...noMedia];
}

export const NICHES_HOME = buildNiches();
const NICHES_FABRICA = NICHES_HOME;
export const PHOTO_REEL = (MEDIA["fotos"] || []).map((f) => ({ src: `assets/fotos/${f}`, alt: fotoAlt(f) }));
const FABRICA_REEL = (MEDIA["hero"] || []).map((f) => ({
  src: `assets/videos/hero/${f}`, thumb: "",
  label: f.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]\d+.*$/, "").replace(/^reel[-_]/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "LORDS",
  role: "LORDS",
}));

export const PRODUCTS = {
  /* ---------------- Trilha 1: Estrategista ---------------- */
  "diagnostico-gratuito": {
    slug: "diagnostico-gratuito", trilha: "estrategista", badge: "Grátis", free: true,
    name: "Diagnóstico Gratuito",
    hook: "Descubra onde seu dinheiro está vazando.",
    tagline: "Uma conversa de 30 min que já te entrega um plano de prioridades.",
    from: "Grátis",
    problems: [
      { niche: "Clínica", text: "Invisto em anúncio e não sei o que trava a agenda." },
      { niche: "Imobiliária", text: "Gero lead, mas não vira visita." },
      { niche: "Loja", text: "Posto todo dia e não vejo retorno." },
    ],
    whatItIs: "Uma conversa de 30 a 60 minutos em que a gente olha sua operação de marketing por fora e mostra, de forma honesta, onde está travando e o caminho mais curto pro seu momento.",
    valueStack: ["Análise da sua operação de marketing", "Mapa de Prioridades: 3 focos + próximos passos", "Recomendação do caminho mais curto", "Sem compromisso, você leva o mapa mesmo sem fechar"],
    howItWorks: [
      { step: "Intake", text: "3 a 5 perguntas rápidas antes da call." },
      { step: "Diagnóstico", text: "30 a 60 min olhando sua presença e seus números." },
      { step: "Mapa", text: "Você recebe as 3 prioridades e o próximo passo." },
    ],
    forWho: "Qualquer empresa que investe (ou quer investir) em marketing e sente que falta clareza.",
    priceMain: { worth: "Consultoria: R$ 1.500+", price: "Grátis", note: "30 min · sem compromisso" },
    demo: { type: "list", app: "Mapa de Prioridades", rows: [
      { title: "Padronizar o tom de voz", tag: "alta" },
      { title: "Ativar prospecção B2B", tag: "alta" },
      { title: "Documentar processos", tag: "média" },
    ] },
  },
  "biblia-marca": {
    slug: "biblia-marca", trilha: "estrategista", badge: "Brinde",
    name: "Bíblia de Marca & Tom de Voz",
    hook: "A fundação que faz tudo falar a mesma língua.",
    tagline: "Posicionamento + tom de voz + um prompt-base que faz qualquer IA soar como a sua marca.",
    from: "Incluso",
    problems: [
      { niche: "Franquia", text: "Cada post fala de um jeito, a marca não gruda." },
      { niche: "Escala", text: "Cada freela inventa um tom diferente." },
      { niche: "Automação", text: "A IA responde genérico, sem a voz da marca." },
    ],
    whatItIs: "O documento-fundação da sua comunicação: quem a marca é, como ela fala e por quê. Vira a base de tudo, anúncios, WhatsApp, e-mails e conteúdo, inclusive um prompt-base que faz qualquer IA falar exatamente como você.",
    valueStack: ["Posicionamento e essência da marca", "Tom de voz com exemplos por canal", "Do's e don'ts de comunicação", "Prompt-base reutilizável para qualquer IA", "Vira a base de anúncios, WhatsApp, e-mails e conteúdo"],
    howItWorks: [
      { step: "Imersão", text: "A gente mergulha na sua marca e público." },
      { step: "Construção", text: "Posicionamento, tom e exemplos por canal." },
      { step: "Entrega", text: "Documento + prompt-base pronto pra usar." },
    ],
    forWho: "Marcas que querem consistência e escalar comunicação sem perder identidade.",
    priceMain: { worth: "Branding de agência: R$ 8.000 a 15.000", price: "R$ 2.500", note: "uma vez ·, 20% no combo" },
    demo: { type: "tokens", tones: ["Sofisticado", "Acolhedor", "Confiante", "Claro"], note: "prompt-base que faz qualquer IA falar assim." },
  },
  /* "sops" removido em 28/09/2026: virou motor interno (captação de clientes
     incluída nos planos Creator e Completo) — não se vende avulso. */

  /* ---------------- Trilha 2: Creator & Comunicadora ---------------- */
  /* "video-avulso" (Pacote de Vídeo / Leo) removido em 08/08/2026:
     produção audiovisual já está inclusa no Plano Capture — não se vende avulso.
     O Leo segue como direção audiovisual dentro da Fábrica. */
  "fabrica-criativa": {
    slug: "fabrica-criativa", trilha: "creator", badge: "Recorrente", premium: true,
    name: "Fábrica Criativa",
    hook: "Sua operação de marketing inteira, num lugar só.",
    tagline: "Estratégia, rosto, conteúdo e execução, todo mês, com dado e sem você coordenar ninguém.",
    from: "R$ 6.000/mês",
    priceMain: {
      worth: "Time interno completo: R$ 34.500/mês com encargos",
      price: "R$ 6.000",
      note: "/ mês · plano Capture",
    },
    ctaPrimary: "Agendar conversa estratégica",
    ctaSecondary: "Ver os resultados",
    heroHook: "Sua empresa<br>vira referência.",
    heroSub: "Equipe especializada, estratégia para o seu nicho e conteúdo que realmente vende, <strong>a partir de R$ 6.000/mês</strong>.",
    heroTrio: ["estratégia", "criação", "execução"],

    /* ---- Reel do hero: ciclam como fundo de vídeo fullscreen ---- */
    reel: FABRICA_REEL,

    /* ---- Logo carousel: portfólio dos nossos profissionais ----
       ⚠️ BLOQUEADOR: enviar SVGs/PNGs para assets/logos/ + confirmar autorização de uso.
       Enquanto isso os placeholders aparecem com texto. ---- */
    logoReel: [
      { name: "Avaí FC",    src: "assets/logos/avai.png" },
      { name: "Cruzeiro",   src: "assets/logos/cruzeiro.png" },
    ],

    /* Usado pelo card e pela vitrine da home (renderVitrine lê problems[0]) */
    problems: [
      { niche: "Clínica", text: "Meu serviço é alto padrão, mas minha presença digital não passa isso." },
      { niche: "Imobiliária", text: "Preciso de rosto, vídeo e constância, não de post solto." },
      { niche: "Advocacia", text: "Não posso parecer amador, mas não tenho tempo pra rede social." },
    ],

    /* ---- Seção 2: VSL (vídeo institucional provisório até gravar com a Isa) ---- */
    vsl: {
      src: "assets/videos/hero/reel-lucas-0.mp4",
      caption: "Como a LORDS substitui uma operação inteira de marketing.",
      cta: "Ver os planos",
      pillars: [
        { icon: "🧭", title: "Estratégia antes de gravar", body: "Nada é gravado sem método. Cada vídeo tem um objetivo, um roteiro e um resultado esperado." },
        { icon: "🎬", title: "Equipe dedicada ao seu negócio", body: "Não é gestora de conta remota. É a equipe da LORDS, no estúdio ou na sua empresa." },
      ],
      planSummary: [
        { name: "Capture", price: "R$ 6.000/mês", hook: "Você como rosto da sua marca." },
        { name: "Creator", price: "R$ 12.000/mês", hook: "Você + comunicadora creator." },
        { name: "Completo", price: "R$ 17.900/mês", hook: "Operação de marketing completa." },
      ],
      avulsosBridge: "Não quer compromisso mensal agora? A gente entende.",
      avulsosBridgeSub: "Comece pelo que você precisa, de um dia de gravação à gestão completa.",
      avulsos: [
        { name: "Comunicadora Avulsa", hook: "Rosto e voz para sua marca num dia.", anchor: "#avulsos" },
        { name: "Modelo Avulsa", hook: "Fotos e vídeos visuais sem fala.", anchor: "#avulsos" },
        { name: "Cobertura de Evento", hook: "Videomaker profissional no seu evento.", anchor: "#avulsos" },
        { name: "Stories da Comunicadora", hook: "Presença diária no seu Instagram.", price: "R$ 3.500/mês", anchor: "#personalizar" },
        { name: "Gestão de Mídia Paga", hook: "Leve seu conteúdo às pessoas certas.", price: "R$ 4.500/mês", anchor: "#personalizar" },
        { name: "Criação de Sites", hook: "Site que converte visitante em cliente.", price: "a partir de R$ 6.000", anchor: "#personalizar" },
        { name: "Gestão WhatsApp Humanizado", hook: "Transforme conversa em venda.", price: "R$ 7.000/mês", anchor: "#personalizar" },
      ],
    },

    /* ---- Seções 3–6 REMOVIDAS da página (mantidas aqui para referência / VSL) ----
       orgChart, agencyQuotes, comparison e turn vivem na VSL — não na página de vendas.
       Motivo: o comparativo de custo faz o preço parecer barato; a copy de agência
       é melhor como argumento oral na conversa de fechamento.

    orgChart: { label: "A conta que ninguém faz", title: "O time de marketing que a sua empresa precisaria ter.",
      roles: [
        { role: "Social media", cost: 2500 }, { role: "Videomaker", cost: 3500 },
        { role: "Editor de vídeo", cost: 3000 }, { role: "Designer", cost: 2800 },
        { role: "Gestor de mídia paga", cost: 3500 }, { role: "Estrategista", cost: 5000 },
      ], total: 20300, withCharges: 34500,
      note: "E isso sem contar equipamento, software, estúdio, férias, décimo terceiro e o tempo que você vai gastar gerenciando seis pessoas.",
      kicker: "E tem uma coisa pior: se um deles pede demissão, você para.",
    },
    agencyQuotes: { label: "E a agência?", title: "Frases que a gente já ouviu de dezenas de empresários.",
      quotes: ["Eles postam, mas nada acontece.","Faz três semanas que eu não falo com ninguém de lá.",
        "Eles nunca vieram gravar. Usam foto de banco de imagem.","Eu que mando o conteúdo pra eles postarem.",
        "Eles me mandam um relatório que eu não entendo.","Quando eu pedi resultado, me mandaram print de alcance."],
      close: "O problema não é que agência é ruim. O problema é que a maioria vende <strong>postagem</strong>. E postagem não é marketing.",
    },
    comparison: { title: "Quais são as suas opções.",
      cols: ["Time interno","Agência tradicional","Mentoria ou curso","LORDS"],
      rows: [
        { label: "Custo mensal", cells: ["R$ 34.500 com encargos","Variável","Variável","A partir de R$ 8.000"] },
        { label: "Quem executa", cells: ["Seu time","A agência","Você mesmo","A LORDS"] },
        { label: "Captação com câmera", cells: ["Você contrata","Depende do contrato","Por sua conta","Incluso"] },
        { label: "Estratégia antes de gravar", cells: ["Depende do time","Depende do contrato","Você aprende a fazer","Incluso"] },
        { label: "Se alguém sai, a operação", cells: ["Para","Continua","—","Continua"] },
      ], note: "Mentoria te ensina a fazer. A LORDS faz.",
    },
    turn: { label: "A virada", title: "A LORDS não é agência e não é time interno.",
      lede: "A gente é uma operação inteira, terceirizada, que funciona com método.",
      points: ["Captação com câmera profissional, no estúdio ou no seu negócio",
        "Vídeos com qualidade de produção e legenda animada","Estratégia antes de qualquer gravação",
        "Você responde algumas perguntas. Uma vez. O resto é com a gente."],
    },
    ---------------------------------------------------------------- */

    /* ---- Seção 4: nichos atendidos — carrossel horizontal (12 nichos) ---- */
    niches: NICHES_FABRICA,

    photoReel: PHOTO_REEL,

    /* ---- Seção 8 REMOVIDA: formatos de conteúdo ----
       Substituída implicitamente pela apresentação dos nichos.
    formats: { title: "Que tipo de conteúdo o seu negócio precisa?", rows: [
      { format: "Institucional", why: "Autoridade e confiança" },
      { format: "Trend", why: "Alcance e relevância" },
      { format: "Viral", why: "Descoberta de audiência nova" },
      { format: "UGC", why: "Prova social e conversão" },
      { format: "Apresentação de produto", why: "Venda direta" },
    ], close: "Um advogado precisa de institucional..." },
    ---------------------------------------------------------------- */

    /* ---- Seção 9: quebra de objeções (VSL bloco 5) ---- */
    objections: [
      { q: "Eu não sei o que falar na câmera", a: "Você não precisa saber. A gente escreve o roteiro. Você lê, ou fala com suas palavras. E a gente grava quantas vezes for preciso." },
      { q: "Eu vou parecer amador", a: "Antes da gravação a gente te orienta sobre roupa. Se sua marca tem uniforme, a gente grava com uniforme. Se não tem, a gente recomenda o que conversa com o seu posicionamento. Você não vai descobrir na hora que escolheu errado." },
      { q: "Eu não quero aparecer", a: "Então a comunicadora aparece por você. No plano Completo, ela é o rosto da sua marca." },
      { q: "Não sei que tipo de conteúdo meu negócio precisa", a: "Não existe um formato certo. Existe o certo pro seu momento, e a gente define isso no diagnóstico." },
      { q: "Como vocês garantem que não vai ser mais do mesmo?", a: "Porque a gente não trabalha no achismo. A LORDS tem uma infraestrutura de inteligência artificial rodando por trás de cada cliente: um sistema que analisa seus concorrentes todo mês, outro que monitora as tendências do seu nicho, outro que sugere pauta toda semana e outro que lê seus números e te explica em português o que eles significam." },
      { q: "É caro", a: "Comparado com os R$ 15 a 25 mil por mês de um time interno? Nosso plano de entrada custa R$ 6.000. E a gente não pede férias." },
    ],

    /* ---- Seção 10: os planos (Premium está SUSPENSO — não entra) ---- */
    plans: [
      {
        id: "capture",
        name: "Plano Capture",
        short: "Capture",
        price: 6000,
        unit: "/mês",
        hook: "Produção mensal de 6 vídeos profissionais, com roteiro, planejamento, captação e edição para manter a marca presente nas redes sociais.",
        face: "Você",
        meetings: "1 encontro",
        videos: "6 vídeos",
        modality: "Estúdio em Itajaí ou captação no seu local: BC e região e Grande Florianópolis, sem taxa de deslocamento.",
        /* ⚠️ REGRA DE REDAÇÃO DOS PLANOS (definida com o fundador, 02/08/2026):
           os itens em comum têm que estar escritos com AS MESMAS PALAVRAS entre os
           planos e na MESMA ORDEM — o que muda é só o número (encontros/vídeos). O
           que é exclusivo de um plano vai em `extras`, por último dentro do grupo,
           com o marcador dourado "+". Mexeu num item comum? Mexe igual nos outros.
           Escopo do Capture: exatamente o briefing (07/08/2026) — sem publicação,
           artes, comunicadora ou mídia paga. Relatório/reunião mantidos por decisão
           do fundador (07/08/2026). */
        groups: [
          { title: "Estratégia", items: [
            "Planejamento dos vídeos",
            "Criação dos roteiros",
            "Cronograma mensal",
            "Aprovação prévia do cliente",
          ]},
          { title: "Produção", items: [
            "Captação de 6 vídeos",
            "Captação com câmera",
            "Edição dos 6 vídeos",
            "Entrega em formato vertical/mobile",
          ]},
          { title: "Acompanhamento", items: [
            "Relatório mensal",
            "Reunião mensal de estratégia",
          ]},
        ],
      },
      {
        id: "creator",
        name: "Plano Creator",
        short: "Creator",
        hero: true,
        flag: "Mais escolhido",
        price: 12000,
        unit: "/mês",
        hook: "Uma operação mensal de conteúdo com 10 vídeos roteirizados, captados e editados, combinando produção audiovisual e comunicação com creator.",
        face: "Você + Comunicadora",
        meetings: "1 encontro",
        videos: "10 vídeos",
        modality: "Estúdio em Itajaí ou captação no seu local: BC e região e Grande Florianópolis, sem taxa de deslocamento.",
        /* Mesma redação e mesma ordem do Completo nos itens em comum. Não citar
           nome próprio: "comunicadora", não "Isa" (decisão do fundador). */
        groups: [
          { title: "Estratégia", items: [
            "Diagnóstico completo do negócio",
            "Estratégia e linha editorial",
            "Roteiros de todos os vídeos",
            "Calendário de postagens",
            "Análise mensal de concorrente (agente de IA)",
          ]},
          { title: "Produção", items: [
            "1 encontro de captação",
            "10 vídeos editados com legenda animada",
            "Banco de brutos entregue ao cliente",
            "Comunicadora da marca como creator",
            "Ensaio de fotos institucionais",
          ]},
          { title: "Acompanhamento", items: [
            "Relatório mensal",
            "Reunião mensal de estratégia",
            "Grupo direto no WhatsApp com a equipe",
            "Prioridade na agenda de gravação",
          ]},
        ],
      },
      {
        id: "completo",
        name: "Plano Completo",
        short: "Completo",
        flag: "Operação completa",
        price: 17900,
        unit: "/mês",
        hook: "Uma operação completa de conteúdo e comunicação para empresas que precisam de estratégia, produção, presença e acompanhamento em um único parceiro.",
        face: "Você + Comunicadora",
        meetings: "2 encontros",
        videos: "16 vídeos",
        modality: "2 visitas no empreendimento, ou 1 visita + 1 estúdio.",
        /* Escopo herdado do antigo plano Autoridade (decisão do fundador, 07/08/2026).
           `extras` = o que só o Completo tem — entra por último, marcador "+". */
        groups: [
          { title: "Estratégia", items: [
            "Diagnóstico completo do negócio",
            "Estratégia e linha editorial",
            "Roteiros de todos os vídeos",
            "Calendário de postagens",
            "Análise mensal de concorrente (agente de IA)",
          ]},
          { title: "Produção", items: [
            "2 encontros de captação",
            "16 vídeos editados com legenda animada",
            "Banco de brutos entregue ao cliente",
          ], extras: [
            "Comunicadora da marca como rosto",
            "10 artes de feed + artes de story",
            "Stories",
            "Drone incluso",
            "Motion de boas-vindas no mês 1",
            "Ensaio de fotos institucionais",
          ]},
          { title: "Acompanhamento", items: [
            "Relatório mensal",
            "Reunião mensal de estratégia",
            "Grupo direto no WhatsApp com a equipe",
            "Prioridade na agenda de gravação",
          ], extras: [
            "Publicação de parte dos conteúdos pela equipe",
            "Banco de conteúdo organizado",
          ]},
        ],
      },
    ],

    /* Mockup do Painel do cliente LORDS renderizado via sPainelMock() no fabrica.js. */

    /* ---- Order bumps: mudam conforme o plano escolhido ----
       Preços definidos com o fundador em 02/08/2026. A ORDEM AQUI NÃO IMPORTA:
       `bumpsDoPlano()` em fabrica.js ordena por preço decrescente na hora de
       renderizar, nos três lugares (pílula do card, seção Personalize, carrinho).

       Campos: `recurring: true` = preço é mensal · `monthly` = mensalidade que
       soma a um valor de entrada único · `requires` = id de outro bump que
       precisa estar selecionado para este liberar.

       🔒 Margem é informação interna, nunca vai pro site. Registro no vault:
       stories da comunicadora R$ 3.500 (preço único, 27/09/2026), comunicadora paga por meia diária. ---- */
    bumps: {
      capture: [
        { id: "drone", name: "Drone na captação", price: 1500, recurring: false, desc: "Imagens aéreas no seu encontro de captação." },
        { id: "comunicadora", name: "Comunicadora, 1 visita", price: 2500, recurring: false, desc: "A comunicadora grava com você em uma visita, como rosto da marca." },
        { id: "trafego", name: "Gestão de mídia paga", price: 4500, recurring: true, desc: "Gestor + agente de IA: campanhas em TikTok, Meta e Google, análise de concorrentes, leitura dos criativos que performam e relatórios. A verba dos anúncios é paga por você." },
        { id: "posts", name: "5 posts (feed ou carrossel)", price: 1000, recurring: false, desc: "Cinco peças extras de feed ou carrossel." },
        /* `id` continua "stories-isa" de propósito: trocar quebraria o link
           "Quero este" e o `requires`. Só o texto visível fala em comunicadora —
           o site não cita nome próprio, pra oferta não depender de uma pessoa. */
        { id: "stories-isa", name: "Stories da comunicadora", price: 3500, recurring: true, desc: "Cerca de 14 sequências de stories por mês com a comunicadora no perfil da sua marca, gravadas em lote, presença constante sem você precisar aparecer." },
        { id: "mascote3d", name: "Mascote 3D da marca", price: 3000, recurring: false, desc: "Um personagem 3D exclusivo, criado pra sua marca e usado em todo o conteúdo." },
        { id: "gestao-redes", name: "Gestão de WhatsApp e redes sociais", price: 7000, recurring: true, requires: "trafego",
          desc: "A gente responde o WhatsApp e as redes e publica por você, todo dia." },
      ],
      creator: [
        { id: "drone", name: "Drone na captação", price: 1500, recurring: false, desc: "Imagens aéreas no seu encontro de captação." },
        { id: "trafego", name: "Gestão de mídia paga", price: 4500, recurring: true, desc: "Gestor + agente de IA: campanhas em TikTok, Meta e Google, análise de concorrentes, leitura dos criativos que performam e relatórios. A verba dos anúncios é paga por você." },
        { id: "posts", name: "5 posts (feed ou carrossel)", price: 1000, recurring: false, desc: "Cinco peças extras de feed ou carrossel." },
        { id: "stories-isa", name: "Stories da comunicadora", price: 3500, recurring: true, desc: "Cerca de 14 sequências de stories por mês com a comunicadora no perfil da sua marca, gravadas em lote, presença constante além dos vídeos do plano." },
        { id: "mascote3d", name: "Mascote 3D da marca", price: 3000, recurring: false, desc: "Um personagem 3D exclusivo, criado pra sua marca e usado em todo o conteúdo." },
        { id: "gestao-redes", name: "Gestão de WhatsApp e redes sociais", price: 7000, recurring: true, requires: "trafego",
          desc: "A gente responde o WhatsApp e as redes e publica por você, todo dia." },
      ],
      completo: [
        { id: "trafego", name: "Gestão de mídia paga", price: 4500, recurring: true, desc: "Gestor + agente de IA: campanhas em TikTok, Meta e Google, análise de concorrentes, leitura dos criativos que performam e relatórios. A verba dos anúncios é paga por você." },
        { id: "fotos", name: "Ensaio de fotos institucionais", price: 1200, recurring: false, desc: "Fotos realizadas pelo Videomaker no mesmo dia da visita." },
        { id: "posts", name: "5 posts extras", price: 1000, recurring: false, desc: "Cinco peças extras de feed ou carrossel." },
        { id: "site", name: "Criação e manutenção de site", price: 3500, recurring: false, monthly: 400, desc: "One-page no template LORDS com 1 rodada de ajuste. Manutenção com até 2 alterações mensais (R$ 400/mês)." },
        { id: "stories-isa", name: "Stories da comunicadora", price: 3500, recurring: true, desc: "Cerca de 14 sequências de stories por mês com a comunicadora no perfil da sua marca, gravadas em lote, presença constante além dos vídeos do plano." },
        { id: "mascote3d", name: "Mascote 3D da marca", price: 3000, recurring: false, desc: "Um personagem 3D exclusivo, criado pra sua marca e usado em todo o conteúdo." },
        { id: "vfx", name: "Edição VFX", price: 2500, recurring: false, desc: "Vídeo com efeitos visuais de cinema, o criativo que ninguém no seu nicho consegue fazer." },
        { id: "gestao-redes", name: "Gestão de WhatsApp e redes sociais", price: 7000, recurring: true, requires: "trafego",
          desc: "A gente responde o WhatsApp e as redes e publica por você, todo dia." },
      ],
    },

    /* ---- Seção 11: a promessa do excedente ---- */
    surplus: {
      title: "A promessa do excedente",
      text: "Seu contrato garante dez vídeos. Mas a gente não grava dez, a gente grava tudo o que couber no dia.",
    },

    /* ---- Seção 13: tecnologia LORDS (briefing 7.1) ---- */
    aiAgents: {
      label: "Tecnologia LORDS",
      title: "Uma infraestrutura de IA rodando por trás da sua conta.",
      lede: "Construída uma vez, serve todos os clientes. Não é enfeite, é o que faz a gente acertar mais rápido.",
      items: [
        { name: "Análise de Concorrência", what: "Monitora perfis concorrentes, formatos, frequência e engajamento.", out: "Relatório mensal comparativo" },
        { name: "Monitoramento de Tendências", what: "Rastreia trends, áudios e formatos em alta no seu nicho.", out: "Alerta semanal de oportunidade" },
        { name: "Sugestão de Pauta", what: "Cruza tendências, calendário e objetivos.", out: "Pauta semanal pronta" },
        { name: "Leitura de Performance", what: "Interpreta métricas e traduz em linguagem de negócio.", out: "Relatório mensal com recomendação" },
      ],
    },

    /* ---- Seção 14: FAQ ---- */
    faq: [
      /* ── Objeção: preço e valor ── */
      { q: "Por que não contratar um freelancer?", a: "Freelancer resolve uma parte: edição, ou a gravação, ou o roteiro. Você ainda precisa coordenar cada peça e garantir consistência. Com a LORDS você fecha um ciclo completo: estratégia → captação → edição → relatório. Um ponto de contato, entrega previsível todo mês." },

      /* ── Objeção: resultado e confiança ── */
      { q: "Como eu sei que vai funcionar pro meu negócio?", a: "O primeiro passo é o diagnóstico gratuito: a gente analisa seu negócio, seu mercado e sua presença antes de propor qualquer coisa. Se não fizer sentido pra você, a gente fala isso na hora, sem vender forçado." },
      { q: "Quanto tempo leva para ver resultado?", a: "Conteúdo de qualidade começa a gerar resultado em alcance e autoridade nos primeiros 30 dias. Conversão em clientes depende do seu ticket, do mercado e de quanto você impulsiona o conteúdo, mas empresas que mantêm consistência por 90 dias já percebem diferença clara na percepção da marca." },
      { q: "Preciso já ter uma comunicadora ou posso aparecer eu mesmo?", a: "Você escolhe. No Capture você é o rosto, a câmera e o roteiro são com a gente. No Creator uma comunicadora entra junto com você como creator da marca. E se preferir não aparecer, no Completo a comunicadora é o rosto da sua marca." },

      /* ── Objeção: operacional ── */
      { q: "Quanto do meu tempo isso exige?", a: "Em torno de 6 horas de gravação por mês, e pronto: conteúdo para o mês todo. Você responde o diagnóstico uma vez, participa do encontro de captação e o restante, roteiro, edição, artes, calendário e relatório, é com a gente." },
      { q: "Onde acontece a gravação?", a: "No nosso estúdio em Itajaí ou no seu negócio. Levamos a câmera até você em Balneário Camboriú, Camboriú, Itajaí, Navegantes, Itapema, Porto Belo, Bombinhas e na Grande Florianópolis (Florianópolis, São José, Palhoça e Biguaçu), sem taxa de deslocamento." },
      { q: "O que acontece se eu não gostar do conteúdo entregue?", a: "A LORDS trabalha com briefing validado antes de gravar e revisão após a edição. Se algum vídeo não ficou dentro do combinado, revisamos. A qualidade do que você aprovou na estratégia é o que vai para o seu feed." },
      { q: "Vocês atendem a minha cidade?", a: "Atendemos Balneário Camboriú e região (Camboriú, Itajaí, Navegantes, Itapema, Porto Belo, Bombinhas) e a Grande Florianópolis (Florianópolis, São José, Palhoça, Biguaçu), sem taxa de deslocamento. Outras cidades sob consulta." },
      { q: "A verba de anúncios está inclusa?", a: "Não. A gestão de mídia paga é um adicional de R$ 4.500/mês, inclui um gestor + agente de IA que analisa concorrentes, lê os criativos que performam e envia relatórios, além da estratégia e operação das campanhas. A verba investida nos anúncios é paga por você, direto na plataforma, você tem controle total do que gasta." },

      /* ── Objeção: compromisso e saída ── */
      { q: "Preciso assinar contrato de longo prazo?", a: "O contrato mínimo é de 3 meses, é o tempo que conteúdo precisa para mostrar consistência. Depois disso segue mensal, com renovação automática e aviso de cancelamento com antecedência, sem multa abusiva." },
      { q: "Vocês atendem mais de uma empresa do mesmo nicho?", a: "Sim. Cada cliente tem estratégia, roteiros e conteúdo próprios, construídos a partir do diagnóstico da sua marca. Nada é reaproveitado entre clientes." },
      { q: "Tenho desconto se indicar alguém?", a: "Sim. Se você é cliente e indica uma empresa que fecha com a LORDS, ganha 10% de desconto na sua próxima mensalidade, e a empresa indicada ganha 10% no primeiro mês. Esse desconto não soma com o do diagnóstico." },
      { q: "O LORDS Hub está em todos os planos?", a: "O Hub vem no Creator e no Completo. No Capture ele é liberado quando você renova por mais 3 meses de contrato." },
      { q: "Como funciona o Método LORDS?", a: "Em 5 passos: Diagnóstico (entendemos o negócio e a presença atual), Voz (como a sua marca fala), Pauta (prioridades e roteiros do mês), Produção (captação e edição) e Resultado (relatório e reunião mensal)." },
      { q: "E se meu negócio mudar de direção?", a: "Ajustamos o briefing. A estratégia é revisada mensalmente junto com o relatório de performance, se o seu posicionamento mudou, o conteúdo muda junto." },

      /* ── Região e logística de gravação ── */
      { q: "Preciso me deslocar até vocês para gravar?", a: "Não. Em qualquer plano você escolhe: gravamos no nosso estúdio em Itajaí ou levamos a câmera até o seu empreendimento, sem custo de deslocamento em BC e região e na Grande Florianópolis." },
      { q: "Meu negócio fica em cidade fora da lista de cobertura. Consigo contratar?", a: "Cidades fora da nossa área padrão: BC e região (Camboriú, Itajaí, Navegantes, Itapema, Porto Belo, Bombinhas) e Grande Florianópolis, são atendidas sob consulta. O custo de deslocamento é avaliado caso a caso. Faz o diagnóstico e a gente te responde com um cenário real." },
      { q: "Tenho mais de uma unidade. Vocês conseguem atender todas?", a: "Cada unidade tem sua própria operação de marketing, então cada uma tem um plano separado. O que acontece é que clientes com múltiplas unidades geralmente aceleram mais rápido, porque o sistema de produção já está rodando e só precisa ser replicado." },

      /* ── Primeiro produto / entrada ── */
      { q: "Qual plano vocês recomendam pra quem está começando?", a: "O Capture. É o ponto de entrada: 6 vídeos por mês com toda a operação, planejamento, roteiro, captação com câmera e edição, pra manter a marca presente sem pesar no orçamento de quem está estruturando o marketing pela primeira vez. Quando o conteúdo começa a converter, o passo natural é o Creator, com mais volume e uma comunicadora entrando como creator." },
      { q: "Por que não começar pelo plano mais completo logo?", a: "Porque o processo de gravação tem uma curva de adaptação. Você precisa entender o ritmo dos encontros, a linha editorial, o que funciona pra sua marca. O Capture ou o Creator é o lugar certo pra construir essa base. Quando o conteúdo está convertendo e a marca está estabelecida, o passo pra o Completo, com comunicadora como rosto, artes e o maior volume, faz muito mais sentido." },

      /* ── Serviços avulsos e parceria ── */
      { q: "Quais serviços posso contratar avulso?", type: "avulso" },
      { q: "Quero me tornar parceiro da LORDS.", a: "A LORDS abre vaga para videomaker, editor de vídeo, fotógrafo e gestor de mídia paga. Se você quer fazer parte da nossa rede de produção, manda uma mensagem pra gente.", partnerCta: true },
    ],

    /* ---- Seção 15: fechamento ---- */
    closing: {
      title: "Enquanto você hesita, o seu concorrente está gravando.",
      text: "Responda 4 perguntas, leva 1 minuto, e a gente marca uma conversa estratégica já sabendo do seu negócio. Não é apresentação de vendas: é um diagnóstico real.",
      button: "AGENDAR CONVERSA ESTRATÉGICA",
    },

    /* ---- Onde a LORDS atende (seção do mapa) ----
       x/y são coordenadas dentro do viewBox 0 0 520 420 do SVG em sCoverage(),
       derivadas da posição real de cada cidade (lat/lon) — o desenho é
       estilizado, mas as cidades ficam na posição certa umas em relação às
       outras. `base: true` = onde fica o estúdio (ganha o halo pulsante).
       `label` controla de que lado do ponto o nome aparece. ---- */
    coverage: {
      title: "Onde a LORDS atende",
      lede: "A gente leva a câmera até você: BC e região e Grande Florianópolis, sem taxa de deslocamento.",
      cities: [
        /* Navegantes e Itajaí são vizinhas (só o rio entre elas). No mapa real
           ficam a 11px uma da outra e os pontos se fundiam — afastadas aqui
           só o suficiente pra dar leitura, mantendo Navegantes ao norte. */
        { name: "Navegantes",          x: 345, y: 56,  label: "left",  dy: -6 },
        { name: "Itajaí",              x: 335, y: 88,  label: "left",  dy: 20, base: true, tag: "Estúdio LORDS" },
        { name: "Balneário Camboriú",  x: 362, y: 170, label: "left",  dy: 5 },
        { name: "Camboriú",            x: 343, y: 205, label: "left",  dy: 5 },
        { name: "Itapema",             x: 387, y: 274, label: "left",  dy: 5 },
        { name: "Porto Belo",          x: 446, y: 346, label: "left",  dy: 5 },
      ],
      note: "Estúdio em Itajaí. Captação no local em BC e região e na Grande Florianópolis, sem taxa de deslocamento.",
    },

    /* ---- Diagnóstico: 8 perguntas (briefing seção 4) ---- */
    diagnostic: {
      intro: "Responda em 5 minutos e a gente continua a conversa no WhatsApp já conhecendo o seu negócio.",
      questions: [
        { id: "segmento", q: "Qual o seu segmento?", type: "text", optional: true },
        { id: "local", q: "Onde fica o seu negócio?", type: "text", optional: true },
        { id: "rosto", q: "Quem aparece nos vídeos?", type: "choice", options: ["Eu", "Minha equipe", "Prefiro não aparecer"], bump: "comunicadora" },
        { id: "anuncios", q: "Você já investe em anúncios?", type: "choice", options: ["Sim", "Não", "Já tentei e não deu"], bump: "trafego" },
        { id: "clientes", q: "Quantos clientes novos por mês você quer?", type: "text" },
        { id: "marketing", q: "Quem cuida do seu marketing hoje?", type: "choice", options: ["Ninguém", "Eu mesmo", "Freelancer", "Agência"] },
        { id: "site", q: "Você tem site?", type: "choice", options: ["Sim", "Não"], bump: "site" },
        { id: "travamento", q: "Qual o seu maior travamento hoje?", type: "text" },
      ],
    },

    demo: { type: "videos", who: "comunicadora", clips: [{ label: "Reels · gancho" }, { label: "Reels · bastidor" }, { label: "Reels · oferta" }] },

    /* ---- ESTEIRA VERTICAL ARQUIVADA (02/08/2026) ----
       Substituída pelo carrossel horizontal de nichos.
       Código da animação em journey.js · initEsteira preservado.
       Para resgatar: descomentar o bloco abaixo e chamar renderJourney(SLUG) em fabrica.js.
       Obsidian: LORDS - SITE / Esteira Vertical — Arquivado.md
    journey: {
      intro: "Veja o que entra na sua Fábrica Criativa.",
      problemsLabel: "Problemas que resolvemos",
      problems: [
        { niche: "Clínica premium", text: "Meu serviço é alto padrão, mas minha presença digital não passa isso." },
        { niche: "Concessionária", text: "Quero postar bonito, mas não tenho tempo nem equipe pra manter." },
        { niche: "Boutique", text: "Contratei freela e todo mês a marca some do feed." },
        { niche: "Restaurante", text: "Quero virar referência na cidade — não ser só 'mais um'." },
        { niche: "Imobiliária", text: "Preciso de rosto, vídeo e constância — não de post solto." },
        { niche: "Academia", text: "Todo mundo posta treino. Eu preciso de algo que me diferencie de verdade." },
        { niche: "Advocacia", text: "Não posso parecer amador — mas também não tenho tempo pra rede social." },
        { niche: "E-commerce", text: "Invisto em anúncio, mas o perfil não sustenta a visita." },
        { niche: "Clínica odontológica", text: "Paciente pesquisa no Instagram antes de agendar. O meu não convence." },
        { niche: "Construtora", text: "Obra linda, feed morto. Ninguém vê o que a gente entrega." },
        { niche: "Salão de beleza", text: "Vivo cheio, mas dependo do boca a boca — nas redes eu sumo." },
        { niche: "Colégio", text: "Minha matrícula é sazonal e eu chego atrasado na comunicação." },
      ],
      steps: [
        {
          kind: "images-duo",
          title: "Um calendário de postagens pronto.",
          sell: "Você recebe o <strong>calendário de postagens</strong> com os <strong>roteiros de todos os vídeos</strong> — é só gravar e publicar.",
          shots: [
            { src: "assets/notion-stories.png", cap: "Calendário de stories" },
            { src: "assets/notion-feed.png", cap: "Calendário de feed" },
          ],
        },
        {
          kind: "videos",
          title: "O rosto da sua marca.",
          sell: "No <strong>Protagonista</strong> o rosto é você, com roteiro e direção. No <strong>Autoridade</strong>, a <strong>Isa entra como comunicadora</strong> da sua marca.",
          left: { people: "Você · Protagonista", color: "blue", clips: [
            { niche: "Restaurante", src: "assets/toninho-1.mp4" },
            { niche: "Academia", src: "assets/toninho-2.mp4" },
            { niche: "Varejo", src: "assets/toninho-3.mp4" },
            { niche: "Pet shop", src: "assets/toninho-4.mp4" },
          ] },
          right: { people: "Isa · Autoridade", color: "pink", clips: [
            { niche: "Clínica", src: "assets/videos/hero/reel-isa-1.mp4" },
            { niche: "Boutique", src: "assets/videos/hero/reel-isa-2.mp4" },
            { niche: "Estética", src: "assets/videos/hero/reel-isa-5.mp4" },
          ] },
        },
        {
          kind: "videos",
          title: "Vídeos editados com legenda animada.",
          sell: "<strong>10 vídeos</strong> no Protagonista, <strong>20</strong> no Autoridade — editados, com legenda animada, prontos pra publicar.",
          left: { people: "Edição criativa", color: "blue", clips: [
            { niche: "Lançamento", src: "assets/motion-1.mp4" },
            { niche: "E-commerce", src: "assets/motion-2.mp4" },
            { niche: "Evento", src: "assets/motion-3.mp4" },
            { niche: "Automotivo", src: "assets/motion-4.mp4" },
          ] },
          right: { people: "Legenda animada", color: "pink", clips: [
            { niche: "Nutrição", src: "assets/reels-1.mp4" },
            { niche: "Odontologia", src: "assets/reels-2.mp4" },
            { niche: "Moda", src: "assets/reels-3.mp4" },
            { niche: "Hotelaria", src: "assets/reels-4.mp4" },
          ] },
        },
        {
          kind: "arts",
          title: "Artes de feed e de story.",
          sell: "No <strong>Autoridade</strong>: <strong>10 artes de feed</strong> mais artes de story, já no formato do Instagram.",
          feed: ["assets/arte-feed-1.png", "assets/arte-feed-2.png", "assets/arte-feed-3.png", "assets/arte-feed-4.png", "assets/arte-feed-5.png", "assets/arte-feed-6.png"],
          story: ["assets/arte-story-1.png", "assets/arte-story-2.png", "assets/arte-story-3.png"],
        },
        {
          kind: "image",
          title: "Relatório mensal que você entende.",
          sell: "Todo mês você recebe o <strong>relatório</strong> — e a nossa IA traduz os números em linguagem de negócio, com recomendação.",
          src: "assets/metricas-dashboard.png",
        },
        {
          kind: "creative-stack",
          title: "Mídia paga — adicional.",
          sell: "<span class=\"jtag-add\">Adicional</span> <strong>Gestão de mídia paga por R$ 4.500/mês</strong> (gestor + agente de IA: concorrentes, criativos e relatórios). A verba de anúncio é investida por você.",
          main: { src: "assets/trafego-criativo.png", cap: "Criativo de anúncio" },
          stack: [
            { src: "assets/trafego-dash.png", cap: "Gestão de mídia paga" },
            { src: "assets/trafego-dash-2.png", cap: "Resultados da campanha" },
          ],
        },
      ],
      cta: {
        title: "Uma operação inteira trabalhando pela sua marca, todo mês.",
        points: [
          "Diagnóstico, estratégia e linha editorial antes de qualquer gravação.",
          "Captação com câmera profissional — no estúdio ou no seu negócio.",
          "Vídeos editados com legenda animada e calendário de postagens.",
          "Relatório mensal e banco de brutos entregue a você.",
          "Infraestrutura de IA analisando concorrente, tendência e performance.",
        ],
        worth: "Time interno completo: R$ 34.500/mês com encargos",
        price: "a partir de R$ 8.000", note: "/ mês",
        button: "FAZER MEU DIAGNÓSTICO GRATUITO",
      },
    },  ← fim do journey comentado
    ---------------------------------------------------------------- */
  },

  /* ---------------- Trilha 3: Vendas & WhatsApp ---------------- */
  /* prospeccao-b2b e cerebro-whatsapp removidos em 23/08/2026:
     ferramentas internas da LORDS — não vendidas publicamente. */
  "criacao-de-sites": {
    slug: "criacao-de-sites", trilha: "sites", badge: "Avulso",
    name: "Criação de Sites",
    hook: "Um site profissional que vende por você.",
    tagline: "Site sob medida, com sua identidade e foco em conversão, entregue rápido, sem enrolação.",
    from: "A partir de R$ 6.000",
    problems: [
      { niche: "Clínica", text: "Meu site parece amador e afasta clientes de alto padrão." },
      { niche: "Loja", text: "Tenho só Instagram, perco quem busca no Google." },
      { niche: "Prestador de serviço", text: "Meu site existe mas não converte nada." },
    ],
    whatItIs: "Criação de site profissional com identidade visual da sua marca, copy focada em conversão, responsivo, rápido e com SEO básico configurado. Você acompanha e aprova cada etapa.",
    valueStack: [
      "Briefing e estratégia de conversão",
      "Design sob medida na identidade da marca",
      "Responsivo (mobile + desktop)",
      "SEO básico configurado",
      "Integração com WhatsApp e formulários",
      "Entrega com treinamento de uso",
    ],
    howItWorks: [
      { step: "Briefing", text: "Entendemos sua marca, público e objetivo." },
      { step: "Design", text: "Layout aprovado antes de codar." },
      { step: "Entrega", text: "Site no ar com treinamento incluído." },
    ],
    forWho: "Negócios que precisam de presença digital profissional, sem depender só de redes sociais.",
    priceMain: { worth: "Freelancer de mercado: R$ 4.000 a 12.000", price: "A partir de R$ 6.000", note: "/ projeto · valor final conforme escopo" },
    orderBumps: [
      { name: "Blog + SEO avançado", price: "+ R$ 2.000", desc: "Estrutura de blog + configuração de SEO para ranquear no Google." },
      { name: "Integração e-commerce", price: "A consultar", desc: "Loja virtual integrada ao site." },
      { name: "Manutenção mensal", price: "R$ 500/mês", desc: "Atualizações, segurança e pequenas alterações todo mês." },
    ],
    demo: { type: "list", app: "Site · entregas", rows: [
      { title: "Briefing e wireframe", meta: "Semana 1", tag: "concluída" },
      { title: "Design aprovado", meta: "Semana 2", tag: "concluída" },
      { title: "Desenvolvimento", meta: "Semana 3", tag: "em andamento" },
    ] },
  },

  "stories-comunicadora": {
    slug: "stories-comunicadora",
    name: "Stories da Comunicadora",
    kicker: "Comunicação e Marketing",
    badge: "RECORRENTE",
    hook: "Sua marca nos Stories, todo dia, sem você aparecer.",
    tagline: "A comunicadora cria e publica stories diários pela sua marca.",
    from: "R$ 3.500/mês",
    href: "fabrica-criativa.html#personalizar",
    demo: null,
  },
};

/* ============================================================
   Mockups das demonstrações (device / telas) — compartilhado
   ============================================================ */
const tagClass = (t) => ({
  alta: "hot", média: "warm", ok: "ok", confirmada: "ok", agendado: "ok",
  pronto: "ok", roteiro: "neutral", ideia: "neutral",
}[t] || "neutral");

function phoneFrame(inner) {
  return `<div class="phone"><span class="phone-notch"></span>${inner}</div>`;
}
function mockChat(d) {
  const msgs = d.messages.map((m) =>
    m.from === "proof" ? `<span class="wa-proof">${m.text}</span>` : `<span class="wa-b ${m.from}">${m.text}</span>`
  ).join("");
  return phoneFrame(`<div class="wa">
    <div class="wa-top"><span class="wa-av">${d.who[0]}</span><span class="wa-id"><strong>${d.who}</strong><small>${d.status}</small></span><span class="wa-live"></span></div>
    <div class="wa-body">${msgs}</div>
  </div>`);
}
function mockList(d) {
  const rows = d.rows.map((r) => `
    <div class="scr-row">
      <span class="scr-dot"></span>
      <span class="scr-main"><strong>${r.title}</strong>${r.meta ? `<small>${r.meta}</small>` : ""}</span>
      ${r.tag ? `<span class="scr-tag ${tagClass(r.tag)}">${r.tag}</span>` : ""}
    </div>`).join("");
  return phoneFrame(`<div class="scr">
    <div class="scr-top"><span class="scr-app">${d.app}</span>${d.badge ? `<span class="scr-badge">${d.badge}</span>` : ""}</div>
    <div class="scr-body">${rows}</div>
  </div>`);
}
function mockAd(d) {
  return `<div class="adcard">
    <span class="ad-flag">${d.flag}</span>
    <div class="ad-media"><span>◈</span></div>
    <div class="ad-copy"><strong>${d.headline}</strong><p>${d.body}</p><span class="ad-cta">${d.cta}</span></div>
    <div class="ad-variants"><span class="ad-dots">${"●".repeat(d.variants)}</span><small>${d.variants} variações prontas</small></div>
  </div>`;
}
function mockTokens(d) {
  return `<div class="tokens">
    <span class="tokens-title">Tom de voz</span>
    <div class="tokens-chips">${d.tones.map((t) => `<span>${t}</span>`).join("")}</div>
    <div class="tokens-swatch"><i></i><i></i><i></i><i></i></div>
    <p class="tokens-note">${d.note}</p>
  </div>`;
}
function mockVideos(d) {
  const clips = d.clips.map((c) => `
    <div class="vclip">
      <span class="vclip-play">▶</span>
      <span class="vclip-label">${c.label}</span>
    </div>`).join("");
  return `<div class="videos">
    <div class="videos-strip">${clips}</div>
    <span class="videos-cap">com ${d.who}</span>
  </div>`;
}
export function renderMockup(demo) {
  if (!demo) return "";
  switch (demo.type) {
    case "chat": return mockChat(demo);
    case "adcard": return mockAd(demo);
    case "tokens": return mockTokens(demo);
    case "videos": return mockVideos(demo);
    default: return mockList(demo);
  }
}

/* ============================================================
   LORDS HUB — configuração (Fase 1, demo de frente)
   ------------------------------------------------------------
   Fonte única de: quais módulos cada plano vê, regras de coins
   (configuráveis, sem valores soltos no código) e catálogo de
   recompensas (só benefícios NÃO-financeiros nesta fase).
   ⚠️ Demo sem backend: nada aqui é persistido nem gera valor real.
   ============================================================ */

/* Todos os módulos possíveis do Hub (a ordem = ordem no menu). */
/* Telas da esteira do LORDS Hub (vitrine gamificada nas páginas). */
export const HUB_SCREENS = [
  ["🏠", "Dashboard", "Seu mês: 72%"],
  ["🎯", "Missões", "Cumpra e ganhe coins"],
  ["🛍️", "Loja do Clube", "Troque suas coins"],
  ["🎁", "Recompensas", "Brindes e benefícios"],
  ["🪙", "Coins", "1.240 disponíveis"],
  ["🎡", "Roleta", "Gire e ganhe brindes"],
  ["👥", "Comunidade", "Cases + insights"],
  ["✅", "Aprovações", "2 conteúdos"],
  ["🗓️", "Calendário", "Gravação 12/08"],
  ["📈", "Metas", "Evolução da marca"],
  ["🔔", "Notificações", "2 novas"],
];

export const HUB_MODULES = [
  { id: "dashboard",    label: "Dashboard",    icon: "" },
  { id: "conteudos",    label: "Conteúdos",    icon: "" },
  { id: "calendario",   label: "Calendário",   icon: "" },
  { id: "captacao",     label: "Captação de clientes", icon: "" },
  { id: "relatorio",    label: "Relatório do mês",     icon: "" },
  { id: "comunidade",   label: "Comunidade",   icon: "", comingSoon: true, hidden: true },
  { id: "missoes",      label: "Missões",      icon: "", comingSoon: true, hidden: true },
  { id: "recompensas",  label: "Recompensas",  icon: "", comingSoon: true, hidden: true },
  { id: "advisor",      label: "IA Advisor",   icon: "" },
  { id: "perfil",       label: "Perfil",       icon: "", hidden: true },
  { id: "projeto",      label: "Meu projeto",  icon: "", hidden: true },
  { id: "vault",        label: "Entregas",     icon: "", hidden: true },
  { id: "conquistas",   label: "Conquistas",   icon: "", hidden: true },
  { id: "ranking",      label: "Ranking",      icon: "", hidden: true },
  { id: "coins",        label: "Coins",        icon: "", hidden: true },
  { id: "notificacoes", label: "Notificações", icon: "", hidden: true },
  { id: "metas",        label: "Metas",        icon: "", hidden: true },
];

/* Acesso por plano. `enabled` = liberado · `locked` = aparece mas bloqueado
   (convida ao upgrade) · fora das duas listas = escondido.
   `premium` = recurso do Completo, ganha selo. */
/* Método LORDS — nome e passos oficiais (decisão do fundador, 27/09/2026).
   Renderizado na home (#metodo) e na Fábrica (sMetodoLords). */
export const METODO_LORDS = {
  kicker: "Como funciona",
  title: "Método LORDS",
  lede: "Cinco passos que se repetem todo mês. Você acompanha, aprova e a gente executa.",
  steps: [
    { n: "01", t: "Diagnóstico", d: "Entendemos o negócio, o público e como a marca aparece hoje." },
    { n: "02", t: "Voz", d: "Definimos o posicionamento da sua marca nas redes sociais e como ela fala: tom, temas e o que não fazer." },
    { n: "03", t: "Pauta", d: "Prioridades do mês, roteiros e calendário aprovados com você." },
    { n: "04", t: "Produção", d: "Captação no estúdio em Itajaí ou no seu local, edição e entrega." },
    { n: "05", t: "Resultado", d: "Relatório e reunião mensal para ajustar a rota do próximo mês." },
  ],
  note: "Contrato mínimo de 3 meses",
};

/* Hub: Creator e Completo incluem. No Capture o Hub é liberado ao renovar por
   mais 3 meses (decisão do fundador, 27/09/2026) — HUB_ACCESS.capture vale a
   partir dessa renovação. */
export const HUB_ACCESS = {
  capture: {
    label: "Capture",
    /* Comparativo de Planos: no Capture o Hub é liberado só ao renovar +3 meses. */
    enabled: ["perfil"],
    locked:  ["dashboard", "projeto", "conteudos", "vault", "calendario", "captacao", "relatorio", "notificacoes", "conquistas", "ranking", "coins", "advisor", "metas"],
    premium: [],
  },
  creator: {
    label: "Creator",
    enabled: ["dashboard", "projeto", "conteudos", "vault", "calendario", "captacao", "relatorio", "conquistas", "ranking", "coins", "notificacoes", "perfil"],
    locked:  ["metas", "advisor", "comunidade", "missoes", "recompensas"],
    premium: [],
  },
  completo: {
    label: "Completo",
    enabled: ["dashboard", "projeto", "conteudos", "vault", "calendario", "captacao", "relatorio", "conquistas", "ranking", "coins", "advisor", "notificacoes", "metas", "perfil"],
    locked:  ["comunidade", "missoes", "recompensas"],
    premium: ["metas", "advisor"],
  },
};

/* Regras de coins — configuráveis (sem valor fixo espalhado no código).
   Campos: id, ação, coins, limite diário, limite mensal, exige aprovação,
   ativo, início, fim. Curtir/comentar têm limite p/ evitar abuso.
   🔒 Coins são pontos internos: sem compra, sem saque, sem transferência. */
export const COINS_RULES = [
  { id: "perfil-completo",  acao: "Completar o perfil da empresa", coins: 250, limiteDia: null, limiteMes: 1,   exigeAprovacao: false, ativo: true, inicio: "2026-08-01", fim: null },
  { id: "prova-social",     acao: "Enviar prova social aprovada",  coins: 500, limiteDia: null, limiteMes: 4,   exigeAprovacao: true,  ativo: true, inicio: "2026-08-01", fim: null },
  { id: "depoimento",       acao: "Enviar depoimento aprovado",    coins: 500, limiteDia: null, limiteMes: 1,   exigeAprovacao: true,  ativo: true, inicio: "2026-08-01", fim: null },
  { id: "indicacao",        acao: "Indicar um amigo qualificado",  coins: 1000, limiteDia: null, limiteMes: 3,   exigeAprovacao: true,  ativo: true, inicio: "2026-08-01", fim: null },
  { id: "evento",           acao: "Participar de um evento",       coins: 500, limiteDia: null, limiteMes: 4,   exigeAprovacao: true,  ativo: true, inicio: "2026-08-01", fim: null },
  { id: "pesquisa",         acao: "Responder uma pesquisa",        coins: 250, limiteDia: null, limiteMes: 2,   exigeAprovacao: false, ativo: true, inicio: "2026-08-01", fim: null },
  { id: "aprovar-no-prazo", acao: "Aprovar conteúdo no prazo",     coins: 50,  limiteDia: 2,    limiteMes: 20,  exigeAprovacao: false, ativo: true, inicio: "2026-08-01", fim: null },
  { id: "insight",          acao: "Publicar um insight útil",      coins: 100, limiteDia: 2,    limiteMes: 15,  exigeAprovacao: true,  ativo: true, inicio: "2026-08-01", fim: null },
  { id: "comentario",       acao: "Comentar na comunidade",        coins: 10,  limiteDia: 5,    limiteMes: 50,  exigeAprovacao: false, ativo: true, inicio: "2026-08-01", fim: null },
  { id: "curtida",          acao: "Curtir uma publicação",         coins: 2,   limiteDia: 10,   limiteMes: 100, exigeAprovacao: false, ativo: true, inicio: "2026-08-01", fim: null },
];

/* Catálogo de recompensas — só benefícios NÃO-financeiros nesta fase.
   🔒 Sem Pix/dinheiro/desconto/crédito/sorteio (só com validação jurídica). */
export const REWARDS = [
  { id: "video-extra",    nome: "1 vídeo adicional no mês",    desc: "Um vídeo extra além do seu plano. A equipe confirma via WhatsApp em até 24h.",                                          custo: 6000, limiteCliente: 1, validadeDias: 60, status: "ativo",    exigeAprovacao: true  },
  { id: "carrossel-extra",nome: "1 carrossel adicional no mês",desc: "Um carrossel extra fora do calendário. A equipe confirma via WhatsApp em até 24h.",                                     custo: 2500, limiteCliente: 2, validadeDias: 30, status: "ativo",    exigeAprovacao: false },
  { id: "revisao-extra",  nome: "Revisão adicional",           desc: "Uma rodada extra de ajustes em um conteúdo já entregue. A LORDS entra em contato pelo WhatsApp em até 24h.",           custo: 2400, limiteCliente: 2, validadeDias: 30, status: "ativo",    exigeAprovacao: false },
  { id: "consultoria",    nome: "Consultoria de 30 min",       desc: "Uma call de estratégia com o time LORDS.",                                                                              custo: 4000, limiteCliente: 1, validadeDias: 45, status: "ativo",    exigeAprovacao: true  },
  { id: "encontro",       nome: "Acesso a encontro exclusivo", desc: "Vaga em um evento fechado de clientes LORDS.",                                                                          custo: 5000, limiteCliente: 1, validadeDias: 90, status: "em breve",  exigeAprovacao: true  },
];

/* ============================================================
   LORDS HUB — Gamificação (Missões + Loja do Clube) · demo
   Inspirado no club VIP; adaptado ao contexto LORDS (não-financeiro).
   ============================================================ */
export const HUB_MISSIONS = [
  { id: "m-perfil",   periodo: "diaria",    titulo: "Complete seu perfil",        regra: "Preencha os dados da empresa no Hub.",                 coins: 250, meta: 1, feito: 1, status: "concluida" },
  { id: "m-aprovar",  periodo: "diaria",    titulo: "Aprove no prazo",            regra: "Aprove 2 conteúdos dentro do prazo hoje.",             coins: 50,  meta: 2, feito: 1, status: "participando" },
  { id: "m-insight",  periodo: "diaria",    titulo: "Compartilhe um insight",     regra: "Publique 1 insight útil na comunidade.",               coins: 100, meta: 1, feito: 0, status: "aberta" },
  { id: "m-prova",    periodo: "semanal",   titulo: "Envie uma prova social",     regra: "Mande 1 print, depoimento ou vídeo do cliente (aprovado).", coins: 500, meta: 1, feito: 0, status: "aberta" },
  { id: "m-engaja",   periodo: "semanal",   titulo: "Engaje na comunidade",       regra: "Curta e comente 5 publicações esta semana.",           coins: 50,  meta: 5, feito: 2, status: "participando" },
  { id: "m-pesquisa", periodo: "quinzenal", titulo: "Responda a pesquisa",        regra: "Responda a pesquisa quinzenal de satisfação.",         coins: 250, meta: 1, feito: 0, status: "aberta" },
  { id: "m-indica",   periodo: "mensal",    titulo: "Indique um amigo",           regra: "Indique 1 empresa qualificada no mês.",                coins: 1000, meta: 1, feito: 0, status: "aberta" },
  { id: "m-evento",   periodo: "mensal",    titulo: "Participe de um evento",     regra: "Participe de 1 encontro/evento LORDS no mês.",         coins: 500, meta: 1, feito: 0, status: "aberta" },
];

/* Loja do Clube — troca coins por benefícios NÃO-financeiros / de operação.
   🔒 Sem dinheiro/Pix/sorteio. */
export const HUB_SHOP = [
  { id: "s-post",       nome: "5 posts extras",            custo: 1000, tipo: "Conteúdo" },
  { id: "s-destaque",   nome: "Destaque na comunidade",    custo: 1800, tipo: "Comunidade" },
  { id: "s-revisao",    nome: "Revisão adicional",         custo: 2400, tipo: "Produção" },
  { id: "s-consultoria",nome: "Consultoria de 30 min",     custo: 4000, tipo: "Estratégia" },
  { id: "s-video",      nome: "1 vídeo adicional no mês",  custo: 6000, tipo: "Produção" },
];
