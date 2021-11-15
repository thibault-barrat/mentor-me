/* eslint-disable max-len */
import './style.scss';
import { useState } from 'react';
import avatarimgf from '../../assets/images/florent.jpg';
import avatarimgt from '../../assets/images/thibault.jpg';
import avatarimgw from '../../assets/images/wilfried.jpg';
import avatarimgd from '../../assets/images/david.jpg';
import avatarimgm from '../../assets/images/marion.jpg';

// component about

const About = () => {
  const [showed1, setShowed1] = useState(false);
  const [showed2, setShowed2] = useState(false);
  const [showed3, setShowed3] = useState(false);
  const [showed4, setShowed4] = useState(false);
  // const that allow the user to click on the questiont o see the answer.

  const handleClick1 = () => {
    setShowed1(!showed1);
  };
  const handleClick2 = () => {
    setShowed2(!showed2);
  };
  const handleClick3 = () => {
    setShowed3(!showed3);
  };
  const handleClick4 = () => {
    setShowed4(!showed4);
  };

  return (
    <div>
      <div className="desc__container">
        <h1 className="desc__title">Notre concept</h1>
        <p className="desc__text">MentorMe est une plateforme communautaire de personnes souhaitant partager leurs compétences et/ou profiter des compétences proposées. Trouvez ou proposez des compétences dans tous les domaines : bricolage, cuisine, sport, informatique, etc… La plateforme a pour principe l’entraide et le partage de connaissances gratuitement, sans contrepartie. Inscrivez-vous dès maintenant pour profiter des offres et en proposer de nouvelles!</p>
      </div>
      <h1 className="faq__title inter__title">Les questions fréquentes</h1>
      <div className="faq__container">
        <div className="faq__list__container">
          <div name="q1" className="faq__list__item" onClick={handleClick1}> <span className="faq__list__question">Est-ce que cet échange de service <br /> est réellement gratuit ?</span>
            <i className={showed1 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed1 ? 'faq__list__answer__clicked' : ''}`}>Oui, nous demandons à tous nos membres de respecter cette règle. Ce site vise à proposer un échange gratuit de compétences.</p>
          </div>
          <div className="faq__list__item" onClick={handleClick2}> <span className="faq__list__question">Un service m’intéresse. Comment puis-je <br /> contacter un mentor ?</span>
            <i className={showed2 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed2 ? 'faq__list__answer__clicked' : ''}`}>Vous pouvez contacter un mentor directement via l’email de contact sur la page du service ou via son adresse email présente sur son profil.</p>
          </div>
          <div name="q2" className="faq__list__item" onClick={handleClick3}> <span className="faq__list__question">Combien de services puis-je proposer ?</span>
            <i className={showed3 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed3 ? 'faq__list__answer__clicked' : ''}`}>La proposition de service est en principe illimitée. Comme notre solution est une solution gratuite, c’est à votre bon gré.</p>
          </div>
          <div className="faq__list__item" onClick={handleClick4}> <span className="faq__list__question">Je ne trouve pas ma question dans cette FAQ, <br /> où puis-je la poser ?</span>
            <i className={showed4 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed4 ? 'faq__list__answer__clicked' : ''}`}>N’hésitez pas à contacter un membre de l’équipe de MentorMe à l’adresse de contact suivante : mentorme.contact@gmail.com.</p>
          </div>
        </div>
      </div>
      <h1 className="inter__title">L'équipe</h1>
      <div className="avatar__container">
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgm} alt="personnes du groupe" />
          <h2 className="avatar__name position__img">Marion : Dev back <br />et git master</h2>
          <p className=" profil__inf"><span className="profil__inf__b"> Linkedin :</span><br />  https://www.linkedin.com/in/marion-bricout/</p>
          <p className=" profil__inf"><span className="profil__inf__b"> Github :</span><br /> https://github.com/Axurynn</p>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgw} alt="personnes du groupe" />
          <h2 className="avatar__name">Wilfried : Lead dev  <br />back</h2>
          <p className=" profil__inf"><span className="profil__inf__b"> Linkedin :</span><br /> https://www.linkedin.com/in/wilfried-vandamme</p>
          <p className=" profil__inf"><span className="profil__inf__b"> Github :</span><br /></p>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgf} alt="personnes du groupe" />
          <h2 className="avatar__name ">Florent : Product Owner <br />et dev front</h2>
          <p className=" profil__inf"><span className="profil__inf__b"> Linkedin :</span><br /> https://www.linkedin.com/in/florent-clemenceau/</p>
          <p className=" profil__inf"><span className="profil__inf__b"> Github :</span><br /> https://github.com/FloClem</p>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimgt} alt="personnes du groupe" />
          <h2 className="avatar__name">Thibault : Scrum master <br /> et dev front</h2>
          <p className=" profil__inf"><span className="profil__inf__b"> Linkedin :</span><br /> https://www.linkedin.com/in/thibaultbarrat/</p>
          <p className=" profil__inf"><span className="profil__inf__b"> Github :</span><br /> https://github.com/thibault-barrat</p>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img position__img" src={avatarimgd} alt="personnes du groupe" />
          <h2 className="avatar__name">David : Lead dev <br />front</h2>
          <p className=" profil__inf"><span className="profil__inf__b"> Linkedin :</span><br /> https://www.linkedin.com/in/david-dang</p>
          <p className=" profil__inf"><span className="profil__inf__b"> Github :</span><br /> https://github.com/Davnc988</p>
        </div>
      </div>
      <h1 className="contactform__title inter__title">Nous contacter</h1>
      <div className="contactform__container">
        <input className="contactform__input" type="text" placeholder=" votre nom" />
        <input className="contactform__input" type="text" placeholder=" votre prénom" />
        <input className="contactform__input" type="text" placeholder=" votre adresse Email" />
        <input className="contactform__input" type="textarea" placeholder=" votre  message" />
      </div>
    </div>
  );
};

export default About;
