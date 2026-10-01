/* ============================================================
   LORDS — global.js · International sales pages (EN + ES)
   Reads document.documentElement.lang ("en" | "es") to pick strings.
   Plans priced in USD. Data is self-contained — no import from products-data.js.
   ============================================================ */

const lang = document.documentElement.lang === "es" ? "es" : "en";

const WHATSAPP_NUM = "";
const CALENDLY_URL = "https://calendly.com/lordropservice/30min";

const fmt = (n) =>
  new Intl.NumberFormat(lang === "es" ? "es-419" : "en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(n);

/* ============================================================
   STRINGS (bilingual)
   ============================================================ */
const T = {
  en: {
    nav: ["How it works", "Portfolio", "Plans", "Questions"],
    navCta: "Get a free diagnostic",
    heroLabel: "Brazilian content, produced locally.",
    heroH1: "Your brand in Brazil — strategy, production and publishing, all in one team.",
    heroSub: "We produce professional videos, photos and social content in Balneário Camboriú. Our trilingual communicator (EN · ES · PT) represents your brand — or yours does. Starting at $1,500/mo.",
    heroCta1: "See plans",
    heroCta2: "Book a free call",
    vslLabel: "How it works",
    vslH2: "One team handles everything — you just approve.",
    vslSub: "Strategy, scripts, filming, editing, publishing. Every month. You review content before it goes live in your LORDS Hub.",
    commLabel: "Your brand's voice in Brazil",
    commH2: "A trilingual communicator as the face of your brand.",
    commSub: "She speaks English, Spanish and Portuguese — and represents your brand on camera in all three. You don't need to travel. You don't need to appear on camera. We handle it.",
    commBadge1: "Fluent English",
    commBadge2: "Fluent Spanish",
    commBadge3: "Native Portuguese",
    commNote: "Available in Creator and Full plans.",
    langBadgeLabel: "Your communication, your language",
    langBadgeSub: "Scripts, captions and client communication delivered in the language your brand needs — English, Spanish or Portuguese.",
    plansH2: "Our Plans",
    plansQ: "Do you want to appear on camera — or should our communicator represent your brand?",
    hubLabel: "Client Hub",
    hubH2: "You approve everything before it goes live.",
    hubSub: "Access your LORDS Hub: content calendar, approval feed, metrics and competitor analysis. Change a post date with one tap. Included in every plan.",
    hubNote: "Illustrative panel — your version is set up with your brand.",
    covLabel: "Where we film",
    covH2: "Based in Balneário Camboriú — Brazil's premium coast.",
    covSub: "We film at your business, on the beach or at our studio in Itajaí. No travel fee within the Balneário Camboriú region. São Paulo, Rio de Janeiro and Florianópolis: available — consult us for pricing.",
    personalizeLabel: "Build your plan",
    personalizeH2: "Customize your plan",
    personalizeSub: "No two brands are the same. Pick a base plan and add only what makes sense for your moment — we finalize the combination on the diagnostic call.",
    personalizeNote: "Don't see what you need? We build custom packages — just reach out.",
    faqH2: "Frequently asked questions",
    closingH2: "Ready to start?",
    closingSub: "Book a free 30-minute call. We'll show you exactly what your brand can look like — and what it would cost.",
    closingCta: "Book a free call",
    footerTag: "Strategy · Production · Publishing · Growth.",
    footerCopy: "Balneário Camboriú, Brazil · © LORDS Creative",
    planUnit: "/mo",
    planMostPop: "Most popular",
    planFull: "Full operation",
    planCta: "I want the",
    bumpAdd: "Add to plan +",
    bumpReq: "Requires",
    bumpMo: "/mo",
    preview: "preview",
    panelMoMonth: "August · you approve before publishing",
    panelApprove: "Approve",
    panelApproved: "Approved ✓",
    panelChange: "Change date",
    logosLabel: "Brands that grow with LORDS",
    nichosLabel: "Industries we serve",
    nichosH2: "We produce for any market — and we know each niche's language.",
    nichos: [
      { icon: "🏥", name: "Aesthetics & Clinics", ex: "High-end clinics that need premium presence" },
      { icon: "🏠", name: "Luxury Real Estate", ex: "Properties that sell the lifestyle before the listing" },
      { icon: "🍽️", name: "Gastronomy", ex: "Restaurants and chefs that fill tables with content" },
      { icon: "👗", name: "Fashion & Beauty", ex: "Brands that live on the feed — and sell there too" },
      { icon: "🚗", name: "Automotive", ex: "Dealerships and workshops that turn views into leads" },
      { icon: "💪", name: "Fitness & Wellness", ex: "Gyms and trainers that inspire daily" },
      { icon: "🎯", name: "E-commerce", ex: "Products that need scroll-stopping content" },
      { icon: "🏢", name: "B2B & Services", ex: "Companies that want authority, not just followers" },
    ],
    estudioLabel: "Professional production",
    estudioH2: "We film at our studio or at your location.",
    estudioSub: "Professional camera, lighting and direction — at our studio in Balneário Camboriú/Itajaí, at your business, or anywhere in Brazil. Same price either way.",
    estudioChips: ["On-location filming with no travel fee", "Camera, direction and editing included"],
    portfolioLabel: "Portfolio",
    portfolioH2: "Those who compare choose",
    portfolioWords: ["LORDS", "results", "consistency", "the best"],
    agentesLabel: "AI working for you",
    agentesH2: "13 AI agents running your operation in the background.",
    agentesSub: "While you focus on your business, our agents analyze competitors, generate scripts, organize your content calendar and produce weekly reports — automatically.",
    agentes: [
      { ic: "🔍", name: "Competitor Analyst", desc: "Weekly report on competitor content, formats and gaps." },
      { ic: "✍️", name: "Script Writer", desc: "Scripts for reels, stories and carousels — 48h turnaround." },
      { ic: "📊", name: "Performance Analyst", desc: "Monthly report with metrics, insights and recommendations." },
      { ic: "🎯", name: "Traffic Manager", desc: "Meta & Google campaigns aligned with your content calendar." },
      { ic: "💬", name: "WhatsApp Agent", desc: "Qualifies and responds to leads on WhatsApp — 24/7." },
      { ic: "🗓️", name: "Content Planner", desc: "Organizes your content calendar with formats and deadlines." },
    ],
    servicosLabel: "À la carte services",
    servicosH2: "No monthly plan? We still work together.",
    servicosSub: "Individual services for brands that need specific production — without the monthly commitment.",
    servicos: [
      { icon: "🎥", name: "Event Coverage", tagline: "Professional videographer at your event — raw files delivered.", formatos: ["Half-day", "Full day", "Studio", "On-location"], entrega: ["Professional filming", "File organization", "Raw footage delivery"], excl: "Editing not included unless added separately." },
      { icon: "🎙️", name: "Communicator (one-off)", tagline: "Brand voice and face — no monthly plan required.", formatos: ["Half-day", "Full day", "Reels", "Stories", "Campaigns", "Institutional videos"], entrega: ["On-set participation", "Script provided by client or written by LORDS"], excl: "Availability subject to schedule. Editing not included unless agreed." },
      { icon: "✨", name: "Model (one-off)", tagline: "Premium visual presence for photos, videos and campaigns.", formatos: ["Half-day", "Full day", "Photos", "Non-speaking videos", "Lifestyle", "Fashion", "Beauty"], entrega: ["Shoot participation", "Poses and art direction by arrangement"], excl: "Editing and post-production not included. Availability subject to schedule." },
    ],
    timeLabel: "Our team",
    timeH2: "The people behind every frame.",
    timeSub: "Videographers, communicators, editors and strategists — all working for your brand.",
    roster: [
      { name: "Tomaz", role: "Photographer & Videographer" },
      { name: "Leo Fernando", role: "Videographer & Photographer" },
      { name: "Isabela", role: "Communicator & Model" },
      { name: "Jenifer", role: "Communicator & Model" },
      { name: "Eduarda", role: "Communicator & Model" },
      { name: "Maria Luiza", role: "Communicator & Model" },
      { name: "Amanda", role: "Communicator & Model" },
      { name: "Lucas Rodrigues", role: "Head of Marketing" },
      { name: "Matheus Macedo", role: "Paid Media (TikTok, Meta & Google)" },
      { name: "Gabriel", role: "Video Editor & Design" },
    ],
  },
  es: {
    nav: ["Cómo funciona", "Portafolio", "Planes", "Preguntas"],
    navCta: "Diagnóstico gratuito",
    heroLabel: "Contenido brasileño, producido localmente.",
    heroH1: "Tu marca en Brasil — estrategia, producción y publicación en un solo equipo.",
    heroSub: "Producimos videos profesionales, fotos y contenido para redes sociales en Balneário Camboriú. Nuestra comunicadora trilingüe (EN · ES · PT) representa tu marca — o lo haces tú. Desde $1,500/mes.",
    heroCta1: "Ver planes",
    heroCta2: "Agendar llamada gratuita",
    vslLabel: "Cómo funciona",
    vslH2: "Un equipo lo maneja todo — tú solo apruebas.",
    vslSub: "Estrategia, guiones, filmación, edición, publicación. Cada mes. Revisas el contenido antes de que salga en tu LORDS Hub.",
    commLabel: "La voz de tu marca en Brasil",
    commH2: "Una comunicadora trilingüe como imagen de tu marca.",
    commSub: "Habla inglés, español y portugués — y representa tu marca en cámara en los tres idiomas. No necesitas viajar. No necesitas aparecer en cámara. Nosotros lo manejamos.",
    commBadge1: "Inglés fluido",
    commBadge2: "Español fluido",
    commBadge3: "Portugués nativo",
    commNote: "Disponible en los planes Creator y Full.",
    langBadgeLabel: "Tu comunicación, tu idioma",
    langBadgeSub: "Guiones, subtítulos y comunicación con el cliente entregados en el idioma que tu marca necesita — inglés, español o portugués.",
    plansH2: "Nuestros Planes",
    plansQ: "¿Quieres aparecer en cámara — o prefieres que nuestra comunicadora represente tu marca?",
    hubLabel: "Hub del Cliente",
    hubH2: "Apruebas todo antes de publicar.",
    hubSub: "Accede a tu LORDS Hub: calendario de contenido, feed de aprobaciones, métricas y análisis de competidores. Cambia la fecha de un post con un toque. Incluido en todos los planes.",
    hubNote: "Panel ilustrativo — tu versión se configura con tu marca.",
    covLabel: "Dónde filmamos",
    covH2: "Con base en Balneário Camboriú — la costa premium de Brasil.",
    covSub: "Filmamos en tu negocio, en la playa o en nuestro estudio en Itajaí. Sin cargo de desplazamiento en la región de Balneário Camboriú. São Paulo, Río de Janeiro y Florianópolis: disponibles — consultanos por precio.",
    personalizeLabel: "Diseña tu plan",
    personalizeH2: "Personaliza tu plan",
    personalizeSub: "Ninguna marca es igual. Elige un plan base y agrega solo lo que tiene sentido para tu momento — cerramos la combinación en la llamada de diagnóstico.",
    personalizeNote: "¿No encuentras lo que necesitas? Armamos paquetes a medida — escríbenos.",
    faqH2: "Preguntas frecuentes",
    closingH2: "¿Listo para empezar?",
    closingSub: "Agenda una llamada gratuita de 30 minutos. Te mostramos exactamente cómo puede verse tu marca — y cuánto costaría.",
    closingCta: "Agendar llamada gratuita",
    footerTag: "Estrategia · Producción · Publicación · Crecimiento.",
    footerCopy: "Balneário Camboriú, Brasil · © LORDS Creative",
    planUnit: "/mes",
    planMostPop: "Más elegido",
    planFull: "Operación completa",
    planCta: "Quiero el",
    bumpAdd: "Agregar al plan +",
    bumpReq: "Requiere",
    bumpMo: "/mes",
    preview: "preview",
    panelMoMonth: "Agosto · apruebas antes de publicar",
    panelApprove: "Aprobar",
    panelApproved: "Aprobado ✓",
    panelChange: "Cambiar fecha",
    logosLabel: "Marcas que crecen con LORDS",
    nichosLabel: "Industrias que atendemos",
    nichosH2: "Producimos para cualquier mercado — y conocemos el lenguaje de cada nicho.",
    nichos: [
      { icon: "🏥", name: "Estética & Clínicas", ex: "Clínicas de alto estándar que necesitan presencia premium" },
      { icon: "🏠", name: "Inmuebles de Lujo", ex: "Propiedades que venden el estilo de vida antes que el listado" },
      { icon: "🍽️", name: "Gastronomía", ex: "Restaurantes y chefs que llenan mesas con contenido" },
      { icon: "👗", name: "Moda & Belleza", ex: "Marcas que viven en el feed — y venden allí también" },
      { icon: "🚗", name: "Automotriz", ex: "Concesionarias y talleres que convierten vistas en leads" },
      { icon: "💪", name: "Fitness & Bienestar", ex: "Gimnasios y entrenadores que inspiran a diario" },
      { icon: "🎯", name: "E-commerce", ex: "Productos que necesitan contenido que detenga el scroll" },
      { icon: "🏢", name: "B2B & Servicios", ex: "Empresas que quieren autoridad, no solo seguidores" },
    ],
    estudioLabel: "Producción profesional",
    estudioH2: "Filmamos en nuestro estudio o en tu negocio.",
    estudioSub: "Cámara, iluminación y dirección profesional — en nuestro estudio en Balneário Camboriú/Itajaí, en tu negocio, o en cualquier lugar de Brasil. Mismo precio en ambos casos.",
    estudioChips: ["Filmación en locación sin cargo de desplazamiento", "Cámara, dirección y edición incluidas"],
    portfolioLabel: "Portafolio",
    portfolioH2: "Quien compara elige",
    portfolioWords: ["LORDS", "resultados", "consistencia", "lo mejor"],
    agentesLabel: "IA trabajando para ti",
    agentesH2: "13 agentes de IA gestionando tu operación en segundo plano.",
    agentesSub: "Mientras te concentras en tu negocio, nuestros agentes analizan competidores, generan guiones, organizan tu calendario de contenido y producen reportes semanales — automáticamente.",
    agentes: [
      { ic: "🔍", name: "Analista de Competidores", desc: "Reporte semanal del contenido, formatos y brechas de tu competencia." },
      { ic: "✍️", name: "Guionista", desc: "Guiones para reels, stories y carruseles — en 48 horas." },
      { ic: "📊", name: "Analista de Rendimiento", desc: "Reporte mensual con métricas, insights y recomendaciones." },
      { ic: "🎯", name: "Gestor de Tráfico", desc: "Campañas en Meta y Google alineadas con tu calendario de contenido." },
      { ic: "💬", name: "Agente WhatsApp", desc: "Califica y responde leads en WhatsApp — 24/7." },
      { ic: "🗓️", name: "Planificador de Contenido", desc: "Organiza tu calendario de contenido con formatos y plazos." },
    ],
    servicosLabel: "Servicios puntuales",
    servicosH2: "¿Sin plan mensual? Igual trabajamos juntos.",
    servicosSub: "Servicios individuales para marcas que necesitan producción específica — sin compromiso mensual.",
    servicos: [
      { icon: "🎥", name: "Cobertura de Evento", tagline: "Videógrafo profesional en tu evento — archivos brutos entregados.", formatos: ["Media jornada", "Jornada completa", "Estudio", "En locación"], entrega: ["Filmación profesional", "Organización de archivos", "Entrega de brutos"], excl: "Edición no incluida salvo contratación adicional." },
      { icon: "🎙️", name: "Comunicadora (puntual)", tagline: "Voz e imagen para tu marca — sin plan mensual.", formatos: ["Media jornada", "Jornada completa", "Reels", "Stories", "Campañas", "Videos institucionales"], entrega: ["Participación en set", "Guion provisto por el cliente o elaborado por LORDS"], excl: "Disponibilidad sujeta a agenda. Edición no incluida salvo acuerdo." },
      { icon: "✨", name: "Modelo (puntual)", tagline: "Presencia visual premium para fotos, videos y campañas.", formatos: ["Media jornada", "Jornada completa", "Fotos", "Videos sin diálogo", "Lifestyle", "Moda", "Belleza"], entrega: ["Participación en sesión", "Poses y dirección de arte a convenir"], excl: "Edición y postproducción no incluidas. Disponibilidad sujeta a agenda." },
    ],
    timeLabel: "Nuestro equipo",
    timeH2: "Las personas detrás de cada toma.",
    timeSub: "Videógrafos, comunicadoras, editores y estrategas — todos trabajando para tu marca.",
    roster: [
      { name: "Tomaz", role: "Fotógrafo & Videógrafo" },
      { name: "Leo Fernando", role: "Videógrafo & Fotógrafo" },
      { name: "Isabela", role: "Comunicadora & Modelo" },
      { name: "Jenifer", role: "Comunicadora & Modelo" },
      { name: "Eduarda", role: "Comunicadora & Modelo" },
      { name: "Maria Luiza", role: "Comunicadora & Modelo" },
      { name: "Amanda", role: "Comunicadora & Modelo" },
      { name: "Lucas Rodrigues", role: "Head de Marketing" },
      { name: "Matheus Macedo", role: "Medios pagados (TikTok, Meta y Google)" },
      { name: "Gabriel", role: "Editor de Video & Diseño" },
    ],
  },
};

const s = T[lang];

/* ============================================================
   DATA — Plans & Bumps (USD)
   ============================================================ */
const GLOBAL_PLANS = {
  en: [
    {
      id: "capture", name: "Capture", price: 1500,
      hook: "6 professional videos per month — scripted, filmed and edited. Your brand stays present without you lifting a finger.",
      face: "You", meetings: "1 shoot", videos: "6 videos",
      modality: "Studio in Itajaí or on-location at your business — same price.",
      groups: [
        { title: "Strategy", items: ["Content planning", "Script creation", "Monthly schedule", "Client pre-approval"] },
        { title: "Production", items: ["6 videos filmed", "Professional camera & lighting", "Editing with animated captions", "Delivered in vertical/mobile format"] },
        { title: "Support", items: ["Monthly performance report", "Monthly strategy meeting"] },
      ],
    },
    {
      id: "creator", name: "Creator", price: 2500, hero: true, flag: "Most popular",
      hook: "10 videos per month with our trilingual communicator as your brand's face — strategy, filming and editing included.",
      face: "You + Communicator", meetings: "1 shoot", videos: "10 videos",
      modality: "Studio in Itajaí or on-location at your business — same price.",
      groups: [
        { title: "Strategy", items: ["Full business diagnostic", "Strategy & editorial line", "Scripts for all videos", "Monthly content calendar", "Monthly competitor analysis (AI)"] },
        { title: "Production", items: ["1 filming session", "10 edited videos with animated captions", "Raw footage delivered", "Trilingual communicator as brand creator", "Institutional photo shoot"] },
        { title: "Support", items: ["Monthly report", "Monthly strategy meeting", "Direct WhatsApp group with the team", "Priority on the filming schedule"] },
      ],
    },
    {
      id: "full", name: "Full", price: 4500, flag: "Full operation",
      hook: "A complete content operation — 16 videos, drone, arts, stories, communicator as permanent brand face and partial publishing by our team.",
      face: "You + Communicator", meetings: "2 shoots", videos: "16 videos",
      modality: "2 on-location visits, or 1 location + 1 studio.",
      groups: [
        { title: "Strategy", items: ["Full business diagnostic", "Strategy & editorial line", "Scripts for all videos", "Monthly content calendar", "Monthly competitor analysis (AI)"] },
        { title: "Production", items: ["2 filming sessions", "16 edited videos with animated captions", "Raw footage delivered"],
          extras: ["Communicator as permanent brand face", "10 feed arts + story arts", "Daily stories", "Drone included", "Welcome motion in month 1", "Institutional photo shoot"] },
        { title: "Support", items: ["Monthly report", "Monthly strategy meeting", "Direct WhatsApp group", "Priority on filming schedule"],
          extras: ["Partial publishing by our team", "Organized content bank"] },
      ],
    },
  ],
  es: [
    {
      id: "capture", name: "Capture", price: 1500,
      hook: "6 videos profesionales al mes — con guion, filmación y edición. Tu marca sigue presente sin que muevas un dedo.",
      face: "Tú", meetings: "1 rodaje", videos: "6 videos",
      modality: "Estudio en Itajaí o en tu negocio — mismo precio.",
      groups: [
        { title: "Estrategia", items: ["Planificación de contenido", "Creación de guiones", "Cronograma mensual", "Aprobación previa del cliente"] },
        { title: "Producción", items: ["6 videos filmados", "Cámara y luminaria profesional", "Edición con subtítulos animados", "Entrega en formato vertical/mobile"] },
        { title: "Soporte", items: ["Reporte mensual de desempeño", "Reunión mensual de estrategia"] },
      ],
    },
    {
      id: "creator", name: "Creator", price: 2500, hero: true, flag: "Más elegido",
      hook: "10 videos al mes con nuestra comunicadora trilingüe como imagen de tu marca — estrategia, filmación y edición incluidos.",
      face: "Tú + Comunicadora", meetings: "1 rodaje", videos: "10 videos",
      modality: "Estudio en Itajaí o en tu negocio — mismo precio.",
      groups: [
        { title: "Estrategia", items: ["Diagnóstico completo del negocio", "Estrategia y línea editorial", "Guiones de todos los videos", "Calendario mensual de contenido", "Análisis mensual de competidores (IA)"] },
        { title: "Producción", items: ["1 sesión de filmación", "10 videos editados con subtítulos animados", "Brutos entregados", "Comunicadora trilingüe como creator de la marca", "Sesión de fotos institucionales"] },
        { title: "Soporte", items: ["Reporte mensual", "Reunión mensual de estrategia", "Grupo directo en WhatsApp con el equipo", "Prioridad en la agenda de rodaje"] },
      ],
    },
    {
      id: "full", name: "Full", price: 4500, flag: "Operación completa",
      hook: "Una operación de contenido completa — 16 videos, drone, artes, stories, comunicadora como imagen permanente y publicación parcial por nuestro equipo.",
      face: "Tú + Comunicadora", meetings: "2 rodajes", videos: "16 videos",
      modality: "2 visitas en locación, o 1 locación + 1 estudio.",
      groups: [
        { title: "Estrategia", items: ["Diagnóstico completo del negocio", "Estrategia y línea editorial", "Guiones de todos los videos", "Calendario mensual de contenido", "Análisis mensual de competidores (IA)"] },
        { title: "Producción", items: ["2 sesiones de filmación", "16 videos editados con subtítulos animados", "Brutos entregados"],
          extras: ["Comunicadora como imagen permanente de la marca", "10 artes de feed + artes de stories", "Stories diarios", "Drone incluido", "Motion de bienvenida en el mes 1", "Sesión de fotos institucionales"] },
        { title: "Soporte", items: ["Reporte mensual", "Reunión mensual de estrategia", "Grupo directo en WhatsApp", "Prioridad en la agenda"],
          extras: ["Publicación parcial por nuestro equipo", "Banco de contenido organizado"] },
      ],
    },
  ],
};

const GLOBAL_BUMPS = {
  en: {
    capture: [
      { id: "drone", name: "Drone filming", price: 390, recurring: false, desc: "Aerial shots at your filming session." },
      { id: "traffic", name: "Paid traffic management", price: 1200, recurring: true, desc: "Manager + AI: Meta & Google campaigns, competitor analysis, creative performance reports. Ad spend paid by you." },
      { id: "posts", name: "5 extra posts", price: 260, recurring: false, desc: "Five extra feed or carousel posts." },
      { id: "stories", name: "Daily stories (communicator)", price: 1300, recurring: true, desc: "The communicator films daily stories for your brand — every other day, in EN/ES/PT." },
      { id: "mascot", name: "3D brand mascot", price: 790, recurring: false, desc: "An exclusive 3D character created for your brand — used across all content." },
      { id: "trip", name: "Content trip (event coverage)", price: 3500, recurring: false, desc: "1–3 days of filming on-location anywhere in Brazil. We bring the crew." },
    ],
    creator: [
      { id: "drone", name: "Drone filming", price: 390, recurring: false, desc: "Aerial shots at your filming session." },
      { id: "traffic", name: "Paid traffic management", price: 1200, recurring: true, desc: "Manager + AI: Meta & Google campaigns, competitor analysis, creative performance reports. Ad spend paid by you." },
      { id: "posts", name: "5 extra posts", price: 260, recurring: false, desc: "Five extra feed or carousel posts." },
      { id: "stories", name: "Daily stories (communicator)", price: 1300, recurring: true, desc: "The communicator films daily stories — every other day, in EN/ES/PT." },
      { id: "mascot", name: "3D brand mascot", price: 790, recurring: false, desc: "An exclusive 3D character created for your brand." },
      { id: "social", name: "Social & WhatsApp management", price: 1800, recurring: true, requires: "traffic", desc: "We reply on WhatsApp and socials and publish daily for you." },
      { id: "trip", name: "Content trip (event coverage)", price: 3500, recurring: false, desc: "1–3 days of filming on-location anywhere in Brazil." },
    ],
    full: [
      { id: "traffic", name: "Paid traffic management", price: 1200, recurring: true, desc: "Manager + AI: Meta & Google campaigns, competitor analysis and reports. Ad spend paid by you." },
      { id: "social", name: "Social & WhatsApp management", price: 1800, recurring: true, requires: "traffic", desc: "We reply on WhatsApp and socials and publish daily for you." },
      { id: "mascot", name: "3D brand mascot", price: 790, recurring: false, desc: "An exclusive 3D character created for your brand." },
      { id: "vfx", name: "VFX editing", price: 650, recurring: false, desc: "Cinematic visual effects — creative no one in your niche can match." },
      { id: "site", name: "Website creation", price: 920, recurring: false, monthly: 105, desc: "One-page site in LORDS template. Maintenance: +$105/mo." },
      { id: "trip", name: "Content trip (event coverage)", price: 3500, recurring: false, desc: "1–3 days of filming on-location anywhere in Brazil." },
    ],
  },
  es: {
    capture: [
      { id: "drone", name: "Filmación con drone", price: 390, recurring: false, desc: "Tomas aéreas en tu sesión de filmación." },
      { id: "traffic", name: "Gestión de tráfico pago", price: 1200, recurring: true, desc: "Gestor + IA: campañas en Meta y Google, análisis de competidores, reportes. Presupuesto de anuncios lo pagas tú." },
      { id: "posts", name: "5 posts extra", price: 260, recurring: false, desc: "Cinco piezas extras de feed o carrusel." },
      { id: "stories", name: "Stories diarios (comunicadora)", price: 1300, recurring: true, desc: "La comunicadora filma stories para tu marca día por medio, en EN/ES/PT." },
      { id: "mascot", name: "Mascota 3D de marca", price: 790, recurring: false, desc: "Un personaje 3D exclusivo creado para tu marca — usado en todo el contenido." },
      { id: "trip", name: "Content trip (cobertura de eventos)", price: 3500, recurring: false, desc: "1–3 días de filmación en cualquier lugar de Brasil. Llevamos al equipo." },
    ],
    creator: [
      { id: "drone", name: "Filmación con drone", price: 390, recurring: false, desc: "Tomas aéreas en tu sesión de filmación." },
      { id: "traffic", name: "Gestión de tráfico pago", price: 1200, recurring: true, desc: "Gestor + IA: campañas en Meta y Google, análisis de competidores, reportes." },
      { id: "posts", name: "5 posts extra", price: 260, recurring: false, desc: "Cinco piezas extras de feed o carrusel." },
      { id: "stories", name: "Stories diarios (comunicadora)", price: 1300, recurring: true, desc: "La comunicadora filma stories día por medio, en EN/ES/PT." },
      { id: "mascot", name: "Mascota 3D de marca", price: 790, recurring: false, desc: "Un personaje 3D exclusivo para tu marca." },
      { id: "social", name: "Gestión de redes y WhatsApp", price: 1800, recurring: true, requires: "traffic", desc: "Respondemos WhatsApp y redes y publicamos todos los días." },
      { id: "trip", name: "Content trip (cobertura de eventos)", price: 3500, recurring: false, desc: "1–3 días de filmación en cualquier lugar de Brasil." },
    ],
    full: [
      { id: "traffic", name: "Gestión de tráfico pago", price: 1200, recurring: true, desc: "Gestor + IA: campañas en Meta y Google, análisis y reportes." },
      { id: "social", name: "Gestión de redes y WhatsApp", price: 1800, recurring: true, requires: "traffic", desc: "Respondemos WhatsApp y redes y publicamos todos los días." },
      { id: "mascot", name: "Mascota 3D de marca", price: 790, recurring: false, desc: "Un personaje 3D exclusivo para tu marca." },
      { id: "vfx", name: "Edición VFX", price: 650, recurring: false, desc: "Efectos visuales de cine — el creativo que nadie en tu nicho puede hacer." },
      { id: "site", name: "Creación de sitio web", price: 920, recurring: false, monthly: 105, desc: "One-page en el template LORDS con 1 ronda de ajustes. Mantenimiento: +$105/mes." },
      { id: "trip", name: "Content trip (cobertura de eventos)", price: 3500, recurring: false, desc: "1–3 días de filmación en cualquier lugar de Brasil." },
    ],
  },
};

const GLOBAL_FAQ = {
  en: [
    { q: "Where are you based and where do you film?", a: "We're based in Balneário Camboriú, Santa Catarina — known as Brazil's luxury coastline. We film at your business, on the beach or at our studio. For events and content trips, we travel anywhere in Brazil." },
    { q: "Does the communicator speak English and Spanish?", a: "Yes — she speaks English, Spanish and Portuguese fluently. She can represent your brand on camera in all three languages, adapting her style to your brand voice." },
    { q: "How does the content approval process work?", a: "Every piece of content goes through your LORDS Hub before it's published. You review videos, photos and arts, leave feedback, and approve with one click. Nothing goes live without your sign-off." },
    { q: "Can I hire just for an event or a content trip?", a: "Yes. We offer one-time content trips: we bring the full crew to any location in Brazil for 1–3 days, deliver all footage and edited content at the end. No monthly commitment required." },
    { q: "What's included in paid traffic management?", a: "A dedicated manager + an AI agent: campaign setup on Meta and Google, ongoing creative analysis (what's performing), monthly competitor report and clear metrics. You pay the ad spend separately." },
    { q: "Do I need to sign a long-term contract?", a: "We work with monthly contracts. The setup fee (first month) is non-refundable; after that, it's month-to-month. We'd rather earn your business every month." },
    { q: "How do we communicate?", a: "You get a dedicated WhatsApp group with the team from day one. For strategy, we meet once a month (Creator) or twice (Full). Response time: same business day." },
    { q: "What if I want something custom?", a: "Book the free diagnostic call. We'll map what your brand needs and build the right package — we don't force you into a template." },
  ],
  es: [
    { q: "¿Dónde están ubicados y dónde filman?", a: "Estamos en Balneário Camboriú, Santa Catarina — conocida como la costa de lujo de Brasil. Filmamos en tu negocio, en la playa o en nuestro estudio. Para eventos y content trips, viajamos a cualquier lugar de Brasil." },
    { q: "¿La comunicadora habla inglés y español?", a: "Sí — habla inglés, español y portugués con fluidez. Puede representar tu marca en cámara en los tres idiomas, adaptando su estilo a la voz de tu marca." },
    { q: "¿Cómo funciona el proceso de aprobación?", a: "Todo el contenido pasa por tu LORDS Hub antes de publicarse. Revisas videos, fotos y artes, dejas comentarios y apruebas con un clic. Nada sale sin tu visto bueno." },
    { q: "¿Puedo contratar solo para un evento o un content trip?", a: "Sí. Ofrecemos content trips puntuales: llevamos al equipo completo a cualquier locación en Brasil por 1–3 días y entregamos todo el material filmado y editado al final. Sin compromiso mensual." },
    { q: "¿Qué incluye la gestión de tráfico pago?", a: "Un gestor dedicado + agente de IA: configuración de campañas en Meta y Google, análisis continuo de creativos (qué funciona), reporte mensual de competidores y métricas claras. Tú pagas el presupuesto de anuncios por separado." },
    { q: "¿Necesito firmar un contrato a largo plazo?", a: "Trabajamos con contratos mensuales. El pago inicial (primer mes) no es reembolsable; luego es mes a mes. Preferimos ganarnos tu confianza cada mes." },
    { q: "¿Cómo nos comunicamos?", a: "Desde el día uno tienes un grupo de WhatsApp dedicado con el equipo. Para estrategia, nos reunimos una vez al mes (Creator) o dos veces (Full). Tiempo de respuesta: mismo día hábil." },
    { q: "¿Qué pasa si quiero algo personalizado?", a: "Agenda la llamada de diagnóstico gratuita. Mapeamos lo que tu marca necesita y armamos el paquete correcto — no te forzamos a una plantilla." },
  ],
};

/* ============================================================
   CTA helper
   ============================================================ */
function ctaHref(msg = "") {
  if (WHATSAPP_NUM) {
    return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`;
  }
  return CALENDLY_URL;
}

/* ============================================================
   SECTIONS
   ============================================================ */

function sHero() {
  const cta1 = `<a href="#plans" class="btn btn-primary btn-lg">${s.heroCta1}</a>`;
  const cta2 = `<a href="${ctaHref(lang === "es" ? "Hola! Me interesa conocer los planes de LORDS." : "Hi! I'd like to learn more about LORDS plans.")}" class="btn btn-ghost btn-lg" target="_blank" rel="noopener">${s.heroCta2}</a>`;
  return `
  <section class="section fc-hero" id="topo-sec" aria-label="Hero">
    <div class="container hero-inner">
      <div class="hero-text reveal">
        <span class="fc-label">${s.heroLabel}</span>
        <h1 class="hero-h1">${s.heroH1}</h1>
        <p class="hero-sub">${s.heroSub}</p>
        <div class="hero-ctas">${cta1}${cta2}</div>
      </div>
      <div class="hero-media reveal">
        <div class="hero-device">
          <div class="hero-screen gl-screen">
            <div class="gl-screen-inner">
              <div class="gl-screen-tag">${lang === "es" ? "🎥 Producción activa" : "🎥 Production active"}</div>
              <div class="gl-screen-stats">
                <div><strong>6–16</strong><small>${lang === "es" ? "videos/mes" : "videos/mo"}</small></div>
                <div><strong>EN · ES · PT</strong><small>${lang === "es" ? "idiomas" : "languages"}</small></div>
                <div><strong>BC, ${lang === "es" ? "Brasil" : "Brazil"}</strong><small>${lang === "es" ? "base" : "based"}</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function sVsl() {
  const videoSrc = "assets/lords-video.mp4";
  return `
  <section class="section fc-vsl" id="vsl" aria-label="${s.vslLabel}">
    <div class="container fc-vsl-inner">
      <div class="fc-vsl-intro reveal">
        <span class="fc-label">${s.vslLabel}</span>
        <h2 class="prod-h2">${s.vslH2}</h2>
        <p class="lede center">${s.vslSub}</p>
      </div>
      <div class="vsl-wrap reveal">
        <video class="vsl-video" autoplay muted loop playsinline poster="assets/vsl-thumb.jpg"
               aria-label="${lang === "es" ? "Video explicativo de LORDS" : "LORDS explainer video"}">
          <source src="${videoSrc}" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>`;
}

function sCommunicator() {
  return `
  <section class="section gl-comm" id="communicator" aria-label="${s.commLabel}">
    <div class="container gl-comm-inner reveal">
      <div class="gl-comm-text">
        <span class="fc-label">${s.commLabel}</span>
        <h2 class="prod-h2">${s.commH2}</h2>
        <p class="lede">${s.commSub}</p>
        <div class="gl-comm-badges">
          <span class="gl-lang-badge">🇺🇸 ${s.commBadge1}</span>
          <span class="gl-lang-badge">🇪🇸 ${s.commBadge2}</span>
          <span class="gl-lang-badge">🇧🇷 ${s.commBadge3}</span>
        </div>
        <p class="gl-comm-note">${s.commNote}</p>
        <div class="gl-lang-select">
          <p class="gl-lang-select-label">🌐 ${s.langBadgeLabel}</p>
          <div class="gl-lang-select-opts">
            <span class="gl-lang-opt">🇺🇸 English</span>
            <span class="gl-lang-opt">🇪🇸 Español</span>
            <span class="gl-lang-opt">🇧🇷 Português</span>
          </div>
          <p class="gl-lang-select-sub">${s.langBadgeSub}</p>
        </div>
      </div>
      <div class="gl-comm-visual">
        <div class="gl-comm-card">
          <div class="gl-comm-avatar">
            <div class="gl-comm-initials">C</div>
          </div>
          <div class="gl-comm-info">
            <strong>${lang === "es" ? "Comunicadora LORDS" : "LORDS Communicator"}</strong>
            <span>EN · ES · PT</span>
            <div class="gl-comm-langs">
              <span class="gl-lang-dot" title="English">🇺🇸</span>
              <span class="gl-lang-dot" title="Español">🇪🇸</span>
              <span class="gl-lang-dot" title="Português">🇧🇷</span>
            </div>
          </div>
        </div>
        <div class="gl-comm-sample">
          <p class="gl-comm-quote">${lang === "es" ? "\"Hola, soy la comunicadora de [tu marca]. Hoy te muestro...\"" : "\"Hi, I'm [your brand]'s communicator. Today I'm showing you...\"" }</p>
        </div>
      </div>
    </div>
  </section>`;
}

function planCard(pl, bumps) {
  const body = pl.groups.map((g) => `
    <div class="plan-group">
      <span class="plan-group-title">${g.title}</span>
      <ul>
        ${g.items.map((i) => `<li>${i}</li>`).join("")}
        ${(g.extras || []).map((i) => `<li class="plan-extra">${i}</li>`).join("")}
      </ul>
    </div>`).join("");

  const planBumps = bumps[pl.id] || [];
  const bumpsHtml = planBumps.length ? `
    <div class="plan-bumps-block">
      <p class="plan-bumps-title">${lang === "es" ? "Agrega al plan:" : "Add to plan:"}</p>
      <div class="plan-bumps">${planBumps.map((b) => `<span class="plan-bump">+ ${b.name}</span>`).join("")}</div>
    </div>` : "";

  const waMsg = lang === "es"
    ? `Hola! Me interesa el plan ${pl.name} de LORDS.`
    : `Hi! I'm interested in the LORDS ${pl.name} plan.`;

  return `
  <div class="plan${pl.hero ? " plan-destaque" : ""} reveal" data-plan="${pl.id}" data-price="${pl.price}">
    ${pl.flag ? `<span class="plan-flag">${pl.flag}</span>` : ""}
    <span class="plan-name">${pl.name}</span>
    <p class="plan-hook">${pl.hook}</p>
    <div class="plan-price">
      <b>${fmt(pl.price)}</b><small>${s.planUnit}</small>
    </div>
    <div class="plan-meta">
      <span><i>${lang === "es" ? "Imagen" : "Face"}</i>${pl.face}</span>
      <span><i>${lang === "es" ? "Rodaje" : "Shoot"}</i>${pl.meetings}</span>
      <span><i>${lang === "es" ? "Entrega" : "Output"}</i>${pl.videos}</span>
    </div>
    ${body}
    ${bumpsHtml}
    <p class="plan-modality">${pl.modality}</p>
    <a class="btn btn-primary" href="${ctaHref(waMsg)}" target="_blank" rel="noopener">${s.planCta} ${pl.name}</a>
  </div>`;
}

function sPlans() {
  const plans = GLOBAL_PLANS[lang];
  const bumps = GLOBAL_BUMPS[lang];
  return `
  <section class="section" id="plans" aria-label="${s.plansH2}">
    <div class="container">
      <h2 class="prod-h2 center">${s.plansH2}</h2>
      <p class="lede center plan-question">${s.plansQ}</p>
      <div class="plans">${plans.map((pl) => planCard(pl, bumps)).join("")}</div>
    </div>
  </section>`;
}

function sHub() {
  const posts = lang === "es"
    ? [
        { tipo: "Reels", tema: "Detrás de cámara de la filmación", data: "Mar · 12/08", status: "aprovar" },
        { tipo: "Carrusel", tema: "3 errores en el feed de tu marca", data: "Mié · 13/08", status: "ok" },
        { tipo: "Post", tema: "Antes y después — nuevo proyecto", data: "Jue · 14/08", status: "mudar" },
      ]
    : [
        { tipo: "Reels", tema: "Behind the scenes — filming day", data: "Tue · 12/08", status: "aprovar" },
        { tipo: "Carousel", tema: "3 mistakes killing your brand feed", data: "Wed · 13/08", status: "ok" },
        { tipo: "Post", tema: "Before & after — new project", data: "Thu · 14/08", status: "mudar" },
      ];

  const metricas = lang === "es"
    ? [
        { canal: "Instagram", label: "Alcance en la semana", val: "12.4 k" },
        { canal: lang === "es" ? "Tráfico pago" : "Paid traffic", label: lang === "es" ? "Clics en el anuncio" : "Ad clicks", val: "1,860" },
        { canal: "WhatsApp", label: lang === "es" ? "Conversas iniciadas" : "Conversations started", val: "47", tag: lang === "es" ? "con gestión" : "with management" },
      ]
    : [
        { canal: "Instagram", label: "Reach this week", val: "12.4 k" },
        { canal: "Paid traffic", label: "Ad clicks", val: "1,860" },
        { canal: "WhatsApp", label: "Conversations started", val: "47", tag: "with management" },
      ];

  const modulos = lang === "es"
    ? [{ ic: "🗓️", nome: "Calendario", on: true }, { ic: "✅", nome: "Aprobaciones" }, { ic: "📊", nome: "Métricas" }, { ic: "🔎", nome: "Competidores" }, { ic: "⚙️", nome: "Proceso" }, { ic: "💬", nome: "WhatsApp" }]
    : [{ ic: "🗓️", nome: "Calendar", on: true }, { ic: "✅", nome: "Approvals" }, { ic: "📊", nome: "Metrics" }, { ic: "🔎", nome: "Competitors" }, { ic: "⚙️", nome: "Process" }, { ic: "💬", nome: "WhatsApp" }];

  const chip = (st) =>
    st === "ok" ? `<span class="pnl-chip pnl-chip--ok">${s.panelApproved}</span>`
    : st === "mudar" ? `<span class="pnl-chip pnl-chip--ghost">${s.panelChange}</span>`
    : `<span class="pnl-chip pnl-chip--go">${s.panelApprove}</span>`;

  return `
  <section class="section fc-tools" id="hub" aria-label="${s.hubLabel}">
    <div class="container">
      <span class="fc-label center">${s.hubLabel}</span>
      <h2 class="prod-h2 center">${s.hubH2}</h2>
      <p class="lede center">${s.hubSub}</p>

      <div class="painel reveal" aria-label="LORDS Hub (illustrative)">
        <aside class="pnl-side">
          <div class="pnl-brand"><span class="pnl-logo">L</span><span>LORDS</span></div>
          <nav class="pnl-nav">
            ${modulos.map((m) => `<span class="pnl-item${m.on ? " on" : ""}"><i>${m.ic}</i>${m.nome}</span>`).join("")}
          </nav>
        </aside>
        <div class="pnl-main">
          <div class="pnl-top">
            <div><strong>${lang === "es" ? "Calendario de contenido" : "Content calendar"}</strong><small>${s.panelMoMonth}</small></div>
            <span class="pnl-preview">${s.preview}</span>
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
      <p class="pnl-legenda">${s.hubNote}</p>
    </div>
  </section>`;
}

function sCoverage() {
  const cities = [
    { f: "balneario-camboriu.jpg", label: "Balneário Camboriú" },
    { f: "itajai.jpg", label: "Itajaí" },
    { f: "itapema.jpg", label: "Itapema" },
    { f: "navegantes.jpg", label: "Navegantes" },
    { f: "porto-belo.jpg", label: "Porto Belo" },
    { f: "florianopolis.jpg", label: "Florianópolis" },
    { f: "sao-paulo.jpg", label: "São Paulo" },
    { f: "rio-de-janeiro.webp", label: "Rio de Janeiro" },
  ];
  const base = encodeURIComponent("cobertura : onde atendemos ");
  const row = cities.map(c => `
    <div class="cob-item">
      <img src="assets/${base}/${c.f}" alt="${c.label}" loading="lazy">
      <span class="cob-label">${c.label}</span>
    </div>`).join("");
  return `
  <section class="section fc-coverage" id="coverage" aria-label="${s.covLabel}">
    <div class="container">
      <span class="fc-label center">${s.covLabel}</span>
      <h2 class="prod-h2 center">${s.covH2}</h2>
      <p class="lede center">${s.covSub}</p>
    </div>
    <div class="cob-reel"><div class="cob-reel-inner">${row}${row}</div></div>
  </section>`;
}

function sPersonalize() {
  const plans = GLOBAL_PLANS[lang];
  const bumps = GLOBAL_BUMPS[lang];

  const tabs = plans.map((pl, i) => `
    <button type="button" class="bump-tab${i === 0 ? " on" : ""}" data-pz-tab="${pl.id}" aria-pressed="${i === 0}">
      <strong>${pl.name}</strong>
      <small>${fmt(pl.price)}${s.planUnit}</small>
    </button>`).join("");

  const panels = plans.map((pl, i) => {
    const planBumps = bumps[pl.id] || [];
    return `
    <div class="pz-panel${i === 0 ? " on" : ""}" data-pz-panel="${pl.id}">
      <div class="bumps-grid">
        ${planBumps.map((b) => {
          const reqBump = b.requires ? planBumps.find((x) => x.id === b.requires) : null;
          const waMsg = lang === "es"
            ? `Hola! Me interesa el plan ${pl.name} + add-on ${b.name}.`
            : `Hi! I'm interested in the ${pl.name} plan + ${b.name} add-on.`;
          return `
          <div class="bump-card">
            <div class="bump-info">
              <strong>${b.name}</strong>
              ${reqBump ? `<span class="bump-req">${s.bumpReq} ${reqBump.name.toLowerCase()}</span>` : ""}
              <small>${b.desc}</small>
            </div>
            <div class="bump-side">
              <span class="bump-price">${fmt(b.price)}${b.recurring ? `<i>${s.bumpMo}</i>` : ""}</span>
              <a class="bump-add" href="${ctaHref(waMsg)}" target="_blank" rel="noopener">${s.bumpAdd}</a>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>`;
  }).join("");

  return `
  <section class="section fc-personalize" id="personalize" aria-label="${s.personalizeH2}">
    <div class="container">
      <span class="fc-label center">${s.personalizeLabel}</span>
      <h2 class="prod-h2 center">${s.personalizeH2}</h2>
      <p class="lede center">${s.personalizeSub}</p>
      <div class="bump-tabs" role="group">${tabs}</div>
      ${panels}
      <p class="pz-nota">${s.personalizeNote}</p>
    </div>
  </section>`;
}

function sFaq() {
  const faq = GLOBAL_FAQ[lang];
  return `
  <section class="section" id="faq" aria-label="${s.faqH2}">
    <div class="container">
      <h2 class="prod-h2 center">${s.faqH2}</h2>
      <div class="acc">
        ${faq.map((f) => `
        <details class="acc-item">
          <summary>${f.q}</summary>
          <div class="acc-body"><p>${f.a}</p></div>
        </details>`).join("")}
      </div>
    </div>
  </section>`;
}

function sClosing() {
  const waMsg = lang === "es"
    ? "Hola! Quiero agendar una llamada gratuita con LORDS."
    : "Hi! I'd like to book a free call with LORDS.";
  return `
  <section class="section fc-closing" id="closing" aria-label="${s.closingH2}">
    <div class="container fc-closing-inner reveal">
      <h2 class="prod-h2">${s.closingH2}</h2>
      <p class="lede">${s.closingSub}</p>
      <a class="btn btn-primary btn-lg" href="${ctaHref(waMsg)}" target="_blank" rel="noopener">${s.closingCta}</a>
    </div>
  </section>`;
}

/* ============================================================
   GLOBAL-SPECIFIC CSS (injected once)
   ============================================================ */
function injectGlobalCss() {
  const style = document.createElement("style");
  style.textContent = `
    /* Hero layout override — fc-hero .container forces flex-column */
    .fc-hero .container { flex-direction: row; justify-content: flex-start; align-items: center; gap: 48px; text-align: left; min-height: auto; padding-top: 80px; padding-bottom: 80px; }
    .hero-inner { display: contents; }
    .hero-text { flex: 1 1 0; min-width: 0; }
    .hero-media { flex: 0 0 340px; }
    .hero-h1 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; line-height: 1.1; letter-spacing: -.03em; color: #fff; margin-bottom: 16px; text-shadow: 0 4px 40px rgba(0,0,0,.35); }
    .fc-label { color: #E4C06E; font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; display: block; margin-bottom: 12px; }
    .hero-sub { color: rgba(255,255,255,.88); font-size: clamp(.95rem, 1.8vw, 1.1rem); line-height: 1.55; max-width: 40ch; margin-bottom: 28px; }
    .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
    @media(max-width:820px){ .fc-hero .container { flex-direction: column; text-align: center; } .hero-media { flex: 0 0 auto; width: 100%; } .hero-ctas { justify-content: center; } .hero-sub { max-width: none; } }

    /* Hero device mockup */
    .gl-screen { background: #0D1B2E; border-radius: 12px; padding: 20px; min-height: 180px; display: flex; align-items: center; justify-content: center; }
    .gl-screen-inner { text-align: center; color: #fff; }
    .gl-screen-tag { font-size: .75rem; font-weight: 600; color: #C9A84C; margin-bottom: 16px; letter-spacing: .08em; text-transform: uppercase; }
    .gl-screen-stats { display: flex; gap: 24px; justify-content: center; }
    .gl-screen-stats div { display: flex; flex-direction: column; gap: 4px; }
    .gl-screen-stats strong { font-size: 1.4rem; font-weight: 800; color: #E4C06E; }
    .gl-screen-stats small { font-size: .7rem; color: rgba(255,255,255,.6); }

    /* Communicator section */
    .gl-comm { background: var(--bg-alt, #f7f7f7); }
    .gl-comm-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
    @media(max-width:820px){ .gl-comm-inner { grid-template-columns: 1fr; gap: 32px; } }
    .gl-comm-badges { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0 12px; }
    .gl-lang-badge { background: #0D1B2E; color: #E4C06E; border-radius: 24px; padding: 6px 16px; font-size: .8rem; font-weight: 700; letter-spacing: .04em; }
    .gl-comm-note { font-size: .85rem; color: var(--text-muted, #888); margin: 0; }
    .gl-comm-visual { display: flex; flex-direction: column; gap: 16px; }
    .gl-comm-card { display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid #e8e2d0; border-radius: 16px; padding: 20px 24px; box-shadow: 0 2px 16px rgba(0,0,0,.06); }
    [data-theme="dark"] .gl-comm-card { background: #1a2840; border-color: #2a3a55; }
    .gl-comm-avatar { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg,#C9A84C,#8B6914); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .gl-comm-initials { font-size: 1.4rem; font-weight: 800; color: #fff; }
    .gl-comm-info strong { display: block; font-weight: 700; margin-bottom: 2px; }
    .gl-comm-info span { font-size: .78rem; color: var(--text-muted,#888); display: block; margin-bottom: 6px; }
    .gl-comm-langs { display: flex; gap: 4px; }
    .gl-lang-dot { font-size: 1.1rem; }
    .gl-comm-sample { background: #fff; border-left: 3px solid #C9A84C; border-radius: 0 8px 8px 0; padding: 14px 18px; }
    [data-theme="dark"] .gl-comm-sample { background: #1a2840; }
    .gl-comm-quote { margin: 0; font-style: italic; font-size: .9rem; color: var(--text-muted,#555); }

    /* Logos ticker */
    .fc-logos { overflow: hidden; padding: 20px 0; border-top: 1px solid rgba(228,192,110,.15); border-bottom: 1px solid rgba(228,192,110,.15); }
    .fc-logos-inner { display: flex; gap: 40px; width: max-content; animation: logoScroll 28s linear infinite; }
    .fc-logo-item { flex-shrink: 0; display: flex; align-items: center; }
    .fc-logo-img { height: 32px; width: auto; opacity: .55; filter: brightness(0) invert(1); object-fit: contain; }
    @keyframes logoScroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }

    /* Nichos */
    .gl-nichos { overflow: hidden; }
    .nichos-gl-rail { overflow-x: auto; scrollbar-width: none; cursor: grab; }
    .nichos-gl-rail::-webkit-scrollbar { display: none; }
    .nichos-gl-track { display: flex; gap: 16px; padding: 24px 24px; width: max-content; }
    .nicho-card-gl { background: var(--card-bg, #fff); border: 1px solid rgba(228,192,110,.2); border-radius: 16px; padding: 24px 20px; min-width: 200px; max-width: 220px; display: flex; flex-direction: column; gap: 8px; }
    [data-theme="dark"] .nicho-card-gl { background: #1a2840; }
    .nicho-gl-icon { font-size: 2rem; }
    .nicho-gl-name { font-weight: 700; font-size: .95rem; }
    .nicho-gl-ex { font-size: .8rem; color: var(--text-muted,#888); margin: 0; line-height: 1.4; }

    /* Studio */
    .gl-estudio { }
    .gl-estudio-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    @media(max-width:820px){ .gl-estudio-inner { grid-template-columns: 1fr; } }
    .gl-estudio-chips { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
    .gl-est-card { background: var(--card-bg,#fff); border: 1px solid rgba(228,192,110,.2); border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; gap: 16px; }
    [data-theme="dark"] .gl-est-card { background: #1a2840; }
    .gl-est-line { display: flex; align-items: center; gap: 10px; font-size: .9rem; font-weight: 500; }
    .gl-est-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .gl-est-dot.ev-grav { background: #4a90e2; }
    .gl-est-dot.ev-apr { background: #e4c06e; }
    .gl-est-dot.ev-ent { background: #50c878; }
    .gl-est-tags { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 8px; border-top: 1px solid rgba(228,192,110,.15); }
    .gl-est-tags span { background: rgba(228,192,110,.12); border-radius: 20px; padding: 4px 12px; font-size: .75rem; font-weight: 600; color: #C9A84C; }

    /* Portfolio */
    .gl-portfolio { }
    .ps-compare-head { font-size: clamp(1.8rem,4vw,3rem); font-weight: 900; letter-spacing: -.03em; line-height: 1.1; }
    .ps-word-wrap { display: inline-block; overflow: hidden; height: 1.25em; vertical-align: bottom; }
    .ps-word-track { display: flex; flex-direction: column; transition: transform .5s cubic-bezier(.4,0,.2,1); }
    .ps-word-item { display: block; height: 1.25em; color: #E4C06E; }
    .gl-port-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 200px 180px; gap: 8px; margin-top: 32px; padding: 0 24px; max-width: 900px; margin-left: auto; margin-right: auto; }
    .gl-port-item { background: linear-gradient(135deg, #0d1b2e 0%, #1a2840 100%); border-radius: 12px; position: relative; overflow: hidden; }
    .gl-port-item::after { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(228,192,110,.05), rgba(228,192,110,.15)); }
    .gl-port-item--tall { grid-row: span 2; }
    .gl-port-item--wide { grid-column: span 2; }
    @media(max-width:600px){ .gl-port-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; } .gl-port-item--tall,.gl-port-item--wide { grid-row: auto; grid-column: auto; } }

    /* Agents */
    .gl-agentes { background: var(--bg-alt,#f7f7f7); }
    .gl-agents-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 40px; }
    @media(max-width:820px){ .gl-agents-grid { grid-template-columns: 1fr 1fr; } }
    @media(max-width:480px){ .gl-agents-grid { grid-template-columns: 1fr; } }
    .gl-agent-card { background: #fff; border: 1px solid rgba(228,192,110,.2); border-radius: 16px; padding: 24px 20px; display: flex; flex-direction: column; gap: 10px; }
    [data-theme="dark"] .gl-agent-card { background: #1a2840; }
    .gl-agent-ic { font-size: 1.8rem; }
    .gl-agent-card strong { font-size: .95rem; font-weight: 700; }
    .gl-agent-card p { font-size: .85rem; color: var(--text-muted,#666); margin: 0; line-height: 1.5; }

    /* Services */
    .gl-servicos { }
    .avulso-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
    @media(max-width:820px){ .avulso-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; } }
    .avulso-card { background: var(--card-bg,#fff); border: 1px solid rgba(228,192,110,.2); border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; }
    [data-theme="dark"] .avulso-card { background: #1a2840; }
    .avulso-icon { font-size: 2rem; }
    .avulso-name { font-size: 1.05rem; font-weight: 700; }
    .avulso-tagline { font-size: .88rem; color: var(--text-muted,#666); margin: 0; }
    .avulso-list-label { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #C9A84C; margin-top: 8px; display: block; }
    .avulso-list { margin: 4px 0 0; padding-left: 16px; font-size: .82rem; color: var(--text-muted,#666); }
    .avulso-list li { margin-bottom: 3px; }
    .avulso-excl { font-size: .78rem; color: #b07a20; background: rgba(228,192,110,.1); border-radius: 8px; padding: 8px 10px; margin: 4px 0 0; }
    .avulso-cta { margin-top: auto; padding-top: 12px; }

    /* Team */
    .gl-time { background: var(--bg-alt,#f7f7f7); }
    .roster { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 32px; }
    .roster-chip { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid rgba(228,192,110,.2); border-radius: 40px; padding: 8px 16px 8px 8px; }
    [data-theme="dark"] .roster-chip { background: #1a2840; }
    .roster-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg,#C9A84C,#8B6914); display: flex; align-items: center; justify-content: center; font-size: .78rem; font-weight: 800; color: #fff; flex-shrink: 0; }
    .roster-txt { display: flex; flex-direction: column; }
    .roster-txt strong { font-size: .85rem; font-weight: 700; }
    .roster-txt small { font-size: .72rem; color: var(--text-muted,#888); }

    /* Footer */
    .site-footer { background: #0a1220; padding: 48px 0 32px; }
    .fc-footer-inner { display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
    .fc-footer-logo { font-size: 1.6rem; font-weight: 900; letter-spacing: .05em; color: #E4C06E; }
    .fc-footer-tag { font-size: .85rem; color: rgba(255,255,255,.5); margin: 0; }
    .fc-footer-nav { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
    .fc-footer-nav a { color: rgba(255,255,255,.6); font-size: .85rem; text-decoration: none; }
    .fc-footer-nav a:hover { color: #E4C06E; }
    .fc-footer-copy { font-size: .78rem; color: rgba(255,255,255,.35); margin: 0; }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   NEW SECTIONS (mirroring home.js)
   ============================================================ */

function sLogos() {
  const logos = ["1pra1.png","luck.png","avai.png","cruzeiro.png"];
  const items = logos.map(f => `<div class="fc-logo-item"><img src="assets/logos-parcerias/${f}" alt="Partner" class="fc-logo-img" loading="lazy"></div>`).join("");
  return `
  <div class="fc-logos" aria-label="${s.logosLabel}">
    <div class="fc-logos-inner">${items}${items}${items}</div>
  </div>`;
}

function sNichos() {
  const cards = s.nichos.map(n => `
    <article class="nicho-card-gl">
      <div class="nicho-gl-icon">${n.icon}</div>
      <strong class="nicho-gl-name">${n.name}</strong>
      <p class="nicho-gl-ex">${n.ex}</p>
    </article>`).join("");
  return `
  <section class="section gl-nichos" id="nichos" aria-label="${s.nichosLabel}">
    <div class="container">
      <span class="fc-label center">${s.nichosLabel}</span>
      <h2 class="prod-h2 center">${s.nichosH2}</h2>
    </div>
    <div class="nichos-gl-rail"><div class="nichos-gl-track">${cards}${cards}</div></div>
  </section>`;
}

function sEstudio() {
  return `
  <section class="section gl-estudio" id="estudio" aria-label="${s.estudioLabel}">
    <div class="container">
      <div class="gl-estudio-inner reveal">
        <div class="gl-estudio-copy">
          <span class="fc-label">${s.estudioLabel}</span>
          <h2 class="prod-h2">${s.estudioH2}</h2>
          <p class="lede">${s.estudioSub}</p>
          <div class="gl-estudio-chips">
            ${s.estudioChips.map(c => `<span class="estudio2-chip">${c}</span>`).join("")}
          </div>
        </div>
        <div class="gl-estudio-visual">
          <div class="gl-est-card">
            <div class="gl-est-line"><span class="gl-est-dot ev-grav"></span>${lang === "es" ? "Sesión de filmación" : "Filming session"}</div>
            <div class="gl-est-line"><span class="gl-est-dot ev-apr"></span>${lang === "es" ? "Edición + aprobación" : "Editing + approval"}</div>
            <div class="gl-est-line"><span class="gl-est-dot ev-ent"></span>${lang === "es" ? "Entrega al cliente" : "Client delivery"}</div>
            <div class="gl-est-tags">
              <span>BC · Itajaí</span><span>São Paulo</span><span>Rio de Janeiro</span><span>Florianópolis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function sPortfolio() {
  const words = s.portfolioWords;
  const wItems = words.map(w => `<span class="ps-word-item">${w}.</span>`).join("");
  return `
  <section class="section gl-portfolio" id="portfolio" aria-label="${s.portfolioLabel}">
    <div class="container ps-sub-head">
      <span class="fc-label center">${s.portfolioLabel}</span>
      <h2 class="prod-h2 ps-compare-head">
        <span>${s.portfolioH2}</span><br>
        <span class="ps-word-wrap" aria-live="polite" aria-label="${words[0]}">
          <span class="ps-word-track" id="gl-word-track">${wItems}</span>
        </span>
      </h2>
    </div>
    <div class="gl-port-grid reveal">
      <div class="gl-port-item gl-port-item--tall"></div>
      <div class="gl-port-item"></div>
      <div class="gl-port-item"></div>
      <div class="gl-port-item gl-port-item--wide"></div>
      <div class="gl-port-item"></div>
    </div>
    <div class="container" style="text-align:center;margin-top:32px">
      <a class="btn btn-ghost" href="${ctaHref(lang === "es" ? "Hola, quiero ver el portafolio de LORDS." : "Hi, I want to see LORDS portfolio.")}" target="_blank" rel="noopener">${lang === "es" ? "Ver portafolio completo →" : "See full portfolio →"}</a>
    </div>
  </section>`;
}

function sAgentes() {
  const cards = s.agentes.map(a => `
    <div class="gl-agent-card reveal">
      <span class="gl-agent-ic">${a.ic}</span>
      <strong>${a.name}</strong>
      <p>${a.desc}</p>
    </div>`).join("");
  return `
  <section class="section gl-agentes" id="agentes" aria-label="${s.agentesLabel}">
    <div class="container">
      <span class="fc-label center">${s.agentesLabel}</span>
      <h2 class="prod-h2 center">${s.agentesH2}</h2>
      <p class="lede center">${s.agentesSub}</p>
      <div class="gl-agents-grid">${cards}</div>
    </div>
  </section>`;
}

function sServicos() {
  const waBase = WHATSAPP_NUM ? `https://wa.me/${WHATSAPP_NUM}?text=` : null;
  const cards = s.servicos.map(sv => `
    <article class="avulso-card">
      <div class="avulso-icon">${sv.icon}</div>
      <strong class="avulso-name">${sv.name}</strong>
      <p class="avulso-tagline">${sv.tagline}</p>
      <span class="avulso-list-label">${lang === "es" ? "Formatos" : "Formats"}</span>
      <ul class="avulso-list">${sv.formatos.map(f => `<li>${f}</li>`).join("")}</ul>
      <span class="avulso-list-label">${lang === "es" ? "Qué incluye" : "What's included"}</span>
      <ul class="avulso-list">${sv.entrega.map(e => `<li>${e}</li>`).join("")}</ul>
      ${sv.excl ? `<p class="avulso-excl">⚠ ${sv.excl}</p>` : ""}
      <div class="avulso-cta">
        <a class="btn btn-primary btn-cta" href="${waBase ? waBase + encodeURIComponent((lang === "es" ? "Hola! Me interesa el servicio: " : "Hi! I'm interested in the service: ") + sv.name) : CALENDLY_URL}" target="_blank" rel="noopener">${lang === "es" ? "Quiero contratar →" : "Get a quote →"}</a>
      </div>
    </article>`).join("");
  return `
  <section class="section gl-servicos" id="servicos" aria-label="${s.servicosLabel}">
    <div class="container">
      <span class="fc-label center">${s.servicosLabel}</span>
      <h2 class="prod-h2 center">${s.servicosH2}</h2>
      <p class="lede center">${s.servicosSub}</p>
      <div class="avulso-grid reveal">${cards}</div>
    </div>
  </section>`;
}

function sTime() {
  const chips = s.roster.map(r => `
    <div class="roster-chip">
      <span class="roster-avatar">${r.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
      <span class="roster-txt"><strong>${r.name}</strong><small>${r.role}</small></span>
    </div>`).join("");
  return `
  <section class="section gl-time" id="team" aria-label="${s.timeLabel}">
    <div class="container">
      <span class="fc-label center">${s.timeLabel}</span>
      <h2 class="prod-h2 center">${s.timeH2}</h2>
      <p class="lede center">${s.timeSub}</p>
      <div class="roster reveal">${chips}</div>
    </div>
  </section>`;
}

function sFooterContent() {
  const nav = s.nav.map((n, i) => {
    const hrefs = ["#vsl", "#portfolio", "#plans", "#faq"];
    return `<a href="${hrefs[i] || "#"}">${n}</a>`;
  }).join("");
  return `
  <div class="container fc-footer-inner">
    <div class="fc-footer-brand">
      <span class="fc-footer-logo">LORDS</span>
      <p class="fc-footer-tag">${s.footerTag}</p>
    </div>
    <nav class="fc-footer-nav">${nav}</nav>
    <p class="fc-footer-copy">${s.footerCopy}</p>
  </div>`;
}

/* ============================================================
   BUMP TAB INTERACTIONS
   ============================================================ */
function initPersonalize() {
  document.querySelectorAll(".bump-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.pzTab;
      document.querySelectorAll(".bump-tab").forEach((t) => { t.classList.remove("on"); t.setAttribute("aria-pressed", "false"); });
      document.querySelectorAll(".pz-panel").forEach((p) => p.classList.remove("on"));
      tab.classList.add("on");
      tab.setAttribute("aria-pressed", "true");
      const panel = document.querySelector(`.pz-panel[data-pz-panel="${id}"]`);
      if (panel) panel.classList.add("on");
    });
  });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ============================================================
   RENDER
   ============================================================ */
function renderPage() {
  const root = document.getElementById("global-root");
  if (!root) return;

  root.innerHTML = `
    ${sHero()}
    ${sLogos()}
    ${sVsl()}
    ${sCommunicator()}
    ${sNichos()}
    ${sEstudio()}
    ${sPortfolio()}
    ${sAgentes()}
    ${sPlans()}
    ${sHub()}
    ${sServicos()}
    ${sCoverage()}
    ${sPersonalize()}
    ${sFaq()}
    ${sClosing()}
    ${sTime()}`;

  const footer = document.querySelector(".site-footer");
  if (footer) footer.innerHTML = sFooterContent();

  injectGlobalCss();
  initPersonalize();
  initPortfolioWords();
  initNichosReel();
  initReveal();
}

function initPortfolioWords() {
  const words = s.portfolioWords;
  const track = document.getElementById("gl-word-track");
  const wrap = document.querySelector(".ps-word-wrap");
  if (!track || words.length < 2) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % words.length;
    track.style.transform = `translateY(-${idx * 1.25}em)`;
    if (wrap) wrap.setAttribute("aria-label", words[idx]);
  }, 2200);
}

function initNichosReel() {
  const track = document.querySelector(".nichos-gl-track");
  if (!track) return;
  let paused = false;
  const tick = () => {
    if (!paused) track.scrollLeft += 0.5;
    if (track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft = 0;
    requestAnimationFrame(tick);
  };
  track.addEventListener("mouseenter", () => { paused = true; });
  track.addEventListener("mouseleave", () => { paused = false; });
  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", renderPage);
