import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Modal, Row, Col, Form} from 'react-bootstrap';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import AddProject from './AddProject';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

const ListProjects = ({name, description}) => {
    const [projectData, setProjectData] = useState(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            const projectRef = collection(db, 'projects');
            try {
                const projects = [];
                const querySnapshot = await getDocs(projectRef);
                querySnapshot.forEach((doc) => {
                    projects.push({id: doc.id, ...doc.data()});
                });
                setProjectData(projects);
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

    const handleProjectClick = (projectId) => {
        navigate(`/projeto/${projectId}`);
    };

    return (
        <>
            <Row className="justify-content-between mt-3">
                <Col md={5} className="position-relative">
                    <Form.Control
                        type="search"
                        placeholder="Pesquise o nome do projeto"
                        aria-label="Search"
                        className="ps-4"
                    />
                </Col>

                <Col md={3} className="text-end">
                    <Button onClick={handleAddProject} className="text-white">
                        <FontAwesomeIcon
                            icon="plus"
                            className="text-400 text-white me-2"
                        />
                        Adicionar Projeto
                    </Button>
                </Col>
            </Row>
            <Row className="g-3">
                {projectData ? (
                    projectData.map((project) => (
                        <Col key={project.id} md={4} xxl={4}>
                            <Card className="my-3">
                                <Card.Body>
                                    <Card.Title as="h5">{project.name}</Card.Title>
                                    <Card.Text>{project.description}</Card.Text>
                                    <Button onClick={() => handleProjectClick(project.id)} className="text-white">
                                        Ver Projeto
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Carregando projetos...</p>
                )}
            </Row>
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
    name: PropTypes.string,
    description: PropTypes.string,
};

export default ListProjects;