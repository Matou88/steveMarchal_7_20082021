import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleValidation = () => {
        let formIsValid = true;
        let errorsTmp = {};

        // Email validation
        if (!email) {
            errorsTmp['email'] = 'L\'email ne peut pas être vide';
        } else if (!email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
            errorsTmp['email'] = 'L\'email n\'est pas valide';
        }

        // Password validation
        if (!password) {
            errorsTmp['password'] = 'Le mot de passe ne peut pas être vide';
        }

        if (Object.keys(errorsTmp).length !== 0) {
            formIsValid = false;
        }
        setErrors( errorsTmp )

        return formIsValid;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            axios.post('http://localhost:3300/api/auth/login', {
                email,
                password
            })
                .then(res => {
                    console.log(res.data);
                    // const token = res.data;

                    function setAxiosToken(token) {
                        axios.defaults.headers["Authorization"] = "Bearer " + token;
                    }
                    setAxiosToken();
                    // window.location.href = "/allposts";
                })
                .catch(err => {
                    let errorsTmp = {};
                    if (err.response.data.error.errors) {
                        for (let error of err.response.data.error.errors) {
                            errorsTmp[error.path] = error.message;
                        }
                    } else if (err.response.data.error) {
                        errorsTmp['g'] = err.response.data.error;
                    }
                    setErrors( errorsTmp );
                })
        }
    }
        
    const handleChangeEmail = (event) => {
        setEmail(event.target.value.trim());
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value.trim());
    }

    return (
            <div className="loginForm">
                <form action="" method="post" noValidate onSubmit={handleFormSubmit}>
                {errors['g'] ? (
                        <div className="login-form__errors">
                            { errors['g'] }
                        </div>
                    ) : '' }               

                    <div className="form-group mb-2">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control login-input" placeholder="Votre email" value={ email } onChange={ handleChangeEmail }/>
                    {errors['email'] ? (
                        <span className="login-form__error">{errors['email']}</span>
                    ) : '' }
                    </div>

                    <div className="form-group mb-2">
                        <label for="password">Password</label>                    
                    <input type="password" name="password" id="password" className="form-control login-input" placeholder="Votre mot de passe" value={ password } onChange={ handleChangePassword } />
                    {errors['password'] ? (
                        <span className="login-error">{errors['password']}</span>
                    ) : '' }

                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-danger mt-2 mb-2 center btn-block">Se connecter</button>
                    </div>
                </form>
                <div className="no-login text-center">
                    <p>Vous n'avez pas encore de compte ? <NavLink to="/signup">Cliquez ici</NavLink></p> 
                </div>
            </div>   
        );    
}

export default LoginForm;