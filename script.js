/* ============================
   VeilCore — Stimothy Pumps ($stimothy)
   Client-side interactions
   - Smooth scroll (reduced-motion aware)
   - Copy-to-clipboard + toast
   - Random micro-glitch pulses
   - Lazy live embed with setLive(url)
   ============================ */

/* -------- Smooth scroll (respect reduced motion) -------- */
(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  });
})();

/* -------- Toast helper -------- */
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('on');
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => t.classList.remove('on'), 1400);
}

/* -------- Copy $stimothy button(s) -------- */
(function () {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy="$stimothy"]');
    if (!btn) return;
    try {
      await navigator.clipboard.writeText('$stimothy');
      showToast('Copied: $stimothy');
    } catch {
      // Fallback: create temp input
      const tmp = document.createElement('input');
      tmp.value = '$stimothy';
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); showToast('Copied: $stimothy'); }
      catch { showToast('Copy failed'); }
      tmp.remove();
    }
  });
})();

/* -------- Random micro-glitch pulses (reduced-motion aware) -------- */
(function () {
  const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rm) return;
  const GLITCH_CLASS = 'animate';
  function pulseOnce() {
    const els = document.querySelectorAll('.glitch');
    if (!els.length) return;
    const el = els[Math.floor(Math.random() * els.length)];
    el.classList.add(GLITCH_CLASS);
    setTimeout(() => el.classList.remove(GLITCH_CLASS), 900);
  }
  function loop() {
    const delay = 8000 + Math.random() * 4000; // 8–12s
    setTimeout(() => { pulseOnce(); loop(); }, delay);
  }
  // Start after initial paint
  window.addEventListener('load', () => setTimeout(loop, 1200));
})();

/* -------- Live embed (lazy) -------- */
let EMBED_URL = ''; // set via setLive(url)
function mountLiveIframe() {
  if (!EMBED_URL) return;
  const box = document.getElementById('live-embed');
  if (!box) return;
  // Avoid remounting
  if (box.dataset.mounted === '1') return;

  box.innerHTML = `<iframe
    src="${EMBED_URL}"
    loading="lazy"
    allow="autoplay; fullscreen; picture-in-picture"
    referrerpolicy="no-referrer"
    frameborder="0"
    style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px;box-shadow:0 0 0 1px #ffffff22 inset;"
  ></iframe>`;

  box.dataset.mounted = '1';
  const badge = document.getElementById('live-badge');
  if (badge) badge.removeAttribute('hidden');
}

(function () {
  const target = document.getElementById('live-embed');
  if (!target) return;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          mountLiveIframe();
          io.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    io.observe(target);
  } else {
    // Fallback: mount after a short delay
    setTimeout(mountLiveIframe, 1200);
  }
})();

/* -------- Public API to set the live URL -------- */
function setLive(url) {
  if (typeof url !== 'string' || !url.trim()) return;
  EMBED_URL = url.trim();
  // If the live section is already in view or observer has fired, mount now
  mountLiveIframe();
  const badge = document.getElementById('live-badge');
  if (badge) badge.removeAttribute('hidden');
}
// Expose to window so you can call setLive('https://…') inline if needed
window.setLive = setLive;

/* -------- (Optional) Auto-init example -------- */
// Example: uncomment and replace with your real embed URL when ready
// setLive('https://your-embed.example');
