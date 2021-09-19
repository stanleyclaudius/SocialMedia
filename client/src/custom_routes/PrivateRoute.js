import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const logged = localStorage.getItem('logged');
  return logged ? <Route {...props} /> : <Redirect to='/' />
}

export default PrivateRoute;