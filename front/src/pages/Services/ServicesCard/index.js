import { useState } from 'react';
// import {FcLikePlaceholder, FcLike} from 'react-icons';

// Style
import './style.scss';


export default function ServicesCard({
  title, 
  duration, 
  description, 
  disponibility
}) {
  const [visio, setVisio] = useState(true);
  const [presentiel, setPresentiel] = useState(true);

  const classVisio = visio ? 'tag' : 'tag tag-unselected';
  const classPresentiel = presentiel ? 'tag' : 'tag tag-unselected';

  return (
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
            {title}
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
  );
}
