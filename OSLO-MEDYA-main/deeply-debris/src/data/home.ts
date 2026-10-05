import type { IconName } from '../lib/icons';

/** Çalışma yöntemi. Sıra gerçek olduğu için numaralandırılır. */
export const process = [
  { title: 'Strateji', text: 'Hedef kitleyi, içerik mimarisini ve kampanya kurgusunu birlikte netleştiririz.' },
  { title: 'Tasarım', text: 'Arayüzü, kreatif içerikleri ve marka dilini üretiriz.' },
  { title: 'Yazılım', text: 'Web sitesini, mağazayı ve entegrasyonları geliştirip yayına alırız.' },
  { title: 'Performans', text: 'Sonuçları raporlar, ölçer ve sürekli optimize ederiz.' },
];

export interface InfraItem {
  title: string;
  detail: string;
  icon: IconName;
}

export const infrastructure: InfraItem[] = [
  { title: 'SSL sertifikası', detail: 'HTTP/3 destekli, otomatik yenilenen güvenlik katmanı.', icon: 'lock-key' },
  { title: 'Alan adı kaydı', detail: 'Markanıza uygun uzantılar ve DNS yönetimi.', icon: 'globe-hemisphere-west' },
  { title: 'Web hosting', detail: 'CDN destekli, DDoS korumalı yüksek erişilebilir altyapı.', icon: 'hard-drives' },
];
