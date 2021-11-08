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
          ...service.title.split(/[^\w]/g).filter((item) => item.length > 2),
          ...service.description.split(/[^\w]/g).filter((item) => item.length > 2),
        ]);
      });
      // we filter suggestions to remove all duplicates
      // setSuggestions(
      //   suggestions.filter((item, index, self) => self.indexOf(item) === index),
      // );
      // we filter suggestions to remove all words with less than 3 characters
      // setSuggestions(suggestions.filter((item) => item.length > 2));
    }
  }, [services]);

  // function to handle change value of search field
  // to have a controlled field
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(changeSearchValue(e.target.value));
  };

  // we need some state variables to manage autocompletion of the search input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // when searchValue is changed, we need to update the filteredSuggestions
  // and the activeSuggestionIndex
  // useEffect(() => {
  //   if (searchValue !== '') {
  //     const filtered = suggestions.filter(
  //       (suggestion) => suggestions.filter((item, index, self) => self.indexOf(item) === index)
  //       (suggestion) => suggestion.toLowerCase().includes(searchValue.toLowerCase()),
  //     );
  //     setFilteredSuggestions(filtered);
  //     setActiveSuggestionIndex(0);
  //   }
  // }, [searchValue]);

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
