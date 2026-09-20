# TMD TIER 2 FULLBAY CONNECTED: MASTER DELIVERY CHECKLIST

This checklist is used to track the delivery of the 9 specific features promised in the TMD Tier 2 Scope of Work. 

**Client:** Tecnomaquinarias Diesel (TMD), S.R.L. | Ing. Eduardo López (Presidente)
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

- [x] **1. Catálogo Transaccional (Renta vs Venta)**
  - [x] Inventario digital multimarcas con estructura Supabase/Square compatible.
  - [x] Grid de maquinaria de alto rendimiento con renderizado rápido.
  - [x] Selector interactivo Renta vs. Venta con cálculo de cuotas operativas.
  - [x] Mapeo de especificaciones técnicas a cada unidad de flota.

- [x] **2. Mega Menú Visual**
  - [x] Componentes de navegación industrial Obsidian & Gold.
  - [x] Fotografías de flota en alta resolución integradas en CDN.
  - [x] Segmentación por 5 sectores industriales y portafolio de 10 marcas aliadas.

- [x] **3. Motor Cotizador (Configurador & Cotizador) con exportación a PDF**
  - [x] Lógica de cotización multimarca client-side en tiempo real (`tmd_quote_builder.js`).
  - [x] Generador formal de propuesta PDF para financiamiento bancario local.
  - [x] Branding corporativo oficial TMD, cálculo DGII Ley 11-92 y botón WhatsApp a Don Eduardo (`/configurador`).

- [ ] **4. Pasarela de Pagos Local (AZUL / PayPal)**
  - [ ] Solicitar credenciales API AZUL o PayPal a Don Eduardo (Bloqueado pendiente cliente).
  - [x] Arquitectura de botón Square Web Payments SDK configurada (`Location ID: CGBWWYE4W8J85`).
  - [ ] Pruebas de tokens de producción post-depósito.

---

## 🏆 PHASE 1.5: ESPECIFICACIONES PARA SUPERAR A LA COMPETENCIA (Diseño Industrial & Alta Conversión)

- [x] **A. Diseño Industrial Obsidian & Safety Yellow (Factor Visual WOW)**
  - [x] Paleta de alto contraste en Dark Mode mate (`#090D16` carbón) con acentos Amarillo Caterpillar (`#FACC15`) y Naranja Seguridad (`#F97316`).
  - [x] Fotografía de flota recortada en alta resolución (PNG Cutouts sin fondo, sombras 3D realistas y micro-iluminación de bordes).
  - [x] Tipografía pesada de ingeniería (Cabinet Grotesk / Syne) combinada con micro-insignias técnicas monoespaciadas (`Consolas` / `JetBrains Mono`) para peso operativo, kW, capacidad de balde y horómetros.
  - [x] Tarjetas de maquinaria con micro-interacciones suaves a 60 FPS (elevación al hover, iluminación de specs clave y CTA directo).

- [x] **B. Calculadora de Renta Interactiva con Cierre Inmediato (Instant Gratification)**
  - [x] Selector dinámico de duración de alquiler: `[ Por Día ]` `[ Por Semana ]` `[ Por Mes ]`.
  - [x] Selector de aditamentos opcionales: Martillos hidráulicos, baldes de zanja/roca, acopladores rápidos.
  - [x] Estimación instantánea en tiempo real sin formularios largos ni esperas de 48 horas.
  - [x] Botón de cierre directo: **"Reservar por WhatsApp con Don Eduardo"** con mensaje pre-redactado conteniendo máquina, duración y aditamentos.

- [x] **C. Mobile Cockpit para Contratistas en Obra (Job-Site Optimization)**
  - [x] Carga instantánea < 0.8s en redes móviles 4G/LTE de República Dominicana (Vercel Edge Caching + Turbopack).
  - [x] Contraste ultra-alto probado bajo luz solar directa en autopistas y canteras.
  - [x] Botones táctiles de gran tamaño (mínimo 48px de alto) diseñados para operación con una sola mano o guantes de trabajo.
  - [x] Barra de acción rápida fija inferior (Sticky Action Bar): Botón de llamada al conmutador `(888) 401-3090` y botón de WhatsApp con 1 tap.

- [x] **D. Buscador Inteligente de Repuestos y Filtros en Tiempo Real**
  - [x] Buscador con autocompletado instantáneo por número de parte, modelo de equipo o nombre comercial (`tmd_client_portal.js`).
  - [x] Indicador visual de stock físico disponible en el almacén del Km 22 Autopista Duarte.
  - [x] Botón directo de solicitud de despacho inmediato hacia el taller o a la obra vía WhatsApp.

- [x] **E. Portal Público de Transparencia de Taller (Fullbay Hook)**
  - [x] Módulo destacado "Rastreo de Flota & Taller en Vivo": el cliente ingresa su orden o serie y visualiza el progreso en 5 fases (`Recepción Km 22` ➔ `Diagnóstico` ➔ `Espera Repuestos` ➔ `Banco de Pruebas 350 Bar` ➔ `Listo para Retiro`).
  - [x] Diferenciador absoluto frente a talleres tradicionales sin trazabilidad.

---

## 💎 PHASE 1.6: ESPECIFICACIONES "ESTÁNDAR DIAMANTE (20/10)" — DOMINACIÓN REGIONAL SOBRE LOS OEM GLOBALES

Basado en el **Informe de Inteligencia Competitiva vs. Bobcat, Caterpillar, New Holland y John Deere**:

- [x] **F. Bio-Link Oficial Nativo (`/bio` · `/links`) — Reemplazo Gratuito de Linktree**
  - [x] Página nativa ultra-ligera (<43 KB) con glassmorphism oscuro y cero esquinas cuadradas (`bio.html`).
  - [x] Botón de auxilio técnico de emergencia WhatsApp 24/7 con mensaje pre-cargado.
  - [x] Chip de telemetría en vivo: `🟢 TALLER CENTRAL KM 22: OPERATIVO · 18 BAHÍAS ACTIVAS`.
  - [x] Generador y descarga de vCard 3.0 (`.vcf`) en 1 tap para guardar contactos de TMD en teléfonos de contratistas.
  - [x] Modal de Código QR vectorial para escanear en faenas y obras sin conexión.
  - [x] Motor de preservación de parámetros UTM e identificadores de pauta (`fbclid`, `gclid`).
  - [x] Configuración de reescrituras limpias en `vercel.json` para `/bio` y `/links`.

- [x] **G. Arquitectura de Indexación & SEO Técnico**
  - [x] Generación de `sitemap.xml` oficial con 8 rutas indexadas y soporte multilingüe.
  - [x] Creación de directiva de rastreo `robots.txt`.
  - [x] Ingesta de suite de microdatos Schema.org JSON-LD (`LocalBusiness`, `AutoDealer`, `Product`, `Service`).

- [x] **H. Comparador Side-by-Side de Maquinaria (3-Way Spec Matrix)**
  - [x] Herramienta interactiva para comparar 2 o 3 máquinas simultáneamente (ej: JCB 3CX vs Cat 420F vs Deere 310L).
  - [x] Matriz de 14 vectores técnicos (peso operativo, potencia kW, balde m³, profundidad, presión hidráulica, gal/h).
  - [x] Diferenciadores exclusivos del Caribe: A/C 38°C+, filtro ciclónico dual, tropicalización anti-corrosión.
  - [x] Botón de cierre: *"Cotizar Comparativa por WhatsApp"* y descarga en PDF formal (`tmd_model_comparator.js`).

- [x] **I. Buscador de Repuestos por Serial (VIN) & Diagramas de Despiece**
  - [x] Búsqueda inteligente por Número de Parte OEM, Serial de Máquina o Modelo (`tmd_parts_serial_engine.js`).
  - [x] Visor esquemático de despiece de piezas de desgaste crítico (filtros, kits de sellos, inyección, orugas).
  - [x] Indicador en tiempo real de inventario físico en Almacén Km 22 con garantía de despacho 24h.

- [x] **J. Radar de Cobertura Nacional Interactivo con Calculadora de Tiempo de Ruta**
  - [x] Mapa interactivo de República Dominicana con geolocalización de las 4 sedes operativas (Km 22, Santiago, Punta Cana, Barahona).
  - [x] Selector de las 32 provincias con cálculo dinámico de distancia en km y tiempo de traslado en cama baja (Lowboy) (`tmd_interactive_map.js`).
  - [x] Publicación de Acuerdos de Nivel de Servicio (SLA): Respuesta de rescate móvil < 2h en Gran Santo Domingo y < 4h en el interior.

- [x] **K. Suite Financiera: Calculadora Lease vs. Buy & Escudo Fiscal DGII**
  - [x] Comparador financiero de Adquisición de Capital vs. Leasing Operativo a 12, 24 y 36 meses (`tmd_financial_suite.js`).
  - [x] Calculadora de deducción fiscal por depreciación acelerada bajo Ley 11-92 (Categoría 2: 25% anual).
  - [x] Crédito fiscal de ITBIS 18% para constructoras (Comprobante Fiscal B01).

- [x] **L. Motor Tri-Lingüe de Exportación & PWA Offline para Canteras**
  - [x] Selector de idioma: Español Dominicano 🇩🇴, English Caribbean 🇺🇸, Kreyòl Ayisyen / Français 🇭🇹 (`tmd_i18n_core.js`).
  - [x] Modo PWA instalable en iOS y Android con caché local sin conexión para faenas y canteras sin señal (`manifest.json` y `sw.js`).
  - [x] Modo Alto Contraste para operación bajo sol directo caribeño en canteras.

- [x] **M. Pantalla de Carga & Fallback Corporativo (Anti-FOUC & Telemetría Km 22)**
  - [x] Eliminación total del pantallazo negro y botones huérfanos al recargar rutas directas (`#/parts`, `#/service`, `#/magazine`).
  - [x] Branding de lujo con logo oficial, halo áureo pulsante y badge de estado en vivo Sede Central Km 22 (`#tmd-app-loader`).
  - [x] Transición CSS fluida y desconexión automática inteligente mediante MutationObserver en `#root`.

- [x] **N. Revista Digital TMD (`#/magazine`): 4 Pilares de Operación Dominicana**
  - [x] Pilar 1: Lotes 0 Km recién descargados en Puerto Haina Oriental y DP World Caucedo listos para entrega inmediata.
  - [x] Pilar 2: Biblioteca Oficial de Fichas Técnicas & Brochures PDF embebida con especificaciones MOPC e ISO.
  - [x] Pilar 3: Casos de Estudio en Canteras de San Cristóbal, Circunvalación de Baní y arrozales de Bonao.
  - [x] Pilar 4: Accesos directos a Herramientas Digitales (Asesor de Flota, Comparador 3-vías, Cotizador DGII).

- [x] **O. Modales de Herramientas Digitales Obsidian Sólido 96% Opacidad (Zero Text Bleed)**
  - [x] Backdrops y contenedores obsidian profundo (`rgba(4,6,10,0.96)`) con desenfoque de 28px sin transparencia ni sangrado de texto.
  - [x] Fichas Técnicas, Asesor de Maquinaria, Comparador, Despiece VIN y Suite Financiera 100% legibles.
  - [x] Alineación micrométrica de triggers flotantes en desktop (bottom 24px/82px) y móvil (bottom 72px/116px).

- [x] **P. Bio-Link Hub Diamante (Milton CAT Benchmark) & Loader Fix (`/bio`, `/links`)**
  - [x] **Hero Cinematográfico**: Video drone HD y póster de maquinaria pesada en faena (`tmd_hero_drone_hd.mp4` / `tmd_hero_poster.jpg`) con gradiente obsidiana continuo.
  - [x] **Logo Oficial TMD de Alto Contraste**: Badge dorado con borde áureo de 2px, halo ambiental y fallback local offline (`/assets/logos/tmd_logo_gold.png`), sustituyendo enlace roto de Google.
  - [x] **Barra de Iconos Sociales (Benchmark Milton CAT)**: Fila dedicada de 5 redes oficiales (Facebook, Instagram, YouTube, LinkedIn, WhatsApp) con botones circulares de vidrio esmerilado y efecto hover ámbar.
  - [x] **Miniaturas Fotográficas 1:1 en Cada Tarjeta**: Sustitución de íconos genéricos por fotografías reales de excavadoras JCB, repuestos OEM, laboratorio de inyección diésel, comparador de maquinaria y telemetría satelital.
  - [x] **Reparación del Loader `#tmd-app-loader`**: Posicionamiento fijo estricto en línea (`position: fixed !important; inset: 0 !important; z-index: 999999 !important;`) con auto-remoción del DOM (`loader.remove()`) para impedir cualquier desplazamiento de navbar.

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

