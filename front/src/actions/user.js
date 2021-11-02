export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const CHANGE_REGISTER_FIELD = 'CHANGE_REGISTER_FIELD';
export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const SUBMIT_NEW_USER_SUCCESS = 'SUBMIT_NEW_USER_SUCCESS';

export const changeLoginField = (value, name) => ({
  type: CHANGE_LOGIN_FIELD,
  value,
  name,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const saveUser = ({ logged, token, id }) => ({
  type: SAVE_USER,
  logged,
  token,
  id,
});

export const changeRegisterField = (value, name) => ({
  type: CHANGE_REGISTER_FIELD,
  value,
  name,
});

export const submitNewUser = () => ({
  type: SUBMIT_NEW_USER,
});

export const submitNewUserSuccess = () => ({
  type: SUBMIT_NEW_USER_SUCCESS,
});
