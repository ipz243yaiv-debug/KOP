import './ToggleWidget.css';

function ToggleWidget({isDarkTheme, onToggleTheme}) {
    const themeName = isDarkTheme ? 'Темна' : 'Світла';
    return (
        <section className="card widget-card">
            <div>
                <p className="eyebrow">Налаштування</p>
                <h2>Тема інтерфейсу</h2>
            </div>
            <div className="theme-display">
                <span className="theme-name">{themeName}</span>
                <span className="theme-label">тема</span>
            </div>
            <button
                className={`toggle-button ${isDarkTheme ? 'active' : ''}`}
                type="button"
                role="switch"
                aria-checked={isDarkTheme}
                onClick={onToggleTheme}
            >
                <span className="toggle-knob" />
                <span>{isDarkTheme ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}</span>
            </button>
        </section>
    );
}

export default ToggleWidget;
