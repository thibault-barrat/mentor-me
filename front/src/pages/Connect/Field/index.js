import PropTypes from 'prop-types';

import './style.scss';

export default function Field({name, placeholder}) {
  return (
    <div className="field">
      <label 
        className="field-label"
        htmlFor=""
      >
      {placeholder}
      </label>
      <input 
        type="text"
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}

Field.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
