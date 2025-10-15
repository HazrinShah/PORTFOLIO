const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const links = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = new Date().getFullYear();

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

function setActiveByPage() {
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const file = href.split('/').pop();
    if (!href.startsWith('#') && file === current) {
      link.classList.add('active');
    } else if (!href.startsWith('#')) {
      link.classList.remove('active');
    }
  });
}

function onScrollActiveLink() {
  const fromTop = window.scrollY + 100;
  links.forEach(link => {
    const id = link.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const section = document.querySelector(id);
    if (!section) return;
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// Determine whether to use page-based or scroll-based highlighting
setActiveByPage();
const hasHashLinks = Array.from(links).some(l => (l.getAttribute('href') || '').startsWith('#'));
if (hasHashLinks) {
  document.addEventListener('scroll', onScrollActiveLink, { passive: true });
}

links.forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));

// Reveal-on-scroll animations
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
} else {
  // Fallback: show immediately
  reveals.forEach(el => el.classList.add('in-view'));
}
