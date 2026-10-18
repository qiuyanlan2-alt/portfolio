import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// Self-hosted fonts: no external request, so the page never blocks on Google Fonts.
import '@fontsource/archivo-black/400.css'
import '@fontsource/playfair-display/500-italic.css'
import '@fontsource/playfair-display/900.css'
import '@fontsource/playfair-display/900-italic.css'
import '@fontsource/noto-serif-sc/500.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/500.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-sc/900.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
