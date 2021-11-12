/* eslint-disable no-console */
import axios from 'axios';
import {
  addServices,
  submitServiceSuccess,
  fetchServices,
  deleteServiceSuccess,
  searchServicesSuccess,
  FETCH_SERVICES,
  SUBMIT_SERVICE,
  DELETE_SERVICE,
  SEARCH_SERVICES,
  LIKE_SERVICE,
  UNLIKE_SERVICE,
  unlikeServiceSuccess,
} from '../../actions/service';
import { saveNotPublishedServices } from '../../actions/admin';
import { getLikedServices } from '../../actions/user';

const serviceMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_SERVICES: {
      // we need the role in order to dispatch specific action if the user is admin or not
      const { role } = store.getState().user;
      const getServices = async () => {
        try {
          const response = await axios.get('/api/allServices');
          // we add in the redux state only the services that are published
          store.dispatch(addServices(response.data.filter(
            (service) => service.is_published === true,
          )));
          // if the user is admin we dispatch action to add not published services to the state
          if (role === 'admin') {
            store.dispatch(saveNotPublishedServices(response.data.filter(
              (service) => service.is_published === false,
            )));
          }
        }
        catch (error) {
          console.log(error);
        }
      };

      getServices();
      next(action);
      break;
    }
    case SEARCH_SERVICES: {
      // to send request, we need the search value and access token
      const { searchValue } = store.getState().services;
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
      const searchServices = async () => {
        try {
          const response = await axios.get(`/api/search?service=${searchValue.toLowerCase()}`, headers);
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
          await axios.post('/api/newService', {
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
    case DELETE_SERVICE: {
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
      const deleteService = async () => {
        try {
          await axios.delete(`/api/service/${action.serviceId}`, headers);
          store.dispatch(deleteServiceSuccess());
          store.dispatch(fetchServices());
        }
        catch (error) {
          console.log(error);
        }
      };

      deleteService();
      next(action);
      break;
    }
    case LIKE_SERVICE: {
      const { id, accessToken } = store.getState().user;
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const likeService = async () => {
        try {
          await axios.post(`/api/user/${id}/service/${action.serviceId}`, {}, headers);
          store.dispatch(getLikedServices());
        }
        catch (error) {
          console.log(error);
        }
      };

      likeService();
      break;
    }
    case UNLIKE_SERVICE: {
      const { id, accessToken } = store.getState().user;
      // we create headers of the request
      let headers = {};
      if (accessToken !== null) {
        headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      const unlikeService = async () => {
        try {
          await axios.delete(`/api/user/${id}/service/${action.serviceId}`, headers);
          store.dispatch(unlikeServiceSuccess());
          store.dispatch(getLikedServices());
        }
        catch (error) {
          console.log(error);
        }
      };
      unlikeService();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default serviceMiddleware;
