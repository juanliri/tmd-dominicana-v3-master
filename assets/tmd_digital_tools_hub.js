/**
 * TMD DOMINICANA — DIGITAL TOOLS SUITE (JOHN DEERE BENCHMARK)
 * Institutional 3-Pillar Digital Ecosystem: Operations Center, MyFinancial, Equipment Intelligence
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDDigitalToolsHub() {
  'use strict';

  function buildDigitalToolsHTML() {
    return `
      <div id="tmd-digital-tools-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(0, 0, 0, 0.92) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[1280px] max-h-[94vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 14, 16, 0.95) 0%, rgba(8, 8, 10, 0.92) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(245, 158, 11, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-6 py-5 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 18, 20, 0.92) 0%, rgba(11, 11, 13, 0.90) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-[14px] bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[26px]">terminal</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[9999px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider">Ecosistema Digital 20/10</span>
                  <h2 class="text-base sm:text-xl font-bold text-white tracking-wide">Centro de Herramientas Digitales TMD</h2>
                </div>
                <p class="text-xs text-neutral-400 font-sans mt-0.5">Tecnología de gestión de flota, inteligencia fiscal DGII y soporte de ingeniería en tiempo real</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.tmdOpenMachineAdvisor()" class="px-3.5 py-2 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 shadow-[0_4px_14px_rgba(245,158,11,0.25)] transition-all">
                <span class="material-symbols-outlined text-[16px]">psychology</span>
                <span>Asesor "Help Me Choose"</span>
              </button>
              <button onclick="window.tmdCloseDigitalToolsHub()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <!-- Hero Institutional Banner -->
          <div class="px-6 pt-6 pb-2">
            <div class="p-6 rounded-[22px] relative overflow-hidden" style="background: linear-gradient(135deg, rgba(16, 16, 18, 0.90) 0%, rgba(10, 10, 12, 0.92) 100%) !important; backdrop-filter: blur(18px) !important; -webkit-backdrop-filter: blur(18px) !important; border: 1px solid rgba(255, 184, 0, 0.25) !important;">
              <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div class="max-w-3xl relative z-10">
                <span class="px-3 py-1 rounded-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  Benchmark Tecnológico Tier-1
                </span>
                <h3 class="text-xl sm:text-2xl font-bold text-white mt-2 leading-tight">
                  Toda la potencia de su flota, compras y finanzas desde un solo panel
                </h3>
                <p class="text-xs sm:text-sm text-neutral-300 font-sans mt-1.5 leading-relaxed">
                  Inspirado en el ecosistema <em>John Deere Digital Tools</em> y el <em>Bobcat Owner Portal</em>, adaptado al 100% con los requerimientos operativos de la República Dominicana: telemetría en cantera, leyes tributarias DGII y auxilio vial 24/7.
                </p>
              </div>

              <!-- Quick Stats Bar -->
              <div class="mt-5 pt-4 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono" style="background: rgba(10, 10, 12, 0.85) !important; backdrop-filter: blur(14px) !important; border-radius: 14px; padding: 12px 16px; border: 1px solid rgba(255, 255, 255, 0.06);">
                <div>
                  <div class="text-neutral-500 uppercase text-[10px]">Unidades Monitoreadas</div>
                  <div class="text-sm font-bold text-emerald-400">44 Máquinas Activas</div>
                </div>
                <div>
                  <div class="text-neutral-500 uppercase text-[10px]">Taller Km 22</div>
                  <div class="text-sm font-bold text-amber-400">18 Bahías Pesadas</div>
                </div>
                <div>
                  <div class="text-neutral-500 uppercase text-[10px]">Amortización Fiscal</div>
                  <div class="text-sm font-bold text-white">25% Anual (Ley 11-92)</div>
                </div>
                <div>
                  <div class="text-neutral-500 uppercase text-[10px]">Repuestos OEM</div>
                  <div class="text-sm font-bold text-cyan-400">390+ SKUs en Almacén</div>
                </div>
              </div>
            </div>
          </div>

          <!-- The 3 Flagship Institutional Pillars (John Deere Digital Tools Benchmark) -->
          <div class="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- PILLAR 1: TMD Operations Center™ -->
            <div class="rounded-[22px] p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg" style="background: linear-gradient(145deg, rgba(14, 18, 14, 0.88) 0%, rgba(8, 10, 8, 0.92) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(16, 185, 129, 0.25) !important;">
              <div>
                <div class="w-14 h-14 rounded-[18px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <span class="material-symbols-outlined text-[32px]">satellite_alt</span>
                </div>

                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 rounded-[6px] bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase">IoT & TELEMETRIA</span>
                  <span class="text-[10px] font-mono text-neutral-500">Satelital 24/7</span>
                </div>

                <h4 class="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">TMD Operations Center™</h4>
                
                <p class="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                  Supervise horómetros, presión hidráulica (curva hasta 350 Bar) y ubicación GPS por satélite. Rastree el ciclo de servicio de su maquinaria en Taller Km 22 con evidencia fotográfica DVI.
                </p>

                <!-- Feature bullet checklist -->
                <div class="mt-4 space-y-2 border-t border-neutral-800/80 pt-3 text-xs text-neutral-300 font-sans">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Curva de presión hidráulica (350 Bar) en vivo</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Geocercas en proyectos viales y canteras en RD</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Progreso de órdenes WO en 5 fases de taller</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Cuenta regresiva de mantenimiento preventivo 500h</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-neutral-800 flex flex-col gap-2">
                <button onclick="window.tmdOpenTelematicsCockpit();" class="w-full py-3 px-4 rounded-[14px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.25)] transition-all">
                  <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                  <span>Abrir Operations Center</span>
                </button>
                <button onclick="if(typeof window.tmdOpenDviTracker==='function'){window.tmdCloseDigitalToolsHub(); window.tmdOpenDviTracker();}" class="w-full py-2.5 px-4 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-neutral-800 transition-all">
                  <span>Rastreador de Órdenes (WO-4482)</span>
                </button>
              </div>
            </div>

            <!-- PILLAR 2: TMD MyFinancial™ & Escudo Fiscal -->
            <div class="rounded-[22px] p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(245,158,11,0.12)] relative group" style="background: linear-gradient(145deg, rgba(28, 26, 16, 0.84) 0%, rgba(16, 14, 8, 0.82) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 2px solid rgba(245, 158, 11, 0.65) !important;">
              <div class="absolute -top-3 right-4 px-3 py-0.5 rounded-[9999px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow">
                ★ EXCLUSIVO RD
              </div>

              <div>
                <div class="w-14 h-14 rounded-[18px] bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                  <span class="material-symbols-outlined text-[32px]">account_balance</span>
                </div>

                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 rounded-[6px] bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase">FINANZAS & DGII</span>
                  <span class="text-[10px] font-mono text-emerald-400">Ley 11-92</span>
                </div>

                <h4 class="text-lg font-bold text-amber-400">TMD MyFinancial™</h4>
                
                <p class="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                  Calcule el escudo fiscal de la Ley 11-92 para constructoras dominicanas: 25% de depreciación acelerada Cat. 2 y crédito fiscal del 18% ITBIS con comprobante B01.
                </p>

                <!-- Feature bullet checklist -->
                <div class="mt-4 space-y-2 border-t border-neutral-800/80 pt-3 text-xs text-neutral-300 font-sans">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Comparador: Compra de Capital vs. Leasing Operativo</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Ahorro fiscal proyectado en declaración IR-2</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Alianzas con Banco Popular, BHD y Banreservas</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Exportación de informe fiscal a PDF membretado</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-neutral-800 flex flex-col gap-2">
                <button onclick="window.tmdOpenFinancialSuite('JCB 3CX Eco', 85000);" class="w-full py-3 px-4 rounded-[14px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all">
                  <span class="material-symbols-outlined text-[18px]">calculate</span>
                  <span>Abrir Suite Financiera DGII</span>
                </button>
                <button onclick="if(typeof window.tmdShowQuoteModal==='function'){window.tmdCloseDigitalToolsHub(); window.tmdShowQuoteModal('JCB 3CX Eco');}" class="w-full py-2.5 px-4 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-neutral-800 transition-all">
                  <span>Cotización Formal DGII (NCF B01)</span>
                </button>
              </div>
            </div>

            <!-- PILLAR 3: TMD Equipment Intelligence™ -->
            <div class="rounded-[22px] p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg" style="background: linear-gradient(145deg, rgba(14, 16, 18, 0.88) 0%, rgba(8, 9, 10, 0.92) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(6, 182, 212, 0.25) !important;">
              <div>
                <div class="w-14 h-14 rounded-[18px] bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                  <span class="material-symbols-outlined text-[32px]">manage_search</span>
                </div>

                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 rounded-[6px] bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase">INGENIERÍA & REPUESTOS</span>
                  <span class="text-[10px] font-mono text-neutral-500">Benchmark 3-Vías</span>
                </div>

                <h4 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">Equipment Intelligence™</h4>
                
                <p class="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                  Compare JCB y LiuGong frente a Cat y Deere a 14 vectores de ingeniería. Localice repuestos por número de serie (VIN) con esquemas de despiece interactivos y stock real en Km 22.
                </p>

                <!-- Feature bullet checklist -->
                <div class="mt-4 space-y-2 border-t border-neutral-800/80 pt-3 text-xs text-neutral-300 font-sans">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Comparativa JCB vs. Cat 420 vs. Deere 310L</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Buscador por Serial/VIN y plano vectorial BOM</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Fichas técnicas completas en PDF de alta resolución</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Agendamiento de pruebas técnicas en su cantera</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-neutral-800 flex flex-col gap-2">
                <button onclick="window.tmdOpenModelComparator('backhoes');" class="w-full py-3 px-4 rounded-[14px] bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(6,182,212,0.25)] transition-all">
                  <span class="material-symbols-outlined text-[18px]">compare_arrows</span>
                  <span>Abrir Comparador 3-Vías</span>
                </button>
                <div class="grid grid-cols-2 gap-2">
                  <button onclick="window.tmdOpenPartsSerialEngine();" class="py-2.5 px-3 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1 border border-neutral-800 transition-all">
                    <span>Partes por Serial</span>
                  </button>
                  <button onclick="window.tmdOpenBrochuresHub();" class="py-2.5 px-3 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1 border border-neutral-800 transition-all">
                    <span>Fichas PDF</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom Operational Hub Bar -->
          <div class="px-6 py-4 rounded-b-[24px] flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400" style="background: linear-gradient(180deg, rgba(11, 16, 26, 0.84) 0%, rgba(18, 24, 38, 0.86) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-top: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5 text-neutral-300 font-mono text-[11px]">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>API de Enlace Satelital Activa</span>
              </span>
              <span class="flex items-center gap-1.5 text-neutral-300 font-mono text-[11px]">
                <span class="material-symbols-outlined text-amber-500 text-[16px]">verified</span>
                <span>Certificación ISO 9001 Taller Central Km 22</span>
              </span>
            </div>

            <div class="flex items-center gap-3">
              <button onclick="window.tmdOpenDemoRequestModal('JCB 3CX');" class="px-3.5 py-1.5 rounded-[10px] bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-all">
                <span class="material-symbols-outlined text-[16px]">precision_manufacturing</span>
                <span>Solicitar Demo en Obra</span>
              </button>
              <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, solicito asistencia técnica para el Centro de Herramientas Digitales.')}" target="_blank" class="px-3.5 py-1.5 rounded-[10px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-sans flex items-center gap-1.5 transition-all">
                <span>WhatsApp Soporte</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ─── PUBLIC API ───
  window.tmdOpenDigitalToolsHub = function() {
    var existing = document.getElementById('tmd-digital-tools-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildDigitalToolsHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseDigitalToolsHub = function() {
    var modal = document.getElementById('tmd-digital-tools-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  // Keyboard Esc Listener
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseDigitalToolsHub();
    }
  });

})();
