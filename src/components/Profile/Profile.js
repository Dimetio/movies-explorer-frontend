import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';

import './Profile.css';
import Input from '../Input/Input';

export default function Profile({currentUser = "Дмитрий", email = "pochta@ya.ru"}) {
  const disableComponent = useContext(DisableComponentContext);

  useEffect(()=> {
    disableComponent({footer: true, ...disableComponent});

    return () => {
      disableComponent({footer: false, ...disableComponent})
    }
  }, []);

  return (
    <>
      <section className="profile">
        <form className="profile-form">
          <h2 className="profile-form__title">{`Привет, ${currentUser}`}</h2>
          <div className="profile-form__inputs">
            <Input 
              inputTitle="Имя"
              name="name"
              type="text"
              placeholder={"Введите имя"}
              value={currentUser}
              labelClass="label-profile input-border"
              spanClass=""
              inputClass="input-profile"
            />
            <Input 
              inputTitle="E-mail"
              name="email"
              type="email"
              placeholder={"Введите E-mail"}
              value={email}
              labelClass="label-profile"
              inputClass="input-profile"
            />
          </div>

          <button type="button" className="profile__button profile__button-edit">Редактировать</button>
        </form>
        
        <button type="button" className="profile__button profile__button-signout">Выйти из аккаунта</button>
      </section>
    </>
  )
}
