import { useSelector } from 'react-redux';
import Loading from 'src/components/Loading';
import './style.scss';

const SearchResult = () => {
  // we need to get the search result array from the state
  // it contains only the id, so we also need the services list
  const searchResult = useSelector((state) => state.services.searchResult);
  const services = useSelector((state) => state.services.items);

  // we need to have the loading state to display a spinner during loading
  const searchLoading = useSelector((state) => state.services.searchLoading);

  // we filter services with the id from the search result
  const filteredServices = searchResult.map(
    (result) => services.find((service) => service.id === result.id),
  );

  return (
    <main className="search-result">
      <h1 className="search-result__title">Résultats de la recherche</h1>
      {/* If searchLoading is true, we display the loader */}
      {searchLoading && <Loading />}
      {!searchLoading && searchResult.length > 0 && (
        <ul>
          {filteredServices.map((service) => (
            <li key={service.id}>
              <a href={`/services/${service.id}`}>{service.title}</a>
            </li>
          ))}
        </ul>
      )}
      {!searchLoading && searchResult.length === 0 && (
        <p className="search-result__no-result">
          Aucun résultat pour votre recherche
        </p>
      )}
    </main>
  );
};

export default SearchResult;
