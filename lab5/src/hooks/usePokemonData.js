import { useEffect, useMemo } from 'react';
import { fetchPokemons } from '../api/pokemonApi.js';
import { filterPokemons } from '../utils/filterPokemons.js';
import useDashboardStore from '../store/useDashboardStore.js';

function usePokemonData(filters) {
  const pokemons = useDashboardStore((state) => state.pokemons);
  const favorites = useDashboardStore((state) => state.favorites);
  const loadedGeneration = useDashboardStore((state) => state.loadedGeneration);
  const loading = useDashboardStore((state) => state.loading);
  const error = useDashboardStore((state) => state.error);
  const failedCount = useDashboardStore((state) => state.failedCount);
  const reloadCount = useDashboardStore((state) => state.reloadCount);
  const startLoading = useDashboardStore((state) => state.startLoading);
  const addPokemon = useDashboardStore((state) => state.addPokemon);
  const finishLoading = useDashboardStore((state) => state.finishLoading);
  const failLoading = useDashboardStore((state) => state.failLoading);
  const retry = useDashboardStore((state) => state.retryLoading);
  const { generation, search, type, sortBy, limit, onlyFavorites } = filters;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      startLoading(generation);
      try {
        const failed = await fetchPokemons(generation, controller.signal, (pokemon) => {
          if (!controller.signal.aborted) addPokemon(pokemon);
        });
        if (!controller.signal.aborted) finishLoading(failed);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          failLoading(requestError.message || 'Не вдалося завантажити покемонів.');
        }
      }
    }

    loadPokemons();
    return () => controller.abort();
  }, [generation, reloadCount, startLoading, addPokemon, finishLoading, failLoading]);

  const data = useMemo(() => {
    if (loadedGeneration !== generation) return [];
    return filterPokemons(pokemons, { search, type, sortBy, limit, onlyFavorites }, favorites);
  }, [pokemons, loadedGeneration, generation, search, type, sortBy, limit, onlyFavorites, favorites]);

  return {
    data,
    loading: loading || loadedGeneration !== generation,
    error: loadedGeneration === generation ? error : '',
    failedCount: loadedGeneration === generation ? failedCount : 0,
    retry,
  };
}

export default usePokemonData;
