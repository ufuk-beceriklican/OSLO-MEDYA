# Üretilen görsellerin kaynağı

Bu klasördeki görseller **Higgsfield** üzerinden, `gpt_image_2_5` modeliyle (kalite: `high`) üretildi.
Higgsfield projesi: "Oslo Medya Web Sitesi" (`28f5c445-eaef-417a-87c1-1b676c21a9d2`). Üretim tarihi: 1 Ekim 2026.
Orijinal PNG'ler sharp ile WebP'ye çevrildi (kalite 88–92, şeffaflık kayıpsız); siteye Astro `<Image>` ile boyutlandırılarak sunulur.

Hiçbir görselde metin, logo veya gerçek kişi/marka yoktur. Görseller illüstratif/dekoratiftir; müşteri işi ya da ürün fotoğrafı olarak sunulmamalıdır.

## Dosyalar

| Dosya | Kullanım | İş kimliği (job id) | Çözünürlük / oran |
| --- | --- | --- | --- |
| `hero-aurora.webp` | Hero'daki bölünmüş güneş | `0bd6d52c-f8ba-44c0-b08c-cda93a732e2c` | 2048×2048, 1:1, opak |
| `hero-aurora-alt.webp` | Yedek / paylaşım görseli (sıcak şeftali kenarlı varyant) | `fbbde3c0-1d4e-4559-b895-e04f15609b0d` | 2048×2048, 1:1, opak |
| `cta-aurora.webp` | Koyu kapanış bandındaki aurora | `276b502c-d649-4634-8cde-f98333e46866` | 2688×1152, 21:9, opak |
| `object-web-seo.webp` | Web sitesi ve SEO | `126f0db0-de3e-42db-8973-40803c6c3d68` | 1024×1024, şeffaf |
| `object-rocket.webp` | İnternet reklamları | `9fda35a9-1d58-4acf-bae2-b6431d0d2db2` | 1024×1024, şeffaf |
| `object-social.webp` | Sosyal medya yönetimi | `4153d370-7a3a-4854-8b0c-ab89129f885d` | 1024×1024, şeffaf |
| `object-shop.webp` | E-ticaret | `885d3224-4e9f-4a88-9852-66ecf1477df8` | 1024×1024, şeffaf |
| `object-chip.webp` | Özel yazılım | `5a10d56f-f1b5-4b0b-9ad8-1c5e44fcda59` | 1024×1024, şeffaf |
| `object-pin.webp` | Google Business ve harita | `1b70ced2-9558-4560-99d2-8f8adc64f88b` | 1024×1024, şeffaf |

Şeffaf nesneler modelin `background: transparent` seçeneğiyle doğrudan üretildi; kenarlar temiz çıktığı için ayrıca arka plan silme (remove_background) gerekmedi.

## Promptlar

**Hero (`hero-aurora`)**
> Abstract aurora light field for a premium brand website. Full-bleed, edge-to-edge composition with no empty margins: soft flowing ribbons and translucent veils of luminous mint green, aqua cyan, periwinkle blue and pale lilac light, gently folding over each other with perfectly smooth gradients and silky depth. Bright, airy, high-key mood with a few softly glowing highlights, like light refracted through frosted glass. Clean, minimal, elegant. No text, no letters, no objects, no people, no stars, no noise, no grain, no banding, no hard edges.

**Hero yedek (`hero-aurora-alt`)**: aynı çerçeve; "wide slow curves of luminous mint green and aqua light, with a thin rim of pale lilac and a faint touch of soft peach at one edge… like sunlight passing through frosted glass over water".

**Kapanış bandı (`cta-aurora`)**
> Cinematic wide banner: a very dark near-black navy night sky fills the upper 60% of the frame, with a soft aurora glow rising from the bottom edge like a dawn behind an unseen horizon. Luminous curtains of mint green, aqua and pale lilac light fade smoothly upward into the darkness. Smooth gradients, minimal, elegant, with lots of calm empty dark space for overlaid text. No stars, no text, no landscape details, no objects, no people, no noise, no grain, no banding.

**Nesneler (ortak şablon)**
> Minimal 3D product render in a calm Scandinavian design language. **{NESNE}**. Materials: matte white ceramic and clear frosted glass with subtle refraction. The only color is a soft aurora gradient glow (mint green, aqua, periwinkle blue, pale lilac) living inside the object. Soft diffused studio light from the upper left, gentle highlights and soft shading, floating object centered at a three-quarter angle, filling about 70% of the frame with generous empty margin. Crisp clean edges, high detail, premium look. Isolated on a fully transparent background, no backdrop, no floor, no cast shadow. No text, no letters, no numbers, no logos, no watermark, no extra objects, no hands, no people.

`{NESNE}` değerleri:

- **web-seo:** a rounded rectangular browser window panel made of frosted glass and white ceramic with a slim top bar and three tiny round dots, and a clear glass magnifying lens floating in front of it, the lens filled with a soft aurora gradient glow
- **rocket:** a sleek minimalist rocket, matte white ceramic body with a round frosted glass porthole, pointing diagonally up to the right, with a soft aurora gradient light trail instead of flames
- **social:** two overlapping rounded speech bubbles, one matte white ceramic and one clear frosted glass, with a small heart shape glowing with a soft aurora gradient inside the glass bubble
- **shop:** a minimalist shopping bag with two rounded handles, matte white ceramic body and frosted glass handles, a soft aurora gradient glow visible through a small rounded glass window on the front
- **chip:** a minimalist square microchip, matte white ceramic body with fine thin metallic contact pins around the edges, and a frosted glass center window with a glowing aurora gradient core
- **pin:** a minimalist map location pin, teardrop shape in clear frosted glass with a glowing aurora gradient core, hovering above a small flat round matte white ceramic disc

## Yeniden üretmek için

Yeni bir nesne eklerken aynı şablonu ve `gpt_image_2_5` / `quality: high` / `resolution: 1k` / `background: transparent` ayarlarını kullanın ki seri tutarlı kalsın. Maliyet: 1K yüksek kalite ≈ 1,5 kredi, 2K ≈ 2,75 kredi (bu set toplam ≈ 19 kredi).
