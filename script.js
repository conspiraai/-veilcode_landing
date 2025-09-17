const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const initSmoothScroll = () => {
  const scrollTargets = document.querySelectorAll('a[href^="#"], [data-scroll]');

  scrollTargets.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const selector = trigger.dataset.scroll || trigger.getAttribute('href');
      if (!selector || selector === '#' || selector.length <= 1) return;

      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();

      const scrollOptions = {
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        block: 'start',
      };

      target.scrollIntoView(scrollOptions);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener(
        'blur',
        () => {
          if (target.getAttribute('tabindex') === '-1') {
            target.removeAttribute('tabindex');
          }
        },
        { once: true }
      );
    });
  });
};

const initMobileNav = () => {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeNav();
    }
  });
};

const initCopyTicker = () => {
  const TICKER_VALUE = '$stimothy';
  const copyButtons = document.querySelectorAll('[data-copy="$stimothy"]');
  const toast = document.querySelector('.toast');

  if (!copyButtons.length) return;

  const showToast = (message) => {
    if (!toast) return;

    toast.textContent = message;
    toast.hidden = false;

    window.clearTimeout(showToast.timeoutId);
    window.clearTimeout(showToast.hideTimeoutId);

    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    showToast.timeoutId = window.setTimeout(() => {
      toast.classList.remove('is-visible');
      showToast.hideTimeoutId = window.setTimeout(() => {
        toast.hidden = true;
      }, 220);
    }, 1400);
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!navigator.clipboard) {
        showToast('Copy not available');
        return;
      }

      try {
        await navigator.clipboard.writeText(TICKER_VALUE);
        showToast('Copied $stimothy');
      } catch (error) {
        console.error('Clipboard copy failed', error);
        showToast('Copy not available');
      }
    });
  });
};

let EMBED_URL = '';
let liveSectionPrimed = false;
let embedLoaded = false;

const initLive = () => {
  if (embedLoaded || !EMBED_URL) return;

  const placeholder = document.getElementById('live-embed') || document.querySelector('[data-live-target]');
  if (!placeholder) return;

  const iframe = document.createElement('iframe');
  iframe.src = EMBED_URL;
  iframe.title = 'Live stream';
  iframe.loading = 'lazy';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.setAttribute('allowfullscreen', '');
  iframe.className = placeholder.className;
  if (placeholder.id) {
    iframe.id = placeholder.id;
  }

  placeholder.replaceWith(iframe);
  embedLoaded = true;

  const liveNote = document.querySelector('.live__note');
  if (liveNote) {
    liveNote.textContent = 'Streaming live now.';
    liveNote.classList.add('is-live');
  }
};

const observeLiveSection = () => {
  const liveSection = document.getElementById('live');
  if (!liveSection) return;

  const primeAndInit = () => {
    liveSectionPrimed = true;
    initLive();
  };

  if (typeof IntersectionObserver === 'undefined') {
    primeAndInit();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, entryObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entryObserver.disconnect();
        primeAndInit();
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -15% 0px',
    }
  );

  observer.observe(liveSection);
};

const glitchTimers = new WeakMap();

const clearGlitchTimers = (element) => {
  const timers = glitchTimers.get(element);
  if (!timers) return;

  if (timers.delay) {
    window.clearTimeout(timers.delay);
  }
  if (timers.cleanup) {
    window.clearTimeout(timers.cleanup);
  }

  glitchTimers.delete(element);
};

const scheduleGlitchBurst = (element) => {
  if (prefersReducedMotion.matches) return;

  const delay = 8000 + Math.random() * 6000;
  const delayTimeout = window.setTimeout(() => {
    element.classList.add('animate');

    const cleanupTimeout = window.setTimeout(() => {
      element.classList.remove('animate');
      clearGlitchTimers(element);
      scheduleGlitchBurst(element);
    }, 260);

    glitchTimers.set(element, { delay: null, cleanup: cleanupTimeout });
  }, delay);

  glitchTimers.set(element, { delay: delayTimeout, cleanup: null });
};

const initGlitchBursts = () => {
  if (prefersReducedMotion.matches) return;

  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach((element) => {
    clearGlitchTimers(element);
    scheduleGlitchBurst(element);
  });
};

const stopGlitchBursts = () => {
  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach((element) => {
    clearGlitchTimers(element);
    element.classList.remove('animate');
  });
};

const setYear = () => {
  const yearSlot = document.getElementById('current-year');
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }
};

const setLive = (url) => {
  EMBED_URL = typeof url === 'string' ? url : '';
  const badge = document.getElementById('live-badge');
  if (badge) {
    badge.removeAttribute('hidden');
  }

  if (liveSectionPrimed) {
    initLive();
  }
};

const handleMotionPreferenceChange = (event) => {
  if (event.matches) {
    stopGlitchBursts();
  } else {
    initGlitchBursts();
    if (liveSectionPrimed) {
      initLive();
    }
  }
};

if (typeof prefersReducedMotion.addEventListener === 'function') {
  prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange);
} else if (typeof prefersReducedMotion.addListener === 'function') {
  prefersReducedMotion.addListener(handleMotionPreferenceChange);
}

window.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCopyTicker();
  initMobileNav();
  observeLiveSection();
  initGlitchBursts();
  setYear();
});

window.setLive = setLive;
