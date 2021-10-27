import './style.scss';

import {AiOutlineSearch} from 'react-icons/ai';

export default function Search() {
  return (
    <div className="search">
      <form className="search-form" action="">
        <input 
        type="text"
        placeholder="Je veux apprendre ..."
        className="search-input"
        />
        <div className="search-icon" id="icon"><AiOutlineSearch /></div>
        <button className="search-button" type="submit">
        Je cherche une compétence
        </button>
      </form>
    </div>
  );
}
