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
      <div id="tmd-leasing-infusion-container" class="tmd-stitch-section rounded-2xl border p-6 md:p-8 bg-neutral-950/90 dark:bg-black/90 text-white shadow-2xl border-amber-500/20">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span>PORTAL FINANCIERO RD</span>
              <span>/</span>
              <span>LEASING BANCARIO</span>
              <span>/</span>
              <span class="text-white font-bold">LEY 392-07 PROINDUSTRIA</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              Simulador Financiero & Escudo Fiscal Dominicano
            </h3>
            <p class="text-xs text-neutral-400 font-mono mt-1">
              Calcule su cuota con tasas corporativas preferenciales y deducción de impuestos de importación y renta.
            </p>
          </div>
          <div class="text-right">
            <span class="text-xs font-mono text-neutral-400 block">VALOR DEL EQUIPO:</span>
            <span class="text-xl font-bold font-mono text-amber-400">$${_currentMachinePrice.toLocaleString()} USD</span>
            <span class="text-xs font-mono text-neutral-500 block">(RD$ ${(_currentMachinePrice * 60).toLocaleString()})</span>
          </div>
        </div>

        <!-- Bank Selector Tabs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          ${DOM_BANKS.map(function (b) {
            var isActive = _activeBank.bankName === b.bankName;
            return `
              <div onclick="window.tmdSetBank('${b.bankName}')" class="tmd-bank-card p-3.5 rounded-xl border ${isActive ? 'active' : 'border-white/10 bg-black/50'}">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 'text-white'}">${b.bankName}</span>
                  <span class="w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-neutral-600'}"></span>
                </div>
                <div class="text-[11px] text-neutral-400 truncate mb-2">${b.name}</div>
                <div class="flex items-baseline justify-between pt-2 border-t border-white/10 text-xs font-mono">
                  <span class="text-neutral-500">TASA FIJA:</span>
                  <span class="text-sm font-bold text-amber-400">${b.rate.toFixed(2)}%</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Sliders & Results Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-black/60 p-5 rounded-xl border border-white/10">
          <div class="lg:col-span-6 space-y-5">
            <div>
              <div class="flex justify-between items-center text-xs font-mono mb-2">
                <span class="text-neutral-400">INICIAL / DOWN PAYMENT (${_downPaymentPct}%):</span>
                <span class="text-amber-400 font-bold">$${c.dpAmountUsd.toLocaleString()} USD (RD$ ${c.dpAmountDop.toLocaleString()})</span>
              </div>
              <input type="range" min="10" max="50" step="5" value="${_downPaymentPct}" oninput="window.tmdUpdateDp(this.value)" class="tmd-slider">
            </div>

            <div>
              <div class="flex justify-between items-center text-xs font-mono mb-2">
                <span class="text-neutral-400">PLAZO DEL FINANCIAMIENTO:</span>
                <span class="text-amber-400 font-bold">${_loanTermMonths} MESES (${(_loanTermMonths / 12).toFixed(1)} Años)</span>
              </div>
              <input type="range" min="12" max="60" step="12" value="${_loanTermMonths}" oninput="window.tmdUpdateTerm(this.value)" class="tmd-slider">
            </div>

            <div class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                BENEFICIO TRIBUTARIO LEY 392-07 (PROINDUSTRIA)
              </div>
              <p class="text-[11px] text-neutral-300 leading-relaxed">
                Adquisición exenta del 18% de ITBIS aduanal + depreciación acelerada deductible del 27% del Impuesto Sobre la Renta (ISR corporativo).
              </p>
              <div class="pt-1 text-xs font-mono text-emerald-300 font-bold flex justify-between">
                <span>Ahorro Fiscal Total Estimado:</span>
                <span>RD$ ${c.totalShieldDop.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 flex flex-col justify-between p-5 rounded-xl border border-amber-500/40 bg-neutral-950">
            <div>
              <span class="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">CUOTA MENSUAL ESTIMADA (${_activeBank.bankName}):</span>
              <div class="flex items-baseline gap-3 mb-1">
                <span class="text-3xl font-black font-mono text-amber-400">$${c.monthlyUsd.toLocaleString()} USD</span>
                <span class="text-sm font-mono text-neutral-400">/ mes</span>
              </div>
              <div class="text-sm font-mono font-bold text-neutral-300 mb-4">RD$ ${c.monthlyDop.toLocaleString()} / mes aprox.</div>

              <div class="space-y-1.5 text-xs font-mono text-neutral-400 border-t border-white/10 pt-3">
                <div class="flex justify-between">
                  <span>Monto Financiado:</span>
                  <span class="text-white font-bold">$${c.financedUsd.toLocaleString()} USD</span>
                </div>
                <div class="flex justify-between">
                  <span>Entidad Bancaria:</span>
                  <span class="text-amber-400 font-bold">${_activeBank.name}</span>
                </div>
                <div class="flex justify-between">
                  <span>Tasa Anual Efectiva:</span>
                  <span class="text-emerald-400 font-bold">${_activeBank.rate.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-white/10 mt-4 flex items-center gap-3">
              <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo solicitar formalmente la corrida de leasing con ' + _activeBank.name + ' para el equipo ' + _currentMachineName + ' (Precio: $' + _currentMachinePrice + ' USD, Plazo: ' + _loanTermMonths + ' meses, Cuota: $' + c.monthlyUsd + ' USD/mes con Escudo Ley 392-07).')}" target="_blank" class="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                <span>Solicitar Pre-Aprobación Bancaria WhatsApp</span>
              </a>
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
      <div id="tmd-vehicle-360-infusion" class="tmd-stitch-section rounded-2xl border p-6 md:p-8 bg-neutral-950/90 dark:bg-black/90 text-white shadow-2xl border-amber-500/20">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span>INSPECTOR 360°</span>
              <span>/</span>
              <span>TELEMETRÍA EN VIVO</span>
              <span>/</span>
              <span class="text-white font-bold">${machineName || 'JCB 3CX ECO 4X4'}</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              Inspección Virtual 360° & Selector de Implementos Hidráulicos
            </h3>
            <p class="text-xs text-neutral-400 font-mono mt-1">
              Seleccione el ángulo de visualización y el implemento de trabajo para recalcular en tiempo real el flujo hidráulico y el peso en orden de marcha.
            </p>
          </div>

          <div class="flex items-center gap-2 font-mono text-xs">
            <div class="px-3 py-1.5 rounded bg-black/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              RPM: <strong>2,200</strong>
            </div>
            <div class="px-3 py-1.5 rounded bg-black/60 border border-white/10 text-neutral-300">
              Temp: <strong class="text-amber-400">88°C</strong>
            </div>
            <div class="px-3 py-1.5 rounded bg-black/60 border border-white/10 text-neutral-300">
              Consumo: <strong class="text-white">1.8 gal/h</strong>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 mb-6">
          <span class="text-xs font-mono text-neutral-400 mr-2">ÁNGULO:</span>
          <button onclick="window.tmdSetAngle(0)" class="tmd-360-btn px-3 py-1.5 rounded-lg border text-xs font-mono uppercase ${_activeAngle === 0 ? 'active' : 'border-white/10 bg-black text-neutral-400'}">
            0° Frontal
          </button>
          <button onclick="window.tmdSetAngle(90)" class="tmd-360-btn px-3 py-1.5 rounded-lg border text-xs font-mono uppercase ${_activeAngle === 90 ? 'active' : 'border-white/10 bg-black text-neutral-400'}">
            90° Lateral Oruga/Rueda
          </button>
          <button onclick="window.tmdSetAngle(180)" class="tmd-360-btn px-3 py-1.5 rounded-lg border text-xs font-mono uppercase ${_activeAngle === 180 ? 'active' : 'border-white/10 bg-black text-neutral-400'}">
            180° Brazo Extradig
          </button>
          <button onclick="window.tmdSetAngle(270)" class="tmd-360-btn px-3 py-1.5 rounded-lg border text-xs font-mono uppercase ${_activeAngle === 270 ? 'active' : 'border-white/10 bg-black text-neutral-400'}">
            270° Cabina Climatizada
          </button>
        </div>

        <div class="mb-4">
          <label class="block text-xs font-mono text-neutral-400 uppercase mb-2">Acople Rápido de Accesorios Hidráulicos:</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${ATTACHMENTS.map(function (att) {
              var isSel = _activeAttachment.name === att.name;
              return `
                <div onclick="window.tmdSelectAttachment('${att.id}')" class="tmd-implement-card p-3.5 rounded-xl border ${isSel ? 'active' : 'border-white/10 bg-black/60'}">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-mono font-bold ${isSel ? 'text-amber-400' : 'text-white'}">${att.name}</span>
                    <span class="w-2 h-2 rounded-full ${isSel ? 'bg-amber-400' : 'bg-neutral-600'}"></span>
                  </div>
                  <p class="text-[11px] text-neutral-400 mb-2">${att.desc}</p>
                  <div class="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-t border-white/10 pt-2">
                    <span>Flujo: <strong class="text-white">${att.flow} L/min</strong></span>
                    <span>${att.price > 0 ? '+$' + att.price + ' USD' : 'Incluido'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-black/80 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div class="flex items-center gap-4">
            <span>Peso Operativo Recalculado: <strong class="text-white">${(8135 + _activeAttachment.extraWeight).toLocaleString()} kg</strong></span>
            <span>Caudal Hidráulico Demandado: <strong class="text-amber-400">${_activeAttachment.flow} L/min</strong></span>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo cotizar el equipo ' + machineName + ' configurado con ' + _activeAttachment.name + ' para entrega en obra.')}" target="_blank" class="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-[11px] transition-colors">
            Cotizar Configuración en WhatsApp →
          </a>
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
  // 8. MODULE 3: FILTROS RÁPIDOS POR INDUSTRIA / FAENA B2B (#/vehicles)
  // ─────────────────────────────────────────────────────────────────────────────
  window.tmdFilterByIndustry = function (industryKey) {
    document.querySelectorAll('.tmd-industry-card').forEach(function (card) {
      if (card.getAttribute('data-industry') === industryKey) {
        card.classList.add('active', 'border-amber-500');
      } else {
        card.classList.remove('active', 'border-amber-500');
      }
    });

    // Filter cards on the page if present
    var machineCards = document.querySelectorAll('.machinery-card, #root [class*="card"]');
    if (machineCards.length > 0 && industryKey !== 'all') {
      machineCards.forEach(function (mc) {
        var text = mc.innerText.toLowerCase();
        var match = false;
        if (industryKey === 'construccion' && (text.includes('excavadora') || text.includes('retro') || text.includes('jcb') || text.includes('compactador'))) match = true;
        if (industryKey === 'agricola' && (text.includes('tractor') || text.includes('ls') || text.includes('kubota') || text.includes('agrícola'))) match = true;
        if (industryKey === 'industrial' && (text.includes('telehandler') || text.includes('loadall') || text.includes('montacarga') || text.includes('generador'))) match = true;
        if (industryKey === 'mineria' && (text.includes('220x') || text.includes('liugong') || text.includes('oruga') || text.includes('pesada') || text.includes('cantera'))) match = true;
        if (industryKey === 'repuestos' && (text.includes('filtro') || text.includes('repuesto') || text.includes('bomba') || text.includes('cilindro'))) match = true;

        if (match) {
          mc.style.display = '';
        } else {
          mc.style.display = 'none';
        }
      });
    } else {
      machineCards.forEach(function (mc) { mc.style.display = ''; });
    }
  };

  function renderIndustryB2BFiltersModule() {
    return `
      <section id="tmd-industry-filters-infusion" class="w-full max-w-[1360px] mx-auto px-6 lg:px-12 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2 font-mono text-xs uppercase text-neutral-400">
            <span class="material-symbols-outlined text-amber-500 text-[18px]">filter_alt</span>
            <span>Filtrar por Faena & Aplicación Operativa:</span>
          </div>
          <button onclick="window.tmdFilterByIndustry('all')" class="text-xs font-mono text-amber-500 hover:underline cursor-pointer">
            Ver Todo el Stock
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <!-- Construcción -->
          <div data-industry="construccion" onclick="window.tmdFilterByIndustry('construccion')" class="tmd-industry-card p-4 rounded-[18px] cursor-pointer flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-[10px] bg-white/[0.04] flex items-center justify-center text-amber-500 group-hover:bg-primary-container group-hover:text-black transition-all">
                  <span class="material-symbols-outlined text-[22px]">precision_manufacturing</span>
                </div>
                <span class="px-2 py-0.5 rounded-[6px] bg-white/[0.06] text-white font-mono text-[10px] font-bold">46 Unid.</span>
              </div>
              <h4 class="text-sm font-bold text-white uppercase mb-1">Construcción</h4>
              <p class="text-[11px] text-neutral-400">Retroexcavadoras 3CX, excavadoras de oruga y rodillos.</p>
            </div>
            <div class="mt-3 pt-2 flex items-center justify-between text-amber-500 font-mono text-[10px] uppercase font-bold">
              <span>Filtrar Stock</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          <!-- Agrícola -->
          <div data-industry="agricola" onclick="window.tmdFilterByIndustry('agricola')" class="tmd-industry-card p-4 rounded-[18px] cursor-pointer flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-[10px] bg-white/[0.04] flex items-center justify-center text-amber-500 group-hover:bg-primary-container group-hover:text-black transition-all">
                  <span class="material-symbols-outlined text-[22px]">agriculture</span>
                </div>
                <span class="px-2 py-0.5 rounded-[6px] bg-white/[0.06] text-white font-mono text-[10px] font-bold">28 Unid.</span>
              </div>
              <h4 class="text-sm font-bold text-white uppercase mb-1">Agrícola</h4>
              <p class="text-[11px] text-neutral-400">LS Tractor MT7, Kubota y rastras para arroz y caña.</p>
            </div>
            <div class="mt-3 pt-2 flex items-center justify-between text-amber-500 font-mono text-[10px] uppercase font-bold">
              <span>Filtrar Stock</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          <!-- Industrial -->
          <div data-industry="industrial" onclick="window.tmdFilterByIndustry('industrial')" class="tmd-industry-card p-4 rounded-[18px] cursor-pointer flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-[10px] bg-white/[0.04] flex items-center justify-center text-amber-500 group-hover:bg-primary-container group-hover:text-black transition-all">
                  <span class="material-symbols-outlined text-[22px]">factory</span>
                </div>
                <span class="px-2 py-0.5 rounded-[6px] bg-white/[0.06] text-white font-mono text-[10px] font-bold">35 Unid.</span>
              </div>
              <h4 class="text-sm font-bold text-white uppercase mb-1">Industrial</h4>
              <p class="text-[11px] text-neutral-400">Telehandlers Loadall y montacargas de alta capacidad.</p>
            </div>
            <div class="mt-3 pt-2 flex items-center justify-between text-amber-500 font-mono text-[10px] uppercase font-bold">
              <span>Filtrar Stock</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          <!-- Minería & Canteras -->
          <div data-industry="mineria" onclick="window.tmdFilterByIndustry('mineria')" class="tmd-industry-card p-4 rounded-[18px] cursor-pointer flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-[10px] bg-white/[0.04] flex items-center justify-center text-amber-500 group-hover:bg-primary-container group-hover:text-black transition-all">
                  <span class="material-symbols-outlined text-[22px]">landslide</span>
                </div>
                <span class="px-2 py-0.5 rounded-[6px] bg-white/[0.06] text-white font-mono text-[10px] font-bold">19 Unid.</span>
              </div>
              <h4 class="text-sm font-bold text-white uppercase mb-1">Minería & Canteras</h4>
              <p class="text-[11px] text-neutral-400">Excavadoras LiuGong 22T HD y trituradoras de roca.</p>
            </div>
            <div class="mt-3 pt-2 flex items-center justify-between text-amber-500 font-mono text-[10px] uppercase font-bold">
              <span>Filtrar Stock</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          <!-- Repuestos Express -->
          <div data-industry="repuestos" onclick="location.hash = '#/parts'" class="tmd-industry-card p-4 rounded-[18px] cursor-pointer flex flex-col justify-between group border-amber-500/30">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-[10px] bg-primary-container text-black font-bold flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">build_circle</span>
                </div>
                <span class="px-2 py-0.5 rounded-[6px] bg-primary-container/20 text-amber-400 font-mono text-[10px] font-bold">EXPRESS 24H</span>
              </div>
              <h4 class="text-sm font-bold text-white uppercase mb-1">Repuestos OEM</h4>
              <p class="text-[11px] text-neutral-400">Kits hidráulicos 6,000 PSI y filtros originales JCB.</p>
            </div>
            <div class="mt-3 pt-2 flex items-center justify-between text-amber-500 font-mono text-[10px] uppercase font-bold">
              <span>Ver Catálogo CAD</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">search</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. MODULE 4: PAQUETE TROPICALIZADO CARIBE & CONDICIONES EXTREMAS (#/vehicle/:slug)
  // ─────────────────────────────────────────────────────────────────────────────
  function renderTropicalizedEngineeringModule(machineName) {
    return `
      <section id="tmd-tropical-engineering-infusion" class="w-full max-w-7xl mx-auto px-6 py-8 my-6">
        <div class="p-6 sm:p-8 rounded-[20px] bg-gradient-to-b from-[#181c26]/90 to-[#0b0d13]/95 backdrop-blur-[24px] border border-white/8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-amber-500 font-mono text-xs tracking-widest uppercase font-bold">EQUIPAMIENTO DE SERIE PROFESIONAL</span>
            <span class="h-px bg-white/10 flex-1"></span>
          </div>
          <h3 class="text-xl sm:text-2xl font-extrabold text-white uppercase mb-6">
            PAQUETE TROPICALIZADO PARA EL CARIBE & CONDICIONES EXTREMAS RD
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 1. Cabina Tropicalizada -->
            <div class="tmd-tropical-card p-4 rounded-[16px] flex flex-col justify-between">
              <div>
                <div class="text-amber-500 mb-2.5">
                  <span class="material-symbols-outlined text-[28px]">ac_unit</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Cabina Tropicalizada 38°C+</h4>
                <p class="text-xs text-neutral-400">
                  Compresor de A/C sobredimensionado para altas temperaturas. Aislamiento acústico a 72 dB(A), asiento neumático y visión panorámica 360°.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-400 mt-3 pt-2 border-t border-white/5 font-bold">CERTIFICADO CLIMA CARIBE</span>
            </div>

            <!-- 2. Radiador Anti-Bagazo -->
            <div class="tmd-tropical-card p-4 rounded-[16px] flex flex-col justify-between">
              <div>
                <div class="text-amber-500 mb-2.5">
                  <span class="material-symbols-outlined text-[28px]">mode_fan</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Radiador Anti-Bagazo & Salitre</h4>
                <p class="text-xs text-neutral-400">
                  Paso ancho de aletas para evitar taponamientos en zafra azucarera y polvo de cantera, con tratamiento anticorrosivo marino para zonas costeras.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-400 mt-3 pt-2 border-t border-white/5 font-bold">PROTECCIÓN MARINA MICM</span>
            </div>

            <!-- 3. Filtro Ciclónico Dual -->
            <div class="tmd-tropical-card p-4 rounded-[16px] flex flex-col justify-between">
              <div>
                <div class="text-amber-500 mb-2.5">
                  <span class="material-symbols-outlined text-[28px]">filter_drama</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Pre-Filtro Ciclónico Donaldson</h4>
                <p class="text-xs text-neutral-400">
                  Separación centrífuga de hasta 99.4% de partículas abrasivas previo al paso por los elementos de aire primario y secundario.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-400 mt-3 pt-2 border-t border-white/5 font-bold">CALIDAD SEVERE-DUTY</span>
            </div>

            <!-- 4. Telemetría LiveLink RTK -->
            <div class="tmd-tropical-card p-4 rounded-[16px] flex flex-col justify-between">
              <div>
                <div class="text-amber-500 mb-2.5">
                  <span class="material-symbols-outlined text-[28px]">satellite_alt</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">Pre-instalación Auto-Steer RTK</h4>
                <p class="text-xs text-neutral-400">
                  Arnés ISOBUS de fábrica y sensor de ángulo de giro homologado para antenas Trimble y guiado satelital submétrico de 2.5 cm.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-400 mt-3 pt-2 border-t border-white/5 font-bold">CONEXIÓN CAN BUS SATELITAL</span>
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

  function renderToolsDashboardModule() {
    return `
      <div id="tmd-tools-dashboard-infusion" class="w-full min-h-screen text-neutral-100 pb-20 pt-24" style="background: radial-gradient(circle at 50% 0%, rgba(245,158,11,0.09) 0%, rgba(9,11,18,0.98) 65%, #05070c 100%);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Breadcrumb & Live Indicator -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6 pt-4 border-b border-white/10 pb-4">
            <div class="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <a href="#/home" class="hover:text-amber-400 transition-colors">TMD DOMINICANA</a>
              <span>/</span>
              <span class="text-amber-400 font-bold">ECOSISTEMA DIGITAL</span>
              <span>/</span>
              <span class="text-white">CENTRO DE HERRAMIENTAS</span>
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
          <div class="relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden border border-amber-500/30" style="background: linear-gradient(135deg, rgba(20,26,40,0.88) 0%, rgba(12,16,25,0.92) 100%); backdrop-filter: blur(24px); box-shadow: 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10 max-w-3xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-black uppercase tracking-wider mb-4">
                <span class="material-symbols-outlined text-[16px]">terminal</span>
                Centro de Mando Digital para Contratistas
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-sans">
                Ecosistema de Operaciones, Finanzas &amp; Flota
              </h1>
              <p class="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-8">
                Inspirado en el estándar de gestión de flotas de clase mundial de John Deere y Bobcat, adaptado a la geografía, canteras y régimen tributario DGII de la República Dominicana.
              </p>

              <!-- Quick Launch CTA Bar -->
              <div class="flex flex-wrap items-center gap-3">
                <button onclick="window.tmdOpenClientPortal();" class="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer">
                  <span>🚜</span>
                  <span>Abrir Portal VIP &amp; Flota</span>
                </button>
                <button onclick="window.tmdOpenMachineAdvisor();" class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-[18px] text-amber-400">psychology</span>
                  <span>Asesor "Help Me Choose"</span>
                </button>
                <a href="tel:18098262222" class="px-5 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono font-bold text-xs flex items-center gap-2 transition-all">
                  <span class="material-symbols-outlined text-[18px] text-emerald-400">phone_in_talk</span>
                  <span>Km 22: 809-826-2222</span>
                </a>
              </div>
            </div>

            <!-- Stats Ribbon -->
            <div class="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Flota en Terreno</div>
                <div class="text-lg font-bold text-emerald-400 mt-0.5">44 Máquinas Activas</div>
                <div class="text-[10px] text-neutral-500">LiveLink GPS Satelital</div>
              </div>
              <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Capacidad Taller</div>
                <div class="text-lg font-bold text-amber-400 mt-0.5">18 Bahías Pesadas</div>
                <div class="text-[10px] text-neutral-500">Km 22 Autopista Duarte</div>
              </div>
              <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Escudo Fiscal DGII</div>
                <div class="text-lg font-bold text-white mt-0.5">25% Depreciación</div>
                <div class="text-[10px] text-neutral-500">Ley 11-92 Cat. 2 + ITBIS</div>
              </div>
              <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                <div class="text-neutral-400 text-[10px] uppercase">Repuestos OEM</div>
                <div class="text-lg font-bold text-cyan-400 mt-0.5">390+ SKUs Stock</div>
                <div class="text-[10px] text-neutral-500">Entrega Inmediata en RD</div>
              </div>
            </div>
          </div>

          <!-- 3 CORE PILLARS OF DIGITAL TOOLS -->
          <div class="space-y-12">
            
            <!-- PILLAR 1: FLOTA & TELEMETRÍA IOT -->
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <span class="material-symbols-outlined text-[24px]">satellite_alt</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-xl sm:text-2xl font-black text-white font-sans">1. Gestión de Flota &amp; Telemetría IoT</h2>
                    <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase">Enlace 24/7</span>
                  </div>
                  <p class="text-xs text-neutral-400">Monitoreo en tiempo real de presión hidráulica, horómetros y estado en taller</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <!-- Card 1: Operations Center -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-emerald-500/30 transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_10px_35px_rgba(16,185,129,0.2)]" style="background: linear-gradient(160deg, rgba(16,24,35,0.85) 0%, rgba(10,14,22,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <span class="material-symbols-outlined text-[28px]">satellite_alt</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 uppercase">SATELITAL</span>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2">TMD Operations Center™</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
                      Cabina de telemetría completa: horómetros acumulados, curva de presión hidráulica (hasta 350 Bar) en vivo y geocercas activas en proyectos viales de RD.
                    </p>
                    <ul class="space-y-1.5 text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Rastreo satelital GPS en canteras</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Alertas de consumo de diésel</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Alertas predictivas de mantenimiento 500h</li>
                    </ul>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenTelematicsCockpit();" class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                      <span>Abrir Operations Center</span>
                    </button>
                  </div>
                </div>

                <!-- Card 2: DVI Tracker WO-4482 -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-emerald-500/20 transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_10px_35px_rgba(16,185,129,0.15)]" style="background: linear-gradient(160deg, rgba(16,24,35,0.85) 0%, rgba(10,14,22,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <span class="material-symbols-outlined text-[28px]">fact_check</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300 uppercase">TALLER KM 22</span>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2">Rastreo de Órdenes (WO / DVI)</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
                      Siga el progreso de su orden de reparación en Taller Km 22 a través de las 5 fases oficiales, con evidencia fotográfica digital de 40 puntos.
                    </p>
                    <ul class="space-y-1.5 text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Reporte DVI fotográfico en alta resolución</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Aprobación electrónica de repuestos requeridos</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Tiempo estimado de entrega de máquina</li>
                    </ul>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenDviTracker('WO-4482');" class="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700 transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-[18px]">search</span>
                      <span>Rastrear Orden WO-4482</span>
                    </button>
                  </div>
                </div>

                <!-- Card 3: Client VIP Portal -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-amber-500/30 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(245,158,11,0.2)]" style="background: linear-gradient(160deg, rgba(25,22,15,0.85) 0%, rgba(14,12,8,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <span class="text-2xl">🚜</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500 text-black uppercase">EXCLUSIVO</span>
                    </div>
                    <h3 class="text-lg font-bold text-amber-400 mb-2">Portal VIP &amp; Flota Contratista</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
                      Acceso exclusivo para directores de operaciones y contratistas: histórico de horas, bóveda de facturas fiscales NCF B01 y requisición de repuestos con entrega express.
                    </p>
                    <ul class="space-y-1.5 text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                      <li class="flex items-center gap-2"><span class="text-amber-400">✓</span> Firma digital de cotizaciones autorizadas</li>
                      <li class="flex items-center gap-2"><span class="text-amber-400">✓</span> Reserva prioritaria de bahías mecánicas</li>
                      <li class="flex items-center gap-2"><span class="text-amber-400">✓</span> Descarga de NCF fiscales en PDF/XML</li>
                    </ul>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenClientPortal();" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all cursor-pointer">
                      <span>🚜</span>
                      <span>Ingresar al Portal VIP</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- PILLAR 2: FINANZAS & DGII -->
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <span class="material-symbols-outlined text-[24px]">account_balance</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-xl sm:text-2xl font-black text-white font-sans">2. Inteligencia Financiera &amp; Escudo Fiscal DGII</h2>
                    <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase">Ley 11-92</span>
                  </div>
                  <p class="text-xs text-neutral-400">Modelos de ahorro impositivo, leasing operativo con banca nacional y comprobantes B01/B15</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <!-- Card 4: Financial Suite -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-amber-500/30 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(245,158,11,0.2)]" style="background: linear-gradient(160deg, rgba(25,22,15,0.85) 0%, rgba(14,12,8,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <span class="material-symbols-outlined text-[28px]">calculate</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 uppercase">ESCUDO FISCAL</span>
                    </div>
                    <h3 class="text-lg font-bold text-amber-400 mb-2">TMD MyFinancial™ Suite</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
                      Simule la amortización acelerada del 25% (Categoría 2), crédito fiscal del 18% ITBIS y compare compra directa versus leasing bancario con Banreservas, Popular y BHD.
                    </p>
                    <ul class="space-y-1.5 text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                      <li class="flex items-center gap-2"><span class="text-amber-400">✓</span> Depreciación acelerada Ley 11-92</li>
                      <li class="flex items-center gap-2"><span class="text-amber-400">✓</span> Tasa preferencial desde 9.50%</li>
                      <li class="flex items-center gap-2"><span class="text-amber-400">✓</span> Exportación de reporte fiscal DGII</li>
                    </ul>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenFinancialSuite('JCB 3CX Eco', 85000);" class="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(245,158,11,0.3)] transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-[18px]">account_balance</span>
                      <span>Abrir Suite Financiera DGII</span>
                    </button>
                  </div>
                </div>

                <!-- Card 5: Formal DGII Quote -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(245,158,11,0.15)]" style="background: linear-gradient(160deg, rgba(20,24,35,0.85) 0%, rgba(12,16,24,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400">
                        <span class="material-symbols-outlined text-[28px]">receipt_long</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300 uppercase">NCF B01 / B15</span>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2">Cotización Formal DGII</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
                      Genere una propuesta comercial formal con desglose de ITBIS, comprobante de crédito fiscal B01 para empresas o B15 para licitaciones con MOPC y sector público.
                    </p>
                    <ul class="space-y-1.5 text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Validación instantánea de RNC corporativo</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Especificación técnica según norma MOPC</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Garantía de fábrica respaldada en Km 22</li>
                    </ul>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="if(typeof window.tmdShowQuoteModal==='function') window.tmdShowQuoteModal('JCB 3CX Eco');" class="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700 transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-[18px]">request_quote</span>
                      <span>Generar Cotización Formal</span>
                    </button>
                  </div>
                </div>

                <!-- Card 6: TCO Calculator -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_10px_35px_rgba(16,185,129,0.15)]" style="background: linear-gradient(160deg, rgba(20,24,35,0.85) 0%, rgba(12,16,24,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <span class="material-symbols-outlined text-[28px]">payments</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 uppercase">TCO OPERATIVO</span>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2">Calculadora TCO &amp; Renta</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
                      Proyecte el costo total de posesión por hora de trabajo: consumo de diésel óptimo con bomba mecánica tropicalizada, salario de operador y filtros preventivos.
                    </p>
                    <ul class="space-y-1.5 text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Comparativa de costo por m³ excavado</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Ahorro diésel de hasta 16% con EcoMAX</li>
                      <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Tarifa de renta diaria, semanal y mensual</li>
                    </ul>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.location.hash='#/home'; setTimeout(function(){ var el = document.getElementById('tmd-tco-estimator-infusion'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 300);" class="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700 transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-[18px]">bar_chart</span>
                      <span>Calcular Costo TCO</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- PILLAR 3: INGENIERÍA OEM & SELECCIÓN -->
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <span class="material-symbols-outlined text-[24px]">manage_search</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-xl sm:text-2xl font-black text-white font-sans">3. Selección de Maquinaria, Comparador &amp; Repuestos</h2>
                    <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase">14 Vectores OEM</span>
                  </div>
                  <p class="text-xs text-neutral-400">Benchmarks técnicos frente a Caterpillar y John Deere, catálogos PDF y despiece de repuestos</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <!-- Card 7: Model Comparator -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-cyan-500/30 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_10px_35px_rgba(6,182,212,0.2)]" style="background: linear-gradient(160deg, rgba(16,24,35,0.85) 0%, rgba(10,14,22,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                      <span class="material-symbols-outlined text-[28px]">compare_arrows</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 uppercase">3-VÍAS</span>
                    <h3 class="text-base font-bold text-white mt-2 mb-1.5">Comparador 3-Vías</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed">
                      JCB y LiuGong frente a Cat 420 y Deere 310L: fuerza de desprendimiento, presión hidráulica y consumo de diésel.
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenModelComparator('backhoes');" class="w-full py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(6,182,212,0.3)] transition-all cursor-pointer">
                      <span>Comparar Modelos</span>
                    </button>
                  </div>
                </div>

                <!-- Card 8: Parts Serial Engine -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-cyan-400" style="background: linear-gradient(160deg, rgba(16,24,35,0.85) 0%, rgba(10,14,22,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                      <span class="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300 uppercase">390+ SKUS</span>
                    <h3 class="text-base font-bold text-white mt-2 mb-1.5">Buscador de Repuestos</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed">
                      Búsqueda por VIN/Serial o código OEM: filtros originales, inyección, orugas y sellos con stock en Km 22.
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenPartsSerialEngine();" class="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-neutral-700 transition-all cursor-pointer">
                      <span>Buscar Piezas</span>
                    </button>
                  </div>
                </div>

                <!-- Card 9: AI Machine Advisor -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-amber-400" style="background: linear-gradient(160deg, rgba(16,24,35,0.85) 0%, rgba(10,14,22,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                      <span class="material-symbols-outlined text-[28px]">psychology</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 uppercase">AI FLEET</span>
                    <h3 class="text-base font-bold text-white mt-2 mb-1.5">Help Me Choose</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed">
                      Asistente interactivo: indique tipo de suelo, profundidad de excavación y proyecto para recomendar el equipo idóneo.
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenMachineAdvisor();" class="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-neutral-700 transition-all cursor-pointer">
                      <span>Iniciar Asesor</span>
                    </button>
                  </div>
                </div>

                <!-- Card 10: Brochures Hub -->
                <div class="rounded-2xl p-6 flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-emerald-400" style="background: linear-gradient(160deg, rgba(16,24,35,0.85) 0%, rgba(10,14,22,0.92) 100%); backdrop-filter: blur(16px);">
                  <div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <span class="material-symbols-outlined text-[28px]">download</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 uppercase">PDF OFICIAL</span>
                    <h3 class="text-base font-bold text-white mt-2 mb-1.5">Fichas Técnicas PDF</h3>
                    <p class="text-xs text-neutral-300 leading-relaxed">
                      Descargue especificaciones oficiales de fábrica, diagramas de alcance y tablas de lubricantes autorizados.
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-white/10">
                    <button onclick="window.tmdOpenBrochuresHub();" class="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-neutral-700 transition-all cursor-pointer">
                      <span>Descargar PDFs</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- Institutional Taller Central Km 22 Support Banner -->
          <div class="mt-14 rounded-3xl p-8 border border-neutral-800 flex flex-wrap items-center justify-between gap-6" style="background: linear-gradient(145deg, rgba(15,18,28,0.95) 0%, rgba(9,11,18,0.98) 100%);">
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
    if (raw === 'vehicles' || raw === 'modelos' || raw === 'catalogo' || ['construccion','agricolas','industriales','mineria'].includes(raw)) return 'vehicles';
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
    // 1. TCO Estimator: ONLY on 'home'
    if (activeRoute !== 'home') {
      var el = document.getElementById('tmd-tco-estimator-infusion');
      if (el) el.remove();
    }

    // 2. Industry Filters: ONLY on 'vehicles'
    if (activeRoute !== 'vehicles') {
      var el = document.getElementById('tmd-industry-filters-infusion');
      if (el) el.remove();
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
      var el = document.getElementById('tmd-v2-full-service-page');
      if (el) el.remove();
    }

    // 8. Tools Dashboard: ONLY on 'tools'
    if (activeRoute !== 'tools') {
      var el = document.getElementById('tmd-tools-dashboard-infusion');
      if (el) el.remove();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
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

      // Prune any sections from other routes to prevent duplication/leaks
      cleanupInjectedSections(currentRoute);

      var mainEl = document.querySelector('#root main');

      // A0. TOOLS DASHBOARD PAGE (#/tools)
      if (currentRoute === 'tools') {
        if (!document.getElementById('tmd-tools-dashboard-infusion') && mainEl) {
          mainEl.innerHTML = renderToolsDashboardModule();
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }

      // A. SERVICE PAGE (#/service)
      if (currentRoute === 'service') {
        if (!document.getElementById('tmd-v2-full-service-page') && window.TMD_V2_SERVICE_HTML) {
          if (mainEl) {
            // Replace ONLY what is inside <main>, leaving Header, Topbar, and Footer 100% intact!
            mainEl.innerHTML = window.TMD_V2_SERVICE_HTML;
            window.scrollTo({ top: 0, behavior: 'instant' });

            var bookingForm = mainEl.querySelector('form');
            if (bookingForm && bookingForm.id !== 'dtcServiceForm') {
              bookingForm.onsubmit = function (e) {
                e.preventDefault();
                window.tmdSubmitBookingForm();
              };
            }

            // Append National Coverage Radar at bottom of service page
            var sPage = document.getElementById('tmd-v2-full-service-page');
            if (sPage && !sPage.querySelector('#tmd-national-coverage-infusion')) {
              var wrapperCoverage = document.createElement('div');
              wrapperCoverage.innerHTML = renderNationalCoverageModule();
              sPage.appendChild(wrapperCoverage.firstElementChild);
            }
          }
        }
      }

      // B. HOME PAGE (#/home)
      else if (currentRoute === 'home') {
        if (!document.getElementById('tmd-tco-estimator-infusion') && mainEl) {
          var wrapperTco = document.createElement('div');
          wrapperTco.innerHTML = renderTcoEstimatorModule();
          mainEl.appendChild(wrapperTco.firstElementChild);
          window.tmdUpdateTcoCalc();
        }
      }

      // C. ABOUT US / LA EMPRESA (#/about)
      else if (currentRoute === 'about') {
        if (!document.getElementById('tmd-national-coverage-infusion') && mainEl) {
          var aboutContainer = mainEl.querySelector('.max-w-7xl') || mainEl;
          var wrapperCov = document.createElement('div');
          wrapperCov.innerHTML = renderNationalCoverageModule();
          aboutContainer.appendChild(wrapperCov.firstElementChild);
        }
      }

      // D. VEHICLES CATALOG (#/vehicles)
      else if (currentRoute === 'vehicles') {
        if (!document.getElementById('tmd-industry-filters-infusion') && mainEl) {
          var gridTarget = mainEl.querySelector('div.grid');
          var wrapperInd = document.createElement('div');
          wrapperInd.innerHTML = renderIndustryB2BFiltersModule();
          if (gridTarget && gridTarget.parentNode) {
            gridTarget.parentNode.insertBefore(wrapperInd.firstElementChild, gridTarget);
          } else {
            mainEl.appendChild(wrapperInd.firstElementChild);
          }
        }
      }

      // E. PARTS CATALOG (#/parts)
      else if (currentRoute === 'parts') {
        // On parts page, keep original 390+ OEM parts list 100% visible and interactive!
        // Place the interactive SVG exploded schematic neatly AFTER the parts grid
        if (!document.getElementById('tmd-schematic-infusion-container') && mainEl) {
          var partsContainer = mainEl.querySelector('.max-w-7xl') || mainEl;
          var wrapperSchematic = document.createElement('div');
          wrapperSchematic.innerHTML = renderSchematicModule();
          // Append after the catalog grid so search and products remain first!
          partsContainer.appendChild(wrapperSchematic.firstElementChild);
        }
      }

      // F. VEHICLE DETAIL (#/vehicle/:slug)
      else if (currentRoute === 'vehicle-detail') {
        var h1El = document.querySelector('h1');
        if (h1El) _currentMachineName = h1El.innerText.trim();

        if (mainEl) {
          var vehicleContainer = mainEl.querySelector('.max-w-7xl') || mainEl;

          // 1. Tropicalized Engineering Package
          if (!document.getElementById('tmd-tropical-engineering-infusion')) {
            var wrapperTrop = document.createElement('div');
            wrapperTrop.innerHTML = renderTropicalizedEngineeringModule(_currentMachineName);
            vehicleContainer.appendChild(wrapperTrop.firstElementChild);
          }

          // 2. 360 Inspector
          if (!document.getElementById('tmd-vehicle-360-infusion')) {
            var wrapper360 = document.createElement('div');
            wrapper360.innerHTML = renderVehicleDetailInfusion(_currentMachineName);
            vehicleContainer.appendChild(wrapper360.firstElementChild);
          }

          // 3. Leasing & Tax Shield
          if (!document.getElementById('tmd-leasing-infusion-container')) {
            var wrapperLeasing = document.createElement('div');
            wrapperLeasing.innerHTML = renderLeasingModule();
            vehicleContainer.appendChild(wrapperLeasing.firstElementChild);
          }
        }
      }

      // G. MAGAZINE (#/magazine)
      else if (currentRoute === 'magazine') {
        if (!document.getElementById('tmd-port-lots-infusion') && mainEl) {
          var magContainer = mainEl.querySelector('.max-w-7xl') || mainEl;
          var wrapperLots = document.createElement('div');
          wrapperLots.innerHTML = renderPortLotsModule();
          magContainer.appendChild(wrapperLots.firstElementChild);
        }
      }

      // H. CONFIGURATOR (#/configurator)
      else if (currentRoute === 'configurator') {
        if (!document.getElementById('tmd-leasing-infusion-container') && mainEl) {
          var configContainer = mainEl.querySelector('.max-w-7xl') || mainEl;
          var wrapperLeas = document.createElement('div');
          wrapperLeas.innerHTML = renderLeasingModule();
          configContainer.appendChild(wrapperLeas.firstElementChild);
        }
      }

      // I. GLOBAL QUOTE MODAL ENHANCEMENT (DGII)
      var quoteModal = document.querySelector('[role="dialog"]');
      if (quoteModal && !quoteModal.querySelector('#tmd-dgii-fiscal-panel')) {
        var modalBody = quoteModal.querySelector('form') || quoteModal.querySelector('div.space-y-4') || quoteModal.firstElementChild;
        if (modalBody) {
          var dgiiDiv = document.createElement('div');
          dgiiDiv.innerHTML = renderDgiiFiscalConnector();
          var submitBtn = modalBody.querySelector('button[type="submit"]') || modalBody.lastElementChild;
          if (submitBtn && submitBtn.parentNode) {
            submitBtn.parentNode.insertBefore(dgiiDiv.firstElementChild, submitBtn);
          } else {
            modalBody.appendChild(dgiiDiv.firstElementChild);
          }
        }
      }

      // J. TOP NAVIGATION BAR: TOOLS MEGA MENU & PORTAL VIP INJECTION
      var mainNav = document.querySelector('nav[aria-label="Navegación principal"]');
      if (mainNav) {
        // 1. Tools Mega Menu Dropdown
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
            <button id="tmd-nav-mega-menu-btn" type="button" aria-expanded="false" class="h-9 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 shadow-sm cursor-pointer" onclick="window.tmdToggleToolsMenu(event)">
              <span class="material-symbols-outlined text-[16px] text-amber-400">terminal</span>
              <span>Herramientas</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500 text-black font-mono font-black">20/10</span>
              <span class="material-symbols-outlined text-[16px] transition-transform duration-200" id="tmd-tools-menu-chevron">expand_more</span>
            </button>

            <!-- 3-Column Mega Menu Dropdown (Pure Obsidian Black, Zero Blues/Cyans, Viewport-Contained) -->
            <div id="tmd-tools-mega-menu-dropdown" class="hidden absolute top-full right-0 mt-2 z-[99999] w-[720px] max-w-[calc(100vw-24px)] rounded-2xl p-4 sm:p-5 border border-amber-500/35 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.15)] text-neutral-200" style="background: rgba(10, 10, 12, 0.98); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); box-sizing: border-box;">
              
              <!-- Dropdown Header -->
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-white/10 gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="px-2 py-0.5 rounded bg-amber-500 text-black font-mono text-[9px] font-black uppercase shrink-0">TIER-1 OEM</span>
                  <span class="text-xs font-bold text-white tracking-wide truncate">Ecosistema de Herramientas Digitales TMD</span>
                </div>
                <a href="#/tools" onclick="window.tmdCloseToolsMenu();" class="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0">
                  <span>Dashboard Completo</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>

              <!-- 3 Columns -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                <!-- Col 1: Flota & Telemetría -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-emerald-500/20 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-1.5 mb-2.5">
                      <div class="flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span class="text-[10px] font-mono font-bold text-emerald-400 uppercase">Flota &amp; Telemetría</span>
                      </div>
                      <span class="text-[8px] font-mono px-1 rounded bg-neutral-800 text-neutral-400">TELEMETRÍA</span>
                    </div>
                    
                    <div class="space-y-2">
                      <div class="p-2 rounded-lg bg-black/40 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenTelematicsCockpit();">
                        <div class="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center justify-between gap-1">
                          <span class="truncate">Operations Center™</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">VIP LOGIN</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Telemetría satelital, 350 Bar en vivo y geocercas</div>
                      </div>

                      <div class="p-2 rounded-lg bg-black/40 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenDviTracker('WO-4482');">
                        <div class="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center justify-between gap-1">
                          <span class="truncate">Rastreo WO / DVI</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">CON ORDEN</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Inspección fotográfica digital 40 puntos en Km 22</div>
                      </div>

                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenClientPortal();">
                        <div class="text-xs font-bold text-amber-400 flex items-center justify-between gap-1">
                          <span class="truncate">Portal Clientes VIP</span>
                          <span class="text-[8px] font-mono font-black px-1.5 py-0.5 rounded bg-amber-500 text-black shrink-0">MULTI-TENANT</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Bóveda NCF, WOs y firma para contratistas</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Col 2: Finanzas & DGII -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-amber-500/20 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-1.5 mb-2.5">
                      <div class="flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span class="text-[10px] font-mono font-bold text-amber-400 uppercase">Finanzas &amp; DGII</span>
                      </div>
                      <span class="text-[8px] font-mono px-1 rounded bg-neutral-800 text-neutral-400">DGII / BANCOS</span>
                    </div>

                    <div class="space-y-2">
                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenFinancialSuite('JCB 3CX Eco', 85000);">
                        <div class="text-xs font-bold text-white group-hover:text-amber-300 flex items-center justify-between gap-1">
                          <span class="truncate">Suite MyFinancial™</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">LIBRE / RNC</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Ley 11-92: Depreciación 25% Cat. 2 y leasing bancario</div>
                      </div>

                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); if(typeof window.tmdShowQuoteModal==='function') window.tmdShowQuoteModal('JCB 3CX Eco');">
                        <div class="text-xs font-bold text-white group-hover:text-amber-300 flex items-center justify-between gap-1">
                          <span class="truncate">Cotizador DGII</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">RNC B01/B15</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Comprobante fiscal B01 empresarial y B15 público</div>
                      </div>

                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.location.hash='#/home'; setTimeout(function(){ var el = document.getElementById('tmd-tco-estimator-infusion'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 300);">
                        <div class="text-xs font-bold text-white group-hover:text-amber-300 flex items-center justify-between gap-1">
                          <span class="truncate">Calculadora TCO</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">100% PÚBLICO</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Estimador de costo por hora/día y tarifa de alquiler</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Col 3: Selección & Repuestos -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-amber-500/20 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-1.5 mb-2.5">
                      <div class="flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span class="text-[10px] font-mono font-bold text-amber-400 uppercase">Selección &amp; Repuestos</span>
                      </div>
                      <span class="text-[8px] font-mono px-1 rounded bg-neutral-800 text-neutral-400">TÉCNICA</span>
                    </div>

                    <div class="space-y-2">
                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenModelComparator('backhoes');">
                        <div class="text-xs font-bold text-white group-hover:text-amber-300 flex items-center justify-between gap-1">
                          <span class="truncate">Comparador 3-Vías</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">100% PÚBLICO</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">JCB vs CAT 420 vs Deere 310L en 14 vectores</div>
                      </div>

                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenPartsSerialEngine();">
                        <div class="text-xs font-bold text-white group-hover:text-amber-300 flex items-center justify-between gap-1">
                          <span class="truncate">Repuestos por VIN</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">BÚSQUEDA LIBRE</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">390+ piezas OEM con stock en Taller Km 22</div>
                      </div>

                      <div class="p-2 rounded-lg bg-black/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all cursor-pointer group" onclick="window.tmdCloseToolsMenu(); window.tmdOpenMachineAdvisor();">
                        <div class="text-xs font-bold text-amber-400 flex items-center justify-between gap-1">
                          <span class="truncate">Help Me Choose</span>
                          <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">100% PÚBLICO</span>
                        </div>
                        <div class="text-[11px] text-neutral-400 leading-snug mt-0.5">Asesor inteligente según suelo, faena y volumen</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Dropdown Footer -->
              <div class="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <div class="flex items-center gap-2 text-neutral-400 flex-wrap">
                  <button onclick="window.tmdCloseToolsMenu(); window.tmdOpenBrochuresHub();" class="hover:text-white transition-colors cursor-pointer">📥 Fichas PDF</button>
                  <span>·</span>
                  <button onclick="window.tmdCloseToolsMenu(); window.tmdOpenDemoRequestModal();" class="hover:text-white transition-colors cursor-pointer">🚜 Pedir Demo en Obra</button>
                  <span>·</span>
                  <button onclick="window.tmdCloseToolsMenu(); window.tmdOpenStaffPortal();" class="text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer">🔧 Mesa Técnica (PIN)</button>
                </div>
                <a href="#/tools" onclick="window.tmdCloseToolsMenu();" class="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 font-bold uppercase tracking-wider transition-all whitespace-nowrap">
                  Ver Todas (8) →
                </a>
              </div>

            </div>
          `;

          mainNav.appendChild(megaWrapper);
        }

        // Clean up redundant navbar portal button if present
        var legacyPortalBtn = document.getElementById('tmd-nav-portal-vip-btn');
        if (legacyPortalBtn) {
          legacyPortalBtn.remove();
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

