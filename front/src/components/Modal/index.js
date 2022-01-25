import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteService, unlikeService } from '../../actions/service';
import { deleteProfile } from '../../actions/user';
import { publishService } from '../../actions/admin';

import './style.scss';

const Modal = ({
  closeAction, closeParentAction, action, className,
}) => {
  // we need local state variables for text and text button
  const [text, setText] = useState('');
  const [textButton, setTextButton] = useState('');

  // we define text and textButton depending on action
  // when action is updated
  useEffect(() => {
    switch (action.type) {
      case 'delete':
        switch (action.target) {
          case 'service':
            setText('Etes-vous sûr de vouloir supprimer ce service ?');
            setTextButton('Supprimer');
            break;
          case 'user':
            switch (action.role) {
              case 'admin':
                setText('Etes-vous sûr de vouloir supprimer cet utilisateur ?');
                setTextButton('Supprimer');
                break;
              case 'user':
                setText('Etes-vous sûr de vouloir supprimer votre profil ?');
                setTextButton('Supprimer');
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      case 'publish':
        setText('Etes-vous sûr de vouloir publier ce service ?');
        setTextButton('Publier');
        break;
      case 'unlike':
        setText('Etes-vous sûr de vouloir retirer ce service de vos favoris ?');
        setTextButton('Retirer');
        break;
      default:
        break;
    }
  }, [action]);

  const dispatch = useDispatch();

  // function to handle click on confirm button
  // and dispatch the correct action depending on action props of the modal
  // and close the modal and eventually the parent modal
  const handleConfirmClick = () => {
    switch (action.type) {
      case 'delete':
        switch (action.target) {
          case 'service':
            dispatch(deleteService(action.id));
            closeAction();
            closeParentAction();
            break;
          case 'user':
            dispatch(deleteProfile(action.id, action.role));
            closeAction();
            closeParentAction();
            break;
          default:
            break;
        }
        break;
      case 'publish':
        dispatch(publishService(action.id));
        closeAction();
        closeParentAction();
        break;
      case 'unlike':
        dispatch(unlikeService(action.id));
        closeAction();
        closeParentAction();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`modal ${className}`}>
      <p className="modal__text">{text}</p>
      <div className="modal__button-container">
        <button
          type="button"
          className="modal__button"
          onClick={closeAction}
        >
          Annnuler
        </button>
        <button
          type="button"
          className="modal__button"
          onClick={handleConfirmClick}
        >
          {textButton}
        </button>
      </div>
    </div>
  );
};

// className and closeParentAction are optional
// we need closeParentAction only if we want to close the parent modal
Modal.defaultProps = {
  className: '',
  closeParentAction: () => {},
};

Modal.propTypes = {
  className: PropTypes.string,
  closeAction: PropTypes.func.isRequired,
  closeParentAction: PropTypes.func,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Modal;
