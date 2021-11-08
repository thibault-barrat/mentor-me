/* eslint-disable no-console */
import axios from 'axios';
import { addServices, FETCH_SERVICES } from '../../actions/service';

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
    default:
      next(action);
  }
};

export default serviceMiddleware;
