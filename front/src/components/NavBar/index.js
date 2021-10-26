import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';

const NavBar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/' activeStyle>
            Accueil
          </NavLink>
          <NavLink to='/A-propos' activeStyle>
            A propos
          </NavLink>
          <NavLink to='/insciption' activeStyle>
            S'inscrire
          </NavLink>
          <NavLink to='/connexion' activeStyle>
            Se connecter
          </NavLink>
        </NavMenu>
      </Nav>
    </>
    
  );
};
  
export default NavBar;
