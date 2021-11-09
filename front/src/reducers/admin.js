import { ADD_NOT_PUBLISHED_SERVICES, ADD_ALL_USERS } from '../actions/admin';

export const initialState = {
  notPublishedServices: [],
  users: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_NOT_PUBLISHED_SERVICES: {
      return {
        ...state,
        notPublishedServices: action.services,
        users: [...state.users],
      };
    }
    case ADD_ALL_USERS: {
      return {
        ...state,
        users: action.users,
        notPublishedServices: [...state.notPublishedServices],
      };
    }
    default:
      return state;
  }
};

export default reducer;
