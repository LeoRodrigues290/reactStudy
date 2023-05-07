import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";

function UserConfig(props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        user_type: "",
    });

    const handleFieldChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Código para atualizar os dados do usuário no firebase
    };

    const { hasLabel } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>Nome</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? "Nome" : ""}
                    value={formData.name}
                    name="name"
                    onChange={handleFieldChange}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>E-mail</Form.Label>}
                <Form.Control
                    placeholder={!hasLabel ? "E-mail" : ""}
                    value={formData.email}
                    name="email"
                    onChange={handleFieldChange}
                    type="email"
                />
            </Form.Group>

            <Row className="g-2 mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Tipo de usuário</Form.Label>
                    <Form.Control
                        as="select"
                        name="user_type"
                        value={formData.user_type}
                        onChange={handleFieldChange}
                    >
                        <option value="" disabled>
                            Selecione um tipo de usuário
                        </option>
                        <option value="Administrador">Administrador</option>
                        <option value="Gerente de Projeto">Gerente de Projeto</option>
                        <option value="Gerente de Projeto (Cliente)">
                            Gerente de Projeto (Cliente)
                        </option>
                        <option value="analyst">Analista</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} sm={6}>
                    {hasLabel && <Form.Label>Senha</Form.Label>}
                    <Form.Control
                        placeholder={!hasLabel ? "Password" : ""}
                        value={formData.password}
                        name="password"
                        onChange={handleFieldChange}
                        type="password"
                    />
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                    {hasLabel && <Form.Label>Confirme sua senha</Form.Label>}
                    <Form.Control
                        placeholder={!hasLabel ? "Confirm Password" : ""}
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleFieldChange}
                        type="password"
                    />
                </Form.Group>
            </Row>

            <Form.Group className="mb-4">
                <Button
                    className="w-100"
                    type="submit"
                    disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.password ||
                        !formData.confirmPassword
                    }
                >
                    Atualizar
                </Button>
            </Form.Group>
        </Form>
    );
}

UserConfig.propTypes = {
    hasLabel: PropTypes.bool,
};

UserConfig.defaultProps = {
    hasLabel: true,
};

export default UserConfig
