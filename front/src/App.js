import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import PostSelected from "./pages/PostSelected";
import ProfileSelected from "./pages/ProfileSelected";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Error404 from "./components/Error404";

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
            <Route component={ Error404 } />
          </Switch>
        </Router>
      </>
    );
  
}

export default App;