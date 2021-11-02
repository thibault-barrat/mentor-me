/* eslint-disable object-curly-newline */
import axios from 'axios';
import { saveUser, submitNewUserSuccess, SUBMIT_LOGIN, SUBMIT_NEW_USER } from '../../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // const state = store.getState();
      // const { email, password } = state.user;

      // on peut destructurer directement le state retourné par le store
      const {
        user: {
          email, password, id, token,
        },
      } = store.getState();

      const submitLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email,
            password,
            id,
            token,
          });
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(saveUser(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      submitLogin();

      break;
    }
    case SUBMIT_NEW_USER: {
      // const state = store.getState();
      // const { email, password } = state.user;

      // on peut destructurer directement le state retourné par le store
      const { user: { register: { email, password, firstname, lastname } } } = store.getState();

      const submitNewUser = async () => {
        try {
          const response = await axios.post('https://api-mentorme.herokuapp.com/v1/register', {
            email,
            password,
            firstname,
            lastname,
          });
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(submitNewUserSuccess());
        }
        catch (error) {
          console.log(error);
        }
      };

      submitNewUser();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
