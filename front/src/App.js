import React, { useState } from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Allposts from "./pages/Allposts";
import Profile from "./pages/Profile";
import { hasAuthenticated } from "./services/AuthApi";
import Auth from "./contexts/auth";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  return (
    <Auth.Provider value={{ isAuthenticated }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/signup" exact component={ Signup } />
          <AuthenticatedRoute path="/allposts" exact component={ Allposts } />
          <AuthenticatedRoute path="/profile" exact component={ Profile } />
        </Switch>
      </BrowserRouter>
    </Auth.Provider>
    
    
  );
}

export default App;
