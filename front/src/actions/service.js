/* eslint-disable camelcase */
export const FETCH_SERVICES = 'FETCH_SERVICES';
export const ADD_SERVICES = 'ADD_SERVICES';
export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE';
export const SEARCH_SERVICES = 'SEARCH_SERVICES';
export const SEARCH_SERVICES_SUCCESS = 'SEARCH_SERVICES_SUCCESS';
export const CHANGE_SERVICE_FIELD = 'CHANGE_SERVICE_FIELD';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const SUBMIT_SERVICE = 'SUBMIT_SERVICE';
export const SUBMIT_SERVICE_SUCCESS = 'SUBMIT_SERVICE_SUCCESS';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';
export const LIKE_SERVICE = 'LIKE_SERVICE';
export const UNLIKE_SERVICE = 'UNLIKE_SERVICE';
export const UNLIKE_SERVICE_SUCCESS = 'UNLIKE_SERVICE_SUCCESS';

export const likeService = (serviceId) => ({
  type: LIKE_SERVICE,
  serviceId,
});

export const unlikeService = (serviceId) => ({
  type: UNLIKE_SERVICE,
  serviceId,
});

export const unlikeServiceSuccess = () => ({
  type: UNLIKE_SERVICE_SUCCESS,
});

export const deleteServiceSuccess = () => ({
  type: DELETE_SERVICE_SUCCESS,
});

export const deleteService = (serviceId) => ({
  type: DELETE_SERVICE,
  serviceId,
});

export const submitServiceSuccess = () => ({
  type: SUBMIT_SERVICE_SUCCESS,
});

export const submitService = () => ({
  type: SUBMIT_SERVICE,
});

export const changeLocation = (location) => ({
  type: CHANGE_LOCATION,
  location,
});

export const changeServiceField = (value, name) => ({
  type: CHANGE_SERVICE_FIELD,
  value,
  name,
});

export const fetchServices = () => ({
  type: FETCH_SERVICES,
});

export const addServices = (services) => ({
  type: ADD_SERVICES,
  services,
});

export const changeSearchValue = (value) => ({
  type: CHANGE_SEARCH_VALUE,
  value,
});

export const searchServices = () => ({
  type: SEARCH_SERVICES,
});

export const searchServicesSuccess = (services) => ({
  type: SEARCH_SERVICES_SUCCESS,
  services,
});
