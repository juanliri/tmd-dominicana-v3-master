/**
 * TMD DOMINICANA — INTERACTIVE COVERAGE RADAR & TRAVEL-TIME ENGINE
 * Estándar Diamante (20/10) — Cobertura Nacional 32 Provincias & 4 Nodos Operativos
 * © 2026 Tecnomaquinarias Diesel S.R.L.
 */

(function initTMDInteractiveRadar() {
  'use strict';

  // ─── 1. DATA: 4 OPERATIONAL HUBS ───
  const TMD_HUBS = {
    km22: {
      id: 'km22',
      name: 'Matriz Km 22 (Santo Domingo Oeste)',
      tag: 'SEDE CENTRAL & MASTER SHOP',
      coords: { x: 52, y: 64 }, // Percentage coordinates on DR map
      bays: 18,
      specs: '18 bahías pesadas · Grúa puente 25T · Laboratorio diésel · Banco 6,000 PSI',
      phone: '+1 (809) 826-2222',
      sla: '< 2 horas en Gran Santo Domingo y San Cristóbal',
      status: 'OPERATIVO 24/7'
    },
    santiago: {
      id: 'santiago',
      name: 'Hub Cibao (Santiago • Nodo Norte)',
      tag: 'BASE MINERA & AGRÍCOLA',
      coords: { x: 42, y: 38 },
      bays: 6,
      specs: 'Mecánica de campo · Flota móvil de rescate · Repuestos críticos 0 Km',
      phone: '+1 (809) 826-2223',
      sla: '< 3 horas en todo el Valle del Cibao y Cordillera',
      status: 'ACTIVO'
    },
    puntacana: {
      id: 'puntacana',
      name: 'Nodo Este (Punta Cana • Base Este)',
      tag: 'SOPORTE HOTELERO & CANTERAS',
      coords: { x: 88, y: 68 },
      bays: 4,
      specs: 'Unidades de rescate para canteras de caliza, puertos y aeropuertos',
      phone: '+1 (809) 826-2222',
      sla: '< 3 horas en todo el Corredor Este',
      status: 'ACTIVO'
    },
    barahona: {
      id: 'barahona',
      name: 'Base Sur (Barahona • Nodo Suroeste)',
      tag: 'CANTERAS & ENERGÍA RENOVABLE',
      coords: { x: 30, y: 78 },
      bays: 4,
      specs: 'Soporte pesado para minería de yeso, bauxita y parques eólicos',
      phone: '+1 (809) 826-2222',
      sla: '< 4 horas en Región Enriquillo y Pedernales',
      status: 'ACTIVO'
    }
  };

  // ─── 2. DATA: 32 PROVINCES METRICS (Distance from Km 22, Transit Time, Base) ───
  const TMD_PROVINCES = [
    { name: 'Santo Domingo', km: 12, lowboyHours: '0.8h', slaHours: '< 1.5h', hub: 'km22', region: 'Metropolitana' },
    { name: 'Distrito Nacional', km: 18, lowboyHours: '1.0h', slaHours: '< 1.5h', hub: 'km22', region: 'Metropolitana' },
    { name: 'San Cristóbal', km: 28, lowboyHours: '1.2h', slaHours: '< 2.0h', hub: 'km22', region: 'Sur Cercano' },
    { name: 'Monte Plata', km: 45, lowboyHours: '1.5h', slaHours: '< 2.5h', hub: 'km22', region: 'Este Cercano' },
    { name: 'Monseñor Nouel (Bonao)', km: 62, lowboyHours: '1.8h', slaHours: '< 2.0h', hub: 'km22', region: 'Cibao Sur' },
    { name: 'San Pedro de Macorís', km: 85, lowboyHours: '2.2h', slaHours: '< 2.5h', hub: 'puntacana', region: 'Este' },
    { name: 'San José de Ocoa', km: 92, lowboyHours: '2.5h', slaHours: '< 3.0h', hub: 'km22', region: 'Sur' },
    { name: 'La Vega', km: 98, lowboyHours: '2.4h', slaHours: '< 2.0h', hub: 'santiago', region: 'Cibao Central' },
    { name: 'Peravia (Baní)', km: 68, lowboyHours: '1.8h', slaHours: '< 2.0h', hub: 'km22', region: 'Sur' },
    { name: 'Sánchez Ramírez (Cotuí)', km: 88, lowboyHours: '2.3h', slaHours: '< 2.5h', hub: 'santiago', region: 'Cibao' },
    { name: 'Azua', km: 115, lowboyHours: '2.8h', slaHours: '< 3.0h', hub: 'barahona', region: 'Sur' },
    { name: 'Santiago de los Caballeros', km: 135, lowboyHours: '3.0h', slaHours: '< 1.5h', hub: 'santiago', region: 'Cibao Central' },
    { name: 'Espaillat (Moca)', km: 138, lowboyHours: '3.2h', slaHours: '< 2.0h', hub: 'santiago', region: 'Cibao' },
    { name: 'Duarte (San Fco. Macorís)', km: 122, lowboyHours: '3.0h', slaHours: '< 2.5h', hub: 'santiago', region: 'Nordeste' },
    { name: 'Hato Mayor', km: 110, lowboyHours: '2.8h', slaHours: '< 3.0h', hub: 'puntacana', region: 'Este' },
    { name: 'La Romana', km: 125, lowboyHours: '3.0h', slaHours: '< 2.0h', hub: 'puntacana', region: 'Este' },
    { name: 'Hermanas Mirabal (Salcedo)', km: 142, lowboyHours: '3.2h', slaHours: '< 2.5h', hub: 'santiago', region: 'Cibao' },
    { name: 'El Seibo', km: 138, lowboyHours: '3.2h', slaHours: '< 3.0h', hub: 'puntacana', region: 'Este' },
    { name: 'Puerto Plata', km: 185, lowboyHours: '4.2h', slaHours: '< 2.5h', hub: 'santiago', region: 'Costa Norte' },
    { name: 'La Altagracia (Punta Cana / Higüey)', km: 175, lowboyHours: '3.8h', slaHours: '< 1.5h', hub: 'puntacana', region: 'Este Turístico' },
    { name: 'María Trinidad Sánchez (Nagua)', km: 155, lowboyHours: '3.5h', slaHours: '< 3.0h', hub: 'santiago', region: 'Nordeste' },
    { name: 'San Juan de la Maguana', km: 185, lowboyHours: '4.0h', slaHours: '< 3.5h', hub: 'barahona', region: 'El Valle' },
    { name: 'Barahona', km: 188, lowboyHours: '4.0h', slaHours: '< 1.5h', hub: 'barahona', region: 'Suroeste' },
    { name: 'Valverde (Mao)', km: 185, lowboyHours: '4.2h', slaHours: '< 2.5h', hub: 'santiago', region: 'Noroeste' },
    { name: 'Samaná', km: 195, lowboyHours: '4.2h', slaHours: '< 3.5h', hub: 'santiago', region: 'Península' },
    { name: 'Santiago Rodríguez', km: 215, lowboyHours: '4.8h', slaHours: '< 3.5h', hub: 'santiago', region: 'Línea Noroeste' },
    { name: 'Bahoruco (Neyba)', km: 220, lowboyHours: '4.8h', slaHours: '< 3.0h', hub: 'barahona', region: 'Lago Enriquillo' },
    { name: 'Monte Cristi', km: 245, lowboyHours: '5.2h', slaHours: '< 4.0h', hub: 'santiago', region: 'Costa Noroeste' },
    { name: 'Dajabón (Frontera Norte)', km: 265, lowboyHours: '5.5h', slaHours: '< 4.0h', hub: 'santiago', region: 'Frontera' },
    { name: 'Elías Piña (Frontera Centro)', km: 245, lowboyHours: '5.2h', slaHours: '< 4.0h', hub: 'barahona', region: 'Frontera' },
    { name: 'Independencia (Jimaní)', km: 250, lowboyHours: '5.4h', slaHours: '< 3.5h', hub: 'barahona', region: 'Frontera Sur' },
    { name: 'Pedernales (Cabo Rojo / Alcoa)', km: 295, lowboyHours: '6.2h', slaHours: '< 4.0h', hub: 'barahona', region: 'Polo Turístico Sur' }
  ];

  // ─── 3. RENDER FUNCTION ───
  function renderRadarComponent(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="tmd-radar-card" style="
        background: linear-gradient(145deg, rgba(14, 17, 24, 0.95) 0%, rgba(8, 10, 15, 0.98) 100%);
        border: 1px solid rgba(255, 184, 0, 0.25);
        border-radius: 20px;
        padding: 32px 24px;
        color: #f8fafc;
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 30px -10px rgba(255, 184, 0, 0.15);
        position: relative;
        overflow: hidden;
        margin: 24px 0;
      ">
        <!-- Background Ambient Grid -->
        <div style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          opacity: 0.6;
        "></div>

        <!-- Header -->
        <div style="position: relative; z-index: 2; margin-bottom: 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 184, 0, 0.12); border: 1px solid rgba(255, 184, 0, 0.3); padding: 4px 10px; border-radius: 9999px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #ffb800; text-transform: uppercase; margin-bottom: 8px;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
              RADAR NACIONAL DE COBERTURA · 32 PROVINCIAS
            </div>
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 800; color: #fff; margin: 0 0 6px; letter-spacing: -0.02em;">
              Matriz de Despacho &amp; Auxilio Mecánico Km 22
            </h3>
            <p style="font-size: 13px; color: #94a3b8; margin: 0; max-width: 620px; line-height: 1.5;">
              Infraestructura técnica interconectada para soporte de maquinaria en minería, carreteras, puertos y agricultura en toda la República Dominicana.
            </p>
          </div>

          <!-- Quick Telemetry Badge -->
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 8px 14px; text-align: center;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 800; color: #ffb800;">18</div>
              <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">Bahías Km 22</div>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 8px 14px; text-align: center;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 800; color: #10b981;">4 Nodos</div>
              <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">RD Activos</div>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 8px 14px; text-align: center;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 800; color: #38bdf8;">&lt; 2h SLA</div>
              <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">Respuesta Sto Dgo</div>
            </div>
          </div>
        </div>

        <!-- 2-Column Grid: Visual Map Radar + Province Estimator Calculator -->
        <div style="position: relative; z-index: 2; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;" class="tmd-radar-grid">
          
          <!-- LEFT: Interactive SVG Map of Dominican Republic -->
          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 320px; position: relative;">
            
            <!-- Map Overlay Legend -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #94a3b8;">
              <span style="display: flex; align-items: center; gap: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #ffb800; display: inline-block;"></span>
                Sede Central Km 22
              </span>
              <span style="display: flex; align-items: center; gap: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
                Nodos Regionales (Santiago, Este, Sur)
              </span>
            </div>

            <!-- Stylized SVG Vector Map of Dominican Republic -->
            <div style="position: relative; width: 100%; height: 210px;" id="tmdMapCanvas">
              <svg viewBox="0 0 500 240" style="width: 100%; height: 100%; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));" shape-rendering="geometricPrecision">
                <!-- Simplified DR Island Silhouette Path -->
                <path d="M 45,95 Q 60,60 110,55 Q 160,50 200,60 Q 230,40 270,45 Q 310,50 340,70 Q 380,75 420,80 Q 460,95 475,130 Q 480,165 440,175 Q 390,180 350,175 Q 310,180 270,185 Q 230,195 190,190 Q 150,185 115,200 Q 80,210 60,180 Q 40,150 45,95 Z" 
                      fill="rgba(30, 41, 59, 0.4)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
                
                <!-- Infrastructure Arteries (Autopista Duarte & Corredores) -->
                <!-- Autopista Duarte: Santo Domingo to Santiago to Monte Cristi -->
                <path d="M 260,160 L 210,95 L 110,60" fill="none" stroke="rgba(255, 184, 0, 0.35)" stroke-width="2" stroke-dasharray="4,4"/>
                <!-- Autopista del Este: Santo Domingo to Punta Cana -->
                <path d="M 260,160 L 340,165 L 440,140" fill="none" stroke="rgba(56, 189, 248, 0.35)" stroke-width="2" stroke-dasharray="4,4"/>
                <!-- Autovía del Sur: Santo Domingo to Barahona -->
                <path d="M 260,160 L 200,180 L 150,195" fill="none" stroke="rgba(16, 185, 129, 0.35)" stroke-width="2" stroke-dasharray="4,4"/>

                <!-- NODE 1: Matriz Km 22 (Santo Domingo Oeste) -->
                <g class="tmd-node" onclick="window.tmdSelectHub('km22')" style="cursor: pointer;">
                  <circle cx="260" cy="160" r="14" fill="rgba(255, 184, 0, 0.2)" />
                  <circle cx="260" cy="160" r="7" fill="#ffb800" stroke="#000" stroke-width="1.5" />
                  <text x="272" y="164" fill="#ffb800" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">Km 22 (Matriz)</text>
                </g>

                <!-- NODE 2: Hub Cibao (Santiago) -->
                <g class="tmd-node" onclick="window.tmdSelectHub('santiago')" style="cursor: pointer;">
                  <circle cx="210" cy="95" r="11" fill="rgba(16, 185, 129, 0.2)" />
                  <circle cx="210" cy="95" r="5.5" fill="#10b981" stroke="#000" stroke-width="1.5" />
                  <text x="220" y="99" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">Santiago</text>
                </g>

                <!-- NODE 3: Nodo Este (Punta Cana) -->
                <g class="tmd-node" onclick="window.tmdSelectHub('puntacana')" style="cursor: pointer;">
                  <circle cx="440" cy="140" r="11" fill="rgba(16, 185, 129, 0.2)" />
                  <circle cx="440" cy="140" r="5.5" fill="#10b981" stroke="#000" stroke-width="1.5" />
                  <text x="375" y="132" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">Punta Cana</text>
                </g>

                <!-- NODE 4: Base Sur (Barahona) -->
                <g class="tmd-node" onclick="window.tmdSelectHub('barahona')" style="cursor: pointer;">
                  <circle cx="150" cy="195" r="11" fill="rgba(16, 185, 129, 0.2)" />
                  <circle cx="150" cy="195" r="5.5" fill="#10b981" stroke="#000" stroke-width="1.5" />
                  <text x="160" y="205" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">Barahona</text>
                </g>
              </svg>
            </div>

            <!-- Active Hub Card Detail -->
            <div id="tmdActiveHubCard" style="
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 184, 0, 0.2);
              border-radius: 12px;
              padding: 12px 14px;
              font-size: 12px;
              margin-top: 8px;
            ">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: #ffb800; font-family: 'Space Grotesk', sans-serif;" id="tmdHubName">Matriz Km 22 (Santo Domingo Oeste)</strong>
                <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 2px 6px; border-radius: 4px;" id="tmdHubStatus">OPERATIVO 24/7</span>
              </div>
              <div style="color: #cbd5e1; font-size: 11px; margin-bottom: 4px;" id="tmdHubSpecs">18 bahías de servicio · Grúa puente 25T · Laboratorio diésel · Banco 6,000 PSI</div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94a3b8;">
                <span>SLA Respaldo: <span style="color: #f8fafc;" id="tmdHubSLA">&lt; 2h Santo Domingo</span></span>
                <a href="tel:+18098262222" style="color: #ffb800; text-decoration: none; font-weight: 700;">+1 809-826-2222 →</a>
              </div>
            </div>

          </div>

          <!-- RIGHT: 32-Province Travel Time & Dispatch Calculator -->
          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            
            <div>
              <div style="font-size: 12px; font-weight: 700; color: #ffb800; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; margin-bottom: 6px;">
                📍 ESTIMADOR DE FLETE &amp; AUXILIO EN OBRA
              </div>
              <p style="font-size: 12px; color: #94a3b8; margin: 0 0 14px; line-height: 1.4;">
                Selecciona la provincia de tu faena para calcular la distancia desde Km 22, horas de traslado en cama baja (Lowboy) y SLA de auxilio técnico.
              </p>

              <!-- Province Select Dropdown -->
              <label style="display: block; font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #cbd5e1; margin-bottom: 4px;">SELECCIONA PROVINCIA DE LA OBRA:</label>
              <select id="tmdProvinceSelect" onchange="window.tmdUpdateProvinceEstimate(this.value)" style="
                width: 100%;
                background: #0e1118;
                border: 1px solid rgba(255, 184, 0, 0.4);
                color: #f8fafc;
                padding: 10px 12px;
                border-radius: 10px;
                font-size: 13px;
                font-weight: 600;
                outline: none;
                margin-bottom: 16px;
                cursor: pointer;
              ">
                ${TMD_PROVINCES.map((p, idx) => `<option value="${idx}">${p.name} (${p.region})</option>`).join('')}
              </select>

              <!-- Dynamic Output Cards -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 10px; text-align: center;">
                  <div style="font-size: 10px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">DISTANCIA KM 22</div>
                  <div style="font-size: 20px; font-weight: 800; color: #ffb800; font-family: 'Space Grotesk', sans-serif;" id="tmdEstKm">12 km</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 10px; text-align: center;">
                  <div style="font-size: 10px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">FLETE LOWBOY</div>
                  <div style="font-size: 20px; font-weight: 800; color: #38bdf8; font-family: 'Space Grotesk', sans-serif;" id="tmdEstLowboy">0.8h</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 10px; text-align: center;">
                  <div style="font-size: 10px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">SLA AUXILIO VIAL</div>
                  <div style="font-size: 20px; font-weight: 800; color: #10b981; font-family: 'Space Grotesk', sans-serif;" id="tmdEstSLA">&lt; 1.5h</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 10px; text-align: center;">
                  <div style="font-size: 10px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">BASE DE DESPACHO</div>
                  <div style="font-size: 13px; font-weight: 700; color: #f8fafc; margin-top: 4px;" id="tmdEstBase">Matriz Km 22</div>
                </div>
              </div>
            </div>

            <!-- 1-Click WhatsApp Direct Dispatch CTA -->
            <a id="tmdDispatchBtn" href="https://wa.me/18098262222?text=Hola%20TMD,%20solicito%20cotizacion%20de%20flete/auxilio%20para%20la%20provincia%20de%20Santo%20Domingo" target="_blank" rel="noopener" style="
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              width: 100%;
              background: linear-gradient(135deg, #ffb800 0%, #f59e0b 100%);
              color: #000000;
              font-family: 'Space Grotesk', sans-serif;
              font-size: 14px;
              font-weight: 800;
              padding: 12px 16px;
              border-radius: 12px;
              text-decoration: none;
              text-transform: uppercase;
              box-shadow: 0 4px 16px rgba(255, 184, 0, 0.3);
              transition: all 0.2s ease;
            ">
              <span class="material-symbols-outlined" style="font-size: 18px;">local_shipping</span>
              <span id="tmdDispatchBtnText">Solicitar Despacho a Santo Domingo</span>
            </a>

          </div>

        </div>

      </div>
    `;
  }

  // ─── 4. GLOBAL INTERACTION HANDLERS ───
  window.tmdSelectHub = function(hubKey) {
    const hub = TMD_HUBS[hubKey];
    if (!hub) return;

    const nameEl = document.getElementById('tmdHubName');
    const statusEl = document.getElementById('tmdHubStatus');
    const specsEl = document.getElementById('tmdHubSpecs');
    const slaEl = document.getElementById('tmdHubSLA');

    if (nameEl) nameEl.textContent = hub.name;
    if (statusEl) statusEl.textContent = hub.status;
    if (specsEl) specsEl.textContent = hub.specs;
    if (slaEl) slaEl.textContent = hub.sla;
  };

  window.tmdUpdateProvinceEstimate = function(index) {
    const p = TMD_PROVINCES[parseInt(index, 10)];
    if (!p) return;

    const kmEl = document.getElementById('tmdEstKm');
    const lowboyEl = document.getElementById('tmdEstLowboy');
    const slaEl = document.getElementById('tmdEstSLA');
    const baseEl = document.getElementById('tmdEstBase');
    const btnEl = document.getElementById('tmdDispatchBtn');
    const btnTextEl = document.getElementById('tmdDispatchBtnText');

    if (kmEl) kmEl.textContent = p.km + ' km';
    if (lowboyEl) lowboyEl.textContent = p.lowboyHours;
    if (slaEl) slaEl.textContent = p.slaHours;
    
    const hubName = TMD_HUBS[p.hub] ? TMD_HUBS[p.hub].name.split('(')[0].trim() : 'Km 22';
    if (baseEl) baseEl.textContent = hubName;

    if (btnTextEl) btnTextEl.textContent = 'Solicitar Despacho a ' + p.name;
    if (btnEl) {
      const msg = encodeURIComponent(`Hola TMD Dominicana, necesito cotización de flete en Lowboy / auxilio técnico para maquinaria en la provincia de ${p.name} (Distancia estimada: ${p.km} km).`);
      btnEl.href = `https://wa.me/18098262222?text=${msg}`;
    }

    // Also highlight the corresponding hub on map
    window.tmdSelectHub(p.hub);
  };

  // ─── 5. AUTO-MOUNT HOOK ───
  window.tmdMountCoverageRadar = function(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (el) {
      renderRadarComponent(el);
    }
  };

  // Run on DOMContentLoaded or immediate if document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.tmdMountCoverageRadar('#tmd-interactive-coverage-radar');
    });
  } else {
    window.tmdMountCoverageRadar('#tmd-interactive-coverage-radar');
  }

})();
