import KpiCard from './KpiCard.jsx';

function KpiSection({ pokemons, selectedType, isLoading, error }) {
  const filteredPokemons = pokemons.filter(
    (pokemon) => selectedType === 'Усі' || pokemon.types.includes(selectedType),
  );
  const averageStats = filteredPokemons.length
    ? Math.round(filteredPokemons.reduce(
        (total, pokemon) => total + pokemon.hp + pokemon.attack + pokemon.defense,
        0,
      ) / (filteredPokemons.length * 3))
    : 0;
  const kpiData = [
    { title: 'Покемонів у вибірці', value: filteredPokemons.length, description: 'з урахуванням типу' },
    { title: 'Водяних покемонів', value: filteredPokemons.filter((pokemon) => pokemon.types.includes('water')).length, description: 'у поточній вибірці' },
    { title: 'Середнє базових характеристик', value: averageStats, description: 'середнє HP, атаки та захисту' },
  ];

  return (
    <section className="kpi-grid" aria-label="Статистика Покедексу">
      {kpiData.map((item) => (
        <KpiCard
          key={item.title}
          title={item.title}
          value={(isLoading && pokemons.length === 0) || error ? '—' : item.value}
          description={item.description}
        />
      ))}
    </section>
  );
}

export default KpiSection;
