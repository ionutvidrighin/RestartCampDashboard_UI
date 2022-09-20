import React from "react";
import LoginFormComponent from '../../components/Authentication/LoginFormComponent';

const LoginPage = () => {
  return (
    <div className="login-page container-fluid p-0 d-flex flex-column">
      <div className="logo-section pb-1">
        <img className="app-logo" src="./imgs/logo.png" alt="logo" /> 
      </div> 

      <div className="row m-0 login-form-section">
        <div className="form_container d-flex justify-content-center align-items-center">
          <LoginFormComponent />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
