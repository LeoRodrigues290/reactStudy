import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

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

const LoginForm = ({hasLabel, layout}) => {
    // State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    // Handlers
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            toast.success(`Seja Bem-vindo ${formData.email}`, {
                theme: 'colored'
            });
            setTimeout(function() {
                window.location.href = '/';
            }, 1000);
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    toast.error("Endereço de e-mail não encontrado.", {
                        theme: 'colored'
                    });
                    break;
                case "auth/wrong-password":
                    toast.error("Senha incorreta, por favor tente novamente.", {
                        theme: 'colored'
                    });
                    break;
                default:
                    toast.error(error.message, {
                        theme: 'colored'
                    });
                    break;
            }
        }
    };


    const handleFieldChange = e => {
        const {name, value, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'remember' ? checked : value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>E-mail</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? 'E-mail' : ''}
                    value={formData.email}
                    name="email"
                    onChange={handleFieldChange}
                    type="email"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>Senha</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? 'Senha' : ''}
                    value={formData.password}
                    name="password"
                    onChange={handleFieldChange}
                    type="password"
                />
            </Form.Group>

            <Row className="justify-content-between align-items-center">
                <Col xs="auto">
                    <Form.Check type="checkbox" id="rememberMe" className="mb-0">
                        <Form.Check.Input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleFieldChange}
                        />
                        <Form.Check.Label className="mb-0 text-700">
                            Lembrar de mim
                        </Form.Check.Label>
                    </Form.Check>
                </Col>

                <Col xs="auto">
                    <Link
                        className="fs--1 mb-0"
                        to={`/authentication/${layout}/forgot-password`}>
                        Esqueceu a senha?
                    </Link>
                </Col>
            </Row>

            <Form.Group>
                <Button
                    type="submit"
                    color="primary"
                    className="mt-3 w-100"
                    disabled={!formData.email || !formData.password}>
                    Entrar
                </Button>
            </Form.Group>
        </Form>
    );
};

LoginForm.propTypes = {
    layout: PropTypes.string,
    hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
    layout: 'simple',
    hasLabel: false
};

export default LoginForm;
