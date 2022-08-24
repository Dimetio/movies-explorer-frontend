import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from "../../contexts/CurrentUserContext"
import DisableComponentContext from '../../contexts/DisableComponent';

import './Profile.css';
import Input from '../Input/Input';

export default function Profile({editProfile, handleSignout}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [inputsData, setInputsData] = useState({
    name: currentUser.name, 
    email: currentUser.email
  });

  function onChangeInput(inputData) {
    setInputsData({ ...inputsData, ...inputData });
  }

  function handleEditProfile(e) {
    e.preventDefault();
    setIsEdit(true);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setIsEdit(false);
    editProfile(inputsData);
  }

  const disableComponent = useContext(DisableComponentContext);

  useEffect(()=> {
    disableComponent({footer: true, ...disableComponent});

    return () => {
      disableComponent({footer: false, ...disableComponent})
    }
  }, [disableComponent]);

  return (
    <>
      <section className="profile">
        <form className="profile-form">
          <h2 className="profile-form__title">{`Привет, ${currentUser.name || inputsData.name}`}</h2>
          <div className="profile-form__inputs">
            <Input 
              inputTitle="Имя"
              name="name"
              type="text"
              placeholder={"Введите имя"}
              labelClass="label-profile input-border"
              inputClass="input-profile"
              disabled={!isEdit}
              onChange={onChangeInput}
              value={isEdit ? inputsData.name : inputsData.name || currentUser.name}
            />
            <Input 
              inputTitle="E-mail"
              name="email"
              type="email"
              placeholder={"Введите E-mail"}
              labelClass="label-profile"
              inputClass="input-profile"
              disabled={!isEdit}
              onChange={onChangeInput}
              value={isEdit ? inputsData.email : inputsData.email || currentUser.email}
            />
          </div>

          <button 
            type={isEdit ? "submit" : "button"} 
            className="profile__button profile__button-edit"
            onClick={isEdit ? handleSaveProfile : handleEditProfile}
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
