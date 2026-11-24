import { create } from 'zustand';

const initialFilters = {
  generation: 1,
  search: '',
  type: '',
  sortBy: 'name-asc',
  limit: 'all',
  onlyFavorites: false,
};

const useDashboardStore = create((set) => ({
  filters: initialFilters,
  isDarkTheme: false,
  favorites: [],
  chartType: 'bar',
  pokemons: [],
  loadedGeneration: null,
  loading: true,
  error: '',
  failedCount: 0,
  reloadCount: 0,

  setFilter: (name, value) => set((state) => ({
    filters: { ...state.filters, [name]: value },
  })),
  resetFilters: () => set({ filters: { ...initialFilters } }),
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((favoriteId) => favoriteId !== id)
      : [...state.favorites, id],
  })),
  setChartType: (chartType) => set({ chartType }),
  startLoading: (generation) => set({
    pokemons: [], loadedGeneration: generation, loading: true, error: '', failedCount: 0,
  }),
  addPokemon: (pokemon) => set((state) => ({ pokemons: [...state.pokemons, pokemon] })),
  finishLoading: (failedCount) => set({ loading: false, failedCount }),
  failLoading: (error) => set({ loading: false, error }),
  retryLoading: () => set((state) => ({ reloadCount: state.reloadCount + 1 })),
}));

export default useDashboardStore;
