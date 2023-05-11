import React from 'react';
import {Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';

const UserProfile = () => {
    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">User</a></li>
                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                </ol>
            </nav>
        );
    };
    const AvatarCard = () => {
        return (
            <Card className="mb-4">
                <Card.Body className="text-center">
                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                              className="rounded-circle img-fluid" style={{width: '150px'}}/>
                    <Card.Title className="my-3">John Smith</Card.Title>
                    <Card.Text className="text-muted mb-1">Full Stack Developer</Card.Text>
                    <Card.Text className="text-muted mb-4">Bay Area, San Francisco, CA</Card.Text>
                    <div className="d-flex justify-content-center mb-2">
                        <Button variant="primary">Follow</Button>
                        <Button variant="outline-primary ms-1">Message</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    };
    const SocialLinks = () => {
        const socialLinks = [
            { icon: "fas fa-globe fa-lg text-warning", text: "https://mdbootstrap.com" },
            { icon: "fab fa-github fa-lg", text: "mdbootstrap" },
            { icon: "fab fa-twitter fa-lg", text: "@mdbootstrap", color: "#55acee" },
            { icon: "fab fa-instagram fa-lg", text: "mdbootstrap", color: "#ac2bac" },
            { icon: "fab fa-facebook-f fa-lg", text: "mdbootstrap", color: "#3b5998" },
        ];

        return (
            <Card.Body className="p-0">
                <ul className="list-group list-group-flush rounded-3">
                    {socialLinks.map((link, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <i className={link.icon} style={link.color ? { color: link.color } : null}></i>
                            <p className="mb-0">{link.text}</p>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        );
    };
    const ProgressCard = ({ title, progress }) => {
        return (
            <Card className="mb-4 mb-md-0">
                <Card.Body>
                    <p className="mb-4">
                        <span className="text-primary font-italic me-1">assigment</span>
                        {title}
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>
                        Web Design
                    </p>
                    <ProgressBar now={progress} />
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
                    <SocialLinks/>
                </Col>
                <Col lg={8}>
                    <Card mb-4>
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Full Name</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">Johnatan Smith</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Email</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">example@example.com</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Phone</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">(097) 234-5678</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Mobile</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">(098) 765-4321</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Address</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col md={6}>
                            <ProgressCard title="Project Status" progress={80} />
                            <ProgressCard title="Website Markup" progress={72} />
                            <ProgressCard title="One Page" progress={89} />
                            <ProgressCard title="Mobile Template" progress={55} />
                            <ProgressCard title="Backend API" progress={66} />
                        </Col>
                        <Col md={6}>
                            <ProgressCard title="Project Status" progress={80} />
                            <ProgressCard title="Website Markup" progress={72} />
                            <ProgressCard title="One Page" progress={89} />
                            <ProgressCard title="Mobile Template" progress={55} />
                            <ProgressCard title="Backend API" progress={66} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Container>
        </>
    );
};

export default UserProfile;
