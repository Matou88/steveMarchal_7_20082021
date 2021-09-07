import React from 'react';
import LoginForm from '../components/LoginForm';
import Logo1 from '../components/Logo1';
import Navigation from '../components/Navigation';


const Home = () => {
    return (
        <div className="login-page">
            <Navigation />
            <Logo1 />
            <div className="login-form">
                <h1 className="login-title text-center mt-4 mb-2">Se connecter</h1>
                <LoginForm />
            </div>     
        </div>
    );
};

export default Home;