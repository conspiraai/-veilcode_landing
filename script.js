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
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.querySelector('.toast');

  if (!navigator.clipboard || !toast) return;

  const showToast = (message) => {
    toast.textContent = message;
    toast.hidden = false;

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        showToast(`${value} copied!`);
      } catch (error) {
        console.error('Clipboard copy failed', error);
        showToast('Copy not available');
      }
    });
  });
};

const setYear = () => {
  const yearSlot = document.getElementById('current-year');
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCopyTicker();
  initMobileNav();
  setYear();
});
