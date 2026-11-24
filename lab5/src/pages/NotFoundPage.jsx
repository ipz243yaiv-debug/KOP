import { Link } from 'react-router';
import ToggleWidget from '../components/widgets/ToggleWidget.jsx';
import './PokemonDetailsPage.css';

function NotFoundPage() {
  return (
    <>
      <section className="card details-card">
        <h2>Сторінку не знайдено</h2>
        <Link className="back-link" to="/">← На головну</Link>
      </section>
      <section className="details-theme" aria-label="Налаштування теми"><ToggleWidget /></section>
    </>
  );
}

export default NotFoundPage;
