import axios from 'axios';
import {
  addServices, searchServicesSuccess, FETCH_SERVICES, SEARCH_SERVICES,
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
    case SEARCH_SERVICES: {
      // to send request, we need the search value and access token
      const { searchValue } = store.getState().services;
      const {
        user:
        { accessToken },
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
      const searchServices = async () => {
        try {
          const response = await axios.get(`https://api-mentorme.herokuapp.com/v1/search?service=${searchValue}`, headers);
          store.dispatch(searchServicesSuccess(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      searchServices();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default serviceMiddleware;
