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

document.addEventListener('scroll', onScrollActiveLink, { passive: true });
links.forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));
