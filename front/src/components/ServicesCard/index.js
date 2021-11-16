import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { likeService, unlikeService } from 'src/actions/service';

// Style
import './style.scss';

export default function ServicesCard({ result, onMouseOver }) {
  // Here we get the categories infos from the reducer
  const categoryState = useSelector((state) => state.categories.items);

  // Here we get the likedServices infos from the reducer
  const likedServices = useSelector((state) => state.user.likedServices);
  // Here the state we use to change the liked heart css
  const [isLiked, setIsLiked] = useState(likedServices.some((service) => service.service_id === result.id));

  const dispatch = useDispatch();

  // Here we want to get the first category's name that match with the category selected
  const categoryName = categoryState.filter((item) => item.id === result.category_id);

  // Here we want to show the tags IRL or ONLINE if they are selected
  const classVisio = result.online ? 'tag' : 'tag tag-unselected';
  const classPresentiel = result.irl ? 'tag' : 'tag tag-unselected';

  return (

    <li
      className="card"
      onMouseOver={onMouseOver}
    >
      <header className="tags">
        {categoryName.map((item) => (
          <div
            className="tag-title"
            key={item.id}
            style={{
              backgroundColor: item.color,
            }}
          >
            {item.name}
          </div>
        ))}
        <div className={classVisio}>Visio</div>
        <div className={classPresentiel}>Présentiel</div>
        <div className="tags-icon">
          {isLiked ? (
            <AiFillHeart
              className="likedHeart"
              size={23}
              onClick={() => {
                dispatch(unlikeService(result.id));
                setIsLiked(false);
              }}
            />
          ) : (
            <AiOutlineHeart
              onClick={() => {
                dispatch(likeService(result.id));
                setIsLiked(true);
              }}
              size={23}
            />
          )}

        </div>
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
  result:
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      category_id: PropTypes.number,
    }).isRequired,
};
