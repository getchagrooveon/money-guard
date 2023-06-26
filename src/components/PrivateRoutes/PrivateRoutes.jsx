import Dashboard from 'components/Dashboard/Dashboard';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selectors';

const PrivateRoutes = () => {
  const isAuth = useSelector(selectIsLoggedIn);

  return isAuth ? <Dashboard /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
