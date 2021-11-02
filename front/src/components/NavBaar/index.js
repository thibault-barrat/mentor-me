/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from 'src/assets/images/LogoMentorMe-maxi.svg';
import './NavBar.scss';

/* creation d'un composant NavBar le composant est
a update au moment de gérer la connexion !  */

const NavBaar = () => {
  const [clicked, setClicked] = useState(false);
  const isLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  /* handleClick here set 'clicked' to the opposite value */
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="NavBarItems">
      <img className="NavBarLogo" src={logo} alt="logo mentor me" />
      <div className="MenuIcon" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={`NavMenu ${clicked ? 'navMenuActive' : ''}`}>
        <li>
          <NavLink className="navLinks" to="/">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink className="navLinks" to="/a-propos">
            A propos
          </NavLink>
        </li>
        {!isLogged && (
          <li>
            <NavLink className="navLinks" to="/connexion">
              Se connecter
            </NavLink>
          </li>
        )}
        {!isLogged && (
          <li>
            <NavLink className="navLinks" to="/inscription">
              S'inscrire
            </NavLink>
          </li>
        )}
        {isLogged && (
          <li>
            <NavLink className="navLinks" to="/categories">
              Catégories
            </NavLink>
          </li>
        )}
        {isLogged && (
          <li>
            <NavLink className="navLinks" to="/profil">
              Mon profil
            </NavLink>
          </li>
        )}
        {isAdmin && isLogged && (
          <li>
            <NavLink className="navLinks" to="/admin">
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBaar;
