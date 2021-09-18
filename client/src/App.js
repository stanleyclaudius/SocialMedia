import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authActions';
import PageRender from './custom_routes/PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Header from './components/header/Header';
import Alert from './components/Alert';

function App() {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      {auth.token && <Header />}
      <Alert />
      <Switch>
        <Route exact path='/' component={auth.token ? Home : Login} />
        <Route exact path='/:page' component={PageRender} />
        <Route exact path='/:page/:id' component={PageRender} />
      </Switch>
    </Router>
  );
}

export default App;