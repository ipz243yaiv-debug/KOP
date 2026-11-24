import { Link, useParams } from 'react-router';
import usePokemonDetails from '../hooks/usePokemonDetails.js';
import Loader from '../components/common/Loader.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import './PokemonDetailsPage.css';

function PokemonDetailsPage() {
  const { id } = useParams();
  const { status, pokemon, error, retry } = usePokemonDetails(id);

  return (
    <>
      <Link className="back-link" to="/">← Назад до покемонів</Link>
      <section className="card details-card">
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage message={error} onRetry={retry} />}
        {status === 'not-found' && <p role="status">Покемона не знайдено.</p>}
        {status === 'success' && (
          <>
            <div className="details-heading">
              {pokemon.sprites.front_default && (
                <img src={pokemon.sprites.front_default} alt={`Зображення ${pokemon.name}`} />
              )}
              <div>
                <p className="eyebrow">Покемон #{pokemon.id}</p>
                <h2 className="details-name">{pokemon.name}</h2>
                <p>Тип: {pokemon.types.map(({ type }) => type.name).join(', ')}</p>
              </div>
            </div>
            <dl className="details-list">
              <div><dt>Зріст</dt><dd>{(pokemon.height / 10).toFixed(1)} м</dd></div>
              <div><dt>Вага</dt><dd>{(pokemon.weight / 10).toFixed(1)} кг</dd></div>
              <div><dt>Базовий досвід</dt><dd>{pokemon.base_experience ?? 'Немає даних'}</dd></div>
              <div><dt>Здібності</dt><dd>{pokemon.abilities.map(({ ability }) => ability.name).join(', ') || 'Немає даних'}</dd></div>
            </dl>
            <h3>Базові характеристики</h3>
            <ul className="details-stats">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <li key={stat.name}><span>{stat.name}</span><strong>{base_stat}</strong></li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}

export default PokemonDetailsPage;
