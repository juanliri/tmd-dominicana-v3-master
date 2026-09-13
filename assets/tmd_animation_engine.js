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
    canvas.style.zIndex = '1';
    canvas.style.display = 'block';
    canvas.style.opacity = '0.95';
    document.body.prepend(canvas); // Prepend to guarantee it sits under content

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

    particles = [];
    // 62 particles across depth layers — enough to be clearly visible
    const count = Math.min(Math.floor(window.innerWidth / 20), 62);
    for (let i = 0; i < count; i++) {
      const isBokeh = i % 4 === 0; // 25% are soft bokeh blooms
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 0.8 + 0.7,         // 0.7–1.5px dust base
        targetR: Math.random() * 0.8 + 0.7,
        dx: (Math.random() - 0.5) * 0.30,
        dy: -(Math.random() * 0.45 + 0.15),   // drift upward
        alpha: Math.random() * 0.30 + 0.45,   // VISIBLE: 0.45–0.75 base BOOSTED
        targetAlpha: Math.random() * 0.30 + 0.45,
        isBokeh: isBokeh,
        pulseSpeed: Math.random() * 0.025 + 0.012,
        pulseVal: Math.random() * Math.PI
      });
    }

    setAmbienceMode(getRecommendedMode());

    function renderParticles() {
      if (!isCanvasActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const particleRgb = isDark ? '245, 158, 11' : '217, 119, 6';

      // Smooth scroll velocity damping: accelerates slightly on scroll, calms when reading
      scrollVelocity *= 0.92;
      const velocityDrift = Math.min(scrollVelocity * 0.03, 1.4);

      // In Bokeh mode, draw STRONG dual aurora blooms — cinematic golden hour
      if (currentMode === 'bokeh') {
        auroraPhase += 0.006;
        const pulse = 0.5 + 0.5 * Math.sin(auroraPhase);
        const pulse2 = 0.5 + 0.5 * Math.sin(auroraPhase * 1.3 + 1.2);

        // Left top bloom — warm amber
        const gradLeft = ctx.createRadialGradient(
          canvas.width * 0.12, canvas.height * 0.18, 5,
          canvas.width * 0.12, canvas.height * 0.18, canvas.width * 0.45
        );
        gradLeft.addColorStop(0, `rgba(245, 158, 11, ${0.28 + pulse * 0.14})`);
        gradLeft.addColorStop(0.5, `rgba(245, 158, 11, ${0.06 + pulse * 0.04})`);
        gradLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradLeft;
        ctx.fillRect(0, 0, canvas.width * 0.6, canvas.height * 0.7);

        // Right top bloom — deep amber/gold
        const gradRight = ctx.createRadialGradient(
          canvas.width * 0.88, canvas.height * 0.22, 5,
          canvas.width * 0.88, canvas.height * 0.22, canvas.width * 0.42
        );
        gradRight.addColorStop(0, `rgba(217, 119, 6, ${0.24 + pulse2 * 0.12})`);
        gradRight.addColorStop(0.5, `rgba(245, 158, 11, ${0.05 + pulse2 * 0.03})`);
        gradRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradRight;
        ctx.fillRect(canvas.width * 0.4, 0, canvas.width * 0.6, canvas.height * 0.7);

        // Center bottom warm accent glow
        const gradBottom = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.9, 10,
          canvas.width * 0.5, canvas.height * 0.9, canvas.width * 0.35
        );
        gradBottom.addColorStop(0, `rgba(180, 83, 9, ${0.08 + pulse * 0.05})`);
        gradBottom.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradBottom;
        ctx.fillRect(canvas.width * 0.15, canvas.height * 0.5, canvas.width * 0.7, canvas.height * 0.5);
      }

      // ── CONSTELLATION NET (todobuild.store signature effect) ──
      const MAXD = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAXD) {
            const lineAlpha = (1 - dist / MAXD) * 0.18;
            ctx.strokeStyle = `rgba(${particleRgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render individual particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply velocity inertia
        p.x += p.dx;
        p.y += p.dy - velocityDrift;
        p.pulseVal += p.pulseSpeed;

        // Smooth cross-fade of radius and alpha toward mode targets
        p.r += (p.targetR - p.r) * 0.05;
        p.alpha += (p.targetAlpha - p.alpha) * 0.05;

        // Screen wrap
        if (p.x < -15) p.x = canvas.width + 15;
        if (p.x > canvas.width + 15) p.x = -15;
        if (p.y < -15) {
          p.y = canvas.height + 15;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height + 15) p.y = -15;

        const currentAlpha = p.alpha * (0.8 + 0.25 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, p.r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRgb}, ${currentAlpha})`;

        if (currentMode === 'bokeh' && p.isBokeh) {
          // Bokeh blooms: large glowing halos
          ctx.shadowColor = `rgba(${particleRgb}, 0.95)`;
          ctx.shadowBlur = 22;
        } else if (currentMode === 'bokeh') {
          // Regular bokeh particles: medium glow
          ctx.shadowColor = `rgba(${particleRgb}, 0.55)`;
          ctx.shadowBlur = 8;
        } else if (currentMode === 'dust') {
          // Micro-dust: subtle sparkle
          ctx.shadowColor = `rgba(${particleRgb}, 0.40)`;
          ctx.shadowBlur = 3;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
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
      if (mode === 'dust') {
        // Micro-dust: clearly visible golden motes behind cards
        p.targetR    = Math.random() * 0.7 + 0.7;  // 0.7px–1.4px
        p.targetAlpha = Math.random() * 0.30 + 0.45; // 0.45–0.75 BOOSTED
      } else if (mode === 'bokeh') {
        // Cinematic bokeh: large luminous glowing orbs
        if (p.isBokeh) {
          p.targetR    = Math.random() * 2.0 + 3.0;  // 3.0px–5.0px — clearly visible
          p.targetAlpha = Math.random() * 0.20 + 0.50; // 0.50–0.70 — BRIGHT
        } else {
          p.targetR    = Math.random() * 0.8 + 1.0;  // 1.0px–1.8px
          p.targetAlpha = Math.random() * 0.20 + 0.38; // 0.38–0.58
        }
      } else if (mode === 'vignette') {
        // Peripheral vignette: vivid but center cleared by CSS mask
        p.targetR    = Math.random() * 0.8 + 0.8;  // 0.8px–1.6px
        p.targetAlpha = Math.random() * 0.25 + 0.35; // 0.35–0.60 in gutters
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

    // 2. Home Page: Drone Hero uses Mode 2 (Bokeh), lower sections use Mode 1 (Micro-Dust)
    if (hash === '#/' || hash === '' || hash === '#home') {
      if (scrollY < 680) {
        return 'bokeh';
      }
      return 'dust';
    }

    // 3. About Page / Empresa
    if (hash.includes('empresa') || hash.includes('about')) {
      if (scrollY < 550) {
        return 'bokeh';
      }
      return 'vignette'; // Keeps staff portraits and directory clear
    }

    // 4. Default for Catalog, Spare Parts, Services: Mode 1 (Micro-Dust behind cards)
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
      '[class*="rounded-2xl"]:not(button):not(header):not(nav):not(input):not(#root)',
      '[class*="rounded-3xl"]:not(header):not(nav):not(#root)'
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
