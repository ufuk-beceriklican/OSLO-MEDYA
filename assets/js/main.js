const STORAGE_KEY = 'osloContent';

const deepMerge = (base, override) => {
  if (!override) return structuredClone(base);
  const output = Array.isArray(base) ? [...base] : { ...base };
  Object.entries(override).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      output[key] = value.map(item => (typeof item === 'object' ? { ...item } : item));
    } else if (typeof value === 'object') {
      output[key] = deepMerge(base[key] || {}, value);
    } else {
      output[key] = value;
    }
  });
  return output;
};

const loadContent = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return window.siteContent;
  try {
    const parsed = JSON.parse(stored);
    return deepMerge(window.siteContent, parsed);
  } catch (error) {
    console.warn('İçerik yüklenemedi, varsayılan içerik kullanılıyor', error);
    return window.siteContent;
  }
};

const content = loadContent();

const qs = selector => document.querySelector(selector);
const qsa = selector => Array.from(document.querySelectorAll(selector));

const renderHero = () => {
  const heroEl = qs('[data-hero]');
  if (!heroEl) return;
  qs('[data-hero-headline]').textContent = content.hero.headline;
  qs('[data-hero-subheading]').textContent = content.hero.subheading;
  const cta = qs('[data-hero-cta]');
  if (cta) {
    cta.textContent = content.hero.ctaLabel;
    // Force update to new WhatsApp number (0551 857 99 50)
    cta.href = 'https://wa.me/905518579950';
  }
};

const renderServices = () => {
  const container = qs('[data-services]');
  if (!container) return;
  container.innerHTML = content.services
    .map(service => `
      <article class="service-card" data-service-id="${service.id}">
        <div class="service-card__glow"></div>
        <div class="service-card__icon"><i class="ph ${service.icon}"></i></div>
        <h3>${service.title}</h3>
        <p class="tagline">${service.tagline}</p>
        <button class="ghost-btn" data-service-trigger="${service.id}">Detay</button>
      </article>
    `)
    .join('');
};

const renderServicesDetail = () => {
  const detailRoot = qs('[data-service-detail]');
  if (!detailRoot) return;
  detailRoot.innerHTML = content.services
    .map(service => `
      <section id=${service.id} class="service-detail">
        <header>
          <div class="icon"><i class="ph ${service.icon}"></i></div>
          <div>
            <h2>${service.title}</h2>
            <p>${service.tagline}</p>
          </div>
        </header>
        <p>${service.description}</p>
        <p class="sales-line">${service.salesLine}</p>
        <ul>${service.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
      </section>
    `)
    .join('');
};

const renderAltyapi = () => {
  const altyapiRoot = qs('[data-altyapi]');
  if (!altyapiRoot) return;
  qs('[data-altyapi-headline]').textContent = content.altyapi.headline;
  altyapiRoot.innerHTML = content.altyapi.items
    .map(item => `
      <article class="infra-card">
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </article>
    `)
    .join('');
};

const renderReferences = () => {
  const grid = qs('[data-references]');
  if (!grid) return;
  grid.innerHTML = content.references
    .map(ref => `
      <figure class="reference-card">
        <div class="reference-card__img" style="background-image:url('${ref.image}')"></div>
        <figcaption>
          <h3>${ref.title}</h3>
          <p>${ref.sector}</p>
        </figcaption>
      </figure>
    `)
    .join('');
};

const renderBlogPreview = () => {
  const previewRoot = qs('[data-blog-preview]');
  if (!previewRoot) return;
  const latest = content.blog.slice(0, 3);
  previewRoot.innerHTML = latest
    .map(post => renderBlogCard(post))
    .join('');
};

const renderBlogCard = post => `
  <article class="blog-card" data-category="${post.category}">
    <div class="blog-card__thumb" style="background-image:url('${post.image}')"></div>
    <div class="blog-card__body">
      <span>${post.date} • ${post.read}</span>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="blog.html#post-${post.id}" class="ghost-btn">Devamını Oku</a>
    </div>
  </article>
`;

const renderBlogArchive = () => {
  const archiveRoot = qs('[data-blog-archive]');
  if (!archiveRoot) return;
  
  // Hash'ten post ID'sini al
  const hash = window.location.hash;
  const postId = hash ? parseInt(hash.replace('#post-', '')) : null;
  
  if (postId) {
    const post = content.blog.find(p => p.id === postId);
    if (post && post.fullContent) {
      archiveRoot.innerHTML = `
        <article class="blog-detail">
          <a href="blog.html" class="back-link" style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 24px; color: var(--neon-cyan);">
            <i class="ph ph-arrow-left"></i> Blog'a Dön
          </a>
          <div class="blog-detail__header">
            <span>${post.date} • ${post.read} • ${post.category}</span>
            <h1>${post.title}</h1>
            <div class="blog-detail__image" style="background-image:url('${post.image}'); height: 400px; border-radius: var(--radius); margin: 24px 0; background-size: cover; background-position: center;"></div>
          </div>
          <div class="blog-detail__content">
            ${post.fullContent}
          </div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
            <a href="blog.html" class="ghost-btn">Tüm Yazıları Gör</a>
          </div>
        </article>
      `;
      document.title = `${post.title} | OSLOMEDYA Blog`;
      return;
    }
  }
  
  archiveRoot.innerHTML = content.blog.map(renderBlogCard).join('');
  const filterSelect = qs('[data-blog-filter]');
  const searchInput = qs('[data-blog-search]');
  const categories = ['Tümü', ...new Set(content.blog.map(post => post.category))];
  filterSelect.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join('');
  const applyFilters = () => {
    const term = searchInput.value.toLowerCase();
    const activeCat = filterSelect.value;
    qsa('[data-blog-archive] .blog-card').forEach(card => {
      const matchesSearch = card.innerText.toLowerCase().includes(term);
      const matchesCat = activeCat === 'Tümü' || card.dataset.category === activeCat;
      card.style.display = matchesSearch && matchesCat ? 'grid' : 'none';
    });
  };
  filterSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);
};

const renderContact = () => {
  // Force update to new WhatsApp number (0551 857 99 50)
  const NEW_WHATSAPP = 'https://wa.me/905518579950';
  const NEW_PHONE = '+90 551 857 99 50';
  
  // Always set TEKLİF AL button href first, regardless of other contact elements
  const teklifLinks = qsa('[data-teklif-link]');
  teklifLinks.forEach(link => {
    link.href = NEW_WHATSAPP;
  });
  
  // Set all WhatsApp buttons
  const whatsappLinks = qsa('[data-contact-whatsapp]');
  whatsappLinks.forEach(link => {
    link.href = NEW_WHATSAPP;
  });
  
  // Set other contact elements if they exist
  const phoneEls = qsa('[data-contact-phone]');
  phoneEls.forEach(el => {
    el.textContent = NEW_PHONE;
    el.href = `tel:${NEW_PHONE.replace(/[^+\d]/g, '')}`;
  });
  
  const mailEls = qsa('[data-contact-mail]');
  mailEls.forEach(el => {
    el.textContent = content.contact.mail;
    el.href = `mailto:${content.contact.mail}`;
  });
  
  const addressEls = qsa('[data-contact-address]');
  addressEls.forEach(el => {
    el.textContent = content.contact.address;
  });
};

const initServiceModal = () => {
  const modal = qs('[data-service-modal]');
  if (!modal) return;
  const overlay = modal.querySelector('.modal-overlay');
  const titleEl = modal.querySelector('h3');
  const descEl = modal.querySelector('p');
  const highlightsEl = modal.querySelector('ul');
  const openModal = id => {
    const service = content.services.find(item => item.id === id);
    if (!service) return;
    titleEl.textContent = service.title;
    descEl.textContent = service.description;
    highlightsEl.innerHTML = service.highlights.map(item => `<li>${item}</li>`).join('');
    modal.classList.add('visible');
  };
  const closeModal = () => modal.classList.remove('visible');
  qsa('[data-service-trigger]').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.serviceTrigger))
  );
  overlay.addEventListener('click', closeModal);
  modal.querySelector('button').addEventListener('click', closeModal);
};

const initPageTransition = () => {
  document.body.classList.add('page-loaded');
  qsa('a[href]').forEach(link => {
    if (link.target === '_blank' || link.href.includes('#')) return;
    link.addEventListener('click', event => {
      if (link.dataset.instant === 'true') return;
      event.preventDefault();
      document.body.classList.remove('page-loaded');
      setTimeout(() => {
        window.location.href = link.href;
      }, 200);
    });
  });
};

const initScrollReveal = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  qsa('[data-reveal]').forEach(el => observer.observe(el));
};

const initStickyNav = () => {
  const nav = qs('header.site-header');
  if (!nav) return;
  const toggle = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', toggle);
  toggle();
};

const initMobileMenu = () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const btn = document.querySelector('.mobile-menu-btn');
  
  if (!navbar || !navLinks || !btn) return;

  // Toggle functionality
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    
    const icon = btn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.replace('ph-list', 'ph-x');
      document.body.style.overflow = 'hidden';
    } else {
      icon.classList.replace('ph-x', 'ph-list');
      document.body.style.overflow = '';
    }
  });

  // Close when clicking outside (Updated for full screen menu)
  // Since nav-links now covers the whole screen, we check if the click target is the container itself
  navLinks.addEventListener('click', (e) => {
    if (e.target === navLinks) {
      navLinks.classList.remove('active');
      const icon = btn.querySelector('i');
      if (icon) icon.classList.replace('ph-x', 'ph-list');
      document.body.style.overflow = '';
    }
  });

  // Close when link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = btn.querySelector('i');
      if (icon) icon.classList.replace('ph-x', 'ph-list');
      document.body.style.overflow = '';
    });
  });
};

const init = () => {
  renderHero();
  renderServices();
  renderServicesDetail();
  renderAltyapi();
  renderReferences();
  renderBlogPreview();
  renderBlogArchive();
  renderContact();
  initServiceModal();
  initStickyNav();
  initMobileMenu();
  initPageTransition();
  initScrollReveal();
  
  // Blog hash routing için
  if (window.location.pathname.includes('blog.html')) {
    window.addEventListener('hashchange', () => {
      renderBlogArchive();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('pageshow', function (event) {
    
    if (event.persisted) {
        
        // 1. body'nin opaklığını anında 1 yap:
        document.body.style.opacity = '1';
        
        // 2. body'e .page-loaded sınıfını ekleyerek CSS geçişini zorla:
        document.body.classList.add('page-loaded');

        // 3. Animasyonla yüklenen elemanları da görünür yap.
        document.querySelectorAll('[data-reveal]').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
});
