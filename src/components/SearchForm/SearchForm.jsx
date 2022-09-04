import { useEffect } from 'react';
import './SearchForm.css';
import icon from '../../images/search.svg';
import useFormAndValidation from '../../hook/useFormAndValidation';
import Toasty from '../Toasty/Toasty';
import { useState } from 'react';

export default function SearchForm({
  handleSearch,
  initialValue,
  initialChecked,
  onCheckChange,
  disabledCheck,
}) {
  const { values, handleChange, isValid, errors, setErrors } = useFormAndValidation();
  const [showToasty, setShowToasty] = useState(false);

  function handleCheck(e) {
    onCheckChange(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      handleSearch(values.search);
    } else {
      setShowToasty(true);
      setTimeout(()=>{
        setShowToasty(false);
      }, 3000);
    }
  }
  // хак, чтобы отображать в placeholder при первом рендеринге слово "Фильм"
  useEffect(() => {
    setErrors({ search: "Фильм" })
  }, []);

  return (
    <>
      <Toasty
        showToasty={showToasty}
        toastyText='Нужно ввести ключевое слово'
        isSuccess={false}
      />
      <form
        className="search-form form container"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-from__wrap">
          <button type="submit" className="search-form__button search-form__button_primary">
            <img src={icon} className="search-form__icon" alt="иконка" />
          </button>

          <input
            name="search"
            type="text"
            className="search-form__input"
            placeholder={isValid ? '' : errors.search}
            required
            defaultValue={initialValue}
            onChange={handleChange}
          />

          <button type="submit" className="search-form__button search-form__button_secondary">
            <img src={icon} className="search-form__icon" alt="иконка" />
          </button>
        </div>

        <div className="switch-wrap">
          <label className="switch">
            <input
              type="checkbox"
              className="switch__input"
              defaultChecked={initialChecked}
              onChange={handleCheck}
              disabled={disabledCheck}
            />
            <span className="switch__slider round"></span>
          </label>
          <p className="switch-text">Короткометражки</p>
        </div>
      </form>
    </>
  )
}
