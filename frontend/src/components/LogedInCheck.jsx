import React from 'react';
import { Navigate } from 'react-router-dom';

const LogedInCheck = ({ children }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token && user.email) {
    return <Navigate to={'/'} />;
  } else return children;
};

export default LogedInCheck;
