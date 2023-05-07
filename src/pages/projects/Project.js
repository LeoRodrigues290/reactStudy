import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

//Funções específicas do Firebase
import {doc, getDoc} from "firebase/firestore";
//Importe padrão do Firebase
import db from '../../firebase';

const Project = ({projectId}) => {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const getProjectData = async () => {
            if (!projectId) return;

            const projectRef = doc(db, "projects", projectId);
            try {
                const docSnapshot = await getDoc(projectRef);
                if (!docSnapshot.exists()) {
                    throw new Error(`O projeto com id ${projectId} não existe.`);
                }
                const projectData = docSnapshot.data();
                setProject(projectData);
            } catch (error) {
                console.log(`Erro ao obter projeto ${projectId}:`, error);
                setProject(null);
            }
        };

        getProjectData();
    }, [projectId]);

    return (
        <div>
            {project ? (
                <>
                    <h1>{project.name}</h1>
                </>
            ) : (
                <div>Carregando projeto...</div>
            )}
        </div>
    );
};

Project.propTypes = {
    projectId: PropTypes.string,
};

export default Project;
