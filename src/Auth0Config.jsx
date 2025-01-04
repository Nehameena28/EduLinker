// src/Auth0Config.js
import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0Config = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-cju54xvtva0mn02e.us.auth0.com"
      clientId="d7KZzZlfptgO83nHbB9gP8iRYOCDyPcx"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Config;
