import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";


const Navigation = () => {
    const history = useHistory();
    const [validToken, setValidToken] = useState(null);
    const token = localStorage.getItem("token");
  
    const isMyTokenValid = () => {
      if (token) {
        const decodedToken = jwt_decode(token);
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
  
    const Logout = () => {
        Swal.fire({
          title: "Êtes-vous sûr(e) de vouloir vous déconnecté(e) ?",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: "Me déconnecter",
          denyButtonText: "Annuler",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            localStorage.clear();
            history.replace('/login');
          }
        });
      }    
    
    if (!validToken) {
        return (
            <div className="navigation navbar sticky-top navbar-dark bg-dark mt-0 mb-0">
                <img src="./images/3.svg" alt="Petit logo groupomania" className="logo me-lg-4" />
                <div className="text-end">
                    <nav className="col-3 col-lg-2 navbar navbar-expand-lg navbar-light align-self-lg-end">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="navbarContent" className="collapse navbar-collapse">
                            <NavLink exact to="/signup" className="nav-item active" activeClassName="nav-active">
                                S'inscrire
                            </NavLink>
                            <NavLink exact to="/" className="nav-item active" activeClassName="nav-active">
                                S'identifier
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
        )
    } else {
        return(
            <div className="navigation navbar sticky-top navbar-dark bg-dark mt-0 mb-0">
                <img src="./images/3.svg" alt="Petit logo groupomania" className="logo me-lg-4" />
                <div className="text-end">
                    <nav className="col-3 col-lg-2 navbar navbar-expand-lg navbar-light align-self-lg-end">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="navbarContent" className="collapse navbar-collapse">
                            <NavLink to="/home" className="nav-link">
                                Actus
                            </NavLink>
                            <NavLink to={"/profile"} className="nav-link">
                                Mon profil
                            </NavLink>
                            <button onClick={Logout}>Déconnexion</button>
                            {/* <FontAwesomeIcon
                              icon={faSignInAlt}
                              className="nav-icon"
                              onClick={Logout}
                            />              */}
                        </div>
                    </nav>
                </div>
            </div>
        );
    };
}

export default Navigation;