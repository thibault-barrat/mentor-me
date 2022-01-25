export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CREATE_MAIL_ERROR = 'CREATE_MAIL_ERROR';
export const CREATE_PASSWORD_ERROR = 'CREATE_PASSWORD_ERROR';
export const CREATE_REGISTER_MAIL_ERROR = 'CREATE_REGISTER_MAIL_ERROR';
export const SAVE_USER = 'SAVE_USER';
export const CHANGE_REGISTER_FIELD = 'CHANGE_REGISTER_FIELD';
export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const SUBMIT_NEW_USER_SUCCESS = 'SUBMIT_NEW_USER_SUCCESS';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const CHANGE_PROFILE_FIELD = 'CHANGE_PROFILE_FIELD';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const SEND_IMAGE = 'SEND_IMAGE';
export const SEND_IMAGE_SUCCESS = 'SEND_IMAGE_SUCCESS';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const DELETE_PROFILE_SUCCESS = 'DELETE_PROFILE_SUCCESS';
export const GET_LIKED_SERVICES = 'GET_LIKED_SERVICES';
export const SAVE_LIKED_SERVICES = 'SAVE_LIKED_SERVICES';
export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';

export const updateUserLocation = (latitude, longitude) => ({
  type: UPDATE_USER_LOCATION,
  latitude,
  longitude,
});

export const saveLikedServices = (services) => ({
  type: SAVE_LIKED_SERVICES,
  services,
});

export const getLikedServices = () => ({
  type: GET_LIKED_SERVICES,
});

export const deleteProfileSuccess = () => ({
  type: DELETE_PROFILE_SUCCESS,
});

export const deleteProfile = (userId, role) => ({
  type: DELETE_PROFILE,
  userId,
  role,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const refreshToken = () => ({
  type: REFRESH_TOKEN,
});

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

export const createRegisterMailError = () => ({
  type: CREATE_REGISTER_MAIL_ERROR,
});

export const createPasswordError = () => ({
  type: CREATE_PASSWORD_ERROR,
});

// eslint-disable-next-line camelcase
export const saveUser = (role, id, accessToken) => ({
  type: SAVE_USER,
  role,
  id,
  accessToken,
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

export const getUserDetails = () => ({
  type: GET_USER_DETAILS,
});

export const saveUserDetails = ({
  // eslint-disable-next-line camelcase
  email, firstname, lastname, biography, mobile_phone, home_phone, avatar_url,
}) => ({
  type: SAVE_USER_DETAILS,
  email,
  firstname,
  lastname,
  bio: biography,
  phone: mobile_phone,
  fix: home_phone,
  avatar: avatar_url,
});

export const changeProfileField = (value, name) => ({
  type: CHANGE_PROFILE_FIELD,
  value,
  name,
});

export const saveProfile = () => ({
  type: SAVE_PROFILE,
});

export const saveProfileSuccess = () => ({
  type: SAVE_PROFILE_SUCCESS,
});

export const saveImage = (image) => ({
  type: SAVE_IMAGE,
  image,
});

export const sendImage = () => ({
  type: SEND_IMAGE,
});

export const sendImageSuccess = () => ({
  type: SEND_IMAGE_SUCCESS,
});
