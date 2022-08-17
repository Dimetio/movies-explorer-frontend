import { useState } from "react";
import { Link } from 'react-router-dom';

import './Form.css';
import logo from '../../images/logo.svg';

export default function Form({
  onSubmit, 
  title, 
  children, 
  buttonText, 
  question, 
  linkText, 
  url
  }) {
  const [inputsData, setInputsData] = useState({});

  function onChangeInput(inputData) {
    setInputsData({...inputsData, ...inputData})
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputsData);
    
    console.log(inputsData);
  }

  return (
    <>
      <a href="/">
        <img src={logo} alt="логотип" className="form-img"/>
      </a>

      <h2 className="form-title">{title}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__inputs">
          {children({ onChangeInput, inputsData})}
        </div>

        <button className="form__boutton" type="submit">
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
