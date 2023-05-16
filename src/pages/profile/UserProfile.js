import React from 'react';
import {Container, Row, Col, Card, Button, ProgressBar} from 'react-bootstrap';
import Avatar from "../../components/common/Avatar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBatteryHalf} from '@fortawesome/free-solid-svg-icons'

const UserProfile = () => {
    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Perfil</li>
                </ol>
            </nav>
        );
    };
    const AvatarCard = () => {
        return (
            <Card className="mb-4">
                <Card.Body className="text-center">
                    <Avatar/>
                    <Card.Title className="my-3">John Smith</Card.Title>
                    <Card.Text className="text-muted mb-1">Gerente de Projetos</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    return (
        <>
            <Container py-5>
                <Row>
                    <Col>
                        <Breadcrumb/>
                    </Col>
                </Row> <Row>
                <Col lg={4}>
                    <AvatarCard/>
                </Col>
                <Col lg={8}>
                    <Card mb-4>
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Nome</p>
                                </Col>
                                <Col sm={8}>
                                    <p className="text-muted mb-0">Johnatan Smith</p>
                                </Col>
                                <Col sm={1}>
                                    <Button variant="primary" className="text-white" title="Editar Informação">
                                        <FontAwesomeIcon icon="fa-solid fa-pencil" />
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">E-mail</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">example@example.com</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Telefone</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">(097) 234-5678</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Empresa</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        </>
    );
};

export default UserProfile;
