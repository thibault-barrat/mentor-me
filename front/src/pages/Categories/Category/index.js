import './style.scss';

export default function Category({name, image}) {
  return (
    <div className="category">
      <li className="category-card">
        <div className="category-container">
          <img 
            src={image} 
            alt="photo de la catégorie {name}"
            className="category-image"
          />
          <h2 
            className="category-title"
          >
            {name}
          </h2>
        </div>
      </li>
    </div>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};
