import { useLang } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import './InfoPage.css';

const KOFI_URL = (import.meta.env.VITE_KOFI_URL as string | undefined) ?? 'https://ko-fi.com';
const GITHUB_URL = 'https://github.com';

export default function About() {
  const { lang } = useLang();
  const tr = lang === 'tr';

  const handleDonation = (source: string) => {
    trackEvent('donation_click', { source });
  };

  return (
    <div className="info-page">
      <SEO
        title={tr ? 'Hakkında' : 'About'}
        description={tr
          ? 'Op-Amp Atölyesi nedir, neden yapıldı ve nasıl çalışır?'
          : 'What is Op-Amp Workshop, why was it built and how does it work?'}
        path="/about"
        lang={lang}
      />
      <div className="wrap">

        {/* ── Hero ── */}
        <div className="info-hero">
          <div className="info-hero-inner">
            <div className="info-eyebrow">{tr ? 'Atölye hakkında' : 'About'}</div>
            <h1>{tr ? 'Op-Amp Atölyesi nedir?' : 'What is Op-Amp Workshop?'}</h1>
            <p>
              {tr
                ? 'İşlemsel yükselteçleri formüllerin ötesinde, etkileşimli simülasyon ve görsel anlatımla öğreten açık kaynaklı bir eğitim projesi.'
                : 'An open educational project that teaches operational amplifiers beyond formulas — through interactive simulation and visual storytelling.'}
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="info-body">

          {/* Motivation */}
          <div className="info-section">
            <h2>{tr ? 'Motivasyon' : 'Motivation'}</h2>
            <p>
              {tr
                ? 'Analog elektronik dersleri genellikle ezbere dayalı bir formül yığınıyla başlar. Op-amp kazancını hesaplamak kolaydır; ama o kazancın dalgayı nasıl biçimlendirdiğini, doyumun neden gerçekleştiğini, sanal toprak noktasının neden sıfır volt olduğunu sezgisel olarak kavramak çok daha zordur. Op-Amp Atölyesi bu boşluğu kapatmak için tasarlandı.'
                : 'Analog electronics courses often begin with a pile of memorised formulas. Calculating op-amp gain is easy; but grasping intuitively how that gain shapes the wave, why saturation happens, why the virtual ground is truly at zero volts — that is much harder. Op-Amp Workshop was designed to close that gap.'}
            </p>
          </div>

          <hr className="info-rule" />

          {/* How it works */}
          <div className="info-section">
            <h2>{tr ? 'Nasıl çalışır?' : 'How it works'}</h2>
            <p>
              {tr
                ? 'Platform üç katmandan oluşur: teorik bölümler, etkileşimli simülatör ve gerçek dünya uygulamaları. Her katman birbirini besler — bir kavramı okur, simülatörde anlık geri bildirimle denersin, ardından aynı topolojiyi gerçek bir cihazın içinde görmek için uygulamalar sekmesine geçersin.'
                : 'The platform has three layers: theory sections, an interactive simulator, and real-world applications. Each layer feeds the next — you read a concept, test it with instant feedback in the simulator, then switch to the Applications tab to see the same topology living inside a real device.'}
            </p>
          </div>

          <hr className="info-rule" />

          {/* Three pillars */}
          <div className="info-section">
            <h2>{tr ? 'Üç temel özellik' : 'Three core pillars'}</h2>
          </div>

          <div className="info-card-grid">
            <div className="info-card">
              <div className="info-card-label">{tr ? 'Teori' : 'Theory'}</div>
              <div className="info-card-title">{tr ? '15 derinlemesine bölüm' : '15 in-depth chapters'}</div>
              <div className="info-card-desc">
                {tr
                  ? 'İdeal op-amp modelinden slew-rate ve GBW\'ya kadar her kavram formül kutusu, değişken tanımları ve işlenmiş örneklerle anlatılır.'
                  : 'Every concept — from the ideal model to slew-rate and GBW — is explained with formula boxes, variable definitions and worked examples.'}
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-label">{tr ? 'Simülatör' : 'Simulator'}</div>
              <div className="info-card-title">{tr ? 'Canlı osiloskop ve şematik' : 'Live oscilloscope & schematic'}</div>
              <div className="info-card-desc">
                {tr
                  ? 'Rin, Rf, Vcc, dalga türü ve genlik — tüm parametreler kaydırıcıyla ayarlanır; şematik ve osiloskop anında güncellenir.'
                  : 'Rin, Rf, Vcc, waveform, amplitude — all parameters on sliders; the schematic and scope update instantly.'}
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-label">{tr ? 'Uygulamalar' : 'Applications'}</div>
              <div className="info-card-title">{tr ? 'Canlı Lab Kartı' : 'Live Lab Card'}</div>
              <div className="info-card-desc">
                {tr
                  ? 'Her demo, parametre değişince gerçek zamanlı güncellenen formüller, durum rozetleri ve ipuçlarıyla birlikte gelir.'
                  : 'Each demo ships with real-time formulas, status badges and tips that update as parameters change.'}
              </div>
            </div>
          </div>

          <hr className="info-rule" />

          {/* Language & access */}
          <div className="info-section">
            <h2>{tr ? 'İki dil, sıfır kurulum' : 'Two languages, zero setup'}</h2>
            <p>
              {tr
                ? 'Tüm içerik Türkçe ve İngilizce olarak ayrı ayrı yazılmıştır — makine çevirisi değil. Dil seçimi sağ üstteki düğmeyle anlık olarak değişir. Kurulum, kayıt ya da ücret gerekmez; yalnızca bir tarayıcı yeter.'
                : 'All content is written separately in Turkish and English — no machine translation. Language switches instantly via the button in the top-right corner. No install, sign-up or payment required; a browser is all you need.'}
            </p>
          </div>

          <hr className="info-rule" />

          {/* Open source */}
          <div className="info-section">
            <h2>{tr ? 'Açık kaynak' : 'Open source'}</h2>
            <p>
              {tr
                ? 'Op-Amp Atölyesi eğitim amaçlı, ücretsiz ve açık bir projedir. Kullandığı kütüphaneler ve yazı tipleri için lisanslarına saygı gösterilmiştir.'
                : 'Op-Amp Workshop is a free, open educational project. All libraries and typefaces are used in accordance with their respective licences.'}
            </p>
            <a
              className="about-github-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tr ? 'GitHub sayfasını ziyaret et' : 'Visit GitHub page'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              {tr ? 'GitHub\'da görüntüle ↗' : 'View on GitHub ↗'}
            </a>
          </div>

          <hr className="info-rule" />

          {/* Ko-fi donation card */}
          <div className="info-section">
            <h2>{tr ? 'Destek ol' : 'Support the project'}</h2>
            <p>
              {tr
                ? 'Op-Amp Atölyesi reklamsız ve tamamen ücretsizdir. Projeyi beğendiysen bir kahve ısmarlayabilirsin — sunucu ve geliştirme masraflarını karşılamak için her katkı değerlidir.'
                : 'Op-Amp Workshop is ad-free and completely free to use. If you enjoy the project, consider buying a coffee — every contribution helps cover hosting and development costs.'}
            </p>
          </div>

          <div className="kofi-card">
            <div className="kofi-card-left">
              <div className="kofi-icon" aria-hidden="true">☕</div>
              <div>
                <div className="kofi-title">Ko-fi</div>
                <div className="kofi-sub">
                  {tr ? 'Tek seferlik destek · Zorunlu değil' : 'One-time support · No obligation'}
                </div>
              </div>
            </div>
            <a
              className="kofi-btn"
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDonation('about_card')}
              aria-label={tr ? 'Ko-fi üzerinden destek ol' : 'Support on Ko-fi'}
            >
              {tr ? 'Kahve ısmarla' : 'Buy a coffee'}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
