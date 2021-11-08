import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { deleteToken } from '../../actions/user';

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

  return null;
};

export default AuthVerify;
