import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ChatBot from './components/Chat/ChatBot';
import CookieBanner from './components/CookieBanner';
import { trackPageView } from './lib/analytics';
import './styles/globals.css';

/* ── Lazy-loaded pages ──────────────────────────────────────── */
const Home         = lazy(() => import('./pages/Home'));
const Simulator    = lazy(() => import('./pages/Simulator'));
const Theory       = lazy(() => import('./pages/Theory'));
const Applications = lazy(() => import('./pages/Applications'));
const About        = lazy(() => import('./pages/About'));
const Contributors = lazy(() => import('./pages/Contributors'));
const Feedback     = lazy(() => import('./pages/Feedback'));
const Privacy      = lazy(() => import('./pages/Privacy'));
const NotFound     = lazy(() => import('./pages/NotFound'));

/* ── Loading fallback ───────────────────────────────────────── */
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '50vh',
    }}>
      <span style={{
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '0.8rem', color: 'var(--ink-dim)',
        letterSpacing: '0.15em',
      }}>
        ···
      </span>
    </div>
  );
}

/* ── GA route tracker — must be inside BrowserRouter ───────── */
function RouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

/* ── App ────────────────────────────────────────────────────── */
function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <RouteTracker />
          <Header />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"             element={<Home />} />
              <Route path="/simulator"    element={<Simulator />} />
              <Route path="/theory"       element={<Theory />} />
              <Route path="/theory/:slug" element={<Theory />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/about"        element={<About />} />
              <Route path="/contributors" element={<Contributors />} />
              <Route path="/feedback"     element={<Feedback />} />
              <Route path="/privacy"      element={<Privacy />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <ChatBot />
          <CookieBanner />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
