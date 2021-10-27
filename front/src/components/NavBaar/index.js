import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from 'src/assets/images/LogoMentorMe-maxi.svg';
import { MenuItems } from './MenuItems';
import './NavBar.scss';

/* creation d'un composant NavBar le composant est
a update au moment de gérer la connexion !  */

const NavBaar = () => {
  const [clicked, setClicked] = useState(false);

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
        {MenuItems.map((item) => (
          <li key={item.id}>
            <NavLink className={item.cName} to={item.url}>
              {item.title}
            </NavLink>
          </li>
        ))}

      </ul>
    </nav>
  );
};

export default NavBaar;
