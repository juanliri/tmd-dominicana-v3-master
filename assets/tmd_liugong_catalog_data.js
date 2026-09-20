/**
 * TMD DOMINICANA — LIUGONG HEAVY MACHINERY CATALOG v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Catalog Key: TMD_LIUGONG_CATALOG
 * Sector: CONSTRUCTION
 * Phase: 2 — Active
 * Last Updated: 2026-09-20
 *
 * Products:
 *   LG-WLOAD   — Wheel Loaders (835T, 856T, 878T)
 *   LG-MINEX   — Mini Excavators (906E, 908E, 915E)
 *   LG-EXCAV   — Track Excavators (922E, 925E, 930E, 950E)
 *   LG-GRADE   — Motor Graders (4180D, 4215D)
 *   LG-BULLD   — Bulldozers (B160CL, B230)
 */

window.TMD_LIUGONG_CATALOG = (function () {
  'use strict';

  const BRAND = {
    id: 'LIUGONG',
    name: 'LiuGong',
    fullName: 'Guangxi LiuGong Machinery Co., Ltd.',
    color: '#D97706',
    warrantyES: '2 años / 2,000 horas de garantía de fábrica',
    warrantyEN: '2 years / 2,000 hours factory warranty',
    origin: 'China / Global',
    founded: 1958,
    supportPhone: '+1 (809) 826-2222',
    whatsapp: '18098262222',
    certifications: ['ISO 9001', 'ISO 14001', 'CE Certified', 'Tier 3 / Tier 4F Emissions'],
    agentNote: 'Distribuidor autorizado exclusivo en República Dominicana. Respaldado con repuestos OEM en Almacén Central Km 22.'
  };

  const USD_TO_DOP = 59.12;
  function dop(usd) { return Math.round(usd * USD_TO_DOP); }

  // ─── CARGADORES DE RUEDA (WHEEL LOADERS) ──────────────────────────────────
  const WHEEL_LOADERS = [
    {
      id: 'LG-835T',
      model: '835T',
      series: 'T-Series Wheel Loader',
      category: 'Cargadores de Rueda',
      subcategory: 'Cargador Mediano',
      engineModel: 'Cummins 6BT5.9 / Weichai WP6',
      netPowerHp: 131,
      operatingWeightKg: 10900,
      bucketCapacityM3: 1.8,
      breakoutForceKn: 105,
      dumpClearanceMm: 2920,
      brochureCode: 'FT-LG-835T-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-835t-wheel-loader-2026.pdf',
      priceUSD: 68500,
      priceDOP: dop(68500),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-835t.jpg'],
      tags: ['cargador', 'rueda', 'pala', 'liugong', 'agregados', 'construccion'],
      highlights: {
        es: [
          'Potencia neta: 131 HP @ 2,200 rpm',
          'Capacidad de balde estándar: 1.8 m³ (Carga útil 3,500 kg)',
          'Transmisión LiuGong Powershift de 4 velocidades adelante / 3 reversa',
          'Cabina ROPS/FOPS presurizada con A/C tropicalizado 42°C'
        ],
        en: [
          'Net power: 131 HP @ 2,200 rpm',
          'Standard bucket capacity: 1.8 m³ (Rated load 3,500 kg)',
          'LiuGong Powershift transmission 4F / 3R',
          'Pressurized ROPS/FOPS cab with tropicalized A/C 42°C'
        ]
      },
      applications: {
        es: ['Manejo de áridos y canteras', 'Plantas de concreto asfáltico', 'Obras viales urbanas'],
        en: ['Aggregate handling & quarries', 'Asphalt concrete batching', 'Urban road construction']
      },
      options: [
        { id: 'lg835-rock', label: { es: 'Balde de Roca Reforzado 1.6 m³', en: 'Reinforced Rock Bucket 1.6 m³' }, priceUSD: 3800 },
        { id: 'lg835-fork', label: { es: 'Horquillas Portapalets Rápidas', en: 'Quick Pallet Forks Attachment' }, priceUSD: 2900 },
        { id: 'lg835-acou', label: { es: 'Acople Rápido Hidráulico ISO', en: 'Hydraulic Quick Coupler ISO' }, priceUSD: 2400 }
      ]
    },
    {
      id: 'LG-856T',
      model: '856T',
      series: 'T-Series Heavy Wheel Loader',
      category: 'Cargadores de Rueda',
      subcategory: 'Cargador Pesado 5T',
      engineModel: 'Cummins QSL9.3 Tier 3',
      netPowerHp: 215,
      operatingWeightKg: 17800,
      bucketCapacityM3: 3.0,
      breakoutForceKn: 175,
      dumpClearanceMm: 3100,
      brochureCode: 'FT-LG-856T-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-856t-heavy-loader-2026.pdf',
      priceUSD: 118000,
      priceDOP: dop(118000),
      featured: true,
      isNew: true,
      inStock: true,
      images: ['assets/images/liugong-856t.jpg'],
      tags: ['cargador', '5 toneladas', 'cantera', 'cummins', 'mineria', 'puerto'],
      highlights: {
        es: [
          'Motor Cummins QSL9.3 turbo intercooler (215 HP)',
          'Capacidad nominal: 5,000 kg con balde de uso general 3.0 m³',
          'Transmisión ZF automática 4WG200 de fabricación alemana',
          'Ejes húmedos ZF con diferencial de deslizamiento limitado (LSD)'
        ],
        en: [
          'Cummins QSL9.3 turbo intercooler engine (215 HP)',
          'Rated load capacity: 5,000 kg with 3.0 m³ general purpose bucket',
          'German ZF 4WG200 automatic powershift transmission',
          'ZF wet brake axles with limited slip differentials'
        ]
      },
      applications: {
        es: ['Carga de volquetas de 20–30 m³ en canteras', 'Puertos y descarga de graneles', 'Grandes movimientos de tierra'],
        en: ['Loading 20–30 m³ dump trucks in quarries', 'Ports and bulk material unloading', 'Major earthmoving projects']
      },
      options: [
        { id: 'lg856-heavy-rock', label: { es: 'Balde de Roca Escollera 2.7 m³', en: 'Heavy Rock Bucket 2.7 m³' }, priceUSD: 5600 },
        { id: 'lg856-scale',      label: { es: 'Báscula de Pesaje Dinámico a Bordo', en: 'On-Board Dynamic Payload Scale' }, priceUSD: 4200 },
        { id: 'lg856-auto-lube',  label: { es: 'Sistema de Engrase Automático Centralizado', en: 'Centralized Auto-Lubrication System' }, priceUSD: 3100 }
      ]
    },
    {
      id: 'LG-878T',
      model: '878T',
      series: 'T-Series Quarry Master',
      category: 'Cargadores de Rueda',
      subcategory: 'Cargador Minero 7T',
      engineModel: 'Cummins QSX12 Tier 3',
      netPowerHp: 350,
      operatingWeightKg: 24500,
      bucketCapacityM3: 4.5,
      breakoutForceKn: 240,
      dumpClearanceMm: 3350,
      brochureCode: 'FT-LG-878T-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-878t-quarry-loader-2026.pdf',
      priceUSD: 189000,
      priceDOP: dop(189000),
      featured: false,
      isNew: false,
      inStock: false,
      images: ['assets/images/liugong-878t.jpg'],
      tags: ['mineria', 'cargador minero', 'cantera pesada', '7 toneladas', 'cummins qs12'],
      highlights: {
        es: [
          'Potencia de arrastre masiva: 350 HP Cummins QSX12',
          'Carga útil: 7,000 kg con balde de alta penetración 4.5 m³',
          'Chasis articulado reforzado para ciclo de trabajo 24/7 en minería',
          'Sistema hidráulico con bombas de pistones de caudal variable'
        ],
        en: [
          'Massive tractive power: 350 HP Cummins QSX12',
          'Rated payload: 7,000 kg with 4.5 m³ high-penetration bucket',
          'Reinforced articulated frame for 24/7 continuous mining duty',
          'Load-sensing variable displacement piston pump hydraulics'
        ]
      },
      applications: {
        es: ['Explotación minera de bauxita y oro', 'Plantas de trituración de gran capacidad', 'Construcción de presas y diques'],
        en: ['Bauxite & gold open-pit mining', 'High-capacity crushing plants', 'Dam and levee construction']
      },
      options: [
        { id: 'lg878-spade', label: { es: 'Balde Semi-Espátula para Roca Abrasiva', en: 'Spade Nose Bucket for Abrasive Rock' }, priceUSD: 7800 },
        { id: 'lg878-camera', label: { es: 'Sistema de Cámaras 360° Radar Blind-Spot', en: '360° Camera & Radar Blind-Spot System' }, priceUSD: 3900 }
      ]
    }
  ];

  // ─── MINI EXCAVADORAS (MINI EXCAVATORS) ───────────────────────────────────
  const MINI_EXCAVATORS = [
    {
      id: 'LG-906E',
      model: '906E',
      series: 'E-Series Mini Excavator',
      category: 'Mini Excavadoras',
      subcategory: 'Mini Excavadora 6T',
      engineModel: 'Yanmar 4TNV98 Tier 3',
      netPowerHp: 49.6,
      operatingWeightKg: 5900,
      bucketCapacityM3: 0.21,
      maxDigDepthMm: 3875,
      maxReachMm: 6110,
      brochureCode: 'FT-LG-906E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-906e-mini-excavator-2026.pdf',
      priceUSD: 46500,
      priceDOP: dop(46500),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-906e.jpg'],
      tags: ['mini excavadora', '6 toneladas', 'urbana', 'zanja', 'yanmar', 'compacta'],
      highlights: {
        es: [
          'Motor Yanmar 4TNV98 probado y económico (49.6 HP)',
          'Profundidad de excavación máxima: 3,875 mm',
          'Cuchilla dozer delantera con flotación para nivelación rápida',
          'Línea auxiliar hidráulica bidireccional para martillo o ahoyador'
        ],
        en: [
          'Field-proven fuel-efficient Yanmar 4TNV98 engine (49.6 HP)',
          'Maximum digging depth: 3,875 mm',
          'Front dozer blade with float mode for rapid backfilling',
          'Bi-directional auxiliary hydraulic piping for breaker/auger'
        ]
      },
      applications: {
        es: ['Instalación de tuberías de agua y gas', 'Cimentaciones residenciales', 'Obras de telecomunicaciones'],
        en: ['Water and gas pipe installation', 'Residential foundations', 'Telecom trenching']
      },
      options: [
        { id: 'lg906-breaker', label: { es: 'Martillo Hidráulico Silenciado TMD-50', en: 'Silenced Hydraulic Breaker TMD-50' }, priceUSD: 4200 },
        { id: 'lg906-rubber',  label: { es: 'Zapatas de Goma para Asfalto', en: 'Rubber Track Pads for Asphalt' }, priceUSD: 1400 },
        { id: 'lg906-trench',  label: { es: 'Balde de Zanja Angosto 300 mm', en: 'Narrow Trenching Bucket 300 mm' }, priceUSD: 950 }
      ]
    },
    {
      id: 'LG-908E',
      model: '908E',
      series: 'E-Series Midi Excavator',
      category: 'Mini Excavadoras',
      subcategory: 'Midi Excavadora 8T',
      engineModel: 'Yanmar 4TNV98T Turbo',
      netPowerHp: 65,
      operatingWeightKg: 7800,
      bucketCapacityM3: 0.32,
      maxDigDepthMm: 4150,
      maxReachMm: 6350,
      brochureCode: 'FT-LG-908E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-908e-midi-excavator-2026.pdf',
      priceUSD: 59000,
      priceDOP: dop(59000),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-908e.jpg'],
      tags: ['excavadora', '8 toneladas', 'midi', 'yanmar turbo', 'infraestructura'],
      highlights: {
        es: [
          'Motor Yanmar turboalimentado de 65 HP',
          'Capacidad de balde: 0.32 m³ con fuerza de desprendimiento de 58 kN',
          'Giro dentro de vía estrecha ideal para carreteras y alcantarillado',
          'Cabina espaciosa con monitor digital multifuncional en español'
        ],
        en: [
          'Turbocharged 65 HP Yanmar engine',
          '0.32 m³ bucket capacity with 58 kN breakout force',
          'Compact swing design ideal for roadways and sewer projects',
          'Spacious cab with digital multifunctional display in Spanish'
        ]
      },
      applications: {
        es: ['Drenaje pluvial y acueductos', 'Desbroce y nivelación de parcelas', 'Canalizaciones viales'],
        en: ['Stormwater drainage and aqueducts', 'Plot clearing and grading', 'Highway trenching']
      },
      options: [
        { id: 'lg908-breaker', label: { es: 'Martillo Hidráulico TMD-70 (700 J)', en: 'Hydraulic Breaker TMD-70 (700 J)' }, priceUSD: 5600 },
        { id: 'lg908-tilt',    label: { es: 'Balde de Limpieza Inclinable 1,500 mm', en: 'Tilting Ditching Bucket 1,500 mm' }, priceUSD: 2800 },
        { id: 'lg908-thumb',   label: { es: 'Pulgar Hidráulico para Troncos/Rocas', en: 'Hydraulic Thumb for Logs/Rocks' }, priceUSD: 2100 }
      ]
    },
    {
      id: 'LG-915E',
      model: '915E',
      series: 'E-Series Compact Utility',
      category: 'Mini Excavadoras',
      subcategory: 'Excavadora Utilitaria 14T',
      engineModel: 'Cummins QSF3.8 Tier 3',
      netPowerHp: 115,
      operatingWeightKg: 14000,
      bucketCapacityM3: 0.55,
      maxDigDepthMm: 5470,
      maxReachMm: 8300,
      brochureCode: 'FT-LG-915E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-915e-excavator-2026.pdf',
      priceUSD: 88000,
      priceDOP: dop(88000),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/liugong-915e.jpg'],
      tags: ['excavadora', '14 toneladas', 'cummins', 'movimiento tierra', 'zanjas profundas'],
      highlights: {
        es: [
          'Motor Cummins QSF3.8 electrónico de alto torque (115 HP)',
          'Alcance máximo al nivel del suelo: 8,300 mm',
          'Bomba hidráulica principal Kawasaki de caudal variable dual',
          'Excelente relación peso-potencia para bajo consumo de diésel'
        ],
        en: [
          'High-torque Cummins QSF3.8 electronic engine (115 HP)',
          'Maximum reach at ground level: 8,300 mm',
          'Dual variable-displacement Kawasaki main hydraulic pump',
          'Superior power-to-weight ratio for low fuel consumption'
        ]
      },
      applications: {
        es: ['Excavación profunda para tanques y sótanos', 'Construcción de puentes y alcantarillas', 'Carguío de volquetas medianas'],
        en: ['Deep basement and tank excavation', 'Bridge and culvert construction', 'Medium dump truck loading']
      },
      options: [
        { id: 'lg915-breaker', label: { es: 'Martillo Hidráulico Pesado TMD-100', en: 'Heavy Hydraulic Breaker TMD-100' }, priceUSD: 7500 },
        { id: 'lg915-coupler', label: { es: 'Acoplador Rápido Hidráulico', en: 'Hydraulic Quick Coupler' }, priceUSD: 3200 }
      ]
    }
  ];

  // ─── EXCAVADORAS DE CADENA (TRACK EXCAVATORS) ─────────────────────────────
  const TRACK_EXCAVATORS = [
    {
      id: 'LG-922E',
      model: '922E',
      series: 'E-Series Heavy Excavator',
      category: 'Excavadoras de Cadena',
      subcategory: 'Excavadora 22T',
      engineModel: 'Cummins B5.9-C Turbo Tier 2/3',
      netPowerHp: 158,
      operatingWeightKg: 22000,
      bucketCapacityM3: 1.0,
      maxDigDepthMm: 6595,
      maxReachMm: 9870,
      brochureCode: 'FT-LG-922E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-922e-heavy-excavator-2026.pdf',
      priceUSD: 128000,
      priceDOP: dop(128000),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-922e.jpg'],
      tags: ['excavadora', '22 toneladas', 'cummins b5.9', 'oruga', 'carretera', 'cantera'],
      highlights: {
        es: [
          'El caballo de batalla de la construcción dominicana: 22 Toneladas',
          'Motor mecánico Cummins B5.9 tolerante al diésel con azufre de RD',
          'Fuerza de desprendimiento de balde: 152.5 kN',
          'Tren de rodaje reforzado HD con zapatas de 600 mm o 800 mm'
        ],
        en: [
          'The Dominican construction workhorse: 22 Metric Tons',
          'Mechanical Cummins B5.9 engine tolerant of high-sulfur diesel',
          'Bucket breakout force: 152.5 kN',
          'Heavy-duty reinforced undercarriage with 600 mm or 800 mm pads'
        ]
      },
      applications: {
        es: ['Corte de taludes y desmonte en autopistas', 'Extracción de tosca y caliza', 'Carguío continuo de volquetas de 20 m³'],
        en: ['Slope cutting and highway clearing', 'Limestone and marl extraction', 'Continuous loading of 20 m³ dump trucks']
      },
      options: [
        { id: 'lg922-breaker', label: { es: 'Martillo Hidráulico TMD-140 (4,200 J)', en: 'Hydraulic Breaker TMD-140 (4,200 J)' }, priceUSD: 9800 },
        { id: 'lg922-rock-b',  label: { es: 'Balde de Roca con Protectores Laterales 0.9 m³', en: 'Rock Bucket with Side Protectors 0.9 m³' }, priceUSD: 4500 },
        { id: 'lg922-livelink',label: { es: 'Módulo de Telemetría GPS Satelital AEMP', en: 'AEMP Satellite GPS Telematics Module' }, priceUSD: 1800 }
      ]
    },
    {
      id: 'LG-925E',
      model: '925E',
      series: 'E-Series Heavy Excavator',
      category: 'Excavadoras de Cadena',
      subcategory: 'Excavadora 25.5T',
      engineModel: 'Cummins QSB6.7 Tier 3',
      netPowerHp: 178,
      operatingWeightKg: 25500,
      bucketCapacityM3: 1.2,
      maxDigDepthMm: 6925,
      maxReachMm: 10210,
      brochureCode: 'FT-LG-925E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-925e-excavator-2026.pdf',
      priceUSD: 149000,
      priceDOP: dop(149000),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-925e.jpg'],
      tags: ['excavadora', '25 toneladas', 'cummins qsb', 'roca', 'infraestructura pesada'],
      highlights: {
        es: [
          'Potencia incrementada a 178 HP con motor Cummins QSB6.7',
          'Balde estándar HD de 1.2 m³ para ciclos de carga acelerados',
          'Válvula de control principal Kawasaki KMX15RA de alta precisión',
          '6 modos de trabajo seleccionables (Power, Economy, Fine, Lifting, Breaker, Attachment)'
        ],
        en: [
          'Upgraded 178 HP output with Cummins QSB6.7 engine',
          'Standard 1.2 m³ HD bucket for accelerated loading cycles',
          'Precision Kawasaki KMX15RA main control valve',
          '6 selectable working modes (Power, Economy, Fine, Lifting, Breaker, Attachment)'
        ]
      },
      applications: {
        es: ['Canteras de agregados pesados', 'Dragado de ríos y canales MOPC', 'Demolición estructural masiva'],
        en: ['Heavy aggregate quarries', 'River and canal dredging projects', 'Massive structural demolition']
      },
      options: [
        { id: 'lg925-ripper', label: { es: 'Ripper Monodiente para Roca Fracturada', en: 'Single Shank Ripper for Fractured Rock' }, priceUSD: 4900 },
        { id: 'lg925-crusher', label: { es: 'Cizalla Demoledora de Concreto Rotativa', en: 'Rotating Concrete Demolition Shear' }, priceUSD: 14500 }
      ]
    },
    {
      id: 'LG-930E',
      model: '930E',
      series: 'E-Series Quarry Class',
      category: 'Excavadoras de Cadena',
      subcategory: 'Excavadora 31.5T',
      engineModel: 'Cummins QSL9 Tier 3',
      netPowerHp: 214,
      operatingWeightKg: 31500,
      bucketCapacityM3: 1.6,
      maxDigDepthMm: 7300,
      maxReachMm: 10650,
      brochureCode: 'FT-LG-930E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-930e-excavator-2026.pdf',
      priceUSD: 198000,
      priceDOP: dop(198000),
      featured: true,
      isNew: false,
      inStock: false,
      images: ['assets/images/liugong-930e.jpg'],
      tags: ['excavadora', '30 toneladas', 'cantera', 'mineria', 'cummins qsl9'],
      highlights: {
        es: [
          'Clase Cantera Pesada: 31.5 Toneladas con balde de 1.6 m³',
          'Motor Cummins QSL9 de 214 HP con intercooler aire-aire',
          'Bomba hidráulica de 2 x 260 L/min para movimientos ultra-rápidos',
          'Chasis extendido LC para estabilidad total en frentes de roca'
        ],
        en: [
          'Heavy Quarry Class: 31.5 Metric Tons with 1.6 m³ bucket',
          '214 HP Cummins QSL9 engine with air-to-air intercooler',
          '2 x 260 L/min hydraulic pump for ultra-responsive movement',
          'LC extended undercarriage for maximum stability on rock faces'
        ]
      },
      applications: {
        es: ['Producción en canteras de yeso, caliza y agregados', 'Grandes tajos abiertos y autopistas de montaña', 'Carguío de volquetas doble troque'],
        en: ['Gypsum, limestone and aggregate production', 'Major open cuts and mountain highway construction', 'Tandem dump truck loading']
      },
      options: [
        { id: 'lg930-breaker', label: { es: 'Martillo Hidráulico Minero TMD-160 (6,000 J)', en: 'Mining Hydraulic Breaker TMD-160 (6,000 J)' }, priceUSD: 14800 },
        { id: 'lg930-armor',   label: { es: 'Blindaje Inferior Completo de Chasis', en: 'Full Heavy-Duty Belly Pan Armoring' }, priceUSD: 3600 }
      ]
    },
    {
      id: 'LG-950E',
      model: '950E',
      series: 'E-Series Mining Master',
      category: 'Excavadoras de Cadena',
      subcategory: 'Excavadora Minera 48T',
      engineModel: 'Cummins QSX15 Tier 3',
      netPowerHp: 375,
      operatingWeightKg: 48000,
      bucketCapacityM3: 3.2,
      maxDigDepthMm: 7280,
      maxReachMm: 11100,
      brochureCode: 'FT-LG-950E-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-950e-mining-excavator-2026.pdf',
      priceUSD: 345000,
      priceDOP: dop(345000),
      featured: false,
      isNew: false,
      inStock: false,
      images: ['assets/images/liugong-950e.jpg'],
      tags: ['minera', '48 toneladas', 'mineria masiva', 'cummins qsx15', 'balde 3.2m3'],
      highlights: {
        es: [
          'La excavadora más grande del portafolio TMD: 48 Toneladas',
          'Motor Cummins QSX15 de 15 litros con 375 HP de potencia neta',
          'Balde para roca abrasiva de 3.2 m³ con dientes ESCO Ultralok',
          'Bomba hidráulica gemela de 2 x 380 L/min con presión de 34.3 MPa'
        ],
        en: [
          'Largest excavator in the TMD fleet: 48 Metric Tons',
          '15-liter Cummins QSX15 engine delivering 375 HP net output',
          '3.2 m³ abrasive rock bucket equipped with ESCO Ultralok teeth',
          'Twin 2 x 380 L/min hydraulic pumps at 34.3 MPa operating pressure'
        ]
      },
      applications: {
        es: ['Minería a cielo abierto de ferroníquel y oro', 'Obras de infraestructura hidroeléctrica', 'Canteras masivas de roca dura'],
        en: ['Open-pit gold and ferronickel mining', 'Hydroelectric infrastructure projects', 'Massive hard rock quarry extraction']
      },
      options: [
        { id: 'lg950-afex',   label: { es: 'Sistema de Supresión de Incendio AFEX Integrado', en: 'AFEX Fire Suppression System Integrated' }, priceUSD: 14500 },
        { id: 'lg950-heavy-b', label: { es: 'Balde de Roca Extrema Reforzado con Hardox 450', en: 'Hardox 450 Extreme Rock Bucket' }, priceUSD: 12000 }
      ]
    }
  ];

  // ─── MOTONIVELADORAS (MOTOR GRADERS) ──────────────────────────────────────
  const MOTOR_GRADERS = [
    {
      id: 'LG-4180D',
      model: '4180D',
      series: 'D-Series Motor Grader',
      category: 'Motoniveladoras',
      subcategory: 'Motoniveladora 180 HP',
      engineModel: 'Cummins 6BTAA5.9 Tier 2/3',
      netPowerHp: 180,
      operatingWeightKg: 15500,
      bladeLengthMm: 3960,
      bladeHeightMm: 610,
      tandemDrive: '6x4',
      brochureCode: 'FT-LG-4180D-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-4180d-motor-grader-2026.pdf',
      priceUSD: 135000,
      priceDOP: dop(135000),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-4180d.jpg'],
      tags: ['motoniveladora', '180 hp', 'patrol', 'cuchilla', 'carreteras', 'rasante'],
      highlights: {
        es: [
          'Motor Cummins 6BTAA5.9 confiable de 180 HP',
          'Hoja vertedera de 3,960 mm (13 pies) con giro completo de 360°',
          'Transmisión ZF Powershift con convertidor de par de 6 velocidades',
          'Cabina panorámica con vista directa a las puntas de la cuchilla'
        ],
        en: [
          'Reliable 180 HP Cummins 6BTAA5.9 engine',
          '3,960 mm (13 ft) moldboard blade with full 360° circle rotation',
          'ZF Powershift transmission with torque converter 6F / 3R',
          'Panoramic cab with unobstructed sightlines to moldboard tips'
        ]
      },
      applications: {
        es: ['Apertura y mantenimiento de caminos vecinales', 'Nivelación de subbase y base para asfalto', 'Escarificación de suelos compactados'],
        en: ['Rural road opening and grading maintenance', 'Asphalt sub-base and base course leveling', 'Compacted ground scarification']
      },
      options: [
        { id: 'lg4180-ripper', label: { es: 'Escarificador Trasero (Ripper) de 5 Dientes', en: '5-Shank Rear Mounted Ripper' }, priceUSD: 6800 },
        { id: 'lg4180-front',  label: { es: 'Hoja Topadora Frontal (Front Dozer Blade)', en: 'Front Mounted Dozer Blade' }, priceUSD: 4200 },
        { id: 'lg4180-laser',  label: { es: 'Predisposición para Guiado Láser/3D Topcon', en: 'Topcon 3D/Laser Grade Control Ready' }, priceUSD: 3500 }
      ]
    },
    {
      id: 'LG-4215D',
      model: '4215D',
      series: 'D-Series Heavy Grader',
      category: 'Motoniveladoras',
      subcategory: 'Motoniveladora Pesada 215 HP',
      engineModel: 'Cummins 6CTAA8.3 Tier 3',
      netPowerHp: 215,
      operatingWeightKg: 16500,
      bladeLengthMm: 4270,
      bladeHeightMm: 650,
      tandemDrive: '6x4 con Bloqueo de Diferencial',
      brochureCode: 'FT-LG-4215D-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-4215d-motor-grader-2026.pdf',
      priceUSD: 158000,
      priceDOP: dop(158000),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/liugong-4215d.jpg'],
      tags: ['motoniveladora', '215 hp', 'pesada', 'cummins 8.3', 'autopistas'],
      highlights: {
        es: [
          'Motor Cummins 6CTAA8.3 de 8.3 litros y 215 HP',
          'Hoja vertedera de 4,270 mm (14 pies) para alta productividad',
          'Ejes en tándem para trabajo pesado con diferencial de bloqueo no-spin',
          'Sistema hidráulico con compensación de presión proporcional (PPPC)'
        ],
        en: [
          '8.3-liter Cummins 6CTAA8.3 engine delivering 215 HP',
          '4,270 mm (14 ft) heavy moldboard for high daily productivity',
          'Heavy-duty tandem drive axles with no-spin locking differential',
          'Proportional Priority Pressure Compensated (PPPC) hydraulic system'
        ]
      },
      applications: {
        es: ['Grandes autopistas y pistas de aterrizaje', 'Mantenimiento de pistas de acarreo minero', 'Conformación de taludes de terraplén'],
        en: ['Major highway corridors and airport runways', 'Haul road maintenance in mining facilities', 'Embankment slope finishing']
      },
      options: [
        { id: 'lg4215-ripper', label: { es: 'Ripper/Escarificador Combinado 3+5 Dientes', en: 'Combined 3-Ripper + 5-Scarifier Shank System' }, priceUSD: 7500 },
        { id: 'lg4215-gps',    label: { es: 'Control Automático de Nivelación Trimble 3D', en: 'Trimble 3D Automatic Grade Control' }, priceUSD: 8900 }
      ]
    }
  ];

  // ─── BULLDOZERS (TRACTORES DE ORUGA) ──────────────────────────────────────
  const BULLDOZERS = [
    {
      id: 'LG-B160CL',
      model: 'B160CL',
      series: 'B-Series Crawler Dozer',
      category: 'Bulldozers',
      subcategory: 'Bulldozer 160 HP',
      engineModel: 'Weichai WD10G / Cummins B6.7',
      netPowerHp: 160,
      operatingWeightKg: 17000,
      bladeType: 'Semi-U Tilt Blade',
      bladeCapacityM3: 4.5,
      groundPressureKpa: 67,
      brochureCode: 'FT-LG-B160CL-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-b160cl-bulldozer-2026.pdf',
      priceUSD: 142000,
      priceDOP: dop(142000),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/liugong-b160cl.jpg'],
      tags: ['bulldozer', 'tractor oruga', '160 hp', 'desmonte', 'empuje', 'topador'],
      highlights: {
        es: [
          'Potencia de empuje continua: 160 HP con convertidor de par',
          'Cuchilla Semi-U de 4.5 m³ con inclinación hidráulica de precisión',
          'Tren de rodaje de oruga lubricada sellada para larga vida útil',
          'Controles por palanca monomando ergonómica (joystick)'
        ],
        en: [
          'Continuous tractive push power: 160 HP with torque converter',
          '4.5 m³ Semi-U blade with precision hydraulic power tilt',
          'Sealed and lubricated track (SALT) undercarriage for long service life',
          'Single-lever ergonomic pilot joystick control'
        ]
      },
      applications: {
        es: ['Desmonte y desbroce de terrenos vírgenes', 'Corte y empuje masivo de materiales', 'Extensión de capas de terraplén'],
        en: ['Virgin land clearing and grubbing', 'Bulk earth cut and push operations', 'Embankment layer spreading']
      },
      options: [
        { id: 'lgb160-ripper', label: { es: 'Ripper Trasero de 3 Dientes Paralelogramo', en: '3-Shank Parallelogram Rear Ripper' }, priceUSD: 8500 },
        { id: 'lgb160-winch',  label: { es: 'Cabrestante de Recuperación Forestal 15 T', en: '15-Ton Forestry Recovery Winch' }, priceUSD: 9200 }
      ]
    },
    {
      id: 'LG-B230',
      model: 'B230',
      series: 'B-Series Heavy Dozer',
      category: 'Bulldozers',
      subcategory: 'Bulldozer 230 HP',
      engineModel: 'Cummins NT855-C280 / QSM11',
      netPowerHp: 230,
      operatingWeightKg: 24500,
      bladeType: 'Straight-Tilt Blade',
      bladeCapacityM3: 7.8,
      groundPressureKpa: 78,
      brochureCode: 'FT-LG-B230-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/liugong/liugong-b230-heavy-dozer-2026.pdf',
      priceUSD: 215000,
      priceDOP: dop(215000),
      featured: true,
      isNew: false,
      inStock: false,
      images: ['assets/images/liugong-b230.jpg'],
      tags: ['bulldozer', '230 hp', 'cummins nt855', 'empuje pesado', 'mineria', 'presa'],
      highlights: {
        es: [
          'Legendario motor Cummins NT855 de alta durabilidad y repuestos universales',
          'Cuchilla recta con inclinación de 7.8 m³ para empuje de roca',
          'Transmisión Powershift planetaria con 3 velocidades adelante / 3 reversa',
          'Cabina ROPS hexagonal insonorizada con climatizador dual de alto rendimiento'
        ],
        en: [
          'Legendary Cummins NT855 engine with universal parts availability',
          '7.8 m³ Straight-Tilt blade engineered for heavy rock pushing',
          'Planetary powershift transmission with 3F / 3R speed ranges',
          'Sound-suppressed hexagonal ROPS cab with dual high-output climate control'
        ]
      },
      applications: {
        es: ['Grandes presas, embalses y canales', 'Frentes de explotación en canteras', 'Apertura de vías en terrenos montañosos'],
        en: ['Large dams, reservoirs and canal works', 'Quarry working faces and overburden removal', 'Mountain road pioneer cut opening']
      },
      options: [
        { id: 'lgb230-ripper', label: { es: 'Ripper Monodiente Gigante para Roca Profunda', en: 'Giant Single-Shank Deep Rock Ripper' }, priceUSD: 12500 },
        { id: 'lgb230-u-blade', label: { es: 'Cuchilla Full-U de Alta Capacidad 8.5 m³', en: 'High-Capacity Full-U Blade 8.5 m³' }, priceUSD: 7200 }
      ]
    }
  ];

  // ─── ALL PRODUCTS COMBINED ────────────────────────────────────────────────
  const ALL_PRODUCTS = [
    ...WHEEL_LOADERS,
    ...MINI_EXCAVATORS,
    ...TRACK_EXCAVATORS,
    ...MOTOR_GRADERS,
    ...BULLDOZERS
  ];

  // ─── PUBLIC API ───────────────────────────────────────────────────────────
  return {
    brand: BRAND,
    version: '1.0.0',
    lastUpdated: '2026-09-20',
    totalProducts: ALL_PRODUCTS.length,
    exchangeRate: USD_TO_DOP,

    wheelLoaders: WHEEL_LOADERS,
    miniExcavators: MINI_EXCAVATORS,
    trackExcavators: TRACK_EXCAVATORS,
    motorGraders: MOTOR_GRADERS,
    bulldozers: BULLDOZERS,

    getAllProducts() { return ALL_PRODUCTS; },
    getByCategory(cat) { return ALL_PRODUCTS.filter(p => p.category === cat); },
    getFeatured() { return ALL_PRODUCTS.filter(p => p.featured); },
    getInStock() { return ALL_PRODUCTS.filter(p => p.inStock); },
    getNew() { return ALL_PRODUCTS.filter(p => p.isNew); },
    getById(id) { return ALL_PRODUCTS.find(p => p.id === id) || null; },
    getCategories() {
      return [...new Set(ALL_PRODUCTS.map(p => p.category))];
    },
    search(query) {
      const q = query.toLowerCase();
      return ALL_PRODUCTS.filter(p =>
        (p.model || '').toLowerCase().includes(q) ||
        (p.series || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.subcategory || '').toLowerCase().includes(q) ||
        (p.engineModel || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.includes(q))
      );
    },
    getPrice(id, currency = 'USD') {
      const p = this.getById(id);
      if (!p) return null;
      return currency === 'DOP' ? p.priceDOP : p.priceUSD;
    }
  };

})();

console.log('[TMD] LiuGong catalog loaded — ' + window.TMD_LIUGONG_CATALOG.totalProducts + ' máquinas de construcción pesada');
