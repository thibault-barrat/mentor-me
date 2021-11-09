export const ADD_NOT_PUBLISHED_SERVICES = 'ADD_NOT_PUBLISHED_SERVICES';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const ADD_ALL_USERS = 'ADD_ALL_USERS';

export const addAllUsers = (users) => ({
  type: ADD_ALL_USERS,
  users,
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const addNotPublishedServices = (services) => ({
  type: ADD_NOT_PUBLISHED_SERVICES,
  services,
});
