import '../App.css';
import CounterWidget from '../components/widgets/CounterWidget.jsx';
import PokemonFilters from '../components/filters/PokemonFilters.jsx';
import KpiCard from '../components/kpi/KpiCard.jsx';
import PokemonTable from '../components/table/PokemonTable.jsx';
import ToggleWidget from '../components/widgets/ToggleWidget.jsx';

function DashboardLayout({
                             kpiData,
                             pokemons,
                             isLoading,
                             error,
                             onRetry,
                             filters,
                             onFilterChange,
                             onResetFilters,
                             isDarkTheme,
                             onToggleTheme,
                         }) {
    return (
        <div className={`app-shell ${isDarkTheme ? 'theme-dark' : ''}`}>
            <main className="dashboard">
                <header className="dashboard-header">
                    <div className="brand-mark" aria-hidden="true">P</div>
                    <div>
                        <h1>Покедекс</h1>
                    </div>
                    <span className="data-label"><span/> Дані з PokéAPI</span>
                </header>

                <PokemonFilters
                    filters={filters}
                    onChange={onFilterChange}
                    onReset={onResetFilters}
                />

                <section className="kpi-grid" aria-label="Статистика Покедексу">
                    {kpiData.map((item) => (
                        <KpiCard
                            key={item.title}
                            title={item.title}
                            value={item.value}
                            description={item.description}
                        />
                    ))}
                </section>

                <section className="widget-grid" aria-label="Віджети">
                    <CounterWidget/>
                    <ToggleWidget
                        isDarkTheme={isDarkTheme}
                        onToggleTheme={onToggleTheme}
                    />
                </section>

                <PokemonTable
                    pokemons={pokemons}
                    isLoading={isLoading}
                    error={error}
                    onRetry={onRetry}
                />
            </main>
        </div>
    );
}

export default DashboardLayout;
