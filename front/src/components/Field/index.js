import PropTypes from 'prop-types';

import './style.scss';

export default function Field({
  name, placeholder, value, onChange, required, type, onBlur, disabled,
}) {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  return (
    <div className="field">
      <label
        className="field-label"
        htmlFor={name}
      >
        {placeholder}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="field-input"
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

Field.defaultProps = {
  required: false,
  disabled: false,
  onBlur: () => {},
};

Field.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
};
