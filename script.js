let EMBED_URL = '';
const toastNode = document.getElementById('toast');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let glitchTimer = null;

function showToast(message) {
  if (!toastNode) return;
  toastNode.textContent = message;
  toastNode.hidden = false;
  requestAnimationFrame(() => {
    toastNode.classList.add('on');
  });
  setTimeout(() => {
    toastNode.classList.remove('on');
    setTimeout(() => {
      toastNode.hidden = true;
      toastNode.textContent = '';
    }, 200);
  }, 1400);
}

function handleCopyClick(event) {
  const trigger = event.currentTarget;
  const value = trigger?.getAttribute('data-copy');
  if (value !== '$stimothy') return;

  const copyText = '$stimothy';

  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(copyText).then(() => {
      showToast('Copied: $stimothy');
    }).catch(() => fallbackCopy(copyText));
  } else {
    fallbackCopy(copyText);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('Copied: $stimothy');
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textarea);
}

function enableSmoothScroll() {
  if (motionQuery.matches) {
    return;
  }
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function scheduleGlitchPulse() {
  clearTimeout(glitchTimer);
  if (motionQuery.matches) {
    return;
  }
  const glitchNodes = document.querySelectorAll('.glitch');
  if (!glitchNodes.length) {
    return;
  }
  const delay = 8000 + Math.random() * 6000;
  glitchTimer = window.setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * glitchNodes.length);
    const node = glitchNodes[randomIndex];
    if (node) {
      node.classList.add('animate');
      setTimeout(() => {
        node.classList.remove('animate');
      }, 400);
    }
    scheduleGlitchPulse();
  }, delay);
}

function mountLiveIframe() {
  if (!EMBED_URL) return;
  const box = document.getElementById('live-embed');
  if (!box || box.dataset.mounted === '1') return;
  box.innerHTML = '<iframe title="Live stream" src="' + EMBED_URL + '" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="no-referrer" frameborder="0" style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px;box-shadow:0 0 0 1px #ffffff22 inset;"></iframe>';
  box.dataset.mounted = '1';
}

function observeLiveEmbed() {
  const box = document.getElementById('live-embed');
  if (!box) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mountLiveIframe();
          observer.disconnect();
        }
      });
    });
    observer.observe(box);
  } else {
    window.setTimeout(mountLiveIframe, 2000);
  }
}

function initCopyButtons() {
  const triggers = document.querySelectorAll('[data-copy="$stimothy"]');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', handleCopyClick);
  });
}

function updateYear() {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

function init() {
  enableSmoothScroll();
  initCopyButtons();
  observeLiveEmbed();
  updateYear();
  scheduleGlitchPulse();
}

document.addEventListener('DOMContentLoaded', init);

function handleMotionChange() {
  if (motionQuery.matches) {
    clearTimeout(glitchTimer);
  } else {
    scheduleGlitchPulse();
  }
}

if (typeof motionQuery.addEventListener === 'function') {
  motionQuery.addEventListener('change', handleMotionChange);
} else if (typeof motionQuery.addListener === 'function') {
  motionQuery.addListener(handleMotionChange);
}

function setLive(url) {
  if (!url || typeof url !== 'string') return;
  EMBED_URL = url.trim();
  if (!EMBED_URL) return;
  mountLiveIframe();
  const badge = document.getElementById('live-badge');
  if (badge) {
    badge.hidden = false;
  }
}

window.setLive = setLive;
