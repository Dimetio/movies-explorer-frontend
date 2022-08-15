import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';

import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Register({name="Дмитрий", email="pochta@ya.ru", password}) {
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
      >
        <Input 
            inputTitle="Имя"
            name="name"
            type="text"
            placeholder="Введите имя"
            value={name}
            inputClass="input-border"
        />

        <Input 
            inputTitle="E-mail"
            name="email"
            type="email"
            placeholder="Введите E-mail"
            value={email}
            inputClass="input-border"
        />

        <Input 
            inputTitle="Пароль"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            inputClass="input-border"
        />
      </Form>   
    </section>
  )
}
