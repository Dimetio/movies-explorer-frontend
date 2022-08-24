import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import icon from '../../images/search.svg';

export default function SearchForm({
  handleShort,
  isShort,
  handleSearch,
}) {
  const [value, setValue] = useState('');
  const location = useLocation();

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(value);
  }

  // useEffect(()=> {
  //   setValue('')
  // }, [location])

  return (
    <form 
      className="search-form container"
      onSubmit={handleSubmit}
    >
        <div className="search-from__wrap">
          <button type="submit" className="search-form__button search-form__button_primary">
            <img src={icon} className="search-form__icon" alt="иконка"/>
          </button>

          <input
            name="search"
            type="text" 
            className="search-form__input" 
            placeholder="Фильм" 
            required
            value={value}
            onChange={handleChange}
          />

          <button type="submit" className="search-form__button search-form__button_secondary">
            <img src={icon} className="search-form__icon" alt="иконка"/>
          </button>
        </div>

        <div className="switch-wrap">
          <label className="switch">
            <input 
              type="checkbox" 
              className="switch__input" 
              value={isShort ? 1 : 0} 
              onClick={handleShort}
            />
            <span className="switch__slider round"></span>
          </label>
          <p className="switch-text">Короткометражки</p>
        </div>
    </form>
  )
}
