import { animate, inView, scroll, stagger } from 'motion';

type Cleanup = () => void;
const noop: Cleanup = () => {};

/** Exponential ease-out: tüm giriş hareketleri varsayılan olarak görünür durumdan başlar ve hızla oturur. */
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let cleanups: Cleanup[] = [];

/** Her sayfa yüklemesinde çağrılır; önceki sayfanın gözlemcilerini temizleyip yenilerini kurar. */
export function initMotion() {
  cleanups.forEach((cleanup) => cleanup());
  cleanups = [];

  if (reducedMotion()) {
    document.documentElement.classList.remove('has-intro');
    return;
  }

  cleanups = [reveal(), heroIntro(), heroScroll(), serviceFollower(), processLine(), readingProgress()];
}

/**
 * Kaydırmayla beliren öğeler. İlk ekranda zaten görünenlere dokunulmaz (yanıp sönme olmaz);
 * aşağıdakiler görünmeden hemen önce gizlenir. JS gelmezse hiçbir şey gizlenmez.
 */
function reveal(): Cleanup {
  const viewport = window.innerHeight;
  const stops: Cleanup[] = [];
  let queue: HTMLElement[] = [];
  let scheduled = false;

  const play = (el: HTMLElement, delay: number) => {
    const animation = animate(
      el,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
      { duration: 0.85, delay, ease: EASE_EXPO },
    );
    animation.finished.then(
      () => {
        el.style.opacity = '';
        el.style.transform = '';
      },
      () => {},
    );
  };

  // Aynı anda görünen öğeler sırayla açılır; toplam gecikme ~300 ms'yi geçmez.
  const flush = () => {
    scheduled = false;
    const batch = queue;
    queue = [];
    const step = Math.min(0.07, 0.3 / Math.max(batch.length, 1));
    batch.forEach((el, index) => play(el, index * step));
  };

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < viewport * 0.9) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    stops.push(
      inView(
        el,
        () => {
          queue.push(el);
          if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(flush);
          }
        },
        { amount: 0.2 },
      ),
    );
  });

  return () => stops.forEach((stop) => stop());
}

/** Tek orkestre an: güneş yarıları birleşir, başlık satırları yükselir, geri kalanı yumuşakça gelir. */
function heroIntro(): Cleanup {
  const root = document.documentElement;
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || !root.classList.contains('has-intro')) return noop;

  const animations: { finished: Promise<unknown>; stop: () => void }[] = [];

  hero.querySelectorAll<HTMLElement>('[data-half]').forEach((half, index) => {
    const dir = half.dataset.half === 'top' ? -1 : 1;
    animations.push(
      animate(
        half,
        { transform: [`translate3d(${6 * dir}%, ${10 * dir}%, 0)`, 'translate3d(0%, 0%, 0)'] },
        { duration: 1.2, delay: index * 0.08, ease: EASE_EXPO },
      ),
    );
  });

  animations.push(
    animate(
      hero.querySelectorAll('.hero__line > span'),
      { opacity: [0, 1], transform: ['translateY(105%)', 'translateY(0%)'] },
      { duration: 1, delay: stagger(0.09, { startDelay: 0.12 }), ease: EASE_EXPO },
    ),
  );

  animations.push(
    animate(
      hero.querySelectorAll('.hero__lead, .hero__actions'),
      { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] },
      { duration: 0.9, delay: stagger(0.08, { startDelay: 0.55 }), ease: EASE_EXPO },
    ),
  );

  Promise.all(animations.map((animation) => animation.finished)).then(() => {
    root.classList.remove('has-intro');
    hero.querySelectorAll<HTMLElement>('[data-hero-in], [data-half]').forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  });

  return () => animations.forEach((animation) => animation.stop());
}

/** Hero kaydırılırken güneşin iki yarısı birbirinden ayrılır, içerik hafifçe yukarı çekilip solar. */
function heroScroll(): Cleanup {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return noop;

  const stops: Cleanup[] = [];

  hero.querySelectorAll<HTMLElement>('[data-move]').forEach((el) => {
    const dir = el.dataset.move === 'top' ? -1 : 1;
    stops.push(
      scroll(
        animate(
          el,
          { transform: ['translate3d(0%, 0%, 0)', `translate3d(${3 * dir}%, ${16 * dir}%, 0)`] },
          { ease: 'linear' },
        ),
        { target: hero, offset: ['start start', 'end start'] },
      ),
    );
  });

  const content = hero.querySelector<HTMLElement>('[data-hero-content]');
  if (content) {
    stops.push(
      scroll(
        animate(content, { transform: ['translateY(0px)', 'translateY(-56px)'], opacity: [1, 0.15] }, { ease: 'linear' }),
        { target: hero, offset: ['start start', 'end start'] },
      ),
    );
  }

  return () => stops.forEach((stop) => stop());
}

/** Masaüstünde hizmet satırı üzerinde imleci izleyen, hafifçe eğilen nesne önizlemesi. */
function serviceFollower(): Cleanup {
  const list = document.querySelector<HTMLElement>('[data-service-list]');
  const preview = document.querySelector<HTMLElement>('[data-service-preview]');
  if (!list || !preview || !finePointer()) return noop;

  const images = new Map<string, HTMLElement>();
  preview.querySelectorAll<HTMLElement>('[data-preview]').forEach((img) => images.set(img.dataset.preview ?? '', img));

  const size = preview.offsetWidth || 272;
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let frame = 0;
  let shown = false;
  let active: HTMLElement | null = null;
  let fade: { finished: Promise<unknown>; stop: () => void } | null = null;

  const tick = () => {
    const dx = targetX - x;
    const dy = targetY - y;
    x += dx * 0.16;
    y += dy * 0.16;
    const tilt = Math.max(-8, Math.min(8, dx * 0.04));
    preview.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${tilt}deg)`;
    frame = requestAnimationFrame(tick);
  };

  const show = (slug: string) => {
    active?.removeAttribute('data-active');
    active = images.get(slug) ?? null;
    active?.setAttribute('data-active', '');
    if (shown) return;
    shown = true;
    x = targetX;
    y = targetY;
    fade?.stop();
    fade = animate(preview, { opacity: 1 }, { duration: 0.25 });
    frame = requestAnimationFrame(tick);
  };

  const hide = () => {
    if (!shown) return;
    shown = false;
    active?.removeAttribute('data-active');
    active = null;
    fade?.stop();
    fade = animate(preview, { opacity: 0 }, { duration: 0.2 });
    fade.finished.then(
      () => {
        if (!shown) cancelAnimationFrame(frame);
      },
      () => {},
    );
  };

  const onMove = (event: PointerEvent) => {
    targetX = Math.min(event.clientX + size * 0.42, window.innerWidth - size / 2 - 16);
    targetY = event.clientY;
    const link = (event.target as Element).closest<HTMLElement>('[data-service]');
    if (link) show(link.dataset.service ?? '');
    else hide();
  };

  list.addEventListener('pointermove', onMove);
  list.addEventListener('pointerleave', hide);
  window.addEventListener('scroll', hide, { passive: true });

  return () => {
    list.removeEventListener('pointermove', onMove);
    list.removeEventListener('pointerleave', hide);
    window.removeEventListener('scroll', hide);
    cancelAnimationFrame(frame);
    preview.style.opacity = '';
    preview.style.transform = '';
  };
}

/** Yöntem bölümünde ilerleme çizgisi kaydırdıkça dolar; geçilen adımlar işaretlenir. */
function processLine(): Cleanup {
  const list = document.querySelector<HTMLElement>('[data-process]');
  if (!list) return noop;
  const steps = [...list.querySelectorAll<HTMLElement>('[data-process-step]')];

  return scroll(
    (progress: number) => {
      list.style.setProperty('--progress', progress.toFixed(3));
      steps.forEach((step, index) => step.toggleAttribute('data-reached', progress >= (index + 0.35) / steps.length));
    },
    { target: list, offset: ['start 80%', 'end 65%'] },
  );
}

/** Blog yazısında okuma ilerlemesi. */
function readingProgress(): Cleanup {
  const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
  const article = document.querySelector<HTMLElement>('[data-article]');
  if (!bar || !article) return noop;

  return scroll(
    (progress: number) => {
      bar.style.transform = `scaleX(${progress.toFixed(3)})`;
    },
    { target: article, offset: ['start start', 'end end'] },
  );
}
