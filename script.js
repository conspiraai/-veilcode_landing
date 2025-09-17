/* =========================================================
   VeilCore — Stimothy Pumps ($stimothy)
   Small, dependency-free helpers
   ========================================================= */

const TICKER_VALUE = '$stimothy';
const LIVE_TARGET   = document.querySelector('[data-live-target]');
const LIVE_BADGE    = document.getElementById('live-badge');
const TOAST         = document.getElementById('toast');

// Smooth-ish scroll and iOS body behavior is left to CSS; keep JS tiny

/* ---------- Clipboard: copy $stimothy ---------- */
const copyButtons = Array.from(document.querySelectorAll('[data-copy]'));
function showToast(message) {
  if (!TOAST) return;
  clearTimeout(showToast.hideTimeoutId);
  TOAST.textContent = message;
  TOAST.hidden = false;
  requestAnimationFrame(() => TOAST.classList.add('is-visible'));
  showToast.hideTimeoutId = setTimeout(() => {
    TOAST.classList.remove('is-visible');
    TOAST.hidden = true;
  }, 1400);
}
copyButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(TICKER_VALUE);
      showToast('Copied $stimothy');
    } catch {
      showToast('Copy not available');
    }
  });
});

/* ---------- Live embed: lazy swap to iframe ---------- */
let LIVE_EMBED_URL = null;

export function setLive(url){
  LIVE_EMBED_URL = url;
  if (LIVE_BADGE) LIVE_BADGE.hidden = false;
  // If the section is already visible, mount immediately:
  if (LIVE_TARGET && isInViewport(LIVE_TARGET)) mountLive();
}

function isInViewport(el){
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

function mountLive(){
  if (!LIVE_TARGET || !LIVE_EMBED_URL) return;
  if (LIVE_TARGET.dataset.mounted) return;

  const iframe = document.createElement('iframe');
  iframe.src = LIVE_EMBED_URL;
  iframe.loading = 'lazy';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture';
  iframe.referrerPolicy = 'no-referrer';
  iframe.style.width = '100%';
  iframe.style.height = '56.25vw';         // 16:9 responsive
  iframe.style.maxHeight = '62vh';
  iframe.style.minHeight = '320px';
  iframe.style.border = '0';
  iframe.setAttribute('title','Live $stimothy stream');

  LIVE_TARGET.innerHTML = '';
  LIVE_TARGET.appendChild(iframe);
  LIVE_TARGET.dataset.mounted = 'true';
}

const obs = 'IntersectionObserver' in window ? new IntersectionObserver((entries)=>{
  for (const e of entries){
    if (e.isIntersecting) mountLive();
  }
}, { rootMargin: '120px 0px' }) : null;

if (obs && LIVE_TARGET) obs.observe(LIVE_TARGET);

// Fallback: timer check
setTimeout(() => { if (!LIVE_TARGET?.dataset.mounted) mountLive(); }, 4000);

// Expose setLive globally for inline usage in index.html if desired.
window.setLive = setLive;

/* ---------- OPTIONAL: set your embed here and forget ---------- */
// Example: window.setLive('https://player.example.com/embed/your-stream-id');
