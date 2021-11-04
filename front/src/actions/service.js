export const FETCH_SERVICES = 'FETCH_SERVICES';
export const ADD_SERVICES = 'ADD_SERVICES';
export const CHANGE_SERVICE_FIELD = 'CHANGE_SERVICE_FIELD';

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
