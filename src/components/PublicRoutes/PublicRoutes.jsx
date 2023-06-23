import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuth = false;
const PublicRoutes = () => {
<<<<<<< Updated upstream
=======
  const isAuth = useSelector(selectIsLoggedIn);

>>>>>>> Stashed changes
  return !isAuth ? <div>{<Outlet />}</div> : <Navigate to="/dashboard" />;
};

export default PublicRoutes;
