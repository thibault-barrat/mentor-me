/* eslint-disable camelcase */
export const FETCH_SERVICES = 'FETCH_SERVICES';
export const ADD_SERVICES = 'ADD_SERVICES';
export const CHANGE_SERVICE_FIELD = 'CHANGE_SERVICE_FIELD';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const SUBMIT_SERVICE = 'SUBMIT_SERVICE';
export const SUBMIT_SERVICE_SUCCESS = 'SUBMIT_SERVICE_SUCCESS';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';

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
