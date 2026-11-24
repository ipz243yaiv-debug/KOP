import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../api/pokemonApi.js';

function usePokemonDetails(id) {
  const [result, setResult] = useState({ id: null, status: 'loading', pokemon: null, error: '' });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemon() {
      if (!/^[1-9][0-9]*$/.test(id)) {
        setResult({ id, status: 'not-found', pokemon: null, error: '' });
        return;
      }

      setResult({ id, status: 'loading', pokemon: null, error: '' });
      try {
        const pokemon = await fetchPokemonDetails(id, controller.signal);
        if (!controller.signal.aborted) {
          setResult({ id, status: pokemon ? 'success' : 'not-found', pokemon, error: '' });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({ id, status: 'error', pokemon: null, error: error.message || 'Не вдалося завантажити дані покемона.' });
        }
      }
    }

    loadPokemon();
    return () => controller.abort();
  }, [id, retryCount]);

  function retry() {
    setRetryCount((current) => current + 1);
  }

  if (result.id !== id) {
    return { status: 'loading', pokemon: null, error: '', retry };
  }
  return { ...result, retry };
}

export default usePokemonDetails;
