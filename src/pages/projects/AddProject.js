import { useState, useEffect } from 'react';
import Select from 'react-select';
import {Form, Button} from 'react-bootstrap';
import {toast} from "react-toastify";

//Funções específicas do Firebase
import { collection, addDoc, query, getDocs, doc, updateDoc } from 'firebase/firestore';
//Importe padrão do Firebase
import db from '../../firebase';

function AddProject() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        // Obter a lista de usuários e criar as opções do seletor
        async function fetchUsers() {
            const q = query(collection(db, 'users'));
            const querySnapshot = await getDocs(q);
            const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
            setUsers(usersData);
            setUserOptions(usersData.map(user => ({ value: user.id, label: user.name })));
        }
        fetchUsers();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        // Criar um novo projeto no Firestore
        const projectRef = await addDoc(collection(db, 'projects'), { name, users_project: [] });
        // Adicionar a referência do projeto ao objeto "users_project" de cada usuário selecionado
        const updatePromises = users.filter(user => user.isSelected).map(async user => {
            if (!user.users_project) user.users_project = [];
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, { users_project: [...user.users_project, projectRef.id] });
        });
        await Promise.all(updatePromises);

        toast.success(`Projeto cadastrado com sucesso!`, {
            theme: 'colored'
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleUserSelect(selectedOptions) {
        const selectedUserIds = selectedOptions.map(option => option.value);
        setUsers(users.map(user => ({ ...user, isSelected: selectedUserIds.includes(user.id) })));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Nome do Projeto</Form.Label>
                <Form.Control type="text" placeholder="Nome" value={name} onChange={handleNameChange} required/>
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Selecione os usuários</Form.Label>
                <Select options={userOptions} isMulti={true} onChange={handleUserSelect} />
            </Form.Group>

            <Button className="mt-3 w-100" variant="primary" type="submit">
                Registrar
            </Button>
        </Form>
    );
}

export default AddProject;
