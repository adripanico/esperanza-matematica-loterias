import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryContextProvider } from './contexts/QueryContextProvider.tsx';
import { ThemeContextProvider } from './contexts/ThemeContextProvider.tsx';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <QueryContextProvider>
        <App />
      </QueryContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
