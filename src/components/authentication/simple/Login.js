import React from 'react';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import LoginForm from 'components/authentication/LoginForm';

const Login = () => (
  <>
    <Flex justifyContent="between" alignItems="center" className="mb-2">
      <h5>Log in</h5>
      <p className="fs--1 text-600 mb-0">
        ou <Link to="/authentication/simple/register">Criar uma conta</Link>
      </p>
    </Flex>
    <LoginForm />
  </>
);

export default Login;
