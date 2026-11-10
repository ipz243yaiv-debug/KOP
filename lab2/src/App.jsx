import { useState } from 'react';
import usePokemonData from './hooks/usePokemonData.js';
import DashboardLayout from './layout/DashboardLayout.jsx';

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [generation, setGeneration] = useState(1);
    const [selectedType, setSelectedType] = useState('Усі');
    const { pokemons, isLoading, error, failedCount, retryLoading } = usePokemonData(generation);

    function changeGeneration(value) {
        setGeneration(value);
    }

    return (
        <DashboardLayout
            pokemons={pokemons}
            isLoading={isLoading}
            error={error}
            failedCount={failedCount}
            onRetry={retryLoading}
            generation={generation}
            onChangeGeneration={changeGeneration}
            selectedType={selectedType}
            onChangeType={setSelectedType}
            isDarkTheme={isDarkTheme}
            onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
        />
    );
}

export default App;
