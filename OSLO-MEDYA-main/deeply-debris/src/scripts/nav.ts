let bound = false;

const header = () => document.querySelector<HTMLElement>('[data-site-header]');
const menu = () => document.querySelector<HTMLDialogElement>('[data-mobile-menu]');

function syncScrolled() {
  header()?.toggleAttribute('data-scrolled', window.scrollY > 8);
}

function closePanels(keep?: Element | null) {
  document.querySelectorAll<HTMLElement>('[data-nav-panel][data-open]').forEach((panel) => {
    if (keep && panel.closest('[data-nav-item]') === keep) return;
    panel.removeAttribute('data-open');
    panel.closest('[data-nav-item]')?.querySelector('[data-nav-toggle]')?.setAttribute('aria-expanded', 'false');
  });
}

function closeMenu() {
  const dialog = menu();
  if (dialog?.open) dialog.close();
}

function onClick(event: MouseEvent) {
  const target = event.target as Element;

  const toggle = target.closest<HTMLElement>('[data-nav-toggle]');
  if (toggle) {
    const item = toggle.closest('[data-nav-item]');
    const panel = item?.querySelector<HTMLElement>('[data-nav-panel]');
    const open = !panel?.hasAttribute('data-open');
    closePanels(item);
    panel?.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    return;
  }

  if (target.closest('[data-menu-open]')) {
    menu()?.showModal();
    document.querySelector('[data-menu-open]')?.setAttribute('aria-expanded', 'true');
    window.__lenis?.stop();
    return;
  }

  if (target.closest('[data-menu-close]') || target.closest('[data-mobile-menu] a')) {
    closeMenu();
    return;
  }

  // Panel içindeki bir bağlantı ya da dışarı tıklama paneli kapatır
  if (target.closest('[data-nav-panel] a') || !target.closest('[data-nav-item]')) closePanels();
}

/** Odak menü öğesinin dışına taşınca (Tab) açık panel kapanır. */
function onFocusin(event: FocusEvent) {
  if (!(event.target as Element).closest('[data-nav-item]')) closePanels();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  const open = document.querySelector<HTMLElement>('[data-nav-panel][data-open]');
  if (!open) return;
  const toggle = open.closest('[data-nav-item]')?.querySelector<HTMLElement>('[data-nav-toggle]');
  closePanels();
  toggle?.focus();
}

export function initNav() {
  // Başlık sayfalar arasında kalıcı olduğundan aktif bağlantı her geçişte yeniden hesaplanır.
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll<HTMLAnchorElement>('.site-nav__link[data-nav-link]').forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    const current = path === linkPath || path.startsWith(`${linkPath}/`);
    if (current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  closePanels();
  closeMenu();
  syncScrolled();

  if (bound) return;
  bound = true;

  window.addEventListener('scroll', syncScrolled, { passive: true });
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('focusin', onFocusin);
  menu()?.addEventListener('close', () => {
    document.querySelector('[data-menu-open]')?.setAttribute('aria-expanded', 'false');
    window.__lenis?.start();
  });
}
