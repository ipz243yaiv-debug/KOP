import { useState } from 'react';
import './CounterWidget.css';

function CounterWidget() {
  const [generation, setGeneration] = useState(1);

  function decreaseGeneration() {
    setGeneration((currentGeneration) => Math.max(1, currentGeneration - 1));
  }

  function increaseGeneration() {
    setGeneration((currentGeneration) => Math.min(9, currentGeneration + 1));
  }

  function resetGeneration() {
    setGeneration(1);
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
