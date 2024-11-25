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
      default: '#fafafa',
      paper: '#fff',
    },
    mode: 'light',
    primary: {
      main: '#36bed8',
      dark: '#2a8a9a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f35c91',
      dark: '#a63e62',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(32,32,32,0.87)',
      secondary: 'rgba(63,63,63,0.53)',
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
