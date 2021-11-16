// == Import : npm
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

// == Import : local
// Composants
import App from 'src/App';
import store from 'src/store';
import { saveUser, deleteToken } from './actions/user';

// configuration of axios interceptor
// to handle 401 unauthorized error
// and get new tokens
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // we change retry attribute of originalRequest
      // to not have infinite loop
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      const token = localStorage.getItem('refreshToken');
      if (token) {
        // we check if the token is expired
        // if yes we delete it
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 < Date.now()) {
          store.dispatch(deleteToken());
        }
        else {
          // we get new tokens
          try {
            const response = await axios.post('/api/refreshToken', {
              token,
            });
            // we save the new refreshToken in the local storage
            localStorage.setItem('refreshToken', response.data.refreshToken);
            // we dispatch saveUser action to save the new accessToken in the store
            // eslint-disable-next-line camelcase
            const { user_id, role } = jwt_decode(response.data.accessToken);
            store.dispatch(saveUser(role, user_id, response.data.accessToken));
            // we want to change headers of original request with new access token
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            // we retry the original request
            return axios(originalRequest);
          }
          catch (err) {
            console.log(err);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
