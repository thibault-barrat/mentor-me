/* eslint-disable object-curly-newline */
import axios from 'axios';
import { saveUser, submitNewUserSuccess, createMailError, createPasswordError, getUserDetails, saveUserDetails, saveProfileSuccess, SUBMIT_LOGIN, SUBMIT_NEW_USER, GET_USER_DETAILS, SAVE_PROFILE, SEND_IMAGE } from '../../actions/user';

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
          // we save the accessToken in the local storage
          localStorage.setItem('token', response.data.accessToken);
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
      // we look for the token in local storage
      const token = localStorage.getItem('token');
      // we create headers of the request
      let headers = {};
      if (token) {
        headers = {
          headers: {
            Authorization: `Bearer ${token}`,
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
        { id, details: { email, firstname, lastname, bio, phone, fix } } } = store.getState();
      // we look for the token in local storage
      const token = localStorage.getItem('token');
      // we create headers of the request
      let headers = {};
      if (token) {
        headers = {
          headers: {
            Authorization: `Bearer ${token}`,
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
        { id, details: { uploadedImage } } } = store.getState();
      // we look for the token in local storage
      const token = localStorage.getItem('token');
      // we create headers of the request
      let headers = {};
      if (token) {
        headers = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const form = new FormData();
      form.append('avatar', uploadedImage);
      const options = {
        method: 'PATCH',
        url: `https://api-mentorme.herokuapp.com/v1/user/${id}/avatar`,
        headers: headers.headers,
        data: form,
      };

      axios.request(options).then(() => {
        store.dispatch(getUserDetails());
      }).catch((error) => {
        console.error(error);
      });
      // const sendImage = async () => {
      //   try {
      //     await axios.patch(`https://api-mentorme.herokuapp.com/v1/user/${id}/avatar`, {
      //       data: [data],
      //     }, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     });
      //     // after sending the image we need to do a new get request
      //     // to obtain the new url of avatar on cloudinary
      //     store.dispatch(getUserDetails());
      //   }
      //   catch (error) {
      //     console.log(error);
      //   }
      // };
      // sendImage();
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
