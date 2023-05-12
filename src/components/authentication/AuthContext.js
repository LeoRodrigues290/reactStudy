import React, { createContext, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    const login = async (email, password) => {
        try {
            // Fazer a autenticação com o Firebase
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            // Lidar com erros de autenticação, exibir mensagens de erro, etc.
        }
    };

    const logout = async () => {
        try {
            // Fazer logout do usuário no Firebase
            await signOut(auth);
            setIsAuthenticated(false);
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
