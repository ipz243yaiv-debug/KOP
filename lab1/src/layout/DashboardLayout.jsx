import '../App.css';
import CounterWidget from '../components/CounterWidget.jsx';
import KpiCard from '../components/KpiCard.jsx';
import PokemonListWidget from '../components/PokemonListWidget.jsx';
import ToggleWidget from '../components/ToggleWidget.jsx';

function DashboardLayout({
  kpiData,
  pokemons,
  pokemonTypes,
  isDarkTheme,
  onToggleTheme,
}) {
  return (
    <div className={`app-shell ${isDarkTheme ? 'theme-dark' : ''}`}>
      <main className="dashboard">
        <header className="dashboard-header">
          <div className="brand-mark" aria-hidden="true">P</div>
          <div>
            <h1>Покедекс</h1>
          </div>
          <span className="data-label"><span /> Локальні дані</span>
        </header>

        <section className="kpi-grid" aria-label="Статистика Покедексу">
          {kpiData.map((item) => (
            <KpiCard
              key={item.title}
              title={item.title}
              value={item.value}
              change={item.change}
              isPositive={item.isPositive}
            />
          ))}
        </section>

        <section className="widget-grid" aria-label="Віджети">
          <CounterWidget />
          <ToggleWidget
            isDarkTheme={isDarkTheme}
            onToggleTheme={onToggleTheme}
          />
        </section>

        <PokemonListWidget pokemons={pokemons} types={pokemonTypes} />
      </main>
    </div>
  );
}

export default DashboardLayout;
