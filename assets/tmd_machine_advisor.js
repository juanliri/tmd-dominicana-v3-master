/**
 * TMD DOMINICANA — "HELP ME CHOOSE" INTERACTIVE MACHINE ADVISOR
 * Bobcat Benchmark: Guided Equipment Matching Engine for Dominican Construction & Quarries
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDMachineAdvisor() {
  'use strict';

  // ─── 1. KNOWLEDGE BASE & MATCHING RULES ───
  const ADVISOR_MACHINES = {
    jcb3cx: {
      id: 'jcb3cx',
      name: 'JCB 3CX Eco Tropicalizada 4x4',
      category: 'Retroexcavadora',
      image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80',
      tag: 'VERSATILIDAD MÁXIMA EN OBRAS RD',
      weight: '8,135 kg',
      power: '92 HP Turbo Diesel',
      dailyRate: '$450 USD / RD$27,000',
      reason: 'Ideal para proyectos urbanos, canalizaciones viales y movimiento de tierra donde se requiere excavar hasta 4.2m y cargar camiones de volteo con el balde frontal de 1.0 m³.',
      bestFor: 'Obras civiles urbanas, zanjas de agua/eléctricas y apoyo en canteras'
    },
    liugong922e: {
      id: 'liugong922e',
      name: 'LiuGong 922E HD Heavy Duty Oruga',
      category: 'Excavadora 22T',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80',
      tag: 'POTENCIA EN CANTERA DE CALIZA',
      weight: '22,000 kg',
      power: '160 HP Cummins 6BTAA',
      dailyRate: '$950 USD / RD$57,000',
      reason: 'La máquina de mayor rendimiento para canteras de roca caliza, tosca y dragado en ríos. Balde reforzado Hardox 450 con presión hidráulica de 343 Bar.',
      bestFor: 'Canteras de agregados, minería de yeso y movimiento de roca masiva'
    },
    ls_mt7: {
      id: 'ls_mt7',
      name: 'LS Tractor MT7.100 Heavy Agro 4WD',
      category: 'Tractor Agrícola',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      tag: 'TRACCIÓN TOTAL EN SUELOS ANEGADOS',
      weight: '4,450 kg con contrapesos',
      power: '101 HP Iveco Turbo',
      dailyRate: '$320 USD / RD$19,200',
      reason: 'Diseñado con sellos marinos de eje delantero para arrozales anegados del Yuna/Bonao y radiador anti-bagazo para cortes de caña de azúcar en el Este.',
      bestFor: 'Arrozales, cañaverales y preparación de suelo agrícola pesado'
    },
    jcb155: {
      id: 'jcb155',
      name: 'JCB 155 Monobrazo PowerBoom Skid Steer',
      category: 'Minicargador',
      image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80',
      tag: 'ACCESO SEGURO EN ESPACIOS REDUCIDOS',
      weight: '2,883 kg',
      power: '56 HP Kohler Turbo',
      dailyRate: '$290 USD / RD$17,400',
      reason: 'Puerta lateral de seguridad sin saltar sobre balde. Excelente maniobrabilidad en sótanos de torres residenciales, demolición interior y aceras urbanas.',
      bestFor: 'Sótanos, demolición urbana y acopio de áridos en plantas de hormigón'
    },
    ammann_arx: {
      id: 'ammann_arx',
      name: 'Ammann ARX 26 Rodillo Compactador Tándem',
      category: 'Compactación',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      tag: 'CALIDAD SUIZA EN ASFALTO Y SUB-BASE',
      weight: '2,460 kg',
      power: '31 HP Yanmar Diésel',
      dailyRate: '$310 USD / RD$18,600',
      reason: 'Fuerza centrífuga dual y rociadores de agua presurizados para pavimentación asfáltica de urbanizaciones, parqueos comerciales y bacheo vial.',
      bestFor: 'Pavimentación asfáltica, sub-base granular y parqueos'
    }
  };

  let advisorState = {
    step: 1, // 1: Faena, 2: Exigencia, 3: Modalidad, 4: Resultado
    answers: {
      faena: '',
      exigencia: '',
      modalidad: ''
    }
  };

  function matchEquipment() {
    const f = advisorState.answers.faena;
    const e = advisorState.answers.exigencia;

    if (f === 'cantera' || e === 'profunda') {
      return ADVISOR_MACHINES.liugong922e;
    }
    if (f === 'agro') {
      return ADVISOR_MACHINES.ls_mt7;
    }
    if (f === 'demolicion' || e === 'compacto') {
      return ADVISOR_MACHINES.jcb155;
    }
    if (f === 'vial' && e === 'compactacion') {
      return ADVISOR_MACHINES.ammann_arx;
    }
    // Default flagship
    return ADVISOR_MACHINES.jcb3cx;
  }

  // ─── 2. BUILD ADVISOR HTML ───
  function buildAdvisorHTML() {
    const currentStep = advisorState.step;
    const matched = matchEquipment();

    return `
      <div id="tmd-advisor-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(0, 0, 0, 0.92) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[960px] max-h-[92vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 14, 16, 0.95) 0%, rgba(8, 8, 10, 0.92) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(245, 158, 11, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-30 flex items-center justify-between px-6 py-4 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 18, 20, 0.92) 0%, rgba(11, 11, 13, 0.90) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[12px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[9999px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider">Asesor Inteligente</span>
                  <h3 class="text-base font-bold text-white tracking-wide">Help Me Choose - Selección de Maquinaria</h3>
                </div>
                <p class="text-xs text-neutral-400 font-sans">Encuentre el equipo exacto para su faena en República Dominicana en 3 preguntas</p>
              </div>
            </div>

            <button onclick="window.tmdCloseMachineAdvisor()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Stepper Indicator Bar -->
          <div class="px-6 py-3.5 border-b border-neutral-800/80 flex items-center justify-between" style="background: rgba(12, 12, 14, 0.88) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-4 text-xs font-mono">
              <span class="flex items-center gap-1.5 ${currentStep >= 1 ? 'text-amber-400 font-bold' : 'text-neutral-500'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${currentStep >= 1 ? 'bg-amber-500 text-black' : 'bg-neutral-800'}">1</span>
                <span>Faena & Suelo</span>
              </span>
              <span class="text-neutral-600">➔</span>
              <span class="flex items-center gap-1.5 ${currentStep >= 2 ? 'text-amber-400 font-bold' : 'text-neutral-500'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${currentStep >= 2 ? 'bg-amber-500 text-black' : 'bg-neutral-800'}">2</span>
                <span>Exigencia</span>
              </span>
              <span class="text-neutral-600">➔</span>
              <span class="flex items-center gap-1.5 ${currentStep >= 3 ? 'text-amber-400 font-bold' : 'text-neutral-500'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${currentStep >= 3 ? 'bg-amber-500 text-black' : 'bg-neutral-800'}">3</span>
                <span>Modalidad</span>
              </span>
            </div>

            <span class="text-[11px] font-mono text-neutral-400">Paso ${currentStep} de 3</span>
          </div>

          <!-- Step Content Body -->
          <div class="p-6">
            
            <!-- STEP 1: Tipo de Faena & Suelo en RD -->
            ${currentStep === 1 ? `
              <div class="space-y-4 animate-fadeIn">
                <div>
                  <h4 class="text-base font-bold text-white">Paso 1: ¿En qué tipo de faena o terreno operará la máquina?</h4>
                  <p class="text-xs text-neutral-400 font-sans mt-0.5">Seleccione la aplicación principal para determinar requerimientos de blindaje y tracción:</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  
                  <div onclick="window.tmdAdvisorSelect('faena', 'cantera', 2)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5 group-hover:scale-110 transition-transform">terrain</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Cantera de Caliza / Tosca / Minería</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Excavación pesada en roca, bauxita, yeso y acopio masivo de áridos.</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('faena', 'urbana', 2)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5 group-hover:scale-110 transition-transform">location_city</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Obras Civiles Urbanas & Zanjas</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Movimiento de tierra, tuberías de agua/eléctricas, aceras y relleno.</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('faena', 'vial', 2)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5 group-hover:scale-110 transition-transform">add_road</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Construcción Vial & Carreteras</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Nivelación de rasante, terraplenes, bacheo y pavimentación asfáltica.</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('faena', 'agro', 2)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5 group-hover:scale-110 transition-transform">agriculture</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Agricultura / Arrozales / Cañaveral</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Suelos anegados de lodo, corte de caña con bagazo y labores de tiro.</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('faena', 'demolicion', 2)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group sm:col-span-2">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5 group-hover:scale-110 transition-transform">home_repair_service</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Sótanos, Demolición & Espacios Reducidos</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Torres residenciales, parqueos soterrados y demolición con martillo hidráulico.</div>
                    </div>
                  </div>

                </div>
              </div>
            ` : ''}

            <!-- STEP 2: Exigencia Operativa Principal -->
            ${currentStep === 2 ? `
              <div class="space-y-4 animate-fadeIn">
                <div>
                  <h4 class="text-base font-bold text-white">Paso 2: ¿Cuál es el requerimiento de potencia o alcance?</h4>
                  <p class="text-xs text-neutral-400 font-sans mt-0.5">Defina el vector técnico clave para ajustar el tamaño del equipo:</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  
                  <div onclick="window.tmdAdvisorSelect('exigencia', 'versatil', 3)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5">handyman</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Versatilidad Media (4 a 8 Toneladas)</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Capaz de trasladarse por sus propios medios en carretera corta (4x4).</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('exigencia', 'profunda', 3)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5">foundation</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Excavación Masiva Pesada (20+ Toneladas)</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Profundidad mayor a 6.5 metros y balde reforzado de más de 1.2 m³.</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('exigencia', 'compacto', 3)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5">fullscreen_exit</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Maniobrabilidad Compacta (&lt; 3 Toneladas)</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Giro sobre su propio eje y dimensiones estrechas para callejones y sótanos.</div>
                    </div>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('exigencia', 'compactacion', 3)" class="p-4 rounded-[16px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-start gap-3 group">
                    <span class="material-symbols-outlined text-amber-500 text-[28px] mt-0.5">roller_shades</span>
                    <div>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Compactación Vibratoria & Pavimentación</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Terminación de calzada asfáltica y control de densidad en suelos granulares.</div>
                    </div>
                  </div>

                </div>

                <div class="pt-2">
                  <button onclick="window.tmdAdvisorGoStep(1)" class="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1">
                    <span>← Volver al paso anterior</span>
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- STEP 3: Modalidad de Adquisición -->
            ${currentStep === 3 ? `
              <div class="space-y-4 animate-fadeIn">
                <div>
                  <h4 class="text-base font-bold text-white">Paso 3: ¿Qué modalidad comercial prefiere su empresa?</h4>
                  <p class="text-xs text-neutral-400 font-sans mt-0.5">Ajustaremos la propuesta técnico-económica y las deducciones fiscales DGII:</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  
                  <div onclick="window.tmdAdvisorSelect('modalidad', 'renta', 4)" class="p-5 rounded-[18px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex flex-col justify-between group text-center">
                    <div>
                      <span class="material-symbols-outlined text-amber-500 text-[32px] mb-2">calendar_today</span>
                      <div class="text-sm font-bold text-white group-hover:text-amber-400">Renta Corporativa</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Días o meses de faena con operador certificado, telemetría y auxilio vial 24/7.</div>
                    </div>
                    <span class="mt-4 px-3 py-1 rounded-[8px] bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-amber-400 font-bold">Cero Inversión Capital</span>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('modalidad', 'compra', 4)" class="p-5 rounded-[18px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex flex-col justify-between group text-center">
                    <div>
                      <span class="material-symbols-outlined text-emerald-400 text-[32px] mb-2">local_shipping</span>
                      <div class="text-sm font-bold text-white group-hover:text-emerald-400">Compra 0 Km (Km 22)</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Facturación formal con NCF B01 Crédito Fiscal, garantía oficial y stock en patio.</div>
                    </div>
                    <span class="mt-4 px-3 py-1 rounded-[8px] bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400 font-bold">Activo Propio</span>
                  </div>

                  <div onclick="window.tmdAdvisorSelect('modalidad', 'leasing', 4)" class="p-5 rounded-[18px] bg-[#111114] hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/60 cursor-pointer transition-all flex flex-col justify-between group text-center">
                    <div>
                      <span class="material-symbols-outlined text-cyan-400 text-[32px] mb-2">account_balance</span>
                      <div class="text-sm font-bold text-white group-hover:text-cyan-400">Leasing Bancario</div>
                      <div class="text-xs text-neutral-400 mt-1 font-sans">Cuotas deducibles al 100% de ISR, depreciación acelerada 25% (Ley 11-92).</div>
                    </div>
                    <span class="mt-4 px-3 py-1 rounded-[8px] bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-cyan-400 font-bold">Escudo Fiscal</span>
                  </div>

                </div>

                <div class="pt-2">
                  <button onclick="window.tmdAdvisorGoStep(2)" class="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1">
                    <span>← Volver al paso anterior</span>
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- STEP 4: RESULTADO RECOMENDADO -->
            ${currentStep === 4 ? `
              <div class="space-y-5 animate-fadeIn">
                <div class="p-4 rounded-[16px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-[24px]">verified</span>
                    <div>
                      <span class="text-xs font-mono uppercase text-emerald-400 font-bold">Recomendación Oficial TMD Dominicana</span>
                      <div class="text-sm font-bold text-white">Equipo Óptimo para sus Condiciones Operativas</div>
                    </div>
                  </div>
                  <button onclick="window.tmdAdvisorGoStep(1)" class="text-xs font-mono text-neutral-400 hover:text-amber-400">
                    Reiniciar Test ↺
                  </button>
                </div>

                <!-- Matched Machine Showcase Card -->
                <div class="rounded-[22px] bg-gradient-to-r from-amber-500/15 via-[#151c2a] to-[#10141f] border-2 border-amber-500 p-6 flex flex-col md:flex-row items-center gap-6 shadow-[0_8px_30px_rgba(245,158,11,0.18)]">
                  
                  <div class="w-full md:w-56 h-48 rounded-[16px] overflow-hidden bg-neutral-900 relative border border-neutral-700 flex-shrink-0">
                    <img src="${matched.image}" alt="${matched.name}" class="w-full h-full object-cover object-center">
                    <span class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-[6px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase">
                      Stock Km 22
                    </span>
                  </div>

                  <div class="flex-1 text-left">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="px-2 py-0.5 rounded-[6px] bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase">${matched.tag}</span>
                      <span class="text-xs font-mono text-neutral-400">· ${matched.category}</span>
                    </div>

                    <h3 class="text-xl font-bold text-amber-400">${matched.name}</h3>
                    
                    <p class="text-xs text-neutral-300 font-sans mt-2 leading-relaxed">
                      ${matched.reason}
                    </p>

                    <div class="mt-4 pt-3 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div>
                        <div class="text-neutral-500 uppercase text-[10px]">Peso Operativo</div>
                        <div class="text-white font-bold">${matched.weight}</div>
                      </div>
                      <div>
                        <div class="text-neutral-500 uppercase text-[10px]">Potencia Neta</div>
                        <div class="text-white font-bold">${matched.power}</div>
                      </div>
                      <div>
                        <div class="text-neutral-500 uppercase text-[10px]">Tarifa Estimada</div>
                        <div class="text-amber-400 font-bold">${matched.dailyRate}</div>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Action Conversion Buttons -->
                <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div class="text-xs text-neutral-400 font-sans">
                    💡 <em>Disponibilidad inmediata con despacho en Cama Baja a las 32 provincias de RD.</em>
                  </div>

                  <div class="flex flex-wrap items-center gap-2.5">
                    <button onclick="window.tmdOpenModelComparator('backhoes');" class="px-4 py-2.5 rounded-[12px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 border border-neutral-700 transition-all">
                      <span class="material-symbols-outlined text-[16px]">compare_arrows</span>
                      <span>Comparar vs. Cat</span>
                    </button>
                    <button onclick="window.tmdOpenDemoRequestModal('${matched.name}');" class="px-4 py-2.5 rounded-[12px] bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 border border-neutral-700 transition-all">
                      <span class="material-symbols-outlined text-[16px]">precision_manufacturing</span>
                      <span>Solicitar Demo en Obra</span>
                    </button>
                    <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, el Asesor de Maquinaria me ha recomendado la ' + matched.name + ' para mi faena de ' + (advisorState.answers.faena || 'construcción') + ' bajo esquema de ' + (advisorState.answers.modalidad || 'alquiler') + '. Solicito cotización con comprobante fiscal.')}" target="_blank" class="px-5 py-2.5 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all">
                      <span class="material-symbols-outlined text-[18px]">chat</span>
                      <span>Cotizar por WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            ` : ''}

          </div>

          <!-- Bottom Security Bar -->
          <div class="px-6 py-3.5 bg-[#0e1219] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 rounded-b-[24px] font-mono text-[11px]">
            <span>Asesoramiento técnico verificado por ingenieros de servicio Km 22</span>
            <span>Autopista Duarte Km 22 · (809) 826-2222</span>
          </div>

        </div>
      </div>
    `;
  }

  // ─── 3. PUBLIC API ───
  window.tmdOpenMachineAdvisor = function() {
    advisorState.step = 1;
    var existing = document.getElementById('tmd-advisor-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildAdvisorHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseMachineAdvisor = function() {
    var modal = document.getElementById('tmd-advisor-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.tmdAdvisorSelect = function(field, value, nextStep) {
    advisorState.answers[field] = value;
    advisorState.step = nextStep;
    var modal = document.getElementById('tmd-advisor-modal');
    if (modal) {
      modal.outerHTML = buildAdvisorHTML();
    }
  };

  window.tmdAdvisorGoStep = function(stepNum) {
    advisorState.step = stepNum;
    var modal = document.getElementById('tmd-advisor-modal');
    if (modal) {
      modal.outerHTML = buildAdvisorHTML();
    }
  };

  // Keyboard Esc listener
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseMachineAdvisor();
    }
  });

})();
