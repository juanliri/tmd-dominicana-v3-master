/**
 * TMD DOMINICANA — AFEX FIRE SUPPRESSION SYSTEMS CATALOG v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Catalog Key: TMD_AFEX_CATALOG
 * Sector: SAFETY
 * Phase: 2 — Active
 * Last Updated: 2026-09-20
 *
 * Products:
 *   AFEX-CONSTR   — Construction Equipment Kits (5 systems)
 *   AFEX-AG       — Agricultural Equipment Kits (4 systems)
 *   AFEX-MINING   — Mining & Quarry Heavy Equipment (4 systems)
 *   AFEX-DETECT   — Detection & Control Panels (3 SKUs)
 *   AFEX-SERVICE  — Service Kits & Refill Packages (4 SKUs)
 *
 * Note: AFEX systems are paired with machine models from JCB,
 * LiuGong, Kubota, LS Tractor, Yanmar, and Ammann catalogs.
 */

window.TMD_AFEX_CATALOG = (function () {
  'use strict';

  const BRAND = {
    id: 'AFEX',
    name: 'AFEX Systems',
    color: '#EF4444',
    warrantyES: '5 años en componentes del sistema',
    warrantyEN: '5 years on system components',
    origin: 'EE.UU. / Australia',
    founded: 1984,
    supportPhone: '+1 (809) 826-2222',
    whatsapp: '18098262222',
    certifications: ['NFPA 17A', 'FM Global', 'UL Listed', 'ISO 14520'],
    agentNote: 'AFEX systems require professional installation by TMD certified technicians. Price includes on-site installation survey.'
  };

  const USD_TO_DOP = 59.12;
  function dop(usd) { return Math.round(usd * USD_TO_DOP); }

  // ─── INSTALLATION REQUIREMENTS ─────────────────────────────────────────────
  const INSTALL_NOTE_ES = 'Instalación por técnicos certificados TMD incluida. No incluye mano de obra de equipos propios del cliente.';
  const INSTALL_NOTE_EN = 'Installation by TMD certified technicians included. Does not include customer-supplied equipment labor.';

  // ─── CONSTRUCTION EQUIPMENT KITS ──────────────────────────────────────────
  const CONSTRUCTION_KITS = [
    {
      id: 'AFEX-MINI-EX',
      model: 'AFEX Mini Excavator System',
      series: 'Construction Series',
      category: 'Sistemas para Maquinaria de Construcción',
      subcategory: 'Mini Excavadoras',
      agentKg: 9,
      agentType: 'AFEX Liquid Agent (ALC)',
      nozzles: 4,
      detectorType: 'Linear Heat Detection (LHD)',
      activationType: 'Automático + Manual',
      compatibleMachines: ['JCB 9018CF', 'JCB 9027F', 'JCB 9035F', 'JCB 9050F', 'Kubota KX018-4', 'Kubota KX033-4'],
      installTimeH: 4,
      brochureCode: 'FT-AFEX-MINI-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-mini-excavator-suppression-2026.pdf',
      priceUSD: 4800,
      priceDOP: dop(4800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-mini-ex.jpg'],
      tags: ['incendio', 'supresion', 'mini excavadora', 'seguridad', 'jcb', 'kubota'],
      highlights: {
        es: ['9 kg agente líquido AFEX ALC', '4 boquillas de descarga estratégicas', 'Detección lineal de calor en motor', 'Activación automática a 150°C o manual', INSTALL_NOTE_ES],
        en: ['9 kg AFEX ALC liquid agent', '4 strategic discharge nozzles', 'Linear heat detection on engine', 'Auto activation at 150°C or manual', INSTALL_NOTE_EN]
      },
      applications: { es: ['Excavaciones urbanas', 'Trabajo junto a combustible', 'Minería artesanal'], en: ['Urban excavations', 'Work near fuel', 'Artisanal mining'] },
      options: [
        { id: 'afex-mini-alarm',  label: { es: 'Alarma Sonora + Luz Estroboscópica', en: 'Audible + Strobe Light Alarm' }, priceUSD: 380  },
        { id: 'afex-mini-remote', label: { es: 'Activación Remota por Telemática',   en: 'Remote Telematics Activation' }, priceUSD: 1200 }
      ]
    },
    {
      id: 'AFEX-MIDEX',
      model: 'AFEX Mid Excavator System',
      series: 'Construction Series',
      category: 'Sistemas para Maquinaria de Construcción',
      subcategory: 'Excavadoras 10–30 T',
      agentKg: 18,
      agentType: 'AFEX Liquid Agent (ALC)',
      nozzles: 8,
      detectorType: 'Linear Heat Detection (LHD) + Spot Detector',
      activationType: 'Automático + Manual',
      compatibleMachines: ['JCB 145XF', 'JCB 155XF', 'JCB 215XF', 'JCB 225XF', 'LiuGong 922E', 'LiuGong 925E'],
      installTimeH: 8,
      brochureCode: 'FT-AFEX-MIDEX-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-mid-excavator-suppression-2026.pdf',
      priceUSD: 9200,
      priceDOP: dop(9200),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-midex.jpg'],
      tags: ['incendio', 'supresion', 'excavadora', 'seguridad', 'jcb', 'liugong'],
      highlights: {
        es: ['18 kg agente ALC — cobertura extendida', '8 boquillas — motor + hidráulicos + cabina', 'Sistema de dos zonas independientes', 'Compatible con JCB Livelink y LiuGong iLink', INSTALL_NOTE_ES],
        en: ['18 kg ALC agent — extended coverage', '8 nozzles — engine + hydraulics + cab', 'Independent dual-zone system', 'Compatible with JCB Livelink and LiuGong iLink', INSTALL_NOTE_EN]
      },
      applications: { es: ['Canteras', 'Obras civiles de gran escala', 'Demolición', 'Manejo de residuos'], en: ['Quarries', 'Large civil works', 'Demolition', 'Waste handling'] },
      options: [
        { id: 'midex-alarm',  label: { es: 'Alarma + Luz Estroboscópica',    en: 'Alarm + Strobe Light' },       priceUSD: 480  },
        { id: 'midex-remote', label: { es: 'Activación Remota Telemática',    en: 'Telematics Remote Activation' }, priceUSD: 1500 },
        { id: 'midex-refill', label: { es: 'Recarga de Agente (18 kg)',       en: 'Agent Refill (18 kg)' },        priceUSD: 820  }
      ]
    },
    {
      id: 'AFEX-WHEEL-LOADER',
      model: 'AFEX Wheel Loader System',
      series: 'Construction Series',
      category: 'Sistemas para Maquinaria de Construcción',
      subcategory: 'Cargadores de Rueda',
      agentKg: 22,
      agentType: 'AFEX Dry Chemical + Liquid (Dual)',
      nozzles: 10,
      detectorType: 'Linear Heat + Spot (Dual)',
      activationType: 'Automático + Manual',
      compatibleMachines: ['JCB 427 Series III', 'JCB 437 Series III', 'LiuGong 835T', 'LiuGong 856T'],
      installTimeH: 10,
      brochureCode: 'FT-AFEX-WL-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-wheel-loader-suppression-2026.pdf',
      priceUSD: 12500,
      priceDOP: dop(12500),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-wheel-loader.jpg'],
      tags: ['incendio', 'supresion', 'cargador', 'jcb', 'liugong', 'seguridad'],
      highlights: {
        es: ['Sistema dual: químico seco + líquido ALC', 'Protección de eje delantero y trasero', '10 puntos de descarga estratégicos', 'Fusibles térmicos de respaldo', INSTALL_NOTE_ES],
        en: ['Dual system: dry chemical + ALC liquid', 'Front and rear axle protection', '10 strategic discharge points', 'Backup thermal fuses', INSTALL_NOTE_EN]
      },
      applications: { es: ['Minería a cielo abierto', 'Canteras de áridos', 'Manejo de materiales a granel'], en: ['Open-pit mining', 'Aggregate quarries', 'Bulk material handling'] },
      options: [
        { id: 'wl-alarm',  label: { es: 'Sistema de Alarma Premium',     en: 'Premium Alarm System' },    priceUSD: 680  },
        { id: 'wl-remote', label: { es: 'Panel de Control Remoto en Cab', en: 'In-Cab Remote Control Panel' }, priceUSD: 2200 }
      ]
    },
    {
      id: 'AFEX-BACKHOE',
      model: 'AFEX Backhoe Loader System',
      series: 'Construction Series',
      category: 'Sistemas para Maquinaria de Construcción',
      subcategory: 'Retroexcavadoras',
      agentKg: 14,
      agentType: 'AFEX Liquid Agent (ALC)',
      nozzles: 6,
      detectorType: 'Linear Heat Detection',
      activationType: 'Automático + Manual',
      compatibleMachines: ['JCB 3CX', 'JCB 3CX Pro', 'JCB 4CX', 'JCB 4CX Pro'],
      installTimeH: 6,
      brochureCode: 'FT-AFEX-BHL-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-backhoe-suppression-2026.pdf',
      priceUSD: 7200,
      priceDOP: dop(7200),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-backhoe.jpg'],
      tags: ['incendio', 'supresion', 'retroexcavadora', 'jcb', '3cx', 'seguridad'],
      highlights: {
        es: ['Compatible específicamente con JCB 3CX / 4CX', '6 boquillas en zonas críticas', 'Detección en caja de motor y circuito hidráulico', 'Recarga fácil en campo', INSTALL_NOTE_ES],
        en: ['Specifically compatible with JCB 3CX / 4CX', '6 nozzles on critical zones', 'Detection on engine bay and hydraulic circuit', 'Easy field recharge', INSTALL_NOTE_EN]
      },
      applications: { es: ['Obras urbanas', 'Instalación de tuberías', 'Trabajos en zona seca tropical'], en: ['Urban works', 'Pipeline installation', 'Dry tropical zone work'] },
      options: [
        { id: 'bhl-alarm', label: { es: 'Alarma Audible + Visual', en: 'Audible + Visual Alarm' }, priceUSD: 380 }
      ]
    },
    {
      id: 'AFEX-CTL',
      model: 'AFEX Compact Track Loader System',
      series: 'Construction Series',
      category: 'Sistemas para Maquinaria de Construcción',
      subcategory: 'Compact Track Loaders',
      agentKg: 9,
      agentType: 'AFEX Liquid Agent (ALC)',
      nozzles: 4,
      detectorType: 'Spot Detector + LHD',
      activationType: 'Automático + Manual',
      compatibleMachines: ['JCB 260T', 'JCB 280T', 'JCB 300T', 'Kubota SVL65-2S', 'Kubota SVL75-2S', 'Kubota SVL95-2S'],
      installTimeH: 4,
      brochureCode: 'FT-AFEX-CTL-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-ctl-suppression-2026.pdf',
      priceUSD: 4600,
      priceDOP: dop(4600),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/afex-ctl.jpg'],
      tags: ['incendio', 'supresion', 'ctl', 'minicargador', 'jcb', 'kubota'],
      highlights: {
        es: ['Nuevo 2026 — diseñado para CTL de bajos clearances', 'Mangueras de acero inoxidable flexibles', 'Sistema compacto de fácil acceso para servicio', 'Compatible JCB 260T–300T y Kubota SVL', INSTALL_NOTE_ES],
        en: ['New 2026 — designed for low-clearance CTLs', 'Flexible stainless steel hoses', 'Compact easy-service access system', 'Compatible JCB 260T–300T and Kubota SVL', INSTALL_NOTE_EN]
      },
      applications: { es: ['Trabajo en interiores con riesgo de fuego', 'Reciclaje', 'Madera y biomasa', 'Obra civil angosta'], en: ['Indoor fire-risk work', 'Recycling', 'Timber and biomass', 'Tight civil works'] },
      options: [
        { id: 'ctl-alarm',  label: { es: 'Alarma en Cabina',   en: 'In-Cab Alarm' },   priceUSD: 280 },
        { id: 'ctl-refill', label: { es: 'Recarga 9 kg ALC',   en: '9 kg ALC Refill' }, priceUSD: 420 }
      ]
    }
  ];

  // ─── AGRICULTURAL EQUIPMENT KITS ──────────────────────────────────────────
  const AG_KITS = [
    {
      id: 'AFEX-TRACTOR-SM',
      model: 'AFEX Tractor Small (<60HP)',
      series: 'Agricultural Series',
      category: 'Sistemas para Maquinaria Agrícola',
      subcategory: 'Tractores <60 HP',
      agentKg: 6,
      agentType: 'AFEX Dry Chemical',
      nozzles: 3,
      detectorType: 'Spot Detector',
      activationType: 'Manual + Automático',
      compatibleMachines: ['Kubota BX Series', 'Kubota L Series', 'LS MT1 Series', 'LS MT2 Series', 'LS MT3 Series', 'Yanmar YT235', 'Yanmar YT347'],
      installTimeH: 3,
      brochureCode: 'FT-AFEX-TRASM-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-tractor-small-suppression-2026.pdf',
      priceUSD: 2800,
      priceDOP: dop(2800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-tractor-sm.jpg'],
      tags: ['incendio', 'supresion', 'tractor', 'agricola', 'kubota', 'ls', 'yanmar'],
      highlights: {
        es: ['Sistema compacto 6 kg para tractores hasta 60 HP', 'Polvo químico seco clase ABC', 'Instalación en 3 horas sin modificar tractor', 'Fusibles térmicos en motor y hidráulicos', INSTALL_NOTE_ES],
        en: ['Compact 6kg system for up to 60HP tractors', 'ABC dry chemical powder', '3-hour install without modifying tractor', 'Thermal fuses on engine and hydraulics', INSTALL_NOTE_EN]
      },
      applications: { es: ['Cañaverales', 'Terrenos secos', 'Cosecha de arroz', 'Uso de implementos de alto riesgo'], en: ['Sugarcane fields', 'Dry terrain', 'Rice harvesting', 'High-risk implement use'] },
      options: [
        { id: 'tra-sm-alarm', label: { es: 'Alarma Visual/Sonora',  en: 'Visual/Audible Alarm' }, priceUSD: 220 }
      ]
    },
    {
      id: 'AFEX-TRACTOR-LG',
      model: 'AFEX Tractor Large (60HP+)',
      series: 'Agricultural Series',
      category: 'Sistemas para Maquinaria Agrícola',
      subcategory: 'Tractores 60+ HP',
      agentKg: 12,
      agentType: 'AFEX Dry Chemical',
      nozzles: 6,
      detectorType: 'Linear Heat Detection',
      activationType: 'Automático + Manual',
      compatibleMachines: ['Kubota M Series', 'Kubota M5–M7', 'LS MT4 Series', 'LS MT5 Series', 'Yanmar YM489D'],
      installTimeH: 5,
      brochureCode: 'FT-AFEX-TRALG-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-tractor-large-suppression-2026.pdf',
      priceUSD: 5600,
      priceDOP: dop(5600),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-tractor-lg.jpg'],
      tags: ['incendio', 'supresion', 'tractor', 'grande', 'kubota', 'ls', 'yanmar', 'cañaveral'],
      highlights: {
        es: ['12 kg de agente seco para tractores de potencia media-alta', 'Detección lineal de calor en cabina y motor', 'Doble zona de descarga independiente', 'Probado en cañaverales y arrozales tropicales', INSTALL_NOTE_ES],
        en: ['12kg dry agent for mid-high power tractors', 'Linear heat detection in cab and engine', 'Independent dual discharge zones', 'Tested in tropical sugarcane and rice fields', INSTALL_NOTE_EN]
      },
      applications: { es: ['Cañaverales grandes', 'Siembra mecanizada', 'Grandes arrozales', 'Aplicación de agroquímicos'], en: ['Large sugarcane fields', 'Mechanized seeding', 'Large rice paddies', 'Agrochemical application'] },
      options: [
        { id: 'tra-lg-alarm',  label: { es: 'Panel de Alarma Exterior', en: 'External Alarm Panel' }, priceUSD: 380  },
        { id: 'tra-lg-refill', label: { es: 'Recarga 12 kg Agente',     en: '12 kg Agent Refill' },  priceUSD: 540  }
      ]
    },
    {
      id: 'AFEX-HARVESTER',
      model: 'AFEX Rice Harvester System',
      series: 'Agricultural Series',
      category: 'Sistemas para Maquinaria Agrícola',
      subcategory: 'Cosechadoras',
      agentKg: 18,
      agentType: 'AFEX Dry Chemical + Liquid (Dual)',
      nozzles: 9,
      detectorType: 'Linear Heat + Spot Dual Zone',
      activationType: 'Automático + Manual',
      compatibleMachines: ['Kubota DC Series', 'Yanmar AW Series', 'Yanmar AG Series'],
      installTimeH: 8,
      brochureCode: 'FT-AFEX-HARVEST-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-rice-harvester-suppression-2026.pdf',
      priceUSD: 9800,
      priceDOP: dop(9800),
      featured: true,
      isNew: true,
      inStock: true,
      images: ['assets/images/afex-harvester.jpg'],
      tags: ['incendio', 'supresion', 'cosechadora', 'arroz', 'kubota', 'yanmar'],
      highlights: {
        es: ['Sistema dual específico para cosechadoras de arroz', 'Protege zona de trilla y motor simultáneamente', '18 kg agente clase A+B', 'Nuevo 2026 — Validado por Yanmar y Kubota', INSTALL_NOTE_ES],
        en: ['Dual system specific to rice harvesters', 'Simultaneously protects threshing area and engine', '18 kg Class A+B agent', 'New 2026 — Validated by Yanmar and Kubota', INSTALL_NOTE_EN]
      },
      applications: { es: ['Cosecha de arroz', 'Trabajo en biomasa seca', 'Cosechadores de caña'], en: ['Rice harvesting', 'Dry biomass work', 'Sugarcane harvesters'] },
      options: [
        { id: 'harv-remote', label: { es: 'Activación Remota por GPS',     en: 'GPS Remote Activation' },   priceUSD: 1800 },
        { id: 'harv-panel',  label: { es: 'Panel de Alarma en Cabina',     en: 'In-Cab Alarm Panel' },      priceUSD: 480  },
        { id: 'harv-refill', label: { es: 'Recarga de Agente 18 kg Dual',  en: '18 kg Dual Agent Refill' }, priceUSD: 1200 }
      ]
    }
  ];

  // ─── MINING & QUARRY HEAVY KITS ────────────────────────────────────────────
  const MINING_KITS = [
    {
      id: 'AFEX-HEAVY-25T',
      model: 'AFEX Heavy Equipment 25T+',
      series: 'Mining & Quarry Series',
      category: 'Sistemas para Maquinaria Pesada (Minería)',
      subcategory: 'Equipos >25 Toneladas',
      agentKg: 32,
      agentType: 'AFEX Liquid Agent Premium (ALC-X)',
      nozzles: 14,
      detectorType: 'Multi-zone: Linear + Spot + Thermal',
      activationType: 'Automático Multi-zona + Manual Remoto',
      compatibleMachines: ['LiuGong 930E', 'LiuGong 950E', 'JCB 360X', 'JCB 370X'],
      installTimeH: 16,
      brochureCode: 'FT-AFEX-HVY25-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/afex/afex-heavy-25t-suppression-2026.pdf',
      priceUSD: 24500,
      priceDOP: dop(24500),
      featured: false,
      isNew: false,
      inStock: false,
      images: ['assets/images/afex-heavy25t.jpg'],
      tags: ['incendio', 'supresion', 'mineria', 'pesado', 'liugong', 'jcb', 'cantera'],
      highlights: {
        es: ['Sistema AFEX de grado minero ALC-X', '32 kg agente premium de alta eficiencia', 'Multi-zona: motor, hidráulicos, turbo, transmisión', 'Compatible con telemática de flota', INSTALL_NOTE_ES],
        en: ['Mining-grade AFEX ALC-X system', '32 kg high-efficiency premium agent', 'Multi-zone: engine, hydraulics, turbo, transmission', 'Fleet telematics compatible', INSTALL_NOTE_EN]
      },
      applications: { es: ['Cantera de áridos', 'Minería de cal', 'Demolición a gran escala', 'Puertos y terminales'], en: ['Aggregate quarry', 'Limestone mining', 'Large-scale demolition', 'Ports and terminals'] },
      options: [
        { id: 'hvy25-fleet',  label: { es: 'Integración Telemática Flota',  en: 'Fleet Telematics Integration' }, priceUSD: 3500 },
        { id: 'hvy25-panel',  label: { es: 'Panel de Control Remoto Full',   en: 'Full Remote Control Panel' },    priceUSD: 2800 },
        { id: 'hvy25-refill', label: { es: 'Recarga 32 kg ALC-X',           en: '32 kg ALC-X Agent Refill' },     priceUSD: 2200 }
      ]
    }
  ];

  // ─── DETECTION & CONTROL PANELS ───────────────────────────────────────────
  const DETECTION_SYSTEMS = [
    {
      id: 'AFEX-DET-LHD',
      model: 'AFEX Linear Heat Detection Kit',
      series: 'Detection Systems',
      category: 'Detección y Control',
      subcategory: 'Detección Lineal de Calor',
      coverageM: 20,
      tempActivationC: 150,
      ipRating: 'IP68',
      brochureCode: 'FT-AFEX-LHD-2026-DO',
      priceUSD: 680,
      priceDOP: dop(680),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-lhd.jpg'],
      tags: ['deteccion', 'calor', 'sensor', 'incendio'],
      highlights: {
        es: ['Cable detector de calor 20 m lineal', 'Activación automática a 150°C', 'Resistente a agua IP68', 'Compatible con todos los sistemas AFEX'],
        en: ['20m linear heat detection cable', 'Automatic activation at 150°C', 'IP68 water resistant', 'Compatible with all AFEX systems']
      },
      applications: { es: ['Zona de motor', 'Compartimento hidráulico', 'Zona de turbo/escape'], en: ['Engine bay', 'Hydraulic compartment', 'Turbo/exhaust zone'] },
      options: []
    },
    {
      id: 'AFEX-DET-PANEL',
      model: 'AFEX Control Panel Pro',
      series: 'Detection Systems',
      category: 'Detección y Control',
      subcategory: 'Panel de Control',
      zones: 4,
      display: 'LCD',
      ipRating: 'IP65',
      brochureCode: 'FT-AFEX-PANEL-2026-DO',
      priceUSD: 1200,
      priceDOP: dop(1200),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-panel.jpg'],
      tags: ['panel', 'control', 'incendio', 'multizonal'],
      highlights: {
        es: ['Panel de 4 zonas independientes', 'Display LCD con diagnóstico en tiempo real', 'Historial de eventos almacenado', 'Alarma audible 110 dB integrada'],
        en: ['4 independent zone panel', 'LCD display with real-time diagnostics', 'Stored event history', 'Integrated 110 dB audible alarm']
      },
      applications: { es: ['Control central del sistema AFEX', 'Cabina del operador', 'Sistemas multi-zona'], en: ['AFEX system central control', 'Operator cab', 'Multi-zone systems'] },
      options: []
    }
  ];

  // ─── SERVICE & REFILL KITS ─────────────────────────────────────────────────
  const SERVICE_KITS = [
    {
      id: 'AFEX-SVC-ANNUAL',
      model: 'AFEX Annual Inspection Service',
      series: 'Service',
      category: 'Servicio y Recarga',
      subcategory: 'Inspección Anual',
      includes: ['Inspección visual completa', 'Test de presión del cilindro', 'Revisión de boquillas y mangueras', 'Certificado de conformidad NFPA'],
      brochureCode: 'SVC-AFEX-ANUAL-2026',
      priceUSD: 280,
      priceDOP: dop(280),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-service.jpg'],
      tags: ['servicio', 'inspeccion', 'mantenimiento', 'afex', 'anual'],
      highlights: {
        es: ['Inspección anual obligatoria NFPA 17A', 'Realizada por técnicos certificados TMD', 'Incluye certificado de conformidad', 'Recomendada cada 12 meses'],
        en: ['Mandatory NFPA 17A annual inspection', 'Performed by TMD certified technicians', 'Includes conformity certificate', 'Recommended every 12 months']
      },
      applications: { es: ['Todos los sistemas AFEX instalados'], en: ['All installed AFEX systems'] },
      options: []
    },
    {
      id: 'AFEX-SVC-REFILL9',
      model: 'AFEX Agent Refill 9 kg ALC',
      series: 'Service',
      category: 'Servicio y Recarga',
      subcategory: 'Recarga de Agente',
      agentKg: 9,
      agentType: 'ALC Liquid',
      brochureCode: 'SVC-AFEX-REFILL9-2026',
      priceUSD: 420,
      priceDOP: dop(420),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/afex-refill.jpg'],
      tags: ['recarga', 'agente', 'afex', 'repuesto'],
      highlights: {
        es: ['Recarga oficial AFEX 9 kg ALC', 'Agente líquido certificado UL', 'Incluye prueba de presión post-recarga', 'Entrega en sitio disponible'],
        en: ['Official AFEX 9 kg ALC refill', 'UL certified liquid agent', 'Includes post-refill pressure test', 'On-site delivery available']
      },
      applications: { es: ['Sistemas AFEX 9 kg post-activación'], en: ['9 kg AFEX systems post-activation'] },
      options: []
    }
  ];

  // ─── ALL PRODUCTS ──────────────────────────────────────────────────────────
  const ALL_PRODUCTS = [
    ...CONSTRUCTION_KITS,
    ...AG_KITS,
    ...MINING_KITS,
    ...DETECTION_SYSTEMS,
    ...SERVICE_KITS
  ];

  // ─── PUBLIC API ───────────────────────────────────────────────────────────
  return {
    brand: BRAND,
    version: '1.0.0',
    lastUpdated: '2026-09-20',
    totalProducts: ALL_PRODUCTS.length,
    exchangeRate: USD_TO_DOP,

    constructionKits: CONSTRUCTION_KITS,
    agKits: AG_KITS,
    miningKits: MINING_KITS,
    detectionSystems: DETECTION_SYSTEMS,
    serviceKits: SERVICE_KITS,

    getAllProducts() { return ALL_PRODUCTS; },
    getByCategory(cat) { return ALL_PRODUCTS.filter(p => p.category === cat); },
    getFeatured() { return ALL_PRODUCTS.filter(p => p.featured); },
    getInStock() { return ALL_PRODUCTS.filter(p => p.inStock); },
    getNew() { return ALL_PRODUCTS.filter(p => p.isNew); },
    getById(id) { return ALL_PRODUCTS.find(p => p.id === id) || null; },
    getCategories() {
      return [...new Set(ALL_PRODUCTS.map(p => p.category))];
    },
    /**
     * Find suppression kits compatible with a given machine model ID
     * @param {string} machineId — e.g. 'JCB 3CX', 'Kubota KX033-4'
     */
    getForMachine(machineId) {
      const q = machineId.toLowerCase();
      return ALL_PRODUCTS.filter(p =>
        (p.compatibleMachines || []).some(m => m.toLowerCase().includes(q))
      );
    },
    /**
     * Get all brochure download keys (for Supabase Storage integration)
     */
    getAllBrochureKeys() {
      return ALL_PRODUCTS
        .filter(p => p.supabaseBrochureKey)
        .map(p => ({ id: p.id, model: p.model, key: p.supabaseBrochureKey }));
    },
    search(query) {
      const q = query.toLowerCase();
      return ALL_PRODUCTS.filter(p =>
        (p.model || '').toLowerCase().includes(q) ||
        (p.series || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.includes(q)) ||
        (p.compatibleMachines || []).some(m => m.toLowerCase().includes(q))
      );
    },
    getPrice(id, currency = 'USD') {
      const p = this.getById(id);
      if (!p) return null;
      return currency === 'DOP' ? p.priceDOP : p.priceUSD;
    }
  };

})();

console.log('[TMD] AFEX catalog loaded — ' + window.TMD_AFEX_CATALOG.totalProducts + ' sistemas de supresión de incendio');
