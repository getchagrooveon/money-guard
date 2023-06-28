import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';

const PublicRoutes = () => {
  const isAuth = useSelector(selectIsLoggedIn);
  return !isAuth ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoutes;
