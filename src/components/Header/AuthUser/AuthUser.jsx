import iconProfile from '../../../images/profile_icon.svg';
import {Link} from 'react-router-dom';

export default function AuthUser() {
  return (
    <div className="header__links burger__links">
      <Link to="/profile" className="header__link header__link-account">Аккаунт</Link>
      <Link to="/profile" className="header__link header__link-icon"><img src={iconProfile} alt="иконка профиля"/></Link>
    </div>
  )
}
