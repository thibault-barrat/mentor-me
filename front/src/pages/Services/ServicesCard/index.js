import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

// Style
import './style.scss';


export default function ServicesCard({ result, onMouseOver }) {
  // Here we get the categories infos from the reducer 
  const categoryState = useSelector(state => state.categories.items);

  const categoryName = categoryState.filter((item) => item.id === result.category_id);

  const classVisio = result.online ? 'tag' : 'tag tag-unselected';
  const classPresentiel = result.irl ? 'tag' : 'tag tag-unselected';

  return (
    
    <li 
      className="card"
      onMouseOver={onMouseOver}
    >
      <header className="tags">
        {categoryName.map((item)=> (
          <div className="tag" key={item.id}>{item.name}</div>
        ))}
        <div className={classVisio}>Visio</div>
        <div className={classPresentiel}>Présentiel</div>
        <div className="tags-icon"> <AiOutlineHeart size={23}/> </div>
      </header>
      <Link
        to={`/service/${result.id}`}
      >
        <div className="card-container">
          <div className="card-image-container">
            <img 
              className="card-image"
              src={result.avatar_url} 
              alt="Photo de profil"
            />
          </div>
          <div className="card-content-container">
            <h2 className="card-title">
              {result.title}
            </h2>
            <p className="card-description">
              {result.description.substring(0, 30)}
              <span className="card-description-span">...lire la suite</span>
            </p>
            <span className="card-name">
              <p className="card-name-firstname">{result.firstname}</p>
              <p>{result.lastname}</p>
            </span>
          </div>
        </div>
      </Link>
    </li>
    
  );
}

// Prop validation
ServicesCard.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      category_id: PropTypes.number,
    }),
  ).isRequired,
};
