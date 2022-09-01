import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext"
import DisableComponentContext from '../../contexts/DisableComponent';
import useFormAndValidation from '../../hook/useFormAndValidation';
import Toasty from './Toasty/Toasty';

import './Profile.css';
import Input from '../Input/Input';

export default function Profile({editProfile, handleSignout}) {
  const {values, setValues, handleChange, isValid, setIsValid, errors} = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleEditProfile(e) {
    e.preventDefault();
    setIsEdit(true);
    setSuccess(false);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setIsEdit(false);
    editProfile(values);
    setSuccess(true);
  }

  const disableComponent = useContext(DisableComponentContext);

  useEffect(()=> {
    // заполняю поля контекста юзера
    setValues({name: currentUser.name, email: currentUser.email});

    disableComponent({footer: true, ...disableComponent});

    return () => {
      disableComponent({footer: false, ...disableComponent})
    }
  }, [disableComponent]);

  useEffect(()=> {
    if(values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }, [values])

  return (
    <>
      <section className="profile">
      <Toasty success={success}/>
        <form className="profile-form form">
          <h2 className="profile-form__title">{`Привет, ${values.name}`}</h2>
          <div className="profile-form__inputs">
            <Input 
              inputTitle="Имя"
              name="name"
              type="text"
              placeholder={"Введите имя"}
              labelClass="label-profile input-border"
              inputClass="input-profile"
              disabled={!isEdit}
              handleChange={handleChange}
              value={values.name}
              required={true}
              minLength="2"
              maxLength="30"
              errors={errors.name}
            />
            <Input 
              inputTitle="E-mail"
              name="email"
              type="text"
              placeholder={"Введите E-mail"}
              labelClass="label-profile"
              inputClass="input-profile"
              disabled={!isEdit}
              handleChange={handleChange}
              value={values.email}
              required={true}
              errors={errors.email}
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            />
          </div>

          <button 
            type={isEdit ? "submit" : "button"} 
            className={`profile__button profile__button-edit ${isEdit && !isValid && "profile__button_inactive"}`}
            onClick={isEdit ? handleSaveProfile : handleEditProfile}
            disabled={isEdit && !isValid}
          >{isEdit ? "Сохранить" : "Редактировать"}</button>
        </form>
        
        <p
          className="profile__button profile__button-signout"
          onClick={handleSignout}
        >
          Выйти из аккаунта
        </p>
      </section>
    </>
  )
}
