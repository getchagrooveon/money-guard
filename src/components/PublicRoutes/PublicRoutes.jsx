import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuth = false;
const PublicRoutes = () => {
  return !isAuth ? <div>{<Outlet />}</div> : <Navigate to="/contacts" />;
};

export default PublicRoutes;
