import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import FooterWaveDesktop from 'src/assets/images/footer-wave-desktop.svg';
import FooterWaveMobile from 'src/assets/images/footer-wave-mobile.svg';
import './style.scss';

const Footer = () => (
  <footer className="footer">
    {/* alt attribute is empty for decorative images */}
    <img
      src={FooterWaveDesktop}
      className="footer__wave footer__wave--desktop"
      alt=""
    />
    <img
      src={FooterWaveMobile}
      className="footer__wave footer__wave--mobile"
      alt=""
    />
    {/* HashLink permits to use an anchor in a react-router Link  */}
    <HashLink
      className="footer__item footer__item--link"
      to="/a-propos#contact"
    >
      Nous contacter
    </HashLink>
    <Link
      className="footer__item footer__item--link"
      to="/politique-confidentialite"
    >
      Politique de confidentialité
    </Link>
    <Link
      className="footer__item footer__item--link"
      to="/conditions-generales"
    >
      Conditions générales
    </Link>
    <span className="footer__item">© 2021 Mentor.me 1.0.0</span>
  </footer>
);

export default Footer;
