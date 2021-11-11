export const SAVE_NOT_PUBLISHED_SERVICES = 'SAVE_NOT_PUBLISHED_SERVICES';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SAVE_ALL_USERS = 'SAVE_ALL_USERS';
export const PUBLISH_SERVICE = 'PUBLISH_SERVICE';
export const PUBLISH_SERVICE_SUCCESS = 'PUBLISH_SERVICE_SUCCESS';

export const publishServiceSuccess = () => ({
  type: PUBLISH_SERVICE_SUCCESS,
});

export const publishService = (serviceId) => ({
  type: PUBLISH_SERVICE,
  serviceId,
});

export const saveAllUsers = (users) => ({
  type: SAVE_ALL_USERS,
  users,
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const saveNotPublishedServices = (services) => ({
  type: SAVE_NOT_PUBLISHED_SERVICES,
  services,
});
