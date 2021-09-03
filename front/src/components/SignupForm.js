import React, {Component} from 'react';
import axios from 'axios';

class SignupForm extends Component {

    state = {
        fields: {
            email: '',
            username: '',
            password: ''
        },
        errors: {}
    }

    handleValidation() {
        let { fields } = this.state;
        let formIsValid = true
        let errors = {};

        // Email validation
        if (!fields['email']) {
            errors['email'] = 'L\'email doit être renseigné';
        } else if (!fields['email'].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
            errors['email'] = 'L\'email n\'est pas valide';
        }

        // Username validation
        if (!fields['username']) {
            errors['username'] = 'Le nom d\'utilisateur doit être renseigné';
        } else if (fields['username'].length < 3) {
            errors['username'] = 'Le nom d\'utilisateur doit contenir au minimum 3 caractères';
        } else if (fields['username'].length > 60) {
            errors['username'] = 'Le nom d\'utilisateur doit contenir au maximum 60 caractères';
        }

        // Password validation
        if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(fields['password'])) {
            errors['password'] = 'Le mot de passe doit contenir au minimum 8 caractères dont un caractère minuscule, un majuscule, un chiffre et un caractère spécial !@#$%^&*';
        }

        if (Object.keys(errors).length !== 0) {
            formIsValid = false;
        }
        this.setState({ errors });

        return formIsValid;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;
            axios.post('http://localhost:3300/api/auth/signup', {
                email: fields['email'],
                username: fields['username'],
                password: fields['password']
            })
                .then(res => {
                    const date = new Date();
                    date.setTime(date.getTime() + (24*60*60*1000));
                    document.cookie = 'token=' + res.data.token + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict';
                    window.location.href = "/login";
                })
                .catch(err => {
                    console.log(err);
                    let errors = {};
                    for (let error of err.response.data.error.errors) {
                        errors[error.path] = error.message;
                    }
                    this.setState({ errors });
                })
        }
    }

    handleChange = (event) => {
        let { fields } = this.state;
        fields[event.target.name] = event.target.value.trim();
        this.setState({
            fields
        })
    }

    render() {
        let { errors } = this.state;

        return (
            <div className="signupForm">
                <form action="" method="post" noValidate onSubmit={this.handleFormSubmit}>
                {errors['g'] ? (
                        <div className="login-error">
                            { errors['g'] }
                        </div>
                    ) : '' }

                    
                    <div className="form-group">
                        <label for="username">Nom d'utilisateur</label> 
                    <input type="text" name="username" id="username" className="form-control" placeholder="Votre Pseudo" value={this.state.fields['username']} onChange={this.handleChange}/>
                    {errors['username'] ? (
                        <span className="login-form__error">{errors['username']}</span>
                    ) : '' }
                    </div>

                    <div className="form-group">
                        <label for="email">Email</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="Votre email" value={this.state.fields['email']} onChange={this.handleChange}/>
                    {errors['email'] ? (
                        <span className="login-form__error">{errors['email']}</span>
                    ) : '' }                    
                    </div>

                    <div className="form-group">
                        <label for="password">Mot de passe</label>                    
                    <input type="password" name="password" id="password" className="form-control" placeholder="Votre Mot de passe" value={this.state.fields['password']} onChange={this.handleChange}/>
                    {errors['password'] ? (
                        <span className="login-error">{errors['password']}</span>
                    ) : '' }
                    </div>              

                    <button type="submit" className="btn">S'inscrire</button>
                    
                </form>
            </div>
        );       
    }
}

export default SignupForm;