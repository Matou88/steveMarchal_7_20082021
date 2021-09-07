import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../contexts/auth';

const Navigation = () => {
    const { isAuthenticated } = useContext(Auth);
    return (

        <div className="navigation navbar sticky-top navbar-dark bg-dark mt-0 mb-0">
            <img src="./images/3.svg" alt="Petit logo groupomania" className="logo me-lg-4" />
            <div className="text-end">
            <nav className="col-3 col-lg-2 navbar navbar-expand-lg navbar-light align-self-lg-end">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarContent" className="collapse navbar-collapse">
                    { (!isAuthenticated && (
                        <>
                            <NavLink exact to="/signup" className="nav-item active" activeClassName="nav-active">
                                S'inscrire
                            </NavLink>
                            <NavLink exact to="/" className="nav-item active" activeClassName="nav-active">
                                S'identifier
                            </NavLink>
                        </>
                    )) || (
                        <>
                            <NavLink exact to="/allposts" className="nav-item active" activeClassName="nav-active">
                                Posts
                            </NavLink>
                            <NavLink exact to="/profile" className="nav-item active" activeClassName="nav-active">
                                Profil
                            </NavLink>
                        </>
                    )}
                </div>
                </nav>
            </div>
        </div>
    );
};

export default Navigation;