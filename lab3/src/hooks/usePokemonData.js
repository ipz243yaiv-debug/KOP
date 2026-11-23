import { useEffect, useMemo, useState } from 'react';
import { fetchPokemons } from '../api/pokemonApi.js';

function usePokemonData(filters) {
  const [pokemons, setPokemons] = useState([]);
  const [loadedGeneration, setLoadedGeneration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [failedCount, setFailedCount] = useState(0);
  const [reloadCount, setReloadCount] = useState(0);
  const { generation, search, type, sortBy, limit } = filters;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      setPokemons([]);
      setLoadedGeneration(generation);
      setLoading(true);
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
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPokemons();
    return () => controller.abort();
  }, [generation, reloadCount]);

  const data = useMemo(() => {
    if (loadedGeneration !== generation) return [];
    const searchText = search.trim().toLowerCase();
    const filtered = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText) && (!type || pokemon.types.includes(type)), );
    const [field, direction] = sortBy.split('-');
    filtered.sort((first, second) => {
      const comparison = typeof first[field] === 'string'
        ? first[field].localeCompare(second[field])
        : first[field] - second[field];
      return direction === 'desc' ? -comparison : comparison;
    });
    return limit === 'all' ? filtered : filtered.slice(0, Number(limit));
  }, [pokemons, loadedGeneration, generation, search, type, sortBy, limit]);

  function retry() {
    setReloadCount((current) => current + 1);
  }

  return {
    data,
    loading: loading || loadedGeneration !== generation,
    error: loadedGeneration === generation ? error : '',
    failedCount: loadedGeneration === generation ? failedCount : 0,
    retry,
  };
}

export default usePokemonData;
