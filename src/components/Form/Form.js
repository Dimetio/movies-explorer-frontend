import './Form.css';
import logo from '../../images/logo.svg';

export default function Form({title, children, buttonText, question, linkText, url}) {

  return (
    <>
      <a href="/">
        <img src={logo} alt="логотип" className="form-img"/>
      </a>

      <h2 className="form-title">{title}</h2>

      <form className="form">
        <div className="form__inputs">
          {children}
        </div>

        <button className="form__boutton" type="submit">
          {buttonText}
        </button>
      </form>

        <p className="form__question">
          {question}
          <a href={url} className="form__link">{linkText}</a>
        </p>
    </>
  )
}
