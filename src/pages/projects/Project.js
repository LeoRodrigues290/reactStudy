import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

//Funções específicas do Firebase
import {doc, getDoc} from 'firebase/firestore';
//Importe padrão do Firebase
import db from '../../firebase';

const Project = ({projectId}) => {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const getProjectData = async () => {
            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProject(docSnap.data());
                } else {
                    console.log('O projeto não foi encontrado!');
                }
            } catch (error) {
                console.log('Erro ao obter projeto:', error);
            }
        };
        getProjectData();
    }, [projectId]);

    if (!project) {
        return <p>Carregando projeto...</p>;
    }

    return (
        <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>
    );

};

Project.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default Project;
