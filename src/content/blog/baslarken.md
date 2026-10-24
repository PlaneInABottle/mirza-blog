---
title: 'Başlarken'
description: 'Bu blogda yazı yazarken kullanabileceğin Markdown özellikleri: tablo, liste, kod, görsel, dipnot ve ham HTML.'
date: 2026-10-24
tags: ['meta', 'markdown']
translationKey: 'baslarken'
cover: ../../assets/kapak.png
coverAlt: 'Koyu maviden turkuaza geçen soyut bir gradyan'
---

Bu blog statik bir site: yazılar Markdown dosyası olarak durur, build çıktısı düz HTML olur. Veritabanı, sunucu tarafı kod ve çerez yok.

Bu sayfa bir başvuru kaynağı. Yazarken "bunu nasıl yapıyordum" diye buraya bakabilirsin.

## Yazı ekleme

`src/content/blog/` altına bir dosya koy; dosya adı URL olur: `ilk-yazim.md` → `/yazilar/ilk-yazim/`.

```bash
npm run dev     # yazarken
npm run build   # dist/ üretir
```

Taslak olarak yazmak için frontmatter'a `draft: true` ekle. Yazı yalnızca `npm run dev` sırasında, "taslak" rozetiyle görünür; build onu hiç üretmez.

## Başlıklar

Sayfa başlığı (`h1`) frontmatter'daki `title`. Gövdede iki seviye kullanabilirsin:

### Üçüncü seviye başlık

#### Dördüncü seviye başlık

## Metin biçimlendirme

**Kalın**, *italik*, ~~üstü çizili~~, `satır içi kod`, [bağlantı](https://astro.build) ve otomatik bağlantı: <https://pele.run>.

Uzun paragrafta satır sonu için iki boşluk bırakman gerekmiyor; Markdown paragrafı kendisi sarıyor.

## Listeler

- Birinci madde
- İkinci madde
  - Alt madde
  - Alt madde

1. Sıralı birinci
2. Sıralı ikinci
3. Sıralı üçüncü

Yapılacak listesi:

- [x] Yazıyı yaz
- [x] Taslakta bak
- [ ] Yayına al

## Tablo

| Alan | Zorunlu | Ne işe yarar |
| --- | --- | --- |
| `title` | Evet | Sayfa başlığı ve listede görünen ad |
| `description` | Evet | Liste ve arama sonuçlarındaki tek cümle |
| `date` | Evet | Sıralama ve tarih |
| `tags` | Hayır | Yazı altındaki etiketler |
| `draft` | Hayır | `true` ise yayınlanmaz |

Hizalamayı iki nokta ile verirsin: `|:---|:---:|---:|` → sol, orta, sağ.

## Alıntı

> İyi bir yazı, okurun yarısını yazıya bırakır; gerisini okur kendi kafasında tamamlar.

## Kod

Satır içi: `npm run build`.

Blok, dil belirterek (renklendirme Shiki ile):

```ts
const posts = await getPosts();

for (const post of posts) {
  console.log(post.data.title);
}
```

```bash
npm run dev
npm run check
```

Dil belirtmezsen renklendirme olmaz, düz metin kalır. Kod bloğuna başlık veya dosya adı eklenmiyor; istersen ilk satıra yorum olarak yaz.

## Görsel

Görselleri `src/assets/` içine koy; build sırasında WebP'ye çevrilip boyutlandırılır:

```markdown
![Alternatif metin](../../assets/diyagram.png)
```

![Koyu zeminde turkuaz bir gradyan](../../assets/diyagram.png)

Kapak görselini frontmatter'da verirsin: `cover` ve `coverAlt` (biri varsa diğeri zorunlu).

## Dipnot

Diyagramlar build sırasında SVG'ye çevriliyor,[^1] yani okuyucuya diyagram motoru indirmiyorsun.

[^1]: Bu bir dipnot. Metnin sonunda ayrı bir bölümde listeleniyor.

## Yatay çizgi

Üç tire:

---

## HTML ile ekler

Markdown'ın yetmediği yerde ham HTML çalışır. En çok işine yarayacak olanlar:

### Katlanır bölüm

<details>
<summary>Devamını oku</summary>

Uzun bir notu varsayılan olarak kapalı tutmak için kullan. İçinde Markdown değil, HTML bloğu olduğu için düz metin/HTML yaz.

</details>

### Altyazılı görsel

`figure` + `figcaption` ile görselin altına açıklama koyabilirsin:

<figure>
  <img src="/favicon.svg" alt="Site simgesi" width="32" height="32" />
  <figcaption>Görselin altındaki açıklama.</figcaption>
</figure>

### Tanım listesi

<dl>
  <dt>Frontmatter</dt>
  <dd>Yazı dosyasının en üstündeki ayar bloğu.</dd>
  <dt>Slug</dt>
  <dd>Dosya adından gelen URL parçası.</dd>
</dl>

### Küçük semantik etiketler

<abbr title="HyperText Markup Language">HTML</abbr>, H<sub>2</sub>O, x<sup>2</sup>, <ins>sonradan eklendi</ins>, <small>küçük not</small>, <time datetime="2026-10-24">24 Ekim 2026</time> ve alıntı kaynağı: <cite>Bir kitap</cite>.

Satır sonu için iki boşluk yerine `<br />` de kullanabilirsin:<br />ikinci satır.

### Markdown incelikleri

- Kaçış: `\*yıldız\*` yazınca yıldızlar görünür, italik olmaz.
- Referans bağlantı: `[metin][1]` ve dosyanın altında `[1]: https://ornek.com` → [pele][1].
- Sıralı listeyi `3.` ile başlatırsan numara 3'ten devam eder.
- Başlıkların otomatik `id`'si var: `## Tablo` → `#tablo` ile doğrudan bağlantı verebilirsin.
- Tablo hizalaması için `|:---|:---:|---:|` kullan.

[1]: https://pele.run

## Sınırlar

- **Bileşen gerekiyorsa** dosya `.mdx` olmalı; normal yazılar `.md`.
- **Diyagramlar** ayrı bir yazıda: [Yazı içinde diyagram](/yazilar/diyagramlar/).
- **ASCII sanatı** da ayrı: [Terminalden gelen manzara](/yazilar/ascii/).
- Kod bloğuna dosya adı/başlık eklenmiyor; tablo hücresinde blok kod kullanılmıyor.

Düzenli bir yayın takvimi yok; yazacak bir şey birikince güncelleniyor.
