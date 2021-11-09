import axios from 'axios';
import { addAllUsers, GET_ALL_USERS } from '../../actions/admin';

const adminMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      const { accessToken } = store.getState().user;
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const getAllUsers = async () => {
        try {
          const response = await axios.get('/api/allUsers', headers);
          store.dispatch(addAllUsers(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      getAllUsers();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default adminMiddleware;
