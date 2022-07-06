import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import '../styles/admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate('/home');
  };
  return (
    <button className='logout-btn' onClick={logoutHandler}>
      Uitloggen
    </button>
  );
};

export default Admin;
