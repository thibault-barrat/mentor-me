/* eslint-disable object-curly-newline */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { saveUser, submitNewUserSuccess, createMailError, createPasswordError, getUserDetails, saveUserDetails, saveProfileSuccess, deleteToken, SUBMIT_LOGIN, SUBMIT_NEW_USER, GET_USER_DETAILS, SAVE_PROFILE, SEND_IMAGE, REFRESH_TOKEN, DELETE_TOKEN, LOGOUT, DELETE_PROFILE } from '../../actions/user';

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
          // we save the refreshToken in the local storage
          localStorage.setItem('refreshToken', response.data.refreshToken);
          // we decode the token to obtain the id and the role
          // eslint-disable-next-line camelcase
          const { user_id, role } = jwt_decode(response.data.accessToken);
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(saveUser(role, user_id, response.data.accessToken));
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
      const { user: { id, accessToken } } = store.getState();
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const getUser = async () => {
        try {
          const response = await axios.get(`https://api-mentorme.herokuapp.com/v1/user/${id}`, headers);
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
        { id,
          accessToken,
          details: { email, firstname, lastname, bio, phone, fix } } } = store.getState();
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const saveProfile = async () => {
        try {
          await axios.patch(`https://api-mentorme.herokuapp.com/v1/user/${id}`, {
            email,
            firstname,
            lastname,
            biography: bio,
            home_phone: fix,
            mobile_phone: phone,
          }, headers);
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
    case SEND_IMAGE: {
      const { user:
        { id, accessToken, details: { uploadedImage } } } = store.getState();
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const form = new FormData();
      form.append('avatar', uploadedImage);

      const sendImage = async () => {
        try {
          await axios.patch(`https://api-mentorme.herokuapp.com/v1/user/${id}/avatar`, form, headers);
          // after sending the image we need to do a new get request
          // to obtain the new url of avatar on cloudinary
          store.dispatch(getUserDetails());
        }
        catch (error) {
          console.log(error);
        }
      };
      sendImage();
      break;
    }
    case REFRESH_TOKEN: {
      const token = localStorage.getItem('refreshToken');

      const refreshToken = async () => {
        try {
          const response = await axios.post('https://api-mentorme.herokuapp.com/v1/refreshToken', {
            token,
          });
          // we save the new refreshToken in the local storage
          localStorage.setItem('refreshToken', response.data.refreshToken);
          // we decode the accessToken to obtain the id and the role
          // eslint-disable-next-line camelcase
          const { user_id, role } = jwt_decode(response.data.accessToken);
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(saveUser(role, user_id, response.data.accessToken));
          store.dispatch(getUserDetails());
        }
        catch (error) {
          console.log(error);
        }
      };

      refreshToken();
      next(action);
      break;
    }
    case LOGOUT: {
      const token = localStorage.getItem('refreshToken');

      const logout = async () => {
        try {
          await axios.post('https://api-mentorme.herokuapp.com/v1/logout', {
            token,
          });
          store.dispatch(deleteToken());
        }
        catch (error) {
          console.log(error);
        }
      };
      logout();
      break;
    }
    case DELETE_PROFILE: {
      const { user:
        { id,
          accessToken,
        } } = store.getState();
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const deleteProfile = async () => {
        try {
          await axios.delete(`https://api-mentorme.herokuapp.com/v1/user/${id}`, headers);
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(deleteToken());
        }
        catch (error) {
          console.log(error);
        }
      };
      deleteProfile();
      break;
    }
    case DELETE_TOKEN: {
      localStorage.removeItem('refreshToken');
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
