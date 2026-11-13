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
  menuToggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  menuToggle.setAttribute('aria-label', navLinks.classList.contains('open') ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  });
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !navLinks?.classList.contains('open')) return;
  navLinks.classList.remove('open');
  body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  menuToggle?.focus();
});

// Keep the shared navigation useful on every page and show the active location.
const navAnchors = [...(navLinks?.querySelectorAll('a') || [])];
function setCurrentNav(id) {
  navAnchors.forEach(link => {
    const homePaths = ['/', '/index.html'];
    const samePage = link.pathname === window.location.pathname || (homePaths.includes(link.pathname) && homePaths.includes(window.location.pathname));
    const active = link.hash === `#${id}` && samePage;
    if (active) link.setAttribute('aria-current', 'location');
    else if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
    link.classList.toggle('active', active);
  });
}
const path = window.location.pathname;
if (path.endsWith('/project.html')) {
  const projectsLink = navAnchors.find(link => link.href.endsWith('/project.html'));
  projectsLink?.setAttribute('aria-current', 'page');
  projectsLink?.classList.add('active');
} else if (path.endsWith('/contact.html')) {
  const contactLink = navAnchors.find(link => link.href.endsWith('/contact.html'));
  contactLink?.setAttribute('aria-current', 'page');
  contactLink?.classList.add('active');
} else {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrentNav(visible.target.id);
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5] });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}


// ----- TYPEWRITER -----

const roles = [
  'Cloud & DevOps Engineer.',
  'Azure DevOps Engineer.',
  'CI/CD Pipeline Developer.',
  'Infrastructure as Code Developer.',
  'Linux System Administrator.',
];

const typeEl = document.getElementById('typing-text');

if (typeEl) {
  const reduceTypingMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceTypingMotion) typeEl.textContent = roles[0];
  else {
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting  = true;

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

  typeEl.textContent = roles[0];
  setTimeout(type, 2400);
  }
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


// Keep the copyright year current while retaining a usable HTML fallback.
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


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

const linkedProject = window.location.hash && document.getElementById(window.location.hash.slice(1));
if (linkedProject?.classList.contains('project-card-expandable')) {
  const toggle = linkedProject.querySelector('.project-toggle-btn');
  if (toggle?.getAttribute('aria-expanded') !== 'true') toggle?.click();
  window.setTimeout(() => linkedProject.scrollIntoView({ behavior: motionReduced ? 'auto' : 'smooth', block: 'start' }), 0);
}


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


// ----- CERTIFICATE POPUP -----

const certificateModal = document.getElementById('certificateModal');
const certificateModalImage = certificateModal?.querySelector('.certificate-modal-image');
const certificateModalClose = certificateModal?.querySelector('.certificate-modal-close');
const certificateModalZoom = certificateModal?.querySelector('.certificate-modal-zoom');
let certificateTrigger = null;

function setCertificateZoom(zoomed) {
  certificateModal?.classList.toggle('is-zoomed', zoomed);
  certificateModalZoom?.setAttribute('aria-pressed', String(zoomed));
  if (certificateModalZoom) certificateModalZoom.textContent = zoomed ? 'Fit to screen' : 'Zoom in';
  if (certificateModal) certificateModal.scrollTop = 0;
  if (certificateModal) certificateModal.scrollLeft = 0;
}

function closeCertificateModal() {
  if (!certificateModal) return;
  certificateModal.classList.remove('show');
  certificateModal.setAttribute('aria-hidden', 'true');
  setCertificateZoom(false);
  document.body.classList.remove('certificate-modal-open');
  if (certificateModalImage) certificateModalImage.removeAttribute('src');
  certificateTrigger?.focus();
}

document.querySelectorAll('.certificate-popup-trigger').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    if (!certificateModal || !certificateModalImage) return;
    certificateTrigger = link;
    setCertificateZoom(false);
    certificateModalImage.src = link.dataset.preview || link.href;
    certificateModalImage.alt = link.querySelector('img')?.alt || 'Certificate preview';
    certificateModal.classList.add('show');
    certificateModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('certificate-modal-open');
    certificateModalClose?.focus();
  });
});

certificateModalClose?.addEventListener('click', closeCertificateModal);
certificateModalZoom?.addEventListener('click', () => {
  setCertificateZoom(!certificateModal?.classList.contains('is-zoomed'));
});
certificateModal?.addEventListener('click', event => {
  if (event.target === certificateModal) closeCertificateModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && certificateModal?.classList.contains('show')) closeCertificateModal();
  if (event.key !== 'Tab' || !certificateModal?.classList.contains('show')) return;
  const controls = [...certificateModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!controls.length) return;
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Defer the award video download until its explicit play action.
const awardVideo = document.querySelector('.award-video-frame video');
const awardVideoSource = awardVideo?.querySelector('source[data-src]');
const awardVideoPlay = document.querySelector('.award-video-play');
awardVideoPlay?.addEventListener('click', async () => {
  if (!awardVideo || !awardVideoSource) return;
  awardVideo.controls = true;
  if (!awardVideoSource.src) {
    awardVideoSource.src = awardVideoSource.dataset.src;
    awardVideo.load();
  }
  try {
    await awardVideo.play();
    awardVideoPlay.hidden = true;
  } catch {
    awardVideoPlay.hidden = false;
  }
});
awardVideo?.addEventListener('pause', () => { if (!awardVideo.ended && awardVideo.currentTime > 0 && awardVideoPlay) awardVideoPlay.hidden = false; });
awardVideo?.addEventListener('ended', () => { if (awardVideoPlay) awardVideoPlay.hidden = false; });


// ----- PARTICLES.JS -----

const particlesRoot = document.getElementById('particles-js');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

function initParticles() {
  if (typeof particlesJS === 'undefined' || !particlesRoot || prefersReducedMotion) return;

  particlesJS('particles-js', {
    particles: {
      number:      { value: isSmallScreen ? 18 : 30, density: { enable: true, value_area: 1100 } },
      color:       { value: '#7c9485' },
      opacity:     { value: isSmallScreen ? 0.3 : 0.42, random: true },
      size:        { value: isSmallScreen ? 1.4 : 1.8, random: true },
      line_linked: { enable: !isSmallScreen, distance: 155, color: '#7c9485', opacity: 0.16, width: 1 },
      move:        { enable: true, speed: isSmallScreen ? 0.3 : 0.42 },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: !isSmallScreen, mode: 'grab' } },
      modes:  { grab: { distance: 145, line_linked: { opacity: 0.24 } } },
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


// ----- CAROUSEL SCROLL NAVIGATION -----

document.querySelectorAll('.project-visual-frame').forEach(frame => {
  const images = frame.querySelectorAll('.project-img');
  if (images.length > 1) {
    // Create wrapper to contain the frame and buttons (so buttons don't scroll)
    const wrapper = document.createElement('div');
    wrapper.className = 'project-visual-wrapper';
    frame.parentNode.insertBefore(wrapper, frame);
    wrapper.appendChild(frame);

    // Create buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-arrow prev';
    prevBtn.type = 'button';
    prevBtn.innerHTML = '❮';
    prevBtn.setAttribute('aria-label', 'Previous image');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-arrow next';
    nextBtn.type = 'button';
    nextBtn.innerHTML = '❯';
    nextBtn.setAttribute('aria-label', 'Next image');

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);

    // Arrow visibility management
    const updateArrows = () => {
      const scrollLeft = frame.scrollLeft;
      const maxScroll = frame.scrollWidth - frame.clientWidth;
      
      // Hide left arrow at the beginning
      if (scrollLeft <= 5) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }
      
      // Hide right arrow at the end (only if layout is fully rendered with maxScroll > 0)
      if (maxScroll > 5 && scrollLeft >= maxScroll - 5) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    };

    // Scroll event listeners
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering full image zoom modal
      frame.scrollBy({ left: -frame.clientWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering full image zoom modal
      frame.scrollBy({ left: frame.clientWidth, behavior: 'smooth' });
    });

    frame.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    // Recalculate arrow visibility once each image loads
    images.forEach(img => {
      img.addEventListener('load', updateArrows);
    });

    // Run initial checks
    updateArrows();
    setTimeout(updateArrows, 100);
    setTimeout(updateArrows, 500);
  }
});
