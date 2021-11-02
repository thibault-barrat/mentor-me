export const FETCH_SERVICES = 'FETCH_SERVICES';
export const ADD_SERVICES = 'ADD_SERVICES';

export const fetchServices = () => ({
  type: FETCH_SERVICES,
});

export const addServices = (services) => ({
  type: ADD_SERVICES,
  services,
});
