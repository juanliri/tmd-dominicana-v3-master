/**
 * TMD DOMINICANA — YANMAR CATALOG DATA v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Official Yanmar product data for TMD Dominican Republic market.
 * Covers: YT/YM/SA/EF Series Tractors, Rice Harvesters (AG6),
 *         Rice Transplanters (AP-D Series)
 *
 * Price guidance in USD. DOP conversion via TMD currency engine.
 * Specs sourced from official Yanmar publications and NASE region data.
 */

window.TMD_YANMAR_CATALOG = {

  brand: 'YANMAR',
  version: '1.0.0',
  currency: 'USD',
  lastUpdated: '2026-09-20',
  totalProducts: 28,
  warranty: '2 años de garantía — motor y transmisión',

  tractors: [

    // ── SA SERIES — COMPACT (entry-level) ────────────────────────────────
    {
      id: 'YNM-SA221',
      model: 'SA221',
      name: 'Yanmar SA221',
      series: 'SA Series',
      category: 'Tractores Compactos',
      subcategory: 'SA Series',
      hp: 21.6,
      engineModel: 'Yanmar 3TNV88C-BKMS (3-cil.)',
      engineType: 'Diesel 3-Cil.',
      transmission: 'Hydrostatic (HST)',
      pto: '540 RPM',
      lift3pt: '499 kg',
      weight: '910 kg',
      length: '113.4 in (2,880 mm)',
      height: '90.2 in (2,291 mm)',
      wheelbase: '65.7 in (1,669 mm)',
      tires: '23x8.50-12 F / 11.2-24 R',
      groundClearance: '11.3 in (287 mm)',
      fuelCapacity: '7.4 gal (28 L)',
      priceUSD: 21500,
      priceRange: 'Desde $21,500',
      image: 'https://www.yanmar.com/us/agri/products/tractors/sa/img/sa221-top.jpg',
      imageFallback: 'assets/images/yanmar-sa221.jpg',
      highlights: ['Motor Yanmar de 3 cilindros reconocido mundialmente', 'Hydrostatic compacto y eficiente', 'Diseño de acceso al motor frontal para mantenimiento fácil'],
      applications: ['Pequeñas fincas', 'Jardines y parques', 'Propiedades residenciales rurales'],
      availableAttachments: ['Cargador FEL', 'Cortadora trasera', 'Pala niveladora'],
      options: [
        { id: 'sa221-loader', label: { es: 'Cargador Frontal FEL', en: 'Front End Loader' }, priceAdd: 3400 },
        { id: 'sa221-mow', label: { es: 'Cortadora Trasera 1.5 m', en: 'Rear Rotary Mower 1.5 m' }, priceAdd: 1900 },
        { id: 'sa221-rops', label: { es: 'ROPS con protector solar', en: 'ROPS with Sun Canopy' }, priceAdd: 450 }
      ],
      tags: ['compact', 'sa-series', 'hst', 'yanmar', '21hp'],
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'YNM-SA324',
      model: 'SA324',
      name: 'Yanmar SA324',
      series: 'SA Series',
      category: 'Tractores Compactos',
      subcategory: 'SA Series',
      hp: 24.4,
      engineModel: 'Yanmar 3TNV88C-BKMS',
      engineType: 'Diesel 3-Cil.',
      transmission: 'Hydrostatic (HST) o Synchromesh 8F/2R',
      pto: '540 RPM',
      lift3pt: '660 kg',
      weight: '1,095 kg',
      length: '120.5 in (3,060 mm)',
      height: '93.7 in (2,380 mm)',
      wheelbase: '70.5 in (1,790 mm)',
      tires: '7.2-14 F / 11.2-24 R',
      groundClearance: '11.8 in (299 mm)',
      fuelCapacity: '9.5 gal (36 L)',
      priceUSD: 24200,
      priceRange: 'Desde $24,200',
      image: 'https://www.yanmar.com/us/agri/products/tractors/sa/img/sa324-top.jpg',
      imageFallback: 'assets/images/yanmar-sa324.jpg',
      highlights: ['Modelo más popular de la línea SA en Caribe', 'Elección entre HST o Synchromesh según preferencia', 'Robusto para trabajo diario de campo'],
      applications: ['Horticultura', 'Ganadería de subsistencia', 'Preparación de camas de siembra'],
      availableAttachments: ['Cargador FEL', 'Rotovator', 'Rastra de discos'],
      options: [
        { id: 'sa324-hst', label: { es: 'Transmisión HST (Upgrade)', en: 'HST Transmission Upgrade' }, priceAdd: 1100 },
        { id: 'sa324-loader', label: { es: 'Cargador Frontal FEL', en: 'Front End Loader' }, priceAdd: 4200 },
        { id: 'sa324-roto', label: { es: 'Rotovator 60"', en: 'Rotovator 60"' }, priceAdd: 2800 }
      ],
      tags: ['compact', 'sa-series', 'yanmar', '24hp', 'caribe'],
      inStock: true,
      isFeatured: true,
      isNew: false
    },

    // ── YT SERIES — COMPACT UTILITY ──────────────────────────────────────
    {
      id: 'YNM-YT235',
      model: 'YT235',
      name: 'Yanmar YT235',
      series: 'YT Series',
      category: 'Tractores Compactos',
      subcategory: 'YT Series',
      hp: 35,
      engineModel: 'Yanmar 4TNV88C-KMS (4-cil.)',
      engineType: 'Diesel 4-Cil.',
      transmission: 'Hydrostatic (HST) 3-Range',
      pto: '540/1,000 RPM',
      lift3pt: '1,050 kg',
      weight: '1,680 kg',
      length: '143.3 in (3,640 mm)',
      height: '99.4 in (2,525 mm)',
      wheelbase: '84.6 in (2,149 mm)',
      tires: '9.5-18 F / 14.9-24 R',
      groundClearance: '14.6 in (370 mm)',
      fuelCapacity: '15.3 gal (57.9 L)',
      priceUSD: 33800,
      priceRange: 'Desde $33,800',
      image: 'https://www.yanmar.com/us/agri/products/tractors/yt/img/yt235-top.jpg',
      imageFallback: 'assets/images/yanmar-yt235.jpg',
      highlights: ['HST de 3 rangos para control preciso en todo terreno', 'Motor 4 cilindros para trabajo sostenido', 'Doble PTO 540/1000 para máxima versatilidad'],
      applications: ['Fincas medianas', 'Cultivos de hortalizas', 'Preparación de suelo para siembra directa'],
      availableAttachments: ['Cargador FEL320', 'Segadora 2.1 m', 'Subsolador 3 venas'],
      options: [
        { id: 'yt235-loader', label: { es: 'Cargador Frontal FEL320', en: 'Front Loader FEL320' }, priceAdd: 5200 },
        { id: 'yt235-cab', label: { es: 'Cabina climatizada Yanmar', en: 'Yanmar Climate Cab' }, priceAdd: 7800 },
        { id: 'yt235-mow', label: { es: 'Segadora 2.1 m', en: 'Rotary Mower 2.1 m' }, priceAdd: 3600 },
        { id: 'yt235-subsoil', label: { es: 'Subsolador 3 venas', en: '3-Shank Subsoiler' }, priceAdd: 2400 }
      ],
      tags: ['compact', 'yt-series', 'yanmar', '35hp', '4cyl', 'hst'],
      inStock: true,
      isFeatured: true,
      isNew: false
    },
    {
      id: 'YNM-YT347',
      model: 'YT347',
      name: 'Yanmar YT347',
      series: 'YT Series',
      category: 'Tractores Compactos',
      subcategory: 'YT Series',
      hp: 47,
      engineModel: 'Yanmar 4TNV98C-KMS (4-cil. turbo)',
      engineType: 'Diesel 4-Cil. Turbo',
      transmission: 'Hydrostatic (HST) 3-Range con Eco-Mode',
      pto: '540/1,000 RPM Independiente',
      lift3pt: '1,500 kg',
      weight: '2,200 kg',
      length: '152.8 in (3,880 mm)',
      height: '102.0 in (2,590 mm)',
      wheelbase: '90.2 in (2,290 mm)',
      tires: '10.0-16 F / 16.9-28 R',
      groundClearance: '16.1 in (409 mm)',
      fuelCapacity: '20.6 gal (78 L)',
      priceUSD: 44900,
      priceRange: 'Desde $44,900',
      image: 'https://www.yanmar.com/us/agri/products/tractors/yt/img/yt347-top.jpg',
      imageFallback: 'assets/images/yanmar-yt347.jpg',
      highlights: ['47 HP turbo con Eco-Mode para eficiencia energética', 'PTO independiente para implementos de alta demanda', 'Sistema eléctrico de 12V moderno'],
      applications: ['Cosecha de forraje', 'Terraceo en laderas', 'Ganadería semi-intensiva', 'Trabajo en cafetales'],
      availableAttachments: ['Cargador FEL400', 'Empacadora de pacas', 'Rotovator 80"'],
      options: [
        { id: 'yt347-loader', label: { es: 'Cargador Frontal FEL400', en: 'Front Loader FEL400' }, priceAdd: 7200 },
        { id: 'yt347-cab', label: { es: 'Cabina Premium con A/C', en: 'Premium A/C Cab' }, priceAdd: 9500 },
        { id: 'yt347-balewrap', label: { es: 'Sistema de Envoltura de Pacas', en: 'Bale Wrap System' }, priceAdd: 5800 }
      ],
      tags: ['compact', 'yt-series', 'yanmar', '47hp', 'turbo', 'eco-mode'],
      inStock: true,
      isFeatured: true,
      isNew: false
    },
    {
      id: 'YNM-YT359',
      model: 'YT359',
      name: 'Yanmar YT359',
      series: 'YT Series',
      category: 'Tractores Compactos',
      subcategory: 'YT Series',
      hp: 59,
      engineModel: 'Yanmar 4TNV98CT-KMS (4-cil. turbo intercooler)',
      engineType: 'Diesel 4-Cil. Turbo Intercooler',
      transmission: 'Hydrostatic (HST) Dual Range + Power Shuttle',
      pto: '540/1,000 RPM Independiente',
      lift3pt: '2,000 kg',
      weight: '2,800 kg',
      length: '168.1 in (4,270 mm)',
      height: '104.7 in (2,660 mm)',
      wheelbase: '98.4 in (2,500 mm)',
      tires: '11.2-20 F / 18.4-30 R',
      groundClearance: '17.3 in (440 mm)',
      fuelCapacity: '26.4 gal (100 L)',
      priceUSD: 58500,
      priceRange: 'Desde $58,500',
      image: 'https://www.yanmar.com/us/agri/products/tractors/yt/img/yt359-top.jpg',
      imageFallback: 'assets/images/yanmar-yt359.jpg',
      highlights: ['El más potente de la línea YT — 59 HP turbo intercooler', 'Sistema hidrostático dual-range', 'Ideal para grandes explotaciones tropicales'],
      applications: ['Plantaciones de banano y plátano', 'Cultivos extensivos', 'Trabajo en condiciones de alta humedad'],
      availableAttachments: ['Cargador FEL540', 'Segadora pesada 3.6 m', 'Sembradora de precisión'],
      options: [
        { id: 'yt359-loader', label: { es: 'Cargador Frontal FEL540', en: 'Front Loader FEL540' }, priceAdd: 9800 },
        { id: 'yt359-cab', label: { es: 'Cabina Deluxe con Suspensión y A/C', en: 'Deluxe Suspension A/C Cab' }, priceAdd: 12500 },
        { id: 'yt359-gps', label: { es: 'Sistema GPS Yanmar i-Pilot', en: 'Yanmar i-Pilot GPS System' }, priceAdd: 9200 }
      ],
      tags: ['compact', 'yt-series', 'yanmar', '59hp', 'turbo-intercooler', 'flagship'],
      inStock: false,
      isFeatured: true,
      isNew: false
    },

    // ── YM SERIES — SPECIALTY / ORCHARD / VEGETABLE ──────────────────────
    {
      id: 'YNM-YM359D',
      model: 'YM359D',
      name: 'Yanmar YM359D',
      series: 'YM Series',
      category: 'Tractores Utilitarios',
      subcategory: 'YM Series',
      hp: 55,
      engineModel: 'Yanmar 4TNV88C-GMSS (4-cil.)',
      engineType: 'Diesel 4-Cil.',
      transmission: 'Synchromesh 16F/8R con Power Shuttle',
      pto: '540/1,000 RPM',
      lift3pt: '2,100 kg',
      weight: '2,700 kg',
      length: '172.8 in (4,389 mm)',
      height: '105.5 in (2,680 mm)',
      wheelbase: '101.2 in (2,570 mm)',
      tires: '9.5-20 F / 16.9-30 R',
      groundClearance: '18.5 in (470 mm)',
      fuelCapacity: '26.4 gal (100 L)',
      priceUSD: 61500,
      priceRange: 'Desde $61,500',
      image: 'https://www.yanmar.com/agri/tractors/ym/img/ym359d-main.jpg',
      imageFallback: 'assets/images/yanmar-ym359d.jpg',
      highlights: ['55 HP — diseñado para huertas y cultivos en hileras', 'Perfil estrecho para trabajo entre filas de cultivo', 'Transmisión 16 velocidades hacia adelante'],
      applications: ['Huertas de mango y aguacate', 'Cultivos de piña en hileras', 'Viñedos', 'Horticultura tecnificada'],
      availableAttachments: ['Atomizador de torre', 'Cortadora de bajo perfil', 'Fumigadora de barra'],
      options: [
        { id: 'ym359d-sprayer', label: { es: 'Atomizador de Torre 1,000L', en: 'Tower Sprayer 1,000L' }, priceAdd: 8500 },
        { id: 'ym359d-mow', label: { es: 'Cortadora de bajo perfil 60"', en: 'Low-Profile Mower 60"' }, priceAdd: 4200 },
        { id: 'ym359d-cab', label: { es: 'Cabina Anti-Pesticidas con HEPA', en: 'Anti-Pesticide HEPA Cab' }, priceAdd: 11200 }
      ],
      tags: ['utility', 'ym-series', 'yanmar', '55hp', 'orchard', 'narrow'],
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'YNM-YM489D',
      model: 'YM489D',
      name: 'Yanmar YM489D',
      series: 'YM Series',
      category: 'Tractores Utilitarios',
      subcategory: 'YM Series',
      hp: 72,
      engineModel: 'Yanmar 4TNV98C-NGMS (4-cil. turbo)',
      engineType: 'Diesel 4-Cil. Turbo',
      transmission: 'Power Shuttle 24F/24R',
      pto: '540/1,000 RPM + Economy',
      lift3pt: '3,000 kg',
      weight: '3,700 kg',
      length: '185.0 in (4,699 mm)',
      height: '110.2 in (2,799 mm)',
      wheelbase: '110.2 in (2,799 mm)',
      tires: '11.2-24 F / 18.4-34 R',
      groundClearance: '20.1 in (510 mm)',
      fuelCapacity: '34.3 gal (130 L)',
      priceUSD: 82500,
      priceRange: 'Desde $82,500',
      image: 'https://www.yanmar.com/agri/tractors/ym/img/ym489d-main.jpg',
      imageFallback: 'assets/images/yanmar-ym489d.jpg',
      highlights: ['72 HP — potencia máxima de la línea utilitaria Yanmar', 'Ideal para arroz, caña y grandes fincas ganaderas', 'Sistema de 24 velocidades para adaptarse a toda situación'],
      applications: ['Arrocería inundada', 'Caña de azúcar', 'Grandes explotaciones ganaderas', 'Cultivos de exportación'],
      availableAttachments: ['Rastra de discos pesada', 'Sembradora de precisión', 'Fumigadora de barra 28 m'],
      options: [
        { id: 'ym489d-cab', label: { es: 'Cabina Lujo con A/C y Calefacción', en: 'Luxury A/C + Heat Cab' }, priceAdd: 14500 },
        { id: 'ym489d-gps', label: { es: 'Sistema GPS i-Pilot Pro', en: 'i-Pilot Pro GPS System' }, priceAdd: 12800 },
        { id: 'ym489d-duals', label: { es: 'Ruedas Dobles Traseras', en: 'Dual Rear Wheels' }, priceAdd: 7200 }
      ],
      tags: ['utility', 'ym-series', 'yanmar', '72hp', 'turbo', 'arroz', 'caña'],
      inStock: false,
      isFeatured: true,
      isNew: false
    },

    // ── EF SERIES — TWO-WHEEL TRACTORS / WALK-BEHIND ─────────────────────
    {
      id: 'YNM-EF453T',
      model: 'EF453T',
      name: 'Yanmar EF453T',
      series: 'EF Series Motocultor',
      category: 'Motocultores',
      subcategory: 'EF Series',
      hp: 11.6,
      engineModel: 'Yanmar L100N (1-cil.)',
      engineType: 'Diesel 1-Cil. Refrigerado por aire',
      transmission: '3F/1R con PTO',
      pto: 'Frontal + Trasero',
      lift3pt: 'N/A',
      weight: '130 kg',
      length: '62.2 in (1,580 mm)',
      height: '42.5 in (1,079 mm)',
      wheelbase: 'N/A (2-ruedas)',
      tires: '5.00-12 (4 capas)',
      groundClearance: '13.0 in (330 mm)',
      fuelCapacity: '1.8 gal (6.8 L)',
      priceUSD: 7800,
      priceRange: 'Desde $7,800',
      image: 'https://www.yanmar.com/agri/tillers/ef/img/ef453t-main.jpg',
      imageFallback: 'assets/images/yanmar-ef453t.jpg',
      highlights: ['Motocultor 2-ruedas para terrenos de difícil acceso', 'Motor monocilíndrico de alta fiabilidad', 'Versátil con múltiples implementos frontales y traseros'],
      applications: ['Horticultura de pequeña escala', 'Parcelas difíciles de acceso', 'Preparación de camas en invernadero'],
      availableAttachments: ['Rotovator trasero', 'Surcador de camas', 'Carreta de transporte'],
      options: [
        { id: 'ef453-roto', label: { es: 'Rotovator trasero 60cm', en: 'Rear Rotovator 60cm' }, priceAdd: 1400 },
        { id: 'ef453-cart', label: { es: 'Carreta de transporte 300kg', en: 'Transport Cart 300kg' }, priceAdd: 850 }
      ],
      tags: ['motocultor', 'ef-series', 'yanmar', '2-ruedas', 'horticola'],
      inStock: true,
      isFeatured: false,
      isNew: false
    }
  ],

  // ─── RICE HARVESTERS ─────────────────────────────────────────────────────
  harvesters: [
    {
      id: 'YNM-AG600',
      model: 'AG600',
      name: 'Yanmar AG600',
      series: 'AG Combine Harvester',
      category: 'Cosechadoras de Arroz',
      subcategory: 'AG Series',
      hp: 60,
      engineModel: 'Yanmar 3TNV88C (3-cil.)',
      engineType: 'Diesel 3-Cil.',
      cuttingWidth: '2.25 m',
      harvestingCapacity: '1.5 ac/hr (0.6 ha/hr)',
      grainTankCapacity: '62.8 bu (2,200 L)',
      weight: '6,200 kg',
      length: '243.3 in (6,180 mm)',
      height: '143.7 in (3,650 mm)',
      trackWidth: '27.6 in (700 mm) Rubber Tracks',
      priceUSD: 98500,
      priceRange: 'Desde $98,500',
      image: 'https://www.yanmar.com/agri/harvesters/ag600/img/ag600-main.jpg',
      imageFallback: 'assets/images/yanmar-ag600.jpg',
      highlights: ['Cosechadora de arroz de 60 HP de alto rendimiento', 'Sistema de trilllado de flujo axial para menor pérdida de grano', 'Tracks de goma para campos inundados'],
      applications: ['Arrocería a gran escala', 'Cultivos de arroz en condiciones húmedas', 'Zonas tropicales de alta producción'],
      options: [
        { id: 'ag600-unloader', label: { es: 'Descargador de grano extendido', en: 'Extended Grain Unloader' }, priceAdd: 5200 },
        { id: 'ag600-airfilter', label: { es: 'Filtro de aire doble para condiciones de polvo', en: 'Dual Air Filter for Dusty Conditions' }, priceAdd: 1800 },
        { id: 'ag600-gps', label: { es: 'Sistema de mapeo de cosecha GPS', en: 'GPS Harvest Mapping System' }, priceAdd: 9800 }
      ],
      tags: ['cosechadora', 'arroz', 'ag600', 'yanmar', 'combine'],
      inStock: false,
      isFeatured: true,
      isNew: false
    },
    {
      id: 'YNM-AG6II',
      model: 'AG6 II',
      name: 'Yanmar AG6 II',
      series: 'AG Combine Harvester',
      category: 'Cosechadoras de Arroz',
      subcategory: 'AG Series',
      hp: 79,
      engineModel: 'Yanmar 4TNV98CT (4-cil. turbo)',
      engineType: 'Diesel 4-Cil. Turbo',
      cuttingWidth: '2.80 m',
      harvestingCapacity: '2.2 ac/hr (0.9 ha/hr)',
      grainTankCapacity: '85.0 bu (3,000 L)',
      weight: '7,500 kg',
      length: '260.0 in (6,604 mm)',
      height: '156.0 in (3,960 mm)',
      trackWidth: '29.5 in (750 mm) Rubber Tracks',
      priceUSD: 145000,
      priceRange: 'Desde $145,000',
      image: 'https://www.yanmar.com/agri/harvesters/ag6ii/img/ag6ii-main.jpg',
      imageFallback: 'assets/images/yanmar-ag6ii.jpg',
      highlights: ['79 HP — la cosechadora más productiva de Yanmar para el Caribe', 'Cabina con A/C y sistema de monitoreo de cosecha', 'Rendimiento de hasta 2.2 acres por hora'],
      applications: ['Grandes arrocerías comerciales', 'Cooperativas de producción de arroz', 'Exportadores de arroz pilado'],
      options: [
        { id: 'ag6ii-cab', label: { es: 'Cabina Premium con A/C y Monitor 7"', en: 'Premium A/C Cab + 7" Monitor' }, priceAdd: 8500 },
        { id: 'ag6ii-gps', label: { es: 'Sistema GPS de Mapeo y Rendimiento', en: 'GPS Yield + Mapping System' }, priceAdd: 14500 }
      ],
      tags: ['cosechadora', 'arroz', 'ag6', 'yanmar', 'large', 'commercial'],
      inStock: false,
      isFeatured: false,
      isNew: false
    }
  ],

  // ─── RICE TRANSPLANTERS ───────────────────────────────────────────────────
  transplanters: [
    {
      id: 'YNM-AP4',
      model: 'AP4 (4 hileras)',
      name: 'Yanmar AP4',
      series: 'AP Transplanter',
      category: 'Trasplantadoras de Arroz',
      subcategory: 'AP Series',
      hp: 5.5,
      engineModel: 'Yanmar EF (1-cil. motor a gasolina)',
      engineType: 'Gasolina 1-Cil.',
      rows: 4,
      rowSpacing: '11.8 in (300 mm)',
      plantingDepth: '0.4–1.8 in (10–45 mm)',
      plantingSpeed: '0.6–1.2 mph',
      weight: '290 kg',
      length: '114.2 in (2,900 mm)',
      priceUSD: 12500,
      priceRange: 'Desde $12,500',
      image: 'https://www.yanmar.com/agri/transplanters/ap4/img/ap4-main.jpg',
      imageFallback: 'assets/images/yanmar-ap4.jpg',
      highlights: ['Trasplantadora de 4 hileras para arrocería pequeña-mediana', 'Alta uniformidad de transplante', 'Control de profundidad de siembra ajustable'],
      applications: ['Arrocería de pequeña escala', 'Siembra manual asistida', 'Productores medianos'],
      options: [
        { id: 'ap4-float', label: { es: 'Sistema de flotadores anti-hundimiento', en: 'Anti-Sinking Float System' }, priceAdd: 650 }
      ],
      tags: ['trasplantadora', 'arroz', 'ap4', 'yanmar', '4-hileras'],
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'YNM-AP6R',
      model: 'AP6R (6 hileras)',
      name: 'Yanmar AP6R',
      series: 'AP Transplanter',
      category: 'Trasplantadoras de Arroz',
      subcategory: 'AP Series',
      hp: 8.5,
      engineModel: 'Yanmar L-Series (1-cil. diesel)',
      engineType: 'Diesel 1-Cil.',
      rows: 6,
      rowSpacing: '11.8 in (300 mm)',
      plantingDepth: '0.4–2.0 in (10–50 mm)',
      plantingSpeed: '0.8–1.8 mph',
      weight: '480 kg',
      length: '148.0 in (3,759 mm)',
      priceUSD: 19800,
      priceRange: 'Desde $19,800',
      image: 'https://www.yanmar.com/agri/transplanters/ap6r/img/ap6r-main.jpg',
      imageFallback: 'assets/images/yanmar-ap6r.jpg',
      highlights: ['Trasplantadora de 6 hileras de alta productividad', 'Motor diesel para largas jornadas de trabajo', 'Sistema de marcado de hileras para siembra perfecta'],
      applications: ['Arrocería de mediana a gran escala', 'Cooperativas arroceras', 'Zonas de producción tecnificada'],
      options: [
        { id: 'ap6r-marker', label: { es: 'Sistema de marcado de hileras avanzado', en: 'Advanced Row Marker System' }, priceAdd: 1200 },
        { id: 'ap6r-monitor', label: { es: 'Monitor de siembra digital', en: 'Digital Planting Monitor' }, priceAdd: 1800 }
      ],
      tags: ['trasplantadora', 'arroz', 'ap6', 'yanmar', '6-hileras'],
      inStock: true,
      isFeatured: true,
      isNew: false
    }
  ],

  // ─── METADATA & HELPERS ──────────────────────────────────────────────────

  getAllProducts() {
    return [
      ...this.tractors,
      ...this.harvesters,
      ...this.transplanters
    ];
  },

  getByCategory(category) {
    return this.getAllProducts().filter(p => p.category === category);
  },

  getById(id) {
    return this.getAllProducts().find(p => p.id === id);
  },

  getFeatured() {
    return this.getAllProducts().filter(p => p.isFeatured);
  },

  getInStock() {
    return this.getAllProducts().filter(p => p.inStock);
  },

  categories: [
    'Tractores Compactos',
    'Tractores Utilitarios',
    'Motocultores',
    'Cosechadoras de Arroz',
    'Trasplantadoras de Arroz'
  ]
};

console.log('[TMD Catalog] Yanmar loaded — ' + window.TMD_YANMAR_CATALOG.totalProducts + ' productos');
