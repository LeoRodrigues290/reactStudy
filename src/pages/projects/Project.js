import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';

const Project = ({ projectId }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchProject = async () => {
            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnapshot = await getDoc(docRef);
                if (isMounted) {
                    setProject(docSnapshot.data());
                    setLoading(false);
                }
            } catch (error) {
                console.log('Erro ao obter projeto:', error);
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchProject();
        return () => {
            isMounted = false;
        };
    }, [projectId]);

    if (loading || !project) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Ocorreu um erro ao buscar as informações do projeto.</p>;
    }

    return (
        <>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </>
    );
};

Project.propTypes = {
    projectId: PropTypes.string,
};

export default Project;
