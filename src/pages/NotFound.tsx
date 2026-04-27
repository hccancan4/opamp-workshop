import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import './NotFound.css';

export default function NotFound() {
  const { lang } = useLang();
  const tr = lang === 'tr';

  return (
    <div className="not-found-page">
      <SEO
        title={tr ? 'Sayfa Bulunamadı' : 'Page Not Found'}
        description={tr ? 'Aradığın sayfa bulunamadı.' : 'The page you were looking for does not exist.'}
        path="/404"
        lang={lang}
      />
      <div className="wrap">
        <div className="nf-inner">
          <div className="nf-code mono">404</div>
          <div className="nf-eyebrow">
            {tr ? 'Sayfa bulunamadı' : 'Page not found'}
          </div>
          <p className="nf-msg">
            {tr
              ? 'Aradığın sayfa mevcut değil ya da taşınmış olabilir.'
              : 'The page you were looking for doesn\'t exist or may have moved.'}
          </p>
          <div className="nf-actions">
            <Link to="/" className="btn btn-primary">
              {tr ? '← Ana sayfa' : '← Home'}
            </Link>
            <Link to="/simulator" className="btn btn-ghost">
              {tr ? 'Simülatörü aç' : 'Open simulator'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
