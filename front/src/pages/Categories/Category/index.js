import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss';

export default function Category({result}) {

  const jsxcategory = result.map((item)=>(
    <Link
        to={`/categories/${item.id}`}
        key={item.name}
    >
      <div className="category">
        <li className="category-card" >
            <div className="category-container">
              <img 
                src={item.image} 
                alt={`photo de la catégorie ${item.name}`}
                className="category-image"
              />
              <h2 
                className="category-title"
              >
                {item.name}
              </h2>
            </div>
          </li>
      </div>
    </Link>
  ));

  return (
    <>
      {jsxcategory}
    </>
  );
}

Category.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
};
