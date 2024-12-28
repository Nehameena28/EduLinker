import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
<StrictMode>
  <BrowserRouter>
  <Auth0Provider
    domain="dev-cju54xvtva0mn02e.us.auth0.com"
    clientId="Qda9bgNYGU6jHbWsQwlRAvB4EDVxzFGb"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </BrowserRouter>  
</StrictMode>
)
