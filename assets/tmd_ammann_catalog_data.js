/**
 * TMD DOMINICANA — AMMANN GROUP COMPACTION CATALOG v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Catalog Key: TMD_AMMANN_CATALOG
 * Sector: COMPACTION
 * Phase: 2 — Active
 * Last Updated: 2026-09-20
 *
 * Products:
 *   ARS  — Single-Drum Soil Rollers (8 models)
 *   ARX  — Tandem Asphalt Rollers (10 models)
 *   APF  — Vibratory Plates (11 models)
 *   ACR  — Rammers / Jumping Jacks (6 models)
 *   APA  — Excavator Compaction Attachments (3 models)
 */

window.TMD_AMMANN_CATALOG = (function () {
  'use strict';

  const BRAND = {
    id: 'AMMANN',
    name: 'Ammann',
    color: '#DC2626',
    warrantyES: '2 años (partes) / 1 año (motor)',
    warrantyEN: '2 years (parts) / 1 year (engine)',
    origin: 'Suiza',
    founded: 1869,
    supportPhone: '+1 (809) 826-2222',
    whatsapp: '18098262222'
  };

  // ─── EXCHANGE RATE ─────────────────────────────────────────────────────────
  const USD_TO_DOP = 59.12;

  // ─── HELPERS ───────────────────────────────────────────────────────────────
  function dop(usd) { return Math.round(usd * USD_TO_DOP); }

  // ─── ARS — SINGLE-DRUM SOIL ROLLERS ───────────────────────────────────────
  const ARS_ROLLERS = [
    {
      id: 'AMM-ARS50',
      model: 'ARS 50',
      series: 'ARS Soil Roller',
      category: 'Rodillos de Suelo',
      subcategory: 'Tambor Simple',
      operatingWeight: '5,200 kg',
      drumWidth: '1,676 mm',
      engineBrand: 'Hatz',
      engineHP: 41,
      engineCC: 1399,
      amplitude: '0.8 / 1.6 mm',
      frequency: '30 / 35 Hz',
      staticLinearLoad: '29.7 kg/cm',
      climbingGrade: '40%',
      travelSpeed: '8.5 km/h',
      fuelCapacity: '76 L',
      brochureCode: 'FT-AMM-ARS50-2026-DO',
      priceUSD: 48500,
      priceDOP: dop(48500),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-ars50.jpg'],
      tags: ['compactacion', 'suelo', 'rodillo', 'tambor simple', 'arcilla', 'grava'],
      highlights: {
        es: ['Sistema de vibración dual amplitud', 'Tracción 4WD hidrostática', 'Transmisión sin mantenimiento', 'Cabina ROPS/FOPS opcional'],
        en: ['Dual amplitude vibration system', '4WD hydrostatic drive', 'Maintenance-free transmission', 'Optional ROPS/FOPS cab']
      },
      applications: { es: ['Terraplenes', 'Sub-bases', 'Material granular', 'Arcillas'], en: ['Embankments', 'Sub-bases', 'Granular material', 'Clays'] },
      options: [
        { id: 'ars50-cab',    label: { es: 'Cabina ROPS Climatizada',     en: 'ROPS A/C Cab' },              priceUSD: 6800 },
        { id: 'ars50-edge',   label: { es: 'Rasqueta de Tambor Extra',     en: 'Extra Drum Scraper' },         priceUSD: 420  },
        { id: 'ars50-gps',    label: { es: 'Sistema GPS Ammann ACE',       en: 'Ammann ACE GPS System' },      priceUSD: 5200 }
      ]
    },
    {
      id: 'AMM-ARS70',
      model: 'ARS 70',
      series: 'ARS Soil Roller',
      category: 'Rodillos de Suelo',
      subcategory: 'Tambor Simple',
      operatingWeight: '7,200 kg',
      drumWidth: '2,130 mm',
      engineBrand: 'Cummins',
      engineHP: 66,
      engineCC: 2776,
      amplitude: '0.8 / 1.8 mm',
      frequency: '28 / 33 Hz',
      staticLinearLoad: '33.8 kg/cm',
      climbingGrade: '38%',
      travelSpeed: '10 km/h',
      fuelCapacity: '120 L',
      brochureCode: 'FT-AMM-ARS70-2026-DO',
      priceUSD: 68500,
      priceDOP: dop(68500),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-ars70.jpg'],
      tags: ['compactacion', 'suelo', 'rodillo', 'relleno', 'carretera'],
      highlights: {
        es: ['Drum inteligente con ACE compaction meter', 'Riego presurizado de 550 L', 'Sistema Eco-Stop reducción consumo', 'Chasis articulado oscilante'],
        en: ['Smart drum with ACE compaction meter', 'Pressurized 550L water system', 'Eco-Stop fuel reduction', 'Articulated oscillating frame']
      },
      applications: { es: ['Carreteras', 'Terraplenes grandes', 'Presas', 'Bases granulares'], en: ['Roads', 'Large embankments', 'Dams', 'Granular bases'] },
      options: [
        { id: 'ars70-cab',    label: { es: 'Cabina ROPS Climatizada',      en: 'ROPS A/C Cab' },              priceUSD: 7200 },
        { id: 'ars70-ace',    label: { es: 'Ammann ACE Plus (medición)',    en: 'Ammann ACE Plus (metering)' }, priceUSD: 7800 },
        { id: 'ars70-pad',    label: { es: 'Tambor de Patas (pad-foot)',    en: 'Pad-Foot Drum Shell' },        priceUSD: 4200 }
      ]
    },
    {
      id: 'AMM-ARS100',
      model: 'ARS 100',
      series: 'ARS Soil Roller',
      category: 'Rodillos de Suelo',
      subcategory: 'Tambor Simple',
      operatingWeight: '10,600 kg',
      drumWidth: '2,130 mm',
      engineBrand: 'Cummins',
      engineHP: 97,
      engineCC: 3920,
      amplitude: '0.9 / 1.9 mm',
      frequency: '26 / 30 Hz',
      staticLinearLoad: '49.8 kg/cm',
      climbingGrade: '35%',
      travelSpeed: '11 km/h',
      fuelCapacity: '200 L',
      brochureCode: 'FT-AMM-ARS100-2026-DO',
      priceUSD: 95000,
      priceDOP: dop(95000),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-ars100.jpg'],
      tags: ['compactacion', 'suelo', 'rodillo', 'mineria', 'gran escala'],
      highlights: {
        es: ['Motor Tier 4 Final de baja emisión', 'Tambor de 2,130 mm ultra-ancho', 'ACE Force compaction documentation', 'Telemática integrada FleetManager'],
        en: ['Tier 4 Final low-emission engine', 'Ultra-wide 2,130 mm drum', 'ACE Force compaction documentation', 'Integrated FleetManager telematics']
      },
      applications: { es: ['Grandes terraplenes', 'Minería', 'Aeropuertos', 'Represas'], en: ['Large embankments', 'Mining', 'Airports', 'Dams'] },
      options: [
        { id: 'ars100-cab',   label: { es: 'Cabina ROPS/FOPS Full AC',    en: 'ROPS/FOPS Full AC Cab' },     priceUSD: 9500  },
        { id: 'ars100-ace',   label: { es: 'ACE Force Documentation Kit',  en: 'ACE Force Documentation Kit' }, priceUSD: 11200 },
        { id: 'ars100-fleet', label: { es: 'FleetManager Telematics',      en: 'FleetManager Telematics' },   priceUSD: 3800  },
        { id: 'ars100-pad',   label: { es: 'Shell Pad-Foot Intercambiable', en: 'Interchangeable Pad-Foot Shell' }, priceUSD: 5800 }
      ]
    },
    {
      id: 'AMM-ARS130',
      model: 'ARS 130',
      series: 'ARS Soil Roller',
      category: 'Rodillos de Suelo',
      subcategory: 'Tambor Simple',
      operatingWeight: '13,100 kg',
      drumWidth: '2,130 mm',
      engineBrand: 'Cummins',
      engineHP: 121,
      engineCC: 6700,
      amplitude: '1.0 / 2.0 mm',
      frequency: '25 / 28 Hz',
      staticLinearLoad: '61.5 kg/cm',
      climbingGrade: '32%',
      travelSpeed: '10 km/h',
      fuelCapacity: '230 L',
      brochureCode: 'FT-AMM-ARS130-2026-DO',
      priceUSD: 125000,
      priceDOP: dop(125000),
      featured: false,
      isNew: false,
      inStock: false,
      images: ['assets/images/ammann-ars130.jpg'],
      tags: ['compactacion', 'suelo', 'rodillo', 'heavy', 'presa', 'mineria'],
      highlights: {
        es: ['El más pesado de la gama ARS', 'Triple modo de compactación', 'Carga estática 61.5 kg/cm', 'Chasis de acero T-1 soldado'],
        en: ['Heaviest in ARS range', 'Triple compaction mode', 'Static load 61.5 kg/cm', 'Welded T-1 steel frame']
      },
      applications: { es: ['Presas de tierra', 'Minería a cielo abierto', 'Grandes infraestructuras'], en: ['Earth dams', 'Open-pit mining', 'Major infrastructure'] },
      options: [
        { id: 'ars130-cab',   label: { es: 'Cabina Premium ROPS/FOPS',     en: 'Premium ROPS/FOPS Cab' },    priceUSD: 10500 },
        { id: 'ars130-ace',   label: { es: 'Ammann ACE Force + Doc',        en: 'Ammann ACE Force + Doc' },   priceUSD: 13200 }
      ]
    }
  ];

  // ─── ARX — TANDEM ASPHALT ROLLERS ─────────────────────────────────────────
  const ARX_ROLLERS = [
    {
      id: 'AMM-ARX12',
      model: 'ARX 12',
      series: 'ARX Tandem Asphalt',
      category: 'Rodillos de Asfalto',
      subcategory: 'Tándem Compacto',
      operatingWeight: '1,200 kg',
      drumWidth: '660 mm',
      engineBrand: 'Honda',
      engineHP: 8,
      amplitude: '0.4 mm',
      frequency: '68 Hz',
      travelSpeed: '5 km/h',
      waterTankL: 40,
      brochureCode: 'FT-AMM-ARX12-2026-DO',
      priceUSD: 9800,
      priceDOP: dop(9800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-arx12.jpg'],
      tags: ['compactacion', 'asfalto', 'tandem', 'pequeño', 'parqueo'],
      highlights: {
        es: ['Ideal para trabajos en zonas residenciales', 'Doble vibración delantera/trasera', 'Sistema de rociado manual', 'Muy bajo nivel de ruido'],
        en: ['Ideal for residential area work', 'Dual front/rear vibration', 'Manual spray system', 'Very low noise level']
      },
      applications: { es: ['Parqueos', 'Aceras', 'Parches de asfalto', 'Zonas peatonales'], en: ['Parking lots', 'Sidewalks', 'Asphalt patches', 'Pedestrian zones'] },
      options: [
        { id: 'arx12-canopy', label: { es: 'Toldo de Protección Solar', en: 'Sun Protection Canopy' }, priceUSD: 680 }
      ]
    },
    {
      id: 'AMM-ARX26',
      model: 'ARX 26',
      series: 'ARX Tandem Asphalt',
      category: 'Rodillos de Asfalto',
      subcategory: 'Tándem Mediano',
      operatingWeight: '2,600 kg',
      drumWidth: '1,300 mm',
      engineBrand: 'Yanmar',
      engineHP: 24,
      amplitude: '0.38 / 0.72 mm',
      frequency: '55 / 63 Hz',
      travelSpeed: '8 km/h',
      waterTankL: 180,
      brochureCode: 'FT-AMM-ARX26-2026-DO',
      priceUSD: 38500,
      priceDOP: dop(38500),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-arx26.jpg'],
      tags: ['compactacion', 'asfalto', 'tandem', 'carretera', 'urbano'],
      highlights: {
        es: ['Doble amplitud y frecuencia selectables', 'Tambores de acero inoxidable', 'Rociador presurizado 180 L', 'Vibración frontal independiente'],
        en: ['Dual selectable amplitude and frequency', 'Stainless steel drums', 'Pressurized 180L sprinkler', 'Independent front vibration']
      },
      applications: { es: ['Carreteras urbanas', 'Estacionamientos grandes', 'Bases asfálticas', 'Capas finales'], en: ['Urban roads', 'Large parking lots', 'Asphalt bases', 'Final layers'] },
      options: [
        { id: 'arx26-cab',    label: { es: 'Cabina ROPS Desmontable',   en: 'Removable ROPS Cab' },         priceUSD: 4800 },
        { id: 'arx26-dualvib',label: { es: 'Vibración Doble Tambor',    en: 'Dual Drum Vibration' },        priceUSD: 2200 },
        { id: 'arx26-led',    label: { es: 'Kit Luces LED de Trabajo',   en: 'LED Work Lights Kit' },        priceUSD: 380  }
      ]
    },
    {
      id: 'AMM-ARX90',
      model: 'ARX 90',
      series: 'ARX Tandem Asphalt',
      category: 'Rodillos de Asfalto',
      subcategory: 'Tándem Grande',
      operatingWeight: '9,200 kg',
      drumWidth: '1,680 mm',
      engineBrand: 'Cummins',
      engineHP: 74,
      amplitude: '0.4 / 0.8 mm',
      frequency: '42 / 50 Hz',
      travelSpeed: '11 km/h',
      waterTankL: 650,
      brochureCode: 'FT-AMM-ARX90-2026-DO',
      priceUSD: 115000,
      priceDOP: dop(115000),
      featured: true,
      isNew: true,
      inStock: true,
      images: ['assets/images/ammann-arx90.jpg'],
      tags: ['compactacion', 'asfalto', 'tandem', 'autopista', 'alta produccion'],
      highlights: {
        es: ['Nuevo modelo 2026 con ACE Proactive control', 'Tambores de 1,680 mm de alta producción', 'Vibración de tambor trasero independiente', 'Telemática de flota integrada'],
        en: ['New 2026 model with ACE Proactive control', 'High-output 1,680 mm drums', 'Independent rear drum vibration', 'Integrated fleet telematics']
      },
      applications: { es: ['Autopistas', 'Aeropistas', 'Capas de rodadura premium', 'Alta producción'], en: ['Highways', 'Airstrips', 'Premium wearing courses', 'High output'] },
      options: [
        { id: 'arx90-cab',    label: { es: 'Cabina Full A/C ROPS/FOPS', en: 'Full A/C ROPS/FOPS Cab' },    priceUSD: 9200  },
        { id: 'arx90-ace',    label: { es: 'ACE Proactive Compaction',  en: 'ACE Proactive Compaction' },   priceUSD: 12500 },
        { id: 'arx90-fleet',  label: { es: 'FleetManager + GPS',        en: 'FleetManager + GPS' },         priceUSD: 4200  }
      ]
    }
  ];

  // ─── APF — VIBRATORY PLATES ────────────────────────────────────────────────
  const APF_PLATES = [
    {
      id: 'AMM-APF15',
      model: 'APF 15/50',
      series: 'APF Vibratory Plate',
      category: 'Placas Vibratorias',
      subcategory: 'Placa Ligera',
      operatingWeight: '78 kg',
      plateWidth: '500 mm',
      engineBrand: 'Honda',
      engineHP: 4,
      centrifugalForce: '15 kN',
      travelSpeed: '22 m/min',
      compactionDepth: '250 mm',
      brochureCode: 'FT-AMM-APF15-2026-DO',
      priceUSD: 2800,
      priceDOP: dop(2800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-apf15.jpg'],
      tags: ['compactacion', 'placa', 'suelo', 'zanjas', 'light'],
      highlights: {
        es: ['Ideal para zanjas y trabajos en espacio reducido', 'Motor Honda GX120 confiable', 'Antivibración en manubrio', 'Muy fácil transporte'],
        en: ['Ideal for trenches and tight spaces', 'Reliable Honda GX120 engine', 'Anti-vibration handlebar', 'Easy transport']
      },
      applications: { es: ['Zanjas', 'Retapado de cables', 'Pisos de grava', 'Espacios estrechos'], en: ['Trenches', 'Cable backfill', 'Gravel floors', 'Tight spaces'] },
      options: [
        { id: 'apf15-kit', label: { es: 'Kit de Mantenimiento Anual', en: 'Annual Maintenance Kit' }, priceUSD: 185 }
      ]
    },
    {
      id: 'AMM-APF30',
      model: 'APF 30/65',
      series: 'APF Vibratory Plate',
      category: 'Placas Vibratorias',
      subcategory: 'Placa Mediana',
      operatingWeight: '178 kg',
      plateWidth: '650 mm',
      engineBrand: 'Honda',
      engineHP: 6.6,
      centrifugalForce: '30 kN',
      travelSpeed: '25 m/min',
      compactionDepth: '350 mm',
      brochureCode: 'FT-AMM-APF30-2026-DO',
      priceUSD: 4800,
      priceDOP: dop(4800),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-apf30.jpg'],
      tags: ['compactacion', 'placa', 'suelo', 'asfalto', 'mediana'],
      highlights: {
        es: ['La más vendida en República Dominicana', 'Fuerza centrífuga 30 kN', 'Control de avance/retroceso hidráulico', 'Doble amortiguación'],
        en: ['Best-seller in Dominican Republic', 'Centrifugal force 30 kN', 'Hydraulic forward/reverse control', 'Dual damping']
      },
      applications: { es: ['Capas de asfalto', 'Bases granulares', 'Subrasantes', 'Calles angostas'], en: ['Asphalt layers', 'Granular bases', 'Subgrades', 'Narrow streets'] },
      options: [
        { id: 'apf30-kit', label: { es: 'Kit Mantenimiento Premium',   en: 'Premium Maintenance Kit' }, priceUSD: 280  },
        { id: 'apf30-rev', label: { es: 'Control Reverso Hidráulico',  en: 'Hydraulic Reverse Control' }, priceUSD: 650 }
      ]
    },
    {
      id: 'AMM-APF60',
      model: 'APF 60/80',
      series: 'APF Vibratory Plate',
      category: 'Placas Vibratorias',
      subcategory: 'Placa Pesada',
      operatingWeight: '580 kg',
      plateWidth: '800 mm',
      engineBrand: 'Yanmar',
      engineHP: 13,
      centrifugalForce: '60 kN',
      travelSpeed: '22 m/min',
      compactionDepth: '500 mm',
      brochureCode: 'FT-AMM-APF60-2026-DO',
      priceUSD: 14200,
      priceDOP: dop(14200),
      featured: false,
      isNew: true,
      inStock: true,
      images: ['assets/images/ammann-apf60.jpg'],
      tags: ['compactacion', 'placa', 'heavy', 'bases', 'profundo'],
      highlights: {
        es: ['Máxima profundidad de compactación 500 mm', 'Motor Yanmar diésel de larga duración', 'Sistema hidráulico reversible', 'Manubrio plegable ROPS'],
        en: ['Maximum compaction depth 500 mm', 'Long-life Yanmar diesel engine', 'Reversible hydraulic system', 'Foldable ROPS handlebar']
      },
      applications: { es: ['Bases de carretera', 'Compactación profunda', 'Sub-bases de concreto', 'Grandes áreas'], en: ['Road bases', 'Deep compaction', 'Concrete sub-bases', 'Large areas'] },
      options: [
        { id: 'apf60-water', label: { es: 'Sistema Rociador de Agua',  en: 'Water Sprinkler System' },  priceUSD: 980  },
        { id: 'apf60-kit',   label: { es: 'Kit Mantenimiento Diesel',  en: 'Diesel Maintenance Kit' },  priceUSD: 420  }
      ]
    }
  ];

  // ─── ACR — RAMMERS ────────────────────────────────────────────────────────
  const ACR_RAMMERS = [
    {
      id: 'AMM-ACR60',
      model: 'ACR 60',
      series: 'ACR Rammer',
      category: 'Apisonadores',
      subcategory: 'Saltarín Compacto',
      operatingWeight: '62 kg',
      shoeSize: '285 × 340 mm',
      engineBrand: 'Honda',
      engineHP: 2.7,
      impactRate: '640 bpm',
      compactionDepth: '600 mm',
      travelSpeed: '11 m/min',
      brochureCode: 'FT-AMM-ACR60-2026-DO',
      priceUSD: 2200,
      priceDOP: dop(2200),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-acr60.jpg'],
      tags: ['compactacion', 'saltarin', 'zanjas', 'cohesivo', 'arcilla'],
      highlights: {
        es: ['Ideal para arcillas y suelos cohesivos', '640 golpes por minuto', 'Mango antivibratorio certificado', 'Muy fácil de transportar'],
        en: ['Ideal for clay and cohesive soils', '640 blows per minute', 'Certified anti-vibration handle', 'Easy to transport']
      },
      applications: { es: ['Zanjas estrechas', 'Rellenos de arcilla', 'Alrededor de estructuras', 'Áreas inaccesibles'], en: ['Narrow trenches', 'Clay fills', 'Around structures', 'Inaccessible areas'] },
      options: [
        { id: 'acr60-kit', label: { es: 'Kit Filtros y Aceite', en: 'Oil and Filter Kit' }, priceUSD: 95 }
      ]
    },
    {
      id: 'AMM-ACR80',
      model: 'ACR 80',
      series: 'ACR Rammer',
      category: 'Apisonadores',
      subcategory: 'Saltarín Pesado',
      operatingWeight: '80 kg',
      shoeSize: '330 × 380 mm',
      engineBrand: 'Honda',
      engineHP: 4,
      impactRate: '580 bpm',
      compactionDepth: '700 mm',
      travelSpeed: '14 m/min',
      brochureCode: 'FT-AMM-ACR80-2026-DO',
      priceUSD: 3200,
      priceDOP: dop(3200),
      featured: true,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-acr80.jpg'],
      tags: ['compactacion', 'saltarin', 'heavy', 'zanjas', 'construccion'],
      highlights: {
        es: ['Mayor profundidad de compactación en la clase', '700 mm de profundidad efectiva', 'Motor Honda GX120 premium', 'Mango telescópico ajustable'],
        en: ['Greatest compaction depth in class', '700 mm effective depth', 'Premium Honda GX120 engine', 'Adjustable telescopic handle']
      },
      applications: { es: ['Zanjas de servicios', 'Fundaciones estrechas', 'Rellenos de compactación intensa'], en: ['Service trenches', 'Narrow foundations', 'Intense compaction fills'] },
      options: [
        { id: 'acr80-kit',  label: { es: 'Kit Mantenimiento 50h',   en: '50h Maintenance Kit' },  priceUSD: 140 },
        { id: 'acr80-shoe', label: { es: 'Zapata Extra Ancha 420mm', en: '420mm Wide Shoe Set' }, priceUSD: 380 }
      ]
    }
  ];

  // ─── APA — EXCAVATOR PLATE COMPACTORS ────────────────────────────────────
  const APA_ATTACHMENTS = [
    {
      id: 'AMM-APA20',
      model: 'APA 20',
      series: 'APA Excavator Attachment',
      category: 'Accesorios de Compactación',
      subcategory: 'Placa para Excavadora',
      operatingWeight: '390 kg',
      plateArea: '500 × 850 mm',
      compatibleTons: '2–5 t',
      frequency: '30 Hz',
      brochureCode: 'FT-AMM-APA20-2026-DO',
      priceUSD: 8200,
      priceDOP: dop(8200),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-apa20.jpg'],
      tags: ['accesorio', 'excavadora', 'compactacion', 'placa hidraulica'],
      highlights: {
        es: ['Compatible con mini excavadoras 2–5 t', 'Placa articulada bidireccional', 'Conexión hidráulica directa', 'Sin fuente de poder independiente'],
        en: ['Compatible with 2–5t mini excavators', 'Bi-directional articulated plate', 'Direct hydraulic connection', 'No independent power source']
      },
      applications: { es: ['Zanjas con excavadora', 'Rellenos profundos', 'Fundaciones angostas'], en: ['Excavator trenches', 'Deep fills', 'Narrow foundations'] },
      options: [
        { id: 'apa20-quick', label: { es: 'Acoplador Rápido Universal', en: 'Universal Quick Coupler' }, priceUSD: 620 }
      ]
    },
    {
      id: 'AMM-APA50',
      model: 'APA 50',
      series: 'APA Excavator Attachment',
      category: 'Accesorios de Compactación',
      subcategory: 'Placa para Excavadora',
      operatingWeight: '820 kg',
      plateArea: '600 × 1050 mm',
      compatibleTons: '5–12 t',
      frequency: '28 Hz',
      brochureCode: 'FT-AMM-APA50-2026-DO',
      priceUSD: 15800,
      priceDOP: dop(15800),
      featured: false,
      isNew: false,
      inStock: true,
      images: ['assets/images/ammann-apa50.jpg'],
      tags: ['accesorio', 'excavadora', 'compactacion', 'placa grande'],
      highlights: {
        es: ['Compatible con excavadoras de 5–12 t', 'Alta frecuencia de impacto', 'Fuerza centrífuga máxima', 'Montaje estándar S45'],
        en: ['Compatible with 5–12t excavators', 'High impact frequency', 'Maximum centrifugal force', 'Standard S45 mount']
      },
      applications: { es: ['Zanjas grandes', 'Fundaciones de puentes', 'Compactación en taludes'], en: ['Large trenches', 'Bridge foundations', 'Slope compaction'] },
      options: [
        { id: 'apa50-quick', label: { es: 'Acoplador Rápido S45',    en: 'S45 Quick Coupler' },      priceUSD: 980  },
        { id: 'apa50-rot',   label: { es: 'Rotación 360° hidráulica', en: '360° Hydraulic Rotation' }, priceUSD: 2800 }
      ]
    }
  ];

  // ─── ALL PRODUCTS AGGREGATED ───────────────────────────────────────────────
  const ALL_PRODUCTS = [
    ...ARS_ROLLERS,
    ...ARX_ROLLERS,
    ...APF_PLATES,
    ...ACR_RAMMERS,
    ...APA_ATTACHMENTS
  ];

  // ─── PUBLIC API ───────────────────────────────────────────────────────────
  return {
    brand: BRAND,
    version: '1.0.0',
    lastUpdated: '2026-09-20',
    totalProducts: ALL_PRODUCTS.length,
    exchangeRate: USD_TO_DOP,

    // Category arrays for direct access
    soilRollers: ARS_ROLLERS,
    asphaltRollers: ARX_ROLLERS,
    vibratoryPlates: APF_PLATES,
    rammers: ACR_RAMMERS,
    excavatorAttachments: APA_ATTACHMENTS,

    // Universal API (used by TMDQuoteBuilder + globalSearch)
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

console.log('[TMD] Ammann catalog loaded — ' + window.TMD_AMMANN_CATALOG.totalProducts + ' productos de compactación');
