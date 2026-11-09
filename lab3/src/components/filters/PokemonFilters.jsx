import {Controller} from 'react-hook-form';
import './PokemonFilters.css';

const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dragon', 'dark', 'steel', 'fairy',
];

function PokemonFilters({control, onReset}) {
    return (
        <form className="card filters-panel" onSubmit={(event) => event.preventDefault()}>
            <div className="filters-heading">
                <div>
                    <p className="eyebrow">Керування вибіркою</p>
                    <h2>Пошук і фільтри</h2>
                </div>
                <button className="reset-button" type="button" onClick={onReset}>
                    Скинути фільтри
                </button>
            </div>

            <div className="filters-fields">
                <label className="form-field search-field">
                    <span>Пошук за назвою</span>
                    <Controller name="search" control={control} render={({field}) => (
                        <input {...field} type="search" placeholder="Наприклад, pikachu" />
                    )} />
                </label>

                <label className="form-field">
                    <span>Тип</span>
                    <Controller name="type" control={control} render={({field}) => (
                        <select {...field}>
                            <option value="">Усі типи</option>
                            {pokemonTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    )} />
                </label>

                <label className="form-field">
                    <span>Сортування</span>
                    <Controller name="sortBy" control={control} render={({field}) => (
                        <select {...field}>
                            <option value="name-asc">За ім’ям: А–Я</option>
                            <option value="name-desc">За ім’ям: Я–А</option>
                            <option value="attack-desc">За атакою: спадання</option>
                            <option value="attack-asc">За атакою: зростання</option>
                        </select>
                    )} />
                </label>

                <label className="form-field">
                    <span>Кількість результатів</span>
                    <Controller name="limit" control={control} render={({field}) => (
                        <select {...field} onChange={(event) => field.onChange(Number(event.target.value))}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    )} />
                </label>
            </div>
        </form>
    );
}

export default PokemonFilters;
