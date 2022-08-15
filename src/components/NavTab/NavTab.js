import './NavTab.css';
import { NavLink } from 'react-router-dom';

const setActive = ({ isActive }) => isActive ? "nav-link nav-link_active" : "nav-link"

export default function NavTab() {
  return (
    <div className="nav">
      <NavLink end to="/" className="nav-link nav-link-hide">Главная</NavLink>
      <NavLink to="/movies" className={setActive}>Фильмы</NavLink>
      <NavLink to="/saved-movies" className={setActive}>Сохранённые фильмы</NavLink>
    </div>
  )
}
