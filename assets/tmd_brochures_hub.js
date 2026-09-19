/**
 * TMD DOMINICANA — TECHNICAL BROCHURES & "REQUEST A DEMO" HUB
 * Bobcat Benchmark: Official PDF Documentation Library & Job-Site Demo Booking
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDBrochuresAndDemoHub() {
  'use strict';

  // ─── 1. BROCHURE REPOSITORY ───
  const BROCHURE_DOCS = [
    {
      id: 'doc-jcb-3cx',
      title: 'Ficha Técnica Oficial — JCB 3CX Eco Tropicalizada',
      subtitle: 'Retroexcavadora 4x4 · Motor EcoMax 92 HP · A/C 48°C · Filtro Ciclónico Dual',
      category: 'construccion',
      categoryLabel: 'Construcción Pesada',
      pages: '4 Páginas',
      code: 'FT-JCB-3CX-2026-DO',
      specs: ['Peso Operativo: 8,135 kg', 'Profundidad de Excavación: 4.24 m / 5.46 m', 'Bomba Variable 251 Bar', 'Consumo: 7.8 L/h EcoDig']
    },
    {
      id: 'doc-liugong-922e',
      title: 'Ficha Técnica Oficial — LiuGong 922E HD Severe-Duty',
      subtitle: 'Excavadora de Oruga 22 Toneladas · Cummins 160 HP · Balde Hardox 1.2 m³',
      category: 'construccion',
      categoryLabel: 'Construcción / Canteras',
      pages: '6 Páginas',
      code: 'FT-LG-922E-2026-DO',
      specs: ['Peso Operativo: 22,000 kg', 'Presión Hidráulica: 343 Bar (Kawasaki)', 'Cummins 6BTAA mecánico', 'Radiador de aletas anchas']
    },
    {
      id: 'doc-ls-mt7',
      title: 'Ficha Técnica Oficial — LS Tractor MT7.100 Heavy Agro',
      subtitle: 'Tractor Agrícola 4WD 101 HP · FPT Iveco Turbo · Toma de Fuerza Triple',
      category: 'agro',
      categoryLabel: 'Línea Agrícola',
      pages: '4 Páginas',
      code: 'FT-LS-MT7-2026-DO',
      specs: ['Potencia Neta: 101 HP', 'Levante Cat II: 3,800 kg', 'Malla anti-bagazo cañaveral', 'Eje delantero sellado para arroz']
    },
    {
      id: 'doc-jcb-155',
      title: 'Ficha Técnica Oficial — JCB 155 Monobrazo PowerBoom',
      subtitle: 'Minicargador Compacto · Entrada Lateral Segura · Visibilidad Periférica 360°',
      category: 'compactos',
      categoryLabel: 'Minicargadores',
      pages: '4 Páginas',
      code: 'FT-JCB-155-2026-DO',
      specs: ['Peso Operativo: 2,883 kg', 'Altura de descarga: 2.85 m', 'Bomba auxiliar para martillo', 'Cabina climatizada tropical']
    },
    {
      id: 'doc-ammann-arx26',
      title: 'Ficha Técnica Oficial — Ammann ARX 26 Rodillo Tándem',
      subtitle: 'Compactador Vibratorio Suizo 2.5T · Doble Tambor · Rociador Presurizado',
      category: 'construccion',
      categoryLabel: 'Compactación Asfáltica',
      pages: '4 Páginas',
      code: 'FT-AMM-ARX26-2026-DO',
      specs: ['Peso Operativo: 2,460 kg', 'Amplitud dual y frecuencia dual', 'Motor Yanmar diésel', 'Terminación asfáltica premium']
    },
    {
      id: 'doc-escudo-fiscal',
      title: 'Guía Tributaria — Escudo Fiscal DGII Ley 11-92 Maquinaria',
      subtitle: 'Amortización Acelerada Categoría 2 (25% Anual) · Crédito Fiscal 18% ITBIS (B01)',
      category: 'fiscal',
      categoryLabel: 'Documento Fiscal DGII',
      pages: '8 Páginas',
      code: 'GT-DGII-1192-2026',
      specs: ['Art. 287 Código Tributario', 'Deducción en Declaración IR-2', 'Esquema de Leasing vs Capital', 'Casos de éxito constructoras RD']
    },
    {
      id: 'doc-pm-500h',
      title: 'Manual de Taller — Protocolo de Mantenimiento Preventivo 500h',
      subtitle: 'Checklist de 50 puntos · Análisis de aceite diésel · Certificación dinamómetro Km 22',
      category: 'servicio',
      categoryLabel: 'Protocolo de Taller',
      pages: '4 Páginas',
      code: 'MP-TMD-500H-2026',
      specs: ['Calibración inyección y válvulas', 'Presión hidráulica de banco 6,000 PSI', 'Inspección de desgaste DVI', 'Garantía extendida de faena']
    }
  ];

  let currentCategory = 'all';

  // ─── 2. BUILD BROCHURES MODAL HTML ───
  function buildBrochuresHTML() {
    const filteredDocs = BROCHURE_DOCS.filter(d => currentCategory === 'all' || d.category === currentCategory);

    return `
      <div id="tmd-brochures-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(0, 0, 0, 0.92) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[1140px] max-h-[92vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 14, 16, 0.95) 0%, rgba(8, 8, 10, 0.92) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(245, 158, 11, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-30 flex items-center justify-between px-6 py-4 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 18, 20, 0.92) 0%, rgba(11, 11, 13, 0.90) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[12px] bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <span class="material-symbols-outlined text-[24px]">picture_as_pdf</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[9999px] bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider">Centro Técnico Oficial</span>
                  <h3 class="text-base font-bold text-white tracking-wide">Biblioteca de Fichas Técnicas & Brochures</h3>
                </div>
                <p class="text-xs text-neutral-400 font-sans">Documentación de ingeniería, curvas de potencia y normativas DGII en PDF descargable</p>
              </div>
            </div>

            <button onclick="window.tmdCloseBrochuresHub()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Category Filter Bar -->
          <div class="px-6 py-3 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto text-xs font-mono" style="background: rgba(12, 12, 14, 0.92) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <span class="text-neutral-400 uppercase text-[11px] mr-1 flex-shrink-0">Filtrar:</span>
            ${[
              { key: 'all', label: 'Todas las Fichas' },
              { key: 'construccion', label: 'Construcción Pesada' },
              { key: 'agro', label: 'Agrícola 4WD' },
              { key: 'compactos', label: 'Minicargadores' },
              { key: 'fiscal', label: 'Leyes DGII' },
              { key: 'servicio', label: 'Taller & Servicio' }
            ].map(tab => `
              <button onclick="window.tmdFilterBrochures('${tab.key}')" class="px-3 py-1.5 rounded-[10px] whitespace-nowrap transition-all ${currentCategory === tab.key ? 'bg-amber-500 text-black font-bold shadow-md' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}">
                ${tab.label}
              </button>
            `).join('')}
          </div>

          <!-- Document Grid List -->
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            ${filteredDocs.map(doc => `
              <div class="p-5 rounded-[20px] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:border-amber-500/50" style="background: linear-gradient(145deg, rgba(18, 18, 22, 0.88) 0%, rgba(10, 10, 14, 0.85) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.07) !important;">
                <div>
                  <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
                    <span class="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">${doc.categoryLabel}</span>
                    <span>${doc.code} • ${doc.pages}</span>
                  </div>

                  <h4 class="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">${doc.title}</h4>
                  <p class="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">${doc.subtitle}</p>

                  <div class="mt-3.5 space-y-1.5 border-t border-neutral-800/80 pt-2.5 text-[11px] font-mono text-neutral-300" style="background: rgba(11, 15, 24, 0.76) !important; backdrop-filter: blur(12px) !important; border-radius: 10px; padding: 8px 10px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    ${doc.specs.map(s => `
                      <div class="flex items-center gap-1.5">
                        <span class="text-amber-500">▶</span>
                        <span>${s}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <button onclick="window.tmdDownloadBrochurePDF('${doc.id}');" class="px-4 py-2 rounded-[10px] bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-sans flex items-center gap-1.5 shadow-[0_2px_10px_rgba(245,158,11,0.25)] transition-all">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar PDF</span>
                  </button>

                  <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, solicito más información y asesoría sobre el documento: ' + doc.title + ' (' + doc.code + ').')}" target="_blank" class="px-3.5 py-2 rounded-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-neutral-800 transition-all">
                    <span class="material-symbols-outlined text-[15px] text-emerald-400">chat</span>
                    <span>Consultar</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Footer -->
          <div class="px-6 py-3.5 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 rounded-b-[24px] font-mono text-[11px]" style="background: linear-gradient(180deg, rgba(11, 16, 26, 0.84) 0%, rgba(18, 24, 38, 0.86) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-top: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <span>Todas las fichas técnicas cumplen con las normativas MOPC y tolerancias de fábrica ISO</span>
            <span>Edición Caribe 2026 · TMD Dominicana</span>
          </div>

        </div>
      </div>
    `;
  }

  // ─── 3. BUILD "REQUEST A DEMO" MODAL HTML ───
  function buildDemoRequestHTML(modelName) {
    const selectedModel = modelName || 'JCB 3CX Eco Tropicalizada';

    return `
      <div id="tmd-demo-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(4, 6, 12, 0.85) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 19, 30, 0.90) 0%, rgba(8, 11, 19, 0.88) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0,0,0,0.85), 0 0 50px rgba(245,158,11,0.10), inset 0 1px 1px rgba(255, 255, 255, 0.12) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-30 flex items-center justify-between px-6 py-4 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 24, 38, 0.86) 0%, rgba(11, 16, 26, 0.82) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[12px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[24px]">precision_manufacturing</span>
              </div>
              <div>
                <h3 class="text-base font-bold text-white tracking-wide">Solicitar Demostración en Cantera u Obra</h3>
                <p class="text-xs text-neutral-400 font-sans">Pruebe el rendimiento real en su propio suelo antes de comprar o rentar</p>
              </div>
            </div>

            <button onclick="window.tmdCloseDemoRequestModal()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Form Body -->
          <div class="p-6 space-y-4">
            
            <div class="p-3.5 rounded-[14px] bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-neutral-300">
              <span class="material-symbols-outlined text-amber-400 text-[22px]">verified</span>
              <span>Llevamos la máquina con camión Cama Baja (Lowboy) directamente a su frente de obra o cantera para prueba de carga y consumo diésel.</span>
            </div>

            <div>
              <label class="block text-xs font-mono text-neutral-400 mb-1">Equipo a Demostrar:</label>
              <select id="tmdDemoModel" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
                <option value="JCB 3CX Eco Tropicalizada" ${selectedModel.includes('3CX') ? 'selected' : ''}>JCB 3CX Eco Tropicalizada (Retroexcavadora 4x4)</option>
                <option value="LiuGong 922E HD Severe-Duty" ${selectedModel.includes('922') ? 'selected' : ''}>LiuGong 922E HD (Excavadora 22T Hardox)</option>
                <option value="LS Tractor MT7.100 Heavy Agro" ${selectedModel.includes('MT7') ? 'selected' : ''}>LS Tractor MT7.100 (Tractor Agrícola 4WD 101HP)</option>
                <option value="JCB 155 Monobrazo PowerBoom" ${selectedModel.includes('155') ? 'selected' : ''}>JCB 155 Monobrazo PowerBoom (Minicargador)</option>
                <option value="Ammann ARX 26 Rodillo Tándem" ${selectedModel.includes('ARX') ? 'selected' : ''}>Ammann ARX 26 (Compactador Tándem 2.5T)</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-mono text-neutral-400 mb-1">Nombre de la Empresa / Constructora:</label>
                <input id="tmdDemoCompany" type="text" placeholder="Ej. Constructora del Caribe S.R.L." class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
              </div>
              <div>
                <label class="block text-xs font-mono text-neutral-400 mb-1">RNC de la Empresa:</label>
                <input id="tmdDemoRNC" type="text" placeholder="Ej. 1-30-XXXXX-X" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-mono text-neutral-400 mb-1">Persona de Contacto & Cargo:</label>
                <input id="tmdDemoName" type="text" placeholder="Ej. Ing. Rafael Mejía (Director Obra)" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
              </div>
              <div>
                <label class="block text-xs font-mono text-neutral-400 mb-1">Teléfono / WhatsApp Directo:</label>
                <input id="tmdDemoPhone" type="text" placeholder="Ej. (809) 555-0192" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
              </div>
            </div>

            <div>
              <label class="block text-xs font-mono text-neutral-400 mb-1">Ubicación de la Obra o Cantera (Provincia / Sector):</label>
              <input id="tmdDemoLocation" type="text" placeholder="Ej. Cantera La Guáyiga, Autopista Duarte Km 24 / Proyecto Autovía Santiago" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
            </div>

            <div>
              <label class="block text-xs font-mono text-neutral-400 mb-1">Fecha Deseada para la Prueba:</label>
              <input id="tmdDemoDate" type="date" class="w-full py-2.5 px-3 rounded-[12px] bg-black/60 border border-neutral-700 text-white text-xs font-sans outline-none focus:border-amber-500">
            </div>

            <div class="pt-3">
              <button onclick="window.tmdSubmitDemoRequest();" class="w-full py-3.5 px-5 rounded-[14px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all">
                <span class="material-symbols-outlined text-[18px]">send</span>
                <span>Agendar Demostración con Taller Central Km 22</span>
              </button>
            </div>

          </div>

          <!-- Bottom Footer -->
          <div class="px-6 py-3 bg-[#0e1219] border-t border-neutral-800 text-center text-xs text-neutral-500 rounded-b-[24px] font-mono text-[11px]">
            Coordinación de despacho de Cama Baja: (809) 826-2222 · ventas@tmd.com.do
          </div>

        </div>
      </div>
    `;
  }

  // ─── 4. PUBLIC API & HANDLERS ───
  window.tmdOpenBrochuresHub = function() {
    currentCategory = 'all';
    var existing = document.getElementById('tmd-brochures-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildBrochuresHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseBrochuresHub = function() {
    var modal = document.getElementById('tmd-brochures-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.tmdFilterBrochures = function(catKey) {
    currentCategory = catKey;
    var modal = document.getElementById('tmd-brochures-modal');
    if (modal) {
      modal.outerHTML = buildBrochuresHTML();
    }
  };

  window.tmdOpenDemoRequestModal = function(modelName) {
    var existing = document.getElementById('tmd-demo-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildDemoRequestHTML(modelName);
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseDemoRequestModal = function() {
    var modal = document.getElementById('tmd-demo-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.tmdSubmitDemoRequest = function() {
    var model = document.getElementById('tmdDemoModel') ? document.getElementById('tmdDemoModel').value : '';
    var company = document.getElementById('tmdDemoCompany') ? document.getElementById('tmdDemoCompany').value : 'Constructora';
    var rnc = document.getElementById('tmdDemoRNC') ? document.getElementById('tmdDemoRNC').value : 'N/D';
    var name = document.getElementById('tmdDemoName') ? document.getElementById('tmdDemoName').value : 'Ingeniero';
    var phone = document.getElementById('tmdDemoPhone') ? document.getElementById('tmdDemoPhone').value : '';
    var location = document.getElementById('tmdDemoLocation') ? document.getElementById('tmdDemoLocation').value : 'República Dominicana';
    var date = document.getElementById('tmdDemoDate') ? document.getElementById('tmdDemoDate').value : 'Lo antes posible';

    var msg = `Hola TMD Dominicana, solicito agendar una Demostración en Obra para el equipo: ${model}.
Empresa: ${company} (RNC: ${rnc})
Contacto: ${name} (Tel: ${phone})
Ubicación de Faena: ${location}
Fecha Propuesta: ${date}`;

    window.tmdCloseDemoRequestModal();
    window.open('https://wa.me/18098262222?text=' + encodeURIComponent(msg), '_blank');
  };

  window.tmdDownloadBrochurePDF = function(docId) {
    var doc = BROCHURE_DOCS.find(d => d.id === docId) || BROCHURE_DOCS[0];
    var printWindow = window.open('', '_blank', 'width=900,height=800');
    if (!printWindow) {
      alert('Por favor permita ventanas emergentes para visualizar la ficha técnica oficial.');
      return;
    }

    var html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TMD Dominicana — ${doc.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #111; line-height: 1.5; font-size: 12px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; margin: 0; color: #111; }
          .subtitle { font-size: 12px; color: #555; margin-top: 3px; }
          .badge { background: #f59e0b; color: #000; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
          .specs { margin: 20px 0; }
          .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .footer { margin-top: 40px; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">TECNOMAQUINARIAS DIESEL S.R.L. (TMD DOMINICANA)</div>
            <div class="subtitle">${doc.title} · Código: ${doc.code}</div>
          </div>
          <div style="text-align: right;">
            <span class="badge">EDICIÓN CARIBE 2026</span>
            <div style="font-size: 10px; color: #666; margin-top: 4px;">Autopista Duarte Km 22 · (809) 826-2222</div>
          </div>
        </div>

        <p><strong>Descripción de Ingeniería:</strong> ${doc.subtitle}</p>

        <div class="specs">
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Especificaciones Clave de Faena:</h3>
          ${doc.specs.map(s => `<div class="spec-row"><span>${s}</span><strong style="color:#b45309;">Verificado Km 22</strong></div>`).join('')}
        </div>

        <div style="margin-top: 25px; padding: 12px; background: #fffdf5; border: 1px solid #f59e0b; border-radius: 6px;">
          <strong>Blindaje Tropicalizado para República Dominicana:</strong> Este equipo cuenta con radiador reforzado para temperaturas ambiente de hasta 48°C, filtro de aire ciclónico contra polvo de roca caliza y tratamiento electrostático de chasis contra la corrosión marina caribeña.
        </div>

        <div class="footer">
          <strong>Aviso Técnico:</strong> Documentación emitida por Tecnomaquinarias Diesel S.R.L. RNC: 1-30-88492-1. Autopista Duarte Km 22, La Guáyiga, Pedro Brand, Santo Domingo Oeste. www.tmddominicana.com · info@tmd.com.do.
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

  // Keyboard Esc listener
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseBrochuresHub();
      window.tmdCloseDemoRequestModal();
    }
  });

})();
