/**
 * TMD DOMINICANA — IMER GROUP CONCRETE CATALOG v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Catalog Key: TMD_IMER_CATALOG
 * Sector: CONCRETE
 * Phase: 2 — Active
 * Last Updated: 2026-09-20
 *
 * Products:
 *   IMR-PLANT  — Mobile Concrete Batching Plants (4 models)
 *   IMR-MIX    — Pan & Drum Mixers (8 models)
 *   IMR-MORTAR — Mortar / Plaster Mixers (4 models)
 *   IMR-PUMP   — Concrete Pumps (3 models)
 *   IMR-VIB    — Concrete Vibrators (3 models)
 */

window.TMD_IMER_CATALOG = (function () {
  'use strict';

  const BRAND = {
    id: 'IMER',
    name: 'IMER Group',
    color: '#1E40AF',
    warrantyES: '1 año / 1,000 horas',
    warrantyEN: '1 year / 1,000 hours',
    origin: 'Italia',
    founded: 1962,
    supportPhone: '+1 (809) 826-2222',
    whatsapp: '18098262222'
  };

  const USD_TO_DOP = 59.12;
  function dop(usd) { return Math.round(usd * USD_TO_DOP); }

  // ─── MOBILE CONCRETE BATCHING PLANTS ──────────────────────────────────────
  const PLANTS = [
    {
      id: 'IMR-MCBP30',
      model: 'MCBP 30',
      series: 'Planta Móvil de Concreto',
      category: 'Plantas de Concreto',
      subcategory: 'Planta Móvil',
      outputM3h: 30,
      mixerCapacityL: 500,
      siloCapacityT: 25,
      aggregateBins: 2,
      engineBrand: 'IMER',
      controlSystem: 'PLC IMER Automat',
      transportWidth: '2,500 mm',
      setupTimeH: 4,
      brochureCode: 'FT-IMER-MCBP30-2026-DO',
      priceUSD: 148000,
      priceDOP: dop(148000),
      featured: false,
      isNew: false,
      inStock: false,
      images: ['assets/images/imer-mcbp30.jpg'],
      tags: ['concreto', 'planta', 'movil', 'produccion', 'batch'],
      highlights: {
        es: ['Producción: 30 m³/h', 'Silo de cemento 25 T transportable', 'Control PLC italiano IMER Automat', 'Montaje y desmontaje en 4 horas'],
        en: ['Output: 30 m³/h', 'Transportable 25T cement silo', 'Italian IMER Automat PLC control', '4-hour setup and takedown']
      },
      applications: { es: ['Obras medianas', 'Carreteras en zonas remotas', 'Proyectos de 3–6 meses'], en: ['Medium projects', 'Remote road construction', '3–6 month projects'] },
      options: [
        { id: 'mcbp30-silo2', label: { es: 'Segundo Silo de 25T',            en: 'Second 25T Silo' },              priceUSD: 22000 },
        { id: 'mcbp30-gen',   label: { es: 'Generador 200 kVA Diésel',       en: '200 kVA Diesel Generator' },      priceUSD: 35000 },
        { id: 'mcbp30-4bin',  label: { es: 'Expansión a 4 tolvas áridos',     en: '4-Bin Aggregate Expansion' },     priceUSD: 18000 },
        { id: 'mcbp30-adit',  label: { es: 'Sistema Dosificador de Aditivos', en: 'Chemical Admixture Dosing System' }, priceUSD: 8500 }
      ]
    },
    {
      id: 'IMR-MCBP60',
      model: 'MCBP 60',
      series: 'Planta Móvil de Concreto',
      category: 'Plantas de Concreto',
      subcategory: 'Planta Móvil',
      outputM3h: 60,
      mixerCapacityL: 1000,
      siloCapacityT: 50,
      aggregateBins: 4,
      engineBrand: 'IMER',
      controlSystem: 'PLC IMER Automat Plus',
      transportWidth: '2,550 mm',
      setupTimeH: 8,
      brochureCode: 'FT-IMER-MCBP60-2026-DO',
      priceUSD: 265000,
      priceDOP: dop(265000),
      featured: true,
      isNew: false,
      inStock: false,
      images: ['assets/images/imer-mcbp60.jpg'],
      tags: ['concreto', 'planta', 'movil', 'produccion', 'gran escala'],
      highlights: {
        es: ['Producción de 60 m³/h continua', 'Doble silo de cemento 2×25T', 'Mezclador de eje twin-shaft 1,000L', 'Dosificación gravimétrica en tiempo real'],
        en: ['Continuous 60 m³/h output', 'Dual 2×25T cement silos', 'Twin-shaft 1,000L mixer', 'Real-time gravimetric dosing']
      },
      applications: { es: ['Grandes obras civiles', 'Puentes', 'Presas de concreto', 'Infraestructura vial'], en: ['Large civil works', 'Bridges', 'Concrete dams', 'Road infrastructure'] },
      options: [
        { id: 'mcbp60-gen',   label: { es: 'Generador 400 kVA',              en: '400 kVA Generator' },             priceUSD: 58000 },
        { id: 'mcbp60-ice',   label: { es: 'Sistema de Hielo/Agua Fría',     en: 'Ice/Chilled Water System' },      priceUSD: 24000 },
        { id: 'mcbp60-fibra', label: { es: 'Dosificador de Fibra Estructural', en: 'Structural Fiber Dosing Unit' }, priceUSD: 12000 }
      ]
    },
    {
      id: 'IMR-SPRINT350',
      model: 'Sprint 350',
      series: 'Planta Compacta',
      category: 'Plantas de Concreto',
      subcategory: 'Planta Compacta',
      outputM3h: 20,
      mixerCapacityL: 350,
      siloCapacityT: 15,
      aggregateBins: 2,
      engineBrand: 'Eléctrico 15 kW',
      controlSystem: 'Panel digital IMER',
      transportWidth: '2,000 mm',
      setupTimeH: 2,
      brochureCode: 'FT-IMER-SPRINT350-2026-DO',
      priceUSD: 68000,
      priceDOP: dop(68000),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/imer-sprint350.jpg'],
      tags: ['concreto', 'planta', 'compacta', 'electrica', 'prefab'],
      highlights: {
        es: ['Planta eléctrica sin emisiones en sitio', 'Setup en solo 2 horas', 'Producción 20 m³/h', 'Ideal para plantas de prefabricado'],
        en: ['Electric plant — zero on-site emissions', 'Setup in just 2 hours', '20 m³/h output', 'Ideal for precast yards']
      },
      applications: { es: ['Plantas prefabricado', 'Concreto residencial', 'Proyectos urbanos pequeños'], en: ['Precast plants', 'Residential concrete', 'Small urban projects'] },
      options: [
        { id: 'sprint-silo2', label: { es: 'Segundo Silo 15T',      en: 'Second 15T Silo' },      priceUSD: 14500 },
        { id: 'sprint-adit',  label: { es: 'Dosificador Aditivos',   en: 'Admixture Dosing' },     priceUSD: 4200  }
      ]
    }
  ];

  // ─── PAN & DRUM MIXERS ─────────────────────────────────────────────────────
  const MIXERS = [
    {
      id: 'IMR-BM750',
      model: 'BM 750',
      series: 'Batidora Eléctrica',
      category: 'Mezcladoras',
      subcategory: 'Mezcladora de Tazón',
      capacityL: 750,
      outputM3h: 8,
      motorKW: 5.5,
      drumSpeedRPM: 28,
      wheelbarrowTip: true,
      brochureCode: 'FT-IMER-BM750-2026-DO',
      priceUSD: 3800,
      priceDOP: dop(3800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-bm750.jpg'],
      tags: ['mezcladora', 'concreto', 'electrica', 'tazón', 'obra pequeña'],
      highlights: {
        es: ['Capacidad 750 L (500 L neto)', 'Descarga directa a carretilla', 'Motor eléctrico monofásico 220V', 'Tambor de fundición resistente'],
        en: ['750L capacity (500L net)', 'Direct discharge to wheelbarrow', 'Single-phase 220V electric motor', 'Durable cast iron drum']
      },
      applications: { es: ['Obras pequeñas', 'Fundaciones', 'Columnas', 'Mampostería'], en: ['Small works', 'Foundations', 'Columns', 'Masonry'] },
      options: [
        { id: 'bm750-motor220', label: { es: 'Motor 380V Trifásico', en: '380V Three-Phase Motor' }, priceUSD: 420 }
      ]
    },
    {
      id: 'IMR-MC1200',
      model: 'MC 1200',
      series: 'Mezcladora de Carga',
      category: 'Mezcladoras',
      subcategory: 'Mezcladora Reversible',
      capacityL: 1200,
      outputM3h: 12,
      motorKW: 11,
      drumSpeedRPM: 14,
      wheelbarrowTip: false,
      brochureCode: 'FT-IMER-MC1200-2026-DO',
      priceUSD: 8800,
      priceDOP: dop(8800),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-mc1200.jpg'],
      tags: ['mezcladora', 'concreto', 'reversible', 'grande', 'obra mediana'],
      highlights: {
        es: ['La más usada en construcción dominicana', 'Tambor reversible 1,200 L neto', 'Motor trifásico 11 kW', 'Descarga lateral o frontal'],
        en: ['Most-used mixer in Dominican construction', 'Reversible 1,200L net drum', '11 kW three-phase motor', 'Side or front discharge']
      },
      applications: { es: ['Obras medianas', 'Columnas', 'Losas', 'Vigas de concreto'], en: ['Medium works', 'Columns', 'Slabs', 'Concrete beams'] },
      options: [
        { id: 'mc1200-skip', label: { es: 'Skip de Carga Automático', en: 'Automatic Loading Skip' }, priceUSD: 2800 },
        { id: 'mc1200-gen',  label: { es: 'Adaptador para Generador',  en: 'Generator Adapter Kit' }, priceUSD: 680  }
      ]
    },
    {
      id: 'IMR-MC2000',
      model: 'MC 2000',
      series: 'Mezcladora Industrial',
      category: 'Mezcladoras',
      subcategory: 'Mezcladora Reversible',
      capacityL: 2000,
      outputM3h: 20,
      motorKW: 18.5,
      drumSpeedRPM: 12,
      wheelbarrowTip: false,
      brochureCode: 'FT-IMER-MC2000-2026-DO',
      priceUSD: 14500,
      priceDOP: dop(14500),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-mc2000.jpg'],
      tags: ['mezcladora', 'concreto', 'industrial', 'gran volumen', 'produccion'],
      highlights: {
        es: ['2,000 L de capacidad total', 'Para obras de alta producción', 'Cuerpo de acero reforzado AR200', 'Skip de carga estándar'],
        en: ['2,000L total capacity', 'For high-output projects', 'AR200 reinforced steel body', 'Standard loading skip']
      },
      applications: { es: ['Grandes obras civiles', 'Producción continua', 'Prefabricados de concreto'], en: ['Major civil works', 'Continuous production', 'Concrete precast'] },
      options: [
        { id: 'mc2000-auto', label: { es: 'Dosificación Automática de Agua',  en: 'Automatic Water Dosing' },   priceUSD: 3500 },
        { id: 'mc2000-diag', label: { es: 'Panel de Diagnóstico Digital',     en: 'Digital Diagnostic Panel' },  priceUSD: 1800 }
      ]
    }
  ];

  // ─── MORTAR / PLASTER MIXERS ───────────────────────────────────────────────
  const MORTAR_MIXERS = [
    {
      id: 'IMR-MONO200',
      model: 'MONO 200',
      series: 'Mezcladora de Mortero',
      category: 'Mezcladoras de Mortero',
      subcategory: 'Continua',
      capacityL: 200,
      motorKW: 3,
      brochureCode: 'FT-IMER-MONO200-2026-DO',
      priceUSD: 2400,
      priceDOP: dop(2400),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-mono200.jpg'],
      tags: ['mortero', 'enlucido', 'repello', 'mamposteria'],
      highlights: {
        es: ['Mezcladora continua para mortero', 'Ideal para repello y mampostería', 'Motor eléctrico 220V monofásico', 'Peso ligero — 95 kg'],
        en: ['Continuous mortar mixer', 'Ideal for plaster and masonry', '220V single-phase electric motor', 'Light weight — 95 kg']
      },
      applications: { es: ['Repello', 'Mampostería', 'Nivelación de pisos', 'Bloques'], en: ['Plastering', 'Masonry', 'Floor leveling', 'Block laying'] },
      options: []
    },
    {
      id: 'IMR-MONO500',
      model: 'MONO 500',
      series: 'Mezcladora de Mortero',
      category: 'Mezcladoras de Mortero',
      subcategory: 'Continua',
      capacityL: 500,
      motorKW: 7.5,
      brochureCode: 'FT-IMER-MONO500-2026-DO',
      priceUSD: 4800,
      priceDOP: dop(4800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-mono500.jpg'],
      tags: ['mortero', 'enlucido', 'continua', 'produccion'],
      highlights: {
        es: ['Producción continua de 500 L', 'Motor trifásico de alta durabilidad', 'Tornillo sinfín IMER', 'Ideal para repello mecanizado'],
        en: ['Continuous 500L production', 'High-durability three-phase motor', 'IMER worm screw', 'Ideal for mechanized plastering']
      },
      applications: { es: ['Repello mecanizado', 'Obras de gran mampostería', 'Plantas de prefabricado pequeño'], en: ['Mechanized plastering', 'Large masonry works', 'Small precast plants'] },
      options: [
        { id: 'mono500-pump', label: { es: 'Bomba de Mortero IMER', en: 'IMER Mortar Pump' }, priceUSD: 3800 }
      ]
    }
  ];

  // ─── CONCRETE PUMPS ────────────────────────────────────────────────────────
  const PUMPS = [
    {
      id: 'IMR-PUMP25',
      model: 'PUMP 25 C',
      series: 'Bomba de Concreto',
      category: 'Bombas de Concreto',
      subcategory: 'Bomba Estacionaria',
      outputM3h: 25,
      maxPressureBar: 75,
      maxHorizontalM: 200,
      maxVerticalM: 60,
      engineBrand: 'Eléctrico 22 kW',
      brochureCode: 'FT-IMER-PUMP25-2026-DO',
      priceUSD: 38500,
      priceDOP: dop(38500),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-pump25.jpg'],
      tags: ['bomba', 'concreto', 'bombeo', 'losa', 'altura'],
      highlights: {
        es: ['25 m³/h de rendimiento máximo', 'Alcance vertical hasta 60 m', 'Motor eléctrico silencioso', 'Sistema hidráulico de doble pistón'],
        en: ['25 m³/h maximum output', 'Vertical reach up to 60 m', 'Silent electric motor', 'Dual-piston hydraulic system']
      },
      applications: { es: ['Losas en altura', 'Columnas altas', 'Fundaciones difíciles', 'Túneles'], en: ['High-level slabs', 'Tall columns', 'Difficult foundations', 'Tunnels'] },
      options: [
        { id: 'pump25-hose', label: { es: 'Set Mangueras 50m adicionales', en: '50m Additional Hose Set' }, priceUSD: 2800 }
      ]
    },
    {
      id: 'IMR-PUMP50',
      model: 'PUMP 50 D',
      series: 'Bomba de Concreto',
      category: 'Bombas de Concreto',
      subcategory: 'Bomba Diésel Autopropulsada',
      outputM3h: 50,
      maxPressureBar: 110,
      maxHorizontalM: 500,
      maxVerticalM: 120,
      engineBrand: 'Cummins',
      engineHP: 85,
      brochureCode: 'FT-IMER-PUMP50-2026-DO',
      priceUSD: 78000,
      priceDOP: dop(78000),
      featured: true,
      isNew: true,
      inStock: false,
      images: ['assets/images/imer-pump50.jpg'],
      tags: ['bomba', 'concreto', 'diesel', 'gran alcance', 'alta presion'],
      highlights: {
        es: ['50 m³/h de alta productividad', 'Alcance vertical 120 m', 'Diésel Cummins Tier 4', 'Autopropulsada sobre remolque'],
        en: ['High-output 50 m³/h', 'Vertical reach 120 m', 'Cummins Tier 4 diesel', 'Self-propelled on trailer']
      },
      applications: { es: ['Grandes edificios', 'Plantas de generación', 'Presas', 'Puentes complejos'], en: ['Large buildings', 'Power plants', 'Dams', 'Complex bridges'] },
      options: [
        { id: 'pump50-boom', label: { es: 'Pluma Distribuidora 24m', en: '24m Distribution Boom' }, priceUSD: 45000 }
      ]
    }
  ];

  // ─── CONCRETE VIBRATORS ────────────────────────────────────────────────────
  const VIBRATORS = [
    {
      id: 'IMR-VIB38',
      model: 'VIB 38',
      series: 'Vibrador de Concreto',
      category: 'Vibradores',
      subcategory: 'Vibrador de Inmersión',
      headDiameterMM: 38,
      frequencyVPM: 12000,
      motorKW: 2.2,
      hoseM: 6,
      brochureCode: 'FT-IMER-VIB38-2026-DO',
      priceUSD: 980,
      priceDOP: dop(980),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-vib38.jpg'],
      tags: ['vibrador', 'concreto', 'inmersion', 'columnas', 'muros'],
      highlights: {
        es: ['Cabezal 38 mm para columnas y muros angostos', '12,000 VPM de alta frecuencia', 'Motor 220V monofásico', 'Manguera flexible 6 m'],
        en: ['38mm head for narrow columns and walls', '12,000 VPM high frequency', '220V single-phase motor', '6m flexible hose']
      },
      applications: { es: ['Columnas', 'Muros delgados', 'Pilotes', 'Escaleras'], en: ['Columns', 'Thin walls', 'Piles', 'Stairs'] },
      options: [
        { id: 'vib38-ext', label: { es: 'Extensión de Manguera 3m', en: '3m Hose Extension' }, priceUSD: 180 }
      ]
    },
    {
      id: 'IMR-VIB65',
      model: 'VIB 65',
      series: 'Vibrador de Concreto',
      category: 'Vibradores',
      subcategory: 'Vibrador de Inmersión',
      headDiameterMM: 65,
      frequencyVPM: 9000,
      motorKW: 4,
      hoseM: 8,
      brochureCode: 'FT-IMER-VIB65-2026-DO',
      priceUSD: 1680,
      priceDOP: dop(1680),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/imer-vib65.jpg'],
      tags: ['vibrador', 'concreto', 'losa', 'fundacion', 'grande'],
      highlights: {
        es: ['Cabezal 65 mm para losas y fundaciones', 'Mayor radio de acción 600 mm', 'Motor trifásico industrial', 'Alta durabilidad en obra tropical'],
        en: ['65mm head for slabs and foundations', 'Wider 600mm action radius', 'Three-phase industrial motor', 'High durability in tropical job sites']
      },
      applications: { es: ['Losas de gran espesor', 'Fundaciones', 'Vigas postensadas', 'Pilas de puente'], en: ['Thick slabs', 'Foundations', 'Post-tension beams', 'Bridge piers'] },
      options: [
        { id: 'vib65-ext', label: { es: 'Extensión de Manguera 4m', en: '4m Hose Extension' }, priceUSD: 240 }
      ]
    }
  ];

  // ─── ALL PRODUCTS ──────────────────────────────────────────────────────────
  const ALL_PRODUCTS = [
    ...PLANTS,
    ...MIXERS,
    ...MORTAR_MIXERS,
    ...PUMPS,
    ...VIBRATORS
  ];

  // ─── PUBLIC API ───────────────────────────────────────────────────────────
  return {
    brand: BRAND,
    version: '1.0.0',
    lastUpdated: '2026-09-20',
    totalProducts: ALL_PRODUCTS.length,
    exchangeRate: USD_TO_DOP,

    plants: PLANTS,
    mixers: MIXERS,
    mortarMixers: MORTAR_MIXERS,
    pumps: PUMPS,
    vibrators: VIBRATORS,

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

console.log('[TMD] IMER Group catalog loaded — ' + window.TMD_IMER_CATALOG.totalProducts + ' productos de concreto');
