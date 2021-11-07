import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const logged = localStorage.getItem('logged');
  return logged ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute;