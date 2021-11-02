import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Search from 'src/components/Search';
import Category from './Category';

//import categoriesData from 'src/data/category';

import './style.scss';

export default function Categories() {
  
  const categoriesResult = useSelector(state => state.categories.items);



  const getAllCategories = (items) => (items.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  
  })));

  
  return (
    (categoriesResult.length > 0) && (
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
          <Category result={getAllCategories(categoriesResult)}/>
        </ul>
      </main>
    </div>)
  )
}
