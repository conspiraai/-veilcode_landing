const LIVE_URL = typeof LIVE_URL !== 'undefined' ? LIVE_URL : 'https://pump.fun/';
const CONTRACT_ADDR = typeof CONTRACT_ADDR !== 'undefined' ? CONTRACT_ADDR : 'TBA';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const toast = document.getElementById('toast');
let glitchTimer;

function showToast(message, timeout = 1400) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast._hideTimer);
  showToast._hideTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, timeout);
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast('Copied to clipboard');
  } catch (error) {
    console.error('Copy failed', error);
    showToast('Copy failed');
  }
}

document.addEventListener('click', (event) => {
  const copyTrigger = event.target.closest('[data-copy]');
  if (copyTrigger) {
    event.preventDefault();
    const value = copyTrigger.getAttribute('data-copy');
    if (value) {
      copyToClipboard(value);
    }
    return;
  }

  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href.length <= 1) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  if (typeof target.focus === 'function') {
    try {
      target.focus({ preventScroll: true });
    } catch (error) {
      target.focus();
    }
  }
});

function scheduleGlitch() {
  window.clearTimeout(glitchTimer);
  if (reduceMotion.matches) return;
  const elements = document.querySelectorAll('.glitch');
  if (!elements.length) return;
  const delay = 8000 + Math.random() * 6000;
  glitchTimer = window.setTimeout(() => {
    const random = elements[Math.floor(Math.random() * elements.length)];
    if (random) {
      random.classList.add('animate');
      window.setTimeout(() => random.classList.remove('animate'), 600);
    }
    scheduleGlitch();
  }, delay);
}

reduceMotion.addEventListener('change', () => {
  window.clearTimeout(glitchTimer);
  document.querySelectorAll('.glitch').forEach((el) => el.classList.remove('animate'));
  scheduleGlitch();
});

function setLive(url) {
  const embedUrl = typeof url === 'string' && url.trim() ? url.trim() : LIVE_URL;
  const container = document.getElementById('live');
  if (!container) return;
  if (container.querySelector('iframe')) return;
  container.innerHTML = `<iframe src="${embedUrl}" title="Pump.fun Live" loading="lazy" allowfullscreen frameborder="0"></iframe>`;
  const badge = document.getElementById('live-badge');
  if (badge) {
    badge.hidden = false;
  }
}

window.setLive = setLive;

document.addEventListener('DOMContentLoaded', () => {
  scheduleGlitch();
  setLive();
});
