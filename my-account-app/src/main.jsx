import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client'; 
import { MyAccountApp } from './MyAccountApp';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <MyAccountApp />
      </NextUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
