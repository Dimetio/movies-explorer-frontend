import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import icon from '../../images/search.svg';

export default function SearchForm({
  handleShort,
  isShort,
  handleSearch,
}) {
  const localStorageValue = localStorage.getItem('local-search-value');
  const [value, setValue] = useState(localStorageValue ?? '');
  const location = useLocation();

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(value);
  }

  // по переходу в сохраненки - сбрасываю поиск
  useEffect(() => {
    if(location.pathname === '/saved-movies') {
      handleSearch(value);
      setValue('');
    }
  }, [location])

  useEffect(() => {
    if(location.pathname === '/movies') {
      localStorage.setItem('local-search-value', value);
    }    
  }, [value])

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
              value={isShort} 
              onClick={handleShort}
            />
            <span className="switch__slider round"></span>
          </label>
          <p className="switch-text">Короткометражки</p>
        </div>
    </form>
  )
}
