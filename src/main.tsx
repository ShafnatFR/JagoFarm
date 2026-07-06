import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { JagoFarmProvider } from './context/JagoFarmContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JagoFarmProvider>
      <App />
    </JagoFarmProvider>
  </StrictMode>,
);
