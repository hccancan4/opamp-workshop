import { useState, useEffect } from 'react';
import { useLang } from '../contexts/LanguageContext';
import './CookieBanner.css';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="region" aria-label="Cookie consent">
      <span className="cookie-text">
        {lang === 'tr'
          ? 'Bu site, kullanım istatistiklerini ölçmek için Google Analytics kullanmaktadır.'
          : 'This site uses Google Analytics to measure usage statistics.'}
      </span>
      <button className="cookie-btn" onClick={dismiss} aria-label={lang === 'tr' ? 'Kabul et ve kapat' : 'Accept and close'}>
        {lang === 'tr' ? 'Tamam' : 'Got it'}
      </button>
    </div>
  );
}
