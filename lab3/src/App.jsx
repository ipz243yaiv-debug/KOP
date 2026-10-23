import {useState} from 'react';
import useDebounce from './hooks/useDebounce.js';
import usePokemonData from './hooks/usePokemonData.js';
import DashboardLayout from './layout/DashboardLayout.jsx';

const INITIAL_FILTERS = {
    search: '',
    type: '',
    sortBy: 'name-asc',
    limit: 20,
};

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const debouncedFilters = useDebounce(filters);
    const {pokemons, loading, error, kpiData, retry} = usePokemonData(debouncedFilters);

    function updateFilter(name, value) {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [name]: value,
        }));
    }

    return (
        <DashboardLayout
            kpiData={kpiData}
            pokemons={pokemons}
            isLoading={loading}
            error={error}
            onRetry={retry}
            filters={filters}
            onFilterChange={updateFilter}
            onResetFilters={() => setFilters(INITIAL_FILTERS)}
            isDarkTheme={isDarkTheme}
            onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
        />
    );
}

export default App;
