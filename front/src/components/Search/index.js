import './style.scss';

export default function Search() {
  return (
    <div className="search">
      <form action="">
        <input 
        type="text"
        placeholder="Je veux apprendre ..."
        className="search-input"
        />
        <button className="search-button" type="submit"> Je cherche une compétence</button>
      </form>
    </div>
  );
}
