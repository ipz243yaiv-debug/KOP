import {useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import useDebounce from './hooks/useDebounce.js';
import usePokemonData from './hooks/usePokemonData.js';
import DashboardLayout from './layout/DashboardLayout.jsx';

const INITIAL_FILTERS = {
    generation: 1,
    search: '',
    type: '',
    sortBy: 'name-asc',
    limit: 20,
};

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const {control, setValue, reset} = useForm({defaultValues: INITIAL_FILTERS});
    const filters = useWatch({control});
    const debouncedFilters = useDebounce(filters);
    const {pokemons, loading, error, kpiData, retry} = usePokemonData(debouncedFilters);

    return (
        <DashboardLayout
            kpiData={kpiData}
            pokemons={pokemons}
            isLoading={loading}
            error={error}
            onRetry={retry}
            generation={debouncedFilters.generation}
            filters={filters}
            control={control}
            onChangeGeneration={(value) => setValue('generation', value)}
            onResetFilters={() => reset(INITIAL_FILTERS)}
            isDarkTheme={isDarkTheme}
            onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
        />
    );
}

export default App;
