import { useEffect, useState } from 'react';
import { fetchPokemons } from '../api/pokemonApi.js';

function usePokemonData() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      setIsLoading(true);
      setError('');
      try {
        const loadedPokemons = await fetchPokemons(controller.signal);
        setPokemons(loadedPokemons);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadPokemons();
    return () => controller.abort();
  }, [reloadCount]);

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
      title: 'Покемонів завантажено',
      value: pokemons.length,
      description: 'завантажено з PokéAPI',
    },
    {
      title: 'Водяних покемонів',
      value: pokemons.filter((pokemon) => pokemon.types.includes('water')).length,
      description: 'у завантаженому списку',
    },
    {
      title: 'Середнє базових характеристик',
      value: averageStats,
      description: 'середнє HP, атаки та захисту',
    },
  ];

  function retryLoading() {
    setReloadCount((currentCount) => currentCount + 1);
  }

  return { pokemons, isLoading, error, kpiData, retryLoading };
}

export default usePokemonData;
