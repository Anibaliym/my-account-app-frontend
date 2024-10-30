import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client'; 
import { MyAccountApp } from './MyAccountApp';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyAccountApp />
    </BrowserRouter>
  </StrictMode>,
)
