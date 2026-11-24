import CounterWidget from '../components/widgets/CounterWidget.jsx';
import PokemonFilters from '../components/filters/PokemonFilters.jsx';
import KpiSection from '../components/kpi/KpiSection.jsx';
import PokemonTable from '../components/table/PokemonTable.jsx';
import ToggleWidget from '../components/widgets/ToggleWidget.jsx';

function DashboardLayout({ pokemons, isLoading, error, failedCount, onRetry, generation }) {
  return (
    <>
      <PokemonFilters />
      <KpiSection pokemons={pokemons} isLoading={isLoading} error={error} />

      <section className="widget-grid" aria-label="Віджети">
        <CounterWidget />
        <ToggleWidget />
      </section>

      <PokemonTable
        pokemons={pokemons}
        isLoading={isLoading}
        error={error}
        failedCount={failedCount}
        onRetry={onRetry}
        generation={generation}
      />
    </>
  );
}

export default DashboardLayout;
