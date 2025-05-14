import React from 'react';
import './Login.scss';

const LoginRedirectslogout = () => {
  const login = (type) => {
    alert(`Initiating ${type} login process...`);
    // Add your login logic here
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p>Please select your login method to access our secure platform</p>
        <button className="btn btn-user" onClick={() => login('user')}>
          <i className="fas fa-user-circle"></i> Login as User
        </button>
        <button className="btn btn-admin" onClick={() => login('admin')}>
          <i className="fas fa-user-shield"></i> Login as Admin
        </button>
      </div>
    </div>
  );
};

export default LoginRedirectslogout;
