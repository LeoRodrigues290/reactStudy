import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const auth = getAuth();
    const [user, setUser] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (isLoading) {
        // Aqui você pode exibir um componente de carregamento enquanto verifica a autenticação do usuário
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            element={user ? <Component /> : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;