import useDashboardStore from '../../store/useDashboardStore.js';
import './FavoriteButton.css';

function FavoriteButton({ id, name }) {
  const isFavorite = useDashboardStore((state) => state.favorites.includes(id));
  const toggleFavorite = useDashboardStore((state) => state.toggleFavorite);

  function handleClick(event) {
    event.stopPropagation();
    toggleFavorite(id);
  }

  return (
    <button
      className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
      type="button"
      aria-label={isFavorite ? `Прибрати ${name} з обраного` : `Додати ${name} в обране`}
      aria-pressed={isFavorite}
      title={isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
      onClick={handleClick}
    >
      <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
      <span>{isFavorite ? 'В обраному' : 'В обране'}</span>
    </button>
  );
}

export default FavoriteButton;
