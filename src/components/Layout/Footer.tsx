import { Link } from 'react-router-dom';
import { useLang } from '../../contexts/LanguageContext';
import { trackEvent } from '../../lib/analytics';
import './Footer.css';

const KOFI_URL = (import.meta.env.VITE_KOFI_URL as string | undefined) ?? 'https://ko-fi.com';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: '0.75rem' }}>
              <div className="footer-seal">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9 L9 3 L15 9 L9 15 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="9" r="2" fill="currentColor"/>
                </svg>
              </div>
              Op-Amp Atölyesi
            </div>
            <p className="footer-brand-desc">{t.footer_desc}</p>
          </div>
          <div>
            <h5>{t.footer_h1}</h5>
            <ul>
              <li><Link to="/theory">{t.footer_theory}</Link></li>
              <li><Link to="/simulator">{t.footer_sim}</Link></li>
              <li><Link to="/applications">{t.footer_apps}</Link></li>
            </ul>
          </div>
          <div>
            <h5>{t.footer_h2}</h5>
            <ul>
              <li><Link to="/simulator">{t.footer_chat}</Link></li>
              <li><Link to="/applications">{t.footer_apps}</Link></li>
            </ul>
          </div>
          <div>
            <h5>{t.footer_h3}</h5>
            <ul>
              <li><Link to="/about">{t.footer_about}</Link></li>
              <li><Link to="/contributors">{t.footer_credits}</Link></li>
              <li><Link to="/feedback">{t.footer_feedback}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-foot">
          <span>© 2026 Op-Amp Atölyesi · <span>{t.footer_edu}</span></span>
          <a
            className="footer-kofi"
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('donation_click', { source: 'footer' })}
            aria-label={t.footer_edu}
          >
            ☕ Ko-fi
          </a>
          <span>v1.0 · React + Vite</span>
        </div>
      </div>
    </footer>
  );
}
