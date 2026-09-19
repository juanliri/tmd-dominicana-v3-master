/**
 * TMD Dominicana — Strictly Isolated Multi-Portal Suite
 * Tecnomaquinarias Diesel S.R.L. — Km 22 Autopista Duarte, Santo Domingo
 * 
 * Strict Role Segregation:
 *   1. CLIENT PORTAL: For Contractor VIP Clients only. No staff/admin buttons or leakage.
 *   2. STAFF WORKSHOP PORTAL: For Km 22 mechanics & supervisors (PIN 2222). 18 Bays, DVI, Fullbay.
 *   3. ADMIN IT PORTAL: For webmaster & systems admin (PIN 9999). Visual controls & APIs.
 * 
 * Strict Palette:
 *   - Dark Theme: Pure Black (#000000 / #09090b), Hazard Gold (#f59e0b), Telemetry Emerald (#10b981).
 *   - ZERO BLUES ANYWHERE.
 */

(function(window) {
  'use strict';

  var STAFF_PIN = '2222';
  var ADMIN_PIN = '9999';

  function tmdShowToast(message, type) {
    var toast = document.getElementById('tmd-global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'tmd-global-toast';
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999999;max-width:400px;padding:14px 20px;border-radius:10px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:0.84rem;font-weight:600;line-height:1.4;box-shadow:0 12px 36px rgba(0,0,0,0.85);backdrop-filter:blur(12px);transition:opacity 0.25s ease;pointer-events:none;opacity:0;';
      document.body.appendChild(toast);
    }
    var border = type === 'error' ? 'rgba(239,68,68,0.6)' : (type === 'success' ? 'rgba(16,185,129,0.6)' : 'rgba(250,204,21,0.6)');
    var bg = 'rgba(12,12,14,0.96)';
    var color = type === 'error' ? '#fca5a5' : (type === 'success' ? '#6ee7b7' : '#fef08a');
    var icon = type === 'error' ? '⚠️ ' : (type === 'success' ? '✓ ' : 'ℹ️ ');
    
    toast.style.border = '1px solid ' + border;
    toast.style.background = bg;
    toast.style.color = color;
    toast.innerHTML = icon + message;
    toast.style.opacity = '1';

    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() {
      toast.style.opacity = '0';
    }, 4200);
  }
  window.tmdShowToast = tmdShowToast;

  // Client Session State
  var _clientLoggedIn = false;
  var _activeClientNav = 'nav-workflow';
  var _activeStaffNav = 'staff-bays';
  var _cartItems = [];

  // Data Models (Fullbay + Samsara + FuseBase Document Vault)
  var CLIENT_DATA = {
    company: 'Consorcio Malespín S.R.L.',
    rnc: '1-31-84920-1',
    project: 'Proyecto Circunvalación Tramo II',
    contact: 'Ing. Marcos Malespín',
    phone: '(809) 567-8900',
    email: 'operaciones@malespin.com.do'
  };

  var VAULT_DOCUMENTS = [
    { id: 'DOC-B01-492', title: 'Comprobante Fiscal Digital NCF B01000492', type: 'invoice', date: '12 Sep 2026', size: '245 KB', ref: 'WO-8492' },
    { id: 'DOC-B01-488', title: 'Comprobante Fiscal Digital NCF B01000488', type: 'invoice', date: '05 Sep 2026', size: '180 KB', ref: 'WO-8488' },
    { id: 'DOC-COT-11555', title: 'Cotización Oficial #11555 (Calibración 350 Bar)', type: 'quote', date: '10 Sep 2026', size: '312 KB', ref: 'JCB JS220SC' },
    { id: 'DOC-CERT-348', title: 'Certificado de Calibración Hidráulica a 348 Bar', type: 'cert', date: '18 Sep 2026', size: '420 KB', ref: 'Banco Km 22' },
    { id: 'DOC-CONTR-8834', title: 'Contrato Marco de Alquiler de Maquinaria Pesada', type: 'contract', date: '01 Ene 2026', size: '1.2 MB', ref: 'TMD-8834' },
    { id: 'DOC-DVI-8492', title: 'Reporte Técnico de Inspección Digital DVI 40 Puntos', type: 'dvi', date: '11 Sep 2026', size: '560 KB', ref: 'WO-8492' }
  ];

  var FLEET_ASSETS = [
    {
      id: 'EQ-01',
      name: 'Retroexcavadora JCB 3CX Eco 4x4',
      vin: 'JCB3CX2024E104',
      hours: '3,420.5 hrs',
      fuel: 82,
      location: 'Autopista Duarte Km 18 · Obra Tramo I',
      status: 'OPERATIVA',
      nextServiceIn: '79.5 hrs (Servicio 3500h)',
      operator: 'José Paulino',
      hydraulicPressure: '248 Bar / 251 Bar Max',
      coolantTemp: '84°C (Normal)',
      batteryVoltage: '24.8 V',
      gpsCoords: '18.5714° N, 70.0347° W',
      geofence: 'Dentro de Perímetro Tramo I',
      sosFluid: 'Muestra Óptima (12-Sep)',
      dtc: 'Sin Fallas Activas'
    },
    {
      id: 'EQ-02',
      name: 'Excavadora Hidráulica JCB JS220SC',
      vin: 'JCB220SC2024X981',
      hours: '4,150.0 hrs',
      fuel: 90,
      location: 'Taller Central Km 22 · Bahía 3 (350 Bar)',
      status: 'EN TALLER',
      nextServiceIn: 'En calibración hidráulica',
      operator: 'Ing. Eduardo López (Taller)',
      hydraulicPressure: '348 Bar (En Banco)',
      coolantTemp: '62°C (Prueba)',
      batteryVoltage: '25.1 V',
      gpsCoords: '18.5780° N, 70.0410° W',
      geofence: 'Sede Matriz Km 22 Aut. Duarte',
      sosFluid: 'SOS Cat/JCB: Partículas 0%',
      dtc: 'WO-8492 en proceso'
    },
    {
      id: 'EQ-03',
      name: 'Cargador Frontal LiuGong 856H',
      vin: 'LG856H2024L501',
      hours: '4,812.0 hrs',
      fuel: 68,
      location: 'Cantera Santo Domingo Oeste',
      status: 'OPERATIVA',
      nextServiceIn: '188.0 hrs (Servicio 5000h)',
      operator: 'Manuel Rosario',
      hydraulicPressure: '210 Bar / 215 Bar Max',
      coolantTemp: '88°C (Carga Pesada)',
      batteryVoltage: '24.4 V',
      gpsCoords: '18.4912° N, 70.0125° W',
      geofence: 'Cantera Caliza SDO',
      sosFluid: 'Viscosidad 15W-40 Conforme',
      dtc: 'Sin Fallas Activas'
    },
    {
      id: 'EQ-04',
      name: 'Tractor Agrícola LS MT357C',
      vin: 'LSMT3572023A302',
      hours: '1,280.0 hrs',
      fuel: 74,
      location: 'Proyecto Agroindustrial Bonao',
      status: 'OPERATIVA',
      nextServiceIn: '220.0 hrs (Servicio 1500h)',
      operator: 'Carlos Peña',
      hydraulicPressure: '175 Bar',
      coolantTemp: '79°C (Normal)',
      batteryVoltage: '12.8 V',
      gpsCoords: '18.9367° N, 70.4092° W',
      geofence: 'Valle Arrocero Yuna',
      sosFluid: 'Filtro Anti-Bagazo Limpio',
      dtc: 'Sin Fallas Activas'
    }
  ];

  var OEM_PARTS = [
    { partNo: 'JCB-20/9253401', desc: 'Bomba Hidráulica Principal Kawasaki K3V112DT', machine: 'JCB JS220 / JS200', cat: 'hydraulics', stock: '2 en stock Km 22', price: 3500.00 },
    { partNo: 'JCB-991/001472', desc: 'Kit de Sellos de Pistón de Pluma 140mm', machine: 'JCB 3CX / JS220', cat: 'cylinders', stock: '14 en stock Km 22', price: 350.00 },
    { partNo: 'JCB-32/9253461', desc: 'Filtro Hidráulico de Retorno 10 Micras', machine: 'Universal JCB', cat: 'filters', stock: '28 en stock Km 22', price: 85.00 },
    { partNo: 'LS-40007521', desc: 'Filtro de Aceite de Motor Diésel Tier 3', machine: 'LS Tractor MT357C', cat: 'filters', stock: '20 en stock Km 22', price: 45.00 },
    { partNo: 'LG-40C0448', desc: 'Bomba de Transmisión ZF PowerShift', machine: 'LiuGong 856H', cat: 'drivetrain', stock: '1 en stock Km 22', price: 1850.00 },
    { partNo: 'JCB-332/Y3163', desc: 'Zapatas y Eslabón de Cadena de Oruga 600mm', machine: 'JCB JS220SC', cat: 'undercarriage', stock: '48 tramos en Km 22', price: 240.00 },
    { partNo: 'PERK-2645K016', desc: 'Inyector Diésel Common Rail Delphi', machine: 'Motor Perkins 1104D', cat: 'engine', stock: '8 en stock Km 22', price: 420.00 },
    { partNo: 'BOM-05755340', desc: 'Amortiguador de Tambor de Rodillo 211', machine: 'Bomag BW 211', cat: 'brakes', stock: '6 en stock Km 22', price: 290.00 }
  ];

  /* ══════════════════════════════════════════════════════════════════ */
  /* DOM INITIALIZATION                                                 */
  /* ══════════════════════════════════════════════════════════════════ */
  function initPortalsDOM() {
    if (document.getElementById('tmd-portals-root')) return;

    var container = document.createElement('div');
    container.id = 'tmd-portals-root';
    container.innerHTML = `
      
      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- 1. PORTAL DE CLIENTES & CONTRATISTAS (STRICTLY CLIENT)      -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div id="tmd-client-portal" class="tmd-portal-fullscreen">
        <div class="tmd-portal-app">
          
          <!-- LEFT RAIL SIDEBAR (Strictly Client) -->
          <aside class="tmd-portal-sidebar">
            <div>
              <div class="tmd-sidebar-brand">
                <div class="tmd-sidebar-brand-icon">TMD</div>
                <div class="tmd-sidebar-brand-text">
                  <h2>TMD Heavy Hub</h2>
                  <p>PORTAL CLIENTES & CONTRATISTAS</p>
                </div>
              </div>

              <!-- Action Button '+ New Request' -->
              <button class="tmd-btn-new-request" onclick="window.tmdSwitchClientNav('nav-booking')">
                <span>+ Nueva Solicitud</span>
              </button>

              <!-- Client Navigation Items (No Staff/Admin Options!) -->
              <nav class="tmd-sidebar-nav">
                <div class="tmd-nav-item active" data-cnav="nav-workflow" onclick="window.tmdSwitchClientNav('nav-workflow')">
                  <span>🏠 Inicio / Workflow</span>
                  <span class="tmd-nav-badge">4 FASES</span>
                </div>

                <div class="tmd-nav-item" data-cnav="nav-quotes" onclick="window.tmdSwitchClientNav('nav-quotes')">
                  <span>📑 Cotizaciones & Firma</span>
                  <span class="tmd-nav-badge" style="background:rgba(245,158,11,0.2);color:#facc15;">1 PEND</span>
                </div>

                <div class="tmd-nav-item" data-cnav="nav-orders" onclick="window.tmdSwitchClientNav('nav-orders')">
                  <span>📋 Órdenes de Taller (WO)</span>
                  <span class="tmd-nav-badge">348 BAR</span>
                </div>

                <div class="tmd-nav-item" data-cnav="nav-fleet" onclick="window.tmdSwitchClientNav('nav-fleet')">
                  <span>🚜 Maquinaria & Activos</span>
                  <span class="tmd-nav-badge">4 EQUIPOS</span>
                </div>

                <div class="tmd-nav-item" data-cnav="nav-parts" onclick="window.tmdSwitchClientNav('nav-parts')">
                  <span>📦 Catálogo Repuestos OEM</span>
                  <span class="tmd-nav-badge" id="tmd-cart-badge">0</span>
                </div>

                <div class="tmd-nav-item" data-cnav="nav-vault" onclick="window.tmdSwitchClientNav('nav-vault')">
                  <span>📂 Bóveda Documental</span>
                  <span class="tmd-nav-badge">6 DOCS</span>
                </div>

                <div class="tmd-nav-item" data-cnav="nav-booking" onclick="window.tmdSwitchClientNav('nav-booking')">
                  <span>⏱️ Agendar Bahía Express</span>
                </div>
              </nav>
            </div>

            <!-- Client Sidebar Footer: Strictly Logout Only -->
            <div class="tmd-sidebar-footer">
              <div class="tmd-user-badge">
                <div class="tmd-user-avatar">CM</div>
                <div class="tmd-user-info">
                  <div class="tmd-user-name">Consorcio Malespín S.R.L.</div>
                  <div class="tmd-user-role">RNC: 1-31-84920-1 · TIER 1</div>
                </div>
              </div>

              <!-- Strictly Log Out Button (No Role Switching!) -->
              <button class="tmd-btn-outline" style="width:100%;justify-content:center;color:#f87171;border-color:rgba(248,113,113,0.3);" onclick="window.tmdClientLogout()">
                Cerrar Sesión Segura
              </button>
            </div>
          </aside>

          <!-- MAIN CLIENT WORKSPACE VIEWPORT -->
          <main class="tmd-portal-main">
            <header class="tmd-portal-topbar">
              <div class="tmd-topbar-breadcrumbs">
                <span>Portal Clientes</span>
                <span>/</span>
                <span class="active" id="tmd-client-active-title">Inicio / Workflow</span>
              </div>

              <div style="display:flex;align-items:center;gap:12px;">
                <div class="tmd-status-pill">
                  <span class="tmd-dot"></span>
                  <span>LIVELINK GPS CONECTADO</span>
                </div>
                <button class="tmd-btn-icon" onclick="window.tmdCloseClientPortal()" title="Cerrar y volver al sitio">
                  ✕
                </button>
              </div>
            </header>

            <!-- PANE 1: WORKFLOW & EXECUTIVE DASHBOARD (Foto 5 - NO BLUES) -->
            <section id="cpane-workflow" class="tmd-client-pane" style="display:block;">
              <div class="tmd-workflow-ribbon">
                <div class="tmd-ribbon-card" style="--accent-color:#f59e0b;" onclick="window.tmdSwitchClientNav('nav-booking')">
                  <div class="tmd-ribbon-header">
                    <span class="tmd-ribbon-title">Solicitudes</span>
                    <span class="tmd-status-tag tmd-tag-amber">NUEVAS</span>
                  </div>
                  <div class="tmd-ribbon-number">21 <span class="tmd-ribbon-amount">$11.2K</span></div>
                  <div class="tmd-ribbon-sub"><span>Diagnósticos: 15</span><span>En cola: 6</span></div>
                </div>

                <div class="tmd-ribbon-card" style="--accent-color:#d97706;" onclick="window.tmdSwitchClientNav('nav-quotes')">
                  <div class="tmd-ribbon-header">
                    <span class="tmd-ribbon-title">Cotizaciones</span>
                    <span class="tmd-status-tag tmd-tag-yellow">POR FIRMAR</span>
                  </div>
                  <div class="tmd-ribbon-number">16 <span class="tmd-ribbon-amount">$15.4K</span></div>
                  <div class="tmd-ribbon-sub"><span>Borradores: 9</span><span>Para firma: 7</span></div>
                </div>

                <div class="tmd-ribbon-card" style="--accent-color:#10b981;" onclick="window.tmdSwitchClientNav('nav-orders')">
                  <div class="tmd-ribbon-header">
                    <span class="tmd-ribbon-title">Taller Km 22</span>
                    <span class="tmd-status-tag tmd-tag-green">EN BAHÍAS</span>
                  </div>
                  <div class="tmd-ribbon-number">4 <span class="tmd-ribbon-amount">$11.9K</span></div>
                  <div class="tmd-ribbon-sub"><span>En banco 350 Bar: 3</span><span>Listo retiro: 1</span></div>
                </div>

                <div class="tmd-ribbon-card" style="--accent-color:#ffffff;" onclick="window.tmdSwitchClientNav('nav-vault')">
                  <div class="tmd-ribbon-header">
                    <span class="tmd-ribbon-title">Facturación NCF</span>
                    <span class="tmd-status-tag tmd-tag-mono">POR PAGAR</span>
                  </div>
                  <div class="tmd-ribbon-number">5 <span class="tmd-ribbon-amount">$4,150.00</span></div>
                  <div class="tmd-ribbon-sub"><span>Comprobante B01: 3</span><span>Vencen en 6 días</span></div>
                </div>
              </div>

              <!-- Today Appointments + Receivables -->
              <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;padding:0 28px 40px;">
                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
                  <h3 style="margin:0 0 16px 0;font-size:1.05rem;color:#ffffff;">Turnos de Hoy en Taller Central Km 22</h3>
                  <div style="display:flex;flex-direction:column;gap:12px;">
                    <div style="padding:14px;background:#121214;border:1px solid rgba(255,255,255,0.06);border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
                      <div>
                        <div style="font-size:0.75rem;color:#facc15;font-weight:700;font-family:'JetBrains Mono',monospace;">09:00 AM · BAHÍA 3</div>
                        <div style="font-weight:700;color:#ffffff;font-size:0.85rem;margin-top:2px;">Excavadora JCB JS220SC — Prueba Hidráulica 350 Bar</div>
                      </div>
                      <span class="tmd-status-tag tmd-tag-amber">EN BANCO</span>
                    </div>

                    <div style="padding:14px;background:#121214;border:1px solid rgba(255,255,255,0.06);border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
                      <div>
                        <div style="font-size:0.75rem;color:#34d399;font-weight:700;font-family:'JetBrains Mono',monospace;">01:30 PM · DESPACHO</div>
                        <div style="font-weight:700;color:#ffffff;font-size:0.85rem;margin-top:2px;">Cargador Frontal LiuGong 856H — Inspección DVI Final</div>
                      </div>
                      <span class="tmd-status-tag tmd-tag-green">LISTO RETIRO</span>
                    </div>
                  </div>
                </div>

                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">
                  <div>
                    <div style="font-size:0.75rem;font-weight:700;color:#a1a1aa;text-transform:uppercase;">Balance Total Pendiente</div>
                    <div style="font-size:2rem;font-weight:900;color:#ffffff;font-family:'JetBrains Mono',monospace;margin:6px 0;">$4,150.00 <span style="font-size:0.8rem;color:#71717a;">USD</span></div>
                    <div style="font-size:0.75rem;color:#a1a1aa;">Factura Fiscal NCF B01000492</div>
                  </div>
                  <button class="tmd-btn-pay-primary" style="margin-top:20px;" onclick="window.tmdSwitchClientNav('nav-quotes')">
                    Revisar Cotización & Pagar Anticipo →
                  </button>
                </div>
              </div>
            </section>

            <!-- PANE 2: COTIZACIONES & FIRMA DIGITAL (Jobber Style - Foto 1 y 2 - NO BLUES) -->
            <section id="cpane-quotes" class="tmd-client-pane" style="display:none;">
              <div class="tmd-split-workspace">
                <div class="tmd-doc-sheet">
                  <div class="tmd-doc-topbar">
                    <button class="tmd-btn-outline" onclick="window.tmdSwitchClientNav('nav-workflow')">← Volver</button>
                    <button class="tmd-btn-outline" onclick="window.tmdShowToast('Descargando Cotización #11555 formal en PDF oficial TMD...', 'info')">📥 Descargar PDF</button>
                  </div>

                  <div class="tmd-doc-meta-grid">
                    <div class="tmd-doc-client-info">
                      <div style="font-size:0.75rem;font-weight:700;color:#facc15;font-family:'JetBrains Mono',monospace;margin-bottom:4px;">
                        COTIZACIÓN DE REPARACIÓN #11555
                      </div>
                      <h3>Consorcio Malespín S.R.L.</h3>
                      <p>Av. Luperón Esq. Mirador Sur, Santo Domingo · RNC: 1-31-84920-1</p>
                      <div style="margin-top:10px;display:inline-block;padding:4px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:6px;font-size:0.75rem;color:#facc15;">
                        Equipo: <strong>Excavadora JCB JS220SC</strong> (VIN: JCB220SC2024X981)
                      </div>
                    </div>

                    <div style="text-align:right;">
                      <span class="tmd-status-tag tmd-tag-yellow">En espera de respuesta</span>
                      <div style="margin-top:12px;font-size:0.78rem;color:#a1a1aa;">Fecha: <strong style="color:#ffffff;">10 Sep 2026</strong></div>
                      <div style="font-size:0.78rem;color:#a1a1aa;">Válida hasta: <strong style="color:#ffffff;">10 Oct 2026</strong></div>
                    </div>
                  </div>

                  <table class="tmd-doc-table">
                    <thead>
                      <tr>
                        <th>Producto / Servicio Técnico</th>
                        <th style="text-align:center;">Cant.</th>
                        <th style="text-align:right;">Precio Unitario</th>
                        <th style="text-align:right;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="tmd-doc-item-title">Bomba Hidráulica Principal Kawasaki K3V112DT</div>
                          <div style="font-size:0.75rem;color:#a1a1aa;">Reemplazo de bomba de pistones axiales para circuito hidráulico principal.</div>
                        </td>
                        <td style="text-align:center;font-family:'JetBrains Mono',monospace;">1</td>
                        <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$3,500.00</td>
                        <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#ffffff;font-weight:700;">$3,500.00</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="tmd-doc-item-title">Kit de Sellos de Pistón de Pluma OEM JCB (JCB-991/001472)</div>
                          <div style="font-size:0.75rem;color:#a1a1aa;">Empaquetadura completa de alta presión para 350 Bar.</div>
                        </td>
                        <td style="text-align:center;font-family:'JetBrains Mono',monospace;">1</td>
                        <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$350.00</td>
                        <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#ffffff;font-weight:700;">$350.00</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="tmd-doc-item-title">Calibración en Banco de Pruebas 350 Bar & Mano de Obra</div>
                          <div style="font-size:0.75rem;color:#a1a1aa;">8 horas de pruebas dinámicas y calibración de válvula de alivio a 348 Bar a 60°C.</div>
                        </td>
                        <td style="text-align:center;font-family:'JetBrains Mono',monospace;">8</td>
                        <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$100.00</td>
                        <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#ffffff;font-weight:700;">$800.00</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="tmd-doc-totals">
                    <div class="tmd-total-row"><span>Subtotal:</span><span>$4,650.00</span></div>
                    <div class="tmd-total-row"><span>ITBIS (18% DGII):</span><span>$837.00</span></div>
                    <div class="tmd-total-row grand"><span>Total:</span><span style="color:#facc15;">$5,487.00 USD</span></div>
                    <div class="tmd-total-row" style="color:#10b981;font-weight:800;"><span>Anticipo Requerido:</span><span>$1,000.00 USD</span></div>
                  </div>
                </div>

                <!-- Sticky Checkout Drawer -->
                <aside class="tmd-sticky-checkout">
                  <div style="font-size:0.75rem;font-weight:700;color:#a1a1aa;text-transform:uppercase;">Anticipo Requerido</div>
                  <div class="tmd-checkout-deposit-val">$1,000.00</div>
                  
                  <div class="tmd-payment-methods">
                    <button class="tmd-method-btn active" id="btn-pay-cc" onclick="window.tmdSelectPayMethod('cc')">💳 Tarjeta Crédito</button>
                    <button class="tmd-method-btn" id="btn-pay-bank" onclick="window.tmdSelectPayMethod('bank')">🏦 Banreservas</button>
                  </div>

                  <div class="tmd-card-field-group">
                    <input type="text" class="tmd-input-field" placeholder="Nombre en tarjeta" value="Marcos Malespín" />
                    <input type="text" class="tmd-input-field" placeholder="Número de tarjeta (4242 •••• •••• 8492)" value="•••• •••• •••• 8492" />
                  </div>

                  <button class="tmd-btn-pay-primary" onclick="window.tmdOpenSignatureModal()">
                    Aprobar con Firma Digital & Pagar →
                  </button>
                </aside>
              </div>
            </section>

            <!-- PANE 3: GESTOR DE ACTIVOS, FLOTA & TELEMETRÍA SATELITAL -->
            <section id="cpane-fleet" class="tmd-client-pane" style="display:none;">
              <div style="padding:0 28px 40px;">
                <!-- Telematics Fleet KPI Header -->
                <div style="background:linear-gradient(135deg, #111114 0%, #08080a 100%);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:22px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                      <span class="tmd-dot"></span>
                      <span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:800;color:#10b981;letter-spacing:0.04em;">LIVELINK TELEMATICS &amp; IOT 24/7 ONLINE</span>
                    </div>
                    <h3 style="margin:0;font-size:1.35rem;font-weight:800;color:#ffffff;font-family:'Space Grotesk',sans-serif;">Monitoreo de Flota &amp; Diagnóstico Remoto</h3>
                    <p style="margin:4px 0 0 0;font-size:0.75rem;color:#a1a1aa;">Telemetría en tiempo real: Presión hidráulica (hasta 350 Bar), geocercas en proyectos RD, análisis de fluidos SOS y conteo de horas.</p>
                  </div>
                  <div style="display:flex;gap:10px;">
                    <button class="tmd-btn-pay-primary" onclick="if(typeof window.tmdOpenTelematicsCockpit==='function'){window.tmdOpenTelematicsCockpit();}else{window.tmdShowToast('Cargando telemetría LiveLink...', 'info');}" style="padding:10px 18px;font-size:0.78rem;">
                      🛰️ Abrir Cockpit Telemetría Completo
                    </button>
                  </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;" id="tmd-fleet-container">
                  <!-- Rendered dynamically -->
                </div>
              </div>
            </section>

            <!-- PANE 4: CATÁLOGO OEM DE REPUESTOS CON CARRITO -->
            <section id="cpane-parts" class="tmd-client-pane" style="display:none;">
              <div style="padding:0 28px 40px;">
                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-bottom:24px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                    <div>
                      <h3 style="margin:0;font-size:1.2rem;color:#ffffff;">CATÁLOGO OEM · ALMACÉN CENTRAL KM 22</h3>
                      <p style="margin:2px 0 0 0;font-size:0.75rem;color:#a1a1aa;">Inventario en tiempo real de repuestos originales JCB, LS Tractor, LiuGong y Perkins.</p>
                    </div>
                    <button class="tmd-btn-outline" onclick="window.tmdCheckoutCart()">
                      🛒 Ver Carrito (<span id="tmd-cart-count">0</span> piezas)
                    </button>
                  </div>

                  <div style="display:flex;gap:12px;">
                    <input type="text" class="tmd-input-field" placeholder="Buscar por número de parte OEM (JCB-20/9253401) o descripción..." oninput="window.tmdSearchParts(this.value)" style="flex:2;" />
                    <select class="tmd-input-field" style="flex:1;" onchange="window.tmdFilterPartsCat(this.value)">
                      <option value="all">Todas las Categorías</option>
                      <option value="hydraulics">Hidráulica 350 Bar</option>
                      <option value="filters">Filtros & Mantenimiento</option>
                      <option value="undercarriage">Tren de Rodaje & Orugas</option>
                      <option value="engine">Motores Diésel</option>
                    </select>
                  </div>
                </div>

                <table class="tmd-doc-table">
                  <thead>
                    <tr>
                      <th>Nº Parte OEM</th>
                      <th>Descripción</th>
                      <th>Equipo Compatible</th>
                      <th>Disponibilidad</th>
                      <th style="text-align:right;">Precio USD</th>
                      <th style="text-align:center;">Acción</th>
                    </tr>
                  </thead>
                  <tbody id="tmd-parts-tbody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </section>

            <!-- PANE 5: BÓVEDA DOCUMENTAL (FUSEBASE STYLE - NO BLUES) -->
            <section id="cpane-vault" class="tmd-client-pane" style="display:none;">
              <div style="padding:0 28px 40px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                  <div>
                    <h3 style="margin:0;font-size:1.2rem;color:#ffffff;">BÓVEDA DOCUMENTAL & FISCAL (FUSEBASE STANDARD)</h3>
                    <p style="margin:2px 0 0 0;font-size:0.75rem;color:#a1a1aa;">Facturas NCF B01, contratos de alquiler, órdenes de trabajo y certificados de banco de pruebas 350 Bar.</p>
                  </div>
                  <div style="display:flex;gap:8px;">
                    <button class="tmd-btn-outline" onclick="window.tmdFilterVault('all')">Todos</button>
                    <button class="tmd-btn-outline" onclick="window.tmdFilterVault('invoice')">Facturas NCF</button>
                    <button class="tmd-btn-outline" onclick="window.tmdFilterVault('cert')">Certificados 350 Bar</button>
                  </div>
                </div>

                <div class="tmd-vault-grid" id="tmd-vault-container">
                  <!-- Populated dynamically -->
                </div>
              </div>
            </section>

            <!-- PANE 6: BOOKING EXPRESS BAY -->
            <section id="cpane-booking" class="tmd-client-pane" style="display:none;">
              <div style="max-width:650px;margin:0 auto;padding:20px 28px 40px;">
                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
                  <h3 style="margin:0 0 6px 0;font-size:1.2rem;color:#ffffff;">Agendar Bahía Express en Km 22</h3>
                  <p style="margin:0 0 20px 0;font-size:0.75rem;color:#a1a1aa;">Reserva de bahía con asignación inmediata de mecánico y notificación por WhatsApp.</p>
                  
                  <form onsubmit="window.tmdSubmitBooking(event)" style="display:flex;flex-direction:column;gap:14px;">
                    <div>
                      <label style="font-size:0.75rem;color:#a1a1aa;font-weight:700;">Equipo Pesado:</label>
                      <input type="text" id="tmd-book-machine" class="tmd-input-field" value="Excavadora JCB JS220SC" required />
                    </div>
                    <div>
                      <label style="font-size:0.75rem;color:#a1a1aa;font-weight:700;">Tipo de Servicio:</label>
                      <select id="tmd-book-service" class="tmd-input-field">
                        <option value="350bar">Calibración en Banco de Pruebas Hidráulicas 350 Bar</option>
                        <option value="express">Mantenimiento Preventivo Express 250h / 500h</option>
                        <option value="rodaje">Tren de Rodaje & Orugas</option>
                      </select>
                    </div>
                    <div>
                      <label style="font-size:0.75rem;color:#a1a1aa;font-weight:700;">Fecha de Ingreso:</label>
                      <input type="date" id="tmd-book-date" class="tmd-input-field" value="2026-09-22" required />
                    </div>
                    <button type="submit" class="tmd-btn-pay-primary" style="margin-top:10px;">
                      Confirmar Reserva de Bahía →
                    </button>
                  </form>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- 2. PORTAL MESA TÉCNICA TALLER KM 22 (STRICTLY WORKSHOP)     -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div id="tmd-staff-portal" class="tmd-portal-fullscreen">
        <div class="tmd-portal-app">
          
          <aside class="tmd-portal-sidebar">
            <div>
              <div class="tmd-sidebar-brand">
                <div class="tmd-sidebar-brand-icon" style="background:#10b981;">KM22</div>
                <div class="tmd-sidebar-brand-text">
                  <h2>Taller Central</h2>
                  <p>MESA TÉCNICA · FULLBAY ERP</p>
                </div>
              </div>

              <nav class="tmd-sidebar-nav">
                <div class="tmd-nav-item active" data-snav="staff-bays" onclick="window.tmdSwitchStaffNav('staff-bays')">
                  <span>🏗️ 18 Bahías de Taller</span>
                  <span class="tmd-nav-badge">EN VIVO</span>
                </div>
                <div class="tmd-nav-item" data-snav="staff-orders" onclick="window.tmdSwitchStaffNav('staff-orders')">
                  <span>📋 Órdenes Fullbay (WO)</span>
                  <span class="tmd-nav-badge">4 ACTIVAS</span>
                </div>
                <div class="tmd-nav-item" data-snav="staff-dvi" onclick="window.tmdSwitchStaffNav('staff-dvi')">
                  <span>🚜 Inspección DVI 40 Puntos</span>
                </div>
              </nav>
            </div>

            <div class="tmd-sidebar-footer">
              <div class="tmd-user-badge">
                <div class="tmd-user-avatar" style="background:#10b981;color:#000;">MP</div>
                <div class="tmd-user-info">
                  <div class="tmd-user-name">Ing. Marcos Peña</div>
                  <div class="tmd-user-role">JEFE DE TALLER KM 22</div>
                </div>
              </div>
              <button class="tmd-btn-outline" style="width:100%;justify-content:center;color:#f87171;border-color:rgba(248,113,113,0.3);" onclick="window.tmdCloseStaffPortal()">
                Salir de Taller
              </button>
            </div>
          </aside>

          <main class="tmd-portal-main">
            <header class="tmd-portal-topbar">
              <div class="tmd-topbar-breadcrumbs">
                <span>Mesa Técnica Km 22</span>
                <span>/</span>
                <span class="active" id="tmd-staff-active-title">18 Bahías de Taller</span>
              </div>
              <div style="display:flex;align-items:center;gap:12px;">
                <div class="tmd-status-pill">
                  <span class="tmd-dot"></span>
                  <span>FULLBAY ERP SYNC 1.2MS</span>
                </div>
                <button class="tmd-btn-icon" onclick="window.tmdCloseStaffPortal()">✕</button>
              </div>
            </header>

            <!-- STAFF VIEW 1: 18 BAHÍAS -->
            <section id="spane-bays" class="tmd-staff-pane" style="display:block;padding:24px 28px;">
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <strong style="color:#ffffff;">Bahía 1 — Tren de Fuerza</strong>
                    <span class="tmd-status-tag tmd-tag-amber">OCUPADA</span>
                  </div>
                  <div style="font-size:0.75rem;color:#a1a1aa;line-height:1.6;">
                    <div>Equipo: <strong style="color:#fff;">JCB JS220SC</strong></div>
                    <div>Técnico: <strong>Téc. Rafael Valdez</strong></div>
                    <div>Orden: <strong style="color:#facc15;">WO-8501</strong></div>
                  </div>
                </div>

                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <strong style="color:#ffffff;">Bahía 2 — Tren de Rodaje</strong>
                    <span class="tmd-status-tag tmd-tag-amber">OCUPADA</span>
                  </div>
                  <div style="font-size:0.75rem;color:#a1a1aa;line-height:1.6;">
                    <div>Equipo: <strong style="color:#fff;">LiuGong 856H</strong></div>
                    <div>Técnico: <strong>Ing. Kelvin De León</strong></div>
                    <div>Orden: <strong style="color:#facc15;">WO-8488</strong></div>
                  </div>
                </div>

                <div style="background:#09090b;border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:18px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <strong style="color:#ffffff;">Bahía 3 — Hidráulica 350 Bar</strong>
                    <span class="tmd-status-tag tmd-tag-amber">EN PRUEBA</span>
                  </div>
                  <div style="font-size:0.75rem;color:#a1a1aa;line-height:1.6;">
                    <div>Equipo: <strong style="color:#fff;">JCB JS220SC (Malespín)</strong></div>
                    <div>Lectura: <strong style="color:#10b981;">348 Bar a 60°C</strong></div>
                    <div>Orden: <strong style="color:#facc15;">WO-8492</strong></div>
                  </div>
                </div>

                <div style="background:#09090b;border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:18px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <strong style="color:#ffffff;">Bahía 4 — Express 250h/500h</strong>
                    <span class="tmd-status-tag tmd-tag-green">DISPONIBLE</span>
                  </div>
                  <div style="font-size:0.75rem;color:#a1a1aa;line-height:1.6;">
                    <div>Mecánico: <strong>Téc. Domingo Rosario</strong></div>
                    <div>Estado: <strong style="color:#10b981;">Bahía Libre para Asignación</strong></div>
                  </div>
                </div>
              </div>
            </section>

            <!-- STAFF VIEW 2: FULLBAY ÓRDENES ACTIVAS -->
            <section id="spane-orders" class="tmd-staff-pane" style="display:none;padding:24px 28px;">
              <div style="display:flex;flex-direction:column;gap:14px;">
                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="tmd-status-tag tmd-tag-amber font-mono">WO-8501</span>
                      <strong style="color:#ffffff;font-size:1rem;">JCB JS220SC — Overhaul Tren de Fuerza</strong>
                    </div>
                    <div style="font-size:0.75rem;color:#a1a1aa;margin-top:4px;">Cliente: Constructora Rizek · Técnico: Téc. Rafael Valdez · Bahía 01</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#10b981;font-weight:700;">85% AVANCE</span>
                    <button class="tmd-btn-outline" style="padding:6px 14px;font-size:0.72rem;" onclick="if(typeof window.tmdOpenDviTracker==='function') window.tmdOpenDviTracker('WO-8501');">Ver DVI</button>
                  </div>
                </div>

                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="tmd-status-tag tmd-tag-amber font-mono">WO-8488</span>
                      <strong style="color:#ffffff;font-size:1rem;">LiuGong 856H — Ajuste de Rodillos y Zapatas</strong>
                    </div>
                    <div style="font-size:0.75rem;color:#a1a1aa;margin-top:4px;">Cliente: Agregados del Caribe · Técnico: Ing. Kelvin De León · Bahía 02</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#facc15;font-weight:700;">60% AVANCE</span>
                    <button class="tmd-btn-outline" style="padding:6px 14px;font-size:0.72rem;" onclick="if(typeof window.tmdOpenDviTracker==='function') window.tmdOpenDviTracker('WO-8488');">Ver DVI</button>
                  </div>
                </div>

                <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="tmd-status-tag tmd-tag-green font-mono">WO-8492</span>
                      <strong style="color:#ffffff;font-size:1rem;">JCB 3CX Eco — Calibración Hidráulica 350 Bar</strong>
                    </div>
                    <div style="font-size:0.75rem;color:#a1a1aa;margin-top:4px;">Cliente: Consorcio Malespín S.R.L. · Banco de Presión · Bahía 03</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#10b981;font-weight:700;">95% FINALIZADO</span>
                    <button class="tmd-btn-outline" style="padding:6px 14px;font-size:0.72rem;" onclick="if(typeof window.tmdOpenDviTracker==='function') window.tmdOpenDviTracker('WO-4482');">Ver DVI</button>
                  </div>
                </div>
              </div>
            </section>

            <!-- STAFF VIEW 3: DVI 40 PUNTOS -->
            <section id="spane-dvi" class="tmd-staff-pane" style="display:none;padding:24px 28px;">
              <div style="background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <div>
                    <h3 style="color:#ffffff;font-size:1.1rem;margin:0 0 4px 0;">Inspección Digital de Bahía (Fullbay DVI 40 Puntos)</h3>
                    <p style="font-size:0.75rem;color:#a1a1aa;margin:0;">Checklist técnico obligatorio previo a entrega de equipo al contratista.</p>
                  </div>
                  <button class="tmd-btn-outline" style="color:#10b981;border-color:rgba(16,185,129,0.3);" onclick="if(typeof window.tmdOpenDviTracker==='function') window.tmdOpenDviTracker('WO-4482');">
                    Abrir Auditoría Digital Completa
                  </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
                  <div style="padding:10px;background:#111114;border-radius:8px;border:1px solid rgba(255,255,255,0.05);font-size:0.75rem;color:#ffffff;display:flex;align-items:center;gap:8px;">
                    <span style="color:#10b981;">✓</span> <span>01. Nivel Aceite Hidráulico ISO 68</span>
                  </div>
                  <div style="padding:10px;background:#111114;border-radius:8px;border:1px solid rgba(255,255,255,0.05);font-size:0.75rem;color:#ffffff;display:flex;align-items:center;gap:8px;">
                    <span style="color:#10b981;">✓</span> <span>02. Presión Cilindros 350 Bar</span>
                  </div>
                  <div style="padding:10px;background:#111114;border-radius:8px;border:1px solid rgba(255,255,255,0.05);font-size:0.75rem;color:#ffffff;display:flex;align-items:center;gap:8px;">
                    <span style="color:#10b981;">✓</span> <span>03. Desgaste Orugas / Zapatas</span>
                  </div>
                  <div style="padding:10px;background:#111114;border-radius:8px;border:1px solid rgba(255,255,255,0.05);font-size:0.75rem;color:#ffffff;display:flex;align-items:center;gap:8px;">
                    <span style="color:#10b981;">✓</span> <span>04. Filtro Primario y Ciclónico</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- 3. MODAL DE FIRMA DIGITAL (GOLD / MONOCHROME - NO BLUE)     -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div id="tmd-quote-sig-modal" class="tmd-modal-overlay">
        <div class="tmd-sig-dialog">
          <div class="tmd-sig-dialog-header">
            <h3 style="margin:0;font-size:1.1rem;color:#ffffff;">Aprobar Cotización #11555</h3>
            <button class="tmd-btn-icon" onclick="window.tmdCloseSignatureModal()">✕</button>
          </div>
          <div style="padding:24px;">
            <p style="font-size:0.78rem;color:#a1a1aa;margin:0 0 12px 0;">
              Dibuje su firma manuscrita para autorizar la reparación de la Excavadora JCB JS220SC y el cargo de anticipo por USD $1,000.00.
            </p>
            <div class="tmd-canvas-wrapper">
              <canvas id="tmd-standalone-sig-canvas"></canvas>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
              <span style="font-size:0.68rem;color:#71717a;font-family:'JetBrains Mono',monospace;">Certificado Digital SHA-256 TMD</span>
              <button class="tmd-btn-outline" style="padding:4px 10px;font-size:0.72rem;" onclick="window.tmdClearSignature()">Limpiar</button>
            </div>
          </div>
          <div style="padding:16px 24px;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;background:#09090b;">
            <button class="tmd-btn-outline" onclick="window.tmdCloseSignatureModal()">Cancelar</button>
            <button class="tmd-btn-pay-primary" style="width:auto;padding:10px 24px;" onclick="window.tmdConfirmSignature()">
              Confirmar Aprobación con Firma →
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    renderFleetAssets();
    renderPartsTable(OEM_PARTS);
    renderVaultDocuments(VAULT_DOCUMENTS);
    initSigPad();
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* GESTOR DE ACTIVOS & MAQUINARIA                                     */
  /* ══════════════════════════════════════════════════════════════════ */
  function renderFleetAssets() {
    var c = document.getElementById('tmd-fleet-container');
    if (!c) return;

    c.innerHTML = FLEET_ASSETS.map(function(eq) {
      return `
        <div style="background:#0a0a0c;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;transition:border-color 0.2s, box-shadow 0.2s;box-shadow:0 10px 25px rgba(0,0,0,0.5);" onmouseover="this.style.borderColor='rgba(255,184,0,0.35)';this.style.boxShadow='0 0 20px rgba(255,184,0,0.15)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.boxShadow='0 10px 25px rgba(0,0,0,0.5)'">
          <div>
            <!-- Header -->
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:12px;">
              <div>
                <span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;font-weight:800;color:#ffb800;padding:2px 8px;border-radius:9999px;background:rgba(255,184,0,0.12);border:1px solid rgba(255,184,0,0.25);">${eq.id}</span>
                <h4 style="color:#ffffff;font-size:1.05rem;font-weight:800;margin:6px 0 2px 0;font-family:'Space Grotesk',sans-serif;">${eq.name}</h4>
                <div style="font-size:0.72rem;color:#71717a;font-family:'JetBrains Mono',monospace;">VIN: ${eq.vin}</div>
              </div>
              <span class="tmd-status-tag ${eq.status === 'OPERATIVA' ? 'tmd-tag-green' : 'tmd-tag-amber'}">${eq.status}</span>
            </div>
            
            <!-- Telemetry Metrics Grid -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
              <div style="background:#111114;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:10px;">
                <div style="font-size:0.65rem;color:#71717a;font-family:'JetBrains Mono',monospace;text-transform:uppercase;">Horómetro Motor</div>
                <div style="font-size:0.95rem;font-weight:800;color:#facc15;font-family:'JetBrains Mono',monospace;margin-top:2px;">${eq.hours}</div>
              </div>
              <div style="background:#111114;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:10px;">
                <div style="font-size:0.65rem;color:#71717a;font-family:'JetBrains Mono',monospace;text-transform:uppercase;">Presión Hidráulica</div>
                <div style="font-size:0.95rem;font-weight:800;color:#10b981;font-family:'JetBrains Mono',monospace;margin-top:2px;">${eq.hydraulicPressure}</div>
              </div>
              <div style="background:#111114;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:10px;">
                <div style="font-size:0.65rem;color:#71717a;font-family:'JetBrains Mono',monospace;text-transform:uppercase;">Diésel en Tanque</div>
                <div style="font-size:0.95rem;font-weight:800;color:#38bdf8;font-family:'JetBrains Mono',monospace;margin-top:2px;">${eq.fuel}% · ${eq.coolantTemp}</div>
              </div>
              <div style="background:#111114;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:10px;">
                <div style="font-size:0.65rem;color:#71717a;font-family:'JetBrains Mono',monospace;text-transform:uppercase;">Voltaje Batería</div>
                <div style="font-size:0.95rem;font-weight:800;color:#cbd5e1;font-family:'JetBrains Mono',monospace;margin-top:2px;">${eq.batteryVoltage}</div>
              </div>
            </div>

            <!-- Health & Geo Diagnostics -->
            <div style="font-size:0.75rem;color:#a1a1aa;line-height:1.6;background:#060608;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:12px;margin-bottom:14px;">
              <div>📍 <strong>Ubicación:</strong> <span>${eq.location}</span> (${eq.gpsCoords})</div>
              <div>🛡️ <strong>Geocerca:</strong> <span style="color:#10b981;">${eq.geofence}</span></div>
              <div>🧪 <strong>Análisis SOS:</strong> <span style="color:#ffb800;">${eq.sosFluid}</span></div>
              <div>⏱️ <strong>Próximo Servicio:</strong> <span style="color:#facc15;">${eq.nextServiceIn}</span></div>
            </div>
          </div>

          <!-- Action Buttons Bar -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;">
            <button class="tmd-btn-outline" style="flex:1;justify-content:center;padding:8px 10px;font-size:0.72rem;" onclick="if(typeof window.tmdOpenTelematicsCockpit==='function'){window.tmdOpenTelematicsCockpit('${eq.vin}');}">
              🛰️ Telemetría
            </button>
            <button class="tmd-btn-outline" style="flex:1;justify-content:center;padding:8px 10px;font-size:0.72rem;" onclick="if(typeof window.tmdOpenPartsSerialEngine==='function'){window.tmdOpenPartsSerialEngine('${eq.vin}');}">
              ⚙️ Despiece VIN
            </button>
            <button class="tmd-btn-outline" style="flex:1;justify-content:center;padding:8px 10px;font-size:0.72rem;color:#ffb800;border-color:rgba(255,184,0,0.3);" onclick="document.getElementById('tmd-book-machine').value='${eq.name}';window.tmdSwitchClientNav('nav-booking');">
              ⏱️ Cita Taller
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* BÓVEDA DOCUMENTAL (FUSEBASE STYLE)                                 */
  /* ══════════════════════════════════════════════════════════════════ */
  function renderVaultDocuments(docs) {
    var c = document.getElementById('tmd-vault-container');
    if (!c) return;

    c.innerHTML = docs.map(function(d) {
      var icon = d.type === 'invoice' ? '💳' : (d.type === 'cert' ? '⚙️' : (d.type === 'contract' ? '📑' : '📋'));
      return `
        <div class="tmd-vault-card">
          <div>
            <div class="tmd-vault-icon">${icon}</div>
            <div style="font-size:0.7rem;color:#facc15;font-family:'JetBrains Mono',monospace;font-weight:700;">${d.id}</div>
            <h4 style="margin:4px 0 6px 0;font-size:0.85rem;color:#ffffff;line-height:1.4;">${d.title}</h4>
            <div style="font-size:0.72rem;color:#71717a;">Ref: ${d.ref} · ${d.date}</div>
          </div>
          <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.06);padding-top:12px;">
            <span style="font-size:0.7rem;color:#a1a1aa;font-family:'JetBrains Mono',monospace;">${d.size}</span>
            <button class="tmd-btn-outline" style="padding:4px 10px;font-size:0.72rem;" onclick="window.tmdShowToast('Descargando ' + '${d.title}' + ' (PDF oficial TMD)...', 'info')">
              Descargar PDF
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.tmdFilterVault = function(type) {
    if (type === 'all') {
      renderVaultDocuments(VAULT_DOCUMENTS);
    } else {
      var filtered = VAULT_DOCUMENTS.filter(function(d) { return d.type === type; });
      renderVaultDocuments(filtered);
    }
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* CATÁLOGO DE REPUESTOS CON CARRITO                                  */
  /* ══════════════════════════════════════════════════════════════════ */
  function renderPartsTable(parts) {
    var tbody = document.getElementById('tmd-parts-tbody');
    if (!tbody) return;

    tbody.innerHTML = parts.map(function(p) {
      return `
        <tr>
          <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">${p.partNo}</strong></td>
          <td><div style="color:#ffffff;font-weight:600;">${p.desc}</div></td>
          <td><span style="color:#a1a1aa;">${p.machine}</span></td>
          <td><span class="tmd-status-tag tmd-tag-green">${p.stock}</span></td>
          <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#ffffff;font-weight:700;">$${p.price.toFixed(2)}</td>
          <td style="text-align:center;">
            <button class="tmd-btn-outline" style="padding:4px 10px;font-size:0.72rem;" onclick="window.tmdAddToCart('${p.partNo}')">
              + Añadir
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.tmdAddToCart = function(partNo) {
    var item = OEM_PARTS.find(function(p) { return p.partNo === partNo; });
    if (item) {
      _cartItems.push(item);
      var badge = document.getElementById('tmd-cart-badge');
      var count = document.getElementById('tmd-cart-count');
      if (badge) badge.innerText = _cartItems.length;
      if (count) count.innerText = _cartItems.length;
      window.tmdShowToast('Pieza ' + item.partNo + ' agregada al pedido.', 'success');
    }
  };

  window.tmdCheckoutCart = function() {
    if (_cartItems.length === 0) {
      window.tmdShowToast('El carrito de requisición está vacío. Seleccione piezas del catálogo.', 'error');
      return;
    }
    var list = _cartItems.map(function(p) { return '• ' + p.partNo + ' (' + p.desc + ') - $' + p.price; }).join('\n');
    var msg = 'Solicitud de Despacho desde Portal TMD:\n\nCliente: ' + CLIENT_DATA.company + '\nRNC: ' + CLIENT_DATA.rnc + '\n\nPiezas Requeridas:\n' + list;
    window.open('https://api.whatsapp.com/send/?phone=18098262222&text=' + encodeURIComponent(msg), '_blank');
  };

  window.tmdSearchParts = function(q) {
    var query = (q || '').toLowerCase().trim();
    var filtered = OEM_PARTS.filter(function(p) {
      return p.partNo.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.machine.toLowerCase().includes(query);
    });
    renderPartsTable(filtered);
  };

  window.tmdFilterPartsCat = function(cat) {
    if (cat === 'all') {
      renderPartsTable(OEM_PARTS);
    } else {
      var filtered = OEM_PARTS.filter(function(p) { return p.cat === cat; });
      renderPartsTable(filtered);
    }
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* SIGNATURE PAD (NO BLUES — HAZARD GOLD INK)                        */
  /* ══════════════════════════════════════════════════════════════════ */
  var sigCanvas, sigCtx, sigDrawing = false;

  function initSigPad() {
    sigCanvas = document.getElementById('tmd-standalone-sig-canvas');
    if (!sigCanvas) return;

    sigCtx = sigCanvas.getContext('2d');
    sigCanvas.width = 460;
    sigCanvas.height = 180;
    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = 'round';
    sigCtx.strokeStyle = '#f59e0b'; // STRICT HAZARD GOLD (NO BLUE)

    function getPos(e) {
      var rect = sigCanvas.getBoundingClientRect();
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    }

    sigCanvas.addEventListener('mousedown', function(e) {
      sigDrawing = true;
      var pos = getPos(e);
      sigCtx.beginPath();
      sigCtx.moveTo(pos.x, pos.y);
      e.preventDefault();
    });

    sigCanvas.addEventListener('mousemove', function(e) {
      if (!sigDrawing) return;
      var pos = getPos(e);
      sigCtx.lineTo(pos.x, pos.y);
      sigCtx.stroke();
      e.preventDefault();
    });

    window.addEventListener('mouseup', function() { sigDrawing = false; });
  }

  window.tmdClearSignature = function() {
    if (sigCanvas && sigCtx) sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  };

  window.tmdOpenSignatureModal = function() {
    var m = document.getElementById('tmd-quote-sig-modal');
    if (m) m.style.display = 'flex';
  };

  window.tmdCloseSignatureModal = function() {
    var m = document.getElementById('tmd-quote-sig-modal');
    if (m) m.style.display = 'none';
  };

  window.tmdConfirmSignature = function() {
    window.tmdCloseSignatureModal();
    window.tmdShowToast('¡Cotización #11555 Aprobada! Anticipo Square procesado y Bahía 3 reservada en Km 22.', 'success');
    window.tmdSwitchClientNav('nav-orders');
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* CLIENT PORTAL ROUTING & ACCESS                                     */
  /* ══════════════════════════════════════════════════════════════════ */
  window.tmdOpenClientPortal = function() {
    initPortalsDOM();
    var modal = document.getElementById('tmd-client-portal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  window.tmdCloseClientPortal = function() {
    var modal = document.getElementById('tmd-client-portal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  window.tmdClientLogout = function() {
    window.tmdCloseClientPortal();
    window.tmdShowToast('Sesión de cliente cerrada correctamente.', 'info');
  };

  window.tmdSwitchClientNav = function(navId) {
    _activeClientNav = navId;

    var items = document.querySelectorAll('[data-cnav]');
    items.forEach(function(el) {
      if (el.getAttribute('data-cnav') === navId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    var panes = document.querySelectorAll('.tmd-client-pane');
    panes.forEach(function(p) { p.style.display = 'none'; });

    var map = {
      'nav-workflow': { pane: 'cpane-workflow', title: 'Inicio / Workflow' },
      'nav-quotes': { pane: 'cpane-quotes', title: 'Cotizaciones & Firma' },
      'nav-orders': { pane: 'cpane-orders', title: 'Órdenes de Taller (WO)' },
      'nav-fleet': { pane: 'cpane-fleet', title: 'Maquinaria & Activos' },
      'nav-parts': { pane: 'cpane-parts', title: 'Catálogo Repuestos OEM' },
      'nav-vault': { pane: 'cpane-vault', title: 'Bóveda Documental' },
      'nav-booking': { pane: 'cpane-booking', title: 'Agendar Bahía Express' }
    };

    var target = map[navId] || map['nav-workflow'];
    var p = document.getElementById(target.pane);
    if (p) p.style.display = 'block';

    var t = document.getElementById('tmd-client-active-title');
    if (t) t.innerText = target.title;
  };

  window.tmdSelectPayMethod = function(m) {
    var btnCC = document.getElementById('btn-pay-cc');
    var btnBank = document.getElementById('btn-pay-bank');
    if (m === 'cc') {
      if (btnCC) btnCC.classList.add('active');
      if (btnBank) btnBank.classList.remove('active');
    } else {
      if (btnBank) btnBank.classList.add('active');
      if (btnCC) btnCC.classList.remove('active');
    }
  };

  window.tmdSubmitBooking = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var machineEl = document.getElementById('tmd-book-machine');
    var serviceEl = document.getElementById('tmd-book-service');
    var dateEl = document.getElementById('tmd-book-date');
    var machine = machineEl ? machineEl.value : 'JCB 3CX Eco';
    var service = serviceEl ? serviceEl.value : 'Mantenimiento Preventivo 500h';
    var date = dateEl ? dateEl.value : '2026-10-01';

    var waMsg = 'Hola TMD Dominicana, he solicitado una reserva de bahía en Taller Km 22:\n• Equipo: ' + machine + '\n• Servicio: ' + service + '\n• Fecha: ' + date;
    window.open('https://api.whatsapp.com/send/?phone=18098262222&text=' + encodeURIComponent(waMsg), '_blank');
    window.tmdSwitchClientNav('nav-workflow');
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* STAFF WORKSHOP PORTAL ROUTING (STRICTLY PIN 2222)                  */
  /* ══════════════════════════════════════════════════════════════════ */
  window.tmdOpenStaffPortal = function() {
    var pin = prompt('Ingrese PIN de Personal Taller Km 22 (Default: 2222):');
    if (pin === STAFF_PIN || pin === '0909') {
      initPortalsDOM();
      var modal = document.getElementById('tmd-staff-portal');
      if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    } else if (pin !== null) {
      window.tmdShowToast('PIN de personal incorrecto. Acceso denegado a la Mesa Técnica.', 'error');
    }
  };

  window.tmdCloseStaffPortal = function() {
    var modal = document.getElementById('tmd-staff-portal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  window.tmdSwitchStaffNav = function(navId) {
    _activeStaffNav = navId;
    document.querySelectorAll('.tmd-staff-pane').forEach(function(pane) {
      pane.style.display = 'none';
    });
    document.querySelectorAll('[data-snav]').forEach(function(btn) {
      btn.classList.remove('active');
    });

    var activeBtn = document.querySelector('[data-snav="' + navId + '"]');
    if (activeBtn) activeBtn.classList.add('active');

    var paneId = 'spane-bays';
    var title = '18 Bahías de Taller';
    if (navId === 'staff-orders') {
      paneId = 'spane-orders';
      title = 'Órdenes Fullbay ERP';
    } else if (navId === 'staff-dvi') {
      paneId = 'spane-dvi';
      title = 'Inspección DVI 40 Puntos';
    }

    var pane = document.getElementById(paneId);
    if (pane) pane.style.display = 'block';

    var titleEl = document.getElementById('tmd-staff-active-title');
    if (titleEl) titleEl.innerText = title;
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* ADMIN IT CONSOLE ROUTING (STRICTLY PIN 9999)                       */
  /* ══════════════════════════════════════════════════════════════════ */
  window.tmdOpenAdminPortal = function() {
    var pin = prompt('Ingrese PIN de Administrador TI (Default: 9999):');
    if (pin === ADMIN_PIN || pin === '0909') {
      var particlesActive = localStorage.getItem('tmd_particles_active') !== 'false';
      var mouseGlow = localStorage.getItem('tmd_mouse_glow') !== 'false';
      var glowLvl = localStorage.getItem('tmd_glow_level') || 'medium';

      var msg = 'CONSOLA TI & ADMINISTRACIÓN WEB:\n\n' +
                '1. Partículas y Constelaciones: ' + (particlesActive ? 'ACTIVADAS' : 'DESACTIVADAS') + '\n' +
                '2. Mouse Glow 1:1: ' + (mouseGlow ? 'ACTIVADO' : 'DESACTIVADO') + '\n' +
                '3. Nivel de Resplandor: ' + glowLvl + '\n\n' +
                '¿Desea alternar el efecto de partículas en tiempo real?';

      if (confirm(msg)) {
        window.tmdToggleParticles(!particlesActive);
      }
    } else if (pin !== null) {
      window.tmdShowToast('PIN de Administrador TI incorrecto.', 'error');
    }
  };

  window.tmdToggleParticles = function(active) {
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (canvas) canvas.style.display = active ? 'block' : 'none';
    if (window.__TMD_ANIMATION_ENGINE && typeof window.__TMD_ANIMATION_ENGINE.setParticlesActive === 'function') {
      window.__TMD_ANIMATION_ENGINE.setParticlesActive(active);
    }
    localStorage.setItem('tmd_particles_active', active ? 'true' : 'false');
    window.tmdShowToast('Efecto de partículas ' + (active ? 'activado' : 'desactivado') + ' en tiempo real.', 'info');
  };

  // Keyboard shortcut Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseSignatureModal();
      window.tmdCloseClientPortal();
      window.tmdCloseStaffPortal();
    }
  });

  // Auto-init on page ready
  document.addEventListener('DOMContentLoaded', function() {
    initPortalsDOM();
  });

})(window);
