/* Rishita Bhardwaj portfolio prototype — shared behaviour */

/* ------------------------------------------------------------------
   CASE-STUDY LINKS
   The "View the full project" links in the design have no addresses
   yet. Paste each real URL below; anything left empty shows a small
   "link not added yet" message instead of a dead page.
------------------------------------------------------------------- */
const LINKS = {
  'happy-faces': 'happy-faces.html',
  'supermarket': 'https://irradiated-seed-873.notion.site/Supermarket-cec99af273444200b868d9545e770b72',
  'woodo': 'https://irradiated-seed-873.notion.site/Woodo-e920b672acaf42df9f00e0c33dd5eb14',
  'aiconnect': 'https://www.figma.com/proto/6WfS0Acg0twfzfSfXHMC0m/Untitled?page-id=0%3A1&node-id=8-3146&viewport=87%2C356%2C0.06&t=bmbL6V8cenkeYenw-1&scaling=scale-down-width&content-scaling=fixed',
  'place': 'place.html',
  'umaid': 'https://www.figma.com/proto/UsCCAfqKOwkFsixeWUYzrC/Jodhpr-hotel-website-design?page-id=0%3A1&node-id=1-259&viewport=320%2C313%2C0.05&t=f29FFrxVt6nAubVN-1&scaling=scale-down-width&content-scaling=fixed'
};

(function () {
  'use strict';

  /* ---------- torn / jagged edges ---------- */
  function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function tornPath(seed) {
    const r = rng(seed), W = 1440, H = 40, step = 15;
    let d = 'M0 ' + H + ' L0 ' + (10 + r() * 24);
    for (let x = step; x <= W; x += step) d += ' L' + x + ' ' + (4 + r() * 32).toFixed(1);
    return d + ' L' + W + ' ' + H + ' Z';
  }
  document.querySelectorAll('.torn').forEach((el, i) => {
    const fill = el.dataset.fill || '#0c0c0c';
    el.innerHTML = '<svg viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d="' +
      tornPath(7 + i * 13) + '" fill="' + fill + '"/></svg>';
  });

  /* ---------- mobile menu ---------- */
  const mb = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (mb && nav) {
    mb.addEventListener('click', () => {
      const o = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', o);
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) nav.classList.remove('open'); });
  }

  /* ---------- toast ---------- */
  let toast;
  function say(msg) {
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------- case-study links ---------- */
  document.querySelectorAll('[data-case]').forEach(a => {
    const url = LINKS[a.dataset.case];
    if (url) { a.href = url; if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; } }
    else a.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); say('Case-study link not added yet.'); });
  });

  /* ---------- project colour change on click ---------- */
  const projs = document.querySelectorAll('.proj');
  projs.forEach(p => p.addEventListener('click', e => {
    if (e.target.closest('a,button')) return;
    const was = p.classList.contains('is-tint');
    projs.forEach(x => x.classList.remove('is-tint'));
    if (!was) p.classList.add('is-tint');
  }));

  /* ---------- filter chips that jump to a section ---------- */
  document.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.jump);
    if (t) t.scrollIntoView({ behavior: 'smooth' });
    b.parentElement.querySelectorAll('[data-jump]').forEach(x => x.classList.toggle('on', x === b));
  }));

  /* ---------- KMCT events app mini-prototype ---------- */
  const phone = document.querySelector('.phone');
  if (phone) {
    const chips = phone.querySelectorAll('.chips button'), evs = phone.querySelectorAll('.ev');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.classList.toggle('on', x === c));
      const f = c.dataset.f;
      evs.forEach(ev => ev.classList.toggle('hide', f !== 'all' && ev.dataset.d !== f && ev.dataset.d !== 'all'));
    }));
    phone.querySelectorAll('.ev button').forEach(b => b.addEventListener('click', () => {
      const j = b.classList.toggle('joined');
      b.textContent = j ? 'Joined ✓' : 'Join';
    }));
  }

  /* ---------- lightbox ---------- */
  const zoomables = document.querySelectorAll('[data-zoom]');
  if (zoomables.length) {
    const lb = document.createElement('div');
    lb.className = 'lb'; lb.innerHTML = '<button aria-label="Close">✕</button><img alt="">';
    document.body.appendChild(lb);
    const img = lb.querySelector('img');
    zoomables.forEach(z => z.addEventListener('click', () => { img.src = z.currentSrc || z.src; img.alt = z.alt; lb.classList.add('open'); }));
    lb.addEventListener('click', () => lb.classList.remove('open'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }
})();
