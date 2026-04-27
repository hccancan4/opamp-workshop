import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { InvertingSVG, NonInvertingSVG, BufferSVG, ComparatorSVG, CascadeSVG, OpAmpSymbolSVG } from '../components/Circuits/CircuitSVGs';
import SEO from '../components/SEO';
import './Home.css';

type CircKey = 'inverting' | 'noninv' | 'buffer' | 'comp' | 'cascade';

const CIRCUITS: Record<CircKey, {
  name_tr: string; name_en: string;
  desc_tr: string; desc_en: string;
  formula: string;
  uses_tr: string[]; uses_en: string[];
  svg: React.ReactNode;
}> = {
  inverting: {
    name_tr: 'Eviren Yükselteç', name_en: 'Inverting Amplifier',
    desc_tr: 'Giriş Rin üzerinden eksi girişe verilir; Rf çıkıştan eksi girişe bağlı geri besleme yolunu oluşturur. Çıkış girişle tam 180° ters fazdadır.',
    desc_en: 'Input feeds through Rin into the inverting input; Rf forms the feedback path. Output is 180° out of phase.',
    formula: 'A = − Rf / Rin',
    uses_tr: ['audio preamp', 'toplayıcı', 'sensör arayüzü', 'türev alıcı'],
    uses_en: ['audio preamp', 'summing', 'sensor front-end', 'differentiator'],
    svg: <InvertingSVG />,
  },
  noninv: {
    name_tr: 'Evirmeyen Yükselteç', name_en: 'Non-Inverting Amplifier',
    desc_tr: 'Giriş doğrudan artı girişe verilir. Çıkış giriş ile aynı fazdadır; kazanç daima ≥ 1.',
    desc_en: 'Input is tied directly to the non-inverting pin. Output stays in phase; gain is always ≥ 1.',
    formula: 'A = 1 + (Rf / Rin)',
    uses_tr: ['yüksek-Z tampon', 'sensör yükselteci', 'ölçüm ön katı'],
    uses_en: ['high-Z buffer', 'sensor amp', 'measurement front-end'],
    svg: <NonInvertingSVG />,
  },
  buffer: {
    name_tr: 'Gerilim İzleyici (Buffer)', name_en: 'Voltage Follower (Buffer)',
    desc_tr: 'Çıkış doğrudan eksi girişe bağlıdır — tam birim kazanç. Yüksek empedanslı kaynağı düşük empedanslı yüke iletmek için kullanılır.',
    desc_en: 'Output wires straight back to the inverting input — exact unity gain. Isolates a high-impedance source from a low-impedance load.',
    formula: 'A = 1',
    uses_tr: ['empedans uyumlama', 'sinyal izolasyonu', 'ADC ön katı'],
    uses_en: ['impedance matching', 'signal buffering', 'ADC front-end'],
    svg: <BufferSVG />,
  },
  comp: {
    name_tr: 'Karşılaştırıcı', name_en: 'Comparator',
    desc_tr: 'Geri besleme yoktur. İki giriş arasındaki mili volt bile çıkışı +Vcc veya −Vee\'ye fırlatır.',
    desc_en: 'No feedback. Even millivolts of difference slam the output to +Vcc or −Vee.',
    formula: 'Vout = +Vcc  if  V+ > V−  else  −Vee',
    uses_tr: ['eşik algılama', 'zero-cross detektör', 'LDR sokak lambası'],
    uses_en: ['threshold detect', 'zero-cross detect', 'LDR street lamp'],
    svg: <ComparatorSVG />,
  },
  cascade: {
    name_tr: 'Kaskad (2 Katlı)', name_en: 'Cascade (2-Stage)',
    desc_tr: 'İki eviren yükselteç peş peşe. Toplam kazanç iki kazancın çarpımı; iki eksi pozitif kazanç verir.',
    desc_en: 'Two inverting stages in series. Total gain is the product; two inversions cancel to give positive overall gain.',
    formula: 'A = (−Rf1/Rin1) · (−Rf2/Rin2)',
    uses_tr: ['yüksek kazanç', 'hassas ölçüm', 'sinyal restorasyonu'],
    uses_en: ['high gain', 'precision measurement', 'signal recovery'],
    svg: <CascadeSVG />,
  },
};

function MiniScope() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const phase  = useRef(0);
  const raf    = useRef<number>(0);

  useEffect(() => {
    function frame() {
      const c = canvas.current;
      if (!c) return;
      const ctx = c.getContext('2d')!;
      const W = c.width, H = c.height;
      const centerY = H / 2;
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = 'rgba(200,191,168,0.5)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 8; i++) {
        ctx.beginPath(); ctx.moveTo((i/8)*W, 0); ctx.lineTo((i/8)*W, H); ctx.stroke();
      }
      for (let j = 0; j <= 5; j++) {
        ctx.beginPath(); ctx.moveTo(0, (j/5)*H); ctx.lineTo(W, (j/5)*H); ctx.stroke();
      }

      const N = 120;
      const vinPath  = new Path2D();
      const voutPath = new Path2D();
      for (let i = 0; i <= N; i++) {
        const t = (i/N) * Math.PI * 4 + phase.current;
        const vin  = Math.sin(t);
        const vout = Math.max(-1.2, Math.min(1.2, vin * -2));
        const x  = (i/N) * W;
        const y1 = centerY - vin  * (H/2 - 4) * 0.5;
        const y2 = centerY - vout * (H/2 - 4) * 0.5;
        if (i===0) { vinPath.moveTo(x, y1); voutPath.moveTo(x, y2); }
        else        { vinPath.lineTo(x, y1); voutPath.lineTo(x, y2); }
      }
      ctx.strokeStyle = '#B4531A'; ctx.lineWidth = 1.5; ctx.stroke(voutPath);
      ctx.strokeStyle = '#1F4BD8'; ctx.lineWidth = 1.5; ctx.stroke(vinPath);
      phase.current += 0.035;
      raf.current = requestAnimationFrame(frame);
    }
    raf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return <canvas ref={canvas} width={320} height={120} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export default function Home() {
  const { lang, t } = useLang();
  const [activeCircuit, setActiveCircuit] = useState<CircKey>('inverting');
  const circ = CIRCUITS[activeCircuit];

  const CIRC_TABS: { key: CircKey; label: string }[] = [
    { key: 'inverting', label: lang === 'tr' ? t.ct_inv : t.ct_inv },
    { key: 'noninv',   label: t.ct_non },
    { key: 'buffer',   label: t.ct_buf },
    { key: 'comp',     label: t.ct_cmp },
    { key: 'cascade',  label: t.ct_csc },
  ];

  return (
    <main>
      <SEO
        title={undefined}
        description={lang === 'tr'
          ? 'İşlemsel yükselteçlerin görsel, etkileşimli ve iki dilli öğrenme atölyesi. Canlı simülatör, 15 teori bölümü ve gerçek dünya uygulamaları.'
          : 'A visual, interactive, bilingual workshop for operational amplifiers. Live simulator, 15 theory chapters and real-world applications.'}
        path="/"
        lang={lang}
      />
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-stamp">
                <span className="live-dot"/>
                <span>{t.hero_stamp}</span>
              </div>
              <h1 className="hero-title">
                {t.hero_h1_1} <em className="serif-em">{t.hero_h1_2}</em>{' '}
                {t.hero_h1_3}<br/>
                {t.hero_h1_4} <span className="underline-copper">{t.hero_h1_5}</span>
              </h1>
              <p className="hero-lede">{t.hero_lede}</p>
              <div className="hero-ctas">
                <Link to="/simulator" className="btn btn-primary">
                  {t.hero_cta_1}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
                <button className="btn btn-ghost" onClick={() => document.getElementById('whatis')?.scrollIntoView({ behavior: 'smooth' })}>
                  {t.hero_cta_2}
                </button>
              </div>
              <div className="hero-meta">
                <div>
                  <div className="mv">5<span className="unit">×</span></div>
                  <div className="ml">{t.hm1_l}</div>
                </div>
                <div>
                  <div className="mv">9+</div>
                  <div className="ml">{t.hm2_l}</div>
                </div>
                <div>
                  <div className="mv">3</div>
                  <div className="ml">{t.hm3_l}</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="blueprint">
                <div className="blueprint-head">
                  <div className="blueprint-title">
                    <span>Circuit · Live</span>
                    <strong>{t.bp_title}</strong>
                  </div>
                  <div className="blueprint-id">
                    <span>REV</span>
                    <strong>A1</strong>
                  </div>
                </div>
                <div className="blueprint-canvas">
                  <MiniScope />
                </div>
                <div className="blueprint-foot">
                  <div className="cell">
                    <div className="key">{t.bp_f1}</div>
                    <div className="val signal">~1 V</div>
                  </div>
                  <div className="cell">
                    <div className="key">{t.bp_f2}</div>
                    <div className="val signal">~2 V</div>
                  </div>
                  <div className="cell">
                    <div className="key">{t.bp_f3}</div>
                    <div className="val">±15 V</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MARQUEE ====== */}
      <div className="marquee">
        <div className="marquee-inner" aria-hidden="true">
          {['Inverting Amplifier', 'Non-Inverting', 'Voltage Follower', 'Comparator', '2-Stage Cascade',
            'Virtual Ground', 'CMRR', 'Slew Rate', 'GBW', 'Op-Amp Atölyesi',
            'Inverting Amplifier', 'Non-Inverting', 'Voltage Follower', 'Comparator', '2-Stage Cascade',
            'Virtual Ground', 'CMRR', 'Slew Rate', 'GBW', 'Op-Amp Atölyesi'].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ====== WHAT IS ====== */}
      <section className="section" id="whatis">
        <div className="wrap">
          <div className="whatis-grid">
            <div>
              <p className="eyebrow"><span className="num">01</span>{t.whatis_eye}</p>
              <h2 className="heading">
                {t.whatis_h1} <em className="serif-em">{t.whatis_h2}</em> {t.whatis_h3}
              </h2>
              <p className="lede" style={{ marginBottom: '2.5rem' }}>{t.whatis_lede}</p>

              <div className="prop-list">
                {[
                  { name: t.pn_1, desc: t.pd_1, val: '10⁵×' },
                  { name: t.pn_2, desc: t.pd_2, val: '∞ Ω' },
                  { name: t.pn_3, desc: t.pd_3, val: '0 Ω' },
                  { name: t.pn_4, desc: t.pd_4, val: '∞ Hz' },
                  { name: t.pn_5, desc: t.pd_5, val: '>80 dB' },
                  { name: t.pn_6, desc: t.pd_6, val: 'V/μs' },
                ].map((row, i) => (
                  <div className="prop-row" key={i}>
                    <span><span className="idx">{String(i+1).padStart(2,'0')}</span><span className="name">{row.name}</span></span>
                    <span className="desc">{row.desc}</span>
                    <span className="val">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="whatis-card">
                <div className="stamp">{t.card_stamp}</div>
                <h3>{t.card_h}</h3>
                <div className="svg-wrap">
                  <OpAmpSymbolSVG />
                </div>
                <p>{t.card_p}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== JOURNEY ====== */}
      <section className="section" id="journey">
        <div className="wrap">
          <p className="eyebrow"><span className="num">02</span>{t.journey_eye}</p>
          <h2 className="heading">
            <em className="serif-em">{t.journey_h1}</em> {t.journey_h2}
          </h2>
          <p className="lede">{t.journey_lede}</p>

          <div className="journey">
            {[
              { num: '1', h: t.js1_h, p: t.js1_p, tags: ['theory', 'CMRR', 'GBW'] },
              { num: '2', h: t.js2_h, p: t.js2_p, tags: ['Rin', 'Rf', 'Vcc', 'waveform'] },
              { num: '3', h: t.js3_h, p: t.js3_p, tags: ['LDR', 'EKG', 'audio'] },
            ].map((step) => (
              <div className="j-step" key={step.num}>
                <span className="j-num">{step.num}</span>
                <h3>{step.h}</h3>
                <p>{step.p}</p>
                <div className="j-tags">
                  {step.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CIRCUITS ====== */}
      <section className="section" id="circuits">
        <div className="wrap">
          <p className="eyebrow"><span className="num">03</span>{t.circ_eye}</p>
          <h2 className="heading">
            {t.circ_h1} <em className="serif-em">{t.circ_h2}</em> {t.circ_h3}
          </h2>
          <p className="lede" style={{ marginBottom: '0' }}>{t.circ_lede}</p>

          <div className="circuit-panel">
            <div className="circuit-list">
              {CIRC_TABS.map((tab, i) => (
                <button
                  key={tab.key}
                  className={`circuit-btn${activeCircuit === tab.key ? ' active' : ''}`}
                  onClick={() => setActiveCircuit(tab.key)}
                  aria-selected={activeCircuit === tab.key}
                >
                  <span className="circ-num">{String(i+1).padStart(2,'0')}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="circuit-body">
              <div className="circuit-canvas">
                {circ.svg}
              </div>
              <div className="circuit-meta">
                <div>
                  <h3>{lang === 'tr' ? circ.name_tr : circ.name_en}</h3>
                  <p className="desc">{lang === 'tr' ? circ.desc_tr : circ.desc_en}</p>
                  <div className="circuit-uses">
                    {(lang === 'tr' ? circ.uses_tr : circ.uses_en).map(u => (
                      <span className="tag" key={u}>{u}</span>
                    ))}
                  </div>
                </div>
                <div className="circuit-formula">
                  <div className="flabel">{t.form_label}</div>
                  <div className="fval">{circ.formula}</div>
                  <Link to={`/simulator?c=${activeCircuit}`} className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}>
                    {lang === 'tr' ? 'Simülatörde aç →' : 'Open in simulator →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== APPLICATIONS ====== */}
      <section className="section" id="apps">
        <div className="wrap">
          <p className="eyebrow"><span className="num">04</span>{t.apps_eye}</p>
          <h2 className="heading">
            {t.apps_h1} <em className="serif-em">{t.apps_h2}</em> {t.apps_h3}
          </h2>
          <p className="lede">{t.apps_lede}</p>

          <div className="apps-grid">
            {[
              {
                ac: t.ac_1, h: t.a1_h, d: t.a1_d, role: t.a1_role,
                mode: lang === 'tr' ? 'Karşılaştırıcı' : 'Comparator', link: '/applications',
                illust: (
                  /* Akıllı sokak lambası: LDR → op-amp karşılaştırıcı → lamba */
                  <svg viewBox="0 0 220 130" aria-hidden="true">
                    {/* LDR sembolü */}
                    <circle cx="28" cy="65" r="14" stroke="var(--volt)" strokeWidth="1.5" fill="none"/>
                    <path d="M20,57 L36,73 M20,73 L36,57" stroke="var(--volt)" strokeWidth="1.5"/>
                    <path d="M14,55 Q8,50 14,45" stroke="var(--volt)" strokeWidth="1" fill="none" strokeLinecap="round"/>
                    <path d="M18,51 Q12,46 18,41" stroke="var(--volt)" strokeWidth="1" fill="none" strokeLinecap="round"/>
                    <text x="28" y="90" textAnchor="middle" fontSize="8" fill="var(--ink-muted)" fontFamily="IBM Plex Mono,monospace">LDR</text>
                    {/* Wire to op-amp */}
                    <path d="M42,65 L70,65" stroke="var(--volt)" strokeWidth="1.5" fill="none"/>
                    {/* Op-amp body */}
                    <path d="M70,45 L70,95 L110,70 Z" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper-warm)"/>
                    <text x="76" y="63" fontSize="9" fill="var(--ink)" fontFamily="IBM Plex Mono,monospace" fontWeight="600">−</text>
                    <text x="76" y="83" fontSize="9" fill="var(--ink)" fontFamily="IBM Plex Mono,monospace" fontWeight="600">+</text>
                    {/* Vref to + input */}
                    <path d="M42,80 L70,80" stroke="var(--ink-muted)" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
                    <text x="38" y="83" textAnchor="end" fontSize="8" fill="var(--ink-muted)" fontFamily="IBM Plex Mono,monospace">Vref</text>
                    {/* Output wire */}
                    <path d="M110,70 L145,70" stroke="var(--copper)" strokeWidth="2" fill="none"/>
                    {/* Relay/switch */}
                    <rect x="145" y="58" width="22" height="24" stroke="var(--copper)" strokeWidth="1.5" fill="none" rx="2"/>
                    <path d="M149,70 L159,62" stroke="var(--copper)" strokeWidth="1.5" strokeLinecap="round"/>
                    <text x="156" y="90" textAnchor="middle" fontSize="8" fill="var(--ink-muted)" fontFamily="IBM Plex Mono,monospace">RÖLE</text>
                    {/* Lamp */}
                    <circle cx="192" cy="70" r="14" stroke="var(--copper)" strokeWidth="1.5" fill="none"/>
                    <path d="M184,62 L200,78 M184,78 L200,62" stroke="var(--copper)" strokeWidth="1.5"/>
                    {/* Glow rays */}
                    <path d="M192,50 L192,44 M205,56 L210,51 M206,70 L213,70 M205,84 L210,89" stroke="var(--copper)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    <text x="192" y="90" textAnchor="middle" fontSize="8" fill="var(--ink-muted)" fontFamily="IBM Plex Mono,monospace">LAMBA</text>
                    {/* Saturation annotation */}
                    <text x="128" y="60" fontSize="7" fill="var(--crimson)" fontFamily="IBM Plex Mono,monospace">±Vcc</text>
                    <path d="M167,70 L175,70" stroke="var(--copper)" strokeWidth="1.5" fill="none"/>
                  </svg>
                ),
              },
              {
                ac: t.ac_2, h: t.a2_h, d: t.a2_d, role: t.a2_role,
                mode: lang === 'tr' ? 'Toplayıcı' : 'Summing Amp', link: '/applications',
                illust: (
                  /* Ses mikseri: 3 kanal → sanal toprak → hoparlör */
                  <svg viewBox="0 0 220 130" aria-hidden="true">
                    {/* Channel labels */}
                    <text x="8" y="30" fontSize="8" fill="var(--volt)" fontFamily="IBM Plex Mono,monospace">VOK.</text>
                    <text x="8" y="65" fontSize="8" fill="var(--volt)" fontFamily="IBM Plex Mono,monospace">GTR.</text>
                    <text x="8" y="100" fontSize="8" fill="var(--volt)" fontFamily="IBM Plex Mono,monospace">DAV.</text>
                    {/* Input lines with resistors */}
                    {[28, 63, 98].map((y, i) => (
                      <g key={i}>
                        <path d={`M30,${y} L45,${y}`} stroke="var(--volt)" strokeWidth="1.5" fill="none"/>
                        <path d={`M45,${y} L48,${y} L50,${y-5} L54,${y+5} L58,${y-5} L62,${y+5} L66,${y-5} L70,${y+5} L72,${y} L75,${y}`} stroke="var(--volt)" strokeWidth="1.5" fill="none"/>
                      </g>
                    ))}
                    {/* Virtual ground node */}
                    <circle cx="85" cy="63" r="4" fill="var(--ink)"/>
                    <path d="M75,28 L85,28 L85,59" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    <path d="M75,63 L81,63" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    <path d="M75,98 L85,98 L85,67" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    <text x="85" y="78" textAnchor="middle" fontSize="7" fill="var(--ink-muted)" fontFamily="IBM Plex Mono,monospace">V.GND</text>
                    {/* Op-amp */}
                    <path d="M89,43 L89,93 L129,68 Z" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper-warm)"/>
                    <text x="95" y="61" fontSize="9" fill="var(--ink)" fontFamily="IBM Plex Mono,monospace" fontWeight="600">−</text>
                    <text x="95" y="81" fontSize="9" fill="var(--ink)" fontFamily="IBM Plex Mono,monospace" fontWeight="600">+</text>
                    {/* + to GND */}
                    <path d="M89,80 L78,80 L78,115" stroke="var(--ink)" strokeWidth="1" fill="none"/>
                    <path d="M71,115 L85,115 M74,119 L82,119 M77,123 L79,123" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    {/* Rf feedback */}
                    <path d="M85,56 L85,20 L107,20" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    <path d="M107,20 L110,20 L112,15 L116,25 L120,15 L124,25 L128,15 L132,25 L134,20 L137,20" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    <text x="122" y="14" fontSize="8" fill="var(--ink-muted)" textAnchor="middle" fontFamily="IBM Plex Mono,monospace">Rf</text>
                    <path d="M137,20 L155,20 L155,68" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
                    <circle cx="155" cy="68" r="3" fill="var(--ink)"/>
                    {/* Output */}
                    <path d="M129,68 L165,68" stroke="var(--copper)" strokeWidth="2" fill="none"/>
                    {/* Speaker */}
                    <rect x="165" y="55" width="8" height="26" stroke="var(--copper)" strokeWidth="1.5" fill="var(--copper-soft)"/>
                    <path d="M173,58 L183,48 L183,88 L173,78 Z" stroke="var(--copper)" strokeWidth="1.5" fill="none"/>
                    {/* Sound waves */}
                    <path d="M188,60 Q194,68 188,76" stroke="var(--copper)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                    <path d="M192,55 Q201,68 192,81" stroke="var(--copper)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                ),
              },
              {
                ac: t.ac_3, h: t.a3_h, d: t.a3_d, role: t.a3_role,
                mode: lang === 'tr' ? 'Fark alıcı' : 'Differential', link: '/applications',
                illust: (
                  /* EKG monitörü: 2 elektrot → fark yükselteci → kalp atışı */
                  <svg viewBox="0 0 220 130" aria-hidden="true">
                    {/* Body silhouette hint */}
                    <ellipse cx="30" cy="65" rx="18" ry="28" stroke="var(--ink-muted)" strokeWidth="1" fill="none" strokeDasharray="3 4" opacity="0.5"/>
                    {/* Electrode dots */}
                    <circle cx="22" cy="55" r="5" stroke="var(--volt)" strokeWidth="1.5" fill="var(--volt-soft)"/>
                    <circle cx="38" cy="55" r="5" stroke="var(--volt)" strokeWidth="1.5" fill="var(--volt-soft)"/>
                    {/* Lead wires */}
                    <path d="M27,55 L65,50" stroke="var(--volt)" strokeWidth="1.5" fill="none"/>
                    <path d="M33,55 L65,70" stroke="var(--volt)" strokeWidth="1.5" fill="none"/>
                    {/* Noise annotation on both lines */}
                    <path d="M40,53 Q42,49 44,53 Q46,57 48,53" stroke="var(--ink-muted)" strokeWidth="1" fill="none" opacity="0.5"/>
                    <path d="M40,68 Q42,64 44,68 Q46,72 48,68" stroke="var(--ink-muted)" strokeWidth="1" fill="none" opacity="0.5"/>
                    <text x="43" y="46" fontSize="7" fill="var(--ink-muted)" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" opacity="0.7">50Hz</text>
                    {/* Op-amp diff */}
                    <path d="M65,40 L65,90 L105,65 Z" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper-warm)"/>
                    <text x="71" y="58" fontSize="9" fill="var(--ink)" fontFamily="IBM Plex Mono,monospace" fontWeight="600">−</text>
                    <text x="71" y="78" fontSize="9" fill="var(--ink)" fontFamily="IBM Plex Mono,monospace" fontWeight="600">+</text>
                    {/* CMRR label */}
                    <text x="83" y="100" textAnchor="middle" fontSize="7.5" fill="var(--moss)" fontFamily="IBM Plex Mono,monospace">CMRR</text>
                    <text x="83" y="109" textAnchor="middle" fontSize="7" fill="var(--moss)" fontFamily="IBM Plex Mono,monospace">80 dB</text>
                    {/* Output → heartbeat waveform */}
                    <path d="M105,65 L122,65" stroke="var(--copper)" strokeWidth="2" fill="none"/>
                    {/* ECG signal */}
                    <path d="M122,65 L130,65 L133,65 L135,50 L137,80 L140,45 L143,80 L145,65 L155,65 L157,65 L159,58 L161,65 L175,65 L177,65 L179,55 L181,75 L184,60 L186,65 L200,65"
                      stroke="var(--copper)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Noise cancelled label */}
                    <text x="162" y="50" fontSize="7" fill="var(--moss)" fontFamily="IBM Plex Mono,monospace">gürültü</text>
                    <text x="162" y="58" fontSize="7" fill="var(--moss)" fontFamily="IBM Plex Mono,monospace">→ 0</text>
                  </svg>
                ),
              },
            ].map((app, i) => (
              <Link to={app.link} className="app" key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="app-illust">
                  <span className="app-number">{String(i+1).padStart(2,'0')}</span>
                  {app.illust}
                </div>
                <div className="app-body">
                  <span className="app-chip">{app.ac}</span>
                  <h3>{app.h}</h3>
                  <p className="app-desc">{app.d}</p>
                  <div className="app-meta">
                    <span><strong>{t.a_mode}</strong> {app.mode}</span>
                    <span><strong>{t.a_role}</strong> {app.role}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== AUDIENCE ====== */}
      <section className="section" id="audience">
        <div className="wrap">
          <p className="eyebrow"><span className="num">05</span>{t.aud_eye}</p>
          <h2 className="heading">
            {t.aud_h1} <em className="serif-em">{t.aud_h2}</em> {t.aud_h3}
          </h2>

          <div className="aud-grid">
            {[
              { icon: '🎓', h: t.ad1_h, p: t.ad1_p },
              { icon: '🔧', h: t.ad2_h, p: t.ad2_p },
              { icon: '📐', h: t.ad3_h, p: t.ad3_p },
              { icon: '💡', h: t.ad4_h, p: t.ad4_p },
            ].map((a, i) => (
              <div className="aud" key={i}>
                <div className="aud-mark">{a.icon}</div>
                <h4>{a.h}</h4>
                <p>{a.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow"><span className="num">06</span>{t.feat_eye}</p>
          <h2 className="heading">
            {t.feat_h1} <em className="serif-em">{t.feat_h2}</em>
          </h2>
          <div className="feat-list">
            {[
              { n: '01', h: t.f1_h, p: t.f1_p },
              { n: '02', h: t.f2_h, p: t.f2_p },
              { n: '03', h: t.f3_h, p: t.f3_p },
              { n: '04', h: t.f4_h, p: t.f4_p },
            ].map(f => (
              <div className="feat-row" key={f.n}>
                <span className="fnum">{f.n}</span>
                <h4>{f.h}</h4>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="cta">
        <div className="wrap">
          <div className="cta-inner">
            <div>
              <p className="eyebrow"><span className="num">&gt;_</span>{t.cta_eye}</p>
              <h2>
                {t.cta_h1} <em className="serif-em">{t.cta_h2}</em> {t.cta_h3}
              </h2>
              <p>{t.cta_p}</p>
              <div className="hero-ctas">
                <Link to="/simulator" className="btn btn-primary">{t.cta_b1}</Link>
                <Link to="/theory" className="btn btn-ghost">{t.cta_b2}</Link>
              </div>
            </div>
            <div className="cta-diagram">
              <svg viewBox="0 0 200 200" style={{ width: '100%', opacity: 0.25 }}>
                <path d="M30,100 L80,100 L80,60 L160,60 L160,100 L200,100" stroke="var(--copper-soft)" strokeWidth="1.5" fill="none"/>
                <path d="M60,60 L60,20 L140,20 L140,60" stroke="var(--copper-soft)" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
                <circle cx="80" cy="100" r="3" fill="var(--copper-soft)"/>
                <circle cx="160" cy="100" r="3" fill="var(--copper-soft)"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
