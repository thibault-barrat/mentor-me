import PropTypes from 'prop-types';

import './style.scss';

export default function Field({
  name, placeholder, value, onChange,
}) {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  return (
    <div className="field">
      <label
        className="field-label"
        htmlFor=""
      >
        {placeholder}
      </label>
      <input
        type={name}
        placeholder={placeholder}
        className="field-input"
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
}

Field.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
