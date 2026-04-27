import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Op-Amp Atölyesi';
const SITE_URL  = (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://opamp-atolyesi.vercel.app';
const DEFAULT_DESC_TR = 'İşlemsel yükselteçlerin görsel, etkileşimli ve iki dilli öğrenme atölyesi. Canlı simülatör, teori bölümleri ve gerçek dünya uygulamaları.';
const DEFAULT_DESC_EN = 'A visual, interactive, bilingual workshop for operational amplifiers. Live simulator, theory chapters and real-world applications.';

interface SEOProps {
  /** Page-specific title — will be formatted as "{title} · Op-Amp Atölyesi" */
  title?: string;
  /** Page description for meta/OG/Twitter */
  description?: string;
  /** Route path (e.g. "/simulator"). Used for canonical URL. */
  path?: string;
  /** Current UI language — picks the default description if none given */
  lang?: 'tr' | 'en';
}

export default function SEO({ title, description, path = '', lang = 'tr' }: SEOProps) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  const desc = description ?? (lang === 'tr' ? DEFAULT_DESC_TR : DEFAULT_DESC_EN);
  const url  = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
