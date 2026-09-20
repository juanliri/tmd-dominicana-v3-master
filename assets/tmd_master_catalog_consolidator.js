/**
 * TMD Master Catalog Consolidator
 * Consolidates Core TMD models + all 10 brand catalogs into a unified, rich dataset for React native rendering.
 * Official Brands: JCB, Kubota, LS Tractor, Yanmar, Ammann, LiuGong, IMER, AFEX, Yomel, Orsi, Celli
 * Version: 2026.09.20.3
 */
(function() {
  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function normalizeImage(img, brand) {
    if (img && typeof img === 'string' && img.trim() !== '') {
      if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/assets/')) {
        return img;
      }
      return img.startsWith('/') ? img : '/' + img;
    }
    var brandMap = {
      'JCB': '/assets/machinery/classic_robust_yellow_jcb_3cx_backhoe.jpg',
      'KUBOTA': '/assets/machinery/modern_high_performance_farm_tractor_with.jpg',
      'LS TRACTOR': '/assets/machinery/heavy_blue_agricultural_tractor_ls_mt7.jpg',
      'LSTRACTOR': '/assets/machinery/heavy_blue_agricultural_tractor_ls_mt7.jpg',
      'YANMAR': '/assets/machinery/rugged_utility_farm_tractor_with_heavy.jpg',
      'AMMANN': '/assets/machinery/ammann_heavy_asphalt_tandem_vibratory_roller.jpg',
      'LIUGONG': '/assets/machinery/liugong_922e_hd_heavy_duty_hydraulic.jpg',
      'IMER': '/assets/machinery/imer_group_commercial_concrete_batching_and.jpg',
      'IMER GROUP': '/assets/machinery/imer_group_commercial_concrete_batching_and.jpg',
      'AFEX': '/assets/machinery/brand_new_genuine_yellow_and_black.jpg',
      'YOMEL': '/assets/machinery/modern_high_performance_farm_tractor_with.jpg',
      'ORSI': '/assets/machinery/modern_high_performance_farm_tractor_with.jpg',
      'CELLI': '/assets/machinery/modern_high_performance_farm_tractor_with.jpg'
    };
    return brandMap[(brand || '').toUpperCase()] || '/assets/machinery/classic_robust_yellow_jcb_3cx_backhoe.jpg';
  }

  function buildMasterCatalog() {
    var items = [];
    var seen = new Set();

    function addItem(item) {
      if (!item || !item.name) return;
      var cleanSlug = item.slug || slugify(item.brand + '-' + item.name);
      if (seen.has(cleanSlug) || (item.id && seen.has(item.id))) return;
      seen.add(cleanSlug);
      if (item.id) seen.add(item.id);

      items.push(item);
    }

    // 0. Core Existing TMD Catalog Items
    if (Array.isArray(root.TMD_CORE_CATALOG)) {
      root.TMD_CORE_CATALOG.forEach(function(item) {
        if (!item.badge) {
          item.badge = item.inStock ? '🟢 Km 22 Entrega Inmediata' : '🔵 Bajo Pedido';
        }
        item.stockState = item.inStock ? 'stock' : 'order';
        addItem(item);
      });
    }

    // 1. JCB Catalog (Machines & Attachments)
    var jcbCat = root.TMD_JCB_CATALOG;
    if (jcbCat) {
      if (Array.isArray(jcbCat.machines)) {
        jcbCat.machines.forEach(function(m) {
          var price = Number(m.priceUSD) || 75000;
          var specsList = [];
          if (m.specs && typeof m.specs === 'object') {
            Object.keys(m.specs).forEach(function(k) {
              specsList.push({ label: k, value: String(m.specs[k]) });
            });
          }
          if (specsList.length === 0) {
            specsList.push({ label: 'Origen', value: 'Reino Unido / Brasil' });
            specsList.push({ label: 'Respaldo', value: 'TMD Km 22' });
          }

          var stockState = m.stockState || (price > 120000 ? 'transit' : 'stock');
          var badgeText = stockState === 'order' ? '🔵 Bajo Pedido' : stockState === 'transit' ? '🟡 En Tránsito' : '🟢 Km 22 Entrega Inmediata';

          addItem({
            id: m.id || ('jcb-' + slugify(m.model || m.title)),
            legacyWpId: m.sku || m.id || m.model,
            slug: slugify('jcb-' + (m.model || m.title)),
            name: m.title || ('JCB ' + m.model),
            brand: 'JCB',
            category: 'construccion',
            shortDescription: m.tagline || 'Maquinaria pesada JCB con motor Dieselmax y soporte oficial en República Dominicana.',
            fullDescription: m.description || m.tagline || 'Maquinaria pesada JCB con motor Dieselmax, tropicalizada para alta temperatura y servicio continuo.',
            heroImage: normalizeImage(m.heroImage || m.image, 'JCB'),
            additionalImages: [],
            badge: badgeText,
            stockState: stockState,
            specs: specsList,
            applications: ['Movimiento de tierra', 'Construcción civil', 'Minería'],
            inStock: stockState !== 'order',
            warrantyYears: 2,
            pdfBrochureUrl: m.brochureUrl || '',
            priceUSD: price,
            dailyRate: Math.round(price * 0.0036),
            monthlyRate: Math.round(price * 0.0036 * 30 * 0.70)
          });
        });
      }

      if (Array.isArray(jcbCat.attachments)) {
        jcbCat.attachments.forEach(function(a) {
          var price = Number(a.priceUSD) || 6500;
          var specsList = [];
          if (a.specs && typeof a.specs === 'object') {
            Object.keys(a.specs).forEach(function(k) {
              specsList.push({ label: k, value: String(a.specs[k]) });
            });
          }

          addItem({
            id: a.id || ('jcb-att-' + slugify(a.model || a.title)),
            legacyWpId: a.sku || a.id || a.model,
            slug: slugify('jcb-implemento-' + (a.model || a.title)),
            name: a.title || ('Implemento JCB ' + a.model),
            brand: 'JCB',
            category: 'construccion',
            shortDescription: a.tagline || 'Aditamento certificado JCB para acople rápido y servicio continuo.',
            fullDescription: a.description || a.tagline || 'Implemento oficial JCB distribuido por Tecnomaquinarias Diesel en Santo Domingo.',
            heroImage: normalizeImage(a.image || a.heroImage, 'JCB'),
            additionalImages: [],
            badge: '🟢 Km 22 Entrega Inmediata',
            stockState: 'stock',
            specs: specsList,
            applications: ['Construcción civil', 'Demolición', 'Carga'],
            inStock: true,
            warrantyYears: 1,
            pdfBrochureUrl: a.brochureUrl || '',
            priceUSD: price,
            dailyRate: Math.round(price * 0.008),
            monthlyRate: Math.round(price * 0.008 * 30 * 0.70)
          });
        });
      }
    }

    // 2. Multibrand Catalogs
    var catalogDefs = [
      { key: 'TMD_KUBOTA_CATALOG', brand: 'Kubota', category: 'agricolas' },
      { key: 'TMD_LSTRACTOR_CATALOG', brand: 'LS Tractor', category: 'agricolas' },
      { key: 'TMD_YANMAR_CATALOG', brand: 'Yanmar', category: 'agricolas' },
      { key: 'TMD_AMMANN_CATALOG', brand: 'Ammann', category: 'construccion' },
      { key: 'TMD_LIUGONG_CATALOG', brand: 'LiuGong', category: 'construccion' },
      { key: 'TMD_IMER_CATALOG', brand: 'IMER Group', category: 'industriales' },
      { key: 'TMD_AFEX_CATALOG', brand: 'AFEX', category: 'industriales' },
      { key: 'TMD_IMPLEMENTS_CATALOG', brand: 'Yomel/Orsi/Celli', category: 'agricolas' }
    ];

    catalogDefs.forEach(function(def) {
      var cat = root[def.key];
      if (!cat) return;

      var prods = [];
      if (typeof cat.getAllProducts === 'function') {
        prods = cat.getAllProducts();
      } else if (Array.isArray(cat.products)) {
        prods = cat.products;
      } else if (Array.isArray(cat.machines)) {
        prods = cat.machines;
      }

      prods.forEach(function(p) {
        var price = Number(p.priceUSD) || 45000;
        var pBrand = p.brand || def.brand;
        var specsList = [];
        if (p.specs && typeof p.specs === 'object') {
          Object.keys(p.specs).forEach(function(k) {
            specsList.push({ label: k, value: String(p.specs[k]) });
          });
        }
        if (specsList.length === 0) {
          specsList.push({ label: 'Garantía Oficial', value: '1-2 Años TMD' });
          specsList.push({ label: 'Taller Central', value: 'Km 22 Pedro Brand' });
        }

        var stockState = p.stockState || (price > 95000 ? 'transit' : 'stock');
        var badgeText = stockState === 'order' ? '🔵 Bajo Pedido' : stockState === 'transit' ? '🟡 En Tránsito' : '🟢 Km 22 Entrega Inmediata';

        addItem({
          id: p.id || (slugify(pBrand) + '-' + slugify(p.model || p.name)),
          legacyWpId: p.sku || p.id,
          slug: slugify(pBrand + '-' + (p.model || p.name || p.id)),
          name: p.name || (pBrand + ' ' + (p.model || '')),
          brand: pBrand,
          category: def.category,
          shortDescription: p.tagline || p.description || ('Equipo ' + pBrand + ' de alto rendimiento con garantía oficial TMD en República Dominicana.'),
          fullDescription: p.fullDescription || p.description || ('Equipo ' + pBrand + ' distribuido por Tecnomaquinarias Diesel en Santo Domingo.'),
          heroImage: normalizeImage(p.image || p.heroImage, pBrand),
          additionalImages: [],
          badge: badgeText,
          stockState: stockState,
          specs: specsList,
          applications: [def.category === 'agricolas' ? 'Agroindustria y siembra' : 'Infraestructura y canteras'],
          inStock: stockState !== 'order',
          warrantyYears: p.warrantyYears || 2,
          pdfBrochureUrl: p.brochureUrl || '',
          priceUSD: price,
          dailyRate: Math.round(price * 0.0036),
          monthlyRate: Math.round(price * 0.0036 * 30 * 0.70)
        });
      });
    });

    return items;
  }

  // Expose globally
  root.tmdBuildMasterCatalog = buildMasterCatalog;
  root.tmdMasterCatalog = buildMasterCatalog();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildMasterCatalog: buildMasterCatalog };
  }
  console.log('[TMD Master Catalog Consolidator] Initialized with ' + root.tmdMasterCatalog.length + ' products.');
})();
