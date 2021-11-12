//Npm import
import PropTypes from 'prop-types';

//Style
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
        value={value || ''}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

//Default Prop
Field.defaultProps = {
  required: false,
  disabled: false,
  value: '',
  onBlur: () => {},
};

//Prop validation
Field.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
};
