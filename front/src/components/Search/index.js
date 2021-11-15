import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  // we create a suggestion array from the services title and description
  // to display them in the suggestions list
  const services = useSelector((state) => state.services.items);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (services.length > 0) {
      services.forEach((service) => {
        setSuggestions((prev) => [
          ...prev,
          ...service.title.toLowerCase().split(/[ .:;?!~',`"&|()<>{}[\]\r\n/\\]+/).filter((item) => item.length > 2),
          ...service.description.toLowerCase().split(/[ .:;?'!~,`"&|()<>{}[\]\r\n/\\]+/).filter((item) => item.length > 2),
        ]);
      });
    }
  }, [services]);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // we need a boolean to know if user has cliked on a suggestion
  // and empty the suggestions list
  const [toggleClickSuggestion, setToggleClickSuggestion] = useState(false);

  // when searchValue is changed, we need to update the filteredSuggestions
  // and the activeSuggestionIndex
  useEffect(() => {
    if (searchValue !== '') {
      const filtered = suggestions.filter(
        // we remove duplicate and filter with the value of search input
        (suggestion, index, self) => self.indexOf(suggestion) === index
          && suggestion.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase(),
      );
      setFilteredSuggestions(filtered);
    }
    else {
      setFilteredSuggestions([]);
    }
  }, [searchValue]);

  useEffect(() => {
    setFilteredSuggestions([]);
  }, [toggleClickSuggestion]);

  // function to handle click outside of the suggestions list
  const handleClickOutside = (event) => {
    if (!event.target.className.includes('search-input') && !event.target.className.includes('search-suggestion')) {
      setFilteredSuggestions([]);
    }
  };

  // we add an event listener to the window to close the suggestions list
  // when the user clicks outside of it
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // function to handle click on a suggestion
  const dispatch = useDispatch();
  const handleSuggestionClick = (suggestion) => {
    dispatch(changeSearchValue(suggestion));
    setToggleClickSuggestion(!toggleClickSuggestion);
  };

  // function to handle change value of search field
  // to have a controlled field
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
        {/* if filterredSuggestions contains items we map on it to display suggestions */}
        {filteredSuggestions.length > 0 && (
          <ul className="search-suggestions">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={`search-suggestion ${index === 0 ? 'active' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
