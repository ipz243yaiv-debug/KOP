export async function fetchPokemons(generation, signal, onPokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`, { signal });
  if (!response.ok) {
    throw new Error('Не вдалося завантажити покоління покемонів.');
  }

  const data = await response.json();
  const species = [...data.pokemon_species].sort((a, b) => {
    const firstId = Number(a.url.split('/').filter(Boolean).pop());
    const secondId = Number(b.url.split('/').filter(Boolean).pop());
    return firstId - secondId;
  });

  let nextIndex = 0;
  let failedCount = 0;

  async function loadNextPokemon() {
    while (nextIndex < species.length && !signal.aborted) {
      const pokemon = species[nextIndex];
      nextIndex += 1;
      const id = pokemon.url.split('/').filter(Boolean).pop();

      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { signal });
        if (!pokemonResponse.ok) {
          throw new Error('Не вдалося завантажити покемона.');
        }
        const details = await pokemonResponse.json();
        const loadedPokemon = {
          id: details.id,
          name: details.name,
          types: details.types.map(({ type }) => type.name),
          hp: details.stats.find(({ stat }) => stat.name === 'hp').base_stat,
          attack: details.stats.find(({ stat }) => stat.name === 'attack').base_stat,
          defense: details.stats.find(({ stat }) => stat.name === 'defense').base_stat,
          height: details.height,
          weight: details.weight,
        };
        if (!signal.aborted) {
          onPokemon(loadedPokemon);
        }
      } catch (error) {
        if (signal.aborted) return;
        failedCount += 1;
      }
    }
  }

  const workers = Array.from({ length: Math.min(10, species.length) }, () => loadNextPokemon());
  await Promise.allSettled(workers);

  if (!signal.aborted && species.length > 0 && failedCount === species.length) {
    throw new Error('Не вдалося завантажити покемонів цього покоління.');
  }
  return failedCount;
}
