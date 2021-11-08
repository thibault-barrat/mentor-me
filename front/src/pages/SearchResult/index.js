import { useSelector } from 'react-redux';
import './style.scss';

const SearchResult = () => {
  // we need to get the search result array from the state
  // it contains only the id, so we also need the services list
  const searchResult = useSelector((state) => state.services.searchResult);
  const services = useSelector((state) => state.services.items);

  // we filter services with the id from the search result
  const filteredServices = searchResult.map(
    (result) => services.find((service) => service.id === result.id),
  );

  return (
    <main className="search-result">
      <h1 className="search-result__title">Résultats de la recherche</h1>
      {searchResult.length > 0 ? (
        <ul>
          {filteredServices.map((service) => (
            <li key={service.id}>
              <a href={`/services/${service.id}`}>{service.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="search-result__no-result">Aucun résultat</p>
      )}
    </main>
  );
};

export default SearchResult;
