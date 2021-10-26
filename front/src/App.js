import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Register from './pages/register';
import Connect from './pages/connect';

function App() {
return (
	<Router>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/A-propos' component={About} />
      <Route path='/inscription' component={Register} />
      <Route path='/connexion' component={Connect} />
    </Switch>
	</Router>
);
}

export default App;
