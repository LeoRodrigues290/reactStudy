import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const RegistrationForm = ({ hasLabel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAccepted: false,
        user_type: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;
            await updateProfile(auth.currentUser, { displayName: formData.name });

            // Crie um documento para o usuário no Firestore com o mesmo ID do usuário do Firebase Authentication
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                name: formData.name,
                email: formData.email,
                user_type: formData.user_type
            });

            toast.success(`Cadastro realizado com sucesso como ${formData.name}`, {
                theme: 'colored'
            });

        } catch (error) {
            toast.error(error.message, { theme: 'colored' });
        }
    };

    const handleFieldChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>Nome</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? 'Nome' : ''}
                    value={formData.name}
                    name="name"
                    onChange={handleFieldChange}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>E-mail</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? 'E-mail' : ''}
                    value={formData.email}
                    name="email"
                    onChange={handleFieldChange}
                    type="text"
                />
            </Form.Group>

            <Row className="g-2 mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Tipo de usuário</Form.Label>
                    <Form.Control as="select" name="user_type" value={formData.user_type} onChange={handleFieldChange}>
                        <option value="">Selecione um tipo de usuário</option>
                        <option value="admin">Administrador</option>
                        <option value="project_manager">Gerente de Projeto</option>
                        <option value="cliente_manager">Gerente de Projeto (Cliente)</option>
                        <option value="analyst">Analista</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} sm={6}>
                    {hasLabel && <Form.Label>Senha</Form.Label>}
                    <Form.Control
                        placeholder={!hasLabel ? 'Password' : ''}
                        value={formData.password}
                        name="password"
                        onChange={handleFieldChange}
                        type="password"
                    />
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                    {hasLabel && <Form.Label>Confirme sua senha</Form.Label>}
                    <Form.Control
                        placeholder={!hasLabel ? 'Confirm Password' : ''}
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleFieldChange}
                        type="password"
                    />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
                    <Form.Check.Input
                        type="checkbox"
                        name="isAccepted"
                        checked={formData.isAccepted}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                isAccepted: e.target.checked
                            })
                        }
                    />
                    <Form.Check.Label className="form-label">
                        Eu li e aceito com os <Link to="#!">Termos de Uso</Link> e{' '}
                        <Link to="#!">Política de Privacidade</Link>
                    </Form.Check.Label>
                </Form.Check>
            </Form.Group>

            <Form.Group className="mb-4">
                <Button
                    className="w-100"
                    type="submit"
                    disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        !formData.isAccepted
                    }
                >
                    Cadastrar
                </Button>
            </Form.Group>
        </Form>
    );
};

RegistrationForm.propTypes = {
    hasLabel: PropTypes.bool
};

export default RegistrationForm;
