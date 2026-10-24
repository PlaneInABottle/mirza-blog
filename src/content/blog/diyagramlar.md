---
title: 'Yazı içinde diyagram'
description: 'Markdown içine Mermaid diyagramı yazmak, build sırasında SVG''ye çevirmek ve okları akıtmak.'
date: 2026-10-24
tags: ['astro', 'pele', 'mermaid']
cover: ../../assets/diyagram.png
coverAlt: 'Koyu zeminde turkuaz bir gradyan'
---

Diyagramlar bu blogda bir görsel değil, yazının parçası. Bu yüzden onları ekran görüntüsü olarak değil, doğrudan Markdown içine yazıyorum:

````markdown
```mermaid
flowchart LR
  A[Yazı] --> B[SVG]
```
````

Site build edilirken `mermaid` kod blokları [pele](https://pele.run) ile SVG'ye çevriliyor. Yani sayfayı açan kişiye diyagram motoru indirmiyorum; ortaya çıkan şey düz bir `<svg>`.

## Bir akış

Aşağıdaki diyagramın okları akıyor — CSS ile, JavaScript olmadan. Hareket hassasiyeti olan okuyucularda animasyon otomatik olarak kapanıyor.

```mermaid
flowchart LR
  Yaz[Yaz] --> Sor{Markdown?}
  Sor -- evet --> Blok[Diyagram]
  Blok --> SVG[SVG]
  Sor -- hayır --> Yaz
```

Diyagramlar `flowchart LR` gibi yatay yazıldığında geniş ekranda yatay, telefonda ise dikey yerleşime geçiyor. Yani küçük ekranda küçülen bir resim değil, yeniden düzenlenmiş bir diyagram görüyorsun.

## Sıra diyagramı

Aynı sözdizimi, farklı diyagram tipi:

```mermaid
sequenceDiagram
  participant Z as Ziyaretçi
  participant C as Cloudflare
  participant S as Sunucu
  Z->>C: GET /yazilar/
  C->>S: önbellekte yoksa
  S-->>C: HTML
  C-->>Z: HTML
```

## Neden böyle

İki alternatif vardı: diyagramı tarayıcıda çizmek (sayfaya ~1.6 MB JavaScript) ya da build sırasında headless tarayıcı çalıştırmak (build başına ekstra bağımlılık). Pele ikisini de gerektirmiyor: saf JavaScript, tarayıcısız, çıktısı tema değişkenleriyle renklenen SVG.

Sonuç: sayfa ağırlığı değişmiyor, diyagram karanlık moda uyuyor ve JavaScript kapalıyken de görünüyor.
