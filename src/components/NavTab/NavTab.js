import './NavTab.css';

export default function NavTab() {
  return (
    <div className="header__nav">
      <a href="/movies" className="header__link header__nav-link header__nav-link_active">Фильмы</a>
      <a href="/saved-movies" className="header__link header__nav-link">Сохранённые фильмы</a>
    </div>
  )
}
