import React, {useState, useEffect} from 'react';
import {Table, Modal, Button} from 'react-bootstrap';
import ActionButton from 'components/common/ActionButton';
import {getFirestore, collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import {getAuth, deleteUser} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import AddUser from './AddUser';
import UserConfig from './UserConfig';

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
const auth = getAuth();

const UserList = () => {
    const [users, setUsers] = useState([]);
    const filteredUsers = users.filter(user => user.email !== "leo@allomni.com.br");
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUserConfig, setShowUserConfig] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const users = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            setUsers(users);
        };
        fetchUsers();
    }, []);

    const handleAddUserClick = () => {
        setShowAddUser(true);
    };

    const handleCloseAddUser = () => {
        setShowAddUser(false);
    };

    const handleUserConfig = () => {
        setShowUserConfig(true);
    };

    const handleCloserUserConfig = () => {
        setShowUserConfig(false);
    };

    const handleDeleteUser = async (userId) => {
        // Deletar usuário do Firestore
        await deleteDoc(doc(db, 'users', userId));
        // Deletar usuário do Firebase Authentication
        await deleteUser(auth.currentUser);
        // Atualize o estado para refletir as alterações
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <>
            <Button onClick={handleAddUserClick}>Adicionar Usuário</Button>
            <Table responsive>
                <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Tipo de Usuário</th>
                    <th className="text-end" scope="col">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map(({id, name, email, user_type}) => (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{user_type}</td>
                        <td className="text-end">
                            <ActionButton
                                icon="edit"
                                title="Editar"
                                variant="action"
                                className="p-0 me-2"
                                onClick={handleUserConfig}
                            />
                            <ActionButton
                                icon="trash-alt"
                                title="Deletar"
                                variant="action"
                                className="p-0"
                                onClick={() => handleDeleteUser(id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showAddUser} onHide={handleCloseAddUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddUser/>
                </Modal.Body>
            </Modal>

            <Modal show={showUserConfig} onHide={handleCloserUserConfig}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserConfig/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserList;
