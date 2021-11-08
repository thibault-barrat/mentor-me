import axios from 'axios';
import {
  addServices, submitServiceSuccess, FETCH_SERVICES, SUBMIT_SERVICE,
} from '../../actions/service';

const serviceMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_SERVICES: {
      const fetchServices = async () => {
        try {
          const response = await axios.get('https://api-mentorme.herokuapp.com/v1/allServices');
          store.dispatch(addServices(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      fetchServices();
      next(action);
      break;
    }
    case SUBMIT_SERVICE: {
      const {
        user: {
          id,
        },
        services: {
          new: {
            category, title, duration, irl, online, description, location,
          },
        },
      } = store.getState();
      const submitService = async () => {
        try {
          await axios.post('https://api-mentorme.herokuapp.com/v1/newService', {
            title,
            duration,
            description,
            online,
            irl,
            user_id: id,
            category_id: category,
            location,
          });
          store.dispatch(submitServiceSuccess());
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
