import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="429300661908-109jdi18k4adpeilt3kja86trj8p48g9.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
