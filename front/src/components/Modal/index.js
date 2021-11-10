import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteService } from '../../actions/service';
import { deleteProfile } from '../../actions/user';

import './style.scss';

const Modal = ({
  cancelAction, action,
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
            setText('Etes-vous sûr de vouloir supprimer cet utilisateur ?');
            setTextButton('Supprimer');
            break;
          default:
            break;
        }
        break;
      case 'publish':
        setText('Etes-vous sûr de vouloir publier ce service ?');
        setTextButton('Publier');
        break;
      default:
        break;
    }
  }, [action]);

  const dispatch = useDispatch();

  // function to handle click on confirm button
  const handleConfirmClick = () => {
    switch (action.type) {
      case 'delete':
        switch (action.target) {
          case 'service':
            dispatch(deleteService(action.id));
            cancelAction();
            break;
          case 'user':
            dispatch(deleteProfile(action.id, 'admin'));
            cancelAction();
            break;
          default:
            break;
        }
        break;
      case 'publish':
        console.log('publish service', action.id);
        cancelAction();
        break;
      default:
        break;
    }
  };

  return (
    <div className="modal">
      <p className="modal__text">{text}</p>
      <div className="modal__button-container">
        <button
          type="button"
          className="modal__button"
          onClick={cancelAction}
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

Modal.propTypes = {
  cancelAction: PropTypes.func.isRequired,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Modal;
