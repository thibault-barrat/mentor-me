import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import {FcLikePlaceholder, FcLike} from 'react-icons';

// Style
import './style.scss';


export default function ServicesCard({ result }) {

  const [visio, setVisio] = useState(true);
  const [presentiel, setPresentiel] = useState(true);

  const classVisio = visio ? 'tag' : 'tag tag-unselected';
  const classPresentiel = presentiel ? 'tag' : 'tag tag-unselected';

  return (
    <Link
        to={`/service/${result.id}`}
    >
      <li className="card">
        <header className="tags">
          <div className="tag">Informatique</div>
          <div className={classVisio}>Visio</div>
          <div className={classPresentiel}>Présentiel</div>
        </header>
        <div className="card-container">
          <div className="card-image-container">
            <img 
              className="card-image"
              src="https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200009.jpg" 
              alt="Photo de profil"
            />
          </div>
          <div className="card-content-container">
            <h2 className="card-title">
              {result.title}
            </h2>
            <span className="card-name">
              Nom du mentor
            </span>
            <span className="card-location">
              Location
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
    }),
  ).isRequired,
};
