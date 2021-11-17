import PopCatWave from 'src/assets/images/popular-cat-wave.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdChevronRight } from 'react-icons/md';
import Search from 'src/components/Search';

import './style.scss';

const Home = () => {
  // /**
  //  *
  //  * @param {array} array the array to randomized
  //  * @param {number} n the number of values to have in the randomized array
  //  * @returns a randomized array
  //  */
  // const chooseRandom = (array, n) => (
  //   array.sort(() => 0.5 - Math.random()).slice(0, n)
  // );

  // We take the categories and services from the redux store
  const categoryData = useSelector((state) => state.categories.items);
  const servicesData = useSelector((state) => state.services.items);

  // // we want to have 4 random categories
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   setCategories(chooseRandom(categoryData, 4));
  // }, [categoryData]);

  // We need to know if the user is logged to change the home for connected user
  const logged = useSelector((state) => state.user.logged);

  return (
    <main className="home">
      <section className="slogan">
        <div className="slogan__container">

          <h1 className="slogan__title">Bienvenue sur Mentor.me, mets ton savoir
            à profit et partage ton domaine avec
            des passionnés comme toi
          </h1>
          <p className="slogan__text">
            Mentor.me est une plateforme communautaire de personnes souhaitant
            partager leurs compétences et/ou profiter des compétences proposées.
            Trouve ou propose des compétences dans tous les domaines : bricolage,
            cuisine, sport, informatique, etc… La plateforme a pour principe l’entraide
            et le partage de connaissances gratuitement, sans contrepartie.
          </p>
          {!logged && (
            <p className="slogan__inv"> Si tu veux avoir accès à nos cours et partager une annonce, nous t'invitons à créer ton compte !</p>
          )}
        </div>
        {/* We display the search form and the button to the new service form
          only for logged user */}
        {logged && (
          <>
            <Search
              placeholder="Je veux apprendre..."
              buttonValue="Rechercher"
            />
            <Link
              to="/nouveau-service"
              className="search-button slogan__button"
            >
              Je propose une compétence
            </Link>
          </>
        )}
      </section>
      <section className="white-bg">
        {/* alt attribute is empty for decorative images */}
        <img src={PopCatWave} className="popular-category__wave" alt="" />
        <div className="home__container popular-category">
          <h3 className="popular-category__title">
            Les dernières catégories
          </h3>
          {/* We display the link to the categories only for logged user */}
          {logged && (
            <Link className="popular-category__link" to="/categories">
              <MdChevronRight className="popular-category__icon" />
              Toutes les catégories
            </Link>
          )}
          <div className="popular-category__cards">
            {categoryData.slice(0, 4).map((category) => (
              // We use ternary operator to transform the card to a link for logged user
              logged ? (
                <Link key={category.id} to={`/categories/${category.id}/services`} className="popular-category__card">
                  <img className="popular-category__card-image" src={category.image} alt={category.name} />
                  <span className="popular-category__card-name">{category.name}</span>
                </Link>
              )
                : (
                  <div key={category.id} className="popular-category__card">
                    <img className="popular-category__card-image" src={category.image} alt={category.name} />
                    <span className="popular-category__card-name">{category.name}</span>
                  </div>
                )
            ))}
          </div>
        </div>
      </section>
      <section className="last-services__section">
        <div className="home__container last-services">
          <div className="last-services__cards">
            {/* We just need the last four services */}
            {servicesData.slice(-4).map((service) => (
              // We use ternary operator to transform the card to a link for logged user
              logged ? (
                <Link key={service.id} to={`/service/${service.id}`} className="last-services__card">
                  <img
                    className="last-services__card-image"
                    // Here we will use the image of the category of the service
                    src={categoryData.find((category) => category.id === service.category_id).image}
                    alt={service.title}
                  />
                  <span
                    className="last-services__card-name"
                  >
                    {service.title}
                  </span>
                </Link>
              )
                : (
                  <div
                    key={service.id}
                    className="last-services__card"
                  >
                    <img
                      className="last-services__card-image"
                      // Here we will use the image of the category of the service
                      src={categoryData
                        .find((category) => category.id === service.category_id).image}
                      alt={service.title}
                    />
                    <span
                      className="last-services__card-name"
                    >
                      {service.title}
                    </span>
                  </div>
                )
            ))}
          </div>
          <h3 className="last-services__title">
            Les derniers cours proposés
          </h3>
          <h2 className="last-services__slogan">
            Apprendre, explorer, partager
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Home;
