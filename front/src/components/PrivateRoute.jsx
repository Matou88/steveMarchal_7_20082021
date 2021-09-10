import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ path, component }) => {

    const [validToken, setValidToken] = useState(null);
  const token = localStorage.getItem("token");

  const isMyTokenValid = () => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwt_decode(localStorage.getItem("token"));
      const dateNow = new Date();
      if (decodedToken.exp > dateNow / 1000) {
        setValidToken(true);
      } else {
          setValidToken(false);
        localStorage.clear();
      }
    
    }
    else {
        setValidToken(false);
    }
  };

  useEffect(() => {
    isMyTokenValid();
  }, []);
  console.log(validToken, token);

  if (validToken===null) {
      return null;
  }
    return (!validToken?
        <Redirect to="/login" /> :
        <Route path={path} component={component} />
    );
}

export default PrivateRoute;