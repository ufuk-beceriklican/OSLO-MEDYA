/**
 * Sitede kullanılan tek ikon seti: Phosphor, "Light" ağırlığı.
 * Yeni ikon gerekirse buraya eklenir; `Icon` bileşeni listede olmayan adı derlemede reddeder.
 */
export const iconNames = [
  'arrow-up-right',
  'arrow-right',
  'arrow-left',
  'arrow-up',
  'list',
  'x',
  'caret-down',
  'check',
  'phone',
  'envelope-simple',
  'map-pin',
  'whatsapp-logo',
  'instagram-logo',
  'linkedin-logo',
  'behance-logo',
  'monitor',
  'rocket-launch',
  'share-network',
  'shopping-bag',
  'cpu',
  'map-pin-area',
  'lock-key',
  'globe-hemisphere-west',
  'hard-drives',
  'clock',
  'calendar-blank',
  'paper-plane-tilt',
] as const;

export type IconName = (typeof iconNames)[number];
