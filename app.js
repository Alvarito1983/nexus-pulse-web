/* ═══════════════════════════════════════════════════════════════════════════
   NEXUS Pulse Landing — app.js
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Hamburger menu ──────────────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

/* ── Scroll reveal (IntersectionObserver) ───────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Copy terminal commands ──────────────────────────────────────────────── */
const copyAllBtn = document.getElementById('copyAllBtn');

if (copyAllBtn) {
  const COMMANDS =
    'curl -O https://raw.githubusercontent.com/Alvarito1983/nexus-pulse/main/docker-compose.yml\n' +
    'cp .env.example .env\n' +
    'docker compose up -d';

  copyAllBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(COMMANDS).then(() => {
      const prev = copyAllBtn.innerHTML;
      copyAllBtn.innerHTML =
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      copyAllBtn.style.color       = 'var(--blue)';
      copyAllBtn.style.borderColor = 'rgba(59,130,246,0.3)';
      setTimeout(() => {
        copyAllBtn.innerHTML       = prev;
        copyAllBtn.style.color     = '';
        copyAllBtn.style.borderColor = '';
      }, 2200);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = COMMANDS;
      ta.style.cssText = 'position:fixed;opacity:0;top:-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  });
}

/* ── Nav scroll shadow ───────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.style.borderBottomColor = window.scrollY > 10
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(255,255,255,0.06)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
