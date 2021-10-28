import { Link } from 'react-router-dom';
import Field from './Field';

import './style.scss';

export default function Connect() {

  return (
    <div className="connect">
      <form >
        <Field 
          name="email"
          placeholder="Email"
          
        />
        <Field 
          name="password"
          placeholder="Mot de passe"
          
        />
        <button
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


