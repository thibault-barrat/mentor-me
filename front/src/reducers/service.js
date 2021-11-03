import { FETCH_SERVICES, ADD_SERVICES } from '../actions/service';

export const initialState = {
  items: [],
  loading: false,
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
    default:
      return state;
  }
};

export default reducer;
