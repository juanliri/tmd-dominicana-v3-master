/**
 * TMD DOMINICANA — LIVELINK TELEMATICS & CONTRACTOR VIP COCKPIT
 * Diamond Standard (20/10 Rating) vs. Caterpillar VisionLink & John Deere JDLink
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDTelematicsCockpit() {
  'use strict';

  // ─── 1. SIMULATED & LIVE IOT TELEMETRY MACHINES IN DOMINICAN REPUBLIC ───
  const TELEMETRY_FLEET = [
    {
      serial: 'JCB3CX-894120',
      model: 'JCB 3CX Eco Tropicalizada',
      client: 'Consorcio Vial Autopista Duarte',
      locationName: 'Km 38 Autopista Duarte, Villa Altagracia',
      coords: { lat: 18.6738, lng: -70.1714 },
      status: 'OPERANDO NORMAL',
      statusCode: 'running',
      engineHours: 1428.4,
      serviceCountdownHours: 71.6, // Hours until 1,500h service
      fuelLevelPct: 78,
      hydraulicPressureBar: 248, // 251 max
      oilTempC: 84,
      batteryVolts: 13.8,
      lastSync: 'Hace 4 minutos (Satélite LiveLink)',
      workOrder: {
        id: 'WO-4482',
        status: 'Fase 4: Pruebas Dinamométricas',
        step: 4,
        technician: 'Ing. Marcos Rijo (Taller Km 22)',
        dviPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
      }
    },
    {
      serial: 'LG922E-202409',
      model: 'LiuGong 922E HD Oruga',
      client: 'Agregados & Canteras del Sur',
      locationName: 'Cantera San Cristóbal, Río Nigua',
      coords: { lat: 18.4231, lng: -70.1123 },
      status: 'EN FAENA PESADA',
      statusCode: 'running',
      engineHours: 2185.0,
      serviceCountdownHours: 15.0, // Urgent 2,200h service
      fuelLevelPct: 54,
      hydraulicPressureBar: 342, // 343 max
      oilTempC: 91,
      batteryVolts: 27.6,
      lastSync: 'Hace 1 minuto (Satélite LiveLink)',
      workOrder: {
        id: 'WO-4390',
        status: 'Fase 5: Listo para Despacho Cama Baja',
        step: 5,
        technician: 'Ing. Carlos Peralta (Km 22)',
        dviPhoto: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80'
      }
    },
    {
      serial: 'LS-MT7-5501',
      model: 'LS Tractor MT7.100 4WD',
      client: 'Arroceros del Yuna, Bonao',
      locationName: 'Sector Juma, Bonao, Monseñor Nouel',
      coords: { lat: 18.9482, lng: -70.4128 },
      status: 'EN ESPERA (RALENTÍ)',
      statusCode: 'idle',
      engineHours: 642.1,
      serviceCountdownHours: 107.9,
      fuelLevelPct: 89,
      hydraulicPressureBar: 185,
      oilTempC: 76,
      batteryVolts: 13.9,
      lastSync: 'Hace 8 minutos (Celular 4G)',
      workOrder: {
        id: 'WO-4512',
        status: 'Fase 2: Diagnóstico Hidráulico',
        step: 2,
        technician: 'Tec. David Santana (Taller Móvil)',
        dviPhoto: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
      }
    }
  ];

  let activeMachineIndex = 0;

  // ─── 2. BUILD COCKPIT INTERFACE HTML ───
  function buildTelematicsHTML() {
    const m = TELEMETRY_FLEET[activeMachineIndex];

    return `
      <div id="tmd-telematics-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(0, 0, 0, 0.92) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[1260px] max-h-[94vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 14, 16, 0.95) 0%, rgba(8, 8, 10, 0.92) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0,0,0,0.85), 0 0 50px rgba(245,158,11,0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-6 py-4 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 18, 20, 0.92) 0%, rgba(11, 11, 13, 0.90) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[14px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <span class="material-symbols-outlined text-[24px]">satellite_alt</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[9999px] bg-emerald-500 text-black font-mono text-[10px] font-black uppercase tracking-wider">Telemetría Satelital IoT</span>
                  <h2 class="text-base sm:text-lg font-bold text-white tracking-wide">LiveLink Fleet Cockpit & Récord DVI</h2>
                </div>
                <p class="text-xs text-neutral-400 font-sans mt-0.5">Monitoreo de telemetría de motor, presión hidráulica, geocercas y orden de trabajo en Km 22</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>En Línea: ${m.lastSync}</span>
              </span>
              <button onclick="window.tmdCloseTelematicsCockpit()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <!-- Machine Tabs Selector -->
          <div class="px-6 py-3 border-b flex items-center gap-2 overflow-x-auto" style="background: rgba(14, 19, 31, 0.82) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;">
            <span class="text-xs font-mono uppercase text-neutral-400 mr-2 flex-shrink-0">Unidad Activa:</span>
            ${TELEMETRY_FLEET.map((item, idx) => `
              <button onclick="window.tmdSelectTelematicsMachine(${idx})" class="px-3.5 py-1.5 rounded-[12px] text-xs font-mono font-bold whitespace-nowrap transition-all ${idx === activeMachineIndex ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}">
                # ${item.serial} (${item.model.split(' ')[0]} ${item.model.split(' ')[1]})
              </button>
            `).join('')}
          </div>

          <!-- Main Cockpit Body -->
          <div class="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Side: Live Gauge Telemetry Tiles (7 Cols) -->
            <div class="lg:col-span-7 flex flex-col gap-4">
              
              <!-- Primary Machine Status Banner -->
              <div class="p-5 rounded-[20px] bg-gradient-to-r from-[#121722] via-[#161d2b] to-[#10141f] border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="px-2 py-0.5 rounded-[6px] bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">SERIAL: ${m.serial}</span>
                    <span class="text-xs font-mono text-neutral-400">Cliente: ${m.client}</span>
                  </div>
                  <h3 class="text-lg font-bold text-white">${m.model}</h3>
                  <div class="mt-1 flex items-center gap-1.5 text-xs text-neutral-300 font-sans">
                    <span class="material-symbols-outlined text-amber-500 text-[16px]">location_on</span>
                    <span>${m.locationName}</span>
                  </div>
                </div>

                <div class="text-right">
                  <div class="px-3 py-1 rounded-[10px] ${m.statusCode === 'running' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'} font-mono text-xs font-bold inline-flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full ${m.statusCode === 'running' ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
                    <span>${m.status}</span>
                  </div>
                  <div class="mt-1.5 text-xs font-mono text-neutral-400">Horómetro: <strong>${m.engineHours.toLocaleString()} hrs</strong></div>
                </div>
              </div>

              <!-- 4 Real-time Sensor Dials -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <!-- Hydraulic Pressure -->
                <div class="p-4 rounded-[18px] bg-[#10141f] border border-neutral-800 flex flex-col justify-between">
                  <div class="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
                    <span>Presión Bar</span>
                    <span class="material-symbols-outlined text-amber-500 text-[18px]">speed</span>
                  </div>
                  <div class="text-2xl font-bold font-mono text-amber-400">${m.hydraulicPressureBar} <span class="text-xs text-neutral-400">Bar</span></div>
                  <div class="mt-2 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-amber-500 h-full rounded-full" style="width: ${(m.hydraulicPressureBar / 350) * 100}%"></div>
                  </div>
                  <div class="mt-1 text-[10px] font-mono text-neutral-500 text-right">Máx: 350 Bar</div>
                </div>

                <!-- Fuel Level -->
                <div class="p-4 rounded-[18px] bg-[#10141f] border border-neutral-800 flex flex-col justify-between">
                  <div class="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
                    <span>Diésel</span>
                    <span class="material-symbols-outlined text-emerald-400 text-[18px]">local_gas_station</span>
                  </div>
                  <div class="text-2xl font-bold font-mono text-emerald-400">${m.fuelLevelPct}%</div>
                  <div class="mt-2 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full rounded-full" style="width: ${m.fuelLevelPct}%"></div>
                  </div>
                  <div class="mt-1 text-[10px] font-mono text-neutral-500 text-right">Autonomía: ~8.5h</div>
                </div>

                <!-- Oil Temp -->
                <div class="p-4 rounded-[18px] bg-[#10141f] border border-neutral-800 flex flex-col justify-between">
                  <div class="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
                    <span>Temp Aceite</span>
                    <span class="material-symbols-outlined text-cyan-400 text-[18px]">thermostat</span>
                  </div>
                  <div class="text-2xl font-bold font-mono text-cyan-400">${m.oilTempC}°C</div>
                  <div class="mt-2 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-cyan-500 h-full rounded-full" style="width: ${(m.oilTempC / 120) * 100}%"></div>
                  </div>
                  <div class="mt-1 text-[10px] font-mono text-neutral-500 text-right">Rango Seguro</div>
                </div>

                <!-- Battery Voltage -->
                <div class="p-4 rounded-[18px] bg-[#10141f] border border-neutral-800 flex flex-col justify-between">
                  <div class="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
                    <span>Alternador</span>
                    <span class="material-symbols-outlined text-purple-400 text-[18px]">battery_charging_full</span>
                  </div>
                  <div class="text-2xl font-bold font-mono text-purple-400">${m.batteryVolts}V</div>
                  <div class="mt-2 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-purple-500 h-full rounded-full" style="width: 85%"></div>
                  </div>
                  <div class="mt-1 text-[10px] font-mono text-neutral-500 text-right">Carga Óptima</div>
                </div>

              </div>

              <!-- Preventive Maintenance Countdown Alert Box -->
              <div class="p-4 rounded-[18px] ${m.serviceCountdownHours < 25 ? 'bg-amber-500/15 border border-amber-500/40' : 'bg-neutral-900/70 border border-neutral-800'} flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-[12px] ${m.serviceCountdownHours < 25 ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-300'} flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">build_circle</span>
                  </div>
                  <div>
                    <div class="text-xs font-mono uppercase font-bold ${m.serviceCountdownHours < 25 ? 'text-amber-400' : 'text-neutral-300'}">
                      ${m.serviceCountdownHours < 25 ? '⚠️ Mantenimiento Próximo Requerido' : 'Estado de Mantenimiento Preventivo'}
                    </div>
                    <div class="text-xs text-neutral-400 font-sans">
                      Faltan <strong>${m.serviceCountdownHours} horas de motor</strong> para el servicio oficial de ${Math.ceil(m.engineHours / 500) * 500} Horas.
                    </div>
                  </div>
                </div>

                <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, mi equipo ' + m.model + ' (Serial: ' + m.serial + ') está a ' + m.serviceCountdownHours + ' horas del próximo servicio. Solicito agendar bahía en Km 22 o taller móvil en faena.')}" target="_blank" class="px-4 py-2 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_3px_12px_rgba(245,158,11,0.25)] transition-all">
                  <span class="material-symbols-outlined text-[16px]">calendar_month</span>
                  <span>Agendar Bahía Km 22</span>
                </a>
              </div>

              <!-- Live Geofencing Radar Map Card -->
              <div class="rounded-[20px] bg-[#10141f] border border-neutral-800 p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-amber-500 text-[18px]">radar</span>
                    <span class="text-xs font-mono uppercase text-neutral-300 font-bold">Geocerca & Ubicación GPS (República Dominicana)</span>
                  </div>
                  <span class="text-[10px] font-mono text-emerald-400">Coordenadas: ${m.coords.lat.toFixed(4)}, ${m.coords.lng.toFixed(4)}</span>
                </div>

                <!-- Simulated Interactive Radar Map -->
                <div class="relative w-full h-[180px] rounded-[14px] bg-[#070a10] border border-neutral-800 overflow-hidden flex items-center justify-center">
                  <!-- Grid Lines -->
                  <div class="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:24px_24px]"></div>
                  
                  <!-- Geographic Corridor Representation -->
                  <svg class="w-full h-full p-2 opacity-50" viewBox="0 0 400 160">
                    <path d="M40 100 Q150 40 250 80 T380 90" stroke="#f59e0b" stroke-width="2" fill="none" stroke-dasharray="4 2"/>
                    <text x="50" y="120" fill="#64748b" font-family="monospace" font-size="9">Cibao / Santiago</text>
                    <text x="210" y="55" fill="#f59e0b" font-family="monospace" font-size="9">Km 22 Sede Central</text>
                    <text x="310" y="110" fill="#64748b" font-family="monospace" font-size="9">Punta Cana</text>
                  </svg>

                  <!-- Active Machine Pulsing Marker -->
                  <div class="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div class="relative flex items-center justify-center">
                      <span class="w-6 h-6 rounded-full bg-emerald-500/30 animate-ping absolute"></span>
                      <span class="w-4 h-4 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-[8px] text-black font-black">●</span>
                    </div>
                    <span class="mt-1 px-2 py-0.5 rounded bg-black/90 text-amber-400 font-mono text-[9px] border border-neutral-700 whitespace-nowrap shadow-lg">
                      ${m.model.split(' ')[0]} ${m.model.split(' ')[1]} (En Faena)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Right Side: Contractor VIP Work Order Stepper & DVI Evidence (5 Cols) -->
            <div class="lg:col-span-5 flex flex-col gap-4">
              
              <!-- Work Order Tracking Card -->
              <div class="rounded-[20px] p-5 flex flex-col justify-between transition-all" style="background: linear-gradient(145deg, rgba(22, 30, 46, 0.82) 0%, rgba(14, 19, 31, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
                <div>
                  <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span class="text-[10px] font-mono text-neutral-500 uppercase">Orden de Trabajo Oficial</span>
                      <h4 class="text-base font-bold text-amber-400 font-mono">${m.workOrder.id}</h4>
                    </div>
                    <div class="text-right">
                      <span class="px-2.5 py-0.5 rounded-[9999px] bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">En Taller Central</span>
                    </div>
                  </div>

                  <!-- 5-Phase Progression Stepper -->
                  <div class="mt-4 space-y-3">
                    <div class="text-xs font-mono uppercase text-neutral-400 font-bold mb-2">Ciclo de Servicio en Bahía:</div>
                    
                    ${[
                      { step: 1, title: 'Recepción & Lavado Descontaminante', desc: 'Inspección de 50 puntos y pesaje en báscula' },
                      { step: 2, title: 'Diagnóstico Electrónico Jaltest & ECM', desc: 'Lectura de códigos de falla y sensores' },
                      { step: 3, title: 'Desarme & Overhaul de Componentes', desc: 'Mecanizado con tolerancia de fábrica' },
                      { step: 4, title: 'Banco de Pruebas 6,000 PSI & Dinamómetro', desc: 'Certificación de caudal y curva de torque' },
                      { step: 5, title: 'Liberación DVI & Despacho a Faena', desc: 'Entrega en Cama Baja con garantía escrita' }
                    ].map(st => {
                      const isDone = st.step < m.workOrder.step;
                      const isCurrent = st.step === m.workOrder.step;
                      return `
                        <div class="flex items-start gap-3">
                          <div class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-0.5 ${isDone ? 'bg-emerald-500 text-black' : (isCurrent ? 'bg-amber-500 text-black animate-pulse' : 'bg-neutral-800 text-neutral-500')}">
                            ${isDone ? '✓' : st.step}
                          </div>
                          <div class="flex-1">
                            <div class="text-xs font-bold ${isCurrent ? 'text-amber-400' : (isDone ? 'text-white' : 'text-neutral-500')}">${st.title}</div>
                            <div class="text-[11px] text-neutral-400 font-sans">${st.desc}</div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- Digital DVI Photographic Evidence -->
                  <div class="mt-5 pt-4 border-t border-neutral-800">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-mono uppercase text-neutral-300 font-bold">Evidencia Fotográfica DVI:</span>
                      <span class="text-[10px] font-mono text-neutral-500">Técnico Asignado: ${m.workOrder.technician}</span>
                    </div>

                    <div class="h-40 rounded-[14px] overflow-hidden bg-neutral-900 relative border border-neutral-800 group">
                      <img src="${m.workOrder.dviPhoto}" alt="DVI Inspection" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <span class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-[6px] bg-black/80 border border-neutral-700 text-[10px] font-mono text-emerald-400">
                        Inspección Banco de Pruebas: Aprobado (0 Fugas)
                      </span>
                    </div>
                  </div>

                </div>

                <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, deseo consultar estatus detallado de la orden ' + m.workOrder.id + ' para el equipo ' + m.model + '.')}" target="_blank" class="w-full py-2.5 px-4 rounded-[12px] bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase font-mono text-center transition-all border border-neutral-700">
                    Solicitar Reporte Completo de Taller
                  </a>
                </div>
              </div>

            </div>

          </div>

          <!-- Bottom Security Bar -->
          <div class="px-6 py-3.5 bg-[#0e1219] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 rounded-b-[24px]">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-emerald-400 text-[16px]">lock</span>
              <span class="text-neutral-300 font-mono text-[11px]">Canal Encriptado TLS 1.3 · Conexión Satelital Inmarsat & Starlink Fleet</span>
            </div>
            <div class="font-mono text-[11px] text-neutral-500">
              Soporte de Flotas TMD Km 22: Central (809) 826-2222
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ─── 3. GLOBAL PUBLIC HANDLERS ───
  window.tmdOpenTelematicsCockpit = function(serialFilter) {
    if (serialFilter) {
      const idx = TELEMETRY_FLEET.findIndex(m => m.serial.toUpperCase().includes(serialFilter.toUpperCase().trim()));
      if (idx !== -1) {
        activeMachineIndex = idx;
      }
    }

    var existing = document.getElementById('tmd-telematics-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildTelematicsHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseTelematicsCockpit = function() {
    var modal = document.getElementById('tmd-telematics-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.tmdSelectTelematicsMachine = function(idx) {
    if (TELEMETRY_FLEET[idx]) {
      activeMachineIndex = idx;
      var modal = document.getElementById('tmd-telematics-modal');
      if (modal) {
        modal.outerHTML = buildTelematicsHTML();
      }
    }
  };

  // Keyboard shortcut listener for Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseTelematicsCockpit();
    }
  });

})();
