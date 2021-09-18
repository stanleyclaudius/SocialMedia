import PageRender from './custom_routes/PageRender';
import Home from './pages/home';
import Header from './components/header/Header';
import Alert from './components/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  return (
    <Router>
      {auth.token && <Header />}
      <Alert />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:page' component={PageRender} />
        <Route exact path='/:page/:id' component={PageRender} />
      </Switch>
    </Router>
  );
}

export default App;