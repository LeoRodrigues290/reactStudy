import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, query, where, getDocs} from 'firebase/firestore';

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
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const usersQuery = query(collection(db, 'users'));
            const usersSnapshot = await getDocs(usersQuery);
            const users = usersSnapshot.docs.map(doc => ({ value: doc.id, label: doc.data().name }));
            setUserOptions(users);
        };
        loadUsers();
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUserSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions.map(option => option.value));
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
            props.onError ? props.onError() : null;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Nome do Projeto</Form.Label>
                <Form.Control type="text" placeholder="Nome" value={name} onChange={handleNameChange} required/>
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Selecione os usuários</Form.Label>
                <Select options={userOptions} isMulti={true} onChange={handleUserSelect} />
            </Form.Group>

            <Button className="mt-3 w-100" variant="primary" type="submit">
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
