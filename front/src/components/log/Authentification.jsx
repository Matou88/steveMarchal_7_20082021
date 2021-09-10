import React from "react";
import SignIn from "./SignIn";
import Logo1 from "../Logo1";
import Navigation from "../Navigation";

function Authentification() {
  return (
    <div className="login-page">
      <Navigation />
      <Logo1 />
      <div className="login-form">
          <h1 className="login-title text-center mt-4 mb-2">Se connecter</h1>
          <SignIn />
      </div>     
    </div>
  );
}

export default Authentification;
