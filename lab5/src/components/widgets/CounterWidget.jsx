import useDashboardStore from '../../store/useDashboardStore.js';
import './CounterWidget.css';

function CounterWidget() {
  const generation = useDashboardStore((state) => state.filters.generation);
  const setFilter = useDashboardStore((state) => state.setFilter);

  function decreaseGeneration() {
    setFilter('generation', Math.max(1, generation - 1));
  }

  function increaseGeneration() {
    setFilter('generation', Math.min(9, generation + 1));
  }

  function resetGeneration() {
    setFilter('generation', 1);
  }

  return (
    <section className="card widget-card">
      <div>
        <p className="eyebrow">Покоління</p>
        <h2>Обране покоління</h2>
      </div>
      <div className="stepper">
        <button className="icon-button"
          type="button"
          onClick={decreaseGeneration}
          disabled={generation === 1}
          aria-label="Попереднє покоління"
        >
          −
        </button>
        <p className="generation-value">Gen {generation}</p>
        <button
          className="icon-button"
          type="button"
          onClick={increaseGeneration}
          disabled={generation === 9}
          aria-label="Наступне покоління"
        >
          +
        </button>
      </div>
      <button className="text-button" type="button" onClick={resetGeneration}>
        Скинути до Gen 1
      </button>
    </section>
  );
}

export default CounterWidget;
