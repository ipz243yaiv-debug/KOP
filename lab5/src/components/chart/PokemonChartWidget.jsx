import { useMemo } from 'react';
import useDashboardStore from '../../store/useDashboardStore.js';
import PokemonChart from './PokemonChart.jsx';
import './PokemonChart.css';

function PokemonChartWidget({ pokemons, isLoading, error }) {
  const chartType = useDashboardStore((state) => state.chartType);
  const setChartType = useDashboardStore((state) => state.setChartType);

  const chartData = useMemo(() => {
    const counts = {};
    pokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        counts[type] = (counts[type] || 0) + 1;
      });
    });
    return Object.keys(counts).sort().map((type) => ({ type, count: counts[type] }));
  }, [pokemons]);

  return (
    <section className="card chart-widget" aria-label="Розподіл покемонів за типами">
      <div className="chart-heading">
        <div><h2>Покемони за типами</h2><p>Дані відповідають поточній таблиці.</p></div>
        <label className="form-field">
          <span>Тип графіка</span>
          <select value={chartType} onChange={(event) => setChartType(event.target.value)}>
            <option value="bar">Стовпчиковий</option>
            <option value="pie">Круговий</option>
          </select>
        </label>
      </div>
      {isLoading && <p>Дані оновлюються під час завантаження.</p>}
      {error ? <p>Графік недоступний через помилку завантаження.</p> : <PokemonChart data={chartData} type={chartType} />}
      <p className="chart-note">Покемон із двома типами враховується в кожному з них.</p>
    </section>
  );
}

export default PokemonChartWidget;
