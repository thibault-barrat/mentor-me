
//Style
import './style.scss';


export default function ServicesCard({
  title, 
  duration, 
  description, 
  disponibility
}) {
  return (
    <li className="card">
      <div className="card-container">
        <div className="card-image-container">
          <img 
            className="card-image"
            src="https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200009.jpg" 
            alt="Photo de profil"
          />
        </div>
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
    </li>
  );
}
