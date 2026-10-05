# Oslo Medya — tasarım sistemi

Yön: **Kuzey Işığı**. "Oslo" adından gelen sakin, İskandinav minimalizmi: açık zemin, mürekkep tipografi, bol boşluk, ince çizgiler.
Gradient (aurora) süs değil, bir **ışık kaynağıdır** ve yalnızca üç yerde kullanılır:

1. Hero'daki bölünmüş güneş (tek büyük gradient alanı)
2. Birincil buton (`Button variant="primary"`)
3. Koyu kapanış CTA bandı

Kartta, ikonda, kenarlıkta, metinde gradient yoktur. Logo işareti marka varlığı olarak bu kuralın dışındadır.

**İmza:** bölünmüş güneş. Logo (ikiye bölünmüş daire), hero'daki dev disk ve kapanıştaki ufuk aynı fikrin üç ölçeğidir. Açılışta iki yarı birleşir, kaydırırken aralanır.

## Tek kaynak: token'lar

Tüm renk, ölçü, süre ve easing değerleri `src/styles/tokens.css` içindedir. Bileşenlerde ham hex, px süre ya da bezier yazılmaz.

| Grup | Token'lar |
| --- | --- |
| Zemin | `--snow` `--paper` `--mist` `--line` `--line-strong` |
| Mürekkep | `--ink` `--ink-2` `--ink-3` |
| Gece (koyu bant) | `--night` `--night-2` `--on-night` `--on-night-2` `--line-night` |
| Aurora | `--aurora-mint` `--aurora-sky` `--aurora-blue` `--aurora-lilac` `--aurora` (gradient) |
| Anlamsal (bağlama göre) | `--text` `--text-2` `--text-3` `--hairline` `--hairline-strong` `--surface` `--focus-ring` |
| Yazı | `--font-display` (Bricolage Grotesque) `--font-body` (Hanken Grotesk), `--fs-0` … `--fs-6` (akışkan, display üst sınırı 6rem) |
| Boşluk | `--space-*`, `--section-y`, `--gutter`, `--container` (80rem), `--col-gap` |
| Köşe | `--r-xs` 8px, `--r-sm` 12px, `--r-md` 16px, `--r-pill` (eş merkezli: iç yarıçap = dış − dolgu) |
| Hareket | `--dur-stagger` 40ms · `--dur-micro` 80 · `--dur-quick` 150 · `--dur-fast` 250 · `--dur-medium` 350 · `--dur-slow` 500 · `--dur-hero` 900; `--ease-out` · `--ease-expo` · `--ease-in-out` |

**Koyu bant:** `.on-night` sınıfı aynı anlamsal adları gece renklerine çevirir; bileşenler `--text`, `--hairline` gibi adları kullandığı için iki zeminde de ek kod olmadan çalışır.

**Yükseklik:** yüzen katmanlar (header, menü paneli) gölge; akış içi yüzeyler 1px çizgi kullanır. İkisi birlikte kullanılmaz.

## Izgara ve düzen

- 12 sütunlu ortak ızgara (`--col-gap`). Bölüm başlığı 1–7, lead 8–12; hizmet satırında başlık 1–7, açıklama 8–11, ok 12; altyapıda başlık 1–5, liste 8–12; yazı gövdesi 3–10. Böylece tüm bölümler aynı sütun çizgilerini paylaşır.
- Sayfa iskeleti tek: `src/layouts/BaseLayout.astro` (Header, `<main>`, isteğe bağlı CTA bandı, Footer, SEO, sayfa geçişi). Yeni sayfa bu layout'u kullanır; navbar/footer başka yerde tanımlanmaz.
- Başlığın üstünde etiket (eyebrow) yoktur; başlık kendi ağırlığını taşır. Numaralandırma yalnızca gerçek bir sıra olan "Nasıl çalışırız" bölümünde vardır.

## Bileşenler

`src/components/ui`: `Icon`, `Logo`, `Button` (primary / secondary / link), `Field` (etiketli, doğrulamalı form alanı).
`src/components/layout`: `Header` (scroll'da cam çubuğa dönüşür, hizmet paneli, mobilde tam ekran `<dialog>` menü), `Footer` (dev wordmark).
`src/components/sections`: `Hero`, `SectionHead`, `ServiceList`, `Process`, `Infrastructure`, `PostRow`, `PageHeader`, `CategoryNav`, `CtaBand`.

**İkonlar:** tek aile (Phosphor), tek ağırlık (Light), `currentColor`, tek bileşen: `<Icon name="…" />`. Kullanılabilir adlar `src/lib/icons.ts` listesindedir; listede olmayan ad derlemeyi durdurur. Yeni ikon için listeye ekleyin.

## Hareket dili

Kütüphaneler: `motion` (reveal, scroll'a bağlı efektler), `lenis` (yumuşak kaydırma), Astro `ClientRouter` (sayfa geçişi; header `transition:persist` ile kalıcıdır).

- **Tek orkestre an:** hero açılışı (güneş yarıları birleşir, başlık satırları yükselir, geri kalanı gelir). Kaydırırken yarılar aralanır.
- **Reveal:** bölümler görünmeden hemen önce gizlenir, 20px aşağıdan exponential ease-out ile gelir; aynı anda görünenler toplam ≤300ms gecikmeyle sıralanır. Ekrandaki öğelere dokunulmaz (yanıp sönme yok).
- **Mikro etkileşim:** hizmet satırında imleci izleyen nesne önizlemesi (yalnızca `hover: hover` ve ince imleç), diğer satırların geri çekilmesi, butonlarda basılınca `scale(0.98)`.
- **Güvenlik ağı:** JS yoksa ya da yüklenemezse hiçbir içerik gizli kalmaz (CSS 3 sn sonra hero'yu kendisi gösterir). `prefers-reduced-motion` açıksa hareket hiç kurulmaz, yumuşak kaydırma devre dışı kalır, sayfa geçişi animasyonları tarayıcı tarafından kapatılır.

## İçerik modeli

- `src/data/site.ts`: marka adı, iletişim bilgileri, menü, **sosyal hesaplar** (boşken footer'da görünmez).
- `src/data/services.ts`: 6 hizmet (başlık, açıklama, meta açıklama, satış cümlesi, maddeler). Her hizmet `/hizmetler/[slug]` olarak ayrı URL'dir.
- `src/data/home.ts`: çalışma yöntemi adımları ve altyapı hizmetleri.
- `src/content/blog/*.md`: blog yazıları (Markdown + frontmatter: `title`, `description` 80–200 karakter, `pubDate`, `updatedDate`, `category`). Şema `src/content.config.ts` içindedir; geçersiz frontmatter derlemeyi durdurur. Yeni yazı eklemek için bu klasöre bir `.md` dosyası koymak yeterlidir; liste, kategori sayfaları, sitemap ve JSON-LD otomatik oluşur.

## SEO ve erişilebilirlik

- Her sayfa kendi `title`/`description`, canonical, Open Graph/Twitter etiketleri ve JSON-LD'sini `Seo.astro` üzerinden alır (kuruluş: `ProfessionalService`; yazılar: `BlogPosting`; hizmetler: `Service`; iç sayfalar: `BreadcrumbList`).
- İçerik derleme zamanında HTML'e basılır (demodaki gibi JS ile değil). `sitemap-index.xml` ve `robots.txt` otomatik/statik olarak hazırdır.
- Sayfa başına tek `<h1>`, atlama bağlantısı, `:focus-visible` halkası, etiketli form alanları, 44px dokunma alanı, hareket azaltma desteği, WCAG AA kontrast (metin ≥4.5:1).
- Tarayıcının çizdiği yüzeyler de paletten gelir: metin seçimi, imleç, kaydırma çubuğu, odak halkası.

## Form

`/iletisim` formu **sahte onay göstermez**. `PUBLIC_FORM_ENDPOINT` ortam değişkeni tanımlıysa JSON olarak oraya POST eder ve yalnızca başarılı yanıtta "alındı" der. Tanımlı değilse WhatsApp'ı hazırlanmış mesajla açar. KVKK onayı zorunludur.

## Bilinçli eksikler (gerçek içerik bekliyor)

- Gerçek müşteri projeleri/referanslar ve yorumlar. Demodaki kurgusal referanslar kaldırıldı; `Projeler` bölümü gerçek içerik gelince eklenecek.
- Sosyal medya hesapları (`site.social`), gerçek adres ve alan adıyla e-posta.
- `Hakkımızda` sayfası (ekip/hikâye bilgisi gerekir; uydurulmadı).
- KVKK metni standart bir taslaktır; yayın öncesi hukuki incelemeden geçmelidir.
- Analitik/çerez yoktur; eklenirse KVKK metni ve çerez bildirimi güncellenmelidir.
