# TMD TIER 2 FULLBAY CONNECTED: MASTER DELIVERY CHECKLIST

This checklist is used to track the delivery of the 9 specific features promised in the TMD Tier 2 Scope of Work. 

**Client:** Don Eduardo (TMD)
**Tier:** Tier 2 (Fullbay Connected + Web Ecosystem)
**Total Value:** $2,850 Setup + $150/mo Retainer

---

## ⬛ PHASE 0: Onboarding & Administration

- [x] **1. Master Service Agreement (MSA)**
  - [x] Configure custom IP and SOW clauses.
  - [x] Generate standalone MSA link for Welcome Email.
  - [ ] Client signs MSA.

- [x] **2. Financial Setup**
  - [x] Generate standalone $2,850 Setup Invoice (with 50% deposit schedule).
  - [ ] Client pays $1,425 (50%) deposit via Square.
  - [x] Configure $150/mo VIP Retainer (Recurring Series drafted, awaiting Card on File).

- [x] **3. Non-Disclosure Agreement (NDA)**
  - [x] Generate standalone NDA link for Welcome Email.
  - [ ] Receive signed NDA.

---

## 🟩 PHASE 1: A. Plataforma Web Principal (Digital Showroom)

- [ ] **1. Catálogo Transaccional (Renta vs Venta)**
  - [ ] Connect Square API to Supabase to fetch inventory.
  - [ ] Build Next.js catalog grid.
  - [ ] Implement Rent vs Sale toggle switch.
  - [ ] Map equipment specifications to catalog items.

- [ ] **2. Mega Menú Visual**
  - [ ] Build React navigation components.
  - [ ] Upload clean studio photos to Supabase Storage/Vercel CDN.
  - [ ] Integrate 12-member board and 15 brands data into navigation.

- [ ] **3. Motor Cotizador (Calculadora) con exportación a PDF**
  - [ ] Build client-side quoting logic (Dates/Items).
  - [ ] Integrate PDF generation library (`jsPDF` / `@react-pdf/renderer`).
  - [ ] Add branded TMD logo and footer to generated PDF.

- [ ] **4. Pasarela de Pagos Local (AZUL / PayPal)**
  - [ ] Request AZUL or PayPal API credentials from client.
  - [ ] Integrate local payment gateway SDK.
  - [ ] Test deposit/payment flow with test tokens.
  - [ ] Push to production credentials.

---

## 🏆 PHASE 1.5: ESPECIFICACIONES PARA SUPERAR A LA COMPETENCIA (Diseño Industrial & Alta Conversión)

- [ ] **A. Diseño Industrial Obsidian & Safety Yellow (Factor Visual WOW)**
  - [ ] Paleta de alto contraste en Dark Mode mate (`#090D16` carbón) con acentos Amarillo Caterpillar (`#FACC15`) y Naranja Seguridad (`#F97316`).
  - [ ] Fotografía de flota recortada en alta resolución (PNG Cutouts sin fondo, sombras 3D realistas y micro-iluminación de bordes).
  - [ ] Tipografía pesada de ingeniería (Cabinet Grotesk / Syne) combinada con micro-insignias técnicas monoespaciadas (`Consolas` / `JetBrains Mono`) para peso operativo, kW, capacidad de balde y horómetros.
  - [ ] Tarjetas de maquinaria con micro-interacciones suaves a 60 FPS (elevación al hover, iluminación de specs clave y CTA directo).

- [ ] **B. Calculadora de Renta Interactiva con Cierre Inmediato (Instant Gratification)**
  - [ ] Selector dinámico de duración de alquiler: `[ Por Día ]` `[ Por Semana ]` `[ Por Mes ]`.
  - [ ] Selector de aditamentos opcionales: Martillos hidráulicos, baldes de zanja/roca, acopladores rápidos.
  - [ ] Estimación instantánea en tiempo real sin formularios largos ni esperas de 48 horas.
  - [ ] Botón de cierre directo: **"Reservar por WhatsApp con Don Eduardo"** con mensaje pre-redactado conteniendo máquina, duración y aditamentos.

- [ ] **C. Mobile Cockpit para Contratistas en Obra (Job-Site Optimization)**
  - [ ] Carga instantánea < 0.8s en redes móviles 4G/LTE de República Dominicana (Vercel Edge Caching + Turbopack).
  - [ ] Contraste ultra-alto probado bajo luz solar directa en autopistas y canteras.
  - [ ] Botones táctiles de gran tamaño (mínimo 48px de alto) diseñados para operación con una sola mano o guantes de trabajo.
  - [ ] Barra de acción rápida fija inferior (Sticky Action Bar): Botón de llamada al conmutador `(888) 401-3090` y botón de WhatsApp con 1 tap.

- [x] **D. Buscador Inteligente de Repuestos y Filtros en Tiempo Real**
  - [x] Buscador con autocompletado instantáneo por número de parte, modelo de equipo o nombre comercial (`tmd_client_portal.js`).
  - [x] Indicador visual de stock físico disponible en el almacén del Km 22 Autopista Duarte.
  - [x] Botón directo de solicitud de despacho inmediato hacia el taller o a la obra vía WhatsApp.

- [x] **E. Portal Público de Transparencia de Taller (Fullbay Hook)**
  - [x] Módulo destacado "Rastreo de Flota & Taller en Vivo": el cliente ingresa su orden o serie y visualiza el progreso en 5 fases (`Recepción Km 22` ➔ `Diagnóstico` ➔ `Espera Repuestos` ➔ `Banco de Pruebas 350 Bar` ➔ `Listo para Retiro`).
  - [x] Diferenciador absoluto frente a talleres tradicionales sin trazabilidad.

---

## 🟦 PHASE 2: B. Integración y Portales (Fullbay Fleet)

- [ ] **5. Sincronización API con Fullbay (Lectura)**
  - [ ] Obtain Fullbay API keys from client (Pendiente llaves Don Eduardo).
  - [x] Create API Adapter Layer (`assets/tmd_api_adapter.js`) con interfaz Fullbay/JCB estandarizada.
  - [ ] Set up Cron schedule for periodic syncing.

- [x] **6. Rastreador en vivo de Órdenes de Trabajo (WO)**
  - [x] Build UI for the tracker con stepper dinámico de 5 fases a 60 FPS.
  - [x] Create database query to fetch WO status by ID (`TMD_API.getWorkOrder`).
  - [x] Map Fullbay statuses to user-friendly "Tracker" stages.

- [x] **7. Agendamiento de Bahías (Reservas Km 22)**
  - [x] Build Form/Calendar component for bookings con generación de código `SOL-2026-XXXX`.
  - [x] Create local + Supabase adapter for booking requests (`TMD_API.bookShopBay`).
  - [x] Configure automated WhatsApp dispatch trigger para recepción Km 22.

- [x] **8. Buscador de Repuestos en Inventario**
  - [x] Enable search filtering on inventory table (Filtros, Hidráulica, Sellos, Motores, Aceites).
  - [x] Build lightning-fast search bar UI con tarjetas de piezas en alta resolución.
  - [x] Ensure stock levels sync correctly from Fullbay API schema.

- [x] **9. Portal VIP de Grandes Contratistas (B2B Fleet Cockpit)**
  - [x] Cockpit de flota alquilada con horómetros acumulados, días restantes de renta y ubicación en obras de RD.
  - [x] Alerta predictiva de mantenimiento preventivo (500h).
  - [x] Implement DVI Inspection Viewer (inspección de presiones de banco 350 Bar y mangueras).
  - [x] Direct E-sign approval for extra shop parts & estimate authorizations con token de firma digital.

- [ ] **10. Portal de Operaciones y Mesa Técnica para Personal Interno (Staff Km 22)**
  - [ ] Role-based access control (RBAC) for Reception, Master Techs, and Parts Dispatchers.
  - [ ] Live Shop Floor Board: visual drag-and-drop bay assignment for Km 22.
  - [ ] Technician assignment interface mapped to Fullbay Mechanic IDs.
  - [x] WhatsApp automated dispatcher trigger: 1-click "Máquina Lista para Retiro".

- [ ] **11. Integración API JCB LiveLink & Telemática AEMP (GPS & Horómetros)**
  - [x] Local high-fidelity telematics data schema (VIN, horómetros, presión hidráulica 350 Bar, coordenadas RD).
  - [ ] Map active fleet to live JCB Developer API (A la espera de credenciales de cliente).
  - [x] 350 Bar hydraulic curve live monitoring and 500h preventive maintenance countdowns.
  - [x] Geofencing visual on active Dominican infrastructure projects.

---

## 🟨 PHASE 3: POST-DEPOSIT API CONVERSION & PRODUCTION GO-LIVE

- [x] **12. Arquitectura de Reemplazo Post-Depósito (Transición Staging ➔ Live API)**
  - [x] Bóveda y configuración centralizada en `window.TMD_API_CONFIG` (`USE_LIVE_API: false` por defecto).
  - [x] Esquemas de datos 100% compatibles con Fullbay y JCB LiveLink listos para recibir llaves.
  - [ ] Ingest client Fullbay API Key & Store ID into secure Supabase Vault.
  - [ ] Replace `mock_work_orders.json` with live Supabase Edge Function cron sync (every 15 min).
  - [ ] Ingest JCB LiveLink production credentials and map 44 rental units by serial/VIN.
  - [ ] Connect Square Web Payments SDK production tokens (`Location ID: CGBWWYE4W8J85`).
  - [ ] Replace demo PIN modal with production Supabase Auth session tokens.

- [ ] **13. Despliegue Subdominio Zero-Downtime & Certificados SSL**
  - [ ] Client configures CNAME `alquiler.tmd.com.do` pointing to `cname.vercel-dns.com`.
  - [ ] Validate zero disruption to client existing Office 365 MX and web records.
  - [ ] Production Edge Cache verification (< 1.2s load time across Santo Domingo LTE).

- [ ] **14. Cierre, Capacitación & Activación del Retainer VIP**
  - [ ] Remote video walkthrough with Don Eduardo & Km 22 shop dispatch staff.
  - [ ] Final 50% balance invoice settlement ($1,425.00 USD).
  - [ ] Deliver source code buyout package ([TECH 003]).
  - [ ] Activate automated recurring billing for the $150/mo VIP Retainer series ([MNT 011]).

---

## ⏱️ CRONOGRAMA MAESTRO DE 14 DÍAS & HITOS CONTRACTUALES (SQUARE BINDING)

Este cronograma vincula directamente cada hito técnico con los contratos y desembolsos legales de Square:

```
[ DÍA 1 – 2 ] ────── HITO 1: Activación Contractual (MSA/NDA + 50% Depósito $1,425 USD)
[ DÍA 3 – 5 ] ────── PROVISIÓN: Subdominio DNS CNAME + Bóveda Supabase + Conectores API
[ DÍA 6 – 10] ────── ENSAMBLAJE: Sincronización Catálogo 3 Pilares + WO Tracker + JCB LiveLink
[ DÍA 11 – 12] ───── UAT / TESTING: Pruebas de Aceptación con Despachador de Taller Km 22
[ DÍA 13 – 14] ───── HITO 2: Pase a Producción Oficial + Saldo Final $1,425 + Retainer VIP
```

### Tabla de Hitos Contractuales y Correspondencia de Acuerdos

| Hito / Fase | Plazo | Entregables Técnicos | Instrumento Legal / Contrato Square | Desembolso Financiero |
| :--- | :--- | :--- | :--- | :--- |
| **Hito 0: Formalización** | Día 1 | Firma digital de acuerdos de confidencialidad y prestación de servicios. | **Square NDA (#000202)** & **Square MSA (#000201)** | $0.00 |
| **Hito 1: Kick-Off & Setup** | Día 1 – 2 | Despliegue de entorno staging en Vercel, provisión de base de datos Supabase y recepción de llaves API Fullbay/JCB. | **Square Setup Invoice (50% Deposit)** | **$1,425.00 USD** *(RD$ 84,788)* |
| **Fase 2: Integración Técnica** | Días 3 – 10 | Conexión de catálogo 3 pilares (Dealer 0 Km, Renta 44 máquinas, Taller Fullbay), telemetría de 350 Bar y buscador de repuestos. | Anexo Técnico SOW (Tier 2 SOW-720) | En ejecución |
| **Fase 3: Pruebas UAT en Vivo** | Días 11 – 12 | Validación conjunta en vivo con Don Eduardo y personal de taller Km 22. Validación de CNAME en subdominio cliente. | Acta de Recepción Técnica (UAT Sign-off) | Aprobación de entrega |
| **Hito 2: Go-Live & Handover** | Días 13 – 14 | Pase oficial a producción, retiro de PIN Gate, entrega del paquete de código fuente (`[TECH 003]`) y sesión de capacitación. | **Square Balance Settlement Invoice (50%)** | **$1,425.00 USD** *(RD$ 84,788)* |
| **Hito 3: Retainer Mensual** | Día 30 en adelante | Monitoreo 24/7 de API Fullbay, certificados SSL automáticos, respaldos diarios en la nube y asistencia prioritaria. | **VIP Maintenance Retainer (`MNT-011` / #000203)** | **$150.00 USD / mes** *(Recurrente Card-on-File)* |

### Reglas Críticas de Entrega:
1. **Regla de Depósito:** Ningún trabajo de conexión de APIs de producción ni configuración de DNS personalizado inicia antes de la confirmación del pago del Hito 1 ($1,425 USD).
2. **Transferencia de Código (`TECH 003`):** El cliente recibe la titularidad patrimonial y los archivos fuente de su frontend web exclusivamente al liquidar el Hito 2.
3. **Continuidad del Servicio:** El retainer recurrente de $150/mes se debita automáticamente cada 30 días de la tarjeta registrada en Square, asegurando soporte ininterrumpido sin llamadas de cobranza.

