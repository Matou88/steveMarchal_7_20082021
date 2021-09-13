import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Navigation from "../components/Navigation";
import Logo1 from "../components/Logo1";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== controlPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Les passwords ne correspondent pas !!",
      });
    } else {
      try {
        await axios({
          method: "post",
          url: `http://localhost:3000/api/auth/signup`,
          data: {
            username,
            email,
            password,
          },
        });
        Swal.fire({
          title: "Création de compte réussie",
          confirmButtonText: `SignIn`,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = '/login';
          }
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username ou email non valide",
        });
      }
    }
  };

  return (
    <div className="signup-page">
      <Navigation />
      <Logo1 />
      <div className="login-form">
        <h1 className="login-title text-center mt-4 mb-2">S'inscrire</h1>
      </div>
      <div className="signupForm">
        <form action="" method="post" noValidate onSubmit={ handleRegister }>  
          <div className="form-group mx-2 mb-2 mb-lg-4">
            <i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>
            <label for="username">Nom d'utilisateur</label> 
            <input type="text" name="username" id="username" className="form-control text-primary" placeholder="Votre Pseudo" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
          </div>

          <div className="form-group mx-2 mb-2 mb-lg-4">
            <i className="fas fa-envelope"><FontAwesomeIcon icon={faEnvelope} /></i>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" className="form-control text-primary" placeholder="Votre email" value={ email } onChange={ (e) => setEmail(e.target.value)}/>                   
          </div>

          <div className="form-group mx-2 mb-2 mb-lg-4">
            <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
            <label for="password">Mot de passe</label>                    
            <input type="password" name="password" id="password" className="form-control text-primary" placeholder="Votre Mot de passe" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
          </div>

          <div className="form-group mx-2 mb-2 mb-lg-4">
            <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
            <label for="password">Confirmer mot de passe</label>                    
            <input type="password" name="Control-password" id="password" className="form-control text-primary" placeholder="Veuillez ressaisir votre Mot de passe" value={controlPassword} onChange={ (e) => setControlPassword(e.target.value) }/>
          </div>

          <div className="text-center">
            <button type="submit" value="Sign up" className="btn btn-danger mt-2 mb-2 center btn-block">S'inscrire</button>
          </div>
        </form>
        <div className="no-signup text-center">
          <p>J'ai déjà un compte, 
          <NavLink to="/" className="signup-to-login"> je me connecte</NavLink></p>
        </div>
      </div>
    </div>
  );
}
