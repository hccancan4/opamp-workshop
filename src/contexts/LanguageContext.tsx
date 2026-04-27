import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Lang, strings, type I18nStrings } from '../i18n/strings';
import { trackEvent } from '../lib/analytics';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: I18nStrings;
}

const LanguageContext = createContext<LangCtx>({} as LangCtx);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'en' || saved === 'tr') ? saved : 'tr';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    trackEvent('language_switch', { lang: l });
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: strings[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
