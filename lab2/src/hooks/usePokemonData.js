import { useEffect, useState } from 'react';
import { fetchPokemons } from '../api/pokemonApi.js';

function usePokemonData(generation, selectedType) {
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
        const loadedPokemons = await fetchPokemons(generation, controller.signal);
        if (!controller.signal.aborted) {
          setPokemons(loadedPokemons);
        }
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
  }, [generation, reloadCount]);

  const filteredPokemons = pokemons.filter(
    (pokemon) => selectedType === 'Усі' || pokemon.types.includes(selectedType),
  );

  const averageStats = filteredPokemons.length
    ? Math.round(
        filteredPokemons.reduce(
          (total, pokemon) =>
            total + pokemon.hp + pokemon.attack + pokemon.defense,
          0,
        ) / (filteredPokemons.length * 3),
      )
    : 0;
  const kpiData = [
    {
      title: 'Покемонів у вибірці',
      value: filteredPokemons.length,
      description: 'з урахуванням типу',
    },
    {
      title: 'Водяних покемонів',
      value: filteredPokemons.filter((pokemon) => pokemon.types.includes('water')).length,
      description: 'у поточній вибірці',
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
