export function filterPokemons(pokemons, filters) {
  const { search, type, sortBy, limit } = filters;
  const searchText = search.trim().toLowerCase();

  const filtered = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText) &&
    (!type || pokemon.types.includes(type)),
  );

  const [field, direction] = sortBy.split('-');
  filtered.sort((first, second) => {
    const comparison = typeof first[field] === 'string'
      ? first[field].localeCompare(second[field])
      : first[field] - second[field];
    return direction === 'desc' ? -comparison : comparison;
  });

  return limit === 'all' ? filtered : filtered.slice(0, Number(limit));
}
