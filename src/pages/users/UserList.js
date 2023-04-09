import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import ActionButton from 'components/common/ActionButton';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, deleteUser as deleteAuthUser } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import AddUser from './AddUser';
import { toast } from 'react-toastify';

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

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const users = querySnapshot.docs.map((doc) => doc.data());
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

    const handleDeleteUserClick = async (email) => {
        try {
            const batch = db.batch();
            const userRef = collection(db, 'users').doc(email);

            // Remove o usuário do Firestore
            batch.delete(userRef);

            // Remove o usuário do Firebase Authentication
            const users = await auth.getUsersByEmail(email);
            const uid = users[0].uid;
            const user = auth.currentUser;

            if (user && user.email === email) {
                await user.delete();
            } else {
                await deleteAuthUser(auth, uid);
            }

            await batch.commit();

            // Atualiza a lista de usuários na tela
            setUsers(users.filter((user) => user.email !== email));

            // Exibe a mensagem de sucesso
            toast.success(`Usuário ${email} deletado com sucesso.`, {
                theme: 'colored'
            });

        } catch (error) {
            console.error(error);
            // Exibe a mensagem de erro
            toast.error('Ocorreu um erro ao deletar o usuário.', {
                theme: 'colored'
            });
        }
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
                {filteredUsers.map(({ name, email, user_type }) => (
                    <tr key={email}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{user_type}</td>
                        <td className="text-end">
                            <ActionButton
                                icon="edit"
                                title="Editar"
                                variant="action"
                                className="p-0 me-2"
                            />
                            <ActionButton
                                icon="trash-alt"
                                title="Deletar"
                                variant="action"
                                className="p-0"
                                onClick={() => handleDeleteUserClick(email)}
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
                    <AddUser />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserList;