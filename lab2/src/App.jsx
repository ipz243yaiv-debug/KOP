import { useState } from 'react';
import usePokemonData from './hooks/usePokemonData.js';
import DashboardLayout from './layout/DashboardLayout.jsx';

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const {pokemons, isLoading, error, kpiData, retryLoading } = usePokemonData();

    return (
        <DashboardLayout
            kpiData={kpiData}
            pokemons={pokemons}
            isLoading={isLoading}
            error={error}
            onRetry={retryLoading}
            isDarkTheme={isDarkTheme}
            onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
        />
    );
}

export default App;
