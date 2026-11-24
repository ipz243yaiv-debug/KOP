import { Link, Outlet } from 'react-router';
import useDashboardStore from '../store/useDashboardStore.js';
import '../App.css';

function AppLayout() {
  const isDarkTheme = useDashboardStore((state) => state.isDarkTheme);

  return (
    <div className={`app-shell ${isDarkTheme ? 'theme-dark' : ''}`}>
      <main className="dashboard">
        <header className="dashboard-header">
          <div className="brand-mark" aria-hidden="true">P</div>
          <div><h1><Link className="brand-link" to="/">Покедекс</Link></h1></div>
          <span className="data-label"><span /> Дані з PokéAPI</span>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
