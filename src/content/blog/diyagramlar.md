---
title: 'Yazı içinde diyagram'
description: 'Mermaid diyagramlarının tamamı: hangi tip neye benziyor, erişilebilir ad nasıl verilir, genişlik ve animasyon kuralları.'
date: 2026-10-24
tags: ['astro', 'pele', 'mermaid']
cover: ../../assets/diyagram.png
coverAlt: 'Koyu zeminde turkuaz bir gradyan'
---

Diyagramı ekran görüntüsü olarak değil, doğrudan Markdown'a yazabilirsin:

````markdown
```mermaid
flowchart LR
  A[Yazı] --> B[SVG]
```
````

Build sırasında `mermaid` blokları [pele](https://pele.run) ile SVG'ye çevriliyor. Okuyucuya diyagram motoru indirmiyorsun; ortaya düz bir `<svg>` çıkıyor. Aşağıda desteklenen tiplerin tamamı, her biri çalışan bir örnekle duruyor.

## Erişilebilir ad: accTitle ve title

Ekran okuyucu bir SVG'yi "isimsiz grafik" olarak duyurmasın diye diyagrama ad ver. İki yol var:

- Tip `accTitle` destekliyorsa blok içine `accTitle: …` (ve istersen `accDescr: …`) yaz. pele bunları `<title>` ve `<desc>` etiketlerine çevirir.
- Tip desteklemiyorsa (block, C4, kanban, mindmap) blok başlığına `title="…"` ekle; eklenti bunu SVG'ye `aria-label` olarak basar.

Ad vermezsen build sırasında uyarı çıkar.

## Tip kataloğu

| Tip | Erişilebilir ad | Genişlik / not |
| --- | --- | --- |
| `flowchart` | `accTitle` | Kolona sığar, mobilde yeniden yerleşir |
| `block-beta` | `title="…"` | Kutulu yerleşim |
| `sequenceDiagram` | `accTitle` | Katılımcı + mesaj |
| `journey` | `accTitle` | Yolculuk/deneyim |
| `classDiagram` | `accTitle` | Sınıf ve ilişki |
| `stateDiagram-v2` | `accTitle` | Durum geçişi |
| `erDiagram` | `accTitle` | Varlık-ilişki |
| `requirementDiagram` | `accTitle` | Gereksinim |
| `C4Context` | `title="…"` | Sistem bağlamı |
| `architecture-beta` | `accTitle` | Servis/grup mimarisi |
| `pie` | `accTitle` | Pay dağılımı |
| `quadrantChart` | `accTitle` | İki eksenli konumlandırma |
| `xychart-beta` | `accTitle` | Çubuk/çizgi grafik |
| `treemap-beta` | `accTitle` | Hiyerarşik alan |
| `sankey-beta` | `accTitle` | Akış hacmi |
| `packet-beta` | `accTitle` | Paket alanları, çok geniş |
| `gantt` | `accTitle` | Takvim, geniş |
| `timeline` | `accTitle` | Zaman çizgisi |
| `gitGraph` | `accTitle` | Commit akışı |
| `kanban` | `title="…"` | Pano |
| `mindmap` | `title="…"` | Dallanan başlıklar |

## Akış diyagramı

```mermaid
flowchart LR
  accTitle: Markdown metninden SVG akışı
  accDescr: Yazı Markdown ise diyagrama dönüşüyor, değilse metin olarak kalıyor.
  Yaz[Yaz] --> Sor{Markdown?}
  Sor -- evet --> Blok[Diyagram]
  Blok --> SVG[SVG]
  Sor -- hayır --> Yaz
```

## Blok yerleşimi

```mermaid title="Blok yerleşimi"
block-beta
  columns 3
  a["Yazı"] b["Diyagram"] c["SVG"]
```

## Sıra diyagramı

```mermaid
sequenceDiagram
  accTitle: Sayfa isteği sırası
  accDescr: Ziyaretçi Cloudflare üzerinden sunucuya ulaşıyor; önbellekte yoksa sunucu yanıtlıyor.
  participant Z as Ziyaretçi
  participant C as Cloudflare
  participant S as Sunucu
  Z->>C: GET /yazilar/
  C->>S: önbellekte yoksa
  S-->>C: HTML
  C-->>Z: HTML
```

## Yolculuk

```mermaid
journey
  accTitle: Yazı yazma yolculuğu
  title Yazı yazma
  section Fikir
    Not al: 5: Ben
    Taslak: 4: Ben
  section Yayın
    Düzelt: 3: Ben
    Yayınla: 5: Ben
```

## Sınıf diyagramı

```mermaid
classDiagram
  accTitle: Yazı ve etiket ilişkisi
  class Yazi {
    +String baslik
    +Date tarih
    +yayinla()
  }
  class Etiket {
    +String ad
  }
  Yazi "1" --> "*" Etiket : taşır
```

## Durum diyagramı

```mermaid
stateDiagram-v2
  accTitle: Taslak akışı
  [*] --> Taslak
  Taslak --> Yayinda : draft silinir
  Yayinda --> Taslak : geri çekilir
  Yayinda --> [*]
```

## Varlık-ilişki diyagramı

```mermaid
erDiagram
  accTitle: İçerik modeli
  YAZI ||--o{ ETIKET : taşır
  YAZI {
    string baslik
    date tarih
  }
  ETIKET {
    string ad
  }
```

## Gereksinim diyagramı

```mermaid
requirementDiagram
  accTitle: Erişilebilirlik gereksinimi
  requirement erisim {
    id: 1
    text: "Sayfa JavaScript olmadan okunmalı"
    risk: high
    verifymethod: test
  }
```

## C4 bağlam diyagramı

```mermaid title="Sistem bağlamı"
C4Context
  Person(okur, "Okur")
  System(blog, "Blog", "Statik site")
  Rel(okur, blog, "Okur")
```

## Mimari diyagramı

```mermaid
architecture-beta
  accTitle: Sistem mimarisi
  group api(cloud)[API]
  service web(server)[Web] in api
  service db(database)[Veritabanı] in api
  web:R -- L:db
```

## Pasta grafiği

```mermaid
pie
  accTitle: Yazı dağılımı
  "Not" : 6
  "Deneme" : 3
  "Teknik" : 4
```

## Kadran grafiği

```mermaid
quadrantChart
  accTitle: Yazı öncelikleri
  x-axis Az emek --> Çok emek
  y-axis Az etki --> Çok etki
  Hızlı not: [0.2, 0.4]
  Uzun deneme: [0.8, 0.9]
```

## XY grafiği

Eksen etiketlerinde Türkçe karakter kullanacaksan tırnak içine al.

```mermaid
xychart-beta
  accTitle: Aylık yazı sayısı
  x-axis ["Oca", "Şub", "Mar", "Nis"]
  y-axis 0 --> 10
  bar [2, 4, 3, 6]
```

## Ağaç haritası

```mermaid
treemap-beta
  accTitle: İçerik dağılımı
  "Blog"
    "Yazılar": 10
    "Diyagramlar": 5
    "ASCII": 3
```

## Sankey

```mermaid
sankey-beta
  Yazı,Okur,30
  Yazı,Arama,20
  Okur,Paylaşım,10
```

## Paket yapısı

Kolona sığmadığı için yatay kaydırılıyor.

```mermaid wide
packet-beta
  accTitle: Paket alanları
  0-15: "Kaynak port"
  16-31: "Hedef port"
  32-63: "Sıra numarası"
```

## Gantt

```mermaid wide
gantt
  accTitle: Yayın takvimi
  title Yayın takvimi
  dateFormat YYYY-MM-DD
  section Yazı
  Taslak :a1, 2026-01-01, 5d
  Düzeltme :a2, after a1, 3d
  section Yayın
  Build :a3, after a2, 1d
```

## Zaman çizgisi

```mermaid
timeline
  accTitle: Yayın geçmişi
  2026 : İlk yazı : Diyagramlar : ASCII
```

## Commit grafiği

```mermaid
gitGraph
  accTitle: Yayın akışı
  commit id: "taslak"
  branch yayin
  checkout yayin
  commit id: "build"
  commit id: "deploy"
```

## Kanban

```mermaid title="Yayın panosu"
kanban
  Taslak
    yazi1[İlk yazı]
  Yayında
    yazi2[Diyagramlar]
```

## Zihin haritası

```mermaid title="Zihin haritası"
mindmap
  root((Blog))
    Notlar
    Denemeler
    Teknik
```

## Genişlik ve mobil

Metin kolonu ~632 piksel. 700 pikselden geniş diyagramlar `diagram--scroll` sınıfını alır ve küçülmek yerine **yatay kaydırılır**; böylece yazı okunmaz hâle gelmez. Bu durumda build uyarı verir; kabul ediyorsan bloğa `wide` ekleyip uyarıyı susturabilirsin.

Her diyagram iki kez çiziliyor: geniş ve dar (dikey yerleşimli). 672 pikselin altında dar sürüm gösteriliyor, yani telefonda küçülen bir resim değil, yeniden düzenlenmiş bir diyagram görüyorsun.

## Ok animasyonu

Flowchart oklarında CSS ile akan kesik çizgi animasyonu var — JavaScript olmadan. Hareket hassasiyeti olan okuyucularda animasyon otomatik kapanıyor. pele'nin kendi kesikli kenarları bu animasyona dahil edilmiyor.

## Neden pele

İki alternatif var: diyagramı tarayıcıda çizmek (sayfaya ~1.6 MB JavaScript) ya da build sırasında headless tarayıcı çalıştırmak (build başına ekstra bağımlılık). pele ikisini de gerektirmiyor: saf JavaScript, tarayıcısız, çıktısı tema değişkenleriyle renklenen SVG.

Yanlış sözdizimi build'i durduruyor ve hangi dosyada olduğunu söylüyor. Bir tip desteklenmezse `pele` yerine `rehype-mermaid` gibi bir alternatife geçebilirsin; yazılar değişmiyor, sadece `astro.config.mjs` değişiyor.
