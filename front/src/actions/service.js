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

export const getServiceUser = (serviceId, userId) => ({
  type: GET_SERVICE_USER,
  serviceId,
  userId,
});

export const saveServiceUser = (serviceId, email, firstname, lastname, biography, avatar_url) => ({
  type: SAVE_SERVICE_USER,
  serviceId,
  email,
  firstname,
  lastname,
  biography,
  avatar_url,
});
