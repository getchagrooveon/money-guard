import PublicRoutes from './PublicRoutes/PublicRoutes';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import Currency from './Currency/Currency';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { selectIsLoading, selectToken } from 'redux/auth/selectors';
import { getCurrencyThunk } from 'redux/currency/operations';
import Loader from './Loader/Loader';
import { Suspense, lazy } from 'react';
import { currencyQueryTime } from 'redux/currency/selectors';
import Statistics from 'pages/Statistics/Statistics';
import Home from './Home/Home';
// import Dashboard from './Dashboard/Dashboard';

const Registration = lazy(() => import('../pages/Registration/Registration'));
const Login = lazy(() => import('../pages/Login/Login'));
// const Statistics = lazy(() => import('../pages/Statistics/Statistics'));

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const lastCurrencyQueryTime = useSelector(currencyQueryTime);
  const isLoading = useSelector(selectIsLoading);
  const delay = 600000;

  useEffect(() => {
    if (Date.now() - lastCurrencyQueryTime < delay) {
      dispatch(getCurrencyThunk());
    }
  }, [dispatch, lastCurrencyQueryTime]);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser(token));
    }
  }, [dispatch, token]);

  return (
    <>
      {!isLoading ? (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<PublicRoutes />}>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="home" element={<Home />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="currency" element={<Currency />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      ) : (
        <Loader />
      )}
    </>
  );
};
