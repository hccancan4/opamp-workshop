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
            <a
              className="footer-author"
              href="https://github.com/hccancan4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hasancan Yağdoğan — GitHub"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Hasancan Yağdoğan
            </a>
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
              <li><Link to="/privacy">{t.footer_privacy}</Link></li>
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
