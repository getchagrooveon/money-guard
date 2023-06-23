import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import { selectIsLoggedIn } from 'redux/auth/selectors';
>>>>>>> Stashed changes

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
