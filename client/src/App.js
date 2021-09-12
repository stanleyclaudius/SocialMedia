import PageRender from './custom_routes/PageRender';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/:page' component={PageRender} />
        <Route exact path='/:page/:id' component={PageRender} />
      </Switch>
    </Router>
  );
}

export default App;