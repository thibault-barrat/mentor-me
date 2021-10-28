import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoginField, submitLogin } from '../../actions/user';
import Field from '../../components/Field';

import './style.scss';

export default function Connect() {
  const { email, password, logged } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    dispatch(changeLoginField(value, name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitLogin());
  };

  const history = useHistory();

  // Redirect to home after connection
  useEffect(() => {
    if (logged) {
      history.replace('/');
    }
  }, [logged]);

  return (
    <div className="connect">
      <form
        onSubmit={handleSubmit}
      >
        <Field
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}

        />
        <Field
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChange}

        />
        <button
          type="submit"
          className="connect-button"
        >
          Me connecter
        </button>
      </form>
      <Link
        className="connect-link"
        to="/inscription"
      >
        Vous n'avez pas de compte ?
      </Link>
    </div>
  );
}
