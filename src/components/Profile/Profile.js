import { useState, useContext, useEffect } from 'react';

import CurrentUserContext from "../../contexts/CurrentUserContext"
import DisableComponentContext from '../../contexts/DisableComponent';

import './Profile.css';
import Input from '../Input/Input';

export default function Profile({editProfile}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [inputsData, setInputsData] = useState({});

  function onChangeInput(inputData) {
    setInputsData({ ...inputsData, ...inputData });
  }

  function handleEditProfile() {
    setIsEdit(!isEdit);
    editProfile(currentUser);
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
          <h2 className="profile-form__title">{`Привет, ${currentUser.name}`}</h2>
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
            type="button" 
            className="profile__button profile__button-edit"
            onClick={handleEditProfile}
          >{isEdit ? "Сохранить" : "Редактировать"}</button>
        </form>
        
        <button type="button" className="profile__button profile__button-signout">Выйти из аккаунта</button>
      </section>
    </>
  )
}
