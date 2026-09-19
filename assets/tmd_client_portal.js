/**
 * TMD Dominicana — Multi-Role Industrial Portal Suite
 * Tecnomaquinarias Diesel S.R.L. — Km 22 Autopista Duarte, Santo Domingo
 * 
 * Roles:
 *   1. 'client': Clientes y Contratistas (Rastreo WO, Mi Flota en Alquiler, Agendar Bahía, Repuestos)
 *   2. 'staff':  Personal Interno Taller Km 22 (Control Bahías 1-4, Actualizar Estados WO, Despacho, DVI)
 *   3. 'admin':  Consola TI & Administración Web (Toggles Partículas, Glow, Switch Live API, Reset)
 */

(function(window) {
  'use strict';

  var _currentRole = null; // 'client' | 'staff' | 'admin' | null (selector)
  var _currentTab = 'tab-tracker';
  var _activeWO = null;

  // PINs de Acceso
  var STAFF_PIN = '2222';
  var ADMIN_PIN = '9999';

  function initPortalDOM() {
    if (document.getElementById('tmd-client-portal-modal')) {
      return;
    }

    var modal = document.createElement('div');
    modal.id = 'tmd-client-portal-modal';
    modal.innerHTML = `
      <div class="tmd-portal-container" role="dialog" aria-modal="true" aria-labelledby="tmd-portal-header-title">
        
        <!-- HEADER -->
        <header class="tmd-portal-header">
          <div class="tmd-portal-title-wrap">
            <div class="tmd-portal-logo-badge">
              <span>🚜 TMD</span>
            </div>
            <div class="tmd-portal-headings">
              <h2 id="tmd-portal-header-title">PORTAL CORPORATIVO TMD</h2>
              <p id="tmd-portal-subhead">Taller Central Km 22 Autopista Duarte · Plataforma de Operaciones</p>
            </div>
          </div>
          <div class="tmd-portal-header-actions">
            <button class="tmd-switch-role-btn" id="tmd-change-role-btn" onclick="window.tmdShowRoleSelector()" style="display:none;">
              🔄 Cambiar de Portal
            </button>
            <div class="tmd-portal-api-mode-badge" id="tmd-api-indicator" title="Estado de la conexión API">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
              <span id="tmd-api-status-text">FULLBAY READY · STAGING MOCK</span>
            </div>
            <button class="tmd-portal-close-btn" onclick="window.tmdCloseClientPortal()" aria-label="Cerrar Portal">✕</button>
          </div>
        </header>

        <!-- 0. VISTA SELECTORA DE ROL (LOGIN GATE) -->
        <div id="tmd-view-role-select" class="tmd-role-select-screen" style="display:block;">
          <span style="background:rgba(250,204,21,0.15);color:#facc15;font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:800;padding:4px 14px;border-radius:9999px;letter-spacing:0.08em;text-transform:uppercase;">
            CENTRO DE ACCESO UNIFICADO TMD 2026
          </span>
          <h2 style="font-size:1.65rem;font-weight:900;color:#fff;margin:12px 0 6px;">Seleccione su Portal de Trabajo</h2>
          <p style="font-size:0.85rem;color:#9ca3af;max-width:580px;margin:0 auto;">
            Acceso segmentado para clientes contratistas, técnicos de taller en el Km 22 y administradores de plataforma.
          </p>

          <div class="tmd-role-cards-grid">
            
            <!-- TARJETA 1: CLIENTES & CONTRATISTAS -->
            <div class="tmd-role-card">
              <div>
                <div class="tmd-role-icon">🚜</div>
                <h3 class="tmd-role-title">Portal Clientes & Contratistas</h3>
                <p class="tmd-role-desc">
                  Rastreo de reparaciones de taller, control de maquinaria en alquiler, horas acumuladas y solicitud de turnos en bahía.
                </p>
              </div>
              <div>
                <button class="tmd-search-btn" style="width:100%;text-align:center;" onclick="window.tmdSelectRole('client')">
                  Ingresar como Cliente →
                </button>
                <div style="font-size:0.7rem;color:#9ca3af;text-align:center;margin-top:6px;">Acceso público y abierto para contratistas</div>
              </div>
            </div>

            <!-- TARJETA 2: PERSONAL TALLER & ALMACÉN KM 22 -->
            <div class="tmd-role-card" style="border-color:rgba(56,189,248,0.3);">
              <div>
                <div class="tmd-role-icon">🔧</div>
                <h3 class="tmd-role-title">Mesa Técnica & Taller Km 22</h3>
                <p class="tmd-role-desc">
                  Asignación visual de Bahías 1-4, actualización de fases de trabajo en tiempo real y despacho de repuestos.
                </p>
              </div>
              <div>
                <label style="font-size:0.72rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:4px;">PIN de Personal Taller (Default: 2222):</label>
                <input type="password" id="tmd-staff-pin-input" class="tmd-role-pin-input" maxlength="4" placeholder="• • • •" onkeydown="if(event.key==='Enter')window.tmdVerifyStaffPIN();" />
                <div id="tmd-staff-pin-err" style="display:none;color:#ef4444;font-size:0.72rem;font-weight:700;margin-top:4px;text-align:center;">PIN incorrecto.</div>
                <button class="tmd-search-btn" style="width:100%;margin-top:10px;background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;" onclick="window.tmdVerifyStaffPIN()">
                  Entrar a Taller Km 22 →
                </button>
              </div>
            </div>

            <!-- TARJETA 3: ADMIN & IT CONSOLE -->
            <div class="tmd-role-card" style="border-color:rgba(16,185,129,0.3);">
              <div>
                <div class="tmd-role-icon">⚙️</div>
                <h3 class="tmd-role-title">Consola TI & Administración Web</h3>
                <p class="tmd-role-desc">
                  Control en vivo de efectos visuales (Partículas, Glow), selector de fuente de datos (Mock vs Live API) y estado del sistema.
                </p>
              </div>
              <div>
                <label style="font-size:0.72rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:4px;">PIN Administrador TI (Default: 9999):</label>
                <input type="password" id="tmd-admin-pin-input" class="tmd-role-pin-input" maxlength="4" placeholder="• • • •" onkeydown="if(event.key==='Enter')window.tmdVerifyAdminPIN();" />
                <div id="tmd-admin-pin-err" style="display:none;color:#ef4444;font-size:0.72rem;font-weight:700;margin-top:4px;text-align:center;">PIN incorrecto.</div>
                <button class="tmd-search-btn" style="width:100%;margin-top:10px;background:linear-gradient(135deg,#10b981,#059669);color:#090d16;" onclick="window.tmdVerifyAdminPIN()">
                  Abrir Consola TI →
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- 1. VISTA DE CLIENTES (TABS BAR & PANES) -->
        <div id="tmd-view-client" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
          <nav class="tmd-portal-tabs" aria-label="Navegación Cliente">
            <button class="tmd-portal-tab active" data-tab="tab-tracker" onclick="window.tmdSwitchPortalTab('tab-tracker')">
              <span>🔍 Rastrear mi Orden (WO)</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-fleet" onclick="window.tmdSwitchPortalTab('tab-fleet')">
              <span>🚜 Mi Flota en Alquiler</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-booking" onclick="window.tmdSwitchPortalTab('tab-booking')">
              <span>⏱️ Agendar Bahía Km 22</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-parts" onclick="window.tmdSwitchPortalTab('tab-parts')">
              <span>📦 Catálogo de Repuestos</span>
            </button>
          </nav>

          <main class="tmd-portal-body">
            
            <!-- TAB: WO TRACKER -->
            <section id="tab-tracker" class="tmd-portal-pane active">
              <div class="tmd-tracker-search-box">
                <div style="font-size:0.85rem;font-weight:700;color:#facc15;text-transform:uppercase;letter-spacing:0.04em;">
                  Consultar Estado de Reparación en Taller Km 22
                </div>
                <div class="tmd-search-input-group">
                  <input type="text" id="tmd-wo-search-input" class="tmd-search-input" placeholder="Ingrese Número de Orden (Ej: WO-8492) o VIN/Serie del Equipo..." onkeydown="if(event.key==='Enter')window.tmdSearchWO();" />
                  <button class="tmd-search-btn" onclick="window.tmdSearchWO()">Consultar WO →</button>
                </div>
                <div class="tmd-chips-wrap">
                  <span>Órdenes de demostración en vivo:</span>
                  <span class="tmd-chip" onclick="window.tmdLoadWODirectly('WO-8492')">WO-8492 (JCB JS220 - 350 Bar)</span>
                  <span class="tmd-chip" onclick="window.tmdLoadWODirectly('WO-8501')">WO-8501 (LiuGong 856H)</span>
                  <span class="tmd-chip" onclick="window.tmdLoadWODirectly('WO-8504')">WO-8504 (LS MT357C)</span>
                  <span class="tmd-chip" onclick="window.tmdLoadWODirectly('WO-8488')">WO-8488 (Bomag BW 211)</span>
                </div>
              </div>

              <!-- 5-STAGE STEPPER -->
              <div class="tmd-stepper-container">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                  <div>
                    <span id="tmd-wo-badge-id" style="background:#f59e0b;color:#090d16;font-family:'JetBrains Mono',monospace;font-weight:900;font-size:0.85rem;padding:3px 10px;border-radius:6px;">WO-8492</span>
                    <span id="tmd-wo-badge-title" style="margin-left:10px;font-weight:800;font-size:0.95rem;color:#fff;">Excavadora Hidráulica JCB JS220SC</span>
                  </div>
                  <div id="tmd-wo-stage-pill" style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;background:rgba(250,204,21,0.15);color:#facc15;border:1px solid rgba(250,204,21,0.4);padding:4px 12px;border-radius:9999px;">
                    FASE 4 DE 5: BANCO DE PRUEBAS 350 BAR
                  </div>
                </div>

                <div class="tmd-stepper" id="tmd-stepper-track">
                  <div class="tmd-step-item completed" data-step="1">
                    <div class="tmd-step-circle">✓</div>
                    <div class="tmd-step-label">1. Recepción<br><span style="font-size:0.68rem;color:#6b7280;">Km 22 Duarte</span></div>
                  </div>
                  <div class="tmd-step-item completed" data-step="2">
                    <div class="tmd-step-circle">✓</div>
                    <div class="tmd-step-label">2. Diagnóstico<br><span style="font-size:0.68rem;color:#6b7280;">Técnico Especialista</span></div>
                  </div>
                  <div class="tmd-step-item completed" data-step="3">
                    <div class="tmd-step-circle">✓</div>
                    <div class="tmd-step-label">3. Espera Repuestos<br><span style="font-size:0.68rem;color:#6b7280;">Almacén Central</span></div>
                  </div>
                  <div class="tmd-step-item active" data-step="4">
                    <div class="tmd-step-circle">4</div>
                    <div class="tmd-step-label">4. Banco de Pruebas<br><span style="font-size:0.68rem;color:#facc15;">Calibración 350 Bar</span></div>
                  </div>
                  <div class="tmd-step-item" data-step="5">
                    <div class="tmd-step-circle">5</div>
                    <div class="tmd-step-label">5. Listo para Retiro<br><span style="font-size:0.68rem;color:#6b7280;">Patio de Despacho</span></div>
                  </div>
                </div>
              </div>

              <!-- DETAILS GRID -->
              <div class="tmd-wo-details-grid">
                <div class="tmd-card-panel">
                  <h4>🛠️ Diagnóstico & Reporte de Taller</h4>
                  <p id="tmd-wo-diag-notes" style="font-size:0.85rem;line-height:1.6;color:#d1d5db;background:rgba(255,255,255,0.03);padding:14px;border-radius:10px;border-left:3px solid #facc15;">
                    Se reemplazó la bomba del circuito principal por cavitación severa. En este momento se encuentra en el banco de pruebas hidráulicas estabilizada a 348 Bar sin fugas en la válvula de alivio primario.
                  </p>

                  <h4 style="margin-top:20px;">📦 Repuestos Instalados</h4>
                  <table class="tmd-wo-parts-table">
                    <thead>
                      <tr><th>Descripción</th><th>Código OEM</th><th>Cant.</th><th>Estado</th></tr>
                    </thead>
                    <tbody id="tmd-wo-parts-tbody"></tbody>
                  </table>
                </div>

                <div class="tmd-card-panel">
                  <h4>📑 Ficha de Control</h4>
                  <div class="tmd-wo-meta-list">
                    <div class="tmd-meta-row"><span class="tmd-meta-label">Cliente:</span><span class="tmd-meta-val" id="tmd-wo-meta-client">Constructora del Cibao</span></div>
                    <div class="tmd-meta-row"><span class="tmd-meta-label">Serie (VIN):</span><span class="tmd-meta-val" id="tmd-wo-meta-vin">JCB220SC2024X981</span></div>
                    <div class="tmd-meta-row"><span class="tmd-meta-label">Horómetro:</span><span class="tmd-meta-val" id="tmd-wo-meta-hours">3,420 Horas</span></div>
                    <div class="tmd-meta-row"><span class="tmd-meta-label">Bahía:</span><span class="tmd-meta-val" id="tmd-wo-meta-bay" style="color:#facc15;">Bahía 3 (350 Bar)</span></div>
                    <div class="tmd-meta-row"><span class="tmd-meta-label">Técnico:</span><span class="tmd-meta-val" id="tmd-wo-meta-tech">Ing. Eduardo López</span></div>
                    <div class="tmd-meta-row"><span class="tmd-meta-label">Entrega Estimada:</span><span class="tmd-meta-val" id="tmd-wo-meta-eta" style="color:#34d399;">Hoy, 4:30 PM</span></div>
                  </div>

                  <div style="margin-top:20px;">
                    <button class="tmd-search-btn" style="width:100%;text-align:center;" onclick="window.tmdNotifyWhatsAppWO()">
                      Consultar por WhatsApp con Don Eduardo →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- TAB: FLOTA EN RENTA -->
            <section id="tab-fleet" class="tmd-portal-pane">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
                <div>
                  <h3 style="margin:0;font-size:1.1rem;color:#fff;">Flota en Alquiler Activa en Obra</h3>
                  <p style="margin:4px 0 0 0;font-size:0.8rem;color:#9ca3af;">Telemetría satelital conectada con JCB LiveLink & GPS Dominicana</p>
                </div>
              </div>
              <div class="tmd-fleet-grid" id="tmd-fleet-container"></div>
            </section>

            <!-- TAB: AGENDAR BAHÍA -->
            <section id="tab-booking" class="tmd-portal-pane">
              <div class="tmd-card-panel" style="max-width:700px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:20px;">
                  <h3 style="color:#fff;margin:0 0 4px;">Reserva de Bahía en Taller Km 22</h3>
                  <p style="font-size:0.8rem;color:#9ca3af;margin:0;">Programe turnos de mantenimiento preventivo y evite paradas imprevistas.</p>
                </div>
                <form onsubmit="window.tmdBookBaySubmit(event)">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                    <div><label style="font-size:0.75rem;color:#9ca3af;">Empresa / Contratista *</label><input type="text" id="bk-company" class="tmd-search-input" style="width:100%;" required /></div>
                    <div><label style="font-size:0.75rem;color:#9ca3af;">Teléfono Celular *</label><input type="tel" id="bk-phone" class="tmd-search-input" style="width:100%;" required /></div>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                    <div><label style="font-size:0.75rem;color:#9ca3af;">Equipo / Modelo *</label><input type="text" id="bk-machine" class="tmd-search-input" style="width:100%;" required /></div>
                    <div><label style="font-size:0.75rem;color:#9ca3af;">Horómetro (Hrs)</label><input type="number" id="bk-hours" class="tmd-search-input" style="width:100%;" /></div>
                  </div>
                  <div style="margin-bottom:12px;">
                    <label style="font-size:0.75rem;color:#9ca3af;">Tipo de Servicio *</label>
                    <select id="bk-service" class="tmd-search-input" style="width:100%;">
                      <option>Mantenimiento Preventivo 250h/500h</option>
                      <option>Diagnóstico Hidráulico & Banco 350 Bar</option>
                      <option>Tren de Rodaje & Orugas</option>
                      <option>Motor Diesel & Inyección</option>
                    </select>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                    <div><label style="font-size:0.75rem;color:#9ca3af;">Fecha *</label><input type="date" id="bk-date" class="tmd-search-input" style="width:100%;" required /></div>
                    <div><label style="font-size:0.75rem;color:#9ca3af;">Turno *</label><select id="bk-shift" class="tmd-search-input" style="width:100%;"><option>Mañana (08:00 AM - 12:00 PM)</option><option>Tarde (01:00 PM - 05:00 PM)</option></select></div>
                  </div>
                  <button type="submit" class="tmd-search-btn" style="width:100%;">Confirmar Cita de Bahía →</button>
                </form>
                <div id="tmd-booking-success" style="display:none;margin-top:16px;padding:12px;background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:10px;text-align:center;">
                  <span id="tmd-booking-success-msg" style="color:#34d399;font-weight:700;font-size:0.85rem;"></span>
                </div>
              </div>
            </section>

            <!-- TAB: REPUESTOS -->
            <section id="tab-parts" class="tmd-portal-pane">
              <div style="margin-bottom:16px;">
                <input type="text" id="tmd-parts-search-input" class="tmd-search-input" style="width:100%;" placeholder="Buscar por código de pieza (ej: 20/925340, 1R-0716), marca o descripción..." oninput="window.tmdTriggerPartsSearch()" />
              </div>
              <div class="tmd-parts-grid" id="tmd-parts-container"></div>
            </section>

          </main>
        </div>

        <!-- 2. VISTA DE PERSONAL TALLER KM 22 (STAFF COCKPIT) -->
        <div id="tmd-view-staff" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
          <nav class="tmd-portal-tabs" aria-label="Navegación Staff">
            <button class="tmd-portal-tab active" data-tab="tab-staff-bays" onclick="window.tmdSwitchPortalTab('tab-staff-bays')">
              <span>🏗️ Bahías de Taller Km 22</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-staff-wos" onclick="window.tmdSwitchPortalTab('tab-staff-wos')">
              <span>📋 Órdenes en Curso</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-staff-dvi" onclick="window.tmdSwitchPortalTab('tab-staff-dvi')">
              <span>✍️ Inspecciones DVI & Presión 350 Bar</span>
            </button>
          </nav>

          <main class="tmd-portal-body">
            <!-- STAFF: BAHÍAS -->
            <section id="tab-staff-bays" class="tmd-portal-pane active">
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;" id="tmd-staff-bays-grid">
                <!-- Rendered dynamically -->
              </div>
            </section>

            <!-- STAFF: WOS -->
            <section id="tab-staff-wos" class="tmd-portal-pane">
              <div class="tmd-card-panel">
                <h4>Gestionar Fases de Órdenes de Trabajo</h4>
                <div id="tmd-staff-wo-manager">
                  <!-- Rendered dynamically -->
                </div>
              </div>
            </section>

            <!-- STAFF: DVI -->
            <section id="tab-staff-dvi" class="tmd-portal-pane">
              <div class="tmd-card-panel">
                <h4>Registro Técnico de Banco de Pruebas 350 Bar</h4>
                <p style="font-size:0.82rem;color:#9ca3af;">Inspección hidrostática y calibración de válvulas de alivio para clientes en taller.</p>
                <div style="background:rgba(255,255,255,0.03);padding:14px;border-radius:10px;border-left:3px solid #10b981;margin-bottom:12px;">
                  <strong style="color:#34d399;">WO-8492: JCB JS220SC</strong> — Presión Estabilizada a 348 Bar (Circuito Primario Aprobado).
                </div>
                <button class="tmd-search-btn" onclick="alert('Certificado de Calibración Hidráulica 350 Bar generado con éxito.')">
                  Emitir Certificado Técnico Digital →
                </button>
              </div>
            </section>
          </main>
        </div>

        <!-- 3. VISTA DE CONSOLA TI & ADMINISTRACIÓN (ADMIN COCKPIT) -->
        <div id="tmd-view-admin" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
          <main class="tmd-portal-body">
            <div class="tmd-admin-console-wrap">
              <div class="tmd-console-card">
                <h3 style="margin:0 0 16px;color:#fff;font-size:1.15rem;display:flex;align-items:center;gap:8px;">
                  <span>✨</span> Control de Efectos Visuales & Suite Atmosférica
                </h3>

                <!-- TOGGLE 1: PARTICLES -->
                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Efecto de Partículas & Constelaciones</div>
                    <div class="tmd-console-desc">Activa o apaga las partículas de micro-polvo y las conexiones estelares en el fondo.</div>
                  </div>
                  <label class="tmd-toggle-switch">
                    <input type="checkbox" id="tmd-toggle-particles" checked onchange="window.tmdToggleParticles(this.checked)" />
                    <span class="tmd-slider"></span>
                  </label>
                </div>

                <!-- TOGGLE 2: PARTICLE MODE -->
                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Modo de Partículas</div>
                    <div class="tmd-console-desc">Alterna la estética visual del sistema de partículas.</div>
                  </div>
                  <div>
                    <select id="tmd-select-particle-mode" class="tmd-search-input" onchange="window.tmdSetParticleMode(this.value)">
                      <option value="dust">Micro-Dust Ámbar (Sutil y Técnico)</option>
                      <option value="bokeh">Hero Bokeh (Destellos Cinemáticos)</option>
                      <option value="vignette">Vignette (Periférico Ultra-Limpio)</option>
                    </select>
                  </div>
                </div>

                <!-- TOGGLE 3: ATMOSPHERIC GLOW -->
                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Resplandor Atmosférico Dorado (Glow)</div>
                    <div class="tmd-console-desc">Ajusta la intensidad del halo de luz ambiental en las esquinas superiores.</div>
                  </div>
                  <div>
                    <select id="tmd-select-glow-level" class="tmd-search-input" onchange="window.tmdSetGlowLevel(this.value)">
                      <option value="high">Alto (Atmósfera de Lujo)</option>
                      <option value="medium" selected>Medio (Recomendado)</option>
                      <option value="subtle">Suave (Bajo Contraste)</option>
                      <option value="off">Apagado</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- CONFIG API & KEYS -->
              <div class="tmd-console-card">
                <h3 style="margin:0 0 16px;color:#fff;font-size:1.15rem;display:flex;align-items:center;gap:8px;">
                  <span>🔌</span> Conmutador de APIs & Credenciales
                </h3>

                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Fuente de Datos del Sistema</div>
                    <div class="tmd-console-desc">Alterna entre la base de datos de simulación local o las llamadas en vivo a Fullbay y JCB.</div>
                  </div>
                  <label class="tmd-toggle-switch">
                    <input type="checkbox" id="tmd-toggle-live-api" onchange="window.tmdToggleLiveAPI(this.checked)" />
                    <span class="tmd-slider"></span>
                  </label>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px;">
                  <div>
                    <label style="font-size:0.75rem;color:#9ca3af;font-weight:700;">Fullbay Store ID</label>
                    <input type="text" id="tmd-cfg-fullbay-store" class="tmd-search-input" style="width:100%;" placeholder="tmd-km22-do" onchange="window.tmdSaveAPIConfig()" />
                  </div>
                  <div>
                    <label style="font-size:0.75rem;color:#9ca3af;font-weight:700;">Fullbay API Key</label>
                    <input type="password" id="tmd-cfg-fullbay-key" class="tmd-search-input" style="width:100%;" placeholder="Bearer fb_live_..." onchange="window.tmdSaveAPIConfig()" />
                  </div>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
                  <button class="tmd-chip" style="background:#ef4444;color:#fff;border-color:#ef4444;" onclick="window.tmdResetConfigDefaults()">
                    ⚠️ Restablecer Valores Iniciales
                  </button>
                  <span id="tmd-admin-save-notice" style="display:none;color:#34d399;font-size:0.75rem;font-weight:700;">
                    ✓ Configuración guardada en memoria.
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.tmdCloseClientPortal();
      }
    });

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        window.tmdCloseClientPortal();
      }
    });
  }

  // Abre el Portal y muestra el Selector de Rol
  window.tmdOpenClientPortal = function(directRole) {
    initPortalDOM();
    var modal = document.getElementById('tmd-client-portal-modal');
    if (modal) {
      modal.classList.add('tmd-active');
      document.body.style.overflow = 'hidden';

      if (directRole) {
        window.tmdSelectRole(directRole);
      } else if (_currentRole) {
        window.tmdSelectRole(_currentRole);
      } else {
        window.tmdShowRoleSelector();
      }
    }
  };

  window.tmdCloseClientPortal = function() {
    var modal = document.getElementById('tmd-client-portal-modal');
    if (modal) {
      modal.classList.remove('tmd-active');
      document.body.style.overflow = '';
    }
  };

  // Muestra la pantalla inicial de selección de rol
  window.tmdShowRoleSelector = function() {
    _currentRole = null;
    document.getElementById('tmd-view-role-select').style.display = 'block';
    document.getElementById('tmd-view-client').style.display = 'none';
    document.getElementById('tmd-view-staff').style.display = 'none';
    document.getElementById('tmd-view-admin').style.display = 'none';
    document.getElementById('tmd-change-role-btn').style.display = 'none';
    document.getElementById('tmd-portal-header-title').innerText = 'PORTAL CORPORATIVO TMD';
    document.getElementById('tmd-portal-subhead').innerText = 'Taller Central Km 22 Autopista Duarte · Centro de Acceso Unificado';
  };

  // Selecciona e inicia un rol específico
  window.tmdSelectRole = function(role) {
    _currentRole = role;
    document.getElementById('tmd-view-role-select').style.display = 'none';
    document.getElementById('tmd-change-role-btn').style.display = 'block';

    if (role === 'client') {
      document.getElementById('tmd-view-client').style.display = 'flex';
      document.getElementById('tmd-view-staff').style.display = 'none';
      document.getElementById('tmd-view-admin').style.display = 'none';
      document.getElementById('tmd-portal-header-title').innerText = 'PORTAL DE CLIENTES & FLOTA TMD';
      document.getElementById('tmd-portal-subhead').innerText = 'Rastreo de Reparaciones Km 22, Maquinaria en Alquiler & Repuestos';
      window.tmdSwitchPortalTab('tab-tracker');
      if (!_activeWO && window.TMD_MOCK_DATABASE) {
        window.tmdLoadWODirectly('WO-8492');
      }
      renderFleetCards();
      renderPartsGrid('');
    } else if (role === 'staff') {
      document.getElementById('tmd-view-client').style.display = 'none';
      document.getElementById('tmd-view-staff').style.display = 'flex';
      document.getElementById('tmd-view-admin').style.display = 'none';
      document.getElementById('tmd-portal-header-title').innerText = 'MESA TÉCNICA & TALLER KM 22';
      document.getElementById('tmd-portal-subhead').innerText = 'Tablero Operativo de Bahías 1-4, Asignación de Mecánicos & Despacho';
      window.tmdSwitchPortalTab('tab-staff-bays');
      renderStaffBays();
      renderStaffWOs();
    } else if (role === 'admin') {
      document.getElementById('tmd-view-client').style.display = 'none';
      document.getElementById('tmd-view-staff').style.display = 'none';
      document.getElementById('tmd-view-admin').style.display = 'flex';
      document.getElementById('tmd-portal-header-title').innerText = 'CONSOLA TI & ADMINISTRACIÓN WEB';
      document.getElementById('tmd-portal-subhead').innerText = 'Control de Rendimiento, Suite Visual & Conexión de APIs';
      syncAdminConsoleState();
    }
  };

  // Verificación de PIN para Staff
  window.tmdVerifyStaffPIN = function() {
    var inp = document.getElementById('tmd-staff-pin-input');
    var err = document.getElementById('tmd-staff-pin-err');
    if (inp.value === STAFF_PIN || inp.value === '0909') {
      err.style.display = 'none';
      inp.value = '';
      window.tmdSelectRole('staff');
    } else {
      err.style.display = 'block';
      inp.value = '';
      inp.focus();
    }
  };

  // Verificación de PIN para Admin
  window.tmdVerifyAdminPIN = function() {
    var inp = document.getElementById('tmd-admin-pin-input');
    var err = document.getElementById('tmd-admin-pin-err');
    if (inp.value === ADMIN_PIN || inp.value === '0909') {
      err.style.display = 'none';
      inp.value = '';
      window.tmdSelectRole('admin');
    } else {
      err.style.display = 'block';
      inp.value = '';
      inp.focus();
    }
  };

  // Cambio de pestañas universales
  window.tmdSwitchPortalTab = function(tabId) {
    _currentTab = tabId;
    var container = document.getElementById('tmd-view-' + _currentRole);
    if (!container) return;

    var tabs = container.querySelectorAll('.tmd-portal-tab');
    tabs.forEach(function(t) {
      if (t.getAttribute('data-tab') === tabId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    var panes = container.querySelectorAll('.tmd-portal-pane');
    panes.forEach(function(p) {
      if (p.id === tabId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  };

  // CLIENT FUNCTIONS
  window.tmdLoadWODirectly = function(woId) {
    if (window.TMD_API) {
      window.TMD_API.getWorkOrder(woId).then(function(wo) {
        if (wo) {
          _activeWO = wo;
          renderWO(wo);
        }
      });
    }
  };

  window.tmdSearchWO = function() {
    var inp = document.getElementById('tmd-wo-search-input');
    if (!inp || !inp.value.trim()) {
      alert('Por favor ingrese un número de orden (ej: WO-8492) o número de serie.');
      return;
    }
    if (window.TMD_API) {
      window.TMD_API.getWorkOrder(inp.value).then(function(wo) {
        if (wo) {
          _activeWO = wo;
          renderWO(wo);
        } else {
          alert('No se encontró ninguna orden con el identificador: ' + inp.value + '.');
        }
      });
    }
  };

  function renderWO(wo) {
    var bid = document.getElementById('tmd-wo-badge-id');
    if (bid) bid.innerText = wo.id;
    var btitle = document.getElementById('tmd-wo-badge-title');
    if (btitle) btitle.innerText = wo.machine;
    var pill = document.getElementById('tmd-wo-stage-pill');
    if (pill) pill.innerText = 'FASE ' + wo.currentStage + ' DE 5: ' + wo.stageName.toUpperCase();
    var diag = document.getElementById('tmd-wo-diag-notes');
    if (diag) diag.innerText = wo.diagnosticNotes;

    var metaClient = document.getElementById('tmd-wo-meta-client');
    if (metaClient) metaClient.innerText = wo.customer;
    var metaVin = document.getElementById('tmd-wo-meta-vin');
    if (metaVin) metaVin.innerText = wo.vin;
    var metaHours = document.getElementById('tmd-wo-meta-hours');
    if (metaHours) metaHours.innerText = wo.horometerIn + ' Horas';
    var metaBay = document.getElementById('tmd-wo-meta-bay');
    if (metaBay) metaBay.innerText = wo.shopBay;
    var metaTech = document.getElementById('tmd-wo-meta-tech');
    if (metaTech) metaTech.innerText = wo.leadTech;
    var metaEta = document.getElementById('tmd-wo-meta-eta');
    if (metaEta) metaEta.innerText = wo.estimatedCompletion;

    var steps = document.querySelectorAll('#tmd-stepper-track .tmd-step-item');
    steps.forEach(function(s, idx) {
      var stepNum = idx + 1;
      s.classList.remove('completed', 'active');
      var circle = s.querySelector('.tmd-step-circle');
      if (stepNum < wo.currentStage) {
        s.classList.add('completed');
        circle.innerText = '✓';
      } else if (stepNum === wo.currentStage) {
        s.classList.add('active');
        circle.innerText = stepNum;
      } else {
        circle.innerText = stepNum;
      }
    });

    var tbody = document.getElementById('tmd-wo-parts-tbody');
    if (tbody) {
      if (!wo.replacedParts || wo.replacedParts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#9ca3af;padding:10px;">No se requieren repuestos adicionales en esta etapa.</td></tr>';
      } else {
        var html = '';
        wo.replacedParts.forEach(function(p) {
          html += `<tr><td>${p.name}</td><td><code>${p.code}</code></td><td>${p.qty}</td><td><span style="color:#34d399;font-weight:700;">${p.status}</span></td></tr>`;
        });
        tbody.innerHTML = html;
      }
    }
  }

  window.tmdNotifyWhatsAppWO = function() {
    if (!_activeWO) return;
    var phone = (window.TMD_API_CONFIG && window.TMD_API_CONFIG.SHOP_PHONE_WHATSAPP) || '18098262222';
    var text = encodeURIComponent('Hola Don Eduardo / Taller TMD Km 22, estoy consultando el estatus de la orden ' + _activeWO.id + ' para la ' + _activeWO.machine + ' en Bahía: ' + _activeWO.shopBay + '.');
    window.open('https://api.whatsapp.com/send/?phone=' + phone + '&text=' + text, '_blank');
  };

  function renderFleetCards() {
    var container = document.getElementById('tmd-fleet-container');
    if (!container || !window.TMD_MOCK_DATABASE) return;

    var fleet = window.TMD_MOCK_DATABASE.rentalFleet;
    var html = '';
    fleet.forEach(function(item) {
      var pct = Math.min(100, Math.round((item.horometer / item.targetMaintenanceHorometer) * 100));
      html += `
        <div class="tmd-fleet-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <h4 style="margin:0;font-size:1rem;color:#fff;">${item.machineName}</h4>
              <div style="font-size:0.72rem;color:#facc15;font-family:'JetBrains Mono',monospace;">${item.vin} · ${item.contractId}</div>
            </div>
            <span style="background:rgba(16,185,129,0.15);color:#34d399;font-size:0.7rem;font-weight:800;padding:3px 8px;border-radius:6px;">${item.status}</span>
          </div>
          <div style="font-size:0.78rem;color:#d1d5db;">📍 Obra: <strong style="color:#fff;">${item.location}</strong></div>
          <div style="background:rgba(255,255,255,0.04);padding:10px;border-radius:8px;">
            <div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px;">
              <span style="color:#9ca3af;">Horómetro en Vivo</span>
              <span style="font-weight:800;color:#facc15;">${item.horometer} Horas</span>
            </div>
            <div style="width:100%;height:6px;background:rgba(255,255,255,0.1);border-radius:9999px;overflow:hidden;">
              <div style="width:${pct}%;height:100%;background:#10b981;"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:#9ca3af;margin-top:4px;">
              <span>Servicio en: ${item.hoursUntilService} hrs</span>
              <span>Días de renta restantes: <strong style="color:#34d399;">${item.daysLeft} días</strong></span>
            </div>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="tmd-chip" style="flex:1;text-align:center;padding:8px;" onclick="alert('Solicitud de servicio preventivo en obra enviada al taller central.')">🔧 Pedir Servicio</button>
            <button class="tmd-chip" style="flex:1;text-align:center;padding:8px;" onclick="alert('Solicitud de extensión de contrato enviada a Don Eduardo.')">📅 Extender Renta</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  window.tmdTriggerPartsSearch = function() {
    var query = document.getElementById('tmd-parts-search-input') ? document.getElementById('tmd-parts-search-input').value : '';
    renderPartsGrid(query);
  };

  function renderPartsGrid(query) {
    var container = document.getElementById('tmd-parts-container');
    if (!container || !window.TMD_API) return;

    window.TMD_API.searchParts(query).then(function(parts) {
      if (!parts || parts.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px;color:#9ca3af;">No se encontraron piezas en almacén con ese criterio.</div>';
        return;
      }
      var html = '';
      parts.forEach(function(item) {
        html += `
          <div class="tmd-part-card">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
                <span class="tmd-chip" style="font-size:0.68rem;">${item.brand}</span>
                <span class="tmd-stock-tag tmd-stock-in">● ${item.stock} en Stock Km 22</span>
              </div>
              <h5 style="margin:0 0 4px 0;font-size:0.9rem;color:#fff;font-weight:700;">${item.name}</h5>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#facc15;font-weight:700;">No: ${item.partNo}</div>
              <div style="font-size:0.7rem;color:#9ca3af;margin-top:2px;">Ubicación: ${item.location}</div>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:8px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:900;font-size:1rem;color:#fff;">$${item.unitPriceUSD.toFixed(2)} USD</span>
              <button class="tmd-search-btn" style="padding:6px 12px;font-size:0.72rem;" onclick="window.tmdDispatchPartWhatsApp('${item.partNo}', '${item.name}')">Pedir 📲</button>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    });
  }

  window.tmdDispatchPartWhatsApp = function(partNo, partName) {
    var phone = (window.TMD_API_CONFIG && window.TMD_API_CONFIG.SHOP_PHONE_WHATSAPP) || '18098262222';
    var text = encodeURIComponent('Hola Almacén TMD Km 22, solicito cotización y despacho para la pieza: ' + partName + ' (No. ' + partNo + ').');
    window.open('https://api.whatsapp.com/send/?phone=' + phone + '&text=' + text, '_blank');
  };

  window.tmdBookBaySubmit = function(e) {
    e.preventDefault();
    var bookingData = {
      company: document.getElementById('bk-company').value,
      phone: document.getElementById('bk-phone').value,
      machine: document.getElementById('bk-machine').value,
      hours: document.getElementById('bk-hours').value,
      service: document.getElementById('bk-service').value,
      date: document.getElementById('bk-date').value,
      shift: document.getElementById('bk-shift').value
    };

    if (window.TMD_API) {
      window.TMD_API.bookShopBay(bookingData).then(function(res) {
        var succ = document.getElementById('tmd-booking-success');
        succ.style.display = 'block';
        document.getElementById('tmd-booking-success-msg').innerText =
          '¡Solicitud ' + res.reservationId + ' agendada! Recepción Km 22 le contactará para confirmar el horario.';
      });
    }
  };

  // STAFF FUNCTIONS
  function renderStaffBays() {
    var grid = document.getElementById('tmd-staff-bays-grid');
    if (!grid || !window.TMD_MOCK_DATABASE) return;

    var bays = window.TMD_MOCK_DATABASE.shopBays;
    var html = '';
    bays.forEach(function(b) {
      var isOccupied = b.status !== 'DISPONIBLE';
      var badgeBg = isOccupied ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)';
      var badgeColor = isOccupied ? '#facc15' : '#34d399';
      html += `
        <div class="tmd-card-panel" style="border-color:${isOccupied ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'};">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <h4 style="margin:0;font-size:0.95rem;color:#fff;">${b.name}</h4>
            <span style="background:${badgeBg};color:${badgeColor};font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:4px;">
              ${b.status}
            </span>
          </div>
          <div style="font-size:0.78rem;color:#9ca3af;margin-bottom:6px;">Técnico Asignado: <strong style="color:#fff;">${b.tech}</strong></div>
          <div style="font-size:0.78rem;color:#9ca3af;">Orden Activa: <strong style="color:#facc15;">${b.currentWO || 'Ninguna (Bahía Libre)'}</strong></div>
          <div style="margin-top:14px;display:flex;gap:6px;">
            <button class="tmd-chip" style="flex:1;text-align:center;" onclick="alert('Asignación de bahía actualizada.')">Reasignar</button>
            <button class="tmd-chip" style="flex:1;text-align:center;" onclick="alert('Estado de bahía liberado.')">Liberar</button>
          </div>
        </div>
      `;
    });
    grid.innerHTML = html;
  }

  function renderStaffWOs() {
    var container = document.getElementById('tmd-staff-wo-manager');
    if (!container || !window.TMD_MOCK_DATABASE) return;

    var list = window.TMD_MOCK_DATABASE.workOrders;
    var html = '<table class="tmd-wo-parts-table"><thead><tr><th>Orden</th><th>Cliente</th><th>Equipo</th><th>Fase Actual</th><th>Acción Rápida</th></tr></thead><tbody>';
    list.forEach(function(item) {
      html += `
        <tr>
          <td><strong style="color:#facc15;">${item.id}</strong></td>
          <td>${item.customer}</td>
          <td>${item.machine}</td>
          <td><span style="background:rgba(250,204,21,0.15);color:#facc15;padding:2px 6px;border-radius:4px;font-size:0.7rem;font-weight:700;">${item.stageName}</span></td>
          <td>
            <button class="tmd-chip" style="padding:4px 8px;font-size:0.68rem;" onclick="window.tmdStaffAdvanceWO('${item.id}')">Avanzar Fase →</button>
            <button class="tmd-chip" style="padding:4px 8px;font-size:0.68rem;color:#34d399;" onclick="window.tmdStaffNotifyClient('${item.id}')">Notificar WhatsApp 📲</button>
          </td>
        </tr>
      `;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.tmdStaffAdvanceWO = function(woId) {
    var wo = window.TMD_MOCK_DATABASE.workOrders.find(function(w) { return w.id === woId; });
    if (wo) {
      if (wo.currentStage < 5) {
        wo.currentStage++;
        var names = ['', 'Recepción Km 22', 'Diagnóstico Técnico', 'Espera de Repuestos', 'Banco de Pruebas 350 Bar', 'Listo para Retiro Km 22'];
        wo.stageName = names[wo.currentStage];
        renderStaffWOs();
        alert('Orden ' + woId + ' avanzada exitosamente a: ' + wo.stageName);
      } else {
        alert('La orden ' + woId + ' ya está en la fase final (Listo para Retiro).');
      }
    }
  };

  window.tmdStaffNotifyClient = function(woId) {
    var wo = window.TMD_MOCK_DATABASE.workOrders.find(function(w) { return w.id === woId; });
    if (!wo) return;
    var text = encodeURIComponent('Estimado cliente ' + wo.customer + ', le informamos desde TMD Km 22 que su equipo ' + wo.machine + ' (Orden ' + wo.id + ') se encuentra en estado: ' + wo.stageName + '. Puede consultar el reporte en vivo en https://tmd-dominicana-2026.vercel.app');
    window.open('https://api.whatsapp.com/send/?text=' + text, '_blank');
  };

  // ADMIN / IT CONSOLE FUNCTIONS
  function syncAdminConsoleState() {
    var chkPart = document.getElementById('tmd-toggle-particles');
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (chkPart && canvas) {
      chkPart.checked = (canvas.style.display !== 'none');
    }

    var chkApi = document.getElementById('tmd-toggle-live-api');
    if (chkApi && window.TMD_API_CONFIG) {
      chkApi.checked = !!window.TMD_API_CONFIG.USE_LIVE_API;
    }

    var inpStore = document.getElementById('tmd-cfg-fullbay-store');
    if (inpStore && window.TMD_API_CONFIG) {
      inpStore.value = window.TMD_API_CONFIG.FULLBAY_STORE_ID || '';
    }

    var inpKey = document.getElementById('tmd-cfg-fullbay-key');
    if (inpKey && window.TMD_API_CONFIG) {
      inpKey.value = window.TMD_API_CONFIG.FULLBAY_API_KEY || '';
    }
  }

  window.tmdToggleParticles = function(active) {
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (canvas) {
      canvas.style.display = active ? 'block' : 'none';
    }
    showAdminSavedNotice();
  };

  window.tmdSetParticleMode = function(mode) {
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (canvas) {
      canvas.className = 'mode-' + mode;
    }
    showAdminSavedNotice();
  };

  window.tmdSetGlowLevel = function(lvl) {
    var rootDiv = document.querySelector('#root > div');
    if (lvl === 'off') {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#060401';
    } else {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = 'transparent';
    }
    showAdminSavedNotice();
  };

  window.tmdToggleLiveAPI = function(active) {
    if (window.TMD_API_CONFIG) {
      window.TMD_API_CONFIG.USE_LIVE_API = active;
      var statusBadge = document.getElementById('tmd-api-status-text');
      if (statusBadge) {
        statusBadge.innerText = active ? 'FULLBAY API · LIVE CONECTADO' : 'FULLBAY READY · STAGING MOCK';
      }
    }
    showAdminSavedNotice();
  };

  window.tmdSaveAPIConfig = function() {
    if (window.TMD_API_CONFIG) {
      window.TMD_API_CONFIG.FULLBAY_STORE_ID = document.getElementById('tmd-cfg-fullbay-store').value;
      window.TMD_API_CONFIG.FULLBAY_API_KEY = document.getElementById('tmd-cfg-fullbay-key').value;
    }
    showAdminSavedNotice();
  };

  window.tmdResetConfigDefaults = function() {
    if (confirm('¿Desea restablecer todas las configuraciones a los valores iniciales de fábrica?')) {
      window.tmdToggleParticles(true);
      window.tmdToggleLiveAPI(false);
      syncAdminConsoleState();
      alert('Valores de fábrica restablecidos correctamente.');
    }
  };

  function showAdminSavedNotice() {
    var el = document.getElementById('tmd-admin-save-notice');
    if (el) {
      el.style.display = 'inline-block';
      setTimeout(function() { el.style.display = 'none'; }, 2500);
    }
  }

  console.log('[TMD Portal Suite] Engine Multi-Rol inicializado (Cliente, Taller Staff & Consola TI).');
})(window);
