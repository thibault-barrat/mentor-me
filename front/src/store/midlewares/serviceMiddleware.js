import axios from 'axios';
import { addServices, FETCH_SERVICES, GET_SERVICE_USER, saveServiceUser } from '../../actions/service';

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
    case GET_SERVICE_USER: {
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
          const response = await axios.get(`https://api-mentorme.herokuapp.com/v1/user/${action.userId}`, headers);
          store.dispatch(saveServiceUser(action.serviceId, response.data));
        }
        catch (error) {
          console.log(error);
        }
      };
      getUser();
      break;
    }
    default:
      next(action);
  }
};

export default serviceMiddleware;
