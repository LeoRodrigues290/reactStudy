import React from 'react';
import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm';

const ForgetPassword = () => {
  return (
    <div className="text-center">
      <h5 className="mb-0">Esqueceu sua senha?</h5>
      <small>Digite seu e-mail e enviaremos um link de redefinição.</small>
      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPassword;
