/* =============================================
   ROHITH.DEV — MAIN JAVASCRIPT
   ============================================= */

// ── CANVAS PARTICLE NETWORK ──────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  function init() {
    particles = [];
    const count = Math.min(80, Math.floor((W * H) / 15000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawLine(p1, p2, alpha) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(0,240,255,${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,240,255,${p.alpha})`;
      ctx.fill();
    });

    const DIST = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          drawLine(particles[i], particles[j], (1 - d / DIST) * 0.12);
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  window.addEventListener('resize', () => {
    resize();
    init();
  });
})();


// ── TYPED HEADLINE ───────────────────────────
(function initTyped() {
  const el     = document.getElementById('typed');
  const texts  = [
    'AI & Full Stack Developer',
    'Building Intelligent Apps',
    'Frontend Craftsman',
    'Problem Solver',
  ];
  let ti = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 80, SPEED_DEL = 40, PAUSE = 1800;

  function tick() {
    const full = texts[ti];
    if (!deleting) {
      ci++;
      el.textContent = full.slice(0, ci);
      if (ci === full.length) { deleting = true; setTimeout(tick, PAUSE); return; }
    } else {
      ci--;
      el.textContent = full.slice(0, ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 1000);
})();


// ── NAVBAR SCROLL + MOBILE ───────────────────
(function initNav() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const links = nav.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  ham.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();


// ── COUNTER ANIMATION ────────────────────────
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.target;
      const dur    = 1200;
      const start  = performance.now();
      function step(now) {
        const p   = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(p * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
})();


// ── SKILL BARS ───────────────────────────────
(function initSkills() {
  const cards = document.querySelectorAll('.skill-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const card = e.target;
      const bar  = card.querySelector('.skill-progress');
      if (bar) {
        const w = bar.dataset.w;
        bar.style.setProperty('--w', w);
        bar.style.width = w + '%';
      }
      const delay = card.dataset.delay || 0;
      card.style.animationDelay = delay + 'ms';
      card.classList.add('visible');
      obs.unobserve(card);
    });
  }, { threshold: 0.2 });
  cards.forEach(c => obs.observe(c));
})();


// ── SCROLL REVEAL ────────────────────────────
(function initReveal() {
  const targets = document.querySelectorAll(
    '.section-header, .about-text, .about-card, .timeline-item, ' +
    '.cert-card, .project-card, .profile-card, .contact-item, .terminal-box, ' +
    '.github-stat-img'
  );

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(el);
  });
})();


// ── ACTIVE NAV LINK ──────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--cyan)' : '';
    });
  });
})();


// ── CURSOR GLOW (desktop only) ────────────────
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:8px; height:8px; border-radius:50%;
    background:rgba(0,240,255,0.8);
    box-shadow:0 0 20px rgba(0,240,255,0.6);
    transform:translate(-50%,-50%);
    transition:transform .05s ease;
  `;
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.style.cssText = `
    position:fixed; pointer-events:none; z-index:9998;
    width:32px; height:32px; border-radius:50%;
    border:1px solid rgba(0,240,255,0.3);
    transform:translate(-50%,-50%);
    transition:left .12s ease, top .12s ease;
  `;
  document.body.appendChild(ring);

  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(2)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
})();


// ── TERMINAL TYPEWRITER ───────────────────────
(function initTerminal() {
  const lines = document.querySelectorAll('.t-out');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity 0.4s ease';
      line.style.opacity = '1';
    }, 1800 + i * 300);
  });
})();
