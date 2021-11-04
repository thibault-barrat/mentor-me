export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CREATE_MAIL_ERROR = 'CREATE_MAIL_ERROR';
export const CREATE_PASSWORD_ERROR = 'CREATE_PASSWORD_ERROR';
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

export const createMailError = () => ({
  type: CREATE_MAIL_ERROR,
});

export const createPasswordError = () => ({
  type: CREATE_PASSWORD_ERROR,
});

export const saveUser = ({ connected, user: { role, id } }) => ({
  type: SAVE_USER,
  connected,
  role,
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
