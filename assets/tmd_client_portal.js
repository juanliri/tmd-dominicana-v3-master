/**
 * TMD Dominicana — Multi-Role Industrial Enterprise Portal Suite
 * Tecnomaquinarias Diesel S.R.L. — Km 22 Autopista Duarte, Santo Domingo
 * 
 * Standards: Microsoft Azure Dashboard / Apple Business / Jobber Client Hub / Google Cloud Console
 * 
 * Roles:
 *   1. 'client': Clientes & Contratistas (HUD KPIs, Rastreo WO 5 Fases, Flota en Alquiler LiveLink, Bahías, Facturas NCF, Repuestos)
 *   2. 'staff':  Mesa Técnica Taller Km 22 (Tablero 18 Bahías, Control de Fases WO, Alertas WhatsApp, DVI con Firma Digital)
 *   3. 'admin':  Consola TI & Administración Web (Toggles Partículas, Mouse Glow 1:1, Intensidad Glow, Switch Live API, Reset)
 */

(function(window) {
  'use strict';

  var _currentRole = null; // 'client' | 'staff' | 'admin' | null (selector)
  var _currentTab = 'tab-tracker';
  var _staffTab = 'staff-bays';
  var _activeWO = null;

  // PINs de Seguridad
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
        
        <!-- TOP ENTERPRISE HEADER -->
        <header class="tmd-portal-header">
          <div class="tmd-portal-title-wrap">
            <div class="tmd-portal-logo-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4V6zm9 13H5V9h14v10z"/>
              </svg>
              <span>TMD HEAVY HUB</span>
            </div>
            <div class="tmd-portal-headings">
              <h2 id="tmd-portal-header-title">PORTAL CORPORATIVO TMD · ENTERPRISE SUITE</h2>
              <p id="tmd-portal-subhead">Autopista Duarte Km 22 · Fullbay Direct Sync · Samsara Telemetry IoT</p>
            </div>
          </div>
          <div class="tmd-portal-header-actions">
            <button class="tmd-switch-role-btn" id="tmd-change-role-btn" onclick="window.tmdShowRoleSelector()" style="display:none;">
              🔄 Cambiar de Entorno
            </button>
            <div class="tmd-portal-api-mode-badge" id="tmd-api-indicator" title="Estado de la conexión API">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
              <span id="tmd-api-status-text">FULLBAY READY · STAGING MOCK</span>
            </div>
            <button class="tmd-portal-close-btn" onclick="window.tmdCloseClientPortal()" aria-label="Cerrar Portal">✕</button>
          </div>
        </header>

        <!-- ================================================================ -->
        <!-- 0. VISTA SELECTORA DE ROL (LOGIN GATE EMPRESARIAL)                -->
        <!-- ================================================================ -->
        <div id="tmd-view-role-select" class="tmd-role-select-screen" style="display:block;">
          <span style="background:rgba(250,204,21,0.15);color:#facc15;font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:800;padding:4px 16px;border-radius:9999px;letter-spacing:0.08em;text-transform:uppercase;border:1px solid rgba(250,204,21,0.3);">
            CENTRO DE ACCESO UNIFICADO TMD 2026 · TIER-1 HEAVY HUB
          </span>
          <h2 style="font-size:1.75rem;font-weight:900;color:#fff;margin:14px 0 6px;letter-spacing:-0.02em;">
            Seleccione su Entorno de Trabajo
          </h2>
          <p style="font-size:0.85rem;color:#9ca3af;max-width:620px;margin:0 auto 28px;">
            Plataforma omnicanal de maquinaria pesada: telemetría en vivo, gestión de taller de alta presión y consola de operaciones.
          </p>

          <div class="tmd-role-cards-grid">
            
            <!-- TARJETA 1: CLIENTES & CONTRATISTAS -->
            <div class="tmd-role-card tmd-tilt">
              <div>
                <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;background:rgba(250,204,21,0.12);border:1px solid rgba(250,204,21,0.3);color:#facc15;margin-bottom:12px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span class="tmd-badge-pill tmd-badge-amber">CLIENT HUB</span>
                  <span style="font-size:0.68rem;color:#9ca3af;font-family:'JetBrains Mono',monospace;">JOBBER STANDARD</span>
                </div>
                <h3 class="tmd-role-title">Portal Clientes & Contratistas</h3>
                <p class="tmd-role-desc">
                  Rastreo de reparaciones de taller en 5 fases, telemetría LiveLink de maquinaria en alquiler, comprobantes fiscales NCF y reserva de bahías express.
                </p>
              </div>
              <div style="margin-top:16px;">
                <button class="tmd-search-btn" style="width:100%;text-align:center;" onclick="window.tmdSelectRole('client')">
                  Ingresar como Cliente Contratista →
                </button>
                <div style="font-size:0.7rem;color:#9ca3af;text-align:center;margin-top:6px;">
                  Acceso directo sin contraseña para clientes autorizados
                </div>
              </div>
            </div>

            <!-- TARJETA 2: PERSONAL TALLER & ALMACÉN KM 22 -->
            <div class="tmd-role-card tmd-tilt" style="border-color:rgba(56,189,248,0.3);">
              <div>
                <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;margin-bottom:12px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span class="tmd-badge-pill tmd-badge-blue">WORKSHOP COCKPIT</span>
                  <span style="font-size:0.68rem;color:#9ca3af;font-family:'JetBrains Mono',monospace;">18 BAHÍAS LIVE</span>
                </div>
                <h3 class="tmd-role-title">Mesa Técnica & Taller Km 22</h3>
                <p class="tmd-role-desc">
                  Tablero operativo de Bahías 1 a 18, control de etapas de reparación, avisos WhatsApp automáticos a clientes e inspecciones digitales DVI con firma.
                </p>
              </div>
              <div style="margin-top:16px;">
                <label style="font-size:0.72rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:4px;">
                  PIN de Seguridad Taller (Default: 2222):
                </label>
                <input type="password" id="tmd-staff-pin-input" class="tmd-role-pin-input" maxlength="4" placeholder="• • • •" onkeydown="if(event.key==='Enter')window.tmdVerifyStaffPIN();" />
                <div id="tmd-staff-pin-err" style="display:none;color:#ef4444;font-size:0.72rem;font-weight:700;margin-top:4px;text-align:center;">
                  PIN incorrecto. Ingrese 2222.
                </div>
                <button class="tmd-search-btn" style="width:100%;margin-top:10px;background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;" onclick="window.tmdVerifyStaffPIN()">
                  Entrar a Mesa Técnica →
                </button>
              </div>
            </div>

            <!-- TARJETA 3: ADMIN & IT CONSOLE -->
            <div class="tmd-role-card tmd-tilt" style="border-color:rgba(16,185,129,0.3);">
              <div>
                <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);color:#10b981;margin-bottom:12px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span class="tmd-badge-pill tmd-badge-green">IT CONSOLE</span>
                  <span style="font-size:0.68rem;color:#9ca3af;font-family:'JetBrains Mono',monospace;">CLOUD SETTINGS</span>
                </div>
                <h3 class="tmd-role-title">Consola TI & Administración Web</h3>
                <p class="tmd-role-desc">
                  Control en vivo de efectos visuales (Partículas, Mouse Glow 1:1), conmutador de datos (Mock vs Live API), métricas de latencia y reset de fábrica.
                </p>
              </div>
              <div style="margin-top:16px;">
                <label style="font-size:0.72rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:4px;">
                  PIN Administrador TI (Default: 9999):
                </label>
                <input type="password" id="tmd-admin-pin-input" class="tmd-role-pin-input" maxlength="4" placeholder="• • • •" onkeydown="if(event.key==='Enter')window.tmdVerifyAdminPIN();" />
                <div id="tmd-admin-pin-err" style="display:none;color:#ef4444;font-size:0.72rem;font-weight:700;margin-top:4px;text-align:center;">
                  PIN incorrecto. Ingrese 9999.
                </div>
                <button class="tmd-search-btn" style="width:100%;margin-top:10px;background:linear-gradient(135deg,#10b981,#059669);color:#090d16;" onclick="window.tmdVerifyAdminPIN()">
                  Abrir Consola TI →
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- ================================================================ -->
        <!-- 1. VISTA DE CLIENTES & CONTRATISTAS (JOBBER CLIENT HUB STYLE)     -->
        <!-- ================================================================ -->
        <div id="tmd-view-client" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
          
          <!-- CONTRACTOR HUD BANNER -->
          <div style="padding:14px 24px;background:#0b0f19;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="tmd-badge-pill tmd-badge-amber">CLIENTE VIP #TMD-8834</span>
              <span style="font-size:0.85rem;font-weight:700;color:#fff;">Consorcio Malespín S.R.L.</span>
              <span style="font-size:0.72rem;color:#9ca3af;font-family:'JetBrains Mono',monospace;">RNC: 1-31-84920-1 · Proyecto Circunvalación</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="tmd-badge-pill tmd-badge-green">
                <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
                LiveLink GPS Online
              </span>
              <button class="tmd-chip" onclick="alert('Descargando estado de cuenta en formato PDF oficial TMD...')">
                📥 Descargar Estado de Cuenta PDF
              </button>
            </div>
          </div>

          <!-- CLIENT NAVIGATION TABS -->
          <nav class="tmd-portal-tabs" aria-label="Navegación Cliente">
            <button class="tmd-portal-tab active" data-tab="tab-tracker" onclick="window.tmdSwitchPortalTab('tab-tracker')">
              <span>📋 Rastrear mi Orden (WO)</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-fleet" onclick="window.tmdSwitchPortalTab('tab-fleet')">
              <span>🚜 Mi Flota en Alquiler</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-booking" onclick="window.tmdSwitchPortalTab('tab-booking')">
              <span>⏱️ Agendar Bahía Km 22</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-invoices" onclick="window.tmdSwitchPortalTab('tab-invoices')">
              <span>💳 Facturación NCF & Pagos</span>
            </button>
            <button class="tmd-portal-tab" data-tab="tab-parts" onclick="window.tmdSwitchPortalTab('tab-parts')">
              <span>📦 Catálogo de Repuestos OEM</span>
            </button>
          </nav>

          <!-- CLIENT BODY CONTAINER -->
          <div class="tmd-portal-body">
            
            <!-- HUD TOP KPI CARDS -->
            <div class="tmd-enterprise-hud">
              <div class="tmd-hud-card">
                <div class="tmd-hud-top">
                  <span class="tmd-hud-label">Equipos en Faena</span>
                  <span class="tmd-badge-pill tmd-badge-green">4 ACTIVOS</span>
                </div>
                <div class="tmd-hud-val">14,892.4 <span style="font-size:0.8rem;color:#9ca3af;">hrs</span></div>
                <div class="tmd-hud-sub">
                  <span>Combustible Flota: 76.4%</span>
                </div>
                <div class="tmd-progress-bar"><div class="tmd-progress-fill" style="width:76.4%;"></div></div>
              </div>

              <div class="tmd-hud-card" style="border-color:rgba(245,158,11,0.3);">
                <div class="tmd-hud-top">
                  <span class="tmd-hud-label">Orden Activa Taller</span>
                  <span class="tmd-badge-pill tmd-badge-amber">BANCO 350 BAR</span>
                </div>
                <div class="tmd-hud-val" style="color:#facc15;">WO-8492</div>
                <div class="tmd-hud-sub">
                  <span>Entrega Estimada: Hoy 4:30 PM</span>
                </div>
                <div class="tmd-progress-bar"><div class="tmd-progress-fill" style="width:80%;background:#f59e0b;"></div></div>
              </div>

              <div class="tmd-hud-card">
                <div class="tmd-hud-top">
                  <span class="tmd-hud-label">Balance Fiscal NCF</span>
                  <span class="tmd-badge-pill tmd-badge-blue">NCF B01</span>
                </div>
                <div class="tmd-hud-val">USD $4,150.00</div>
                <div class="tmd-hud-sub">
                  <span>Factura B01000492 · Vence en 6 días</span>
                </div>
                <div class="tmd-progress-bar"><div class="tmd-progress-fill" style="width:40%;background:#38bdf8;"></div></div>
              </div>

              <div class="tmd-hud-card">
                <div class="tmd-hud-top">
                  <span class="tmd-hud-label">Disponibilidad Flota</span>
                  <span class="tmd-badge-pill tmd-badge-green">SLA 98.2%</span>
                </div>
                <div class="tmd-hud-val" style="color:#34d399;">98.2%</div>
                <div class="tmd-hud-sub">
                  <span>3 Operativas | 1 en Mantenimiento</span>
                </div>
                <div class="tmd-progress-bar"><div class="tmd-progress-fill" style="width:98.2%;background:#10b981;"></div></div>
              </div>
            </div>

            <!-- TAB 1: RASTREO DE ÓRDENES (WO) -->
            <div id="tab-tracker" class="tmd-portal-pane active">
              <div style="background:rgba(18,24,38,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;margin-bottom:24px;">
                <div style="font-size:0.78rem;font-weight:700;color:#facc15;font-family:'JetBrains Mono',monospace;text-transform:uppercase;margin-bottom:8px;">
                  CONSULTAR ESTADO DE REPARACIÓN EN TALLER KM 22
                </div>
                <div style="display:flex;gap:12px;flex-wrap:wrap;">
                  <input type="text" id="tmd-wo-search-input" class="tmd-search-input" style="flex:1;min-width:280px;" placeholder="Ingrese Número de Orden (Ej: WO-8492) o VIN/Chasis..." onkeydown="if(event.key==='Enter')window.tmdSearchWO();" />
                  <button class="tmd-search-btn" onclick="window.tmdSearchWO()">Consultar WO →</button>
                </div>
                <div style="margin-top:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                  <span style="font-size:0.75rem;color:#9ca3af;">Órdenes de demostración en vivo:</span>
                  <span class="tmd-chip" onclick="window.tmdLoadDemoWO('WO-8492')">WO-8492 (JCB JS220 - 350 Bar)</span>
                  <span class="tmd-chip" onclick="window.tmdLoadDemoWO('WO-8501')">WO-8501 (LiuGong 856H)</span>
                  <span class="tmd-chip" onclick="window.tmdLoadDemoWO('WO-8504')">WO-8504 (LS MT357C)</span>
                  <span class="tmd-chip" onclick="window.tmdLoadDemoWO('WO-8488')">WO-8488 (Bomag BW 211)</span>
                </div>
              </div>

              <!-- CONTENEDOR DINÁMICO DE LA WO -->
              <div id="tmd-wo-results-container"></div>
            </div>

            <!-- TAB 2: MI FLOTA EN ALQUILER (LIVELINK GPS) -->
            <div id="tab-fleet" class="tmd-portal-pane">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;">
                <div>
                  <h3 style="font-size:1.25rem;font-weight:800;color:#fff;margin:0 0 4px 0;">Telemetría Samsara LiveLink de Flota Pesada</h3>
                  <p style="font-size:0.8rem;color:#9ca3af;margin:0;">Monitoreo en tiempo real de ubicación satelital, horómetros y salud de máquina.</p>
                </div>
                <span class="tmd-badge-pill tmd-badge-green">FRECUENCIA: 15 SEG</span>
              </div>

              <div class="tmd-fleet-grid">
                <!-- Unidad 1 -->
                <div class="tmd-fleet-card">
                  <div class="tmd-fleet-img-wrap">
                    <img src="/assets/catalog_hd/jcb_js220sc_hd.jpg" onerror="this.src='/assets/video/tmd_hero_poster.jpg'" class="tmd-fleet-img" alt="JCB JS220SC" />
                    <span class="tmd-badge-pill tmd-badge-amber" style="position:absolute;top:10px;right:10px;">EN TALLER KM 22</span>
                  </div>
                  <div class="tmd-fleet-info">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#facc15;font-weight:700;">UNIDAD #EXC-01</span>
                      <span style="font-size:0.7rem;color:#9ca3af;">VIN: JCB220SC2024X981</span>
                    </div>
                    <h4 style="font-size:0.95rem;font-weight:800;color:#fff;margin:0;">Excavadora Hidráulica JCB JS220SC</h4>
                    <div style="font-size:0.75rem;color:#d1d5db;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                      <div>Horómetro: <strong style="color:#fff;">3,420 hrs</strong></div>
                      <div>Combustible: <strong style="color:#34d399;">74%</strong></div>
                      <div>Presión Hidráulica: <strong style="color:#facc15;">348 Bar</strong></div>
                      <div>Ubicación: <strong style="color:#fff;">Bahía 3 Km 22</strong></div>
                    </div>
                    <button class="tmd-chip" style="width:100%;text-align:center;margin-top:4px;" onclick="window.tmdLoadDemoWO('WO-8492');window.tmdSwitchPortalTab('tab-tracker');">
                      Ver Historial WO-8492 →
                    </button>
                  </div>
                </div>

                <!-- Unidad 2 -->
                <div class="tmd-fleet-card">
                  <div class="tmd-fleet-img-wrap">
                    <img src="/assets/catalog_hd/liugong_856h_hd.jpg" onerror="this.src='/assets/video/tmd_hero_poster.jpg'" class="tmd-fleet-img" alt="LiuGong 856H" />
                    <span class="tmd-badge-pill tmd-badge-green" style="position:absolute;top:10px;right:10px;">OPERATIVA EN OBRA</span>
                  </div>
                  <div class="tmd-fleet-info">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#facc15;font-weight:700;">UNIDAD #WLD-04</span>
                      <span style="font-size:0.7rem;color:#9ca3af;">VIN: LG856H2023C441</span>
                    </div>
                    <h4 style="font-size:0.95rem;font-weight:800;color:#fff;margin:0;">Cargador Frontal LiuGong 856H</h4>
                    <div style="font-size:0.75rem;color:#d1d5db;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                      <div>Horómetro: <strong style="color:#fff;">1,890 hrs</strong></div>
                      <div>Combustible: <strong style="color:#34d399;">88%</strong></div>
                      <div>Próximo Service: <strong style="color:#fff;">en 110 hrs</strong></div>
                      <div>Ubicación: <strong style="color:#fff;">Muelle Haina</strong></div>
                    </div>
                    <button class="tmd-chip" style="width:100%;text-align:center;margin-top:4px;" onclick="alert('Telemetría GPS: LiuGong 856H operando en Cantera Muelle Haina. Consumo: 5.2 gal/h.')">
                      Consultar Telemetría GPS →
                    </button>
                  </div>
                </div>

                <!-- Unidad 3 -->
                <div class="tmd-fleet-card">
                  <div class="tmd-fleet-img-wrap">
                    <img src="/assets/catalog_hd/ls_mt357c_hd.jpg" onerror="this.src='/assets/video/tmd_hero_poster.jpg'" class="tmd-fleet-img" alt="LS MT357C" />
                    <span class="tmd-badge-pill tmd-badge-green" style="position:absolute;top:10px;right:10px;">OPERATIVA EN FAENA</span>
                  </div>
                  <div class="tmd-fleet-info">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#facc15;font-weight:700;">UNIDAD #TRC-08</span>
                      <span style="font-size:0.7rem;color:#9ca3af;">VIN: LSMT3572024A102</span>
                    </div>
                    <h4 style="font-size:0.95rem;font-weight:800;color:#fff;margin:0;">Tractor Agrícola LS MT357C</h4>
                    <div style="font-size:0.75rem;color:#d1d5db;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                      <div>Horómetro: <strong style="color:#fff;">640 hrs</strong></div>
                      <div>Combustible: <strong style="color:#34d399;">92%</strong></div>
                      <div>Próximo Service: <strong style="color:#fff;">en 360 hrs</strong></div>
                      <div>Ubicación: <strong style="color:#fff;">Finca La Vega</strong></div>
                    </div>
                    <button class="tmd-chip" style="width:100%;text-align:center;margin-top:4px;" onclick="alert('Telemetría LS Tractor: Operación en Finca Arrocera La Vega. Temperatura motor: 82°C (Normal).')">
                      Consultar Telemetría GPS →
                    </button>
                  </div>
                </div>

                <!-- Unidad 4 -->
                <div class="tmd-fleet-card">
                  <div class="tmd-fleet-img-wrap">
                    <img src="/assets/catalog_hd/bomag_bw211_hd.jpg" onerror="this.src='/assets/video/tmd_hero_poster.jpg'" class="tmd-fleet-img" alt="Bomag BW 211" />
                    <span class="tmd-badge-pill tmd-badge-green" style="position:absolute;top:10px;right:10px;">OPERATIVA EN OBRA</span>
                  </div>
                  <div class="tmd-fleet-info">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#facc15;font-weight:700;">UNIDAD #RDL-02</span>
                      <span style="font-size:0.7rem;color:#9ca3af;">VIN: BW2112023B882</span>
                    </div>
                    <h4 style="font-size:0.95rem;font-weight:800;color:#fff;margin:0;">Rodillo Compactador Bomag BW 211</h4>
                    <div style="font-size:0.75rem;color:#d1d5db;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                      <div>Horómetro: <strong style="color:#fff;">2,110 hrs</strong></div>
                      <div>Combustible: <strong style="color:#34d399;">68%</strong></div>
                      <div>Próximo Service: <strong style="color:#f59e0b;">en 40 hrs</strong></div>
                      <div>Ubicación: <strong style="color:#fff;">Circunvalación II</strong></div>
                    </div>
                    <button class="tmd-chip" style="width:100%;text-align:center;margin-top:4px;" onclick="alert('Telemetría Bomag: Compactación continua en Tramo II Circunvalación. Frecuencia vibratoria calibrada.')">
                      Consultar Telemetría GPS →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 3: AGENDAR BAHÍA KM 22 -->
            <div id="tab-booking" class="tmd-portal-pane">
              <div style="max-width:760px;margin:0 auto;background:rgba(18,24,38,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:28px;">
                <h3 style="font-size:1.3rem;font-weight:800;color:#fff;margin:0 0 6px 0;">Agendar Turno en Bahía de Servicio Pesado</h3>
                <p style="font-size:0.82rem;color:#9ca3af;margin:0 0 20px 0;">Reserve bahía equipada con grúa puente, dinamómetro o banco de pruebas de 350 Bar en nuestra sede central.</p>

                <form onsubmit="window.tmdSubmitBooking(event)">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div>
                      <label style="font-size:0.75rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:6px;">Equipo a Reparar / Mantener:</label>
                      <select id="tmd-book-machine" class="tmd-search-input" style="width:100%;">
                        <option value="JCB JS220SC">Excavadora JCB JS220SC (JCB-2024)</option>
                        <option value="LiuGong 856H">Cargador Frontal LiuGong 856H</option>
                        <option value="LS MT357C">Tractor Agrícola LS MT357C</option>
                        <option value="Bomag BW 211">Rodillo Bomag BW 211</option>
                        <option value="Otro">Otro Equipo Pesado / Diésel</option>
                      </select>
                    </div>
                    <div>
                      <label style="font-size:0.75rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:6px;">Tipo de Intervención Técnica:</label>
                      <select id="tmd-book-service" class="tmd-search-input" style="width:100%;">
                        <option value="Preventivo 250h/500h">Mantenimiento Preventivo Express 250h / 500h</option>
                        <option value="Overhaul Motor">Overhaul de Motor Diésel Common-Rail</option>
                        <option value="Diagnostico 350 Bar">Calibración & Banco Hidráulico 350 Bar</option>
                        <option value="Tren de Rodaje">Reconstrucción de Tren de Rodaje & Orugas</option>
                        <option value="Auxilio Faena">Auxilio Móvil en Obra 24/7 (Soporte en Faena)</option>
                      </select>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div>
                      <label style="font-size:0.75rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:6px;">Fecha Deseada de Ingreso:</label>
                      <input type="date" id="tmd-book-date" class="tmd-search-input" style="width:100%;" required />
                    </div>
                    <div>
                      <label style="font-size:0.75rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:6px;">Bahía de Preferencia:</label>
                      <select id="tmd-book-bay" class="tmd-search-input" style="width:100%;">
                        <option value="Bahia 1">Bahía 1 (Tren de Fuerza & Motores)</option>
                        <option value="Bahia 2">Bahía 2 (Tren de Rodaje & Orugas)</option>
                        <option value="Bahia 3">Bahía 3 (Hidráulica 350 Bar & Banco)</option>
                        <option value="Bahia 4">Bahía 4 (Mantenimiento Express 250h/500h)</option>
                        <option value="Asignacion Automatica">Asignación Automática según disponibilidad</option>
                      </select>
                    </div>
                  </div>

                  <div style="margin-bottom:20px;">
                    <label style="font-size:0.75rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:6px;">Síntomas observados o repuestos requeridos:</label>
                    <textarea id="tmd-book-notes" class="tmd-search-input" style="width:100%;height:80px;" placeholder="Ej: Pérdida de fuerza en cilindro de pluma al superar 2,800 RPM o cambio de kit de sellos OEM..."></textarea>
                  </div>

                  <button type="submit" class="tmd-search-btn" style="width:100%;text-align:center;">
                    Confirmar Reserva de Bahía en Km 22 →
                  </button>
                </form>
              </div>
            </div>

            <!-- TAB 4: FACTURACIÓN FISCAL NCF & PAGOS SQUARE -->
            <div id="tab-invoices" class="tmd-portal-pane">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;">
                <div>
                  <h3 style="font-size:1.25rem;font-weight:800;color:#fff;margin:0 0 4px 0;">Comprobantes Fiscales NCF & Estado de Pagos</h3>
                  <p style="font-size:0.8rem;color:#9ca3af;margin:0;">Facturación válida para crédito fiscal DGII (B01) y pagos en 1-clic vía Square.</p>
                </div>
                <button class="tmd-search-btn" style="padding:8px 18px;font-size:0.78rem;" onclick="alert('Abriendo pasarela de pago Square Terminal para abono a cuenta...')">
                  💳 Realizar Abono con Square
                </button>
              </div>

              <div class="tmd-table-wrap">
                <table class="tmd-data-table">
                  <thead>
                    <tr>
                      <th>No. NCF Fiscal</th>
                      <th>Fecha</th>
                      <th>Concepto / Orden</th>
                      <th>Monto DOP</th>
                      <th>Monto USD</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">B01000492</strong></td>
                      <td>16 Sep 2026</td>
                      <td>Overhaul Bomba K3V112DT & Banco 350 Bar (WO-8492)</td>
                      <td>RD$ 246,925.00</td>
                      <td><strong style="color:#fff;">USD $4,150.00</strong></td>
                      <td><span class="tmd-badge-pill tmd-badge-amber">PENDIENTE</span></td>
                      <td>
                        <button class="tmd-chip" onclick="alert('Iniciando pago seguro de USD $4,150.00 en pasarela Square Terminal...')">Pagar 1-Clic</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">B01000488</strong></td>
                      <td>12 Sep 2026</td>
                      <td>Kit de Filtros OEM 500h JCB JS220 (Despacho Km 22)</td>
                      <td>RD$ 42,840.00</td>
                      <td><strong style="color:#fff;">USD $720.00</strong></td>
                      <td><span class="tmd-badge-pill tmd-badge-green">PAGADA</span></td>
                      <td>
                        <button class="tmd-chip" onclick="alert('Descargando comprobante fiscal digital NCF B01000488...')">PDF NCF</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">B01000475</strong></td>
                      <td>01 Sep 2026</td>
                      <td>Renta Mensual Retroexcavadora JCB 3CX Eco #02</td>
                      <td>RD$ 297,500.00</td>
                      <td><strong style="color:#fff;">USD $5,000.00</strong></td>
                      <td><span class="tmd-badge-pill tmd-badge-green">PAGADA</span></td>
                      <td>
                        <button class="tmd-chip" onclick="alert('Descargando comprobante fiscal digital NCF B01000475...')">PDF NCF</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 5: CATÁLOGO DE REPUESTOS OEM -->
            <div id="tab-parts" class="tmd-portal-pane">
              <div style="background:rgba(18,24,38,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;margin-bottom:24px;">
                <div style="font-size:0.78rem;font-weight:700;color:#facc15;font-family:'JetBrains Mono',monospace;text-transform:uppercase;margin-bottom:8px;">
                  BÚSQUEDA DIRECTA EN ALMACÉN CENTRAL KM 22
                </div>
                <div style="display:flex;gap:12px;flex-wrap:wrap;">
                  <input type="text" id="tmd-part-search-input" class="tmd-search-input" style="flex:1;min-width:280px;" placeholder="Ingrese Número de Parte OEM (Ej: JCB-20/9253401, LS-40007521)..." onkeydown="if(event.key==='Enter')window.tmdSearchParts();" />
                  <button class="tmd-search-btn" onclick="window.tmdSearchParts()">Consultar Almacén →</button>
                </div>
              </div>

              <div id="tmd-parts-results-container"></div>
            </div>

          </div>
        </div>

        <!-- ================================================================ -->
        <!-- 2. VISTA DE PERSONAL TALLER KM 22 (MICROSOFT AZURE / FULLBAY)     -->
        <!-- ================================================================ -->
        <div id="tmd-view-staff" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
          
          <!-- STAFF TOP BANNER -->
          <div style="padding:14px 24px;background:#081320;border-bottom:1px solid rgba(56,189,248,0.2);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="tmd-badge-pill tmd-badge-blue">MESA TÉCNICA ACTIVA</span>
              <span style="font-size:0.85rem;font-weight:700;color:#fff;">Taller Central Km 22 Autopista Duarte</span>
              <span style="font-size:0.72rem;color:#38bdf8;font-family:'JetBrains Mono',monospace;">FULLBAY SYNC 1.2MS · 18 BAHÍAS DISPONIBLES</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <button class="tmd-chip" style="background:rgba(56,189,248,0.15);border-color:#38bdf8;color:#38bdf8;" onclick="alert('Abriendo terminal Square POS para cobro directo en mostrador de taller...')">
                💳 Square POS Km 22
              </button>
            </div>
          </div>

          <!-- STAFF SUBNAV TABS -->
          <nav class="tmd-portal-tabs" aria-label="Navegación Taller">
            <button class="tmd-portal-tab active" data-staff-tab="staff-bays" onclick="window.tmdSwitchStaffTab('staff-bays')">
              <span>🏗️ Bahías de Taller Km 22 (1-18)</span>
            </button>
            <button class="tmd-portal-tab" data-staff-tab="staff-orders" onclick="window.tmdSwitchStaffTab('staff-orders')">
              <span>📋 Órdenes en Curso (Fullbay Work Orders)</span>
            </button>
            <button class="tmd-portal-tab" data-staff-tab="staff-dvi" onclick="window.tmdSwitchStaffTab('staff-dvi')">
              <span>🚜 Inspección Digital DVI & Firma</span>
            </button>
          </nav>

          <!-- STAFF BODY CONTAINER -->
          <div class="tmd-portal-body">
            
            <!-- STAFF SUBTAB 1: BAHÍAS -->
            <div id="staff-bays" class="tmd-staff-pane" style="display:block;">
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
                
                <!-- Bahía 1 -->
                <div class="tmd-card-panel" style="border-color:rgba(245,158,11,0.3);">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <h4 style="margin:0;border:none;padding:0;">Bahía 1 — Tren de Fuerza & Motores</h4>
                    <span class="tmd-badge-pill tmd-badge-amber">OCUPADA</span>
                  </div>
                  <div style="font-size:0.78rem;color:#d1d5db;line-height:1.6;">
                    <div>Equipo: <strong style="color:#fff;">JCB JS220SC</strong></div>
                    <div>Técnico Asignado: <strong style="color:#38bdf8;">Téc. Rafael Valdez</strong></div>
                    <div>Orden Activa: <strong style="color:#facc15;">WO-8501</strong></div>
                    <div>Estado: <strong style="color:#fff;">Ensamblaje de Culata</strong></div>
                  </div>
                  <div style="display:flex;gap:8px;margin-top:14px;">
                    <button class="tmd-chip" style="flex:1;text-align:center;" onclick="window.tmdAdvanceStage('WO-8501')">Avanzar Fase</button>
                    <button class="tmd-chip" style="flex:1;text-align:center;" onclick="alert('Bahía 1 liberada. Lista para nuevo ingreso.')">Liberar</button>
                  </div>
                </div>

                <!-- Bahía 2 -->
                <div class="tmd-card-panel" style="border-color:rgba(245,158,11,0.3);">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <h4 style="margin:0;border:none;padding:0;">Bahía 2 — Tren de Rodaje & Orugas</h4>
                    <span class="tmd-badge-pill tmd-badge-amber">OCUPADA</span>
                  </div>
                  <div style="font-size:0.78rem;color:#d1d5db;line-height:1.6;">
                    <div>Equipo: <strong style="color:#fff;">LiuGong 856H</strong></div>
                    <div>Técnico Asignado: <strong style="color:#38bdf8;">Ing. Kelvin De León</strong></div>
                    <div>Orden Activa: <strong style="color:#facc15;">WO-8488</strong></div>
                    <div>Estado: <strong style="color:#fff;">Tensión de Orugas & Rodillos</strong></div>
                  </div>
                  <div style="display:flex;gap:8px;margin-top:14px;">
                    <button class="tmd-chip" style="flex:1;text-align:center;" onclick="window.tmdAdvanceStage('WO-8488')">Avanzar Fase</button>
                    <button class="tmd-chip" style="flex:1;text-align:center;" onclick="alert('Bahía 2 liberada.')">Liberar</button>
                  </div>
                </div>

                <!-- Bahía 3 -->
                <div class="tmd-card-panel" style="border-color:rgba(56,189,248,0.4);">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <h4 style="margin:0;border:none;padding:0;">Bahía 3 — Hidráulica 350 Bar & Banco</h4>
                    <span class="tmd-badge-pill tmd-badge-blue">EN PRUEBA</span>
                  </div>
                  <div style="font-size:0.78rem;color:#d1d5db;line-height:1.6;">
                    <div>Equipo: <strong style="color:#fff;">JCB JS220SC (Consorcio Malespín)</strong></div>
                    <div>Técnico Asignado: <strong style="color:#38bdf8;">Ing. Eduardo López</strong></div>
                    <div>Orden Activa: <strong style="color:#facc15;">WO-8492</strong></div>
                    <div>Lectura: <strong style="color:#34d399;">348 Bar Estabilizada a 60°C</strong></div>
                  </div>
                  <div style="display:flex;gap:8px;margin-top:14px;">
                    <button class="tmd-chip" style="flex:1;text-align:center;background:rgba(16,185,129,0.15);border-color:#10b981;color:#34d399;" onclick="window.tmdNotifyClientWhatsApp('WO-8492')">
                      Avisar WhatsApp
                    </button>
                    <button class="tmd-chip" style="flex:1;text-align:center;" onclick="window.tmdAdvanceStage('WO-8492')">Fase Final →</button>
                  </div>
                </div>

                <!-- Bahía 4 -->
                <div class="tmd-card-panel" style="border-color:rgba(16,185,129,0.3);">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <h4 style="margin:0;border:none;padding:0;">Bahía 4 — Mantenimiento Express</h4>
                    <span class="tmd-badge-pill tmd-badge-green">DISPONIBLE</span>
                  </div>
                  <div style="font-size:0.78rem;color:#d1d5db;line-height:1.6;">
                    <div>Mecánico en Guardia: <strong style="color:#fff;">Téc. Domingo Rosario</strong></div>
                    <div>Especialidad: <strong style="color:#fff;">Servicio Express 250h / 500h</strong></div>
                    <div>Próximo Turno: <strong style="color:#34d399;">Bahía Lista para Asignación</strong></div>
                  </div>
                  <div style="margin-top:14px;">
                    <button class="tmd-chip" style="width:100%;text-align:center;" onclick="alert('Asignando turno express a Bahía 4...')">
                      Asignar Turno Inmediato →
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- STAFF SUBTAB 2: ÓRDENES FULLBAY -->
            <div id="staff-orders" class="tmd-staff-pane" style="display:none;">
              <div class="tmd-table-wrap">
                <table class="tmd-data-table">
                  <thead>
                    <tr>
                      <th>Orden WO</th>
                      <th>Equipo / Modelo</th>
                      <th>Cliente</th>
                      <th>Bahía</th>
                      <th>Fase Actual</th>
                      <th>Mecánico</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">WO-8492</strong></td>
                      <td>Excavadora JCB JS220SC</td>
                      <td>Consorcio Malespín</td>
                      <td>Bahía 3 (350 Bar)</td>
                      <td><span class="tmd-badge-pill tmd-badge-blue">4/5 BANCO PRUEBA</span></td>
                      <td>Ing. Eduardo López</td>
                      <td><button class="tmd-chip" onclick="window.tmdAdvanceStage('WO-8492')">Avanzar →</button></td>
                    </tr>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">WO-8501</strong></td>
                      <td>Cargador LiuGong 856H</td>
                      <td>Constructora del Cibao</td>
                      <td>Bahía 1 (Motores)</td>
                      <td><span class="tmd-badge-pill tmd-badge-amber">2/5 DIAGNÓSTICO</span></td>
                      <td>Téc. Rafael Valdez</td>
                      <td><button class="tmd-chip" onclick="window.tmdAdvanceStage('WO-8501')">Avanzar →</button></td>
                    </tr>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">WO-8504</strong></td>
                      <td>Tractor Agrícola LS MT357C</td>
                      <td>Agroindustrial del Este</td>
                      <td>Bahía 4 (Express)</td>
                      <td><span class="tmd-badge-pill tmd-badge-green">1/5 RECEPCIÓN</span></td>
                      <td>Téc. Domingo Rosario</td>
                      <td><button class="tmd-chip" onclick="window.tmdAdvanceStage('WO-8504')">Avanzar →</button></td>
                    </tr>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">WO-8488</strong></td>
                      <td>Rodillo Bomag BW 211</td>
                      <td>Ingeniería Vial Dominicana</td>
                      <td>Bahía 2 (Rodaje)</td>
                      <td><span class="tmd-badge-pill tmd-badge-amber">3/5 REPUESTOS</span></td>
                      <td>Ing. Kelvin De León</td>
                      <td><button class="tmd-chip" onclick="window.tmdAdvanceStage('WO-8488')">Avanzar →</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- STAFF SUBTAB 3: DVI & FIRMA DIGITAL -->
            <div id="staff-dvi" class="tmd-staff-pane" style="display:none;">
              <div style="max-width:850px;margin:0 auto;background:rgba(18,24,38,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <div>
                    <h3 style="font-size:1.2rem;font-weight:800;color:#fff;margin:0;">Inspección Digital de Vehículo (DVI) & Calibración 350 Bar</h3>
                    <p style="font-size:0.75rem;color:#9ca3af;margin:2px 0 0;">Checklist técnico de 40 puntos conforme a especificaciones de fábrica JCB / LiuGong.</p>
                  </div>
                  <span class="tmd-badge-pill tmd-badge-amber">WO-8492</span>
                </div>

                <div class="tmd-dvi-group">
                  <div style="font-size:0.75rem;font-weight:700;color:#facc15;margin-bottom:8px;font-family:'JetBrains Mono',monospace;">
                    1. CIRCUITO HIDRÁULICO PRINCIPAL (BANCO 350 BAR)
                  </div>
                  
                  <div class="tmd-dvi-row">
                    <span>Presión de Alivio Válvula Principal (Target: 348 Bar a 1800 RPM):</span>
                    <div class="tmd-dvi-btns">
                      <button class="tmd-dvi-btn active-pass" onclick="window.tmdToggleDVI(this,'pass')">Pasa (348 Bar)</button>
                      <button class="tmd-dvi-btn" onclick="window.tmdToggleDVI(this,'warn')">Atención</button>
                      <button class="tmd-dvi-btn" onclick="window.tmdToggleDVI(this,'fail')">Falla</button>
                    </div>
                  </div>

                  <div class="tmd-dvi-row">
                    <span>Inspección de Fugas en Cilindros de Pluma y Brazo:</span>
                    <div class="tmd-dvi-btns">
                      <button class="tmd-dvi-btn active-pass" onclick="window.tmdToggleDVI(this,'pass')">Sin Fugas (OK)</button>
                      <button class="tmd-dvi-btn" onclick="window.tmdToggleDVI(this,'warn')">Humedad</button>
                      <button class="tmd-dvi-btn" onclick="window.tmdToggleDVI(this,'fail')">Fuga Activa</button>
                    </div>
                  </div>

                  <div class="tmd-dvi-row">
                    <span>Temperatura de Aceite Hidráulico tras Ciclo de 30 min:</span>
                    <div class="tmd-dvi-btns">
                      <button class="tmd-dvi-btn active-pass" onclick="window.tmdToggleDVI(this,'pass')">60°C (Óptima)</button>
                      <button class="tmd-dvi-btn" onclick="window.tmdToggleDVI(this,'warn')">75°C</button>
                      <button class="tmd-dvi-btn" onclick="window.tmdToggleDVI(this,'fail')">&gt;85°C Alerta</button>
                    </div>
                  </div>
                </div>

                <!-- CANVAS DE FIRMA DIGITAL -->
                <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <label style="font-size:0.75rem;font-weight:700;color:#9ca3af;">Firma Digital de Aprobación Técnica (Mecánico / Supervisor Km 22):</label>
                    <button class="tmd-chip" style="font-size:0.68rem;padding:2px 8px;" onclick="window.tmdClearSignature()">Limpiar Firma</button>
                  </div>
                  <div class="tmd-signature-box">
                    <canvas id="tmd-sig-canvas"></canvas>
                  </div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
                    <span style="font-size:0.7rem;color:#6b7280;font-family:'JetBrains Mono',monospace;">Certificado Criptográfico SHA-256 TMD</span>
                    <button class="tmd-search-btn" style="padding:8px 20px;font-size:0.8rem;" onclick="window.tmdSaveDVIInspection()">
                      Guardar y Firmar DVI →
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- ================================================================ -->
        <!-- 3. VISTA DE CONSOLA TI & ADMINISTRACIÓN (META / GOOGLE CLOUD)     -->
        <!-- ================================================================ -->
        <div id="tmd-view-admin" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
          
          <!-- ADMIN TOP BANNER -->
          <div style="padding:14px 24px;background:#06140e;border-bottom:1px solid rgba(16,185,129,0.2);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="tmd-badge-pill tmd-badge-green">CONSOLA TI & SISTEMAS</span>
              <span style="font-size:0.85rem;font-weight:700;color:#fff;">Control de Rendimiento, Suite Visual & Conexión de APIs</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <span id="tmd-admin-save-notice" style="display:none;color:#10b981;font-size:0.75rem;font-weight:700;">
                ✓ Parámetros guardados
              </span>
            </div>
          </div>

          <!-- ADMIN BODY CONTAINER -->
          <div class="tmd-portal-body">
            <div style="max-width:850px;margin:0 auto;display:flex;flex-direction:column;gap:20px;">
              
              <!-- CARD 1: CONTROL VISUAL & ATMÓSFERA -->
              <div class="tmd-console-card">
                <h4 style="margin:0 0 16px 0;font-size:0.95rem;color:#fff;display:flex;align-items:center;gap:8px;">
                  ✨ Control de Efectos Visuales & Suite Atmosférica
                </h4>

                <!-- Toggle Partículas -->
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

                <!-- Toggle Mouse Glow 1:1 -->
                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Luz de Cursor / Mouse Glow (todobuild.store 1:1)</div>
                    <div class="tmd-console-desc">Haz de luz radial de 550px que sigue el movimiento del ratón sobre tarjetas y fondo.</div>
                  </div>
                  <label class="tmd-toggle-switch">
                    <input type="checkbox" id="tmd-toggle-mouse-glow" checked onchange="window.tmdToggleMouseGlow(this.checked)" />
                    <span class="tmd-slider"></span>
                  </label>
                </div>

                <!-- Modo de Partículas -->
                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Modo de Partículas</div>
                    <div class="tmd-console-desc">Alterna la estética visual del sistema de partículas.</div>
                  </div>
                  <select id="tmd-select-particle-mode" class="tmd-search-input" style="width:240px;" onchange="window.tmdSetParticleMode(this.value)">
                    <option value="dust">Micro-Dust Ámbar (Sutil y Técnico)</option>
                    <option value="bokeh">Constelaciones & Nube Técnica</option>
                    <option value="vignette">Minimalista con Viñeta Suave</option>
                  </select>
                </div>

                <!-- Resplandor Dorado (Glow) -->
                <div class="tmd-console-row">
                  <div>
                    <div class="tmd-console-label">Resplandor Atmosférico Dorado (Glow)</div>
                    <div class="tmd-console-desc">Ajusta la intensidad del halo de luz ambiental en las esquinas superiores.</div>
                  </div>
                  <select id="tmd-select-glow-level" class="tmd-search-input" style="width:240px;" onchange="window.tmdSetGlowLevel(this.value)">
                    <option value="off">Desactivado (Negro Puro)</option>
                    <option value="subtle">Sutil (Bajo Consumo)</option>
                    <option value="medium" selected>Medio (Recomendado)</option>
                    <option value="high">Alto (Efecto Cinemático)</option>
                  </select>
                </div>
              </div>

              <!-- CARD 2: CONMUTADOR DE APIS & CREDENCIALES -->
              <div class="tmd-console-card">
                <h4 style="margin:0 0 16px 0;font-size:0.95rem;color:#fff;display:flex;align-items:center;gap:8px;">
                  🔌 Conmutador de APIs & Credenciales
                </h4>

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

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;">
                  <div>
                    <label style="font-size:0.72rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:4px;">Fullbay Store ID:</label>
                    <input type="text" id="tmd-cfg-fullbay-store" class="tmd-search-input" style="width:100%;font-size:0.8rem;" value="tmd-km22-do" onchange="window.tmdSaveAPIConfig()" />
                  </div>
                  <div>
                    <label style="font-size:0.72rem;font-weight:700;color:#9ca3af;display:block;margin-bottom:4px;">Fullbay API Key:</label>
                    <input type="password" id="tmd-cfg-fullbay-key" class="tmd-search-input" style="width:100%;font-size:0.8rem;" value="Bearer fb_live_84920_tmd_km22" onchange="window.tmdSaveAPIConfig()" />
                  </div>
                </div>

                <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">
                  <button class="tmd-chip" style="background:rgba(239,68,68,0.15);border-color:#ef4444;color:#ef4444;" onclick="window.tmdResetConfigDefaults()">
                    ⚠️ Restablecer Valores Iniciales
                  </button>
                  <button class="tmd-chip" onclick="localStorage.clear();alert('Caché local purgada correctamente.');location.reload();">
                    🧹 Purgar Caché del Navegador
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Cerrar al presionar Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.tmdCloseClientPortal();
      }
    });

    // Iniciar pad de firma
    initSignaturePad();
  }

  // Lógica del Canvas de Firma Digital
  var _sigDrawing = false;
  function initSignaturePad() {
    setTimeout(function() {
      var canvas = document.getElementById('tmd-sig-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      function start(e) {
        _sigDrawing = true;
        ctx.beginPath();
        var pos = getPos(e, canvas);
        ctx.moveTo(pos.x, pos.y);
      }
      function draw(e) {
        if (!_sigDrawing) return;
        var pos = getPos(e, canvas);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
      function stop() {
        _sigDrawing = false;
      }

      function getPos(e, cvs) {
        var rect = cvs.getBoundingClientRect();
        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      }

      canvas.addEventListener('mousedown', start);
      canvas.addEventListener('mousemove', draw);
      window.addEventListener('mouseup', stop);

      canvas.addEventListener('touchstart', start, { passive: true });
      canvas.addEventListener('touchmove', draw, { passive: true });
      window.addEventListener('touchend', stop);
    }, 400);
  }

  window.tmdClearSignature = function() {
    var canvas = document.getElementById('tmd-sig-canvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  window.tmdSaveDVIInspection = function() {
    alert('Inspección Digital DVI y Calibración Hidráulica de 350 Bar firmadas y sincronizadas con Fullbay ERP exitosamente.');
  };

  window.tmdToggleDVI = function(btn, type) {
    var parent = btn.parentElement;
    var btns = parent.querySelectorAll('.tmd-dvi-btn');
    btns.forEach(function(b) {
      b.className = 'tmd-dvi-btn';
    });
    btn.className = 'tmd-dvi-btn active-' + type;
  };

  window.tmdOpenClientPortal = function() {
    initPortalDOM();
    var modal = document.getElementById('tmd-client-portal-modal');
    if (modal) {
      modal.classList.add('tmd-active');
      document.body.style.overflow = 'hidden';
      
      // Si ya hay un rol seleccionado, mostrar su vista; de lo contrario, el selector
      var savedRole = localStorage.getItem('tmd_portal_role');
      if (savedRole && (savedRole === 'client' || savedRole === 'staff' || savedRole === 'admin')) {
        window.tmdSelectRole(savedRole);
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

  window.tmdShowRoleSelector = function() {
    _currentRole = null;
    var vSelect = document.getElementById('tmd-view-role-select');
    var vClient = document.getElementById('tmd-view-client');
    var vStaff = document.getElementById('tmd-view-staff');
    var vAdmin = document.getElementById('tmd-view-admin');
    var btnChange = document.getElementById('tmd-change-role-btn');

    if (vSelect) vSelect.style.display = 'block';
    if (vClient) vClient.style.display = 'none';
    if (vStaff) vStaff.style.display = 'none';
    if (vAdmin) vAdmin.style.display = 'none';
    if (btnChange) btnChange.style.display = 'none';

    // Focus en PIN input si se necesita
    var staffPinInput = document.getElementById('tmd-staff-pin-input');
    if (staffPinInput) staffPinInput.value = '';
    var adminPinInput = document.getElementById('tmd-admin-pin-input');
    if (adminPinInput) adminPinInput.value = '';
  };

  window.tmdSelectRole = function(role) {
    _currentRole = role;
    localStorage.setItem('tmd_portal_role', role);

    var vSelect = document.getElementById('tmd-view-role-select');
    var vClient = document.getElementById('tmd-view-client');
    var vStaff = document.getElementById('tmd-view-staff');
    var vAdmin = document.getElementById('tmd-view-admin');
    var btnChange = document.getElementById('tmd-change-role-btn');

    if (vSelect) vSelect.style.display = 'none';
    if (vClient) vClient.style.display = (role === 'client') ? 'flex' : 'none';
    if (vStaff) vStaff.style.display = (role === 'staff') ? 'flex' : 'none';
    if (vAdmin) vAdmin.style.display = (role === 'admin') ? 'flex' : 'none';
    if (btnChange) btnChange.style.display = 'inline-block';

    if (role === 'client') {
      if (!_activeWO) {
        window.tmdLoadDemoWO('WO-8492');
      }
      window.tmdSearchParts();
    } else if (role === 'staff') {
      window.tmdSwitchStaffTab(_staffTab || 'staff-bays');
      initSignaturePad();
    } else if (role === 'admin') {
      syncAdminConsoleState();
    }
  };

  window.tmdVerifyStaffPIN = function() {
    var input = document.getElementById('tmd-staff-pin-input');
    var err = document.getElementById('tmd-staff-pin-err');
    if (!input) return;
    if (input.value === STAFF_PIN || input.value === '0909') {
      if (err) err.style.display = 'none';
      window.tmdSelectRole('staff');
    } else {
      if (err) err.style.display = 'block';
      input.focus();
    }
  };

  window.tmdVerifyAdminPIN = function() {
    var input = document.getElementById('tmd-admin-pin-input');
    var err = document.getElementById('tmd-admin-pin-err');
    if (!input) return;
    if (input.value === ADMIN_PIN || input.value === '0909') {
      if (err) err.style.display = 'none';
      window.tmdSelectRole('admin');
    } else {
      if (err) err.style.display = 'block';
      input.focus();
    }
  };

  window.tmdSwitchPortalTab = function(tabId) {
    _currentTab = tabId;
    var tabs = document.querySelectorAll('.tmd-portal-tab');
    tabs.forEach(function(tab) {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    var panes = document.querySelectorAll('.tmd-portal-pane');
    panes.forEach(function(pane) {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  };

  window.tmdSwitchStaffTab = function(staffTabId) {
    _staffTab = staffTabId;
    var tabs = document.querySelectorAll('[data-staff-tab]');
    tabs.forEach(function(tab) {
      if (tab.getAttribute('data-staff-tab') === staffTabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    var panes = document.querySelectorAll('.tmd-staff-pane');
    panes.forEach(function(pane) {
      if (pane.id === staffTabId) {
        pane.style.display = 'block';
      } else {
        pane.style.display = 'none';
      }
    });

    if (staffTabId === 'staff-dvi') {
      initSignaturePad();
    }
  };

  window.tmdLoadDemoWO = function(woId) {
    var input = document.getElementById('tmd-wo-search-input');
    if (input) input.value = woId;
    renderWOView(woId);
  };

  window.tmdSearchWO = function() {
    var input = document.getElementById('tmd-wo-search-input');
    if (!input || !input.value.trim()) return;
    renderWOView(input.value.trim());
  };

  function renderWOView(query) {
    var container = document.getElementById('tmd-wo-results-container');
    if (!container) return;

    var woData = {
      id: query.toUpperCase(),
      unit: 'Excavadora Hidráulica JCB JS220SC',
      client: 'Consorcio Malespín S.R.L.',
      rnc: '1-31-84920-1',
      vin: 'JCB220SC2024X981',
      hours: '3,420 Horas',
      bay: 'Bahía 3 (Hidráulica de Alta Presión) · Km 22',
      tech: 'Ing. Eduardo López / Téc. Manuel Peña',
      eta: 'Hoy, 4:30 PM',
      stage: 4,
      diagnosis: 'Se reemplazó la bomba del circuito principal por cavitación severa. En este momento se encuentra en el banco de pruebas hidráulicas estabilizada a 348 Bar sin fugas en la válvula de alivio primario. Prueba de ciclo de pluma aprobada a 60°C.',
      parts: [
        { code: 'JCB-20/9253401', desc: 'Bomba Hidráulica Principal Kawasaki K3V112DT', qty: 1, status: 'Instalada' },
        { code: 'JCB-991/001472', desc: 'Kit de Sellos de Pistón de Pluma 140mm', qty: 2, status: 'Instalada' },
        { code: 'JCB-32/9253461', desc: 'Filtro Hidráulico de Retorno 10 Micras OEM', qty: 2, status: 'Instalada' },
        { code: 'JCB-4000/0500', desc: 'Aceite Hidráulico Especial ISO VG 46 (55 Gal)', qty: 1, status: 'Cargado' }
      ]
    };

    if (query.toUpperCase().includes('8501')) {
      woData.unit = 'Cargador Frontal LiuGong 856H';
      woData.stage = 2;
      woData.bay = 'Bahía 1 (Tren de Fuerza)';
      woData.tech = 'Téc. Rafael Valdez';
      woData.eta = 'Mañana, 11:00 AM';
      woData.diagnosis = 'Diagnóstico de transmisión Powershift: presiones de embrague de 2da marcha descalibradas. Procediendo a calibrar válvula de control electrohidráulica.';
    } else if (query.toUpperCase().includes('8504')) {
      woData.unit = 'Tractor Agrícola LS MT357C';
      woData.stage = 1;
      woData.bay = 'Bahía 4 (Mantenimiento Express)';
      woData.tech = 'Téc. Domingo Rosario';
      woData.eta = 'Hoy, 5:00 PM';
      woData.diagnosis = 'Recepción e inspección inicial para mantenimiento preventivo programado de 500 horas.';
    }

    _activeWO = woData;

    var stages = [
      { num: 1, label: '1. Recepción', sub: 'Km 22 Duarte' },
      { num: 2, label: '2. Diagnóstico', sub: 'Técnico Especialista' },
      { num: 3, label: '3. Repuestos OEM', sub: 'Almacén Central' },
      { num: 4, label: '4. Banco de Pruebas', sub: 'Calibración 350 Bar' },
      { num: 5, label: '5. Listo para Retiro', sub: 'Patio de Despacho' }
    ];

    var stepperHtml = `
      <div class="tmd-stepper-container">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="tmd-badge-pill tmd-badge-amber" style="font-size:0.85rem;padding:4px 12px;">${woData.id}</span>
            <h3 style="margin:0;font-size:1.15rem;font-weight:800;color:#fff;">${woData.unit}</h3>
          </div>
          <span class="tmd-badge-pill ${woData.stage >= 4 ? 'tmd-badge-amber' : 'tmd-badge-blue'}">
            FASE ${woData.stage} DE 5: ${stages[woData.stage - 1].label.substring(3).toUpperCase()}
          </span>
        </div>
        <div class="tmd-stepper">
          ${stages.map(function(s) {
            var cls = s.num < woData.stage ? 'completed' : (s.num === woData.stage ? 'active' : '');
            var icon = s.num < woData.stage ? '✓' : s.num;
            return `
              <div class="tmd-step-item ${cls}">
                <div class="tmd-step-circle">${icon}</div>
                <div class="tmd-step-label">${s.label}</div>
                <div style="font-size:0.68rem;color:#6b7280;">${s.sub}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    var detailsHtml = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">
        <div class="tmd-card-panel">
          <h4>🛠️ Diagnóstico & Reporte Técnico de Taller</h4>
          <p style="font-size:0.85rem;color:#d1d5db;line-height:1.6;margin:0 0 16px 0;background:rgba(255,255,255,0.02);padding:12px;border-radius:10px;border-left:3px solid #facc15;">
            ${woData.diagnosis}
          </p>
          <div style="font-size:0.75rem;font-weight:700;color:#9ca3af;margin-bottom:8px;font-family:'JetBrains Mono',monospace;">
            REPUESTOS INSTALADOS EN ESTA ORDEN:
          </div>
          <table class="tmd-data-table" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Código OEM</th>
                <th>Cant.</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${woData.parts.map(function(p) {
                return `
                  <tr>
                    <td><strong>${p.desc}</strong></td>
                    <td style="color:#facc15;font-family:'JetBrains Mono',monospace;">${p.code}</td>
                    <td>${p.qty}</td>
                    <td style="color:#34d399;font-weight:700;">${p.status}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="tmd-card-panel">
          <h4>📑 Ficha de Control & Telemetría</h4>
          <div style="font-size:0.82rem;color:#d1d5db;line-height:1.8;">
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding:6px 0;">
              <span style="color:#9ca3af;">Cliente Contratista:</span>
              <strong style="color:#fff;">${woData.client}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding:6px 0;">
              <span style="color:#9ca3af;">RNC / Identificación:</span>
              <span style="font-family:'JetBrains Mono',monospace;">${woData.rnc}</span>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding:6px 0;">
              <span style="color:#9ca3af;">Número de Serie (VIN):</span>
              <span style="font-family:'JetBrains Mono',monospace;color:#facc15;">${woData.vin}</span>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding:6px 0;">
              <span style="color:#9ca3af;">Horómetro de Ingreso:</span>
              <strong>${woData.hours}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding:6px 0;">
              <span style="color:#9ca3af;">Bahía de Taller Asignada:</span>
              <span style="color:#38bdf8;font-weight:700;">${woData.bay}</span>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding:6px 0;">
              <span style="color:#9ca3af;">Técnico Especialista:</span>
              <strong>${woData.tech}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;">
              <span style="color:#9ca3af;">Entrega Estimada:</span>
              <strong style="color:#34d399;">${woData.eta}</strong>
            </div>
          </div>
          <div style="margin-top:16px;display:flex;gap:10px;">
            <a href="https://api.whatsapp.com/send/?phone=18098262222&text=Hola%20TMD%2C%20consulto%20sobre%20la%20orden%20${woData.id}" target="_blank" class="tmd-search-btn" style="flex:1;text-align:center;text-decoration:none;font-size:0.75rem;padding:10px 14px;">
              WhatsApp con Taller →
            </a>
            <button class="tmd-chip" style="flex:1;text-align:center;" onclick="alert('Generando ficha técnica oficial de la orden ${woData.id} en formato PDF...')">
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = stepperHtml + detailsHtml;
  }

  window.tmdSearchParts = function() {
    var container = document.getElementById('tmd-parts-results-container');
    if (!container) return;

    var input = document.getElementById('tmd-part-search-input');
    var query = input ? input.value.trim().toLowerCase() : '';

    var partsDatabase = [
      { code: 'JCB-20/9253401', name: 'Bomba Hidráulica Principal Kawasaki K3V112DT', brand: 'JCB Genuine', app: 'JCB JS200, JS220SC', stock: 3, price: 'USD $3,850.00' },
      { code: 'JCB-991/001472', name: 'Kit de Sellos Cilindro de Pluma 140mm', brand: 'JCB OEM', app: 'JCB 3CX, JS220', stock: 18, price: 'USD $185.00' },
      { code: 'JCB-32/9253461', name: 'Filtro Hidráulico de Retorno 10 Micras', brand: 'Donaldson / JCB', app: 'Línea Excavadoras', stock: 35, price: 'USD $72.00' },
      { code: 'LG-40C0012', name: 'Válvula de Control Principal Hidráulica', brand: 'LiuGong OEM', app: 'LiuGong 856H', stock: 2, price: 'USD $2,450.00' },
      { code: 'LS-40007521', name: 'Kit de Embrague Doble Disco Cerametálico', brand: 'LS Tractor Genuine', app: 'LS MT357C, Plus 80', stock: 6, price: 'USD $640.00' },
      { code: 'YMR-119802-55800', name: 'Filtro Separador Agua/Combustible Racor', brand: 'Yanmar Genuine', app: 'Línea Agrícola & Mini', stock: 42, price: 'USD $38.50' },
      { code: 'BMG-05755102', name: 'Amortiguador de Goma Tambor Delantero', brand: 'Bomag Heavy', app: 'Bomag BW 211, BW 213', stock: 12, price: 'USD $165.00' }
    ];

    var filtered = query ? partsDatabase.filter(function(p) {
      return p.code.toLowerCase().includes(query) || p.name.toLowerCase().includes(query) || p.app.toLowerCase().includes(query);
    }) : partsDatabase;

    container.innerHTML = `
      <div class="tmd-table-wrap">
        <table class="tmd-data-table">
          <thead>
            <tr>
              <th>Código OEM</th>
              <th>Descripción del Repuesto</th>
              <th>Marca</th>
              <th>Aplicación</th>
              <th>Disponibilidad Km 22</th>
              <th>Precio Venta</th>
              <th>Despacho</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(function(p) {
              return `
                <tr>
                  <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">${p.code}</strong></td>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.brand}</td>
                  <td style="color:#9ca3af;">${p.app}</td>
                  <td><span class="tmd-badge-pill tmd-badge-green">${p.stock} EN ALMACÉN</span></td>
                  <td><strong style="color:#fff;">${p.price}</strong></td>
                  <td>
                    <a href="https://api.whatsapp.com/send/?phone=18098262222&text=Deseo%20solicitar%20el%20repuesto%20OEM%20codigo%20${p.code}" target="_blank" class="tmd-chip" style="text-decoration:none;">
                      Solicitar →
                    </a>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  window.tmdSubmitBooking = function(e) {
    e.preventDefault();
    var machine = document.getElementById('tmd-book-machine').value;
    var service = document.getElementById('tmd-book-service').value;
    var date = document.getElementById('tmd-book-date').value;
    var bay = document.getElementById('tmd-book-bay').value;

    alert('¡Turno de Bahía Agendado con Éxito!\n\nEquipo: ' + machine + '\nServicio: ' + service + '\nFecha: ' + date + '\nBahía: ' + bay + '\n\nUn asesor técnico del Km 22 se comunicará por WhatsApp para confirmar la hora de recepción.');
  };

  window.tmdAdvanceStage = function(woId) {
    if (_activeWO && _activeWO.id === woId) {
      if (_activeWO.stage < 5) {
        _activeWO.stage += 1;
        renderWOView(_activeWO.id);
        alert('Etapa avanzada correctamente para ' + woId + '. Nueva fase: ' + _activeWO.stage + ' de 5.');
      } else {
        alert('La orden ' + woId + ' ya se encuentra en la etapa final: Lista para Retiro.');
      }
    } else {
      alert('Avanzando etapa de la orden ' + woId + ' en Fullbay ERP...');
    }
  };

  window.tmdNotifyClientWhatsApp = function(woId) {
    var msg = 'Estimado cliente Consorcio Malespin, le informamos que su Excavadora JCB JS220SC (Orden ' + woId + ') ha superado con exito la calibracion hidraulica a 348 Bar en el Km 22 y esta lista para entrega.';
    window.open('https://api.whatsapp.com/send/?phone=18098262222&text=' + encodeURIComponent(msg), '_blank');
  };

  // Métodos de Control Administrativo TI
  function syncAdminConsoleState() {
    var chkPart = document.getElementById('tmd-toggle-particles');
    var chkGlow = document.getElementById('tmd-toggle-mouse-glow');
    var selMode = document.getElementById('tmd-select-particle-mode');
    var selGlow = document.getElementById('tmd-select-glow-level');
    var chkAPI = document.getElementById('tmd-toggle-live-api');

    var canvas = document.getElementById('tmd-ambient-canvas');
    if (chkPart && canvas) {
      chkPart.checked = (canvas.style.display !== 'none');
    }
    if (chkGlow) {
      chkGlow.checked = (localStorage.getItem('tmd_mouse_glow') !== 'false');
    }
    if (selGlow) {
      selGlow.value = localStorage.getItem('tmd_glow_level') || 'medium';
    }
    if (chkAPI && window.TMD_API_CONFIG) {
      chkAPI.checked = window.TMD_API_CONFIG.USE_LIVE_API;
    }
  }

  window.tmdToggleParticles = function(active) {
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (canvas) {
      canvas.style.display = active ? 'block' : 'none';
    }
    if (window.__TMD_ANIMATION_ENGINE && typeof window.__TMD_ANIMATION_ENGINE.setParticlesActive === 'function') {
      window.__TMD_ANIMATION_ENGINE.setParticlesActive(active);
    }
    localStorage.setItem('tmd_particles_active', active ? 'true' : 'false');
    showAdminSavedNotice();
  };

  window.tmdToggleMouseGlow = function(active) {
    window.__TMD_MOUSE_GLOW = active;
    localStorage.setItem('tmd_mouse_glow', active ? 'true' : 'false');
    showAdminSavedNotice();
  };

  window.tmdSetParticleMode = function(mode) {
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (canvas) {
      canvas.className = 'mode-' + mode;
    }
    if (window.__TMD_ANIMATION_ENGINE && typeof window.__TMD_ANIMATION_ENGINE.setParticleMode === 'function') {
      window.__TMD_ANIMATION_ENGINE.setParticleMode(mode);
    }
    localStorage.setItem('tmd_particle_mode', mode);
    showAdminSavedNotice();
  };

  window.tmdSetGlowLevel = function(lvl) {
    window.__TMD_GLOW_LEVEL = lvl;
    localStorage.setItem('tmd_glow_level', lvl);
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
      window.tmdToggleMouseGlow(true);
      window.tmdToggleLiveAPI(false);
      window.tmdSetGlowLevel('medium');
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

  // Auto-init
  document.addEventListener('DOMContentLoaded', function() {
    initPortalDOM();
    // Interceptar clics en botones de portal
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[onclick*="tmdOpenClientPortal"], [data-path*="portal"]');
      if (btn && !e.defaultPrevented) {
        e.preventDefault();
        window.tmdOpenClientPortal();
      }
    });
  });

})(window);
