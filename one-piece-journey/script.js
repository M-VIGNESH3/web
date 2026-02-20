/* ============================================
   ONE PIECE — THE GRAND JOURNEY
   Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- PARTICLES ----------
  createParticles();

  // ---------- INTERSECTION OBSERVER ----------
  initScrollAnimations();

  // ---------- PARALLAX ----------
  initHeroParallax();

  // ---------- BOUNTY CARD TILT ----------
  initCardTilt();

  // ---------- NAV SCROLL ----------
  initNavScroll();

  // ---------- SMOOTH SCROLL ----------
  initSmoothScroll();
});

// =============================================
// FLOATING PARTICLES
// =============================================
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = 60 + Math.random() * 40 + '%';
    p.style.width = p.style.height = (1.5 + Math.random() * 3) + 'px';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

// =============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// =============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// =============================================
// HERO MOUSE PARALLAX
// =============================================
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const layers = document.querySelectorAll('.hero-layer[data-speed]');

  if (!hero || layers.length === 0) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Normalize to -1 ... 1
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed);
      const moveX = x * speed * 60;
      const moveY = y * speed * 30;
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    layers.forEach(layer => {
      layer.style.transform = 'translate(0, 0)';
    });
  });
}

// =============================================
// BOUNTY CARD 3D TILT
// =============================================
function initCardTilt() {
  const cards = document.querySelectorAll('.bounty-card');

  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    if (!inner) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * -20;   // rotation around X axis
      const tiltY = (x - 0.5) * 20;    // rotation around Y axis

      inner.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// =============================================
// NAV SCROLL EFFECT
// =============================================
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
