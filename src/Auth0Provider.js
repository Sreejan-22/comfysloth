import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
require("dotenv").config();

const Auth0ProviderWithHistory = ({ children }) => {
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const domain = "dev-dxbfnnd1.us.auth0.com";
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const clientId = "Ku0uJtvTti1Lv0cPvKBEzIhvFoCoCex0";

  const history = useHistory();

  // const onRedirectCallback = (appState) => {
  //   history.push(appState?.returnTo || window.location.pathname);
  // };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;