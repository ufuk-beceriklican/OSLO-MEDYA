import Lenis from 'lenis';

/**
 * Yumuşak kaydırma. Hareket azaltma tercihinde hiç kurulmaz (yerel kaydırma kalır);
 * dokunmatik cihazlarda Lenis zaten yerel kaydırmayı bozmaz.
 */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lenis = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true, anchors: true });
  window.__lenis = lenis;

  // Yeni sayfa her zaman en üstten başlar
  document.addEventListener('astro:after-swap', () => lenis.scrollTo(0, { immediate: true, force: true }));
}
