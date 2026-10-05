import type { IconName } from '../lib/icons';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export const site = {
  name: 'Oslo Medya',
  legalName: 'OSLOMEDYA',
  url: 'https://oslomedya.com',
  locale: 'tr_TR',
  tagline: "Dijital zirveniz Aydın'dan başlar.",
  description:
    'Aydın merkezli dijital ajans: web tasarım, SEO, Google Ads, sosyal medya yönetimi, e-ticaret ve özel yazılım çözümleri.',
  contact: {
    phone: '+90 551 857 99 50',
    phoneHref: 'tel:+905518579950',
    email: 'oslomedya@gmail.com',
    address: 'Aydın / Türkiye',
    whatsapp: 'https://wa.me/905518579950',
    whatsappNumber: '905518579950',
  },
  /** Gerçek hesap adresleri eklenince doldurulur. Liste boşken footer'da hiçbir şey görünmez. */
  social: [] as SocialLink[],
  nav: [
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/iletisim' },
  ] as NavItem[],
  legal: [{ label: 'KVKK aydınlatma metni', href: '/kvkk' }] as NavItem[],
};
