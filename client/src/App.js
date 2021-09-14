import PageRender from './custom_routes/PageRender';
import Home from './pages/home';
import Header from './components/header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:page' component={PageRender} />
        <Route exact path='/:page/:id' component={PageRender} />
      </Switch>
    </Router>
  );
}

export default App;