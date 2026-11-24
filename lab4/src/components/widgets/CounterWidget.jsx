import { useFilters } from '../../context/FilterContext.jsx';
import './CounterWidget.css';

function CounterWidget() {
  const { filters, changeGeneration } = useFilters();
  const { generation } = filters;

  function decreaseGeneration() {
    changeGeneration(Math.max(1, generation - 1));
  }

  function increaseGeneration() {
    changeGeneration(Math.min(9, generation + 1));
  }

  function resetGeneration() {
    changeGeneration(1);
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
