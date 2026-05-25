/* ===========================
   PORTFOLIO v1 — script.js
   =========================== */

(() => {
  'use strict';

  /* ---- CUSTOM CURSOR ---- */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .stat-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });


  /* ---- THEME TOGGLE ---- */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const stored      = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', stored);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });


  /* ---- NAV SCROLL ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  /* ---- MOBILE MENU ---- */
  const burger     = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ---- INTERSECTION OBSERVER (Reveal) ---- */
  const revealEls = document.querySelectorAll('.reveal, .stat-card, .project-card, .skill-group, .form-group');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.05}s`;
    revealObs.observe(el);
  });


  /* ---- ANIMATED COUNTERS ---- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      let start = 0;
      const step = end / 60;
      const timer = setInterval(() => {
        start += step;
        el.textContent = Math.min(Math.floor(start), end);
        if (start >= end) { el.textContent = end; clearInterval(timer); }
      }, 20);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObs.observe(c));


  /* ---- SKILL BARS ---- */
  const bars = document.querySelectorAll('.bar-fill');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      bar.style.width = bar.dataset.w + '%';
      barObs.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => barObs.observe(b));


  /* ---- PROJECT FILTER ---- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.setProperty('--i', i);
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });
    });
  });


  /* ---- CONTACT FORM ---- */
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = '';

    // Simulate network delay (replace with real fetch/formspree/etc.)
    await new Promise(r => setTimeout(r, 1200));

    // Validation
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = '✗ Please fill in all required fields.';
      status.classList.add('error');
      btn.disabled = false;
      btn.textContent = 'Send Message ↗';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = '✗ Please enter a valid email address.';
      status.classList.add('error');
      btn.disabled = false;
      btn.textContent = 'Send Message ↗';
      return;
    }

    // Success (wire up a real backend/service here)
    form.reset();
    status.textContent = '✓ Message sent! I\'ll be in touch soon.';
    status.classList.add('success');
    btn.disabled = false;
    btn.textContent = 'Send Message ↗';
  });


  /* ---- HERO TITLE STAGGER ---- */
  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s`;
    requestAnimationFrame(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    });
  });


  /* ---- SMOOTH ACTIVE NAV LINK ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObs.observe(s));

})();
