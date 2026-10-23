import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Loader from '../common/Loader.jsx';
import './PokemonTable.css';

function PokemonTable({pokemons, isLoading, error, onRetry}) {
    return (
        <section className="card pokemon-widget">
            <div className="list-heading">
                <h2>Покемони</h2>
            </div>

            {isLoading ? (
                <Loader/>
            ) : error ? (
                <ErrorMessage message={error} onRetry={onRetry}/>
            ) : pokemons.length === 0 ? (
                <EmptyState>За вибраними фільтрами покемонів не знайдено.</EmptyState>
            ) : (
                <div className="table-scroll">
                    <table>
                        <thead>
                        <tr>
                            <th>Покемон</th>
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
