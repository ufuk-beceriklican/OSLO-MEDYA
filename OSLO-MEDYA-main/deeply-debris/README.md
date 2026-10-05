# Oslo Medya web sitesi

Aydın merkezli dijital ajans Oslo Medya'nın tanıtım sitesi. Astro 7 ile statik olarak üretilir; JS yalnızca hareket ve etkileşim için yüklenir.
Tasarım kararları ve token'lar için [DESIGN.md](DESIGN.md), görsel kaynakları için [src/assets/generated/PROVENANCE.md](src/assets/generated/PROVENANCE.md).

## Komutlar

| Komut | İş |
| --- | --- |
| `npm install` | Bağımlılıkları kurar |
| `npm run dev` | Geliştirme sunucusu, `localhost:4321` (arka plan için `npx astro dev --background`) |
| `npm run build` | Üretim sürümünü `./dist` içine üretir |
| `npm run preview` | Üretim sürümünü yerelde önizler |
| `npx astro check` | Tür ve şablon denetimi |

Node 22.12 veya üstü gerekir.

## Yapı

```text
src/
├── assets/generated/   Higgsfield ile üretilen görseller (+ PROVENANCE.md)
├── components/         ui · layout · sections
├── content/blog/       Blog yazıları (Markdown)
├── data/               site, hizmetler, ana sayfa içeriği
├── layouts/            BaseLayout (tek sayfa iskeleti)
├── lib/                format, seo (JSON-LD), posts, icons
├── pages/              index, hizmetler, blog, iletisim, kvkk, 404
├── scripts/            hareket, yumuşak kaydırma, menü, form
└── styles/             tokens, reset, base, prose
```

## İçerik nasıl güncellenir?

- **Blog yazısı:** `src/content/blog/` altına bir `.md` dosyası ekleyin (dosya adı URL olur). Frontmatter: `title`, `description` (80–200 karakter), `pubDate`, `category` (`SEO`, `Sosyal Medya`, `E-Ticaret`, `Dijital Pazarlama`, `Teknoloji`), isteğe bağlı `updatedDate`. Gövdede başlık olarak `##` ve `###` kullanın; `#` sayfa başlığıdır.
- **Hizmetler:** `src/data/services.ts`.
- **Telefon, e-posta, adres, sosyal hesaplar, menü:** `src/data/site.ts`. `social` listesi boşken footer'da görünmez; gerçek adresleri buraya ekleyin.
- **Yazılar ve sayfalar** sitemap'e otomatik girer (`/sitemap-index.xml`).

## İletişim formu

Varsayılan olarak form, WhatsApp'ı hazırlanmış mesajla açar (mesaj siz göndermeden iletilmiş sayılmaz). Formun doğrudan size ulaşması için bir form servisi (Formspree, Web3Forms, kendi API'niz vb.) uç noktasını ortam değişkenine yazın:

```sh
PUBLIC_FORM_ENDPOINT=https://ornek-servis.com/f/abc123
```

Tanımlıysa form JSON olarak oraya POST eder ve yalnızca başarılı yanıtta "mesajınız alındı" der.

## Yayına alma

`npm run build` çıktısı (`dist/`) her statik barındırmada çalışır. Dikkat edilecekler:

- `astro.config.mjs` içindeki `site` değeri `https://oslomedya.com` olarak ayarlıdır.
- **Temiz adresler:** sunucu `/iletisim` isteğine `iletisim/index.html` dosyasını yönlendirme yapmadan sunmalıdır. Netlify, Vercel, Cloudflare Pages ve GitHub Pages bunu varsayılan olarak yapar; Apache/cPanel için `public/.htaccess` hazırdır (build'de `dist/` içine kopyalanır).
- **Eski demo adresleri** (`/hizmetler.html`, `/blog.html`, `/iletisim.html`, `/referanslar`, `/admin.html`) gerçek 301 ile yeni adreslere taşınmalıdır; bu, arama motorundaki sıralamanın yeni siteye geçmesi için önemlidir. Kurallar `public/_redirects` (Netlify, Cloudflare Pages) ve `public/.htaccess` (Apache) içinde hazırdır. Vercel için `vercel.json`:

  ```json
  {
    "redirects": [
      { "source": "/index.html", "destination": "/", "permanent": true },
      { "source": "/hizmetler.html", "destination": "/hizmetler", "permanent": true },
      { "source": "/blog.html", "destination": "/blog", "permanent": true },
      { "source": "/iletisim.html", "destination": "/iletisim", "permanent": true },
      { "source": "/referanslar", "destination": "/", "permanent": true },
      { "source": "/referanslar.html", "destination": "/", "permanent": true },
      { "source": "/admin.html", "destination": "/", "permanent": true }
    ]
  }
  ```

  Bu yönlendirmeleri Astro'nun `redirects` ayarıyla **tanımlamayın**: `dist/iletisim.html` gibi dosyalar üretir ve bazı statik sunucularda `/iletisim` adresi sonsuz yönlendirme döngüsüne girer.
- Sitede analitik ya da çerez yoktur. Ekleyecekseniz KVKK metnini ve bir çerez bildirimini güncelleyin.
- KVKK metni (`src/pages/kvkk.astro`) standart bir taslaktır; yayın öncesi hukuki incelemeden geçirin.
