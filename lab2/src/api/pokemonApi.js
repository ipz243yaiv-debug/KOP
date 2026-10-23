const POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export async function fetchPokemons(signal) {
  const listResponse = await fetch(POKEMON_LIST_URL, { signal });
  if (!listResponse.ok) {
    throw new Error('Не вдалося завантажити список покемонів.');
  }

  const listData = await listResponse.json();
  const pokemonDetails = await Promise.all(
    listData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url, { signal });
      if (!response.ok) {
        throw new Error(`Не вдалося завантажити дані про ${pokemon.name}.`);
      }
      return response.json();
    }),
  );

  return pokemonDetails.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map(({ type }) => type.name),
    hp: pokemon.stats.find(({ stat }) => stat.name === 'hp').base_stat,
    attack: pokemon.stats.find(({ stat }) => stat.name === 'attack').base_stat,
    defense: pokemon.stats.find(({ stat }) => stat.name === 'defense').base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
  }));
}
