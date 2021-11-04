//Npm import
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

//Local import
import Search from 'src/components/Search';
import Category from './Category';
//import categoriesData from 'src/data/category';

//Style
import './style.scss';

export default function Categories() {
  
  //Here we use 'useSelector' to get the initial state from the reducer
  const categoriesResult = useSelector(state => state.categories.items);


  //Here the function we use to select the infos we need from the initial state
  //And send it to our Prop
  const getAllCategories = (items) => (items.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  
  })));

  //(categoriesResult.length > 0) && (
  //)
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
        //Here we send the Prop 'result' to our page 'category'
        //And executing our function on the datas we got from the state
          <Category result={getAllCategories(categoriesResult)}/>
        </ul>
      </main>
    </div>)
}
