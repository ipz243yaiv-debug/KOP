import {useState} from 'react';
import DashboardLayout from './layout/DashboardLayout.jsx';
import {kpiData, pokemonData, pokemonTypes} from './data/mockPokemonData.js';

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
        <DashboardLayout
            kpiData={kpiData}
            pokemons={pokemonData}
            pokemonTypes={pokemonTypes}
            isDarkTheme={isDarkTheme}
            onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
        />
    );
}

export default App;
