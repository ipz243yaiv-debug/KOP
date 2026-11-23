import '../App.css';
import CounterWidget from '../components/widgets/CounterWidget.jsx';
import PokemonFilters from '../components/filters/PokemonFilters.jsx';
import KpiSection from '../components/kpi/KpiSection.jsx';
import PokemonTable from '../components/table/PokemonTable.jsx';
import ToggleWidget from '../components/widgets/ToggleWidget.jsx';

function DashboardLayout({
  pokemons, isLoading, error, failedCount, onRetry, generation,
  selectedGeneration, onChangeGeneration, control, onResetFilters,
  isDarkTheme, onToggleTheme,
}) {
  return (
    <div className={`app-shell ${isDarkTheme ? 'theme-dark' : ''}`}>
      <main className="dashboard">
        <header className="dashboard-header">
          <div className="brand-mark" aria-hidden="true">P</div>
          <div><h1>Покедекс</h1></div>
          <span className="data-label"><span /> Дані з PokéAPI</span>
        </header>

        <PokemonFilters control={control} onReset={onResetFilters} />
        <KpiSection pokemons={pokemons} isLoading={isLoading} error={error} />

        <section className="widget-grid" aria-label="Віджети">
          <CounterWidget generation={selectedGeneration} onChangeGeneration={onChangeGeneration} />
          <ToggleWidget isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
        </section>

        <PokemonTable
          pokemons={pokemons}
          isLoading={isLoading}
          error={error}
          failedCount={failedCount}
          onRetry={onRetry}
          generation={generation}
        />
      </main>
    </div>
  );
}

export default DashboardLayout;
