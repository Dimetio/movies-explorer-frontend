import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';

import './Login.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Login({email="pochta@ya.ru"}) {
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
        title="Рады видеть!"
        buttonText="Войти"
        question="Ещё не Зарегистрированы?"
        linkText="Регистрироваться"
        url="/signup"
      >
        <Input 
            inputTitle="E-mail"
            name="email"
            type="email"
            placeholder="Введите E-mail"
            value={email || ""}
            inputClass="input-border"
        />

        <Input 
            inputTitle="Пароль"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={""}
            inputClass="input-border"
        />
      </Form>
    </section>
  )
}
