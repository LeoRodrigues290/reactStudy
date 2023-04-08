import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
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

function AddProject(props) {
    const [name, setName] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const [clienteManager, setClienteManager] = useState([]);
    const [analyst, setAnalyst] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleProjectManagerChange = (event) => {
        setProjectManager(event.target.value);
    };

    const handleClienteManagerChange = (event) => {
        setClienteManager(event.target.value.split(','));
    };

    const handleAnalystChange = (event) => {
        setAnalyst(event.target.value.split(','));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const db = firebase.firestore();
        try {
            await db.collection('projects').add({
                name,
                project_manager: db.doc(`managers/${projectManager}`),
                cliente_manager: clienteManager.map((id) => db.doc(`managers/${id}`)),
                analyst: analyst.map((id) => db.doc(`analysts/${id}`)),
            });
            props.onSuccess();
        } catch (error) {
            console.log(error);
            props.onError();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Nome do Projeto</Form.Label>
                <Form.Control type="text" placeholder="Nome" value={name} onChange={handleNameChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>ID do Gerente de Projeto</Form.Label>
                <Form.Control type="text" placeholder="Gerente de Projeto" value={projectManager} onChange={handleProjectManagerChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>IDs dos Gerentes de Cliente (separados por vírgula)</Form.Label>
                <Form.Control type="text" placeholder="Gerentes de Cliente" value={clienteManager} onChange={handleClienteManagerChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>IDs dos Analistas (separados por vírgula)</Form.Label>
                <Form.Control type="text" placeholder="Analistas" value={analyst} onChange={handleAnalystChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Registrar
            </Button>
        </Form>
    );
}

AddProject.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default AddProject;