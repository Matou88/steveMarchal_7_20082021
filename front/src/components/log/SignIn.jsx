import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email ou password incorrect !!",
        });
      });
    };

    return (
      <div className="loginForm">
          <form action="#" onSubmit={ handleLogin }>
          {errors['g'] ? (
                  <div className="login-form__errors">
                      { errors['g'] }
                  </div>
              ) : '' }               

              <div className="form-group mb-2">
                <i className="fas fa-user"><FontAwesomeIcon icon={faEnvelope} /></i>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" className="form-control login-input" placeholder="Votre email" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
              {errors['email'] ? (
                  <span className="login-form__error">{errors['email']}</span>
              ) : '' }
              </div>

              <div className="form-group mb-2">
                <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
                <label htmlFor="password">Mot de passe</label>                    
                <input type="password" name="password" id="password" className="form-control login-input" placeholder="Votre mot de passe" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                {errors['password'] ? (
                <span className="login-error">{errors['password']}</span>
              ) : '' }

              </div>
              <div className="text-center">
                  <button type="submit" value="Login" className="btn btn-danger mt-2 mb-2 center btn-block">Se connecter</button>
              </div>
          </form>
          <div className="no-login text-center">
              <p>Vous n'avez pas encore de compte ? <NavLink to="/signup">Cliquez ici</NavLink></p> 
          </div>
      </div>   
    );    
  }