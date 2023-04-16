import React, {useState, useEffect} from 'react';
import {Card, Table, Modal, Button, Col, Row, Form, Dropdown} from 'react-bootstrap';
import ActionButton from 'components/common/ActionButton';
import AddUser from './AddUser';
import UserConfig from './UserConfig';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

//Importe funções específicas do Firebase
import {getFirestore, collection, getDocs, doc, deleteDoc, onSnapshot} from 'firebase/firestore';
import {getAuth, deleteUser} from 'firebase/auth';
//Importe padrão do Firebase
import db from '../../firebase';

const auth = getAuth();

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [showAddUser, setShowAddUser] = useState(false);
    const [showUserConfig, setShowUserConfig] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            setUsers(users);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddUserClick = () => {
        setShowAddUser(true);
    };

    const handleAddUserClose = () => {
        setShowAddUser(false);
    };

    const handleAddUserSuccess = () => {
        setShowAddUser(false);
    };

    const handleUserConfig = () => {
        setShowUserConfig(true);
    };

    const handleCloserUserConfig = () => {
        setShowUserConfig(false);
    };

    const handleDeleteUser = (userId) => {
        setShowDeleteModal(true);
        setUserToDelete(userId);
    };

    const handleDeleteConfirmed = async (userId) => {
        // Deletar usuário do Firestore
        await deleteDoc(doc(db, 'users', userId));
        // Deletar usuário do Firebase Authentication
        await deleteUser(auth.currentUser);
        // Atualize o estado para refletir as alterações
        setUsers(users.filter(user => user.id !== userId));
        // Configurar os estados showDeleteModal e userToDelete como false e vazio, respectivamente
        setShowDeleteModal(false);
        setUserToDelete("");
    };

    return (
        <>
            <Row className="justify-content-between mt-3">
                <Col md={5} className="position-relative">
                    <Form.Control
                        type="search"
                        placeholder="Pesquise por nome ou e-mail"
                        aria-label="Search"
                        className="ps-4"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Col>

                <Col md={3} className="text-end">
                    <Button onClick={handleAddUserClick} className="text-white">
                        <FontAwesomeIcon
                            icon="user-plus"
                            className="text-400 text-white me-2 search-box-icon"
                        />
                        Adicionar Usuário
                    </Button>
                </Col>
            </Row>
            <Card className="mt-3">
                <Table responsive>
                    <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Tipo de Usuário</th>
                        <th className="text-end" scope="col">
                            Ações
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
            </Card>
            <Modal show={showAddUser} onHide={handleAddUserClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddUser onSuccess={handleAddUserSuccess}/>
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

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão de usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja excluir este usuário?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleDeleteConfirmed(userToDelete);
                        setShowDeleteModal(false);
                    }}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default UserList;