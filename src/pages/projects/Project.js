import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';

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

const Project = ({projectId}) => {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const getProjectData = async () => {
            if (!projectId) return;

            const projectRef = doc(db, 'projects', projectId);

            try {
                const docSnapshot = await getDoc(projectRef);
                if (docSnapshot.exists()) {
                    const projectData = docSnapshot.data();
                    setProject(projectData);
                }
            } catch (error) {
                console.log('Erro ao obter projeto:', error);
            }
        };

        getProjectData();
    }, [projectId]);

    return (
        <div>
            {project ? (
                <>
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
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