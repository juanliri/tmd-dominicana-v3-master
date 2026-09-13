/**
 * TMD TITAN LUXURY ANIMATION & ATMOSPHERIC ENGINE 2026
 * 3-Mode Adaptive Particle System, Smooth Parallax, Reveal Physics & Number Counters
 * Modes:
 *   - 'dust': Atmospheric micro-dust (0.6px, zero distraction, behind content cards)
 *   - 'bokeh': Cinematic frosted glass bokeh (soft diffused light blooms on Hero)
 *   - 'vignette': Peripheral reading mask (center 65% completely cleared for vehicle specs)
 */

(function () {
  'use strict';

  // Respect user reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('[TMD Animation] Reduced motion active, skipping complex animations.');
    return;
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* 1. PARALLAX SCROLL ENGINE (Vertical Scroll only)                   */
  /* ══════════════════════════════════════════════════════════════════ */
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let ticking = false;

  function updateParallax() {
    const currentY = window.scrollY;
    scrollVelocity = Math.abs(currentY - lastScrollY);
    lastScrollY = currentY;
    document.documentElement.style.setProperty('--scroll-y', `${currentY}px`);
    ticking = false;
    evaluateAmbienceContext();
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  /* ══════════════════════════════════════════════════════════════════ */
  /* 2. UNIVERSAL SCROLL-TRIGGERED REVEAL (IntersectionObserver)        */
  /* ══════════════════════════════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (entry.target.hasAttribute('data-tmd-counter')) {
          animateCounter(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.08
  });

  function setupReveals() {
    const selector = [
      'section > div > h2',
      'section > div > h3',
      '.tmd-exec-card',
      '.tmd-tree-node-card',
      '#socios',
      'article'
    ].join(',');

    const elements = document.querySelectorAll(selector);
    const vh = window.innerHeight;

    elements.forEach((el) => {
      if (el.classList.contains('tmd-reveal') || el.closest('#todobuild-exec-portal-modal')) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < vh - 20 && rect.bottom > 0) {
        el.classList.add('tmd-reveal', 'revealed');
      } else {
        el.classList.add('tmd-reveal');
        revealObserver.observe(el);
      }
    });

    setupCounters();
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* 3. ANIMATED NUMBERS COUNTER ENGINE                                 */
  /* ══════════════════════════════════════════════════════════════════ */
  function animateCounter(el) {
    const rawVal = el.getAttribute('data-tmd-counter-val');
    if (!rawVal) return;

    const match = rawVal.match(/^([^0-9]*)([0-9.,]+)(.*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const cleanNumStr = match[2].replace(/,/g, '');
    const isFloat = cleanNumStr.includes('.');
    const targetVal = parseFloat(cleanNumStr);
    const suffix = match[3] || '';

    if (isNaN(targetVal)) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    function updateNumber(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetVal * ease;

      let displayNum = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString('en-US');
      el.textContent = `${prefix}${displayNum}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        el.textContent = `${prefix}${isFloat ? targetVal.toFixed(1) : targetVal.toLocaleString('en-US')}${suffix}`;
      }
    }

    requestAnimationFrame(updateNumber);
  }

  function setupCounters() {
    const statElements = document.querySelectorAll('[class*="text-2xl"], [class*="text-3xl"], [class*="text-4xl"], [class*="text-amber-400"]');
    statElements.forEach((el) => {
      if (el.hasAttribute('data-tmd-counter') || el.children.length > 0) return;
      const text = el.textContent.trim();
      const statPattern = /^(\+?\$?)([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]+)?|\d+)(?:\s*(HP|kg|MPa|BAR|%|\+|Años|km))?$/i;
      if (statPattern.test(text)) {
        el.setAttribute('data-tmd-counter', 'true');
        el.setAttribute('data-tmd-counter-val', text);
        animateCounter(el);
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* 4. 3-MODE ADAPTIVE PARTICLE ENGINE (Atmospheric Depth System)      */
  /* ══════════════════════════════════════════════════════════════════ */
  let canvas, ctx, particles = [], animationFrameId;
  let isCanvasActive = true;
  let currentMode = 'dust'; // 'dust' | 'bokeh' | 'vignette'
  let auroraPhase = 0;

  function initAmbientCanvas() {
    if (document.getElementById('tmd-ambient-canvas')) {
      canvas = document.getElementById('tmd-ambient-canvas');
      ctx = canvas.getContext('2d');
      return;
    }

    canvas = document.createElement('canvas');
    canvas.id = 'tmd-ambient-canvas';
    canvas.className = 'mode-dust';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.display = 'block';
    canvas.style.opacity = '0.95';
    document.body.prepend(canvas); // Prepend to body so content sits in front

    // Guard: re-prepend canvas if React removes it from body
    const bodyObserver = new MutationObserver(() => {
      if (!document.getElementById('tmd-ambient-canvas')) {
        document.body.prepend(canvas);
        console.log('[TMD Engine] Canvas re-attached after DOM update');
      }
    });
    bodyObserver.observe(document.body, { childList: true });
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Mouse tracking for fluid interactive particle responsiveness
    const mouse = { x: -9999, y: -9999, active: false };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }, { passive: true });

    particles = [];
    // 90-100 particles across depth layers — clearly luminous & floating
    const count = Math.min(Math.floor(window.innerWidth / 14), 100);
    for (let i = 0; i < count; i++) {
      const isBokeh = i % 4 === 0; // 25% are soft bokeh blooms
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: isBokeh ? (Math.random() * 2.0 + 4.5) : (Math.random() * 1.0 + 1.8),
        targetR: isBokeh ? (Math.random() * 2.0 + 4.5) : (Math.random() * 1.0 + 1.8),
        dx: (Math.random() - 0.5) * 0.55,
        dy: -(Math.random() * 0.65 + 0.35),   // natural upward drift
        alpha: Math.random() * 0.25 + 0.70,   // High luminosity base
        targetAlpha: Math.random() * 0.25 + 0.70,
        isBokeh: isBokeh,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseVal: Math.random() * Math.PI,
        speedMultiplier: 1.0
      });
    }

    setAmbienceMode(getRecommendedMode());

    function renderParticles() {
      if (!isCanvasActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const particleRgb = isDark ? '245, 158, 11' : '217, 119, 6';

      // Dynamic scroll velocity inertia: surges upward when scrolling, settles smoothly into constellation
      scrollVelocity *= 0.93;
      const velocityDrift = Math.min(scrollVelocity * 0.06, 3.8);

      // In Bokeh mode (Hero section), draw atmospheric dual amber auroras
      if (currentMode === 'bokeh') {
        auroraPhase += 0.008;
        const pulse = 0.5 + 0.5 * Math.sin(auroraPhase);
        const pulse2 = 0.5 + 0.5 * Math.sin(auroraPhase * 1.3 + 1.2);

        // Left top bloom — warm amber
        const gradLeft = ctx.createRadialGradient(
          canvas.width * 0.12, canvas.height * 0.18, 5,
          canvas.width * 0.12, canvas.height * 0.18, canvas.width * 0.45
        );
        gradLeft.addColorStop(0, `rgba(245, 158, 11, ${0.30 + pulse * 0.15})`);
        gradLeft.addColorStop(0.5, `rgba(245, 158, 11, ${0.07 + pulse * 0.04})`);
        gradLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradLeft;
        ctx.fillRect(0, 0, canvas.width * 0.6, canvas.height * 0.7);

        // Right top bloom — deep amber/gold
        const gradRight = ctx.createRadialGradient(
          canvas.width * 0.88, canvas.height * 0.22, 5,
          canvas.width * 0.88, canvas.height * 0.22, canvas.width * 0.42
        );
        gradRight.addColorStop(0, `rgba(217, 119, 6, ${0.26 + pulse2 * 0.14})`);
        gradRight.addColorStop(0.5, `rgba(245, 158, 11, ${0.06 + pulse2 * 0.03})`);
        gradRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradRight;
        ctx.fillRect(canvas.width * 0.4, 0, canvas.width * 0.6, canvas.height * 0.7);

        // Center bottom warm accent glow
        const gradBottom = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.9, 10,
          canvas.width * 0.5, canvas.height * 0.9, canvas.width * 0.35
        );
        gradBottom.addColorStop(0, `rgba(180, 83, 9, ${0.10 + pulse * 0.06})`);
        gradBottom.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradBottom;
        ctx.fillRect(canvas.width * 0.15, canvas.height * 0.5, canvas.width * 0.7, canvas.height * 0.5);
      }

      // ── CONSTELLATION NET (todobuild.store signature dynamic mesh) ──
      const MAXD = currentMode === 'bokeh' ? 170 : 145;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAXD) {
            const lineAlpha = (1 - dist / MAXD) * (currentMode === 'bokeh' ? 0.38 : 0.48);
            ctx.strokeStyle = `rgba(${particleRgb}, ${lineAlpha})`;
            ctx.lineWidth = currentMode === 'bokeh' ? 0.9 : 1.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render individual particles with organic sway and mouse interaction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const spd = p.speedMultiplier || 1.0;

        // Organic horizontal swaying + upward drift + scroll velocity
        p.x += (p.dx + Math.sin(p.pulseVal * 0.75) * 0.45) * spd;
        p.y += (p.dy * spd) - velocityDrift;
        p.pulseVal += p.pulseSpeed;

        // Interactive cursor repulsion & proximity connection
        if (mouse.active) {
          const dxM = p.x - mouse.x;
          const dyM = p.y - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 160 && distM > 0) {
            const force = (1 - distM / 160) * 3.2;
            p.x += (dxM / distM) * force;
            p.y += (dyM / distM) * force;

            // Fluid luminous cursor connector line
            if (distM < 130) {
              const cursorLineAlpha = (1 - distM / 130) * 0.50;
              ctx.strokeStyle = `rgba(${particleRgb}, ${cursorLineAlpha})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        // Smooth fluid morphing of radius and alpha toward target mode
        p.r += (p.targetR - p.r) * 0.08;
        p.alpha += (p.targetAlpha - p.alpha) * 0.08;

        // Screen wrap
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height + 20) p.y = -20;

        const currentAlpha = p.alpha * (0.80 + 0.30 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRgb}, ${currentAlpha})`;

        if (p.isBokeh && currentMode === 'bokeh') {
          // Large glowing atmospheric halo
          ctx.shadowColor = `rgba(${particleRgb}, 1.0)`;
          ctx.shadowBlur = 28;
        } else if (p.isBokeh) {
          ctx.shadowColor = `rgba(${particleRgb}, 0.95)`;
          ctx.shadowBlur = 18;
        } else {
          // Crisp luminous golden ember
          ctx.shadowColor = `rgba(${particleRgb}, 0.90)`;
          ctx.shadowBlur = 10;
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(renderParticles);
    }

    renderParticles();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isCanvasActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isCanvasActive = true;
        renderParticles();
      }
    });
  }

  function setAmbienceMode(mode) {
    if (!canvas) return;
    if (currentMode === mode && canvas.classList.contains(`mode-${mode}`)) return;

    currentMode = mode;
    canvas.className = `mode-${mode}`;

    // Recalibrate target particle parameters based on active mode
    particles.forEach((p) => {
      if (mode === 'bokeh') {
        // Mode 1: Cinematic Bokeh Orbs (Hero Section) — large, soft, floating orbs
        if (p.isBokeh) {
          p.targetR    = Math.random() * 2.5 + 4.6;   // 4.6px–7.1px large glowing orbs
          p.targetAlpha = Math.random() * 0.18 + 0.82; // 0.82–1.00 luminous halo
        } else {
          p.targetR    = Math.random() * 1.2 + 2.0;   // 2.0px–3.2px
          p.targetAlpha = Math.random() * 0.20 + 0.65; // 0.65–0.85
        }
        p.speedMultiplier = 0.85; // gentle, majestic floating drift
      } else if (mode === 'dust') {
        // Mode 2: Micro-Dust Golden Embers (Content / Machinery / Services) — crisp, active motes
        if (p.isBokeh) {
          p.targetR    = Math.random() * 1.0 + 2.2;   // condenses down to 2.2px–3.2px
          p.targetAlpha = Math.random() * 0.22 + 0.68;
        } else {
          p.targetR    = Math.random() * 0.8 + 1.2;   // crisp 1.2px–2.0px spark motes
          p.targetAlpha = Math.random() * 0.22 + 0.60;
        }
        p.speedMultiplier = 1.30; // energetic, lively sparks in the wind
      } else if (mode === 'vignette') {
        // Mode 3: Vignette Clearing (Technical Specs / Directory)
        // Peripheral focus: center reading zone remains clear
        const distFromCenterX = Math.abs(p.x - (canvas.width || 1200) / 2) / ((canvas.width || 1200) / 2);
        const distFromCenterY = Math.abs(p.y - (canvas.height || 800) / 2) / ((canvas.height || 800) / 2);
        const edgeFactor = Math.min(1, Math.max(distFromCenterX, distFromCenterY));

        p.targetR    = (Math.random() * 0.9 + 1.2) * (0.5 + 0.7 * edgeFactor);
        p.targetAlpha = (Math.random() * 0.25 + 0.50) * (0.35 + 0.8 * edgeFactor);
        p.speedMultiplier = 1.10;
      }
    });
  }

  function getRecommendedMode() {
    const hash = (window.location.hash || '').toLowerCase();
    const scrollY = window.scrollY;

    // 1. Vehicle Detail Page: Technical specs, warranty tabs, calculator
    // Requires Mode 3 (Peripheral Vignette) to keep the reading center 100% clean
    if (hash.includes('/vehicle/')) {
      return 'vignette';
    }

    // 2. Home Page: matches '', '#', '#/', '#home', '#/home', '#/home/'
    const isHome = hash === '' || hash === '#' || hash === '#/' || hash.startsWith('#home') || hash.startsWith('#/home');
    if (isHome) {
      // Top Drone Hero zone (< 620px): Cinematic Bokeh Orbs & Auroras
      if (scrollY < 620) {
        return 'bokeh';
      }
      // Lower content sections (Machinery, Repuestos, Servicios, Red, Socios): Active Micro-Dust Embers
      return 'dust';
    }

    // 3. About Page / Empresa: Bokeh on hero, vignette on directory/staff
    if (hash.includes('empresa') || hash.includes('about') || hash.includes('nosotros')) {
      if (scrollY < 520) {
        return 'bokeh';
      }
      return 'vignette'; // Keeps staff portraits and directory clear
    }

    // 4. Default for Catalog, Spare Parts, Services: Mode 1 (Micro-Dust behind cards)
    if (scrollY < 480) {
      return 'bokeh';
    }
    return 'dust';
  }

  function evaluateAmbienceContext() {
    const target = getRecommendedMode();
    if (target !== currentMode) {
      setAmbienceMode(target);
    }
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* 5. MAGNETIC DRAG PURGE                                             */
  /* ══════════════════════════════════════════════════════════════════ */
  function cleanupMagneticTransforms() {
    const boundElems = document.querySelectorAll('[data-magnetic-bound]');
    boundElems.forEach((el) => {
      el.removeAttribute('data-magnetic-bound');
      el.style.transform = '';
    });
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /* 6. SUITE INITIALIZATION & SPA OBSERVER                             */
  /* ══════════════════════════════════════════════════════════════════ */
  let debounceTimer;
  function debouncedRunSuite() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      cleanupMagneticTransforms();
      setupReveals();
      evaluateAmbienceContext();
    }, 60);
  }

  function initSuite() {
    initAmbientCanvas();
    cleanupMagneticTransforms();
    setupReveals();
    evaluateAmbienceContext();

    // Observe SPA DOM updates from React router/state
    const rootEl = document.getElementById('root');
    if (rootEl) {
      const observer = new MutationObserver(debouncedRunSuite);
      observer.observe(rootEl, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSuite);
  } else {
    initSuite();
  }

  window.addEventListener('hashchange', () => {
    setTimeout(debouncedRunSuite, 80);
  });

  window.addEventListener('popstate', () => {
    setTimeout(debouncedRunSuite, 80);
  });

  console.log('[TMD Titan Engine] 3-Mode Adaptive Atmospheric & Surface Suite active.');

  /* ══════════════════════════════════════════════════════════════════ */
  /* 6. TODOBUILD SPOTLIGHT CARD & 3D TILT ENGINE                       */
  /* ══════════════════════════════════════════════════════════════════ */
  function initSpotlightCards() {
    const cardSelectors = [
      '.spotlight-card',
      '.tmd-spotlight-card',
      '.diamond-card',
      '.tmd-diamond-card',
      '.tmd-glass-card',
      'article',
      '[class*="rounded-2xl"]:not(button):not(header):not(nav):not(input):not(#root):not([class*="aspect-"]):not([class*="bg-white"]):not([class*="h-[360px]"]):not([class*="min-h-"]):not(.product-stage-white)',
      '[class*="rounded-3xl"]:not(header):not(nav):not(#root):not([class*="aspect-"]):not([class*="bg-white"])'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(','));
    cards.forEach(card => {
      if (card.dataset.spotlightBound) return;
      card.dataset.spotlightBound = 'true';
      card.classList.add('tmd-spotlight-card');

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);

        // Subtle 3D perspective tilt (max 3 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // Bind spotlights immediately and on DOM changes
  document.addEventListener('DOMContentLoaded', initSpotlightCards);
  setTimeout(initSpotlightCards, 500);
  setTimeout(initSpotlightCards, 1500);
  const spotObserver = new MutationObserver(() => {
    initSpotlightCards();
  });
  spotObserver.observe(document.body, { childList: true, subtree: true });

})();
