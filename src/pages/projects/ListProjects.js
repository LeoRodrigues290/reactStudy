import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Modal, Row, Col, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';
import AddProject from './AddProject';
import ConnectGA4Button from "../dashboard/google-ga/ConnectGA4Button";

//Funções específicas do Firebase
import {collection, getDocs,} from 'firebase/firestore';
//Importe padrão do Firebase
import db from '../../firebase';

const ListProjects = ({name}) => {
    const [projectData, setProjectData] = useState(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const navigate = useNavigate();

    const handleAddProject = () => setShowAddProject(true);
    const handleCloseProject = () => setShowAddProject(false);
    const handleProjectClick = (projectId) =>
        navigate(`/projeto/${projectId}`);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectRef = collection(db, 'projects');
                const querySnapshot = await getDocs(projectRef);

                const projects = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProjectData(projects);
            } catch (error) {
                console.log('Erro ao obter projetos:', error);
            }
        };
        fetchProjects();
    }, [db]);

    return (
        <>
            <ConnectGA4Button />
            <Row className="justify-content-between mt-3">
                <Col md={5} className="position-relative">
                    <Form.Control
                        type="search"
                        placeholder="Pesquise o nome do projeto"
                        aria-label="Search"
                        className="ps-4"
                    />
                </Col>

                <Col md={4} className="text-end">
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
                {projectData && projectData.map((project) => (
                    <Col key={project.id} md={4} xxl={4}>
                        <Card className="my-3">
                            <Card.Body>
                                <Card.Title as="h5">{project.name}</Card.Title>
                                <Button onClick={() => handleProjectClick(project.id)} className="text-white">
                                    Ver Projeto
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
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
};

export default ListProjects;