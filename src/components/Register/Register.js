import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';

import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Register({signup}) {

  const disableComponent = useContext(DisableComponentContext);

  useEffect(()=> {
    disableComponent({header: true, footer: true});

    return () => {
      disableComponent({header: false, footer: false})
    }
  }, []);
  
  return (
    <section className="register">
      <Form
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        question="Уже Зарегистрированы?"
        linkText="Войти"
        url="/signin"
        onSubmit={signup}
      >
        {({ onChangeInput, inputsData}) => 
          <>
            <Input 
              inputTitle="Имя"
              name="name"
              type="text"
              placeholder="Введите имя"
              value={inputsData.name || ""}
              inputClass="input-border"
              required
              autoComplete="off"
              onChange={onChangeInput}
            />

            <Input 
              inputTitle="E-mail"
              name="email"
              type="email"
              placeholder="Введите E-mail"
              value={inputsData.email || ""}
              inputClass="input-border"
              required
              autoComplete="off"
              onChange={onChangeInput}            
            />

            <Input 
              inputTitle="Пароль"
              name="password"
              type="password"
              placeholder="Введите пароль"
              value={inputsData.password || ""}
              inputClass="input-border"
              required
              minLength="4"
              maxLength="12"
              autoComplete="off"
              onChange={onChangeInput}            
            />
          </>
        }        
      </Form>   
    </section>
  )
}
