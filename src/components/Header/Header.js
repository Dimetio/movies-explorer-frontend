import logo from '../../images/logo.svg'
import './Header.css';
import {useState, useEffect} from 'react';

export default function Header() {
  return (
    <header className="header">
      <a href="/"><img src={logo} alt="логотип" className="header__logo"/></a>
      <div className="header__links">
        <a href="/signup" className="header__link header__link-signup">Регистрация</a>
        <a href="/signin" className="header__link header__link-signin">Войти</a>
      </div>
    </header>
  )
}