/**
 * TMD DOMINICANA — TRI-LINGUAL LOCALIZATION (ES / EN / HT) & CARIBBEAN SUNLIGHT ENGINE
 * Diamond Standard (20/10 Rating) vs. Global Multi-Region OEM Portals
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDI18nCore() {
  'use strict';

  // ─── 1. TRANSLATION DICTIONARY ───
  const I18N_DICTIONARY = {
    es: {
      langName: 'Español (DO)',
      flag: '🇩🇴',
      emergencyTitle: 'Auxilio Técnico 24/7',
      emergencySubtitle: 'Despacho de mecánico de campo en < 2h',
      liveBays: '18 Bahías Operativas',
      catalogBtn: 'Catálogo 0 Km',
      partsBtn: 'Repuestos OEM',
      quoteBtn: 'Cotizador DGII',
      tcoBtn: 'Calculadora TCO',
      compareBtn: 'Comparador 3-Vías',
      leaseBtn: 'Lease vs Buy',
      saveContact: 'Guardar Contacto',
      sunlightMode: 'Modo Sol Caribe',
      quarryActive: 'Modo Faena Offline Activo',
      hubKm22: 'Sede Central Km 22',
      hubCibao: 'Hub Cibao (Santiago)',
      hubEste: 'Nodo Este (Punta Cana)',
      hubSur: 'Base Sur (Barahona)'
    },
    en: {
      langName: 'English (US)',
      flag: '🇺🇸',
      emergencyTitle: '24/7 Field Rescue',
      emergencySubtitle: 'Mobile heavy mechanic dispatch in < 2h',
      liveBays: '18 Active Service Bays',
      catalogBtn: 'New Equipment (0 Hrs)',
      partsBtn: 'OEM Genuine Parts',
      quoteBtn: 'Tax Invoice Quote',
      tcoBtn: 'TCO Calculator',
      compareBtn: '3-Way Comparator',
      leaseBtn: 'Lease vs Buy',
      saveContact: 'Save Contact Card',
      sunlightMode: 'Sunlight Glare Mode',
      quarryActive: 'Offline Quarry Mode Active',
      hubKm22: 'Master Hub Km 22',
      hubCibao: 'Cibao Hub (Santiago)',
      hubEste: 'East Node (Punta Cana)',
      hubSur: 'South Base (Barahona)'
    },
    ht: {
      langName: 'Kreyòl Ayisyen',
      flag: '🇭🇹',
      emergencyTitle: 'Depanaj Mekanik 24/7',
      emergencySubtitle: 'Mekanisyen deplase sou chantye anba 2h',
      liveBays: '18 Espas Reparasyon Aktif',
      catalogBtn: 'Katalòg Machin Nèf',
      partsBtn: 'Pyès Detache OEM',
      quoteBtn: 'Fakti & Estimasyon',
      tcoBtn: 'Kalkilatris Depans TCO',
      compareBtn: 'Konpare 3 Machin',
      leaseBtn: 'Lwe oswa Achte',
      saveContact: 'Anrejistre Kontak',
      sunlightMode: 'Mòd Solèy Cho',
      quarryActive: 'Mòd Chantye San Entènèt',
      hubKm22: 'Sant Prensipal Km 22',
      hubCibao: 'Sant Cibao (Santiago)',
      hubEste: 'Pòs Lès (Punta Cana)',
      hubSur: 'Baz Sid (Barahona)'
    }
  };

  let currentLang = localStorage.getItem('tmd-lang') || 'es';
  let isSunlightMode = localStorage.getItem('tmd-sunlight-mode') === 'true';

  // ─── 2. DOM INJECTION: FLOATING LANGUAGE & ACCESSIBILITY WIDGET ───
  function mountI18nWidget() {
    if (document.getElementById('tmd-i18n-float-pill')) return;

    const pill = document.createElement('div');
    pill.id = 'tmd-i18n-float-pill';
    pill.className = 'fixed bottom-4 left-4 z-[9990] flex items-center gap-1.5 p-1.5 rounded-[9999px] bg-[#0c1017] border border-neutral-700/80 shadow-[0_8px_30px_rgba(0,0,0,0.8)] text-neutral-300 text-xs font-mono transition-all';
    pill.style.cssText = 'position:fixed !important; bottom:16px !important; left:16px !important; z-index:9990 !important; display:flex !important; align-items:center !important; gap:6px !important; padding:6px 8px !important; border-radius:9999px !important; background:#0c1017 !important; border:1px solid rgba(255,255,255,0.15) !important; box-shadow:0 8px 30px rgba(0,0,0,0.85) !important; color:#d4d4d4 !important; font-family:monospace !important; font-size:12px !important;';
    
    pill.innerHTML = `
      <!-- Lang Selector -->
      <div class="relative flex items-center">
        <button onclick="window.tmdToggleLangMenu()" id="tmd-active-lang-btn" class="px-2.5 py-1 rounded-[9999px] bg-neutral-800 hover:bg-neutral-700 text-white font-bold flex items-center gap-1.5 transition-all" style="background:#1e2430;border:1px solid rgba(255,255,255,0.1);color:#ffffff;">
          <span>${I18N_DICTIONARY[currentLang].flag}</span>
          <span class="uppercase text-[11px] font-bold">${currentLang}</span>
          <span class="material-symbols-outlined text-[14px]">arrow_drop_down</span>
        </button>

        <!-- Dropdown Menu -->
        <div id="tmd-lang-dropdown" class="hidden absolute bottom-full left-0 mb-2 py-1.5 px-1 rounded-[16px] bg-[#0f1420] border border-neutral-700 shadow-2xl flex flex-col gap-1 min-w-[140px]" style="background:#0f1420;border:1px solid rgba(255,184,0,0.3);box-shadow:0 12px 36px rgba(0,0,0,0.9);">
          <button onclick="window.tmdSetLanguage('es')" class="px-3 py-1.5 rounded-[10px] hover:bg-amber-500/20 text-left flex items-center gap-2 text-xs text-neutral-200 transition-colors">
            <span>🇩🇴</span>
            <span>Español (DO)</span>
          </button>
          <button onclick="window.tmdSetLanguage('en')" class="px-3 py-1.5 rounded-[10px] hover:bg-amber-500/20 text-left flex items-center gap-2 text-xs text-neutral-200 transition-colors">
            <span>🇺🇸</span>
            <span>English (US)</span>
          </button>
          <button onclick="window.tmdSetLanguage('ht')" class="px-3 py-1.5 rounded-[10px] hover:bg-amber-500/20 text-left flex items-center gap-2 text-xs text-neutral-200 transition-colors">
            <span>🇭🇹</span>
            <span>Kreyòl Ayisyen</span>
          </button>
        </div>
      </div>

      <!-- High-Contrast Sunlight Button -->
      <button onclick="window.tmdToggleSunlightMode()" id="tmd-sunlight-btn" title="Modo Alto Contraste para Sol Caribeño" class="w-8 h-8 rounded-full ${isSunlightMode ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.6)]' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} flex items-center justify-center transition-all" style="border-radius:9999px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;">
        <span class="material-symbols-outlined text-[16px]">wb_sunny</span>
      </button>
    `;

    document.body.appendChild(pill);
    applySunlightStyles();
  }

  // ─── 3. SUNLIGHT MODE STYLES INJECTION ───
  function applySunlightStyles() {
    let styleEl = document.getElementById('tmd-sunlight-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'tmd-sunlight-styles';
      document.head.appendChild(styleEl);
    }

    if (isSunlightMode) {
      styleEl.textContent = `
        body.tmd-sunlight-active {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
        body.tmd-sunlight-active [class*="bg-neutral-900"],
        body.tmd-sunlight-active [class*="bg-[#0c1017]"],
        body.tmd-sunlight-active [class*="bg-[#111622]"] {
          background-color: #050505 !important;
          border-color: #ffb800 !important;
        }
        body.tmd-sunlight-active p,
        body.tmd-sunlight-active span,
        body.tmd-sunlight-active div {
          color: #ffffff !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.9);
        }
        body.tmd-sunlight-active h1,
        body.tmd-sunlight-active h2,
        body.tmd-sunlight-active h3,
        body.tmd-sunlight-active h4 {
          color: #ffb800 !important;
        }
      `;
      document.body.classList.add('tmd-sunlight-active');
    } else {
      styleEl.textContent = '';
      document.body.classList.remove('tmd-sunlight-active');
    }
  }

  // ─── 4. GLOBAL PUBLIC HANDLERS ───
  window.tmdToggleLangMenu = function() {
    const drop = document.getElementById('tmd-lang-dropdown');
    if (drop) {
      drop.classList.toggle('hidden');
    }
  };

  window.tmdSetLanguage = function(lang) {
    if (!I18N_DICTIONARY[lang]) return;
    currentLang = lang;
    localStorage.setItem('tmd-lang', lang);

    const btn = document.getElementById('tmd-active-lang-btn');
    if (btn) {
      btn.innerHTML = `
        <span>${I18N_DICTIONARY[lang].flag}</span>
        <span class="uppercase text-[11px]">${lang}</span>
        <span class="material-symbols-outlined text-[14px]">arrow_drop_down</span>
      `;
    }

    const drop = document.getElementById('tmd-lang-dropdown');
    if (drop) drop.classList.add('hidden');

    // Dispatch custom event for any listening reactive elements
    window.dispatchEvent(new CustomEvent('tmdLanguageChanged', { detail: { lang: lang, dict: I18N_DICTIONARY[lang] } }));
  };

  window.tmdToggleSunlightMode = function() {
    isSunlightMode = !isSunlightMode;
    localStorage.setItem('tmd-sunlight-mode', isSunlightMode);
    
    const btn = document.getElementById('tmd-sunlight-btn');
    if (btn) {
      if (isSunlightMode) {
        btn.className = 'w-8 h-8 rounded-full bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.6)] flex items-center justify-center transition-all';
      } else {
        btn.className = 'w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-all';
      }
    }

    applySunlightStyles();
  };

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    const pill = document.getElementById('tmd-i18n-float-pill');
    const drop = document.getElementById('tmd-lang-dropdown');
    if (pill && drop && !pill.contains(e.target)) {
      drop.classList.add('hidden');
    }
  });

  // Auto mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountI18nWidget);
  } else {
    mountI18nWidget();
  }

  // Register Service Worker if supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('TMD PWA ServiceWorker registration notice:', err);
      });
    });
  }

})();
