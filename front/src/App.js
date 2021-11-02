import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Connect from './pages/Connect';
import Categories from './pages/Categories';
import NavBaar from './components/NavBaar';
import Footer from './components/Footer';
import { loadCategories } from 'src/actions/category';

function App() {
  // We need to know if the user is logged and if is admin
  // to enable or disable specific routes
  const isLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  
  useEffect(() => {

    dispatch(loadCategories());
    
  }, []);

  return (
    <Router>
      <NavBaar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/a-propos" component={About} />
        <Route path="/inscription" component={Register} />
        <Route path="/connexion" component={Connect} />
        <Route path="/categories" component={Categories} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
