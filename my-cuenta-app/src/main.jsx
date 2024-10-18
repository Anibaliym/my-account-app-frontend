import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client'; 
import { MiCuentaApp } from './MiCuentaApp';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MiCuentaApp />
    </BrowserRouter>
  </StrictMode>,
)
