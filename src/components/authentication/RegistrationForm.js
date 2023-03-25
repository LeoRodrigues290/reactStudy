import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

const RegistrationForm = ({ hasLabel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAccepted: false
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
            await auth.currentUser.updateProfile({ displayName: formData.name });
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
                {hasLabel && <Form.Label>Name</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? 'Name' : ''}
                    value={formData.name}
                    name="name"
                    onChange={handleFieldChange}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>Email address</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? 'Email address' : ''}
                    value={formData.email}
                    name="email"
                    onChange={handleFieldChange}
                    type="text"
                />
            </Form.Group>

            <Row className="g-2 mb-3">
                <Form.Group as={Col} sm={6}>
                    {hasLabel && <Form.Label>Password</Form.Label>}
                    <Form.Control
                        placeholder={!hasLabel ? 'Password' : ''}
                        value={formData.password}
                        name="password"
                        onChange={handleFieldChange}
                        type="password"
                    />
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                    {hasLabel && <Form.Label>Confirm Password</Form.Label>}
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
                        I accept the <Link to="#!">terms</Link> and{' '}
                        <Link to="#!">privacy policy</Link>
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
                    Register
                </Button>
            </Form.Group>
        </Form>
    );
};

RegistrationForm.propTypes = {
    hasLabel: PropTypes.bool
};

export default RegistrationForm;
