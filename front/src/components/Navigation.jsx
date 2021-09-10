import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


const Navigation = () => {
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

    function Logout() {
        Swal.fire({
          title: "Êtes-vous sûr(e) de vouloir vous déconnecté(e) ?",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: "Me déconnecter",
          denyButtonText: "Annuler",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            return (window.location.href = "/");
          }
        });
      }
    
    
    if (token === null || validToken === false) {
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
                            <FontAwesomeIcon
                            icon={faSignInAlt}
                            className="nav-icon"
                            onClick={Logout}
                            />             
                        </div>
                    </nav>
                </div>
            </div>
        );
    };
}

export default Navigation;