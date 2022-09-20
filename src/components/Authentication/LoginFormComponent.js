import React, { useState } from 'react';
import GenerateTokenForm from './GenerateTokenForm';
import LoginToAppForm from './LoginToAppForm';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const LoginFormContainer = () => {
  const [token, setToken] = useState({
    received: false,
    value: null
  });


  return (
    <div className="login-form-component">
      { token.received &&
        <div className='back-to-login' onClick={() => setToken({received: false, value: ""})}>
          <KeyboardBackspaceIcon />
          <span className='ms-2'>Înapoi la Login</span>
        </div>
      }

      <h3>Bine ai venit la RestartCamp</h3>
      <h1>Accesează contul tău</h1>

      { token.received ?
        <LoginToAppForm token={token} />
        :
        <GenerateTokenForm setToken={setToken} />
      }

    </div>
  )
}

export default LoginFormContainer;
