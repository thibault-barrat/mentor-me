/* eslint-disable no-console */
import axios from 'axios';
import {
  addServices, submitServiceSuccess, FETCH_SERVICES, SUBMIT_SERVICE, fetchServices,
} from '../../actions/service';

const serviceMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_SERVICES: {
      const getServices = async () => {
        try {
          const response = await axios.get('https://api-mentorme.herokuapp.com/v1/allServices');
          store.dispatch(addServices(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      getServices();
      next(action);
      break;
    }
    case SUBMIT_SERVICE: {
      const {
        user: {
          accessToken,
        },
        services: {
          new: {
            category, title, duration, irl, online, description, location,
          },
        },
      } = store.getState();
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const submitService = async () => {
        try {
          await axios.post('https://api-mentorme.herokuapp.com/v1/newService', {
            title,
            duration,
            description,
            online,
            irl,
            category_id: category,
            location,
          }, headers);
          store.dispatch(submitServiceSuccess());
          store.dispatch(fetchServices());
        }
        catch (error) {
          console.log(error);
        }
      };

      submitService();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default serviceMiddleware;
