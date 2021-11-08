/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import Loading from 'src/components/Loading';
import NewService from 'src/pages/NewService';
import AuthVerify from 'src/components/AuthVerify';
import Notif from 'src/components/Notif';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Connect from './pages/Connect';
import Profil from './pages/Profil';
import Categories from './pages/Categories';
import serviceId from './pages/ServiceId';
import NavBaar from './components/NavBaar';
import Footer from './components/Footer';
import { fetchCategories } from './actions/category';
import { fetchServices } from './actions/service';
import { refreshToken, deleteToken } from './actions/user';

function App() {
  // We need to know if the user is logged and if is admin
  // to enable or disable specific routes
  const isLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  // We need to have the loading state of categories and services
  const serviceLoading = useSelector((state) => state.services.loading);
  const categoryLoading = useSelector((state) => state.categories.loading);

  const dispatch = useDispatch();

  // At the first render of App, we fetch categories and services
  // we check if there is a refreshToken in localStorage
  // if there is, we dispatch refreshToken action to obtain new accessToken
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchServices());
    const token = localStorage.getItem('refreshToken');
    if (token) {
      // we check if the token is expired
      // if yes we delete it
      const decoded = jwt_decode(token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(deleteToken());
      }
      else { // if not we dispatch refreshToken action to obtain new accessToken
        dispatch(refreshToken());
      }
    }
  }, []);

  return (
    <Router>
      <NavBaar />
      {/* We use ternary operator to display Loading components
      if categories or services is loading */}
      {(serviceLoading || categoryLoading) ? (
        <Loading />
      )
        : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/a-propos" component={About} />
            <Route path="/inscription" component={Register} />
            <Route path="/connexion" component={Connect} />
            <Route path="/profil" component={Profil} />
            <Route path="/categories" component={Categories} />
<<<<<<< HEAD
            <Route path="/nouveau-service" component={NewService} />
=======
            <Route path="/service/:id" component={serviceId} />
>>>>>>> dev
          </Switch>
        )}
      <AuthVerify />
      <Notif />
      <Footer />
    </Router>
  );
}

export default App;
