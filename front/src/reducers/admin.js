import {
  SAVE_NOT_PUBLISHED_SERVICES, SAVE_ALL_USERS, PUBLISH_SERVICE, PUBLISH_SERVICE_SUCCESS,
} from '../actions/admin';

export const initialState = {
  notPublishedServices: [],
  users: [],
  notifPublish: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_NOT_PUBLISHED_SERVICES: {
      return {
        ...state,
        notPublishedServices: action.services,
        users: [...state.users],
      };
    }
    case SAVE_ALL_USERS: {
      return {
        ...state,
        users: action.users,
        notPublishedServices: [...state.notPublishedServices],
      };
    }
    case PUBLISH_SERVICE: {
      return {
        ...state,
        users: [...state.users],
        notPublishedServices: [...state.notPublishedServices],
        notifPublish: false,
      };
    }
    case PUBLISH_SERVICE_SUCCESS: {
      return {
        ...state,
        users: [...state.users],
        notPublishedServices: [...state.notPublishedServices],
        notifPublish: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
