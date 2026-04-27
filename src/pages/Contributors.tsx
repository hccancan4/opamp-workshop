import { useLang } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import './InfoPage.css';

interface TechEntry {
  name: string;
  url: string;
  desc_tr: string;
  desc_en: string;
}

const STACK: TechEntry[] = [
  {
    name: 'React 18',
    url: 'https://react.dev',
    desc_tr: 'UI bileşen ağacı, hook\'lar ve state yönetimi.',
    desc_en: 'UI component tree, hooks and state management.',
  },
  {
    name: 'Vite',
    url: 'https://vitejs.dev',
    desc_tr: 'Anında HMR\'lı geliştirme sunucusu ve üretim bundle\'ı.',
    desc_en: 'Development server with instant HMR and production bundler.',
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    desc_tr: 'Statik tip kontrolü; tüm bileşenler, hook\'lar ve veri modelleri tip güvenli.',
    desc_en: 'Static type checking; all components, hooks and data models are fully typed.',
  },
  {
    name: 'React Router v6',
    url: 'https://reactrouter.com',
    desc_tr: 'İstemci taraflı sayfa yönlendirme ve derin bağlantı desteği.',
    desc_en: 'Client-side page routing and deep link support.',
  },
  {
    name: 'Canvas 2D API',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
    desc_tr: 'Osiloskop dalgaları ve canlı şematik animasyonları için tarayıcı yerleşik çizim katmanı. Harici grafik kütüphanesi kullanılmadı.',
    desc_en: 'Browser-native drawing layer for oscilloscope waveforms and live schematic animations. No external chart library used.',
  },
  {
    name: 'Space Grotesk',
    url: 'https://fonts.google.com/specimen/Space+Grotesk',
    desc_tr: 'Temel gövde yazı tipi. Geometric sans-serif; okunabilir ve teknik hissiyatlı.',
    desc_en: 'Primary body typeface. Geometric sans-serif; readable with a technical feel.',
  },
  {
    name: 'IBM Plex Mono',
    url: 'https://fonts.google.com/specimen/IBM+Plex+Mono',
    desc_tr: 'Formüller, değerler, rozetler ve mono etiketler için sabit genişlikli yazı tipi.',
    desc_en: 'Monospaced typeface for formulas, values, badges and mono labels.',
  },
  {
    name: 'Fraunces',
    url: 'https://fonts.google.com/specimen/Fraunces',
    desc_tr: 'Hero başlıklarındaki eğik serif vurgu satırları için optik boyutlu değişken font.',
    desc_en: 'Optical-size variable font for italic serif accent lines in hero headings.',
  },
  {
    name: 'Google Fonts',
    url: 'https://fonts.google.com',
    desc_tr: 'Yazı tiplerinin barındırılması ve CDN üzerinden sunulması.',
    desc_en: 'Hosting and CDN delivery for typefaces.',
  },
];

export default function Contributors() {
  const { lang } = useLang();
  const tr = lang === 'tr';

  return (
    <div className="info-page">
      <SEO
        title={tr ? 'Katkıda Bulunanlar' : 'Contributors'}
        description={tr
          ? 'Op-Amp Atölyesi\'nin üzerine inşa edildiği açık kaynak araçlar ve yazı tipleri.'
          : 'The open-source tools and typefaces that Op-Amp Workshop is built on.'}
        path="/contributors"
        lang={lang}
      />
      <div className="wrap">

        {/* ── Hero ── */}
        <div className="info-hero">
          <div className="info-hero-inner">
            <div className="info-eyebrow">{tr ? 'Katkıda bulunanlar' : 'Contributors'}</div>
            <h1>{tr ? 'Kullanılan teknolojiler' : 'Technologies used'}</h1>
            <p>
              {tr
                ? 'Op-Amp Atölyesi tamamen açık kaynaklı araç ve yazı tiplerinin üzerine inşa edildi. Bu sayfada onları ve katkılarını bulabilirsin.'
                : 'Op-Amp Workshop is built entirely on open-source tools and typefaces. This page lists them and their contributions.'}
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="info-body">

          {/* Tech stack table */}
          <div className="info-section">
            <h2>{tr ? 'Teknoloji yığını' : 'Technology stack'}</h2>
          </div>

          <div className="tech-list">
            {STACK.map(t => (
              <div className="tech-row" key={t.name}>
                <div className="tech-name">{t.name}</div>
                <div className="tech-desc">
                  {tr ? t.desc_tr : t.desc_en}{' '}
                  <a href={t.url} target="_blank" rel="noopener noreferrer">
                    {tr ? 'Siteyi ziyaret et ↗' : 'Visit site ↗'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <hr className="info-rule" />

          {/* Design notes */}
          <div className="info-section">
            <h2>{tr ? 'Tasarım notları' : 'Design notes'}</h2>
            <p>
              {tr
                ? 'Renk paleti, eski elektronik laboratuvar defterlerinden ilham alır: sıcak kağıt tonları (<strong>paper</strong>, <strong>paper-warm</strong>), mürekkep siyahı (<strong>ink</strong>), bakır (<strong>copper</strong>), elektrik mavisi (<strong>volt</strong>) ve yeşil (<strong>moss</strong>). Izgara arka planı 32×32 px\'lik milimetrik kâğıt dokusunu simüle eder.'
                : 'The colour palette draws inspiration from old electronics lab notebooks: warm paper tones (<strong>paper</strong>, <strong>paper-warm</strong>), ink black (<strong>ink</strong>), copper (<strong>copper</strong>), electric blue (<strong>volt</strong>) and green (<strong>moss</strong>). The grid background simulates a 32×32 px graph-paper texture.'}
            </p>
            <p>
              {tr
                ? 'UI bileşenlerinin tamamı harici bir komponent kütüphanesi kullanılmadan sıfırdan yazıldı: kaydırıcılar, sekme panelleri, osiloskop, chatbot ve bilgi kartları dahil. Çerçeve maliyeti yoktur — yalnızca React, CSS değişkenleri ve tarayıcı API\'leri.'
                : 'All UI components were written from scratch without an external component library: sliders, tab panels, oscilloscope, chatbot and insight cards included. Zero framework overhead — just React, CSS variables and browser APIs.'}
            </p>
          </div>

          <hr className="info-rule" />

          {/* Contribute */}
          <div className="info-section">
            <h2>{tr ? 'Katkı sağla' : 'Contribute'}</h2>
            <p>
              {tr
                ? 'Bir hata fark ettiysen, yeni bir teori bölümü önermek istiyorsan ya da dil çevirilerini iyileştirmek istiyorsan Geri Bildirim sayfasını kullanabilirsin. Her türlü katkı değerlidir.'
                : 'If you spot a bug, want to propose a new theory chapter, or improve the language translations, use the Feedback page. All contributions are valued.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
