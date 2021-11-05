import './style.scss';

import {AiOutlineSearch} from 'react-icons/ai';

export default function Search({placeholder, buttonValue}) {
  return (
    <div className="search">
      <form className="search-form" action="">
        <input 
        type="text"
        placeholder={placeholder}
        className="search-input"
        />
        <div 
          className="search-icon" 
          id="icon">
          <AiOutlineSearch />
        </div>
        <button 
          className="search-button" 
          type="submit">
          {buttonValue}
        </button>
      </form>
    </div>
  );
}
