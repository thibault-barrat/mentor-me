/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from 'src/assets/images/LogoMentorMe-maxi.svg';
import './NavBar.scss';

const NavBaar = () => {
  /* we are crating our constants for the state */
  const [clicked, setClicked] = useState(false);
  const isLogged = useSelector((state) => state.user.logged);
  const role = useSelector((state) => state.user.role);

  /* handleClick here set 'clicked' to the opposite value */
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      {clicked && (
        <div
          className="bg"
          onClick={() => setClicked(false)}
        />
      )}
      <nav className="NavBarItems">
        <Link
          className="navLogoLink"
          to="/"
          onClick={() => setClicked(false)}
        >
          <img className="NavBarLogo" src={logo} alt="logo mentor me" />
        </Link>
        {/* here we have the "Menu burger" icon with the condition if the icon is clicked then it become a cross and open the menu on smartphone.*/}
        <div className="MenuIcon" onClick={handleClick}>
          {clicked ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
        <ul className={`NavMenu ${clicked ? 'navMenuActive' : ''}`}>
          <li>
            <NavLink
              className="navLinks"
              activeClassName="navLinks--active"
              exact
              to="/"
              onClick={() => setClicked(false)}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLinks"
              activeClassName="navLinks--active"
              to="/a-propos"
              onClick={() => setClicked(false)}
            >
              A propos
            </NavLink>
          </li>
          {!isLogged && (
            <li>
              <NavLink
                className="navLinks"
                activeClassName="navLinks--active"
                to="/connexion"
                onClick={() => setClicked(false)}
              >
                Se connecter
              </NavLink>
            </li>
          )}
          {!isLogged && (
            <li>
              <NavLink
                className="navLinks"
                activeClassName="navLinks--active"
                to="/inscription"
                onClick={() => setClicked(false)}
              >
                S'inscrire
              </NavLink>
            </li>
          )}
          {isLogged && (
            <li>
              <NavLink
                className="navLinks"
                activeClassName="navLinks--active"
                to="/categories"
                onClick={() => setClicked(false)}
              >
                Catégories
              </NavLink>
            </li>
          )}
          {isLogged && (
            <li>
              <NavLink
                className="navLinks"
                activeClassName="navLinks--active"
                to="/profil"
                onClick={() => setClicked(false)}
              >
                Mon profil
              </NavLink>
            </li>
          )}
          {role === 'admin' && isLogged && (
            <li>
              <NavLink
                className="navLinks"
                activeClassName="navLinks--active"
                to="/admin"
                onClick={() => setClicked(false)}
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBaar;
