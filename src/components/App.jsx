import Registration from './Registration/Registration';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import PublicRoutes from './PublicRoutes/PublicRoutes';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import Home from './Home/Home';
import Statistics from './Statistics/Statistics';
import Currency from './Currency/Currency';
import { Navigate, Routes, Route } from 'react-router-dom';
// import Loader from './Loader/Loader';

export const App = () => {
  return (
    <>
      {/* {authStatus === 'loading' && <Loader />} */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={'/dashboard'} />} />
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/register" element={<Registration />} />
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
