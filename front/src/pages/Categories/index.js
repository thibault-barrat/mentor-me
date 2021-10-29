import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Search from 'src/components/Search';
import Category from './Category';
import categoriesData from 'src/data/category';

import './style.scss';

export default function Categories() {

  const getAllCategories = (items) => (items.map((item) => ({
    <Category 
      key={item.id}
      {...item}
    />
  })));

  /* const jsxcategory = categoriesData.map((item)=>(
    
    <Category 
      key={item.id}
      {...item}
    />
  )); */

  return (
    <div className="categories">
      <div className="categories-search">
        <h2 className="categories-quote">
          La compétence s'acquiert par l'apprentissage
        </h2>
        <Search 
          placeholder="Je cherche une compétence ?"
          buttonValue="Rechercher"
        />
      </div>
      <main>
        <ul
          className="categories-list"
        >
          {/* {jsxcategory} */}
          <Category />
        </ul>
      </main>
    </div>
  );
}
