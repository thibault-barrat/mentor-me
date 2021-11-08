export const FETCH_SERVICES = 'FETCH_SERVICES';
export const ADD_SERVICES = 'ADD_SERVICES';
export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE';
export const SEARCH_SERVICES = 'SEARCH_SERVICES';
export const SEARCH_SERVICES_SUCCESS = 'SEARCH_SERVICES_SUCCESS';

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
