
// Node modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS files
import './index.css'
import 'lenis/dist/lenis.css'

// Components
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
