const API_URL = 'https://pokeapi.co/api/v2';

async function fetchJson(url, signal, errorMessage) {
    const response = await fetch(url, {signal});
    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function fetchPokemons(filters, signal) {
    const {search, type, sortBy, limit} = filters;
    const listUrl = type
        ? `${API_URL}/type/${type}`
        : `${API_URL}/pokemon?limit=151`;
    const listData = await fetchJson(
        listUrl,
        signal,
        'Не вдалося завантажити список покемонів.',
    );
    const candidates = type
        ? listData.pokemon.map(({pokemon}) => pokemon)
        : listData.results;
    const normalizedSearch = search.trim().toLowerCase();
    const matchingPokemons = candidates
        .filter((pokemon) => pokemon.name.includes(normalizedSearch))
        .slice(0, limit);

    const pokemonDetails = await Promise.all(
        matchingPokemons.map((pokemon) =>
            fetchJson(
                pokemon.url,
                signal,
                `Не вдалося завантажити дані про ${pokemon.name}.`,
            ),
        ),
    );

    const [sortField, sortDirection] = sortBy.split('-');
    const pokemons = pokemonDetails.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map(({type: pokemonType}) => pokemonType.name),
        hp: pokemon.stats.find(({stat}) => stat.name === 'hp').base_stat,
        attack: pokemon.stats.find(({stat}) => stat.name === 'attack').base_stat,
        defense: pokemon.stats.find(({stat}) => stat.name === 'defense').base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
    }));

    return pokemons.sort((first, second) => {
        const firstValue = first[sortField];
        const secondValue = second[sortField];
        const comparison =
            typeof firstValue === 'string'
                ? firstValue.localeCompare(secondValue)
                : firstValue - secondValue;

        return sortDirection === 'desc' ? -comparison : comparison;
    });
}
