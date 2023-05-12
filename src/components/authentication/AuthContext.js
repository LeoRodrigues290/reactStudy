import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const handleAuthStateChanged = (user) => {
            setIsAuthenticated(!!user);
        };

        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

        return () => unsubscribe();
    }, [auth]);

    const login = async (email, password) => {
        try {
            // Fazer a autenticação com o Firebase
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
            // Lidar com erros de autenticação, exibir mensagens de erro, etc.
        }
    };

    const logout = async () => {
        try {
            // Fazer logout do usuário no Firebase
            await signOut(auth);
        } catch (error) {
            console.error(error);
            // Lidar com erros de logout, exibir mensagens de erro, etc.
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
