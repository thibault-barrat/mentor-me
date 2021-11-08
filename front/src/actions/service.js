/* eslint-disable camelcase */
export const FETCH_SERVICES = 'FETCH_SERVICES';
export const ADD_SERVICES = 'ADD_SERVICES';
export const GET_SERVICE_USER = 'GET_SERVICE_USER';
export const SAVE_SERVICE_USER = 'SAVE_SERVICE_USER';

export const fetchServices = () => ({
  type: FETCH_SERVICES,
});

export const addServices = (services) => ({
  type: ADD_SERVICES,
  services,
});
