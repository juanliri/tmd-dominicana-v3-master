/**
 * TMD DOMINICANA — LEASE VS. BUY & DGII TAX SHIELD FINANCIAL SUITE
 * Diamond Standard (20/10 Rating) vs. Cat Financial & CNH Capital
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDFinancialSuite() {
  'use strict';

  // ─── 1. DEFAULT FINANCIAL STATE ───
  let finState = {
    machineModel: 'JCB 3CX Eco Tropicalizada',
    equipmentCostUSD: 95000,
    exchangeRate: 60.0, // 1 USD = 60.0 DOP
    termMonths: 24, // 12, 24, 36
    downPaymentPct: 20, // 10%, 20%, 30%
    interestRatePct: 9.8, // BHD / Banreservas leasing tasa promedio
    taxRateISR: 0.27, // 27% Tasa Corporativa DGII República Dominicana
    itbisPct: 0.18, // 18% ITBIS
    law1192Category2Rate: 0.25, // 25% Amortización Acelerada Anual Categoría 2 (Equipos pesados)
    applyProindustria: false // Ley 392-07 exención arancelaria
  };

  const PRESET_MACHINES = [
    { name: 'JCB 3CX Eco Tropicalizada', costUSD: 95000 },
    { name: 'LiuGong 922E HD Excavadora', costUSD: 165000 },
    { name: 'LS Tractor MT7.100 4WD', costUSD: 62000 },
    { name: 'JCB 155 Minicargador', costUSD: 49000 },
    { name: 'Ammann ARX 26 Compactador', costUSD: 54000 }
  ];

  // ─── 2. MATHEMATICAL CALCULATION ENGINE ───
  function calculateFinancials() {
    const costUSD = finState.equipmentCostUSD;
    const costDOP = costUSD * finState.exchangeRate;
    const itbisAmountUSD = costUSD * finState.itbisPct;
    const itbisAmountDOP = costDOP * finState.itbisPct;

    // A. BUY (Compra Directa de Capital)
    // Depreciación Anual Categoría 2 Ley 11-92 (25% sobre saldo residual)
    const year1DeprecUSD = costUSD * finState.law1192Category2Rate;
    const year1TaxShieldUSD = year1DeprecUSD * finState.taxRateISR; // Ahorro neto en cheque de impuesto DGII
    const itbisTaxCreditUSD = itbisAmountUSD; // 100% de crédito fiscal B01 compensable contra ITBIS cobrado

    // B. LEASE FINANCIERO (Arrendamiento Operativo / Financiero TMD Leasing & Banca)
    const downPaymentUSD = costUSD * (finState.downPaymentPct / 100);
    const financedPrincipalUSD = costUSD - downPaymentUSD;
    const monthlyRate = (finState.interestRatePct / 100) / 12;
    const months = finState.termMonths;

    // Cuota mensual PMT = P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyPaymentUSD = (financedPrincipalUSD * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalLeasePaymentsUSD = (monthlyPaymentUSD * months) + downPaymentUSD;
    
    // En Leasing comercial, 100% de las cuotas de alquiler son Gasto Deducible Directo de la Renta Neta Imponible
    const totalDeductibleExpenseUSD = totalLeasePaymentsUSD;
    const totalLeaseTaxShieldUSD = totalDeductibleExpenseUSD * finState.taxRateISR;
    const netEffectiveLeaseCostUSD = totalLeasePaymentsUSD - totalLeaseTaxShieldUSD;

    return {
      costUSD,
      costDOP,
      itbisAmountUSD,
      itbisAmountDOP,
      // Buy Metrics
      buyDownPaymentUSD: costUSD,
      year1DeprecUSD,
      year1TaxShieldUSD,
      itbisTaxCreditUSD,
      totalNetBuyCostUSD: costUSD - year1TaxShieldUSD - itbisTaxCreditUSD,
      // Lease Metrics
      downPaymentUSD,
      financedPrincipalUSD,
      monthlyPaymentUSD,
      monthlyPaymentDOP: monthlyPaymentUSD * finState.exchangeRate,
      totalLeasePaymentsUSD,
      totalLeaseTaxShieldUSD,
      netEffectiveLeaseCostUSD,
      monthlyCashFlowPreservedUSD: costUSD - downPaymentUSD // Liquidez que la empresa retiene en caja el día 1
    };
  }

  // ─── 3. BUILD INTERFACE HTML ───
  function buildFinancialSuiteHTML() {
    const calc = calculateFinancials();

    return `
      <div id="tmd-financial-suite-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(0, 0, 0, 0.92) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[1240px] max-h-[94vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 14, 16, 0.95) 0%, rgba(8, 8, 10, 0.92) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(245, 158, 11, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-6 py-4 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 18, 20, 0.92) 0%, rgba(11, 11, 13, 0.90) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[14px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[9999px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider">Simulador Fiscal B2B</span>
                  <h2 class="text-base sm:text-lg font-bold text-white tracking-wide">Lease vs. Buy & Escudo Fiscal DGII (Ley 11-92)</h2>
                </div>
                <p class="text-xs text-neutral-400 font-sans mt-0.5">Optimización de liquidez, depreciación acelerada Cat. 2 (25%) y crédito fiscal de ITBIS 18%</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.tmdPrintFinancialDossier()" class="px-3.5 py-2 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 transition-all">
                <span class="material-symbols-outlined text-[16px]">print</span>
                <span class="hidden sm:inline">Dictamen Financiero PDF</span>
              </button>
              <button onclick="window.tmdCloseFinancialSuite()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <!-- Main Dual Column Workspace -->
          <div class="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Panel: Interactive Sliders & Parameters (5 Cols) -->
            <div class="lg:col-span-5 flex flex-col gap-4">
              <div class="rounded-[20px] bg-[#101522] border border-neutral-800 p-5 space-y-4 shadow-inner">
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span class="text-xs font-mono uppercase text-neutral-300 font-bold">Parámetros de Inversión</span>
                  <span class="text-[11px] font-mono text-amber-500">Tasa: RD$ 60.00 x $1 USD</span>
                </div>

                <!-- Equipment Selector Presets -->
                <div>
                  <label class="block text-xs font-mono text-neutral-400 mb-1.5">Seleccionar Máquina:</label>
                  <select onchange="window.tmdSelectFinMachine(this.value)" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
                    ${PRESET_MACHINES.map(m => `
                      <option value="${m.name}" ${m.name === finState.machineModel ? 'selected' : ''}>
                        ${m.name} ($${m.costUSD.toLocaleString()} USD)
                      </option>
                    `).join('')}
                  </select>
                </div>

                <!-- Custom Cost Slider -->
                <div>
                  <div class="flex justify-between items-center text-xs font-mono mb-1">
                    <span class="text-neutral-400">Valor del Activo (USD):</span>
                    <span class="text-amber-400 font-bold">$${finState.equipmentCostUSD.toLocaleString()} USD</span>
                  </div>
                  <input 
                    type="range" min="30000" max="300000" step="5000" 
                    value="${finState.equipmentCostUSD}"
                    oninput="window.tmdUpdateFinField('equipmentCostUSD', parseInt(this.value, 10))"
                    class="w-full accent-amber-500 cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] font-mono text-neutral-500 mt-0.5">
                    <span>$30k USD</span>
                    <span>RD$ ${(finState.equipmentCostUSD * 60).toLocaleString()}</span>
                    <span>$300k USD</span>
                  </div>
                </div>

                <!-- Term Months Selector -->
                <div>
                  <label class="block text-xs font-mono text-neutral-400 mb-1.5">Plazo de Financiamiento:</label>
                  <div class="grid grid-cols-3 gap-2">
                    ${[12, 24, 36].map(m => `
                      <button onclick="window.tmdUpdateFinField('termMonths', ${m})" class="py-2 rounded-[10px] text-xs font-mono font-bold transition-all ${finState.termMonths === m ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}">
                        ${m} Meses
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Initial Down Payment (%) -->
                <div>
                  <div class="flex justify-between items-center text-xs font-mono mb-1">
                    <span class="text-neutral-400">Inicial Requerido (%):</span>
                    <span class="text-amber-400 font-bold">${finState.downPaymentPct}% ($${(calc.downPaymentUSD).toLocaleString()} USD)</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    ${[10, 20, 30].map(pct => `
                      <button onclick="window.tmdUpdateFinField('downPaymentPct', ${pct})" class="py-2 rounded-[10px] text-xs font-mono font-bold transition-all ${finState.downPaymentPct === pct ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}">
                        ${pct}%
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Interest Rate Slider -->
                <div>
                  <div class="flex justify-between items-center text-xs font-mono mb-1">
                    <span class="text-neutral-400">Tasa Interés Anual (Bancos RD):</span>
                    <span class="text-white font-bold font-mono">${finState.interestRatePct}% Tasa Fija</span>
                  </div>
                  <input 
                    type="range" min="8.0" max="14.0" step="0.2" 
                    value="${finState.interestRatePct}"
                    oninput="window.tmdUpdateFinField('interestRatePct', parseFloat(this.value))"
                    class="w-full accent-amber-500 cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] font-mono text-neutral-500 mt-0.5">
                    <span>8.0% (Banreservas/Agrícola)</span>
                    <span>14.0%</span>
                  </div>
                </div>

                <!-- Proindustria Toggle -->
                <div class="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-neutral-200">Régimen Proindustria (Ley 392-07)</div>
                    <div class="text-[10px] text-neutral-400">Exención arancel aduanal para industrias calificadas</div>
                  </div>
                  <input 
                    type="checkbox" 
                    ${finState.applyProindustria ? 'checked' : ''} 
                    onchange="window.tmdUpdateFinField('applyProindustria', this.checked)" 
                    class="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>

              </div>

              <!-- DGII Regulatory Advisory Card -->
              <div class="p-4 rounded-[18px] bg-amber-500/5 border border-amber-500/25 flex items-start gap-3">
                <span class="material-symbols-outlined text-amber-400 text-[22px] flex-shrink-0 mt-0.5">gavel</span>
                <div class="text-xs font-sans text-neutral-300 leading-relaxed">
                  <strong class="text-amber-400">Ley 11-92 Art. 287 (Código Tributario RD):</strong> Los equipos pesados autopropulsados califican bajo <em>Categoría 2</em> con amortización del 25% anual sobre saldos decrecientes. Las cuotas de leasing son deducibles al 100% como gasto operativo directo en la Declaración IR-2.
                </div>
              </div>
            </div>

            <!-- Right Panel: Side-by-Side Financial Comparison Matrix (7 Cols) -->
            <div class="lg:col-span-7 flex flex-col gap-4">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <!-- Card Option A: Compra Directa (Cash / Capital Purchase) -->
                <div class="rounded-[20px] p-5 flex flex-col justify-between transition-all" style="background: linear-gradient(145deg, rgba(20, 26, 38, 0.82) 0%, rgba(13, 17, 26, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="px-2.5 py-0.5 rounded-[9999px] bg-neutral-800 text-neutral-300 text-[10px] font-mono font-bold uppercase">Opción A</span>
                      <span class="text-xs font-mono text-neutral-500">Propiedad Inmediata</span>
                    </div>
                    <h4 class="text-base font-bold text-white mb-1">Compra Directa</h4>
                    <p class="text-xs text-neutral-400 font-sans mb-4">Desembolso de capital 100% el día 1 con depreciación gradual.</p>

                    <div class="space-y-3 font-mono text-xs">
                      <div class="flex justify-between pb-2 border-b border-neutral-800">
                        <span class="text-neutral-400">Desembolso Inicial:</span>
                        <span class="text-white font-bold">$${calc.costUSD.toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800">
                        <span class="text-neutral-400">ITBIS 18% (Factura B01):</span>
                        <span class="text-amber-400 font-bold">+$${calc.itbisAmountUSD.toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800">
                        <span class="text-neutral-400">Crédito Fiscal ITBIS (100%):</span>
                        <span class="text-emerald-400 font-bold">-$${calc.itbisTaxCreditUSD.toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800">
                        <span class="text-neutral-400">Depreciación Cat. 2 (25% Año 1):</span>
                        <span class="text-neutral-300">$${calc.year1DeprecUSD.toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800">
                        <span class="text-neutral-400">Ahorro Fiscal ISR (27%):</span>
                        <span class="text-emerald-400 font-bold">-$${calc.year1TaxShieldUSD.toLocaleString()} USD</span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-5 pt-3 border-t border-neutral-800">
                    <div class="text-[10px] font-mono text-neutral-400 uppercase">Costo Neto Efectivo Año 1:</div>
                    <div class="text-lg font-bold text-white font-mono">$${Math.round(calc.totalNetBuyCostUSD).toLocaleString()} USD</div>
                    <div class="text-[11px] font-mono text-neutral-500">RD$ ${Math.round(calc.totalNetBuyCostUSD * 60).toLocaleString()}</div>
                  </div>
                </div>

                <!-- Card Option B: Arrendamiento Operativo / TMD Leasing (RECOMMENDED) -->
                <div class="rounded-[20px] p-5 flex flex-col justify-between relative transition-all" style="background: linear-gradient(145deg, rgba(32, 28, 18, 0.84) 0%, rgba(20, 18, 14, 0.80) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 2px solid rgba(245, 158, 11, 0.85) !important; box-shadow: 0 12px 32px rgba(245, 158, 11, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.09) !important;">
                  <div class="absolute -top-3 right-4 px-3 py-0.5 rounded-[9999px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow">
                    ★ RECOMENDADO POR CFOs
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="px-2.5 py-0.5 rounded-[9999px] bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">Opción B</span>
                      <span class="text-xs font-mono text-emerald-400 font-bold">Máxima Liquidez</span>
                    </div>
                    <h4 class="text-base font-bold text-amber-400 mb-1">TMD Leasing Financiero</h4>
                    <p class="text-xs text-neutral-300 font-sans mb-4">Cuotas 100% deducibles de ISR sin descapitalizar la empresa.</p>

                    <div class="space-y-3 font-mono text-xs">
                      <div class="flex justify-between pb-2 border-b border-neutral-800/80">
                        <span class="text-neutral-300">Inicial Requerido (${finState.downPaymentPct}%):</span>
                        <span class="text-amber-400 font-bold">$${calc.downPaymentUSD.toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800/80">
                        <span class="text-neutral-300">Cuota Mensual (${finState.termMonths} Meses):</span>
                        <span class="text-emerald-400 font-black text-sm">$${Math.round(calc.monthlyPaymentUSD).toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800/80">
                        <span class="text-neutral-300">Cuota en Pesos Dominicanos:</span>
                        <span class="text-white font-bold">RD$ ${Math.round(calc.monthlyPaymentDOP).toLocaleString()}</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800/80">
                        <span class="text-neutral-300">Gasto Deducible Total (100%):</span>
                        <span class="text-neutral-200">$${Math.round(calc.totalLeasePaymentsUSD).toLocaleString()} USD</span>
                      </div>
                      <div class="flex justify-between pb-2 border-b border-neutral-800/80">
                        <span class="text-neutral-300">Escudo Fiscal ISR Total (27%):</span>
                        <span class="text-emerald-400 font-bold">-$${Math.round(calc.totalLeaseTaxShieldUSD).toLocaleString()} USD</span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-5 pt-3 border-t border-amber-500/40">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="text-[10px] font-mono text-amber-300 uppercase">Costo Neto Efectivo:</div>
                        <div class="text-lg font-black text-amber-400 font-mono">$${Math.round(calc.netEffectiveLeaseCostUSD).toLocaleString()} USD</div>
                      </div>
                      <div class="text-right">
                        <div class="text-[10px] font-mono text-emerald-400 uppercase">Caja Preservada Hoy:</div>
                        <div class="text-sm font-bold text-emerald-400 font-mono">+$${calc.monthlyCashFlowPreservedUSD.toLocaleString()} USD</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Strategic Financial Advantage Banner -->
              <div class="p-5 rounded-[20px] bg-gradient-to-r from-emerald-500/15 via-[#131b26] to-amber-500/15 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div class="max-w-md">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="material-symbols-outlined text-emerald-400">trending_up</span>
                    <h5 class="text-sm font-bold text-white">Impacto en el Flujo de Caja de su Constructora:</h5>
                  </div>
                  <p class="text-xs text-neutral-300 leading-relaxed font-sans">
                    Al optar por el esquema de Leasing TMD a <strong>${finState.termMonths} meses</strong>, su empresa retiene <strong>$${calc.monthlyCashFlowPreservedUSD.toLocaleString()} USD en caja el día de hoy</strong> para frentes de obra y materiales, deduciendo el 100% de las cuotas fiscales con NCF B01.
                  </p>
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-2.5">
                  <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, deseo tramitar expediente de Leasing para ' + finState.machineModel + ' por valor de $' + finState.equipmentCostUSD + ' USD a ' + finState.termMonths + ' meses con cuota estimada de $' + Math.round(calc.monthlyPaymentUSD) + ' USD.')}" target="_blank" class="w-full sm:w-auto px-5 py-3 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all">
                    <span class="material-symbols-outlined text-[18px]">send</span>
                    <span>Solicitar Pre-Aprobación Leasing</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          <!-- Bottom Footer Bar -->
          <div class="px-6 py-3.5 bg-[#0e1219] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 rounded-b-[24px]">
            <div class="flex items-center gap-3">
              <span class="text-neutral-300 font-mono text-[11px]">Bancos Aliados: Banreservas · Banco BHD · Banco Popular Dominicano · Banco Agrícola</span>
            </div>
            <div class="font-mono text-[11px] text-neutral-500">
              Cálculos basados en la Ley 11-92 y normativas vigentes de la DGII de la República Dominicana
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ─── 4. GLOBAL PUBLIC HANDLERS ───
  window.tmdOpenFinancialSuite = function(initialCostUSD) {
    if (initialCostUSD && typeof initialCostUSD === 'number') {
      finState.equipmentCostUSD = initialCostUSD;
    }
    var existing = document.getElementById('tmd-financial-suite-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildFinancialSuiteHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseFinancialSuite = function() {
    var modal = document.getElementById('tmd-financial-suite-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.tmdUpdateFinField = function(key, value) {
    finState[key] = value;
    var modal = document.getElementById('tmd-financial-suite-modal');
    if (modal) {
      modal.outerHTML = buildFinancialSuiteHTML();
    }
  };

  window.tmdSelectFinMachine = function(machineName) {
    const found = PRESET_MACHINES.find(m => m.name === machineName);
    if (found) {
      finState.machineModel = found.name;
      finState.equipmentCostUSD = found.costUSD;
      var modal = document.getElementById('tmd-financial-suite-modal');
      if (modal) {
        modal.outerHTML = buildFinancialSuiteHTML();
      }
    }
  };

  window.tmdPrintFinancialDossier = function() {
    const calc = calculateFinancials();
    const printWindow = window.open('', '_blank', 'width=950,height=850');
    if (!printWindow) {
      if (typeof window.tmdShowToast === 'function') {
        window.tmdShowToast('Por favor permita ventanas emergentes para generar el dictamen financiero.', 'error');
      }
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TMD Dominicana — Dictamen Financiero Lease vs Buy: ${finState.machineModel}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #111; line-height: 1.5; font-size: 12px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; margin: 0; color: #111; }
          .subtitle { font-size: 12px; color: #555; margin-top: 3px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
          .box { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fafafa; }
          .highlight-box { border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; background: #fffdf5; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
          td { padding: 6px 4px; border-bottom: 1px solid #eee; }
          .bold { font-weight: bold; }
          .footer { margin-top: 30px; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">TECNOMAQUINARIAS DIESEL S.R.L. — DIVISIÓN FINANCIERA</div>
            <div class="subtitle">Dictamen Comparativo de Adquisición & Escudo Fiscal DGII · RNC 1-30-88492-1</div>
          </div>
          <div style="text-align: right;">
            <strong style="color: #d97706;">ESTÁNDAR DIAMANTE 20/10</strong>
            <div style="font-size: 10px; color: #666;">Km 22 Autopista Duarte · (809) 826-2222</div>
          </div>
        </div>

        <div>
          <strong>Activo Analizado:</strong> ${finState.machineModel} · <strong>Valor:</strong> $${calc.costUSD.toLocaleString()} USD (RD$ ${calc.costDOP.toLocaleString()}) · <strong>Plazo:</strong> ${finState.termMonths} Meses
        </div>

        <div class="grid">
          <div class="box">
            <h3 style="margin-top:0; color:#333;">Opción A: Compra Directa de Capital</h3>
            <table>
              <tr><td>Desembolso Inicial (Día 1):</td><td class="bold">$${calc.costUSD.toLocaleString()} USD</td></tr>
              <tr><td>ITBIS 18% Factura B01:</td><td>+$${calc.itbisAmountUSD.toLocaleString()} USD</td></tr>
              <tr><td>Crédito Fiscal ITBIS (100% compensable):</td><td class="bold" style="color:#059669;">-$${calc.itbisTaxCreditUSD.toLocaleString()} USD</td></tr>
              <tr><td>Amortización Ley 11-92 Cat. 2 (25% Año 1):</td><td>$${calc.year1DeprecUSD.toLocaleString()} USD</td></tr>
              <tr><td>Ahorro Fiscal Neto en ISR (27% DGII):</td><td class="bold" style="color:#059669;">-$${calc.year1TaxShieldUSD.toLocaleString()} USD</td></tr>
              <tr><td class="bold">Costo Neto Efectivo Año 1:</td><td class="bold" style="font-size:13px;">$${Math.round(calc.totalNetBuyCostUSD).toLocaleString()} USD</td></tr>
            </table>
          </div>

          <div class="highlight-box">
            <h3 style="margin-top:0; color:#b45309;">Opción B: TMD Leasing Financiero (Recomendado)</h3>
            <table>
              <tr><td>Inicial (${finState.downPaymentPct}%):</td><td class="bold">$${calc.downPaymentUSD.toLocaleString()} USD</td></tr>
              <tr><td>Cuota Mensual (${finState.termMonths} meses):</td><td class="bold" style="font-size:13px; color:#d97706;">$${Math.round(calc.monthlyPaymentUSD).toLocaleString()} USD (RD$ ${Math.round(calc.monthlyPaymentDOP).toLocaleString()})</td></tr>
              <tr><td>Gasto Deducible Total (100% de cuotas):</td><td>$${Math.round(calc.totalLeasePaymentsUSD).toLocaleString()} USD</td></tr>
              <tr><td>Escudo Fiscal Neto en ISR (27%):</td><td class="bold" style="color:#059669;">-$${Math.round(calc.totalLeaseTaxShieldUSD).toLocaleString()} USD</td></tr>
              <tr><td class="bold">Costo Neto Efectivo Total:</td><td class="bold" style="font-size:13px; color:#b45309;">$${Math.round(calc.netEffectiveLeaseCostUSD).toLocaleString()} USD</td></tr>
              <tr><td class="bold" style="color:#059669;">Liquidez Preservada en Caja Hoy:</td><td class="bold" style="color:#059669;">+$${calc.monthlyCashFlowPreservedUSD.toLocaleString()} USD</td></tr>
            </table>
          </div>
        </div>

        <div class="footer">
          <strong>Fundamento Jurídico-Tributario:</strong> Este estudio preliminar se emite conforme al Art. 287 del Código Tributario de la República Dominicana (Ley 11-92 y modificaciones), Normas Generales de la Dirección General de Impuestos Internos (DGII) y Ley 392-07 de Competitividad e Innovación Industrial. Para formalizar la operación se requiere RNC al día y Comprobante Fiscal B01.
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Keyboard shortcut listener for Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseFinancialSuite();
    }
  });

})();
