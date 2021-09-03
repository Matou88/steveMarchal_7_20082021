import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../contexts/auth';

const Navigation = () => {
    const { isAuthenticated } = useContext(Auth);
    return (
        <div className="navigation">
            { (!isAuthenticated && (
                <>
                    <NavLink exact to="/signup" activeClassName="nav-active">
                        S'inscrire
                    </NavLink>
                    <NavLink exact to="/" activeClassName="nav-active">
                        S'identifier
                    </NavLink>
                </>
            )) || (
                <>
                    <NavLink exact to="/allposts" activeClassName="nav-active">
                        Fil d'actualités
                    </NavLink>
                    <NavLink exact to="/profile" activeClassName="nav-active">
                        Profil
                    </NavLink>
                </>)}
        </div>
    );
};

export default Navigation;