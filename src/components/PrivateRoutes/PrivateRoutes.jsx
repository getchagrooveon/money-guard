import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const isAuth = true;
const PrivateRoutes = () => {
  return isAuth ? (
    <>
      <NavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
