/* eslint-disable max-len */
import './style.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { changeField, submitForm } from 'src/actions/messages';
import avatarimgf from '../../assets/images/florent.jpg';
import avatarimgt from '../../assets/images/thibault.jpg';
import avatarimgw from '../../assets/images/wilfried.jpg';
import avatarimgd from '../../assets/images/david.jpg';
import avatarimgm from '../../assets/images/marion.jpg';

// component about

const About = () => {
  const [activeId, setActiveId] = useState();
  const [error, setError] = useState(false);

  const {
    lastname, firstname, email, message,
  } = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  // function to toggle the active id
  const toggleActiveId = (id) => {
    if (activeId === id) {
      setActiveId(null);
    }
    else {
      setActiveId(id);
    }
  };

  const handleChange = (event) => {
    dispatch(changeField(event.target.value, event.target.name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (lastname && firstname && email && message) {
      setError(false);
      dispatch(submitForm());
    }
    else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="desc__container">
        <h1 className="desc__title">Notre concept</h1>
        <p className="desc__text">
          Mentor.me est une plateforme communautaire de personnes souhaitant
          partager leurs compétences et/ou profiter des compétences proposées.
          Trouve ou propose des compétences dans tous les domaines : bricolage,
          cuisine, sport, informatique, etc… La plateforme a pour principe l’entraide
          et le partage de connaissances gratuitement, sans contrepartie.
          Inscris-toi dès maintenant pour profiter des offres et en proposer de nouvelles!
        </p>
      </div>
      <h1 className="faq__title inter__title">Les questions fréquentes</h1>
      <div className="faq__container">
        <div className="faq__list__container">
          <div name="q1" className="faq__list__item" onClick={() => toggleActiveId(1)}>
            <div className="faq__list__question">
              <span className="faq__list__question-text">Est-ce que cet échange de service est réellement gratuit ?</span>
              <FaChevronDown className={`faq__list__chevron ${activeId === 1 ? 'faq__list__chevron__clicked' : ''}`} />
            </div>
            <p className={`faq__list__answer ${activeId === 1 ? 'faq__list__answer__clicked' : ''}`}>Oui, nous demandons à tous nos membres de respecter cette règle. Ce site vise à proposer un échange gratuit de compétences.</p>
          </div>
          <div className="faq__list__item" onClick={() => toggleActiveId(2)}>
            <div className="faq__list__question">
              <span className="faq__list__question-text">Un service m’intéresse. Comment puis-je contacter un mentor ?</span>
              <FaChevronDown className={`faq__list__chevron ${activeId === 2 ? 'faq__list__chevron__clicked' : ''}`} />
            </div>
            <p className={`faq__list__answer ${activeId === 2 ? 'faq__list__answer__clicked' : ''}`}>Tu peux contacter un mentor directement via l’email de contact sur la page du service ou via son adresse email présente sur son profil.</p>
          </div>
          <div name="q2" className="faq__list__item" onClick={() => toggleActiveId(3)}>
            <div className="faq__list__question">
              <span className="faq__list__question-text">Combien de services puis-je proposer ?</span>
              <FaChevronDown className={`faq__list__chevron ${activeId === 3 ? 'faq__list__chevron__clicked' : ''}`} />
            </div>
            <p className={`faq__list__answer ${activeId === 3 ? 'faq__list__answer__clicked' : ''}`}>La proposition de service est en principe illimitée. Comme notre solution est une solution gratuite, c’est au bon vouloir de chacun.</p>
          </div>
          <div className="faq__list__item" onClick={() => toggleActiveId(4)}>
            <div className="faq__list__question">
              <span className="faq__list__question-text">Je ne trouve pas ma question dans cette FAQ, où puis-je la poser ?</span>
              <FaChevronDown className={`faq__list__chevron ${activeId === 4 ? 'faq__list__chevron__clicked' : ''}`} />
            </div>
            <p className={`faq__list__answer ${activeId === 4 ? 'faq__list__answer__clicked' : ''}`}>N’hésite pas à contacter un membre de l’équipe de Mentor.me à l’adresse de contact suivante : mentorme.contact@gmail.com.</p>
          </div>
        </div>
      </div>
      <h1 className="inter__title">L'équipe</h1>
      <div className="avatar__container">
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgm} alt="personnes du groupe" />
          <div>
            <h2 className="avatar__name position__img">Marion</h2>
            <p className="avatar__name position__img">Git master et dev back</p>
          </div>
          <div className="profil__networks">
            <a className=" profil__inf" href="https://www.linkedin.com/in/marion-bricout/">
              <AiFillLinkedin />
            </a>
            <a className=" profil__inf" href="https://github.com/Axurynn">
              <AiFillGithub />
            </a>
          </div>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgw} alt="personnes du groupe" />
          <div>
            <h2 className="avatar__name">Wilfried</h2>
            <p className="avatar__name position__img">Lead dev back</p>
          </div>
          <div className="profil__networks">
            <a className=" profil__inf" href="https://www.linkedin.com/in/wilfried-vandamme">
              <AiFillLinkedin />
            </a>
            <a className=" profil__inf" href="https://github.com/WilloisS">
              <AiFillGithub />
            </a>
          </div>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgf} alt="personnes du groupe" />
          <div>
            <h2 className="avatar__name ">Florent</h2>
            <p className="avatar__name position__img">Product Owner et dev front</p>
          </div>
          <div className="profil__networks">
            <a className=" profil__inf" href="https://www.linkedin.com/in/florent-clemenceau/">
              <AiFillLinkedin />
            </a>
            <a className=" profil__inf" href="https://github.com/FloClem">
              <AiFillGithub />
            </a>
          </div>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgt} alt="personnes du groupe" />
          <div>
            <h2 className="avatar__name">Thibault</h2>
            <p className="avatar__name position__img">Scrum master et dev front</p>
          </div>
          <div className="profil__networks">
            <a className=" profil__inf" href="https://www.linkedin.com/in/thibaultbarrat/">
              <AiFillLinkedin />
            </a>
            <a className=" profil__inf" href="https://github.com/thibault-barrat">
              <AiFillGithub />
            </a>
          </div>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img position__img" src={avatarimgd} alt="personnes du groupe" />
          <div>
            <h2 className="avatar__name">David</h2>
            <p className="avatar__name position__img">Lead dev front</p>
          </div>
          <div className="profil__networks">
            <a className=" profil__inf" href="https://www.linkedin.com/in/david-dang">
              <AiFillLinkedin />
            </a>
            <a className=" profil__inf" href="https://github.com/Davnc988">
              <AiFillGithub />
            </a>
          </div>
        </div>
      </div>
      <h1 id="contact" className="contactform__title inter__title">Nous contacter</h1>
      <form action="" method="post">
        <div className="contactform__container">
          <input onChange={handleChange} name="lastname" value={lastname} className="contactform__input" type="text" placeholder="ton nom" required />
          <input onChange={handleChange} name="firstname" value={firstname} className="contactform__input" type="text" placeholder="ton prénom" required />
          <input onChange={handleChange} name="email" value={email} className="contactform__input" type="email" placeholder="ton adresse mail" required />
          <textarea onChange={handleChange} name="message" value={message} className="contactform__input contactform__message" type="text" placeholder="ton message" required />
        </div>
        {error && <p className="contactform__error">Tous les champs doivent être remplis</p>}
        <button
          type="submit"
          className="contactform__button"
          onClick={handleSubmit}
        >
          <span>Envoyer </span><FiSend />
        </button>
      </form>
    </div>
  );
};

export default About;
