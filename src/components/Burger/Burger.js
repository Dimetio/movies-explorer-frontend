import './Burger.css';
import close from '../../images/close.svg'
import burger from '../../images/burger.svg'
import NavTab from '../NavTab/NavTab';
import AuthUser from '../AuthUser/AuthUser';

export default function Burger({isOpen, handleIconClick}) {


  return (
    <section className="burger">
      <img 
        src={isOpen ? close : burger} 
        alt="кнопка" 
        className="burger__icon"
        onClick={handleIconClick}
      />

      <div className={`burger__nav ${isOpen && 'burger__nav_opened'}`}>
        <NavTab />
        <AuthUser />
      </div>
    </section>
  )
}
