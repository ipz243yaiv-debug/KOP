import { useState } from 'react';
import './PokemonListWidget.css';

function PokemonListWidget({ pokemons, types }) {
  const [selectedType, setSelectedType] = useState('Усі');
  const visiblePokemons = pokemons.filter(
    (pokemon) => selectedType === 'Усі' || pokemon.type === selectedType,
  );

  return (
    <section className="card pokemon-widget">
      <div className="list-heading">
        <div>
          <h2>Покемони</h2>
        </div>
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
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Покемон</th>
              <th>Тип</th>
              <th>HP</th>
              <th>Атака</th>
              <th>Захист</th>
            </tr>
          </thead>
          <tbody>
            {visiblePokemons.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>
                  <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
                  <strong>{pokemon.name}</strong>
                </td>
                <td>
                  <span className={`type-badge type-${pokemon.type.toLowerCase()}`}>
                    {pokemon.type}
                  </span>
                </td>
                <td>{pokemon.hp}</td>
                <td>{pokemon.attack}</td>
                <td>{pokemon.defense}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visiblePokemons.length === 0 && (
          <p className="empty-state">Для цього типу покемонів поки немає.</p>
        )}
      </div>
    </section>
  );
}

export default PokemonListWidget;
