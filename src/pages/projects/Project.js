import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';

const Project = ({ projectId }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    setProject(docSnapshot.data());
                } else {
                    setError(true);
                }
            } catch (error) {
                console.log('Erro ao obter projeto:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return <p>Carregando projeto...</p>;
    }

    if (error) {
        return <p>Ocorreu um erro ao carregar o projeto.</p>;
    }

    return (
        <>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {/* adicione aqui o resto dos dados que deseja mostrar */}
        </>
    );
};

Project.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default Project;
