import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoImg from '../assets/3.svg';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

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
                <NavLink to="/">
                    <img src={LogoImg} alt="Logo Groupomania" className="logo" />
                </NavLink>
                <div className="nav-link">
                    <nav className="navbar navbar-expand-lg navbar-light align-self-lg-end">
                        <NavLink exact to="/signup" className="nav-item active items" activeClassName="nav-active">
                            S'inscrire
                        </NavLink>
                        <NavLink exact to="/login" className="nav-item active items" activeClassName="nav-active">
                            S'identifier
                        </NavLink>
                    </nav>
                </div>
            </div>
        )
    } else {
        return(
            <div className="navigation navbar sticky-top navbar-dark bg-dark mt-0 mb-0">
                <div className="col-lg-4">
                    <NavLink to="/">
                        <img src={LogoImg} alt="Logo Groupomania" className="logo" />
                    </NavLink>
                </div>
                <div className="col-12 col-lg-8 nav-link">
                    <nav className="navbar navbar-expand-lg navbar-light align-self-lg-end">
                        <NavLink to="/" exact className="nav-item active items" aria-label="Accueil" activeClassName="nav-active">
                            Accueil
                        </NavLink>
                        <NavLink exact to="/post" className="nav-item active items" aria-label="Nouveau Post" activeClassName="nav-active">
                            Post
                        </NavLink>
                        <NavLink to={"/profile"} className="nav-item active items" aria-label="Profil" activeClassName="nav-active">
                            Profil
                        </NavLink>
                        <FontAwesomeIcon icon={faPowerOff} className="signout-icon" aria-label="Se déconnecter" onClick={Logout} />
                    </nav>
                </div>
            </div>
        );
    };
}

export default Navigation;