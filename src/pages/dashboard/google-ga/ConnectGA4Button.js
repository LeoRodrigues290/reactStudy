import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const ConnectGA4Button = ({userId}) => {
    const [isConnected, setConnected] = useState(false);

    const connectToGoogleAnalytics = async () => {
        try {
            const app = firebase.app();
            const analytics = firebase.analytics(app);
            await analytics.signInWithGoogle();

            const firestore = firebase.firestore(app);
            await firestore.collection('users').doc(userId).update({
                googleAnalyticsConnected: true,
            });

            setConnected(true);
        } catch (error) {
            console.error('Erro ao conectar ao Google Analytics:', error);
        }
    };

    const disconnectFromGoogleAnalytics = async () => {
        try {
            const app = firebase.app();
            const analytics = firebase.analytics(app);
            await analytics.signOut();

            const firestore = firebase.firestore(app);
            await firestore.collection('users').doc(userId).update({
                googleAnalyticsConnected: false,
            });

            setConnected(false);
        } catch (error) {
            console.error('Erro ao desconectar do Google Analytics:', error);
        }
    };


    useEffect(() => {
        const checkGoogleAnalyticsConnection = async () => {
            try {
                const firestore = firebase.firestore();
                const userDoc = await firestore.collection('users').doc(userId).get();
                const userData = userDoc.data();

                setConnected(!!userData?.googleAnalyticsConnected);
            } catch (error) {
                console.error('Erro ao verificar a conexão com o Google Analytics:', error);
            }
        };

        checkGoogleAnalyticsConnection();
    }, [userId]);


    return (
        <div>
            {!isConnected ? (
                <button onClick={connectToGoogleAnalytics}>Conectar com Google Analytics</button>
            ) : (
                <div>
                    <p>Google Analytics conectado</p>
                    <button onClick={disconnectFromGoogleAnalytics}>Desconectar conta Google Analytics</button>
                </div>
            )}
        </div>
    );
};

ConnectGA4Button.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ConnectGA4Button;