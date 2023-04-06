import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import envelope from 'assets/img/icons/spot-illustrations/16.png';

const ConfirmMailContent = ({ email, layout, titleTag: TitleTag }) => (
  <>
    <img
      className="d-block mx-auto mb-4"
      src={envelope}
      alt="sent"
      width={100}
    />
    <TitleTag>Por favor verifique sua caixa de e-mail!</TitleTag>
    <p>
        Um e-mail foi enviado para <strong>{email}</strong>. Por favor, clique no
        link no corpo do e-mail para redefinir sua senha.
    </p>
    <Button
      as={Link}
      color="primary"
      size="sm"
      className="mt-3"
      to={`/authentication/${layout}/login`}
    >
      <FontAwesomeIcon
        icon="chevron-left"
        transform="shrink-4 down-1"
        className="me-1"
      />
      Voltar para o login
    </Button>
  </>
);

ConfirmMailContent.propTypes = {
  email: PropTypes.string.isRequired,
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

ConfirmMailContent.defaultProps = { layout: 'simple', titleTag: 'h4' };

export default ConfirmMailContent;
