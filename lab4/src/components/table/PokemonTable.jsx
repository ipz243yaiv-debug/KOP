import { Link, useNavigate } from 'react-router';
import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Loader from '../common/Loader.jsx';
import './PokemonTable.css';

function PokemonTable({ pokemons, isLoading, error, failedCount, onRetry, generation }) {
  const navigate = useNavigate();

  return (
    <section className="card pokemon-widget">
      <div className="list-heading"><h2>Покемони покоління</h2></div>
      {isLoading && <Loader />}
      {failedCount > 0 && (
        <div role="status">
          <p>Не вдалося завантажити покемонів: {failedCount}. Показано доступні дані.</p>
          <button className="retry-button" type="button" onClick={onRetry}>Спробувати ще раз</button>
        </div>
      )}
      {error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : pokemons.length === 0 ? (
        !isLoading && <EmptyState>За вибраними фільтрами покемонів не знайдено.</EmptyState>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Покемон</th>
                <th>Покоління</th>
                <th>Тип</th>
                <th>HP</th>
                <th>Атака</th>
                <th>Захист</th>
                <th>Зріст</th>
                <th>Вага</th>
              </tr>
            </thead>
            <tbody>
              {pokemons.map((pokemon) => (
                <tr key={pokemon.id} className="pokemon-row" onClick={(event) => {
                  if (!event.target.closest('a')) navigate(`/pokemon/${pokemon.id}`);
                }}>
                  <td>
                    <span className="pokemon-id">
                      #{String(pokemon.id).padStart(3, '0')}
                    </span>
                    <Link className="pokemon-link" to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
                  </td>
                  <td>Gen {generation}</td>
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
