import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useDebounce from './hooks/useDebounce.js';
import usePokemonData from './hooks/usePokemonData.js';
import DashboardLayout from './layout/DashboardLayout.jsx';

const initialFilters = {
  generation: 1,  search: '', type: '', sortBy: 'name-asc', limit: 'all',
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { control, setValue, reset } = useForm({ defaultValues: initialFilters });
  const filters = useWatch({ control });
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
      selectedGeneration={filters.generation}
      onChangeGeneration={(value) => setValue('generation', value)}
      control={control}
      onResetFilters={() => reset(initialFilters)}
      isDarkTheme={isDarkTheme}
      onToggleTheme={() => setIsDarkTheme((current) => !current)}
    />
  );
}

export default App;
