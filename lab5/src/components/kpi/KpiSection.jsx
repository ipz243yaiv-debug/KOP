import KpiCard from './KpiCard.jsx';

function KpiSection({ pokemons, isLoading, error }) {
  const averageStats = pokemons.length
    ? Math.round(pokemons.reduce(
        (total, pokemon) => total + pokemon.hp + pokemon.attack + pokemon.defense,
        0,
      ) / (pokemons.length * 3))
    : 0;
  const kpiData = [
    { title: 'Покемонів у вибірці', value: pokemons.length, description: 'за вибраними фільтрами' },
    { title: 'Водяних покемонів', value: pokemons.filter((pokemon) => pokemon.types.includes('water')).length, description: 'у поточній вибірці' },
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
