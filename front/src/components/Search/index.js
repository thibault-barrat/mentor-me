import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'src/components/Spinner';
import PropTypes from 'prop-types';
import './style.scss';

import { AiOutlineSearch } from 'react-icons/ai';
import { changeSearchValue, searchServices } from '../../actions/service';

export default function Search({ placeholder, buttonValue }) {
  // we need the search value from the redux store
  // to display it in the input (controlled field)
  const searchValue = useSelector((state) => state.services.searchValue);

  // we need the redirect value from the redux store
  // to redirect the user to the search results page
  // when the request succeeds
  const redirect = useSelector((state) => state.services.searchRedirect);
  const history = useHistory();
  useEffect(() => {
    if (redirect) {
      history.push('/services');
    }
  }, [redirect]);

  // we need to have the loading state to display a spinner during loading
  const searchLoading = useSelector((state) => state.services.searchLoading);

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
        {/* We display a spinner during loading */}
        {searchLoading && <Spinner />}
        {!searchLoading && (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  buttonValue: PropTypes.string.isRequired,
};
