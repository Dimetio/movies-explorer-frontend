import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext"
import DisableComponentContext from '../../contexts/DisableComponent';
import useFormAndValidation from '../../hook/useFormAndValidation';

import './Profile.css';
import Input from '../Input/Input';

export default function Profile({editProfile, handleSignout}) {
  const {values, setValues, handleChange, isValid, errors, resetForm} = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);

  function handleEditProfile(e) {
    e.preventDefault();
    setIsEdit(true);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setIsEdit(false);
    editProfile(values);
  }

  const disableComponent = useContext(DisableComponentContext);

  useEffect(()=> {
    setValues({name: currentUser.name, email: currentUser.email});

    disableComponent({footer: true, ...disableComponent});

    return () => {
      disableComponent({footer: false, ...disableComponent})
    }
  }, [disableComponent]);

  return (
    <>
      <section className="profile">
        <form className="profile-form">
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
              value={values.name }
            />
            <Input 
              inputTitle="E-mail"
              name="email"
              type="email"
              placeholder={"Введите E-mail"}
              labelClass="label-profile"
              inputClass="input-profile"
              disabled={!isEdit}
              handleChange={handleChange}
              value={values.email}
            />
          </div>

          <button 
            type={isEdit ? "submit" : "button"} 
            className={`profile__button profile__button-edit ${isEdit && !isValid && "profile__button_inactive"}`}
            onClick={isEdit ? handleSaveProfile : handleEditProfile}
            disabled={(isEdit && !isValid) ?? false}
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
