import { FETCH_SERVICES, ADD_SERVICES, SAVE_SERVICE_USER } from '../actions/service';

export const initialState = {
  items: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SERVICES: {
      return {
        ...state,
        items: [...state.items],
        loading: true,
      };
    }
    case ADD_SERVICES: {
      return {
        ...state,
        items: action.services,
        loading: false,
      };
    }
    case SAVE_SERVICE_USER: {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.serviceId) {
            return {
              ...item,
              user: {
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname,
                biography: action.biography,
                avatar_url: action.avatar_url,
              },
            };
          }
          return item;
        }),
      };
    }
    default:
      return state;
  }
};

export default reducer;
