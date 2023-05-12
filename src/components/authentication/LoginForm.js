import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = ({ hasLabel, layout, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            toast.success(`Seja Bem-vindo ${formData.email}`, {
                theme: 'colored',
            });
            setTimeout(function () {
                navigate('/');
            }, 1000);
            onLoginSuccess(); // Chame a função onLoginSuccess após o login bem-sucedido
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    toast.error('Endereço de e-mail não encontrado.', {
                        theme: 'colored',
                    });
                    break;
                case 'auth/wrong-password':
                    toast.error('Senha incorreta, por favor tente novamente.', {
                        theme: 'colored',
                    });
                    break;
                default:
                    toast.error(error.message, {
                        theme: 'colored',
                    });
                    break;
            }
        }
    };

    const handleFieldChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'remember' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
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
                        to={`/authentication/${layout}/forgot-password`}
                    >
                        Esqueceu a senha?
                    </Link>
                </Col>
            </Row>

            <Form.Group>
                <Button
                    type="submit"
                    color="primary"
                    className="mt-3 w-100"
                    disabled={!formData.email || !formData.password}
                >
                    Entrar
                </Button>
            </Form.Group>
        </Form>
    );
};

LoginForm.propTypes = {
    hasLabel: PropTypes.bool,
    layout: PropTypes.string,
    onLoginSuccess: PropTypes.func,
};

export default LoginForm;