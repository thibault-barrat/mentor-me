import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

import { AiOutlineSearch } from 'react-icons/ai';
import { changeSearchValue, searchServices } from '../../actions/service';

export default function Search({ placeholder, buttonValue }) {
  // we need the search value from the redux store
  // to display it in the input (controlled field)
  const searchValue = useSelector((state) => state.services.searchValue);

  // function to handle change value of search field
  // to have a controlled field
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(changeSearchValue(e.target.value));
  };

  // function to handle submit of search field
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchServices());
  };

  return (
    <div className="search">
      <form className="search-form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          onChange={handleChange}
          value={searchValue}
        />
        <div
          className="search-icon"
          id="icon"
        >
          <AiOutlineSearch />
        </div>
        <button
          className="search-button"
          type="submit"
        >
          {buttonValue}
        </button>
      </form>
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  buttonValue: PropTypes.string.isRequired,
};
