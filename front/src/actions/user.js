export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SAVE_USER = 'SAVE_USER';

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
