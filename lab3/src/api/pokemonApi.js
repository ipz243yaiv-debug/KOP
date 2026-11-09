const API_URL = 'https://pokeapi.co/api/v2';
const generationCache = {};

async function fetchJson(url, signal, errorMessage) {
    const response = await fetch(url, {signal});
    if (!response.ok) {
        throw new Error(errorMessage);
    }
    return response.json();
}

async function loadGeneration(generation, signal) {
    if (generationCache[generation]) {
        return generationCache[generation];
    }

    const data = await fetchJson(
        `${API_URL}/generation/${generation}/`,
        signal,
        'Не вдалося завантажити покоління покемонів.',
    );
    const pokemons = [];

    for (let i = 0; i < data.pokemon_species.length; i += 20) {
        const group = data.pokemon_species.slice(i, i + 20);
        const details = await Promise.all(group.map((pokemon) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return fetchJson(
                `${API_URL}/pokemon/${id}/`,
                signal,
                `Не вдалося завантажити дані про ${pokemon.name}.`,
            );
        }));
        pokemons.push(...details.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map(({type}) => type.name),
            hp: pokemon.stats.find(({stat}) => stat.name === 'hp').base_stat,
            attack: pokemon.stats.find(({stat}) => stat.name === 'attack').base_stat,
            defense: pokemon.stats.find(({stat}) => stat.name === 'defense').base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
        })));
    }
    if (!signal.aborted) {
        generationCache[generation] = pokemons;
    }
    return pokemons;
}

export async function fetchPokemons(filters, signal) {
    const {generation, search, type, sortBy, limit} = filters;
    const pokemons = await loadGeneration(generation, signal);
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = pokemons.filter((pokemon) =>
        pokemon.name.includes(normalizedSearch) &&
        (!type || pokemon.types.includes(type)),
    );
    const [sortField, sortDirection] = sortBy.split('-');

    filtered.sort((first, second) => {
        const firstValue = first[sortField];
        const secondValue = second[sortField];
        const comparison = typeof firstValue === 'string'
            ? firstValue.localeCompare(secondValue)
            : firstValue - secondValue;
        return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered.slice(0, limit);
}
