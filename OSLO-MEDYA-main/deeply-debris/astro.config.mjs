// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://oslomedya.com',
  trailingSlash: 'never',
  compressHTML: true,
  // CSS (≈23 KB, sıkıştırılmış ≈7 KB) HTML'e gömülür: render'ı engelleyen ayrı bir istek kalmaz (mobil FCP/LCP).
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // Eski demo adreslerinin (/hizmetler.html vb.) yönlendirmeleri BURADA değil, barındırma seviyesinde tanımlıdır
  // (public/_redirects ve public/.htaccess). Astro `redirects` ayarı dist/hizmetler.html gibi dosyalar üretir;
  // bazı statik sunucular /hizmetler isteğini bu dosyaya eşleyip sonsuz yönlendirme döngüsü yaratır.
});
