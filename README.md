# Покедекс — тренерський центр

Вебзастосунок для перегляду даних про покемонів. Інформація завантажується з [PokéAPI](https://pokeapi.co/).

## Можливості

- Перегляд списку покемонів та їхніх характеристик: тип, HP, атака, захист, зріст і вага.
- Фільтрація покемонів за типом.
- Сортування за ім’ям і атакою.
- Картки зі статистикою завантажених покемонів.
- Віджет-лічильник і перемикач теми.
- Повідомлення про помилку та кнопка повторного завантаження, якщо запит до API не вдався.

## Технології

- React
- Vite
- JavaScript
- PokéAPI

## Запуск проєкту

Потрібно встановити [Node.js](https://nodejs.org/).



У терміналі відкрий папку проєкту та виконай:

```bash
npm install
npm run dev


## Структура проєкту

```text
lab2/
├── index.html
├── package.json
├── package-lock.json
├── src/
│   ├── api/
│   │   └── pokemonApi.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── Loader.jsx
│   │   ├── kpi/
│   │   │   ├── KpiCard.jsx
│   │   │   └── KpiCard.css
│   │   ├── table/
│   │   │   ├── PokemonTable.jsx
│   │   │   └── PokemonTable.css
│   │   └── widgets/
│   │       ├── CounterWidget.jsx
│   │       ├── CounterWidget.css
│   │       ├── ToggleWidget.jsx
│   │       └── ToggleWidget.css
│   ├── hooks/
│   │   └── usePokemonData.js
│   ├── layout/
│   │   └── DashboardLayout.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
└── .gitignore
