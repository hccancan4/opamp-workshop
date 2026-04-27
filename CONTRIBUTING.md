# Contributing Guide

Bu proje egitsel bir op-amp uygulamasidir. Teknik akis ve mevcut davranis korunarak katkida bulunulmasi beklenir.

## Temel Ilkeler

- Mevcut simulator davranisini degistiren degisikliklerde acik teknik gerekce yazin.
- UI/icerik duzeltmelerinde mevcut dil (TR/EN) ve terminoloji tutarliligini koruyun.
- Kucuk, odakli ve okunabilir degisiklikler yapin.

## Gelistirme Akisi

1. Depoyu klonlayin ve bagimliliklari kurun.
2. `.env.example` dosyasini `.env` olarak kopyalayin.
3. Degisikligi yapin.
4. Lint ve build komutlarini calistirin.

```bash
npm install
cp .env.example .env
npm run lint
npm run build
```

## Kod Standartlari

- TypeScript tip guvenligini koruyun.
- Gereksiz bagimlilik ve kullanilmayan kod birakmayin.
- Buyuk yeniden yazim yerine minimal ve hedefe yonelik refactor tercih edin.

## Pull Request Notu

PR aciklamasinda su 3 noktayi belirtin:

- Ne degisti?
- Neden degisti?
- Davranis degismedigi nasil dogrulandi? (lint/build, manuel kontrol vb.)
