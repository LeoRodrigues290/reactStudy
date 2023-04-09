import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const db = getFirestore();

function AddProject(props) {
    const [name, setName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

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
        try {
            await db.collection('projects').add({
                name,
                user_project: selectedUsers.map((id) => db.doc(`users/${id}`)),
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
                <Form.Control type="text" placeholder="Nome" value={name} onChange={handleNameChange} required/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Registrar
            </Button>
        </Form>
    );
}

AddProject.propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
};

export default AddProject;