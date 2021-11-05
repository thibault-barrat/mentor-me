/* eslint-disable max-len */
import './style.scss';
import { useState } from 'react';
import avatarimg from '../../assets/images/business-gfb594ee9b_1280.jpg';

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
        <p className="desc__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, cum minus! Vero sed ipsum blanditiis, reprehenderit ab delectus eveniet rerum. Libero, accusamus ducimus rerum voluptatum at, nostrum soluta illo sunt, magni esse deserunt repellendus dolorum? Animi, fugiat unde! Aspernatur adipisci quia qui cupiditate aperiam! Maiores illo quos tenetur in officiis.</p>
      </div>
      <h1 className="faq__title">Les questions fréquentes</h1>
      <div className="faq__container">
        <div className="faq__list__container">
          <div name="q1" className="faq__list__item" onClick={handleClick1}> <span className="faq__list__question">question 1</span>
            <i className={showed1 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed1 ? 'faq__list__answer__clicked' : ''}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas voluptatum nemo sit quisquam rerum!</p>
          </div>
          <div className="faq__list__item" onClick={handleClick2}> <span className="faq__list__question">question 2</span>
            <i className={showed2 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed2 ? 'faq__list__answer__clicked' : ''}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas voluptatum nemo sit quisquam rerum!</p>
          </div>
          <div name="q2" className="faq__list__item" onClick={handleClick3}> <span className="faq__list__question">question 3</span>
            <i className={showed3 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed3 ? 'faq__list__answer__clicked' : ''}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas voluptatum nemo sit quisquam rerum!</p>
          </div>
          <div className="faq__list__item" onClick={handleClick4}> <span className="faq__list__question">question 4</span>
            <i className={showed4 ? 'fas fa-angle-down' : 'fas fa-angle-right'} />
            <p className={`faq__list__answer ${showed4 ? 'faq__list__answer__clicked' : ''}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas voluptatum nemo sit quisquam rerum!</p>
          </div>
        </div>
      </div>
      <h1>L'équipe</h1>
      <div className="avatar__container">
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimg} alt="personnes du groupe" />
          <h2 className="avatar__name">prénom : role</h2>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimg} alt="personnes du groupe" />
          <h2 className="avatar__name">prénom : role</h2>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimg} alt="personnes du groupe" />
          <h2 className="avatar__name">prénom : role</h2>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimg} alt="personnes du groupe" />
          <h2 className="avatar__name">prénom : role</h2>
        </div>
        <div className="avatar__comp">
          <img className="avatar__img" src={avatarimg} alt="personnes du groupe" />
          <h2 className="avatar__name">prénom : role</h2>
        </div>
      </div>
      <h1 className="contactform__title">Nous contacter</h1>
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
