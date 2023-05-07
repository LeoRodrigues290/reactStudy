import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Funções específicas do Firebase
import { doc, getDoc } from 'firebase/firestore';
//Importe padrão do Firebase
import db from '../../firebase';

const Project = ({ projectId }) => {
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectRef = doc(db, 'projects', projectId);
                const projectSnapshot = await getDoc(projectRef);

                if (projectSnapshot.exists()) {
                    setProjectData(projectSnapshot.data());
                } else {
                    console.log('O projeto não foi encontrado');
                }
            } catch (error) {
                console.log('Erro ao obter o projeto:', error);
            }
        };
        fetchProject();
    }, [projectId]);

    if (!projectData) {
        return <p>Carregando informações do projeto...</p>;
    }

    return (
        <div>
            <h1>{projectData.name}</h1>
            <p>{projectData.description}</p>
        </div>
    );
};

Project.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default Project;