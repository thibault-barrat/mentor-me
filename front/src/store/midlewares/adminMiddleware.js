import axios from 'axios';
import {
  saveAllUsers, publishServiceSuccess, GET_ALL_USERS, PUBLISH_SERVICE,
} from '../../actions/admin';
import { fetchServices } from '../../actions/service';

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
          store.dispatch(saveAllUsers(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      getAllUsers();
      next(action);
      break;
    }
    case PUBLISH_SERVICE: {
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
      const publishService = async () => {
        try {
          await axios.patch(`/api/service/${action.serviceId}/publish`, {}, headers);
          store.dispatch(publishServiceSuccess());
          store.dispatch(fetchServices());
        }
        catch (error) {
          console.log(error);
        }
      };

      publishService();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default adminMiddleware;
