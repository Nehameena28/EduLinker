import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';
import Auth0Config from './Auth0Config';  

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Auth0Config>
  <Auth0Provider
    domain="dev-cju54xvtva0mn02e.us.auth0.com"
    clientId="d7KZzZlfptgO83nHbB9gP8iRYOCDyPcx"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Auth0Provider> 
  </Auth0Config> 
  </StrictMode>
)
