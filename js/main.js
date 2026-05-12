/* ─── 1. NAV STICKY ─── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();


/* ─── 2. SCROLL REVEAL ─── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ─── 3. COUNTDOWN TIMER ─── */
(function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  // Salva o tempo de expiração no sessionStorage para persistir ao recarregar
  const STORAGE_KEY = 'atlas_countdown_expiry';
  const DURATION_SECONDS = 23 * 3600 + 47 * 60 + 12;

  let expiry = parseInt(sessionStorage.getItem(STORAGE_KEY), 10);
  if (!expiry || expiry <= Date.now()) {
    expiry = Date.now() + DURATION_SECONDS * 1000;
    sessionStorage.setItem(STORAGE_KEY, expiry);
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));

    const h = pad(Math.floor(remaining / 3600));
    const m = pad(Math.floor((remaining % 3600) / 60));
    const s = pad(remaining % 60);

    el.textContent = `${h}:${m}:${s}`;

    if (remaining <= 0) {
      clearInterval(timer);
      el.textContent = '00:00:00';
    }
  }

  tick();
  const timer = setInterval(tick, 1000);
})();


/* ─── 4. FAQ ACCORDION ─── */
(function initFaq() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('open');

      // Fecha todos
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));

      // Abre o clicado (se estava fechao)
      if (!isOpen) item.classList.add('open');
    });
  });
})();
