# Op-Amp Atolyesi

https://opamp-workshop.vercel.app/

Tarayicida calisan, iki dilli (TR/EN), etkilesimli bir islemsel yukseltec (op-amp) ogrenme uygulamasi.

- Canli simulatorde devre parametrelerini degistirip dalga bicimlerini izleyebilirsiniz.
- Teori bolumlerinde temel kavramlari adim adim ogrenebilirsiniz.
- Uygulamalar sayfasinda gercek dunyaya yakin 3 demo bulunur.

## Ozellikler

- `Simulator`: Inverting, non-inverting, buffer, comparator ve 2-stage cascade topolojileri
- `Waveform scope`: Canvas tabanli, anlik Vin/Vout gosterimi
- `Theory`: 15 bolumluk aciklayici teori akisi
- `Applications`: Audio preamp, Schmitt trigger, Sallen-Key LPF
- `i18n`: Turkce/Ingilizce arayuz
- `SEO`: Sayfa bazli meta, canonical ve sosyal paylasim etiketleri
- `Feedback`: Formspree entegrasyonlu geri bildirim formu

## Teknoloji

- React 19
- TypeScript
- Vite
- React Router
- ESLint

## Kurulum

Gereksinimler:

- Node.js 20+
- npm 10+

Adimlar:

```bash
npm install
cp .env.example .env
npm run dev
```

Gelisme sunucusu varsayilan olarak `http://localhost:5173` adresinde calisir.

## Ortam Degiskenleri

Tanimli degiskenler `.env.example` dosyasinda bulunur:

- `VITE_GA_MEASUREMENT_ID`: GA4 olcum kimligi
- `VITE_FORMSPREE_ID`: Formspree form kimligi
- `VITE_KOFI_URL`: Ko-fi destek baglantisi
- `VITE_SITE_URL`: Uygulamanin kanonik site adresi

## Komutlar

- `npm run dev`: Gelistirme sunucusunu baslatir
- `npm run build`: TypeScript derlemesi + production build alir
- `npm run preview`: Production build onizleme sunucusunu acar
- `npm run lint`: ESLint ile kod kontrolu yapar

## Proje Yapisi

```text
src/
  components/      # UI, layout, chat, SEO, hata yakalama
  contexts/        # Dil (i18n) baglam yonetimi
  i18n/            # Metinler ve locale icerigi
  lib/             # Simulator hesaplari, analytics, bilgi tabani
  pages/           # Home, Simulator, Theory, Applications vb.
  styles/          # Global stiller
```

## Dagitim

Proje Vercel uzerinden dagitima uygun olarak hazirlanmistir (`vercel.json`).

Yerelde production kontrolu icin:

```bash
npm run build
npm run preview
```

## Katki

Katki akisi ve kod duzeni notlari icin `CONTRIBUTING.md` dosyasina bakabilirsiniz.
