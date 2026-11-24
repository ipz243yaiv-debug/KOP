import useDashboardStore from '../../store/useDashboardStore.js';
import './PokemonFilters.css';

const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy',
];

function PokemonFilters() {
  const filters = useDashboardStore((state) => state.filters);
  const setFilter = useDashboardStore((state) => state.setFilter);
  const resetFilters = useDashboardStore((state) => state.resetFilters);
  const favoritesCount = useDashboardStore((state) => state.favorites.length);

  return (
    <form className="card filters-panel" onSubmit={(event) => event.preventDefault()}>
      <div className="filters-heading">
        <div><p className="eyebrow">Керування вибіркою</p><h2>Пошук і фільтри</h2></div>
        <button className="reset-button" type="button" onClick={resetFilters}>Скинути фільтри</button>
      </div>
      <div className="filters-fields">
        <label className="form-field search-field">
          <span>Пошук за назвою</span>
          <input type="search" value={filters.search} onChange={(event) => setFilter('search', event.target.value)} placeholder="Наприклад, pikachu" />
        </label>
        <label className="form-field">
          <span>Тип</span>
          <select value={filters.type} onChange={(event) => setFilter('type', event.target.value)}>
            <option value="">Усі типи</option>
            {pokemonTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Сортування</span>
          <select value={filters.sortBy} onChange={(event) => setFilter('sortBy', event.target.value)}>
            <option value="name-asc">За ім’ям: А–Я</option>
            <option value="name-desc">За ім’ям: Я–А</option>
            <option value="attack-desc">За атакою: спадання</option>
            <option value="attack-asc">За атакою: зростання</option>
          </select>
        </label>
        <label className="form-field">
          <span>Кількість результатів</span>
          <select value={filters.limit} onChange={(event) => setFilter('limit', event.target.value)}>
            <option value="all">Усі</option><option value="20">20</option><option value="50">50</option>
          </select>
        </label>
      </div>
      <label className="favorites-filter">
        <input type="checkbox" checked={filters.onlyFavorites} onChange={(event) => setFilter('onlyFavorites', event.target.checked)} />
        Лише обрані ({favoritesCount})
      </label>
    </form>
  );
}

export default PokemonFilters;
