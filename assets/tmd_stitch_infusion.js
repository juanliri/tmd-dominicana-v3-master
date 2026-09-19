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
      btn.innerHTML = '✓ Orden Aprobada por el Contratista';
      btn.classList.remove('bg-amber-500', 'text-black');
      btn.classList.add('bg-emerald-500', 'text-black');
    }
    alert('Orden de Trabajo WO-4482 aprobada con éxito. El taller central Km 22 ha sido notificado para proceder al ensamblaje final y prueba en dinamómetro.');
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
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              STOCK SINCRONIZADO EN TIEMPO REAL
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
  // 5. VIP PORT LOTS BENTO GRID (FOR #/magazine)
  // ─────────────────────────────────────────────────────────────────────────────
  function renderPortLotsModule() {
    return `
      <div id="tmd-port-lots-infusion" class="tmd-stitch-section rounded-2xl border p-6 md:p-8 bg-neutral-950/90 dark:bg-black/90 text-white shadow-2xl border-amber-500/20">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ARRIBOS MARÍTIMOS PUERTO HAINA & CAUCEDO
            </div>
            <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              Lotes Portuarios VIP 0 Km & Concierge para Contratistas MOPC
            </h3>
            <p class="text-xs text-neutral-400 font-mono mt-1">
              Maquinarias recién desembarcadas en muelles fiscales con despacho prioritario y trámites aduanales completados.
            </p>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo consultar los lotes portuarios disponibles en Puerto Haina y Caucedo.')}" target="_blank" class="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-1.5">
            Consultar Cupo de Importación
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Lot 1: JCB 220X (8 cols) -->
          <div class="lg:col-span-8 rounded-2xl border border-white/10 bg-black/60 p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 text-xs font-mono">
                <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 uppercase">Lote Puerto Río Haina</span>
                <span class="text-emerald-400 font-bold">0.0 HORAS · NUEVA</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="rounded-xl overflow-hidden h-44 bg-neutral-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS1qvrSRchwMffbxOiC-JwnUbO-9XacNv7BPKhoqdCGVXqyH_e567QmL8vAUa_4To8g3I_mnSo49HSqFbEJkPtn9-YIf50TkpG9XKBK_TcDbv8Pq4Ny6IZa_9Umus6_cw6M-CwlTdReLw_0qmb72yH_e1qrl4qSQxPzGnJR6TmiuNbyfL7AZMzZv47feeDVP0_S6dBjOvLvSXAguHuKCPHTfZeJ5gx3_Be3DC2c_atM1ZnqV2APuePug" class="w-full h-full object-cover" alt="JCB 220X Puerto Haina">
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-1">Excavadora JCB 220X Heavy Duty</h4>
                  <p class="text-xs text-neutral-400 mb-3">Motor EcoMAX 173 HP, Cuchara 1.25 m³ HD, Orugas 600mm de triple garra y garantía de 3 años o 5,000h.</p>
                  <div class="space-y-1 text-xs font-mono text-neutral-300">
                    <div>Lote Serial: <strong class="text-amber-400">#JCB-HN-220X-88</strong></div>
                    <div>Precio Especial: <strong class="text-white">$186,500 USD CIF</strong> (Ahorro $14,000 VIP)</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-3 border-t border-white/10 flex justify-end">
              <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo separar la Excavadora JCB 220X Lote Haina (#JCB-HN-220X-88).')}" target="_blank" class="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase text-xs">
                Separar Unidad con Fianza
              </a>
            </div>
          </div>

          <!-- Lot 2: LS Tractor Agro-Cibao (4 cols) -->
          <div class="lg:col-span-4 rounded-2xl border border-white/10 bg-black/60 p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 text-xs font-mono">
                <span class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 uppercase">Agro-Cibao 2026</span>
                <span class="text-neutral-400 font-bold">101 HP</span>
              </div>
              <div class="rounded-xl overflow-hidden h-36 bg-neutral-900 mb-3">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIPhBv3AUqIH6U1Io70Y415FfsHgAbCHNTnfyNzqxsH2i4okm28upwkjvXxWuyjZKrpnPiuM6bmJK6pSK_5Pj8AbFdoC4pfPVUOTBajC0i8zWzq5kvJnra_7ODlM7yJ26vPbKxVhZT-Si0YmQqy6lv8QIGaQqQO9h7_no-Z8E9qAg3e0buuWcuqE6tAZWKySmvF-STontEhmY2_EDiD_IqEfkR2Ap7Jwt4pq6p__Gh9Vy9VV0tdquLQw" class="w-full h-full object-cover" alt="LS Tractor MT7">
              </div>
              <h4 class="text-base font-bold text-white mb-1">LS Tractor MT7 Agro-Pro</h4>
              <p class="text-xs text-neutral-400 mb-2">Transmisión Power Shuttle 40x40 Creeper y tasa Banco Agrícola 8.5% fija.</p>
              <div class="text-xs font-mono text-amber-400 font-bold">Cuota desde $1,450 USD/mes</div>
            </div>
            <div class="pt-3 border-t border-white/10 mt-3 flex justify-end">
              <a href="https://api.whatsapp.com/send/?phone=18098262222&text=${encodeURIComponent('Hola TMD Dominicana, deseo cotizar el LS Tractor MT7 Serie Agro-Cibao.')}" target="_blank" class="w-full text-center py-2 rounded border border-white/20 hover:border-amber-400 font-mono text-xs uppercase text-white hover:text-amber-400 transition-colors">
                Solicitar Ficha Técnica
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. TOP UTILITY BAR LINK INJECTION
  // ─────────────────────────────────────────────────────────────────────────────
  function injectTopBarLink() {
    var topBar = document.querySelector('#root div.fixed.top-0 > div:first-child');
    if (topBar && !document.getElementById('tmd-topbar-dvi-btn')) {
      var rightContainer = topBar.querySelector('.flex.items-center.gap-4') || topBar.querySelector('.flex.items-center.space-x-4');
      if (rightContainer) {
        var btn = document.createElement('button');
        btn.id = 'tmd-topbar-dvi-btn';
        btn.className = 'text-xs font-mono font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors';
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
  // 7. ROUTE OBSERVER & SECTIONS INJECTION DISPATCHER
  // ─────────────────────────────────────────────────────────────────────────────
  function checkAndInfuseSections() {
    injectTopBarLink();

    var hash = window.location.hash || '';

    // A. SERVICE PAGE (#/service, #/servicios, #/taller)
    // COMPLETE INNER OVERHAUL: Replace inner broken sections with Full Stitch V2 Suite
    if (hash.includes('service') || hash.includes('servicios') || hash.includes('taller')) {
      if (!document.getElementById('tmd-v2-full-service-page') && window.TMD_V2_SERVICE_HTML) {
        var serviceOuter = document.querySelector('#root > div > div.bg-slate-50') ||
                           document.querySelector('#root > div > div.dark\\:bg-neutral-950') ||
                           document.querySelector('#root main');
        if (serviceOuter) {
          serviceOuter.innerHTML = window.TMD_V2_SERVICE_HTML;
          window.scrollTo({ top: 0, behavior: 'instant' });

          var bookingForm = serviceOuter.querySelector('form');
          if (bookingForm && bookingForm.id !== 'dtcServiceForm') {
            bookingForm.onsubmit = function (e) {
              e.preventDefault();
              window.tmdSubmitBookingForm();
            };
          }
        }
      }
    }

    // B. PARTS PAGE (#/parts, #/repuestos)
    if (hash.includes('parts') || hash.includes('repuestos')) {
      if (!document.getElementById('tmd-schematic-infusion-container')) {
        var partsContainer = document.querySelector('#root main') || document.querySelector('#root .max-w-7xl');
        if (partsContainer) {
          var wrapper = document.createElement('div');
          wrapper.innerHTML = renderSchematicModule();
          var targetInsertion = partsContainer.querySelector('div.grid') || partsContainer.lastElementChild;
          if (targetInsertion) {
            targetInsertion.parentNode.insertBefore(wrapper.firstElementChild, targetInsertion);
          } else {
            partsContainer.appendChild(wrapper.firstElementChild);
          }
        }
      }
    }

    // C. VEHICLE DETAIL PAGE (#/vehicle/...)
    if (hash.includes('vehicle/') || hash.includes('maquinaria/')) {
      var h1El = document.querySelector('h1');
      if (h1El) _currentMachineName = h1El.innerText.trim();

      if (!document.getElementById('tmd-vehicle-360-infusion')) {
        var vehicleMain = document.querySelector('#root .max-w-7xl') || document.querySelector('#root main');
        if (vehicleMain) {
          var wrapper360 = document.createElement('div');
          wrapper360.innerHTML = renderVehicleDetailInfusion(_currentMachineName);
          vehicleMain.appendChild(wrapper360.firstElementChild);
        }
      }

      if (!document.getElementById('tmd-leasing-infusion-container')) {
        var vehicleMain2 = document.querySelector('#root .max-w-7xl') || document.querySelector('#root main');
        if (vehicleMain2) {
          var wrapperLeasing = document.createElement('div');
          wrapperLeasing.innerHTML = renderLeasingModule();
          vehicleMain2.appendChild(wrapperLeasing.firstElementChild);
        }
      }
    }

    // D. CONFIGURATOR PAGE (#/configurator, #/studio-3d)
    if (hash.includes('configurator') || hash.includes('studio-3d')) {
      if (!document.getElementById('tmd-leasing-infusion-container')) {
        var configMain = document.querySelector('#root .max-w-7xl') || document.querySelector('#root main') || document.querySelector('#root > div > div');
        if (configMain) {
          var wrapperLeasing = document.createElement('div');
          wrapperLeasing.innerHTML = renderLeasingModule();
          configMain.appendChild(wrapperLeasing.firstElementChild);
        }
      }
    }

    // E. MAGAZINE / VIP PRIVÉ PAGE (#/magazine, #/revista)
    if (hash.includes('magazine') || hash.includes('revista')) {
      if (!document.getElementById('tmd-port-lots-infusion')) {
        var magMain = document.querySelector('#root .max-w-7xl') || document.querySelector('#root main');
        if (magMain) {
          var wrapperLots = document.createElement('div');
          wrapperLots.innerHTML = renderPortLotsModule();
          magMain.appendChild(wrapperLots.firstElementChild);
        }
      }
    }
  }

  // Event Listeners & Periodic Sync
  window.addEventListener('hashchange', function () {
    setTimeout(checkAndInfuseSections, 150);
  });

  var observer = new MutationObserver(function () {
    checkAndInfuseSections();
  });

  document.addEventListener('DOMContentLoaded', function () {
    var rootEl = document.getElementById('root');
    if (rootEl) {
      observer.observe(rootEl, { childList: true, subtree: true });
    }
    setTimeout(checkAndInfuseSections, 800);
    setTimeout(checkAndInfuseSections, 2000);
  });

  setTimeout(checkAndInfuseSections, 1200);

})();
