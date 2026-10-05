import type { ImageMetadata } from 'astro';
import webSeo from '../assets/generated/object-web-seo.webp';
import rocket from '../assets/generated/object-rocket.webp';
import social from '../assets/generated/object-social.webp';
import shop from '../assets/generated/object-shop.webp';
import chip from '../assets/generated/object-chip.webp';
import pin from '../assets/generated/object-pin.webp';

/** Hizmet sayfaları ve liste önizlemeleri için şeffaf arka planlı 3B nesneler (Higgsfield, bkz. assets/generated/PROVENANCE.md). */
export const serviceImages: Record<string, ImageMetadata> = {
  'web-tasarim-seo': webSeo,
  'internet-reklamlari': rocket,
  'sosyal-medya-yonetimi': social,
  'e-ticaret': shop,
  'ozel-yazilim': chip,
  'google-business-harita': pin,
};
