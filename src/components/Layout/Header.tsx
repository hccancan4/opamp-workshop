import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LanguageContext';
import { trackEvent } from '../../lib/analytics';
import './Header.css';

const KOFI_URL = (import.meta.env.VITE_KOFI_URL as string | undefined) ?? 'https://ko-fi.com';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <Link to="/" className="brand">
        <div className="brand-seal">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9 L9 3 L15 9 L9 15 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="9" cy="9" r="2" fill="currentColor"/>
          </svg>
        </div>
        Op-Amp Atölyesi
        <span className="brand-tag">v1.0</span>
      </Link>

      <nav className="nav">
        <button className="nav-link" onClick={() => scrollTo('whatis')}>{t.nav_whatis}</button>
        <button className="nav-link" onClick={() => scrollTo('journey')}>{t.nav_journey}</button>
        <button className="nav-link" onClick={() => scrollTo('circuits')}>{t.nav_circuits}</button>
        <button className="nav-link" onClick={() => scrollTo('apps')}>{t.nav_apps}</button>
        <button className="nav-link" onClick={() => scrollTo('audience')}>{t.nav_audience}</button>

        <div className="lang-switch">
          <button
            className={lang === 'tr' ? 'active' : ''}
            onClick={() => setLang('tr')}
            aria-label="Türkçe"
          >TR</button>
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-label="English"
          >EN</button>
        </div>

        {/* Ko-fi icon */}
        <a
          className="header-kofi"
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('donation_click', { source: 'header' })}
          aria-label={lang === 'tr' ? 'Ko-fi\'de destek ol' : 'Support on Ko-fi'}
          title={lang === 'tr' ? 'Kahve ısmarla' : 'Buy a coffee'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            {/* Coffee cup body */}
            <path d="M2.5 5.5 H10 V9.5 A2 2 0 0 1 8 11.5 H4.5 A2 2 0 0 1 2.5 9.5 Z"
                  stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            {/* Handle */}
            <path d="M10 6.5 H11.2 A1.2 1.2 0 0 1 11.2 8.9 H10"
                  stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            {/* Steam */}
            <path d="M4.5 2.5 V3.8 M7 1.8 V3.1 M9.5 2.5 V3.8"
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </a>

        <NavLink to="/simulator" className="header-cta">
          {t.nav_launch}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </NavLink>
      </nav>

      <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
        <span/><span/><span/>
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollTo('whatis')}>{t.nav_whatis}</button>
          <button onClick={() => scrollTo('journey')}>{t.nav_journey}</button>
          <button onClick={() => scrollTo('circuits')}>{t.nav_circuits}</button>
          <button onClick={() => scrollTo('apps')}>{t.nav_apps}</button>
          <button onClick={() => scrollTo('audience')}>{t.nav_audience}</button>
          <NavLink to="/simulator" onClick={() => setMenuOpen(false)}>{t.nav_launch}</NavLink>
          <NavLink to="/theory" onClick={() => setMenuOpen(false)}>{t.theory_title}</NavLink>
          <div className="mobile-lang">
            <button className={lang === 'tr' ? 'active' : ''} onClick={() => { setLang('tr'); setMenuOpen(false); }}>TR</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); setMenuOpen(false); }}>EN</button>
          </div>
        </div>
      )}
    </header>
  );
}
