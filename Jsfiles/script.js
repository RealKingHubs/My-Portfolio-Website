/* =============================================================
   RealKingHubs — script.js
============================================================= */


// ----- MOBILE MENU -----

const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
const body       = document.body;

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  body.classList.toggle('menu-open', navLinks.classList.contains('open'));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    body.classList.remove('menu-open');
  });
});


// ----- TYPEWRITER -----

const roles = [
  'Cloud Engineer.',
  'DevOps Engineer.',
  'AWS Infrastructure Builder.',
  'CI/CD Pipeline Engineer.',
  'Infrastructure as Code Dev.',
  'AltSchool Africa Scholar.',
  'System Administrator.',
  'Web Developer.',
];

const typeEl = document.getElementById('typing-text');

if (typeEl) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function type() {
    const word = roles[roleIndex];

    typeEl.textContent = deleting
      ? word.slice(0, charIndex - 1)
      : word.slice(0, charIndex + 1);

    deleting ? charIndex-- : charIndex++;

    let delay = deleting ? 40 : 100;

    if (!deleting && charIndex > word.length) {
      deleting = true;
      delay = 2000;
    } else if (deleting && charIndex === 0) {
      deleting   = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}


// ----- SCROLL REVEALS -----

function applyMotionSet(selector, className, stagger = 80) {
  document.querySelectorAll(selector).forEach((node, index) => {
    node.classList.add(className);
    node.style.setProperty('--motion-delay', `${index * stagger}ms`);
  });
}

applyMotionSet('main section, body > section, .contact-section-head', 'motion-section', 0);
applyMotionSet('.skill-card, .project-card, .arch-card', 'motion-card', 70);
applyMotionSet('.contact-panel', 'motion-panel', 90);
applyMotionSet('.social-links a', 'motion-list-item', 60);

const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!motionReduced) {
  const revealTargets = document.querySelectorAll('.motion-section, .motion-card, .motion-panel, .motion-list-item');

  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    });

    revealTargets.forEach(target => revealObserver.observe(target));

    // Prevent content from remaining invisible if the observer path is skipped.
    window.setTimeout(() => {
      revealTargets.forEach(target => target.classList.add('is-visible'));
    }, 1200);
  }
} else {
  document.querySelectorAll('.motion-section, .motion-card, .motion-panel, .motion-list-item').forEach(target => {
    target.classList.add('is-visible');
  });
}


// ----- SKILL BAR ANIMATION -----

const skillFills = document.querySelectorAll('.skill-fill');

if (skillFills.length) {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const width = entry.target.getAttribute('data-width');
      setTimeout(() => { entry.target.style.width = width + '%'; }, 150);
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  skillFills.forEach(fill => barObserver.observe(fill));
}


// ----- PROJECT FILTER -----

const filterBtns = document.querySelectorAll('.filter');
const cards      = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selected = btn.getAttribute('data-filter');

    cards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const show = selected === 'all' || tags.split(',').includes(selected);
      card.classList.toggle('hidden', !show);
    });
  });
});


// ----- PROJECT EXPAND / COLLAPSE -----

document.querySelectorAll('.project-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card-expandable');
    const details = card?.querySelector('.project-details');

    if (!card || !details) return;

    const open = details.classList.toggle('open');
    card.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.innerHTML = open
      ? 'Collapse Project <i class="fas fa-chevron-up"></i>'
      : 'Expand Project <i class="fas fa-chevron-down"></i>';
  });
});


// ----- ARCHITECTURE VIEW MORE -----

document.querySelectorAll('.view-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const more = btn.nextElementSibling;
    const open = more.classList.toggle('open');
    btn.textContent = open ? 'View Less' : 'View More';
  });
});


// ----- IMAGE MODAL -----

const modal    = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.zoomable-img').forEach(img => {
  img.addEventListener('click', () => {
    if (!modal || !modalImg) return;
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.classList.add('show');
  });
});

closeBtn?.addEventListener('click', () => modal.classList.remove('show'));

modal?.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal?.classList.remove('show');
});


// ----- PARTICLES.JS -----

const particlesRoot = document.getElementById('particles-js');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

function initParticles() {
  if (typeof particlesJS === 'undefined' || !particlesRoot || prefersReducedMotion) return;

  particlesJS('particles-js', {
    particles: {
      number:      { value: isSmallScreen ? 22 : 38, density: { enable: true, value_area: 900 } },
      color:       { value: '#2a7a56' },
      opacity:     { value: isSmallScreen ? 0.2 : 0.28 },
      size:        { value: isSmallScreen ? 1.6 : 2, random: true },
      line_linked: { enable: !isSmallScreen, distance: 140, color: '#2a7a56', opacity: 0.12, width: 1 },
      move:        { enable: true, speed: isSmallScreen ? 0.45 : 0.7 },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: !isSmallScreen, mode: 'grab' } },
      modes:  { grab: { distance: 160, line_linked: { opacity: 0.22 } } },
    },
    retina_detect: true,
  });
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initParticles, { timeout: 1200 });
} else {
  window.setTimeout(initParticles, 500);
}


// ----- FOOTER YEAR -----

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
