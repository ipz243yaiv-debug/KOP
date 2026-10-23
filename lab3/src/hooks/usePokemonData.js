import {fetchPokemons} from '../api/pokemonApi.js';
import useFetch from './useFetch.js';

function usePokemonData(filters) {
    const {data, loading, error, retry} = useFetch(fetchPokemons, filters);
    const pokemons = data ?? [];

    const averageStats = pokemons.length
        ? Math.round(
            pokemons.reduce(
                (total, pokemon) =>
                    total + pokemon.hp + pokemon.attack + pokemon.defense,
                0,
            ) / (pokemons.length * 3),
        )
        : 0;

    const kpiData = [
        {
            title: 'Покемонів у вибірці',
            value: pokemons.length,
            description: 'відповідають вибраним фільтрам',
        },
        {
            title: 'Водяних покемонів',
            value: pokemons.filter((pokemon) => pokemon.types.includes('water')).length,
            description: 'у поточній вибірці',
        },
        {
            title: 'Середнє базових характеристик',
            value: averageStats,
            description: 'середнє HP, атаки та захисту',
        },
    ];

    return {pokemons, loading, error, kpiData, retry};
}

export default usePokemonData;
