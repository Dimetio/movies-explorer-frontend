import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';
import Guest from '../Guest/Guest';
import AuthUser from '../AuthUser/AuthUser';
import NavTab from '../NavTab/NavTab';
import Burger from '../Burger/Burger';

export default function Header({isOpen, handleIconClick, headerDisable}) {
  let isMain;
  
  window.location.pathname === '/' 
  ? isMain = true 
  : isMain = false;

  return (
    <div className={`header-bg ${!isMain && "header-bg-dark"} ${headerDisable && "header-disable"}`}>
        <header className="header container">
        <Link to="/"><img src={logo} alt="логотип" className="header__logo"/></Link>

        <div className={`header__nav ${!isMain && "burger-nav"}`}>
          {!isMain && <NavTab />}

          {isMain 
          ? <Guest />
          : <AuthUser />
          }
        </div>

        {!isMain 
        ?
          <Burger 
          isOpen={isOpen}
          handleIconClick={handleIconClick}
        /> 
        : null
        }        
      </header>
    </div>
  )
}