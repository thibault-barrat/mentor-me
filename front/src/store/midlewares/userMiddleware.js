/* eslint-disable object-curly-newline */
import axios from 'axios';
import { saveUser, submitNewUserSuccess, createMailError, createPasswordError, getUserDetails, saveUserDetails, saveProfileSuccess, SUBMIT_LOGIN, SUBMIT_NEW_USER, GET_USER_DETAILS, SAVE_PROFILE } from '../../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // const state = store.getState();
      // const { email, password } = state.user;

      // on peut destructurer directement le state retourné par le store
      const {
        user: {
          email, password,
        },
      } = store.getState();

      const submitLogin = async () => {
        try {
          const response = await axios.post('https://api-mentorme.herokuapp.com/v1/login', {
            email,
            password,
          });
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          await store.dispatch(saveUser(response.data));
          store.dispatch(getUserDetails());
        }
        catch (error) {
          if (error.response.data.errorMessage === 'This user does not exist!') {
            store.dispatch(createMailError());
          }
          else if (error.response.data.errorMessage === 'Wrong password!') {
            store.dispatch(createPasswordError());
          }
          else {
            console.log(error);
          }
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
          await axios.post('https://api-mentorme.herokuapp.com/v1/register', {
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
    case GET_USER_DETAILS: {
      const { user: { id } } = store.getState();

      const getUser = async () => {
        try {
          const response = await axios.get(`https://api-mentorme.herokuapp.com/v1/user/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          store.dispatch(saveUserDetails(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };
      getUser();
      break;
    }
    case SAVE_PROFILE: {
      const { user:
        { id, details: { email, firstname, lastname, bio, phone, fix } } } = store.getState();
      const saveProfile = async () => {
        try {
          await axios.post(`https://api-mentorme.herokuapp.com/v1/user/${id}`, {
            email,
            firstname,
            lastname,
            biography: bio,
            home_phone: fix,
            mobile_phone: phone,
          });
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(saveProfileSuccess());
        }
        catch (error) {
          console.log(error);
        }
      };
      saveProfile();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
