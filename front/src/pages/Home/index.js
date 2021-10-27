import categoryData from 'src/data/category.json';

import './home.scss';

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
      </section>
      <section className="popular-category">
        <h3 className="popular-category__title">
          Catégories les plus populaires
        </h3>
        <div className="popular-category__cards">
          {categories.map((category) => (
            <div className="popular-category__card">
              <img className="popular-category__card-image" src={category.image} alt={category.name} />
              <span className="popular-category__card-name">{category.name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
