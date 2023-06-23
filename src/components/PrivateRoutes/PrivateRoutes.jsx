import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selectors';

const PrivateRoutes = () => {
  const isAuth = useSelector(selectIsLoggedIn);

  return isAuth ? (
    <>
      <NavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
