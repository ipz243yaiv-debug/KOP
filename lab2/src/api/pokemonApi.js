export async function fetchPokemons(generation, signal) {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`, { signal });
  if (!response.ok) {
    throw new Error('Не вдалося завантажити покоління покемонів.');
  }

  const data = await response.json();
  const species = [...data.pokemon_species].sort((a, b) => {
    const firstId = Number(a.url.split('/').filter(Boolean).pop());
    const secondId = Number(b.url.split('/').filter(Boolean).pop());
    return firstId - secondId;
  }).slice(0, 20);

  const pokemonDetails = await Promise.all(
    species.map(async (pokemon) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { signal });
      if (!pokemonResponse.ok) {
        throw new Error(`Не вдалося завантажити дані про ${pokemon.name}.`);
      }
      return pokemonResponse.json();
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
