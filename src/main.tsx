import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initGA } from './lib/analytics';
import App from './App.tsx';

// Initialise GA4 (no-op in dev, only runs if VITE_GA_MEASUREMENT_ID is set)
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
