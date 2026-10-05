import type { IconName } from '../lib/icons';

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  /** Sayfa gövdesindeki açıklama. */
  description: string;
  /** Arama sonuçlarında görünen kısa açıklama (≈120–160 karakter). */
  meta: string;
  salesLine: string;
  highlights: string[];
  icon: IconName;
}

export const services: Service[] = [
  {
    slug: 'web-tasarim-seo',
    title: 'Web sitesi ve SEO',
    tagline: 'Görsel açıdan çarpıcı, hızlı ve SEO uyumlu dijital vitrinler.',
    description:
      'Prestijli, güven veren ve aranabilirlik gücü yüksek kurumsal web siteleri tasarlıyoruz. İçerik mimarisinden teknik SEO ayarlarına kadar tüm detayları optimize ederek görünürlüğünüzü artırıyoruz.',
    meta: "Aydın'da hızlı, güven veren ve SEO uyumlu kurumsal web siteleri. İçerik mimarisinden teknik SEO'ya kadar görünürlüğünüzü artırıyoruz.",
    salesLine: 'Şirketinizi 7/24 açık bir satış ofisine dönüştürelim.',
    highlights: ['Headless veya klasik CMS altyapıları', 'Lighthouse 90+ optimizasyonu', 'Çok dilli içerik mimarisi'],
    icon: 'monitor',
  },
  {
    slug: 'internet-reklamlari',
    title: 'İnternet reklamları',
    tagline: 'Performans odaklı medya satın alma ve dönüşüm optimizasyonu.',
    description:
      'Google, Meta, TikTok ve LinkedIn reklam modellerinde uçtan uca kurulum, kreatif üretimi ve optimizasyon süreçlerini yönetiyoruz.',
    meta: 'Google, Meta, TikTok ve LinkedIn reklamlarında kurulum, kreatif üretim ve optimizasyon. Bütçenizi doğru kitleye harcayın.',
    salesLine: 'Bütçenizi doğru kitleye harcayın, ölçümlenebilir satışlar elde edin.',
    highlights: ['360° kampanya kurgusu', 'Gerçek zamanlı raporlama', 'ROAS odaklı ölçeklenme'],
    icon: 'rocket-launch',
  },
  {
    slug: 'sosyal-medya-yonetimi',
    title: 'Sosyal medya yönetimi',
    tagline: 'Topluluk oluşturan içerikler ve yüksek etkileşimli yayın planları.',
    description:
      'Sizin için prestijli ve dikkat çekici paylaşımlar hazırlayalım, satışlarınızı artırın. Strateji, tasarım, video ve moderasyon tek bir takımda.',
    meta: 'Strateji, tasarım, video ve moderasyon tek ekipte: aylık içerik takvimi, Reels ve Shorts prodüksiyonuyla sosyal medya yönetimi.',
    salesLine: 'Markanız her mecrada aynı enerjiyi yansıtsın.',
    highlights: ['Aylık storyboard ve içerik takvimi', 'AI destekli içerik varyasyonları', 'Reels ve Shorts prodüksiyonu'],
    icon: 'share-network',
  },
  {
    slug: 'e-ticaret',
    title: 'E-ticaret',
    tagline: 'Mağazanızı hızlıca büyütecek ölçeklenebilir mağaza altyapıları.',
    description:
      'Shopify, WooCommerce ve özel çözümlerle entegre pazarlama otomasyonları kuruyoruz. Lojistik ve ödeme bağlantıları dahil.',
    meta: 'Shopify, WooCommerce ve özel çözümlerle ölçeklenebilir e-ticaret altyapıları. Pazarlama otomasyonu, lojistik ve ödeme entegrasyonları dahil.',
    salesLine: 'Sepet değerini ve tekrar satın almayı aynı anda yükseltin.',
    highlights: ['Headless storefront', 'Pazaryeri entegrasyonları', 'Omnichannel raporlama'],
    icon: 'shopping-bag',
  },
  {
    slug: 'ozel-yazilim',
    title: 'Özel yazılım çözümleri',
    tagline: 'İhtiyacınıza özel dashboard, entegrasyon ve otomasyonlar.',
    description:
      'CRM, saha operasyonu, veri görselleştirme ya da yapay zekâ destekli iş akışlarınıza özel çözümler geliştiriyoruz.',
    meta: 'CRM, saha operasyonu, veri görselleştirme ve yapay zekâ destekli iş akışları için işinize özel yazılım, entegrasyon ve otomasyon.',
    salesLine: 'Manuel işleri otomatikleştirip ekibinize zaman kazandırın.',
    highlights: ['API entegrasyonları', 'Bulut ve on-prem kurulum', 'Siber güvenlik uyumluluğu'],
    icon: 'cpu',
  },
  {
    slug: 'google-business-harita',
    title: 'Google Business ve harita',
    tagline: 'Yerel aramalarda ilk sırayı hedefleyen optimizasyon paketi.',
    description:
      'Google Business profiliniz için görsel optimizasyon, yorum yönetimi ve lokal SEO içeriklerini hazırlıyoruz.',
    meta: 'Google Business profili optimizasyonu, yorum yönetimi ve lokal SEO ile yerel aramalarda ve haritada daha görünür olun.',
    salesLine: 'Haritada en görünür işletme siz olun.',
    highlights: ['Yorum otomasyonları', 'Tap-to-call optimizasyonu', '360° fotoğraf entegrasyonu'],
    icon: 'map-pin-area',
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
