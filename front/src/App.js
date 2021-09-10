import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Authentification from "./components/log/Authentification";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Post from "./components/post/Post";
import PostSelected from "./components/post/PostSelected";
import ProfileSelected from "./components/profile/ProfileSelected";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import SignUp from "./components/log/SignUp";

function App() {
  const [validToken, setValidToken] = useState(false);
  const token = localStorage.getItem("token");

  const isMyTokenValid = () => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwt_decode(localStorage.getItem("token"));
      const dateNow = new Date();
      if (decodedToken.exp > dateNow / 1000) {
        setValidToken(true);
      } else {
        localStorage.clear();
        window.location = "/";
      }
    } else {
      setValidToken(false);
    }
  };

  useEffect(() => {
    isMyTokenValid();
  }, []);

  if (token === null || validToken === false) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={ Authentification } />
            <Route path="/signup" component={ SignUp } />
          </Switch>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={Authentification} />
            <Route path="/signup" component={ SignUp } />
            <Route path="/home" component={ Home } />
            <Route path="/profile" component={ Profile } />
            <Route path="/profileSelected" component={ ProfileSelected } />
            <Route path="/post" component={ Post } />
            <Route path="/postSelected" component={ PostSelected } />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;

