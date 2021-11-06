import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import { deleteToken } from '../../actions/user';

import 'react-toastify/dist/ReactToastify.css';

const AuthVerify = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // we want to check refresh token at each route change
  // if refresh token is expired, we logout user
  history.listen(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(deleteToken());
      }
    }
  });

  // in order to noty user when he has been logged out
  // we nned to have the logout variable in the redux state
  const logout = useSelector((state) => state.user.logout);

  // we display the notification when logout change and it is true
  useEffect(() => {
    if (logout) {
      toast.info('Vous avez été déconnecté');
    }
  }, [logout]);

  return (
    <ToastContainer />
  );
};

export default AuthVerify;
