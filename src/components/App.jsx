import Registration from './Registration/Registration';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import PublicRoutes from './PublicRoutes/PublicRoutes';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import Home from './Home/Home';
import Statistics from './Statistics/Statistics';
import Currency from './Currency/Currency';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { selectToken } from 'redux/auth/selectors';
// import Loader from './Loader/Loader';

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(refreshUser(token));
  }, [dispatch, token]);

  return (
    <>
      <div>
        {/* <Loader /> */}
        <Routes>
          <Route path="/" element={<Navigate to={'/dashboard'} />} />
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="currency" element={<Currency />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
