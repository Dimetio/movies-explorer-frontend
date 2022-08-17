import './SearchForm.css';
import icon from '../../images/search.svg';

export default function SearchForm() {
  return (
    <form className="search-form container">
        <div className="search-from__wrap">
          <button type="submit" className="search-form__button search-form__button_primary">
            <img src={icon} className="search-form__icon" alt="иконка"/>
          </button>

          <input type="text" className="search-form__input" placeholder="Фильм" required/>

          <button type="submit" className="search-form__button search-form__button_secondary">
            <img src={icon} className="search-form__icon" alt="иконка"/>
          </button>
        </div>

        <div className="switch-wrap">
          <label className="switch">
            <input type="checkbox" className="switch__input"/>
            <span className="switch__slider round"></span>
          </label>
          <p className="switch-text">Короткометражки</p>
        </div>
    </form>
  )
}
