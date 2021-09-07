import React from 'react';
import Navigation from '../components/Navigation';
import Logo1 from '../components/Logo1';
import SignupForm from '../components/SignupForm';


const Signup = () => {
    return (
        <div className="signup-page">
            <Navigation />
            <Logo1 />
            <div className="signup">
                <h1 className="signup-title text-center mt-4 mb-2">S'inscrire</h1>
                <SignupForm />
            </div>
        </div>
    );
};

export default Signup;