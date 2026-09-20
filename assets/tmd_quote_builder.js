/**
 * TMD DOMINICANA — UNIVERSAL QUOTE BUILDER ENGINE v1.0
 * Tecnomaquinarias Diesel S.R.L.
 *
 * Powers the Multibrand "Configurar & Cotizar" flow.
 * Inspired by Bobcat Build & Quote — adapted for TMD's 10-brand portfolio.
 *
 * Dependencies:
 *   - tmd_multibrand_registry.js  (must load first)
 *   - tmd_jcb_catalog_data.js
 *   - tmd_kubota_catalog_data.js
 *   - tmd_ls_tractor_catalog_data.js
 *   - tmd_yanmar_catalog_data.js
 *   - tmd_brochures_hub.js        (for PDF export)
 *   - tmd_i18n_core.js            (for bilingual labels)
 */

(function () {
  'use strict';

  // ── DOP EXCHANGE RATE (updated monthly) ──────────────────────────────────
  const DOP_RATE = 59.12;

  // ── FINANCING DEFAULTS ───────────────────────────────────────────────────
  const FINANCING = {
    ratePercent: 10,     // Annual interest rate
    termMonths: 60,      // 5-year standard term
    downPercent: 20      // 20% down payment
  };

  // ── STATE ────────────────────────────────────────────────────────────────
  let state = {
    step: 1,
    sector: null,
    brand: null,
    category: null,
    model: null,
    selectedOptions: {},
    basePrice: 0,
    optionsTotal: 0,
    grandTotal: 0,
    currency: 'USD',
    lang: 'es',
    showFinancing: true
  };

  // ── HELPERS ──────────────────────────────────────────────────────────────

  function formatCurrency(usd) {
    if (state.currency === 'DOP') {
      return 'RD$' + (usd * DOP_RATE).toLocaleString('es-DO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return '$' + usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' USD';
  }

  function calcMonthlyPayment(totalPrice) {
    const down = totalPrice * (FINANCING.downPercent / 100);
    const loan = totalPrice - down;
    const monthlyRate = (FINANCING.ratePercent / 100) / 12;
    const n = FINANCING.termMonths;
    if (monthlyRate === 0) return loan / n;
    const payment = loan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    return Math.round(payment);
  }

  function recalcTotals() {
    if (!state.model) return;
    state.basePrice = state.model.priceUSD || 0;
    state.optionsTotal = Object.values(state.selectedOptions).reduce((sum, opt) => sum + (opt.priceAdd || 0), 0);
    state.grandTotal = state.basePrice + state.optionsTotal;
  }

  function getLabel(obj) {
    if (typeof obj === 'string') return obj;
    return obj ? (obj[state.lang] || obj['es'] || '') : '';
  }

  function getCatalogItems(brandId) {
    const reg = window.TMD_BRAND_REGISTRY;
    if (!reg) return [];
    const catalog = reg.getCatalogData(brandId);
    if (!catalog) return [];
    const all = typeof catalog.getAllProducts === 'function' ? catalog.getAllProducts() : [];
    return all;
  }

  // ── MAIN API — window.TMDQuoteBuilder ───────────────────────────────────

  window.TMDQuoteBuilder = {

    // ── STEP NAVIGATION ───────────────────────────────────────────────────

    goToStep(n) {
      state.step = Math.max(1, Math.min(5, n));
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ── STEP 1: SELECT SECTOR ─────────────────────────────────────────────

    selectSector(sectorId) {
      state.sector = sectorId;
      state.brand = null;
      state.category = null;
      state.model = null;
      state.selectedOptions = {};
      this.goToStep(2);
    },

    // ── STEP 2: SELECT BRAND ──────────────────────────────────────────────

    selectBrand(brandId) {
      const reg = window.TMD_BRAND_REGISTRY;
      state.brand = reg ? reg.brands[brandId] : null;
      state.category = null;
      state.model = null;
      state.selectedOptions = {};
      this.goToStep(3);
    },

    // ── STEP 3: SELECT CATEGORY ───────────────────────────────────────────

    selectCategory(category) {
      state.category = category;
      state.model = null;
      state.selectedOptions = {};
      this.goToStep(4);
    },

    // ── STEP 4: SELECT MODEL ──────────────────────────────────────────────

    selectModel(modelId) {
      const items = getCatalogItems(state.brand.id);
      state.model = items.find(p => p.id === modelId) || null;
      state.selectedOptions = {};
      if (state.model) {
        recalcTotals();
        this.goToStep(5);
      }
    },

    // ── STEP 5: TOGGLE OPTION ─────────────────────────────────────────────

    toggleOption(optionId) {
      if (!state.model || !state.model.options) return;
      const opt = state.model.options.find(o => o.id === optionId);
      if (!opt) return;

      if (state.selectedOptions[optionId]) {
        delete state.selectedOptions[optionId];
      } else {
        state.selectedOptions[optionId] = opt;
      }
      recalcTotals();
      this._refreshQuotePanel();
    },

    // ── CURRENCY TOGGLE ───────────────────────────────────────────────────

    setCurrency(cur) {
      state.currency = cur;
      this._refreshQuotePanel();
    },

    // ── LANGUAGE ─────────────────────────────────────────────────────────

    setLang(lang) {
      state.lang = lang;
      this.render();
    },

    // ── FINANCING TOGGLE ──────────────────────────────────────────────────

    toggleFinancing() {
      state.showFinancing = !state.showFinancing;
      this._refreshQuotePanel();
    },

    // ── QUOTE EXPORT ──────────────────────────────────────────────────────

    generateQuoteData() {
      if (!state.model) return null;
      const now = new Date();
      return {
        quoteId: 'TMD-' + now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + Math.floor(Math.random() * 9000 + 1000),
        date: now.toLocaleDateString('es-DO'),
        brand: state.brand ? state.brand.name : '',
        brandId: state.brand ? state.brand.id : '',
        sector: state.sector,
        category: state.category,
        model: state.model.model,
        modelName: state.model.name,
        series: state.model.series,
        basePrice: state.basePrice,
        options: Object.values(state.selectedOptions).map(o => ({
          label: getLabel(o.label),
          priceAdd: o.priceAdd
        })),
        optionsTotal: state.optionsTotal,
        grandTotal: state.grandTotal,
        grandTotalDOP: Math.round(state.grandTotal * DOP_RATE),
        monthlyPayment: calcMonthlyPayment(state.grandTotal),
        financing: FINANCING,
        currency: state.currency,
        lang: state.lang,
        contact: {
          phone: '(809) 826-2222',
          whatsapp: '18098262222',
          email: 'ventas@tmd.com.do',
          address: 'Autopista Duarte Km. 22, La Guayiga, Santo Domingo Oeste'
        }
      };
    },

    exportPDF() {
      const quote = this.generateQuoteData();
      if (!quote) { alert('Por favor seleccione un modelo primero.'); return; }

      // Use existing brochure hub if available
      if (typeof window.tmdGenerateQuotePDF === 'function') {
        window.tmdGenerateQuotePDF(quote);
        return;
      }

      // Fallback: print-based PDF
      const printWindow = window.open('', '_blank');
      printWindow.document.write(this._buildPrintHTML(quote));
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    },

    sendWhatsApp() {
      const quote = this.generateQuoteData();
      if (!quote) return;
      const opts = quote.options.map(o => `• ${o.label}: +${formatCurrency(o.priceAdd)}`).join('\n');
      const msg = [
        '🏗️ *Solicitud de Cotización TMD*',
        '',
        `*Marca:* ${quote.brand}`,
        `*Modelo:* ${quote.modelName}`,
        `*Serie:* ${quote.series}`,
        '',
        '*Opciones seleccionadas:*',
        opts || '(Sin opciones adicionales)',
        '',
        `*Precio base:* ${formatCurrency(quote.basePrice)}`,
        `*Opciones:* +${formatCurrency(quote.optionsTotal)}`,
        `*TOTAL:* ${formatCurrency(quote.grandTotal)}`,
        '',
        `*N° Cotización:* ${quote.quoteId}`,
        `*Fecha:* ${quote.date}`,
        '',
        'Por favor contáctame para finalizar los detalles.'
      ].join('\n');
      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/${quote.contact.whatsapp}?text=${encoded}`, '_blank');
    },

    sendEmail() {
      const quote = this.generateQuoteData();
      if (!quote) return;
      const subject = encodeURIComponent(`Cotización ${quote.brand} ${quote.model} — ${quote.quoteId}`);
      const opts = quote.options.map(o => `  • ${o.label}: +${formatCurrency(o.priceAdd)}`).join('\n');
      const body = encodeURIComponent([
        `Estimado equipo TMD,`,
        ``,
        `Solicito cotización formal para:`,
        `  Marca: ${quote.brand}`,
        `  Modelo: ${quote.modelName}`,
        `  Serie: ${quote.series}`,
        ``,
        `Opciones seleccionadas:`,
        opts || `  (Sin opciones adicionales)`,
        ``,
        `  Precio base: ${formatCurrency(quote.basePrice)}`,
        `  Opciones:    +${formatCurrency(quote.optionsTotal)}`,
        `  TOTAL:       ${formatCurrency(quote.grandTotal)}`,
        ``,
        `N° Cotización: ${quote.quoteId}`,
        `Fecha: ${quote.date}`,
        ``,
        `Quedo en espera de su confirmación.`
      ].join('\n'));
      window.location.href = `mailto:ventas@tmd.com.do?subject=${subject}&body=${body}`;
    },

    // ── RENDER PIPELINE ───────────────────────────────────────────────────

    render() {
      const container = document.getElementById('tmd-quote-builder');
      if (!container) return;
      container.innerHTML = this._buildStepIndicator() + this._buildCurrentStep();
    },

    _buildStepIndicator() {
      const steps = [
        { n: 1, label: state.lang === 'es' ? 'Sector' : 'Sector' },
        { n: 2, label: state.lang === 'es' ? 'Marca' : 'Brand' },
        { n: 3, label: state.lang === 'es' ? 'Categoría' : 'Category' },
        { n: 4, label: state.lang === 'es' ? 'Modelo' : 'Model' },
        { n: 5, label: state.lang === 'es' ? 'Cotización' : 'Quote' }
      ];
      return `
        <div class="qb-steps">
          ${steps.map(s => `
            <div class="qb-step ${s.n === state.step ? 'active' : ''} ${s.n < state.step ? 'done' : ''}" 
                 ${s.n < state.step ? `onclick="TMDQuoteBuilder.goToStep(${s.n})"` : ''}>
              <div class="qb-step-num">${s.n < state.step ? '✓' : s.n}</div>
              <div class="qb-step-label">${s.label}</div>
            </div>
          `).join('<div class="qb-step-line"></div>')}
        </div>`;
    },

    _buildCurrentStep() {
      switch (state.step) {
        case 1: return this._buildStep1();
        case 2: return this._buildStep2();
        case 3: return this._buildStep3();
        case 4: return this._buildStep4();
        case 5: return this._buildStep5();
        default: return '';
      }
    },

    // STEP 1 — SECTOR SELECTION
    _buildStep1() {
      const reg = window.TMD_BRAND_REGISTRY;
      if (!reg) return '<p>Error: Registry no disponible.</p>';
      const sectors = reg.sectors;
      return `
        <div class="qb-step-content">
          <h2 class="qb-step-title">${state.lang === 'es' ? '¿En qué sector trabaja?' : 'What sector do you work in?'}</h2>
          <p class="qb-step-sub">${state.lang === 'es' ? 'Seleccione el área de aplicación de su equipo' : 'Select your equipment application area'}</p>
          <div class="qb-grid qb-grid-sectors">
            ${sectors.map(s => `
              <button class="qb-card qb-sector-card" onclick="TMDQuoteBuilder.selectSector('${s.id}')" 
                      style="--brand-color: ${s.color}">
                <span class="qb-card-icon">${s.icon}</span>
                <span class="qb-card-name">${getLabel(s.label)}</span>
                <span class="qb-card-desc">${getLabel(s.description)}</span>
                <span class="qb-card-arrow">→</span>
              </button>
            `).join('')}
          </div>
        </div>`;
    },

    // STEP 2 — BRAND SELECTION
    _buildStep2() {
      const reg = window.TMD_BRAND_REGISTRY;
      if (!reg || !state.sector) return '';
      const brands = reg.getBrandsBySector(state.sector).filter(b => b.active);
      const sectorObj = reg.sectors.find(s => s.id === state.sector);
      return `
        <div class="qb-step-content">
          <button class="qb-back" onclick="TMDQuoteBuilder.goToStep(1)">← ${state.lang === 'es' ? 'Cambiar sector' : 'Change sector'}</button>
          <div class="qb-breadcrumb">${getLabel(sectorObj ? sectorObj.label : {})} → <strong>${state.lang === 'es' ? 'Seleccione marca' : 'Select brand'}</strong></div>
          <h2 class="qb-step-title">${state.lang === 'es' ? 'Elija su marca de equipo' : 'Choose your equipment brand'}</h2>
          <div class="qb-grid qb-grid-brands">
            ${brands.length ? brands.map(b => `
              <button class="qb-card qb-brand-card" onclick="TMDQuoteBuilder.selectBrand('${b.id}')"
                      style="--brand-color: ${b.color}">
                <div class="qb-brand-logo-wrap">
                  <img src="${b.logoUrl}" alt="${b.logoAlt}" class="qb-brand-logo"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                  <span class="qb-brand-name-fallback" style="display:none">${b.name}</span>
                </div>
                <div class="qb-brand-meta">
                  <span class="qb-brand-fullname">${b.name}</span>
                  <span class="qb-brand-origin">${b.origin} · Est. ${b.founded}</span>
                  <span class="qb-brand-tagline">${getLabel(b.tagline)}</span>
                </div>
                <span class="qb-card-arrow">→</span>
              </button>
            `).join('') : `
              <div class="qb-empty">
                <p>${state.lang === 'es' ? 'Marcas de este sector próximamente disponibles.' : 'Brands for this sector coming soon.'}</p>
                <button class="qb-back" onclick="TMDQuoteBuilder.goToStep(1)">← ${state.lang === 'es' ? 'Volver' : 'Back'}</button>
              </div>
            `}
          </div>
        </div>`;
    },

    // STEP 3 — CATEGORY SELECTION
    _buildStep3() {
      if (!state.brand) return '';
      const items = getCatalogItems(state.brand.id);
      const categories = [...new Set(items.map(p => p.category))].filter(Boolean);
      return `
        <div class="qb-step-content">
          <button class="qb-back" onclick="TMDQuoteBuilder.goToStep(2)">← ${state.lang === 'es' ? 'Cambiar marca' : 'Change brand'}</button>
          <div class="qb-breadcrumb">${state.brand.name} → <strong>${state.lang === 'es' ? 'Seleccione categoría' : 'Select category'}</strong></div>
          <h2 class="qb-step-title">${state.lang === 'es' ? 'Seleccione el tipo de equipo' : 'Select equipment type'}</h2>
          <div class="qb-grid qb-grid-cats">
            ${categories.map(cat => {
              const count = items.filter(p => p.category === cat).length;
              const first = items.find(p => p.category === cat);
              return `
                <button class="qb-card qb-cat-card" onclick="TMDQuoteBuilder.selectCategory('${cat}')"
                        style="--brand-color: ${state.brand.color}">
                  <span class="qb-cat-name">${cat}</span>
                  <span class="qb-cat-count">${count} modelo${count !== 1 ? 's' : ''}</span>
                  ${first && first.image ? `<img src="${first.image}" alt="${cat}" class="qb-cat-thumb" onerror="this.style.display='none'">` : ''}
                  <span class="qb-card-arrow">→</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>`;
    },

    // STEP 4 — MODEL SELECTION
    _buildStep4() {
      if (!state.brand || !state.category) return '';
      const items = getCatalogItems(state.brand.id).filter(p => p.category === state.category);
      return `
        <div class="qb-step-content">
          <button class="qb-back" onclick="TMDQuoteBuilder.goToStep(3)">← ${state.lang === 'es' ? 'Cambiar categoría' : 'Change category'}</button>
          <div class="qb-breadcrumb">${state.brand.name} → ${state.category} → <strong>${state.lang === 'es' ? 'Seleccione modelo' : 'Select model'}</strong></div>
          <h2 class="qb-step-title">${state.lang === 'es' ? 'Seleccione el modelo base' : 'Select base model'}</h2>
          <div class="qb-model-grid">
            ${items.map(m => `
              <div class="qb-model-card ${!m.inStock ? 'out-of-stock' : ''}">
                <div class="qb-model-img-wrap">
                  <img src="${m.image || m.imageFallback || ''}" alt="${m.name}" class="qb-model-img"
                       onerror="this.src='assets/images/tmd-placeholder.jpg'">
                  ${m.isFeatured ? `<span class="qb-badge-featured">${state.lang === 'es' ? 'Destacado' : 'Featured'}</span>` : ''}
                  ${m.isNew ? `<span class="qb-badge-new">${state.lang === 'es' ? 'Nuevo' : 'New'}</span>` : ''}
                  ${!m.inStock ? `<span class="qb-badge-out">${state.lang === 'es' ? 'Consultar disponibilidad' : 'Check availability'}</span>` : ''}
                </div>
                <div class="qb-model-info">
                  <div class="qb-model-series">${m.series}</div>
                  <h3 class="qb-model-name">${m.name}</h3>
                  <div class="qb-model-specs">
                    ${m.hp ? `<span class="qb-spec"><strong>${m.hp} HP</strong></span>` : ''}
                    ${m.weight ? `<span class="qb-spec">${m.weight}</span>` : ''}
                    ${m.transmission ? `<span class="qb-spec">${m.transmission.split(' ')[0]}</span>` : ''}
                  </div>
                  <div class="qb-model-price">${m.priceRange || ('Desde ' + formatCurrency(m.priceUSD))}</div>
                  <div class="qb-model-highlights">
                    ${(m.highlights || []).slice(0, 2).map(h => `<div class="qb-highlight">✓ ${h}</div>`).join('')}
                  </div>
                </div>
                <button class="qb-select-btn" onclick="TMDQuoteBuilder.selectModel('${m.id}')"
                        style="--brand-color: ${state.brand.color}">
                  ${state.lang === 'es' ? 'Configurar este modelo' : 'Configure this model'} →
                </button>
              </div>
            `).join('')}
          </div>
        </div>`;
    },

    // STEP 5 — CONFIGURE & QUOTE
    _buildStep5() {
      if (!state.model) return '';
      recalcTotals();
      const m = state.model;
      const monthly = calcMonthlyPayment(state.grandTotal);
      const downPmt = Math.round(state.grandTotal * (FINANCING.downPercent / 100));

      return `
        <div class="qb-step-content qb-config-layout">
          <div class="qb-config-left">
            <button class="qb-back" onclick="TMDQuoteBuilder.goToStep(4)">← ${state.lang === 'es' ? 'Cambiar modelo' : 'Change model'}</button>
            <div class="qb-breadcrumb">${state.brand.name} → ${state.category} → <strong>${m.model}</strong></div>

            <!-- Model Hero -->
            <div class="qb-model-hero">
              <img src="${m.image || m.imageFallback || ''}" alt="${m.name}" class="qb-hero-img"
                   onerror="this.src='assets/images/tmd-placeholder.jpg'">
              <div class="qb-hero-info">
                <div class="qb-hero-brand" style="color: ${state.brand.color}">${state.brand.name}</div>
                <h2 class="qb-hero-name">${m.name}</h2>
                <p class="qb-hero-series">${m.series}</p>
              </div>
            </div>

            <!-- Full Specs -->
            <div class="qb-specs-block">
              <h3 class="qb-section-title">${state.lang === 'es' ? '📋 Especificaciones Técnicas' : '📋 Technical Specifications'}</h3>
              <div class="qb-specs-grid">
                ${m.hp ? `<div class="qb-spec-row"><span class="qb-spec-key">HP</span><span class="qb-spec-val">${m.hp} HP</span></div>` : ''}
                ${m.engineModel ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Motor' : 'Engine'}</span><span class="qb-spec-val">${m.engineModel}</span></div>` : ''}
                ${m.engineType ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Tipo de Motor' : 'Engine Type'}</span><span class="qb-spec-val">${m.engineType}</span></div>` : ''}
                ${m.transmission ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Transmisión' : 'Transmission'}</span><span class="qb-spec-val">${m.transmission}</span></div>` : ''}
                ${m.pto ? `<div class="qb-spec-row"><span class="qb-spec-key">PTO</span><span class="qb-spec-val">${m.pto}</span></div>` : ''}
                ${m.lift3pt ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Levante 3 puntos' : '3-Point Lift'}</span><span class="qb-spec-val">${m.lift3pt}</span></div>` : ''}
                ${m.weight ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Peso de Operación' : 'Operating Weight'}</span><span class="qb-spec-val">${m.weight}</span></div>` : ''}
                ${m.maxDigDepth ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Prof. de excavación' : 'Dig Depth'}</span><span class="qb-spec-val">${m.maxDigDepth}</span></div>` : ''}
                ${m.fuelCapacity ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Cap. Combustible' : 'Fuel Capacity'}</span><span class="qb-spec-val">${m.fuelCapacity}</span></div>` : ''}
                ${m.cuttingWidth ? `<div class="qb-spec-row"><span class="qb-spec-key">${state.lang === 'es' ? 'Ancho de corte' : 'Cutting Width'}</span><span class="qb-spec-val">${m.cuttingWidth}</span></div>` : ''}
              </div>
            </div>

            <!-- Options Selector -->
            ${m.options && m.options.length ? `
              <div class="qb-options-block">
                <h3 class="qb-section-title">${state.lang === 'es' ? '🔧 Opciones y Accesorios' : '🔧 Options & Accessories'}</h3>
                <div class="qb-options-list" id="qb-options-list">
                  ${m.options.map(opt => `
                    <label class="qb-option-row" for="opt-${opt.id}">
                      <input type="checkbox" id="opt-${opt.id}" class="qb-opt-check"
                             ${state.selectedOptions[opt.id] ? 'checked' : ''}
                             onchange="TMDQuoteBuilder.toggleOption('${opt.id}')">
                      <span class="qb-opt-label">${getLabel(opt.label)}</span>
                      <span class="qb-opt-price">${opt.priceAdd === 0 ? (state.lang === 'es' ? 'Incluido' : 'Included') : '+' + formatCurrency(opt.priceAdd)}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Highlights -->
            <div class="qb-highlights-block">
              <h3 class="qb-section-title">${state.lang === 'es' ? '⭐ Características Clave' : '⭐ Key Highlights'}</h3>
              <ul class="qb-highlights-list">
                ${(m.highlights || []).map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <!-- Applications -->
            <div class="qb-apps-block">
              <h3 class="qb-section-title">${state.lang === 'es' ? '🌱 Aplicaciones Recomendadas' : '🌱 Recommended Applications'}</h3>
              <div class="qb-apps-grid">
                ${(m.applications || []).map(a => `<span class="qb-app-tag">✓ ${a}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Quote Summary Panel -->
          <div class="qb-config-right" id="qb-quote-panel">
            ${this._buildQuotePanel()}
          </div>
        </div>`;
    },

    _buildQuotePanel() {
      if (!state.model) return '';
      const m = state.model;
      const monthly = calcMonthlyPayment(state.grandTotal);
      const downPmt = Math.round(state.grandTotal * (FINANCING.downPercent / 100));

      return `
        <div class="qb-quote-summary">
          <div class="qb-quote-header" style="--brand-color: ${state.brand ? state.brand.color : '#FFD700'}">
            <div class="qb-quote-brand">${state.brand ? state.brand.name : ''}</div>
            <div class="qb-quote-model">${m.model}</div>
            <div class="qb-quote-currency-toggle">
              <button class="${state.currency === 'USD' ? 'active' : ''}" onclick="TMDQuoteBuilder.setCurrency('USD')">USD</button>
              <button class="${state.currency === 'DOP' ? 'active' : ''}" onclick="TMDQuoteBuilder.setCurrency('DOP')">DOP</button>
            </div>
          </div>

          <div class="qb-quote-lines">
            <div class="qb-quote-line">
              <span>${state.lang === 'es' ? 'Precio base' : 'Base price'}</span>
              <span>${formatCurrency(state.basePrice)}</span>
            </div>
            ${Object.values(state.selectedOptions).map(opt => `
              <div class="qb-quote-line qb-opt-line">
                <span>${getLabel(opt.label)}</span>
                <span>${opt.priceAdd === 0 ? (state.lang === 'es' ? 'Incluido' : 'Included') : '+' + formatCurrency(opt.priceAdd)}</span>
              </div>
            `).join('')}
            <div class="qb-quote-divider"></div>
            <div class="qb-quote-total">
              <span>${state.lang === 'es' ? 'TOTAL ESTIMADO' : 'ESTIMATED TOTAL'}</span>
              <span class="qb-total-price">${formatCurrency(state.grandTotal)}</span>
            </div>
          </div>

          <!-- Financing block -->
          <div class="qb-financing">
            <div class="qb-financing-toggle" onclick="TMDQuoteBuilder.toggleFinancing()">
              ${state.lang === 'es' ? '💳 Financiamiento' : '💳 Financing'} ${state.showFinancing ? '▲' : '▼'}
            </div>
            ${state.showFinancing ? `
              <div class="qb-financing-details">
                <div class="qb-fin-row">
                  <span>${state.lang === 'es' ? 'Inicial (${FINANCING.downPercent}%)' : 'Down payment (${FINANCING.downPercent}%)'}</span>
                  <span>${formatCurrency(downPmt)}</span>
                </div>
                <div class="qb-fin-row">
                  <span>${state.lang === 'es' ? 'Plazo' : 'Term'}</span>
                  <span>${FINANCING.termMonths} ${state.lang === 'es' ? 'meses' : 'months'}</span>
                </div>
                <div class="qb-fin-row">
                  <span>${state.lang === 'es' ? 'Tasa anual aprox.' : 'Est. annual rate'}</span>
                  <span>${FINANCING.ratePercent}%</span>
                </div>
                <div class="qb-fin-monthly">
                  <span>~${formatCurrency(monthly)}</span>
                  <span class="qb-fin-label">/${state.lang === 'es' ? 'mes' : 'mo'}</span>
                </div>
                <p class="qb-fin-disclaimer">${state.lang === 'es' ? '* Estimado referencial. Sujeto a aprobación crediticia.' : '* Reference estimate. Subject to credit approval.'}</p>
              </div>
            ` : ''}
          </div>

          <!-- CTA Buttons -->
          <div class="qb-cta-block">
            <button class="qb-cta-primary" onclick="TMDQuoteBuilder.sendWhatsApp()"
                    style="--brand-color: ${state.brand ? state.brand.color : '#FFD700'}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              ${state.lang === 'es' ? 'Solicitar Cotización WhatsApp' : 'Request Quote via WhatsApp'}
            </button>
            <button class="qb-cta-secondary" onclick="TMDQuoteBuilder.exportPDF()">
              📄 ${state.lang === 'es' ? 'Descargar Cotización PDF' : 'Download PDF Quote'}
            </button>
            <button class="qb-cta-tertiary" onclick="TMDQuoteBuilder.sendEmail()">
              ✉️ ${state.lang === 'es' ? 'Enviar por Email' : 'Send via Email'}
            </button>
          </div>

          <!-- Contact Footer -->
          <div class="qb-contact-footer">
            <p>📞 <a href="tel:+18098262222">(809) 826-2222</a></p>
            <p>📍 Autopista Duarte Km. 22, Santo Domingo Oeste</p>
            <p class="qb-warranty">${state.brand ? getLabel(state.brand.warranty ? { es: '🛡️ Garantía: ' + state.brand.warranty.es, en: '🛡️ Warranty: ' + state.brand.warranty.en } : { es: '', en: '' }) : ''}</p>
          </div>
        </div>`;
    },

    _refreshQuotePanel() {
      const panel = document.getElementById('qb-quote-panel');
      if (panel) panel.innerHTML = this._buildQuotePanel();
    },

    _buildPrintHTML(quote) {
      return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cotización TMD — ${quote.model}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #222; padding: 30px; }
    h1 { color: #1a1a1a; font-size: 24px; }
    .header { border-bottom: 3px solid #FFD700; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; }
    .quote-num { font-size: 12px; color: #666; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #1a1a1a; color: #FFD700; padding: 8px 12px; text-align: left; }
    td { padding: 8px 12px; border-bottom: 1px solid #eee; }
    .total-row td { font-weight: bold; font-size: 16px; background: #f5f5f5; }
    .footer { margin-top: 30px; font-size: 11px; color: #666; border-top: 1px solid #ddd; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>TMD Dominicana</h1>
      <p>Tecnomaquinarias Diesel S.R.L.</p>
      <p>Autopista Duarte Km. 22, Santo Domingo Oeste</p>
      <p>(809) 826-2222 | ventas@tmd.com.do</p>
    </div>
    <div style="text-align:right">
      <h2>COTIZACIÓN</h2>
      <p class="quote-num">${quote.quoteId}</p>
      <p>Fecha: ${quote.date}</p>
    </div>
  </div>
  <h3>${quote.brand} — ${quote.modelName}</h3>
  <p>Serie: ${quote.series}</p>
  <table>
    <tr><th>Descripción</th><th>Precio USD</th></tr>
    <tr><td>Precio base — ${quote.modelName}</td><td>$${quote.basePrice.toLocaleString('en-US')}</td></tr>
    ${quote.options.map(o => `<tr><td>${o.label}</td><td>+$${o.priceAdd.toLocaleString('en-US')}</td></tr>`).join('')}
    <tr class="total-row"><td>TOTAL ESTIMADO</td><td>$${quote.grandTotal.toLocaleString('en-US')} USD</td></tr>
    <tr><td colspan="2" style="font-size:11px;color:#888">Equivalente aprox.: RD$${quote.grandTotalDOP.toLocaleString('es-DO')}</td></tr>
    <tr><td>Financiamiento est. (${FINANCING.downPercent}% inicial, ${FINANCING.termMonths} meses, ${FINANCING.ratePercent}% anual)</td>
        <td>~$${quote.monthlyPayment.toLocaleString('en-US')} USD/mes</td></tr>
  </table>
  <div class="footer">
    <p>* Precios de referencia sujetos a disponibilidad y variación de tipo de cambio. Cotización válida por 30 días.</p>
    <p>* Los precios no incluyen impuestos, flete ni costos de importación aplicables.</p>
    <p>* Financiamiento sujeto a aprobación crediticia. Tasas y plazos definitivos según institución financiera.</p>
  </div>
</body>
</html>`;
    }
  };

  // ── AUTO-INIT when DOM ready ─────────────────────────────────────────────
  function init() {
    const container = document.getElementById('tmd-quote-builder');
    if (!container) return;

    // Detect current language from i18n engine
    if (window.TMD_I18N && window.TMD_I18N.currentLang) {
      state.lang = window.TMD_I18N.currentLang;
    }

    // Detect current currency from global state
    if (window.tmdCurrencyMode) {
      state.currency = window.tmdCurrencyMode;
    }

    window.TMDQuoteBuilder.render();
    console.log('[TMD QuoteBuilder] Engine initialized — v1.0.0');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
