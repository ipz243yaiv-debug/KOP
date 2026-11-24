import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';
import AppLayout from './layout/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PokemonDetailsPage from './pages/PokemonDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FilterProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </FilterProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
