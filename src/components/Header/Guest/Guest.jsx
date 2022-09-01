import {Link} from 'react-router-dom';

export default function Guest() {
  return (
    <div className="header__links">
      <Link to="/signup" className="header__link header__link-signup">Регистрация</Link>
      <Link to="/signin" className="header__link header__link-signin">Войти</Link>
    </div>
  )
}
