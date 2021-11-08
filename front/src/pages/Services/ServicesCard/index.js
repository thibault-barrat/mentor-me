import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import {FcLikePlaceholder, FcLike} from 'react-icons';

// Style
import './style.scss';


export default function ServicesCard({ result }) {
  // Here we get the categories infos from the reducer 
  const categoryState = useSelector(state => state.categories.items);

  const categoryName = categoryState.filter((item) => item.id === result.category_id);

  const classVisio = result.online ? 'tag' : 'tag tag-unselected';
  const classPresentiel = result.irl ? 'tag' : 'tag tag-unselected';

  return (
    <Link
        to={`/service/${result.id}`}
    >
      <li className="card">
        <header className="tags">
          {categoryName.map((item)=> (
            <div className="tag" key={item.id}>{item.name}</div>
          ))}
          <div className={classVisio}>Visio</div>
          <div className={classPresentiel}>Présentiel</div>
        </header>
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
            <span className="card-name">
              {result.firstname}
              {result.lastname}
            </span>
          </div>
        </div>
      </li>
    </Link>
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
