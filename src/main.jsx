
// Node modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS files
import './index.css'
import 'lenis/dist/lenis.css'

// Components
import App from './App.jsx'
import ThemeProvider from './contexts/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
