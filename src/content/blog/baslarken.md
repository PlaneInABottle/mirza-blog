---
title: 'Başlarken'
description: 'Bu blog neden var, burada ne bulacaksın ve teknik olarak nasıl çalışıyor.'
date: 2026-10-24
tags: ['meta']
cover: ../../assets/kapak.png
coverAlt: 'Koyu maviden turkuaza geçen soyut bir gradyan'
---

Uzun süredir aklımda olan şeyi sonunda kurdum: kendi yazılarımı koyduğum, kimseye bağlı olmayan, sade bir yer. Sosyal medya akışında kaybolmayan, aradığımda bulabildiğim notlar.

## Burada ne olacak

- Öğrendiğim şeylerin kısa notları
- Zaman zaman daha uzun denemeler
- Teknik konularda "bunu bir daha unutursam buraya bakayım" yazıları

Düzenli bir yayın takvimi yok. Ne zaman yazacak bir şey birikirse.

## Nasıl çalışıyor

Site tamamen statik: yazılar Markdown dosyası, build çıktısı düz HTML. Veritabanı, sunucu tarafı kod, çerez yok.

```bash
npm run dev     # lokalde yazarken
npm run build   # dist/ üretir
```

Bir yazı eklemek için `src/content/blog/` altına bir `.md` dosyası koymak yeterli. Başlık, tarih ve açıklama dosyanın en üstündeki alanlarda duruyor.

> Basit tutmak bir özellik. Karmaşık bir sistem, yazmayı bırakmanın en yaygın sebebi.

## Teknik seçimler

| Parça | Seçim | Neden |
| --- | --- | --- |
| Site üretici | Astro | Markdown odaklı, varsayılan olarak JS göndermiyor |
| Diyagram | pele | Build sırasında SVG, okuyucuya JS yok |
| Stil | Düz CSS | Derleme adımı yok, tek dosya |

Resimler build sırasında otomatik olarak yeniden boyutlandırılıp WebP/AVIF'e çevriliyor, yani yazıya 5 MB'lık bir fotoğraf koymak siteyi yavaşlatmıyor.
