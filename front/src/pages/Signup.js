import React from 'react';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import Logo1 from '../components/Logo1';
import SignupForm from '../components/SignupForm';


const Signup = () => {
    return (
        <div>
            <Navigation />
            <Logo1 />
            <div className="signup">
                <h1 className="signup-title">Je m'inscris</h1>
                <SignupForm />
            </div>

            <div className="no-signup">
                <p>J'ai déjà un compte 
                <Link to="/login" className="signup-to-login">, je me connecte</Link></p>
            </div>
        </div>
    );
};

export default Signup;