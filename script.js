document.addEventListener('DOMContentLoaded', () => {
  const headerLinks = document.querySelectorAll('.site-nav a');
  const heroButtons = document.querySelectorAll('[data-scroll]');
  const copyButton = document.querySelector('.copy-btn');
  const toast = document.querySelector('.toast');
  const yearSpan = document.getElementById('current-year');

  yearSpan.textContent = new Date().getFullYear();

  const smoothScroll = (target) => {
    const el = document.querySelector(target);
    if (!el) return;
    const offsetTop = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  };

  headerLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        smoothScroll(href);
      }
    });
  });

  heroButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const target = btn.getAttribute('data-scroll');
      if (target) smoothScroll(target);
    });
  });

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const value = copyButton.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        showToast('Ticker copied!');
      } catch (error) {
        console.error('Clipboard copy failed', error);
        showToast('Copy failed');
      }
    });
  }

  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      toastTimeout = setTimeout(() => {
        toast.hidden = true;
      }, 400);
    }, 2000);
  }
});
