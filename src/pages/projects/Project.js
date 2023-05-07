import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Funções específicas do Firebase
import { doc, getDoc } from 'firebase/firestore';
//Importe padrão do Firebase
import db from '../../firebase';

const Project = ({ projectId }) => {
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                // verifica se projectId não está vazio
                if (!projectId) {
                    console.log('Nenhum ID do projeto foi passado!');
                    return;
                }
                const projectRef = doc(db, 'projects', projectId);
                const projectSnapshot = await getDoc(projectRef);
                // verifica se o documento existe
                if (projectSnapshot.exists()) {
                    setProjectData(projectSnapshot.data());
                } else {
                    console.log('Projeto não encontrado');
                }
            } catch (error) {
                console.log('Erro ao obter projeto:', error);
            }
        };
        fetchProjectData();
    }, [db, projectId]);

    return (
        <>
            {projectData ? (
                <div>
                    <h1>{projectData.name}</h1>
                    <p>{projectData.description}</p>
                    <p>{projectData.status}</p>
                </div>
            ) : (
                <p>Carregando projeto...</p>
            )}
        </>
    );
};

Project.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default Project;
