/* =============================================================
   RealKingHubs — script.js
============================================================= */


// ----- MOBILE MENU -----

const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ----- TYPEWRITER -----

const roles = [
  'Cloud Engineering Student.',
  'AWS Infrastructure Builder.',
  'CI/CD Pipeline Engineer.',
  'Infrastructure as Code Dev.',
  'AltSchool Africa Scholar.',
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

document.querySelectorAll('.arch-img').forEach(img => {
  img.addEventListener('click', () => {
    if (!modal || !modalImg) return;
    modalImg.src = img.src;
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

if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number:      { value: 55, density: { enable: true, value_area: 900 } },
      color:       { value: '#38bdf8' },
      opacity:     { value: 0.35 },
      size:        { value: 2, random: true },
      line_linked: { enable: true, distance: 140, color: '#38bdf8', opacity: 0.15, width: 1 },
      move:        { enable: true, speed: 0.8 },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' } },
      modes:  { grab: { distance: 160, line_linked: { opacity: 0.35 } } },
    },
    retina_detect: true,
  });
}


// ----- FOOTER YEAR -----

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
