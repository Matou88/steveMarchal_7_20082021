import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Authentification from "./components/log/Authentification";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Post from "./components/post/Post";
import PostSelected from "./components/post/PostSelected";
import ProfileSelected from "./components/profile/ProfileSelected";
import SignUp from "./components/log/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/login" exact component={ Authentification } />
            <Route path="/signup" exact component={ SignUp } />
            <PrivateRoute path="/" exact component={ Home } />
            <PrivateRoute path="/profile" exact component={ Profile } />
            <PrivateRoute path="/profileSelected" exact component={ ProfileSelected } />
            <PrivateRoute path="/post" exact component={ Post } />
            <PrivateRoute path="/postSelected" exact component={ PostSelected } />
          </Switch>
        </Router>
      </>
    );
  
}

export default App;