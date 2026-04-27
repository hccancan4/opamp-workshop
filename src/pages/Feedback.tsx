import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import './InfoPage.css';

type FeedbackType = 'bug' | 'suggestion' | 'question' | 'other';

interface FormState {
  name: string;
  type: FeedbackType;
  message: string;
  honey: string; // honeypot — must stay empty
}

const TYPE_OPTIONS_TR: { value: FeedbackType; label: string }[] = [
  { value: 'bug',        label: 'Hata bildirimi' },
  { value: 'suggestion', label: 'Öneri / iyileştirme' },
  { value: 'question',   label: 'Soru' },
  { value: 'other',      label: 'Diğer' },
];
const TYPE_OPTIONS_EN: { value: FeedbackType; label: string }[] = [
  { value: 'bug',        label: 'Bug report' },
  { value: 'suggestion', label: 'Suggestion / improvement' },
  { value: 'question',   label: 'Question' },
  { value: 'other',      label: 'Other' },
];

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

export default function Feedback() {
  const { lang } = useLang();
  const tr = lang === 'tr';

  const [form, setForm]       = useState<FormState>({ name: '', type: 'suggestion', message: '', honey: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [busy, setBusy]       = useState(false);

  const typeOptions = tr ? TYPE_OPTIONS_TR : TYPE_OPTIONS_EN;

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — bots fill this field, humans don't
    if (form.honey) return;
    if (!form.message.trim()) return;

    setBusy(true);
    setError(null);

    try {
      if (FORMSPREE_ID) {
        // Real Formspree submission
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name:    form.name || (tr ? 'Anonim' : 'Anonymous'),
            type:    form.type,
            message: form.message,
            _subject: `[Op-Amp Atölyesi] ${form.type} — ${form.name || 'Anonymous'}`,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        // No Formspree ID — simulate (dev/placeholder mode)
        await new Promise(r => setTimeout(r, 700));
      }

      trackEvent('feedback_submitted', { type: form.type });
      setSubmitted(true);
    } catch {
      setError(tr
        ? 'Gönderilemedi. Lütfen tekrar dene.'
        : 'Could not send. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', type: 'suggestion', message: '', honey: '' });
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="info-page">
      <SEO
        title={tr ? 'Geri Bildirim' : 'Feedback'}
        description={tr
          ? 'Hata bildir, öneri sun veya soru sor. Op-Amp Atölyesi\'ni geliştirmene yardım et.'
          : 'Report a bug, suggest an improvement or ask a question. Help make Op-Amp Workshop better.'}
        path="/feedback"
        lang={lang}
      />
      <div className="wrap">

        {/* ── Hero ── */}
        <div className="info-hero">
          <div className="info-hero-inner">
            <div className="info-eyebrow">{tr ? 'Geri bildirim' : 'Feedback'}</div>
            <h1>{tr ? 'Düşüncelerini paylaş' : 'Share your thoughts'}</h1>
            <p>
              {tr
                ? 'Bir hata bulduysan, eksik gördüğün bir konu varsa ya da sadece ne düşündüğünü söylemek istiyorsan — burada.'
                : 'Found a bug, spotted a missing topic, or just want to say what you think — we\'re listening.'}
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="info-body">

          {submitted ? (
            /* ── Success state ── */
            <div className="feedback-success">
              <h3>{tr ? '✓ Teşekkürler!' : '✓ Thank you!'}</h3>
              <p>
                {tr
                  ? 'Geri bildirimin alındı. Op-Amp Atölyesi\'ni daha iyi hale getirmeye yardımcı olduğun için teşekkür ederiz.'
                  : 'Your feedback has been received. Thank you for helping make Op-Amp Workshop better.'}
              </p>
              <button className="fb-back-btn" onClick={handleReset}>
                {tr ? '← Yeni geri bildirim gönder' : '← Send another message'}
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form className="feedback-form" onSubmit={handleSubmit} noValidate>

              {/* Honeypot — hidden from real users, traps bots */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="fb-honey">Leave this empty</label>
                <input
                  id="fb-honey"
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honey}
                  onChange={e => handleChange('honey', e.target.value)}
                />
              </div>

              {/* Name — optional */}
              <div className="fb-field">
                <label className="fb-label" htmlFor="fb-name">
                  {tr ? 'İsim' : 'Name'}{' '}
                  <span style={{ color: 'var(--ink-dim)', fontWeight: 400 }}>
                    ({tr ? 'isteğe bağlı' : 'optional'})
                  </span>
                </label>
                <input
                  id="fb-name"
                  className="fb-input"
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={tr ? 'Adınız veya takma ad' : 'Your name or alias'}
                  autoComplete="name"
                  aria-label={tr ? 'İsim (isteğe bağlı)' : 'Name (optional)'}
                />
              </div>

              {/* Type */}
              <div className="fb-field">
                <label className="fb-label" htmlFor="fb-type">
                  {tr ? 'Geri bildirim türü' : 'Feedback type'} <span>*</span>
                </label>
                <select
                  id="fb-type"
                  className="fb-select"
                  value={form.type}
                  onChange={e => handleChange('type', e.target.value as FeedbackType)}
                  aria-label={tr ? 'Geri bildirim türü seç' : 'Select feedback type'}
                >
                  {typeOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="fb-field">
                <label className="fb-label" htmlFor="fb-message">
                  {tr ? 'Mesaj' : 'Message'} <span>*</span>
                </label>
                <textarea
                  id="fb-message"
                  className="fb-textarea"
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder={
                    tr
                      ? 'Hata için: hangi sayfada, ne yaptın, ne oldu?\nÖneri için: neyin eksik ya da farklı olmasını isterdin?'
                      : 'For bugs: which page, what did you do, what happened?\nFor suggestions: what was missing or could be different?'
                  }
                  required
                  aria-required="true"
                  aria-label={tr ? 'Mesajınız' : 'Your message'}
                />
              </div>

              {/* Error */}
              {error && (
                <p role="alert" style={{ fontSize: '0.85rem', color: 'var(--crimson)', fontWeight: 600 }}>
                  ⚠ {error}
                </p>
              )}

              <button
                type="submit"
                className="fb-submit"
                disabled={!form.message.trim() || busy}
                aria-label={tr ? 'Geri bildirimi gönder' : 'Submit feedback'}
              >
                {busy
                  ? (tr ? 'Gönderiliyor…' : 'Sending…')
                  : (tr ? 'Gönder' : 'Submit')}
              </button>

              {!FORMSPREE_ID && (
                <span className="fb-hint">
                  {tr
                    ? 'ℹ .env dosyasında VITE_FORMSPREE_ID tanımlanmamış — form simüle modunda çalışıyor.'
                    : 'ℹ VITE_FORMSPREE_ID not set in .env — form is running in simulation mode.'}
                </span>
              )}

            </form>
          )}

          <hr className="info-rule" />

          <div className="info-section">
            <h2>{tr ? 'Başka kanallar' : 'Other channels'}</h2>
            <p>
              {tr
                ? 'Daha ayrıntılı bir konuşma yapmak ya da projeye doğrudan katkı sağlamak istersen Katkıda Bulunanlar sayfasında GitHub bağlantısını bulabilirsin.'
                : 'For a more detailed conversation or to contribute directly, find the GitHub link on the Contributors page.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
