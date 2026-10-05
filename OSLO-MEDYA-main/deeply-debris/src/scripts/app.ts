import 'lenis/dist/lenis.css';
import { initSmoothScroll } from './smooth-scroll';
import { initNav } from './nav';
import { initMotion } from './motion';
import { initContactForm } from './contact-form';

// Modül tek sefer çalışır (ClientRouter ile sayfalar arası kalıcıdır); yumuşak kaydırma bir kez kurulur.
initSmoothScroll();

// Yeni sayfa DOM'a girince ve ilk yüklemede: sayfaya özel bağlamalar yenilenir.
document.addEventListener('astro:page-load', () => {
  initNav();
  initMotion();
  initContactForm();
});

// Sayfa geçişinde hero'yu ilk boyamadan önce açılışa hazırlar (yanıp sönmeyi önler).
document.addEventListener('astro:after-swap', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && document.querySelector('[data-hero]')) document.documentElement.classList.add('has-intro');
});
