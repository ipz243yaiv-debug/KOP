import useDebounce from '../hooks/useDebounce.js';
import usePokemonData from '../hooks/usePokemonData.js';
import useDashboardStore from '../store/useDashboardStore.js';
import PokemonChartWidget from '../components/chart/PokemonChartWidget.jsx';
import CounterWidget from '../components/widgets/CounterWidget.jsx';
import PokemonFilters from '../components/filters/PokemonFilters.jsx';
import KpiSection from '../components/kpi/KpiSection.jsx';
import PokemonTable from '../components/table/PokemonTable.jsx';
import ToggleWidget from '../components/widgets/ToggleWidget.jsx';

function DashboardLayout() {
  const filters = useDashboardStore((state) => state.filters);
  const debouncedFilters = useDebounce(filters, 400);
  const { data: pokemons, loading: isLoading, error, failedCount, retry: onRetry } = usePokemonData(debouncedFilters);
  const generation = debouncedFilters.generation;
  return (
    <>
      <PokemonFilters />
      <KpiSection pokemons={pokemons} isLoading={isLoading} error={error} />

      <section className="widget-grid" aria-label="Віджети">
        <CounterWidget />
        <ToggleWidget />
      </section>

      <PokemonChartWidget pokemons={pokemons} isLoading={isLoading} error={error} />

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
