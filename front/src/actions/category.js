export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';


export const changeLoginField = (value, name) => ({
  type: CHANGE_LOGIN_FIELD,
  value,
  name,
});
