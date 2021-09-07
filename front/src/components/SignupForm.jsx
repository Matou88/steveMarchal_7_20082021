import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

const SignupForm = (props) => {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    

    const handleValidation = () => {
        let { fields } = this.state;
        let formIsValid = true
        let errorsTmp = {};

        // Email validation
        if (!email) {
            errorsTmp['email'] = 'L\'email doit être renseigné';
        } else if (!fields['email'].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
            errorsTmp['email'] = 'L\'email n\'est pas valide';
        }

        // Username validation
        if (!username) {
            errorsTmp['username'] = 'Le nom d\'utilisateur doit être renseigné';
        } else if (username.length < 3) {
            errorsTmp['username'] = 'Le nom d\'utilisateur doit contenir au minimum 3 caractères';
        } else if (username.length > 60) {
            errorsTmp['username'] = 'Le nom d\'utilisateur doit contenir au maximum 60 caractères';
        }

        // Password validation
        if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)) {
            errorsTmp['password'] = 'Le mot de passe doit contenir au minimum 8 caractères dont un caractère minuscule, un majuscule, un chiffre et un caractère spécial !@#$%^&*';
        }

        if (Object.keys(errors).length !== 0) {
            formIsValid = false;
        }
        setErrors( errorsTmp );

        return formIsValid;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            axios.post('http://localhost:3300/api/auth/signup', {
                email,
                username,
                password
            })
                .then(res => {
                    window.location.href = "/login";
                })
                .catch(err => {
                    let errorsTmp = {};
                    for (let error of err.response.data.error.errors) {
                        errorsTmp[error.path] = error.message;
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
    const handleChangeUsername = (event) => {
        setUsername(event.target.value.trim());
    }

    return (
        <div className="signupForm">
            <form action="" method="post" noValidate onSubmit={handleFormSubmit}>
            {errors['g'] ? (
                    <div className="login-error">
                        { errors['g'] }
                    </div>
                ) : '' }
                
                <div className="form-group mx-2 mb-2 mb-lg-4">
                    <label for="username">Nom d'utilisateur</label> 
                    <input type="text" name="username" id="username" className="form-control text-primary" placeholder="Votre Pseudo" value={ username } onChange={handleChangeUsername}/>
                    {errors['username'] ? (
                    <span className="login-error">{errors['username']}</span>
                    ) : '' }
                </div>

                <div className="form-group mx-2 mb-2 mb-lg-4">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" className="form-control text-primary" placeholder="Votre email" value={ email } onChange={handleChangeEmail}/>
                    {errors['email'] ? (
                    <span className="login-error">{errors['email']}</span>
                    ) : '' }                    
                </div>

                <div className="form-group mx-2 mb-2 mb-lg-4">
                    <label for="password">Mot de passe</label>                    
                    <input type="password" name="password" id="password" className="form-control text-primary" placeholder="Votre Mot de passe" value={ password } onChange={handleChangePassword}/>
                    {errors['password'] ? (
                    <span className="login-error">{errors['password']}</span>
                    ) : '' }
                </div>              
                <div className="text-center">
                    <button type="submit" className="btn btn-danger mt-2 mb-2 center btn-block">S'inscrire</button>
                </div>
            </form>
            <div className="no-signup text-center">
                <p>J'ai déjà un compte, 
                <NavLink to="/" className="signup-to-login"> je me connecte</NavLink></p>
            </div>
        </div>
    );       
}

export default SignupForm;