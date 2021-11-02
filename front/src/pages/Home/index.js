/* eslint-disable import/no-extraneous-dependencies */
import categoryData from 'src/data/category.json';
import servicesData from 'src/data/services.json';
import PopCatWave from 'src/assets/images/popular-cat-wave.svg';

import './style.scss';

const Home = () => {
  /**
   *
   * @param {array} array the array to randomized
   * @param {number} n the number of values to have in the randomized array
   * @returns a randomized array
   */
  const chooseRandom = (array, n) => (
    array.sort(() => 0.5 - Math.random()).slice(0, n)
  );

  // we want to have 4 random categories
  const categories = chooseRandom(categoryData, 4);
  return (
    <main className="home">
      <section className="slogan">
        <div className="container">
          <h1 className="slogan__title">Bienvenue sur Mentor.Me, mets ton savoir
            à profit et partages ton domaine avec
            des passionnés comme toi
          </h1>
          <p className="slogan__text">
            Sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque laudantium, totam
            rem aperiam, eaque ipsa quae ab illo inventore veritatis et
            quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
            voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </section>
      <section className="white-bg">
        {/* alt attribute is empty for decorative images */}
        <img src={PopCatWave} className="popular-category__wave" alt="" />
        <div className="container popular-category">
          <h3 className="popular-category__title">
            Catégories les plus populaires
          </h3>
          <div className="popular-category__cards">
            {categories.map((category) => (
              <div key={category.id} className="popular-category__card">
                <img className="popular-category__card-image" src={category.image} alt={category.name} />
                <span className="popular-category__card-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container last-services">
          <div className="last-services__cards">
            {/* We just need the last four services */}
            {servicesData.slice(-4).map((service) => (
              <div
                key={service.id}
                className="last-services__card"
              >
                <img
                  className="last-services__card-image"
                  // Here we will use the image of the category of the service
                  src={categoryData.find((category) => category.id === service.category_id).image}
                  alt={service.title}
                />
                <span
                  className="last-services__card-name"
                  style={{
                    // Here we will use the category color as background color
                    backgroundColor: categoryData
                      .find((category) => category.id === service.category_id).color,
                  }}
                >
                  {service.title}
                </span>
              </div>
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
