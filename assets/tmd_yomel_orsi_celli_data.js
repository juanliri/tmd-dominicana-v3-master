/**
 * TMD DOMINICANA — YOMEL / ORSI / CELLI AGRICULTURAL IMPLEMENTS CATALOG v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Catalog Key: TMD_IMPLEMENTS_CATALOG
 * Sector: AGRICULTURE
 * Phase: 2 — Active
 * Last Updated: 2026-09-20
 *
 * Brands Represented:
 *   - Yomel S.A. (Argentina) — Empacadoras, Rastrillos, Fertilizadoras
 *   - Orsi Group (Italia)   — Brazos desbrozadores y trituradoras de poda
 *   - Celli S.p.A. (Italia)  — Rotocultivadores, fresadoras y gradas rotativas
 */

window.TMD_IMPLEMENTS_CATALOG = (function () {
  'use strict';

  const BRAND = {
    id: 'YOMEL',
    name: 'Yomel / Orsi / Celli',
    fullName: 'Implementos Agrícolas Premium (Yomel · Orsi · Celli)',
    color: '#16A34A',
    warrantyES: '1 año de garantía en componentes estructurales y cajas de engranajes',
    warrantyEN: '1 year warranty on structural components and gearboxes',
    origin: 'Argentina / Italia',
    founded: 1980,
    supportPhone: '+1 (809) 826-2222',
    whatsapp: '18098262222',
    certifications: ['ISO 9001:2015', 'CE Certified (Europa)', 'IRAM (Argentina)'],
    agentNote: 'Implementos 100% compatibles con enganche 3 puntos Cat I/II y toma de fuerza (TDP 540/1000 rpm) de tractores Kubota, LS Tractor y Yanmar.'
  };

  const USD_TO_DOP = 59.12;
  function dop(usd) { return Math.round(usd * USD_TO_DOP); }

  // ─── EMPACADORAS (BALERS) ─────────────────────────────────────────────────
  const BALERS = [
    {
      id: 'YML-MAGNA130',
      brand: 'Yomel',
      model: 'Magna 130',
      series: 'Rotopacadoras de Cámara Fija',
      category: 'Empacadoras',
      subcategory: 'Rotopacadora Cilíndrica',
      tractorPowerReqHp: '65–90 HP',
      baleDiameterM: '1.20 x 1.20 m',
      ptoRpm: 540,
      pickupWidthMm: 1800,
      tyingSystem: 'Doble hilo + Malla (Net Wrap)',
      brochureCode: 'FT-YML-MAGNA130-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-magna130-rotopacadora-2026.pdf',
      priceUSD: 29500,
      priceDOP: dop(29500),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-magna130.jpg'],
      tags: ['empacadora', 'rotopacadora', 'heno', 'forraje', 'yomel', 'pasto', 'rollos'],
      highlights: {
        es: [
          'Produce rollos compactos de 1.20 m x 1.20 m de alta densidad',
          'Recolector (Pick-Up) ancho de 1,800 mm con ruedas copiadoras de terreno',
          'Cámara fija de 16 rodillos de acero reforzado de alta durabilidad',
          'Atador automático hidráulico controlado desde la cabina del tractor'
        ],
        en: [
          'Produces compact 1.20 m x 1.20 m high-density cylindrical bales',
          'Wide 1,800 mm pick-up with terrain-following gauge wheels',
          'Fixed chamber with 16 heavy-duty steel forming rollers',
          'In-cab electric/hydraulic automatic tying controller'
        ]
      },
      applications: {
        es: ['Conservación de forraje para ganado bovino en La Altagracia y Monte Plata', 'Empacado de rastrojos de arroz y maíz', 'Henificación en fincas lecheras'],
        en: ['Cattle fodder conservation in Dominican dairy regions', 'Rice and corn stubble baling', 'Commercial hay production']
      },
      options: [
        { id: 'magna-net',  label: { es: 'Kit de Atado con Red (Net Wrap System)', en: 'Net Wrap Tying Attachment Kit' }, priceUSD: 2400 },
        { id: 'magna-eject',label: { es: 'Rampa Expulsora de Rollos Hidráulica', en: 'Hydraulic Bale Ejector Ramp' }, priceUSD: 1100 }
      ]
    },
    {
      id: 'YML-TIGRA125',
      brand: 'Yomel',
      model: 'Tigra 125',
      series: 'Rotopacadoras Compactas',
      category: 'Empacadoras',
      subcategory: 'Rotopacadora Ligera',
      tractorPowerReqHp: '50–70 HP',
      baleDiameterM: '1.20 x 1.25 m',
      ptoRpm: 540,
      pickupWidthMm: 1500,
      tyingSystem: 'Doble Hilo Eléctrico',
      brochureCode: 'FT-YML-TIGRA125-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-tigra125-baler-2026.pdf',
      priceUSD: 22800,
      priceDOP: dop(22800),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/yomel-tigra125.jpg'],
      tags: ['empacadora', 'tractores medianos', 'yomel', 'heno', 'compacta'],
      highlights: {
        es: [
          'Diseñada para tractores medianos desde 50 HP (Kubota L y LS Plus)',
          'Bajo requerimiento de potencia hidráulica y mecánica',
          'Rodillos estriados para fácil inicio del giro del material húmedo o seco',
          'Monitor de mando digital para conteo de fardos acumulados'
        ],
        en: [
          'Engineered for mid-size tractors starting at 50 HP',
          'Low hydraulic and mechanical power requirement',
          'Ribbed rollers for dependable bale starting in dry or wet grasses',
          'Digital electronic bale counter display included'
        ]
      },
      applications: {
        es: ['Pequeñas y medianas ganaderías', 'Empacado de heno Pangola y Bermuda', 'Alquiler de servicio de empacado'],
        en: ['Small to mid-size cattle ranches', 'Pangola and Bermuda grass haying', 'Custom contract baling services']
      },
      options: [
        { id: 'tigra-wide-wheels', label: { es: 'Neumáticos de Alta Flotación 31x15.5-15', en: 'High-Flotation Tires 31x15.5-15' }, priceUSD: 950 }
      ]
    },
    {
      id: 'YML-PACK50',
      brand: 'Yomel',
      model: 'Pack 50',
      series: 'Enfardadoras Prismáticas Convencionales',
      category: 'Empacadoras',
      subcategory: 'Fardos Rectangulares',
      tractorPowerReqHp: '45–65 HP',
      baleDimensionMm: '360 x 460 x (400–1300) mm',
      ptoRpm: 540,
      pickupWidthMm: 1650,
      tyingSystem: 'Atador Rasspe Alemán de 2 Hilos',
      brochureCode: 'FT-YML-PACK50-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-pack50-square-baler-2026.pdf',
      priceUSD: 18900,
      priceDOP: dop(18900),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-pack50.jpg'],
      tags: ['fardos', 'rectangulares', 'paca', 'rasspe', 'heno cuadrado', 'forraje'],
      highlights: {
        es: [
          'Fardos rectangulares de fácil estibado manual (18–28 kg por paca)',
          'Atador original Rasspe alemán de altísima fiabilidad sin atascos',
          'Largo de fardo regulable milimétricamente entre 40 y 130 cm',
          'Enganche de tiro con traba de transporte y posición de trabajo descentrada'
        ],
        en: [
          'Square bales for easy manual handling and stacking (18–28 kg)',
          'Genuine German Rasspe knotters for trouble-free tying',
          'Infinitely adjustable bale length from 40 to 130 cm',
          'Drawbar with transport lock and offset field working position'
        ]
      },
      applications: {
        es: ['Producción de pacas comerciales para venta a establos y caballos', 'Almacenamiento en galpones de espacio reducido', 'Alimentación ovina y equina'],
        en: ['Commercial hay bale production for equine stables', 'Space-efficient barn storage', 'Sheep and goat feed management']
      },
      options: [
        { id: 'pack50-chute', label: { es: 'Conducto Descargador Directo a Remolque', en: 'Direct Trailer Loading Bale Chute' }, priceUSD: 850 },
        { id: 'pack50-counter', label: { es: 'Contador Mecánico Preciso de Pacas', en: 'Precision Mechanical Bale Counter' }, priceUSD: 180 }
      ]
    }
  ];

  // ─── SEGADORAS Y DESBROZADORAS (MOWERS & SHREDDERS) ───────────────────────
  const MOWERS = [
    {
      id: 'YML-MOSCA200',
      brand: 'Yomel',
      model: 'Mosca 200',
      series: 'Desmalezadoras de Arrastre',
      category: 'Segadoras y Desbrozadoras',
      subcategory: 'Desmalezadora Rotativa 2.0 m',
      tractorPowerReqHp: '50–80 HP',
      cutWidthMm: 2000,
      cutHeightMm: '40–350 mm',
      ptoRpm: 540,
      bladesNumber: 2,
      gearboxRatingHp: 80,
      brochureCode: 'FT-YML-MOSCA200-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-mosca200-mower-2026.pdf',
      priceUSD: 5900,
      priceDOP: dop(5900),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-mosca200.jpg'],
      tags: ['desmalezadora', 'chapeadora', 'maleza', 'corte', 'pastizal', 'yomel'],
      highlights: {
        es: [
          'Ancho de labor: 2.00 m con tiro central o lateral regulable',
          'Caja multiplicadora de alta resistencia para 80 HP en baño de aceite',
          'Cuchillas oscilantes de acero tratado térmicamente anti-impacto',
          'Regulación de altura mediante cilindro hidráulico incorporado'
        ],
        en: [
          '2.00 m cutting width with adjustable center or offset tow',
          'Heavy-duty 80 HP oil-bath gearbox',
          'Heat-treated swinging blades with impact absorption',
          'Hydraulic cutting height adjustment cylinder included'
        ]
      },
      applications: {
        es: ['Mantenimiento y limpieza de potreros ganaderos', 'Control de malezas en cañaverales y frutales', 'Corte de pasturas para henificación'],
        en: ['Pasture maintenance and weed control', 'Fruit orchard and sugarcane undergrowth mowing', 'Rough grass cutting']
      },
      options: [
        { id: 'mosca-chains', label: { es: 'Cortina de Cadenas de Protección Anti-Piedras', en: 'Front and Rear Stone Protection Chains' }, priceUSD: 450 }
      ]
    },
    {
      id: 'ORSI-RIVER500',
      brand: 'Orsi',
      model: 'River 500',
      series: 'Brazos Desbrozadores Hidráulicos Profesionales',
      category: 'Segadoras y Desbrozadoras',
      subcategory: 'Brazo Articulado de Alcance 5.0 m',
      tractorPowerReqHp: '80–120 HP',
      horizontalReachMm: 5050,
      headWidthMm: 1200,
      ptoRpm: 540,
      hydraulicPumpLmin: 105,
      oilTankCapacityL: 180,
      brochureCode: 'FT-ORSI-RIVER500-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/orsi/orsi-river500-reach-mower-2026.pdf',
      priceUSD: 24500,
      priceDOP: dop(24500),
      featured: true,
      isNew: true,
      inStock: true,
      images: ['assets/images/orsi-river500.jpg'],
      tags: ['brazo desbrozador', 'orsi', 'cunetas', 'canales', 'carreteras', 'talud'],
      highlights: {
        es: [
          'Alcance horizontal: 5.05 metros para trabajo en taludes y canales',
          'Cabezal triturador de 1,200 mm con rotor helicoidal y cuchillas forjadas',
          'Circuito hidráulico independiente con radiador de enfriamiento forzado',
          'Comandos por joystick mono-palanca servoasistido proporcional'
        ],
        en: [
          'Horizontal reach of 5.05 m for steep ditch and bank clearing',
          '1,200 mm flail head with helical rotor and forged hammers',
          'Independent onboard hydraulic system with oil cooler fan',
          'Proportional low-effort pilot joystick remote control'
        ]
      },
      applications: {
        es: ['Limpieza de canales de riego en el Valle de San Juan y Barahona', 'Mantenimiento de bermas y cunetas en autopistas MOPC', 'Poda perimetral de fincas'],
        en: ['Irrigation canal de-weeding and vegetation management', 'Highway shoulder and embankment trimming', 'Orchard hedge pruning']
      },
      options: [
        { id: 'river-disc-saw', label: { es: 'Cabezal de Sierra Circular para Ramas de 10 cm', en: 'Multi-Disc Tree Pruning Saw Head (10 cm limbs)' }, priceUSD: 5200 },
        { id: 'river-skids',    label: { es: 'Patines Reforzados Anti-Desgaste', en: 'Heavy-Duty Replaceable Wear Skids' }, priceUSD: 480 }
      ]
    },
    {
      id: 'ORSI-ACROBATA',
      brand: 'Orsi',
      model: 'Acróbata 200',
      series: 'Trituradoras Desplazables Multipropósito',
      category: 'Segadoras y Desbrozadoras',
      subcategory: 'Trituradora de Restos de Poda 2.0 m',
      tractorPowerReqHp: '70–100 HP',
      cutWidthMm: 2000,
      lateralShiftMm: 1350,
      tiltAngles: '+90° a -65°',
      hammerCount: 20,
      brochureCode: 'FT-ORSI-ACROBATA-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/orsi/orsi-acrobata200-shredder-2026.pdf',
      priceUSD: 11200,
      priceDOP: dop(11200),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/orsi-acrobata200.jpg'],
      tags: ['trituradora', 'orsi', 'martillos', 'poda', 'citricos', 'aguacate', 'talud'],
      highlights: {
        es: [
          'Desplazamiento hidráulico lateral de 1,350 mm para trabajar fuera de la huella',
          'Articulación angular desde +90° (setos verticales) hasta -65° (cunetas)',
          'Rotor de 20 martillos forjados de 1.4 kg capaces de triturar ramas de 6 cm',
          'Chasis doble chapa Hardox con contra-cuchillas dentadas interiores'
        ],
        en: [
          '1,350 mm hydraulic offset capability to work outside tractor wheels',
          'Angular tilt articulation from +90° (vertical hedges) to -65° (ditches)',
          'Heavy rotor with 20 forged 1.4 kg flail hammers for 6 cm branches',
          'Double Hardox steel chassis with internal serrated counter-combs'
        ]
      },
      applications: {
        es: ['Trituración de sarmientos y poda en plantaciones de aguacate y mango', 'Mantenimiento de linderos y zanjas agrícolas', 'Picar rastrojos de caña'],
        en: ['Avocado and mango orchard pruning shredding', 'Agricultural ditch bank and border clearing', 'Sugarcane residue incorporation']
      },
      options: [
        { id: 'acrobata-roller', label: { es: 'Rodillo Trasero Autolimpiante Regulable', en: 'Adjustable Self-Cleaning Rear Roller' }, priceUSD: 650 }
      ]
    }
  ];

  // ─── RASTRILLOS ENHENADORES (HAY RAKES) ───────────────────────────────────
  const RAKES = [
    {
      id: 'YML-DANES8',
      brand: 'Yomel',
      model: 'Danés 8',
      series: 'Rastrillos Estelares de Giro Libre',
      category: 'Rastrillos Enhenadores',
      subcategory: 'Rastrillo Estelar de 8 Estrellas',
      tractorPowerReqHp: '40–60 HP',
      workingWidthMm: '4,500–5,500 mm',
      starWheels: 8,
      teethPerWheel: 40,
      brochureCode: 'FT-YML-DANES8-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-danes8-rake-2026.pdf',
      priceUSD: 4800,
      priceDOP: dop(4800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-danes8.jpg'],
      tags: ['rastrillo', 'estrellas', 'yomel', 'heno', 'hilerador', 'forraje'],
      highlights: {
        es: [
          'Ancho de trabajo ajustable de 4.50 a 5.50 m',
          '8 estrellas de 40 dientes de acero templado de 7 mm de diámetro',
          'Estructura tubular sobredimensionada con sistema de levante hidráulico',
          'Excelente flotación sin contaminar el forraje con piedras ni tierra'
        ],
        en: [
          'Adjustable working swath from 4.50 to 5.50 m',
          '8 star finger wheels with 40 heavy-duty 7 mm spring steel teeth',
          'Reinforced tubular chassis with hydraulic transport lifting',
          'Clean raking without soil or gravel contamination'
        ]
      },
      applications: {
        es: ['Hilerado rápido previo al empacado con Magna o Tigra', 'Volteo y aireación de pastos húmedos', 'Cosecha de heno a gran velocidad'],
        en: ['Windrowing prior to round or square baling', 'Aerating and flipping wet forage to speed drying', 'High-speed hay raking operations']
      },
      options: [
        { id: 'danes-mid-wheel', label: { es: 'Estrella Central Rompedora de Hileras', en: 'Center Row-Splitter Star Wheel Kit' }, priceUSD: 380 }
      ]
    },
    {
      id: 'YML-ANDINO12',
      brand: 'Yomel',
      model: 'Andino 12',
      series: 'Rastrillos en V de Gran Capacidad',
      category: 'Rastrillos Enhenadores',
      subcategory: 'Rastrillo en V de 12 Estrellas',
      tractorPowerReqHp: '60–90 HP',
      workingWidthMm: '6,800–7,800 mm',
      starWheels: 12,
      transportWidthMm: 2400,
      brochureCode: 'FT-YML-ANDINO12-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-andino12-v-rake-2026.pdf',
      priceUSD: 8400,
      priceDOP: dop(8400),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-andino12.jpg'],
      tags: ['rastrillo en v', '12 estrellas', 'gran formato', 'yomel', 'hilerado rapido'],
      highlights: {
        es: [
          'Ancho de trabajo masivo hasta 7.80 metros en formato en "V"',
          'Hilera central perfecta de ancho regulable para alimentación continua de empacadora',
          'Plegado hidráulico total a 2.40 m para transporte seguro por carreteras dominicanas',
          'Suspensión individual en cada rueda estelar con resortes de alivio de presión'
        ],
        en: [
          'Massive working width up to 7.80 meters in V-configuration',
          'Uniform center windrow with adjustable width for baler pickup',
          'Full hydraulic folding to 2.40 m for road transport compliance',
          'Individual floating suspension on each finger wheel with relief springs'
        ]
      },
      applications: {
        es: ['Grandes haciendas ganaderas y proyectos forrajeros de exportación', 'Unión de 2 o 3 pasadas de segadora en una sola hilera', 'Operaciones forrajeras intensivas'],
        en: ['Large-scale commercial hay operations and export projects', 'Merging multiple mower passes into a single windrow', 'Intensive forage harvesting']
      },
      options: [
        { id: 'andino-lighting', label: { es: 'Kit de Luces Reglamentarias LED para Carretera', en: 'Road Transport LED Highway Light Kit' }, priceUSD: 320 }
      ]
    }
  ];

  // ─── DISTRIBUIDORES DE FERTILIZANTES Y ENMIENDAS ──────────────────────────
  const SPREADERS = [
    {
      id: 'YML-SPIN500',
      brand: 'Yomel',
      model: 'Spin 500',
      series: 'Fertilizadoras Centrífugas Suspendidas',
      category: 'Distribuidores de Fertilizantes',
      subcategory: 'Abonadora Cónica 500 L',
      tractorPowerReqHp: '30–50 HP',
      hopperCapacityL: 500,
      hopperCapacityKg: 600,
      spreadWidthM: '8–16 m',
      discType: 'Monodisco en Acero Inoxidable',
      ptoRpm: 540,
      brochureCode: 'FT-YML-SPIN500-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-spin500-spreader-2026.pdf',
      priceUSD: 1650,
      priceDOP: dop(1650),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-spin500.jpg'],
      tags: ['abonadora', 'fertilizante', 'spin', 'yomel', 'sembradora', 'urea'],
      highlights: {
        es: [
          'Tolva de polietileno rotomoldeado de alta resistencia anti-corrosión',
          'Plato esparcidor y paletas en acero inoxidable AISI 304',
          'Apertura dosificadora con doble palanca (corte total y calibración)',
          'Apto para fertilizantes granulados, semillas de pasto y sal'
        ],
        en: [
          'Seamless rotationally molded polyethylene hopper, zero corrosion',
          'Stainless steel AISI 304 spinner disc and spreading vanes',
          'Dual lever flow gate control (on/off and fine rate calibration)',
          'Suitable for granular fertilizers, grass seeds, and salt'
        ]
      },
      applications: {
        es: ['Aplicación de urea y fórmulas NPK en arroz, caña y plátano', 'Siembra al voleo de pastos Brachiaria y Guinea', 'Frutales y cultivos bajo sombra'],
        en: ['NPK and urea broadcast application in rice, cane and plantains', 'Broadcast pasture seeding (Brachiaria, Guinea)', 'Orchard floor nutrition']
      },
      options: [
        { id: 'spin-agitator', label: { es: 'Agitador Interno para Polvos / Fertilizantes Húmedos', en: 'Internal Agitator Kit for Powders/Moist Fertilizer' }, priceUSD: 140 }
      ]
    },
    {
      id: 'YML-IMPALA1500',
      brand: 'Yomel',
      model: 'Impala 1500 Truck',
      series: 'Distribuidores de Precisión Doble Disco',
      category: 'Distribuidores de Fertilizantes',
      subcategory: 'Fertilizadora de Arrastre 1,500 L',
      tractorPowerReqHp: '60–80 HP',
      hopperCapacityL: 1500,
      hopperCapacityKg: 1800,
      spreadWidthM: '18–32 m',
      discType: 'Doble Disco de Acero Inoxidable',
      ptoRpm: 540,
      brochureCode: 'FT-YML-IMPALA1500-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-impala1500-spreader-2026.pdf',
      priceUSD: 9800,
      priceDOP: dop(9800),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/yomel-impala1500.jpg'],
      tags: ['fertilizadora', 'doble disco', 'yomel', 'impala', 'arrastre', 'precision'],
      highlights: {
        es: [
          'Doble plato esparcidor con alcance simétrico de hasta 32 metros',
          'Chasis de arrastre con eje tándem o rodado simple de alta flotación',
          'Tolva y componentes de dosificación íntegramente en acero inoxidable',
          'Apertura hidráulica independiente izquierda/derecha para cabeceras'
        ],
        en: [
          'Twin stainless steel spreading discs with symmetric swath up to 32 m',
          'Trailing chassis with high-flotation turf tires',
          'Hopper bottom and metering components fully stainless steel',
          'Independent left/right hydraulic shutoff for headland spreading'
        ]
      },
      applications: {
        es: ['Grandes extensiones arroceras en el Cibao Oriental', 'Campos cañeros del Este dominicano', 'Fertilización de precisión en bananeras'],
        en: ['Commercial rice fields in Cibao valley', 'Sugarcane plantations in Eastern Dominican Republic', 'Precision banana plantation nutrition']
      },
      options: [
        { id: 'impala-tarp', label: { es: 'Lona Enrollable Protectora contra Lluvia', en: 'Roll-Over Weatherproof Hopper Canvas' }, priceUSD: 480 },
        { id: 'impala-scale', label: { es: 'Kit de Pesaje Electrónico Celda de Carga', en: 'Onboard Electronic Load-Cell Weighing Kit' }, priceUSD: 2400 }
      ]
    },
    {
      id: 'YML-CAL5000',
      brand: 'Yomel',
      model: 'Fertical 5000',
      series: 'Distribuidores Pesados de Cal y Abonos Orgánicos',
      category: 'Distribuidores de Fertilizantes',
      subcategory: 'Esparcidor Pesado de Enmiendas 5,000 kg',
      tractorPowerReqHp: '90–130 HP',
      hopperCapacityL: 4200,
      hopperCapacityKg: 5000,
      spreadWidthM: '8–14 m (Cal) / 16–24 m (Granulado)',
      conveyorType: 'Cinta Transportadora de Goma Reforzada 800 mm',
      ptoRpm: 540,
      brochureCode: 'FT-YML-CAL5000-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/yomel/yomel-fertical5000-lime-spreader-2026.pdf',
      priceUSD: 21500,
      priceDOP: dop(21500),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/yomel-cal5000.jpg'],
      tags: ['cal', 'enmiendas', 'abono organico', 'fertical', 'yeso', 'suelos acidos'],
      highlights: {
        es: [
          'Diseñado especialmente para enmiendas pesadas: Cal agrícola, yeso y compost',
          'Cinta transportadora de fondo continuo accionada mecánicamente a la rueda',
          'Discos dobles de gran diámetro con aletas reforzadas anti-abrasión',
          'Capacidad de carga: 5,000 kg con eje tándem balancín de alta carga'
        ],
        en: [
          'Engineered for heavy soil conditioners: Agricultural lime, gypsum & compost',
          'Continuous floor belt conveyor mechanically ground-driven for proportional rate',
          'Large diameter heavy-duty spinning discs with wear-resistant flighting',
          '5,000 kg carrying capacity with walking-beam tandem axle'
        ]
      },
      applications: {
        es: ['Corrección de acidez en suelos de ladera y valles agrícolas dominicanos', 'Aplicación masiva de carbonato de calcio y dolomita', 'Esparcido de gallinaza y cachaza'],
        en: ['Acidity correction in tropical acid soils across DR valleys', 'Massive agricultural lime and dolomite spreading', 'Chicken manure and mill mud distribution']
      },
      options: [
        { id: 'fertical-brakes', label: { es: 'Frenos Hidráulicos en Eje Tándem', en: 'Hydraulic Brakes on Tandem Axle' }, priceUSD: 1450 }
      ]
    }
  ];

  // ─── ROTOCULTIVADORES Y FRESADORAS (ROTARY TILLERS & CULTIVATORS - CELLI) ─
  const TILLERS = [
    {
      id: 'CELLI-TIGER280',
      brand: 'Celli',
      model: 'Tiger 280',
      series: 'Rotocultivadores Profesionales de Trabajo Pesado',
      category: 'Rotocultivadores y Fresadoras',
      subcategory: 'Rotocultivador Pesado 2.80 m',
      tractorPowerReqHp: '90–140 HP',
      workingWidthMm: 2800,
      maxWorkDepthMm: 250,
      bladeCount: 66,
      ptoRpm: '540 / 1000 con Cambio de 4 Velocidades',
      sideTransmission: 'Transmisión Lateral de Engranajes en Cascada',
      brochureCode: 'FT-CELLI-TIGER280-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/celli/celli-tiger280-rotary-tiller-2026.pdf',
      priceUSD: 14800,
      priceDOP: dop(14800),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/celli-tiger280.jpg'],
      tags: ['rotocultivador', 'celli', 'fresadora', 'italia', 'preparacion suelo', 'cama siembra'],
      highlights: {
        es: [
          'Ingeniería italiana Celli de referencia mundial en preparación de suelos',
          'Ancho de labor: 2.80 m con 66 cuchillas helicoidales de alta penetración',
          'Transmisión lateral por engranajes cilíndricos (cero cadenas ni roturas)',
          'Caja central de 4 velocidades para ajustar la finura de suelo deseada'
        ],
        en: [
          'World-renowned Italian Celli engineering in seedbed soil preparation',
          '2.80 m working width with 66 curved high-penetration blades',
          'Heavy-duty side gear drive (no chains, zero stretch or failure)',
          '4-speed multi-speed gearbox to tailor soil particle granulation'
        ]
      },
      applications: {
        es: ['Preparación de suelos para siembra de hortalizas en Constanza y Jarabacoa', 'Desterronado y aflojado profundo para tabaco y melón', 'Incorporación de rastrojos'],
        en: ['Vegetable seedbed preparation in Constanza valley highlands', 'Deep clod-busting and aeration for tobacco and melon', 'Crop residue soil mixing']
      },
      options: [
        { id: 'tiger-packer', label: { es: 'Rodillo Packer Trasero Dentado 2.80 m', en: 'Rear Toothed Packer Roller 2.80 m' }, priceUSD: 2400 },
        { id: 'tiger-cage',   label: { es: 'Rodillo Jaula Desterronador Regulable', en: 'Adjustable Crumbing Cage Roller' }, priceUSD: 1800 }
      ]
    },
    {
      id: 'CELLI-PIONEER170',
      brand: 'Celli',
      model: 'Pioneer 170',
      series: 'Fresadoras con Desplazamiento Lateral',
      category: 'Rotocultivadores y Fresadoras',
      subcategory: 'Fresadora Compacta 1.70 m',
      tractorPowerReqHp: '45–70 HP',
      workingWidthMm: 1700,
      maxWorkDepthMm: 200,
      bladeCount: 40,
      sideShiftMm: 450,
      ptoRpm: 540,
      brochureCode: 'FT-CELLI-PIONEER170-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/celli/celli-pioneer170-tiller-2026.pdf',
      priceUSD: 7200,
      priceDOP: dop(7200),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/celli-pioneer170.jpg'],
      tags: ['fresadora', 'celli', 'frutales', 'desplazable', 'invernaderos', 'compacta'],
      highlights: {
        es: [
          'Desplazamiento lateral manual o hidráulico de 450 mm bajo árboles',
          'Ancho de trabajo de 1.70 m ideal para tractores de trocha angosta',
          'Sello hermético patentado Celli en rotor apto para fangueo en arrozales',
          'Patines laterales regulables en 4 posiciones para profundidad uniforme'
        ],
        en: [
          'Manual or hydraulic 450 mm side offset to till underneath tree canopies',
          '1.70 m working width matched to compact/narrow orchard tractors',
          'Patented waterproof rotor face seals approved for wet rice paddies',
          '4-position adjustable side skids for precise depth control'
        ]
      },
      applications: {
        es: ['Labranza entre líneas en plantaciones de cítricos y aguacate', 'Invernaderos y cultivos protegidos en Ocoa', 'Fangueo y preparación de pozas de arroz'],
        en: ['Inter-row cultivation in citrus and mango groves', 'Greenhouse and vegetable bed preparation in Ocoa', 'Rice field wet puddling and churning']
      },
      options: [
        { id: 'pioneer-hyd-shift', label: { es: 'Cilindro de Desplazamiento Lateral Hidráulico', en: 'Hydraulic Side-Shift Control Ram Kit' }, priceUSD: 750 }
      ]
    },
    {
      id: 'CELLI-ENERGY300',
      brand: 'Celli',
      model: 'Energy 300',
      series: 'Gradas Rotativas de Eje Vertical',
      category: 'Rotocultivadores y Fresadoras',
      subcategory: 'Grada Rotativa 3.0 m',
      tractorPowerReqHp: '100–170 HP',
      workingWidthMm: 3000,
      rotorCount: 12,
      tineLengthMm: 300,
      ptoRpm: 1000,
      gearboxType: 'Monovelocidad con Embrague de Seguridad Integrado',
      brochureCode: 'FT-CELLI-ENERGY300-2026-DO',
      brochureURL: null,
      supabaseBrochureKey: 'brochures/celli/celli-energy300-power-harrow-2026.pdf',
      priceUSD: 19800,
      priceDOP: dop(19800),
      featured: true,
      isNew: false,
      inStock: false,
      images: ['assets/images/celli-energy300.jpg'],
      tags: ['grada rotativa', 'celli', 'energy 300', 'eje vertical', 'cama siembra fina'],
      highlights: {
        es: [
          '12 rotores de púas verticales de 300 mm que no invierten el perfil del suelo',
          'Conserva la humedad y no genera pie de arado (suela de labor)',
          'Barra niveladora trasera con regulación por manivela incluida',
          'Incluye rodillo Packer de 500 mm para compactación y sellado de siembra'
        ],
        en: [
          '12 vertical tine rotors (300 mm) preserving natural soil horizons',
          'Eliminates hardpan and preserves moisture in tropical soils',
          'Rear leveling bar with screw crank height adjustment included',
          'Includes 500 mm heavy packer roller for reconsolidation'
        ]
      },
      applications: {
        es: ['Cama de siembra perfecta en una sola pasada para maíz, soya y hortalizas', 'Labranza de conservación en suelos pedregosos', 'Nivelación fina superficial'],
        en: ['Single-pass perfect seedbed for corn, soy and horticultural crops', 'Conservation tillage in rocky Caribbean soils', 'Fine topsoil leveling and consolidation']
      },
      options: [
        { id: 'energy-seeder-bar', label: { es: 'Enganche Trasero Tripuntal para Sembradora', en: 'Hydraulic Rear 3-Point Hitch for Direct Seeder Coupling' }, priceUSD: 2600 }
      ]
    }
  ];

  // ─── ALL PRODUCTS COMBINED ────────────────────────────────────────────────
  const ALL_PRODUCTS = [
    ...BALERS,
    ...MOWERS,
    ...RAKES,
    ...SPREADERS,
    ...TILLERS
  ];

  // ─── PUBLIC API ───────────────────────────────────────────────────────────
  return {
    brand: BRAND,
    version: '1.0.0',
    lastUpdated: '2026-09-20',
    totalProducts: ALL_PRODUCTS.length,
    exchangeRate: USD_TO_DOP,

    balers: BALERS,
    mowers: MOWERS,
    rakes: RAKES,
    spreaders: SPREADERS,
    tillers: TILLERS,

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
        (p.brand || '').toLowerCase().includes(q) ||
        (p.series || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.subcategory || '').toLowerCase().includes(q) ||
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

console.log('[TMD] Yomel / Orsi / Celli implements catalog loaded — ' + window.TMD_IMPLEMENTS_CATALOG.totalProducts + ' implementos agrícolas');
