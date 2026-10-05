interface Window {
  /** Yumuşak kaydırma örneği (mobil menü açılınca durdurulur). */
  __lenis?: import('lenis').default;
}

interface ImportMetaEnv {
  /** İsteğe bağlı: form gönderimlerinin POST edileceği uç nokta. Boşsa form WhatsApp'ı hazır mesajla açar. */
  readonly PUBLIC_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
