import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const ProjectConfig = ({ projectName, handleCloseConfig }) => {
    const [newProjectName, setNewProjectName] = useState(projectName);

    const handleProjectNameChange = (event) => {
        setNewProjectName(event.target.value);
    };

    const handleUpdateProject = () => {
        // Lógica para atualizar o nome do projeto com o novo nome
        handleCloseConfig();
    };

    return (
        <Modal show onHide={handleCloseConfig}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Projeto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProjectName">
                        <Form.Label>Nome do Projeto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o novo nome do projeto"
                            value={newProjectName}
                            onChange={handleProjectNameChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfig}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleUpdateProject}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ProjectConfig.propTypes = {
    projectName: PropTypes.string,
    handleCloseConfig: PropTypes.func,
};

export default ProjectConfig;
