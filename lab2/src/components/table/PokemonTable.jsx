import { useMemo, useState } from 'react';
import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Loader from '../common/Loader.jsx';
import './PokemonTable.css';

function PokemonTable({ pokemons, isLoading, error, onRetry }) {
  const [selectedType, setSelectedType] = useState('Усі');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const types = [
    'Усі',
    ...new Set(pokemons.flatMap((pokemon) => pokemon.types)),
  ];
  const visiblePokemons = useMemo(() => {
    const filteredPokemons = pokemons.filter(
      (pokemon) =>
        selectedType === 'Усі' || pokemon.types.includes(selectedType),
    );

    return [...filteredPokemons].sort((first, second) => {
      const firstValue = first[sortField];
      const secondValue = second[sortField];
      const comparison =
        typeof firstValue === 'string'
          ? firstValue.localeCompare(secondValue)
          : firstValue - secondValue;

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [pokemons, selectedType, sortDirection, sortField]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortField(field);
    setSortDirection('asc');
  }

  function sortLabel(field, title) {
    if (sortField !== field) {
      return title;
    }

    return `${title} ${sortDirection === 'asc' ? '↑' : '↓'}`;
  }

  return (
    <section className="card pokemon-widget">
      <div className="list-heading">
        <h2>Покемони</h2>
        <label className="filter-control">
          <span>Тип</span>
          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : pokemons.length === 0 ? (
        <EmptyState>API не повернуло жодного покемона.</EmptyState>
      ) : visiblePokemons.length === 0 ? (
        <EmptyState>Для цього типу покемонів поки немає.</EmptyState>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  <button
                    type="button"
                    className="sort-button"
                    onClick={() => handleSort('name')}
                  >
                    {sortLabel('name', 'Покемон')}
                  </button>
                </th>
                <th>Тип</th>
                <th>HP</th>
                <th>
                  <button
                    type="button"
                    className="sort-button"
                    onClick={() => handleSort('attack')}
                  >
                    {sortLabel('attack', 'Атака')}
                  </button>
                </th>
                <th>Захист</th>
                <th>Зріст</th>
                <th>Вага</th>
              </tr>
            </thead>
            <tbody>
              {visiblePokemons.map((pokemon) => (
                <tr key={pokemon.id}>
                  <td>
                    <span className="pokemon-id">
                      #{String(pokemon.id).padStart(3, '0')}
                    </span>
                    <strong>{pokemon.name}</strong>
                  </td>
                  <td>
                    {pokemon.types.map((type) => (
                      <span className="type-badge" key={type}>
                        {type}
                      </span>
                    ))}
                  </td>
                  <td>{pokemon.hp}</td>
                  <td>{pokemon.attack}</td>
                  <td>{pokemon.defense}</td>
                  <td>{(pokemon.height / 10).toFixed(1)} м</td>
                  <td>{(pokemon.weight / 10).toFixed(1)} кг</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default PokemonTable;
