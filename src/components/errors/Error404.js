import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Error404 = () => {
  return (
    <Card className="text-center">
      <Card.Body className="p-5">
        <div className="display-1 text-300 fs-error">404</div>
        <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
          A página que você está procurando não foi encontrada.
        </p>
        <hr />
        <p>
          Verifique se o endereço está correto. Se
          você acredita que isso é um erro,
          <a href="mailto:info@exmaple.com" className="ms-1">
            entre em contato conosco
          </a>
          .
        </p>
        <Link className="btn btn-primary btn-sm mt-3" to="/">
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Voltar para a home
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Error404;
