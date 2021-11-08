// Npm import
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Style
import './style.scss';

export default function Category({result}) {

  // Here we need to map on the datas we got from the Props 'result'
  // And create each card we got from the API
  // And we also need to link our category's cards to their service's page
  const jsxcategory = result.map((item)=>(
    <Link
        to={`/categories/${item.id}/services`}
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

// Prop validation
Category.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
};
