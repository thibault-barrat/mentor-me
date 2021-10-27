import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Connect from './pages/Connect';
import NavBaar from './components/NavBaar';

function App() {
  return (
    <Router>
      <NavBaar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/a-propos" component={About} />
        <Route path="/inscription" component={Register} />
        <Route path="/connexion" component={Connect} />
      </Switch>
    </Router>
  );
}

export default App;
