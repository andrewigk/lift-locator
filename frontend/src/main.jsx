import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
const clientId = import.meta.env.VITE_CLIENT_ID

const theme = createTheme({
  palette: {
    background: {
      default: '#272727',
      paper: '#292929',
    },
    mode: 'light',
    primary: {
      main: '#3ec8e0',
    },
    secondary: {
      main: '#f35c91',
    },
    text: {
      primary: 'rgba(243,243,243,0.87)',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </GoogleOAuthProvider>
)
