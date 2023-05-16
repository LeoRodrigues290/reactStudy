import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import Avatar from 'components/common/Avatar';
import defaultUserImage from 'assets/img/icons/user.png';

import {getAuth, signOut} from 'firebase/auth';

const ProfileDropdown = () => {
    const [user, setUser] = useState(null);
    const {currentUser} = getAuth();

    useEffect(() => {
        if (currentUser && currentUser !== user) {
            setUser(currentUser);
        }
    }, [currentUser, user]);

    const handleLogout = async () => {
        try {
            await signOut(getAuth()); // Faz o logout do usuário atual
            setUser(null); // Limpa o estado do usuário
        } catch (error) {
            console.log('Erro ao fazer logout:', error);
        }
    };

    return (
        <Dropdown navbar={true} as="li">
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className="pe-0 ps-2 nav-link"
            >
                {user ? <Avatar/> : <Avatar src={defaultUserImage}/>}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-caret dropdown-menu-card dropdown-menu-end">
                <div className="bg-white rounded-2 py-2 dark__bg-1000">
                    {user ? (
                        <>
                            <Dropdown.Item className="fw-bold text-warning" href="#!">
                                <FontAwesomeIcon icon="crown" className="me-1"/>
                                <span>Go Pro</span>
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item>Olá, {user.displayName}</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/perfil">Meu Perfil</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                        </>
                    ) : (
                        <Dropdown.Item as={Link} to="/login">
                            Fazer login
                        </Dropdown.Item>
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
