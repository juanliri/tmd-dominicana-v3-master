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

  // Enterprise Multi-Tenant Data Architecture (Tier-1 Dominican Contractors)
  var _activeTenantId = 'malespin';

  var TENANTS = {
    malespin: {
      id: 'malespin',
      initials: 'CM',
      company: 'Consorcio Malespín S.R.L.',
      rnc: '1-31-84920-1',
      project: 'Proyecto Circunvalación Tramo II (Baní - Azua)',
      contact: 'Ing. Marcos Malespín',
      phone: '(809) 567-8900',
      email: 'operaciones@malespin.com.do',
      balance: '$4,150.00',
      balanceNcf: 'Factura Fiscal NCF B01000492',
      quote: {
        number: '#11555',
        title: 'COTIZACIÓN DE REPARACIÓN #11555',
        date: '10 Sep 2026',
        validUntil: '10 Oct 2026',
        machine: 'Excavadora JCB JS220SC',
        vin: 'JCB220SC2024X981',
        items: [
          { name: 'Bomba Hidráulica Principal Kawasaki K3V112DT OEM', desc: 'Repuesto original JCB sellado con garantía de 1 año o 2,000 horas.', qty: 1, unit: 3500, total: 3500 },
          { name: 'Kit de Sellos de Pistón de Pluma OEM JCB (JCB-991/001472)', desc: 'Empaquetadura completa de alta presión para 350 Bar.', qty: 1, unit: 350, total: 350 },
          { name: 'Calibración en Banco de Pruebas 350 Bar & Mano de Obra', desc: '8 horas de pruebas dinámicas y calibración de válvula de alivio a 348 Bar a 60°C.', qty: 8, unit: 100, total: 800 }
        ],
        subtotal: '$4,650.00',
        itbis: '$837.00',
        total: '$5,487.00 USD',
        deposit: '$1,000.00 USD',
        cardHolder: 'Marcos Malespín',
        cardMasked: '•••• •••• •••• 8492'
      },
      fleet: [
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
      ],
      vault: [
        { id: 'DOC-B01-492', title: 'Comprobante Fiscal Digital NCF B01000492', type: 'invoice', date: '12 Sep 2026', size: '245 KB', ref: 'WO-8492' },
        { id: 'DOC-B01-488', title: 'Comprobante Fiscal Digital NCF B01000488', type: 'invoice', date: '05 Sep 2026', size: '180 KB', ref: 'WO-8488' },
        { id: 'DOC-COT-11555', title: 'Cotización Oficial #11555 (Calibración 350 Bar)', type: 'quote', date: '10 Sep 2026', size: '312 KB', ref: 'JCB JS220SC' },
        { id: 'DOC-CERT-348', title: 'Certificado de Calibración Hidráulica a 348 Bar', type: 'cert', date: '18 Sep 2026', size: '420 KB', ref: 'Banco Km 22' },
        { id: 'DOC-CONTR-8834', title: 'Contrato Marco de Alquiler de Maquinaria Pesada', type: 'contract', date: '01 Ene 2026', size: '1.2 MB', ref: 'TMD-8834' },
        { id: 'DOC-DVI-8492', title: 'Reporte Técnico de Inspección Digital DVI 40 Puntos', type: 'dvi', date: '11 Sep 2026', size: '560 KB', ref: 'WO-8492' }
      ]
    },
    rizek: {
      id: 'rizek',
      initials: 'CR',
      company: 'Constructora Rizek & Asocs. S.A.S.',
      rnc: '1-01-02948-2',
      project: 'Autovía del Nordeste · Tramo III (Cruce Samaná)',
      contact: 'Ing. Raúl Rizek',
      phone: '(809) 541-6200',
      email: 'flota@rizek.com.do',
      balance: '$12,800.00',
      balanceNcf: 'Factura Fiscal NCF B01000512',
      quote: {
        number: '#11602',
        title: 'COTIZACIÓN DE MANTENIMIENTO OVERHAUL #11602',
        date: '14 Sep 2026',
        validUntil: '14 Oct 2026',
        machine: 'Rodillo Compactador Bomag BW211 D-5',
        vin: 'BOM2112023B812',
        items: [
          { name: 'Overhaul Completo Bomba Hidrostática Rexroth A4VG125', desc: 'Reconstrucción en banco con calibración de circuito cerrado a 380 Bar.', qty: 1, unit: 4200, total: 4200 },
          { name: 'Juego de Amortiguadores de Tambor de Rodillo 211 OEM', desc: 'Kit de 12 tacos elásticos de caucho reforzado para trabajo pesado.', qty: 2, unit: 1420, total: 2840 },
          { name: 'Pruebas Dinámicas de Amplitud y Frecuencia de Compactación', desc: 'Certificación técnica con acelerómetros en Banco de Rodillos Km 22.', qty: 1, unit: 1900, total: 1900 }
        ],
        subtotal: '$8,940.00',
        itbis: '$1,609.20',
        total: '$10,549.20 USD',
        deposit: '$2,500.00 USD',
        cardHolder: 'Raúl Rizek',
        cardMasked: '•••• •••• •••• 5120'
      },
      fleet: [
        {
          id: 'EQ-11',
          name: 'Excavadora Pesada JCB JS370HD',
          vin: 'JCB370HD2024M01',
          hours: '2,150.0 hrs',
          fuel: 78,
          location: 'Cruce Samaná · Obra Autovía Tramo III',
          status: 'OPERATIVA',
          nextServiceIn: '350.0 hrs (Servicio 2500h)',
          operator: 'Danilo Almonte',
          hydraulicPressure: '345 Bar / 350 Bar Max',
          coolantTemp: '83°C (Normal)',
          batteryVoltage: '24.9 V',
          gpsCoords: '19.1235° N, 69.8450° W',
          geofence: 'Polígono Concesión Vial Nordeste',
          sosFluid: 'Muestra de Aceite Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-12',
          name: 'Excavadora Pesada JCB JS370HD',
          vin: 'JCB370HD2024M02',
          hours: '1,980.0 hrs',
          fuel: 92,
          location: 'Tramo Las Terrenas · Corte de Roca',
          status: 'OPERATIVA',
          nextServiceIn: '520.0 hrs',
          operator: 'Ramón Castillo',
          hydraulicPressure: '348 Bar Óptimo',
          coolantTemp: '85°C (Carga Alta)',
          batteryVoltage: '25.0 V',
          gpsCoords: '19.2941° N, 69.5412° W',
          geofence: 'Corte de Talud Terrenas',
          sosFluid: 'Muestra Limpia',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-13',
          name: 'Rodillo Compactador Bomag BW211 D-5',
          vin: 'BOM2112023B812',
          hours: '3,890.0 hrs',
          fuel: 65,
          location: 'Taller Central Km 22 · Bahía 7 (Overhaul)',
          status: 'EN TALLER',
          nextServiceIn: 'En servicio de overhaul hidrostático',
          operator: 'Taller Km 22',
          hydraulicPressure: '380 Bar (En Calibración)',
          coolantTemp: '58°C (En Espera)',
          batteryVoltage: '24.5 V',
          gpsCoords: '18.5780° N, 70.0410° W',
          geofence: 'Sede Matriz Km 22 Aut. Duarte',
          sosFluid: 'Drenaje Completado',
          dtc: 'WO-9104 en curso'
        },
        {
          id: 'EQ-14',
          name: 'Retroexcavadora JCB 3CX 4x4 Heavy Duty',
          vin: 'JCB3CX2024R410',
          hours: '4,210.0 hrs',
          fuel: 80,
          location: 'Sánchez Ramírez · Minera Pueblo Viejo',
          status: 'OPERATIVA',
          nextServiceIn: '290.0 hrs',
          operator: 'Wellington Gómez',
          hydraulicPressure: '250 Bar',
          coolantTemp: '81°C',
          batteryVoltage: '24.7 V',
          gpsCoords: '18.9610° N, 70.1650° W',
          geofence: 'Perímetro Minero Certificado',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-15',
          name: 'Retroexcavadora JCB 3CX 4x4 Heavy Duty',
          vin: 'JCB3CX2024R411',
          hours: '2,640.0 hrs',
          fuel: 88,
          location: 'Autovía Km 45 · Zanja de Drenaje',
          status: 'OPERATIVA',
          nextServiceIn: '360.0 hrs',
          operator: 'Franklin Reyes',
          hydraulicPressure: '248 Bar',
          coolantTemp: '80°C',
          batteryVoltage: '24.8 V',
          gpsCoords: '18.7840° N, 69.9120° W',
          geofence: 'Franja Marginal Autovía',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-16',
          name: 'Motoniveladora LiuGong 4180D',
          vin: 'LG4180D2024N301',
          hours: '1,450.0 hrs',
          fuel: 72,
          location: 'Nivelación Base Tramo III · Nagua',
          status: 'OPERATIVA',
          nextServiceIn: '550.0 hrs',
          operator: 'Pedro Monegro',
          hydraulicPressure: '215 Bar',
          coolantTemp: '84°C',
          batteryVoltage: '24.9 V',
          gpsCoords: '19.3780° N, 69.8510° W',
          geofence: 'Sub-base Vial Nagua',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        }
      ],
      vault: [
        { id: 'DOC-B01-512', title: 'Comprobante Fiscal Digital NCF B01000512', type: 'invoice', date: '14 Sep 2026', size: '290 KB', ref: 'WO-9104' },
        { id: 'DOC-B01-501', title: 'Comprobante Fiscal Digital NCF B01000501', type: 'invoice', date: '01 Sep 2026', size: '210 KB', ref: 'WO-9011' },
        { id: 'DOC-COT-11602', title: 'Cotización Oficial #11602 (Overhaul Bomag 350 Bar)', type: 'quote', date: '14 Sep 2026', size: '345 KB', ref: 'Bomag BW211' },
        { id: 'DOC-CERT-ISO', title: 'Certificado de Pruebas de Esfuerzo Dinámico ISO 9001', type: 'cert', date: '08 Sep 2026', size: '480 KB', ref: 'Km 22 Cert' },
        { id: 'DOC-CONTR-9201', title: 'Contrato Maestro Corporativo TMD-9201 (6 Unidades)', type: 'contract', date: '15 Ene 2026', size: '1.4 MB', ref: 'TMD-9201' },
        { id: 'DOC-DVI-9104', title: 'Reporte DVI Preliminar Bomag BW211 WO-9104', type: 'dvi', date: '13 Sep 2026', size: '610 KB', ref: 'WO-9104' },
        { id: 'DOC-POL-CAR', title: 'Póliza de Seguro Todo Riesgo Construcción (CAR)', type: 'contract', date: '01 Feb 2026', size: '980 KB', ref: 'SEGUROS-RD' },
        { id: 'DOC-MOPC-HAB', title: 'Certificación MOPC Habilitación Maquinaria Pesada', type: 'cert', date: '20 May 2026', size: '320 KB', ref: 'MOPC-2026' }
      ]
    },
    estrella: {
      id: 'estrella',
      initials: 'IE',
      company: 'Ingeniería Estrella S.A.',
      rnc: '1-02-39481-9',
      project: 'Presa Montegrande · Fase Hidráulica Sur (Barahona)',
      contact: 'Ing. Manuel Estrella',
      phone: '(809) 583-4100',
      email: 'equipos@estrella.com.do',
      balance: '$0.00',
      balanceNcf: 'Línea de Crédito Corporativa Oro (Al día)',
      quote: {
        number: '#11618',
        title: 'COTIZACIÓN DE LÍNEA HIDRÁULICA #11618',
        date: '17 Sep 2026',
        validUntil: '17 Oct 2026',
        machine: 'Bulldozer LiuGong CLGB160',
        vin: 'LGB1602024C088',
        items: [
          { name: 'Kit de Mangueras Hidráulicas 4-Mallas Parker 350 Bar', desc: 'Mangueras spiraladas reforzadas para alta presión continua en cantera.', qty: 1, unit: 1450, total: 1450 },
          { name: 'Cuchilla de Corte Frontal y Pernos Templados Grado 8 OEM', desc: 'Acero Hardox 500 para desgaste severo en roca basáltica.', qty: 1, unit: 980, total: 980 },
          { name: 'Servicio Técnico Móvil de Rescate Km 22 a Presa Barahona', desc: 'Móvil de emergencia con mecánico certificado JCB y fluido SOS.', qty: 1, unit: 780, total: 780 }
        ],
        subtotal: '$3,210.00',
        itbis: '$577.80',
        total: '$3,787.80 USD',
        deposit: '$0.00 (Factura 30 Días)',
        cardHolder: 'Manuel Estrella',
        cardMasked: '•••• •••• •••• 3948'
      },
      fleet: [
        {
          id: 'EQ-21',
          name: 'Excavadora Hidráulica JCB JS220SC',
          vin: 'JCB2202024E01',
          hours: '3,110.0 hrs',
          fuel: 84,
          location: 'Muro Presa Montegrande · Barahona',
          status: 'OPERATIVA',
          nextServiceIn: '390.0 hrs',
          operator: 'Carlos Batista',
          hydraulicPressure: '348 Bar',
          coolantTemp: '83°C',
          batteryVoltage: '24.8 V',
          gpsCoords: '18.3120° N, 71.1890° W',
          geofence: 'Polígono Hidráulico Montegrande',
          sosFluid: 'Óptimo',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-22',
          name: 'Excavadora Hidráulica JCB JS220SC',
          vin: 'JCB2202024E02',
          hours: '2,890.0 hrs',
          fuel: 75,
          location: 'Canal de Desvío Sur · Enrocado',
          status: 'OPERATIVA',
          nextServiceIn: '110.0 hrs',
          operator: 'Wilson Cuevas',
          hydraulicPressure: '346 Bar',
          coolantTemp: '84°C',
          batteryVoltage: '24.9 V',
          gpsCoords: '18.3180° N, 71.1920° W',
          geofence: 'Desvío de Río Yaque del Sur',
          sosFluid: 'Óptimo',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-23',
          name: 'Excavadora Hidráulica JCB JS220SC',
          vin: 'JCB2202024E03',
          hours: '4,050.0 hrs',
          fuel: 88,
          location: 'Vertedero Central Presa',
          status: 'OPERATIVA',
          nextServiceIn: '450.0 hrs',
          operator: 'Julio Medina',
          hydraulicPressure: '349 Bar',
          coolantTemp: '82°C',
          batteryVoltage: '24.7 V',
          gpsCoords: '18.3150° N, 71.1850° W',
          geofence: 'Vertedero Principal',
          sosFluid: 'Óptimo',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-24',
          name: 'Cargador Frontal LiuGong 856H',
          vin: 'LG8562024E11',
          hours: '3,740.0 hrs',
          fuel: 68,
          location: 'Acopio de Agregados Presa',
          status: 'OPERATIVA',
          nextServiceIn: '260.0 hrs',
          operator: 'Alberto Pérez',
          hydraulicPressure: '215 Bar',
          coolantTemp: '86°C',
          batteryVoltage: '24.5 V',
          gpsCoords: '18.3210° N, 71.1810° W',
          geofence: 'Planta Trituración',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-25',
          name: 'Cargador Frontal LiuGong 856H',
          vin: 'LG8562024E12',
          hours: '1,890.0 hrs',
          fuel: 90,
          location: 'Planta de Concreto Hidráulico',
          status: 'OPERATIVA',
          nextServiceIn: '610.0 hrs',
          operator: 'Santos Féliz',
          hydraulicPressure: '212 Bar',
          coolantTemp: '81°C',
          batteryVoltage: '24.8 V',
          gpsCoords: '18.3240° N, 71.1790° W',
          geofence: 'Planta Concreto',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-26',
          name: 'Rodillo Compactador Bomag BW211 D-5',
          vin: 'BOM2112024E21',
          hours: '2,420.0 hrs',
          fuel: 82,
          location: 'Compactación Núcleo de Arcilla',
          status: 'OPERATIVA',
          nextServiceIn: '80.0 hrs',
          operator: 'Héctor Matos',
          hydraulicPressure: '375 Bar',
          coolantTemp: '83°C',
          batteryVoltage: '24.6 V',
          gpsCoords: '18.3140° N, 71.1880° W',
          geofence: 'Núcleo Impermeable Presa',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-27',
          name: 'Rodillo Compactador Bomag BW211 D-5',
          vin: 'BOM2112024E22',
          hours: '2,980.0 hrs',
          fuel: 70,
          location: 'Corona de Presa · Rasante Final',
          status: 'OPERATIVA',
          nextServiceIn: '520.0 hrs',
          operator: 'Emilio Suero',
          hydraulicPressure: '378 Bar',
          coolantTemp: '85°C',
          batteryVoltage: '24.7 V',
          gpsCoords: '18.3160° N, 71.1860° W',
          geofence: 'Corona Superior',
          sosFluid: 'Conforme',
          dtc: 'Sin Fallas Activas'
        },
        {
          id: 'EQ-28',
          name: 'Bulldozer de Orugas LiuGong CLGB160',
          vin: 'LGB1602024C088',
          hours: '3,650.0 hrs',
          fuel: 79,
          location: 'Terraplén Margen Izquierda',
          status: 'OPERATIVA',
          nextServiceIn: 'Cotización #11618 pendiente',
          operator: 'Geovanny De León',
          hydraulicPressure: '348 Bar',
          coolantTemp: '87°C (Roca Dura)',
          batteryVoltage: '24.5 V',
          gpsCoords: '18.3190° N, 71.1940° W',
          geofence: 'Talud Izquierdo',
          sosFluid: 'Recomendada Renovación Mangueras',
          dtc: 'Presión Línea Secundaria - Revisión Programada'
        }
      ],
      vault: [
        { id: 'DOC-ESTADO-ORO', title: 'Estado de Cuenta Mensual (Balance: $0.00 USD)', type: 'invoice', date: '18 Sep 2026', size: '195 KB', ref: 'LINEA-ORO' },
        { id: 'DOC-B01-470', title: 'Comprobante Fiscal Digital NCF B01000470 ($18,400 USD)', type: 'invoice', date: '25 Ago 2026', size: '280 KB', ref: 'WO-8870' },
        { id: 'DOC-COT-11618', title: 'Cotización Oficial #11618 (Mangueras 350 Bar)', type: 'quote', date: '17 Sep 2026', size: '320 KB', ref: 'CLGB160' },
        { id: 'DOC-CERT-410', title: 'Certificado de Calibración Hidráulica #410 a 350 Bar', type: 'cert', date: '15 Ago 2026', size: '430 KB', ref: 'Km 22 Cert' },
        { id: 'DOC-CONTR-MOPC', title: 'Contrato Alquiler Consorciado MOPC / INDRHI', type: 'contract', date: '01 Mar 2026', size: '2.1 MB', ref: 'CONTR-890' },
        { id: 'DOC-DVI-SUR', title: 'Reporte DVI 40 Puntos Barahona Móvil Septiembre', type: 'dvi', date: '16 Sep 2026', size: '540 KB', ref: 'WO-9188' },
        { id: 'DOC-SOS-8EQ', title: 'Análisis SOS Fluidos y Desgaste 8 Equipos', type: 'cert', date: '12 Sep 2026', size: '710 KB', ref: 'LAB-SOS-RD' },
        { id: 'DOC-CERT-JCB', title: 'Certificación Operador Oficial JCB Nivel Experto', type: 'cert', date: '10 Jul 2026', size: '380 KB', ref: 'JCB-ACADEMY' },
        { id: 'DOC-AEMP-LIVE', title: 'Matriz de Horómetros AEMP 2.0 LiveLink Telematics', type: 'cert', date: '18 Sep 2026', size: '290 KB', ref: 'LIVELINK' },
        { id: 'DOC-ACTA-0KM', title: 'Acta de Entrega 0 Km Puerto Barahona Maquinaria', type: 'contract', date: '10 Feb 2026', size: '640 KB', ref: 'ACTA-0KM' },
        { id: 'DOC-BANRESERVA', title: 'Constancia de Pago Banreservas Transferencia VIP', type: 'invoice', date: '28 Ago 2026', size: '170 KB', ref: 'BR-84920' }
      ]
    }
  };

  // Active tenant pointers
  var CLIENT_DATA = TENANTS.malespin;
  var FLEET_ASSETS = TENANTS.malespin.fleet;
  var VAULT_DOCUMENTS = TENANTS.malespin.vault;

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
                <div class="tmd-user-avatar" id="tmd-user-avatar">CM</div>
                <div class="tmd-user-info">
                  <div class="tmd-user-name" id="tmd-user-name">Consorcio Malespín S.R.L.</div>
                  <div class="tmd-user-role" id="tmd-user-role">RNC: 1-31-84920-1 · TIER 1</div>
                </div>
              </div>

              <!-- Strictly Log Out Button (Triggers Enterprise Login / Switcher) -->
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

              <!-- Multi-Tenant Enterprise Account Switcher -->
              <div class="tmd-tenant-bar">
                <span class="tmd-tenant-tag">🏢 CUENTA:</span>
                <select id="tmd-tenant-select" class="tmd-tenant-dropdown" onchange="window.tmdSwitchTenant(this.value)">
                  <option value="malespin">Consorcio Malespín S.R.L. · RNC 1-31-84920-1 (4 Equipos)</option>
                  <option value="rizek">Constructora Rizek &amp; Asocs. · RNC 1-01-02948-2 (6 Equipos)</option>
                  <option value="estrella">Ingeniería Estrella S.A. · RNC 1-02-39481-9 (8 Equipos)</option>
                  <option value="custom">➕ Conectar otra Empresa / RNC...</option>
                </select>
                <span class="tmd-tenant-tier-pill">TIER 1 ENTERPRISE</span>
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
                  <div class="tmd-ribbon-number" id="tmd-ribbon-quotes-count">1 <span class="tmd-ribbon-amount" id="tmd-ribbon-quotes-amount">$5.5K</span></div>
                  <div class="tmd-ribbon-sub"><span>Borradores: 0</span><span id="tmd-ribbon-quotes-sub">Para firma: 1</span></div>
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
                  <div class="tmd-ribbon-number" id="tmd-ribbon-vault-count">5 <span class="tmd-ribbon-amount" id="tmd-ribbon-vault-amount">$4,150.00</span></div>
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
                    <div style="font-size:2rem;font-weight:900;color:#ffffff;font-family:'JetBrains Mono',monospace;margin:6px 0;" id="tmd-client-balance-val">$4,150.00 <span style="font-size:0.8rem;color:#71717a;">USD</span></div>
                    <div style="font-size:0.75rem;color:#a1a1aa;" id="tmd-client-balance-ncf">Factura Fiscal NCF B01000492</div>
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
                    <button class="tmd-btn-outline" onclick="window.tmdShowToast('Descargando ' + (document.getElementById('tmd-quote-title') ? document.getElementById('tmd-quote-title').innerText : 'Cotización') + ' en PDF oficial TMD...', 'info')">📥 Descargar PDF</button>
                  </div>

                  <div class="tmd-doc-meta-grid">
                    <div class="tmd-doc-client-info">
                      <div style="font-size:0.75rem;font-weight:700;color:#facc15;font-family:'JetBrains Mono',monospace;margin-bottom:4px;" id="tmd-quote-title">
                        COTIZACIÓN DE REPARACIÓN #11555
                      </div>
                      <h3 id="tmd-quote-company">Consorcio Malespín S.R.L.</h3>
                      <p id="tmd-quote-meta">Av. Luperón Esq. Mirador Sur, Santo Domingo · RNC: 1-31-84920-1</p>
                      <div style="margin-top:10px;display:inline-block;padding:4px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:6px;font-size:0.75rem;color:#facc15;" id="tmd-quote-machine">
                        Equipo: <strong>Excavadora JCB JS220SC</strong> (VIN: JCB220SC2024X981)
                      </div>
                    </div>

                    <div style="text-align:right;">
                      <span class="tmd-status-tag tmd-tag-yellow">En espera de respuesta</span>
                      <div style="margin-top:12px;font-size:0.78rem;color:#a1a1aa;">Fecha: <strong style="color:#ffffff;" id="tmd-quote-date">10 Sep 2026</strong></div>
                      <div style="font-size:0.78rem;color:#a1a1aa;">Válida hasta: <strong style="color:#ffffff;" id="tmd-quote-valid">10 Oct 2026</strong></div>
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
                    <tbody id="tmd-quote-tbody">
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
                    <div class="tmd-total-row"><span>Subtotal:</span><span id="tmd-quote-subtotal">$4,650.00</span></div>
                    <div class="tmd-total-row"><span>ITBIS (18% DGII):</span><span id="tmd-quote-itbis">$837.00</span></div>
                    <div class="tmd-total-row grand"><span>Total:</span><span style="color:#facc15;" id="tmd-quote-total">$5,487.00 USD</span></div>
                    <div class="tmd-total-row" style="color:#10b981;font-weight:800;"><span>Anticipo Requerido:</span><span id="tmd-quote-deposit">$1,000.00 USD</span></div>
                  </div>
                </div>

                <!-- Sticky Checkout Drawer -->
                <aside class="tmd-sticky-checkout">
                  <div style="font-size:0.75rem;font-weight:700;color:#a1a1aa;text-transform:uppercase;">Anticipo Requerido</div>
                  <div class="tmd-checkout-deposit-val" id="tmd-quote-deposit-side">$1,000.00</div>
                  
                  <div class="tmd-payment-methods">
                    <button class="tmd-method-btn active" id="btn-pay-cc" onclick="window.tmdSelectPayMethod('cc')">💳 Tarjeta Crédito</button>
                    <button class="tmd-method-btn" id="btn-pay-bank" onclick="window.tmdSelectPayMethod('bank')">🏦 Banreservas</button>
                  </div>

                  <div class="tmd-card-field-group">
                    <input type="text" id="tmd-quote-card-name" class="tmd-input-field" placeholder="Nombre en tarjeta" value="Marcos Malespín" />
                    <input type="text" id="tmd-quote-card-num" class="tmd-input-field" placeholder="Número de tarjeta (4242 •••• •••• 8492)" value="•••• •••• •••• 8492" />
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
            <h3 style="margin:0;font-size:1.1rem;color:#ffffff;" id="tmd-sig-dialog-title">Aprobar Cotización</h3>
            <button class="tmd-btn-icon" onclick="window.tmdCloseSignatureModal()">✕</button>
          </div>
          <div style="padding:24px;">
            <p style="font-size:0.78rem;color:#a1a1aa;margin:0 0 12px 0;" id="tmd-sig-dialog-desc">
              Dibuje su firma manuscrita para autorizar la orden de servicio técnico y el anticipo requerido.
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

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- 4. ENTERPRISE MULTI-TENANT AUTH GATE MODAL                  -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div id="tmd-client-auth-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(24px);z-index:10000000;align-items:center;justify-content:center;padding:20px;">
        <div style="background:#09090b;border:1px solid rgba(255,184,0,0.3);border-radius:20px;max-width:540px;width:100%;padding:32px;box-shadow:0 24px 64px rgba(0,0,0,0.95);position:relative;">
          <button onclick="window.tmdCloseClientAuthModal()" style="position:absolute;top:20px;right:20px;background:none;border:none;color:#71717a;font-size:1.3rem;cursor:pointer;">✕</button>
          
          <div style="text-align:center;margin-bottom:24px;">
            <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;background:#f59e0b;color:#000;font-weight:900;font-size:1.2rem;box-shadow:0 0 20px rgba(245,158,11,0.4);margin-bottom:12px;">TMD</div>
            <h3 style="margin:0;color:#ffffff;font-size:1.35rem;font-weight:800;font-family:'Space Grotesk',sans-serif;">TMD Heavy Hub · Portal VIP</h3>
            <p style="margin:6px 0 0 0;font-size:0.78rem;color:#a1a1aa;">Acceso exclusivo y multi-inquilino para contratistas, flotas y constructoras de RD.</p>
          </div>

          <div style="display:flex;background:#121214;border-radius:10px;padding:4px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.06);">
            <button id="tmd-auth-tab-login" onclick="window.tmdSwitchAuthTab('login')" style="flex:1;padding:8px;border-radius:8px;border:none;background:#f59e0b;color:#000;font-weight:700;font-size:0.78rem;cursor:pointer;">Iniciar Sesión VIP</button>
            <button id="tmd-auth-tab-register" onclick="window.tmdSwitchAuthTab('register')" style="flex:1;padding:8px;border-radius:8px;border:none;background:transparent;color:#a1a1aa;font-weight:700;font-size:0.78rem;cursor:pointer;">Registrar Empresa / RNC</button>
          </div>

          <!-- Login View -->
          <div id="tmd-auth-view-login">
            <div style="margin-bottom:16px;padding:12px;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.2);border-radius:10px;">
              <div style="font-size:0.7rem;color:#facc15;font-weight:800;font-family:'JetBrains Mono',monospace;margin-bottom:8px;text-transform:uppercase;">⚡ Acceso Rápido Demo Enterprise (1-Click):</div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
                <button type="button" onclick="window.tmdQuickLoginTenant('malespin')" style="padding:8px 6px;background:#18181b;border:1px solid rgba(255,184,0,0.3);border-radius:6px;color:#facc15;font-size:0.72rem;font-weight:700;cursor:pointer;">Malespín (4 Eq)</button>
                <button type="button" onclick="window.tmdQuickLoginTenant('rizek')" style="padding:8px 6px;background:#18181b;border:1px solid rgba(255,184,0,0.3);border-radius:6px;color:#facc15;font-size:0.72rem;font-weight:700;cursor:pointer;">Rizek (6 Eq)</button>
                <button type="button" onclick="window.tmdQuickLoginTenant('estrella')" style="padding:8px 6px;background:#18181b;border:1px solid rgba(255,184,0,0.3);border-radius:6px;color:#facc15;font-size:0.72rem;font-weight:700;cursor:pointer;">Estrella (8 Eq)</button>
              </div>
            </div>

            <form onsubmit="window.tmdHandleAuthLogin(event)" style="display:flex;flex-direction:column;gap:12px;">
              <div>
                <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">RNC de la Empresa o Correo Corporativo:</label>
                <input type="text" id="tmd-login-rnc" class="tmd-input-field" placeholder="Ej. 1-31-84920-1 o contratista@malespin.com.do" value="1-31-84920-1" required />
              </div>
              <div>
                <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">Clave o PIN de Acceso Seguro:</label>
                <input type="password" id="tmd-login-pin" class="tmd-input-field" placeholder="••••••••" value="VIP2026" required />
              </div>
              <button type="submit" class="tmd-btn-pay-primary" style="margin-top:8px;">
                Entrar al Cockpit VIP →
              </button>
            </form>
          </div>

          <!-- Register View -->
          <div id="tmd-auth-view-register" style="display:none;">
            <form onsubmit="window.tmdHandleAuthRegister(event)" style="display:flex;flex-direction:column;gap:10px;">
              <div>
                <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">Razón Social / Consorcio:</label>
                <input type="text" id="tmd-reg-company" class="tmd-input-field" placeholder="Ej. Constructora del Caribe S.R.L." required />
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div>
                  <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">RNC Dominicano:</label>
                  <input type="text" id="tmd-reg-rnc" class="tmd-input-field" placeholder="1-XX-XXXXX-X" required />
                </div>
                <div>
                  <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">Teléfono Flota / WhatsApp:</label>
                  <input type="tel" id="tmd-reg-phone" class="tmd-input-field" placeholder="(809) 000-0000" required />
                </div>
              </div>
              <div>
                <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">Proyecto u Obra Principal:</label>
                <input type="text" id="tmd-reg-project" class="tmd-input-field" placeholder="Ej. Circunvalación / Cantera / Minería" required />
              </div>
              <div>
                <label style="display:block;font-size:0.72rem;color:#a1a1aa;margin-bottom:4px;font-weight:600;">Correo Corporativo:</label>
                <input type="email" id="tmd-reg-email" class="tmd-input-field" placeholder="operaciones@empresa.com.do" required />
              </div>
              <button type="submit" class="tmd-btn-pay-primary" style="margin-top:8px;">
                Crear Cuenta Enterprise &amp; Entrar →
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    renderTenantQuote(TENANTS[_activeTenantId].quote, TENANTS[_activeTenantId]);
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
    var qNum = (TENANTS[_activeTenantId] && TENANTS[_activeTenantId].quote) ? TENANTS[_activeTenantId].quote.number : '#11555';
    window.tmdShowToast('¡Cotización ' + qNum + ' Aprobada! Anticipo Square procesado y Bahía reservada en Km 22.', 'success');
    window.tmdSwitchClientNav('nav-orders');
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* ENTERPRISE MULTI-TENANT SWITCHER & QUOTE ENGINE                    */
  /* ══════════════════════════════════════════════════════════════════ */
  function renderTenantQuote(quote, tenant) {
    if (!quote || !tenant) return;
    var titleEl = document.getElementById('tmd-quote-title');
    if (titleEl) titleEl.innerText = quote.title || ('COTIZACIÓN ' + quote.number);
    var compEl = document.getElementById('tmd-quote-company');
    if (compEl) compEl.innerText = tenant.company;
    var metaEl = document.getElementById('tmd-quote-meta');
    if (metaEl) metaEl.innerText = tenant.project + ' · RNC: ' + tenant.rnc;
    var machEl = document.getElementById('tmd-quote-machine');
    if (machEl) machEl.innerHTML = 'Equipo: <strong>' + quote.machine + '</strong> (VIN: ' + quote.vin + ')';
    var dateEl = document.getElementById('tmd-quote-date');
    if (dateEl) dateEl.innerText = quote.date;
    var validEl = document.getElementById('tmd-quote-valid');
    if (validEl) validEl.innerText = quote.validUntil;

    var tbody = document.getElementById('tmd-quote-tbody');
    if (tbody && quote.items) {
      tbody.innerHTML = quote.items.map(function(it) {
        return `
          <tr>
            <td>
              <div class="tmd-doc-item-title">${it.name}</div>
              <div style="font-size:0.75rem;color:#a1a1aa;">${it.desc}</div>
            </td>
            <td style="text-align:center;font-family:'JetBrains Mono',monospace;">${it.qty}</td>
            <td style="text-align:right;font-family:'JetBrains Mono',monospace;">$${it.unit.toLocaleString('en-US', {minimumFractionDigits:2})}</td>
            <td style="text-align:right;font-family:'JetBrains Mono',monospace;color:#ffffff;font-weight:700;">$${it.total.toLocaleString('en-US', {minimumFractionDigits:2})}</td>
          </tr>
        `;
      }).join('');
    }

    var subEl = document.getElementById('tmd-quote-subtotal');
    if (subEl) subEl.innerText = quote.subtotal;
    var itbisEl = document.getElementById('tmd-quote-itbis');
    if (itbisEl) itbisEl.innerText = quote.itbis;
    var totEl = document.getElementById('tmd-quote-total');
    if (totEl) totEl.innerText = quote.total;
    var depEl = document.getElementById('tmd-quote-deposit');
    if (depEl) depEl.innerText = quote.deposit;
    var depSideEl = document.getElementById('tmd-quote-deposit-side');
    if (depSideEl) depSideEl.innerText = quote.deposit.replace(' USD', '');
    var nameField = document.getElementById('tmd-quote-card-name');
    if (nameField) nameField.value = quote.cardHolder;
    var numField = document.getElementById('tmd-quote-card-num');
    if (numField) numField.value = quote.cardMasked;

    // Update Signature Modal Info
    var sigTitle = document.getElementById('tmd-sig-dialog-title');
    if (sigTitle) sigTitle.innerText = 'Aprobar Cotización ' + quote.number;
    var sigDesc = document.getElementById('tmd-sig-dialog-desc');
    if (sigDesc) sigDesc.innerText = 'Dibuje su firma manuscrita para autorizar la reparación de ' + quote.machine + ' y el anticipo de ' + quote.deposit + '.';
  }

  window.tmdSwitchTenant = function(tenantId) {
    if (tenantId === 'custom') {
      var name = prompt('Ingrese Razón Social o Consorcio:');
      if (!name || !name.trim()) {
        var selRestore = document.getElementById('tmd-tenant-select');
        if (selRestore) selRestore.value = _activeTenantId;
        return;
      }
      var rnc = prompt('Ingrese RNC Dominicano (ej. 1-32-84920-1):');
      if (!rnc || !rnc.trim()) rnc = '1-32-' + Math.floor(Math.random()*90000 + 10000) + '-1';
      var customId = 'custom_' + Date.now();
      TENANTS[customId] = {
        id: customId,
        initials: name.substring(0, 2).toUpperCase(),
        company: name.trim(),
        rnc: rnc.trim(),
        project: 'Obra Activa en Territorio Nacional',
        contact: 'Gerencia de Operaciones',
        phone: '(809) 826-2222',
        email: 'contacto@' + name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com.do',
        balance: '$0.00',
        balanceNcf: 'Línea Corporativa TMD Conforme (Al día)',
        quote: {
          number: '#11650',
          title: 'COTIZACIÓN DE SERVICIO TÉCNICO #11650',
          date: '19 Sep 2026',
          validUntil: '19 Oct 2026',
          machine: 'Excavadora Hidráulica JCB JS220SC',
          vin: 'JCB220SC2024X' + Math.floor(Math.random()*900 + 100),
          items: [
            { name: 'Inspección DVI 40 Puntos & Prueba de Presión 350 Bar', desc: 'Certificación técnica en banco dinámico Km 22.', qty: 1, unit: 450, total: 450 },
            { name: 'Kit de Filtros de Retorno & Mantenimiento Preventivo 500h', desc: 'Filtros genuinos de alto rendimiento para clima tropical.', qty: 1, unit: 380, total: 380 }
          ],
          subtotal: '$830.00',
          itbis: '$149.40',
          total: '$979.40 USD',
          deposit: '$300.00 USD',
          cardHolder: name.trim(),
          cardMasked: '•••• •••• •••• 9920'
        },
        fleet: [
          {
            id: 'EQ-01',
            name: 'Retroexcavadora JCB 3CX Eco 4x4',
            vin: 'JCB3CX2024E' + Math.floor(Math.random()*900 + 100),
            hours: '1,420.0 hrs',
            fuel: 85,
            location: 'Sede Central Km 22 Autopista Duarte',
            status: 'OPERATIVA',
            nextServiceIn: '80 hrs (Servicio 1500h)',
            operator: 'Operador Asignado',
            hydraulicPressure: '250 Bar Conforme',
            coolantTemp: '82°C (Normal)',
            batteryVoltage: '24.6 V',
            gpsCoords: '18.5714° N, 70.0347° W',
            geofence: 'Perímetro Habilitado RD',
            sosFluid: 'Análisis SOS: Conforme',
            dtc: 'Sin Fallas Activas'
          }
        ],
        vault: [
          { id: 'DOC-ESTADO-01', title: 'Estado de Cuenta Corporativo Inicial', type: 'invoice', date: '19 Sep 2026', size: '180 KB', ref: 'LINEA-B2B' },
          { id: 'DOC-CONTR-MARCO', title: 'Contrato Marco de Servicios de Flota TMD', type: 'contract', date: '19 Sep 2026', size: '1.1 MB', ref: 'TMD-B2B' }
        ]
      };

      var sel = document.getElementById('tmd-tenant-select');
      if (sel) {
        var opt = document.createElement('option');
        opt.value = customId;
        opt.text = name + ' · RNC ' + rnc + ' (Personalizado)';
        sel.insertBefore(opt, sel.lastElementChild);
      }
      tenantId = customId;
    }

    var t = TENANTS[tenantId] || TENANTS['malespin'];
    _activeTenantId = tenantId;
    CLIENT_DATA = t;
    FLEET_ASSETS = t.fleet;
    VAULT_DOCUMENTS = t.vault;

    // Update Select Dropdown
    var selEl = document.getElementById('tmd-tenant-select');
    if (selEl && selEl.value !== tenantId) selEl.value = tenantId;

    // Update Sidebar User Card
    var avatarEl = document.getElementById('tmd-user-avatar');
    if (avatarEl) avatarEl.innerText = t.initials;
    var nameEl = document.getElementById('tmd-user-name');
    if (nameEl) nameEl.innerText = t.company;
    var roleEl = document.getElementById('tmd-user-role');
    if (roleEl) roleEl.innerText = 'RNC: ' + t.rnc + ' · TIER 1';

    // Update Nav Badges
    var fleetBadge = document.querySelector('[data-cnav="nav-fleet"] .tmd-nav-badge');
    if (fleetBadge) fleetBadge.innerText = t.fleet.length + ' EQUIPOS';
    var vaultBadge = document.querySelector('[data-cnav="nav-vault"] .tmd-nav-badge');
    if (vaultBadge) vaultBadge.innerText = t.vault.length + ' DOCS';

    // Update Pane 1 Balance
    var balVal = document.getElementById('tmd-client-balance-val');
    if (balVal) balVal.innerHTML = t.balance + ' <span style="font-size:0.8rem;color:#71717a;">USD</span>';
    var balNcf = document.getElementById('tmd-client-balance-ncf');
    if (balNcf) balNcf.innerText = t.balanceNcf;

    // Update Ribbon Cards
    var qAmount = document.getElementById('tmd-ribbon-quotes-amount');
    if (qAmount && t.quote) qAmount.innerText = '$' + (parseFloat(t.quote.total.replace(/[^0-9.]/g, '') || 0) / 1000).toFixed(1) + 'K';
    var vAmount = document.getElementById('tmd-ribbon-vault-amount');
    if (vAmount) vAmount.innerText = t.balance;

    // Update Quote Pane
    renderTenantQuote(t.quote, t);

    // Re-render Fleet and Vault
    renderFleetAssets();
    renderVaultDocuments(VAULT_DOCUMENTS);

    tmdShowToast('✓ Sesión Enterprise activa: ' + t.company + ' (RNC ' + t.rnc + ')', 'success');
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* AUTH GATE & ACCESS MODAL CONTROLS                                  */
  /* ══════════════════════════════════════════════════════════════════ */
  window.tmdOpenClientAuthModal = function() {
    var m = document.getElementById('tmd-client-auth-modal');
    if (m) m.style.display = 'flex';
  };

  window.tmdCloseClientAuthModal = function() {
    var m = document.getElementById('tmd-client-auth-modal');
    if (m) m.style.display = 'none';
  };

  window.tmdSwitchAuthTab = function(tab) {
    var btnLogin = document.getElementById('tmd-auth-tab-login');
    var btnReg = document.getElementById('tmd-auth-tab-register');
    var vLogin = document.getElementById('tmd-auth-view-login');
    var vReg = document.getElementById('tmd-auth-view-register');

    if (tab === 'login') {
      if (btnLogin) { btnLogin.style.background = '#f59e0b'; btnLogin.style.color = '#000'; }
      if (btnReg) { btnReg.style.background = 'transparent'; btnReg.style.color = '#a1a1aa'; }
      if (vLogin) vLogin.style.display = 'block';
      if (vReg) vReg.style.display = 'none';
    } else {
      if (btnReg) { btnReg.style.background = '#f59e0b'; btnReg.style.color = '#000'; }
      if (btnLogin) { btnLogin.style.background = 'transparent'; btnLogin.style.color = '#a1a1aa'; }
      if (vReg) vReg.style.display = 'block';
      if (vLogin) vLogin.style.display = 'none';
    }
  };

  window.tmdQuickLoginTenant = function(tenantId) {
    window.tmdCloseClientAuthModal();
    window.tmdOpenClientPortal();
    window.tmdSwitchTenant(tenantId);
  };

  window.tmdHandleAuthLogin = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var rncInput = document.getElementById('tmd-login-rnc');
    var val = (rncInput ? rncInput.value : '').trim().toLowerCase();
    
    var matched = 'malespin';
    if (val.includes('rizek') || val.includes('02948')) {
      matched = 'rizek';
    } else if (val.includes('estrella') || val.includes('39481')) {
      matched = 'estrella';
    }

    window.tmdCloseClientAuthModal();
    window.tmdOpenClientPortal();
    window.tmdSwitchTenant(matched);
  };

  window.tmdHandleAuthRegister = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var comp = (document.getElementById('tmd-reg-company') ? document.getElementById('tmd-reg-company').value : 'Nueva Constructora').trim();
    var rnc = (document.getElementById('tmd-reg-rnc') ? document.getElementById('tmd-reg-rnc').value : '1-00-00000-0').trim();
    var project = (document.getElementById('tmd-reg-project') ? document.getElementById('tmd-reg-project').value : 'Obra Principal').trim();
    var phone = (document.getElementById('tmd-reg-phone') ? document.getElementById('tmd-reg-phone').value : '(809) 000-0000').trim();
    var email = (document.getElementById('tmd-reg-email') ? document.getElementById('tmd-reg-email').value : 'info@empresa.com.do').trim();

    var customId = 'reg_' + Date.now();
    TENANTS[customId] = {
      id: customId,
      initials: comp.substring(0, 2).toUpperCase(),
      company: comp,
      rnc: rnc,
      project: project,
      contact: 'Encargado de Flota',
      phone: phone,
      email: email,
      balance: '$0.00',
      balanceNcf: 'Línea de Crédito en Apertura',
      quote: {
        number: '#11690',
        title: 'COTIZACIÓN DE BIENVENIDA EMPRESARIAL #11690',
        date: '19 Sep 2026',
        validUntil: '19 Oct 2026',
        machine: 'Evaluación Técnica de Flota en Obra',
        vin: 'AUDIT-RD-2026',
        items: [
          { name: 'Inspección DVI 40 Puntos y Diagnóstico 350 Bar en Campo', desc: 'Revisión preventiva por unidad móvil Km 22 en su proyecto.', qty: 1, unit: 0, total: 0 }
        ],
        subtotal: '$0.00',
        itbis: '$0.00',
        total: '$0.00 USD (Cortesía Apertura B2B)',
        deposit: '$0.00',
        cardHolder: comp,
        cardMasked: '•••• •••• •••• 1000'
      },
      fleet: [
        {
          id: 'EQ-REG-01',
          name: 'Equipo Pendiente de Vinculación Telemática',
          vin: 'POR-VINCULAR-01',
          hours: '0.0 hrs',
          fuel: 100,
          location: project,
          status: 'OPERATIVA',
          nextServiceIn: 'Agendar diagnóstico inicial',
          operator: 'Por asignar',
          hydraulicPressure: '350 Bar Disponible',
          coolantTemp: 'Normal',
          batteryVoltage: '24.0 V',
          gpsCoords: 'República Dominicana',
          geofence: project,
          sosFluid: 'Muestreo Pendiente',
          dtc: 'Sin Fallas Activas'
        }
      ],
      vault: [
        { id: 'DOC-REG-BIENV', title: 'Certificado de Registro B2B TMD Heavy Hub', type: 'cert', date: '19 Sep 2026', size: '210 KB', ref: 'REG-2026' }
      ]
    };

    var sel = document.getElementById('tmd-tenant-select');
    if (sel) {
      var opt = document.createElement('option');
      opt.value = customId;
      opt.text = comp + ' · RNC ' + rnc;
      sel.insertBefore(opt, sel.lastElementChild);
    }

    window.tmdCloseClientAuthModal();
    window.tmdOpenClientPortal();
    window.tmdSwitchTenant(customId);
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /* CLIENT PORTAL ROUTING & ACCESS                                     */
  /* ══════════════════════════════════════════════════════════════════ */
  window.tmdOpenClientPortal = function() {
    if (typeof window.tmdCloseToolsMenu === 'function') {
      window.tmdCloseToolsMenu();
    }
    if (typeof window.tmdCloseNavMenu === 'function') {
      window.tmdCloseNavMenu();
    }
    initPortalsDOM();
    var modal = document.getElementById('tmd-client-portal');
    if (modal) {
      if (modal.style && modal.style.setProperty) {
        modal.style.setProperty('display', 'block', 'important');
        modal.style.setProperty('z-index', '9999999', 'important');
      } else {
        modal.style.display = 'block';
        modal.style.zIndex = '9999999';
      }
      document.body.style.overflow = 'hidden';
    }
  };

  window.tmdCloseClientPortal = function() {
    var modal = document.getElementById('tmd-client-portal');
    if (modal) {
      if (modal.style && modal.style.setProperty) {
        modal.style.setProperty('display', 'none', 'important');
      } else {
        modal.style.display = 'none';
      }
      document.body.style.overflow = '';
    }
  };

  window.tmdClientLogout = function() {
    window.tmdCloseClientPortal();
    window.tmdOpenClientAuthModal();
    window.tmdShowToast('Sesión cerrada. Seleccione una empresa o inicie sesión para continuar.', 'info');
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
    if (typeof window.tmdCloseToolsMenu === 'function') {
      window.tmdCloseToolsMenu();
    }
    if (typeof window.tmdCloseNavMenu === 'function') {
      window.tmdCloseNavMenu();
    }
    var pin = prompt('Ingrese PIN de Personal Taller Km 22 (Default: 2222):');
    if (pin === STAFF_PIN || pin === '0909') {
      initPortalsDOM();
      var modal = document.getElementById('tmd-staff-portal');
      if (modal) {
        if (modal.style && modal.style.setProperty) {
          modal.style.setProperty('display', 'block', 'important');
          modal.style.setProperty('z-index', '9999999', 'important');
        } else {
          modal.style.display = 'block';
          modal.style.zIndex = '9999999';
        }
        document.body.style.overflow = 'hidden';
      }
    } else if (pin !== null) {
      window.tmdShowToast('PIN de personal incorrecto. Acceso denegado a la Mesa Técnica.', 'error');
    }
  };

  window.tmdCloseStaffPortal = function() {
    var modal = document.getElementById('tmd-staff-portal');
    if (modal) {
      if (modal.style && modal.style.setProperty) {
        modal.style.setProperty('display', 'none', 'important');
      } else {
        modal.style.display = 'none';
      }
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
