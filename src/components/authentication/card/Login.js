import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';

import AuthCardLayout from 'layouts/AuthCardLayout';

const Login = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <p className="text-white">
         Não tem uma conta?
          <br />
          <Link
            className="text-white text-decoration-underline"
            to="#"
          >
            Entre em contato!
          </Link>
        </p>
      }
    >
      <h3>Login</h3>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default Login;
