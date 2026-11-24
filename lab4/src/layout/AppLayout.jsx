import { Link, Outlet } from 'react-router';
import { useTheme } from '../context/ThemeContext.jsx';
import '../App.css';

function AppLayout() {
  const { isDarkTheme } = useTheme();

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
