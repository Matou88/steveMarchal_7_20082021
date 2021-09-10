import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Authentification from "./components/log/Authentification";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Post from "./components/post/Post";
import PostSelected from "./components/post/PostSelected";
import ProfileSelected from "./components/profile/ProfileSelected";
import SignUp from "./components/log/SignUp";
import PrivateRoute from "./components/AuthenticatedRoute";

function App() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/login" component={ Authentification } />
            <Route path="/signup" component={ SignUp } />
            <PrivateRoute path="/" component={ Home } />
            <PrivateRoute path="/profile" component={ Profile } />
            <PrivateRoute path="/profileSelected" component={ ProfileSelected } />
            <PrivateRoute path="/post" component={ Post } />
            <PrivateRoute path="/postSelected" component={ PostSelected } />
          </Switch>
        </Router>
      </>
    );
  
}

export default App;

