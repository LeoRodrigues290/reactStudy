import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const ConnectGA4Button = () => {
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

    const handleConnectAnalytics = async () => {
        setConnected(true);
        const userId = user.uid;
        try {
            await firebase.database().ref(`users/${userId}`).update({
                googleAnalyticsConnected: true,
            });
        } catch (error) {
            console.log('Erro ao conectar ao Google Analytics:', error);
        }
    };

    const handleDisconnectAnalytics = async () => {
        setConnected(false);
        const userId = user.uid;
        try {
            await firebase.database().ref(`users/${userId}`).update({
                googleAnalyticsConnected: false,
            });
        } catch (error) {
            console.log('Erro ao desconectar do Google Analytics:', error);
        }
    };

    return (
        <div>
            {user && connected && <p>Google Analytics conectado!</p>}
            {user && !connected && (
                <button onClick={handleConnectAnalytics}>Conectar ao Google Analytics</button>
            )}
            {user && connected && (
                <button onClick={handleDisconnectAnalytics}>Desconectar do Google Analytics</button>
            )}
            {!user && <button onClick={handleLogin}>Entrar com o Google</button>}
            {user && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default ConnectGA4Button;
