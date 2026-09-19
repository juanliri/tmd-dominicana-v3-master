const fs = require('fs');
const path = require('path');

const dir = 'theme_v2_stitch';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log('Wiring all', files.length, 'HTML pages in', dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // 1. Logo brand link -> index.html
  html = html.replace(/<div class="flex items-center gap-space-sm">\s*<img alt="Image from [^"]*logo\.png"[^>]*>\s*<div class="flex flex-col">\s*<span class="font-headline-sm[^>]*>TMD<\/span>\s*<span class="font-label-badge[^>]*>Dominicana<\/span>\s*<\/div>\s*<\/div>/g, (m) => {
    return `<a href="index.html" class="flex items-center gap-space-sm hover:opacity-90 transition-opacity">${m}</a>`;
  });
  html = html.replace(/href="#"([^>]*data-path="catalogo-de-maquinaria-y-equipos")/g, 'href="index.html"$1');
  html = html.replace(/(data-path="catalogo-de-maquinaria-y-equipos"[^>]*)href="#"/g, '$1href="index.html"');

  // 2. Navigation items based on data-path
  html = html.replace(/href="#"([^>]*data-path="maquinaria-nueva")/g, 'href="tienda_maquinaria_repuestos.html"$1');
  html = html.replace(/(data-path="maquinaria-nueva"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html"');

  html = html.replace(/href="#"([^>]*data-path="renta-de-flota")/g, 'href="tienda_maquinaria_repuestos.html#renta-section"$1');
  html = html.replace(/(data-path="renta-de-flota"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html#renta-section"');

  html = html.replace(/href="#"([^>]*data-path="renta-de-flotas")/g, 'href="tienda_maquinaria_repuestos.html#renta-section"$1');
  html = html.replace(/(data-path="renta-de-flotas"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html#renta-section"');

  html = html.replace(/href="#"([^>]*data-path="repuestos-y-filtros")/g, 'href="catalogo_repuestos_diagramas.html"$1');
  html = html.replace(/(data-path="repuestos-y-filtros"[^>]*)href="#"/g, '$1href="catalogo_repuestos_diagramas.html"');

  html = html.replace(/href="#"([^>]*data-path="repuestos-oem")/g, 'href="catalogo_repuestos_diagramas.html"$1');
  html = html.replace(/(data-path="repuestos-oem"[^>]*)href="#"/g, '$1href="catalogo_repuestos_diagramas.html"');

  html = html.replace(/href="#"([^>]*data-path="telemetria-livelink")/g, 'href="livelink_soporte_satelital_24_7.html"$1');
  html = html.replace(/(data-path="telemetria-livelink"[^>]*)href="#"/g, '$1href="livelink_soporte_satelital_24_7.html"');

  html = html.replace(/href="#"([^>]*data-path="taller-km-22")/g, 'href="servicio_tecnico_overhaul_km22.html"$1');
  html = html.replace(/(data-path="taller-km-22"[^>]*)href="#"/g, '$1href="servicio_tecnico_overhaul_km22.html"');

  html = html.replace(/href="#"([^>]*data-path="portal-prive-vip")/g, 'href="tmd_prive_vip.html"$1');
  html = html.replace(/(data-path="portal-prive-vip"[^>]*)href="#"/g, '$1href="tmd_prive_vip.html"');

  html = html.replace(/href="#"([^>]*data-path="portal-de-clientes-km-22")/g, 'href="portal_suite_cliente_staff.html"$1');
  html = html.replace(/(data-path="portal-de-clientes-km-22"[^>]*)href="#"/g, '$1href="portal_suite_cliente_staff.html"');

  html = html.replace(/href="#"([^>]*data-path="contacto-asesor")/g, 'href="livelink_soporte_satelital_24_7.html#sosFormSection"$1');
  html = html.replace(/(data-path="contacto-asesor"[^>]*)href="#"/g, '$1href="livelink_soporte_satelital_24_7.html#sosFormSection"');

  html = html.replace(/href="#"([^>]*data-path="cotizar-flota")/g, 'href="checkout_square_terminal.html"$1');
  html = html.replace(/(data-path="cotizar-flota"[^>]*)href="#"/g, '$1href="checkout_square_terminal.html"');

  // Category filters in Tienda / Checkout
  html = html.replace(/href="#"([^>]*data-path="construccion")/g, 'href="tienda_maquinaria_repuestos.html#construccion"$1');
  html = html.replace(/(data-path="construccion"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html#construccion"');

  html = html.replace(/href="#"([^>]*data-path="agricola")/g, 'href="tienda_maquinaria_repuestos.html#agricola"$1');
  html = html.replace(/(data-path="agricola"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html#agricola"');

  html = html.replace(/href="#"([^>]*data-path="industrial")/g, 'href="tienda_maquinaria_repuestos.html#industrial"$1');
  html = html.replace(/(data-path="industrial"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html#industrial"');

  html = html.replace(/href="#"([^>]*data-path="mineria")/g, 'href="tienda_maquinaria_repuestos.html#mineria"$1');
  html = html.replace(/(data-path="mineria"[^>]*)href="#"/g, '$1href="tienda_maquinaria_repuestos.html#mineria"');

  // 3. Text-based replacements for generic buttons
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Portal VIP<\/a>/gi, '<a$1href="portal_suite_cliente_staff.html"$2>Portal VIP</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Cotizar Flota 0 Km<\/a>/gi, '<a$1href="checkout_square_terminal.html"$2>Cotizar Flota 0 Km</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Cotizar Flota<\/a>/gi, '<a$1href="checkout_square_terminal.html"$2>Cotizar Flota</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Maquinaria Nueva 0 Km<\/a>/gi, '<a$1href="tienda_maquinaria_repuestos.html"$2>Maquinaria Nueva 0 Km</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Repuestos &amp; Filtros OEM<\/a>/gi, '<a$1href="catalogo_repuestos_diagramas.html"$2>Repuestos &amp; Filtros OEM</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Telemetría LiveLink<\/a>/gi, '<a$1href="livelink_soporte_satelital_24_7.html"$2>Telemetría LiveLink</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Taller Km 22<\/a>/gi, '<a$1href="servicio_tecnico_overhaul_km22.html"$2>Taller Km 22</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Portal Privé VIP<\/a>/gi, '<a$1href="tmd_prive_vip.html"$2>Portal Privé VIP</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Renta de Flota<\/a>/gi, '<a$1href="tienda_maquinaria_repuestos.html#renta-section"$2>Renta de Flota</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Cotizar Proforma<\/a>/gi, '<a$1href="calculadora_leasing_financiero.html"$2>Cotizar Proforma</a>');
  html = html.replace(/<a([^>]*?)href="#"([^>]*?)>Calculadora Leasing<\/a>/gi, '<a$1href="calculadora_leasing_financiero.html"$2>Calculadora Leasing</a>');

  // 4. Specific machinery cards & links
  html = html.replace(/href="#"([^>]*>[\s\S]*?JCB 3CX Eco 4x4)/gi, 'href="ficha_tecnica_jcb_3cx.html"$1');
  html = html.replace(/href="#"([^>]*>[\s\S]*?JCB 220X Tracked)/gi, 'href="ficha_tecnica_jcb_220x.html"$1');
  html = html.replace(/href="#"([^>]*>[\s\S]*?Ver Ficha JCB 220X)/gi, 'href="ficha_tecnica_jcb_220x.html"$1');

  // 5. Mega Menu hashes
  if (file === 'mega_menu_navegacion.html') {
    html = html.replace(/href="#jcb-220x"/g, 'href="ficha_tecnica_jcb_220x.html"');
    html = html.replace(/href="#jcb-3cx"/g, 'href="ficha_tecnica_jcb_3cx.html"');
    html = html.replace(/href="#liugong-922e"/g, 'href="tienda_maquinaria_repuestos.html#mineria"');
    html = html.replace(/href="#catalogo-completo"/g, 'href="tienda_maquinaria_repuestos.html"');
    html = html.replace(/href="#ls-mt7"/g, 'href="tienda_maquinaria_repuestos.html#agro"');
    html = html.replace(/href="#linea-agricola"/g, 'href="tienda_maquinaria_repuestos.html#agro"');
    html = html.replace(/href="#lab-diesel"/g, 'href="servicio_tecnico_overhaul_km22.html#laboratorio"');
    html = html.replace(/href="#banco-hidraulico"/g, 'href="servicio_tecnico_overhaul_km22.html#banco-pruebas"');
    html = html.replace(/href="#agendar-bahia"/g, 'href="servicio_tecnico_overhaul_km22.html#solicitud-servicio"');
    html = html.replace(/href="#portal-vip"/g, 'href="portal_suite_cliente_staff.html"');
    html = html.replace(/href="#portal-telemetria"/g, 'href="livelink_soporte_satelital_24_7.html"');
    html = html.replace(/href="#descargar-msa"/g, 'href="dossier_pitch_deck_msa.html"');
    html = html.replace(/href="#cotizador"/g, 'href="checkout_square_terminal.html"');
    html = html.replace(/href="#renta-calculadora"/g, 'href="calculadora_leasing_financiero.html"');
    html = html.replace(/href="#solicitar-inspeccion"/g, 'href="rastreo_taller_dvi_ordenes.html"');
  }

  // 6. Fix for rastreo_taller_dvi_ordenes.html: Add top navigation back bar
  if (file === 'rastreo_taller_dvi_ordenes.html' && !html.includes('<!-- TOP BACK BAR -->')) {
    const topBar = `<!-- TOP BACK BAR -->
<header class="w-full bg-[#000000] border-b border-[#222733] py-3 px-6 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <a href="index.html" class="flex items-center gap-3 text-white hover:text-[#ffb800] transition-colors">
      <span class="material-symbols-outlined text-[#ffb800]">arrow_back</span>
      <span class="font-headline font-semibold tracking-wide uppercase text-sm">TMD Dominicana · Volver al Cockpit</span>
    </a>
    <div class="flex items-center gap-4 text-xs font-mono">
      <a href="servicio_tecnico_overhaul_km22.html" class="text-[#94a3b8] hover:text-[#ffb800] transition-colors">Taller Km 22</a>
      <a href="portal_staff_fullbay_cockpit.html" class="px-2.5 py-1 rounded bg-[#1e2023] text-[#10b981] border border-[#10b981]/30">Fullbay Cockpit</a>
    </div>
  </div>
</header>
`;
    html = html.replace(/<body[^>]*>/i, (m) => m + '\n' + topBar);
  }

  // 7. Purge residual blue classes/hexes
  html = html.replace(/#0284c7/gi, '#ffb800');
  html = html.replace(/#38bdf8/gi, '#10b981');
  html = html.replace(/#2563eb/gi, '#ffb800');
  html = html.replace(/#1d4ed8/gi, '#e5a500');
  html = html.replace(/#3b82f6/gi, '#ffb800');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✅ Updated & wired:', file);
  } else {
    console.log('ℹ️ No changes needed for:', file);
  }
});

console.log('Wiring complete!');
