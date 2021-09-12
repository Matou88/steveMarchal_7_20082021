import React from 'react';
import Logo1 from './Logo1';
import Navigation from './Navigation';

const Error404 = () => {
    return (
        <div className="text-center error">
            <Navigation />
            <Logo1 />
            <h1 className="mt-4 bg-light">Erreur, la page demandée n'est pas trouvée :(</h1>           
        </div>
    );
};

export default Error404;