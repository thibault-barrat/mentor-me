import axios from 'axios';
import { saveUser, SUBMIT_LOGIN } from '../../actions/user';

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
    /*     case SUBMIT_LOGIN: {
          const state = store.getState();

          const config = {
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
              email: state.user.email,
              password: state.user.password,
            },
          };
          axios(config)
            .then((response) => {
              console.log('on va dispatch saveUser');
              store.dispatch(saveUser(response.data.logged, response.data.token, response.data.id));
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        } */
    default:
      next(action);
  }
};

export default userMiddleware;
