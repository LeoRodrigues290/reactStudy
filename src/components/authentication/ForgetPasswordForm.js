import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Button, Form} from 'react-bootstrap';
import {initializeApp} from "firebase/app";
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();

const ForgetPasswordForm = () => {
    // State
    const [email, setEmail] = useState('');

    // Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                toast.success(`Um e-mail foi enviado para ${email} com link de redefinição de senha`, {
                    theme: 'colored'
                });
            } catch (error) {
                console.error(error);
                toast.error('Ocorreu um erro ao enviar o e-mail de redefinição de senha', {
                    theme: 'colored'
                });
            }
        }
    };

    return (
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control
                    placeholder={'E-mail'}
                    value={email}
                    name="email"
                    onChange={({target}) => setEmail(target.value)}
                    type="email"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Button className="w-100" type="submit" disabled={!email}>
                    Enviar
                </Button>
            </Form.Group>

            <Link className="fs--1 text-600" to="#!">
                Não Conseguiu recuperar? Entre em contato conosco.
            </Link>
        </Form>
    );
};

ForgetPasswordForm.propTypes = {
    layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = {layout: 'simple'};

export default ForgetPasswordForm;
