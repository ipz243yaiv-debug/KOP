import { useEffect, useState } from 'react';
import { fetchPokemons } from '../api/pokemonApi.js';

function usePokemonData(generation) {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [failedCount, setFailedCount] = useState(0);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      setPokemons([]);
      setIsLoading(true);
      setError('');
      setFailedCount(0);
      try {
        const failed = await fetchPokemons(generation, controller.signal, (pokemon) => {
          if (!controller.signal.aborted) {
            setPokemons((current) => [...current, pokemon]);
          }
        });
        if (!controller.signal.aborted) setFailedCount(failed);
      } catch (requestError) {
        if (!controller.signal.aborted) setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadPokemons();
    return () => controller.abort();
  }, [generation, reloadCount]);

  function retryLoading() {
    setReloadCount((currentCount) => currentCount + 1);
  }

  return { pokemons, isLoading, error, failedCount, retryLoading };
}

export default usePokemonData;
