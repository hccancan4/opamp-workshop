import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { CHAPTERS } from '../lib/theoryChapters';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import './Theory.css';

/** Render a paragraph that may contain **bold** spans */
function RichPara({ text }: { text: string }) {
  if (!text.includes('**')) return <p>{text}</p>;
  const parts = text.split('**');
  return (
    <p>
      {parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : p)}
    </p>
  );
}

function ChapterView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const chapter = CHAPTERS.find(c => c.slug === slug);

  useEffect(() => {
    if (!chapter) return;
    localStorage.setItem(`theory-read-${slug}`, 'true');
    window.dispatchEvent(new Event('theory-progress'));
    trackEvent('theory_chapter_complete', { slug });
  }, [slug, chapter]);

  if (!chapter) return <div style={{ padding: '2rem' }}>Chapter not found.</div>;

  const title   = lang === 'tr' ? chapter.title_tr   : chapter.title_en;
  const body    = lang === 'tr' ? chapter.body_tr    : chapter.body_en;
  const example = lang === 'tr' ? chapter.example_tr : chapter.example_en;

  const idx  = CHAPTERS.findIndex(c => c.slug === slug);
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];

  return (
    <article className="chapter-view">
      <div className="chapter-eyebrow">
        <span className="mono" style={{ color: 'var(--copper)', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
          {String(idx+1).padStart(2,'0')} / {String(CHAPTERS.length).padStart(2,'0')}
        </span>
        <span style={{ color: 'var(--ink-dim)', fontSize: '0.8rem' }}>{chapter.readTime} {t.theory_read_time}</span>
      </div>
      <h1 className="chapter-title">{title}</h1>

      {/* ── Body text ── */}
      <div className="chapter-body">
        {body.split('\n\n').map((para, i) => <RichPara key={i} text={para} />)}
      </div>

      {/* ── Formula boxes ── */}
      {chapter.formulas && chapter.formulas.length > 0 && (
        <div className="formula-section">
          {chapter.formulas.map((f, i) => (
            <div key={i} className="formula-box">
              <div className="formula-label mono">
                {lang === 'tr' ? f.label_tr : f.label_en}
              </div>
              <div className="formula-expr">{f.expr}</div>
              {f.vars && (
                <div className="formula-vars mono">
                  {f.vars.split('\n').map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Worked example ── */}
      <div className="chapter-example">
        <div className="example-label mono">
          {lang === 'tr' ? 'Hesaplamalı Örnek' : 'Worked Example'}
        </div>
        <pre>{example}</pre>
      </div>

      {chapter.simLink && (
        <Link to={chapter.simLink} className="btn btn-primary try-sim-btn">
          {t.theory_try_sim}
        </Link>
      )}

      <nav className="chapter-nav">
        {prev
          ? <Link to={`/theory/${prev.slug}`} className="chapter-nav-link prev">← {lang === 'tr' ? prev.title_tr : prev.title_en}</Link>
          : <span />}
        {next
          ? <Link to={`/theory/${next.slug}`} className="chapter-nav-link next">{lang === 'tr' ? next.title_tr : next.title_en} →</Link>
          : <span />}
      </nav>
    </article>
  );
}

export default function Theory() {
  const { slug } = useParams<{ slug?: string }>();
  const { lang, t } = useLang();
  const [readChapters, setReadChapters] = useState<Set<string>>(() => {
    const s = new Set<string>();
    CHAPTERS.forEach(c => {
      if (localStorage.getItem(`theory-read-${c.slug}`)) s.add(c.slug);
    });
    return s;
  });

  useEffect(() => {
    const handler = () => {
      const s = new Set<string>();
      CHAPTERS.forEach(c => {
        if (localStorage.getItem(`theory-read-${c.slug}`)) s.add(c.slug);
      });
      setReadChapters(s);
    };
    window.addEventListener('theory-progress', handler);
    return () => window.removeEventListener('theory-progress', handler);
  }, []);

  const progress = Math.round((readChapters.size / CHAPTERS.length) * 100);
  const activeSlug = slug ?? CHAPTERS[0].slug;

  return (
    <div className="theory-page">
      <SEO
        title={t.theory_title}
        description={lang === 'tr'
          ? 'İdeal op-amp modelinden GBW ve slew-rate\'e kadar 15 derinlemesine teori bölümü.'
          : '15 in-depth theory chapters from the ideal op-amp model to GBW and slew-rate.'}
        path={slug ? `/theory/${slug}` : '/theory'}
        lang={lang}
      />
      <aside className="theory-sidebar">
        <div className="sidebar-head">
          <div className="panel-label" style={{ marginBottom: 0 }}>{t.theory_chapters}</div>
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${progress}%` }}/>
          </div>
          <div className="progress-text mono">{progress}% {t.theory_progress}</div>
        </div>

        <nav className="chapter-list">
          {CHAPTERS.map((c, i) => {
            const isRead   = readChapters.has(c.slug);
            const isActive = c.slug === activeSlug;
            return (
              <Link
                key={c.slug}
                to={`/theory/${c.slug}`}
                className={`chapter-link${isActive ? ' active' : ''}${isRead ? ' read' : ''}`}
              >
                <span className="ch-num">{String(i+1).padStart(2,'0')}</span>
                <span className="ch-title">{lang === 'tr' ? c.title_tr : c.title_en}</span>
                {isRead && <span className="ch-check">✓</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="theory-content">
        {!slug ? (
          <div className="theory-intro">
            <p className="eyebrow"><span className="num">—</span>{t.theory_title}</p>
            <h1 className="heading">{t.theory_title}</h1>
            <p className="lede">{t.theory_lede}</p>
            <div className="chapter-cards">
              {CHAPTERS.map((c, i) => (
                <Link key={c.slug} to={`/theory/${c.slug}`} className="chapter-card">
                  <span className="ch-num">{String(i+1).padStart(2,'0')}</span>
                  <h3>{lang === 'tr' ? c.title_tr : c.title_en}</h3>
                  <span className="ch-time mono">{c.readTime} {t.theory_read_time}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <ChapterView slug={activeSlug} />
        )}
      </main>
    </div>
  );
}
