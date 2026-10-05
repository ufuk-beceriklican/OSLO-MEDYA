const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** 5 Kasım 2025 biçiminde Türkçe tarih. Frontmatter tarihleri UTC gece yarısıdır. */
export const formatDate = (date: Date) => dateFormatter.format(date);

/** YYYY-MM-DD (meta etiketleri ve <time datetime> için). */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Markdown gövdesinden dakika cinsinden okuma süresi. */
export function readingMinutes(markdown: string, wordsPerMinute = 200) {
  const words = markdown
    .replace(/[#>*_`[\]()!-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
