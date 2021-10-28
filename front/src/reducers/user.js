export const initialState = {
  logged: false,
  isAdmin: false,
  email: '',
  password: '',
  token: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
