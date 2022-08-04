import logo from '../../images/logo.svg'
import './Header.css';
import Guest from '../Guest/Guest'
import AuthUser from '../AuthUser/AuthUser'
import NavTab from '../NavTab/NavTab'

export default function Header() {
  let isMain;
  
  window.location.pathname === '/' 
  ? isMain = true 
  : isMain = false;

  return (
    <header className={`header ${!isMain && "header-dark"}`}>
      <a href="/"><img src={logo} alt="логотип" className="header__logo"/></a>

      {!isMain && <NavTab />}

      {isMain 
      ? <Guest />
      : <AuthUser />
      }
    </header>
  )
}