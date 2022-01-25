import { MdOutlineClose } from 'react-icons/md';
import PropTypes from 'prop-types';

import './style.scss';
import { useState } from 'react';
import Modal from '../Modal';

const UserModal = ({ user, closeAction }) => {
  // we need local state variables to display modal
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState({});

  return (
    <div className="user-modal">
      <MdOutlineClose className="user-modal__close" onClick={closeAction} />
      <div className="user-modal__content">
        <h1 className="user-modal__title">{`${user.firstname} ${user.lastname}`}</h1>
        <img className="user-modal__avatar" src={user.avatar_url} alt="user avatar" />
        {user.biography && (
          <p className="user-modal__text">
            <span className="user-modal__text--bold">Biographie : </span> {user.biography}
          </p>
        )}
        <p className="user-modal__text">
          <span className="user-modal__text--bold">Email : </span> {user.email}
        </p>
        {user.home_phone && (
          <p className="user-modal__text">
            <span className="user-modal__text--bold">Téléphone fixe : </span> {user.home_phone}
          </p>
        )}
        {user.mobile_phone && (
          <p className="user-modal__text">
            <span className="user-modal__text--bold">Téléphone portable : </span> {user.mobile_phone}
          </p>
        )}
        <p className="user-modal__text">
          <span className="user-modal__text--bold">Rôle : </span> {user.role_id === 1 ? 'Utilisateur' : 'Admin'}
        </p>
        <div className="user-modal__button-container">
          {/* We display the modal when showModal is true */}
          {showModal && (
            <Modal
              className="modal--in-parent-modal"
              action={modalAction}
              closeAction={() => setShowModal(false)}
              closeParentAction={closeAction}
            />
          )}
          <button
            type="button"
            className="user-modal__button"
            onClick={() => {
              setModalAction({
                type: 'delete',
                target: 'user',
                role: 'admin',
                id: user.id,
              });
              setShowModal(true);
            }}
          >
            Supprimer
          </button>
        </div>

      </div>
    </div>
  );
};

UserModal.propTypes = {
  closeAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    role_id: PropTypes.number.isRequired,
    biography: PropTypes.string,
    home_phone: PropTypes.string,
    mobile_phone: PropTypes.string,
  }).isRequired,
};

export default UserModal;
