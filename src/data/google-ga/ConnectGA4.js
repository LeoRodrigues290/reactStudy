import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectGA4 = () => {
    const navigate = useNavigate();
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState(firebase.auth().currentUser);
    let unsubscribe;

    useEffect(() => {
        const checkConnection = async (userId) => {
            try {
                const snapshot = await firebase
                    .database()
                    .ref(`users/${userId}/googleAnalyticsConnected`)
                    .once('value');
                setConnected(snapshot.val() === true);
            } catch (error) {
                console.log('Erro ao verificar conexão:', error);
            }
        };

        const handleAuthStateChanged = (user) => {
            if (user) {
                setUser(user);
                checkConnection(user.uid);
            } else {
                setUser(null);
                setConnected(false);
            }
        };

        unsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChanged);

        return () => unsubscribe();
    }, []);

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    };

    const handleLogout = () => {
        firebase.auth().signOut();
    };

    return (
        <div>
            {!user && <button onClick={handleLogin}>Entrar com o Google</button>}
            {user && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default ConnectGA4;
