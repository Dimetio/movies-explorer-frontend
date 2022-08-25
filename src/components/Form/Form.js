import { useState } from "react";
import { Link } from 'react-router-dom';
import './Form.css';
import logo from '../../images/logo.svg';

export default function Form({
  handleSubmit, 
  title, 
  children, 
  buttonText, 
  question, 
  linkText, 
  url,
  isValid
  }) {

  return (
    <>
      <a href="/">
        <img src={logo} alt="логотип" className="form-img"/>
      </a>

      <h2 className="form-title">{title}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__inputs">
          {children}
        </div>

        <button 
          className={`form__button ${!isValid && 'form__button_inactive'}`} 
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>

        <p className="form__question">
          {question}
          <Link to={url} className="form__link">{linkText}</Link>
        </p>
    </>
  )
}
