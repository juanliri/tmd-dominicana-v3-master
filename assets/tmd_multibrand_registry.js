/**
 * TMD DOMINICANA — MULTIBRAND REGISTRY v1.0
 * Tecnomaquinarias Diesel S.R.L.
 * 
 * Master index of all partner brands, their sector assignments,
 * product categories, and catalog data references.
 * 
 * Used by: tmd_quote_builder.js, tmd_stitch_infusion.js
 */

window.TMD_BRAND_REGISTRY = {

  version: '1.0.0',
  lastUpdated: '2026-09-20',

  // ─── SECTOR DEFINITIONS ───────────────────────────────────────────────────
  sectors: [
    {
      id: 'CONSTRUCTION',
      label: { es: 'Construcción', en: 'Construction' },
      icon: '🏗️',
      color: '#F97316',          // TMD Construction Orange
      brands: ['JCB', 'LIUGONG'],
      description: { es: 'Maquinaria pesada para obra civil, minería e infraestructura', en: 'Heavy machinery for civil works, mining and infrastructure' }
    },
    {
      id: 'AGRICULTURE',
      label: { es: 'Agro / Agrícola', en: 'Agriculture' },
      icon: '🌾',
      color: '#22C55E',          // Green
      brands: ['KUBOTA', 'LSTRACTOR', 'YANMAR', 'YOMEL', 'ORSI', 'CELLI'],
      description: { es: 'Tractores, cosechadoras e implementos agrícolas', en: 'Tractors, harvesters and agricultural implements' }
    },
    {
      id: 'COMPACTION',
      label: { es: 'Compactación', en: 'Compaction' },
      icon: '🔩',
      color: '#6366F1',          // Indigo
      brands: ['AMMANN'],
      description: { es: 'Rodillos, placas y apisonadores para compactación de suelos', en: 'Rollers, plates and rammers for soil compaction' }
    },
    {
      id: 'CONCRETE',
      label: { es: 'Concreto', en: 'Concrete' },
      icon: '🧱',
      color: '#64748B',          // Slate
      brands: ['IMER'],
      description: { es: 'Plantas de concreto, mezcladoras y bombas', en: 'Concrete plants, mixers and pumps' }
    },
    {
      id: 'SAFETY',
      label: { es: 'Seguridad Industrial', en: 'Industrial Safety' },
      icon: '🛡️',
      color: '#EF4444',          // Red
      brands: ['AFEX'],
      description: { es: 'Sistemas de supresión de incendios para maquinaria pesada', en: 'Fire suppression systems for heavy equipment' }
    }
  ],

  // ─── BRAND DEFINITIONS ────────────────────────────────────────────────────
  brands: {
    JCB: {
      id: 'JCB',
      name: 'JCB',
      fullName: 'JCB Ltd.',
      tagline: { es: 'Líderes mundiales en maquinaria de construcción', en: 'World leaders in construction machinery' },
      founded: 1945,
      origin: 'Reino Unido',
      color: '#FFD700',          // JCB Yellow
      accentColor: '#1A1A1A',
      logoUrl: 'assets/logos/jcb-logo.png',
      logoAlt: 'JCB Logo',
      sector: 'CONSTRUCTION',
      catalogFile: 'tmd_jcb_catalog_data.js',
      catalogKey: 'TMD_JCB_CATALOG',
      phase: 1,
      active: true,
      warranty: { es: '2 años / 2,000 horas', en: '2 years / 2,000 hours' },
      website: 'https://www.jcb.com/en-US',
      categories: [
        'Mini Excavadoras', 'Excavadoras de Cadena', 'Excavadoras de Rueda',
        'Retroexcavadoras', 'Cargadores de Rueda', 'Compact Track Loaders',
        'Manejadores Telescópicos', 'Plataformas de Trabajo Aéreo',
        'Compactación', 'Volquetes', 'Generadores', 'Implementos'
      ]
    },
    KUBOTA: {
      id: 'KUBOTA',
      name: 'Kubota',
      fullName: 'Kubota Corporation',
      tagline: { es: 'Ingeniería japonesa para agricultura y construcción', en: 'Japanese engineering for agriculture and construction' },
      founded: 1890,
      origin: 'Japón',
      color: '#E87722',          // Kubota Orange
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/kubota-logo.png',
      logoAlt: 'Kubota Logo',
      sector: 'AGRICULTURE',
      catalogFile: 'tmd_kubota_catalog_data.js',
      catalogKey: 'TMD_KUBOTA_CATALOG',
      phase: 1,
      active: true,
      warranty: { es: '2 años / 2,000 horas', en: '2 years / 2,000 hours' },
      website: 'https://www.kubota.com',
      categories: [
        'Tractores Sub-Compactos', 'Tractores Compactos', 'Tractores Utilitarios',
        'Mini Excavadoras', 'Compact Track Loaders', 'Cosechadoras', 'Implementos'
      ]
    },
    LSTRACTOR: {
      id: 'LSTRACTOR',
      name: 'LS Tractor',
      fullName: 'LS Mtron Ltd.',
      tagline: { es: 'Tractores de alta ingeniería para el trabajo duro', en: 'High-engineering tractors for hard work' },
      founded: 1977,
      origin: 'Corea del Sur',
      color: '#1565C0',          // LS Blue
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/ls-tractor-logo.png',
      logoAlt: 'LS Tractor Logo',
      sector: 'AGRICULTURE',
      catalogFile: 'tmd_ls_tractor_catalog_data.js',
      catalogKey: 'TMD_LSTRACTOR_CATALOG',
      phase: 1,
      active: true,
      warranty: { es: '2 años / sin límite de horas', en: '2 years / unlimited hours' },
      website: 'https://lstractorusa.com',
      categories: [
        'Tractores Sub-Compactos', 'Tractores Compactos', 'Tractores Utilitarios'
      ]
    },
    YANMAR: {
      id: 'YANMAR',
      name: 'Yanmar',
      fullName: 'Yanmar Co., Ltd.',
      tagline: { es: 'Precisión japonesa para la agricultura moderna', en: 'Japanese precision for modern agriculture' },
      founded: 1912,
      origin: 'Japón',
      color: '#CC2222',          // Yanmar Red
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/yanmar-logo.png',
      logoAlt: 'Yanmar Logo',
      sector: 'AGRICULTURE',
      catalogFile: 'tmd_yanmar_catalog_data.js',
      catalogKey: 'TMD_YANMAR_CATALOG',
      phase: 1,
      active: true,
      warranty: { es: '2 años', en: '2 years' },
      website: 'https://www.yanmar.com',
      categories: [
        'Tractores Compactos', 'Tractores Utilitarios', 'Cosechadoras de Arroz',
        'Trasplantadoras de Arroz'
      ]
    },
    IMER: {
      id: 'IMER',
      name: 'IMER Group',
      fullName: 'IMER International SpA',
      tagline: { es: 'Soluciones premium para producción de concreto', en: 'Premium solutions for concrete production' },
      founded: 1962,
      origin: 'Italia',
      color: '#1E40AF',          // IMER Blue
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/imer-logo.png',
      logoAlt: 'IMER Group Logo',
      sector: 'CONCRETE',
      catalogFile: 'tmd_imer_catalog_data.js',
      catalogKey: 'TMD_IMER_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '1 año', en: '1 year' },
      website: 'https://www.imer.it',
      categories: ['Plantas de Concreto', 'Mezcladoras', 'Bombas de Concreto']
    },
    AMMANN: {
      id: 'AMMANN',
      name: 'Ammann',
      fullName: 'Ammann Group',
      tagline: { es: 'Tecnología de compactación inteligente', en: 'Intelligent compaction technology' },
      founded: 1869,
      origin: 'Suiza',
      color: '#DC2626',          // Ammann Red
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/ammann-logo.png',
      logoAlt: 'Ammann Logo',
      sector: 'COMPACTION',
      catalogFile: 'tmd_ammann_catalog_data.js',
      catalogKey: 'TMD_AMMANN_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '2 años', en: '2 years' },
      website: 'https://www.ammann.com',
      categories: ['Rodillos de Suelo', 'Rodillos de Asfalto', 'Placas Vibratorias', 'Apisonadores']
    },
    LIUGONG: {
      id: 'LIUGONG',
      name: 'LiuGong',
      fullName: 'Guangxi LiuGong Machinery Co., Ltd.',
      tagline: { es: 'Maquinaria pesada de clase mundial', en: 'World-class heavy machinery' },
      founded: 1958,
      origin: 'China',
      color: '#D97706',          // LiuGong Yellow
      accentColor: '#1A1A1A',
      logoUrl: 'assets/logos/liugong-logo.png',
      logoAlt: 'LiuGong Logo',
      sector: 'CONSTRUCTION',
      catalogFile: 'tmd_liugong_catalog_data.js',
      catalogKey: 'TMD_LIUGONG_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '2 años / 2,000 horas', en: '2 years / 2,000 hours' },
      website: 'https://www.liugong.com',
      categories: [
        'Cargadores de Rueda', 'Mini Excavadoras', 'Excavadoras de Cadena',
        'Motoniveladoras', 'Bulldozers'
      ]
    },
    AFEX: {
      id: 'AFEX',
      name: 'AFEX',
      fullName: 'AFEX Fire Suppression Systems',
      tagline: { es: 'Protección contra incendios para maquinaria pesada', en: 'Fire protection for heavy equipment' },
      founded: 1975,
      origin: 'EE.UU.',
      color: '#DC2626',
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/afex-logo.png',
      logoAlt: 'AFEX Logo',
      sector: 'SAFETY',
      catalogFile: 'tmd_afex_catalog_data.js',
      catalogKey: 'TMD_AFEX_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '5 años (componentes)', en: '5 years (components)' },
      website: 'https://www.afex.com',
      categories: ['Sistemas de Supresión de Incendios']
    },
    YOMEL: {
      id: 'YOMEL',
      name: 'Yomel',
      fullName: 'Yomel S.A.',
      tagline: { es: 'Implementos agrícolas de alta durabilidad', en: 'High-durability agricultural implements' },
      founded: 1980,
      origin: 'Argentina',
      color: '#16A34A',
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/yomel-logo.png',
      logoAlt: 'Yomel Logo',
      sector: 'AGRICULTURE',
      catalogFile: 'tmd_yomel_orsi_celli_data.js',
      catalogKey: 'TMD_IMPLEMENTS_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '1 año', en: '1 year' },
      website: 'https://www.yomel.com.ar',
      categories: ['Empacadoras', 'Segadoras y Desbrozadoras', 'Rastrillos Enhenadores', 'Distribuidores de Fertilizantes']
    },
    ORSI: {
      id: 'ORSI',
      name: 'Orsi',
      fullName: 'Orsi Group S.r.l.',
      tagline: { es: 'Brazos desbrozadores y trituradoras forestales italianas', en: 'Italian reach mowers and forestry shredders' },
      founded: 1979,
      origin: 'Italia',
      color: '#15803D',
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/orsi-logo.png',
      logoAlt: 'Orsi Logo',
      sector: 'AGRICULTURE',
      catalogFile: 'tmd_yomel_orsi_celli_data.js',
      catalogKey: 'TMD_IMPLEMENTS_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '1 año', en: '1 year' },
      website: 'https://www.orsigroup.it',
      categories: ['Segadoras y Desbrozadoras']
    },
    CELLI: {
      id: 'CELLI',
      name: 'Celli',
      fullName: 'Celli S.p.A.',
      tagline: { es: 'Líderes mundiales en preparación profesional de suelo', en: 'World leaders in professional soil tillage' },
      founded: 1955,
      origin: 'Italia',
      color: '#059669',
      accentColor: '#FFFFFF',
      logoUrl: 'assets/logos/celli-logo.png',
      logoAlt: 'Celli Logo',
      sector: 'AGRICULTURE',
      catalogFile: 'tmd_yomel_orsi_celli_data.js',
      catalogKey: 'TMD_IMPLEMENTS_CATALOG',
      phase: 2,
      active: true,
      warranty: { es: '1 año', en: '1 year' },
      website: 'https://www.celli.it',
      categories: ['Rotocultivadores y Fresadoras']
    }
  },

  // ─── HELPER METHODS ───────────────────────────────────────────────────────

  /**
   * Returns all active brands for Phase 1 display
   */
  getActiveBrands() {
    return Object.values(this.brands).filter(b => b.active);
  },

  /**
   * Returns brands for a given sector
   */
  getBrandsBySector(sectorId) {
    const sector = this.sectors.find(s => s.id === sectorId);
    if (!sector) return [];
    return sector.brands.map(id => this.brands[id]).filter(Boolean);
  },

  /**
   * Returns brands that are currently active (Phase 1)
   */
  getPhase1Brands() {
    return Object.values(this.brands).filter(b => b.phase === 1 && b.active);
  },

  /**
   * Returns the catalog data window object for a brand
   */
  getCatalogData(brandId) {
    const brand = this.brands[brandId];
    if (!brand) return null;
    return window[brand.catalogKey] || null;
  },

  /**
   * Searches across all active brand catalogs.
   * Supports both legacy (machines/tractors arrays) and new getAllProducts() API.
   */
  globalSearch(query) {
    const q = query.toLowerCase();
    const results = [];
    this.getActiveBrands().forEach(brand => {
      const catalog = this.getCatalogData(brand.id);
      if (!catalog) return;

      // Prefer getAllProducts() (new catalog API), fall back to legacy arrays
      let items = [];
      if (typeof catalog.getAllProducts === 'function') {
        items = catalog.getAllProducts();
      } else {
        items = [
          ...(catalog.machines || []),
          ...(catalog.attachments || []),
          ...(catalog.tractors || []),
          ...(catalog.implements || []),
          ...(catalog.excavators || []),
          ...(catalog.ctls || []),
          ...(catalog.harvesters || []),
          ...(catalog.transplanters || [])
        ];
      }

      items.forEach(item => {
        if (
          (item.model || '').toLowerCase().includes(q) ||
          (item.name || '').toLowerCase().includes(q) ||
          (item.series || '').toLowerCase().includes(q) ||
          (item.category || '').toLowerCase().includes(q) ||
          (item.tags || []).some(t => t.toLowerCase().includes(q))
        ) {
          results.push({ brand: brand.id, brandName: brand.name, ...item });
        }
      });
    });
    return results;
  }
};

console.log('[TMD Registry] Multibrand registry loaded — v' + window.TMD_BRAND_REGISTRY.version);
