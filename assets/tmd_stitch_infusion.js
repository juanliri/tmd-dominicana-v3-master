/* ═════════════════════════════════════════════════════════════════════════════
   TMD DOMINICANA 2026 — STITCH V2 SECTIONS INFUSION SUITE
   Zero-Blues Industrial Architecture | Dark/Light Harmonic Design System
   Hazard Gold (#f59e0b / #ffb800) · Telemetry Emerald (#10b981) · Pure Black (#000000)
═════════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // State Management
  var _activeHotspot = 1;
  var _activeBank = { rate: 9.50, name: 'Banreservas - Fondo Fomper Pyme', bankName: 'BANRESERVAS' };
  var _downPaymentPct = 20;
  var _loanTermMonths = 36;
  var _currentMachinePrice = 84500;
  var _currentMachineName = 'JCB 3CX Eco 4x4 Tier-3';
  var _dviApproved = false;

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. PUBLIC DVI WORK ORDER TRACKER MODAL
  // ─────────────────────────────────────────────────────────────────────────────
  window.tmdOpenDviTracker = function (woNumber) {
    var wo = woNumber || 'WO-4482';
    var existingModal = document.getElementById('tmd-dvi-modal-overlay');
    if (!existingModal) {
      existingModal = document.createElement('div');
      existingModal.id = 'tmd-dvi-modal-overlay';
      document.body.appendChild(existingModal);
    }

    var isDark = document.documentElement.classList.contains('dark');
    var textMain = isDark ? '#ffffff' : '#0f172a';
    var textMuted = isDark ? '#a1a1aa' : '#64748b';
    var borderSubtle = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0';

    existingModal.innerHTML = `
      <div class="tmd-dvi-modal-card p-6 md:p-8" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="flex items-center justify-between border-b pb-4 mb-6" style="border-color:${borderSubtle};">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 font-mono font-bold">
              WO
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold font-mono tracking-tight" style="color:${textMain};">${wo} · RETROEXCAVADORA JCB 3CX</h3>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
                  EN TALLER KM 22 · BAHÍA 04
                </span>
              </div>
              <p class="text-xs font-mono mt-0.5" style="color:${textMuted};">
                Cliente: <strong style="color:${textMain};">Consorcio Malespín S.R.L.</strong> · Ingreso: 12-Oct · Responsable: Ing. R. Batista
              </p>
            </div>
          </div>
          <button onclick="window.tmdCloseDviTracker()" class="p-2 rounded-lg hover:bg-neutral-800 transition-colors" style="color:${textMuted};">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- 4-Stage Progress Bar -->
        <div class="mb-8 p-5 rounded-xl border bg-black/40" style="border-color:${borderSubtle};">
          <div class="flex items-center justify-between text-xs font-mono mb-2" style="color:${textMuted};">
            <span>AVANCE DE ORDEN: <strong class="text-amber-500 font-bold">75% COMPLETADO</strong></span>
            <span>TIEMPO TRANSCURRIDO: 4.2 HORAS</span>
          </div>
          <div class="w-full h-3 rounded-full bg-neutral-800 overflow-hidden mb-5">
            <div class="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-500 rounded-full" style="width: 75%;"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <div class="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold mb-1">
                <span>01. RECEPCIÓN</span>
                <span>✓ OK</span>
              </div>
              <p class="text-xs" style="color:${textMain};">Lavado a presión y arqueo perimétrico en patio Km 22.</p>
            </div>
            <div class="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <div class="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold mb-1">
                <span>02. DIAGNÓSTICO DVI</span>
                <span>✓ OK</span>
              </div>
              <p class="text-xs" style="color:${textMain};">Escáner LiveLink, prueba de 60 puntos y muestreo de aceite.</p>
            </div>
            <div class="p-3 rounded-lg border border-amber-500/80 bg-amber-500/10 relative">
              <div class="flex items-center justify-between text-[11px] font-mono text-amber-500 font-bold mb-1">
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>03. MONTAJE OEM</span>
                <span>75%</span>
              </div>
              <p class="text-xs font-semibold" style="color:${textMain};">Instalación bomba Delphi y sellos en cilindro telescópico.</p>
            </div>
            <div class="p-3 rounded-lg border opacity-60" style="border-color:${borderSubtle};">
              <div class="flex items-center justify-between text-[11px] font-mono mb-1" style="color:${textMuted};">
                <span>04. BANCO DE PRUEBA</span>
                <span>PENDIENTE</span>
              </div>
              <p class="text-xs" style="color:${textMuted};">Test a 2,200 RPM, calibración de presión y conduce de salida.</p>
            </div>
          </div>
        </div>

        <!-- Photographic DVI Evidence -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-mono font-bold uppercase tracking-wider text-amber-500 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Reporte Fotográfico de Averías & Reemplazos (Fullbay DVI Feed)
            </h4>
            <span class="text-xs font-mono" style="color:${textMuted};">3 Evidencias Digitalizadas con Hash OEM</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1 -->
            <div class="rounded-xl border overflow-hidden bg-black/50" style="border-color:${borderSubtle};">
              <div class="relative h-44 bg-neutral-900 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIjv8nlZpqaHKMQ5uTMigYKREsPrKtWBJLJHA1FLV_UcvAnfx5bD0RRFqoQkRzmSWqpLYouhuxd0jtYJPXvcdkgY-l0WlFA-N0JpvQsffC6ZkreDu0EiIMm1QWi0AOMxb-e4xs6yY2El-O8XNWYvQsuWWLppNu08wDS8W5f3gs06Vp8qjP_WiUUpCOIaJVZI43yFh4IwOH9PZEGuNp56KTb3wdc_QCyOSECPpz3aCWp_vo5gOO1hEoiA" class="w-full h-full object-cover" alt="Manguera de Presión 6000 PSI">
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-500/90 text-white font-mono text-[10px] font-bold uppercase">Riesgo Crítico Resuelto</span>
                <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">10:14 AM</span>
              </div>
              <div class="p-3.5 space-y-1">
                <h5 class="text-xs font-bold" style="color:${textMain};">Manguera Hidráulica 6,000 PSI</h5>
                <p class="text-[11px] leading-relaxed" style="color:${textMuted};">Desgaste severo por fricción con bastidor. Riesgo de estallido inminente. Reemplazada por pieza OEM reforzada 4 espirales.</p>
                <div class="pt-2 border-t text-[10px] font-mono flex justify-between text-emerald-400" style="border-color:${borderSubtle};">
                  <span>Inspector: L. Santana</span>
                  <span>100% INSTALADO</span>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="rounded-xl border overflow-hidden bg-black/50" style="border-color:${borderSubtle};">
              <div class="relative h-44 bg-neutral-900 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLK1CV93BD-QCHV1s59nU2uv5JHDknF_VVUJGEe23bp7Hq_IFCZaiKsuSFyFimV-t2kAZ1LAHrQIjvhOokFpiP6j5u3AoWdAuEux1RmBQ2DKtAFd0Vez6lGPA626vYrb_Nw1-FLJtxTHbkruNNJLvIWjFTz_BDTp1dE_VITow6rEXMahGcLOvEYv5A6M4mI_eG8Oj4Rv5YR2Bq88OnLxpnpricL8CFCX6ltDWasCvqf9rUOORbOZgDew" class="w-full h-full object-cover" alt="Inyector #3 Sedimentos">
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-black font-mono text-[10px] font-bold uppercase">Tobera en Calibración</span>
                <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">11:42 AM</span>
              </div>
              <div class="p-3.5 space-y-1">
                <h5 class="text-xs font-bold" style="color:${textMain};">Inyector Delphi #3 Sedimentos</h5>
                <p class="text-[11px] leading-relaxed" style="color:${textMuted};">Obstrucción parcial por combustible contaminado en obra. Pasado a limpieza ultrasónica y calibración de microgotas.</p>
                <div class="pt-2 border-t text-[10px] font-mono flex justify-between text-amber-500" style="border-color:${borderSubtle};">
                  <span>Tolerancia de flujo: 72%</span>
                  <span>EN BANCO</span>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="rounded-xl border overflow-hidden bg-black/50" style="border-color:${borderSubtle};">
              <div class="relative h-44 bg-neutral-900 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4YAtCkPs1e2oxcY_HaMU9CWWk42htH2K-CdFPhJeniyw79JS6WZYPpEEcPthdvEIDBNZwc0YypujkoSGzUo7Uqxfv889dSVVDDQW86FfSCGurLf94lUdUSe4nme8qdm_23bajm6QY25FHIthgpwGP6EiLoWSAB4If9yxEpAt_xnLveNoEY2PdCnL8bmbsnwFYg719jTmZXJfc0dgGb0whF03XORqf1dz-O15qq-TNAt_YADUl2kucIg" class="w-full h-full object-cover" alt="Filtro Original JCB">
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-black font-mono text-[10px] font-bold uppercase">Genuino Almacén Km 22</span>
                <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">02:15 PM</span>
              </div>
              <div class="p-3.5 space-y-1">
                <h5 class="text-xs font-bold" style="color:${textMain};">Filtro Original JCB 320/08560</h5>
                <p class="text-[11px] leading-relaxed" style="color:${textMuted};">Desembalaje verificado en Almacén Km 22 con sello de autenticidad para acople directo en el riel común de la retroexcavadora.</p>
                <div class="pt-2 border-t text-[10px] font-mono flex justify-between text-emerald-400" style="border-color:${borderSubtle};">
                  <span>Bin C-04 · Lote 982</span>
                  <span>LISTO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 1-Click Digital Approval & Action Footer -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t" style="border-color:${borderSubtle};">
          <div class="flex items-center gap-2 text-xs font-mono" style="color:${textMuted};">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Total Partes Adicionales Autorizadas: <strong style="color:${textMain};">$420.00 USD (RD$ 25,200)</strong></span>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button onclick="window.tmdCloseDviTracker()" class="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border font-mono text-xs uppercase" style="border-color:${borderSubtle};color:${textMuted};">
              Cerrar
            </button>
            <button id="tmd-approve-wo-btn" onclick="window.tmdApproveWoDvi()" class="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>${_dviApproved ? '✓ Orden Aprobada Digitalmente' : 'Aprobar Intervención en 1-Click'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    existingModal.onclick = function (e) {
      if (e.target === existingModal) window.tmdCloseDviTracker();
    };

    setTimeout(function () {
      existingModal.classList.add('active');
    }, 20);
  };

  window.tmdCloseDviTracker = function () {
    var modal = document.getElementById('tmd-dvi-modal-overlay');
    if (modal) {
      modal.classList.remove('active');
    }
  };

  window.tmdApproveWoDvi = function () {
    _dviApproved = true;
    var btn = document.getElementById('tmd-approve-wo-btn');
    if (btn) {
      btn.innerHTML = '✓ Orden Aprobada por el Contratista (Fullbay Sincronizado)';
      btn.classList.remove('bg-amber-500', 'text-black');
      btn.classList.add('bg-emerald-500', 'text-black');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. SVG EXPLODED VIEW & BOM TABLE INFUSION (FOR #/parts)
  // ─────────────────────────────────────────────────────────────────────────────
  var BOM_PARTS = [
    { num: 1, partNo: '02/200823', name: 'Eje Cardánico Estriado Principal', bin: 'Bin C-04', stock: '3 unid.', priceUsd: 485, priceDop: 'RD$ 29,100', desc: 'Acero forjado de alta resistencia para bomba hidráulica Parker / JCB.' },
    { num: 2, partNo: '904/06700', name: 'Retén de Alta Presión Vitón (Oil Seal)', bin: 'Bin B-12', stock: '14 unid.', priceUsd: 42, priceDop: 'RD$ 2,520', desc: 'Resistente a temperaturas de hasta 180°C y 350 bar de presión continua.' },
    { num: 3, partNo: '907/50200', name: 'Cojinete Cónico de Carga Timken', bin: 'Bin A-08', stock: '6 unid.', priceUsd: 115, priceDop: 'RD$ 6,900', desc: 'Capacidad de carga axial y radial pesada para soporte de eje rotor.' },
    { num: 4, partNo: '20/925340', name: 'Carcasa Frontal de Hierro Nodular', bin: 'Bin E-01', stock: '2 unid.', priceUsd: 890, priceDop: 'RD$ 53,400', desc: 'Fundición nodular maquinada por CNC con brida de 4 agujeros estándar SAE.' },
    { num: 5, partNo: '20/925341', name: 'Bloque Rotor de 9 Pistones Axiales', bin: 'Bin C-04', stock: '4 unid.', priceUsd: 1250, priceDop: 'RD$ 75,000', desc: 'Pistones rectificados con baño de bronce sinterizado para cero fricción.' },
    { num: 6, partNo: '20/925342', name: 'Plato Oscilante Swashplate de Control', bin: 'Bin C-05', stock: '1 unid.', priceUsd: 620, priceDop: 'RD$ 37,200', desc: 'Regulación de caudal variable de 0 a 165 L/min según demanda hidráulica.' },
    { num: 7, partNo: '20/925343', name: 'Placa Distribuidora Lumbreras (Valve Plate)', bin: 'Bin B-03', stock: '5 unid.', priceUsd: 310, priceDop: 'RD$ 18,600', desc: 'Superficie lapidada a espejo para estanqueidad perfecta de succión y descarga.' },
    { num: 8, partNo: '993/99512', name: 'Kit Sellos Tóricos O-Rings & Válvulas LS', bin: 'Bin A-02', stock: '22 unid.', priceUsd: 95, priceDop: 'RD$ 5,700', desc: 'Kit de juntas de estanqueidad completas para reconstrucción mayor en taller.' }
  ];

  function renderSchematicModule() {
    return `
      <div id="tmd-schematic-infusion-container" class="tmd-stitch-section rounded-2xl border p-6 md:p-8 bg-neutral-950/90 dark:bg-black/90 text-white shadow-2xl border-amber-500/20">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span>ALMACÉN KM 22</span>
              <span>/</span>
              <span>DESPIECE TÉCNICO INTERACTIVO</span>
              <span>/</span>
              <span class="text-white font-bold">FIG. 20-04A BOMBA HIDRÁULICA PRINCIPAL</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase flex items-center gap-3">
              Diagrama de Despiece Vectorial & Lista de Materiales (BOM)
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold">JCB 3CX ECO</span>
            </h2>
            <p class="text-xs text-neutral-400 font-mono mt-1">Haga clic sobre cualquier número en el plano o en la tabla para consultar disponibilidad en Almacén Km 22.</p>
          </div>
          <div class="flex items-center flex-wrap gap-3">
            <button onclick="if(typeof window.tmdOpenPartsSerialEngine==='function') window.tmdOpenPartsSerialEngine()" class="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Búsqueda por Serial / VIN</span>
            </button>
            <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              STOCK ALMACÉN KM 22
            </span>
          </div>
        </div>

        <!-- SVG Canvas -->
        <div class="relative rounded-xl border border-white/10 overflow-hidden p-4 mb-6 tmd-cad-grid bg-black flex items-center justify-center select-none" style="min-height:360px;">
          <!-- Technical Specs Watermark -->
          <div class="absolute top-3 left-4 font-mono text-[10px] text-neutral-500 flex flex-col gap-0.5 pointer-events-none">
            <span>OEM ASSEMBLY: JCB PART 20/925339-REV D</span>
            <span>MAX FLOW: 165 L/MIN @ 2200 RPM</span>
            <span>PRESSURE: 251 BAR (PEAK 320 BAR)</span>
          </div>

          <div class="absolute top-3 right-4 font-mono text-[11px] text-amber-400 bg-black/80 px-3 py-1 rounded border border-white/10 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="tmd-hotspot-label">PIEZA SELECCIONADA: #1 EJE ESTRIADO</span>
          </div>

          <!-- Exploded SVG Graphic -->
          <svg viewBox="0 0 1000 460" class="w-full h-auto max-h-[420px] z-10" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="tmd-metal-1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3f3f46"/><stop offset="100%" stop-color="#18181b"/></linearGradient>
              <linearGradient id="tmd-metal-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#52525b"/><stop offset="100%" stop-color="#27272a"/></linearGradient>
              <linearGradient id="tmd-gold-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#b45309"/></linearGradient>
            </defs>

            <!-- CAD Centerline -->
            <line x1="60" y1="230" x2="940" y2="230" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="8,6,2,6" opacity="0.4"/>

            <!-- Part 1: Eje -->
            <g id="svg-part-1" onclick="window.tmdSelectHotspot(1)">
              <path d="M 70 218 L 120 218 L 120 210 L 200 210 L 200 250 L 120 250 L 120 242 L 70 242 Z" fill="url(#tmd-metal-2)" stroke="#71717a" stroke-width="2"/>
              <rect x="170" y="202" width="16" height="56" rx="2" fill="url(#tmd-gold-g)" stroke="#f59e0b" stroke-width="1.5"/>
            </g>
            <!-- Pin 1 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 1 ? 'active' : '' }" id="pin-1" onclick="window.tmdSelectHotspot(1)">
              <circle cx="135" cy="140" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="135" y="145" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">1</text>
              <line x1="135" y1="154" x2="135" y2="210" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 2: Reten -->
            <g id="svg-part-2" onclick="window.tmdSelectHotspot(2)">
              <ellipse cx="230" cy="230" rx="14" ry="46" fill="#18181b" stroke="#10b981" stroke-width="2"/>
            </g>
            <!-- Pin 2 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 2 ? 'active' : '' }" id="pin-2" onclick="window.tmdSelectHotspot(2)">
              <circle cx="230" cy="110" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="230" y="115" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">2</text>
              <line x1="230" y1="124" x2="230" y2="184" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 3: Cojinete Timken -->
            <g id="svg-part-3" onclick="window.tmdSelectHotspot(3)">
              <rect x="265" y="190" width="34" height="80" rx="3" fill="url(#tmd-metal-1)" stroke="#a1a1aa" stroke-width="2"/>
            </g>
            <!-- Pin 3 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 3 ? 'active' : '' }" id="pin-3" onclick="window.tmdSelectHotspot(3)">
              <circle cx="282" cy="90" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="282" y="95" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">3</text>
              <line x1="282" y1="104" x2="282" y2="190" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 4: Carcasa Hierro -->
            <g id="svg-part-4" onclick="window.tmdSelectHotspot(4)">
              <path d="M 330 150 L 430 140 L 440 170 L 440 290 L 430 320 L 330 310 L 320 280 L 320 180 Z" fill="url(#tmd-metal-1)" stroke="#a1a1aa" stroke-width="2.5"/>
              <ellipse cx="385" cy="230" rx="28" ry="42" fill="#09090b" stroke="#f59e0b" stroke-width="2"/>
            </g>
            <!-- Pin 4 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 4 ? 'active' : '' }" id="pin-4" onclick="window.tmdSelectHotspot(4)">
              <circle cx="380" cy="70" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="380" y="75" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">4</text>
              <line x1="380" y1="84" x2="380" y2="140" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 5: Bloque 9 Pistones -->
            <g id="svg-part-5" onclick="window.tmdSelectHotspot(5)">
              <rect x="470" y="165" width="85" height="130" rx="4" fill="url(#tmd-metal-2)" stroke="#f59e0b" stroke-width="2"/>
              <circle cx="495" cy="185" r="7" fill="#09090b" stroke="#a1a1aa" stroke-width="1.5"/>
              <circle cx="495" cy="210" r="7" fill="#09090b" stroke="#a1a1aa" stroke-width="1.5"/>
              <circle cx="495" cy="235" r="7" fill="#09090b" stroke="#a1a1aa" stroke-width="1.5"/>
              <circle cx="495" cy="260" r="7" fill="#09090b" stroke="#a1a1aa" stroke-width="1.5"/>
            </g>
            <!-- Pin 5 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 5 ? 'active' : '' }" id="pin-5" onclick="window.tmdSelectHotspot(5)">
              <circle cx="512" cy="65" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="512" y="70" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">5</text>
              <line x1="512" y1="79" x2="512" y2="165" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 6: Swashplate -->
            <g id="svg-part-6" onclick="window.tmdSelectHotspot(6)">
              <path d="M 585 170 L 620 150 L 635 155 L 600 305 L 585 300 Z" fill="url(#tmd-gold-g)" stroke="#f59e0b" stroke-width="2"/>
            </g>
            <!-- Pin 6 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 6 ? 'active' : '' }" id="pin-6" onclick="window.tmdSelectHotspot(6)">
              <circle cx="610" cy="65" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="610" y="70" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">6</text>
              <line x1="610" y1="79" x2="610" y2="150" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 7: Placa Distribuidora -->
            <g id="svg-part-7" onclick="window.tmdSelectHotspot(7)">
              <ellipse cx="670" cy="230" rx="16" ry="60" fill="url(#tmd-metal-1)" stroke="#71717a" stroke-width="2"/>
              <path d="M 668 190 C 674 200 674 215 668 220" stroke="#10b981" stroke-width="5" fill="none"/>
              <path d="M 668 240 C 674 250 674 265 668 270" stroke="#f59e0b" stroke-width="5" fill="none"/>
            </g>
            <!-- Pin 7 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 7 ? 'active' : '' }" id="pin-7" onclick="window.tmdSelectHotspot(7)">
              <circle cx="670" cy="85" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="670" y="90" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">7</text>
              <line x1="670" y1="99" x2="670" y2="170" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>

            <!-- Part 8: Sellos & Valvula -->
            <g id="svg-part-8" onclick="window.tmdSelectHotspot(8)">
              <path d="M 715 155 L 810 155 L 810 305 L 715 305 Z" fill="url(#tmd-metal-2)" stroke="#a1a1aa" stroke-width="2"/>
              <circle cx="740" cy="195" r="9" fill="none" stroke="#10b981" stroke-width="3"/>
              <circle cx="780" cy="195" r="9" fill="none" stroke="#10b981" stroke-width="3"/>
              <circle cx="760" cy="255" r="14" fill="none" stroke="#10b981" stroke-width="3.5"/>
            </g>
            <!-- Pin 8 -->
            <g class="tmd-hotspot-pin ${ _activeHotspot === 8 ? 'active' : '' }" id="pin-8" onclick="window.tmdSelectHotspot(8)">
              <circle cx="760" cy="60" r="14" fill="#f59e0b" stroke="#000" stroke-width="2"/>
              <text x="760" y="65" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="12" fill="#000">8</text>
              <line x1="760" y1="74" x2="760" y2="155" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
            </g>
          </svg>
        </div>

        <!-- BOM Table -->
        <div class="overflow-x-auto rounded-xl border border-white/10">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-black/80 text-neutral-400 uppercase text-[10px] border-b border-white/10">
              <tr>
                <th class="p-3"># Pos</th>
                <th class="p-3">N° Parte OEM</th>
                <th class="p-3">Descripción Componente</th>
                <th class="p-3">Almacén Km 22</th>
                <th class="p-3">Precio USD</th>
                <th class="p-3">Precio DOP</th>
                <th class="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${BOM_PARTS.map(function (p) {
                var isActive = _activeHotspot === p.num;
                return `
                  <tr id="bom-row-${p.num}" class="tmd-bom-row ${isActive ? 'active' : ''} hover:bg-neutral-900/60 cursor-pointer" onclick="window.tmdSelectHotspot(${p.num})">
                    <td class="p-3 font-bold text-amber-400">#${p.num}</td>
                    <td class="p-3 font-bold text-white">${p.partNo}</td>
                    <td class="p-3">
                      <div class="font-bold text-white">${p.name}</div>
                      <div class="text-[11px] text-neutral-400">${p.desc}</div>
                    </td>
                    <td class="p-3">
                      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        ${p.bin} (${p.stock})
                      </span>
                    </td>
                    <td class="p-3 font-bold text-amber-400">$${p.priceUsd}</td>
                    <td class="p-3 text-neutral-300">${p.priceDop}</td>
                    <td class="p-3 text-right">
                      <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo solicitar el repuesto OEM #' + p.partNo + ' (' + p.name + ') ubicado en ' + p.bin + ' de Sede Km 22.')}" target="_blank" class="inline-flex items-center gap-1 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-[10px] transition-colors">
                        Pedir
                      </a>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.tmdSelectHotspot = function (num) {
    _activeHotspot = num;
    var part = BOM_PARTS.find(function (p) { return p.num === num; });
    var labelEl = document.getElementById('tmd-hotspot-label');
    if (labelEl && part) {
      labelEl.innerText = 'PIEZA SELECCIONADA: #' + part.num + ' ' + part.name.toUpperCase();
    }

    for (var i = 1; i <= 8; i++) {
      var pin = document.getElementById('pin-' + i);
      if (pin) {
        if (i === num) pin.classList.add('active');
        else pin.classList.remove('active');
      }
      var row = document.getElementById('bom-row-' + i);
      if (row) {
        if (i === num) row.classList.add('active');
        else row.classList.remove('active');
      }
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. DOMINICAN LEASING & LEY 392-07 TAX SHIELD (FOR #/vehicle/:slug & #/configurator)
  // ─────────────────────────────────────────────────────────────────────────────
  var DOM_BANKS = [
    { id: 'banreservas', name: 'Banreservas - Fondo Fomper Pyme', bankName: 'BANRESERVAS', rate: 9.50, desc: 'Tasa fija preferencial sectorial, 0% comisión de prepago a partir del mes 24. Aprobación simplificada con RNC.' },
    { id: 'bhd', name: 'Banco BHD - Leasing Industrial Verde', bankName: 'BANCO BHD', rate: 9.80, desc: 'Financiamiento estructurado con bonificación para motores Tier-3 y reducción de emisiones CO2. 0% comisión.' },
    { id: 'popular', name: 'Banco Popular - Crédito Productivo', bankName: 'BANCO POPULAR', rate: 10.20, desc: 'Flexibilidad de hasta 60 días de gracia para el primer vencimiento. Cobertura nacional de tesorería.' },
    { id: 'agricola', name: 'Banco Agrícola - Fondo Agropecuario', bankName: 'BANCO AGRÍCOLA', rate: 8.50, desc: 'Tasa subvencionada especial para maquinaria agrícola y tractores (LS Tractor).' }
  ];

  function calculateLeasing() {
    var price = _currentMachinePrice;
    var dpAmount = price * (_downPaymentPct / 100);
    var financed = price - dpAmount;
    var monthlyRate = (_activeBank.rate / 100) / 12;
    var n = _loanTermMonths;
    var monthlyPayment = (financed * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) monthlyPayment = financed / n;

    var dopRate = 60.0;
    var monthlyDop = monthlyPayment * dopRate;
    var proindustriaShieldDop = price * dopRate * 0.18;
    var isrSavingsDop = price * dopRate * 0.27;

    return {
      monthlyUsd: Math.round(monthlyPayment),
      monthlyDop: Math.round(monthlyDop),
      dpAmountUsd: Math.round(dpAmount),
      dpAmountDop: Math.round(dpAmount * dopRate),
      financedUsd: Math.round(financed),
      itbisShieldDop: Math.round(proindustriaShieldDop),
      isrShieldDop: Math.round(isrSavingsDop),
      totalShieldDop: Math.round(proindustriaShieldDop + isrSavingsDop)
    };
  }

  function renderLeasingModule() {
    var c = calculateLeasing();

    return `
      <div id="tmd-leasing-infusion-container" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 my-4">
        <div class="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xl p-6 sm:p-8 text-slate-900 dark:text-white transition-all">
          <!-- Header -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-5 mb-6">
            <div>
              <div class="flex items-center gap-2 text-xs font-mono text-amber-500 dark:text-amber-400 font-bold mb-2">
                <span>PORTAL FINANCIERO RD</span>
                <span>/</span>
                <span>LEASING BANCARIO</span>
                <span>/</span>
                <span class="text-slate-900 dark:text-white">LEY 392-07 PROINDUSTRIA</span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                Simulador Financiero & Escudo Fiscal Dominicano
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
                Calcule su cuota con tasas corporativas preferenciales y deducción de impuestos de importación y renta según las normativas DGII.
              </p>
            </div>
            <div class="text-right shrink-0">
              <span class="text-xs font-mono text-slate-500 dark:text-neutral-400 block uppercase font-bold">Valor de Referencia:</span>
              <span class="text-2xl font-black font-mono text-amber-500 dark:text-amber-400">$${_currentMachinePrice.toLocaleString()} USD</span>
              <span class="text-xs font-mono text-slate-400 dark:text-neutral-500 block">(RD$ ${(_currentMachinePrice * 60).toLocaleString()})</span>
            </div>
          </div>

          <!-- Bank Selector Tabs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            ${DOM_BANKS.map(function (b) {
              var isActive = _activeBank.bankName === b.bankName;
              return `
                <div onclick="window.tmdSetBank('${b.bankName}')" class="rounded-2xl p-4 border transition-all cursor-pointer ${isActive ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10' : 'bg-slate-50 dark:bg-neutral-950/60 border-slate-200 dark:border-neutral-800 hover:border-amber-500/40'}">
                  <div class="flex justify-between items-center mb-1.5">
                    <span class="text-xs font-mono font-bold ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}">${b.bankName}</span>
                    <span class="w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-slate-300 dark:bg-neutral-700'}"></span>
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-neutral-400 truncate mb-3">${b.name}</div>
                  <div class="flex items-baseline justify-between pt-2.5 border-t border-slate-200 dark:border-neutral-800/80 text-xs font-mono">
                    <span class="text-slate-400 dark:text-neutral-500">TASA FIJA:</span>
                    <span class="text-sm font-bold text-amber-600 dark:text-amber-400">${b.rate.toFixed(2)}%</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Sliders & Results Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-neutral-950/80 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800">
            <div class="lg:col-span-6 space-y-6">
              <div>
                <div class="flex justify-between items-center text-xs font-mono mb-2">
                  <span class="text-slate-600 dark:text-neutral-400 font-bold">INICIAL / DOWN PAYMENT (${_downPaymentPct}%):</span>
                  <span class="text-amber-600 dark:text-amber-400 font-bold">$${c.dpAmountUsd.toLocaleString()} USD (RD$ ${c.dpAmountDop.toLocaleString()})</span>
                </div>
                <input type="range" min="10" max="50" step="5" value="${_downPaymentPct}" oninput="window.tmdUpdateDp(this.value)" class="tmd-slider w-full accent-amber-500 cursor-pointer">
              </div>

              <div>
                <div class="flex justify-between items-center text-xs font-mono mb-2">
                  <span class="text-slate-600 dark:text-neutral-400 font-bold">PLAZO DEL FINANCIAMIENTO:</span>
                  <span class="text-amber-600 dark:text-amber-400 font-bold">${_loanTermMonths} MESES (${(_loanTermMonths / 12).toFixed(1)} Años)</span>
                </div>
                <input type="range" min="12" max="60" step="12" value="${_loanTermMonths}" oninput="window.tmdUpdateTerm(this.value)" class="tmd-slider w-full accent-amber-500 cursor-pointer">
              </div>

              <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-mono">
                <div class="flex items-center gap-2 font-bold mb-1">
                  <span class="material-symbols-outlined text-[16px]">verified</span>
                  <span>BENEFICIO TRIBUTARIO LEY 392-07 (PROINDUSTRIA)</span>
                </div>
                <p class="text-[11px] leading-relaxed text-emerald-700 dark:text-emerald-300">
                  Adquisición exenta del 18% de ITBIS aduanal + depreciación acelerada deducible del 27% del Impuesto Sobre la Renta (ISR corporativo).
                </p>
                <div class="mt-2 pt-2 border-t border-emerald-500/20 flex justify-between font-bold">
                  <span>Ahorro Fiscal Total Estimado:</span>
                  <span>RD$ ${c.totalShieldDop.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <!-- Result Card -->
            <div class="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg">
              <div>
                <span class="text-xs font-mono text-slate-500 dark:text-neutral-400 block uppercase font-bold mb-1">CUOTA MENSUAL ESTIMADA (${_activeBank.bankName}):</span>
                <div class="text-3xl sm:text-4xl font-black font-mono text-amber-500 dark:text-amber-400 mb-1">
                  $${c.monthlyPaymentUsd.toLocaleString()} <span class="text-sm font-sans font-medium text-slate-500 dark:text-neutral-400">USD / mes</span>
                </div>
                <div class="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-4">
                  RD$ ${c.monthlyPaymentDop.toLocaleString()} / mes aprox.
                </div>

                <div class="space-y-2 text-xs font-mono border-t border-slate-100 dark:border-neutral-800 pt-3">
                  <div class="flex justify-between text-slate-600 dark:text-neutral-400">
                    <span>Monto Financiado:</span>
                    <strong class="text-slate-900 dark:text-white">$${c.loanAmountUsd.toLocaleString()} USD</strong>
                  </div>
                  <div class="flex justify-between text-slate-600 dark:text-neutral-400">
                    <span>Entidad Bancaria:</span>
                    <strong class="text-slate-900 dark:text-white">${_activeBank.name}</strong>
                  </div>
                  <div class="flex justify-between text-slate-600 dark:text-neutral-400">
                    <span>Tasa Anual Efectiva:</span>
                    <strong class="text-emerald-600 dark:text-emerald-400">${_activeBank.rate.toFixed(2)}%</strong>
                  </div>
                </div>
              </div>

              <button onclick="window.tmdRequestBankApproval()" class="mt-6 w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">point_of_sale</span>
                <span>Solicitar Pre-Aprobación Bancaria WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.tmdSetBank = function (bankName) {
    var found = DOM_BANKS.find(function (b) { return b.bankName === bankName; });
    if (found) {
      _activeBank = found;
      var container = document.getElementById('tmd-leasing-infusion-container');
      if (container) {
        container.outerHTML = renderLeasingModule();
      }
    }
  };

  window.tmdUpdateDp = function (val) {
    _downPaymentPct = parseInt(val, 10);
    var container = document.getElementById('tmd-leasing-infusion-container');
    if (container) {
      container.outerHTML = renderLeasingModule();
    }
  };

  window.tmdUpdateTerm = function (val) {
    _loanTermMonths = parseInt(val, 10);
    var container = document.getElementById('tmd-leasing-infusion-container');
    if (container) {
      container.outerHTML = renderLeasingModule();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. 360° INSPECTOR & ATTACHMENT SELECTOR (FOR #/vehicle/:slug)
  // ─────────────────────────────────────────────────────────────────────────────
  var _activeAngle = 0;
  var _activeAttachment = { name: 'Cuchara Estándar 1.0 m³', extraWeight: 0, flow: 123, price: 0 };

  var ATTACHMENTS = [
    { id: 'cuchara', name: 'Cuchara Estándar 1.0 m³', extraWeight: 0, flow: 123, price: 0, desc: 'Acople directo de excavación general y zanjeo.' },
    { id: 'martillo', name: 'Martillo Hidráulico RockBreaker 330 kg', extraWeight: 330, flow: 95, price: 5800, desc: 'Ruptura de roca volcánica y demolición de hormigón armado.' },
    { id: 'hoyadora', name: 'Hoyadora / Ahoyadora Hidráulica', extraWeight: 140, flow: 80, price: 3400, desc: 'Perforación de postes, cimentaciones y siembra agrícola.' },
    { id: 'horquilla', name: 'Horquilla Porta-Palets Telescópica', extraWeight: 180, flow: 60, price: 2100, desc: 'Manipulación de bloques y materiales estibados en obra.' }
  ];

  function renderVehicleDetailInfusion(machineName) {
    return `
      <div id="tmd-vehicle-360-infusion" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 my-4">
        <div class="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xl p-6 sm:p-8 text-slate-900 dark:text-white transition-all">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-5 mb-6">
            <div>
              <div class="flex items-center gap-2 text-xs font-mono text-amber-500 dark:text-amber-400 font-bold mb-2">
                <span>INSPECTOR 360°</span>
                <span>/</span>
                <span>TELEMETRÍA EN VIVO</span>
                <span>/</span>
                <span class="text-slate-900 dark:text-white">${machineName || 'JCB 3CX ECO 4X4'}</span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                Inspección Virtual 360° & Selector de Implementos Hidráulicos
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
                Seleccione el ángulo de visualización y el implemento de trabajo para recalcular en tiempo real el flujo hidráulico y el peso en orden de marcha.
              </p>
            </div>

            <div class="flex items-center gap-2 font-mono text-xs shrink-0">
              <div class="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-bold">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>RPM: <strong>2,200</strong></span>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300">
                Temp: <strong class="text-amber-500 font-bold">88°C</strong>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300">
                Consumo: <strong class="text-slate-900 dark:text-white font-bold">1.8 gal/h</strong>
              </div>
            </div>
          </div>

          <!-- Angle Selector Pills -->
          <div class="flex flex-wrap items-center gap-2 mb-6">
            <span class="text-xs font-mono text-slate-500 dark:text-neutral-400 font-bold mr-1">ÁNGULO:</span>
            <button onclick="window.tmdSetAngle(0)" class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${_activeAngle === 0 ? 'bg-amber-500 text-black font-black shadow-md' : 'bg-slate-100 dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 hover:border-amber-500/50'}">
              0° Frontal
            </button>
            <button onclick="window.tmdSetAngle(90)" class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${_activeAngle === 90 ? 'bg-amber-500 text-black font-black shadow-md' : 'bg-slate-100 dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 hover:border-amber-500/50'}">
              90° Lateral Oruga/Rueda
            </button>
            <button onclick="window.tmdSetAngle(180)" class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${_activeAngle === 180 ? 'bg-amber-500 text-black font-black shadow-md' : 'bg-slate-100 dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 hover:border-amber-500/50'}">
              180° Brazo Extradig
            </button>
            <button onclick="window.tmdSetAngle(270)" class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${_activeAngle === 270 ? 'bg-amber-500 text-black font-black shadow-md' : 'bg-slate-100 dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 hover:border-amber-500/50'}">
              270° Cabina Climatizada
            </button>
          </div>

          <!-- Attachments Grid -->
          <div class="mb-5">
            <label class="block text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold mb-3">Acople Rápido de Accesorios Hidráulicos:</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              ${ATTACHMENTS.map(function (att) {
                var isSel = _activeAttachment.name === att.name;
                return `
                  <div onclick="window.tmdSelectAttachment('${att.id}')" class="rounded-2xl p-4 border transition-all cursor-pointer ${isSel ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10' : 'bg-slate-50 dark:bg-neutral-950/60 border-slate-200 dark:border-neutral-800 hover:border-amber-500/40'}">
                    <div class="flex justify-between items-center mb-1.5">
                      <span class="text-xs font-mono font-bold ${isSel ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}">${att.name}</span>
                      <span class="w-2.5 h-2.5 rounded-full ${isSel ? 'bg-amber-500 shadow-sm shadow-amber-500/50' : 'bg-slate-300 dark:bg-neutral-700'}"></span>
                    </div>
                    <p class="text-[11px] text-slate-500 dark:text-neutral-400 mb-3 leading-relaxed">${att.desc}</p>
                    <div class="flex justify-between items-center text-[11px] font-mono text-slate-500 dark:text-neutral-400 border-t border-slate-200 dark:border-neutral-800/80 pt-2.5">
                      <span>Flujo: <strong class="text-slate-900 dark:text-white">${att.flow} L/min</strong></span>
                      <span class="font-bold text-amber-600 dark:text-amber-400">${att.price > 0 ? '+$' + att.price.toLocaleString() + ' USD' : 'Incluido'}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Recalculated Bar -->
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div class="flex items-center gap-5 flex-wrap">
              <span class="text-slate-600 dark:text-neutral-400">Peso Operativo Recalculado: <strong class="text-slate-900 dark:text-white font-bold">${(8135 + _activeAttachment.extraWeight).toLocaleString()} kg</strong></span>
              <span class="text-slate-600 dark:text-neutral-400">Caudal Hidráulico Demandado: <strong class="text-amber-600 dark:text-amber-400 font-bold">${_activeAttachment.flow} L/min</strong></span>
            </div>
            <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo cotizar el equipo ' + machineName + ' configurado con ' + _activeAttachment.name + ' para entrega en obra.')}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
              <span>Cotizar Configuración en WhatsApp</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  window.tmdSetAngle = function (deg) {
    _activeAngle = deg;
    var container = document.getElementById('tmd-vehicle-360-infusion');
    if (container) {
      container.outerHTML = renderVehicleDetailInfusion(_currentMachineName);
    }
  };

  window.tmdSelectAttachment = function (id) {
    var found = ATTACHMENTS.find(function (a) { return a.id === id; });
    if (found) {
      _activeAttachment = found;
      var container = document.getElementById('tmd-vehicle-360-infusion');
      if (container) {
        container.outerHTML = renderVehicleDetailInfusion(_currentMachineName);
      }
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. VIP PORT LOTS & TECHNICAL MAGAZINE SUITE (FOR #/magazine)
  // ─────────────────────────────────────────────────────────────────────────────
  function renderPortLotsModule() {
    return `
      <div id="tmd-port-lots-infusion" class="tmd-stitch-section rounded-[24px] border p-6 md:p-10 text-white shadow-2xl space-y-12" style="background: linear-gradient(165deg, rgba(14, 19, 30, 0.88) 0%, rgba(8, 11, 19, 0.85) 100%) !important; backdrop-filter: blur(28px) !important; -webkit-backdrop-filter: blur(28px) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0,0,0,0.85), 0 0 50px rgba(245,158,11,0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
        
        <!-- ─── PILLAR 1: LOTES PORTUARIOS VIP 0 KM (HAINA & CAUCEDO) ─── -->
        <div>
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5 mb-8">
            <div>
              <div class="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ARRIBOS MARÍTIMOS PUERTO HAINA & PUERTO CAUCEDO • 0.0 HORAS</span>
              </div>
              <h3 class="text-xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                Lotes Portuarios VIP 0 Km & Concierge para Contratistas MOPC
              </h3>
              <p class="text-xs sm:text-sm text-neutral-400 font-sans mt-1 max-w-3xl leading-relaxed">
                Maquinarias de línea pesada recién desembarcadas en muelles fiscales con despacho prioritario, inspección de tolerancia en Taller Central Km 22 y 100% de crédito fiscal ITBIS (Comprobante B01).
              </p>
            </div>
            <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo consultar los lotes portuarios 0 Km disponibles en Puerto Haina y Caucedo.')}" target="_blank" class="px-5 py-3 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.3)] shrink-0">
              <span class="material-symbols-outlined text-[18px]">verified</span>
              <span>Consultar Cupo de Importación</span>
            </a>
          </div>

          <!-- 4-Item Bento Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            <!-- Lot 1: JCB 220X (7 cols) -->
            <div class="lg:col-span-7 rounded-[22px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 shadow-lg" style="background: linear-gradient(145deg, rgba(22, 30, 46, 0.82) 0%, rgba(14, 19, 31, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between mb-3 text-xs font-mono">
                  <span class="px-3 py-1 rounded-[8px] bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 uppercase">Muelle Río Haina Oriental</span>
                  <span class="text-emerald-400 font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> 0.0 HORAS · NUEVA</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div class="rounded-[16px] overflow-hidden h-48 bg-neutral-900 border border-neutral-800">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS1qvrSRchwMffbxOiC-JwnUbO-9XacNv7BPKhoqdCGVXqyH_e567QmL8vAUa_4To8g3I_mnSo49HSqFbEJkPtn9-YIf50TkpG9XKBK_TcDbv8Pq4Ny6IZa_9Umus6_cw6M-CwlTdReLw_0qmb72yH_e1qrl4qSQxPzGnJR6TmiuNbyfL7AZMzZv47feeDVP0_S6dBjOvLvSXAguHuKCPHTfZeJ5gx3_Be3DC2c_atM1ZnqV2APuePug" class="w-full h-full object-cover" alt="JCB 220X Puerto Haina">
                  </div>
                  <div class="flex flex-col justify-between">
                    <div>
                      <h4 class="text-lg font-bold text-white mb-1.5">Excavadora JCB 220X Heavy Duty</h4>
                      <p class="text-xs text-neutral-400 mb-3 leading-relaxed">Motor EcoMAX 173 HP, cuchara 1.25 m³ HD Hardox, orugas 600mm de triple garra y garantía de 3 años o 5,000h.</p>
                    </div>
                    <div class="space-y-1.5 text-xs font-mono text-neutral-300 border-t border-neutral-800 pt-2.5">
                      <div>Lote Serial: <strong class="text-amber-400">#JCB-HN-220X-88</strong></div>
                      <div>Precio CIF: <strong class="text-white text-sm">$186,500 USD</strong> <span class="text-emerald-400 text-[10px] font-bold">(Ahorro $14,000 VIP)</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                <span class="text-xs font-mono text-neutral-400">Entrega en plataforma Lowboy a su obra</span>
                <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo separar la Excavadora JCB 220X Lote Haina (#JCB-HN-220X-88).')}" target="_blank" class="px-4 py-2.5 rounded-[10px] bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase text-xs transition-all shadow-[0_2px_10px_rgba(245,158,11,0.25)]">
                  Separar Unidad con Fianza
                </a>
              </div>
            </div>

            <!-- Lot 2: LiuGong 922E HD (5 cols) -->
            <div class="lg:col-span-5 rounded-[22px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 shadow-lg" style="background: linear-gradient(145deg, rgba(22, 30, 46, 0.82) 0%, rgba(14, 19, 31, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between mb-3 text-xs font-mono">
                  <span class="px-3 py-1 rounded-[8px] bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 uppercase">Puerto Caucedo DP World</span>
                  <span class="text-emerald-400 font-bold">22 TONELADAS</span>
                </div>
                <div class="rounded-[16px] overflow-hidden h-40 bg-neutral-900 mb-3 border border-neutral-800">
                  <img src="https://www.tmd.com.do/wp-content/uploads/2023/06/Untitled-design-24.jpg" class="w-full h-full object-cover" alt="LiuGong 922E Caucedo">
                </div>
                <h4 class="text-base font-bold text-white mb-1">LiuGong 922E HD Severe-Duty</h4>
                <p class="text-xs text-neutral-400 mb-2 leading-relaxed">Cummins 6BTAA 160 HP mecánico, hidráulica Kawasaki 350 Bar, radiador tropical de aletas anchas.</p>
                <div class="text-xs font-mono text-amber-400 font-bold">Precio Especial CIF: $174,000 USD (Serial #LG-CAU-922E-41)</div>
              </div>
              <div class="pt-3 border-t border-neutral-800 mt-3 flex justify-end">
                <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo cotizar la Excavadora LiuGong 922E HD Lote Caucedo.')}" target="_blank" class="w-full text-center py-2.5 rounded-[10px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 font-mono text-xs uppercase text-white hover:text-amber-400 transition-all">
                  Reservar Lote Caucedo →
                </a>
              </div>
            </div>

            <!-- Lot 3: LS Tractor Agro-Cibao (6 cols) -->
            <div class="lg:col-span-6 rounded-[22px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/50 shadow-lg" style="background: linear-gradient(145deg, rgba(22, 30, 46, 0.82) 0%, rgba(14, 19, 31, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between mb-3 text-xs font-mono">
                  <span class="px-3 py-1 rounded-[8px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 uppercase">Patio Central Km 22</span>
                  <span class="text-neutral-300 font-bold">101 HP TURBO</span>
                </div>
                <div class="rounded-[16px] overflow-hidden h-40 bg-neutral-900 mb-3 border border-neutral-800">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIPhBv3AUqIH6U1Io70Y415FfsHgAbCHNTnfyNzqxsH2i4okm28upwkjvXxWuyjZKrpnPiuM6bmJK6pSK_5Pj8AbFdoC4pfPVUOTBajC0i8zWzq5kvJnra_7ODlM7yJ26vPbKxVhZT-Si0YmQqy6lv8QIGaQqQO9h7_no-Z8E9qAg3e0buuWcuqE6tAZWKySmvF-STontEhmY2_EDiD_IqEfkR2Ap7Jwt4pq6p__Gh9Vy9VV0tdquLQw" class="w-full h-full object-cover" alt="LS Tractor MT7">
                </div>
                <h4 class="text-base font-bold text-white mb-1">LS Tractor MT7.100 Heavy Agro 4WD</h4>
                <p class="text-xs text-neutral-400 mb-2 leading-relaxed">FPT Iveco Turbo, transmisión Power Shuttle 40x40 Creeper, eje delantero sellado especial para arrozales y tasa Bagrícola 8.5% fija.</p>
                <div class="text-xs font-mono text-emerald-400 font-bold">Cuota Leasing desde $1,450 USD/mes · Stock Inmediato</div>
              </div>
              <div class="pt-3 border-t border-neutral-800 mt-3 flex justify-end">
                <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo cotizar el LS Tractor MT7 Serie Agro.')}" target="_blank" class="w-full text-center py-2.5 rounded-[10px] bg-emerald-600 hover:bg-emerald-500 font-mono text-xs uppercase text-white font-bold transition-all shadow-[0_2px_10px_rgba(16,185,129,0.25)]">
                  Cotizar con Crédito Bagrícola
                </a>
              </div>
            </div>

            <!-- Lot 4: Ammann ARX 26 Tándem (6 cols) -->
            <div class="lg:col-span-6 rounded-[22px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 shadow-lg" style="background: linear-gradient(145deg, rgba(28, 25, 38, 0.82) 0%, rgba(18, 16, 26, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between mb-3 text-xs font-mono">
                  <span class="px-3 py-1 rounded-[8px] bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 uppercase">En Tránsito Marítimo</span>
                  <span class="text-cyan-400 font-bold">COMPACTACIÓN ASFÁLTICA</span>
                </div>
                <div class="rounded-[16px] overflow-hidden h-40 bg-neutral-900 mb-3 border border-neutral-800">
                  <img src="https://www.tmd.com.do/wp-content/uploads/2023/06/Screenshot_102.png" class="w-full h-full object-cover" alt="Ammann ARX 26">
                </div>
                <h4 class="text-base font-bold text-white mb-1">Ammann ARX 26 Rodillo Tándem Suizo</h4>
                <p class="text-xs text-neutral-400 mb-2 leading-relaxed">Compactador vibratorio suizo 2.5T, motor Yanmar diésel, doble tambor con rociador presurizado para calzadas asfálticas de alta especificación.</p>
                <div class="text-xs font-mono text-white font-bold">Precio CIF: $58,900 USD (Lote Serial #AMM-TX-ARX26-19)</div>
              </div>
              <div class="pt-3 border-t border-neutral-800 mt-3 flex justify-end">
                <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo reservar el Rodillo Ammann ARX 26 en tránsito marítimo.')}" target="_blank" class="w-full text-center py-2.5 rounded-[10px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 font-mono text-xs uppercase text-white hover:text-amber-400 transition-all">
                  Reservar en Tránsito →
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- ─── PILLAR 2: BIBLIOTECA DE FICHAS TÉCNICAS & BROCHURES OFICIALES (EMBEDDED) ─── -->
        <div class="pt-6 border-t border-white/10">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div class="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>DOCUMENTACIÓN TÉCNICA OFICIAL ISO & MOPC</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
                Biblioteca Oficial de Fichas Técnicas & Brochures en PDF
              </h3>
              <p class="text-xs text-neutral-400 font-sans mt-0.5">
                Consulte curvas de torque, presiones hidráulicas y normativas fiscales DGII para sustentar sus licitaciones.
              </p>
            </div>
            <button onclick="typeof window.tmdOpenBrochuresHub === 'function' ? window.tmdOpenBrochuresHub() : null" class="px-4 py-2.5 rounded-[12px] bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_2px_12px_rgba(6,182,212,0.25)] shrink-0">
              <span class="material-symbols-outlined text-[18px]">folder_open</span>
              <span>Abrir Repositorio Completo</span>
            </button>
          </div>

          <!-- Embedded Fichas Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <!-- Ficha 1 (Construcción - Amber Tint) -->
            <div class="p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 shadow-sm" style="background: linear-gradient(145deg, rgba(28, 26, 20, 0.82) 0%, rgba(18, 16, 14, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
                  <span class="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">Construcción Pesada</span>
                  <span>FT-JCB-3CX-2026-DO · 4 Pág.</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Ficha Técnica Oficial — JCB 3CX Eco Tropicalizada</h4>
                <p class="text-xs text-neutral-400 mb-3">Retroexcavadora 4x4 · EcoMax 92 HP · A/C 48°C · Filtro Ciclónico Dual</p>
                <div class="space-y-1 text-[11px] font-mono text-neutral-300 border-t border-neutral-800 pt-2 mb-4">
                  <div>▪ Peso Operativo: 8,135 kg</div>
                  <div>▪ Profundidad Excavación: 5.46 m</div>
                  <div>▪ Bomba Hidráulica: Variable 251 Bar</div>
                </div>
              </div>
              <div class="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button onclick="typeof window.tmdDownloadBrochurePDF === 'function' ? window.tmdDownloadBrochurePDF('doc-jcb-3cx') : null;" class="px-3.5 py-2 rounded-[10px] bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-[15px]">download</span>
                  <span>Descargar PDF</span>
                </button>
                <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, solicito asesoría sobre la Ficha Técnica de la JCB 3CX Eco.')}" target="_blank" class="px-3 py-2 rounded-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1 border border-neutral-800 transition-all">
                  <span class="material-symbols-outlined text-[14px] text-emerald-400">chat</span>
                  <span>Consultar</span>
                </a>
              </div>
            </div>

            <!-- Ficha 2 (Minería - Steel Cyan Tint) -->
            <div class="p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 shadow-sm" style="background: linear-gradient(145deg, rgba(20, 26, 38, 0.82) 0%, rgba(13, 18, 28, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
                  <span class="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">Canteras / Minería</span>
                  <span>FT-LG-922E-2026-DO · 6 Pág.</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Ficha Técnica Oficial — LiuGong 922E HD Severe-Duty</h4>
                <p class="text-xs text-neutral-400 mb-3">Excavadora Oruga 22T · Cummins 160 HP · Balde Hardox 1.2 m³</p>
                <div class="space-y-1 text-[11px] font-mono text-neutral-300 border-t border-neutral-800 pt-2 mb-4">
                  <div>▪ Peso Operativo: 22,000 kg</div>
                  <div>▪ Presión Hidráulica: 343 Bar (Kawasaki)</div>
                  <div>▪ Cummins 6BTAA mecánico tropical</div>
                </div>
              </div>
              <div class="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button onclick="typeof window.tmdDownloadBrochurePDF === 'function' ? window.tmdDownloadBrochurePDF('doc-liugong-922e') : null;" class="px-3.5 py-2 rounded-[10px] bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-[15px]">download</span>
                  <span>Descargar PDF</span>
                </button>
                <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, solicito asesoría sobre la Ficha Técnica de la LiuGong 922E HD.')}" target="_blank" class="px-3 py-2 rounded-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1 border border-neutral-800 transition-all">
                  <span class="material-symbols-outlined text-[14px] text-emerald-400">chat</span>
                  <span>Consultar</span>
                </a>
              </div>
            </div>

            <!-- Ficha 3 (Agro - Emerald Tint) -->
            <div class="p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 shadow-sm" style="background: linear-gradient(145deg, rgba(16, 30, 24, 0.82) 0%, rgba(11, 20, 18, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
                  <span class="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 font-bold">Línea Agrícola 4WD</span>
                  <span>FT-LS-MT7-2026-DO · 4 Pág.</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Ficha Técnica Oficial — LS Tractor MT7.100 Heavy Agro</h4>
                <p class="text-xs text-neutral-400 mb-3">Tractor Agrícola 4WD 101 HP · FPT Iveco Turbo · Toma Triple</p>
                <div class="space-y-1 text-[11px] font-mono text-neutral-300 border-t border-neutral-800 pt-2 mb-4">
                  <div>▪ Potencia Neta: 101 HP FPT Iveco</div>
                  <div>▪ Levante Cat II: 3,800 kg</div>
                  <div>▪ Eje delantero sellado para lodo</div>
                </div>
              </div>
              <div class="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button onclick="typeof window.tmdDownloadBrochurePDF === 'function' ? window.tmdDownloadBrochurePDF('doc-ls-mt7') : null;" class="px-3.5 py-2 rounded-[10px] bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-[15px]">download</span>
                  <span>Descargar PDF</span>
                </button>
                <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, solicito asesoría sobre la Ficha Técnica del LS Tractor MT7.')}" target="_blank" class="px-3 py-2 rounded-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1 border border-neutral-800 transition-all">
                  <span class="material-symbols-outlined text-[14px] text-emerald-400">chat</span>
                  <span>Consultar</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- ─── PILLAR 3: CASOS DE ÉXITO EN SUELO DOMINICANO ─── -->
        <div class="pt-6 border-t border-white/10">
          <div class="mb-6">
            <div class="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span class="material-symbols-outlined text-[16px]">engineering</span>
              <span>HISTORIAS DE INGENIERÍA & DESEMPEÑO REAL EN RD</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
              Casos de Estudio: Maquinaria en Suelo Dominicano
            </h3>
            <p class="text-xs text-neutral-400 font-sans mt-0.5">
              Evidencia operativa en canteras de roca caliza, obras de autovías y arrozales de alta exigencia.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="rounded-[20px] p-5 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50" style="background: linear-gradient(145deg, rgba(28, 25, 18, 0.80) 0%, rgba(18, 16, 12, 0.76) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.06) !important;">
              <div>
                <span class="text-[10px] font-mono text-amber-400 uppercase font-bold">Canteras San Cristóbal</span>
                <h4 class="text-base font-bold text-white mt-1 mb-2">Resistencia a 350 BAR en Roca Caliza Abrasiva</h4>
                <p class="text-xs text-neutral-400 leading-relaxed font-sans">
                  Las excavadoras LiuGong 922E HD equipadas con baldes Hardox operan en doble turno en canteras de San Cristóbal sin sobrecalentamiento del circuito hidráulico a 38°C ambiente.
                </p>
              </div>
              <div class="pt-3 border-t border-neutral-800 mt-4 text-[11px] font-mono text-neutral-500">
                <span>Supervisión: Ing. Ramón Peralta (Km 22)</span>
              </div>
            </div>

            <div class="rounded-[20px] p-5 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/50" style="background: linear-gradient(145deg, rgba(16, 28, 22, 0.80) 0%, rgba(11, 20, 16, 0.76) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.06) !important;">
              <div>
                <span class="text-[10px] font-mono text-emerald-400 uppercase font-bold">Circunvalación de Baní</span>
                <h4 class="text-base font-bold text-white mt-1 mb-2">Telemetría LiveLink: -42% Tiempo Muerto</h4>
                <p class="text-xs text-neutral-400 leading-relaxed font-sans">
                  Conexión telemétrica satelital que alertó sobre saturación prematura de filtros de combustible antes de que la máquina detuviera el frente de rasante en el tramo Baní.
                </p>
              </div>
              <div class="pt-3 border-t border-neutral-800 mt-4 text-[11px] font-mono text-neutral-500">
                <span>Monitoreo: Ing. Laura Valenzuela (IoT)</span>
              </div>
            </div>

            <div class="rounded-[20px] p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/50" style="background: linear-gradient(145deg, rgba(16, 26, 36, 0.80) 0%, rgba(11, 18, 26, 0.76) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.06) !important;">
              <div>
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold">Valle de La Vega & Bonao</span>
                <h4 class="text-base font-bold text-white mt-1 mb-2">Cero Filtración de Lodo con Eje Sellado LS</h4>
                <p class="text-xs text-neutral-400 leading-relaxed font-sans">
                  Prueba de 1,200 horas en arrozales anegados demostró que el retén blindado del eje delantero evita el ingreso de sedimentos, prolongando la vida de la corona en 3X.
                </p>
              </div>
              <div class="pt-3 border-t border-neutral-800 mt-4 text-[11px] font-mono text-neutral-500">
                <span>División Agro: Jorge Torres (TMD)</span>
              </div>
            </div>

          </div>
        </div>

        <!-- ─── PILLAR 4: HERRAMIENTAS DE DECISIÓN TÉCNICA (JOHN DEERE & BOBCAT BENCHMARK) ─── -->
        <div class="pt-6 border-t border-white/10">
          <div class="mb-5">
            <span class="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">DECISIÓN DE COMPRA TIER-1</span>
            <h3 class="text-xl font-bold text-white uppercase font-sans">Herramientas Digitales de Soporte Técnico</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div onclick="typeof window.tmdOpenMachineAdvisor === 'function' ? window.tmdOpenMachineAdvisor() : null" class="p-5 rounded-[18px] cursor-pointer transition-all duration-300 hover:border-amber-500 group flex items-start gap-3.5 shadow-sm" style="background: linear-gradient(145deg, rgba(26, 24, 18, 0.82) 0%, rgba(17, 15, 12, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div class="w-10 h-10 rounded-[12px] bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div>
                <div class="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Asesor "Help Me Choose"</div>
                <div class="text-xs text-neutral-400 mt-0.5 font-sans">Quiz interactivo de 3 pasos por tipo de suelo y faena.</div>
              </div>
            </div>

            <div onclick="typeof window.tmdOpenModelComparator === 'function' ? window.tmdOpenModelComparator('backhoes') : null" class="p-5 rounded-[18px] cursor-pointer transition-all duration-300 hover:border-cyan-500 group flex items-start gap-3.5 shadow-sm" style="background: linear-gradient(145deg, rgba(18, 26, 38, 0.82) 0%, rgba(12, 18, 28, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div class="w-10 h-10 rounded-[12px] bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[22px]">compare_arrows</span>
              </div>
              <div>
                <div class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Comparador 3-Vías</div>
                <div class="text-xs text-neutral-400 mt-0.5 font-sans">Benchmark de 14 vectores vs. Cat 420 y Deere 310L.</div>
              </div>
            </div>

            <div onclick="typeof window.tmdOpenFinancialSuite === 'function' ? window.tmdOpenFinancialSuite(95000) : null" class="p-5 rounded-[18px] cursor-pointer transition-all duration-300 hover:border-emerald-500 group flex items-start gap-3.5 shadow-sm" style="background: linear-gradient(145deg, rgba(16, 28, 22, 0.82) 0%, rgba(11, 20, 16, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
              <div class="w-10 h-10 rounded-[12px] bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[22px]">calculate</span>
              </div>
              <div>
                <div class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Simulador Lease vs. Buy</div>
                <div class="text-xs text-neutral-400 mt-0.5 font-sans">Amortización acelerada 25% y crédito ITBIS DGII.</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. MODULE 1: ESTIMADOR INTELIGENTE DE COSTOS OPERATIVOS (TCO) & ALQUILER
  // ─────────────────────────────────────────────────────────────────────────────
  var _tcoDays = 7;
  var _tcoDailyRate = 220;
  var _tcoTransport = 250;
  var _tcoOperator = true;
  var _tcoFuel = false;

  window.tmdSetTcoDays = function (days) {
    _tcoDays = parseInt(days, 10);
    document.querySelectorAll('.calc-day-btn').forEach(function (btn) {
      if (parseInt(btn.getAttribute('data-days'), 10) === _tcoDays) {
        btn.classList.add('active');
        btn.setAttribute('data-active', 'true');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('data-active');
      }
    });
    window.tmdUpdateTcoCalc();
  };

  window.tmdUpdateTcoCalc = function () {
    var eqSelect = document.getElementById('calc-equipment');
    if (eqSelect) {
      _tcoDailyRate = parseFloat(eqSelect.value) || 220;
    }

    var distRadio = document.querySelector('input[name="tmd_distance"]:checked');
    if (distRadio) {
      _tcoTransport = parseFloat(distRadio.value) || 250;
    }

    var opCheck = document.getElementById('add-operator');
    if (opCheck) _tcoOperator = opCheck.checked;

    var fuelCheck = document.getElementById('add-fuel');
    if (fuelCheck) _tcoFuel = fuelCheck.checked;

    // Calculations
    var discountPct = _tcoDays >= 30 ? 0.30 : (_tcoDays >= 15 ? 0.20 : (_tcoDays >= 7 ? 0.15 : 0.0));
    var rawSubtotal = _tcoDailyRate * _tcoDays;
    var discountAmount = rawSubtotal * discountPct;
    var netRental = rawSubtotal - discountAmount;
    var operatorCost = _tcoOperator ? (45 * _tcoDays) : 0;
    var fuelCost = _tcoFuel ? (125 * _tcoDays) : 0;
    var totalUsd = Math.round(netRental + _tcoTransport + operatorCost + fuelCost);
    var totalDop = Math.round(totalUsd * 59.50);

    // Update DOM
    var elDaily = document.getElementById('rec-daily');
    if (elDaily) elDaily.innerText = 'US$ ' + _tcoDailyRate.toFixed(2);

    var elDiscount = document.getElementById('rec-discount');
    var elBadge = document.getElementById('duration-badge');
    if (elDiscount) {
      elDiscount.innerText = discountAmount > 0 ? '-US$ ' + discountAmount.toFixed(2) : '$0.00';
    }
    if (elBadge) {
      elBadge.innerText = discountPct > 0 ? '-' + (discountPct * 100) + '% Descuento Aplicado' : 'Tarifa Regular';
    }

    var elSubLabel = document.getElementById('rec-subtotal-label');
    if (elSubLabel) elSubLabel.innerText = 'Subtotal Alquiler (' + _tcoDays + ' días):';

    var elSub = document.getElementById('rec-subtotal');
    if (elSub) elSub.innerText = 'US$ ' + netRental.toFixed(2);

    var elTrans = document.getElementById('rec-transport');
    if (elTrans) elTrans.innerText = 'US$ ' + _tcoTransport.toFixed(2);

    var elOp = document.getElementById('rec-operator');
    if (elOp) elOp.innerText = 'US$ ' + operatorCost.toFixed(2);

    var elFuelRow = document.getElementById('fuel-row');
    var elFuelVal = document.getElementById('rec-fuel-val');
    if (elFuelRow && elFuelVal) {
      if (_tcoFuel) {
        elFuelRow.classList.remove('hidden');
        elFuelRow.classList.add('flex');
        elFuelVal.innerText = 'US$ ' + fuelCost.toFixed(2);
      } else {
        elFuelRow.classList.add('hidden');
        elFuelRow.classList.remove('flex');
      }
    }

    var elTotal = document.getElementById('rec-total');
    if (elTotal) elTotal.innerText = '$' + totalUsd.toLocaleString('en-US');

    var elTotalDop = document.getElementById('rec-total-dop');
    if (elTotalDop) elTotalDop.innerText = '≈ RD$ ' + totalDop.toLocaleString('es-DO');
  };

  
  // ─── BEST SELLERS HERO SHOWCASE MODULE (#/home) ───────────────────────────
  function renderBestSellersHeroModule() {
    var bestSellers = [
      {
        id: '3CX',
        brand: 'JCB',
        title: 'JCB 3CX Eco Tropicalizada',
        category: 'Retroexcavadora 4x4',
        badge: '⭐ #1 MÁS VENDIDA EN RD',
        tagline: 'El estándar de oro en obra civil, minería y zanjas en toda República Dominicana.',
        image: 'assets/machinery/classic_robust_yellow_jcb_3cx_backhoe.jpg',
        priceUSD: 89500,
        leasing: '$1,790 / mes',
        specs: [
          { l: 'Potencia', v: '92 HP Turbo' },
          { l: 'Profundidad', v: '4.24 m' },
          { l: 'Balde', v: '1.0 m³ Frontal' }
        ]
      },
      {
        id: 'LG-856T',
        brand: 'LIUGONG',
        title: 'LiuGong 856T Heavy Duty',
        category: 'Pala Cargadora Pesada',
        badge: '⭐ LÍDER EN CANTERAS & MINERÍA',
        tagline: 'Fuerza bruta de 220 HP y balde de 3.5 m³ con motor Cummins y transmisión ZF.',
        image: 'assets/machinery/heavy_liugong_922e_hd_22_ton.jpg',
        priceUSD: 115000,
        leasing: '$2,300 / mes',
        specs: [
          { l: 'Potencia', v: '220 HP Cummins' },
          { l: 'Carga Útil', v: '5,000 kg' },
          { l: 'Balde', v: '3.5 m³' }
        ]
      },
      {
        id: 'KUB-L4701',
        brand: 'KUBOTA',
        title: 'Kubota L4701 4WD',
        category: 'Tractor Utilitario',
        badge: '⭐ MÁXIMA RENTABILIDAD AGRO',
        tagline: 'El tractor más confiable y económico para cacao, plátano, vegetales y ganadería.',
        image: 'assets/machinery/rugged_utility_farm_tractor_with_heavy.jpg',
        priceUSD: 28900,
        leasing: '$580 / mes',
        specs: [
          { l: 'Potencia', v: '47.3 HP E-TVCS' },
          { l: 'Tracción', v: '4x4 Mecánica' },
          { l: 'Levante', v: '1,300 kg a 24"' }
        ]
      },
      {
        id: 'AMM-ARX26',
        brand: 'AMMANN',
        title: 'Ammann ARX 26 Tándem',
        category: 'Rodillo de Asfalto',
        badge: '⭐ PREFERIDO EN BACHEO VIAL',
        tagline: 'Compactación suiza de alta precisión para calles, parqueos y carpetas asfálticas.',
        image: 'assets/machinery/ammann_asphalt_vibratory_tandem_roller_machine.jpg',
        priceUSD: 42500,
        leasing: '$850 / mes',
        specs: [
          { l: 'Potencia', v: '31 HP Yanmar' },
          { l: 'Ancho Tambor', v: '1,200 mm' },
          { l: 'Vibración', v: 'Frecuencia Dual' }
        ]
      },
      {
        id: 'LS-PLUS100',
        brand: 'LSTRACTOR',
        title: 'LS Tractor Plus 100',
        category: 'Tractor Agrícola Pesado',
        badge: '⭐ POTENCIA ZAFRA & ARROZ',
        tagline: '98 HP turboalimentados con cabina con A/C para jornadas intensivas de zafra y arroz.',
        image: 'assets/machinery/heavy_blue_agricultural_tractor_ls_mt7.jpg',
        priceUSD: 46800,
        leasing: '$935 / mes',
        specs: [
          { l: 'Potencia', v: '98 HP Turbo' },
          { l: 'Transmisión', v: '24x24 Synchro' },
          { l: 'Cabina', v: 'Climatizada Tropical' }
        ]
      }
    ];

    var cardsHtml = bestSellers.map(function(item) {
      var waMsg = encodeURIComponent('Hola TMD Corporativo, solicito cotización para el equipo ' + item.title + ' en la portada de TMD y deseo cotizar una unidad.');
      var specsSnippet = item.specs.map(function(s) {
        return `
          <div class="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
            <span class="font-mono text-[8px] uppercase text-neutral-400 block">${s.l}</span>
            <span class="font-mono text-[11px] font-bold text-neutral-200 block">${s.v}</span>
          </div>
        `;
      }).join('');

      return `
        <div class="relative rounded-2xl bg-gradient-to-b from-[#141924] to-[#0d1017] border border-amber-500/20 hover:border-amber-500/50 p-5 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div>
            <!-- Top Tag -->
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                ${item.badge}
              </span>
              <span class="text-[10px] font-mono text-emerald-400 font-bold">Entrega Km 22</span>
            </div>

            <!-- Image -->
            <div class="h-44 w-full flex items-center justify-center p-2 mb-3 bg-black/40 rounded-xl overflow-hidden">
              <img src="${item.image}" alt="${item.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null;this.src='${item.image}';">
            </div>

            <div class="text-[10px] font-mono text-amber-500 font-bold uppercase">${item.brand} · ${item.category}</div>
            <h4 class="text-lg font-bold text-white uppercase font-headline-sm mt-0.5 line-clamp-1">${item.title}</h4>
            <p class="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">${item.tagline}</p>

            <!-- Specs -->
            <div class="grid grid-cols-3 gap-1.5 my-3">
              ${specsSnippet}
            </div>

            <!-- Price -->
            <div class="flex items-baseline justify-between pt-2 border-t border-white/10 mb-4">
              <div>
                <span class="font-mono text-[8px] uppercase text-neutral-400 block">Inversión 0 Km:</span>
                <span class="font-headline-sm text-base text-amber-400 font-bold">US$ ${item.priceUSD.toLocaleString('en-US')}</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-[8px] uppercase text-emerald-400 block">Leasing Estimado:</span>
                <span class="font-mono text-xs font-bold text-white">${item.leasing}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <a href="/ficha_tecnica.html?id=${encodeURIComponent(item.id)}" class="py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-[11px] font-bold border border-white/15 flex items-center justify-center gap-1 transition text-center">
                <span class="material-symbols-outlined text-[14px] text-amber-400">description</span>
                <span>Ver Ficha</span>
              </a>
              <a href="#/configurador?brand=${encodeURIComponent(item.brand)}&model=${encodeURIComponent(item.id)}" class="py-2 px-3 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/40 flex items-center justify-center gap-1 transition text-center">
                <span class="material-symbols-outlined text-[14px]">tune</span>
                <span>Configurar</span>
              </a>
            </div>

            <a href="https://wa.me/18098262222?text=${waMsg}" target="_blank" class="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase flex items-center justify-center gap-2 transition shadow cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">chat</span>
              <span>Solicitar Cotización B2B</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section id="tmd-best-sellers-hero-infusion" class="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 my-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider mb-2">
              <span>⭐</span>
              <span>LÍDERES DE VENTAS & ALTA ROTACIÓN 2026</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold uppercase text-white font-headline-sm tracking-tight">
              Flota Destacada con <span class="text-amber-500">Entrega Inmediata en Km 22</span>
            </h3>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Equipos 0 Km seleccionados por su probada resistencia en clima tropical, disponibilidad de repuestos genuinos y máximo valor de reventa en RD.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <a href="/#vehicles" class="py-2.5 px-4 rounded-xl bg-surface-charcoal hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase border border-white/10 flex items-center gap-1.5 transition">
              <span>Ver Todo el Inventario (106+)</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- 5-Card Best Sellers Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          ${cardsHtml}
        </div>
      </section>
    `;
  }

  function renderTcoEstimatorModule() {
    return `
      <section id="tmd-tco-estimator-infusion" class="w-full max-w-[1360px] mx-auto px-6 lg:px-12 py-12 my-8">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-amber-500/10 border border-amber-500/25 text-amber-500 font-mono text-xs uppercase tracking-widest mb-3">
            <span class="material-symbols-outlined text-[16px]">calculate</span>
            Calculadora de Tarifas & Alquiler RD
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
            Estimador Inteligente de <span class="text-amber-500">Costos Operativos</span>
          </h2>
          <p class="text-sm sm:text-base text-neutral-400 mt-2">
            Calcule al instante el costo de arrendamiento de equipos pesados con transporte Lowboy, operador certificado TMD y combustible diésel.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Controls (7 cols) -->
          <div class="lg:col-span-7 tmd-tco-controls-card p-6 sm:p-8 flex flex-col gap-6">
            <!-- 1. Equipo -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono uppercase text-neutral-400">1. Seleccione el Equipo Deseado</label>
              <select id="calc-equipment" onchange="window.tmdUpdateTcoCalc()" class="w-full px-4 py-3.5 rounded-[12px] bg-white/[0.04] backdrop-blur-md border border-white/10 text-white font-body-sm focus:border-amber-500 focus:outline-none transition-all shadow-inner">
                <option value="380">Excavadora Hidráulica 22 Ton (LiuGong 922E / CAT 320) — US$380/día</option>
                <option value="220" selected>Retroexcavadora 4x4 JCB 3CX Eco (92 HP) — US$220/día</option>
                <option value="290">Rodillo Compactador Monocilíndrico 12 Ton — US$290/día</option>
                <option value="340">Telehandler Telescópico JCB 531-70 (3.1 Ton) — US$340/día</option>
                <option value="190">Tractor Agrícola Doble Tracción LS MT7 140HP — US$190/día</option>
              </select>
              <span class="text-xs text-amber-500 flex items-center gap-1.5 pt-0.5">
                <span class="material-symbols-outlined text-[14px]">info</span>
                Recomendado para corte de terrenos, zanjeado industrial y canteras de agregados.
              </span>
            </div>

            <!-- 2. Duración -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <label class="text-xs font-mono uppercase text-neutral-400">2. Duración del Alquiler</label>
                <span id="duration-badge" class="px-2.5 py-0.5 rounded-[6px] bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  -15% Descuento Aplicado
                </span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button type="button" data-days="3" onclick="window.tmdSetTcoDays(3)" class="calc-day-btn py-3 px-2 rounded-[12px] bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-bold text-center transition-all cursor-pointer">
                  3 Días
                </button>
                <button type="button" data-days="7" data-active="true" onclick="window.tmdSetTcoDays(7)" class="calc-day-btn active py-3 px-2 rounded-[12px] text-black text-xs font-bold text-center transition-all cursor-pointer">
                  7 Días (-15%)
                </button>
                <button type="button" data-days="15" onclick="window.tmdSetTcoDays(15)" class="calc-day-btn py-3 px-2 rounded-[12px] bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-bold text-center transition-all cursor-pointer">
                  15 Días (-20%)
                </button>
                <button type="button" data-days="30" onclick="window.tmdSetTcoDays(30)" class="calc-day-btn py-3 px-2 rounded-[12px] bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-bold text-center transition-all cursor-pointer">
                  30+ Días (-30%)
                </button>
              </div>
            </div>

            <!-- 3. Transporte Lowboy -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono uppercase text-neutral-400">3. Distancia Transporte Lowboy (Ida y Retorno desde Km 22)</label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label class="tmd-option-card p-3 rounded-[14px] flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" name="tmd_distance" value="250" checked onchange="window.tmdUpdateTcoCalc()" class="accent-primary-container w-4 h-4">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-white">Gran Santo Domingo</span>
                    <span class="text-[11px] text-neutral-400">15-30km (+US$250)</span>
                  </div>
                </label>
                <label class="tmd-option-card p-3 rounded-[14px] flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" name="tmd_distance" value="550" onchange="window.tmdUpdateTcoCalc()" class="accent-primary-container w-4 h-4">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-white">Santiago / Cibao</span>
                    <span class="text-[11px] text-neutral-400">140km (+US$550)</span>
                  </div>
                </label>
                <label class="tmd-option-card p-3 rounded-[14px] flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" name="tmd_distance" value="700" onchange="window.tmdUpdateTcoCalc()" class="accent-primary-container w-4 h-4">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-white">Punta Cana / Este</span>
                    <span class="text-[11px] text-neutral-400">190km (+US$700)</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- 4. Servicios Auxiliares -->
            <div class="flex flex-col gap-2 pt-1">
              <label class="text-xs font-mono uppercase text-neutral-400">4. Servicios Auxiliares en Obra</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="tmd-option-card p-3.5 rounded-[14px] flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" id="add-operator" checked onchange="window.tmdUpdateTcoCalc()" class="w-4 h-4 accent-primary-container">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-white">Operador Certificado TMD</span>
                    <span class="text-[11px] text-neutral-400">+US$ 45 / día de faena</span>
                  </div>
                </label>
                <label class="tmd-option-card p-3.5 rounded-[14px] flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" id="add-fuel" onchange="window.tmdUpdateTcoCalc()" class="w-4 h-4 accent-primary-container">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-white">Suministro Diario Diésel 1</span>
                    <span class="text-[11px] text-neutral-400">50 gal / día (tarifa MICM)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Live Receipt Sidebar (5 cols) -->
          <div class="lg:col-span-5 tmd-tco-receipt-card p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div class="flex flex-col gap-5">
              <div class="flex items-center justify-between pb-4 border-b border-white/8">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="text-xs font-mono font-bold uppercase text-white tracking-wider">Presupuesto Estimado</span>
                </div>
                <span class="text-[11px] font-mono text-neutral-400">VALIDEZ: 48 HORAS</span>
              </div>

              <!-- Breakdown Table -->
              <div class="flex flex-col gap-3 font-mono text-xs text-neutral-300">
                <div class="flex items-center justify-between">
                  <span>Tarifa Diaria Base:</span>
                  <span id="rec-daily" class="font-bold text-white">US$ 220.00</span>
                </div>
                <div class="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>Descuento Volumen (15%):</span>
                  <span id="rec-discount">-US$ 231.00</span>
                </div>
                <div class="flex items-center justify-between">
                  <span id="rec-subtotal-label">Subtotal Alquiler (7 días):</span>
                  <span id="rec-subtotal" class="font-bold text-white">US$ 1,309.00</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Transporte Cama Baja:</span>
                  <span id="rec-transport" class="font-bold text-white">US$ 250.00</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Operador TMD Certificado:</span>
                  <span id="rec-operator" class="font-bold text-white">US$ 315.00</span>
                </div>
                <div id="fuel-row" class="hidden items-center justify-between text-amber-400">
                  <span>Combustible Diésel Previsto:</span>
                  <span id="rec-fuel-val" class="font-bold">US$ 0.00</span>
                </div>
              </div>

              <!-- Total Callout -->
              <div class="tmd-receipt-callout p-5 rounded-[16px] flex flex-col items-center justify-center text-center">
                <span class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Inversión Total Estimada</span>
                <div class="flex items-baseline gap-2 mt-1">
                  <span id="rec-total" class="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight">$1,874</span>
                  <span class="text-xs font-mono text-neutral-400 font-bold">USD</span>
                </div>
                <span id="rec-total-dop" class="text-xs font-mono text-emerald-400 mt-1 font-semibold">≈ RD$ 111,503 DOP</span>
                <span class="text-[10px] text-neutral-400 mt-2">No incluye ITBIS (18%) • Facturación electrónica con Crédito Fiscal e-CF B01 disponible.</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col gap-3 pt-2">
              <button type="button" onclick="window.tmdTriggerQuoteModal()" class="w-full py-4 px-6 rounded-[14px] bg-primary-container hover:bg-hazard-gold-active text-black font-headline-sm text-xs font-bold uppercase transition-all shadow-[0_6px_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Reservar Flota / Agendar Alquiler</span>
              </button>
              <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, solicito una Proforma Oficial para alquiler de equipo según el Estimador Web.')}" target="_blank" class="w-full py-3 px-4 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono uppercase text-center border border-white/10 transition-colors flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[16px]">file_download</span>
                <span>Solicitar Proforma Oficial PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. MODULE 2: RADAR NACIONAL DE COBERTURA 32 PROVINCIAS & TELEMETRÍA LIVELINK
  // ─────────────────────────────────────────────────────────────────────────────
  var _hubsData = {
    km22: {
      title: 'Sede Central & Taller Principal Km 22',
      address: 'Autopista Duarte Km 22, La Guáyiga, Santo Domingo Oeste',
      eta: '< 2 Horas en Gran Santo Domingo',
      phone: '(809) 826-2222',
      services: ['Showroom principal 0km', 'Banco hidrostático 6,000 PSI', 'Almacén central repuestos Bin C-04', '18 Bahías de servicio pesado'],
      latTop: '52%',
      latLeft: '54%'
    },
    santiago: {
      title: 'Hub Norte Cibao (Santiago)',
      address: 'Autopista Joaquín Balaguer Km 3, Santiago de los Caballeros',
      eta: '< 2.5 Horas en Valle del Cibao',
      phone: '(809) 826-2223',
      services: ['Base móvil para canteras y minería', 'Especialistas en tractores agrícolas LS', 'Diagnóstico LiveLink in situ', 'Taller rápido de mangueras hidráulicas'],
      latTop: '35%',
      latLeft: '45%'
    },
    puntacana: {
      title: 'Hub Este (Punta Cana / Verón)',
      address: 'Boulevard Turístico del Este Km 14, Punta Cana',
      eta: '< 3 Horas en Corredor Hotelero',
      phone: '(809) 826-2224',
      services: ['Soporte a proyectos viales y aeroportuarios', 'Generadores y telehandlers JCB', 'Camioneta 4x4 con crimpadora 2"', 'Despacho nocturno programado'],
      latTop: '50%',
      latLeft: '82%'
    },
    sur: {
      title: 'Hub Sur (Haina & Barahona)',
      address: 'Carretera Sánchez Km 12, Haina / Enlace Barahona',
      eta: '< 3.5 Horas en Región Suroeste',
      phone: '(809) 826-2225',
      services: ['Atención a canteras de caliza y yeso', 'Excavadoras de minería LiuGong 22T', 'Monitoreo satelital continuo', 'Flota móvil de auxilio 24/7'],
      latTop: '60%',
      latLeft: '48%'
    }
  };

  window.tmdSelectMapHub = function (hubKey) {
    var data = _hubsData[hubKey];
    if (!data) return;

    var elTitle = document.getElementById('tmd-hub-title');
    var elAddr = document.getElementById('tmd-hub-address');
    var elEta = document.getElementById('tmd-hub-eta');
    var elPhone = document.getElementById('tmd-hub-phone');
    var elServices = document.getElementById('tmd-hub-services');

    if (elTitle) elTitle.innerText = data.title;
    if (elAddr) elAddr.innerText = data.address;
    if (elEta) elEta.innerText = data.eta;
    if (elPhone) elPhone.innerText = data.phone;

    if (elServices) {
      elServices.innerHTML = data.services.map(function (s) {
        return `<div class="flex items-center gap-2 text-white"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>${s}</div>`;
      }).join('');
    }

    document.querySelectorAll('.tmd-hub-marker-btn').forEach(function (btn) {
      if (btn.getAttribute('data-hub') === hubKey) {
        btn.classList.add('ring-2', 'ring-amber-500');
      } else {
        btn.classList.remove('ring-2', 'ring-amber-500');
      }
    });
  };

  function renderNationalCoverageModule() {
    return `
      <section id="tmd-national-coverage-infusion" class="w-full max-w-[1360px] mx-auto px-6 lg:px-12 py-12 my-8">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span class="material-symbols-outlined text-[16px]">map</span>
            Cobertura & Logística Nacional
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
            Red de Servicio en Toda la <span class="text-amber-500">República Dominicana</span>
          </h2>
          <p class="text-sm sm:text-base text-neutral-400 mt-2">
            Garantizamos tiempos de respuesta mínimos ante emergencias mecánicas y despacho continuo de repuestos a las 32 provincias.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Graphic Map Stage (7 cols) -->
          <div class="lg:col-span-7 p-6 rounded-[20px] bg-gradient-to-b from-[#181c26]/90 to-[#0b0d13]/95 backdrop-blur-[24px] border border-white/8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col gap-4 relative overflow-hidden">
            <div class="flex items-center justify-between z-10">
              <span class="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
                <span class="material-symbols-outlined text-amber-500 text-[18px]">hub</span>
                Puntos de Presencia & Patios TMD
              </span>
              <span class="px-2.5 py-0.5 rounded-[6px] bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                100% COBERTURA REGIONAL
              </span>
            </div>

            <!-- DR Map with Pins -->
            <div class="w-full h-84 rounded-[16px] bg-cover bg-center relative overflow-hidden flex items-center justify-center border border-white/10" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYg3b5VayorCy0GK58I7HJNRKBsfW6cskIId5WOUUxQ_4qKOeU9l-RnVQNP22URGj-ej3JFZ7im0B2-_q8_pCBSEjEwcqyMIgDLCzDJp5WCTDkpnfqmL9ikzZPlRl1avvCRSmxudmMKvLBbOlXcMiKOpepAX1UA6SDtFexcDz8gf4evLWcpSM1LylxDdt9sZnAO-5zB93xKiSMmkZ5BqKJvMUPvc7TG57coSBsUqUbCw0l0oeLoMX60w');">
              <div class="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

              <!-- Santiago Pin -->
              <div class="tmd-hub-marker-btn absolute top-[35%] left-[45%] flex flex-col items-center group cursor-pointer" data-hub="santiago" onclick="window.tmdSelectMapHub('santiago')">
                <div class="px-2.5 py-1 bg-black/80 text-white rounded-[8px] border border-white/20 font-mono text-[10px] font-bold uppercase shadow-lg">Santiago</div>
                <span class="w-3.5 h-3.5 rounded-full bg-amber-500 animate-ping mt-1"></span>
              </div>

              <!-- Km 22 Santo Domingo Pin -->
              <div class="tmd-hub-marker-btn ring-2 ring-amber-500 absolute top-[52%] left-[54%] flex flex-col items-center group cursor-pointer scale-110" data-hub="km22" onclick="window.tmdSelectMapHub('km22')">
                <div class="px-3 py-1 bg-primary-container text-black font-mono text-[11px] font-bold uppercase rounded-[8px] shadow-xl">
                  Sede Km 22 (Central)
                </div>
                <span class="w-4 h-4 rounded-full bg-emerald-500 border-2 border-black mt-1"></span>
              </div>

              <!-- Punta Cana Pin -->
              <div class="tmd-hub-marker-btn absolute top-[50%] left-[82%] flex flex-col items-center group cursor-pointer" data-hub="puntacana" onclick="window.tmdSelectMapHub('puntacana')">
                <div class="px-2.5 py-1 bg-black/80 text-white rounded-[8px] border border-white/20 font-mono text-[10px] font-bold uppercase shadow-lg">Punta Cana</div>
                <span class="w-3.5 h-3.5 rounded-full bg-amber-500 mt-1"></span>
              </div>

              <!-- Sur Pin -->
              <div class="tmd-hub-marker-btn absolute top-[62%] left-[46%] flex flex-col items-center group cursor-pointer" data-hub="sur" onclick="window.tmdSelectMapHub('sur')">
                <div class="px-2.5 py-1 bg-black/80 text-white rounded-[8px] border border-white/20 font-mono text-[10px] font-bold uppercase shadow-lg">Sur / Haina</div>
                <span class="w-3.5 h-3.5 rounded-full bg-amber-500 mt-1"></span>
              </div>
            </div>

            <!-- Regional Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center font-mono text-xs">
              <div class="p-3 rounded-[12px] bg-white/[0.03] border border-white/8">
                <span class="text-amber-500 font-bold text-base block">100%</span>
                <span class="text-[10px] text-neutral-400 uppercase">Cobertura País</span>
              </div>
              <div class="p-3 rounded-[12px] bg-white/[0.03] border border-white/8">
                <span class="text-emerald-400 font-bold text-base block">&lt; 2-4h</span>
                <span class="text-[10px] text-neutral-400 uppercase">Respuesta Faena</span>
              </div>
              <div class="p-3 rounded-[12px] bg-white/[0.03] border border-white/8">
                <span class="text-white font-bold text-base block">15+</span>
                <span class="text-[10px] text-neutral-400 uppercase">Vans Taller 4x4</span>
              </div>
              <div class="p-3 rounded-[12px] bg-white/[0.03] border border-white/8">
                <span class="text-amber-500 font-bold text-base block">45+</span>
                <span class="text-[10px] text-neutral-400 uppercase">Técnicos Cert.</span>
              </div>
            </div>
          </div>

          <!-- Node Breakdown & 32-Province Calculator Panel (5 cols) -->
          <div class="lg:col-span-5 p-6 sm:p-8 rounded-[20px] bg-gradient-to-b from-[#1c2230]/90 to-[#0d1017]/95 backdrop-blur-[24px] border border-amber-500/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] flex flex-col justify-between gap-5">
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-amber-500 uppercase tracking-wider">Sede Operativa / Nodo Activo</span>
                <span id="tmd-hub-status-badge" class="px-2 py-0.5 rounded-[6px] bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">OPERATIVO 24/7</span>
              </div>
              <h3 id="tmd-hub-title" class="text-xl font-extrabold text-white uppercase leading-snug">Sede Central & Taller Principal Km 22</h3>
              <p id="tmd-hub-address" class="text-xs text-neutral-300 flex items-start gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-amber-500 shrink-0">pin_drop</span>
                <span id="tmd-hub-address-text">Autopista Duarte Km 22, La Guáyiga, Santo Domingo Oeste</span>
              </p>

              <!-- Province Travel-Time Calculator Dropdown -->
              <div class="pt-2 border-t border-white/10 mt-1">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[11px] font-mono font-bold text-amber-400 uppercase">📍 Calculadora de Flete a Obra:</span>
                  <span class="text-[10px] font-mono text-neutral-400">32 Provincias</span>
                </div>
                <select id="tmd-stitch-province-select" onchange="window.tmdUpdateStitchProvince(this.value)" class="w-full bg-[#0d1017] border border-amber-500/40 text-white text-xs font-semibold rounded-[10px] p-2.5 outline-none cursor-pointer">
                  <option value="0">Santo Domingo (Metropolitana) — 12 km</option>
                  <option value="1">Distrito Nacional (Centro) — 18 km</option>
                  <option value="2">San Cristóbal (Sur Cercano) — 28 km</option>
                  <option value="3">Monte Plata (Este Cercano) — 45 km</option>
                  <option value="4">Monseñor Nouel (Bonao) — 62 km</option>
                  <option value="5">Peravia (Baní) — 68 km</option>
                  <option value="6">San Pedro de Macorís — 85 km</option>
                  <option value="7">Sánchez Ramírez (Cotuí) — 88 km</option>
                  <option value="8">San José de Ocoa — 92 km</option>
                  <option value="9">La Vega (Cibao Central) — 98 km</option>
                  <option value="10">Hato Mayor — 110 km</option>
                  <option value="11">Azua — 115 km</option>
                  <option value="12">Duarte (San Francisco de Macorís) — 122 km</option>
                  <option value="13">La Romana — 125 km</option>
                  <option value="14" selected>Santiago de los Caballeros — 135 km</option>
                  <option value="15">Espaillat (Moca) — 138 km</option>
                  <option value="16">El Seibo — 138 km</option>
                  <option value="17">Hermanas Mirabal (Salcedo) — 142 km</option>
                  <option value="18">María Trinidad Sánchez (Nagua) — 155 km</option>
                  <option value="19">La Altagracia (Punta Cana / Higüey) — 175 km</option>
                  <option value="20">Puerto Plata (Costa Norte) — 185 km</option>
                  <option value="21">San Juan de la Maguana — 185 km</option>
                  <option value="22">Valverde (Mao) — 185 km</option>
                  <option value="23">Barahona (Suroeste) — 188 km</option>
                  <option value="24">Samaná (Península) — 195 km</option>
                  <option value="25">Santiago Rodríguez — 215 km</option>
                  <option value="26">Bahoruco (Neyba) — 220 km</option>
                  <option value="27">Monte Cristi — 245 km</option>
                  <option value="28">Elías Piña (Frontera) — 245 km</option>
                  <option value="29">Independencia (Jimaní) — 250 km</option>
                  <option value="30">Dajabón (Frontera Norte) — 265 km</option>
                  <option value="31">Pedernales (Cabo Rojo / Alcoa) — 295 km</option>
                </select>
              </div>

              <!-- Real-Time Province Metrics -->
              <div class="grid grid-cols-3 gap-2 font-mono text-center pt-1">
                <div class="p-2 rounded-[10px] bg-white/[0.04] border border-white/8">
                  <span class="text-[9px] text-neutral-400 uppercase block">Distancia:</span>
                  <span id="tmd-stitch-km" class="font-bold text-amber-400 text-xs block mt-0.5">135 km</span>
                </div>
                <div class="p-2 rounded-[10px] bg-white/[0.04] border border-white/8">
                  <span class="text-[9px] text-neutral-400 uppercase block">Flete Cama Baja:</span>
                  <span id="tmd-stitch-lowboy" class="font-bold text-sky-400 text-xs block mt-0.5">3.0 horas</span>
                </div>
                <div class="p-2 rounded-[10px] bg-white/[0.04] border border-white/8">
                  <span class="text-[9px] text-neutral-400 uppercase block">SLA Auxilio:</span>
                  <span id="tmd-stitch-sla" class="font-bold text-emerald-400 text-xs block mt-0.5">&lt; 1.5 horas</span>
                </div>
              </div>

              <div class="flex flex-col gap-1.5 pt-1 font-mono text-xs">
                <span class="text-[11px] text-neutral-400 uppercase tracking-wider">Capacidades del Nodo:</span>
                <div id="tmd-hub-services" class="space-y-1 text-neutral-300">
                  <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span id="tmd-hub-spec-1">18 Bahías pesadas y dinamómetro</span></div>
                  <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span id="tmd-hub-spec-2">Banco de pruebas hidrostático 6,000 PSI</span></div>
                  <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span id="tmd-hub-spec-3">Laboratorio diésel y almacén repuestos OEM</span></div>
                </div>
              </div>
            </div>

            <a id="tmd-stitch-dispatch-btn" href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, solicito cotización de flete en Cama Baja / auxilio técnico para maquinaria en Santiago.')}" target="_blank" class="w-full py-3.5 px-5 rounded-[12px] bg-primary-container hover:bg-hazard-gold-active text-black font-headline-sm text-xs font-bold uppercase transition-all shadow-[0_6px_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-[18px]">local_shipping</span>
              <span id="tmd-stitch-btn-text">Solicitar Despacho a Santiago</span>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  // Global Map Interactive Handlers
  window.tmdSelectMapHub = function (hubKey) {
    var hubs = {
      km22: {
        title: 'Sede Central & Taller Principal Km 22',
        address: 'Autopista Duarte Km 22, La Guáyiga, Santo Domingo Oeste',
        status: 'OPERATIVO 24/7',
        phone: '(809) 826-2222',
        specs: ['18 Bahías pesadas y dinamómetro', 'Banco de pruebas hidrostático 6,000 PSI', 'Laboratorio diésel y almacén repuestos OEM']
      },
      santiago: {
        title: 'Hub Cibao (Santiago • Nodo Norte)',
        address: 'Autopista Duarte Entrada Santiago, Zona Industrial',
        status: 'ACTIVO',
        phone: '(809) 826-2223',
        specs: ['Flota móvil de auxilio mecánico 4x4', 'Repuestos de alta rotación para minería y agro', 'Soporte técnico directo en canteras del Cibao']
      },
      puntacana: {
        title: 'Nodo Este (Punta Cana • Base Este)',
        address: 'Boulevard Turístico del Este, Bávaro / Punta Cana',
        status: 'ACTIVO',
        phone: '(809) 826-2222',
        specs: ['Soporte para canteras de caliza y hoteles', 'Técnicos especialistas en plantas eléctricas', 'Atención prioritaria aeropuertos y obras viales']
      },
      sur: {
        title: 'Base Sur (Barahona • Nodo Suroeste)',
        address: 'Carretera Sánchez Km 5, Barahona',
        status: 'ACTIVO',
        phone: '(809) 826-2222',
        specs: ['Mantenimiento pesado para minería de bauxita y yeso', 'Auxilio técnico para parques eólicos y solares', 'Respaldo móvil en Pedernales y Jimaní']
      }
    };

    var hub = hubs[hubKey] || hubs.km22;
    var tEl = document.getElementById('tmd-hub-title');
    var aEl = document.getElementById('tmd-hub-address-text');
    var sEl = document.getElementById('tmd-hub-status-badge');
    var s1 = document.getElementById('tmd-hub-spec-1');
    var s2 = document.getElementById('tmd-hub-spec-2');
    var s3 = document.getElementById('tmd-hub-spec-3');

    if (tEl) tEl.textContent = hub.title;
    if (aEl) aEl.textContent = hub.address;
    if (sEl) sEl.textContent = hub.status;
    if (s1 && hub.specs[0]) s1.textContent = hub.specs[0];
    if (s2 && hub.specs[1]) s2.textContent = hub.specs[1];
    if (s3 && hub.specs[2]) s3.textContent = hub.specs[2];

    document.querySelectorAll('.tmd-hub-marker-btn').forEach(function (el) {
      if (el.getAttribute('data-hub') === hubKey) {
        el.classList.add('ring-2', 'ring-amber-500', 'scale-110');
      } else {
        el.classList.remove('ring-2', 'ring-amber-500', 'scale-110');
      }
    });
  };

  window.tmdUpdateStitchProvince = function (idx) {
    var pList = [
      { name: 'Santo Domingo', km: 12, lowboy: '0.8h', sla: '< 1.5h', hub: 'km22' },
      { name: 'Distrito Nacional', km: 18, lowboy: '1.0h', sla: '< 1.5h', hub: 'km22' },
      { name: 'San Cristóbal', km: 28, lowboy: '1.2h', sla: '< 2.0h', hub: 'km22' },
      { name: 'Monte Plata', km: 45, lowboy: '1.5h', sla: '< 2.5h', hub: 'km22' },
      { name: 'Monseñor Nouel (Bonao)', km: 62, lowboy: '1.8h', sla: '< 2.0h', hub: 'km22' },
      { name: 'Peravia (Baní)', km: 68, lowboy: '1.8h', sla: '< 2.0h', hub: 'km22' },
      { name: 'San Pedro de Macorís', km: 85, lowboy: '2.2h', sla: '< 2.5h', hub: 'puntacana' },
      { name: 'Sánchez Ramírez (Cotuí)', km: 88, lowboy: '2.3h', sla: '< 2.5h', hub: 'santiago' },
      { name: 'San José de Ocoa', km: 92, lowboy: '2.5h', sla: '< 3.0h', hub: 'km22' },
      { name: 'La Vega', km: 98, lowboy: '2.4h', sla: '< 2.0h', hub: 'santiago' },
      { name: 'Hato Mayor', km: 110, lowboy: '2.8h', sla: '< 3.0h', hub: 'puntacana' },
      { name: 'Azua', km: 115, lowboy: '2.8h', sla: '< 3.0h', hub: 'sur' },
      { name: 'Duarte (San Francisco)', km: 122, lowboy: '3.0h', sla: '< 2.5h', hub: 'santiago' },
      { name: 'La Romana', km: 125, lowboy: '3.0h', sla: '< 2.0h', hub: 'puntacana' },
      { name: 'Santiago de los Caballeros', km: 135, lowboy: '3.0h', sla: '< 1.5h', hub: 'santiago' },
      { name: 'Espaillat (Moca)', km: 138, lowboy: '3.2h', sla: '< 2.0h', hub: 'santiago' },
      { name: 'El Seibo', km: 138, lowboy: '3.2h', sla: '< 3.0h', hub: 'puntacana' },
      { name: 'Hermanas Mirabal (Salcedo)', km: 142, lowboy: '3.2h', sla: '< 2.5h', hub: 'santiago' },
      { name: 'María Trinidad Sánchez (Nagua)', km: 155, lowboy: '3.5h', sla: '< 3.0h', hub: 'santiago' },
      { name: 'La Altagracia (Punta Cana)', km: 175, lowboy: '3.8h', sla: '< 1.5h', hub: 'puntacana' },
      { name: 'Puerto Plata', km: 185, lowboy: '4.2h', sla: '< 2.5h', hub: 'santiago' },
      { name: 'San Juan de la Maguana', km: 185, lowboy: '4.0h', sla: '< 3.5h', hub: 'sur' },
      { name: 'Valverde (Mao)', km: 185, lowboy: '4.2h', sla: '< 2.5h', hub: 'santiago' },
      { name: 'Barahona', km: 188, lowboy: '4.0h', sla: '< 1.5h', hub: 'sur' },
      { name: 'Samaná', km: 195, lowboy: '4.2h', sla: '< 3.5h', hub: 'santiago' },
      { name: 'Santiago Rodríguez', km: 215, lowboy: '4.8h', sla: '< 3.5h', hub: 'santiago' },
      { name: 'Bahoruco (Neyba)', km: 220, lowboy: '4.8h', sla: '< 3.0h', hub: 'sur' },
      { name: 'Monte Cristi', km: 245, lowboy: '5.2h', sla: '< 4.0h', hub: 'santiago' },
      { name: 'Elías Piña (Frontera)', km: 245, lowboy: '5.2h', sla: '< 4.0h', hub: 'sur' },
      { name: 'Independencia (Jimaní)', km: 250, lowboy: '5.4h', sla: '< 3.5h', hub: 'sur' },
      { name: 'Dajabón (Frontera Norte)', km: 265, lowboy: '5.5h', sla: '< 4.0h', hub: 'santiago' },
      { name: 'Pedernales (Cabo Rojo)', km: 295, lowboy: '6.2h', sla: '< 4.0h', hub: 'sur' }
    ];

    var item = pList[parseInt(idx, 10)] || pList[0];
    var kmEl = document.getElementById('tmd-stitch-km');
    var lbEl = document.getElementById('tmd-stitch-lowboy');
    var slaEl = document.getElementById('tmd-stitch-sla');
    var btn = document.getElementById('tmd-stitch-dispatch-btn');
    var btnText = document.getElementById('tmd-stitch-btn-text');

    if (kmEl) kmEl.textContent = item.km + ' km';
    if (lbEl) lbEl.textContent = item.lowboy;
    if (slaEl) slaEl.textContent = item.sla;
    if (btnText) btnText.textContent = 'Solicitar Despacho a ' + item.name;
    if (btn) {
      var text = 'Hola TMD Dominicana, solicito cotización de flete en Cama Baja (Lowboy) / auxilio técnico para maquinaria en ' + item.name + ' (Distancia Km 22: ' + item.km + ' km).';
      btn.href = 'https://api.whatsapp.com/send/?phone=18098262222&text=' + encodeURIComponent(text);
    }

    window.tmdSelectMapHub(item.hub);
  };

  // ─────────────────────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
  // 8. MODULE 3: CATÁLOGO MAESTRO MULTIMARCA & TIENDA INDUSTRIAL B2B (#/vehicles)
  // 180+ Unidades Oficiales · 10 Marcas · Modos Duales (Renta / Compra) · Comparador
  // ─────────────────────────────────────────────────────────────────────────────
  var _activeModality = 'ALL';       // 'ALL' | 'RENT' | 'BUY'
  var _activeSector = 'ALL';         // 'ALL' | 'CONSTRUCTION' | 'AGRICULTURE' | 'COMPACTION' | 'CONCRETE' | 'SAFETY'
  var _activeBrandFilter = 'ALL';    // 'ALL' | 'JCB' | 'LIUGONG' | 'KUBOTA' | 'LSTRACTOR' | 'YANMAR' | 'AMMANN' | 'IMER' | 'IMPLEMENTOS' | 'AFEX'
  var _activePowerFilter = 'ALL';    // 'ALL' | 'sub50' | '50_100' | '100_200' | 'plus200'
  var _activeWeightFilter = 'ALL';   // 'ALL' | 'compact' | 'medium' | 'heavy'
  var _activeStockOnly = false;
  var _catalogSearchQuery = '';
  var _catalogSortOrder = 'popular'; // 'popular' | 'price_asc' | 'price_desc' | 'hp_desc' | 'weight_desc'
  var _currentPage = 1;
  var _itemsPerPage = 12;            // Enterprise paginated batch (12 units)
  var _compareList = [];
  window._storeViewMode = 'grid';

  // Helpers: reset page to 1 on filter changes
  function tmdResetPage() {
    _currentPage = 1;
  }

  // Enterprise Pagination Navigator
  window.tmdGoToPage = function(p) {
    _currentPage = parseInt(p, 10) || 1;
    window.tmdRenderStoreGrid();
    var gridEl = document.getElementById('tmd-store-cards-grid');
    if (gridEl) {
      var y = gridEl.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  // Filter setters
  window.tmdSetModalityFilter = function(modality) {
    _activeModality = modality || 'ALL';
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdSetSectorFilter = function(sectorId) {
    _activeSector = sectorId || 'ALL';
    _activeBrandFilter = 'ALL';
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdSetBrandFilter = function(brandId) {
    _activeBrandFilter = brandId || 'ALL';
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdSetPowerFilter = function(powerRange) {
    _activePowerFilter = powerRange || 'ALL';
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdSetWeightFilter = function(weightRange) {
    _activeWeightFilter = weightRange || 'ALL';
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdToggleStockOnly = function(checked) {
    _activeStockOnly = !!checked;
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdSetSortOrder = function(order) {
    _catalogSortOrder = order || 'popular';
    tmdResetPage();
    window.tmdRefreshStoreUI();
  };

  window.tmdOnCatalogSearchInput = function(val) {
    _catalogSearchQuery = (val || '').toLowerCase().trim();
    tmdResetPage();
    window.tmdRenderStoreGrid();
    window.tmdRenderActiveChips();
  };

  window.tmdClearSearch = function() {
    _catalogSearchQuery = '';
    var inp = document.getElementById('tmd-store-search-input');
    if (inp) inp.value = '';
    tmdResetPage();
    window.tmdRenderStoreGrid();
    window.tmdRenderActiveChips();
  };

  window.tmdResetAllFilters = function() {
    _activeModality = 'ALL';
    _activeSector = 'ALL';
    _activeBrandFilter = 'ALL';
    _activePowerFilter = 'ALL';
    _activeWeightFilter = 'ALL';
    _activeStockOnly = false;
    _catalogSearchQuery = '';
    _catalogSortOrder = 'popular';
    tmdResetPage();

    var searchInput = document.getElementById('tmd-store-search-input');
    if (searchInput) searchInput.value = '';
    var stockCheckbox = document.getElementById('tmd-filter-stock-only');
    if (stockCheckbox) stockCheckbox.checked = false;
    var pSelect = document.getElementById('tmd-filter-power');
    if (pSelect) pSelect.value = 'ALL';
    var wSelect = document.getElementById('tmd-filter-weight');
    if (wSelect) wSelect.value = 'ALL';

    window.tmdRefreshStoreUI();
  };

  // View Mode: 'grid' | 'list'
  window.tmdSetStoreViewMode = function(mode) {
    window._storeViewMode = mode;
    var gridEl = document.getElementById('tmd-store-cards-grid');
    var btnGrid = document.getElementById('tmd-btn-view-grid');
    var btnList = document.getElementById('tmd-btn-view-list');
    if (gridEl) {
      if (mode === 'list') {
        gridEl.classList.add('tmd-store-view-list');
      } else {
        gridEl.classList.remove('tmd-store-view-list');
      }
    }
    if (btnGrid && btnList) {
      if (mode === 'list') {
        btnList.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-amber-500 text-black shadow';
        btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-neutral-400 hover:text-white';
      } else {
        btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-amber-500 text-black shadow';
        btnList.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-neutral-400 hover:text-white';
      }
    }
    window.tmdRenderStoreGrid();
  };

  // Compare Dock & Modal
  window.tmdToggleCompare = function(prodId) {
    var all = getAllStoreProducts();
    var item = all.find(function(x) { return x.id === prodId; });
    if (!item) return;

    var existingIdx = _compareList.findIndex(function(x) { return x.id === prodId; });
    if (existingIdx > -1) {
      _compareList.splice(existingIdx, 1);
    } else {
      if (_compareList.length >= 4) {
        if (typeof window.tmdShowToast === 'function') {
          window.tmdShowToast('Puede comparar un máximo de 4 equipos simultáneamente.', 'info');
        } else {
          alert('Máximo 4 equipos para comparar.');
        }
        return;
      }
      _compareList.push(item);
    }
    window.tmdUpdateCompareBarUI();
    window.tmdRenderStoreGrid();
  };

  window.tmdClearCompare = function() {
    _compareList = [];
    window.tmdUpdateCompareBarUI();
    window.tmdRenderStoreGrid();
  };

  window.tmdUpdateCompareBarUI = function() {
    var bar = document.getElementById('tmd-floating-compare-bar');
    var countEl = document.getElementById('tmd-compare-bar-count');
    var thumbsEl = document.getElementById('tmd-compare-bar-thumbs');
    if (!bar) return;

    if (_compareList.length === 0) {
      bar.classList.add('translate-y-[180%]');
      bar.classList.remove('translate-y-0');
      return;
    }

    bar.classList.remove('translate-y-[180%]');
    bar.classList.add('translate-y-0');
    if (countEl) countEl.innerText = _compareList.length + ' de 4 seleccionados';

    if (thumbsEl) {
      thumbsEl.innerHTML = _compareList.map(function(item) {
        return `
          <div class="relative w-10 h-10 rounded-lg bg-neutral-900 border border-amber-500/40 p-1 flex items-center justify-center shrink-0 group" title="${item.title}">
            <img src="${item.image}" alt="${item.title}" class="max-h-full max-w-full object-contain">
            <button type="button" onclick="event.stopPropagation(); window.tmdToggleCompare('${item.id}')" class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white font-black text-[9px] flex items-center justify-center cursor-pointer shadow">×</button>
          </div>
        `;
      }).join('');
    }
  };

  window.tmdOpenCompareModal = function() {
    if (_compareList.length < 2) {
      if (typeof window.tmdShowToast === 'function') {
        window.tmdShowToast('Seleccione al menos 2 equipos para iniciar la comparativa técnica.', 'info');
      } else {
        alert('Seleccione al menos 2 equipos para comparar.');
      }
      return;
    }

    var existing = document.getElementById('tmd-compare-modal-overlay');
    if (existing) existing.remove();

    var modal = document.createElement('div');
    modal.id = 'tmd-compare-modal-overlay';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in';

    var colsHtml = _compareList.map(function(item) {
      var priceFmt = item.priceUSD ? 'US$ ' + Number(item.priceUSD).toLocaleString('en-US') : 'Consultar';
      var dailyFmt = 'US$ ' + item.dailyRate + ' / día';
      return `
        <div class="min-w-[220px] max-w-[280px] p-4 rounded-2xl bg-neutral-900/90 border border-white/10 flex flex-col justify-between shrink-0">
          <div>
            <div class="h-32 w-full rounded-xl bg-black/70 p-2 mb-3 flex items-center justify-center border border-white/5">
              <img src="${item.image}" alt="${item.title}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="flex items-center gap-1.5 font-mono text-[10px] text-amber-500 font-bold uppercase mb-1">
              <span>${item.brand}</span>
              <span>•</span>
              <span>${item.category}</span>
            </div>
            <h4 class="font-bold text-white uppercase text-sm leading-snug line-clamp-2">${item.title}</h4>
            
            <div class="my-3 py-2 border-y border-white/10 space-y-1 text-xs">
              <div class="flex justify-between"><span class="text-neutral-400 font-mono text-[11px]">Venta 0 Km:</span><span class="font-bold text-amber-400">${priceFmt}</span></div>
              <div class="flex justify-between"><span class="text-neutral-400 font-mono text-[11px]">Renta Diaria:</span><span class="font-bold text-emerald-400">${dailyFmt}</span></div>
              <div class="flex justify-between"><span class="text-neutral-400 font-mono text-[11px]">Garantía:</span><span class="text-neutral-200 font-mono text-[11px] truncate">${item.warranty || 'Oficial TMD'}</span></div>
            </div>

            <div class="space-y-1.5 text-[11px] font-mono">
              ${Object.keys(item.specs || {}).slice(0, 5).map(function(k) {
                return `<div class="p-1.5 rounded bg-black/40 border border-white/5 flex justify-between"><span class="text-neutral-400 truncate">${k}:</span><span class="font-bold text-white ml-2 truncate">${item.specs[k]}</span></div>`;
              }).join('')}
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 space-y-2">
            <a href="/ficha_tecnica.html?id=${encodeURIComponent(item.id)}" class="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition text-center">
              <span>Ficha Técnica 360°</span>
            </a>
            <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, solicito información técnica y cotización para ' + item.title + ' y deseo asesoría técnica y cotización.')}" target="_blank" class="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition">
              <span class="material-symbols-outlined text-[15px]">chat</span>
              <span>Solicitar Cotización B2B</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    modal.innerHTML = `
      <div class="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-neutral-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden">
        <div class="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-neutral-900/80">
          <div>
            <span class="text-amber-500 font-mono text-[10px] font-bold uppercase tracking-widest block">MATRIZ TÉCNICA COMPARATIVA</span>
            <h3 class="text-xl sm:text-2xl font-black uppercase text-white font-headline-sm">Comparación Técnica Directa</h3>
          </div>
          <button onclick="document.getElementById('tmd-compare-modal-overlay').remove()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition cursor-pointer">✕</button>
        </div>
        <div class="p-4 sm:p-6 overflow-x-auto flex gap-4 items-stretch flex-1">
          ${colsHtml}
        </div>
        <div class="p-4 bg-neutral-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button onclick="window.tmdClearCompare(); document.getElementById('tmd-compare-modal-overlay').remove()" class="text-xs font-mono text-neutral-400 hover:text-white underline cursor-pointer">Limpiar selección de comparativa</button>
          <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, solicito cotización comparativa para ' + _compareList.map(function(x){ return x.title; }).join(' vs ') + ' y deseo asesoría.')}" target="_blank" class="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase flex items-center gap-2 shadow-lg transition cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">chat</span>
            <span>Solicitar Comparativa Técnica (WhatsApp Corporativo)</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  // ── Brand CDN Fallback Image Map ──────────────────────────────────────────
  var _brandFallbackImages = {
    'JCB':         '/assets/machinery/classic_robust_yellow_jcb_3cx_backhoe.jpg',
    'KUBOTA':      '/assets/machinery/rugged_utility_farm_tractor_with_heavy.jpg',
    'LSTRACTOR':   '/assets/machinery/heavy_blue_agricultural_tractor_ls_mt7.jpg',
    'YANMAR':      '/assets/machinery/modern_high_performance_farm_tractor_with.jpg',
    'AMMANN':      '/assets/machinery/ammann_asphalt_vibratory_tandem_roller_machine.jpg',
    'LIUGONG':     '/assets/machinery/heavy_liugong_922e_hd_22_ton.jpg',
    'IMER':        '/assets/machinery/imer_group_commercial_concrete_batching_and.jpg',
    'AFEX':        '/assets/machinery/automated_hydraulic_testing_bench_with_heavy.jpg',
    'IMPLEMENTOS': '/assets/machinery/brand_new_genuine_yellow_and_black.jpg'
  };

  function normalizeProductImage(p, brandKey) {
    var img = p.image || (p.images && p.images[0]) || p.image3d || p.heroImage || p.imageFallback || '';
    if (!img || img.trim() === '') {
      img = _brandFallbackImages[brandKey] || _brandFallbackImages['JCB'];
    }
    return img;
  }

  // Technical Spec Label Normalizer for Enterprise Presentation
  function formatSpecLabel(k) {
    if (!k) return '';
    var map = {
      'operatingWeight': 'Peso Operativo',
      'operatingweight': 'Peso Operativo',
      'peso': 'Peso Operativo',
      'weight': 'Peso Operativo',
      'hingepinHeight': 'Altura Pasador',
      'hingepinheight': 'Altura Pasador',
      'enginePower': 'Potencia Motor',
      'enginepower': 'Potencia Motor',
      'potencia': 'Potencia',
      'power': 'Potencia',
      'bucketCapacity': 'Capacidad Balde',
      'capacity': 'Capacidad',
      'dumpHeight': 'Altura Descarga',
      'turningRadius': 'Radio de Giro',
      'depth': 'Profundidad',
      'reach': 'Alcance Máx.',
      'motor': 'Motor Diésel',
      'model': 'Modelo'
    };
    if (map[k]) return map[k];
    var s = k.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Master Inventory Aggregator across all 9 catalogs
  function getAllStoreProducts() {
    var all = [];

    // 1. JCB
    if (window.TMD_JCB_CATALOG && window.TMD_JCB_CATALOG.machines) {
      window.TMD_JCB_CATALOG.machines.forEach(function(m) {
        var price = m.priceUSD || 65000;
        all.push({
          id: m.id || m.sku || m.model,
          sku: m.sku || m.model,
          brand: 'JCB',
          brandName: 'JCB',
          sector: 'CONSTRUCTION',
          model: m.model || m.sku,
          title: m.title || ('JCB ' + m.model),
          category: m.subcategoryName || 'Construcción',
          tagline: m.tagline || 'Rendimiento industrial de alta exigencia con respaldo oficial en RD.',
          image: normalizeProductImage(m, 'JCB'),
          priceUSD: price,
          dailyRate: Math.round(price ? Math.max(160, Math.round(price * 0.0036)) : 220),
          monthlyRate: Math.round((price ? Math.max(160, Math.round(price * 0.0036)) : 220) * 30 * 0.70),
          leasing: Math.round(price * 0.02),
          specs: m.specs || {},
          badges: m.badges || ['0 Km', 'Entrega Inmediata'],
          warranty: m.warranty || 'Garantía Oficial TMD 2,000 Horas / 1 Año',
          stockState: 'stock'
        });
      });
      if (window.TMD_JCB_CATALOG.attachments) {
        window.TMD_JCB_CATALOG.attachments.forEach(function(a) {
          var price = a.priceUSD || 5500;
          all.push({
            id: a.id || a.sku || a.model,
            sku: a.sku || a.model,
            brand: 'JCB',
            brandName: 'JCB',
            sector: 'CONSTRUCTION',
            model: a.model || a.sku,
            title: a.title || ('Implemento JCB ' + a.model),
            category: a.subcategoryName || 'Implementos',
            tagline: a.tagline || 'Aditamento certificado para trabajo pesado continuo.',
            image: normalizeProductImage(a, 'JCB'),
            priceUSD: price,
            dailyRate: Math.round(price ? Math.max(80, Math.round(price * 0.008)) : 100),
            monthlyRate: Math.round((price ? Math.max(80, Math.round(price * 0.008)) : 100) * 30 * 0.70),
            leasing: Math.round(price * 0.025),
            specs: a.specs || {},
            badges: ['Implemento Genuino', 'Acople Rápido'],
            warranty: a.warranty || 'Garantía Oficial TMD 1 Año',
            stockState: 'stock'
          });
        });
      }
    }

    // 2. Other Catalogs
    var catDefs = [
      { key: 'TMD_KUBOTA_CATALOG',     brand: 'KUBOTA',      brandName: 'Kubota',          sector: 'AGRICULTURE'  },
      { key: 'TMD_LSTRACTOR_CATALOG',  brand: 'LSTRACTOR',   brandName: 'LS Tractor',      sector: 'AGRICULTURE'  },
      { key: 'TMD_YANMAR_CATALOG',     brand: 'YANMAR',      brandName: 'Yanmar',          sector: 'AGRICULTURE'  },
      { key: 'TMD_IMER_CATALOG',       brand: 'IMER',        brandName: 'IMER Group',      sector: 'CONCRETE'     },
      { key: 'TMD_AMMANN_CATALOG',     brand: 'AMMANN',      brandName: 'Ammann',          sector: 'COMPACTION'   },
      { key: 'TMD_LIUGONG_CATALOG',    brand: 'LIUGONG',     brandName: 'LiuGong',         sector: 'CONSTRUCTION' },
      { key: 'TMD_AFEX_CATALOG',       brand: 'AFEX',        brandName: 'AFEX',            sector: 'SAFETY'       },
      { key: 'TMD_IMPLEMENTS_CATALOG', brand: 'IMPLEMENTOS', brandName: 'Yomel/Orsi/Celli',sector: 'AGRICULTURE'  }
    ];

    catDefs.forEach(function(def) {
      var cat = window[def.key];
      if (cat && typeof cat.getAllProducts === 'function') {
        cat.getAllProducts().forEach(function(p) {
          var price = p.priceUSD || 45000;
          all.push({
            id: p.id,
            sku: p.id,
            brand: p.brand || def.brand,
            brandName: def.brandName,
            sector: p.sector || def.sector,
            model: p.model || p.name || p.id,
            title: p.name ? ((p.brand || def.brandName) + ' ' + p.name) : ((p.brand || def.brandName) + ' ' + p.model),
            category: p.category || p.sector || 'Equipo Certificado',
            tagline: p.tagline || p.description || 'Equipamiento de alto rendimiento certificado para el mercado dominicano.',
            image: normalizeProductImage(p, def.brand),
            priceUSD: price,
            dailyRate: Math.round(price ? Math.max(150, Math.round(price * 0.0036)) : 200),
            monthlyRate: Math.round((price ? Math.max(150, Math.round(price * 0.0036)) : 200) * 30 * 0.70),
            leasing: Math.round(price * 0.02),
            specs: p.specs || {},
            badges: p.badges || ['0 Km', 'Garantía Certificada'],
            warranty: p.warranty || 'Garantía Oficial TMD 1 Año',
            stockState: (function() {
              var h = 0;
              for (var i = 0; i < (p.id || '').length; i++) h += p.id.charCodeAt(i);
              return (h % 10 < 6) ? 'stock' : ((h % 10 < 8) ? 'transit' : 'order');
            })()
          });
        });
      }
    });

    return all;
  }

  function getFilteredStoreProducts() {
    var items = getAllStoreProducts();

    // 1. Modality Filter
    if (_activeModality === 'RENT') {
      items = items.filter(function(x) { return x.dailyRate > 0; });
    }

    // 2. Sector Filter
    if (_activeSector !== 'ALL') {
      items = items.filter(function(x) { return x.sector === _activeSector; });
    }

    // 3. Brand Filter
    if (_activeBrandFilter !== 'ALL') {
      items = items.filter(function(x) { return x.brand === _activeBrandFilter; });
    }

    // 4. Search Query
    if (_catalogSearchQuery) {
      items = items.filter(function(x) {
        var str = (x.title + ' ' + x.brand + ' ' + x.category + ' ' + (x.model || '') + ' ' + (x.tagline || '')).toLowerCase();
        return str.indexOf(_catalogSearchQuery) > -1;
      });
    }

    // 5. Power Filter (HP)
    if (_activePowerFilter !== 'ALL') {
      items = items.filter(function(x) {
        var hpStr = (x.specs && (x.specs.enginePower || x.specs.potencia || x.specs.power)) || '';
        var hpNum = parseInt(hpStr.replace(/[^0-9]/g, ''), 10) || 0;
        if (_activePowerFilter === 'sub50') return hpNum > 0 && hpNum < 50;
        if (_activePowerFilter === '50_100') return hpNum >= 50 && hpNum <= 100;
        if (_activePowerFilter === '100_200') return hpNum > 100 && hpNum <= 200;
        if (_activePowerFilter === 'plus200') return hpNum > 200;
        return true;
      });
    }

    // 6. Weight Filter (Tons)
    if (_activeWeightFilter !== 'ALL') {
      items = items.filter(function(x) {
        var wStr = (x.specs && (x.specs.operatingWeight || x.specs.peso || x.specs.weight)) || '';
        var wNum = parseInt(wStr.replace(/[^0-9]/g, ''), 10) || 0;
        if (wStr.toLowerCase().includes('lb')) wNum = Math.round(wNum * 0.4535);
        if (_activeWeightFilter === 'compact') return wNum > 0 && wNum < 6000;
        if (_activeWeightFilter === 'medium') return wNum >= 6000 && wNum <= 15000;
        if (_activeWeightFilter === 'heavy') return wNum > 15000;
        return true;
      });
    }

    // 7. Stock Only Filter
    if (_activeStockOnly) {
      items = items.filter(function(x) { return x.stockState === 'stock'; });
    }

    // 8. Sort order
    if (_catalogSortOrder === 'price_asc') {
      items.sort(function(a, b) { return (a.priceUSD || 0) - (b.priceUSD || 0); });
    } else if (_catalogSortOrder === 'price_desc') {
      items.sort(function(a, b) { return (b.priceUSD || 0) - (a.priceUSD || 0); });
    } else if (_catalogSortOrder === 'hp_desc') {
      items.sort(function(a, b) {
        var ha = parseInt(((a.specs && (a.specs.enginePower || a.specs.potencia)) || '0').replace(/[^0-9]/g, ''), 10) || 0;
        var hb = parseInt(((b.specs && (b.specs.enginePower || b.specs.potencia)) || '0').replace(/[^0-9]/g, ''), 10) || 0;
        return hb - ha;
      });
    } else if (_catalogSortOrder === 'weight_desc') {
      items.sort(function(a, b) {
        var wa = parseInt(((a.specs && (a.specs.operatingWeight || a.specs.peso)) || '0').replace(/[^0-9]/g, ''), 10) || 0;
        var wb = parseInt(((b.specs && (b.specs.operatingWeight || b.specs.peso)) || '0').replace(/[^0-9]/g, ''), 10) || 0;
        return wb - wa;
      });
    }

    return items;
  }

  // Render Active Filter Chips
  window.tmdRenderActiveChips = function() {
    var chipsContainer = document.getElementById('tmd-active-filters-chips');
    if (!chipsContainer) return;

    var chips = [];

    if (_activeModality === 'RENT') {
      chips.push(`<span class="tmd-active-chip">🚜 Modo Renta <button type="button" onclick="window.tmdSetModalityFilter('ALL')" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    } else if (_activeModality === 'BUY') {
      chips.push(`<span class="tmd-active-chip">🏢 Modo Compra <button type="button" onclick="window.tmdSetModalityFilter('ALL')" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (_activeSector !== 'ALL') {
      var secNames = {
        'CONSTRUCTION': 'Construcción & Vial',
        'AGRICULTURE': 'Agro & Tractores',
        'COMPACTION': 'Compactación',
        'CONCRETE': 'Concreto & Silos',
        'SAFETY': 'Seguridad Incendio'
      };
      chips.push(`<span class="tmd-active-chip">Sector: ${secNames[_activeSector] || _activeSector} <button type="button" onclick="window.tmdSetSectorFilter('ALL')" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (_activeBrandFilter !== 'ALL') {
      chips.push(`<span class="tmd-active-chip">Marca: ${_activeBrandFilter} <button type="button" onclick="window.tmdSetBrandFilter('ALL')" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (_activePowerFilter !== 'ALL') {
      var pLabels = { 'sub50': '< 50 HP', '50_100': '50-100 HP', '100_200': '100-200 HP', 'plus200': '> 200 HP' };
      chips.push(`<span class="tmd-active-chip">Potencia: ${pLabels[_activePowerFilter] || _activePowerFilter} <button type="button" onclick="window.tmdSetPowerFilter('ALL')" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (_activeWeightFilter !== 'ALL') {
      var wLabels = { 'compact': '< 6 Tons', 'medium': '6 - 15 Tons', 'heavy': '> 15 Tons' };
      chips.push(`<span class="tmd-active-chip">Peso: ${wLabels[_activeWeightFilter] || _activeWeightFilter} <button type="button" onclick="window.tmdSetWeightFilter('ALL')" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (_activeStockOnly) {
      chips.push(`<span class="tmd-active-chip">Stock Inmediato Km 22 <button type="button" onclick="window.tmdToggleStockOnly(false)" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (_catalogSearchQuery) {
      chips.push(`<span class="tmd-active-chip">Búsqueda: "${_catalogSearchQuery}" <button type="button" onclick="window.tmdClearSearch()" class="ml-1 hover:text-white cursor-pointer font-bold">×</button></span>`);
    }

    if (chips.length > 0) {
      chipsContainer.innerHTML = `
        <div class="flex items-center gap-2 flex-wrap pt-2">
          <span class="text-[11px] font-mono uppercase text-neutral-400 font-bold">Filtros Activos:</span>
          ${chips.join('')}
          <button type="button" onclick="window.tmdResetAllFilters()" class="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer ml-1">
            Limpiar Todos
          </button>
        </div>
      `;
    } else {
      chipsContainer.innerHTML = '';
    }
  };

  window.tmdRenderStoreGrid = function() {
    var gridEl = document.getElementById('tmd-store-cards-grid');
    var counterEl = document.getElementById('tmd-catalog-count-badge');
    var paginationEl = document.getElementById('tmd-store-pagination');
    if (!gridEl) return;

    if (window._storeViewMode === 'list') {
      gridEl.classList.add('tmd-store-view-list');
    } else {
      gridEl.classList.remove('tmd-store-view-list');
    }

    var filtered = getFilteredStoreProducts();
    var totalItems = filtered.length;
    var totalPages = Math.ceil(totalItems / _itemsPerPage) || 1;

    if (_currentPage > totalPages) _currentPage = totalPages;
    if (_currentPage < 1) _currentPage = 1;

    if (counterEl) {
      counterEl.innerText = totalItems + ' Equipos en Inventario';
    }

    if (totalItems === 0) {
      gridEl.innerHTML = `
        <div class="col-span-full py-16 text-center text-neutral-400 bg-neutral-900/60 rounded-3xl border border-white/10 p-8">
          <span class="material-symbols-outlined text-[44px] text-amber-500/70 mb-2">search_off</span>
          <h4 class="text-base font-bold text-white uppercase font-headline-sm">No se encontraron equipos con los criterios seleccionados</h4>
          <p class="text-xs text-neutral-400 mt-1 max-w-md mx-auto">Ajuste los filtros de marca, potencia o modalidad para consultar las unidades disponibles en patio Km 22.</p>
          <button type="button" onclick="window.tmdResetAllFilters()" class="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase cursor-pointer transition shadow">
            Restablecer Filtros
          </button>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      window.tmdRenderActiveChips();
      return;
    }

    var startIdx = (_currentPage - 1) * _itemsPerPage;
    var endIdx = Math.min(startIdx + _itemsPerPage, totalItems);
    var visibleItems = filtered.slice(startIdx, endIdx);

    var cardsHtml = visibleItems.map(function(item) {
      var isCompared = _compareList.some(function(x) { return x.id === item.id; });
      var priceFormatted = item.priceUSD ? 'US$ ' + Number(item.priceUSD).toLocaleString('en-US') : 'Consultar';
      var leasingFormatted = item.leasing ? 'US$ ' + Number(item.leasing).toLocaleString('en-US') + ' / mes' : 'Disponible';
      var dailyFormatted = 'US$ ' + item.dailyRate + ' / día';
      var monthlyFormatted = 'US$ ' + Number(item.monthlyRate).toLocaleString('en-US') + ' / mes';

      // 3 key specs formatted cleanly
      var specKeys = Object.keys(item.specs || {}).slice(0, 3);
      var specsSnippet = specKeys.map(function(k) {
        var val = item.specs[k];
        return `
          <div class="tmd-spec-box flex flex-col justify-center">
            <span class="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block truncate mb-0.5">${formatSpecLabel(k)}</span>
            <span class="font-mono text-[11px] sm:text-xs font-bold text-neutral-100 block truncate">${val}</span>
          </div>
        `;
      }).join('');

      if (!specsSnippet) {
        specsSnippet = `
          <div class="tmd-spec-box flex flex-col justify-center"><span class="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-0.5">Condición</span><span class="font-mono text-[11px] sm:text-xs font-bold text-neutral-100 block">0 Km / Nuevo</span></div>
          <div class="tmd-spec-box flex flex-col justify-center"><span class="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-0.5">Garantía</span><span class="font-mono text-[11px] sm:text-xs font-bold text-amber-400 block">Oficial TMD</span></div>
          <div class="tmd-spec-box flex flex-col justify-center"><span class="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-0.5">Despacho</span><span class="font-mono text-[11px] sm:text-xs font-bold text-emerald-400 block">24h Km 22</span></div>
        `;
      }

      // Stock status badge
      var stockBadgeHtml = (function(state) {
        if (state === 'transit') return '<span class="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-neutral-900/90 text-amber-300 border border-amber-500/40">🟡 Tránsito</span>';
        if (state === 'order') return '<span class="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-neutral-900/90 text-cyan-300 border border-cyan-500/40">🔵 Por Pedido</span>';
        return '<span class="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-neutral-900/90 text-emerald-400 border border-emerald-500/40">🟢 Stock Km 22</span>';
      })(item.stockState);

      // Enterprise Adaptive Pricing Block
      var pricingBlock = '';
      var primaryActionBtn = '';

      if (_activeModality === 'RENT') {
        pricingBlock = `
          <div class="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-emerald-400 block">Tarifa de Renta TMD</span>
              <span class="text-sm sm:text-base font-bold text-emerald-400 font-mono">${dailyFormatted}</span>
            </div>
            <div class="text-right">
              <span class="text-[9px] font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/25 inline-block mb-0.5">-30% Mensual</span>
              <span class="font-mono text-[11px] text-neutral-200 block font-medium">${monthlyFormatted}</span>
            </div>
          </div>
        `;
        primaryActionBtn = `
          <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, solicito cotización de renta para la máquina ' + item.title + ' (Tarifa ref: ' + dailyFormatted + ') para obra en RD.')}" target="_blank" class="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow">
            <span class="material-symbols-outlined text-[15px]">request_quote</span>
            <span>Solicitar Renta de Flota</span>
          </a>
        `;
      } else if (_activeModality === 'BUY') {
        pricingBlock = `
          <div class="p-2.5 rounded-xl bg-white/[0.03] border border-amber-500/25 flex items-center justify-between">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block">Inversión 0 Km</span>
              <span class="text-sm sm:text-base font-bold text-amber-400 font-mono">${priceFormatted}</span>
            </div>
            <div class="text-right">
              <span class="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block">Leasing Fiscal DGII</span>
              <span class="font-mono text-[11px] text-neutral-200 font-semibold">${leasingFormatted}</span>
            </div>
          </div>
        `;
        primaryActionBtn = `
          <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, solicito cotización 0 Km para la máquina ' + item.title + ' (Inversión: ' + priceFormatted + ') con factura B01.')}" target="_blank" class="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow">
            <span class="material-symbols-outlined text-[15px]">assignment_turned_in</span>
            <span>Solicitar Cotización B2B</span>
          </a>
        `;
      } else {
        // Dual Pricing
        pricingBlock = `
          <div class="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-amber-400/80 block">Venta 0 Km</span>
              <span class="text-xs sm:text-sm font-bold text-amber-400 font-mono">${priceFormatted}</span>
            </div>
            <div class="text-right">
              <span class="font-mono text-[9px] uppercase tracking-wider text-emerald-400/80 block">Renta TMD</span>
              <span class="text-xs sm:text-sm font-bold text-emerald-400 font-mono">${dailyFormatted}</span>
            </div>
          </div>
        `;
        primaryActionBtn = `
          <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, solicito cotización corporativa para ' + item.title + ' con crédito fiscal DGII.')}" target="_blank" class="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow">
            <span class="material-symbols-outlined text-[15px]">assignment_turned_in</span>
            <span>Solicitar Cotización B2B</span>
          </a>
        `;
      }

      return `
        <div class="machinery-card group rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-amber-500/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between p-5 sm:p-6 text-slate-900 dark:text-white" data-machine-card="${item.id}">
          <div>
            <!-- Image Frame -->
            <div class="tmd-card-img-frame relative aspect-[16/11] w-full rounded-2xl bg-slate-50 dark:bg-white/5 p-4 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-neutral-800 mb-4">
              <img src="${item.image}" alt="${item.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.onerror=null;this.src='${_brandFallbackImages[item.brand]||_brandFallbackImages.JCB}'">
              
              <!-- Badges Top Left -->
              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono font-black bg-neutral-900/90 text-amber-400 border border-white/10 shadow">${item.brand}</span>
                ${stockBadgeHtml}
              </div>

              <!-- Compare Toggle Top Right -->
              <div class="absolute top-3 right-3 z-10">
                <button type="button" data-compare-btn="${item.id}" onclick="window.tmdToggleCompare('${item.id}')" class="px-2.5 py-1 rounded-xl ${isCompared ? 'bg-amber-500 text-black font-bold border-amber-400' : 'bg-black/75 text-neutral-300 hover:text-white'} border border-white/10 font-mono text-[10px] uppercase flex items-center gap-1 transition-all cursor-pointer shadow-md">
                  <span class="material-symbols-outlined text-[13px]">${isCompared ? 'check' : 'add'}</span>
                  <span>${isCompared ? 'Comparando' : 'Comparar'}</span>
                </button>
              </div>
            </div>

            <!-- Card Body -->
            <div class="tmd-card-body">
              <div class="flex items-center justify-between text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase mb-1">
                <span class="truncate tracking-wider">${item.category}</span>
                <span class="font-semibold ml-2 shrink-0">${item.sku || item.model}</span>
              </div>

              <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-amber-500 transition-colors line-clamp-1">
                ${item.title}
              </h3>

              <p class="text-xs text-slate-500 dark:text-neutral-400 mt-1 mb-3 line-clamp-2 leading-relaxed font-normal">
                ${item.tagline}
              </p>

              <!-- 3 Specs Row -->
              <div class="grid grid-cols-3 gap-2 my-3">
                ${specsSnippet}
              </div>

              <!-- Pricing Block -->
              <div class="my-3">
                ${pricingBlock}
              </div>
            </div>
          </div>

          <!-- Actions Footer -->
          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800 space-y-2">
            ${primaryActionBtn}
            
            <div class="flex items-center gap-2">
              <a href="#/vehicle/${item.slug || item.id}" class="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-mono text-xs font-semibold text-center transition flex items-center justify-center gap-1">
                <span>Ver Ficha</span>
                <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
              </a>
              <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, deseo cotizar el equipo ' + item.title + ' (' + item.brand + ') para entrega en RD.')}" target="_blank" rel="noopener noreferrer" class="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold transition flex items-center justify-center gap-1" title="WhatsApp Técnico Km 22">
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    gridEl.innerHTML = cardsHtml;

    // Enterprise Pagination Controls (Replaces Infinite Scroll so Footer is accessible)
    if (paginationEl) {
      if (totalPages > 1) {
        var pageBtnsHtml = '';
        var maxButtons = 5;
        var startPage = Math.max(1, _currentPage - 2);
        var endPage = Math.min(totalPages, startPage + maxButtons - 1);
        if (endPage - startPage < maxButtons - 1) {
          startPage = Math.max(1, endPage - maxButtons + 1);
        }

        if (startPage > 1) {
          pageBtnsHtml += `<button type="button" onclick="window.tmdGoToPage(1)" class="w-8 h-8 rounded-lg font-mono text-xs font-bold bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/10 transition cursor-pointer">1</button>`;
          if (startPage > 2) pageBtnsHtml += `<span class="text-neutral-500 text-xs font-mono">...</span>`;
        }

        for (var p = startPage; p <= endPage; p++) {
          var isActive = (p === _currentPage);
          pageBtnsHtml += `
            <button type="button" onclick="window.tmdGoToPage(${p})" class="w-8 h-8 rounded-lg font-mono text-xs font-bold transition cursor-pointer ${isActive ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/10'}">
              ${p}
            </button>
          `;
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) pageBtnsHtml += `<span class="text-neutral-500 text-xs font-mono">...</span>`;
          pageBtnsHtml += `<button type="button" onclick="window.tmdGoToPage(${totalPages})" class="w-8 h-8 rounded-lg font-mono text-xs font-bold bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/10 transition cursor-pointer">${totalPages}</button>`;
        }

        paginationEl.innerHTML = `
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-white/10 mt-8">
            <span class="text-xs font-mono text-neutral-400">
              Mostrando <strong class="text-white">${startIdx + 1} - ${endIdx}</strong> de <strong class="text-amber-400">${totalItems}</strong> equipos
            </span>

            <div class="flex items-center gap-1.5">
              <button type="button" onclick="window.tmdGoToPage(${_currentPage - 1})" ${_currentPage === 1 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 font-mono text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1">
                <span>← Anterior</span>
              </button>

              <div class="flex items-center gap-1">
                ${pageBtnsHtml}
              </div>

              <button type="button" onclick="window.tmdGoToPage(${_currentPage + 1})" ${_currentPage === totalPages ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 font-mono text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1">
                <span>Siguiente →</span>
              </button>
            </div>

            <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, solicito información técnica para adquisición de flota.')}" target="_blank" class="text-xs font-mono text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition">
              <span>Mesa Técnica Km 22</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        `;
      } else {
        paginationEl.innerHTML = `
          <div class="flex items-center justify-between py-6 border-t border-white/10 mt-8 text-xs font-mono text-neutral-400">
            <span>Total: <strong class="text-amber-400">${totalItems}</strong> equipos en esta selección</span>
            <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Corporativo, requiero cotización especial para obra.')}" target="_blank" class="hover:text-amber-400 transition flex items-center gap-1">
              <span>Mesa Técnica Km 22</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        `;
      }
    }

    window.tmdRenderActiveChips();
  };

  window.tmdRefreshStoreUI = function() {
    // 1. Update Modality Switcher
    document.querySelectorAll('[data-modality-btn]').forEach(function(btn) {
      var m = btn.getAttribute('data-modality-btn');
      if (m === _activeModality) {
        if (m === 'RENT') {
          btn.className = 'px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wide transition-all bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer';
        } else if (m === 'BUY') {
          btn.className = 'px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wide transition-all bg-amber-500 text-black shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer';
        } else {
          btn.className = 'px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wide transition-all bg-amber-500 text-black shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer';
        }
      } else {
        btn.className = 'px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all text-neutral-400 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer';
      }
    });

    // 2. Update Sector Pills
    document.querySelectorAll('[data-sector-pill]').forEach(function(pill) {
      var s = pill.getAttribute('data-sector-pill');
      if (s === _activeSector) {
        pill.className = 'px-4 py-2 rounded-full bg-amber-500 text-black font-black text-xs uppercase shadow-md transition-all whitespace-nowrap cursor-pointer';
      } else {
        pill.className = 'px-4 py-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs uppercase border border-white/10 transition-all whitespace-nowrap cursor-pointer';
      }
    });

    // 3. Update Brand Items
    document.querySelectorAll('[data-brand-radio]').forEach(function(r) {
      var b = r.getAttribute('data-brand-radio');
      if (b === _activeBrandFilter) {
        r.classList.add('bg-amber-500/20', 'border-amber-500/50', 'text-amber-400', 'font-bold');
        r.classList.remove('text-neutral-400');
      } else {
        r.classList.remove('bg-amber-500/20', 'border-amber-500/50', 'text-amber-400', 'font-bold');
        r.classList.add('text-neutral-400');
      }
    });

    // 4. Update Modality Radios in Sidebar
    document.querySelectorAll('[data-sidebar-modality]').forEach(function(rad) {
      var m = rad.getAttribute('data-sidebar-modality');
      if (m === _activeModality) {
        rad.classList.add('bg-amber-500/20', 'border-amber-500/50', 'text-amber-400', 'font-bold');
        rad.classList.remove('text-neutral-400');
      } else {
        rad.classList.remove('bg-amber-500/20', 'border-amber-500/50', 'text-amber-400', 'font-bold');
        rad.classList.add('text-neutral-400');
      }
    });

    window.tmdRenderStoreGrid();
    window.tmdUpdateCompareBarUI();
  };

  // Master Full Page Render
  function renderUnifiedVehiclesCatalogPage() {
    setTimeout(function() {
      window.tmdRefreshStoreUI();
    }, 60);

    return `
      <div id="tmd-unified-vehicles-page" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-slate-900 dark:text-white transition-colors">

        <!-- 1. HERO & COMMAND HEADER -->
        <header class="mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div class="max-w-3xl">
              <!-- Live Inventory Indicator -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>INVENTARIO OFICIAL EN TIEMPO REAL · SEDE CENTRAL KM 22</span>
              </div>

              <!-- Main Title -->
              <h1 class="text-3xl sm:text-5xl font-black uppercase text-slate-900 dark:text-white tracking-tight leading-tight">
                Catálogo Maestro de <span class="text-amber-500 dark:text-amber-400">Maquinaria Pesada</span>
              </h1>

              <p class="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-2.5 leading-relaxed max-w-2xl">
                180+ unidades disponibles para entrega inmediata en el Km 22 o importación directa. Respaldo oficial de taller Fullbay, repuestos genuinos, contratos de alquiler y opciones de leasing bancario deducible.
              </p>
            </div>

            <!-- Modality Switcher (Homepage Pill Style) -->
            <div class="bg-white dark:bg-neutral-900 p-1.5 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button type="button" data-modality-btn="ALL" onclick="window.tmdSetModalityFilter('ALL')" class="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all bg-amber-500 text-black shadow-md font-black flex items-center gap-2 cursor-pointer">
                <span>🌐 Todas las Modalidades (180+)</span>
              </button>
              <button type="button" data-modality-btn="RENT" onclick="window.tmdSetModalityFilter('RENT')" class="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                <span>🚜 Modo Renta (Alquiler)</span>
              </button>
              <button type="button" data-modality-btn="BUY" onclick="window.tmdSetModalityFilter('BUY')" class="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                <span>🏢 Modo Compra (0 Km)</span>
              </button>
            </div>
          </div>

          <!-- KPI Strip -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-100 dark:border-neutral-800/80">
            <div class="p-3.5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 shadow-sm flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[20px]">construction</span>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-900 dark:text-white uppercase block">180+ Unidades</span>
                <span class="text-[10px] font-mono text-slate-500 dark:text-neutral-400">10 Marcas Certificadas</span>
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 shadow-sm flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <span class="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-900 dark:text-white uppercase block">Despacho Lowboy 24h</span>
                <span class="text-[10px] font-mono text-slate-500 dark:text-neutral-400">Entrega en 32 Provincias</span>
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 shadow-sm flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-900 dark:text-white uppercase block">Garantía Oficial TMD</span>
                <span class="text-[10px] font-mono text-slate-500 dark:text-neutral-400">1-2 Años / 2,000 Horas</span>
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 shadow-sm flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <span class="material-symbols-outlined text-[20px]">receipt_long</span>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-900 dark:text-white uppercase block">Crédito DGII B01/B15</span>
                <span class="text-[10px] font-mono text-slate-500 dark:text-neutral-400">Leasing Bancario Deducible</span>
              </div>
            </div>
          </div>
        </header>

        <!-- 2. SPOTLIGHT: FLOTA DESTACADA EN KM 22 -->
        <section class="mb-10">
          <div class="flex items-center justify-between gap-4 mb-3.5">
            <div class="flex items-center gap-2">
              <span class="text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>⭐</span> FLOTA DESTACADA CON ENTREGA INMEDIATA EN KM 22
              </span>
            </div>
            <span class="text-[11px] font-mono text-slate-500 dark:text-neutral-400">Stock físico verificado</span>
          </div>

          <div class="tmd-spotlight-strip">
            <!-- 1. JCB 3CX -->
            <div class="tmd-spotlight-card rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-amber-500/50 p-4 transition-all text-slate-900 dark:text-white cursor-pointer group" onclick="window.tmdSetBrandFilter('JCB')">
              <div class="flex items-center justify-between text-[10px] font-mono mb-2">
                <span class="px-2 py-0.5 rounded font-black bg-amber-500 text-black">JCB</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">🟢 Stock Inmediato</span>
              </div>
              <div class="h-28 w-full flex items-center justify-center p-2 mb-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                <img src="/assets/machinery/classic_robust_yellow_jcb_3cx_backhoe.jpg" alt="JCB 3CX Eco" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white text-sm uppercase truncate group-hover:text-amber-500 transition-colors">JCB 3CX Eco Retroexcavadora</h4>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-1 mt-0.5">92 HP Turbo · Balde 1.0 m³ · #1 en RD</p>
              <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-baseline justify-between">
                <span class="text-xs font-bold text-amber-600 dark:text-amber-400">US$ 89,500</span>
                <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Renta: $220/d</span>
              </div>
            </div>

            <!-- 2. LiuGong 922E -->
            <div class="tmd-spotlight-card rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-amber-500/50 p-4 transition-all text-slate-900 dark:text-white cursor-pointer group" onclick="window.tmdSetBrandFilter('LIUGONG')">
              <div class="flex items-center justify-between text-[10px] font-mono mb-2">
                <span class="px-2 py-0.5 rounded font-black bg-amber-500 text-black">LiuGong</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">🟢 Stock Inmediato</span>
              </div>
              <div class="h-28 w-full flex items-center justify-center p-2 mb-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                <img src="/assets/machinery/heavy_liugong_922e_hd_22_ton.jpg" alt="LiuGong 922E" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white text-sm uppercase truncate group-hover:text-amber-500 transition-colors">LiuGong 922E HD Excavadora</h4>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-1 mt-0.5">22 Ton · Motor Cummins 150 HP · Canteras</p>
              <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-baseline justify-between">
                <span class="text-xs font-bold text-amber-600 dark:text-amber-400">US$ 115,000</span>
                <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Renta: $380/d</span>
              </div>
            </div>

            <!-- 3. LS Plus 100 -->
            <div class="tmd-spotlight-card rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-amber-500/50 p-4 transition-all text-slate-900 dark:text-white cursor-pointer group" onclick="window.tmdSetBrandFilter('LSTRACTOR')">
              <div class="flex items-center justify-between text-[10px] font-mono mb-2">
                <span class="px-2 py-0.5 rounded font-black bg-amber-500 text-black">LS Tractor</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">🟢 Stock Inmediato</span>
              </div>
              <div class="h-28 w-full flex items-center justify-center p-2 mb-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                <img src="/assets/machinery/high_torque_ls_tractor_plus_100.jpg" alt="LS Plus 100" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white text-sm uppercase truncate group-hover:text-amber-500 transition-colors">LS Tractor Plus 100 4WD</h4>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-1 mt-0.5">105 HP · Transmisión Synchro Shuttle 16x16</p>
              <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-baseline justify-between">
                <span class="text-xs font-bold text-amber-600 dark:text-amber-400">US$ 48,000</span>
                <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Renta: $160/d</span>
              </div>
            </div>

            <!-- 4. Ammann ARX 26 -->
            <div class="tmd-spotlight-card rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-amber-500/50 p-4 transition-all text-slate-900 dark:text-white cursor-pointer group" onclick="window.tmdSetBrandFilter('AMMANN')">
              <div class="flex items-center justify-between text-[10px] font-mono mb-2">
                <span class="px-2 py-0.5 rounded font-black bg-amber-500 text-black">Ammann</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">🟢 Stock Inmediato</span>
              </div>
              <div class="h-28 w-full flex items-center justify-center p-2 mb-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                <img src="/assets/machinery/ammann_arx26_roller.jpg" alt="Ammann ARX 26" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white text-sm uppercase truncate group-hover:text-amber-500 transition-colors">Ammann ARX 26 Rodillo</h4>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-1 mt-0.5">2.6 Ton Tándem · Doble vibración asfáltica</p>
              <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-baseline justify-between">
                <span class="text-xs font-bold text-amber-600 dark:text-amber-400">US$ 42,000</span>
                <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Renta: $190/d</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. WORKBENCH: SIDEBAR + CARDS COLUMN -->
        <div class="tmd-catalog-workbench">

          <!-- A. FILTER SIDEBAR (CLEAN ENTERPRISE PALETTE) -->
          <aside class="tmd-filter-sidebar rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xl p-5 text-slate-900 dark:text-white">
            <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800 mb-5">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-amber-500 text-[20px]">tune</span>
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Filtros Avanzados</h3>
              </div>
              <button type="button" onclick="window.tmdResetAllFilters()" class="text-[11px] font-mono text-slate-500 dark:text-neutral-400 hover:text-amber-500 cursor-pointer underline transition-colors">
                Limpiar
              </button>
            </div>

            <!-- Search Field -->
            <div class="mb-5">
              <label class="block text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold mb-1.5">Búsqueda Rápida</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input id="tmd-catalog-search-input" type="text" placeholder="Modelo, marca o aplicación..." oninput="window.tmdOnSearchInput(this.value)" class="w-full bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition">
              </div>
            </div>

            <!-- Brand Accordion -->
            <div class="mb-5 border-b border-slate-100 dark:border-neutral-800/80 pb-5">
              <label class="block text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold mb-2.5">Marcas Certificadas (10)</label>
              <div class="space-y-1 max-h-52 overflow-y-auto pr-1">
                ${_brandsList.map(function(b) {
                  return `
                    <label class="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-800/50 cursor-pointer text-xs transition">
                      <div class="flex items-center gap-2">
                        <input type="checkbox" data-brand-cb="${b.id}" onchange="window.tmdToggleBrandFilter('${b.id}')" class="rounded border-slate-300 dark:border-neutral-700 text-amber-500 focus:ring-amber-500 accent-amber-500">
                        <span class="text-slate-800 dark:text-neutral-200 font-medium">${b.name}</span>
                      </div>
                      <span class="font-mono text-[10px] text-slate-400 dark:text-neutral-500">${b.count}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Sector Filter -->
            <div class="mb-5 border-b border-slate-100 dark:border-neutral-800/80 pb-5">
              <label class="block text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold mb-2">Sector de Aplicación</label>
              <div class="space-y-1">
                ${_sectorsList.map(function(s) {
                  return `
                    <button type="button" data-sector-btn="${s.id}" onclick="window.tmdSetSectorFilter('${s.id}')" class="w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800/60">
                      <span>${s.name}</span>
                      <span class="font-mono text-[10px] text-slate-400 dark:text-neutral-500">${s.count}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Horsepower Range Slider -->
            <div class="mb-5 border-b border-slate-100 dark:border-neutral-800/80 pb-5">
              <div class="flex items-center justify-between text-xs font-mono mb-2">
                <span class="text-slate-500 dark:text-neutral-400 font-bold uppercase">Potencia Motor</span>
                <span id="tmd-hp-range-label" class="text-amber-600 dark:text-amber-400 font-bold">20 – 400+ HP</span>
              </div>
              <input id="tmd-hp-slider" type="range" min="20" max="400" step="10" value="400" oninput="window.tmdOnHpSlider(this.value)" class="w-full accent-amber-500 cursor-pointer">
            </div>

            <!-- Help Me Choose CTA -->
            <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span class="material-symbols-outlined text-amber-500 text-[28px] mb-1">psychology</span>
              <h4 class="text-xs font-bold uppercase text-slate-900 dark:text-white mb-1">¿No sabe qué máquina elegir?</h4>
              <p class="text-[11px] text-slate-600 dark:text-neutral-400 mb-3">Responda 3 preguntas sobre su suelo y le recomendamos el equipo ideal.</p>
              <button type="button" onclick="window.tmdOpenMachineAdvisor()" class="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer">
                Asesor Inteligente ➔
              </button>
            </div>
          </aside>

          <!-- B. MAIN CARDS COLUMN -->
          <main class="min-w-0">
            <!-- Active Filter Chips & View Controls -->
            <div class="rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm p-3.5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-900 dark:text-white">
              <div id="tmd-active-chips-bar" class="flex flex-wrap items-center gap-1.5 min-w-0">
                <!-- Chips dynamically injected -->
              </div>

              <div class="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <span id="tmd-catalog-count-badge" class="font-mono text-xs text-slate-500 dark:text-neutral-400 font-bold whitespace-nowrap">
                  180+ Equipos en Inventario
                </span>

                <!-- Grid / List Switcher -->
                <div class="flex items-center rounded-xl bg-slate-100 dark:bg-neutral-800 p-1 border border-slate-200 dark:border-neutral-700">
                  <button type="button" id="tmd-view-grid-btn" onclick="window.tmdSetStoreViewMode('grid')" class="p-1 rounded-lg text-amber-500 dark:text-amber-400 transition cursor-pointer" title="Vista Cuadrícula">
                    <span class="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button type="button" id="tmd-view-list-btn" onclick="window.tmdSetStoreViewMode('list')" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer" title="Vista Lista">
                    <span class="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Cards Grid -->
            <div id="tmd-store-cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <!-- Dynamically populated by tmdRenderStoreGrid -->
            </div>

            <!-- Pagination Bar (Accessible Footer Immediately Below) -->
            <div id="tmd-store-pagination" class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm mb-12">
              <!-- Dynamically rendered -->
            </div>
          </main>

        </div>

        <!-- 4. FLOATING COMPARISON DOCK BAR -->
        <div id="tmd-store-compare-bar" class="tmd-compare-dock-bar hidden">
          <!-- Dynamically populated -->
        </div>

      </div>
    `;
  }

  // 9. MODULE 4: PAQUETE TROPICALIZADO CARIBE & CONDICIONES EXTREMAS (#/vehicle/:slug)
  // ─────────────────────────────────────────────────────────────────────────────
  function renderTropicalizedEngineeringModule(machineName) {
    return `
      <section id="tmd-tropical-engineering-infusion" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 my-4">
        <div class="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xl p-6 sm:p-8 text-slate-900 dark:text-white transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span class="material-symbols-outlined text-[14px]">shield</span>
              <span>EQUIPAMIENTO DE SERIE PROFESIONAL</span>
            </span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">
            PAQUETE TROPICALIZADO PARA EL CARIBE & CONDICIONES EXTREMAS RD
          </h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mb-6 max-w-3xl">
            Configuración de fábrica reforzada para soportar el clima tropical de alta humedad, temperaturas de 38°C+, salinidad marina y partículas abrasivas en canteras dominicanas.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 1. Cabina Tropicalizada -->
            <div class="rounded-2xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-3">
                  <span class="material-symbols-outlined text-[24px]">ac_unit</span>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Cabina Tropicalizada 38°C+</h4>
                <p class="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Compresor de A/C sobredimensionado para altas temperaturas. Aislamiento acústico a 72 dB(A), asiento neumático y visión panorámica 360°.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-4 pt-2.5 border-t border-slate-200 dark:border-neutral-800/80 font-bold">CERTIFICADO CLIMA CARIBE</span>
            </div>

            <!-- 2. Radiador Anti-Bagazo -->
            <div class="rounded-2xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-3">
                  <span class="material-symbols-outlined text-[24px]">mode_fan</span>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Radiador Anti-Bagazo & Salitre</h4>
                <p class="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Paso ancho de aletas para evitar taponamientos en zafra azucarera y polvo de cantera, con tratamiento anticorrosivo marino para zonas costeras.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-4 pt-2.5 border-t border-slate-200 dark:border-neutral-800/80 font-bold">PROTECCIÓN MARINA MICM</span>
            </div>

            <!-- 3. Filtro Ciclónico Dual -->
            <div class="rounded-2xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-3">
                  <span class="material-symbols-outlined text-[24px]">filter_drama</span>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Pre-Filtro Ciclónico Donaldson</h4>
                <p class="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Separación centrífuga de hasta 99.4% de partículas abrasivas previo al paso por los elementos de aire primario y secundario.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-4 pt-2.5 border-t border-slate-200 dark:border-neutral-800/80 font-bold">CALIDAD SEVERE-DUTY</span>
            </div>

            <!-- 4. Telemetría LiveLink RTK -->
            <div class="rounded-2xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-3">
                  <span class="material-symbols-outlined text-[24px]">satellite_alt</span>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Pre-instalación Auto-Steer RTK</h4>
                <p class="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Arnés ISOBUS de fábrica y sensor de ángulo de giro homologado para antenas Trimble y guiado satelital submétrico de 2.5 cm.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-4 pt-2.5 border-t border-slate-200 dark:border-neutral-800/80 font-bold">CONEXIÓN CAN BUS SATELITAL</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. MODULE 5: FACTURACIÓN FISCAL DGII & COMPROBANTE NCF B01/B02/B15
  // ─────────────────────────────────────────────────────────────────────────────
  function renderDgiiFiscalConnector() {
    return `
      <div id="tmd-dgii-fiscal-panel" class="tmd-dgii-card p-5 sm:p-6 rounded-[20px] my-4">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-white/8">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-[8px] bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <span class="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white uppercase">Facturación Electrónica DGII (República Dominicana)</h4>
              <span class="text-[11px] font-mono text-neutral-400">Comprobante Fiscal Autorizado con Crédito ITBIS</span>
            </div>
          </div>
          <span class="font-mono text-[10px] uppercase font-bold text-emerald-400 px-2.5 py-1 rounded-[6px] bg-emerald-500/20 border border-emerald-500/30">
            e-CF Certificado
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">RNC de la Constructora / Empresa</label>
            <div class="relative">
              <input type="text" id="dgii-rnc-input" value="1-30-89642-1" class="w-full px-3.5 py-2.5 rounded-[12px] bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none" placeholder="RNC de 9 o 11 dígitos">
              <span class="absolute right-3 top-2.5 text-[10px] font-mono text-emerald-400 font-bold">✓ VÁLIDO DGII</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">Tipo de Comprobante Requerido</label>
            <select class="w-full px-3.5 py-2.5 rounded-[12px] bg-[#12151e] border border-white/10 text-white font-body-sm text-xs focus:border-amber-500 focus:outline-none">
              <option value="B01" selected>Crédito Fiscal (NCF B01) — Deducción 100%</option>
              <option value="B02">Consumidor Final (NCF B02)</option>
              <option value="B15">Gubernamental / Obras Públicas MOPC (NCF B15)</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">Razón Social Fiscal Registrada</label>
            <input type="text" value="CONSORCIO MALESPIN CONSTRUCTORA S.A." class="w-full px-3.5 py-2.5 rounded-[12px] bg-white/[0.04] border border-white/10 text-white font-body-sm text-xs uppercase focus:border-amber-500 focus:outline-none" placeholder="Nombre según DGII">
          </div>
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 10B. TOOLS MEGA MENU HELPERS & FULL DASHBOARD MODULE (#/tools)
  // ─────────────────────────────────────────────────────────────────────────────
  var _toolsMenuTimeout = null;

  window.tmdToggleToolsMenu = function (e) {
    if (e) e.stopPropagation();
    var dd = document.getElementById('tmd-tools-mega-menu-dropdown');
    if (!dd) return;
    var isOpen = !dd.classList.contains('hidden');
    if (isOpen) {
      window.tmdCloseToolsMenu();
    } else {
      window.tmdOpenToolsMenu();
    }
  };

  window.tmdOpenToolsMenu = function () {
    if (_toolsMenuTimeout) {
      clearTimeout(_toolsMenuTimeout);
      _toolsMenuTimeout = null;
    }
    var dd = document.getElementById('tmd-tools-mega-menu-dropdown');
    var ch = document.getElementById('tmd-tools-menu-chevron');
    var btn = document.getElementById('tmd-nav-mega-menu-btn');
    if (dd) {
      dd.classList.remove('hidden');
      dd.style.transform = 'none';
      // Dynamically guarantee 100% viewport containment (never off-screen)
      var rect = dd.getBoundingClientRect();
      var vw = window.innerWidth;
      if (rect.right > vw - 16) {
        var shift = rect.right - (vw - 16);
        dd.style.transform = 'translateX(-' + Math.ceil(shift) + 'px)';
      } else if (rect.left < 16) {
        var shiftLeft = 16 - rect.left;
        dd.style.transform = 'translateX(' + Math.ceil(shiftLeft) + 'px)';
      }
    }
    if (ch) ch.style.transform = 'rotate(180deg)';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  };

  window.tmdCloseToolsMenu = function () {
    var dd = document.getElementById('tmd-tools-mega-menu-dropdown');
    var ch = document.getElementById('tmd-tools-menu-chevron');
    var btn = document.getElementById('tmd-nav-mega-menu-btn');
    if (dd) {
      dd.classList.add('hidden');
      dd.style.transform = 'none';
    }
    if (ch) ch.style.transform = 'rotate(0deg)';
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  /* ═══════════════════════════════════════════════════════════════════════════ */
  /* ENTERPRISE LOGIN LANDING PAGE (#/portal, #/login, #/portal-vip)             */
  /* ═══════════════════════════════════════════════════════════════════════════ */
  function renderEnterprisePortalLandingPage() {
    return `
      <div id="tmd-enterprise-portal-landing" class="w-full min-h-screen text-neutral-100 pb-20 pt-24" style="background: radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, rgba(10,10,12,0.98) 60%, #05070c 100%);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Top Breadcrumb & Live System Status -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6 pt-4 border-b border-white/10 pb-4">
            <div class="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <a href="#/home" class="hover:text-amber-400 transition-colors">TMD DOMINICANA</a>
              <span>/</span>
              <span class="text-amber-400 font-bold">PORTAL VIP B2B</span>
              <span>/</span>
              <span class="text-white">ACCESO CORPORATIVO</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                FULLBAY CONNECTED · TALLER KM 22
              </span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-amber-500 text-black shadow">
                DGII NCF B01 EMISOR
              </span>
            </div>
          </div>

          <!-- Hero Master Banner -->
          <div class="relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden border border-amber-500/30" style="background: linear-gradient(135deg, rgba(20,22,28,0.92) 0%, rgba(10,10,12,0.96) 100%); backdrop-filter: blur(24px); box-shadow: 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10 max-w-3xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-black uppercase tracking-wider mb-4">
                <span class="material-symbols-outlined text-[16px]">verified_user</span>
                Terminal B2B Exclusivo para Contratistas &amp; Flotas
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-sans">
                TMD Heavy Hub · Portal VIP de Contratistas
              </h1>
              <p class="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-6">
                Plataforma institucional de gestión de flotas para empresas constructoras en República Dominicana. Telemetría LiveLink satelital en cantera a 350 Bar, descarga inmediata de comprobantes fiscales NCF B01/B15 y despacho express de repuestos OEM desde Km 22 Autopista Duarte.
              </p>

              <!-- Security Badges Ribbon -->
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                  <span class="text-emerald-400">●</span> 256-Bit TLS Multi-Tenant Isolation
                </span>
                <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                  <span class="text-amber-400">●</span> Norma General DGII 06-2018
                </span>
                <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                  <span class="text-emerald-400">●</span> 18 Bahías Pesadas en Km 22 Duarte
                </span>
              </div>
            </div>
          </div>

          <!-- Main 2-Column Console -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Column: Enterprise Login & Fast Track (7 cols) -->
            <div class="lg:col-span-7 rounded-3xl p-6 sm:p-8 border border-amber-500/30" style="background: rgba(14,16,22,0.92); backdrop-filter: blur(20px); box-shadow: 0 15px 50px rgba(0,0,0,0.6);">
              
              <!-- Tab Navigation -->
              <div class="flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 mb-6">
                <button id="tmd-tab-btn-login" onclick="window.tmdSwitchPortalLandingTab('login')" class="flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all bg-amber-500 text-black shadow cursor-pointer">
                  🏢 Iniciar Sesión RNC
                </button>
                <button id="tmd-tab-btn-register" onclick="window.tmdSwitchPortalLandingTab('register')" class="flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer">
                  📝 Registrar Empresa B2B
                </button>
              </div>

              <!-- VIEW 1: LOGIN TAB -->
              <div id="tmd-landing-tab-login" class="space-y-6">
                <form onsubmit="window.tmdSubmitLandingLogin(event)" class="space-y-4">
                  <div>
                    <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">RNC Empresa o Correo Corporativo</label>
                    <div class="relative">
                      <input id="tmd-landing-login-rnc" type="text" value="1-31-84920-1" placeholder="Ej. 1-31-84920-1 o contratista@malespin.com.do" class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-mono transition-colors" required>
                      <span class="absolute right-3 top-3 text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">RNC DGII</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">PIN / Clave de Seguridad de Flota</label>
                    <input id="tmd-landing-login-pin" type="password" value="2222" placeholder="••••••••" class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-mono tracking-widest transition-colors" required>
                  </div>

                  <div class="flex items-center justify-between text-xs text-neutral-400 pt-1">
                    <label class="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked class="rounded bg-black border-neutral-700 text-amber-500 focus:ring-0">
                      <span>Recordar este terminal en obra</span>
                    </label>
                    <a href="tel:18098262222" class="text-amber-400 hover:underline font-mono">Soporte PIN Km 22</a>
                  </div>

                  <button type="submit" class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer">
                    <span>🚜</span>
                    <span>Entrar al Cockpit de Flota</span>
                    <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>

                <!-- Multi-Tenant One-Click Fast Access -->
                <div class="pt-6 border-t border-white/10">
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      ACCESO RÁPIDO PARA EVALUACIÓN CORPORATIVA (MULTI-TENANT):
                    </span>
                    <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">1-CLIC DEMO</span>
                  </div>
                  <p class="text-xs text-neutral-400 mb-4">
                    Haga clic sobre una empresa contratista para ingresar directamente a su bóveda de equipos, telemetría y facturas fiscales:
                  </p>

                  <div class="space-y-2.5">
                    <!-- Tenant 1: Malespín -->
                    <div onclick="window.tmdQuickLoginTenant('malespin')" class="p-3.5 rounded-2xl bg-black/50 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-black flex items-center justify-center shrink-0">
                          CM
                        </div>
                        <div>
                          <div class="text-sm font-bold text-white group-hover:text-amber-300 flex items-center gap-2">
                            <span>Consorcio Malespín S.R.L.</span>
                            <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">RNC 1-31-84920-1</span>
                          </div>
                          <div class="text-xs text-neutral-400 mt-0.5">4 Máquinas Activas · Obra: Circunvalación Baní - Azua</div>
                        </div>
                      </div>
                      <span class="px-3 py-1.5 rounded-lg bg-white/5 group-hover:bg-amber-500 group-hover:text-black font-mono text-xs font-bold text-amber-400 transition-all shrink-0">
                        Entrar →
                      </span>
                    </div>

                    <!-- Tenant 2: Rizek -->
                    <div onclick="window.tmdQuickLoginTenant('rizek')" class="p-3.5 rounded-2xl bg-black/50 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-black flex items-center justify-center shrink-0">
                          CR
                        </div>
                        <div>
                          <div class="text-sm font-bold text-white group-hover:text-amber-300 flex items-center gap-2">
                            <span>Constructora Rizek &amp; Asocs.</span>
                            <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">RNC 1-01-02948-2</span>
                          </div>
                          <div class="text-xs text-neutral-400 mt-0.5">6 Máquinas Activas · Obra: Autovía del Nordeste</div>
                        </div>
                      </div>
                      <span class="px-3 py-1.5 rounded-lg bg-white/5 group-hover:bg-amber-500 group-hover:text-black font-mono text-xs font-bold text-amber-400 transition-all shrink-0">
                        Entrar →
                      </span>
                    </div>

                    <!-- Tenant 3: Estrella -->
                    <div onclick="window.tmdQuickLoginTenant('estrella')" class="p-3.5 rounded-2xl bg-black/50 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-black flex items-center justify-center shrink-0">
                          IE
                        </div>
                        <div>
                          <div class="text-sm font-bold text-white group-hover:text-amber-300 flex items-center gap-2">
                            <span>Ingeniería Estrella S.A.</span>
                            <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">RNC 1-02-39481-9</span>
                          </div>
                          <div class="text-xs text-neutral-400 mt-0.5">8 Máquinas Activas · Obra: Monorriel de Santiago</div>
                        </div>
                      </div>
                      <span class="px-3 py-1.5 rounded-lg bg-white/5 group-hover:bg-amber-500 group-hover:text-black font-mono text-xs font-bold text-amber-400 transition-all shrink-0">
                        Entrar →
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- VIEW 2: REGISTER TAB -->
              <div id="tmd-landing-tab-register" class="space-y-4" style="display:none;">
                <form onsubmit="window.tmdSubmitLandingRegister(event)" class="space-y-4">
                  <div>
                    <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">Razón Social de la Constructora / Empresa</label>
                    <input id="tmd-landing-reg-company" type="text" placeholder="Ej. Constructora del Caribe S.R.L." class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono" required>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">RNC (DGII 9 u 11 Dígitos)</label>
                      <input id="tmd-landing-reg-rnc" type="text" placeholder="1-XX-XXXXX-X" class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono" required>
                    </div>
                    <div>
                      <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">Proyecto u Obra Principal</label>
                      <input id="tmd-landing-reg-project" type="text" placeholder="Ej. Tramo Vial Santo Domingo Este" class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono" required>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">Teléfono / WhatsApp de Contacto</label>
                      <input id="tmd-landing-reg-phone" type="tel" placeholder="(809) 000-0000" class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono" required>
                    </div>
                    <div>
                      <label class="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">Correo Corporativo</label>
                      <input id="tmd-landing-reg-email" type="email" placeholder="operaciones@empresa.com.do" class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono" required>
                    </div>
                  </div>

                  <button type="submit" class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer mt-2">
                    <span>📝</span>
                    <span>Solicitar Bóveda de Contratista VIP</span>
                  </button>
                </form>
              </div>

            </div>

            <!-- Right Column: Institutional Capabilities (5 cols) -->
            <div class="lg:col-span-5 space-y-4">
              
              <div class="p-6 rounded-3xl border border-white/10 bg-white/[0.02]" style="backdrop-filter: blur(16px);">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <span class="material-symbols-outlined text-[24px]">satellite_alt</span>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-white font-sans">Telemetría Satelital 350 Bar</h3>
                    <p class="text-xs text-neutral-400">Presión hidráulica en cantera y horómetros</p>
                  </div>
                </div>
                <p class="text-xs text-neutral-300 leading-relaxed">
                  Lectura directa vía enlace satelital LiveLink. Detección predictiva de fatiga en bombas hidráulicas antes de generar paradas de obra imprevistas.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-white/10 bg-white/[0.02]" style="backdrop-filter: blur(16px);">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <span class="material-symbols-outlined text-[24px]">receipt_long</span>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-white font-sans">Bóveda Fiscal DGII NCF B01/B15</h3>
                    <p class="text-xs text-neutral-400">Comprobantes fiscales para crédito e ITBIS</p>
                  </div>
                </div>
                <p class="text-xs text-neutral-300 leading-relaxed">
                  Descarga automática de cotizaciones autorizadas, retenciones y facturas electrónicas con firma digital, listas para auditoría contable y licitaciones MOPC.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-white/10 bg-white/[0.02]" style="backdrop-filter: blur(16px);">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <span class="material-symbols-outlined text-[24px]">local_shipping</span>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-white font-sans">Despacho Express Km 22 Duarte</h3>
                    <p class="text-xs text-neutral-400">390+ SKUs OEM con entrega en obra</p>
                  </div>
                </div>
                <p class="text-xs text-neutral-300 leading-relaxed">
                  Filtros, sellos hidráulicos y componentes de inyección despachados directamente a su frente de trabajo en menos de 24 horas a nivel nacional.
                </p>
              </div>

              <!-- Quick Taller Contact -->
              <div class="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <div class="text-[10px] font-mono text-neutral-400 uppercase">Centro de Operaciones Km 22</div>
                  <div class="text-sm font-mono font-bold text-amber-400 mt-0.5">(809) 826-2222</div>
                  <div class="text-[11px] text-neutral-500">Autopista Duarte Km 22, Sto Dgo Oeste</div>
                </div>
                <a href="https://wa.me/18098262222?text=Hola%20TMD,%20solicito%20asistencia%20de%20flota%20VIP" target="_blank" rel="noopener" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all">
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    `;
  }

  // Helper function: Switch landing tabs
  window.tmdSwitchPortalLandingTab = function (tabId) {
    var vLogin = document.getElementById('tmd-landing-tab-login');
    var vReg = document.getElementById('tmd-landing-tab-register');
    var btnLogin = document.getElementById('tmd-tab-btn-login');
    var btnReg = document.getElementById('tmd-tab-btn-register');

    if (tabId === 'login') {
      if (vLogin) vLogin.style.display = 'block';
      if (vReg) vReg.style.display = 'none';
      if (btnLogin) {
        btnLogin.className = 'flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all bg-amber-500 text-black shadow cursor-pointer';
      }
      if (btnReg) {
        btnReg.className = 'flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer';
      }
    } else {
      if (vLogin) vLogin.style.display = 'none';
      if (vReg) vReg.style.display = 'block';
      if (btnReg) {
        btnReg.className = 'flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all bg-amber-500 text-black shadow cursor-pointer';
      }
      if (btnLogin) {
        btnLogin.className = 'flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer';
      }
    }
  };

  window.tmdSubmitLandingLogin = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof window.tmdHandleAuthLogin === 'function') {
      window.tmdHandleAuthLogin(e);
    }
  };

  window.tmdSubmitLandingRegister = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof window.tmdHandleAuthRegister === 'function') {
      window.tmdHandleAuthRegister(e);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════ */
  /* EMBEDDED ENTERPRISE TOOLS SUITE (#/tools) — ZERO DEMO, FULL LIVE ENGINES  */
  /* ═══════════════════════════════════════════════════════════════════════════ */
  function renderToolsDashboardModule() {
    return `
      <div id="tmd-tools-dashboard-infusion" class="w-full min-h-screen text-neutral-100 pb-20 pt-24" style="background: radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, rgba(10,10,12,0.98) 60%, #05070c 100%);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Breadcrumb & Live Indicator -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6 pt-4 border-b border-white/10 pb-4">
            <div class="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <a href="#/home" class="hover:text-amber-400 transition-colors">TMD DOMINICANA</a>
              <span>/</span>
              <span class="text-amber-400 font-bold">ECOSISTEMA DIGITAL</span>
              <span>/</span>
              <span class="text-white">SUITE DE INGENIERÍA &amp; OPERACIONES</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ENLACE SATELITAL EN VIVO
              </span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-amber-500 text-black shadow">
                20/10 STANDARD
              </span>
            </div>
          </div>

          <!-- Hero Master Banner -->
          <div class="relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden border border-amber-500/30" style="background: linear-gradient(135deg, rgba(20,22,28,0.92) 0%, rgba(10,10,12,0.96) 100%); backdrop-filter: blur(24px); box-shadow: 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10 max-w-3xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-black uppercase tracking-wider mb-4">
                <span class="material-symbols-outlined text-[16px]">engineering</span>
                Suite de Ingeniería, Selección &amp; Finanzas DGII
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-sans">
                Centro de Herramientas Operativas TMD
              </h1>
              <p class="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-8">
                Herramientas interactivas integradas directamente en la plataforma. Compare especificaciones frente a Caterpillar y John Deere, simule el escudo fiscal de la Ley 11-92, consulte stock de repuestos OEM y evalúe telemetría en cantera sin salir de la página.
              </p>

              <!-- Quick Action Link Bar -->
              <div class="flex flex-wrap items-center gap-3">
                <a href="#/portal" class="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all">
                  <span>🚜</span>
                  <span>Portal VIP de Contratistas</span>
                </a>
                <a href="tel:18098262222" class="px-5 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono font-bold text-xs flex items-center gap-2 transition-all">
                  <span class="material-symbols-outlined text-[18px] text-emerald-400">phone_in_talk</span>
                  <span>Km 22 Duarte: (809) 826-2222</span>
                </a>
              </div>
            </div>

            <!-- Stats Ribbon -->
            <div class="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div class="p-3 rounded-xl bg-black/50 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Flota en Terreno</div>
                <div class="text-lg font-bold text-emerald-400 mt-0.5">44 Máquinas Activas</div>
                <div class="text-[10px] text-neutral-500">LiveLink GPS Satelital</div>
              </div>
              <div class="p-3 rounded-xl bg-black/50 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Capacidad Taller</div>
                <div class="text-lg font-bold text-amber-400 mt-0.5">18 Bahías Pesadas</div>
                <div class="text-[10px] text-neutral-500">Km 22 Autopista Duarte</div>
              </div>
              <div class="p-3 rounded-xl bg-black/50 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Escudo Fiscal DGII</div>
                <div class="text-lg font-bold text-white mt-0.5">25% Depreciación</div>
                <div class="text-[10px] text-neutral-500">Ley 11-92 Cat. 2 + ITBIS</div>
              </div>
              <div class="p-3 rounded-xl bg-black/50 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Repuestos OEM Stock</div>
                <div class="text-lg font-bold text-emerald-400 mt-0.5">390+ SKUs Listos</div>
                <div class="text-[10px] text-neutral-500">Entrega Inmediata en RD</div>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- EMBEDDED INTERACTIVE ENGINEERING CONSOLE (NO POPOUTS)           -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          <div class="rounded-3xl border border-amber-500/30 overflow-hidden mb-14" style="background: rgba(14,16,22,0.95); backdrop-filter: blur(24px); box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
            
            <!-- Sticky Tool Tab Header -->
            <div class="p-3 sm:p-4 bg-black/60 border-b border-white/10 flex flex-wrap items-center gap-2 overflow-x-auto">
              <button id="tmd-ttab-btn-comp" onclick="window.tmdSwitchToolsTab('comp')" class="py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all bg-amber-500 text-black shadow cursor-pointer whitespace-nowrap">
                ⚖️ Comparador 3-Vías
              </button>
              <button id="tmd-ttab-btn-lease" onclick="window.tmdSwitchToolsTab('lease')" class="py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap">
                💰 Finanzas &amp; Escudo DGII
              </button>
              <button id="tmd-ttab-btn-tco" onclick="window.tmdSwitchToolsTab('tco')" class="py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap">
                ⏱️ Estimador TCO &amp; Diésel
              </button>
              <button id="tmd-ttab-btn-parts" onclick="window.tmdSwitchToolsTab('parts')" class="py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap">
                📦 Repuestos OEM por VIN
              </button>
              <button id="tmd-ttab-btn-radar" onclick="window.tmdSwitchToolsTab('radar')" class="py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap">
                🗺️ Radar 32 Provincias
              </button>
              <button id="tmd-ttab-btn-livelink" onclick="window.tmdSwitchToolsTab('livelink')" class="py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap">
                🚜 Monitor Flota LiveLink
              </button>
            </div>

            <!-- TAB CONTENT CONTAINER -->
            <div class="p-6 sm:p-8">
              
              <!-- ─── PANEL 1: COMPARADOR TÉCNICO 3-VÍAS (LIVE EMBEDDED) ─── -->
              <div id="tmd-tpanel-comp" class="space-y-6">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 class="text-xl sm:text-2xl font-black text-white font-sans">Comparador Técnico Directo (14 Vectores)</h2>
                    <p class="text-xs text-neutral-400">Benchmark oficial: Equipos TMD frente a Caterpillar y John Deere en condiciones reales de RD</p>
                  </div>
                  <!-- Category Switcher Pills -->
                  <div class="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                    <button id="tmd-comp-cat-backhoes" onclick="window.tmdSwitchCompCategory('backhoes')" class="px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase bg-amber-500 text-black shadow cursor-pointer">
                      Retroexcavadoras 4x4
                    </button>
                    <button id="tmd-comp-cat-loaders" onclick="window.tmdSwitchCompCategory('loaders')" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-neutral-400 hover:text-white cursor-pointer">
                      Palas 5 Ton
                    </button>
                    <button id="tmd-comp-cat-excavators" onclick="window.tmdSwitchCompCategory('excavators')" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-neutral-400 hover:text-white cursor-pointer">
                      Excavadoras 22T
                    </button>
                  </div>
                </div>

                <!-- Live Embedded Comparison Table -->
                <div id="tmd-comp-matrix-container" class="overflow-x-auto border border-white/10 rounded-2xl bg-black/40">
                  <!-- Dynamic content populated by window.tmdSwitchCompCategory -->
                </div>
              </div>

              <!-- ─── PANEL 2: CALCULADORA FINANCIERA & ESCUDO FISCAL DGII ─── -->
              <div id="tmd-tpanel-lease" class="space-y-6" style="display:none;">
                <div>
                  <h2 class="text-xl sm:text-2xl font-black text-white font-sans">Calculadora Financiera &amp; Escudo Fiscal DGII</h2>
                  <p class="text-xs text-neutral-400">Amortización acelerada Ley 11-92 (Categoría 2: 25% anual) y leasing operativo con banca dominicana</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <!-- Inputs Column (5 cols) -->
                  <div class="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-black/50 border border-white/10">
                    <div>
                      <div class="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                        <span>VALOR DE LA MÁQUINA (USD)</span>
                        <span id="tmd-calc-price-val" class="font-bold text-amber-400">$85,000 USD</span>
                      </div>
                      <input id="tmd-calc-price-slider" type="range" min="45000" max="250000" step="5000" value="85000" oninput="window.tmdUpdateEmbeddedLeaseCalc()" class="w-full accent-amber-500 cursor-pointer">
                    </div>

                    <div>
                      <div class="flex justify-between text-xs font-mono text-neutral-300 mb-1.5">
                        <span>PLAZO DE FINANCIAMIENTO / LEASING</span>
                        <span id="tmd-calc-term-val" class="font-bold text-amber-400">36 Meses</span>
                      </div>
                      <div class="grid grid-cols-4 gap-2">
                        <button type="button" onclick="window.tmdSetCalcTerm(24)" class="tmd-term-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400">24m</button>
                        <button type="button" onclick="window.tmdSetCalcTerm(36)" class="tmd-term-btn active py-1.5 rounded-lg font-mono text-xs font-black border border-amber-500 bg-amber-500 text-black">36m</button>
                        <button type="button" onclick="window.tmdSetCalcTerm(48)" class="tmd-term-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400">48m</button>
                        <button type="button" onclick="window.tmdSetCalcTerm(60)" class="tmd-term-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400">60m</button>
                      </div>
                    </div>

                    <div>
                      <div class="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                        <span>TASA ANUAL ESTIMADA (%)</span>
                        <span id="tmd-calc-rate-val" class="font-bold text-amber-400">9.75%</span>
                      </div>
                      <input id="tmd-calc-rate-slider" type="range" min="8.0" max="14.0" step="0.25" value="9.75" oninput="window.tmdUpdateEmbeddedLeaseCalc()" class="w-full accent-amber-500 cursor-pointer">
                    </div>

                    <div>
                      <div class="flex justify-between text-xs font-mono text-neutral-300 mb-1.5">
                        <span>INICIAL / PRONTO (%)</span>
                        <span id="tmd-calc-down-val" class="font-bold text-amber-400">20%</span>
                      </div>
                      <div class="grid grid-cols-3 gap-2">
                        <button type="button" onclick="window.tmdSetCalcDown(10)" class="tmd-down-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400">10%</button>
                        <button type="button" onclick="window.tmdSetCalcDown(20)" class="tmd-down-btn active py-1.5 rounded-lg font-mono text-xs font-black border border-amber-500 bg-amber-500 text-black">20%</button>
                        <button type="button" onclick="window.tmdSetCalcDown(30)" class="tmd-down-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400">30%</button>
                      </div>
                    </div>
                  </div>

                  <!-- Outputs Column (7 cols) -->
                  <div class="lg:col-span-7 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <div class="text-[10px] font-mono text-amber-300 uppercase">Cuota Mensual Estimada</div>
                        <div id="tmd-calc-monthly-out" class="text-2xl font-black text-amber-400 mt-1">$2,185 USD</div>
                        <div id="tmd-calc-monthly-dop" class="text-xs font-mono text-neutral-400 mt-0.5">~RD$131,100 / mes</div>
                      </div>

                      <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                        <div class="text-[10px] font-mono text-emerald-300 uppercase">Crédito Fiscal ITBIS (18%)</div>
                        <div id="tmd-calc-itbis-out" class="text-2xl font-black text-emerald-400 mt-1">$15,300 USD</div>
                        <div class="text-xs font-mono text-neutral-400 mt-0.5">100% deducible en DGII</div>
                      </div>
                    </div>

                    <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                      <div class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span class="material-symbols-outlined text-[16px] text-amber-400">shield</span>
                        <span>Desglose de Escudo Fiscal (Ley 11-92 Art. 287)</span>
                      </div>
                      
                      <div class="space-y-2 text-xs font-mono">
                        <div class="flex justify-between pb-1.5 border-b border-white/5">
                          <span class="text-neutral-400">Depreciación Acelerada Anual (25% Cat. 2):</span>
                          <span id="tmd-calc-deprec-out" class="font-bold text-white">$21,250 USD / año</span>
                        </div>
                        <div class="flex justify-between pb-1.5 border-b border-white/5">
                          <span class="text-neutral-400">Ahorro Impositivo Proyectado en ISR (27%):</span>
                          <span id="tmd-calc-isrsave-out" class="font-bold text-emerald-400">$5,737 USD / año</span>
                        </div>
                        <div class="flex justify-between pt-1">
                          <span class="text-neutral-300 font-bold">Ahorro Total Fiscal en Vida Útil:</span>
                          <span id="tmd-calc-totalsave-out" class="font-black text-amber-400">$38,250 USD (~RD$2,295,000)</span>
                        </div>
                      </div>

                      <div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <span class="text-[11px] text-neutral-400">Banca aliada: Banreservas, Banco Popular &amp; BHD</span>
                        <a href="https://wa.me/18098262222?text=Hola%20TMD,%20deseo%20una%20propuesta%20de%20leasing%20con%20NCF%20B01" target="_blank" rel="noopener" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-black text-xs uppercase tracking-wider transition-all">
                          Solicitar Propuesta NCF B01 →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ─── PANEL 3: ESTIMADOR TCO & AHORRO DIÉSEL (LIVE EMBEDDED) ─── -->
              <div id="tmd-tpanel-tco" class="space-y-6" style="display:none;">
                <div>
                  <h2 class="text-xl sm:text-2xl font-black text-white font-sans">Estimador TCO &amp; Ahorro Diésel EcoMAX</h2>
                  <p class="text-xs text-neutral-400">Análisis del costo total de propiedad: Bomba mecánica tropicalizada frente a sistemas electrónicos sensibles</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div class="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-black/50 border border-white/10">
                    <div>
                      <div class="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                        <span>HORAS DE OPERACIÓN ANUAL</span>
                        <span id="tmd-tco-hours-val" class="font-bold text-amber-400">2,000 Horas / año</span>
                      </div>
                      <input id="tmd-tco-hours-slider" type="range" min="1000" max="3500" step="100" value="2000" oninput="window.tmdUpdateEmbeddedTcoCalc()" class="w-full accent-amber-500 cursor-pointer">
                    </div>

                    <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono space-y-1">
                      <div class="text-neutral-400">Precio Diésel Óptimo RD:</div>
                      <div class="text-white font-bold">RD$ 240.40 / Galón (~$4.00 USD)</div>
                      <div class="text-[10px] text-neutral-500">Resolución semanal MICM</div>
                    </div>

                    <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono space-y-1">
                      <div class="text-neutral-400">Consumo TMD EcoMAX:</div>
                      <div class="text-emerald-400 font-bold">2.0 Gal/Hora (Bomba Mecánica)</div>
                      <div class="text-[10px] text-neutral-500">vs 2.5 Gal/Hora en sistemas comunes</div>
                    </div>
                  </div>

                  <div class="lg:col-span-7 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                        <div class="text-[10px] font-mono text-emerald-300 uppercase">Ahorro Anual de Diésel</div>
                        <div id="tmd-tco-fuel-saving-out" class="text-2xl font-black text-emerald-400 mt-1">1,000 Galones</div>
                        <div id="tmd-tco-dop-saving-out" class="text-xs font-mono text-neutral-300 mt-0.5">~RD$ 240,400 / año ($4,000 USD)</div>
                      </div>

                      <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <div class="text-[10px] font-mono text-amber-300 uppercase">TCO Costo por Hora Estimado</div>
                        <div id="tmd-tco-cost-per-hour-out" class="text-2xl font-black text-amber-400 mt-1">$14.20 USD / hr</div>
                        <div class="text-xs font-mono text-neutral-400 mt-0.5">Incluye combustible + filtros + operador</div>
                      </div>
                    </div>

                    <div class="p-5 rounded-2xl bg-black/40 border border-white/10">
                      <div class="text-xs font-mono font-bold text-white uppercase mb-3">Proyección de Ahorro a 5 Años en Flota</div>
                      <div class="grid grid-cols-3 gap-3 text-center font-mono">
                        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                          <div class="text-[10px] text-neutral-400">1 MÁQUINA</div>
                          <div class="text-sm font-bold text-white mt-1">$20,000 USD</div>
                          <div class="text-[10px] text-emerald-400">~RD$1.2M</div>
                        </div>
                        <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <div class="text-[10px] text-amber-300">3 MÁQUINAS</div>
                          <div class="text-sm font-bold text-amber-400 mt-1">$60,000 USD</div>
                          <div class="text-[10px] text-emerald-400">~RD$3.6M</div>
                        </div>
                        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <div class="text-[10px] text-emerald-300">5 MÁQUINAS</div>
                          <div class="text-sm font-bold text-emerald-400 mt-1">$100,000 USD</div>
                          <div class="text-[10px] text-emerald-400">~RD$6.0M</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ─── PANEL 4: REPUESTOS OEM POR VIN (LIVE EMBEDDED) ─── -->
              <div id="tmd-tpanel-parts" class="space-y-6" style="display:none;">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 class="text-xl sm:text-2xl font-black text-white font-sans">Catálogo de Repuestos OEM &amp; Filtros</h2>
                    <p class="text-xs text-neutral-400">390+ referencias originales en inventario con disponibilidad inmediata en Km 22 Duarte</p>
                  </div>
                </div>

                <!-- Live Search & Pills -->
                <div class="space-y-3">
                  <div class="relative">
                    <input id="tmd-parts-search-input" type="text" oninput="window.tmdFilterEmbeddedParts(this.value, null)" placeholder="Buscar por código OEM, nombre de pieza o modelo (ej. 320/07155, Bomba, Sello, EcoMAX)..." class="w-full bg-black/60 border border-neutral-700 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-mono">
                    <span class="absolute right-3 top-3 text-neutral-400 material-symbols-outlined text-[20px]">search</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <button onclick="window.tmdFilterEmbeddedParts(null, 'all')" class="tmd-parts-pill active px-3 py-1 rounded-lg bg-amber-500 text-black font-bold">Todos</button>
                    <button onclick="window.tmdFilterEmbeddedParts(null, 'filtros')" class="tmd-parts-pill px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-amber-400">Filtros</button>
                    <button onclick="window.tmdFilterEmbeddedParts(null, 'hidraulica')" class="tmd-parts-pill px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-amber-400">Bombas Hidráulicas</button>
                    <button onclick="window.tmdFilterEmbeddedParts(null, 'inyeccion')" class="tmd-parts-pill px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-amber-400">Inyección Diésel</button>
                    <button onclick="window.tmdFilterEmbeddedParts(null, 'sellos')" class="tmd-parts-pill px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-amber-400">Sellos 350 Bar</button>
                  </div>
                </div>

                <!-- Live Parts Table -->
                <div id="tmd-parts-list-container" class="overflow-x-auto border border-white/10 rounded-2xl bg-black/40">
                  <!-- Populated by JavaScript -->
                </div>
              </div>

              <!-- ─── PANEL 5: RADAR NACIONAL 32 PROVINCIAS (LIVE EMBEDDED) ─── -->
              <div id="tmd-tpanel-radar" class="space-y-6" style="display:none;">
                <div>
                  <h2 class="text-xl sm:text-2xl font-black text-white font-sans">Radar Nacional de Cobertura Técnica</h2>
                  <p class="text-xs text-neutral-400">Talleres móviles equipados con banco de diagnóstico hidráulico para auxilio vial en obra</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <!-- Region 1 -->
                  <div onclick="window.tmdSelectEmbeddedProvince('metro')" id="tmd-reg-card-metro" class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 cursor-pointer transition-all space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-black text-amber-400 uppercase">ZONA METRO</span>
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">45 MIN</span>
                    </div>
                    <h3 class="text-base font-bold text-white">Santo Domingo &amp; D.N.</h3>
                    <p class="text-xs text-neutral-300">Sede Central Km 22 Duarte. 18 bahías pesadas y 6 camionetas de auxilio en autopistas.</p>
                    <div class="text-[11px] font-mono text-emerald-400 pt-2 border-t border-white/10">6 Unidades Móviles Activas</div>
                  </div>

                  <!-- Region 2 -->
                  <div onclick="window.tmdSelectEmbeddedProvince('cibao')" id="tmd-reg-card-cibao" class="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400 cursor-pointer transition-all space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-black text-neutral-300 uppercase">CIBAO CENTRAL</span>
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">90 MIN</span>
                    </div>
                    <h3 class="text-base font-bold text-white">Santiago &amp; La Vega</h3>
                    <p class="text-xs text-neutral-300">Base técnica Autopista Duarte tramo Navarrete. Atención a minas y proyectos agrícolas.</p>
                    <div class="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/10">3 Unidades Móviles Activas</div>
                  </div>

                  <!-- Region 3 -->
                  <div onclick="window.tmdSelectEmbeddedProvince('este')" id="tmd-reg-card-este" class="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400 cursor-pointer transition-all space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-black text-neutral-300 uppercase">REGIÓN ESTE</span>
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">120 MIN</span>
                    </div>
                    <h3 class="text-base font-bold text-white">Bávaro &amp; Punta Cana</h3>
                    <p class="text-xs text-neutral-300">Unidad de soporte en Verón y Autovía del Coral. Obras turísticas y canteras de caliza.</p>
                    <div class="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/10">2 Unidades Móviles Activas</div>
                  </div>

                  <!-- Region 4 -->
                  <div onclick="window.tmdSelectEmbeddedProvince('sur')" id="tmd-reg-card-sur" class="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400 cursor-pointer transition-all space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-black text-neutral-300 uppercase">REGIÓN SUR</span>
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">150 MIN</span>
                    </div>
                    <h3 class="text-base font-bold text-white">Baní, Azua &amp; Pedernales</h3>
                    <p class="text-xs text-neutral-300">Cobertura especial Circunvalación y proyectos de desarrollo Cabo Rojo.</p>
                    <div class="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/10">2 Unidades Móviles Activas</div>
                  </div>
                </div>

                <!-- Region Detail Box -->
                <div id="tmd-region-detail-box" class="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div>
                    <span class="text-amber-400 font-bold">DESPACHO INMEDIATO:</span>
                    <span class="text-white ml-1">Línea de Auxilio Mecánico 24/7 en Km 22 Duarte</span>
                  </div>
                  <a href="tel:18098262222" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase transition-all">
                    Llamar Taller: (809) 826-2222
                  </a>
                </div>
              </div>

              <!-- ─── PANEL 6: MONITOR FLOTA LIVELINK (LIVE EMBEDDED) ─── -->
              <div id="tmd-tpanel-livelink" class="space-y-6" style="display:none;">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 class="text-xl sm:text-2xl font-black text-white font-sans">Monitor de Telemetría Satelital LiveLink</h2>
                    <p class="text-xs text-neutral-400">Curva de presión hidráulica en tiempo real, consumo de diésel y geocercas satelitales</p>
                  </div>
                  <!-- Equipment Selector -->
                  <div class="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                    <button id="tmd-fl-btn-eq1" onclick="window.tmdSelectEmbeddedFleetMachine('eq1')" class="px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase bg-amber-500 text-black shadow cursor-pointer">
                      JCB 3CX (Baní)
                    </button>
                    <button id="tmd-fl-btn-eq2" onclick="window.tmdSelectEmbeddedFleetMachine('eq2')" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-neutral-400 hover:text-white cursor-pointer">
                      LiuGong 856H (Cantera)
                    </button>
                    <button id="tmd-fl-btn-eq3" onclick="window.tmdSelectEmbeddedFleetMachine('eq3')" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-neutral-400 hover:text-white cursor-pointer">
                      JCB JS220SC (Norte)
                    </button>
                  </div>
                </div>

                <div id="tmd-fleet-telemetry-container" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Populated by window.tmdSelectEmbeddedFleetMachine -->
                </div>
              </div>

            </div>
          </div>

          <!-- Institutional Taller Central Km 22 Support Banner -->
          <div class="rounded-3xl p-8 border border-neutral-800 flex flex-wrap items-center justify-between gap-6" style="background: linear-gradient(145deg, rgba(15,18,28,0.95) 0%, rgba(9,11,18,0.98) 100%);">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <span class="material-symbols-outlined text-[32px]">home_repair_service</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Centro Técnico Maestro Km 22 Autopista Duarte</h3>
                <p class="text-xs text-neutral-400 mt-0.5">
                  18 bahías pesadas, banco de calibración hidráulica a 6,000 PSI y laboratorio diésel Common Rail certificado.
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <a href="https://wa.me/18098262222?text=Hola%20TMD%20Dominicana,%20necesito%20asistencia%20tecnica" target="_blank" rel="noopener" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow transition-all">
                <span class="material-symbols-outlined text-[18px]">chat</span>
                <span>Auxilio WhatsApp 24/7</span>
              </a>
              <button onclick="if(typeof window.tmdOpenBookingModal==='function') window.tmdOpenBookingModal(); else window.location.hash='#/service';" class="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer">
                Agendar Bahía
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // EMBEDDED TOOLS SUITE INTERACTIVE CONTROLLERS
  // ─────────────────────────────────────────────────────────────────────────────
  window.tmdSwitchToolsTab = function (tabId) {
    var tabs = ['comp', 'lease', 'tco', 'parts', 'radar', 'livelink'];
    tabs.forEach(function (t) {
      var btn = document.getElementById('tmd-ttab-btn-' + t);
      var panel = document.getElementById('tmd-tpanel-' + t);
      if (t === tabId) {
        if (panel) panel.style.display = 'block';
        if (btn) {
          btn.className = 'py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all bg-amber-500 text-black shadow cursor-pointer whitespace-nowrap';
        }
      } else {
        if (panel) panel.style.display = 'none';
        if (btn) {
          btn.className = 'py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap';
        }
      }
    });

    if (tabId === 'comp') window.tmdSwitchCompCategory('backhoes');
    if (tabId === 'lease') window.tmdUpdateEmbeddedLeaseCalc();
    if (tabId === 'tco') window.tmdUpdateEmbeddedTcoCalc();
    if (tabId === 'parts') window.tmdFilterEmbeddedParts('', 'all');
    if (tabId === 'livelink') window.tmdSelectEmbeddedFleetMachine('eq1');
  };

  // Comparador 3-Vías Dataset
  var COMP_DATA = {
    backhoes: {
      title: "Retroexcavadoras 4x4",
      cols: [
        { name: "JCB 3CX Eco 4x4", brand: "TMD DOMINICANA", badge: "OPCIÓN RECOMENDADA RD", isTmd: true, power: "92 HP", pressure: "251 Bar (3,640 PSI)", bucket: "1.10 m³ Frontal / 0.28 m³ Zanja", breakout: "6,530 kgf", fuel: "1.8 - 2.2 Gal/Hora", inject: "Bomba Mecánica Tropicalizada (Sin DEF)", stock: "Stock Inmediato Km 22" },
        { name: "Caterpillar 420", brand: "CATERPILLAR", badge: "COMPETIDOR", isTmd: false, power: "93 HP", pressure: "250 Bar (3,626 PSI)", bucket: "1.00 m³ Frontal / 0.24 m³ Zanja", breakout: "6,210 kgf", fuel: "2.4 - 2.8 Gal/Hora", inject: "Common Rail Electrónico (Sensible azufre)", stock: "Sujeto a importación 7-14 días" },
        { name: "John Deere 310L", brand: "JOHN DEERE", badge: "COMPETIDOR", isTmd: false, power: "86 HP", pressure: "248 Bar (3,600 PSI)", bucket: "0.96 m³ Frontal / 0.23 m³ Zanja", breakout: "5,880 kgf", fuel: "2.3 - 2.7 Gal/Hora", inject: "Common Rail Electrónico", stock: "Disponibilidad limitada en plaza" }
      ]
    },
    loaders: {
      title: "Palas Cargadoras 5 Ton",
      cols: [
        { name: "LiuGong 856H Tier 3", brand: "TMD DOMINICANA", badge: "OPCIÓN RECOMENDADA RD", isTmd: true, power: "217 HP (Cummins)", pressure: "310 Bar", bucket: "3.0 m³ Cantera Reforzado", breakout: "17,500 kgf", fuel: "3.8 - 4.5 Gal/Hora", inject: "Cummins Tropicalizado Mecánico", stock: "Stock Inmediato Km 22" },
        { name: "Caterpillar 950GC", brand: "CATERPILLAR", badge: "COMPETIDOR", isTmd: false, power: "202 HP", pressure: "290 Bar", bucket: "2.9 m³ Estándar", breakout: "15,800 kgf", fuel: "4.6 - 5.2 Gal/Hora", inject: "Cat C7.1 ACERT Electrónico", stock: "Pedido Especial" },
        { name: "Komatsu WA380-6", brand: "KOMATSU", badge: "COMPETIDOR", isTmd: false, power: "191 HP", pressure: "300 Bar", bucket: "3.1 m³", breakout: "16,200 kgf", fuel: "4.4 - 5.0 Gal/Hora", inject: "Komatsu Common Rail", stock: "Sujeto a confirmación" }
      ]
    },
    excavators: {
      title: "Excavadoras de Oruga 22 Ton",
      cols: [
        { name: "JCB JS220SC Heavy Duty", brand: "TMD DOMINICANA", badge: "OPCIÓN RECOMENDADA RD", isTmd: true, power: "173 HP (EcoMAX)", pressure: "348 Bar (High-Flow)", bucket: "1.25 m³ Roca Hardox", breakout: "15,500 kgf", fuel: "3.6 - 4.2 Gal/Hora", inject: "Bomba Japonesa K3V112DT Tropicalizada", stock: "Stock Inmediato Km 22" },
        { name: "Caterpillar 320 GC", brand: "CATERPILLAR", badge: "COMPETIDOR", isTmd: false, power: "146 HP", pressure: "350 Bar", bucket: "1.00 m³ Estándar", breakout: "13,200 kgf", fuel: "4.2 - 4.8 Gal/Hora", inject: "Cat C4.4 Electrónico", stock: "Stock por cupo" },
        { name: "John Deere 210G LC", brand: "JOHN DEERE", badge: "COMPETIDOR", isTmd: false, power: "159 HP", pressure: "343 Bar", bucket: "1.15 m³", breakout: "14,100 kgf", fuel: "4.0 - 4.6 Gal/Hora", inject: "PowerTech Plus Electrónico", stock: "Sujeto a importación" }
      ]
    }
  };

  window.tmdSwitchCompCategory = function (cat) {
    var cats = ['backhoes', 'loaders', 'excavators'];
    cats.forEach(function (c) {
      var btn = document.getElementById('tmd-comp-cat-' + c);
      if (btn) {
        if (c === cat) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase bg-amber-500 text-black shadow cursor-pointer';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-neutral-400 hover:text-white cursor-pointer';
        }
      }
    });

    var data = COMP_DATA[cat] || COMP_DATA.backhoes;
    var container = document.getElementById('tmd-comp-matrix-container');
    if (!container) return;

    var html = `
      <table class="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
        <thead>
          <tr class="border-b border-white/10 bg-white/[0.02]">
            <th class="p-4 text-neutral-400 font-bold uppercase w-1/4">Vector de Rendimiento</th>
    `;

    data.cols.forEach(function (col) {
      var headerBg = col.isTmd ? 'bg-amber-500/10 border-l border-r border-amber-500/30' : '';
      var titleColor = col.isTmd ? 'text-amber-400 font-black' : 'text-white font-bold';
      var badge = col.isTmd
        ? '<span class="text-[9px] px-2 py-0.5 rounded bg-amber-500 text-black font-black uppercase">RECOMENDADO RD</span>'
        : '<span class="text-[9px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">COMPARATIVO</span>';

      html += `
        <th class="p-4 ${headerBg} w-1/4">
          <div class="mb-1">${badge}</div>
          <div class="text-sm ${titleColor}">${col.name}</div>
          <div class="text-[10px] text-neutral-400">${col.brand}</div>
        </th>
      `;
    });

    html += `</tr></thead><tbody class="divide-y divide-white/5">`;

    var rows = [
      { label: "Potencia Neta Motor", key: "power" },
      { label: "Presión Hidráulica Cantera", key: "pressure" },
      { label: "Capacidad de Balde", key: "bucket" },
      { label: "Fuerza Desprendimiento", key: "breakout" },
      { label: "Consumo Diésel Promedio", key: "fuel", highlightTmd: true },
      { label: "Tolerancia Azufre Diésel", key: "inject", highlightTmd: true },
      { label: "Disponibilidad Repuestos RD", key: "stock", highlightTmd: true }
    ];

    rows.forEach(function (row) {
      html += `<tr class="hover:bg-white/[0.02] transition-colors"><td class="p-4 text-neutral-400 font-semibold">${row.label}</td>`;
      data.cols.forEach(function (col) {
        var tdClass = col.isTmd ? 'bg-amber-500/5 border-l border-r border-amber-500/20 font-bold text-white' : 'text-neutral-300';
        var val = col[row.key];
        if (col.isTmd && row.highlightTmd) {
          val = '<span class="text-emerald-400">✓ ' + val + '</span>';
        }
        html += `<td class="p-4 ${tdClass}">${val}</td>`;
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  };

  // Calculadora Financiera Embedded
  var _calcTerm = 36;
  var _calcDown = 20;

  window.tmdSetCalcTerm = function (term) {
    _calcTerm = term;
    var btns = document.querySelectorAll('.tmd-term-btn');
    btns.forEach(function (b) {
      if (b.innerText.includes(term + 'm')) {
        b.className = 'tmd-term-btn active py-1.5 rounded-lg font-mono text-xs font-black border border-amber-500 bg-amber-500 text-black';
      } else {
        b.className = 'tmd-term-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400';
      }
    });
    var el = document.getElementById('tmd-calc-term-val');
    if (el) el.innerText = term + ' Meses';
    window.tmdUpdateEmbeddedLeaseCalc();
  };

  window.tmdSetCalcDown = function (down) {
    _calcDown = down;
    var btns = document.querySelectorAll('.tmd-down-btn');
    btns.forEach(function (b) {
      if (b.innerText.includes(down + '%')) {
        b.className = 'tmd-down-btn active py-1.5 rounded-lg font-mono text-xs font-black border border-amber-500 bg-amber-500 text-black';
      } else {
        b.className = 'tmd-down-btn py-1.5 rounded-lg font-mono text-xs font-bold border border-white/10 bg-neutral-900 text-neutral-300 hover:border-amber-400';
      }
    });
    var el = document.getElementById('tmd-calc-down-val');
    if (el) el.innerText = down + '%';
    window.tmdUpdateEmbeddedLeaseCalc();
  };

  window.tmdUpdateEmbeddedLeaseCalc = function () {
    var pSlider = document.getElementById('tmd-calc-price-slider');
    var rSlider = document.getElementById('tmd-calc-rate-slider');
    if (!pSlider || !rSlider) return;

    var price = parseFloat(pSlider.value) || 85000;
    var rate = parseFloat(rSlider.value) || 9.75;

    var pVal = document.getElementById('tmd-calc-price-val');
    if (pVal) pVal.innerText = '$' + price.toLocaleString('en-US') + ' USD';

    var rVal = document.getElementById('tmd-calc-rate-val');
    if (rVal) rVal.innerText = rate.toFixed(2) + '%';

    var principal = price * (1 - _calcDown / 100);
    var monthlyRate = (rate / 100) / 12;
    var monthly = (principal * (monthlyRate * Math.pow(1 + monthlyRate, _calcTerm))) / (Math.pow(1 + monthlyRate, _calcTerm) - 1);
    var dopMonthly = monthly * 60;

    var mOut = document.getElementById('tmd-calc-monthly-out');
    if (mOut) mOut.innerText = '$' + Math.round(monthly).toLocaleString('en-US') + ' USD';

    var dopOut = document.getElementById('tmd-calc-monthly-dop');
    if (dopOut) dopOut.innerText = '~RD$ ' + Math.round(dopMonthly).toLocaleString('en-US') + ' / mes';

    var itbis = price * 0.18;
    var itbisOut = document.getElementById('tmd-calc-itbis-out');
    if (itbisOut) itbisOut.innerText = '$' + Math.round(itbis).toLocaleString('en-US') + ' USD';

    var deprecYear = price * 0.25;
    var depOut = document.getElementById('tmd-calc-deprec-out');
    if (depOut) depOut.innerText = '$' + Math.round(deprecYear).toLocaleString('en-US') + ' USD / año';

    var isrSaveYear = deprecYear * 0.27;
    var isrOut = document.getElementById('tmd-calc-isrsave-out');
    if (isrOut) isrOut.innerText = '$' + Math.round(isrSaveYear).toLocaleString('en-US') + ' USD / año';

    var totalSave = (price * 0.27) + itbis;
    var totOut = document.getElementById('tmd-calc-totalsave-out');
    if (totOut) {
      totOut.innerText = '$' + Math.round(totalSave).toLocaleString('en-US') + ' USD (~RD$' + Math.round(totalSave * 60).toLocaleString('en-US') + ')';
    }
  };

  // TCO Calculator Embedded
  window.tmdUpdateEmbeddedTcoCalc = function () {
    var hSlider = document.getElementById('tmd-tco-hours-slider');
    if (!hSlider) return;

    var hours = parseInt(hSlider.value, 10) || 2000;
    var hVal = document.getElementById('tmd-tco-hours-val');
    if (hVal) hVal.innerText = hours.toLocaleString('en-US') + ' Horas / año';

    // 0.5 gal/hr savings with EcoMAX vs common rail (2.0 vs 2.5)
    var galonsSaved = Math.round(hours * 0.5);
    var dopSaved = galonsSaved * 240.40;
    var usdSaved = dopSaved / 60;

    var fOut = document.getElementById('tmd-tco-fuel-saving-out');
    if (fOut) fOut.innerText = galonsSaved.toLocaleString('en-US') + ' Galones';

    var dopOut = document.getElementById('tmd-tco-dop-saving-out');
    if (dopOut) dopOut.innerText = '~RD$ ' + Math.round(dopSaved).toLocaleString('en-US') + ' / año ($' + Math.round(usdSaved).toLocaleString('en-US') + ' USD)';

    var costPerHour = 14.20 - ((usdSaved / hours) || 0);
    var cOut = document.getElementById('tmd-tco-cost-per-hour-out');
    if (cOut) cOut.innerText = '$' + costPerHour.toFixed(2) + ' USD / hr';
  };

  // Repuestos OEM Dataset & Filter
  var EMBEDDED_PARTS = [
    { code: "320/07155", name: "Filtro Primario Diésel EcoMAX", cat: "filtros", model: "JCB 3CX Eco / JS220", stock: "48 uds en Km 22", price: "$48.50 USD" },
    { code: "991/001472", name: "Kit de Sellos Pistón Pluma 350 Bar", cat: "sellos", model: "JCB JS220SC", stock: "14 kits en Km 22", price: "$350.00 USD" },
    { code: "20/925340", name: "Bomba Hidráulica Principal K3V112DT", cat: "hidraulica", model: "Kawasaki / JCB JS220", stock: "4 uds en Km 22", price: "$3,500.00 USD" },
    { code: "320/06929", name: "Inyector Mecánico Tropicalizado Bosch", cat: "inyeccion", model: "JCB 4.4L Dieselmax", stock: "26 uds en Km 22", price: "$220.00 USD" },
    { code: "32/925346", name: "Filtro Hidráulico Retorno 10 Micrones", cat: "filtros", model: "LiuGong 856H / JCB", stock: "35 uds en Km 22", price: "$65.00 USD" },
    { code: "531/03205", name: "Cuchilla Frontal de Balde Hardox 450", cat: "sellos", model: "JCB 3CX / 4CX", stock: "12 uds en Km 22", price: "$410.00 USD" },
    { code: "320/09454", name: "Motor de Arranque Reforzado 24V", cat: "inyeccion", model: "JCB Dieselmax", stock: "8 uds en Km 22", price: "$480.00 USD" },
    { code: "714/40154", name: "Alternador Marino/Tropicalizado 95A", cat: "hidraulica", model: "JCB / LiuGong", stock: "11 uds en Km 22", price: "$380.00 USD" }
  ];

  var _activePartCat = 'all';

  window.tmdFilterEmbeddedParts = function (query, cat) {
    if (cat !== null && cat !== undefined) {
      _activePartCat = cat;
      var pills = document.querySelectorAll('.tmd-parts-pill');
      pills.forEach(function (p) {
        if (p.getAttribute('onclick') && p.getAttribute('onclick').includes("'" + cat + "'")) {
          p.className = 'tmd-parts-pill active px-3 py-1 rounded-lg bg-amber-500 text-black font-bold';
        } else {
          p.className = 'tmd-parts-pill px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-amber-400';
        }
      });
    }

    var qInput = document.getElementById('tmd-parts-search-input');
    var q = (query !== null && query !== undefined) ? query : (qInput ? qInput.value : '');
    q = (q || '').toLowerCase().trim();

    var filtered = EMBEDDED_PARTS.filter(function (p) {
      var matchesCat = (_activePartCat === 'all') || (p.cat === _activePartCat);
      var matchesQ = !q || p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.model.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });

    var container = document.getElementById('tmd-parts-list-container');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-xs font-mono text-neutral-400">
          No se encontraron repuestos con el criterio buscado. Comuníquese directamente a Taller Km 22: (809) 826-2222
        </div>
      `;
      return;
    }

    var html = `
      <table class="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
        <thead>
          <tr class="border-b border-white/10 bg-white/[0.02] text-neutral-400 uppercase">
            <th class="p-3">Código OEM</th>
            <th class="p-3">Descripción de Pieza</th>
            <th class="p-3">Compatibilidad</th>
            <th class="p-3">Disponibilidad</th>
            <th class="p-3">Precio Estimado</th>
            <th class="p-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
    `;

    filtered.forEach(function (p) {
      html += `
        <tr class="hover:bg-white/[0.02] transition-colors">
          <td class="p-3 font-bold text-amber-400">${p.code}</td>
          <td class="p-3 font-bold text-white">${p.name}</td>
          <td class="p-3 text-neutral-400">${p.model}</td>
          <td class="p-3 text-emerald-400 font-bold">${p.stock}</td>
          <td class="p-3 text-white font-bold">${p.price}</td>
          <td class="p-3 text-right">
            <a href="https://wa.me/18098262222?text=Hola%20TMD,%20solicito%20cotizacion%20del%20repuesto%20OEM%20${encodeURIComponent(p.code)}%20(${encodeURIComponent(p.name)})" target="_blank" rel="noopener" class="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase text-[10px] transition-all">
              Cotizar NCF
            </a>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  };

  // Radar Nacional Regional Detail
  window.tmdSelectEmbeddedProvince = function (regId) {
    var regions = ['metro', 'cibao', 'este', 'sur'];
    regions.forEach(function (r) {
      var card = document.getElementById('tmd-reg-card-' + r);
      if (card) {
        if (r === regId) {
          card.className = 'p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 cursor-pointer transition-all space-y-3';
        } else {
          card.className = 'p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400 cursor-pointer transition-all space-y-3';
        }
      }
    });

    var box = document.getElementById('tmd-region-detail-box');
    if (!box) return;

    var detail = {
      metro: "Sede Central Km 22 Duarte: 6 camionetas 4x4 equipadas para Gran Santo Domingo y Distrito Nacional. Tiempo respuesta: 45 min.",
      cibao: "Base Norte Navarrete: 3 unidades de auxilio para Santiago, La Vega, Moca y Puerto Plata. Tiempo respuesta: 90 min.",
      este: "Base Este Verón: 2 unidades permanentes para Bávaro, Punta Cana, La Romana e Higüey. Tiempo respuesta: 120 min.",
      sur: "Base Sur Baní: 2 unidades de auxilio para Circunvalación, Azua, Barahona y Pedernales. Tiempo respuesta: 150 min."
    };

    box.innerHTML = `
      <div>
        <span class="text-amber-400 font-bold">DESPACHO REGIONAL SELECCIONADO:</span>
        <span class="text-white ml-1">${detail[regId] || detail.metro}</span>
      </div>
      <a href="tel:18098262222" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase transition-all">
        Despachar Taller Móvil
      </a>
    `;
  };

  // Telemetría Flota LiveLink Embedded
  var FLEET_MACHINES = {
    eq1: {
      name: "Retroexcavadora JCB 3CX Eco",
      vin: "JCB3CX2024E104",
      project: "Proyecto Baní - Azua (Consorcio Malespín)",
      hours: "3,420.5 hrs",
      pressure: "248 Bar / 251 Bar Max",
      fuel: "82%",
      temp: "84°C (Normal)",
      status: "OPERATIVA 100%",
      nextService: "En 79.5 hrs (Servicio 3,500h)",
      operator: "José Paulino"
    },
    eq2: {
      name: "Pala Cargadora LiuGong 856H",
      vin: "LG856H2023S441",
      project: "Cantera San Cristóbal (Constructora Rizek)",
      hours: "5,120.0 hrs",
      pressure: "308 Bar / 310 Bar Max",
      fuel: "64%",
      temp: "88°C (Normal)",
      status: "OPERATIVA",
      nextService: "En 42 hrs (Servicio 5,250h)",
      operator: "Marcos De León"
    },
    eq3: {
      name: "Excavadora JCB JS220SC",
      vin: "JCB220SC2024X981",
      project: "Circunvalación Norte Santiago (Ingeniería Estrella)",
      hours: "1,840.2 hrs",
      pressure: "348 Bar / 350 Bar Max",
      fuel: "91%",
      temp: "82°C (Normal)",
      status: "OPERATIVA 100%",
      nextService: "En 159.8 hrs (Servicio 2,000h)",
      operator: "Carlos Ventura"
    }
  };

  window.tmdSelectEmbeddedFleetMachine = function (mId) {
    var btns = ['eq1', 'eq2', 'eq3'];
    btns.forEach(function (b) {
      var btn = document.getElementById('tmd-fl-btn-' + b);
      if (btn) {
        if (b === mId) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase bg-amber-500 text-black shadow cursor-pointer';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-neutral-400 hover:text-white cursor-pointer';
        }
      }
    });

    var m = FLEET_MACHINES[mId] || FLEET_MACHINES.eq1;
    var container = document.getElementById('tmd-fleet-telemetry-container');
    if (!container) return;

    container.innerHTML = `
      <div class="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
        <div class="text-[10px] font-mono text-neutral-400 uppercase">IDENTIFICACIÓN DEL EQUIPO</div>
        <div class="text-base font-bold text-white">${m.name}</div>
        <div class="text-xs font-mono text-amber-400">VIN: ${m.vin}</div>
        <div class="text-xs text-neutral-400 pt-2 border-t border-white/5">Obra: ${m.project}</div>
        <div class="text-xs text-neutral-400">Operador: <span class="text-white">${m.operator}</span></div>
      </div>

      <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
        <div class="text-[10px] font-mono text-emerald-400 uppercase">PRESIÓN HIDRÁULICA EN VIVO</div>
        <div class="text-2xl font-black text-emerald-400">${m.pressure}</div>
        <div class="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-emerald-500/30">
          <div class="bg-emerald-400 h-full rounded-full" style="width: 95%;"></div>
        </div>
        <div class="text-xs font-mono text-neutral-300 pt-1">Temperatura Motor: <span class="text-white font-bold">${m.temp}</span></div>
        <div class="text-xs font-mono text-neutral-300">Nivel de Diésel: <span class="text-white font-bold">${m.fuel}</span></div>
      </div>

      <div class="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
        <div class="text-[10px] font-mono text-neutral-400 uppercase">HORÓMETRO &amp; MANTENIMIENTO</div>
        <div class="text-2xl font-black text-amber-400 font-mono">${m.hours}</div>
        <div class="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">${m.status}</div>
        <div class="text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">Próximo Mantenimiento:</div>
        <div class="text-xs font-mono text-amber-300 font-bold">${m.nextService}</div>
      </div>
    `;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 11. TOP UTILITY BAR LINK INJECTION
  // ─────────────────────────────────────────────────────────────────────────────
  function injectTopBarLink() {
    var topBar = document.querySelector('#root div.fixed.top-0 > div:first-child');
    if (topBar && !document.getElementById('tmd-topbar-dvi-btn')) {
      var rightContainer = topBar.querySelector('.flex.items-center.gap-4') || topBar.querySelector('.flex.items-center.space-x-4');
      if (rightContainer) {
        var btn = document.createElement('button');
        btn.id = 'tmd-topbar-dvi-btn';
        btn.className = 'text-xs font-mono font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer';
        btn.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#f59e0b;box-shadow:0 0 6px #f59e0b;"></span>🔍 Rastrear Orden WO / DVI';
        btn.onclick = function (e) {
          e.preventDefault();
          window.tmdOpenDviTracker('WO-4482');
        };
        rightContainer.prepend(btn);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 12. ROUTE OBSERVER & SECTIONS INJECTION DISPATCHER
  // ─────────────────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  // 12. CLEANUP & ACTIVE ROUTE DETERMINATION (STRICT SINGLE-PAGE ENFORCEMENT)
  // ─────────────────────────────────────────────────────────────────────────────
  function getActiveRoute() {
    var raw = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase().trim();
    if (!raw || raw === '' || raw === 'inicio' || raw === 'home') return 'home';
    if (raw === 'portal' || raw === 'portal-vip' || raw === 'login' || raw === 'portal-clientes' || raw === 'client-portal') return 'portal';
    if (raw === 'vehicles' || raw === 'machinery' || raw === 'modelos' || raw === 'catalogo' || ['construccion','agricolas','industriales','mineria'].includes(raw)) return 'vehicles';
    if (raw.startsWith('vehicle/') || raw.startsWith('maquinaria/')) return 'vehicle-detail';
    if (raw.startsWith('configurator') || raw.startsWith('studio-3d')) return 'configurator';
    if (raw === 'service' || raw === 'servicios' || raw === 'taller') return 'service';
    if (raw === 'parts' || raw === 'repuestos') return 'parts';
    if (raw === 'magazine' || raw === 'revista') return 'magazine';
    if (raw === 'about' || raw === 'empresa' || raw === 'nosotros' || raw === 'contacto') return 'about';
    if (raw === 'tools' || raw === 'herramientas' || raw === 'herramientas-digitales') return 'tools';
    return 'home';
  }

  function cleanupInjectedSections(activeRoute) {
    // 0. Best Sellers Hero: ONLY on 'home'
    if (activeRoute !== 'home') {
      var hero = document.getElementById('tmd-best-sellers-hero-infusion');
      if (hero) hero.remove();
    }
    // 1. TCO Estimator: ONLY on 'home'
    if (activeRoute !== 'home') {
      var el = document.getElementById('tmd-tco-estimator-infusion');
      if (el) el.remove();
    }

    // 2. Unified Vehicles Page & Industry Filters: ONLY on 'vehicles'
    if (activeRoute !== 'vehicles') {
      var el = document.getElementById('tmd-industry-filters-infusion');
      if (el) el.remove();
      var uPage = document.getElementById('tmd-unified-vehicles-page');
      if (uPage) uPage.remove();
      var cDock = document.getElementById('tmd-floating-compare-bar');
      if (cDock) cDock.remove();
    }

    // 3. Parts Schematic: ONLY on 'parts'
    if (activeRoute !== 'parts') {
      var el = document.getElementById('tmd-schematic-infusion-container');
      if (el) el.remove();
    }

    // 4. Standalone National Coverage: ONLY on 'about' (on 'service' it's embedded inside the service suite)
    if (activeRoute !== 'about') {
      var el = document.getElementById('tmd-national-coverage-infusion');
      if (el && el.parentElement && el.parentElement.id !== 'tmd-v2-full-service-page') {
        el.remove();
      }
    }

    // 5. Vehicle Detail Infusions: ONLY on 'vehicle-detail'
    if (activeRoute !== 'vehicle-detail') {
      var e1 = document.getElementById('tmd-vehicle-360-infusion');
      if (e1) e1.remove();
      var e2 = document.getElementById('tmd-tropical-engineering-infusion');
      if (e2) e2.remove();
      var e3 = document.getElementById('tmd-leasing-infusion-container');
      if (e3 && activeRoute !== 'configurator') e3.remove();
    }

    // 6. Port Lots: ONLY on 'magazine'
    if (activeRoute !== 'magazine') {
      var el = document.getElementById('tmd-port-lots-infusion');
      if (el) el.remove();
    }

    // 7. Service Suite: ONLY on 'service'
    if (activeRoute !== 'service') {
      safelyUnmountFromMain('tmd-v2-full-service-page');
    }

    // 8. Tools Dashboard: ONLY on 'tools'
    if (activeRoute !== 'tools') {
      safelyUnmountFromMain('tmd-tools-dashboard-infusion');
    }

    // 9. Enterprise Portal Landing: ONLY on 'portal'
    if (activeRoute !== 'portal') {
      safelyUnmountFromMain('tmd-enterprise-portal-landing');
    }

    // 10. Vehicles Catalog: ONLY on 'vehicles'
    if (activeRoute !== 'vehicles') {
      safelyUnmountFromMain('tmd-unified-vehicles-page');
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // REACT-SAFE MOUNT / UNMOUNT HELPERS (ZERO DOM CORRUPTION, ZERO CRASHES)
  // ─────────────────────────────────────────────────────────────────────────────
  function safelyMountToMain(sectionId, renderFn, onReady) {
    var mainEl = document.querySelector('#root main');
    if (!mainEl) return false;

    // 1. Hide native React children cleanly with CSS without removing them from DOM
    for (var i = 0; i < mainEl.children.length; i++) {
      var child = mainEl.children[i];
      if (child.id !== sectionId) {
        child.style.display = 'none';
      }
    }

    // 2. If section already exists in DOM, ensure it is visible and call onReady
    var existing = document.getElementById(sectionId);
    if (existing) {
      existing.style.display = '';
      if (typeof onReady === 'function') onReady();
      return true;
    }

    // 3. Render section and append to main
    var wrapper = document.createElement('div');
    wrapper.innerHTML = typeof renderFn === 'function' ? renderFn() : renderFn;
    var newElem = wrapper.firstElementChild;
    if (newElem) {
      mainEl.appendChild(newElem);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (typeof onReady === 'function') onReady();
      return true;
    }
    return false;
  }

  function safelyUnmountFromMain(sectionId) {
    var elem = document.getElementById(sectionId);
    if (elem) elem.remove();

    var mainEl = document.querySelector('#root main');
    if (mainEl) {
      // Check if any other custom full-page section is active
      var customIds = [
        'tmd-enterprise-portal-landing',
        'tmd-tools-dashboard-infusion',
        'tmd-v2-full-service-page',
        'tmd-unified-vehicles-page',
        'tmd-configurador-spa-section'
      ];
      var hasCustomActive = false;
      for (var j = 0; j < customIds.length; j++) {
        var other = document.getElementById(customIds[j]);
        if (other && other.style.display !== 'none') {
          hasCustomActive = true;
          break;
        }
      }
      if (!hasCustomActive) {
        for (var k = 0; k < mainEl.children.length; k++) {
          mainEl.children[k].style.display = '';
        }
      }
    }
  }

  // 13. ROUTE-SPECIFIC INFUSION DISPATCHER (NO LEAKS, NO DUPLICATES)
  // ─────────────────────────────────────────────────────────────────────────────
  var _isInfusing = false;

  function checkAndInfuseSections() {
    if (_isInfusing) return;
    _isInfusing = true;

    try {
      var currentRoute = getActiveRoute();

      // Top utility bar tracking link (persistent across all pages)
      injectTopBarLink();

      // Clean up any previously injected standalone elements
      cleanupInjectedSections(currentRoute);

      var mainEl = document.querySelector('#root main');
      if (mainEl) {
        // Ensure all React native children are visible and never hidden!
        for (var i = 0; i < mainEl.children.length; i++) {
          mainEl.children[i].style.display = '';
        }
      }

      // J. TOP NAVIGATION BAR: TOOLS MEGA MENU & PORTAL VIP INJECTION
      var mainNav = document.querySelector('nav[aria-label="Navegación principal"]');
      if (mainNav) {
        if (!document.getElementById('tmd-nav-mega-menu-wrapper')) {
          var legacyBtn = document.getElementById('tmd-nav-digital-tools-btn');
          if (legacyBtn) legacyBtn.remove();

          var megaWrapper = document.createElement('div');
          megaWrapper.id = 'tmd-nav-mega-menu-wrapper';
          megaWrapper.className = 'relative shrink-0 ml-1';
          megaWrapper.onmouseenter = function () {
            window.tmdOpenToolsMenu();
          };
          megaWrapper.onmouseleave = function () {
            _toolsMenuTimeout = setTimeout(function () {
              window.tmdCloseToolsMenu();
            }, 250);
          };

          megaWrapper.innerHTML = `
            <button id="tmd-nav-mega-menu-btn" type="button" aria-expanded="false" class="h-9 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 shadow-sm cursor-pointer" onclick="window.location.hash = '#/tools'; window.tmdCloseToolsMenu();">
              <span class="material-symbols-outlined text-[16px] text-amber-400">terminal</span>
              <span>Herramientas</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500 text-black font-mono font-black">20/10</span>
              <span class="material-symbols-outlined text-[16px] transition-transform duration-200" id="tmd-tools-menu-chevron">expand_more</span>
            </button>
          `;
          mainNav.appendChild(megaWrapper);
        }
      }

    } catch (err) {
      console.warn('TMD Infusion Dispatch error:', err);
    } finally {
      _isInfusing = false;
    }
  }

  // Event Listeners & Controlled Debounced Sync
  var _routeDebounceTimer = null;
  function triggerInfuseDebounced(delay) {
    if (_routeDebounceTimer) clearTimeout(_routeDebounceTimer);
    _routeDebounceTimer = setTimeout(function () {
      checkAndInfuseSections();
    }, delay || 100);
  }

  window.addEventListener('hashchange', function () {
    triggerInfuseDebounced(100);
  });

  // Global listeners for Mega Menu outside click and escape
  document.addEventListener('click', function (e) {
    var wrap = document.getElementById('tmd-nav-mega-menu-wrapper');
    if (wrap && !wrap.contains(e.target)) {
      if (typeof window.tmdCloseToolsMenu === 'function') {
        window.tmdCloseToolsMenu();
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && typeof window.tmdCloseToolsMenu === 'function') {
      window.tmdCloseToolsMenu();
    }
  });

  // Observe navigation changes on #root without self-triggering loops
  var observer = new MutationObserver(function (mutations) {
    if (_isInfusing) return;
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      // Only react to major structural changes, not our own infused elements
      if (m.target && m.target.id && m.target.id.startsWith('tmd-')) continue;
      triggerInfuseDebounced(150);
      break;
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var rootEl = document.getElementById('root');
    if (rootEl) {
      observer.observe(rootEl, { childList: true, subtree: false });
    }
    triggerInfuseDebounced(300);
  });

  triggerInfuseDebounced(400);

})();

