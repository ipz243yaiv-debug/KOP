import { createContext, useContext } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const FilterContext = createContext(null);

const initialFilters = {
  generation: 1,
  search: '',
  type: '',
  sortBy: 'name-asc',
  limit: 'all',
};

export function FilterProvider({ children }) {
  const { control, setValue, reset } = useForm({ defaultValues: initialFilters });
  const filters = useWatch({ control });

  function changeGeneration(generation) {
    setValue('generation', generation);
  }

  function resetFilters() {
    reset(initialFilters);
  }

  return (
    <FilterContext.Provider value={{ control, filters, changeGeneration, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
