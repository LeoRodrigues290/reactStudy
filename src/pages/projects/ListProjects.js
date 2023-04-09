import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Modal} from 'react-bootstrap';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import AddProject from './AddProject';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
const db = getFirestore();

const ListProjects = ({ projectId }) => {
    const [projectData, setProjectData] = useState(null);
    const [showAddProject, setShowAddProject] = useState(false);

    useEffect(() => {
        const getProjects = async () => {
            const projectRef = collection(db, 'projects');
            try {
                const projects = [];
                projectRef.onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        projects.push({ id: doc.id, ...doc.data() });
                    });
                    setProjectData(projects);
                });
            } catch (error) {
                console.log('Erro ao obter projetos:', error);
            }
        };
        getProjects();
    }, []);

    const handleAddProject = () => {
        setShowAddProject(true);
    };

    const handleCloseProject = () => {
        setShowAddProject(false);
    };

    return (
        <>
            <Button onClick={handleAddProject}>Adicionar Projeto</Button>
            {projectData &&
            projectData.map((project) => (
                <Card key={project.id} style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title as="h5">{project.name}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                        <Button color="primary" size="sm">
                            Acessar Projeto
                        </Button>
                    </Card.Body>
                </Card>
            ))}
            <Modal show={showAddProject} onHide={handleCloseProject}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Projeto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddProject/>
                </Modal.Body>
            </Modal>
        </>
    );
};

ListProjects.propTypes = {
    projectId: PropTypes.string,
};

export default ListProjects;
