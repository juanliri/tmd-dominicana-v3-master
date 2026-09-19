/**
 * TMD DOMINICANA — 3-WAY MODEL COMPARATOR & SPEC BENCHMARK ENGINE
 * Diamond Standard (20/10 Rating) vs. Global OEMs (Caterpillar, John Deere, Bobcat, New Holland)
 * © 2026 Tecnomaquinarias Diesel S.R.L. | Autopista Duarte Km 22, Santo Domingo
 */

(function initTMDModelComparator() {
  'use strict';

  // ─── 1. DATA: BENCHMARK PRESETS ACROSS FLAGSHIP CATEGORIES ───
  const COMPARISON_PRESETS = {
    backhoes: {
      id: 'backhoes',
      category: 'Retroexcavadoras 4x4 (14 Pies)',
      subtitle: 'La batalla por la faena civil y vial en República Dominicana',
      machines: [
        {
          name: 'JCB 3CX Eco Tropicalizada',
          brand: 'JCB / TMD',
          isTMD: true,
          tag: 'ELECCIÓN TMD • DISPONIBLE 0 KM',
          image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'En Almacén Km 22 (Entrega Inmediata)',
          specs: {
            weight: '8,135 kg (17,935 lbs)',
            power: '92 HP (68.6 kW) Turbo Diesel',
            digDepth: '4.24 m (14 ft 0 in) / 5.46 m Extradig',
            bucketCap: '1.0 m³ frontal / 0.28 m³ retro',
            hydraulic: '251 Bar (3,640 PSI) · Bomba Variable',
            fuelBurn: '7.8 - 9.2 L/h (Bajo consumo EcoDig)',
            cooling: 'Tropicalizado reforzado 48°C ambiente',
            filtration: 'Filtro ciclónico dual para polvo coralino',
            salitre: 'Pintura electrostática epóxica marina',
            telematics: 'LiveLink satelital 24/7 de serie',
            slaService: '< 2h Gran Sto Dgo · < 4h Provincias',
            dailyRate: '$450 USD / RD$27,000',
            dgiiStatus: '100% deducible ISR + 18% ITBIS Crédito B01',
            annualSaving: 'Ahorro de $6,200 USD/año vs Cat 420'
          }
        },
        {
          name: 'Caterpillar 420F2 / 420',
          brand: 'Caterpillar',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Bajo Pedido (60-90 días importación)',
          specs: {
            weight: '7,709 kg (16,995 lbs)',
            power: '93 HP (69.4 kW) Cat C4.4',
            digDepth: '4.36 m (14 ft 4 in)',
            bucketCap: '0.96 m³ frontal / 0.24 m³ retro',
            hydraulic: '250 Bar (3,626 PSI)',
            fuelBurn: '10.5 - 12.0 L/h (+22% consumo)',
            cooling: 'Estándar continental (requiere retrofit)',
            filtration: 'Filtro primario de papel simple',
            salitre: 'Esmalte poliéster estándar',
            telematics: 'VisionLink (suscripción paga post-año 1)',
            slaService: '24-48h previa llamada a distribuidor',
            dailyRate: '$540 USD / RD$32,400',
            dgiiStatus: 'Facturación estándar distribuidor',
            annualSaving: 'Línea base comparativa'
          }
        },
        {
          name: 'John Deere 310L',
          brand: 'John Deere',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Stock Limitado / Cotización cerrada',
          specs: {
            weight: '6,650 kg (14,660 lbs)',
            power: '86 HP (64.1 kW) PowerTech 4.5L',
            digDepth: '4.29 m (14 ft 1 in)',
            bucketCap: '0.86 m³ frontal / 0.21 m³ retro',
            hydraulic: '238 Bar (3,450 PSI)',
            fuelBurn: '9.8 - 11.2 L/h',
            cooling: 'Radiador estándar (susceptible a bagazo)',
            filtration: 'Pre-filtro convencional',
            salitre: 'Pintura verde estándar industrial',
            telematics: 'JDLink (limitado por cobertura celular)',
            slaService: 'Sujeto a disponibilidad de técnicos',
            dailyRate: '$510 USD / RD$30,600',
            dgiiStatus: 'Facturación estándar',
            annualSaving: '-$3,800 USD en repuestos cautivos'
          }
        }
      ]
    },

    excavators: {
      id: 'excavators',
      category: 'Excavadoras de Oruga 21-22 Toneladas',
      subtitle: 'Máxima productividad en canteras de caliza, minería y movimiento de tierras',
      machines: [
        {
          name: 'LiuGong 922E HD Severe-Duty',
          brand: 'LiuGong / TMD',
          isTMD: true,
          tag: 'ELECCIÓN TMD • STOCK KM 22',
          image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'En Almacén Km 22 (Entrega Inmediata)',
          specs: {
            weight: '22,000 kg (48,500 lbs)',
            power: '160 HP Cummins 6BTAA5.9 Tier 2 mecánico',
            digDepth: '6.56 m (21 ft 6 in)',
            bucketCap: '1.20 m³ reforzado con placas Hardox 450',
            hydraulic: '343 Bar (4,975 PSI) · Kawasaki K3V112',
            fuelBurn: '14.5 - 16.5 L/h (Motor mecánico tolerante a azufre)',
            cooling: 'Radiador de aletas anchas anti-tupición caliza',
            filtration: 'Triple trampa de combustible con separador agua',
            salitre: 'Chasis sellado para humedad tropical',
            telematics: 'Telemetría de presión y horas en tiempo real',
            slaService: '< 3h con taller móvil 4x4 en cantera',
            dailyRate: '$950 USD / RD$57,000',
            dgiiStatus: 'Crédito Fiscal B01 + Amortización 25% Ley 11-92',
            annualSaving: 'Ahorro de $14,800 USD/año en costos operativos'
          }
        },
        {
          name: 'Caterpillar 320 GC',
          brand: 'Caterpillar',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Bajo Pedido (45-60 días)',
          specs: {
            weight: '20,500 kg (45,200 lbs)',
            power: '146 HP Cat C4.4 ACERT electrónico',
            digDepth: '6.72 m (22 ft 1 in)',
            bucketCap: '1.00 m³ uso general',
            hydraulic: '350 Bar (5,075 PSI)',
            fuelBurn: '15.0 - 17.5 L/h (Sensible a calidad de diésel RD)',
            cooling: 'Estándar',
            filtration: 'Filtro electrónico de alta presión sensible',
            salitre: 'Tratamiento estándar',
            telematics: 'Product Link',
            slaService: '24-48h según agenda del distribuidor',
            dailyRate: '$1,250 USD / RD$75,000',
            dgiiStatus: 'Facturación tradicional',
            annualSaving: 'Línea base comparativa'
          }
        },
        {
          name: 'Komatsu PC200-8 / PC210',
          brand: 'Komatsu',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Importación especial',
          specs: {
            weight: '20,000 kg (44,090 lbs)',
            power: '148 HP Komatsu SAA6D107E-1',
            digDepth: '6.62 m (21 ft 9 in)',
            bucketCap: '0.93 m³',
            hydraulic: '373 Bar (5,410 PSI)',
            fuelBurn: '16.2 - 18.0 L/h',
            cooling: 'Radiador estándar',
            filtration: 'Doble filtro',
            salitre: 'Pintura estándar',
            telematics: 'KOMTRAX',
            slaService: 'Sujeto a repuestos en tránsito',
            dailyRate: '$1,180 USD / RD$70,800',
            dgiiStatus: 'Facturación estándar',
            annualSaving: '-$8,500 USD por repuestos de importación'
          }
        }
      ]
    },

    tractors: {
      id: 'tractors',
      category: 'Tractores Agrícolas 4WD (100 - 120 HP)',
      subtitle: 'Rendimiento en caña de azúcar, arrozales de Bonao/Nagua y campos de La Vega',
      machines: [
        {
          name: 'LS Tractor MT7.100 Heavy Agro',
          brand: 'LS Mtron / TMD',
          isTMD: true,
          tag: 'ELECCIÓN TMD • GARANTÍA 2 AÑOS',
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'En Almacén Km 22 (0 Horas)',
          specs: {
            weight: '4,450 kg con contrapesos de fábrica',
            power: '101 HP FPT Iveco Turbo Intercooler 4 Cil',
            digDepth: 'Levante 3-Puntos Cat II: 3,800 kg',
            bucketCap: 'Toma de Fuerza (TDP) 540 / 750 / 1000 RPM',
            hydraulic: '88 L/min bomba doble para aperos pesados',
            fuelBurn: '6.2 - 7.5 L/h en tiro pesado',
            cooling: 'Malla anti-bagazo extraíble para cañaveral',
            filtration: 'Filtro ciclónico en baño de aceite y prefiltro',
            salitre: 'Eje delantero sellado para arrozales anegados',
            telematics: 'Horómetro digital y monitor de servicio',
            slaService: '< 2.5h en Valle del Cibao y Este Cañero',
            dailyRate: '$320 USD / RD$19,200',
            dgiiStatus: 'Exención ITBIS Agrícola + B01 DGII',
            annualSaving: 'Ahorro de $4,900 USD/año en consumibles'
          }
        },
        {
          name: 'John Deere 6120M / 6100E',
          brand: 'John Deere',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Bajo reserva',
          specs: {
            weight: '4,300 kg',
            power: '100 HP PowerTech 4.5L',
            digDepth: 'Levante: 3,200 kg',
            bucketCap: 'TDP 540 / 1000 RPM',
            hydraulic: '65 L/min',
            fuelBurn: '8.4 - 9.8 L/h',
            cooling: 'Convencional (se satura con bagazo fino)',
            filtration: 'Cartucho de aire seco estándar',
            salitre: 'Retenes estándar no sellados para agua profunda',
            telematics: 'JDLink básico',
            slaService: '24-72h servicio oficial',
            dailyRate: '$440 USD / RD$26,400',
            dgiiStatus: 'Factura con NCF',
            annualSaving: 'Línea base comparativa'
          }
        },
        {
          name: 'New Holland T6.120 / TT4',
          brand: 'New Holland',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Stock bajo consulta',
          specs: {
            weight: '4,100 kg',
            power: '98 HP FPT 3.9L',
            digDepth: 'Levante: 3,000 kg',
            bucketCap: 'TDP 540 / 540E',
            hydraulic: '60 L/min',
            fuelBurn: '7.8 - 9.0 L/h',
            cooling: 'Estándar',
            filtration: 'Estándar',
            salitre: 'Protección convencional',
            telematics: 'No incluido en configuración base',
            slaService: 'Sujeto a cobertura regional',
            dailyRate: '$390 USD / RD$23,400',
            dgiiStatus: 'Factura con NCF',
            annualSaving: '-$2,400 USD por repuestos electrónicos'
          }
        }
      ]
    },

    skidsteers: {
      id: 'skidsteers',
      category: 'Minicargadores Compactos (Skid Steer)',
      subtitle: 'Agilidad en urbanizaciones, sótanos y espacios reducidos con visibilidad 360°',
      machines: [
        {
          name: 'JCB 155 Monobrazo PowerBoom',
          brand: 'JCB / TMD',
          isTMD: true,
          tag: 'ELECCIÓN TMD • PUERTA LATERAL SEGURA',
          image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'En Almacén Km 22 (Entrega 24h)',
          specs: {
            weight: '2,883 kg (6,356 lbs)',
            power: '56 HP Kohler KDI Turbo Diesel',
            digDepth: 'Altura de volteo: 2.85 m (9 ft 4 in)',
            bucketCap: '0.40 m³ balde uso rudo',
            hydraulic: '70 L/min · Auxiliar para martillo y barredora',
            fuelBurn: '4.8 - 5.5 L/h (Máxima eficiencia)',
            cooling: 'Cabina cerrada con A/C tropical de alta potencia',
            filtration: 'Prefiltro de alta retención para demolición',
            salitre: 'Recubrimiento electrostático',
            telematics: 'LiveLink integrado con alerta de volcamiento',
            slaService: '< 2h en todo Santo Domingo y Santiago',
            dailyRate: '$290 USD / RD$17,400',
            dgiiStatus: 'Crédito Fiscal B01 + Seguro Incluido',
            annualSaving: 'Ahorro de $3,400 USD/año en neumáticos y diésel'
          }
        },
        {
          name: 'Bobcat S570 / S590',
          brand: 'Bobcat (Doosan)',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Bajo Pedido',
          specs: {
            weight: '2,935 kg',
            power: '61 HP Doosan D24',
            digDepth: 'Altura de descarga: 2.90 m',
            bucketCap: '0.41 m³',
            hydraulic: '64 L/min estándar',
            fuelBurn: '6.2 - 7.0 L/h',
            cooling: 'Estándar',
            filtration: 'Cartucho estándar',
            salitre: 'Pintura blanca estándar (desgaste UV rápido)',
            telematics: 'Machine IQ (opcional con cargo)',
            slaService: '24-48h según taller',
            dailyRate: '$340 USD / RD$20,400',
            dgiiStatus: 'Facturación regular',
            annualSaving: 'Línea base comparativa'
          }
        },
        {
          name: 'Caterpillar 226D3',
          brand: 'Caterpillar',
          isTMD: false,
          tag: 'OEM COMPETIDOR',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
          stockStatus: 'Disponible bajo reserva',
          specs: {
            weight: '2,650 kg',
            power: '65 HP Cat C2.2',
            digDepth: 'Altura de descarga: 2.81 m',
            bucketCap: '0.36 m³',
            hydraulic: '69 L/min',
            fuelBurn: '6.5 - 7.4 L/h',
            cooling: 'Estándar',
            filtration: 'Estándar',
            salitre: 'Estándar',
            telematics: 'Product Link',
            slaService: 'Llamada central',
            dailyRate: '$360 USD / RD$21,600',
            dgiiStatus: 'Facturación regular',
            annualSaving: '-$2,100 USD en repuestos cautivos'
          }
        }
      ]
    }
  };

  // ─── 2. SPEC LABELS & ICONS DEFINITION ───
  const SPEC_DEFINITIONS = [
    { key: 'weight', label: 'Peso Operativo', icon: 'scale' },
    { key: 'power', label: 'Potencia de Motor', icon: 'bolt' },
    { key: 'digDepth', label: 'Profundidad / Alcance', icon: 'height' },
    { key: 'bucketCap', label: 'Capacidad de Balde / Trabajo', icon: 'inventory_2' },
    { key: 'hydraulic', label: 'Sistema Hidráulico (Bar/PSI)', icon: 'speed' },
    { key: 'fuelBurn', label: 'Consumo Promedio Diésel', icon: 'local_gas_station' },
    { key: 'cooling', label: 'Enfriamiento Tropical (45°C+)', icon: 'ac_unit' },
    { key: 'filtration', label: 'Filtración Ambiente Severo', icon: 'filter_alt' },
    { key: 'salitre', label: 'Protección Salitre & Costa', icon: 'water_drop' },
    { key: 'telematics', label: 'Telemetría & IoT Incluido', icon: 'cell_tower' },
    { key: 'slaService', label: 'SLA Auxilio Técnico en Faena', icon: 'timer' },
    { key: 'dailyRate', label: 'Tarifa Estimada de Alquiler', icon: 'payments' },
    { key: 'dgiiStatus', label: 'Escudo Fiscal & Comprobante DGII', icon: 'receipt_long' },
    { key: 'annualSaving', label: 'Ventaja Económica Neta Anual', icon: 'trending_up' }
  ];

  let currentPresetKey = 'backhoes';

  // ─── 3. RENDER MODAL / SECTION HTML ───
  function buildComparatorHTML() {
    const preset = COMPARISON_PRESETS[currentPresetKey];

    return `
      <div id="tmd-comparator-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-300" style="background: rgba(0, 0, 0, 0.92) !important; backdrop-filter: blur(24px) saturate(140%) !important; -webkit-backdrop-filter: blur(24px) saturate(140%) !important;">
        <div class="relative w-full max-w-[1240px] max-h-[92vh] overflow-y-auto rounded-[24px] text-neutral-200 flex flex-col" style="background: linear-gradient(165deg, rgba(14, 14, 16, 0.95) 0%, rgba(8, 8, 10, 0.92) 100%) !important; backdrop-filter: blur(28px) saturate(150%) !important; -webkit-backdrop-filter: blur(28px) saturate(150%) !important; border: 1px solid rgba(255, 184, 0, 0.28) !important; box-shadow: 0 25px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(245, 158, 11, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;">
          
          <!-- Header Bar -->
          <div class="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 rounded-t-[24px]" style="background: linear-gradient(180deg, rgba(18, 18, 20, 0.92) 0%, rgba(11, 11, 13, 0.90) 100%) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[14px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[24px]">compare_arrows</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[9999px] bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider">Estándar Diamante 20/10</span>
                  <h2 class="text-base sm:text-lg font-bold text-white tracking-wide">Comparador 3-Vías de Maquinaria Pesada</h2>
                </div>
                <p class="text-xs text-neutral-400 font-sans mt-0.5">JCB & LiuGong vs. Caterpillar, John Deere y Bobcat · Especificaciones Caribe 2026</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.tmdPrintComparison()" class="px-3.5 py-2 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 transition-all">
                <span class="material-symbols-outlined text-[16px]">print</span>
                <span class="hidden sm:inline">Imprimir / PDF</span>
              </button>
              <button onclick="window.tmdCloseModelComparator()" class="w-9 h-9 rounded-[12px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <!-- Category Selector Tabs -->
          <div class="px-6 py-3 border-b flex items-center gap-2 overflow-x-auto" style="background: rgba(14, 19, 31, 0.82) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;">
            <span class="text-xs font-mono uppercase text-neutral-400 mr-2 flex-shrink-0">Categoría:</span>
            ${Object.keys(COMPARISON_PRESETS).map(key => {
              const p = COMPARISON_PRESETS[key];
              const isActive = key === currentPresetKey;
              return `
                <button onclick="window.tmdSwitchComparatorCategory('${key}')" class="px-3.5 py-1.5 rounded-[12px] text-xs font-semibold whitespace-nowrap transition-all ${isActive ? 'bg-amber-500 text-black shadow-[0_4px_16px_rgba(245,158,11,0.3)] font-bold' : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800'}">
                  ${p.category}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Main Comparison Content Grid -->
          <div class="p-6 space-y-6">
            
            <!-- Category Subtitle Banner -->
            <div class="p-4 rounded-[16px] bg-amber-500/5 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-amber-500 text-[22px]">verified</span>
                <div>
                  <h3 class="text-sm font-bold text-amber-400">${preset.category}</h3>
                  <p class="text-xs text-neutral-300 font-sans">${preset.subtitle}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span class="text-[11px] font-mono text-emerald-400 font-semibold">TMD: Stock en Km 22 Verificado</span>
              </div>
            </div>

            <!-- 3-Column Machine Card Headers -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${preset.machines.map(m => `
                <div class="relative rounded-[20px] p-5 flex flex-col justify-between transition-all" style="${m.isTMD ? 'background: linear-gradient(165deg, rgba(32, 28, 16, 0.86) 0%, rgba(20, 18, 14, 0.80) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 2px solid rgba(245, 158, 11, 0.85) !important; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.08) !important;' : 'background: linear-gradient(145deg, rgba(18, 24, 36, 0.82) 0%, rgba(12, 16, 24, 0.78) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45) !important;'}">
                  ${m.isTMD ? `
                    <div class="absolute -top-3 left-4 px-3 py-0.5 rounded-[9999px] bg-gradient-to-r from-amber-500 to-amber-600 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-md">
                      ★ RECOMENDACIÓN TMD CARIBE
                    </div>
                  ` : ''}

                  <div>
                    <div class="h-36 rounded-[14px] overflow-hidden bg-neutral-900 relative mb-4 border border-neutral-800">
                      <img src="${m.image}" alt="${m.name}" class="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-500">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <span class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-[8px] ${m.isTMD ? 'bg-amber-500 text-black font-black' : 'bg-neutral-800 text-neutral-300'} text-[11px] font-mono">
                        ${m.brand}
                      </span>
                    </div>

                    <h4 class="text-base font-bold ${m.isTMD ? 'text-amber-400' : 'text-white'} leading-tight">${m.name}</h4>
                    
                    <div class="mt-2.5 flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full ${m.isTMD ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500/80'}"></span>
                      <span class="text-[11px] font-mono ${m.isTMD ? 'text-emerald-400 font-bold' : 'text-neutral-400'}">${m.stockStatus}</span>
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <div class="text-[10px] font-mono text-neutral-500 uppercase">Tarifa Diario Est.</div>
                      <div class="text-sm font-bold ${m.isTMD ? 'text-amber-400' : 'text-neutral-200'} font-mono">${m.specs.dailyRate}</div>
                    </div>
                    ${m.isTMD ? `
                      <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, quiero cotizar y agendar inspección para la ' + m.name + ' disponible en Km 22.')}" target="_blank" class="px-3 py-1.5 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-sans flex items-center gap-1.5 shadow-[0_4px_14px_rgba(245,158,11,0.3)] transition-all">
                        <span>Cotizar 0 Km</span>
                        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    ` : `
                      <span class="text-[11px] font-mono text-neutral-500">Distribuidor Int.</span>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Spec Matrix Rows -->
            <div class="rounded-[20px] overflow-hidden shadow-inner" style="background: linear-gradient(165deg, rgba(14, 19, 30, 0.84) 0%, rgba(10, 14, 22, 0.80) 100%) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important;">
              <div class="p-3.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
                <span class="text-xs font-mono uppercase text-neutral-400 font-bold tracking-wider">Matriz Técnica Detallada (14 Vectores de Ingeniería)</span>
                <span class="text-[11px] font-mono text-amber-500">Cifras operativas verificadas en el campo</span>
              </div>

              <div class="divide-y divide-neutral-800/60">
                ${SPEC_DEFINITIONS.map(spec => `
                  <div class="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="material-symbols-outlined text-amber-500 text-[18px]">${spec.icon}</span>
                      <span class="text-xs font-bold text-neutral-300 uppercase tracking-wide font-mono">${spec.label}</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                      ${preset.machines.map(m => `
                        <div class="p-2.5 rounded-[12px] ${m.isTMD ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-neutral-900/50 border border-neutral-800/60'}">
                          <div class="text-[10px] font-mono text-neutral-400 md:hidden mb-0.5">${m.name}:</div>
                          <div class="text-xs font-sans ${m.isTMD ? 'text-amber-200 font-semibold' : 'text-neutral-300'}">
                            ${m.specs[spec.key] || 'N/D'}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Final Conversion CTA Banner -->
            <div class="p-6 rounded-[22px] bg-gradient-to-r from-amber-500/20 via-[#141416] to-emerald-500/20 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
              <div class="max-w-xl">
                <div class="flex items-center gap-2 mb-1">
                  <span class="material-symbols-outlined text-amber-400">shield</span>
                  <h4 class="text-base font-bold text-white">¿Por qué el 84% de las constructoras en RD eligen TMD?</h4>
                </div>
                <p class="text-xs text-neutral-300 leading-relaxed font-sans">
                  Disponibilidad física inmediata en Km 22 sin meses de espera marítima, repuestos genuinos OEM en bodega propia, auxilio técnico en menos de 2 horas en obra y comprobante fiscal formal con crédito fiscal DGII B01.
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <a href="https://wa.me/18098262222?text=${encodeURIComponent('Hola TMD Dominicana, he revisado la comparativa de ' + preset.category + ' y quiero una propuesta técnico-económica formal con NCF B01 Crédito Fiscal.')}" target="_blank" class="px-5 py-3 rounded-[14px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_6px_20px_rgba(245,158,11,0.35)] transition-all">
                  <span class="material-symbols-outlined text-[18px]">chat</span>
                  <span>Cotizar por WhatsApp</span>
                </a>
                <button onclick="window.tmdCloseModelComparator(); if(typeof window.tmdShowQuoteModal==='function') window.tmdShowQuoteModal('${preset.machines[0].name}');" class="px-5 py-3 rounded-[14px] bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 border border-neutral-700 transition-all">
                  <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>Cotización Formal DGII</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // ─── 4. GLOBAL PUBLIC API HANDLERS ───
  window.tmdOpenModelComparator = function(presetKey) {
    if (presetKey && COMPARISON_PRESETS[presetKey]) {
      currentPresetKey = presetKey;
    }
    
    // Remove existing if any
    var existing = document.getElementById('tmd-comparator-modal');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = buildComparatorHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.style.overflow = 'hidden';
  };

  window.tmdCloseModelComparator = function() {
    var modal = document.getElementById('tmd-comparator-modal');
    if (modal) {
      modal.classList.add('opacity-0');
      setTimeout(function() {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.tmdSwitchComparatorCategory = function(catKey) {
    if (COMPARISON_PRESETS[catKey]) {
      currentPresetKey = catKey;
      var modal = document.getElementById('tmd-comparator-modal');
      if (modal) {
        var scrollPos = modal.firstElementChild ? modal.firstElementChild.scrollTop : 0;
        modal.outerHTML = buildComparatorHTML();
        var newModal = document.getElementById('tmd-comparator-modal');
        if (newModal && newModal.firstElementChild) {
          newModal.firstElementChild.scrollTop = scrollPos;
        }
      }
    }
  };

  window.tmdPrintComparison = function() {
    // Generate clean printable window
    var preset = COMPARISON_PRESETS[currentPresetKey];
    var printWindow = window.open('', '_blank', 'width=950,height=800');
    if (!printWindow) {
      if (typeof window.tmdShowToast === 'function') {
        window.tmdShowToast('Por favor permita ventanas emergentes para generar el reporte impreso.', 'error');
      }
      return;
    }

    var html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TMD Dominicana — Cuadro Comparativo: ${preset.category}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 25px; color: #111; line-height: 1.4; font-size: 12px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 18px; }
          .title { font-size: 18px; font-weight: bold; margin: 0; color: #111; }
          .subtitle { font-size: 12px; color: #666; margin: 3px 0 0 0; }
          .tmd-badge { background: #f59e0b; color: #000; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ddd; padding: 8px 10px; text-align: left; }
          th { background-color: #f8f9fa; font-weight: 700; font-size: 11px; text-transform: uppercase; }
          .highlight { background-color: #fffbeb; font-weight: 600; color: #b45309; }
          .footer { margin-top: 25px; font-size: 10px; color: #666; border-top: 1px solid #eee; padding-top: 10px; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">TECNOMAQUINARIAS DIESEL S.R.L. (TMD DOMINICANA)</div>
            <div class="subtitle">Cuadro Comparativo Técnico: ${preset.category} · RNC 1-30-88492-1</div>
          </div>
          <div style="text-align: right;">
            <span class="tmd-badge">Estándar Diamante 20/10</span>
            <div style="font-size: 10px; color: #666; margin-top: 4px;">Autopista Duarte Km 22 · (809) 826-2222</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 25%;">Vector de Ingeniería</th>
              ${preset.machines.map(m => `<th style="width: 25%; ${m.isTMD ? 'background:#fef3c7; color:#92400e;' : ''}">${m.name} ${m.isTMD ? '(TMD)' : ''}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Disponibilidad</strong></td>
              ${preset.machines.map(m => `<td class="${m.isTMD ? 'highlight' : ''}">${m.stockStatus}</td>`).join('')}
            </tr>
            ${SPEC_DEFINITIONS.map(s => `
              <tr>
                <td><strong>${s.label}</strong></td>
                ${preset.machines.map(m => `<td class="${m.isTMD ? 'highlight' : ''}">${m.specs[s.key] || 'N/D'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <strong>Aviso de Confidencialidad & Cumplimiento DGII:</strong> Documento técnico emitido por Tecnomaquinarias Diesel S.R.L. Tarifas sujetas a cotización formal con comprobante fiscal (NCF B01/B15). Autopista Duarte Km 22, La Guáyiga, Pedro Brand, Santo Domingo Oeste. www.tmddominicana.com · info@tmd.com.do.
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

  // Keyboard shortcut listener for Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.tmdCloseModelComparator();
    }
  });

})();
