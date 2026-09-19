/**
 * TMD Dominicana — Enterprise Full-Screen Portal Workspace
 * Tecnomaquinarias Diesel S.R.L. — Km 22 Autopista Duarte, Santo Domingo
 * 
 * Design Standards:
 *   - Jobber Client Hub (Split Document Sheet, Sticky Right Checkout Drawer, 4-Stage Workflow Ribbon, Signature Approval)
 *   - John Deere Dealer Customer Portal & AgriVision (Heavy Equipment OEM Parts Grid & Warehouse Inventory)
 *   - Microsoft Azure & Fullbay Workshop Dashboard (18 Bahías, DVI 40-Point Inspection)
 *   - 100% Dark Industrial Theme (Obsidian #080a0f, Amber Hazard #f59e0b, Telemetry Emerald #10b981, Sapphire #38bdf8)
 */

(function(window) {
  'use strict';

  var _currentRole = 'client'; // 'client' | 'staff' | 'admin' | null
  var _activeNav = 'nav-workflow'; // 'nav-workflow' | 'nav-quotes' | 'nav-orders' | 'nav-fleet' | 'nav-booking' | 'nav-parts' | 'nav-invoices'
  var _activeQuoteId = 'QUOTE-11555';
  var _activeWOId = 'WO-8492';

  var STAFF_PIN = '2222';
  var ADMIN_PIN = '9999';

  // Base de datos de demostración de alta fidelidad (Fullbay + Samsara + Square)
  var CLIENT_DATA = {
    company: 'Consorcio Malespín S.R.L.',
    rnc: '1-31-84920-1',
    project: 'Proyecto Circunvalación Tramo II',
    contact: 'Ing. Marcos Malespín',
    phone: '(809) 567-8900',
    email: 'operaciones@malespin.com.do',
    kpis: {
      requests: { count: 21, amount: '$11.2K', label: 'Solicitudes en Cola' },
      quotes: { count: 16, amount: '$15.4K', label: 'Cotizaciones Aprobadas' },
      jobs: { count: 4, amount: '$11.9K', label: 'Equipos en Taller Km 22' },
      invoices: { count: 5, amount: '$4,150.00', label: 'Facturas NCF Pendientes' }
    }
  };

  var QUOTE_DATA = {
    id: '11555',
    date: '10 Sep 2026',
    validUntil: '10 Oct 2026',
    status: 'En espera de respuesta',
    machine: 'Excavadora Hidráulica JCB JS220SC',
    vin: 'JCB220SC2024X981',
    items: [
      {
        title: 'Bomba Hidráulica Principal Kawasaki K3V112DT',
        desc: 'Reemplazo de bomba de pistones axiales de alta presión para circuito principal de giro y traslación.',
        qty: 1,
        price: 3500.00,
        total: 3500.00
      },
      {
        title: 'Kit de Sellos de Pistón de Pluma OEM JCB (JCB-991/001472)',
        desc: 'Juego de sellos de uretano y anillos de desgaste para banco de alta presión a 350 Bar.',
        qty: 1,
        price: 350.00,
        total: 350.00
      },
      {
        title: 'Calibración en Banco de Pruebas 350 Bar & Mano de Obra Especializada',
        desc: '8 horas de banco de pruebas dinámico, purga de circuito y calibración de válvula de alivio a 348 Bar a 60°C.',
        qty: 8,
        price: 100.00,
        total: 800.00
      }
    ],
    subtotal: 4650.00,
    tax: 837.00, // 18% ITBIS
    total: 5487.00,
    depositRequired: 1000.00
  };

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

  function initFullWorkspaceDOM() {
    if (document.getElementById('tmd-client-portal-modal')) {
      return;
    }

    var app = document.createElement('div');
    app.id = 'tmd-client-portal-modal';
    app.innerHTML = `
      <div class="tmd-portal-app">
        
        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- 1. LEFT RAIL SIDEBAR (Jobber Client Hub Style)              -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <aside class="tmd-portal-sidebar" id="tmd-portal-sidebar">
          <div>
            <!-- Brand Logo -->
            <div class="tmd-sidebar-brand">
              <div class="tmd-sidebar-brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4V6zm9 13H5V9h14v10z"/>
                </svg>
              </div>
              <div class="tmd-sidebar-brand-text">
                <h2>TMD Heavy Hub</h2>
                <p>AUT. DUARTE KM 22 · REP. DOM.</p>
              </div>
            </div>

            <!-- Action Button '+ New Request' (Jobber Standard) -->
            <button class="tmd-btn-new-request" onclick="window.tmdOpenNewRequestModal()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>+ Nueva Solicitud</span>
            </button>

            <!-- Navigation Links -->
            <nav class="tmd-sidebar-nav" aria-label="Navegación Principal">
              <div class="tmd-nav-item active" data-nav="nav-workflow" onclick="window.tmdSwitchNav('nav-workflow')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Inicio / Workflow</span>
                <span class="tmd-nav-badge">4 FASES</span>
              </div>

              <div class="tmd-nav-item" data-nav="nav-quotes" onclick="window.tmdSwitchNav('nav-quotes')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Cotizaciones & Firma</span>
                <span class="tmd-nav-badge" style="background:rgba(236,72,153,0.2);color:#f472b6;">1 PEND</span>
              </div>

              <div class="tmd-nav-item" data-nav="nav-orders" onclick="window.tmdSwitchNav('nav-orders')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span>Órdenes de Taller (WO)</span>
                <span class="tmd-nav-badge" style="background:rgba(245,158,11,0.2);color:#facc15;">348 BAR</span>
              </div>

              <div class="tmd-nav-item" data-nav="nav-fleet" onclick="window.tmdSwitchNav('nav-fleet')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
                <span>Mi Flota en Alquiler</span>
                <span class="tmd-nav-badge">4 EQUIPOS</span>
              </div>

              <div class="tmd-nav-item" data-nav="nav-booking" onclick="window.tmdSwitchNav('nav-booking')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Agendar Bahía Km 22</span>
              </div>

              <div class="tmd-nav-item" data-nav="nav-parts" onclick="window.tmdSwitchNav('nav-parts')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>Catálogo Repuestos OEM</span>
                <span class="tmd-nav-badge">ALMACÉN</span>
              </div>

              <div class="tmd-nav-item" data-nav="nav-invoices" onclick="window.tmdSwitchNav('nav-invoices')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
                <span>Facturas NCF & Pagos</span>
                <span class="tmd-nav-badge" style="background:rgba(56,189,248,0.2);color:#38bdf8;">B01</span>
              </div>
            </nav>
          </div>

          <!-- Sidebar Footer -->
          <div class="tmd-sidebar-footer">
            <div class="tmd-user-badge">
              <div class="tmd-user-avatar">CM</div>
              <div class="tmd-user-info">
                <div class="tmd-user-name">Consorcio Malespín S.R.L.</div>
                <div class="tmd-user-role">RNC: 1-31-84920-1 · TIER 1</div>
              </div>
            </div>

            <div style="display:flex;gap:6px;">
              <button class="tmd-btn-outline" style="flex:1;justify-content:center;font-size:0.7rem;padding:6px 8px;" onclick="window.tmdShowRoleSelector()">
                🔄 Roles
              </button>
              <button class="tmd-btn-outline" style="flex:1;justify-content:center;font-size:0.7rem;padding:6px 8px;border-color:rgba(239,68,68,0.3);color:#fca5a5;" onclick="window.tmdCloseClientPortal()">
                ✕ Salir
              </button>
            </div>

            <div class="tmd-sidebar-powered">
              POWERED BY TODOBUILD TITAN OS · FULLBAY READY
            </div>
          </div>
        </aside>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- 2. MAIN WORKSPACE VIEWPORT                                  -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <main class="tmd-portal-main" id="tmd-portal-main">
          
          <!-- Top Global Sticky Bar -->
          <header class="tmd-portal-topbar">
            <div style="display:flex;align-items:center;gap:12px;">
              <button class="tmd-btn-icon" style="display:none;" id="tmd-mobile-menu-toggle" onclick="document.getElementById('tmd-portal-sidebar').classList.toggle('open')">
                ☰
              </button>
              <div class="tmd-topbar-breadcrumbs">
                <span>Portal VIP Clientes</span>
                <span>/</span>
                <span class="active" id="tmd-breadcrumb-active">Inicio / Workflow</span>
              </div>
            </div>

            <div class="tmd-topbar-actions">
              <div class="tmd-status-pill">
                <span class="tmd-dot"></span>
                <span>LIVELINK GPS ONLINE · 1.2MS</span>
              </div>
              <button class="tmd-btn-outline" onclick="window.tmdShowRoleSelector()">
                🔄 Cambiar Entorno
              </button>
              <button class="tmd-btn-icon" onclick="window.tmdCloseClientPortal()" title="Cerrar y volver al sitio">
                ✕
              </button>
            </div>
          </header>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 1: WORKFLOW & EXECUTIVE DASHBOARD (Foto 5)          -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-workflow" class="tmd-workspace-pane" style="display:block;">
            
            <!-- 4-Stage Jobber Workflow Ribbon -->
            <div class="tmd-workflow-ribbon">
              <!-- Block 1: Solicitudes (Amber) -->
              <div class="tmd-ribbon-card" style="--accent-color:#f59e0b;" onclick="window.tmdSwitchNav('nav-booking')">
                <div class="tmd-ribbon-header">
                  <span class="tmd-ribbon-title">Solicitudes</span>
                  <span style="color:#f59e0b;font-size:0.75rem;">🟡 NUEVAS</span>
                </div>
                <div class="tmd-ribbon-number">
                  21 <span class="tmd-ribbon-amount">$11.2K</span>
                </div>
                <div class="tmd-ribbon-sub">
                  <span>Diagnósticos listos: 15</span>
                  <span style="color:#f59e0b;">En revisión: 6</span>
                </div>
              </div>

              <!-- Block 2: Cotizaciones (Fucsia/Magenta) -->
              <div class="tmd-ribbon-card" style="--accent-color:#ec4899;" onclick="window.tmdSwitchNav('nav-quotes')">
                <div class="tmd-ribbon-header">
                  <span class="tmd-ribbon-title">Cotizaciones</span>
                  <span style="color:#ec4899;font-size:0.75rem;">🔴 POR FIRMAR</span>
                </div>
                <div class="tmd-ribbon-number">
                  16 <span class="tmd-ribbon-amount">$15.4K</span>
                </div>
                <div class="tmd-ribbon-sub">
                  <span>Borradores: 9</span>
                  <span style="color:#ec4899;">Cambios solicitados: 7</span>
                </div>
              </div>

              <!-- Block 3: Trabajos en Taller (Verde) -->
              <div class="tmd-ribbon-card" style="--accent-color:#10b981;" onclick="window.tmdSwitchNav('nav-orders')">
                <div class="tmd-ribbon-header">
                  <span class="tmd-ribbon-title">Taller Km 22</span>
                  <span style="color:#10b981;font-size:0.75rem;">🟢 EN BAHÍAS</span>
                </div>
                <div class="tmd-ribbon-number">
                  4 <span class="tmd-ribbon-amount">$11.9K</span>
                </div>
                <div class="tmd-ribbon-sub">
                  <span>Activas en banco: 3</span>
                  <span style="color:#10b981;">Lista para retiro: 1</span>
                </div>
              </div>

              <!-- Block 4: Facturas NCF (Azul) -->
              <div class="tmd-ribbon-card" style="--accent-color:#38bdf8;" onclick="window.tmdSwitchNav('nav-invoices')">
                <div class="tmd-ribbon-header">
                  <span class="tmd-ribbon-title">Facturación NCF</span>
                  <span style="color:#38bdf8;font-size:0.75rem;">🔵 POR COBRAR</span>
                </div>
                <div class="tmd-ribbon-number">
                  5 <span class="tmd-ribbon-amount">$4,150.00</span>
                </div>
                <div class="tmd-ribbon-sub">
                  <span>Comprobante B01: 3</span>
                  <span style="color:#38bdf8;">Vencen en 6 días: 2</span>
                </div>
              </div>
            </div>

            <!-- Dashboard Split Layout (Today Appointments + Receivables) -->
            <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;padding:0 28px 40px;">
              <!-- Today Appointments -->
              <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                  <div>
                    <h3 style="margin:0;font-size:1.05rem;color:#fff;">Turnos & Entregas de Hoy en Taller Km 22</h3>
                    <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8;">Calibraciones de alta presión y mantenimiento de flota activa.</p>
                  </div>
                  <button class="tmd-btn-outline" onclick="window.tmdSwitchNav('nav-booking')">Ver Calendario →</button>
                </div>

                <div style="display:flex;flex-direction:column;gap:12px;">
                  <div style="padding:14px;background:#111622;border:1px solid rgba(255,255,255,0.06);border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:14px;">
                      <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:#facc15;">09:00 AM</div>
                      <div>
                        <div style="font-weight:700;color:#fff;font-size:0.82rem;">Excavadora JCB JS220SC — Prueba Hidráulica 350 Bar</div>
                        <div style="font-size:0.72rem;color:#94a3b8;">Bahía 3 · Técnico Ing. Eduardo López · Consorcio Malespín</div>
                      </div>
                    </div>
                    <span class="tmd-status-tag tmd-tag-blue">EN BANCO</span>
                  </div>

                  <div style="padding:14px;background:#111622;border:1px solid rgba(255,255,255,0.06);border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:14px;">
                      <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:#34d399;">01:30 PM</div>
                      <div>
                        <div style="font-weight:700;color:#fff;font-size:0.82rem;">Cargador Frontal LiuGong 856H — Inspección DVI Final</div>
                        <div style="font-size:0.72rem;color:#94a3b8;">Patio de Despacho · Téc. Rafael Valdez · Constructora del Cibao</div>
                      </div>
                    </div>
                    <span class="tmd-status-tag tmd-tag-green">LISTO RETIRO</span>
                  </div>

                  <div style="padding:14px;background:#111622;border:1px solid rgba(255,255,255,0.06);border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:14px;">
                      <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:#94a3b8;">04:00 PM</div>
                      <div>
                        <div style="font-weight:700;color:#fff;font-size:0.82rem;">Tractor Agrícola LS MT357C — Recepción Mantenimiento 250h</div>
                        <div style="font-size:0.72rem;color:#94a3b8;">Bahía 4 · Téc. Domingo Rosario · Agroindustrial del Este</div>
                      </div>
                    </div>
                    <span class="tmd-status-tag tmd-tag-yellow">PROGRAMADA</span>
                  </div>
                </div>
              </div>

              <!-- Receivables / Performance -->
              <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="font-size:0.75rem;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:6px;">Balance Total Pendiente</div>
                  <div style="font-size:2rem;font-weight:900;color:#fff;font-family:'JetBrains Mono',monospace;">$4,150.00 <span style="font-size:0.85rem;color:#64748b;">USD</span></div>
                  <p style="font-size:0.75rem;color:#94a3b8;margin:6px 0 18px 0;">Comprobante Fiscal B01000492 emitido el 12 Sep 2026.</p>

                  <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:14px;display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;justify-content:space-between;font-size:0.78rem;">
                      <span style="color:#94a3b8;">Consorcio Malespín S.R.L.</span>
                      <strong style="color:#fff;">$4,150.00</strong>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:0.78rem;">
                      <span style="color:#94a3b8;">Constructora del Cibao</span>
                      <strong style="color:#fff;">$720.00</strong>
                    </div>
                  </div>
                </div>

                <button class="tmd-btn-pay-primary" style="margin-top:20px;" onclick="window.tmdSwitchNav('nav-quotes')">
                  Revisar Cotización #11555 & Pagar Anticipo →
                </button>
              </div>
            </div>

          </section>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 2: JOBBER SPLIT QUOTE & CHECKOUT DRAWER (Foto 1 y 2) -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-quotes" class="tmd-workspace-pane" style="display:none;">
            <div class="tmd-split-workspace">
              
              <!-- Center Formal Document Sheet (Jobber Style) -->
              <div class="tmd-doc-sheet">
                
                <div class="tmd-doc-topbar">
                  <button class="tmd-btn-text" onclick="window.tmdSwitchNav('nav-workflow')">
                    ← Volver a Workflow
                  </button>
                  <button class="tmd-btn-outline" onclick="alert('Descargando Cotización #11555 formal en formato PDF oficial TMD Dominicana...')">
                    📥 Descargar PDF Oficial
                  </button>
                </div>

                <div class="tmd-doc-meta-grid">
                  <div class="tmd-doc-client-info">
                    <div style="font-size:0.75rem;font-weight:700;color:#facc15;font-family:'JetBrains Mono',monospace;margin-bottom:4px;">
                      COTIZACIÓN / ORDEN DE REPARACIÓN #11555
                    </div>
                    <h3>Consorcio Malespín S.R.L.</h3>
                    <p>Av. Luperón Esq. Mirador Sur, Santo Domingo, D.N.</p>
                    <p>RNC: 1-31-84920-1 · Tel: (809) 567-8900</p>
                    <div style="margin-top:10px;display:inline-block;padding:4px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:6px;font-size:0.75rem;color:#facc15;">
                      Equipo: <strong>Excavadora JCB JS220SC</strong> (VIN: JCB220SC2024X981)
                    </div>
                  </div>

                  <div class="tmd-doc-dates">
                    <div><span class="tmd-status-tag tmd-tag-yellow">En espera de respuesta</span></div>
                    <div style="margin-top:12px;color:#94a3b8;">Fecha de Envío: <strong style="color:#fff;">10 Sep 2026</strong></div>
                    <div style="color:#94a3b8;">Vence: <strong style="color:#fff;">10 Oct 2026</strong></div>
                  </div>
                </div>

                <!-- Document Items Table -->
                <table class="tmd-doc-table">
                  <thead>
                    <tr>
                      <th style="width:60%;">Producto / Servicio Técnico</th>
                      <th style="text-align:center;">Cant.</th>
                      <th style="text-align:right;">Precio Unitario</th>
                      <th style="text-align:right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="tmd-doc-item-title">Bomba Hidráulica Principal Kawasaki K3V112DT</div>
                        <div class="tmd-doc-item-desc">
                          Reemplazo de bomba de pistones axiales para circuito hidráulico principal. Garantía de 12 meses.
                        </div>
                      </td>
                      <td style="text-align:center;font-family:'JetBrains Mono',monospace;">1</td>
                      <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$3,500.00</td>
                      <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#fff;font-weight:700;">$3,500.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="tmd-doc-item-title">Kit de Sellos de Pistón de Pluma OEM JCB (JCB-991/001472)</div>
                        <div class="tmd-doc-item-desc">
                          Empaquetadura completa de alta presión para resistir 350 Bar en banco de pruebas.
                        </div>
                      </td>
                      <td style="text-align:center;font-family:'JetBrains Mono',monospace;">1</td>
                      <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$350.00</td>
                      <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#fff;font-weight:700;">$350.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="tmd-doc-item-title">Calibración en Banco de Pruebas 350 Bar & Mano de Obra</div>
                        <div class="tmd-doc-item-desc">
                          8 horas de pruebas dinámicas con control de temperatura a 60°C y ajuste de válvulas de alivio.
                        </div>
                      </td>
                      <td style="text-align:center;font-family:'JetBrains Mono',monospace;">8</td>
                      <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$100.00</td>
                      <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#fff;font-weight:700;">$800.00</td>
                    </tr>
                  </tbody>
                </table>

                <!-- Totals -->
                <div class="tmd-doc-totals">
                  <div class="tmd-total-row">
                    <span>Subtotal:</span>
                    <span style="font-family:'JetBrains Mono',monospace;">$4,650.00</span>
                  </div>
                  <div class="tmd-total-row">
                    <span>ITBIS (18% DGII):</span>
                    <span style="font-family:'JetBrains Mono',monospace;">$837.00</span>
                  </div>
                  <div class="tmd-total-row grand">
                    <span>Total Estimado:</span>
                    <span style="font-family:'JetBrains Mono',monospace;color:#facc15;">$5,487.00 USD</span>
                  </div>
                  <div class="tmd-total-row" style="color:#34d399;font-weight:700;">
                    <span>Anticipo Requerido:</span>
                    <span style="font-family:'JetBrains Mono',monospace;">$1,000.00 USD</span>
                  </div>
                </div>

                <div class="tmd-doc-disclaimer">
                  Esta cotización es válida por 30 días. La aprobación formal mediante firma digital y el pago del anticipo autorizan el desmontaje y la asignación inmediata de Bahía en el Km 22 Autopista Duarte.
                </div>

              </div>

              <!-- Right Sticky Checkout Drawer (Jobber Style - Foto 1) -->
              <aside class="tmd-sticky-checkout">
                <div class="tmd-checkout-header">
                  <div class="tmd-checkout-deposit-label">Anticipo Requerido</div>
                  <div class="tmd-checkout-deposit-val">$1,000.00</div>
                  <div style="font-size:0.75rem;color:#94a3b8;font-family:'JetBrains Mono',monospace;">
                    Equivalente en moneda local: RD$ 59,500.00
                  </div>
                </div>

                <!-- Payment Method Toggle -->
                <div class="tmd-payment-methods">
                  <button class="tmd-method-btn active" id="btn-pay-cc" onclick="window.tmdSelectPayMethod('cc')">
                    💳 Tarjeta de Crédito
                  </button>
                  <button class="tmd-method-btn" id="btn-pay-bank" onclick="window.tmdSelectPayMethod('bank')">
                    🏦 Banreservas / BHD
                  </button>
                </div>

                <!-- Credit Card Fields -->
                <div id="tmd-cc-form">
                  <div class="tmd-card-field-group">
                    <input type="text" class="tmd-input-field" placeholder="Nombre en la tarjeta" value="Marcos Malespín" />
                    <input type="text" class="tmd-input-field" placeholder="Número de tarjeta (4242 •••• •••• 4242)" value="•••• •••• •••• 8492" />
                    <div class="tmd-card-row-split">
                      <input type="text" class="tmd-input-field" placeholder="MM / AA" value="09 / 28" />
                      <input type="text" class="tmd-input-field" placeholder="CVC" value="•••" />
                    </div>
                  </div>

                  <label class="tmd-checkbox-label">
                    <input type="checkbox" checked />
                    <span>Recordar esta tarjeta para futuros pagos y reparaciones de flota.</span>
                  </label>
                </div>

                <!-- Billing Address RNC -->
                <div class="tmd-billing-box">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <strong style="color:#fff;">Dirección Fiscal (DGII)</strong>
                    <a href="#" style="color:#38bdf8;text-decoration:none;font-weight:700;">Editar</a>
                  </div>
                  <div>Consorcio Malespín S.R.L.</div>
                  <div>RNC: 1-31-84920-1 · Av. Luperón, Santo Domingo</div>
                </div>

                <!-- Primary Action Button: Pay & Approve -->
                <button class="tmd-btn-pay-primary" onclick="window.tmdOpenSignatureModal()">
                  Aprobar & Pagar $1,000.00 →
                </button>

                <button class="tmd-btn-secondary-action" onclick="alert('Abriendo chat directo de WhatsApp con el Jefe de Taller Km 22 para solicitar modificaciones en el presupuesto...')">
                  Solicitar Cambios en Presupuesto
                </button>
              </aside>

            </div>
          </section>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 3: AGRI-VISION / JOHN DEERE PARTS CATALOG (Fotos 3/4) -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-parts" class="tmd-workspace-pane" style="display:none;">
            <div class="tmd-parts-workspace">
              
              <!-- John Deere Style Search Header -->
              <div class="tmd-parts-search-bar">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                  <div>
                    <h3 style="margin:0;font-size:1.25rem;color:#fff;font-weight:800;">CATÁLOGO DE REPUESTOS OEM & ALMACÉN CENTRAL</h3>
                    <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8;">Consulta directa de inventario físico en el Almacén del Km 22 Autopista Duarte.</p>
                  </div>
                  <span class="tmd-status-pill">
                    <span class="tmd-dot"></span>
                    <span>391 ÍTEMS SINCRONIZADOS</span>
                  </span>
                </div>

                <div class="tmd-parts-search-inputs">
                  <input type="text" id="tmd-parts-input" class="tmd-input-field" style="flex:2;" placeholder="Ingrese Número de Parte OEM (ej. JCB-20/9253401, LS-40007521) o descripción..." oninput="window.tmdFilterParts(this.value)" />
                  <select class="tmd-input-field" style="flex:1;" onchange="window.tmdFilterPartsByCategory(this.value)">
                    <option value="all">Todas las Marcas (JCB, LS, LiuGong, Yanmar)</option>
                    <option value="jcb">JCB Construction OEM</option>
                    <option value="ls">LS Tractor Agrícola</option>
                    <option value="liugong">LiuGong Heavy Machinery</option>
                  </select>
                  <button class="tmd-btn-new-request" style="width:auto;padding:10px 24px;margin-bottom:0;" onclick="window.tmdFilterParts(document.getElementById('tmd-parts-input').value)">
                    Buscar Piezas →
                  </button>
                </div>
              </div>

              <!-- AgriVision Visual Category Grid (Foto 3) -->
              <div class="tmd-parts-categories-grid">
                <div class="tmd-category-card" onclick="window.tmdFilterPartsByCategory('brakes')">
                  <div class="tmd-category-card-icon">🛑</div>
                  <div class="tmd-category-card-title">Sistemas de Frenos & Válvulas</div>
                </div>

                <div class="tmd-category-card" onclick="window.tmdFilterPartsByCategory('filters')">
                  <div class="tmd-category-card-icon">🛢️</div>
                  <div class="tmd-category-card-title">Filtros & Mantenimiento</div>
                </div>

                <div class="tmd-category-card" onclick="window.tmdFilterPartsByCategory('hydraulics')">
                  <div class="tmd-category-card-icon">⚙️</div>
                  <div class="tmd-category-card-title">Hidráulica 350 Bar & Bombas</div>
                </div>

                <div class="tmd-category-card" onclick="window.tmdFilterPartsByCategory('undercarriage')">
                  <div class="tmd-category-card-icon">🚜</div>
                  <div class="tmd-category-card-title">Tren de Rodaje & Orugas</div>
                </div>
              </div>

              <!-- Industrial Parts Inventory Table (Foto 4) -->
              <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;overflow-x:auto;">
                <table class="tmd-doc-table" id="tmd-parts-table">
                  <thead>
                    <tr>
                      <th>Nº de Parte OEM</th>
                      <th>Descripción Técnica</th>
                      <th>Equipo Compatible</th>
                      <th>Disponibilidad Almacén Km 22</th>
                      <th style="text-align:right;">Precio Unitario</th>
                      <th style="text-align:center;">Acción</th>
                    </tr>
                  </thead>
                  <tbody id="tmd-parts-tbody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>

            </div>
          </section>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 4: ÓRDENES EN TALLER (WO 5 FASES)                    -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-orders" class="tmd-workspace-pane" style="display:none;">
            <div style="padding:0 28px 40px;">
              <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;margin-bottom:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <div>
                    <span class="tmd-status-tag tmd-tag-yellow">WO-8492 · FASE 4 DE 5</span>
                    <h3 style="margin:8px 0 2px 0;font-size:1.35rem;color:#fff;font-weight:800;">Excavadora Hidráulica JCB JS220SC</h3>
                    <p style="margin:0;font-size:0.78rem;color:#94a3b8;">Consorcio Malespín S.R.L. · Bahía 3 (Hidráulica 350 Bar) · Km 22 Autopista Duarte</p>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-size:0.75rem;color:#94a3b8;">Mecánico Asignado:</div>
                    <strong style="color:#38bdf8;">Ing. Eduardo López</strong>
                  </div>
                </div>

                <!-- 5-Stage Stepper -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin:32px 0;position:relative;">
                  <div style="position:absolute;top:50%;left:40px;right:40px;height:2px;background:rgba(255,255,255,0.1);z-index:1;"></div>
                  
                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;">
                    <div style="width:36px;height:36px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;">✓</div>
                    <span style="font-size:0.72rem;color:#fff;font-weight:700;">1. Recepción</span>
                  </div>

                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;">
                    <div style="width:36px;height:36px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;">✓</div>
                    <span style="font-size:0.72rem;color:#fff;font-weight:700;">2. Diagnóstico</span>
                  </div>

                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;">
                    <div style="width:36px;height:36px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;">✓</div>
                    <span style="font-size:0.72rem;color:#fff;font-weight:700;">3. Espera Repuestos</span>
                  </div>

                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;">
                    <div style="width:36px;height:36px;border-radius:50%;background:#f59e0b;color:#000;display:flex;align-items:center;justify-content:center;font-weight:800;box-shadow:0 0 16px rgba(245,158,11,0.6);">4</div>
                    <span style="font-size:0.72rem;color:#facc15;font-weight:800;">4. Banco 350 Bar</span>
                  </div>

                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;">
                    <div style="width:36px;height:36px;border-radius:50%;background:#1e293b;color:#64748b;display:flex;align-items:center;justify-content:center;font-weight:800;">5</div>
                    <span style="font-size:0.72rem;color:#64748b;font-weight:600;">5. Listo para Retiro</span>
                  </div>
                </div>

                <!-- Report Box -->
                <div style="background:#111622;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;">
                  <h4 style="margin:0 0 8px 0;font-size:0.9rem;color:#fff;">Reporte de Banco de Pruebas Hidráulicas:</h4>
                  <p style="margin:0;font-size:0.8rem;color:#d1d5db;line-height:1.6;">
                    Se reemplazó la bomba del circuito principal por cavitación severa. En este momento el equipo se encuentra en el banco de pruebas hidráulicas estabilizado a <strong>348 Bar sin fugas</strong> en la válvula de alivio primario. Prueba de ciclo de pluma aprobada a 60°C.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 5: SAMSARA IOT FLEET TELEMETRY                       -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-fleet" class="tmd-workspace-pane" style="display:none;">
            <div style="padding:0 28px 40px;">
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">
                
                <!-- Unit 1 -->
                <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <strong style="color:#fff;font-size:1rem;">Retroexcavadora JCB 3CX Eco #01</strong>
                    <span class="tmd-status-tag tmd-tag-green">OPERATIVA</span>
                  </div>
                  <div style="font-size:0.78rem;color:#94a3b8;line-height:1.6;">
                    <div>Horómetro: <strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">3,420.5 hrs</strong></div>
                    <div>Combustible Diésel: <strong style="color:#34d399;">82%</strong> (Autonomía ~12 hrs)</div>
                    <div>Ubicación: <strong>Km 18 Autopista Duarte</strong></div>
                  </div>
                  <button class="tmd-btn-outline" style="width:100%;margin-top:16px;justify-content:center;" onclick="alert('Solicitando mantenimiento en obra...')">
                    Solicitar Mantenimiento Preventivo
                  </button>
                </div>

                <!-- Unit 2 -->
                <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <strong style="color:#fff;font-size:1rem;">Cargador Frontal LiuGong 856H</strong>
                    <span class="tmd-status-tag tmd-tag-green">OPERATIVA</span>
                  </div>
                  <div style="font-size:0.78rem;color:#94a3b8;line-height:1.6;">
                    <div>Horómetro: <strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">4,812.0 hrs</strong></div>
                    <div>Combustible Diésel: <strong style="color:#34d399;">68%</strong> (Autonomía ~9 hrs)</div>
                    <div>Ubicación: <strong>Cantera Santo Domingo Oeste</strong></div>
                  </div>
                  <button class="tmd-btn-outline" style="width:100%;margin-top:16px;justify-content:center;" onclick="alert('Solicitando mantenimiento en obra...')">
                    Solicitar Mantenimiento Preventivo
                  </button>
                </div>

              </div>
            </div>
          </section>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 6: BOOKING EXPRESS BAY                               -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-booking" class="tmd-workspace-pane" style="display:none;">
            <div style="max-width:700px;margin:0 auto;padding:20px 28px 40px;">
              <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
                <h3 style="margin:0 0 4px 0;font-size:1.25rem;color:#fff;">Agendar Bahía en Taller Central Km 22</h3>
                <p style="margin:0 0 24px 0;font-size:0.78rem;color:#94a3b8;">Reserve un turno prioritario para su equipo con confirmación inmediata por WhatsApp.</p>

                <form onsubmit="window.tmdSubmitBooking(event)" style="display:flex;flex-direction:column;gap:16px;">
                  <div>
                    <label style="font-size:0.75rem;font-weight:700;color:#94a3b8;display:block;margin-bottom:6px;">Equipo:</label>
                    <input type="text" id="tmd-book-machine" class="tmd-input-field" value="Excavadora JCB JS220SC" required />
                  </div>

                  <div>
                    <label style="font-size:0.75rem;font-weight:700;color:#94a3b8;display:block;margin-bottom:6px;">Tipo de Servicio Técnico:</label>
                    <select id="tmd-book-service" class="tmd-input-field">
                      <option value="hidraulica">Calibración & Banco de Pruebas Hidráulicas 350 Bar</option>
                      <option value="express">Mantenimiento Preventivo Express (250h / 500h)</option>
                      <option value="rodaje">Tren de Rodaje & Prensado de Cadenas</option>
                      <option value="motor">Overhaul de Motor Diésel</option>
                    </select>
                  </div>

                  <div>
                    <label style="font-size:0.75rem;font-weight:700;color:#94a3b8;display:block;margin-bottom:6px;">Fecha Deseada:</label>
                    <input type="date" id="tmd-book-date" class="tmd-input-field" value="2026-09-22" required />
                  </div>

                  <button type="submit" class="tmd-btn-pay-primary" style="margin-top:12px;">
                    Confirmar Turno en Bahía Km 22 →
                  </button>
                </form>
              </div>
            </div>
          </section>

          <!-- ───────────────────────────────────────────────────────── -->
          <!-- PANE 7: FACTURACIÓN NCF B01                               -->
          <!-- ───────────────────────────────────────────────────────── -->
          <section id="pane-invoices" class="tmd-workspace-pane" style="display:none;">
            <div style="padding:0 28px 40px;">
              <div style="background:#0d111a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
                <h3 style="margin:0 0 16px 0;font-size:1.15rem;color:#fff;">Comprobantes Fiscales DGII (NCF B01)</h3>
                
                <table class="tmd-doc-table">
                  <thead>
                    <tr>
                      <th>Número NCF</th>
                      <th>Fecha</th>
                      <th>Concepto</th>
                      <th>Total USD</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">B01000492</strong></td>
                      <td>12 Sep 2026</td>
                      <td>Reparación Bomba Hidráulica JCB JS220SC</td>
                      <td><strong style="color:#fff;">$4,150.00</strong></td>
                      <td><span class="tmd-status-tag tmd-tag-yellow">POR PAGAR</span></td>
                      <td>
                        <button class="tmd-btn-outline" style="padding:4px 10px;font-size:0.72rem;" onclick="window.tmdSwitchNav('nav-quotes')">Pagar vía Square →</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">B01000488</strong></td>
                      <td>05 Sep 2026</td>
                      <td>Filtros y Aceites Hidráulicos LiuGong 856H</td>
                      <td><strong style="color:#fff;">$720.00</strong></td>
                      <td><span class="tmd-status-tag tmd-tag-green">PAGADA</span></td>
                      <td>
                        <button class="tmd-btn-outline" style="padding:4px 10px;font-size:0.72rem;" onclick="alert('Descargando comprobante fiscal B01000488...')">PDF NCF</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- 3. MODAL DE FIRMA DIGITAL MANUSCRITA (Foto 2)               -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div id="tmd-sig-modal" class="tmd-modal-overlay">
        <div class="tmd-sig-dialog">
          <div class="tmd-sig-dialog-header">
            <h3>Aprobar Cotización #11555</h3>
            <button class="tmd-btn-icon" onclick="window.tmdCloseSignatureModal()">✕</button>
          </div>
          <div class="tmd-sig-dialog-body">
            <p style="font-size:0.78rem;color:#94a3b8;margin:0 0 12px 0;">
              Dibuje su firma manuscrita para autorizar la orden de trabajo, la orden de piezas y el cargo de anticipo por USD $1,000.00.
            </p>
            <div class="tmd-canvas-wrapper">
              <canvas id="tmd-quote-sig-canvas"></canvas>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
              <span style="font-size:0.68rem;color:#64748b;font-family:'JetBrains Mono',monospace;">Firma con Certificado Criptográfico TMD</span>
              <button class="tmd-btn-text" style="font-size:0.72rem;" onclick="window.tmdClearQuoteSig()">Limpiar Firma</button>
            </div>
          </div>
          <div class="tmd-sig-dialog-footer">
            <button class="tmd-btn-text" onclick="window.tmdCloseSignatureModal()">Cancelar</button>
            <button class="tmd-btn-pay-primary" style="width:auto;padding:10px 24px;" onclick="window.tmdConfirmQuoteApproval()">
              Confirmar & Aprobar Cotización →
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(app);

    // Render initial parts
    renderPartsTable(OEM_PARTS);

    // Setup Signature Pad
    initQuoteSignaturePad();
  }

  // ─── PARTS CATALOG LOGIC (John Deere / AgriVision Style) ───
  function renderPartsTable(parts) {
    var tbody = document.getElementById('tmd-parts-tbody');
    if (!tbody) return;

    if (parts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No se encontraron piezas en el almacén del Km 22 con ese criterio.</td></tr>`;
      return;
    }

    tbody.innerHTML = parts.map(function(p) {
      return `
        <tr>
          <td><strong style="color:#facc15;font-family:'JetBrains Mono',monospace;">${p.partNo}</strong></td>
          <td>
            <div style="color:#fff;font-weight:600;">${p.desc}</div>
          </td>
          <td><span style="color:#94a3b8;">${p.machine}</span></td>
          <td><span class="tmd-status-tag tmd-tag-green">${p.stock}</span></td>
          <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#fff;font-weight:700;">$${p.price.toFixed(2)} USD</td>
          <td style="text-align:center;">
            <button class="tmd-btn-outline" style="padding:4px 10px;font-size:0.72rem;" onclick="alert('Pieza ${p.partNo} agregada a su solicitud de despacho.')">
              + Añadir
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.tmdFilterParts = function(query) {
    var q = (query || '').toLowerCase().trim();
    var filtered = OEM_PARTS.filter(function(p) {
      return p.partNo.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.machine.toLowerCase().includes(q);
    });
    renderPartsTable(filtered);
  };

  window.tmdFilterPartsByCategory = function(cat) {
    if (cat === 'all') {
      renderPartsTable(OEM_PARTS);
    } else {
      var filtered = OEM_PARTS.filter(function(p) {
        return p.cat === cat || p.machine.toLowerCase().includes(cat);
      });
      renderPartsTable(filtered);
    }
  };

  // ─── SIGNATURE PAD LOGIC (Jobber Style - Foto 2) ───
  var sigCanvas, sigCtx, sigDrawing = false;

  function initQuoteSignaturePad() {
    sigCanvas = document.getElementById('tmd-quote-sig-canvas');
    if (!sigCanvas) return;

    sigCtx = sigCanvas.getContext('2d');

    function resizeSig() {
      var rect = sigCanvas.getBoundingClientRect();
      sigCanvas.width = rect.width;
      sigCanvas.height = 180;
      sigCtx.lineWidth = 2.5;
      sigCtx.lineCap = 'round';
      sigCtx.strokeStyle = '#0284c7'; // Jobber technical dark blue ink
    }
    resizeSig();

    function getPos(e) {
      var rect = sigCanvas.getBoundingClientRect();
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    }

    function startDraw(e) {
      sigDrawing = true;
      var pos = getPos(e);
      sigCtx.beginPath();
      sigCtx.moveTo(pos.x, pos.y);
      e.preventDefault();
    }

    function draw(e) {
      if (!sigDrawing) return;
      var pos = getPos(e);
      sigCtx.lineTo(pos.x, pos.y);
      sigCtx.stroke();
      e.preventDefault();
    }

    function stopDraw() {
      sigDrawing = false;
    }

    sigCanvas.addEventListener('mousedown', startDraw);
    sigCanvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
    sigCanvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDraw);
  }

  window.tmdClearQuoteSig = function() {
    if (sigCanvas && sigCtx) {
      sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    }
  };

  window.tmdOpenSignatureModal = function() {
    var m = document.getElementById('tmd-sig-modal');
    if (m) {
      m.style.display = 'flex';
      setTimeout(function() {
        if (sigCanvas) {
          var rect = sigCanvas.getBoundingClientRect();
          sigCanvas.width = rect.width;
          sigCanvas.height = 180;
          sigCtx.lineWidth = 2.5;
          sigCtx.lineCap = 'round';
          sigCtx.strokeStyle = '#0284c7';
        }
      }, 50);
    }
  };

  window.tmdCloseSignatureModal = function() {
    var m = document.getElementById('tmd-sig-modal');
    if (m) m.style.display = 'none';
  };

  window.tmdConfirmQuoteApproval = function() {
    window.tmdCloseSignatureModal();
    alert('¡Cotización #11555 Aprobada con Éxito!\n\nSe ha emitido el comprobante de anticipo de USD $1,000.00 a través de Square Web Payments y se ha bloqueado la Bahía 3 del Km 22 para la Excavadora JCB JS220SC.\n\nNotificación enviada a Don Eduardo vía WhatsApp.');
    window.tmdSwitchNav('nav-orders');
  };

  // ─── NAVIGATION SWITCHER ───
  window.tmdSwitchNav = function(navId) {
    _activeNav = navId;

    // Update sidebar active class
    var items = document.querySelectorAll('.tmd-nav-item');
    items.forEach(function(el) {
      if (el.getAttribute('data-nav') === navId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Hide all panes
    var panes = document.querySelectorAll('.tmd-workspace-pane');
    panes.forEach(function(p) {
      p.style.display = 'none';
    });

    // Show selected pane
    var map = {
      'nav-workflow': { pane: 'pane-workflow', title: 'Inicio / Workflow' },
      'nav-quotes': { pane: 'pane-quotes', title: 'Cotizaciones & Aprobación' },
      'nav-orders': { pane: 'pane-orders', title: 'Órdenes de Taller (WO)' },
      'nav-fleet': { pane: 'pane-fleet', title: 'Mi Flota en Alquiler' },
      'nav-booking': { pane: 'pane-booking', title: 'Agendar Bahía Km 22' },
      'nav-parts': { pane: 'pane-parts', title: 'Catálogo Repuestos OEM' },
      'nav-invoices': { pane: 'pane-invoices', title: 'Facturas NCF & Pagos' }
    };

    var target = map[navId] || map['nav-workflow'];
    var targetPane = document.getElementById(target.pane);
    if (targetPane) targetPane.style.display = 'block';

    var bread = document.getElementById('tmd-breadcrumb-active');
    if (bread) bread.innerText = target.title;

    // Close mobile sidebar if open
    var sb = document.getElementById('tmd-portal-sidebar');
    if (sb) sb.classList.remove('open');
  };

  window.tmdSelectPayMethod = function(m) {
    var btnCC = document.getElementById('btn-pay-cc');
    var btnBank = document.getElementById('btn-pay-bank');
    var form = document.getElementById('tmd-cc-form');

    if (m === 'cc') {
      btnCC.classList.add('active');
      btnBank.classList.remove('active');
      if (form) form.style.display = 'block';
    } else {
      btnBank.classList.add('active');
      btnCC.classList.remove('active');
      if (form) form.style.display = 'none';
      alert('Datos para Transferencia Bancaria:\n\nBanco: Banco de Reservas (Banreservas)\nCuenta Corriente: 960-249201-1\nBeneficiario: Tecnomaquinarias Diesel S.R.L.\nRNC: 1-31-84920-1\n\nPor favor envíe el comprobante a Don Eduardo vía WhatsApp.');
    }
  };

  window.tmdOpenNewRequestModal = function() {
    window.tmdSwitchNav('nav-booking');
  };

  window.tmdSubmitBooking = function(e) {
    e.preventDefault();
    var machine = document.getElementById('tmd-book-machine').value;
    var service = document.getElementById('tmd-book-service').value;
    var date = document.getElementById('tmd-book-date').value;

    alert('¡Turno de Bahía Agendado con Éxito!\n\nEquipo: ' + machine + '\nServicio: ' + service + '\nFecha: ' + date + '\n\nUn asesor técnico del Km 22 se comunicará por WhatsApp para confirmar la recepción en patio.');
    window.tmdSwitchNav('nav-workflow');
  };

  // ─── OPEN / CLOSE / ROLE SWITCHER ───
  window.tmdOpenClientPortal = function() {
    initFullWorkspaceDOM();
    var modal = document.getElementById('tmd-client-portal-modal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  window.tmdCloseClientPortal = function() {
    var modal = document.getElementById('tmd-client-portal-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  window.tmdShowRoleSelector = function() {
    var pin = prompt('Ingrese PIN de Acceso (2222 para Taller Km 22, 9999 para Consola TI, o Enter para Cliente):');
    if (pin === STAFF_PIN) {
      alert('Acceso a Mesa Técnica & Taller Km 22 Autorizado (18 Bahías Fullbay).');
      window.tmdSwitchNav('nav-orders');
    } else if (pin === ADMIN_PIN) {
      alert('Acceso a Consola TI & Administración Web Autorizado.');
      window.tmdOpenAdminPanel();
    } else {
      window.tmdSwitchNav('nav-workflow');
    }
  };

  window.tmdOpenAdminPanel = function() {
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
  };

  window.tmdToggleParticles = function(active) {
    var canvas = document.getElementById('tmd-ambient-canvas');
    if (canvas) canvas.style.display = active ? 'block' : 'none';
    if (window.__TMD_ANIMATION_ENGINE && typeof window.__TMD_ANIMATION_ENGINE.setParticlesActive === 'function') {
      window.__TMD_ANIMATION_ENGINE.setParticlesActive(active);
    }
    localStorage.setItem('tmd_particles_active', active ? 'true' : 'false');
    alert('Partículas ' + (active ? 'activadas' : 'desactivadas') + ' en tiempo real.');
  };

  // Keyboard shortcut Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var sigModal = document.getElementById('tmd-sig-modal');
      if (sigModal && sigModal.style.display === 'flex') {
        window.tmdCloseSignatureModal();
      } else {
        window.tmdCloseClientPortal();
      }
    }
  });

  // Auto-init on page ready
  document.addEventListener('DOMContentLoaded', function() {
    initFullWorkspaceDOM();
  });

})(window);
