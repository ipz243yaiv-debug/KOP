import useDebounce from '../hooks/useDebounce.js';
import usePokemonData from '../hooks/usePokemonData.js';
import { useFilters } from '../context/FilterContext.jsx';
import DashboardLayout from '../layout/DashboardLayout.jsx';

function DashboardPage() {
  const { filters } = useFilters();
  const debouncedFilters = useDebounce(filters, 400);
  const { data, loading, error, failedCount, retry } = usePokemonData(debouncedFilters);

  return (
    <DashboardLayout
      pokemons={data}
      isLoading={loading}
      error={error}
      failedCount={failedCount}
      onRetry={retry}
      generation={debouncedFilters.generation}
    />
  );
}

export default DashboardPage;
