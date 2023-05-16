import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
    const auth = getAuth();

    useEffect(() => {
        const handleAuthStateChanged = (user) => {
            setIsAuthenticated(!!user);
            setIsLoading(false); // Defina isLoading como false após verificar a autenticação
        };

        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

        return () => unsubscribe();
    }, [auth]);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
            // Lidar com erros de autenticação, exibir mensagens de erro, etc.
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
            // Lidar com erros de logout, exibir mensagens de erro, etc.
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {isLoading ? (
                // Exibir uma mensagem de carregamento ou um indicador enquanto verifica a autenticação
                <div>Verificando autenticação...</div>
            ) : (
                // Renderizar os componentes filhos quando a verificação de autenticação estiver concluída
                {children}
            )}
        </AuthContext.Provider>
    );
};